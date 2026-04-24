# Design

## Visual Theme
Cyberpunk / Sci-fi Dark Mode. The interface feels like a high-tech terminal or a futuristic HUD.

## Color Strategy
**Committed**: A predominantly dark interface (`#10131a`, `#161a21`) accented with specific saturated neon colors (`#8ff5ff` for primary interactions/tech feel, `#ac89ff` for secondary/mystical feel, `#ff716c` for alerts).

### Palette
- **Base/Background**: Dark blue-grey (`#10131a`, `#161a21`, `#2e323b`).
- **Accent Cyan**: `#8ff5ff` (Primary actions, key stats, tech focus)
- **Accent Purple**: `#ac89ff` (Secondary elements, mystical/crypto focus)
- **Error/Risk**: `#ff716c`
- **Text Primary**: `#ecedf6`
- **Text Secondary**: `#a9abb3`
- **Text Muted**: `#73757d`

## Typography
- **Headings**: `Space Grotesk` or system sans with tight tracking. High contrast in weight and scale.
- **Body**: System sans, max length 70ch for readability.
- **Monospace**: For dates, stats, and raw data points.

## Layout & Components
- **Spacing**: Rhythmic spacing. Varying gaps to create visual hierarchy.
- **Borders**: Subtle, semi-transparent (`border-[#2e323b]/50`).
- **Gradients/Glows**: Subtle blur backgrounds to simulate neon glow, but keep it constrained. Avoid glassmorphism as a default.
- **Motion**: `ease-out` with exponential curves for hover effects. No bouncing.
