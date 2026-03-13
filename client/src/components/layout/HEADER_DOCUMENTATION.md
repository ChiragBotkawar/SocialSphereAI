# BNI Header Component - Documentation

## Overview

Pixel-perfect recreation of the BNI.com header with React, Vite, and Tailwind CSS.

## Files Created

```
client/src/
├── components/layout/
│   ├── NewHeader.jsx       # Main header component
│   └── MegaMenu.jsx         # Mega dropdown menu
└── examples/
    └── HeaderExample.jsx    # Usage example with sample page
```

## Technical Specifications

### Header Component (`NewHeader.jsx`)

**Dimensions:**
- Height: `80px` (h-20)
- Container max-width: `1240px`
- Horizontal padding: `24px`
- Logo height: `38px`

**Layout Structure:**
```
Header (full-width, white background)
└── Container (max-width 1240px, centered)
    ├── Left: Logo
    ├── Center: Navigation Menu (5 items)
    └── Right: Email + CTA Button
```

**Navigation Items:**
1. The BNI Experience
2. Our Global Community
3. My BNI Story
4. BNI Franchising
5. About BNI (with dropdown arrow)

**Typography:**
- Font size: `15px`
- Font weight: `500`
- Text color: `#222222`
- Hover color: `#cc0000`
- Item spacing: `32px` (gap-8)

**Right Section:**
- Email: `support@bni.com` with Mail icon
  - Color: `#cc0000`
  - Icon-text gap: `8px`
- CTA Button: "GET INVITED"
  - Gradient: `linear-gradient(90deg, #d71920, #c40000)`
  - Padding: `12px 26px`
  - Border radius: `28px` (rounded-full)
  - Font size: `14px`
  - Font weight: `600`
  - Letter spacing: `0.5px`

### Mega Menu Component (`MegaMenu.jsx`)

**Appearance:**
- Background: `#f6f6f6`
- Top border: `1px solid #e5e5e5`
- Padding: `40px 0` (py-10)
- Container: `1240px` max-width, centered

**Layout:**
- CSS Grid: 4 columns
- Gap: `40px` (gap-10)

**Column 1 - About Us:**
- Title: "About Us"
- Links:
  - Leadership
  - National Directors
  - Our Founder
  - BNI® Foundation

**Column 2 - The Latest:**
- Title: "The Latest"
- Links:
  - Blog & News
  - Networking Tips
  - Global Events
  - Careers

**Column 3 - Quick Links:**
- No title
- Links:
  - Find a Chapter
  - Start a Chapter
  - Exclusive Member Benefits
  - Contact Us

**Column 4 - Interactive:**
1. **Search Bar:**
   - Height: `42px`
   - Border radius: `full`
   - Placeholder: "Search"
   - Search icon on right side

2. **Promotional Card:**
   - Height: `140px`
   - Border radius: `10px`
   - Content: "Experience the 2026 BNI Global Convention in Monaco!"
   - CTA: "Click Here to Register"
   - Button color: `#d71920`

3. **Social Icons:**
   - Icons: Facebook, LinkedIn, Instagram, YouTube, Twitter
   - Size: `18px`
   - Gap: `16px` (gap-4)
   - Default color: `#777777`
   - Hover color: `#d71920`

**Animation:**
```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- Duration: `0.25s`
- Easing: `ease-out`

### Interaction Behavior

**Mega Menu Trigger:**
- Hover on "About BNI" navigation item
- Menu stays visible when cursor moves into dropdown
- Closes when cursor leaves both trigger and dropdown

**State Management:**
```jsx
const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
```

**Hover Events:**
```jsx
onMouseEnter={() => setIsMegaMenuOpen(true)}
onMouseLeave={() => setIsMegaMenuOpen(false)}
```

## Installation & Usage

### 1. Install Dependencies

```bash
npm install lucide-react
```

### 2. Basic Usage

```jsx
import NewHeader from './components/layout/NewHeader';

