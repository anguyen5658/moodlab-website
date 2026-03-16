import { useState, useEffect, useCallback } from "react";

const C = {
  bg:"#07080F",bg2:"#0D0F1A",bg3:"#12152A",bg4:"#1A1E3A",
  pink:"#FF4D8D",cyan:"#00E5FF",gold:"#FFD93D",lime:"#7FFF00",
  purple:"#A855F7",orange:"#FF8C42",green:"#22C55E",red:"#EF4444",
  text1:"#E8EAF6",text2:"#8890B5",text3:"#5A6189",
  border:"rgba(255,255,255,0.06)",border2:"rgba(255,255,255,0.12)"
};

const TIERS = [
  { name:"Bronze", icon:"🥉", color:"#CD7F32", level:1, mult:"1x" },
  { name:"Silver", icon:"🥈", color:"#C0C0C0", level:5, mult:"1.2x" },
  { name:"Gold", icon:"🥇", color:C.gold, level:15, mult:"1.5x" },
  { name:"Diamond", icon:"💎", color:C.cyan, level:25, mult:"2x" },
  { name:"Legend", icon:"🔥", color:C.pink, level:50, mult:"3x" },
];

const BADGES = [
  { id:"fp", icon:"💨", name:"First Puff", cond:"Puff lần đầu", earned:true },
  { id:"100p", icon:"🌬", name:"100 Puffs", cond:"100 puffs", earned:true },
  { id:"bt", icon:"🐉", name:"Beast Tamer", cond:"Beast Mode ×10", earned:true },
  { id:"fb", icon:"⚔️", name:"First Blood", cond:"Thắng game đầu", earned:true },
  { id:"10w", icon:"🔥", name:"10 Win Streak", cond:"10 trận liên tiếp", earned:true },
  { id:"bk", icon:"👑", name:"Bracket King", cond:"Thắng Bracket", earned:false },
  { id:"sc", icon:"🌟", name:"Show Champ", cond:"Thắng Game Show", earned:true },
  { id:"ws", icon:"🌊", name:"Wave Starter", cond:"Puff Wave đầu", earned:true },
  { id:"tt", icon:"💰", name:"Top Tipper", cond:"Tip 1000 coins", earned:false },
  { id:"ww", icon:"🛡️", name:"Week Warrior", cond:"7-day streak", earned:true },
  { id:"cn", icon:"🏆", name:"Centurion", cond:"100-day streak", earned:false },
  { id:"sb", icon:"🦋", name:"Social Butterfly", cond:"Mời 5 bạn", earned:false },
  { id:"cl", icon:"📦", name:"Collector", cond:"20 items Shop", earned:false },
  { id:"sv", icon:"🏅", name:"Season Victor", cond:"BP tier 30", earned:false },
];

const SHOP = [
  { icon:"🐱", name:"Cat Avatar", price:100, cat:"Avatar" },
  { icon:"✨", name:"Gold Frame", price:300, cat:"Frame", tier:"Gold+" },
  { icon:"💨", name:"Smoke Trail", price:200, cat:"Puff Effect" },
  { icon:"🛡️", name:"Streak Shield", price:75, cat:"Utility" },
  { icon:"🌈", name:"Rainbow Name", price:250, cat:"Name Color", tier:"Gold+" },
  { icon:"🎲", name:"50/50 ×3", price:90, cat:"Power-up" },
  { icon:"🎨", name:"Neon Theme", price:500, cat:"Theme", tier:"Diamond+" },
  { icon:"⏰", name:"Extra Time ×5", price:100, cat:"Power-up" },
];

const BP_TIERS = Array.from({length:30},(_,i)=>{
  const t = i+1;
  const isMilestone = [5,10,15,20,25,30].includes(t);
  const rewards = isMilestone ? (t===30?"🔥 Season Badge + Mega Chest":`🎁 ${t<15?"Coins + Items":"Rare Rewards"}`) : `🪙 +${10+t*2} Coins`;
  return { tier:t, rewards, milestone:isMilestone, premium: isMilestone ? "✨ Exclusive" : `🪙 +${20+t*3}` };
});

const DAILY = [
  { day:1, coins:5, xp:10 }, { day:2, coins:5, xp:10 }, { day:3, coins:10, xp:15 },
  { day:4, coins:10, xp:15, bonus:"🎁" }, { day:5, coins:15, xp:20 }, { day:6, coins:20, xp:25 },
  { day:7, coins:50, xp:50, bonus:"🎁 Chest!" },
];

