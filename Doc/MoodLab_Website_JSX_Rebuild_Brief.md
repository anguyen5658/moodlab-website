# MOOD LAB WEBSITE — JSX REBUILD BRIEF
## Paste this entire document into a fresh Claude chat to build the full website

---

## TASK
Build a stunning, award-winning multi-page SPA website for Mood Lab as a single JSX React artifact. 16 separate pages, all clickable routing, rich content, image/video placeholders with specific filenames, phone mockups, sliders, exploded device views, and cinematic effects. This is a B2B website — zero consumer elements.

**Output:** Single .jsx file, React functional component with useState for routing, Tailwind-style inline CSS, all 16 pages with full rich content.

---

## NAVIGATION STRUCTURE (LOCKED)

```
MOODLAB | Technology ▾ | Arena | Live | Proof of Concept ▾ | Partner ▾ | About | [Partner With Us]
            ├─ Smart Control                    ├─ Moodi Pro         ├─ For Brands
            ├─ Usage Intelligence               └─ Fusiq Pro         ├─ For Factory
            ├─ Authentication                                        └─ For Venues
            ├─ AI Engine
            └─ Firmware Engine
```

**16 Pages:**
1. HOME (landing page)
2. Smart Control (tech sub-page)
3. Usage Intelligence (tech sub-page)
4. Authentication (tech sub-page)
5. AI Engine (tech sub-page)
6. Firmware Engine (tech sub-page)
7. Arena (full page, Coming Soon)
8. Live (full page, Coming Soon)
9. Proof of Concept (overview with links to Moodi + Fusiq)
10. Moodi Pro (product sub-page)
11. Fusiq Pro (product sub-page)
12. For Brands (partner sub-page)
13. For Factory (partner sub-page)
14. For Venues (partner sub-page)
15. About
16. Partner With Us (form page)

**Proof of Concept:** Clicking the tab name itself goes to overview. Dropdown only shows Moodi Pro + Fusiq Pro.

---

## DESIGN SYSTEM (LOCKED)

**Theme:** Dark mode ONLY. Background #020205. No light mode toggle.
**Colors:**
- Cyan: #00e8ff (primary accent)
- Purple: #a855f7
- Pink: #ec4899
- Green: #34d399
- Amber: #f59e0b (Coming Soon elements)
- Text: #eeeef3 / rgba(238,238,243,.5) / rgba(238,238,243,.2)
- Borders: rgba(255,255,255,.04) / rgba(255,255,255,.08)

**Fonts:** Outfit (body, 300-900) + Instrument Serif (display italic accents) + Space Mono (labels/tags)

**Effects required:**
- Animated mesh gradient backgrounds (radial gradients drifting, rotating)
- Subtle grid line overlay on hero sections (fading in/out)
- Floating orbs (3 colors, blur 120px, different animation cycles)
- Noise texture overlay (SVG filter, opacity 0.02)
- Glassmorphism cards (blur backdrop, gradient shimmer borders)
- Scroll-triggered reveal animations (translateY + opacity)
- Staggered delays on child elements
- Marquee ticker strips (infinite scroll, pause on hover)
- Animated number counters
- Exploded device view (CSS transforms, triggered on page enter)
- Phone mockups with notch (280×560px, rounded 40px, 3px border)
- Phone carousel (3 phones, perspective rotated, center one larger)
- Image sliders with dots + arrows (prev/next navigation)
- "Image text box" style: gradient overlay boxes with text over image placeholders
- Coming Soon elements: dashed amber borders, amber text

**Tagline:** "We Build the Intelligence. You Build the Brand."
**Branding:** Always "Mood Lab Technology" — NEVER "ML+" or "Mood Lab+"

---

## CONTENT RULES

1. **NO specific pricing** — use generic language like "minimal per-device cost," "flexible volume-based tiers," "discuss in partnership call"
2. **NO World Cup references** — this is a partner-specific event, protect the relationship
3. **POSITIVE tone only** — no "banned on TikTok," "demonetized," "safe haven." Instead focus on benefits: "dedicated community platform," "device-verified engagement," "where community comes alive"
4. **NO NFC** anywhere — authentication is BLE on-device only
5. **NO consumer language** — pure B2B positioning
6. **NO partner names** — use "Leading California distributor," "Global hardware manufacturer"

