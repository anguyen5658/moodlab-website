# MOOD LAB WEBSITE — Claude Session Guide
## Paste this into any new Claude chat to continue website work
### Last updated: March 2026

---

## CURRENT STATE

**File:** `moodlab-website-v2-final.jsx`
**Format:** Single JSX React artifact, 749 lines, 17 pages
**Stack:** React 18 + useState routing + inline styles
**Fonts:** Outfit (body 300-900) + Instrument Serif (italic accents) + Space Mono (labels/tags)
**Theme:** Dark mode only. Background #020205. No light mode.

### Design DNA (v2-final)

The design went through 4 versions. v2 was selected as the best balance of structure and richness, then received comprehensive upgrades from v3/v4:

- **Shimmer cards** — gradient border via CSS mask compositing + sweep animation on hover
- **Sparkline stat cards** — large number + colored dot + mini bar chart
- **ShowcaseCard** — immersive tall cards for ecosystem (Arena/Live/Club) with layered gradient bg, animated glow orb, decorative rings
- **Phone mockups** — with radial glow ring behind device
- **ExplodedDevice** — animated component parts with glow line at base
- **PillarSlider** — tabbed interface with detail card + SVG progress ring
- **Responsible by Design** — problem/solution side-by-side layout
- **MeshBackground** — floating orbs (cyan/purple/pink) + grid + noise SVG

---

## 17 PAGES

```
Nav: MOODLAB | Technology ▾ | Arena | Live | Club | Proof of Concept ▾ | Partner ▾ | About | [Partner With Us]
         ├─ Smart Control                          ├─ Moodi Pro         ├─ For Brands
         ├─ Usage Intelligence                     └─ Fusiq Pro         ├─ For Factory
         ├─ Authentication                                              └─ For Venues
         ├─ AI Engine
         └─ Firmware Engine
```

1. HOME — hero + stats + pillar slider + phones + responsible tech + ecosystem + partners + CTA
2. Smart Control — slider (6 slides) + app interface + phone
3. Usage Intelligence — 4 features + video + phone
4. Authentication — 4 features
5. AI Engine — 7 mood presets + 7 pipelines + 5 features
6. Firmware Engine — 4-step wizard + capability pills + video
7. Arena (Coming Soon) — video + 9 games + 4 input methods + Club link
8. Live (Coming Soon) — 7 deep sections (killer features, explore, watch, social, host, creator, arena×live)
9. Club — value prop + 3 business benefits + 5 tiers + 8 features + phone + partner value
10. Proof of Concept — 2 product cards + exploded device
11. Moodi Pro — video + triple cart + AI heating + 6 expert modes + 4 material cards
12. Fusiq Pro — video + 6 features + smart cartridges + phone
13. For Brands — 3 problems + we are/aren't + comparison + 6 deliverables + economics
14. For Factory — 2 device types + 3 economics + comparison + 50=1 highlight
15. For Venues — 6 features + Fusiq highlight
16. About — story + 3 stats + quote
17. Partner With Us — form + 4-step process

---

## REUSABLE COMPONENTS

| Component | Purpose |
|-----------|---------|
| `Card` | Glassmorphism card with gradient border, shimmer hover, glow option |
| `FC` (FeatureCard) | Icon + title + desc + optional tag. Wraps Card |
| `ShowcaseCard` | Tall immersive card with bg layers, glow orb, decorative ring, bottom content |
| `StatCard` | Large number + colored dot label + sparkline bar chart |
| `PillarSlider` | 5-tab strip + detail card with SVG progress ring. Separate component for hooks |
| `Phone` | Phone mockup with notch, glow ring, screen content placeholder |
| `PhoneCarousel` | 3 phones with perspective rotation |
| `ExplodedDevice` | 7 animated device parts with glow line at base |
| `VideoSlot` | 16:9 video placeholder with play button + file labels |
| `Slider` | Image slider with arrows + dots |
| `Marquee` | Infinite horizontal scroll strip |
| `ComingSoon` | Amber dashed border banner |
| `Compare` | Without vs With 2-column comparison |
| `R` (Reveal) | IntersectionObserver scroll-triggered animation |
| `Hero` | Page hero section with label, title, accent, sub |
| `CTA` | Call-to-action section with radial glow |
| `MeshBG` | Fixed background with floating orbs + grid + noise |
| `Tag` | Small pill label |
| `SL` (SectionLabel) | Mono uppercase label with accent line |
| `Box` | Container with max-width (narrow/default/wide) |
| `Grid` | CSS grid helper |