const CHALLENGES = [
  { type:"Control", task:"Puff 10 lần hôm nay", reward:10, done:true },
  { type:"Arena", task:"Chơi 3 games bất kỳ", reward:15, done:false },
  { type:"Live", task:"Xem 1 stream 5 phút", reward:10, done:false },
];

export default function LoyaltyDemo() {
  const [coins, setCoins] = useState(1420);
  const [xp, setXp] = useState(6800);
  const [level, setLevel] = useState(16);
  const [tierIdx, setTierIdx] = useState(2); // Gold
  const [streak, setStreak] = useState(12);
  const [tab, setTab] = useState("overview"); // overview|daily|battlepass|shop|badges|referral
  const [mainTab, setMainTab] = useState(3); // 0=Control,1=Arena,2=Live,3=Me
  const [toast, setToast] = useState(null);
  const [bpProgress, setBpProgress] = useState(14);
  const [checkedIn, setCheckedIn] = useState(false);
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [shopBought, setShopBought] = useState([]);

  const tier = TIERS[tierIdx];
  const nextTier = TIERS[tierIdx + 1];
  const xpForNext = nextTier ? nextTier.level * 500 : 999999;
  const xpProgress = Math.min((xp / xpForNext) * 100, 95);
  const earnedBadges = BADGES.filter(b => b.earned).length;

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const claimDaily = () => {
    if (checkedIn) return;
    const day = (streak % 7);
    const d = DAILY[day] || DAILY[0];
    setCoins(c => c + d.coins);
    setXp(x => x + d.xp);
    setStreak(s => s + 1);
    setCheckedIn(true);
    showToast(`+${d.coins} 🪙  +${d.xp} XP  Streak: ${streak + 1} 🔥`);
  };

  const completeChallenge = (idx) => {
    if (challenges[idx].done) return;
    const c = [...challenges];
    c[idx] = { ...c[idx], done: true };
    setChallenges(c);
    setCoins(v => v + c[idx].reward);
    setXp(v => v + 10);
    showToast(`+${c[idx].reward} 🪙 Challenge complete!`);
    if (c.every(ch => ch.done)) {
      setTimeout(() => {
        setCoins(v => v + 30);
        showToast("🎉 All 3 done! +30 BONUS 🪙");
      }, 800);
    }
  };

  const buyItem = (idx) => {
    if (shopBought.includes(idx)) return;
    const item = SHOP[idx];
    if (coins < item.price) { showToast("❌ Không đủ coins!"); return; }
    setCoins(c => c - item.price);
    setShopBought(b => [...b, idx]);
    showToast(`✅ Đã mua ${item.name}! -${item.price} 🪙`);
  };

  const s = {
    app: { width:"100%", maxWidth:420, margin:"0 auto", background:C.bg, minHeight:"100vh", fontFamily:"'Segoe UI',system-ui,sans-serif", position:"relative", overflow:"hidden", borderRadius:0 },
    statusBar: { display:"flex", justifyContent:"space-between", padding:"8px 16px", fontSize:11, color:C.text3, fontWeight:600 },
    header: { padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" },
    bottomNav: { position:"sticky", bottom:0, display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:C.bg2, borderTop:`1px solid ${C.border}`, padding:"6px 0" },
    navItem: (active) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"6px 0", fontSize:10, fontWeight:600, color: active ? C.pink : C.text3, cursor:"pointer" }),
    pill: (active, color) => ({ padding:"6px 14px", borderRadius:99, fontSize:12, fontWeight:700, background: active ? (color||C.pink) : "transparent", color: active ? "#fff" : C.text3, border: active ? "none" : `1px solid ${C.border}`, cursor:"pointer", whiteSpace:"nowrap" }),
    card: { background:C.bg3, borderRadius:14, border:`1px solid ${C.border}`, padding:14, marginBottom:10 },
    toast: { position:"fixed", top:60, left:"50%", transform:"translateX(-50%)", background:C.bg4, color:C.text1, padding:"10px 20px", borderRadius:12, fontSize:13, fontWeight:600, border:`1px solid ${C.border2}`, zIndex:999, boxShadow:"0 8px 32px rgba(0,0,0,.5)" },
  };

  const TabPill = ({ id, label, color }) => (
    <div style={s.pill(tab===id, color)} onClick={() => setTab(id)}>{label}</div>
  );

  return (
    <div style={s.app}>
      {toast && <div style={s.toast}>{toast}</div>}

      {/* Status Bar */}
      <div style={s.statusBar}><span>9:41</span><span style={{letterSpacing:2}}>MOOD LAB</span><span>100%🔋</span></div>

      {/* Header */}
      <div style={s.header}>
        <div style={{fontSize:20,fontWeight:800,color:C.text1}}>Me</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:4,background:C.bg3,padding:"4px 12px",borderRadius:99,border:`1px solid ${C.border}`}}>
            <span style={{fontSize:14}}>🪙</span>
            <span style={{fontFamily:"monospace",fontSize:14,fontWeight:800,color:C.gold}}>{coins.toLocaleString()}</span>
          </div>
          <div style={{width:32,height:32,borderRadius:99,background:C.bg3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,border:`1px solid ${C.border}`}}>⚙️</div>
        </div>
      </div>

      {/* Profile Card */}
      <div style={{margin:"0 16px 12px",background:`linear-gradient(135deg,${C.bg3},${tier.color}15)`,borderRadius:16,border:`1px solid ${tier.color}30`,padding:16}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${tier.color}40,${C.bg4})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,border:`2px solid ${tier.color}60`}}>🧑</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16,fontWeight:800,color:C.text1}}>User_420</span>
              <span style={{fontSize:14}}>{tier.icon}</span>
              <span style={{fontSize:11,fontWeight:700,color:tier.color}}>{tier.name}</span>
            </div>
            <div style={{display:"flex",gap:12,marginTop:6}}>
              <span style={{fontSize:11,color:C.text3}}>Lv.{level}</span>
              <span style={{fontSize:11,color:C.orange}}>🔥 {streak} streak</span>
              <span style={{fontSize:11,color:C.text3}}>🏅 {earnedBadges} badges</span>
            </div>
            <div style={{marginTop:8}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.text3,marginBottom:3}}>
                <span>XP: {xp.toLocaleString()}</span>
                <span>{nextTier ? `→ ${nextTier.name} (${xpForNext.toLocaleString()})` : "MAX"}</span>
              </div>
              <div style={{height:6,borderRadius:3,background:C.bg,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${xpProgress}%`,borderRadius:3,background:`linear-gradient(90deg,${tier.color},${C.cyan})`}} />
              </div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginTop:12}}>
          {BADGES.filter(b=>b.earned).slice(0,3).map(b=>(
            <span key={b.id} style={{fontSize:20,background:C.bg,borderRadius:8,padding:"4px 8px",border:`1px solid ${C.border}`}}>{b.icon}</span>
          ))}
          <span style={{fontSize:11,color:C.text3,alignSelf:"center",marginLeft:4}}>Featured</span>
        </div>
      </div>

      {/* Tab Pills */}
      <div style={{display:"flex",gap:6,padding:"0 16px 12px",overflowX:"auto"}}>
        <TabPill id="overview" label="Overview" />
        <TabPill id="daily" label="Daily" color={C.green} />
        <TabPill id="battlepass" label="Battle Pass" color={C.purple} />
        <TabPill id="shop" label="Shop" color={C.gold} />
        <TabPill id="badges" label="Badges" color={C.orange} />
        <TabPill id="referral" label="Referral" color={C.lime} />
      </div>

      {/* Content Area */}
      <div style={{padding:"0 16px 100px",minHeight:400}}>

        {/* OVERVIEW */}
        {tab==="overview" && <>
          {/* Tier Progress */}
          <div style={s.card}>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:2,color:C.text3,marginBottom:10}}>TIER PROGRESS</div>
            <div style={{display:"flex",gap:8,justifyContent:"center"}}>
              {TIERS.map((t,i)=>(
                <div key={i} style={{textAlign:"center",opacity:i<=tierIdx?1:.35}}>
                  <div style={{fontSize:24}}>{t.icon}</div>
                  <div style={{fontSize:9,fontWeight:700,color:t.color,marginTop:2}}>{t.name}</div>
                  <div style={{fontSize:8,color:C.text3}}>{t.mult}</div>
                </div>
              ))}
            </div>
            {nextTier && <div style={{marginTop:10,padding:"8px 12px",borderRadius:8,background:C.bg,fontSize:11,color:C.text2}}>
              Next: <strong style={{color:nextTier.color}}>{nextTier.name}</strong> — Level {nextTier.level} required
            </div>}
          </div>

          {/* Quick Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
            {[
              {label:"Coins",value:coins.toLocaleString(),icon:"🪙",color:C.gold},
              {label:"Games",value:"87",icon:"🎮",color:C.lime},
              {label:"Streams",value:"23",icon:"📺",color:C.orange},
            ].map((st,i)=>(
              <div key={i} style={{...s.card,textAlign:"center",marginBottom:0}}>
                <div style={{fontSize:18}}>{st.icon}</div>
                <div style={{fontFamily:"monospace",fontSize:18,fontWeight:800,color:st.color}}>{st.value}</div>
                <div style={{fontSize:9,color:C.text3,fontWeight:600,letterSpacing:1}}>{st.label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div style={{...s.card,cursor:"pointer",textAlign:"center"}} onClick={()=>setTab("daily")}>
              <div style={{fontSize:18}}>📅</div>
              <div style={{fontSize:12,fontWeight:700,color:C.green,marginTop:4}}>Daily Check-in</div>
              <div style={{fontSize:10,color:C.text3}}>{checkedIn?"✅ Claimed":"Claim now!"}</div>
            </div>
            <div style={{...s.card,cursor:"pointer",textAlign:"center"}} onClick={()=>setTab("battlepass")}>
              <div style={{fontSize:18}}>🎫</div>
              <div style={{fontSize:12,fontWeight:700,color:C.purple,marginTop:4}}>Battle Pass</div>
              <div style={{fontSize:10,color:C.text3}}>Tier {bpProgress}/30</div>
            </div>
            <div style={{...s.card,cursor:"pointer",textAlign:"center"}} onClick={()=>setTab("shop")}>
              <div style={{fontSize:18}}>🛒</div>
              <div style={{fontSize:12,fontWeight:700,color:C.gold,marginTop:4}}>Shop</div>
              <div style={{fontSize:10,color:C.text3}}>{SHOP.length} items</div>
            </div>
            <div style={{...s.card,cursor:"pointer",textAlign:"center"}} onClick={()=>setTab("referral")}>
              <div style={{fontSize:18}}>👥</div>
              <div style={{fontSize:12,fontWeight:700,color:C.lime,marginTop:4}}>Referral</div>
              <div style={{fontSize:10,color:C.text3}}>3 invited</div>
            </div>
          </div>
        </>}

        {/* DAILY */}
        {tab==="daily" && <>
          <div style={s.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:700,color:C.text1}}>Daily Check-in</div>
              <div style={{fontSize:12,color:C.orange,fontWeight:700}}>🔥 {streak} streak</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
              {DAILY.map((d,i)=>{
                const isCurrent = (streak%7)===i && !checkedIn;
                const isPast = i < (streak%7) || checkedIn;
                return (
                  <div key={i} style={{padding:"8px 4px",borderRadius:10,textAlign:"center",background:d.day===7?`${C.gold}15`:C.bg,border:`1px solid ${isCurrent?C.green+"60":d.day===7?C.gold+"30":C.border}`,opacity:isPast?.5:1}}>
                    <div style={{fontSize:9,fontWeight:700,color:C.text3}}>D{d.day}</div>
                    <div style={{fontSize:14,fontWeight:800,color:isPast?C.text3:C.green}}>+{d.coins}</div>
                    <div style={{fontSize:8,color:C.cyan}}>+{d.xp}xp</div>
                    {d.bonus && <div style={{fontSize:8,marginTop:2}}>{d.bonus}</div>}
                    {isPast && <div style={{fontSize:10,marginTop:2}}>✅</div>}
                  </div>
                );
              })}
            </div>
            <button onClick={claimDaily} style={{width:"100%",marginTop:12,padding:"10px 0",borderRadius:10,border:"none",fontWeight:700,fontSize:14,cursor:checkedIn?"default":"pointer",background:checkedIn?C.bg3:`linear-gradient(90deg,${C.green},${C.cyan})`,color:checkedIn?C.text3:"#fff"}}>
              {checkedIn ? "✅ Claimed Today" : "Claim Daily Reward"}
            </button>
          </div>

          <div style={s.card}>
            <div style={{fontSize:14,fontWeight:700,color:C.text1,marginBottom:12}}>Daily Challenges</div>
            {challenges.map((ch,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:10,background:C.bg,marginBottom:6,border:`1px solid ${C.border}`}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1}}>{ch.type.toUpperCase()}</div>
                  <div style={{fontSize:12,color:ch.done?C.text3:C.text1,marginTop:2}}>{ch.task}</div>
                </div>
                <button onClick={()=>completeChallenge(i)} style={{padding:"6px 12px",borderRadius:8,border:"none",fontSize:11,fontWeight:700,cursor:ch.done?"default":"pointer",background:ch.done?C.bg3:`${C.green}20`,color:ch.done?C.text3:C.green}}>
                  {ch.done ? "✅" : `+${ch.reward} 🪙`}
                </button>
              </div>
            ))}
            {challenges.every(c=>c.done) && <div style={{textAlign:"center",padding:10,borderRadius:10,background:`${C.gold}15`,border:`1px solid ${C.gold}30`,fontSize:12,fontWeight:700,color:C.gold}}>🎉 ALL DONE! +30 Bonus Claimed</div>}
          </div>
        </>}

        {/* BATTLE PASS */}
        {tab==="battlepass" && <>
          <div style={s.card}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:700,color:C.text1}}>⚡ World Cup Season</div>
              <div style={{fontSize:12,color:C.purple,fontWeight:700}}>Tier {bpProgress}/30</div>
            </div>
            <div style={{height:8,borderRadius:4,background:C.bg,marginBottom:6}}>
              <div style={{height:"100%",width:`${(bpProgress/30)*100}%`,borderRadius:4,background:`linear-gradient(90deg,${C.purple},${C.pink})`}} />
            </div>
            <div style={{fontSize:10,color:C.text3}}>42 days remaining</div>
          </div>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8}}>
            {BP_TIERS.slice(0,20).map(t=>(
              <div key={t.tier} style={{minWidth:64,padding:"10px 6px",borderRadius:10,textAlign:"center",border:`1px solid ${t.tier<=bpProgress?C.green+"40":t.milestone?C.gold+"40":C.border}`,background:t.tier<=bpProgress?`${C.green}10`:t.milestone?`${C.gold}08`:C.bg3,opacity:t.tier<=bpProgress?.6:1}}>
                <div style={{fontSize:12,fontWeight:800,color:t.tier<=bpProgress?C.green:t.milestone?C.gold:C.text3}}>{t.tier}</div>
                <div style={{fontSize:16,margin:"4px 0"}}>{t.tier<=bpProgress?"✅":t.milestone?"🎁":"🪙"}</div>
                <div style={{fontSize:8,color:C.text3}}>{t.milestone?"Special":"Coins"}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:10,color:C.text3,textAlign:"center",margin:"8px 0"}}>← Scroll for more →</div>

          <div style={{...s.card,background:`${C.pink}08`,border:`1px solid ${C.pink}20`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:C.pink}}>✨ Premium Track</div>
                <div style={{fontSize:11,color:C.text3,marginTop:2}}>Exclusive rewards at every tier</div>
              </div>
              <div style={{padding:"6px 14px",borderRadius:8,background:`${C.pink}15`,border:`1px solid ${C.pink}30`,fontSize:11,fontWeight:700,color:C.pink}}>COMING SOON</div>
            </div>
          </div>
        </>}

        {/* SHOP */}
        {tab==="shop" && <>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {SHOP.map((item,i)=>{
              const bought = shopBought.includes(i);
              const canAfford = coins >= item.price;
              return (
                <div key={i} style={{...s.card,textAlign:"center",marginBottom:0,opacity:bought?.5:1}}>
                  <div style={{fontSize:32,marginBottom:6}}>{item.icon}</div>
                  <div style={{fontSize:12,fontWeight:700,color:C.text1}}>{item.name}</div>
                  <div style={{fontSize:10,color:C.text3,marginTop:2}}>{item.cat}{item.tier?` • ${item.tier}`:""}</div>
                  <button onClick={()=>buyItem(i)} style={{marginTop:8,padding:"6px 16px",borderRadius:8,border:"none",fontSize:12,fontWeight:700,cursor:bought||!canAfford?"default":"pointer",background:bought?C.bg:`${C.gold}20`,color:bought?C.text3:canAfford?C.gold:C.red}}>
                    {bought ? "Owned" : `${item.price} 🪙`}
                  </button>
                </div>
              );
            })}
          </div>
        </>}

        {/* BADGES */}
        {tab==="badges" && <>
          <div style={{fontSize:12,color:C.text2,marginBottom:12}}>{earnedBadges}/{BADGES.length} earned</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {BADGES.map(b=>(
              <div key={b.id} style={{padding:12,borderRadius:12,textAlign:"center",background:b.earned?`${C.gold}08`:C.bg3,border:`1px solid ${b.earned?C.gold+"20":C.border}`,opacity:b.earned?1:.4}}>
                <div style={{fontSize:28,filter:b.earned?"none":"grayscale(1)"}}>{b.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:b.earned?C.text1:C.text3,marginTop:4}}>{b.name}</div>
                <div style={{fontSize:9,color:C.text3,marginTop:2}}>{b.cond}</div>
                {b.earned && <div style={{fontSize:8,color:C.green,marginTop:4,fontWeight:700}}>EARNED ✓</div>}
                {!b.earned && <div style={{fontSize:8,color:C.text3,marginTop:4}}>🔒 Locked</div>}
              </div>
            ))}
          </div>
        </>}

        {/* REFERRAL */}
        {tab==="referral" && <>
          <div style={s.card}>
            <div style={{fontSize:14,fontWeight:700,color:C.text1,marginBottom:8}}>Your Referral Code</div>
            <div style={{padding:"12px 16px",borderRadius:10,background:C.bg,border:`1px solid ${C.lime}30`,textAlign:"center"}}>
              <div style={{fontFamily:"monospace",fontSize:24,fontWeight:800,color:C.lime,letterSpacing:4}}>MOOD-X7K9</div>
            </div>
            <button onClick={()=>showToast("📋 Code copied!")} style={{width:"100%",marginTop:10,padding:"10px 0",borderRadius:10,border:"none",fontWeight:700,fontSize:13,cursor:"pointer",background:`linear-gradient(90deg,${C.lime},${C.green})`,color:"#000"}}>
              Share Code
            </button>
          </div>
          <div style={s.card}>
            <div style={{fontSize:13,fontWeight:700,color:C.text1,marginBottom:10}}>Rewards per Referral</div>
            {[
              {step:"Bạn đăng ký",you:"+25 🪙",friend:"+25 🪙"},
              {step:"Connect device",you:"+75 🪙",friend:"+50 🪙"},
              {step:"Chơi game đầu",you:"+50 🪙 + Badge",friend:"+25 🪙"},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",borderRadius:8,background:C.bg,marginBottom:4,fontSize:11}}>
                <span style={{color:C.text2}}>{r.step}</span>
                <span style={{color:C.green,fontWeight:700}}>{r.you}</span>
              </div>
            ))}
            <div style={{marginTop:10,padding:"10px 12px",borderRadius:8,background:`${C.gold}10`,border:`1px solid ${C.gold}20`,textAlign:"center"}}>
              <span style={{fontSize:12,fontWeight:700,color:C.gold}}>Total: +150 🪙 / referral (bạn) · +100 🪙 (friend)</span>
            </div>
          </div>
          <div style={s.card}>
            <div style={{fontSize:13,fontWeight:700,color:C.text1,marginBottom:8}}>Invited Friends (3/50)</div>
            {["Alex_Puff ✅ Connected","Mike_420 ✅ Playing","Jay_Smoke 📱 Registered"].map((f,i)=>(
              <div key={i} style={{padding:"8px 10px",borderRadius:8,background:C.bg,marginBottom:4,fontSize:12,color:C.text2}}>{f}</div>
            ))}
          </div>
        </>}
      </div>

      {/* Bottom Nav */}
      <div style={s.bottomNav}>
        {[{icon:"⚡",label:"Control",idx:0},{icon:"🎮",label:"Arena",idx:1},{icon:"📺",label:"Live",idx:2},{icon:"👤",label:"Me",idx:3}].map(n=>(
          <div key={n.idx} style={s.navItem(mainTab===n.idx)} onClick={()=>{setMainTab(n.idx);if(n.idx===3)setTab("overview")}}>
            <span style={{fontSize:18}}>{n.icon}</span>
            <span>{n.label}</span>
            {n.idx===3 && <div style={{position:"absolute",top:4,right:"calc(50% - 20px)",width:6,height:6,borderRadius:3,background:C.pink}} />}
          </div>
        ))}
      </div>
    </div>
  );
}
