# Updated Implementation Plan

## New Issues to Address

### 1. Fix Instagram Link in ContactSection

**Problem**: Instagram link is not showing properly in the contact section and link text should be "marathonshk"

**Root Cause Analysis**:
- The contactInfo array has an href property but the rendering logic might not be handling it correctly
- Need to ensure the link text displays "marathonshk" instead of the Instagram handle

**Solution**:
```tsx
// Update the contactInfo array in ContactSection.tsx:
const contactInfo = [
  {
    icon: Mail,
    title: '電子郵件',
    content: 'support@marathons.hk',
    description: '我們會在24小時內回覆您的查詢'
  },
  {
    icon: Instagram,
    title: 'Instagram',
    content: 'marathonshk', // Changed from Instagram handle
    href: 'https://www.instagram.com/marathonshk/',
    description: '關注我們獲取最新活動資訊'
  }
];

// Ensure proper rendering logic:
{info.href ? (
  <a 
    href={info.href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-accent font-medium mb-1 hover:underline"
  >
    {info.content}
  </a>
) : (
  <p className="text-accent font-medium mb-1">{info.content}</p>
)}
```

### 2. Investigate Hero Section Jumping Issue

**Problem**: Elements in hero section are still jumping despite previous fixes

**Root Cause Analysis**:
1. Dynamic content loading (eventCount from Supabase)
2. CSS animations triggering after page load
3. Font loading causing layout shift
4. Responsive breakpoints recalculating
5. Image loading without proper dimensions

**Investigation Steps**:
1. Revert previous changes to Hero.tsx to isolate the issue
2. Check if useEffect with fetchEventCount is causing re-renders
3. Examine CSS animations and their timing
4. Verify if Noto Sans TC font loading is causing shifts
5. Check if responsive utilities are recalculating

**Potential Solutions**:
```tsx
// 1. Set initial state to prevent undefined values
const [eventCount, setEventCount] = useState(50); // Start with default value
const [loading, setLoading] = useState(false); // Don't show loading state initially

// 2. Remove animation delays that might cause staggered loading
// Remove style={{animationDelay: '0.2s'}} etc.

// 3. Add font-display: swap to CSS
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&display=swap');

// 4. Ensure consistent container heights
<div className="min-h-[50vh] md:min-h-[80vh]"> // Already present
```

### 3. Move Contact Section to Separate Page

**Problem**: Need to move the entire ContactSection to a dedicated contact page

**Solution Options**:

**Option A: Create dedicated contact page (Recommended)**
1. Create new page: `src/pages/contact.tsx`
2. Move ContactSection component to this page
3. Update navigation links to point to /contact
4. Remove ContactSection from homepage

**Option B: Keep as component but render conditionally**
1. Create contact page that imports ContactSection
2. Keep ContactSection on homepage but with reduced content
3. Use different props for homepage vs contact page

**Recommended Implementation (Option A)**:

1. **Create new contact page**:
```tsx
// src/pages/contact.tsx
import Head from 'next/head';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>聯絡我們 - 足•包 | marathons.hk</title>
        <meta name="description" content="有任何問題或建議？我們很樂意聽到您的聲音，讓我們一起讓香港跑步社群更加精彩" />
        <link rel="canonical" href="https://marathons.hk/contact" />
      </Head>

      <main className="min-h-screen bg-background">
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
}
```

2. **Update HomePage**:
```tsx
// src/pages/index.tsx
// Remove ContactSection import and usage
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
// Remove: import ContactSection from '@/components/ContactSection'

// In the component:
// Remove: <ContactSection />
```

3. **Update Footer navigation**:
```tsx
// Already has correct link: { name: '聯絡我們', href: '/contact' }
```

## Implementation Priority

1. **High Priority**: Fix Instagram link display issue
2. **High Priority**: Investigate and fix hero section jumping
3. **Medium Priority**: Move contact section to separate page

## Testing Required

1. Test Instagram link opens correctly with "marathonshk" text
2. Test hero section on multiple loads to ensure no jumping
3. Test new contact page loads correctly
4. Test navigation to contact page from footer
5. Test all responsive breakpoints

## Files to Modify

1. `src/components/ContactSection.tsx` - Fix Instagram link
2. `src/components/Hero.tsx` - Revert changes and investigate jumping
3. `src/pages/index.tsx` - Remove ContactSection
4. `src/pages/contact.tsx` - Create new contact page (new file)