---

## CONTENT RULES (CRITICAL — NEVER VIOLATE)

### Banned Words/Concepts — ZERO TOLERANCE

| Word/Phrase | Why | Use Instead |
|-------------|-----|-------------|
| **white-label** | Reveals branding strategy prematurely | "branded," "your brand" |
| **community** | Makes client feel their users are being pooled | "ecosystem," "experience," "platform" |
| **loyalty** | Raises "loyal to whom?" threat | "Club" (always) |
| **NFC** | Auth is BLE only | "BLE on-device" |
| **vape / vaporize / vaporizer** | Negative public association | "smart device," "connected device," "device" |
| **smoke / smoking** | Harmful association | Never use |
| **inhalation** (in public copy) | Links to substance use | "connected devices," "smart devices" |
| **every partner / all partners** | Makes client feel non-exclusive | Focus on "your brand," "your device" |
| **ALL users / ALL devices** | Pooling threat | "your users," "your customers" |
| **universal** (in ecosystem context) | Sharing threat | "engagement ecosystem" |
| **gateway** | Implies shared infrastructure | Remove |
| **network effect** | Implies other partners benefit from their users | "retention engine," "engagement driver" |
| **your logo / your colors** | Reveals customization = shared platform | Focus on capability descriptions |
| **Cali Clear / any partner name** | Confidentiality | "Leading distributor," "Global manufacturer" |
| **World Cup** | Partner-specific event | Never mention |

### "Puff" Rules

- **KEEP** for feature names: Puff Presence, Puff Wave, Puff Counting, Rhythm Puff, Dry Puff
- **KEEP** inside Live/Arena feature descriptions (puff bubbles, etc.)
- **REMOVE** from all headlines, hero text, CTAs, section headers
- **Replace in general copy** with: "draw," "session," "interaction," "device input"

### Engagement/Retention Language Rules

| Context | OK to Use | Avoid |
|---------|-----------|-------|
| Homepage heroes, public headlines | Games, streams, rewards, fun, experience, play, discover, next level | Engagement, retention, sticky |
| Arena/Live/Club hero text | Entertainment, new format, device-powered | Engagement layer, retention engine |
| For Brands / Factory / partner pages | Engagement, retention, daily usage, cartridge sales — all OK | — |

### Responsible Technology Angle

This is a **medium-prominence** positioning:
- Dedicated section on homepage (problem/solution format)
- Woven into Smart Control, About, For Brands pages
- Frame: "Most devices = zero control. We built technology that makes devices safer, more precise, and more controlled."
- Key features: Precision Dosage, mg/ml Tracking, Child-Lock, Session Limits, Overuse Detection, Damage Prevention
- Closing message: "less harmful, more control, the responsible choice"

### Universal vs Exclusive Framing

**Strategic reality:** Arena, Live, Club are universal (not white-label). Smart Control, Firmware, App branding, Usage Intel, Auth are partner-branded.

**Website rule:** NEVER reveal the universal/white-label distinction. Instead:
- Frame Arena/Live/Club as "making YOUR device stickier" and "YOUR users more engaged"
- Frame benefits as: more sessions → more cartridge sales → more revenue FOR YOU
- Never mention other partners, shared pools, or universal access
- Only disclose the universal policy in private partnership conversations when safe

---

## DESIGN SYSTEM