---

## PAGE-BY-PAGE CONTENT

### PAGE 1: HOME (Landing Page)

**Hero Section:**
- Tag: "B2B Smart Device Platform" with pulsing dot
- Headline: "We Build the Intelligence. You Build the Brand." (Intelligence = cyan glow, "the Brand." = serif italic)
- Sub: "Firmware engine, companion app, cloud analytics — the complete smart technology stack for inhalation devices. 40+ features across 5 technology pillars. Ready to integrate."
- 2 CTAs: "Partner With Us →" (white solid) + "Explore Technology" (ghost)
- Stats row: 40+ Features | 5 Pillars | ∞ Builds | <2s Compile
- RIGHT SIDE: Exploded device view (Moodi Pro) — auto-triggers 1.2s after page load
  - Components: mouthpiece, body, OLED screen, 3 cartridges (cyan/purple/pink), bottom housing, battery, USB
  - Labels appear when exploded: Hypoallergenic, OLED + Visual Sync, Triple Cartridge, Mood Logic™ AI, BLE 5.0 + OTA
- Animated background: mesh gradient + grid lines + 3 floating orbs

**Marquee Strip:**
- Items: 40+ Smart Features · 5 Tech Pillars · 18 Arena Games · ∞ Firmware Builds · <2s Compile · 7 AI Mood Presets · BLE 5.0 Auth On-Device · mg/ml Extract Tracking
- Duplicated for seamless loop, 35s animation

**5 Technology Pillar Cards** (clickable → navigate to sub-pages):
1. 🎯 Smart Control — "31+ features · 6 groups"
2. 📊 Usage Intelligence — "mg/ml · Analytics"
3. 🔐 Authentication — "BLE on-device"
4. 🧠 AI Engine — "Mood Logic™"
5. ⚡ Firmware Engine — "∞ builds · <2s"

**Phone App Carousel:**
- 3 phone mockups: Control Tab | Arena Tab | Live Tab
- Perspective rotation: side phones rotateY(15deg) scale(.88) opacity(.6), center scale(1)
- Label: "Companion App Experience" + "White-label app platform with 4 core tabs"
- Media files: app_all_1.png, game screenshots, live tab screenshots

**Arena + Live Preview Cards** (2 columns):
- Arena: "18 Games. Leaderboards, coins, daily challenges." — dashed amber border, Coming Soon tag
- Live: "Community Streaming. Device-verified Puff Presence." — dashed amber border, Coming Soon tag

**Partner Triptych** (3 flush cards, no gap):
1. 🧪 For Brands — "Launch smart devices. Own customer data."
2. 🏭 For Factory — "Add smart features. Premium positioning."
3. 🏢 For Venues — "Intelligent venue experiences."

**CTA Section:**
- "Ready to Make Your Devices Intelligent?"
- Radial gradient glow background

---

### PAGE 2: SMART CONTROL

**Hero:** "Smart Control — 6 Feature Groups. 31+ Features."
**Sub:** "From Quick Heat to Precision Curves — every mode runs through Mood Logic™ AI Engine. Per-tank independent control."

**Image Slider** (6 slides with prev/next arrows + dots):
1. 🔥 Quick Heat Control — OFF → Chill → Medium → Intense. Per-tank. AI optimizes behind scenes.
2. 📐 Precision Heat Control — X-Y voltage graph per second. Full manual, zero AI. App-exclusive. [APP tag]
3. ⚡ Pro Modes — Beast · Eco · Balance · Microdose. One-tap device behavior change.
4. 🧬 Entourage Mode — CBD:THC ratio slider (10-90%). True Hybrid: Sativa + Indica blend. Category-first.
5. 🎭 Mood Modes — 7 AI Presets: Relax · Focus · Energy · Sleep · Social · Creative · Recovery. [AI tag]
6. 🛠️ Pro Tools — Pre-Heat · Last Drop · Flavor Fusion · Extract Fusion · Jet-Lag · Damage Prevention.

