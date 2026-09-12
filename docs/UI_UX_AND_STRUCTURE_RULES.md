# Skilltax UI/UX and Structure Rules

This document is the shared design contract for the Skilltax website and its Figma source. New screens and changes must follow these rules unless a documented product requirement overrides them.

## 1. Experience principles

- Make every screen clear, calm, trustworthy, and action-oriented.
- Prefer familiar interaction patterns over novelty. A user should understand the next action without instruction.
- Keep each section focused on one message and one primary action.
- Preserve visual hierarchy: page title, supporting copy, primary action, then secondary detail.
- Use progressive disclosure for advanced or low-frequency controls.
- Write concise Arabic copy in a direct, professional tone. Avoid unnecessary technical language.
- Show useful empty, loading, success, and error states for every interactive flow.

## 2. Language, direction, and typography

- Arabic is the default language and every page is RTL-first.
- Set the document direction with `dir="rtl"`; do not simulate RTL by reversing individual elements.
- Use Cairo for interface text, headings, controls, labels, and numerals.
- Right-align Arabic text. Keep natural alignment for logos, illustrations, and media.
- Use LTR isolation only where the content requires it, such as email addresses, URLs, codes, chart axes, or mixed-format values. Wrap those values with `dir="ltr"` instead of changing the whole component.
- Use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`) so layouts remain safe if an English version is introduced.
- Keep headings compact and readable; body copy should not exceed roughly 65 characters per line on wide screens.
- Use tabular numerals for rapidly changing metrics when available.

## 3. Visual foundations

### Color tokens

Use semantic tokens rather than raw values inside components.

| Token | Value | Primary use |
| --- | --- | --- |
| `brand-primary` | `#5E5DDE` | Primary actions and brand emphasis |
| `brand-indigo` | `#373873` | Strong headings and dark brand surfaces |
| `ink` | `#0F172A` | Primary text |
| `surface` | `#FFFFFF` | Cards and default page surface |
| `surface-soft` | `#F5F5FE` | Alternate sections and subtle highlights |
| `text-muted` | `#5E6475` | Supporting text |
| `line` | `#E6E7F2` | Borders and dividers |
| `success` | `#16A34A` | Positive status only |

- Meet WCAG AA contrast for text and controls.
- Never communicate status using color alone; add text, an icon, or another visible cue.
- Reserve the primary brand color for priority actions and meaningful emphasis.

### Spacing and sizing

- Base spacing grid: 4 px.
- Preferred spacing steps: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, and 112 px.
- Content container maximum: 1320 px with responsive inline padding.
- Desktop section spacing: 72–112 px. Mobile section spacing: about 56 px.
- Minimum interactive target: 44 × 44 px.
- Standard corner radii: 12 px for controls, 16 px for cards, 20 px for large panels. Use larger radii only for intentional hero artwork.

### Elevation and imagery

- Prefer borders and surface contrast before adding shadows.
- Keep shadows soft and low contrast; elevated layers should remain visually connected to the page.
- Product imagery must reflect the current interface and remain legible at the rendered size.
- Decorative imagery needs empty alt text; informative imagery needs concise Arabic alt text.

### Iconography

- Use the shared rounded-outline SVG icon set. Do not use Unicode symbols, emoji, or font glyphs as interface icons.
- Default icon stroke is 1.8 px with round caps and joins. Use 16–20 px in controls, 24 px for standard feature icons, and up to 34 px in large feature tiles.
- Icons inherit `currentColor` and must not introduce one-off colors outside semantic tokens.
- Keep icons decorative when an adjacent visible label already names the action. Icon-only controls require an accessible Arabic label and a minimum 44 × 44 px target.
- Directional icons must reflect RTL navigation; use a left-pointing arrow for forward actions in the Arabic interface.

## 4. Layout and responsive behavior

- Build layouts with CSS Grid or Flexbox and logical properties; avoid absolute positioning for primary page structure.
- Design desktop at 1440 px and validate mobile at 390 px. Check intermediate widths instead of treating tablet as a scaled desktop.
- Stack content in reading order on narrow screens. Do not rely on CSS visual reordering that conflicts with keyboard or screen-reader order.
- Navigation, action groups, carousels, and directional icons must follow RTL reading direction.
- Preserve readable line lengths and avoid shrinking text to make a layout fit.
- Charts and product mockups may keep an internal LTR coordinate system while their surrounding labels and controls remain RTL.
- Avoid horizontal page scrolling at every supported viewport.

