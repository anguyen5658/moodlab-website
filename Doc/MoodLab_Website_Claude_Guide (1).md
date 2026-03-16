# MOOD LAB WEBSITE — Claude Session Guide
## Paste this into any new Claude chat to continue website work
### Last updated: March 15, 2026

---

## CURRENT STATE

**File:** `moodlab-website-v52-updated.html` (in project files)  
**Size:** ~1430 lines, ~1908KB (includes base64 images)  
**Format:** Single-file HTML SPA — vanilla HTML/CSS/JS, no framework, no build step  
**Pages:** 16 total (Club page was removed, content distributed to Arena and Live)

---

## HOMEPAGE STRUCTURE (Current)

1. **Hero** — "Unlock a **new** era of **Experience.**" (`new` has pure CSS text-shadow glow in cyan). Sub: "Discover what your device can *really* do." Paragraph describes ML as intelligence builder with AI-powered firmware.
2. **Stat Cards** — 40+ Features / 20+ Modes / ∞ Builds / 7 Pipelines
3. **Marquee** — infinite scroll strip with key numbers
4. **Technology Pillars** — 5 colored gradient pillar cards with custom AI-generated images (all have base64 images)
5. **Web-App Platform** — 4-phone 3D carousel
6. **Responsible by Design** — Side-by-side comparison (Problems left | Shield divider center with animated effects | Solutions right), centered `max-width:960px`, animated pulse traveler
7. **Built-In Entertainment** — 2 image cards (Arena/Live) with custom AI images
8. **Partnership** — "Every business is different. So is our approach." 3 image cards (Brands/Factory/Venues) — still have generic base64 placeholder images needing replacement
9. **CTA** — "Ready to Unlock What's Possible?" with single ring (`ringGlow` 8s rotation), center glow pulse (`ctaPulse` 5s), floating orbs

---

## NAVIGATION (16 pages)

```
MOODLAB [logo] | Technology ▾ | Arena | Live | PoC ▾ | Partner ▾ | About | [Partner With Us]
                 ├─ Smart Control           ├─ Moodi Pro    ├─ For Brands
                 ├─ Usage Intelligence       └─ Fusiq Pro    ├─ For Factory
                 ├─ Authentication                           └─ For Venues
                 ├─ AI Engine
                 └─ Firmware Engine
```

**Page IDs:** `home | sc | ui | auth | ai | fw | arena | live | poc | moodi | fusiq | brand | factory | venue | about | contact`

---

## KEY DECISIONS (Locked — Do Not Change)

- **Hero messaging:** "Unlock a new era of Experience." + "Discover what your device can really do."
- **Club/Loyalty page:** REMOVED — content distributed to Arena and Live
- **Word "loyalty":** NEVER appears anywhere on the site
- **Referral system:** Omitted from website entirely (private conversations only)
- **Stat cards:** "20+ Modes", "7 Pipelines"
- **Partner section headline:** "Every business is different. So is our approach."
- **"new" word glow:** Pure CSS text-shadow (no box/background element)
- **CTA ring:** Single ring with `ringGlow` rotation, center `ctaPulse` breathing
- **Responsible section:** Side-by-side comparison with animated effects, centered max-width:960px, dotted circle REMOVED, apostrophes FIXED
- **All custom images:** Currently at `opacity:1` (tint removed for Steve to compare)
- **`--tx3` opacity:** Raised from .2 to .35 globally for text visibility
- **Button effects:** `.bp` shimmer sweep on hover, `.bs` cyan glow on hover
- **Paragraph text:** "inside smart devices — AI-powered" changed to "with AI-powered"

---

## DESIGN SYSTEM

### Colors (CSS Custom Properties)
```
--bg: #020205    --bg2: #060610    --bg3: #0a0a18
--cy: #00e8ff    --pu: #a855f7     --pk: #ec4899
--gn: #34d399    --am: #f59e0b
--tx: #eeeef3    --tx2: rgba(238,238,243,.5)    --tx3: rgba(238,238,243,.35)
--bd: rgba(255,255,255,.04)    --bd2: rgba(255,255,255,.08)
--gl: rgba(255,255,255,.02)
--e: cubic-bezier(.22,1,.36,1)
```

