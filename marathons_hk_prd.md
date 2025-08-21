# marathons.hk — MVP Product Requirements Document

## 1. MVP Overview (3 Weeks)

### 1.1 Project Name
**marathons.hk**

### 1.2 MVP Mission Statement
Create a functional Chinese-language platform for marathon and running events in Hong Kong, providing essential event information and registration links for Traditional Chinese-speaking runners.

### 1.3 Market Research Summary

#### 1.3.1 Keyword Analysis
- Chinese Keywords: "馬拉松" has 10K-100K average monthly search volume
- English Keywords: "Marathon" has only 1K-10K average monthly search volume
- Strategic Decision: Chinese-first approach with English as secondary

#### 1.3.2 Competitive Analysis

English Search Results ("Marathon Hong Kong")
1. ahotu.com — 100K+ monthly visitors worldwide, but HK section lacks detail
2. hkrunners.com — 1.7K monthly visitors, outdated UI, ranks page 2

Chinese Search Results ("馬拉松 香港")
1. fitz.hk — 100K+ monthly visitors, comprehensive sports events, clean UI
2. hkmarathonpro.com — 2K monthly visitors, outdated UI, ranks page 1

#### 1.3.3 Market Opportunity
- Low competition barrier: Sites with 2K visitors and poor UI ranking on page 1
- High search volume: Chinese keywords significantly outperform English
- Underserved market: Current solutions have outdated UIs and limited functionality

### 1.4 MVP Success Criteria (3 Weeks)
- Launch Goal: Fully functional website deployed to production (Vercel + Cloudflare DNS)
- Content Goal: 50+ events in database (current: 66 records in Supabase)
- Technical Goal: Mobile-responsive, Chinese-optimized website
- SEO Goal: Chinese meta tags and structured data (WebSite on homepage; SportsEvent on event pages)
- Performance Goal: Website loads under 3 seconds on mobile
- Market Goal: Target "馬拉松 香港" keyword with optimized content
- Branding Goal: Use "marathons.hk" consistently across titles/meta
- Contact Goal: Support email listed as support@marathons.hk

Status (as of current codebase)
- Domain: marathons.hk configured; canonical set to https://marathons.hk/ across app head and document head
- Redirects: www and vercel.app domains configured to redirect to marathons.hk (via Vercel/domain rules)
- SEO: robots.txt and sitemap.xml point to marathons.hk; hreflang and canonical standardized; Organization JSON-LD aligned to marathons.hk
- Build/Typescript: Next.js + React + TS typings installed; dev server compiles cleanly; Supabase project refreshed — old project deleted and replaced; anon key stored only in environment variables (local + Vercel)
- Favicons: PNG links removed; relying on /favicon.ico placeholder until final logo assets exist

Recent progress (Aug 2025)
- Homepage
  - Implemented SSR running events section using Supabase public."marathons.hk" with upcoming-only (event_date ≥ HK today), ordered ascending.
  - Table UI updated: Date | Event Name | Category | Distance | Location | [Action Column], right action column shows "Register Now" button (target="_blank" rel="noopener"), all cells vertically centered.
  - Hero CTA adjusted: Keep "Browse Events" as outline style, remove "Learn More", add smooth scroll to #events.
- Supabase
  - Table confirmed: public."marathons.hk" (columns: id, created_at, event_date DATE, event_name, event_category, distance, location, link).
  - RLS Enabled with policy "Public read upcoming": anon can SELECT event rows where event_date >= CURRENT_DATE AT TIME ZONE 'Asia/Hong_Kong'.
- Diagnostics
  - Temporarily removed homepage date filtering to confirm data readable; confirmed 62 records readable, then used RLS + app-side condition to restore "upcoming events only".
- Pending alignment
  - /events and /events/[slug] still need to switch from .from('events') to .from('marathons.hk') and apply field mapping (event_name→title_zh, event_date→date, event_category→category, link→registration_url).

## 2. MVP Features & Requirements

### 2.1 Core MVP Features
```typescript
// MVP Feature Set (Week 1-3 only)
const MVPFeatures = {
  essential: [
    'Homepage with hero section and featured events',
    'Events listing page with basic category/date filters',
    'Individual event detail pages',
    'Mobile-responsive design',
    'Chinese typography optimization'
  ],
  
  userInterface: [
    'Chinese-only navigation and content',
    'EventsTable (primary) with key information',
    'EventCard (optional A/B test on selected sections)',
    'Registration CTA buttons',
    'Basic search functionality',
    'Date and category filtering'
  ],
  
  seoBasics: [
    'Chinese meta tags for all pages',
    'Structured data: WebSite (homepage) and SportsEvent (event page)',
    'XML sitemap generation',
    'Mobile-friendly design'
  ]
};
```

