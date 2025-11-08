import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 emails per hour per IP

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                    req.headers['x-real-ip'] as string || 
                    req.connection.remoteAddress || 
                    'unknown';

    // Rate limiting check
    const now = Date.now();
    const ipData = rateLimitStore.get(clientIP);
    
    if (ipData) {
      const { count, resetTime } = ipData;
      
      if (now < resetTime) {
        if (count >= RATE_LIMIT_MAX_REQUESTS) {
          return res.status(429).json({ 
            error: 'Too many requests. Please try again later.' 
          });
        }
        
        // Update count
        rateLimitStore.set(clientIP, {
          count: count + 1,
          resetTime
        });
      } else {
        // Reset window
        rateLimitStore.set(clientIP, {
          count: 1,
          resetTime: now + RATE_LIMIT_WINDOW
        });
      }
    } else {
      // First request from this IP
      rateLimitStore.set(clientIP, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      });
    }

    // Extract and validate form data
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Message length validation
    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }

    // Create HTML email template
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>聯絡我們 - marathons.hk</title>
        <style>
          body {
            font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            border-bottom: 2px solid #de6d37;
            padding-bottom: 20px;
            margin-bottom: 30px;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #de6d37;
            margin-bottom: 5px;
          }
          .tagline {
            color: #666;
            font-size: 14px;
          }
          .content {
            margin-bottom: 30px;
          }
          .field {
            margin-bottom: 15px;
          }
          .field-label {
            font-weight: 600;
            color: #444;
            margin-bottom: 5px;
          }
          .field-value {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            border-left: 4px solid #de6d37;
          }
          .footer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
          }
          .message-content {
            white-space: pre-wrap;
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #de6d37;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">香港馬拉松</div>
            <div class="tagline">marathons.hk - 香港最完整的跑步活動資訊平台</div>
          </div>
          
          <div class="content">
            <h2>新的聯絡表單提交</h2>
            <p>您收到了一封來自網站聯絡表單的新訊息：</p>
            
            <div class="field">
              <div class="field-label">姓名：</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">電子郵件：</div>
              <div class="field-value">${email}</div>
            </div>
            
            <div class="field">
              <div class="field-label">主題：</div>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="field-label">訊息內容：</div>
              <div class="message-content">${message}</div>
            </div>
            
            <div class="field">
              <div class="field-label">提交時間：</div>
              <div class="field-value">${new Date().toLocaleString('zh-HK', {
                timeZone: 'Asia/Hong_Kong',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>此郵件由 marathons.hk 聯絡表單自動發送</p>
            <p>請直接回覆此郵件與用戶聯繫</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Get environment variables
    const fromEmail = process.env.FROM_EMAIL || 'noreply@mail.marathons.hk';
    const toEmail = process.env.TO_EMAIL || 'support@marathons.hk';

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: email, // Set reply-to as user's email
      subject: `[marathons.hk] 聯絡表單: ${subject}`,
      html: htmlEmail,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        error: 'Failed to send email. Please try again later.' 
      });
    }

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}