## 5. Components and interaction

- Reuse an existing component before creating a new one.
- Components must expose meaningful variants such as size, hierarchy, state, and icon position. Do not create separate components for cosmetic one-off differences.
- Buttons use a single clear label and have default, hover, focus-visible, pressed, disabled, and loading states.
- Use one primary action per decision area. Secondary actions must be visually quieter.
- Forms require persistent labels, clear validation, actionable Arabic error copy, and appropriate autocomplete/input modes.
- Focus indicators must be visible and must not be removed.
- Modals and menus must trap or restore focus correctly, close with Escape when appropriate, and be operable with a keyboard.
- Motion must explain change or reinforce hierarchy. Keep it subtle, avoid blocking interaction, and respect `prefers-reduced-motion`.
- Do not autoplay essential content or hide essential information inside hover-only interactions.

## 6. Accessibility and content quality

- Use semantic HTML landmarks and a logical heading hierarchy.
- All interactive elements must be keyboard accessible and have an accessible name.
- Use native elements first; add ARIA only where native semantics are insufficient.
- Provide text alternatives for non-text content and captions/transcripts when media carries meaning.
- Errors must identify the problem and explain how to recover.
- Avoid placeholder-only form labels and ambiguous link text such as “اضغط هنا”.
- Test zoom at 200%, keyboard navigation, reduced motion, and a representative screen reader flow before release.

## 7. Code structure rules

```text
app/
  layout.tsx          Global metadata, document language/direction, shared shell
  globals.css         Font faces, tokens, resets, and global utilities
  page.tsx            Page composition only
components/
  layout/             Header, footer, container, and site-wide layout pieces
  home/               Homepage sections and their local presentation helpers
  ui/                 Reusable primitives shared across pages
public/
  fonts/              Self-hosted font files
  images/skilltax/    Product assets grouped by page section or purpose
docs/                 Product and implementation rules
```

- Keep page files focused on composition; move reusable presentation into components.
- Give each component one clear responsibility. Split large sections when parts have independent behavior or reuse value.
- Put cross-page primitives in `components/ui`; do not move a homepage-only component there prematurely.
- Use PascalCase for React component files and descriptive section names.
- Keep data/content arrays separate from complex JSX when doing so improves scanning or reuse.
- Client components are allowed only when browser state, effects, events, or animation require them.
- Centralize shared tokens and utilities. Do not duplicate colors, spacing, breakpoints, or font declarations across components.
- Prefer component props and variants to CSS selectors coupled to a specific page hierarchy.
- Keep assets under `public/images/skilltax/<area>` with descriptive lowercase kebab-case names.
- Remove unused assets and dead variants after confirming they are not referenced.

## 8. Figma structure rules

Use these top-level pages in this order:

1. `01 Foundations` — color, typography, spacing, radius, elevation, grids, and accessibility notes.
2. `02 Components` — reusable component sets, variants, states, and usage notes.
3. `03 Homepage` — production screen compositions and responsive variants.
4. `04 Guidelines` — this design contract, examples, and do/don't guidance.

- Use Figma variables and shared styles for every reusable token. Do not hardcode a value when a token exists.
- Bind component properties to variables where supported.
- Build layouts with Auto Layout and constraints. Frames must resize predictably when copy changes.
- Use component instances in screens; do not detach instances to make routine variations.
- Name layers by purpose, not appearance: `Hero/Content`, `Header/PrimaryNav`, or `Button/Label`.
- Name components as `Category/Component` and variants with explicit properties such as `Size=Large, State=Hover, Hierarchy=Primary`.
- Keep Arabic copy right-aligned and use Cairo in all editable text layers.
- Add both desktop (1440 px) and mobile (390 px) frames for approved screens.
- Place section content inside a named wrapper frame before adding individual elements.
- Keep explorations separate from approved production frames and label their status clearly.
- Add component descriptions for accessibility, content limits, responsive behavior, and known exceptions.

## 9. Definition of done

A UI change is ready only when:

- RTL direction and Cairo rendering are correct at all supported widths.
- Desktop and mobile layouts are verified with realistic Arabic copy.
- Keyboard, focus, contrast, reduced-motion, and text-alternative requirements are satisfied.
- Reusable tokens/components are used in both code and Figma.
- Loading, empty, error, success, disabled, and overflow cases relevant to the feature are covered.
- The Figma frame and implementation use matching names, states, and visual tokens.
- The production build and applicable tests pass without new warnings.
