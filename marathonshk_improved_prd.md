# marathons.hk — MVP Product Requirements Document

## Executive Summary

**Project**: marathons.hk  
**Timeline**: 3 weeks to MVP  
**Mission**: Create a functional Chinese-language platform for marathon and running events in Hong Kong, providing essential event information and registration links for Traditional Chinese-speaking runners.

**Key Metrics**: 50+ events, mobile-responsive, Chinese-optimized, <3s load time

---

## 1. Market Analysis

### 1.1 Search Volume Analysis
- **Chinese Keywords**: "馬拉松" (10K-100K monthly searches)
- **English Keywords**: "Marathon" (1K-10K monthly searches)
- **Strategy**: Chinese-first approach with English as secondary

### 1.2 Competitive Landscape

**fitz.hk** (100K+ monthly visitors)
- Strengths: Clean UI, comprehensive sports events coverage
- Weaknesses: Not marathon-focused, diluted positioning

**hkmarathonpro.com** (2K monthly visitors)  
- Strengths: Marathon-focused, ranks page 1 for key terms
- Weaknesses: Outdated UI, poor user experience

**ahotu.com** (100K+ global visitors)
- Strengths: Global reach, established brand
- Weaknesses: Hong Kong section lacks detail and local focus

**hkrunners.com** (1.7K monthly visitors)
- Strengths: Local running community focus  
- Weaknesses: Outdated design, ranks page 2, limited functionality

### 1.3 Market Opportunity
- **Low competition barrier**: Sites with 2K visitors and poor UI ranking on page 1
- **High search volume**: Chinese keywords significantly outperform English
- **Underserved market**: Current solutions have outdated UIs and limited functionality

---

## 2. Product Specification

### 2.1 Core Features (MVP)
```typescript
const MVPFeatures = {
  essential: [
    'Homepage with hero section and upcoming events',
    'Events listing page with filters (category/date)',
    'Individual event detail pages with registration CTA',
    'Mobile-responsive design',
    'Chinese typography optimization (Noto Sans TC)'
  ],
  
  userInterface: [
    'EventsTable (primary UI component)',
    'Chinese-only navigation and content',
    'Registration CTA buttons (external links)',
    'Basic search functionality'
  ],
  
  seoBasics: [
    'Chinese meta tags for all pages',
    'Structured data (WebSite + SportsEvent)',
    'XML sitemap generation',
    'Mobile-friendly implementation'
  ]
};
```

### 2.2 User Journey
```
Homepage → Browse Events → Event Details → External Registration
```

### 2.3 Out of Scope (MVP)
- User authentication/accounts
- English language support  
- Advanced search features
- User reviews/ratings
- Automated data scraping
- Newsletter functionality
- Admin dashboard (use Supabase directly)

---

## 3. Technical Architecture

### 3.1 Technology Stack

**Frontend**: Next.js 14 (Pages Router)
- Rationale: SSR for SEO, established ecosystem, TypeScript support

**Styling**: Tailwind CSS  
- Rationale: Rapid development, consistent design system, excellent mobile-first approach

**Database**: Supabase PostgreSQL
- Rationale: Free tier suitable for MVP, built-in RLS, real-time capabilities

**Deployment**: Vercel + Cloudflare DNS
- Rationale: Zero-config deployments, global CDN, excellent Next.js integration

**Analytics**: Google Analytics 4
- Rationale: Industry standard, comprehensive tracking, free tier

**Typography**: Google Fonts (Noto Sans TC)
- Rationale: Optimal Chinese character rendering, web-optimized loading

### 3.2 Database Schema
```sql
-- Current: public."marathons.hk"
-- Columns: id, created_at, event_date, event_name, event_category, distance, location, link

-- Field mapping for components:
-- event_name → title_zh (display)
-- event_date → date 
-- event_category → category
-- location → location
-- link → registration_url
-- distance → distance
```

### 3.3 Site Structure
```
/                 # Homepage (hero + upcoming events)
/events           # Events listing (EventsTable)
/events/[slug]    # Individual event pages
/sitemap.xml      # SEO sitemap
/robots.txt       # SEO robots file
```

---

## 4. Implementation Timeline

### Week 1: Foundation & Setup
**Days 1-2: Project Infrastructure**
- [x] Domain registration: marathons.hk (Cloudflare DNS)
- [x] Supabase setup with events table (66 records)
- [x] Vercel deployment with environment variables
- [x] Git repository and version control

**Days 3-4: Database & Core Structure**
- [x] Events table with Chinese-optimized schema
- [x] RLS policy: anon read upcoming events only
- [x] Database indexes on event_date and category
- [x] Supabase client integration

**Days 5-7: Data & Configuration**
- [x] Manual event curation (66 events)
- [x] Data validation (URLs, dates, no duplicates)
- [x] Environment variables (local + Vercel)
- [x] Security: anon key in env vars only

