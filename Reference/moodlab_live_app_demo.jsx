import { useState, useEffect, useCallback, useRef } from "react";

// ─── DESIGN TOKENS ───
const T = {
  bg: "#07070e", bg2: "#0e0e18", bg3: "#16162a",
  surface: "rgba(255,255,255,0.03)", surfaceHover: "rgba(255,255,255,0.06)",
  pink: "#f472b6", pinkBright: "#ec4899", magenta: "#d946ef",
  cyan: "#22d3ee", cyanDeep: "#06b6d4",
  purple: "#a78bfa", purpleDeep: "#7c3aed",
  gold: "#fbbf24", goldDeep: "#f59e0b",
  green: "#34d399", red: "#f87171", redBright: "#ef4444",
  orange: "#fb923c", blue: "#60a5fa",
  text: "#f1f5f9", text2: "#94a3b8", text3: "#475569",
  border: "rgba(255,255,255,0.06)",
  glow: (c, a = 0.25) => `0 0 24px rgba(${c},${a})`,
};

// ─── DATA ───
const HERO_SLIDES = [
  {
    id: "wc", type: "match",
    gradient: "linear-gradient(135deg, #0c1445 0%, #1a0a30 40%, #2d0a24 100%)",
    accentGlow: "radial-gradient(ellipse at 50% 80%, rgba(251,191,36,0.12) 0%, transparent 60%)",
    tag: "⚽ FIFA WORLD CUP 2026", tagColor: T.gold,
    title: "Brazil vs Argentina", subtitle: "Quarter Final — Watch Party",
    visual: { teamA: "🇧🇷", teamB: "🇦🇷", score: "LIVE" },
    host: { name: "VibeKing", avatar: "👑", badge: "Partner" },
    meta: "1,247 watching • 3,420 puffs",
    cta: "JOIN WATCH PARTY", ctaGrad: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
  },
  {
    id: "celeb", type: "kol",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #0a1628 40%, #0c2a1a 100%)",
    accentGlow: "radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)",
    tag: "🔥 FEATURED CREATOR", tagColor: T.magenta,
    title: "SnoopCloud420", subtitle: "Celebrity Chill Session — Exclusive",
    visual: { emoji: "🎤", ring: T.magenta },
    host: { name: "SnoopCloud420", avatar: "🎤", badge: "Partner" },
    meta: "8,912 watching • VIP Access",
    cta: "WATCH NOW", ctaGrad: `linear-gradient(135deg, ${T.magenta}, ${T.purpleDeep})`,
  },
  {
    id: "event", type: "event",
    gradient: "linear-gradient(135deg, #0a1628 0%, #0c1445 40%, #1a0a30 100%)",
    accentGlow: "radial-gradient(ellipse at 70% 30%, rgba(34,211,238,0.12) 0%, transparent 50%)",
    tag: "🎉 SPECIAL EVENT", tagColor: T.cyan,
    title: "WC Opening Ceremony", subtitle: "Global Watch Party — June 11",
    visual: { emoji: "🏟️", ring: T.cyan },
    host: { name: "Mood Lab", avatar: "🎯", badge: "Official" },
    meta: "Pre-register now • 4,200 interested",
    cta: "SET REMINDER", ctaGrad: `linear-gradient(135deg, ${T.cyan}, ${T.blue})`,
  },
  {
    id: "gameshow", type: "gameshow",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d0a24 40%, #0c1445 100%)",
    accentGlow: "radial-gradient(ellipse at 40% 70%, rgba(34,211,238,0.15) 0%, transparent 55%)",
    tag: "🎮 ARENA × LIVE", tagColor: T.cyan,
    title: "Vibe Check LIVE", subtitle: "Trivia Game Show — 8 contestants, YOU decide!",
    visual: { emoji: "🧠", ring: T.cyan, emoji2: "⚡", emoji3: "🏆" },
    host: { name: "AI Host Max", avatar: "🤖", badge: "Official" },
    meta: "342 watching • 1,200 playing along",
    cta: "JOIN AS AUDIENCE", ctaGrad: `linear-gradient(135deg, ${T.cyan}, ${T.purpleDeep})`,
  },
  {
    id: "brand", type: "brand",
    gradient: "linear-gradient(135deg, #1a1a0a 0%, #0a1a14 40%, #0a0f1a 100%)",
    accentGlow: "radial-gradient(ellipse at 50% 60%, rgba(52,211,153,0.1) 0%, transparent 50%)",
    tag: "📦 BRAND DROP", tagColor: T.green,
    title: "Stack × Mood Lab", subtitle: "Exclusive Launch Stream — Limited Edition",
    visual: { emoji: "✨", ring: T.green },
    host: { name: "Stack Official", avatar: "📦", badge: "Official" },
    meta: "Tomorrow 8PM PST • Giveaways",
    cta: "GET NOTIFIED", ctaGrad: `linear-gradient(135deg, ${T.green}, ${T.cyanDeep})`,
  },
  {
    id: "tournament", type: "tournament",
    gradient: "linear-gradient(135deg, #0a0f1a 0%, #1a1a0a 40%, #2d0a24 100%)",
    accentGlow: "radial-gradient(ellipse at 60% 40%, rgba(251,191,36,0.12) 0%, transparent 50%)",
    tag: "🏆 TOURNAMENT FINALS", tagColor: T.gold,
    title: "Final Kick Championship", subtitle: "Grand Final — PuffDaddy vs NeonNinja",
    visual: { p1: "🔥", p2: "⚡", vs: true },
    host: { name: "Mood Lab Arena", avatar: "🏆", badge: "Official" },
    meta: "LIVE NOW • 2,100 spectators • Predict winner",
    cta: "WATCH FINAL", ctaGrad: `linear-gradient(135deg, ${T.gold}, ${T.red})`,
  },
];

const STREAMS = [
  { id: 1, host: "ChillQueen", avatar: "🌙", viewers: 892, category: "Chill", title: "Late Night Chill Sesh 🌌", duration: "45:12", mode: "avatar", puffs: 1205, badge: "Partner", followers: 8200 },
  { id: 2, host: "GameMaster420", avatar: "🎮", viewers: 634, category: "Games", title: "Hot Potato Tournament 🥔🔥", duration: "22:05", mode: "camera", puffs: 876, badge: "Creator", followers: 3100 },
  { id: 3, host: "CloudNine", avatar: "☁️", viewers: 421, category: "Chill", title: "Morning Mist Session ☀️", duration: "15:30", mode: "avatar", puffs: 340, badge: "Creator", followers: 1800 },
  { id: 4, host: "NeonVibes", avatar: "✨", viewers: 315, category: "Brand", title: "Stack Launch Party 🎉", duration: "52:18", mode: "camera", puffs: 2100, badge: "Official", followers: 25000 },
  { id: 5, host: "Arena", avatar: "🏆", viewers: 2100, category: "Arena", title: "Final Kick Championship — Grand Final ⚽🔥", duration: "12:05", mode: "camera", puffs: 580, badge: "Official", followers: 0, isArena: true },
];

