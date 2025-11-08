# QA and Validation Checklist for SEO Enhancements

## Automated Tests

### Unit Tests (Vitest)
Create tests in `src/lib/__tests__/seoUtils.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { getEventStatus, generateEventDescription, createSportsEventJsonLd, createEventMeta } from '../seoUtils';

describe('getEventStatus', () => {
  it('returns EventScheduled for future dates', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    expect(getEventStatus(futureDate.toISOString().split('T')[0])).toBe('https://schema.org/EventScheduled');
  });

  it('returns EventCompleted for past dates', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    expect(getEventStatus(pastDate.toISOString().split('T')[0])).toBe('https://schema.org/EventCompleted');
  });
});

describe('generateEventDescription', () => {
  it('uses fetched description when available', () => {
    const event = {
      event_name: 'Test Event',
      event_category: '越野',
      distance: '10km',
      location: 'Hong Kong',
      event_date: '2025-12-01',
      event_description: 'Official description from website'
    };
    expect(generateEventDescription(event)).toBe('Official description from website');
  });

  it('generates description when no fetched description', () => {
    const event = {
      event_name: 'Test Event',
      event_category: '越野',
      distance: '10km',
      location: 'Hong Kong',
      event_date: '2025-12-01'
    };
    expect(generateEventDescription(event)).toContain('Test Event - 越野跑活動');
  });
});

describe('createSportsEventJsonLd', () => {
  it('creates valid SportsEvent schema', () => {
    const event = {
      id: '1',
      event_name: 'Test Event',
      event_date: '2025-12-01',
      event_category: '越野',
      distance: '10km',
      location: 'Hong Kong',
      slug: 'test-event'
    };
    const result = createSportsEventJsonLd(event);
    expect(result['@type']).toBe('SportsEvent');
    expect(result.name).toBe('Test Event');
    expect(result.startDate).toContain('2025-12-01T06:00:00+08:00');
  });
});
```

### Integration Tests (Playwright)
Create `tests/seo-integration.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('SEO meta tags are present on event pages', async ({ page }) => {
  await page.goto('/events/standard-chartered-hong-kong-marathon-jan-2026');
  
  // Check structured data
  const structuredData = await page.locator('script[type="application/ld+json"]').innerHTML();
  const jsonData = JSON.parse(structuredData);
  expect(jsonData['@type']).toBe('SportsEvent');
  expect(jsonData.name).toBeTruthy();
  expect(jsonData.location).toBeTruthy();
  
  // Check OpenGraph tags
  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
  expect(ogTitle).toBeTruthy();
  
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(ogImage).toContain('marathons.hk');
  
  // Check Twitter tags
  const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
  expect(twitterCard).toBe('summary_large_image');
});
```

## Manual Validation Steps

### 1. Google Rich Results Test
- URL: https://search.google.com/test/rich-results
- Test 3 sample events:
  - Upcoming event: 渣打香港馬拉松
  - Recent event: 三球野 - 柏架山
  - Past event: (find one from 2024)
- Expected results:
  - SportsEvent detected
  - Event name, date, location shown
  - No errors in structured data

### 2. Facebook Sharing Debugger
- URL: https://developers.facebook.com/tools/debug/
- Test same 3 events
- Expected results:
  - Proper OG title and description
  - Image displays correctly (1200x630)
  - No warnings about missing tags

### 3. Twitter Card Validator
- URL: https://cards-dev.twitter.com/validator
- Test same 3 events
- Expected results:
  - Card type: summary_large_image
  - Title, description, image all present
  - No errors

### 4. Manual Page Source Check
For each test event:
1. View page source (Ctrl+U)
2. Verify JSON-LD script is present and valid JSON
3. Check all meta tags are present
4. Confirm canonical URL is correct
5. Verify image URLs are absolute (full https://marathons.hk/...)

## Performance Validation

### Page Load Impact
- Use Lighthouse in Chrome DevTools
- Test before and after implementation
- Expected: <100ms additional load time
- No impact on Core Web Vitals

### Database Query Performance
- Monitor Supabase query times
- New fields (event_description, organizer_name) should not slow queries
- Expected: <50ms additional query time

## Post-Deployment Monitoring

### Google Search Console
1. Add property if not already done
2. Monitor "Enhancements" report for Events
3. Check for any structured data errors
4. Track indexing of event pages

### Social Media Analytics
1. Set up UTM parameters for social shares
2. Monitor click-through rates from social previews
3. Track engagement improvements

## Regression Testing

### After Database Updates
When running the fetch script again:
1. Verify existing descriptions aren't overwritten
2. Check new events get populated correctly
3. Ensure no data loss occurs

### After Code Changes
When modifying SEO utilities:
1. Run all unit tests
2. Run integration tests
3. Manual validate at least 3 event types
4. Check production monitoring tools

## Success Criteria

### Must Pass
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Google Rich Results shows SportsEvent for test pages
- [ ] Facebook debugger shows correct preview
- [ ] Twitter validator shows correct card
- [ ] No performance regression (>100ms)
- [ ] No structured data errors in Search Console

### Nice to Have
- [ ] Social share click-through rate increases
- [ ] Google search impressions improve
- [ ] User feedback on better social previews

## Rollback Plan

If issues detected:
1. Revert to previous version of event page
2. Disable SEO utilities temporarily
3. Keep database changes (descriptions/organizers)
4. Fix issues and redeploy

## Schedule

### Pre-Launch (Day 1)
- Run all automated tests
- Manual validation of 5 sample events
- Performance benchmarking

### Launch Day (Day 2)
- Deploy to production
- Run validation on live URLs
- Monitor error logs

### Post-Launch (Day 3-7)
- Monitor Search Console
- Check social media performance
- Fix any issues found

### Ongoing (Monthly)
- Re-run fetch script for new events
- Monitor for any deprecated SEO practices
- Update utilities as needed