**App Interface section** (2 columns: text left + phone mockup right):
- "Every Smart Control feature accessible through the app. Per-tank heat adjustment, mode selection, blend ratios, mood presets — all with real-time Visual Sync."
- Video placeholder: "Smart Control Demo" — advanced-3.png, advanced-5.png, prebuilt-1.png
- Phone showing Control Tab

**Key principle (from Smart Control Guideline v1):**
- "Smart" is not a feature tier — it's the DNA of the entire system
- Even "Chill" in Quick Heat has AI optimizing voltage based on extract type, battery level, session history
- On-Device First — app is extension, not requirement
- Visual Sync — device screen and app always match

---

### PAGE 3: USAGE INTELLIGENCE

**Hero:** "Usage Intelligence — Know Your Customers."
**Sub:** "Turn device data into business decisions. Track consumption patterns, identify preferences, understand behavior at scale."

**4 Feature Cards (2×2 grid):**
1. 📊 Puff Counting — Per-session, daily, weekly metrics. Core analytics foundation.
2. ⚠️ Blinker Detection — Identifies excessively long/strong draws. Safety + data quality.
3. 🧪 Extract Consumption (mg/ml) [UNIQUE tag, gradient border] — Software-only estimation. No extra hardware. Accuracy improves via AI. Both mg and ml.
4. 📈 Mode & Session Analytics — Which modes used most, timing, behavioral patterns for BI dashboard.

**Video + Phone layout:**
- Dashboard demo video placeholder
- Phone showing Stats Tab

---

### PAGE 4: AUTHENTICATION

**Hero:** "Authentication — Verify Every Device."
**Sub:** "BLE-based on-device authentication. No NFC chips — verification via Bluetooth handshake. Anti-counterfeit protection built into every connection."

**4 Feature Cards:**
1. 🔐 BLE On-Device Auth — No additional chips required
2. 🛡️ Anti-Counterfeit — Unique device identity, consumer verification via app
3. 📱 Component Tracking — Cartridges, batteries, accessories. Supply chain visibility.
4. ✅ Compliance Ready — Verification = traceable supply chain. Regulation-ready.

---

### PAGE 5: AI ENGINE

**Hero:** "Mood Logic™ AI Engine."
**Sub:** "7 data pipelines process in real-time. User selects a feeling — AI translates emotion into precise technical configuration."

**7 Mood Preset Cards** (horizontal row):
😌 Relax | 🎯 Focus | ⚡ Energy | 🌙 Sleep | 🎉 Social | 🎨 Creative | 💚 Recovery

**7 Data Pipelines:** Extract type, product profile, user behavior, device condition, session history, environmental conditions, feedback loops

**5 Feature Cards:**
1. 🧠 7 Data Pipelines — Real-time context analysis
2. 🎭 7 Mood Presets — User selects feeling, AI handles config
3. 📚 Adaptive Learning — Personal profile builds over time
4. 💡 Product Suggestions — Cross-sell, upsell based on preferences
5. 🤖 Mood Assistant — Mixing tips, dosage optimization, tutorials

---

### PAGE 6: FIRMWARE ENGINE

**Hero:** "Firmware Engine — Unlimited Builds. <2s Compile."
**Sub:** "50 products = 50 firmware builds = nightmare. 4-step wizard handles all variations. No caps, no extra costs, forever."

**4-Step Wizard Cards:**
1. 📦 Device & Tanks — Type (Disposable/Cartridge), Tank Count (1-5), Form Factor
2. 🔧 Hardware — Screen layout, Button config, LED setup, Battery parameters
3. 🧪 Extract Config — Per-tank: THC/CBD/Flavor, Strain (Sativa/Indica/Hybrid), Method (Distillate/Live Resin/Liquid Diamond/Live Rosin), Concentration %
4. ⚙️ 26+ Feature Modules — Select, toggle, deploy. Core safety auto-included.