### Typography
- `Outfit` — body text, headings (200-900)
- `Instrument Serif` — italic display accents (`.se`)
- `Space Mono` — labels, tags, data (`var(--fm)`)

### Key Animations
`meshDrift`, `gridFade`, `phoneFloat`, `phoneEntry`, `shieldPulse`, `pulseDown`, `dotPulse`, `ringGlow`, `ctaPulse`, `barGrow`, `auroraRotate`, `pu` pulse, `fo1/fo2/fo3` floating orbs

### Reusable Components
| Class | Purpose |
|-------|---------|
| `.gc` | Glass card — subtle bg, gradient border, hover lift |
| `.fc` | Feature card — icon + h4 + p, hover translateY |
| `.img-card` | Image card — bg image with gradient overlay |
| `.phone` | Phone mockup 280×560px with notch |
| `.vid` | Video placeholder with play button |
| `.mq` / `.mq-i` | Marquee infinite scroll |
| `.vs` | VS Compare — 3-column (bad / VS / good) |
| `.rv` | Reveal on scroll (IntersectionObserver → `.v`) |
| `.tag` | Section label — mono uppercase |
| `.btn .bp` | Primary CTA — gradient + shimmer |
| `.btn .bs` | Secondary CTA — ghost + cyan glow |
| `.w` | Container — max-width 1400px |
| `.h1/.h2/.h3` | Heading sizes (clamp-responsive) |
| `.se` | Instrument Serif italic |
| `.grd` | Animated gradient text |

### Responsive System
- **3 Breakpoints:** 900px, 600px, 380px
- **Hamburger menu:** `toggleMob()`/`goMob()` — full-screen overlay at ≤600px
- **900px:** Hero stacks, phone scales, grids reduce, footer single col
- **600px:** Hamburger active, 4-phone horizontal scroll, Responsible stacks vertically, grids→1 col, stat cards 2×2
- **380px:** Tighter padding, smaller phones

---

## CUSTOM IMAGES EMBEDDED (base64)

| Image | Section | Slots | opacity |
|-------|---------|-------|---------|
| Mood Lab logo (PNG) | Nav + Footer | 2 | N/A |
| Smart Control (cyan-amber wave) | SC pillar + 3 inner pages | 4 | 1 |
| Firmware Engine (MCU chip macro) | FW pillar + inner page | 2 | 1 |
| AI Engine (7 mood orbs) | AI pillar | 1 | 1 |
| Usage Intelligence (purple holographic) | UI pillar + inner page | 2 | 1 |
| Authentication (green shield) | Auth pillar | 1 | 1 |
| Arena (golden arena stage) | Arena homepage + inner | 2 | 1 |
| Live (purple-orange puff wave) | Live homepage + inner | 2 | 1 |

**All at opacity:1** — Steve to decide final tint values.

---

## REMAINING WORK

### 1. Partnership Homepage Card Images (3 needed)
Currently have generic base64 placeholders. Ideogram prompts written (5 options each):

**For Brands** (line ~674, 4:3, 1200×900, bg `#0f172a→#1e293b`):
- BR-1 Premium Product Line ★ — 3 sleek devices in dark matte finishes with LED rings
- BR-2 Brand Ownership/Data — device connected by data streams to holographic dashboard
- BR-3 Standing Out ★ — one glowing device among rows of grey commodity devices
- BR-4 Full Stack — central device with orbiting holographic elements
- BR-5 Extract Deserves Better — abstract golden liquid flowing through smart architecture

**For Factory** (line ~675, 4:3, 1200×900, bg `#1a0a2e→#2d1b69`):
- FA-1 Manufacturing Meets Intelligence ★ — robotic arm placing glowing chip onto PCB
- FA-2 Hardware Upgrade — split before/after device transformation
- FA-3 Scale & Volume — birds-eye grid of devices on conveyor
- FA-4 Chip Integration ★ — extreme macro of BLE chip being soldered
- FA-5 Firmware Engine at Scale — central orb with threads to varied device silhouettes

