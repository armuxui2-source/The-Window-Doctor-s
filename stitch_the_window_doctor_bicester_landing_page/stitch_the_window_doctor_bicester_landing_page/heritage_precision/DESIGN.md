---
name: Heritage Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf0'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d9e3f9'
  on-surface: '#121c2c'
  on-surface-variant: '#44464e'
  inverse-surface: '#273141'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4c5e86'
  primary: '#00081e'
  on-primary: '#ffffff'
  primary-container: '#0a1f44'
  on-primary-container: '#7687b2'
  inverse-primary: '#b4c6f4'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#070a0a'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e2122'
  on-tertiary-container: '#868889'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b4c6f4'
  on-primary-fixed: '#041a3f'
  on-primary-fixed-variant: '#34466d'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f9f9ff'
  on-background: '#121c2c'
  surface-variant: '#d9e3f9'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 80px
  section-gap: 120px
---

## Brand & Style

The brand identity for the design system is rooted in the values of a multi-generational family business: **Expertise, Reliability, and Longevity**. It bridges the gap between the heritage of an "Est. 1983" local institution and the modern requirements of energy-efficient engineering.

The chosen style is **Modern Corporate with Structural Precision**. It utilizes a "grid-first" philosophy that mirrors the architectural nature of window and door installation. The visual language is high-contrast, clean, and intentional, balancing professional authority with modern accessibility.

- **Minimalism:** Used in the generous use of white space and "Light Gray" zones to make technical information digestible.
- **Structuralism:** Heavy focus on vertical and horizontal alignment, using "Deep Navy" as a foundational anchor.
- **Trust-Focused:** High-quality photography of finished installations is framed in architectural containers with soft, pill-inspired rounding to emphasize modern craftsmanship and friendly service.

## Colors

The palette is designed to evoke a sense of "The Professional Specialist." 

- **Primary (Deep Navy):** Represents authority, the medical "Doctor" precision, and the corporate stability of a business that has lasted 40+ years.
- **Secondary (Heritage Gold):** Used as a "prestige" accent. It should be applied to trust-building elements (ratings, certifications, "Est. 1983" markers) and high-priority Call to Actions.
- **Neutral Backgrounds:** A mix of pure White (#FFFFFF) for high-impact content and "Slate Gray" (#2D3748) for secondary UI elements and text to create subtle depth without relying on harsh blacks.
- **Success/Safety:** A specific Forest Green should be used sparingly for "Energy Efficient" badges.

## Typography

The typography strategy focuses on "Strength in Legibility." 

**Hanken Grotesk** is the primary display face. Its sharp, contemporary geometry feels engineered and modern. Use it for all headlines to establish an authoritative tone. 

**Work Sans** is the workhorse for body copy and technical specifications. It is highly readable even at small sizes, which is essential for quoting dimensions or explaining energy ratings.

- **Headlines:** Always in Deep Navy. Use tight letter-spacing for large hero text.
- **Upper Case:** Use `label-bold` for small navigation items and section overlines to add a "professional blueprint" feel.

## Layout & Spacing

The layout is based on a **12-column fixed grid** for desktop (1280px max-width) and a **4-column fluid grid** for mobile. 

- **Structural Alignment:** Elements should feel "snapped" to the grid. Use 24px gutters to allow the UI to breathe.
- **Rhythm:** Use an 8px base unit for all internal spacing (padding/margins). 
- **White Space:** To differentiate from low-quality local competitors, this design system mandates aggressive white space between major sections (120px on desktop) to highlight the "Premium" nature of the service.
- **Mobile Reflow:** For mobile, headlines should scale down using the `-mobile` tokens, and multi-column grids (like service cards) must collapse into a single-column stack.

## Elevation & Depth

This design system rejects heavy shadows in favor of **Tonal Layers and Bold Outlines**. This creates a "structural" feel that mimics architectural drawings.

- **Flat Surfaces:** Use different background colors (White vs. Light Gray) to separate content sections instead of elevation.
- **The "Glass Window" Effect:** For overlaying text on images, use a subtle backdrop blur (4px) with a 90% opacity Navy tint.
- **Borders:** Use 1px solid borders in a neutral gray for cards and input fields. 
- **Shadows:** If used (e.g., for a primary CTA button on hover), use a "Hard Shadow" (2px offset, 0px blur, Navy at 20% opacity) rather than a soft ambient glow.

## Shapes

The shape language is **Pill-shaped (16px)**. 

While the products (windows/doors) are architectural and linear, the UI uses a 1rem (16px) corner radius to provide a softer, more modern digital experience. All buttons, input fields, cards, and image containers must use this generous 16px rounding to balance the "structural precision" of the brand with a contemporary sense of "approachability" and ease of use.

Exceptions: Icons should be linear and geometric, matching the line weight of the brand's technical illustrations.

## Components

### Buttons
- **Primary:** Deep Navy background, White text, 16px rounded corners. Solid 2px Heritage Gold border on hover.
- **Secondary:** White background, Deep Navy text, 1px Navy border, 16px rounded corners.
- **CTA:** Heritage Gold background, Deep Navy text (for "Get a Quote" or "Emergency Call-out").

### Cards
- No shadows. 1px light gray border. 16px corner radius. Deep Navy headline at the top. 
- Image aspect ratios should be strictly 3:2 or 16:9 to maintain the architectural feel.

### Input Fields
- 16px rounded corners, 1px border. On focus, the border changes to Deep Navy with a 2px stroke.
- Labels use `label-bold` in Deep Navy.

### Trust Badges
- Elements like "Which? Trusted Trader" or "FENSA" should be housed in a consistent "Badge Bar" with a Light Gray background at the footer or hero section.

### Service Icons
- Use thin-line (2pt stroke) icons that match the "Doctor" illustration style. Icons should be enclosed in a square Navy frame with a 16px radius for a professional, technical look.