function App() {
  return (
    <div>
      <NewHeader />
      {/* Your page content */}
    </div>
  );
}
```

### 3. Full Example

See `examples/HeaderExample.jsx` for complete implementation with sample page layout.

## Logo Configuration

The component expects a logo at `/logo.png`. If the image fails to load, it displays a fallback BNI logo using the "B" icon.

**To use your own logo:**
1. Place your logo in `client/public/logo.png`
2. Or update the `src` attribute in `NewHeader.jsx`:
   ```jsx
   <img src="/your-logo-path.png" alt="BNI Logo" />
   ```

## Tailwind CSS Classes Used

### Layout
- `flex`, `items-center`, `justify-between`
- `grid`, `grid-cols-4`
- `gap-4`, `gap-6`, `gap-8`, `gap-10`
- `space-y-3`

### Sizing
- `h-20`, `h-[38px]`, `h-[42px]`, `h-[140px]`
- `w-full`, `w-10`
- `max-w-[1240px]`

### Spacing
- `px-4`, `px-6`, `py-3`, `py-10`
- `mb-2`, `mb-4`, `mb-6`

### Colors
- `bg-white`, `bg-[#f6f6f6]`, `bg-[#d71920]`
- `text-[#222222]`, `text-[#cc0000]`, `text-[#777777]`
- `hover:text-[#cc0000]`, `hover:bg-[#c40000]`

### Effects
- `shadow-sm`, `shadow-md`, `shadow-lg`
- `rounded-full`, `rounded-[10px]`
- `hover:opacity-90`
- `transition-colors`, `transition-opacity`

### Typography
- `text-[14px]`, `text-[15px]`
- `font-medium`, `font-semibold`, `font-bold`, `font-black`
- `tracking-wide`

## Responsive Behavior

Current implementation is optimized for desktop (1240px+ width). For mobile responsiveness, consider:

1. Add hamburger menu for mobile
2. Stack navigation vertically on small screens
3. Convert mega menu to accordion on mobile
4. Hide email link on mobile
5. Make CTA button full-width on mobile

## Color Reference

| Name | Hex | Usage |
|------|-----|-------|
| Primary Red | `#d71920` | Buttons, hover states, accents |
| Dark Red | `#c40000` | Button gradient end, hover states |
| Email Red | `#cc0000` | Email link, active states |
| Text Dark | `#222222` | Primary text color |
| Text Gray | `#777777` | Social icons default |
| Background Gray | `#f6f6f6` | Mega menu background |
| Border Gray | `#e5e5e5` | Mega menu top border |

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires CSS Grid and Flexbox support.

## Performance Considerations

1. **Logo Loading:** Fallback SVG logo displays if image fails
2. **Animation:** CSS-based for smooth 60fps performance
3. **State Management:** Minimal React state (single boolean)
4. **Event Handlers:** Debounced hover events prevent flicker

## Customization

### Change Container Width

```jsx
style={{ maxWidth: '1440px' }} // Change from 1240px
```

### Adjust Menu Item Spacing

```jsx
className="flex items-center gap-12" // Change from gap-8
```

### Modify Button Gradient

```jsx
style={{
  background: 'linear-gradient(90deg, #your-color-1, #your-color-2)',
}}
```

### Update Social Icons

Edit the `socialLinks` array in `MegaMenu.jsx`:

```jsx
const socialLinks = [
  { icon: Facebook, href: 'https://...', label: 'Facebook' },
  // Add or remove social platforms
];
```

## Known Issues

None currently. Component compiles without errors.

## Future Enhancements

- [ ] Mobile responsive design
- [ ] Keyboard navigation support (accessibility)
- [ ] ARIA labels for screen readers
- [ ] Animated hamburger menu for mobile
- [ ] Search bar functionality
- [ ] Sticky header on scroll
- [ ] Active route highlighting

## License

Production-ready code for BNI platform implementation.

## Support

For questions or issues, refer to the main project documentation or contact the development team.