### 2.2 MVP User Journey
1. Homepage Visit → See featured upcoming events
2. Browse Events → Filter by category/date or search
3. Event Details → View full event information
4. Registration → Click through to external registration

### 2.3 Out of Scope for MVP
- User authentication/accounts
- English language support
- Advanced search features
- User reviews/ratings
- Automated data scraping
- Newsletter functionality
- Admin dashboard (use Supabase direct)

### 2.4 EventsTable UI Specification (Primary)
Modern table inspired by fitz.hk timetable with a contemporary twist:
- Columns (desktop): 日期, 活動名稱, 地點, 分類, 距離, 報名, 狀態
- Styling: sticky header; zebra rows; subtle 1px outline with rounded corners; soft shadow; hover row highlight
- Responsiveness:
  - Tablet: collapse less critical columns (e.g., 狀態 as icons); keep 日期, 活動名稱 prominent
  - Mobile: stacked rows with key/value pairs; sticky header remains; searchable and filterable
- Accessibility: proper table semantics (thead/tbody/th scope), focus states, sufficient contrast
- Performance: virtualize later if needed (post-MVP) when row count grows

## 3. Week-by-Week Implementation Plan

### Week 1: Foundation & Setup (updated to reflect current status)
Day 1-2: Project Setup
- [x] Domain registration: marathons.hk (Cloudflare DNS)
- [x] Supabase account & database setup (events table with 66 records)
- [x] Vercel account created
- [x] Git repository setup
- [x] Vercel deployment configuration with env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [x] Google Fonts (Noto Sans TC) integration - Implemented with preconnect optimization and font weights 300-700

Day 3-4: Database & Core Structure
- [x] Events table creation (Chinese-optimized schema)
- [x] Basic read access via Supabase client
- [x] RLS policy for anon read upcoming-only on public."marathons.hk"
- [x] Ensure indexes on date/category exist (add index on event_date) — Confirmed: idx_events_date and idx_events_category indexes exist on public."marathons.hk" table
- [x] Rotate any previously exposed anon key after moving to env vars — Note: Old Supabase project deleted; new project created; anon key stored only in .env.local and Vercel env.

Day 5-7: Data & Configuration
- [x] Manual data curation (66 events available)
- [x] Validate data quality (slug uniqueness, valid URLs, dates) — Confirmed: No duplicate slugs, all URLs valid, all dates properly formatted
- [x] Convert event_date to DATE type in Supabase (was text like "13 Jul 2025")
- [x] Environment variables on local and Vercel
- [x] Remove hardcoded keys from repo and rotate Supabase anon key — Note: Old Supabase project deleted; new project created; anon key stored only in .env.local and Vercel env.