**Product Model Concept:** 10 flavors = 1 firmware, 10 extract configs. Zero re-development.

**6 Capability Pills:** Config-Driven | AI-Optimized | OTA Ready | Safety Built-in | <2s Compile | ∞ Unlimited

**Video placeholder:** "Firmware Engine Interactive Demo" — ml-firmware-v10.jsx

**Update vs Create:** Update = locks Device+Hardware, only edit Extract+Features. Create New = clones existing, unlocks all steps.

---

### PAGE 7: ARENA (Coming Soon)

**Coming Soon Banner:** amber dashed border
**Hero:** "Your Device is a Game Controller."
**Sub:** "Every game requires physical device interaction — Puff, Dry Puff, or Button. Device-native entertainment driving engagement and retention."

**Video placeholder:** Arena gameplay showcase

**9 Game Cards** (3×3 grid, color-coded categories):
PLAY (cyan): ⚽ Final Kick, 💣 Hot Potato, 🤠 Wild West Duel, 🎈 Balloon Pop, 🎵 Rhythm Puff
SHOW (purple): 🧠 Vibe Check, 🎡 Spin & Win
PREDICT (pink): 🏆 Bracket Challenge, 📅 Daily Picks
+9 more listed as text: Russian Roulette, Puff Pong, Tug of War, Higher or Lower, The Price is Puff, Match/Score/MVP Predictor, Game Show Predictor

**4 Device Input Methods:**
💨 Puff (real inhale, verified) | 🌬️ Dry Puff (motion only) | 🔘 Button (physical press) | 👆 On-Screen (supplementary)

**Loyalty System mention:** 5-tier Bronze→Legend, 14 badges, Virtual Shop, Battle Pass

---

### PAGE 8: LIVE (Coming Soon)

**Coming Soon Banner:** amber dashed
**Hero:** "The Streaming Platform Where Community Comes Alive."
**Sub:** "A dedicated streaming platform built around the device experience. Creators share sessions, audiences participate with real puffs, every interaction is device-verified."

**POSITIVE TONE — focus on community, fun, device experience. NO "banned/demonetized/safe haven" language.**

**Video placeholder:** Live streaming experience

**2 Killer Feature Cards** (gradient borders):
1. 💨 Puff Presence (cyan gradient) — Connected devices appear as bubbles in stream. Device-verified — cannot be faked. Tangible proof of real community engagement.
2. 🌊 Puff Wave (purple gradient) — Collective real-time puff counter. Shared moments. Content format that doesn't exist anywhere else.

**6 Feature Cards:**
1. 🔍 Explore & Discover — Hero slider, Live Now feed, Creator Spotlight, AI recommendations, categories
2. 📹 Watch Experience — Camera + Avatar modes. Chat overlay. Immersive.
3. 🎙️ Host Suite (Paid) — Stream setup, co-host (4 max), in-stream games, analytics
4. 🏅 Creator Program — Creator tiers, built-in monetization, referral rewards, audience growth
5. ⚽ Event Watch Parties — Live event rooms, group viewing, real-time reactions
6. 🎮 Arena × Live — Game show livestreams, tournament spectating, halftime games

---

### PAGE 9: PROOF OF CONCEPT

**Hero (centered):** "Built to Prove. Ready to Build Yours."
**Sub:** "Every feature is real. Every demo is interactive. This is the technology we build for your brand."

**2 Product Cards** (clickable → navigate to Moodi/Fusiq sub-pages):
- Moodi Pro: video placeholder + tags + "View Full Details →"
- Fusiq Pro: video placeholder + tags + "View Full Details →"

**Exploded device view** (second instance, auto-triggers)

**CTA:** "Like what you see? Let's build your version."

---

### PAGE 10: MOODI PRO (Rich product page)

**Hero:** "Moodi Pro — World-First Multi-Cartridge Smart Device."

**Content sections (from Moodi Best Features document):**

1. **Hero Video** — moodi_short_1080.mp4, bg_hero.mp4, first_modular.mp4