const ARENA_ITEMS = [
  { id: "a1", icon: "🧠", title: "Vibe Check", status: "LIVE NOW", statusColor: T.redBright, sub: "342 playing", actionLabel: "Join", isLive: true },
  { id: "a2", icon: "⚽", title: "Final Kick", status: "FINALS", statusColor: T.gold, sub: "2.1K watching", actionLabel: "Watch", isLive: true },
  { id: "a3", icon: "🎡", title: "Spin & Win", status: "IN 30 MIN", statusColor: T.orange, sub: "KOL hosted", actionLabel: "Remind" },
  { id: "a4", icon: "🔮", title: "WC Predictor", status: "OPEN", statusColor: T.green, sub: "BRA vs ARG", actionLabel: "Predict" },
  { id: "a5", icon: "📅", title: "Daily Picks", status: "3 LEFT", statusColor: T.purple, sub: "+50 🪙 each", actionLabel: "Play" },
];

const CREATORS = [
  { name: "DankReviews", avatar: "🔬", badge: "Partner", followers: "15.2K", schedule: "Mon/Thu 9PM", streams: 142 },
  { name: "CloudChaser", avatar: "🌬️", badge: "Partner", followers: "9.8K", schedule: "Daily 8PM", streams: 89 },
  { name: "TerpQueen", avatar: "🧪", badge: "Creator", followers: "4.1K", schedule: "Fri/Sat 10PM", streams: 34 },
  { name: "VapeSensei", avatar: "🥷", badge: "Partner", followers: "22K", schedule: "Wed/Sun 7PM", streams: 210 },
  { name: "MoodMaster", avatar: "🎭", badge: "Creator", followers: "2.3K", schedule: "Tue/Sat 9PM", streams: 18 },
];

const UPCOMING = [
  { id: 10, avatar: "🏟️", title: "Germany vs Spain — Watch Party", time: "Today 9:30 PM", badge: "Official" },
  { id: 11, avatar: "📦", title: "Stack Pro Launch Event", time: "Tomorrow 8PM", badge: "Official" },
];

const CATEGORIES = [
  { name: "All", icon: "🔥", c: T.pink }, { name: "Following", icon: "♡", c: T.orange },
  { name: "World Cup", icon: "⚽", c: T.gold }, { name: "Arena", icon: "🎮", c: T.cyan },
  { name: "Chill", icon: "🌙", c: T.purple }, { name: "Games", icon: "🕹️", c: T.green },
];

const REACTIONS = ["🔥", "😱", "💨", "😂", "💀", "👏", "⚽", "🎉"];

const BADGE = { Creator: { icon: "⚡", c: T.cyan }, Partner: { icon: "💎", c: T.gold }, Official: { icon: "✦", c: T.pink } };

// ─── COMPONENTS ───
const BadgeTag = ({ type, s = 10 }) => {
  const b = BADGE[type]; if (!b) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: "2px 6px", borderRadius: 6, background: `${b.c}15`, fontSize: s, fontWeight: 700, color: b.c, letterSpacing: 0.3 }}>{b.icon} {type}</span>;
};

const Pill = ({ children, color, active, onClick, count }) => (
  <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: 20, border: active ? `1.5px solid ${color}` : `1px solid ${T.border}`, background: active ? `${color}12` : "transparent", cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, color: active ? color : T.text3, display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s" }}>
    {children}
    {count !== undefined && <span style={{ background: color, color: "#fff", borderRadius: 8, padding: "0 5px", fontSize: 9, fontWeight: 800, minWidth: 14, textAlign: "center" }}>{count}</span>}
  </button>
);

const GlassCard = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: T.surface, backdropFilter: "blur(12px)", border: `1px solid ${T.border}`, borderRadius: 16, cursor: onClick ? "pointer" : "default", transition: "all 0.2s", ...style }}>
    {children}
  </div>
);