### Colors
```
bg: #020205          card: #0a0a10
cyan: #00e8ff        purple: #a855f7       pink: #ec4899
green: #34d399       amber: #f59e0b
text: #eeeef3        textMid: rgba(238,238,243,.5)    textDim: rgba(238,238,243,.22)
border: rgba(255,255,255,.04)    borderMed: rgba(255,255,255,.08)
```

### Typography
- `Outfit` — body text, headings (300-900)
- `Instrument Serif` — italic display accents (class: `.serif-i`)
- `Space Mono` — labels, tags, data (class: `.mono`)
- `.grad-text` — cyan→purple→pink gradient text

### Effects
- Floating orbs with blur(120px) — 3 colors, different animation speeds
- Grid overlay with pulse animation
- SVG noise texture at 1.8% opacity
- Shimmer sweep on card hover
- Gradient border via CSS mask compositing
- Scroll-triggered reveal (IntersectionObserver)

### Tagline
"We Build the Intelligence. You Build the Brand."

### Branding
Always "Mood Lab Technology" — NEVER "ML+" or "Mood Lab+"

---

## HOMEPAGE STRUCTURE (Current)

1. **Hero** — B2B tag + massive title + sub + 2 CTAs + ExplodedDevice (right)
2. **Stat Cards** — 4 sparkline cards (40+ Features, 5 Pillars, ∞ Builds, <2s Compile)
3. **Marquee** — 8 items infinite scroll
4. **Technology Pillars** — PillarSlider (tabbed, with progress ring)
5. **Web-App Platform** — heading + PhoneCarousel (3 phones perspective)
6. **Responsible by Design** — problem statement + side-by-side problem❌/solution✓ cards + bottom line
7. **Engagement Ecosystem** — "Games. Streams. Rewards. Experience elevated." + 3 ShowcaseCards (Arena/Live/Club)
8. **Partnership Models** — 3 rich cards with accent line, icon, desc, feature chips, CTA
9. **CTA** — "Ready to Make Your Devices Intelligent?"

---

## PARTNER PERCEPTION MANAGEMENT

The primary client (unnamed California distributor) must NEVER feel:
1. Their customers are being shared with other brands
2. They're getting a generic/shared platform
3. Another partner benefits from their user base
4. They're not special or exclusive

Every piece of copy should make them think: "This makes MY device better, MY customers stickier, MY revenue higher."

The "Responsible by Design" angle is strategically important because:
- Differentiates from all competitors (nobody else has firmware-level safety)
- Positions the brand positively amid negative industry press
- Provides regulatory preparation narrative
- Makes B2B partners feel they're choosing "the responsible option"

---

## KEY NUMBERS (use throughout)

- 40+ smart features (full ecosystem)
- 31+ Smart Control features (6 groups)
- 5 technology pillars
- 18 Arena games (8 Play + 4 Show + 6 Predict)
- 7 AI Mood Presets
- 7 data pipelines
- 26+ feature modules in Firmware Engine
- 4 device input methods
- Club membership tiers: Bronze (1×) → Silver (1.5×) → Gold (2×) → Diamond (3×) → Legend (5×)
- 14 badges
- <2s firmware compile time
- ∞ unlimited builds

---

## WHEN MAKING CHANGES

1. Always run safety scan after edits:
```
grep -ic "white.label\|community\|loyalty\|nfc\|vape\|vaporiz\|smoke\|inhalation\|every partner\|ALL user\|ALL partner\|gateway\|universal ecosystem\|your logo\|your colors\|cali.clear" filename.jsx
```
All results should be 0.

2. Check puff usage — should only appear in feature name contexts:
```
grep -in "puff" filename.jsx | grep -ivE "Puff Presence|Puff Wave|Puff Counting|Rhythm Puff|Dry Puff|puff bubble|puffs happen"
```
No results = clean.

3. Verify page count:
```
grep -oP '"[^"]+":\s*\w+Page' filename.jsx | wc -l
```
Should be 17.

4. Never use `useState` inside `.map()` — extract to a separate component
5. Keep the v2 structure (clean, organized, not over-designed)
6. When in doubt about language, choose the version that makes the client feel exclusive and empowered, not threatened