2. **Triple Cartridge Magic** (2 columns: text + video)
   - 3-cartridge modular system: THC, CBD, Flavor, Terpenes
   - Mix & Match 1, 2, or 3 cartridges
   - Auto-recognizes setup, optimizes delivery
   - Features: Triple-Slot Magic, Universal Compatibility, Magic Swap, Extract Fusion

3. **AI Precision Heating** (2 columns: video + text)
   - Independent heat per cartridge: Chill / Medium / Intense
   - AI prevents overburn, maximizes efficiency
   - Features: Adaptive AI Logic, On-Device Quick Control, Multi-Zone Heating, Power Efficiency

4. **Expert Modes** (6 cards in a row)
   - 🚀 Rocket | 💧 Last-Drop | 🌿 CBD:THC Entourage | 🔄 True Hybrid | ✨ Microdose | 🌙 Jet-Lag

5. **App Control** (phone mockup + text + video)
   - Session concierge: auto-detects cartridges, logs usage, AI suggestions, custom Mood Recipes
   - Media: app_all_1.png, presonnalized-1 through -5.png

6. **Inside Moodi Pro** (exploded device view + material cards)
   - 🎨 Three Colorways: Silver, Gold, Black & Gold
   - ⚗️ Premium Materials: Stainless steel + reinforced glass
   - 🫁 Wellness Mouthpiece: Hypoallergenic + replaceable filter
   - ✅ Lab Tested: Third-party quality assurance

7. **Lifestyle Gallery** — 4 image placeholders: lifestyle1-4.png

8. **CTA:** "This is the technology we can build for your brand."

---

### PAGE 11: FUSIQ PRO (Rich product page)

**Hero:** "Fusiq Pro — Better Together, Everywhere."

**Content (from Fusiq Best Features + Company Overview):**

1. **Hero Video** — mainpage_explore_fusiq.mp4 (multiple angles)

2. **6 Feature Cards:**
   - 👥 Group Synchronization — Sync across devices, shared experience
   - 💡 LED & Ambiance Control — 18 LEDs respond to sound, heat, movement. Color themes.
   - 🫧 Shisha-Compatible — Charcoal-free precision heating, indoor venues
   - 🧪 CBD + Flavor Fusion — Blend extracts, real-time ratio control
   - 📊 Group Analytics — Session data, venue insights, peak hours
   - 🎮 Arena-Ready — Group games, puff-based entertainment

3. **Smart Cartridges** — Built-in chip: auto recognition + authentication

4. **Companion App** (phone mockup + video)

5. **Lifestyle Gallery** — 4 image placeholders

6. **CTA:** "This is the technology we can build for your venue."

---

### PAGE 12: FOR BRANDS (Rich partner page)

**Hero:** "Your Extract Deserves Better Than Commodity Hardware."

**Content sections:**

1. **3 Problem Cards:**
   - 💸 Commodity Race — Premium extract in indistinguishable hardware
   - 👻 Anonymous Customers — Zero data on usage, switching, preferences
   - 🏗️ Build vs. Buy — Years of R&D and millions in investment

2. **We ARE / We Are NOT** (2-column green/red):
   - ✓ Technology & Software Company, AI & Firmware Developers, App & Platform Builders, Experience Designers, Your Technology Partner
   - ✕ Hardware Manufacturer, Device Producer, Your Competitor, Replacing Your Products, Building Our Own Devices

3. **Without vs. With** comparison table

4. **What You Get** (6 cards):
   - Custom Firmware, Branded App Platform, Analytics Dashboard, Engagement Engine (Arena+Live+Loyalty), Brand Protection (BLE auth), OTA Updates

5. **Economics teaser** (NO specific prices):
   - "Minimal per-device cost. Maximum per-device value. Discuss specifics in partnership call."

---

### PAGE 13: FOR FACTORY (Rich partner page)

**Hero:** "You Build Great Hardware. We Make It Intelligent."

**Content sections:**

1. **Device Compatibility** (2 cards):
   - 📦 Disposable Devices — 1-5 tanks, fixed config at manufacturing
   - 🔄 Cartridge/Pod Systems — Reusable, user configures

