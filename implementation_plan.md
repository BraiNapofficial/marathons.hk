# Implementation Plan for MVP Fixes

## Issues to Fix

### 1. Fix href loading issue in ContactSection.tsx

**Problem**: The Instagram link in ContactSection.tsx is not properly implemented as a clickable link.

**Solution**: 
- Update the Instagram contact info to include a proper anchor tag with href attribute
- Ensure the link opens in a new tab with proper security attributes

**Code Changes**:
```tsx
// In ContactSection.tsx, update the Instagram contact info:
{
  icon: Instagram,
  title: 'Instagram',
  href: 'https://www.instagram.com/marathonshk/',
  description: '關注我們獲取最新活動資訊'
}

// Then in the render function, add proper link handling:
{info.href ? (
  <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-accent font-medium mb-1 hover:underline">
    {info.content}
  </a>
) : (
  <p className="text-accent font-medium mb-1">{info.content}</p>
)}
```

### 2. Fix hero section elements jumping/flashing on load

**Problem**: Elements in the hero section are jumping or flashing when the website loads.

**Solution**:
- Add CSS to prevent layout shift during loading
- Implement proper loading states for dynamic content
- Use Next.js Image component with proper priority and placeholder settings

**Code Changes**:
```tsx
// In Hero.tsx, add loading state and prevent layout shift:
const [eventCount, setEventCount] = useState<number | null>(null);
const [loading, setLoading] = useState(true);

// Add CSS to prevent layout shift:
<div className="text-lg sm:text-2xl font-bold text-white mb-1 min-h-[2rem]">
  {loading ? '...' : eventCount ? `${eventCount}+` : '50+'}
</div>

// Ensure proper image loading:
<Image
  src="/hero-image.webp"
  alt="Running marathon in Hong Kong"
  fill
  className="object-cover"
  priority
  quality={90}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
/>
```

### 3. Comment out 活動分類 in footer

**Problem**: Need to comment out the "活動分類" section in the footer.

**Solution**:
- Comment out the entire Event Categories section in Footer.tsx

**Code Changes**:
```tsx
{/* Event Categories */}
{/* 
<div>
  <h4 className="font-semibold text-foreground mb-4">活動分類</h4>
  <ul className="space-y-2">
    {eventCategories.map((category) => (
      <li key={category.name}>
        <Link 
          href={category.href}
          className="text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          {category.name}
        </Link>
      </li>
    ))}
  </ul>
</div>
*/}
```

### 4. Update footer contact info

**Problem**: Footer needs to update contact information as specified:
- Change email to support@marathons.hk
- Remove phone number and location
- Add Instagram icon and clickable link to https://www.instagram.com/marathonshk/
- Link text should show "marathonshk"

**Solution**:
- Update the company info section in Footer.tsx

**Code Changes**:
```tsx
// Update contact info in Footer.tsx:
<div className="space-y-3">
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Mail className="w-4 h-4 text-accent" />
    <span>support@marathons.hk</span>
  </div>
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Instagram className="w-4 h-4 text-accent" />
    <a 
      href="https://www.instagram.com/marathonshk/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      marathonshk
    </a>
  </div>
</div>
```

### 5. Remove 關注我們 from footer

**Problem**: Need to remove the "關注我們" section from the footer.

**Solution**:
- Comment out or remove the social links section in Footer.tsx

**Code Changes**:
```tsx
{/* Social Links */}
{/* 
<div>
  <h5 className="font-semibold text-foreground mb-3">關注我們</h5>
  <div className="flex gap-3">
    {socialLinks.map((social) => {
      const IconComponent = social.icon;
      return (
        <Link
          key={social.name}
          href={social.href}
          className={`text-muted-foreground ${social.color} transition-colors`}
          aria-label={social.name}
        >
          <IconComponent className="w-5 h-5" />
        </Link>
      );
    })}
  </div>
</div>
*/}
```

## Implementation Priority

1. **High Priority**: Fix ContactSection.tsx href issue and Footer updates
2. **Medium Priority**: Fix hero section jumping/flashing
3. **Low Priority**: Comment out footer sections (these are cosmetic)

## Testing Required

1. Test all links to ensure they open correctly
2. Test the website on different screen sizes to ensure no jumping/flashing
3. Verify footer displays correctly after changes
4. Test Instagram link opens in new tab

## Next Steps

After these fixes are implemented, we can proceed with the remaining MVP features:
- Mobile responsiveness polish
- English slug generation for events
- Event details content implementation
- SEO optimization
- Performance optimization
- Testing and validation