### Week 2: Core Pages Development
Day 8-10: Homepage Development
- [x] Base homepage renders with hero and sections
- [x] Hero CTA finalized (outline style, smooth-scroll to #events, remove extra button)
- [x] SSR upcoming events section using EventsTable with updated columns/order and centered alignment
- [ ] Mobile-responsive polish (spacing/typography audit)

Day 11-12: Events Listing Page
- [ ] Implement EventsTable (primary) with Chinese headers (日期, 活動名稱, 分類, 距離, 地點, 報名)
- [ ] Category filtering (Marathon, Half Marathon, 10K, 5K, Trail Running) - Chinese display
- [ ] Date filtering (from today forward by default)
- [ ] Search by Event Name/Location/Keywords (Chinese input support)
- [ ] Optional A/B: EventCard component in secondary placement

Day 13-14: Individual Event Pages (All 66 Events)
- [ ] Create dynamic event page template (/events/[slug])
- [ ] Generate English slugs for all 66 events (e.g., "hong-kong-marathon-2025")
- [ ] Individual event information display with Chinese content
- [ ] Registration CTA button
- [ ] Related events section
- [ ] SEO optimization: Chinese meta titles/descriptions for each event page

### Week 3: SEO & Launch Preparation
Day 15-17: SEO Implementation
- [x] Chinese meta tags base + canonical + hreflang centralized in app head
- [x] Organization JSON-LD aligned to marathons.hk (global + homepage)
- [x] XML sitemap present at public/sitemap.xml (marathons.hk URLs + x-default)
- [x] Robots.txt points to https://marathons.hk/sitemap.xml
- [-] SportsEvent JSON-LD for event pages (implemented earlier, pending mapping to new schema)
- [ ] OpenGraph/Twitter defaults review (image assets finalization)

Day 18-19: Testing & Optimization
- [ ] Mobile responsiveness testing
- [ ] Performance optimization (fonts, images, caching)
- [ ] Chinese text display validation (Noto Sans TC)
- [ ] Cross-browser testing
- [ ] Favicon finalization (add favicon.ico and PNGs; currently PNGs disabled to avoid 404s)

Day 20-21: Launch
- [ ] Final content review (≥ 50 events live; currently 66)
- [ ] Production deployment on Vercel
- [x] Cloudflare DNS configured to Vercel (apex + flattening; www redirect to apex)
- [ ] Google Search Console setup + sitemap submit
- [ ] Google Analytics 4 implementation

## 4. MVP Technical Stack (Simplified)

### 4.1 Technology Choices
```typescript
// MVP Technology Stack
const MVPTechStack = {
  frontend: 'Next.js 14 (Pages Router)',
  styling: 'Tailwind CSS',
  database: 'Supabase (PostgreSQL)',
  deployment: 'Vercel + Cloudflare DNS',
  analytics: 'Google Analytics 4',
  fonts: 'Google Fonts (Noto Sans TC)'
};
```

### 4.2 MVP Database Schema
```sql
-- Simplified Events Table for MVP
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_zh VARCHAR(255) NOT NULL,
  description_zh TEXT,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  distance VARCHAR(100),
  registration_url VARCHAR(500),
  price_range VARCHAR(100),
  organizer VARCHAR(255),
  image_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT false,
  slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Basic indexes for performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_featured ON events(is_featured);
```

### 4.3 MVP Page Structure
```typescript
// MVP Site Structure
const MVPSiteStructure = {
  pages: [
    '/',              // Homepage
    '/events',        // Events listing (EventsTable primary)
    '/events/[slug]', // Individual event
    '/sitemap.xml',   // SEO sitemap
    '/robots.txt'     // SEO robots
  ],
  
  components: [
    'Header',                   // Navigation
    'EventsTable',              // Event table (primary)
    'EventCard (optional A/B)', // Event card layout for experiments
    'EventDetail',              // Full event info
    'Footer',                   // Site footer
    'SEOHead (centralized in _app.tsx)' // Meta tags & canonical/hreflang centralization
  ]
};
```

## 5. MVP Content Strategy

### 5.1 Event Categories (English Reference)
```typescript
const EventCategories = {
  'marathon': 'Marathon',
  'half-marathon': 'Half Marathon', 
  '10k': '10K',
  '5k': '5K',
  'trail': 'Trail Running',
  'other': 'Other'
};
```

### 5.2 Essential Content (Chinese Display)
- Navigation: 首頁, 活動, 關於我們
- Event Fields: 活動名稱, 日期, 地點, 分類, 距離, 報名
- Common Terms: 搜尋, 篩選, 立即報名, 查看詳情
- Technical Note: URLs use English slugs (e.g., /events/hong-kong-marathon-2025) while all content displays in Chinese

### 5.3 SEO Content Template
```typescript
// Chinese SEO Templates
const ChineseSEOTemplates = {
  homepageTitle: 'marathons.hk - Hong Kong Marathon Events Information Platform',
  homepageDescription: 'marathons.hk is Hong Kong\'s most comprehensive marathon and running events information platform. Providing latest Hong Kong marathon races, half marathons, 10K running events info and instant registration links.',
  eventPageTitle: '{EventName} - marathons.hk',
  eventPageDescription: '{EventName} will be held on {Date} at {Location}. View details and registration information now.'
};
```

## 6. MVP Success Metrics

### 6.1 Launch Metrics (Week 3)
- [ ] Website successfully deployed and accessible at https://marathons.hk
- [ ] All core pages functional on mobile and desktop
- [ ] All 66 events have individual pages with English slugs and Chinese content
- [ ] ≥ 50 events populated in database (current: 66)
- [x] Chinese SEO meta tags implemented; Organization JSON-LD valid
- [ ] SportsEvent JSON-LD on all 66 event pages
- [ ] Google Analytics tracking active
- [x] Sitemap present and correct at /sitemap.xml (marathons.hk URLs + x-default)

### 6.2 Post-Launch Validation (Week 4)
- [ ] Google Search Console indexing confirmed
- [ ] Mobile-friendly test passes
- [ ] Page load speed under 3 seconds
- [ ] Zero critical accessibility issues
- [ ] All registration links functional

## 7. Post-MVP Roadmap (Brief)

### Phase 2: Enhancement (Weeks 4-6)
- Advanced filtering and search (e.g., district, price)
- Web scraping automation (fitz.hk or organizers)
- Performance optimization and potential table virtualization
- Content expansion to 100+ events

### Phase 3: Growth (Weeks 7-9)
- English language support (if needed)
- User engagement features
- SEO optimization and content marketing
- Community features

### Phase 4: Monetization (Weeks 10-12)
- Affiliate partnerships
- Premium event listings
- Revenue optimization
- Advanced analytics

## 8. Risk Mitigation

### 8.1 MVP Risks & Mitigation
- Data Collection Delay: Already mitigated with 66 events in Supabase
- Technical Complexity: Use Pages Router and simple client fetch initially
- Chinese Font Issues: Test Noto Sans TC early
- Mobile Performance: Optimize images and fonts from start
- SEO Indexing: Submit sitemap immediately after launch
- Secrets Exposure: Remove hardcoded Supabase keys and rotate anon key
- Security Note: Old Supabase project deleted; new project created; anon key stored only in env vars (local + Vercel); no keys in repo.
- RLS: With upcoming-only public read policy in place, SSR pages can safely read upcoming events while past events remain hidden by API.

### 8.2 Contingency Plans
- If scraping fails: Continue manual curation
- If .hk domain routing issues: Validate Cloudflare–Vercel setup
- If Supabase issues: Backup export to CSV; fallback read cache
- If performance issues: Implement lazy loading and table virtualization

## 9. Team & Resources

### 9.1 MVP Team Requirements
- Developer: Full-stack Next.js development
- Content: Manual event curation (can be same person)
- QA: Testing and validation (can be same person)

### 9.2 MVP Budget Estimation
- Domain: $15-50/year
- Hosting: $0 (Vercel free tier)
- Database: $0 (Supabase free tier)
- Tools: $0 (free development tools)
- Total MVP Cost: Under $100

---

## Appendix: Detailed Technical Architecture

### A.1 MVP Event Schema Alignment
```sql
-- Current Supabase table: public."marathons.hk"
-- Columns: id, created_at, event_date, event_name, event_category, distance, location, link

-- Field mapping for code:
-- event_name → title_zh (display)
-- event_date → date 
-- event_category → category
-- location → location
-- link → registration_url
-- distance → distance

-- Slug generation strategy:
-- Generate English slugs from event_name: "香港馬拉松 2025" → "hong-kong-marathon-2025"
-- Store slugs in database or generate dynamically from id + romanized name
```
```typescript
// Future enhanced event structure
interface EnhancedEvent {
  id: string;
  title_zh: string;
  title_en?: string; // Phase 3
  description_zh: string;
  description_en?: string; // Phase 3
  short_description_zh: string;
  date: Date;
  location: string;
  location_district: string;
  category: EventCategory;
  distance: string;
  registration_url: string;
  price_range: string;
  organizer: string;
  organizer_contact?: string;
  image_url?: string;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  weather_considerations?: string;
  transport_info?: string;
  created_at: Date;
  updated_at: Date;
  
  // Advanced SEO fields
  slug: string;
  meta_title_zh: string;
  meta_description_zh: string;
  tags: string[];
  view_count: number;
  featured_until?: Date;
}
```

### A.2 Enhanced Event Schema (Post-MVP)
- Caching Strategy: Redis for popular events
- Image Optimization: Next.js Image component with CDN
- Search: Elasticsearch for advanced search
- Analytics: Custom event tracking
- Performance: Bundle optimization and code splitting

### A.3 Future Technical Enhancements
### A.4 Scalability Considerations
- Hosting: Vercel scales automatically
- CDN: Global content delivery
- Monitoring: Error tracking and performance monitoring

---

Implementation Questions for Resolution (Updated):
1. Brand Identity: Confirmed "marathons.hk"
2. Content Priority: Maintain ≥ 50 events; ongoing curation
3. Design Direction: Chinese typography with Noto Sans TC; modern table primary
4. Deployment: Vercel with Cloudflare DNS; environment variables configured (both local and Vercel)
5. Contact: support@marathons.hk displayed on site footer/contact
6. Security: Old project deleted; new Supabase project live; anon key stored only in env (local + Vercel)
7. Favicons/Brand Assets: Provide final favicon.ico and PNG variants or confirm reliance on .ico only
8. Redirects: Confirm 308 redirects for www and vercel.app to marathons.hk in Vercel and Cloudflare
9. EventsTable: Prioritize implementation and make it the primary listing UI