const PuffBubble = ({ name, x, isHost: ih }) => {
  const [y, setY] = useState(0); const [op, setOp] = useState(1);
  useEffect(() => { const t = setInterval(() => { setY(p => p - 1.8); setOp(p => Math.max(0, p - 0.018)); }, 30); return () => clearInterval(t); }, []);
  return <div style={{ position: "absolute", left: `${x}%`, bottom: `${28 + y * 0.3}%`, opacity: op, pointerEvents: "none", zIndex: 5, transform: `scale(${ih ? 1.3 : 1})` }}>
    <div style={{ background: ih ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", borderRadius: 20, padding: "4px 10px", fontSize: ih ? 11 : 10, fontWeight: 600, color: ih ? T.gold : T.text, border: `1px solid ${ih ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.15)"}`, whiteSpace: "nowrap" }}>💨 {name}</div>
  </div>;
};

const WaveOverlay = ({ active }) => {
  if (!active) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(244,114,182,0.25) 0%, transparent 65%)", animation: "wavePulse 1.6s ease-out forwards" }} />
    <div style={{ textAlign: "center", animation: "waveText 1.6s ease-out forwards" }}>
      <div style={{ fontSize: 52 }}>🌊💨</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: T.gold, textShadow: "0 0 30px rgba(251,191,36,0.5)", letterSpacing: 5, marginTop: 4 }}>PUFF WAVE!</div>
      <div style={{ fontSize: 11, color: T.text2, marginTop: 6, letterSpacing: 1 }}>12 synchronized puffs</div>
    </div>
  </div>;
};

// ─── HERO SLIDER ───
const HeroSlider = ({ onJoin }) => {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 5000;

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / INTERVAL, 1));
      if (elapsed >= INTERVAL) {
        setIdx(p => (p + 1) % HERO_SLIDES.length);
      }
    }, 40);
    return () => clearInterval(tick);
  }, [idx]);

  const slide = HERO_SLIDES[idx];
  const goTo = (i) => { setIdx(i); setProgress(0); };

  return (
    <div style={{ margin: "8px 16px", borderRadius: 20, overflow: "hidden", position: "relative", height: 260, cursor: "pointer" }} onClick={() => onJoin(slide)}>
      {/* Background layers */}
      <div style={{ position: "absolute", inset: 0, background: slide.gradient, transition: "opacity 0.6s ease" }} />
      <div style={{ position: "absolute", inset: 0, background: slide.accentGlow, transition: "opacity 0.6s ease" }} />
      {/* Noise texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: 20 }}>
        {/* Top row: tag + viewers */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 8, background: `${slide.tagColor}15`, border: `1px solid ${slide.tagColor}25` }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: slide.tagColor, animation: "pulse 1.2s infinite", boxShadow: `0 0 6px ${slide.tagColor}` }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: slide.tagColor, letterSpacing: 0.5 }}>{slide.tag}</span>
          </div>
        </div>

        {/* Center visual */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {slide.type === "match" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>{slide.visual.teamA}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: T.gold }}>VS</span>
                </div>
                <div style={{ fontSize: 9, color: T.gold, marginTop: 4, fontWeight: 700, letterSpacing: 1 }}>{slide.visual.score}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>{slide.visual.teamB}</div>
              </div>
            </div>
          ) : slide.type === "gameshow" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${T.purple}15`, border: `1.5px solid ${T.purple}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, animation: "float 2.5s ease-in-out infinite" }}>{slide.visual.emoji2}</div>
              <div style={{ width: 68, height: 68, borderRadius: 18, background: `${slide.visual.ring}15`, border: `2px solid ${slide.visual.ring}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: `0 0 40px ${slide.visual.ring}10` }}>{slide.visual.emoji}</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${T.gold}15`, border: `1.5px solid ${T.gold}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, animation: "float 3s ease-in-out infinite 0.5s" }}>{slide.visual.emoji3}</div>
            </div>
          ) : slide.type === "tournament" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${T.red}12`, border: `2px solid ${T.red}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{slide.visual.p1}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.text2, marginTop: 4 }}>PuffDaddy</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 900, color: T.gold }}>VS</span>
                </div>
                <div style={{ fontSize: 8, color: T.gold, marginTop: 3, fontWeight: 700, letterSpacing: 1 }}>FINAL</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${T.cyan}12`, border: `2px solid ${T.cyan}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{slide.visual.p2}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.text2, marginTop: 4 }}>NeonNinja</div>
              </div>
            </div>
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: 20, background: `${slide.visual.ring}12`, border: `2px solid ${slide.visual.ring}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: `0 0 40px ${slide.visual.ring}15`, animation: "float 3s ease-in-out infinite" }}>
              {slide.visual.emoji}
            </div>
          )}
        </div>

        {/* Bottom info */}
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.text, lineHeight: 1.2, marginBottom: 2, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{slide.title}</div>
          <div style={{ fontSize: 12, color: T.text2, marginBottom: 8 }}>{slide.subtitle}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>{slide.host.avatar}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.text2 }}>{slide.host.name}</span>
              <BadgeTag type={slide.host.badge} s={8} />
            </div>
            <span style={{ fontSize: 10, color: T.text3 }}>•</span>
            <span style={{ fontSize: 10, color: T.text3 }}>{slide.meta}</span>
          </div>

          {/* CTA + Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={e => { e.stopPropagation(); onJoin(slide); }} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "none", background: slide.ctaGrad, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer", letterSpacing: 0.8, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
              {slide.cta}
            </button>
            {/* Slide indicators */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {HERO_SLIDES.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); goTo(i); }} style={{ width: i === idx ? 24 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer", background: i === idx ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden", transition: "width 0.3s ease" }}>
                  {i === idx && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, borderRadius: 3, background: slide.tagColor, transition: "width 0.04s linear" }} />}
                  {i !== idx && <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: "rgba(255,255,255,0.25)" }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ───
export default function MoodLabLiveTab() {
  const [screen, setScreen] = useState("explore");
  const [isHost, setIsHost] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedStream, setSelectedStream] = useState(null);
  const [chatMsgs, setChatMsgs] = useState([
    { user: "PuffDaddy", msg: "WHAT A GOAL!!! 🔥🔥", c: T.gold },
    { user: "CloudRider", msg: "NO WAY that just happened", c: T.cyan },
    { user: "VibeCheck", msg: "Puff wave incoming!!!", c: T.green },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [puffBubbles, setPuffBubbles] = useState([]);
  const [showWave, setShowWave] = useState(false);
  const [puffCount, setPuffCount] = useState(3420);
  const [viewers, setViewers] = useState(1247);
  const [reminders, setReminders] = useState({});
  const [followed, setFollowed] = useState({});
  const [coins, setCoins] = useState(1200);
  const [showTip, setShowTip] = useState(false);
  const [showRaid, setShowRaid] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [isFollowingHost, setIsFollowingHost] = useState(false);
  const [showHostPanel, setShowHostPanel] = useState(false);
  const [activeCard, setActiveCard] = useState("prediction");

  // Setup
  const [setupFormat, setSetupFormat] = useState("camera");
  const [setupTitle, setSetupTitle] = useState("");
  const [setupCategory, setSetupCategory] = useState("Chill Sessions");
  const [setupPrivacy, setSetupPrivacy] = useState("public");
  const [setupSchedule, setSetupSchedule] = useState("now");

  // Device Input
  const [showDevicePanel, setShowDevicePanel] = useState(false);
  const [deviceInput, setDeviceInput] = useState("puff"); // puff | drypuff | button
  const [deviceBehavior, setDeviceBehavior] = useState("auto"); // auto | fixed | ask
  const [deviceConnected, setDeviceConnected] = useState(true);

  const INPUT_METHODS = [
    { id: "puff", icon: "💨", label: "Puff", desc: "MIC + Heating ON", sub: "Consumes extract", color: T.pink },
    { id: "drypuff", icon: "🌀", label: "Dry Puff", desc: "MIC + Heating OFF", sub: "No extract used", color: T.cyan },
    { id: "button", icon: "🔘", label: "Button", desc: "Physical button via BLE", sub: "Press/hold/release", color: T.purple },
  ];
  const BEHAVIORS = [
    { id: "auto", icon: "⚡", label: "Auto", desc: "System picks best input per context" },
    { id: "fixed", icon: "📌", label: "Fixed", desc: "Always use selected method" },
    { id: "ask", icon: "❓", label: "Ask Each Session", desc: "Prompt me every time" },
  ];
  const currentInput = INPUT_METHODS.find(m => m.id === deviceInput);

  const DeviceInputBtn = ({ style: s }) => (
    <button onClick={() => setShowDevicePanel(!showDevicePanel)} style={{ width: 38, height: 38, borderRadius: 12, background: showDevicePanel ? `${currentInput.color}20` : T.surface, border: `1px solid ${showDevicePanel ? currentInput.color : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", ...s }}>
      <span style={{ fontSize: 16 }}>{currentInput.icon}</span>
      {deviceConnected && <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: T.green, border: `2px solid ${T.bg}` }} />}
    </button>
  );

  const DeviceInputPanel = () => showDevicePanel ? (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }} onClick={() => setShowDevicePanel(false)}>
      <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: screen === "explore" ? 96 : 54, right: 16, width: 310, background: "rgba(7,7,14,0.96)", backdropFilter: "blur(24px)", borderRadius: 20, border: `1px solid ${T.border}`, padding: 0, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.6)" }}>
        {/* Header */}
        <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>🎮</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: T.text }}>Device Input</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: deviceConnected ? T.green : T.red }} />
              <span style={{ fontSize: 10, color: deviceConnected ? T.green : T.red, fontWeight: 600 }}>{deviceConnected ? "Connected" : "Disconnected"}</span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: T.text3 }}>Applies to Live interactions + Arena games</div>
        </div>

        {/* Input Methods */}
        <div style={{ padding: "12px 14px 8px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.text3, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Input Method</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {INPUT_METHODS.map(m => (
              <button key={m.id} onClick={() => setDeviceInput(m.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, border: `1.5px solid ${deviceInput === m.id ? m.color : T.border}`, background: deviceInput === m.id ? `${m.color}10` : "transparent", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${m.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: deviceInput === m.id ? m.color : T.text }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: T.text3, marginTop: 1 }}>{m.desc}</div>
                </div>
                {deviceInput === m.id && <div style={{ width: 20, height: 20, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", flexShrink: 0 }}>✓</div>}
              </button>
            ))}
          </div>
        </div>

        {/* On-screen Tap note */}
        <div style={{ margin: "0 14px 8px", padding: "8px 12px", borderRadius: 10, background: `${T.gold}06`, border: `1px solid ${T.gold}12` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12 }}>👆</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.gold }}>On-screen Tap</span>
            <span style={{ fontSize: 9, color: T.text3 }}>— always available as supplement</span>
          </div>
          <div style={{ fontSize: 9, color: T.text3, marginTop: 3, marginLeft: 22 }}>Cannot replace device input. Device required for Puff Sync, Arena games & challenges.</div>
        </div>

        {/* Behavior */}
        <div style={{ padding: "8px 14px 12px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.text3, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Behavior</div>
          <div style={{ display: "flex", gap: 6 }}>
            {BEHAVIORS.map(b => (
              <button key={b.id} onClick={() => setDeviceBehavior(b.id)} style={{ flex: 1, padding: "8px 4px", borderRadius: 10, border: `1.5px solid ${deviceBehavior === b.id ? T.green : T.border}`, background: deviceBehavior === b.id ? `${T.green}08` : "transparent", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                <div style={{ fontSize: 16, marginBottom: 2 }}>{b.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: deviceBehavior === b.id ? T.green : T.text2 }}>{b.label}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 9, color: T.text3, marginTop: 6, textAlign: "center" }}>{BEHAVIORS.find(b => b.id === deviceBehavior)?.desc}</div>
        </div>

        {/* Connection toggle */}
        <div style={{ padding: "8px 14px 14px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.text2 }}>Moodi Pro</div>
            <div style={{ fontSize: 9, color: T.text3 }}>Battery 78% • BLE</div>
          </div>
          <button onClick={() => setDeviceConnected(!deviceConnected)} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${deviceConnected ? T.green : T.red}30`, background: `${deviceConnected ? T.green : T.red}08`, fontSize: 10, fontWeight: 700, color: deviceConnected ? T.green : T.red, cursor: "pointer" }}>
            {deviceConnected ? "Connected ✓" : "Reconnect"}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // Auto chat
  useEffect(() => {
    if (screen !== "watch") return;
    const names = ["PuffDaddy", "CloudRider", "VibeCheck", "NeonNinja", "ChillMaster", "SmokeSignal"];
    const msgs = ["LET'S GO! 🔥", "Puff wave!! 💨", "This is amazing", "Who else vibing?", "GOAL!!! ⚽", "Legend host 👑", "Just followed!", "Collab puff 🫧"];
    const cs = [T.pink, T.cyan, T.gold, T.purple, T.green, T.orange];
    const i = setInterval(() => setChatMsgs(p => [...p.slice(-14), { user: names[Math.floor(Math.random() * names.length)], msg: msgs[Math.floor(Math.random() * msgs.length)], c: cs[Math.floor(Math.random() * cs.length)] }]), 2800);
    return () => clearInterval(i);
  }, [screen]);

  useEffect(() => {
    if (screen !== "watch") return;
    const i = setInterval(() => setViewers(p => p + Math.floor(Math.random() * 11) - 3), 2000);
    return () => clearInterval(i);
  }, [screen]);

  const addPuff = useCallback(() => {
    const id = Date.now() + Math.random(); const x = 8 + Math.random() * 84;
    const ns = ["You", "CloudRider", "NeonNinja", "VibeCheck"];
    setPuffBubbles(p => [...p.slice(-8), { id, x, name: ns[Math.floor(Math.random() * ns.length)], isHost: Math.random() < 0.15 }]);
    setPuffCount(p => p + 1);
    setTimeout(() => setPuffBubbles(p => p.filter(b => b.id !== id)), 3200);
  }, []);

  const triggerWave = useCallback(() => {
    for (let i = 0; i < 8; i++) setTimeout(() => addPuff(), i * 80);
    setShowWave(true); setTimeout(() => setShowWave(false), 2200);
  }, [addPuff]);

  const addReaction = (emoji) => {
    const id = Date.now() + Math.random(); const x = 12 + Math.random() * 76;
    setFloatingReactions(p => [...p.slice(-12), { id, emoji, x }]);
    setTimeout(() => setFloatingReactions(p => p.filter(r => r.id !== id)), 2800);
  };

  const openStream = (s) => {
    setSelectedStream(s); setScreen("watch"); setViewers(s.viewers || 1247); setPuffCount(s.puffs || 3420);
    setIsFollowingHost(!!followed[s.host]); setShowProfile(false); setShowRaid(false); setActiveCard("prediction"); setIsHost(false); setShowHostPanel(false);
  };

  const goLiveAsHost = () => {
    setScreen("watch"); setIsHost(true); setViewers(0); setPuffCount(0); setShowHostPanel(false);
    setSelectedStream({ id: 99, host: "You", avatar: "🎯", viewers: 0, category: setupCategory, title: setupTitle || "My Live Stream", duration: "0:00", mode: setupFormat, puffs: 0, badge: "Creator", followers: 420 });
  };

  const filtered = activeCategory === "All" ? STREAMS : activeCategory === "Following" ? STREAMS.filter(s => followed[s.host]) : STREAMS.filter(s => s.category === activeCategory || (activeCategory === "Games" && s.category === "Games"));

  // ─────────────── SETUP ───────────────
  if (screen === "setup") return (
    <div style={{ width: 390, height: 844, background: T.bg, color: T.text, fontFamily: "'SF Pro Display',-apple-system,sans-serif", position: "relative", overflow: "hidden", borderRadius: 24, border: `1px solid ${T.border}` }}>
      <div style={{ padding: "48px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <button onClick={() => setScreen("explore")} style={{ width: 36, height: 36, borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, color: T.text, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
          <div><div style={{ fontSize: 22, fontWeight: 800 }}>Go Live</div><div style={{ fontSize: 12, color: T.text3 }}>Set up your stream</div></div>
        </div>
      </div>
      <div style={{ height: 680, overflowY: "auto", padding: "0 24px", paddingBottom: 120 }}>
        {/* Format */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Format</div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["camera", "📷", "Camera", "Video livestream"], ["avatar", "🎭", "Avatar", "Audio + visuals"]].map(([k, ico, lbl, desc]) => (
              <GlassCard key={k} onClick={() => setSetupFormat(k)} style={{ flex: 1, padding: 16, textAlign: "center", borderColor: setupFormat === k ? T.pink : T.border, background: setupFormat === k ? `${T.pink}08` : T.surface }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{ico}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: setupFormat === k ? T.pink : T.text }}>{lbl}</div>
                <div style={{ fontSize: 10, color: T.text3, marginTop: 2 }}>{desc}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Room Name</div>
          <input value={setupTitle} onChange={e => setSetupTitle(e.target.value)} placeholder="Name your stream..." style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>

        {/* Category */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Category</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Chill Sessions", "Game Streams", "Watch Parties", "Brand Events", "World Cup"].map(cat => (
              <button key={cat} onClick={() => setSetupCategory(cat)} style={{ padding: "8px 14px", borderRadius: 10, border: `1.5px solid ${setupCategory === cat ? T.gold : T.border}`, background: setupCategory === cat ? `${T.gold}10` : "transparent", fontSize: 12, fontWeight: 600, color: setupCategory === cat ? T.gold : T.text3, cursor: "pointer" }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Privacy</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["public", "🌍", "Public"], ["followers", "♡", "Followers"], ["invite", "🔒", "Invite"]].map(([k, ico, lbl]) => (
              <button key={k} onClick={() => setSetupPrivacy(k)} style={{ flex: 1, padding: "10px 4px", borderRadius: 12, border: `1.5px solid ${setupPrivacy === k ? T.cyan : T.border}`, background: setupPrivacy === k ? `${T.cyan}08` : "transparent", fontSize: 11, fontWeight: 600, color: setupPrivacy === k ? T.cyan : T.text3, cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{ico}</div>{lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Co-Hosts + Thumbnail */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <GlassCard style={{ flex: 1, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>+</div>
            <div style={{ fontSize: 11, color: T.text3 }}>Invite Co-hosts</div>
            <div style={{ fontSize: 9, color: T.text3, marginTop: 2 }}>Max 3</div>
          </GlassCard>
          <GlassCard style={{ flex: 1, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>📷</div>
            <div style={{ fontSize: 11, color: T.text3 }}>Thumbnail</div>
            <div style={{ fontSize: 9, color: T.text3, marginTop: 2 }}>Optional</div>
          </GlassCard>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 24px 32px", background: `linear-gradient(to top, ${T.bg} 60%, transparent)` }}>
        <button onClick={goLiveAsHost} style={{ width: "100%", padding: "16px 0", borderRadius: 16, border: "none", background: `linear-gradient(135deg, ${T.red}, ${T.pinkBright})`, color: "#fff", fontSize: 16, fontWeight: 900, cursor: "pointer", letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 8px 32px rgba(239,68,68,0.3)` }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", animation: "pulse 1s infinite" }} /> GO LIVE NOW
        </button>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}} input::placeholder{color:${T.text3}}`}</style>
    </div>
  );

  // ─────────────── EXPLORE ───────────────
  if (screen === "explore") return (
    <div style={{ width: 390, height: 844, background: T.bg, color: T.text, fontFamily: "'SF Pro Display',-apple-system,sans-serif", position: "relative", overflow: "hidden", borderRadius: 24, border: `1px solid ${T.border}` }}>
      {/* Status bar */}
      <div style={{ padding: "12px 24px 0", display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: T.text2 }}><span>9:41</span><span style={{ fontSize: 10 }}>📶 🔋</span></div>

      {/* Header */}
      <div style={{ padding: "16px 24px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Live</div>
          <div style={{ fontSize: 11, color: T.text3, marginTop: 1 }}>Discover creators & streams</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <DeviceInputBtn />
          {["🔔", "🔍"].map((e, i) => <div key={i} style={{ width: 38, height: 38, borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{e}</div>)}
        </div>
      </div>

      <div style={{ height: 670, overflowY: "auto", paddingBottom: 100 }}>
        {/* Device Input Panel overlay */}
        <DeviceInputPanel />
        {/* ★ HERO SLIDER */}
        <HeroSlider onJoin={(slide) => openStream({ id: 1, host: slide.host.name, avatar: slide.host.avatar, viewers: 1247, category: "World Cup", title: slide.title, duration: "1:23:45", mode: "camera", puffs: 3420, badge: slide.host.badge, followers: 12400 })} />

        {/* Categories */}
        <div style={{ display: "flex", gap: 6, padding: "10px 16px", overflowX: "auto" }}>
          {CATEGORIES.map(cat => (
            <Pill key={cat.name} color={cat.c} active={activeCategory === cat.name} onClick={() => setActiveCategory(cat.name)} count={cat.name === "Following" ? Object.values(followed).filter(Boolean).length : undefined}>
              <span>{cat.icon}</span> {cat.name}
            </Pill>
          ))}
        </div>

        {/* ★ Arena × Live Strip */}
        <div style={{ padding: "10px 16px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 12 }}>🎮</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Arena × Live</span>
            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 5, background: `${T.cyan}15`, color: T.cyan, fontWeight: 700 }}>CROSS-TAB</span>
            <span style={{ fontSize: 10, color: T.text3, fontWeight: 400, marginLeft: "auto" }}>Go to Arena →</span>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 }}>
            {ARENA_ITEMS.map(a => (
              <div key={a.id} style={{ minWidth: 140, padding: "12px 14px", borderRadius: 14, background: T.surface, border: `1px solid ${a.isLive ? `${a.statusColor}20` : T.border}`, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                {a.isLive && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${a.statusColor}, transparent)` }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{a.title}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: a.statusColor, letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 3 }}>
                      {a.isLive && <span style={{ width: 4, height: 4, borderRadius: "50%", background: a.statusColor, animation: "pulse 1.2s infinite" }} />}
                      {a.status}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: T.text3, marginBottom: 8 }}>{a.sub}</div>
                <button style={{ width: "100%", padding: "5px 0", borderRadius: 8, border: `1px solid ${a.statusColor}30`, background: `${a.statusColor}08`, fontSize: 10, fontWeight: 700, color: a.statusColor, cursor: "pointer" }}>{a.actionLabel}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Now */}
        <div style={{ padding: "12px 16px 4px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: T.redBright, animation: "pulse 1.2s infinite" }}>●</span>
            {activeCategory === "Following" ? "Following — Live" : "Live Now"}
            <span style={{ fontSize: 11, color: T.text3, fontWeight: 400, marginLeft: "auto" }}>{filtered.length} streams</span>
          </div>
          {filtered.length === 0 && activeCategory === "Following" && <div style={{ textAlign: "center", padding: 32, color: T.text3, fontSize: 13 }}>No followed creators are live.<br />Follow creators below!</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(s => (
              <GlassCard key={s.id} onClick={() => openStream(s)} style={{ display: "flex", gap: 12, padding: 12, borderColor: s.isArena ? `${T.cyan}20` : T.border }}>
                <div style={{ width: 76, height: 76, borderRadius: 14, background: `linear-gradient(135deg, ${T.bg3}, ${s.isArena ? "rgba(34,211,238,0.12)" : s.category === "World Cup" || s.category === "Brand" ? "rgba(251,191,36,0.1)" : s.category === "Chill" ? "rgba(167,139,250,0.1)" : "rgba(34,211,238,0.1)"})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, position: "relative", flexShrink: 0 }}>
                  {s.avatar}
                  <div style={{ position: "absolute", top: 5, right: 5, background: T.redBright, borderRadius: 4, padding: "1px 5px", fontSize: 8, fontWeight: 800, color: "#fff" }}>LIVE</div>
                  {s.isArena && <div style={{ position: "absolute", bottom: 4, left: 4, right: 4, background: `${T.cyan}90`, borderRadius: 4, padding: "1px 0", fontSize: 7, fontWeight: 800, color: "#fff", textAlign: "center", letterSpacing: 0.5 }}>ARENA</div>}
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: T.text3, marginBottom: 4 }}>
                    <span>{s.host}</span><BadgeTag type={s.badge} s={8} />
                  </div>
                  <div style={{ display: "flex", gap: 10, fontSize: 10, color: T.text3 }}>
                    <span>👁 {s.viewers}</span><span>💨 {s.puffs}</span><span>⏱ {s.duration}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Creator Spotlight */}
        <div style={{ padding: "20px 16px 4px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>⭐ Featured Creators<span style={{ fontSize: 10, color: T.text3, fontWeight: 400, marginLeft: "auto" }}>See all →</span></div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
            {CREATORS.map(cr => (
              <GlassCard key={cr.name} style={{ minWidth: 136, padding: 14, textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 30, marginBottom: 6 }}>{cr.avatar}</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{cr.name}</div>
                <BadgeTag type={cr.badge} s={8} />
                <div style={{ fontSize: 10, color: T.text3, marginTop: 4 }}>{cr.followers} followers</div>
                <div style={{ fontSize: 9, color: T.text3, marginTop: 1 }}>🕐 {cr.schedule}</div>
                <button onClick={e => { e.stopPropagation(); setFollowed(p => ({ ...p, [cr.name]: !p[cr.name] })); }} style={{ width: "100%", padding: "6px 0", borderRadius: 10, border: followed[cr.name] ? `1px solid ${T.orange}` : "none", background: followed[cr.name] ? "transparent" : `linear-gradient(135deg, ${T.orange}, ${T.pinkBright})`, fontSize: 10, fontWeight: 700, color: followed[cr.name] ? T.orange : "#fff", cursor: "pointer", marginTop: 8 }}>
                  {followed[cr.name] ? "✓ Following" : "Follow"}
                </button>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div style={{ padding: "16px 16px 4px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>📅 Upcoming</div>
          {UPCOMING.map(u => (
            <GlassCard key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${T.gold}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{u.avatar}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700 }}>{u.title}</div><div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: T.text3, marginTop: 3 }}><span>{u.time}</span><BadgeTag type={u.badge} s={8} /></div></div>
              <button onClick={() => setReminders(p => ({ ...p, [u.id]: !p[u.id] }))} style={{ padding: "7px 12px", borderRadius: 10, border: reminders[u.id] ? `1px solid ${T.gold}` : `1px solid ${T.border}`, background: reminders[u.id] ? `${T.gold}10` : "transparent", fontSize: 11, fontWeight: 700, color: reminders[u.id] ? T.gold : T.text3, cursor: "pointer" }}>{reminders[u.id] ? "✓ Set" : "🔔"}</button>
            </GlassCard>
          ))}
        </div>
        <div style={{ height: 80 }} />
      </div>

      {/* GO LIVE FAB */}
      <button onClick={() => setScreen("setup")} style={{ position: "absolute", bottom: 88, right: 20, width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${T.redBright}, ${T.pinkBright})`, border: "none", color: "#fff", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 24px rgba(236,72,153,0.35)`, zIndex: 10 }}>📷</button>
      <div style={{ position: "absolute", bottom: 72, right: 16, fontSize: 9, fontWeight: 800, color: T.pink, zIndex: 10, textAlign: "center", width: 64 }}>GO LIVE</div>

      {/* Bottom Nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 16px 16px", background: `linear-gradient(to top, ${T.bg} 70%, transparent)` }}>
        <div style={{ display: "flex", background: T.bg2, borderRadius: 16, border: `1px solid ${T.border}`, padding: 4 }}>
          {[["Control", "🎛"], ["Game", "🎮"], ["Live", "📡"], ["Me", "👤"]].map(([t, ico], i) => (
            <div key={t} style={{ flex: 1, padding: "8px 0", borderRadius: 12, textAlign: "center", background: i === 2 ? `${T.pink}10` : "transparent" }}>
              <div style={{ fontSize: 16 }}>{ico}</div><div style={{ fontSize: 8, fontWeight: 700, color: i === 2 ? T.pink : T.text3, marginTop: 2 }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );

  // ─────────────── WATCH / HOST ───────────────
  const s = selectedStream || STREAMS[0];
  return (
    <div style={{ width: 390, height: 844, background: T.bg, color: T.text, fontFamily: "'SF Pro Display',-apple-system,sans-serif", position: "relative", overflow: "hidden", borderRadius: 24, border: `1px solid ${T.border}` }}>
      <div style={{ position: "relative", height: "100%", background: s.mode === "camera" ? `linear-gradient(180deg, #1a0a20 0%, #0a0f1a 50%, ${T.bg} 100%)` : `linear-gradient(180deg, #0a1628 0%, #1a0a2e 50%, ${T.bg} 100%)` }}>

        {/* Top Bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, padding: "12px 16px", background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => { setScreen("explore"); setIsHost(false); }} style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ background: T.redBright, borderRadius: 6, padding: "3px 10px", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", gap: 4, color: "#fff" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", animation: "pulse 1s infinite" }} /> LIVE</div>
              <span style={{ fontSize: 11, color: T.text2 }}>👁 {viewers.toLocaleString()}</span>
              <span style={{ fontSize: 11, color: T.text2 }}>💨 {puffCount.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <DeviceInputBtn style={{ width: 34, height: 34, borderRadius: 10 }} />
              {isHost && <button onClick={() => setShowHostPanel(!showHostPanel)} style={{ width: 34, height: 34, borderRadius: 10, background: showHostPanel ? `${T.gold}25` : "rgba(255,255,255,0.1)", border: showHostPanel ? `1px solid ${T.gold}` : "none", color: showHostPanel ? T.gold : "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>🎯</button>}
              <button onClick={() => setShowRaid(true)} style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>⚡</button>
            </div>
          </div>
          <DeviceInputPanel />
          {isHost && <div style={{ marginTop: 8, padding: "6px 12px", borderRadius: 10, background: `${T.red}12`, border: `1px solid ${T.red}25`, display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.red, animation: "pulse 1s infinite" }} /><span style={{ fontSize: 11, fontWeight: 700, color: T.red }}>YOU ARE HOSTING</span><span style={{ fontSize: 10, color: T.text3, marginLeft: "auto" }}>{s.mode === "camera" ? "📷 Camera" : "🎭 Avatar"}</span></div>}
          {!isHost && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <div onClick={() => setShowProfile(!showProfile)} style={{ width: 38, height: 38, borderRadius: 12, background: `linear-gradient(135deg, ${T.pink}30, ${T.purple}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>{s.avatar}</div>
              <div style={{ flex: 1 }} onClick={() => setShowProfile(!showProfile)}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 13, fontWeight: 700 }}>{s.host}</span><BadgeTag type={s.badge} s={9} /></div>
                <div style={{ fontSize: 10, color: T.text3 }}>{(s.followers || 0).toLocaleString()} followers</div>
              </div>
              <button onClick={() => { setIsFollowingHost(!isFollowingHost); setFollowed(p => ({ ...p, [s.host]: !isFollowingHost })); }} style={{ padding: "7px 18px", borderRadius: 10, border: isFollowingHost ? `1px solid ${T.orange}` : "none", background: isFollowingHost ? "transparent" : `linear-gradient(135deg, ${T.orange}, ${T.pinkBright})`, fontSize: 11, fontWeight: 800, color: isFollowingHost ? T.orange : "#fff", cursor: "pointer" }}>{isFollowingHost ? "✓ Following" : "Follow"}</button>
            </div>
          )}
          {showProfile && !isHost && (
            <div style={{ marginTop: 10, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", borderRadius: 16, padding: 16, border: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                {[{ n: (s.followers || 0).toLocaleString(), l: "Followers" }, { n: "142", l: "Streams" }, { n: "24.5K", l: "🪙 Earned" }].map(st => <div key={st.l} style={{ flex: 1, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 800 }}>{st.n}</div><div style={{ fontSize: 9, color: T.text3 }}>{st.l}</div></div>)}
              </div>
              <div style={{ fontSize: 10, color: T.text3 }}>🏆 Creator Tier: <span style={{ color: T.gold, fontWeight: 700 }}>Gold</span> • 📅 Next: Tomorrow 9PM</div>
            </div>
          )}
        </div>

        {/* Host Panel */}
        {isHost && showHostPanel && (
          <div style={{ position: "absolute", top: 130, left: 0, right: 0, zIndex: 15, padding: "0 12px" }}>
            <div style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)", borderRadius: 18, border: `1px solid ${T.gold}20`, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}><span style={{ fontSize: 14 }}>🎯</span><span style={{ fontSize: 13, fontWeight: 800, color: T.gold }}>HOST CONTROLS</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                {[["🚫", "Mute", T.red], ["👢", "Kick", T.red], ["📌", "Pin Msg", T.cyan], ["🐌", "Slow Mode", T.purple], ["🎮", "Game", T.green], ["📷↔🎭", "Switch", T.orange]].map(([ico, lbl, c]) => (
                  <button key={lbl} style={{ padding: "10px 4px", borderRadius: 12, border: `1px solid ${c}20`, background: `${c}08`, cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 18, marginBottom: 3 }}>{ico}</div><div style={{ fontSize: 9, fontWeight: 600, color: c }}>{lbl}</div>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button onClick={() => { setShowHostPanel(false); setActiveCard("prediction"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: "#fff", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>🔮 PREDICTION</button>
                <button onClick={() => { setShowHostPanel(false); setActiveCard("challenge"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${T.pink}, ${T.purple})`, color: "#fff", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>🏁 CHALLENGE</button>
              </div>
              <button onClick={() => { setShowHostPanel(false); setActiveCard("arena"); }} style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: `1px solid ${T.cyan}30`, background: `${T.cyan}08`, fontSize: 12, fontWeight: 800, color: T.cyan, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                🎮 LAUNCH HALFTIME GAME <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 4, background: `${T.cyan}20`, fontWeight: 700 }}>ARENA</span>
              </button>
              <button onClick={() => { setScreen("explore"); setIsHost(false); }} style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: `1px solid ${T.red}`, background: "transparent", fontSize: 12, fontWeight: 800, color: T.red, cursor: "pointer" }}>■ END STREAM</button>
            </div>
          </div>
        )}

        {/* Center Visual */}
        {s.category === "World Cup" && (
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div><div style={{ fontSize: 44 }}>🇧🇷</div><div style={{ fontSize: 22, fontWeight: 900, color: T.gold, marginTop: 4 }}>2</div></div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 14, fontWeight: 900, color: T.gold }}>VS</span></div>
              <div><div style={{ fontSize: 44 }}>🇦🇷</div><div style={{ fontSize: 22, fontWeight: 900, color: T.gold, marginTop: 4 }}>1</div></div>
            </div>
            <div style={{ fontSize: 10, color: T.text3, marginTop: 8 }}>⏱ 67:32 — 2nd Half</div>
          </div>
        )}
        {s.mode === "avatar" && s.category !== "World Cup" && (
          <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <div style={{ width: 96, height: 96, borderRadius: "50%", background: `linear-gradient(135deg, ${T.purple}30, ${T.pink}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, border: `2px solid ${T.purple}30`, animation: "float 3s ease-in-out infinite" }}>{s.avatar}</div>
            <div style={{ marginTop: 8, fontSize: 12, color: T.text2 }}>{isHost ? "🎙 You are live!" : "🎙 Speaking..."}</div>
          </div>
        )}
        {isHost && s.mode === "camera" && s.category !== "World Cup" && (
          <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <div style={{ width: 110, height: 110, borderRadius: 20, background: `linear-gradient(135deg, ${T.bg3}, ${T.pink}15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, border: `2px solid ${T.pink}20` }}>📷</div>
            <div style={{ marginTop: 8, fontSize: 12, color: T.text2 }}>Camera active</div>
          </div>
        )}

        {puffBubbles.map(b => <PuffBubble key={b.id} {...b} />)}
        {floatingReactions.map(r => <div key={r.id} style={{ position: "absolute", left: `${r.x}%`, bottom: "35%", fontSize: 24, animation: "floatUp 2.8s ease-out forwards", pointerEvents: "none", zIndex: 5 }}>{r.emoji}</div>)}
        <WaveOverlay active={showWave} />
        {showRaid && (
          <div style={{ position: "absolute", inset: 0, zIndex: 25, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", animation: "raidBounce 0.5s ease-out" }}>
              <div style={{ fontSize: 14, color: T.text3, marginBottom: 8, letterSpacing: 2 }}>RAIDING</div>
              <div style={{ fontSize: 52, marginBottom: 8 }}>🌙</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: T.gold }}>ChillQueen</div>
              <BadgeTag type="Partner" s={11} />
              <div style={{ fontSize: 12, color: T.text2, marginTop: 8 }}>Transferring {viewers} viewers...</div>
              <div style={{ marginTop: 12, width: 160, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden", margin: "12px auto 0" }}><div style={{ width: "100%", height: "100%", background: `linear-gradient(90deg, ${T.pink}, ${T.gold})`, animation: "raidBar 2.5s ease-in-out" }} /></div>
              <button onClick={() => { setShowRaid(false); if (!isHost) openStream(STREAMS[0]); }} style={{ marginTop: 16, padding: "8px 24px", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: T.text3, fontSize: 11, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Overlay Cards */}
        {!showHostPanel && (
          <div style={{ position: "absolute", top: "42%", left: 0, right: 0, zIndex: 6 }}>
            <div style={{ display: "flex", gap: 6, padding: "0 12px", marginBottom: 6 }}>
              {[["prediction", "🔮", "Prediction"], ["challenge", "🏁", "Challenge"], ["arena", "🎮", "Halftime"]].map(([k, ico, lbl]) => (
                <button key={k} onClick={() => setActiveCard(k)} style={{ padding: "5px 14px", borderRadius: 8, border: `1px solid ${activeCard === k ? (k === "arena" ? T.cyan : T.gold) : T.border}`, background: activeCard === k ? `${k === "arena" ? T.cyan : T.gold}10` : "transparent", fontSize: 10, fontWeight: 700, color: activeCard === k ? (k === "arena" ? T.cyan : T.gold) : T.text3, cursor: "pointer" }}>{ico} {lbl}</button>
              ))}
            </div>
            {activeCard === "prediction" && (
              <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 16, padding: 14, margin: "0 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span>🔮</span><span style={{ fontSize: 11, fontWeight: 700, color: T.gold }}>PREDICTION</span><span style={{ fontSize: 10, color: T.text3, marginLeft: "auto" }}>+50 🪙</span></div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Next goal before 75th minute?</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["✅ YES", 62], ["❌ NO", 38]].map(([l, p]) => (
                    <button key={l} style={{ flex: 1, padding: "10px 6px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{l}</div><div style={{ fontSize: 10, color: T.text3, marginTop: 2 }}>{p}%</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeCard === "challenge" && (
              <div style={{ background: `${T.pink}08`, border: `1px solid ${T.pink}20`, borderRadius: 16, padding: 14, margin: "0 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><span>🏁</span><span style={{ fontSize: 11, fontWeight: 800, color: T.pink }}>CREATOR CHALLENGE</span><span style={{ fontSize: 10, color: T.text3, marginLeft: "auto" }}>100 🪙</span></div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>PUFF RACE</div>
                <div style={{ fontSize: 11, color: T.text2, marginBottom: 10 }}>Most puffs in 30 seconds wins!</div>
                <button onClick={triggerWave} style={{ width: "100%", padding: "10px 0", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${T.pink}, ${T.purpleDeep})`, color: "#fff", fontSize: 12, fontWeight: 800, cursor: "pointer", letterSpacing: 1 }}>JOIN CHALLENGE</button>
              </div>
            )}
            {activeCard === "arena" && (
              <div style={{ background: `${T.cyan}06`, border: `1px solid ${T.cyan}18`, borderRadius: 16, padding: 14, margin: "0 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span>🎮</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.cyan }}>HALFTIME — ARENA MINI-GAME</span>
                </div>
                <div style={{ fontSize: 10, color: T.text2, marginBottom: 10 }}>Halftime break! Play Arena games without leaving the stream.</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { icon: "⚽", name: "Final Kick", desc: "Quick 1v1", color: T.gold },
                    { icon: "🧠", name: "WC Trivia", desc: "5 questions", color: T.purple },
                  ].map(g => (
                    <button key={g.name} onClick={triggerWave} style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: `1px solid ${g.color}25`, background: `${g.color}08`, cursor: "pointer", textAlign: "center" }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}>{g.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: g.color }}>{g.name}</div>
                      <div style={{ fontSize: 9, color: T.text3, marginTop: 2 }}>{g.desc}</div>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 8, fontSize: 9, color: T.text3, textAlign: "center" }}>⏱ Halftime ends in 12:45 — game results shown in stream</div>
              </div>
            )}
          </div>
        )}

        {/* Bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 8, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)", padding: "60px 0 0" }}>
          <div style={{ maxHeight: 110, overflow: "hidden", padding: "0 12px", marginBottom: 8 }}>
            {chatMsgs.slice(-5).map((m, i) => <div key={i} style={{ fontSize: 12, marginBottom: 3, display: "flex", gap: 6 }}><span style={{ fontWeight: 700, color: m.c, flexShrink: 0 }}>{m.user}:</span><span style={{ color: T.text2 }}>{m.msg}</span></div>)}
          </div>
          <div style={{ display: "flex", gap: 4, padding: "0 12px", marginBottom: 8 }}>
            {REACTIONS.map((e, i) => <button key={i} onClick={() => addReaction(e)} style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "none", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{e}</button>)}
          </div>
          <div style={{ display: "flex", gap: 8, padding: "0 12px", marginBottom: 8 }}>
            <button onClick={addPuff} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${currentInput.color}, ${T.blue})`, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>{currentInput.icon} {currentInput.label.toUpperCase()}</button>
            <button onClick={triggerWave} style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${T.pinkBright}, ${T.gold})`, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>🌊 WAVE!</button>
            <button onClick={() => setShowTip(!showTip)} style={{ width: 46, height: 46, borderRadius: 12, border: `1px solid ${T.gold}30`, background: `${T.gold}08`, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>🪙</button>
          </div>
          {showTip && (
            <div style={{ padding: "10px 12px", margin: "0 12px 8px", background: `${T.gold}06`, borderRadius: 14, border: `1px solid ${T.gold}15` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, marginBottom: 8 }}>🪙 Tip {s.host} — Balance: {coins}</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[10, 50, 100, 500].map(a => <button key={a} onClick={() => { setCoins(p => Math.max(0, p - a)); setShowTip(false); addReaction("🪙"); }} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: `1px solid ${T.gold}20`, background: `${T.gold}06`, fontSize: 13, fontWeight: 700, color: T.gold, cursor: "pointer" }}>{a}</button>)}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, padding: "0 12px 16px" }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && chatInput.trim()) { setChatMsgs(p => [...p, { user: isHost ? "Host (You)" : "You", msg: chatInput, c: isHost ? T.gold : T.cyan }]); setChatInput(""); } }} placeholder={isHost ? "Say something as host..." : "Say something..."} style={{ flex: 1, padding: "11px 16px", borderRadius: 12, border: `1px solid ${isHost ? `${T.gold}30` : T.border}`, background: isHost ? `${T.gold}05` : T.surface, color: T.text, fontSize: 13, outline: "none" }} />
            <button style={{ width: 46, height: 46, borderRadius: 12, border: "none", background: isHost ? T.gold : T.pinkBright, color: "#fff", fontSize: 16, cursor: "pointer" }}>↑</button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes float{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-6px)}}
        @keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}40%{opacity:.9;transform:translateY(-50px) scale(1.15)}100%{opacity:0;transform:translateY(-150px) scale(.7)}}
        @keyframes wavePulse{0%{transform:scale(.4);opacity:0}25%{opacity:1;transform:scale(1)}100%{transform:scale(1.4);opacity:0}}
        @keyframes waveText{0%{transform:scale(.5);opacity:0}15%{transform:scale(1.08);opacity:1}30%{transform:scale(1)}100%{opacity:0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes raidBounce{0%{transform:scale(.3);opacity:0}50%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}
        @keyframes raidBar{0%{width:0}100%{width:100%}}
        input::placeholder{color:${T.text3}}
      `}</style>
    </div>
  );
}