2. **Integration Economics** (NO specific prices):
   - 3 columns: Hardware (Minimal) | Software (Flexible) | ROI (Premium)
   - "Discuss specific pricing in partnership call"

3. **Without vs. With** comparison

4. **Firmware Engine highlight** — "50 models = 1 Engine" with video placeholder

---

### PAGE 14: FOR VENUES

**Hero:** "Transform Your Space Into an Intelligent Experience."

**6 Feature Cards + Fusiq highlight with video**

---

### PAGE 15: ABOUT

**Hero:** "From Product to Platform."
**Story:** Started with belief that inhalation should be intentional. Evolved from device company to technology platform. Small focused team in Hanoi, business ops in US.

---

### PAGE 16: PARTNER WITH US (Form)

**Form fields:** Type dropdown, Company Name, Contact Name, Email, Message textarea, Source
**"What Happens Next?"** 4 steps: Review → Intro Call → Custom Proposal → Pilot Program

---

## MEDIA ASSET LIBRARY (Real filenames for placeholders)

**Videos:**
- bg_smoke.mp4, bg_hero.mp4, first_modular.mp4
- moodi_short_1080.mp4
- mainpage_explore_fusiq.mp4 (+ angles 1,2,3)
- arena_gameplay.mp4
- live_demo.mp4, puff_presence_demo.mp4

**Product Images:**
- Moodi.png, modular_bg.png, solid_bg.png
- tripleslot_1.png, cart1.png, cart2.png, cart3.png
- battery.png, mouth.png
- fusiq_head.png

**App Screenshots:**
- app_all_1.png
- advanced-2.png through advanced-5.png
- prebuilt-1.png through prebuilt-7.png
- presonnalized-1.png through presonnalized-5.png
- effect_icon_list.png

**Lifestyle:**
- lifestyle1.png through lifestyle4.png

**Fruit/Extract:**
- Fruit.png, fruit1-4.png

---

## VISUAL COMPONENTS TO BUILD

1. **ExplodedDevice** — Reusable component, toggle `exploded` state
2. **PhoneMockup** — Reusable, accepts screen content
3. **PhoneCarousel** — 3 phones with perspective
4. **ImageSlider** — Dots + arrows, configurable slides
5. **VideoSlot** — Reusable video placeholder with play button + label + files
6. **ImageTextBox** — Gradient overlay box with text positioned over image placeholder
7. **GlassCard** — Glassmorphism with shimmer border
8. **FeatureCard** — Icon + title + description + optional tag
9. **MarqueeStrip** — Infinite scroll, pause on hover, configurable direction/speed
10. **ComingSoonBanner** — Amber dashed border banner
11. **ComparisonTable** — Without vs With layout
12. **AnimatedCounter** — Number counting up on visibility
13. **RevealOnScroll** — IntersectionObserver wrapper

---

## SOCIAL PROOF (Anonymous)

| Real Partner | Website Reference |
|---|---|
| Kingtons | "Global hardware manufacturer integrating Mood Lab firmware" |
| Cali Clear | "Leading California distributor utilizing smart technology" |

**NEVER name partners directly.**

---

## KEY NUMBERS

- 40+ smart features (full ecosystem)
- 31+ Smart Control features (6 groups)
- 5 technology pillars
- 18 Arena games (8 Play + 4 Show + 6 Predict)
- 7 AI Mood Presets
- 7 data pipelines
- 26+ feature modules in Firmware Engine
- 4 device input methods
- 5-tier loyalty (Bronze→Legend)
- 14 badges
- <2s firmware compile time
- ∞ unlimited builds

---

## INSTRUCTION TO CLAUDE

Build this as a single JSX React artifact. Use useState for page routing. Every link must work. Every page must have rich content as specified above. Use the design system colors, fonts, and effects. Include phone mockups, sliders, exploded views, video placeholders with real filenames, and image text boxes throughout. Make it stunning — Awwwards quality. The person reviewing this is CEO-level and expects jaw-dropping visual quality.

Read the ui-design-system skill and frontend-design skill before building.