### Week 2: Core Pages Development
**Days 8-10: Homepage**
- [x] Hero section with CTA (smooth scroll to #events)
- [x] SSR upcoming events using EventsTable
- [x] Mobile-responsive base layout
- [ ] Final mobile polish and typography audit

**Days 11-12: Events Listing**
- [x] EventsTable implementation (primary UI)
- [x] Category filtering (Marathon, Half, 10K, 5K, Trail)
- [x] Date filtering (upcoming events default)
- [x] Search by name/location with Chinese input
- [ ] Mobile-responsive table design

**Days 13-14: Individual Event Pages**
- [x] Dynamic routing: /events/[slug]
- [x] English slug generation for 66 events
- [x] Event detail template with Chinese content
- [x] Registration CTA and related events
- [x] Individual page SEO optimization

### Week 3: SEO & Launch
**Days 15-17: SEO Implementation**
- [x] Chinese meta tags and canonical URLs
- [x] Organization JSON-LD schema
- [x] XML sitemap with correct URLs
- [x] Robots.txt configuration
- [ ] SportsEvent JSON-LD for event pages
- [ ] OpenGraph/Twitter card optimization

**Days 18-19: Testing & Optimization**
- [ ] Mobile responsiveness testing
- [ ] Performance optimization (<3s load time)
- [ ] Chinese typography validation
- [ ] Cross-browser compatibility
- [ ] Favicon implementation

**Days 20-21: Production Launch**
- [ ] Content review (≥50 events live)
- [ ] Production deployment on Vercel
- [x] DNS configuration (Cloudflare → Vercel)
- [ ] Google Search Console setup
- [ ] Analytics implementation

---

## 5. Content Strategy

### 5.1 Event Categories
```typescript
const Categories = {
  'marathon': 'Marathon (馬拉松)',
  'half-marathon': 'Half Marathon (半程馬拉松)',
  '10k': '10K (十公里)',
  '5k': '5K (五公里)',
  'trail': 'Trail Running (越野跑)',
  'other': 'Other (其他)'
};
```

### 5.2 Chinese Content Framework
- **Navigation**: 首頁, 活動, 關於我們
- **Event Fields**: 活動名稱, 日期, 地點, 分類, 距離, 報名
- **Actions**: 搜尋, 篩選, 立即報名, 查看詳情
- **URLs**: English slugs (SEO-friendly) with Chinese content display

### 5.3 SEO Templates
```typescript
const SEOTemplates = {
  homepage: {
    title: 'marathons.hk - Hong Kong Marathon Events Information Platform',
    description: 'Hong Kong\'s comprehensive marathon and running events platform. Latest races, registration links, and event details.'
  },
  eventPage: {
    title: '{EventName} - marathons.hk',
    description: '{EventName} on {Date} at {Location}. Registration details and event information.'
  }
};
```

---

## 6. Success Metrics

### 6.1 Launch Criteria (Week 3)
- [ ] Website deployed and accessible at https://marathons.hk
- [ ] All pages functional on mobile and desktop
- [ ] 66 events with individual pages and English slugs
- [ ] Chinese SEO implementation complete
- [ ] Google Analytics tracking active
- [ ] All external registration links functional

### 6.2 Performance Targets
- **Load Time**: <3 seconds on mobile
- **SEO**: Chinese meta tags on all pages
- **Accessibility**: Zero critical issues
- **Mobile**: Responsive design across devices
- **Indexing**: Google Search Console verification

---

## 7. Risk Management

### 7.1 Technical Risks

**Supabase Downtime** (High Impact)
- Mitigation: Export data backup to CSV format
- Contingency: Implement static fallback with cached event data

**Performance Issues** (Medium Impact)  
- Mitigation: Implement lazy loading and table virtualization
- Monitoring: Set up performance alerts for load times >3s

**Mobile Compatibility** (Medium Impact)
- Mitigation: Test early and frequently across devices
- Tools: BrowserStack for comprehensive device testing

**Chinese Font Rendering** (Low Impact)
- Mitigation: Validate Noto Sans TC across browsers
- Fallback: System Chinese fonts as backup

### 7.2 Content Risks

**Outdated Event Information** (Medium Impact)
- Mitigation: Weekly manual content review process
- Process: Set up calendar reminders for data validation

**Broken Registration Links** (High Impact)
- Mitigation: Quarterly automated link validation
- Tools: Implement dead link checker in CI/CD pipeline

**Insufficient Event Volume** (Low Impact)
- Current Status: Already have 66 events populated
- Growth Plan: Add 10+ events monthly through manual curation

---

## 8. Post-MVP Roadmap

### Phase 2: Enhancement (Weeks 4-6)
- Advanced filtering (district, price, difficulty)
- Performance optimization and table virtualization
- Content expansion to 100+ events
- Automated data collection

### Phase 3: Growth (Weeks 7-9)  
- English language support
- User engagement features
- SEO optimization and content marketing
- Community features

### Phase 4: Monetization (Weeks 10-12)
- Affiliate partnerships with event organizers
- Premium event listing features
- Revenue optimization
- Advanced analytics and insights
- **Database Management & Scalability**:
  - Automated data retention strategy (3-year policy)
  - Historical data backup and archival system
  - Performance optimization for large datasets
  - Automated cleanup and monitoring systems

---

## 9. Resources & Budget

### 9.1 Team Requirements
- **Developer**: Full-stack Next.js development
- **Content Curator**: Event data management (can be same person)
- **QA Tester**: Cross-device testing (can be same person)

### 9.2 Budget Breakdown
- **Domain**: $15-50/year (.hk premium domain)
- **Hosting**: $0 (Vercel free tier sufficient for MVP)
- **Database**: $0 (Supabase free tier)
- **Tools**: $0 (free development stack)
- **Total MVP Cost**: <$100

---

**Document Version**: 1.1  
**Last Updated**: August 2025  
**Next Review**: Post-MVP Launch