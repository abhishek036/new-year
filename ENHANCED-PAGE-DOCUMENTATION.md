# New Year 2026 Countdown - Enhanced Page Documentation

## Overview

**File**: `enhanced.html`  
**Title**: New Year 2026 | Entering The Future  
**Purpose**: An immersive, luxury countdown experience for New Year 2026 celebration.

---

## 🎨 Design System

### Color Palette (Jewel-Tone Theme)

| Variable | Color | Hex |
|----------|-------|-----|
| `--cyan` | Cyan | `#00D2FF` |
| `--gold` | Gold | `#FFD700` |
| `--amethyst` | Purple | `#A855F7` |
| `--rose` | Rose Pink | `#FF6B9D` |
| `--emerald` | Emerald | `#10B981` |

### Theme Support
- **Dark Mode** (default): Deep gradient background (`#0A0A0F` → `#0F0C29` → `#1A1A2E`)
- **Light Mode**: Clean light gradient (`#F8FAFC` → `#E2E8F0`)

### Typography
- **Primary Font**: `Outfit` (Sans-serif) - Used for UI and countdown
- **Display Font**: `Cormorant Garamond` (Serif) - Used for "Entering" and "2026" titles

---

## 📦 Page Components

### 1. Particles Background
```
#tsparticles
```
- Uses **tsParticles** library for floating particle effects
- Star-like particles with connecting lines
- Subtle movement for depth

### 2. Bokeh Background
```
.bokeh-layer > .bokeh-1 to .bokeh-5
```
- 5 animated soft-blur circles
- Colors: Cyan, Gold, Amethyst, Rose, Emerald
- Slow drift animation (40s cycle)
- Creates depth and ambient lighting

### 3. Decorative Framed Images
```
.floating-images-container > .image-frame#frame1, #frame2, #frame3
```

| Frame | Position | Style | Animation |
|-------|----------|-------|-----------|
| Frame 1 | Top-left (10%), rotated -8° | Scalloped pink border | Shake 5s |
| Frame 2 | Right side (8%), rotated 3° | Wavy cyan border with dashed inner | Shake 6s |
| Frame 3 | Bottom-left (5%), rotated -3° | Dashed golden + dotted green | Shake 5.5s |

### 4. Top Navigation Bar
```
.top-bar
```
- **Logo**: "NYE 2026"
- **Theme Toggle**: Switch dark/light mode
- **Sound Toggle**: Enable/disable tick sound
- Glass-morphism effect with backdrop blur

### 5. Hero Section
```
.hero
```
- Subtitle: "The countdown has begun"
- Title: **"ENTERING"** (large serif text, gradient)
- Year: **"2026"** (mega-sized gradient text)

### 6. Countdown Timer
```
.countdown-glass > .timer-grid
```
- **Days** | **Hours** | **Minutes** | **Seconds**
- Animated separator dots with pulse effect
- Glass-morphism container with animated border gradient
- Hover effects on each digit unit
- Pulse animation on second change

---

## ⚡ JavaScript Features

### Countdown Logic
```javascript
const TARGET_DATE = new Date('January 1, 2026 00:00:00').getTime();
```
- Real-time countdown calculation
- Auto-updates every second
- Celebration mode triggers at midnight

### Sound System
- Web Audio API for tick sounds
- Subtle sine wave beep (880Hz)
- User-controlled on/off toggle

### Theme Persistence
- Saves preference to `localStorage`
- Auto-loads saved theme on page load

### Particles Configuration
- Uses tsParticles with custom config
- Star mode with 80 particles
- Connection lines between nearby particles
- Parallax effect on mouse move

### Live Counter Animation
- Animated number counters (unused in current build)
- Smooth easing transitions

---

## 🎭 Animations

| Animation | Duration | Effect |
|-----------|----------|--------|
| `bokehDrift` | 40s | Soft movement of bokeh circles |
| `subtleShake1/2/3` | 5-6s | Gentle wobble on framed images |
| `borderGlow` | 6s | Rotating gradient on timer border |
| `pulseGlow` | 3s | Breathing glow behind timer |
| `shimmer` | 12s | Text shimmer on hero title |
| `sepPulse` | 1.5s | Pulsing separator dots |
| `digitPulse` | 0.4s | Pop effect when seconds change |

---

## 📱 Responsive Design

- **Fluid Typography**: Uses `clamp()` for all font sizes
- **Flexible Spacing**: CSS custom properties for consistent spacing
- **Mobile Optimized**: Timer wraps on small screens
- **Reduced Motion**: Respects `prefers-reduced-motion` media query

---

## 🔧 Performance Optimizations

1. **GPU Acceleration**
   - `transform: translateZ(0)` on animated elements
   - `will-change` property for key animations
   - `backface-visibility: hidden`

2. **Animation Throttling**
   - Pauses animations when tab is hidden
   - Uses `visibilitychange` event

3. **Efficient Renders**
   - CSS-only animations where possible
   - Minimal JavaScript DOM manipulation

---

## 📁 File Dependencies

| File | Purpose |
|------|---------|
| `image 1 (1).jpeg` | Top-left decorative image |
| `image 1 (2).jpeg` | Right side decorative image |
| `image 1 (3).jpeg` | Bottom-left decorative image |

### External Dependencies
- [Google Fonts](https://fonts.googleapis.com) - Outfit, Cormorant Garamond
- [tsParticles](https://cdn.jsdelivr.net/npm/tsparticles@2.12.0) - Particle effects library

---

## 🚀 Usage

### Local Development
```bash
python -m http.server 5000
# Open http://localhost:5000/enhanced.html
```

### Port Forwarding (Public Access)
```bash
ssh -R 80:localhost:5000 serveo.net
```

---

## 🎯 Key Features Summary

✅ Real-time countdown to Jan 1, 2026  
✅ Dark/Light theme toggle with persistence  
✅ Optional tick sound on each second  
✅ Animated particle background  
✅ Bokeh blur lighting effects  
✅ 3 decorative framed images with cute borders  
✅ Glass-morphism UI design  
✅ Responsive and mobile-friendly  
✅ GPU-accelerated animations  
✅ Accessibility features (ARIA labels)