**For Venues** (line ~676, 4:3, 1200×900, bg `#083344→#164e63`):
- VE-1 Intelligent Lounge ★ — dark upscale lounge with synced teal/purple LED devices
- VE-2 Group Sync — 4 devices on table with synchronized LED rings
- VE-3 LED Ambiance ★ — venue walls washed with aurora-like teal/purple gradients
- VE-4 Live Event — lounge with large screen, devices reacting to stream
- VE-5 Venue Analytics — floating holographic analytics dashboard above table

★ = Top picks. Full Ideogram prompts available — ask for them.

### 2. Remaining Unsplash/Placeholder Images (9 total)
All in Moodi Pro and Fusiq Pro inner pages:
- Line ~947: Moodi Pro Full Demo
- Line ~995: Moodi Pro Full Product Video
- Line ~1045: App Walkthrough
- Line ~1086: Fusiq Pro Social Experience Video
- Line ~1103: Fusiq App Interface
- Lines ~1111-1114: Fusiq Lifestyle Gallery (4 images)

Plus 2 Unsplash URLs in inner partnership pages:
- Line ~1232: Factory page — Firmware Engine Demo video placeholder
- Line ~1259: Venue page — Fusiq Venue Demo video placeholder

### 3. Other Pending
- Steve to decide final opacity values for each custom image (with vs without tint)
- Update Claude Guide to reflect future changes
- Mobile responsive testing on real devices
- Real product photos/videos for placeholder video slots
- Hover GIF animations strategy (CSS background-image swap desktop, autoplay on scroll mobile)

---

## CONTENT RULES — ZERO TOLERANCE

| Banned | Use Instead |
|--------|-------------|
| white-label | "branded" |
| community | "ecosystem," "experience" |
| loyalty / club | REMOVED entirely |
| NFC | "BLE on-device" |
| vape / vaporize / smoke / inhalation | "smart device," "device" |
| every partner / ALL users | "your users," "your customers" |
| gateway / network effect | Removed |
| Cali Clear / partner names | Never mention |
| referral | Private conversation only |
| companion app | "web-app" |
| cdn-cgi / cloudflare | All removed |

### "Puff" Rules
- **KEEP** for feature names: Puff Presence, Puff Wave, Puff Counting, Rhythm Puff, Dry Puff
- **KEEP** inside Live/Arena feature descriptions
- **REMOVE** from headlines, hero text, CTAs, section headers

### Responsible Technology
Medium-prominence. Frame: "Most devices = zero control. We built technology that makes devices safer." Key features: Precision Dosage, mg/ml Tracking, Child-Lock, Session Limits, Overuse Detection, Damage Prevention.

### Universal vs Exclusive
Arena, Live are universal. Smart Control, Firmware, App, Usage Intel, Auth are partner-branded. **NEVER reveal this on the website.** Frame everything as benefiting "YOUR brand."

---

## PARTNER PERCEPTION MANAGEMENT

The primary client must NEVER feel:
1. Their customers are being shared with other brands
2. They're getting a generic/shared platform
3. Another partner benefits from their user base

Every piece of copy should make them think: "This makes MY device better, MY customers stickier, MY revenue higher."

---

## VERIFICATION COMMANDS

```bash
# Safety word scan (all should be 0)
for w in "white.label" "community" "loyalty" "nfc" "inhalation" "universal" "every partner" "ALL user" "gateway" "network effect" "cali.clear" "cdn-cgi" "cloudflare"; do echo "$w: $(grep -ic "$w" moodlab-website-v52-updated.html)"; done

# Page count (should be 16)
grep -c 'id="p-' moodlab-website-v52-updated.html

# Remaining Unsplash images
grep -c 'unsplash.com' moodlab-website-v52-updated.html

# File integrity
tail -1 moodlab-website-v52-updated.html  # should be </html>
```

---

## RECURRING BUG WARNING

Cloudflare email-decode scripts (`cdn-cgi/l/email-protection`) keep resurfacing after large edits. Always verify and remove after any big str_replace. File can truncate during large replacements — always verify `tail -1` shows `</html>` and run `node --check` on extracted JS.

---

## KEY NUMBERS

- 40+ smart features | 20+ control modes | 5 technology pillars
- 18 Arena games | 7 AI Mood Presets | 7 data pipelines
- 26+ Firmware Engine modules | ∞ unlimited builds
