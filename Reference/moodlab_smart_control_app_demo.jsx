import { useState, useRef, useEffect, useCallback } from "react";
const C={bg:"#080c18",bg2:"#0c1124",bg3:"#111830",card:"#141c35",border:"#1a2340",border2:"#243055",text:"#e8ecf4",text2:"#8b95b0",text3:"#5a6480",cyan:"#06d6a0",purple:"#a78bfa",purple2:"#c4b5fd",orange:"#fb923c",green:"#34d399",blue:"#60a5fa",pink:"#f472b6",gold:"#fbbf24",red:"#f87171"};
const HL=["OFF","CHILL","MED","INTENSE"],HC=[C.text3,C.blue,C.green,C.orange],HV=[0,2.2,2.8,3.4];
const PRESETS=[{id:"single",name:"Single",icon:"▰",tanks:1},{id:"dual",name:"Dual",icon:"▰▰",tanks:2},{id:"triple",name:"Triple",icon:"▰▰▰",tanks:3}];
const TLIB=[{name:"PURPLE HAZE",type:"THC · Sativa",color:"#a855f7",extract:"THC"},{name:"OG KUSH",type:"THC · Indica",color:"#ef4444",extract:"THC"},{name:"DUTCH TREAT",type:"CBD · Hybrid",color:"#22c55e",extract:"CBD"},{name:"BLUE DREAM",type:"THC · Sativa",color:"#3b82f6",extract:"THC"},{name:"GRANDDADDY",type:"CBD · Indica",color:"#8b5cf6",extract:"CBD"},{name:"HARLEQUIN",type:"CBD · Sativa",color:"#06b6d4",extract:"CBD"}];
const MOODS=[{id:"relax",name:"Relax",icon:"😌",color:C.blue,d:"CBD·Low"},{id:"focus",name:"Focus",icon:"🎯",color:C.gold,d:"Sativa·Med"},{id:"energy",name:"Energy",icon:"⚡",color:C.green,d:"Sativa·Hi"},{id:"sleep",name:"Sleep",icon:"🌙",color:C.purple,d:"Indica·Low"},{id:"social",name:"Social",icon:"🎉",color:C.pink,d:"Bal·Med"},{id:"creative",name:"Creative",icon:"🎨",color:C.orange,d:"Sativa·Var"},{id:"recovery",name:"Recovery",icon:"💚",color:C.cyan,d:"CBD·Gentle"}];
const PROS=[{id:"beast",name:"Beast",icon:"🔥",color:C.red,d:"Max output"},{id:"eco",name:"Eco",icon:"🌿",color:C.green,d:"Battery saver"},{id:"balance",name:"Balance",icon:"⚖️",color:C.blue,d:"All-purpose"},{id:"micro",name:"Micro",icon:"🔬",color:C.purple,d:"Ultra-low"}];
const TDEF=[{id:"preheat",name:"Smart Pre-Heat",icon:"🔥",color:C.gold,d:"AI dự đoán khi nào cần preheat"},{id:"lastdrop",name:"Last Drop",icon:"💧",color:C.orange,d:"Extract tối đa phần còn lại"},{id:"flavorfusion",name:"Flavor Fusion",icon:"🎨",color:C.pink,d:"Pha trộn hương vị"},{id:"extractfusion",name:"Extract Fusion",icon:"🧪",color:C.purple,d:"Unified multi-tank inhale"},{id:"jetlag",name:"Jet-Lag Recovery",icon:"✈️",color:C.blue,d:"AI guided recovery"},{id:"damage",name:"Damage Prevention",icon:"🛡️",color:C.green,d:"Bảo vệ cartridge & device"}];

const Tog=({on,color,onChange,s="m"})=>{const w=s==="s"?36:44,h=s==="s"?20:24,dd=s==="s"?14:18;return(<div onClick={e=>{e.stopPropagation();onChange()}} style={{width:w,height:h,borderRadius:h/2,cursor:"pointer",background:on?color:C.bg3,border:`1.5px solid ${on?color:C.border}`,position:"relative",transition:"all .3s",flexShrink:0}}><div style={{width:dd,height:dd,borderRadius:"50%",background:"#fff",position:"absolute",top:(h-dd)/2-1.5,left:on?w-dd-4:2,transition:"left .3s",boxShadow:"0 1px 3px rgba(0,0,0,.3)"}}/></div>)};
const Sld=({value,min,max,step=0.1,color,onChange,label,unit=""})=>(<div style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:11,color:C.text2,fontWeight:600}}>{label}</span><span style={{fontSize:14,fontFamily:"monospace",fontWeight:800,color,letterSpacing:1}}>{value}{unit}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(+e.target.value)} style={{width:"100%",accentColor:color,height:6}}/></div>);
const Chip=({t,c})=>(<span style={{display:"inline-block",padding:"3px 9px",borderRadius:100,fontSize:9,fontWeight:700,color:c,background:`${c}15`,border:`1px solid ${c}25`,marginRight:4,marginBottom:4}}>{t}</span>);
const Back=({onClick,title,sub,color,right})=>(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><div onClick={onClick} style={{width:34,height:34,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:C.bg3,border:`1px solid ${C.border}`,fontSize:13,color:C.text2,fontWeight:700}}>←</div><div style={{flex:1}}><div style={{fontSize:15,fontWeight:800,color}}>{title}</div><div style={{fontSize:10,color:C.text3}}>{sub}</div></div>{right}</div>);

export default function App(){
  const[phase,setPhase]=useState("setup");
  const[devPre,setDevPre]=useState(null);
  const[tanks,setTanks]=useState([]);
  const[tankSel,setTankSel]=useState(-1);
  const[btOn,setBtOn]=useState(false);
  const[btIng,setBtIng]=useState(false);
  const[tankHeat,setTankHeat]=useState([]);
  const[activeTank,setActiveTank]=useState(0);
  const[proMode,setProMode]=useState(null);
  const[moodMode,setMoodMode]=useState(null);
  const[proExp,setProExp]=useState(null);
  const[beastV,setBeastV]=useState(3.7);
  const[ecoLv,setEcoLv]=useState(1);
  const[balLv,setBalLv]=useState(2);
  const[microV,setMicroV]=useState(1.8);
  const[blendMode,setBlendMode]=useState(null);
  const[entR,setEntR]=useState(70);
  const[hybR,setHybR]=useState(60);
  const[toolView,setToolView]=useState(null);
  const[ts,setTs]=useState({preheat:{on:false,temp:2.4,dur:3,auto:true,notify:true},lastdrop:{on:false,pulse:3,int:70,autoDetect:true,minLevel:5},flavorfusion:{on:false,bal:50,curve:"smooth",preview:true},extractfusion:{on:false,pri:"balanced",sync:"simultaneous",ratio:50},jetlag:{on:false,from:-8,to:7,fat:60,sessions:3,mode:"gradual"},damage:{on:true,maxV:3.4,warnV:3.2,autoShutoff:8,cooldown:true}});
  const[puffs,setPuffs]=useState(47);
  const[blinks,setBlinks]=useState(3);
  const[lastThc,setLastThc]=useState(1.6);
  const[lastCbd,setLastCbd]=useState(0.8);
  const[totalThc,setTotalThc]=useState(24.3);
  const[totalCbd,setTotalCbd]=useState(14.4);
  const[inhaling,setInhaling]=useState(false);
  const[inhProg,setInhProg]=useState(0);
  const[vapor,setVapor]=useState(false);
  const iStart=useRef(null),iTimer=useRef(null);
  const[sec,setSec]=useState("heat");
  const[notif,setNotif]=useState(null);
  const[aiFlash,setAiFlash]=useState(false);
  const[devGlow,setDevGlow]=useState(null);
  // Sub-screens
  const[showUsage,setShowUsage]=useState(false);
  const[precisionMode,setPrecisionMode]=useState(false);
  const[precisionCurves,setPrecisionCurves]=useState({});
  const[dragInfo,setDragInfo]=useState(null);
  const graphRef=useRef(null);
  const initCurves=(tks)=>{const c={};tks.forEach((_,i)=>{c[i]=[{x:0,y:2.0+i*0.2},{x:2,y:2.6+i*0.15},{x:4,y:3.0+i*0.1},{x:6,y:2.5-i*0.1},{x:8,y:2.2}]});setPrecisionCurves(c)};
  useEffect(()=>{if(tanks.length>0&&Object.keys(precisionCurves).length===0)initCurves(tanks)},[tanks]);
  // Bottom tab
  const[mainTab,setMainTab]=useState(0); // 0=Control,1=Game,2=Live,3=Me
  // Usage tracking
  const[usageTimeFilter,setUsageTimeFilter]=useState("today");
  const[trkPuffDisplay,setTrkPuffDisplay]=useState(true);
  const[trkBlinkerWarn,setTrkBlinkerWarn]=useState(true);
  const[trkDailyAlert,setTrkDailyAlert]=useState(false);
  const[trkExport,setTrkExport]=useState(false);
  const[trkSessionRemind,setTrkSessionRemind]=useState(false);
  // Me tab
  const[childLock,setChildLock]=useState(false);
  const[childPin,setChildPin]=useState("1234");
  const[authMethod,setAuthMethod]=useState("bt");
  const[authStatus,setAuthStatus]=useState("verified");
  // AI Engine
  const[aiPipes,setAiPipes]=useState([0,0,0,0,0,0,0]);
  // AI Recommendations
  const[showRec,setShowRec]=useState(false);
  const[recIdx,setRecIdx]=useState(0);
  const[recFilter,setRecFilter]=useState("all");
  const[recDismissed,setRecDismissed]=useState([]);
  const[recApplied,setRecApplied]=useState([]);
  const[recTab,setRecTab]=useState("active"); // active | history | settings
  const[recDailyLimit,setRecDailyLimit]=useState(50);
  const[recAutoMode,setRecAutoMode]=useState(true);
  const[recLearnPref,setRecLearnPref]=useState(true);
  const[recNotify,setRecNotify]=useState(true);
  const AI_RECS=[
    {icon:"🌡",msg:"Heat đang cao hơn 15% so với session trước — giảm để bảo vệ flavor",c:C.orange,cat:"Heat"},
    {icon:"💧",msg:"Cartridge Tank 1 còn ~20% — bật Last Drop khi gần hết",c:C.orange,cat:"Alert"},
    {icon:"😌",msg:"Usage pattern cho thấy bạn thích Relax vào giờ này — thử Mood Mode?",c:C.blue,cat:"Mood"},
    {icon:"⚖️",msg:"THC:CBD ratio hôm nay là 65:35 — cân bằng hơn so với hôm qua",c:C.green,cat:"Balance"},
    {icon:"🔋",msg:"Battery 68% — Eco mode sẽ kéo thêm ~2h sử dụng",c:C.green,cat:"Battery"},
    {icon:"🧬",msg:"Thử Entourage 60:40 — nhiều user với profile tương tự thích ratio này",c:C.purple,cat:"Blend"},
    {icon:"⏰",msg:"Bạn đã dùng 38mg extract hôm nay — approaching daily comfort zone",c:C.gold,cat:"Usage"},
    {icon:"🔥",msg:"Pre-Heat sẽ cải thiện flavor 30% cho Purple Haze ở nhiệt hiện tại",c:C.gold,cat:"Tools"},
    {icon:"🌙",msg:"Theo circadian data, Sleep mode sẽ hiệu quả nhất trong 1 tiếng tới",c:C.purple,cat:"Mood"},
    {icon:"✈️",msg:"Jet-Lag detected — timezone shift 8h — khuyến nghị CBD-heavy recovery",c:C.blue,cat:"Recovery"},
  ];
  useEffect(()=>{const iv=setInterval(()=>setRecIdx(p=>(p+1)%AI_RECS.length),3000);return()=>clearInterval(iv)},[]);

  const notify=useCallback((m,c=C.cyan)=>{setNotif({m,c});setTimeout(()=>setNotif(null),2200)},[]);
  const flashAI=useCallback(()=>{setAiFlash(true);setAiPipes(prev=>prev.map(()=>Math.random()));setTimeout(()=>setAiFlash(false),800)},[]);
  const flashDev=useCallback(c=>{setDevGlow(c);setTimeout(()=>setDevGlow(null),600)},[]);
  const uTool=(id,p)=>{setTs(prev=>({...prev,[id]:{...prev[id],...p}}));flashAI()};

  // AI pipe animation
  useEffect(()=>{const iv=setInterval(()=>{if(inhaling||aiFlash)setAiPipes(p=>p.map(()=>Math.min(1,Math.random()*1.2)))},400);return()=>clearInterval(iv)},[inhaling,aiFlash]);

  const selPreset=p=>{setDevPre(p);const t=TLIB.slice(0,p.tanks);setTanks(t);setTankHeat(t.map(()=>2))};
  const swapTank=(i,t)=>{const n=[...tanks];n[i]=t;setTanks(n);setTankSel(-1)};
  const launch=()=>{if(!devPre)return;setPhase("connect");setBtOn(false)};
  const connectBT=()=>{if(btOn){setBtOn(false);setPhase("connect");notify("Disconnected — Features Locked",C.red);return}setBtIng(true);notify("Scanning...",C.blue);setTimeout(()=>{setBtIng(false);setBtOn(true);setPhase("control");notify("Connected ✓ — All Features Unlocked",C.green);flashDev(C.blue);flashAI()},1800)};
  const setHeatFn=(i,lv)=>{setProMode(null);setMoodMode(null);setProExp(null);const n=[...tankHeat];n[i]=lv;setTankHeat(n);if(lv>0)flashAI();flashDev(HC[lv])};
  const selPro=id=>{if(proMode===id){setProMode(null);setProExp(null);notify("Standard",C.text2);return}setProMode(id);setMoodMode(null);setBlendMode(null);const h={beast:3,eco:ecoLv,balance:balLv,micro:1};setTankHeat(tanks.map(()=>h[id]||2));flashAI();const c={beast:C.red,eco:C.green,balance:C.blue,micro:C.purple}[id];flashDev(c);notify(`${id[0].toUpperCase()+id.slice(1)} Mode`,c);setProExp(id)};
  const selMood=m=>{if(moodMode===m.id){setMoodMode(null);notify("Mood OFF",C.text2);return}setMoodMode(m.id);setProMode(null);setProExp(null);flashAI();flashDev(m.color);notify(`${m.name} — AI...`,m.color)};
  const startPuff=()=>{if(tankHeat.every(h=>h===0)){notify("All OFF",C.text3);return}iStart.current=Date.now();setInhaling(true);setVapor(true);iTimer.current=setInterval(()=>{const e=(Date.now()-iStart.current)/1000;setInhProg(Math.min(e/5,1));if(e>=5)endPuff(true)},50)};
  const endPuff=(bl=false)=>{clearInterval(iTimer.current);const d=iStart.current?(Date.now()-iStart.current)/1000:0;setInhaling(false);setInhProg(0);setTimeout(()=>setVapor(false),1500);if(d>0.3){setPuffs(p=>Math.min(p+1,999));if(bl||d>=5){setBlinks(b=>Math.min(b+1,999));notify("BLINKER!",C.orange);flashDev(C.orange)}if(btOn){let thcMg=0,cbdMg=0;tanks.forEach((tk,i)=>{if(tankHeat[i]>0){const mg=Math.round(tankHeat[i]*0.7*Math.min(d,5)*0.8/tanks.length*10)/10;if(tk.extract==="THC")thcMg+=mg;else cbdMg+=mg}});setLastThc(Math.round(thcMg*10)/10);setLastCbd(Math.round(cbdMg*10)/10);setTotalThc(t=>Math.round((t+thcMg)*10)/10);setTotalCbd(t=>Math.round((t+cbdMg)*10)/10)}}};
  useEffect(()=>()=>clearInterval(iTimer.current),[]);
  const acColor=moodMode?MOODS.find(m=>m.id===moodMode)?.color:proMode?{beast:C.red,eco:C.green,balance:C.blue,micro:C.purple}[proMode]:C.cyan;
  const pad3=n=>String(n).padStart(3,"0");
  const secs=[{id:"heat",l:"Heat",i:"🔥"},{id:"pro",l:"Pro",i:"⚡"},{id:"blend",l:"Blend",i:"🧬"},{id:"mood",l:"Mood",i:"🧠"},{id:"tools",l:"Tools",i:"🛠"}];
  const PIPE_NAMES=["Extract","Profile","Behavior","Device","Session","Environ","Feedback"];
  const PIPE_COLORS=[C.green,C.blue,C.purple,C.orange,C.cyan,C.gold,C.pink];

  // ═══ AI ENGINE STRIP ═══
  const AIStrip=()=>(<div style={{margin:"8px 20px",padding:"10px 14px",borderRadius:14,background:`linear-gradient(135deg,${C.bg2},${C.bg3})`,border:`1px solid ${aiFlash||inhaling?C.purple+"40":C.border}`,boxShadow:aiFlash?`0 0 20px ${C.purple}10`:"none",transition:"all .4s",position:"relative",zIndex:2}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:12}}>🧠</span>
        <span style={{fontSize:10,fontWeight:800,letterSpacing:1,color:aiFlash||inhaling?C.purple:C.text3}}>AI ENGINE</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:4}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:aiFlash||inhaling?C.green:btOn?C.green:C.text3,animation:aiFlash||inhaling?"pulse .5s infinite":"none"}}/>
        <span style={{fontSize:9,fontWeight:700,color:aiFlash||inhaling?C.green:btOn?C.green:C.text3}}>{inhaling?"PROCESSING":aiFlash?"SYNCING":btOn?"READY":"STANDBY"}</span>
      </div>
    </div>
    <div style={{display:"flex",gap:3}}>
      {PIPE_NAMES.map((p,i)=>(<div key={i} style={{flex:1,textAlign:"center"}}>
        <div style={{height:20,borderRadius:3,background:C.bg,overflow:"hidden",marginBottom:3}}>
          <div style={{width:"100%",borderRadius:3,background:PIPE_COLORS[i],transition:"height .3s",height:`${Math.max(10,aiPipes[i]*(inhaling?100:aiFlash?80:btOn?30:10))}%`,opacity:inhaling||aiFlash?.9:.3}}/>
        </div>
        <div style={{fontSize:7,color:C.text3,fontWeight:600,letterSpacing:.3}}>{p.slice(0,4)}</div>
      </div>))}
    </div>
  </div>);

  // ═══ SETUP ═══
  if(phase==="setup")return(
    <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-100,left:"50%",transform:"translateX(-50%)",width:500,height:500,borderRadius:"50%",pointerEvents:"none",background:`radial-gradient(circle,${C.cyan}10 0%,transparent 60%)`}}/>
      <div style={{padding:"60px 24px 32px",textAlign:"center",position:"relative",zIndex:2}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:C.cyan,marginBottom:8,opacity:.7}}>MOOD LAB</div>
        <div style={{fontSize:28,fontWeight:900,color:C.text,letterSpacing:-1,marginBottom:4}}>Device Setup</div>
        <div style={{fontSize:13,color:C.text3,marginBottom:40}}>Chọn cấu hình device</div>
        <div style={{textAlign:"left",marginBottom:28}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:12}}>STEP 1 — DEVICE TYPE</div>
          <div style={{display:"flex",gap:8}}>{PRESETS.map(p=>(<div key={p.id} onClick={()=>selPreset(p)} style={{flex:1,padding:"16px 10px",borderRadius:14,cursor:"pointer",textAlign:"center",background:devPre?.id===p.id?`${C.cyan}12`:C.bg2,border:`1.5px solid ${devPre?.id===p.id?C.cyan+"50":C.border}`}}>
            <div style={{fontSize:20,letterSpacing:4,marginBottom:8,color:devPre?.id===p.id?C.cyan:C.text3,fontWeight:900}}>{p.icon}</div>
            <div style={{fontSize:13,fontWeight:800,color:devPre?.id===p.id?C.cyan:C.text}}>{p.name}</div>
          </div>))}</div>
        </div>
        {devPre&&(<div style={{textAlign:"left",marginBottom:28}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:12}}>STEP 2 — CARTRIDGES</div>
          {tanks.map((tk,i)=>(<div key={i} style={{marginBottom:8}}>
            <div onClick={()=>setTankSel(tankSel===i?-1:i)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,cursor:"pointer",background:C.bg2,border:`1.5px solid ${tankSel===i?tk.color+"50":C.border}`}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:tk.color}}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:tk.color}}>{tk.name}</div><div style={{fontSize:10,color:C.text3}}>{tk.type}</div></div>
              <span style={{fontSize:10,color:C.text3}}>Tank {i+1} {tankSel===i?"▲":"▼"}</span>
            </div>
            {tankSel===i&&(<div style={{marginTop:4,borderRadius:10,overflow:"hidden",border:`1px solid ${C.border}`,background:C.bg3}}>
              {TLIB.filter(t=>!tanks.find((x,j)=>j!==i&&x.name===t.name)).map(t=>(<div key={t.name} onClick={()=>swapTank(i,t)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:`1px solid ${C.border}`,background:tk.name===t.name?`${t.color}10`:"transparent"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:t.color}}/><span style={{fontSize:12,fontWeight:600,color:t.color}}>{t.name}</span><span style={{fontSize:10,color:C.text3,marginLeft:"auto"}}>{t.type}</span>
              </div>))}
            </div>)}
          </div>))}
        </div>)}
        {devPre&&(<div onClick={launch} style={{padding:"16px 0",borderRadius:14,textAlign:"center",cursor:"pointer",background:`linear-gradient(135deg,${C.cyan}20,${C.cyan}08)`,border:`2px solid ${C.cyan}40`,fontSize:16,fontWeight:800,color:C.cyan}}>NEXT — CONNECT DEVICE →</div>)}
      </div>
      <style>{`input[type=range]{-webkit-appearance:none;background:${C.bg3};border-radius:4px;outline:none;height:6px}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;cursor:pointer;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.3)}`}</style>
    </div>);

  // ═══ CONNECT PHASE ═══
  if(phase==="connect")return(
    <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:500,height:500,borderRadius:"50%",pointerEvents:"none",background:`radial-gradient(circle,${C.blue}10 0%,transparent 55%)`}}/>
      {notif&&(<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:100,zIndex:999,background:`${notif.c}18`,border:`1px solid ${notif.c}40`,color:notif.c,fontSize:13,fontWeight:700,animation:"fadeSlide .3s ease",backdropFilter:"blur(12px)"}}>{notif.m}</div>)}
      <div style={{padding:"40px 24px 32px",position:"relative",zIndex:2}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:32}}>
          <div onClick={()=>setPhase("setup")} style={{width:34,height:34,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:C.bg3,border:`1px solid ${C.border}`,fontSize:13,color:C.text2}}>←</div>
          <div><div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:C.cyan,opacity:.7}}>MOOD LAB</div><div style={{fontSize:10,color:C.text3}}>Step 3 — Connect Device</div></div>
        </div>

        {/* Device summary */}
        <div style={{padding:16,borderRadius:16,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:24}}>
          <div style={{fontSize:12,fontWeight:700,color:C.text2,marginBottom:10}}>Your Device</div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            {tanks.map((tk,i)=>(<div key={i} style={{flex:1,padding:"8px 6px",borderRadius:10,background:C.bg3,border:`1px solid ${C.border}`,textAlign:"center"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:tk.color,margin:"0 auto 4px"}}/>
              <div style={{fontSize:10,fontWeight:700,color:tk.color}}>{tk.name}</div>
              <div style={{fontSize:8,color:C.text3}}>{tk.type}</div>
            </div>))}
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:16,padding:"8px 0",borderTop:`1px solid ${C.border}`}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:C.text}}>{tanks.length}</div><div style={{fontSize:8,color:C.text3}}>TANKS</div></div>
            <div style={{width:1,background:C.border}}/>
            <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:C.text3}}>—</div><div style={{fontSize:8,color:C.text3}}>STATUS</div></div>
            <div style={{width:1,background:C.border}}/>
            <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:C.red}}>🔒</div><div style={{fontSize:8,color:C.red}}>LOCKED</div></div>
          </div>
        </div>

        {/* BIG connect button */}
        <div onClick={connectBT} style={{padding:"24px 0",borderRadius:20,textAlign:"center",cursor:"pointer",marginBottom:24,background:btIng?`linear-gradient(135deg,${C.gold}15,${C.gold}05)`:`linear-gradient(135deg,${C.blue}15,${C.blue}05)`,border:`2px solid ${btIng?C.gold+"40":C.blue+"40"}`,boxShadow:`0 0 40px ${btIng?C.gold:C.blue}10`,transition:"all .3s"}}>
          <div style={{fontSize:40,marginBottom:8,animation:btIng?"pulse 1s infinite":"none"}}>{btIng?"📶":"🔗"}</div>
          <div style={{fontSize:18,fontWeight:900,color:btIng?C.gold:C.blue,letterSpacing:1,marginBottom:4}}>{btIng?"CONNECTING...":"CONNECT DEVICE"}</div>
          <div style={{fontSize:12,color:C.text3}}>Kết nối Bluetooth để mở khoá toàn bộ tính năng</div>
        </div>

        {/* Feature preview - locked */}
        <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:12}}>FEATURES UNLOCKED AFTER CONNECT</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {[
            {i:"🔥",n:"Smart Heat Control",d:"4 levels + AI optimize",c:C.orange},
            {i:"⚡",n:"Pro Modes",d:"Beast · Eco · Balance · Micro",c:C.red},
            {i:"🧬",n:"Blend Modes",d:"Entourage · True Hybrid",c:C.green},
            {i:"🧠",n:"Mood Modes",d:"7 AI-powered moods",c:C.purple},
            {i:"🛠",n:"Pro Tools",d:"6 advanced features",c:C.gold},
            {i:"📊",n:"Usage Tracking",d:"Puff · Blinker · Extract mg",c:C.cyan},
          ].map((f,idx)=>(<div key={idx} style={{padding:"12px 10px",borderRadius:12,background:C.bg2,border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
            {/* Lock overlay */}
            <div style={{position:"absolute",inset:0,background:`${C.bg}60`,backdropFilter:"blur(1px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,borderRadius:12}}>
              <span style={{fontSize:14}}>🔒</span>
            </div>
            <div style={{textAlign:"center",opacity:.5}}>
              <div style={{fontSize:22,marginBottom:4}}>{f.i}</div>
              <div style={{fontSize:11,fontWeight:700,color:f.c}}>{f.n}</div>
              <div style={{fontSize:8,color:C.text3,marginTop:2}}>{f.d}</div>
            </div>
          </div>))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:16}}>
          {[{i:"🎮",n:"Game"},{i:"📡",n:"Live"},{i:"🔒",n:"Child Lock"}].map((f,idx)=>(<div key={idx} style={{padding:"10px 6px",borderRadius:10,background:C.bg2,border:`1px solid ${C.border}`,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:`${C.bg}60`,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,borderRadius:10}}><span style={{fontSize:12}}>🔒</span></div>
            <div style={{opacity:.5}}><div style={{fontSize:18}}>{f.i}</div><div style={{fontSize:9,fontWeight:600,color:C.text3}}>{f.n}</div></div>
          </div>))}
        </div>
        <div style={{padding:"10px 16px",borderRadius:12,background:`${C.blue}08`,border:`1px solid ${C.blue}15`,textAlign:"center"}}>
          <div style={{fontSize:11,color:C.blue,fontWeight:600,lineHeight:1.6}}>📶 Bluetooth kết nối app ↔ device</div>
          <div style={{fontSize:10,color:C.text3,lineHeight:1.5}}>Smart Control cần kết nối để gửi lệnh đến chip. Tất cả tính năng bị khoá cho đến khi pair thành công.</div>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}@keyframes fadeSlide{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>);

  // ═══ USAGE TRACKING SCREEN ═══
  const usageMult={today:1,week:7,month:28};const um=usageMult[usageTimeFilter]||1;
  const usageCharts={today:[35,60,45,80,25,55,70,40,90,50,65,30],week:[45,70,35,80,60,55,90],month:[60,45,75,50,85,40,70,55,65,80,50,70]};
  const usageLabels={today:["9AM","","","12PM","","","3PM","","","6PM","","Now"],week:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],month:["W1","","","W2","","","W3","","","W4","",""]};
  const usageRecTips=[
    {icon:"⚠️",msg:`Blinker rate ${blinks>5?"cao":"bình thường"} — ${blinks>5?"thử giảm heat hoặc rút ngắn puff":"keep it up!"}`,c:blinks>5?C.orange:C.green},
    {icon:"📊",msg:`THC:CBD ratio hôm nay ${totalThc>0?(totalThc/(totalThc+totalCbd)*100).toFixed(0):"--"}:${totalCbd>0?(totalCbd/(totalThc+totalCbd)*100).toFixed(0):"--"} — ${totalThc>totalCbd*2?"nặng THC, cân nhắc thêm CBD":"balanced"}`,c:totalThc>totalCbd*2?C.gold:C.green},
    {icon:"💡",msg:`Avg ${puffs>0?((totalThc+totalCbd)/puffs).toFixed(1):"0"} mg/puff — ${puffs>30?"high frequency session":"moderate pace"}`,c:puffs>30?C.orange:C.cyan},
  ];

  if(showUsage)return(
    <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",padding:"16px 20px 40px",position:"relative",overflow:"hidden"}}>
      {/* Ambient glow */}
      <div style={{position:"absolute",top:-60,right:-40,width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}08,transparent 65%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:200,left:-60,width:160,height:160,borderRadius:"50%",background:`radial-gradient(circle,${C.cyan}06,transparent 65%)`,pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:2}}>
      <Back onClick={()=>setShowUsage(false)} title="📊 Usage Tracking" sub="Session analytics & history" color={C.gold}/>

      {/* Time filter — pill style */}
      <div style={{display:"flex",gap:0,marginBottom:16,padding:3,borderRadius:12,background:C.bg2,border:`1px solid ${C.border}`}}>
        {[{id:"today",l:"Today"},{id:"week",l:"This Week"},{id:"month",l:"This Month"}].map(f=>(<div key={f.id} onClick={()=>setUsageTimeFilter(f.id)} style={{flex:1,padding:"9px 0",borderRadius:10,textAlign:"center",cursor:"pointer",background:usageTimeFilter===f.id?`linear-gradient(135deg,${C.gold}20,${C.gold}08)`:"transparent",boxShadow:usageTimeFilter===f.id?`0 2px 8px ${C.gold}15`:"none",fontSize:11,fontWeight:700,color:usageTimeFilter===f.id?C.gold:C.text3,transition:"all .25s"}}>{f.l}</div>))}
      </div>

      {/* Hero stat — center big number */}
      <div style={{textAlign:"center",padding:"20px 0 16px",marginBottom:14,borderRadius:20,background:`linear-gradient(160deg,${C.bg2},${C.bg3})`,border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 0%,${C.cyan}06,transparent 60%)`,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:2}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:C.text3,marginBottom:6}}>{usageTimeFilter==="today"?"TODAY'S SESSION":usageTimeFilter==="week"?"THIS WEEK":"THIS MONTH"}</div>
          <div style={{fontFamily:"monospace",fontSize:44,fontWeight:900,color:C.text,letterSpacing:2,lineHeight:1}}>{pad3(Math.round(puffs*um))}</div>
          <div style={{fontSize:11,color:C.text3,fontWeight:600,marginTop:4}}>total puffs</div>
          {/* Mini stat row */}
          <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}`,margin:"14px 24px 0"}}>
            <div><div style={{fontFamily:"monospace",fontSize:18,fontWeight:800,color:C.orange}}>{pad3(Math.round(blinks*um))}</div><div style={{fontSize:9,color:C.text3}}>Blinkers</div></div>
            <div style={{width:1,background:C.border}}/>
            <div><div style={{fontFamily:"monospace",fontSize:18,fontWeight:800,color:C.cyan}}>{puffs>0?((totalThc+totalCbd)*um/Math.round(puffs*um)).toFixed(1):"0.0"}</div><div style={{fontSize:9,color:C.text3}}>mg/puff</div></div>
            <div style={{width:1,background:C.border}}/>
            <div><div style={{fontFamily:"monospace",fontSize:18,fontWeight:800,color:C.green}}>{((totalThc+totalCbd)*um).toFixed(0)}</div><div style={{fontSize:9,color:C.text3}}>mg total</div></div>
          </div>
        </div>
      </div>

      {/* THC / CBD — glass cards */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[
          {label:"THC",total:totalThc,last:lastThc,color:"#ef4444",bg:"#ef4444"},
          {label:"CBD",total:totalCbd,last:lastCbd,color:C.green,bg:C.green},
        ].map((ext,i)=>(<div key={i} style={{flex:1,padding:"14px 12px",borderRadius:16,background:`linear-gradient(160deg,${ext.bg}08,${ext.bg}03)`,border:`1px solid ${ext.bg}18`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-10,right:-10,width:50,height:50,borderRadius:"50%",background:`${ext.bg}06`,pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:2}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:10,fontWeight:800,color:ext.color,padding:"2px 8px",borderRadius:100,background:`${ext.bg}12`,letterSpacing:.5}}>{ext.label}</span>
              {!btOn&&<span style={{fontSize:7,fontWeight:700,color:C.blue,padding:"2px 5px",borderRadius:100,background:`${C.blue}12`}}>BT</span>}
            </div>
            <div style={{fontFamily:"monospace",fontSize:26,fontWeight:900,color:btOn?ext.color:C.text3,letterSpacing:1,lineHeight:1}}>{btOn?(ext.total*um).toFixed(1):"--.-"}</div>
            <div style={{fontSize:9,color:C.text3,marginTop:3}}>mg total</div>
            <div style={{display:"flex",alignItems:"center",gap:4,marginTop:8,padding:"5px 8px",borderRadius:8,background:`${ext.bg}06`}}>
              <div style={{width:4,height:4,borderRadius:"50%",background:btOn?ext.color:C.text3}}/>
              <span style={{fontSize:10,color:C.text3}}>Last puff:</span>
              <span style={{fontSize:11,fontWeight:800,fontFamily:"monospace",color:btOn?ext.color:C.text3}}>{btOn?ext.last.toFixed(1):"--"}</span>
              <span style={{fontSize:9,color:C.text3}}>mg</span>
            </div>
          </div>
        </div>))}
      </div>

      {/* Session chart — improved */}
      <div style={{padding:"14px 14px 10px",borderRadius:16,background:`linear-gradient(160deg,${C.bg2},${C.bg3})`,border:`1px solid ${C.border}`,marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:C.text}}>Activity</div>
          <span style={{fontSize:9,fontWeight:600,color:C.gold,padding:"3px 10px",borderRadius:100,background:`${C.gold}10`,border:`1px solid ${C.gold}15`}}>{usageTimeFilter==="today"?"Hourly":usageTimeFilter==="week"?"Daily":"Weekly"}</span>
        </div>
        <div style={{display:"flex",gap:4,alignItems:"flex-end",height:70,padding:"0 2px"}}>
          {(usageCharts[usageTimeFilter]||usageCharts.today).map((h,i,arr)=>{const isMax=h===Math.max(...arr);return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            {isMax&&<div style={{fontSize:8,fontWeight:700,color:C.cyan,marginBottom:1}}>↑</div>}
            <div style={{width:"100%",height:`${h}%`,borderRadius:4,background:isMax?`linear-gradient(to top,${C.cyan}40,${C.cyan})`:`linear-gradient(to top,${C.cyan}15,${C.cyan}50)`,boxShadow:isMax?`0 0 8px ${C.cyan}30`:"none",transition:"all .3s"}}/>
          </div>)})}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6,padding:"0 2px"}}>
          {(usageLabels[usageTimeFilter]||usageLabels.today).map((l,i)=>(<span key={i} style={{fontSize:8,color:l?C.text3:"transparent",flex:1,textAlign:"center",fontWeight:600}}>{l||"·"}</span>))}
        </div>
      </div>

      {/* Mode usage — horizontal bars */}
      <div style={{padding:14,borderRadius:16,background:`linear-gradient(160deg,${C.bg2},${C.bg3})`,border:`1px solid ${C.border}`,marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:12}}>Mode Breakdown</div>
        {[{n:"Beast",c:C.red,p:30,i:"🔥"},{n:"Balance",c:C.blue,p:45,i:"⚖️"},{n:"Relax",c:C.purple,p:15,i:"😌"},{n:"Entourage",c:C.green,p:10,i:"🧬"}].map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:i<3?10:0}}>
          <span style={{fontSize:13,width:20,textAlign:"center"}}>{m.i}</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
              <span style={{fontSize:11,fontWeight:600,color:C.text}}>{m.n}</span>
              <span style={{fontSize:11,fontWeight:800,fontFamily:"monospace",color:m.c}}>{m.p}%</span>
            </div>
            <div style={{height:6,borderRadius:4,background:C.bg,overflow:"hidden"}}><div style={{height:"100%",width:`${m.p}%`,borderRadius:4,background:`linear-gradient(90deg,${m.c}80,${m.c})`,transition:"width .4s"}}/></div>
          </div>
        </div>))}
      </div>

      {/* AI Insights — card style */}
      <div style={{padding:14,borderRadius:16,background:`linear-gradient(160deg,${C.purple}06,${C.bg3})`,border:`1px solid ${C.purple}12`,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
          <div style={{width:24,height:24,borderRadius:8,background:`${C.purple}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🧠</div>
          <div style={{fontSize:12,fontWeight:700,color:C.purple}}>AI Insights</div>
        </div>
        {usageRecTips.map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"10px 12px",borderRadius:10,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:i<usageRecTips.length-1?6:0}}>
          <span style={{fontSize:14,flexShrink:0}}>{t.icon}</span>
          <div style={{fontSize:10,color:C.text,fontWeight:500,lineHeight:1.6}}>{t.msg}</div>
        </div>))}
      </div>

      {/* Tracking Settings — polished */}
      <div style={{padding:16,borderRadius:16,background:`linear-gradient(160deg,${C.bg2},${C.bg3})`,border:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14}}>
          <div style={{width:24,height:24,borderRadius:8,background:`${C.cyan}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>⚙️</div>
          <div style={{fontSize:12,fontWeight:700,color:C.text}}>Tracking Settings</div>
        </div>
        {[
          {n:"Puff Counter Display",d:"Show puff count on device screen",on:trkPuffDisplay,fn:()=>{setTrkPuffDisplay(!trkPuffDisplay);notify(trkPuffDisplay?"Counter Hidden":"Counter Visible",C.cyan);flashAI()},c:C.cyan},
          {n:"Blinker Warning",d:"Alert when reaching 5s cutoff",on:trkBlinkerWarn,fn:()=>{setTrkBlinkerWarn(!trkBlinkerWarn);notify(trkBlinkerWarn?"Warning Off":"Warning On",C.orange);flashAI()},c:C.orange},
          {n:"Daily Limit Alert",d:"Notify when approaching mg/day limit",on:trkDailyAlert,fn:()=>{setTrkDailyAlert(!trkDailyAlert);notify(trkDailyAlert?"Limit Alert Off":"Limit Alert On",C.gold);flashAI()},c:C.gold},
          {n:"Session Reminders",d:"Remind to take breaks between sessions",on:trkSessionRemind,fn:()=>{setTrkSessionRemind(!trkSessionRemind);notify(trkSessionRemind?"Reminders Off":"Reminders On",C.blue);flashAI()},c:C.blue},
          {n:"Export Session Data",d:"Export CSV report to email",on:trkExport,fn:()=>{setTrkExport(!trkExport);if(!trkExport)notify("Export Ready — Check email",C.green);else notify("Export Off",C.text3)},c:C.green},
        ].map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 12px",borderRadius:12,background:s.on?`${s.c}05`:C.bg,border:`1px solid ${s.on?s.c+"15":C.border}`,marginBottom:i<4?6:0,transition:"all .2s"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:600,color:C.text}}>{s.n}</div>
            <div style={{fontSize:9,color:C.text3,marginTop:1}}>{s.d}</div>
          </div>
          <Tog on={s.on} color={s.c} s="s" onChange={s.fn}/>
        </div>))}
      </div>
      </div>
    </div>);

  // ═══ AI RECOMMENDATION SCREEN ═══
  const recCats=["all","Heat","Alert","Mood","Balance","Battery","Blend","Usage","Tools","Recovery"];
  const activeRecs=AI_RECS.filter((_,i)=>!recDismissed.includes(i)&&!recApplied.includes(i));
  const filteredActive=activeRecs.filter(r=>recFilter==="all"||r.cat===recFilter);
  const appliedRecs=AI_RECS.filter((_,i)=>recApplied.includes(i));
  const dismissedRecs=AI_RECS.filter((_,i)=>recDismissed.includes(i));
  const catCounts={};recCats.forEach(c=>{catCounts[c]=c==="all"?activeRecs.length:activeRecs.filter(r=>r.cat===c).length});

  if(showRec)return(
    <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",padding:"16px 20px 40px"}}>
      <Back onClick={()=>setShowRec(false)} title="🧠 AI Assistant" sub="Smart recommendations for your session" color={C.purple}/>

      {/* ── STATUS HEADER ── */}
      <div style={{padding:14,borderRadius:16,background:`linear-gradient(135deg,${C.bg2},${C.bg3})`,border:`1px solid ${C.purple}15`,marginBottom:12,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:`${C.purple}06`}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:`${C.purple}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🧠</div>
            <div>
              <div style={{fontSize:12,fontWeight:800,color:C.text,letterSpacing:.3}}>AI Engine</div>
              <div style={{fontSize:9,color:C.text3}}>Analyzing your session in real-time</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:100,background:`${C.green}12`,border:`1px solid ${C.green}20`}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:C.green,animation:"pulse 2s infinite"}}/>
            <span style={{fontSize:8,fontWeight:800,color:C.green,letterSpacing:.5}}>RUNNING</span>
          </div>
        </div>
        {/* Stats row */}
        <div style={{display:"flex",gap:6,marginTop:10}}>
          {[
            {l:"Active",v:String(activeRecs.length),c:C.cyan,i:"📋"},
            {l:"Applied",v:String(recApplied.length),c:C.green,i:"✅"},
            {l:"Dismissed",v:String(recDismissed.length),c:C.text3,i:"🚫"},
            {l:"Confidence",v:"89%",c:C.gold,i:"🎯"},
          ].map((s,i)=>(<div key={i} style={{flex:1,padding:"6px 4px",borderRadius:8,background:C.bg3,textAlign:"center"}}>
            <div style={{fontSize:11,marginBottom:2}}>{s.i}</div>
            <div style={{fontFamily:"monospace",fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div>
            <div style={{fontSize:7,color:C.text3,fontWeight:600}}>{s.l}</div>
          </div>))}
        </div>
      </div>

      {/* ── SUB-TABS ── */}
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {[
          {id:"active",l:`Active (${activeRecs.length})`,c:C.cyan},
          {id:"history",l:`History (${recApplied.length+recDismissed.length})`,c:C.green},
          {id:"settings",l:"Settings",c:C.purple},
        ].map(t=>(<div key={t.id} onClick={()=>setRecTab(t.id)} style={{flex:1,padding:"9px 6px",borderRadius:10,textAlign:"center",cursor:"pointer",background:recTab===t.id?`${t.c}12`:C.bg2,border:`1.5px solid ${recTab===t.id?t.c+"35":C.border}`,fontSize:11,fontWeight:700,color:recTab===t.id?t.c:C.text3}}>{t.l}</div>))}
      </div>

      {/* ════ ACTIVE TAB ════ */}
      {recTab==="active"&&(<div>
        {/* Filter */}
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
          {recCats.filter(c=>c==="all"||catCounts[c]>0).map(cat=>(<div key={cat} onClick={()=>setRecFilter(cat)} style={{padding:"4px 10px",borderRadius:100,cursor:"pointer",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",gap:4,background:recFilter===cat?`${C.purple}20`:C.bg3,border:`1px solid ${recFilter===cat?C.purple+"40":C.border}`,color:recFilter===cat?C.purple:C.text3}}>
            {cat==="all"?"All":cat}
            <span style={{fontSize:8,fontWeight:800,color:recFilter===cat?C.purple:C.text3,opacity:.7}}>{catCounts[cat]}</span>
          </div>))}
        </div>

        {/* Cards */}
        {filteredActive.length===0&&(<div style={{padding:28,borderRadius:16,background:C.bg2,border:`1px solid ${C.border}`,textAlign:"center"}}><div style={{fontSize:32,marginBottom:8}}>✨</div><div style={{fontSize:13,fontWeight:700,color:C.text2}}>All Clear!</div><div style={{fontSize:11,color:C.text3,marginTop:4}}>Không có recommendation nào trong mục này</div></div>)}
        {filteredActive.map((r,i)=>{const origIdx=AI_RECS.indexOf(r);return(<div key={origIdx} style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${r.c}18`,marginBottom:8,transition:"all .2s"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
            <div style={{width:38,height:38,borderRadius:12,background:`${r.c}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,border:`1px solid ${r.c}15`}}>{r.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <span style={{fontSize:9,fontWeight:700,color:r.c,padding:"2px 8px",borderRadius:100,background:`${r.c}12`}}>{r.cat}</span>
                <div style={{display:"flex",alignItems:"center",gap:3}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:C.green}}/>
                  <span style={{fontSize:8,color:C.text3}}>Active</span>
                </div>
              </div>
              <div style={{fontSize:12,fontWeight:600,color:C.text,lineHeight:1.6,marginBottom:8}}>{r.msg}</div>
              <div style={{display:"flex",gap:6}}>
                <div onClick={()=>{setRecApplied(p=>[...p,origIdx]);flashAI();notify("✅ Applied — AI đang điều chỉnh",r.c)}} style={{flex:1,padding:"8px 0",borderRadius:10,background:`${r.c}12`,border:`1px solid ${r.c}25`,cursor:"pointer",textAlign:"center",fontSize:11,fontWeight:700,color:r.c}}>✓ Apply</div>
                <div onClick={()=>{setRecDismissed(p=>[...p,origIdx]);notify("Dismissed",C.text3)}} style={{padding:"8px 12px",borderRadius:10,background:C.bg3,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:11,fontWeight:600,color:C.text3}}>✕</div>
              </div>
            </div>
          </div>
        </div>)})}
      </div>)}

      {/* ════ HISTORY TAB ════ */}
      {recTab==="history"&&(<div>
        {appliedRecs.length===0&&dismissedRecs.length===0&&(<div style={{padding:28,borderRadius:16,background:C.bg2,border:`1px solid ${C.border}`,textAlign:"center"}}><div style={{fontSize:32,marginBottom:8}}>📭</div><div style={{fontSize:13,fontWeight:700,color:C.text2}}>No history yet</div><div style={{fontSize:11,color:C.text3,marginTop:4}}>Apply hoặc dismiss recommendations để thấy ở đây</div></div>)}
        
        {appliedRecs.length>0&&(<>
          <div style={{fontSize:10,fontWeight:700,color:C.green,letterSpacing:1.5,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>✅ APPLIED ({appliedRecs.length})</div>
          {appliedRecs.map((r,i)=>{const origIdx=AI_RECS.indexOf(r);return(<div key={origIdx} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:12,background:`${C.green}06`,border:`1px solid ${C.green}12`,marginBottom:6}}>
            <span style={{fontSize:16}}>{r.icon}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.msg}</div>
              <div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                <span style={{fontSize:8,fontWeight:700,color:C.green}}>Applied</span>
                <span style={{fontSize:8,color:C.text3}}>·</span>
                <span style={{fontSize:8,color:C.text3}}>Just now</span>
              </div>
            </div>
            <div onClick={()=>{setRecApplied(p=>p.filter(x=>x!==origIdx));notify("Undone",C.text3)}} style={{padding:"4px 8px",borderRadius:6,background:C.bg3,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:9,fontWeight:600,color:C.text3}}>Undo</div>
          </div>)})}
        </>)}

        {dismissedRecs.length>0&&(<>
          <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:8,marginTop:appliedRecs.length>0?12:0,display:"flex",alignItems:"center",gap:6}}>🚫 DISMISSED ({dismissedRecs.length})</div>
          {dismissedRecs.map((r,i)=>{const origIdx=AI_RECS.indexOf(r);return(<div key={origIdx} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:12,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:6,opacity:.6}}>
            <span style={{fontSize:16}}>{r.icon}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,fontWeight:600,color:C.text2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.msg}</div>
              <div style={{fontSize:8,color:C.text3,marginTop:2}}>Dismissed · AI sẽ không gợi ý tương tự</div>
            </div>
            <div onClick={()=>{setRecDismissed(p=>p.filter(x=>x!==origIdx));notify("Restored",C.cyan)}} style={{padding:"4px 8px",borderRadius:6,background:C.bg3,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:9,fontWeight:600,color:C.text3}}>Restore</div>
          </div>)})}
        </>)}
      </div>)}

      {/* ════ SETTINGS TAB ════ */}
      {recTab==="settings"&&(<div>
        {/* Daily comfort zone */}
        <div style={{padding:16,borderRadius:14,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>Daily Comfort Zone</div>
          <div style={{fontSize:10,color:C.text3,marginBottom:10}}>AI sẽ nhắc khi bạn gần đạt mức này</div>
          <Sld value={recDailyLimit} min={10} max={100} step={5} color={C.purple} label="Giới hạn mỗi ngày" unit=" mg" onChange={v=>setRecDailyLimit(v)}/>
          <div style={{display:"flex",height:8,borderRadius:4,overflow:"hidden",background:C.bg3,marginTop:4}}>
            <div style={{width:`${Math.min(100,((totalThc+totalCbd)/recDailyLimit)*100)}%`,borderRadius:4,background:(totalThc+totalCbd)>recDailyLimit*0.8?`linear-gradient(90deg,${C.orange},${C.red})`:`linear-gradient(90deg,${C.green},${C.cyan})`,transition:"width .3s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{fontSize:10,color:C.text3}}>Hôm nay: <strong style={{color:C.text}}>{(totalThc+totalCbd).toFixed(1)}mg</strong></span>
            <span style={{fontSize:10,fontWeight:700,color:(totalThc+totalCbd)>recDailyLimit*0.8?C.orange:C.green}}>{Math.round(((totalThc+totalCbd)/recDailyLimit)*100)}%</span>
          </div>
        </div>

        {/* AI Behavior */}
        <div style={{padding:16,borderRadius:14,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:12}}>AI Behavior</div>
          {[
            {n:"Smart Auto-Apply",d:"Chỉ tự apply các gợi ý an toàn (heat, battery)",on:recAutoMode,fn:()=>setRecAutoMode(!recAutoMode)},
            {n:"Adaptive Learning",d:"AI cải thiện dựa trên choices của bạn",on:recLearnPref,fn:()=>setRecLearnPref(!recLearnPref)},
            {n:"Notifications",d:"Nhận gợi ý quan trọng qua push notification",on:recNotify,fn:()=>setRecNotify(!recNotify)},
          ].map((s,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderTop:i>0?`1px solid ${C.border}`:"none"}}>
            <div><div style={{fontSize:12,fontWeight:600,color:C.text}}>{s.n}</div><div style={{fontSize:10,color:C.text3}}>{s.d}</div></div>
            <Tog on={s.on} color={C.purple} s="s" onChange={s.fn}/>
          </div>))}
        </div>

        {/* Your Data */}
        <div style={{padding:16,borderRadius:14,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontSize:16}}>⚙️</span>
            <div><div style={{fontSize:12,fontWeight:700,color:C.text}}>Your Data</div><div style={{fontSize:10,color:C.text3}}>Manage what AI uses for recommendations</div></div>
          </div>

          {/* What AI reads from your session */}
          <div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:8}}>AI reads from your session</div>
          {[
            {i:"🌡",n:"Heat settings",d:"Optimize voltage suggestions",on:true},
            {i:"💨",n:"Puff patterns",d:"Comfort zone & daily limit tracking",on:true},
            {i:"🧬",n:"Extract type",d:"THC/CBD blend recommendations",on:true},
            {i:"🔋",n:"Battery status",d:"Eco mode suggestions when low",on:true},
            {i:"⏰",n:"Time of day",d:"Mood suggestions based on routine",on:true},
          ].map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:i>0?`1px solid ${C.border}`:"none"}}>
            <span style={{fontSize:14}}>{s.i}</span>
            <div style={{flex:1}}><div style={{fontSize:11,fontWeight:600,color:C.text}}>{s.n}</div><div style={{fontSize:9,color:C.text3}}>{s.d}</div></div>
            <Tog on={s.on} color={C.green} s="s" onChange={()=>flashAI()}/>
          </div>))}
        </div>

        {/* Danger zone */}
        <div style={{padding:14,borderRadius:14,background:`${C.red}06`,border:`1px solid ${C.red}12`}}>
          <div style={{fontSize:11,fontWeight:700,color:C.red,marginBottom:8}}>Reset AI</div>
          <div style={{fontSize:10,color:C.text3,lineHeight:1.5,marginBottom:10}}>Clear all AI recommendations and start fresh. Your session data stays unaffected.</div>
          <div onClick={()=>{setRecApplied([]);setRecDismissed([]);notify("AI Reset ✓",C.red)}} style={{padding:"10px 0",borderRadius:10,textAlign:"center",cursor:"pointer",background:C.bg3,border:`1px solid ${C.red}20`,fontSize:11,fontWeight:700,color:C.red}}>🗑 Reset AI Recommendations</div>
        </div>
      </div>)}
    </div>);

  // ═══ ME TAB ═══
  const MeTab=()=>(<div style={{padding:"12px 20px 100px"}}>
    {/* Profile header */}
    <div style={{display:"flex",alignItems:"center",gap:14,padding:"20px 16px",borderRadius:16,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:16}}>
      <div style={{width:52,height:52,borderRadius:16,background:`linear-gradient(135deg,${C.cyan}30,${C.purple}30)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>👤</div>
      <div style={{flex:1}}>
        <div style={{fontSize:16,fontWeight:800,color:C.text}}>User Profile</div>
        <div style={{fontSize:11,color:C.text3}}>Premium Account · {tanks.length} tank device</div>
      </div>
      <div style={{padding:"4px 10px",borderRadius:8,background:`${C.green}15`,border:`1px solid ${C.green}25`}}>
        <span style={{fontSize:10,fontWeight:700,color:C.green}}>✓ Verified</span>
      </div>
    </div>

    {/* 🔒 CHILD LOCK */}
    <div style={{marginBottom:12}}>
      <div style={{padding:16,borderRadius:14,background:childLock?`${C.red}08`:C.bg2,border:`1.5px solid ${childLock?C.red+"30":C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:40,height:40,borderRadius:12,background:childLock?`${C.red}15`:`${C.text3}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🔒</div>
            <div><div style={{fontSize:14,fontWeight:700,color:childLock?C.red:C.text}}>Child Lock</div><div style={{fontSize:10,color:C.text3}}>Khóa toàn bộ device</div></div>
          </div>
          <Tog on={childLock} color={C.red} onChange={()=>{setChildLock(!childLock);notify(childLock?"Device Unlocked":"Device LOCKED",childLock?C.green:C.red);flashDev(childLock?C.green:C.red)}}/>
        </div>
        {childLock&&(<div style={{padding:12,borderRadius:10,background:`${C.red}08`,border:`1px solid ${C.red}15`}}>
          <div style={{fontSize:10,color:C.red,fontWeight:700,marginBottom:6}}>🔒 DEVICE LOCKED</div>
          <div style={{fontSize:10,color:C.text3,lineHeight:1.6}}>Tất cả buttons & inhale bị vô hiệu hóa. Device hiển thị lock icon. Chỉ unlock được qua app + password.</div>
          <div style={{marginTop:8}}>
            <div style={{fontSize:10,color:C.text3,marginBottom:4}}>PIN Code</div>
            <div style={{display:"flex",gap:6}}>{childPin.split("").map((d,i)=>(<div key={i} style={{width:36,height:40,borderRadius:8,background:C.bg3,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:18,fontWeight:800,color:C.red}}>●</div>))}
              <div onClick={()=>notify("Change PIN",C.blue)} style={{width:36,height:40,borderRadius:8,background:C.bg3,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:C.blue,cursor:"pointer",fontWeight:600}}>✎</div>
            </div>
          </div>
        </div>)}
        <div style={{display:"flex",gap:4,marginTop:8}}><Chip t="Password Protected" c={C.red}/><Chip t="B2B: Cannabis Compliance" c={C.gold}/></div>
      </div>
    </div>

    {/* 🔐 AUTHENTICATION */}
    <div style={{marginBottom:12}}>
      <div style={{padding:16,borderRadius:14,background:C.bg2,border:`1.5px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:40,height:40,borderRadius:12,background:`${C.cyan}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🔐</div>
          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:C.cyan}}>Authentication</div><div style={{fontSize:10,color:C.text3}}>Xác thực sản phẩm chính hãng</div></div>
          <div style={{padding:"4px 10px",borderRadius:8,background:authStatus==="verified"?`${C.green}15`:`${C.red}15`}}>
            <span style={{fontSize:10,fontWeight:700,color:authStatus==="verified"?C.green:C.red}}>{authStatus==="verified"?"✓ Chính hãng":"⚠ Chưa xác thực"}</span>
          </div>
        </div>
        <div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:8}}>Phương thức xác thực</div>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[{k:"bt",l:"📶 Bluetooth",d:"Auto khi pair"},{k:"qr",l:"📱 QR Code",d:"Scan on packaging"}].map(m=>(<div key={m.k} onClick={()=>setAuthMethod(m.k)} style={{flex:1,padding:"12px 10px",borderRadius:10,textAlign:"center",cursor:"pointer",background:authMethod===m.k?`${C.cyan}15`:C.bg3,border:`1.5px solid ${authMethod===m.k?C.cyan+"40":C.border}`}}>
            <div style={{fontSize:12,fontWeight:700,color:authMethod===m.k?C.cyan:C.text}}>{m.l}</div>
            <div style={{fontSize:9,color:C.text3,marginTop:2}}>{m.d}</div>
          </div>))}
        </div>
        <div style={{display:"flex",gap:6}}>
          {[{l:"Chính hãng",c:C.green,i:"✓"},{l:"Không xác định",c:C.gold,i:"?"},{l:"Giả",c:C.red,i:"✕"}].map((s,i)=>(<div key={i} onClick={()=>setAuthStatus(["verified","unknown","fake"][i])} style={{flex:1,padding:"8px 4px",borderRadius:8,textAlign:"center",cursor:"pointer",background:authStatus===["verified","unknown","fake"][i]?`${s.c}12`:C.bg3,border:`1px solid ${authStatus===["verified","unknown","fake"][i]?s.c+"30":C.border}`}}>
            <div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.i}</div>
            <div style={{fontSize:8,color:s.c,fontWeight:600}}>{s.l}</div>
          </div>))}
        </div>
        <div style={{display:"flex",gap:4,marginTop:10}}><Chip t="Anti-counterfeit" c={C.cyan}/><Chip t="No extra HW cost" c={C.green}/><Chip t="B2B value" c={C.gold}/></div>
      </div>
    </div>

    {/* Other Me features */}
    {[{i:"⚙",n:"Device Settings",d:"Rename, firmware update, factory reset",c:C.text2},{i:"🔔",n:"Notifications",d:"Push alerts, reminders, daily summary",c:C.text2},{i:"📱",n:"App Preferences",d:"Theme, language, units, haptics",c:C.text2},{i:"☁️",n:"Cloud Sync",d:"Backup settings & usage data across devices",c:C.text2},{i:"📞",n:"Support & Feedback",d:"Contact support, report issues, FAQ",c:C.text2}].map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,marginBottom:6,background:C.bg2,border:`1px solid ${C.border}`,cursor:"pointer"}}>
      <span style={{fontSize:20}}>{f.i}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.text}}>{f.n}</div><div style={{fontSize:10,color:C.text3}}>{f.d}</div></div><span style={{fontSize:14,color:C.text3}}>›</span>
    </div>))}
  </div>);

  // ═══ TOOL DETAIL ═══
  const ToolDetail=(tid)=>{const s=ts[tid];const DD={preheat:{n:"Smart Pre-Heat",i:"🔥",c:C.gold,t:"Sẵn sàng trước khi cần"},lastdrop:{n:"Last Drop",i:"💧",c:C.orange,t:"Không bỏ phí giọt nào"},flavorfusion:{n:"Flavor Fusion",i:"🎨",c:C.pink,t:"Tạo hương vị riêng"},extractfusion:{n:"Extract Fusion",i:"🧪",c:C.purple,t:"Unified multi-tank"},jetlag:{n:"Jet-Lag Recovery",i:"✈️",c:C.blue,t:"AI guided recovery"},damage:{n:"Damage Prevention",i:"🛡️",c:C.green,t:"Bảo vệ cartridge"}};const dd=DD[tid];
    return(<div style={{animation:"slideIn .25s ease"}}>
      <Back onClick={()=>setToolView(null)} title={`${dd.i} ${dd.n}`} sub={dd.t} color={dd.c} right={<Tog on={s.on} color={dd.c} onChange={()=>{uTool(tid,{on:!s.on});notify(`${dd.n} ${!s.on?"ON":"OFF"}`,!s.on?dd.c:C.text3)}}/>}/>
      <div style={{padding:"10px 16px",borderRadius:12,marginBottom:12,background:s.on?`${dd.c}10`:`${C.text3}08`,border:`1.5px solid ${s.on?dd.c+"30":C.border}`,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:s.on?dd.c:C.text3,boxShadow:s.on?`0 0 8px ${dd.c}60`:"none"}}/><span style={{fontSize:13,fontWeight:700,color:s.on?dd.c:C.text3}}>{s.on?"ACTIVE":"INACTIVE"}</span>{s.on&&<span style={{fontSize:10,color:C.text3,marginLeft:"auto"}}>🧠 AI Managed</span>}
      </div>
      <div style={{padding:16,borderRadius:14,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:10}}>
        <div style={{fontSize:12,fontWeight:700,color:dd.c,marginBottom:10}}>⚙ Cài đặt</div>
        {tid==="preheat"&&(<><Sld value={s.temp} min={1.8} max={3.0} step={0.1} color={dd.c} label="Nhiệt độ Pre-Heat" unit="V" onChange={v=>uTool(tid,{temp:v})}/><Sld value={s.dur} min={1} max={8} step={1} color={dd.c} label="Thời gian làm nóng" unit="s" onChange={v=>uTool(tid,{dur:v})}/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:`1px solid ${C.border}`}}><div><div style={{fontSize:11,fontWeight:600,color:C.text}}>Auto-Detect</div><div style={{fontSize:9,color:C.text3}}>AI tự nhận biết thời điểm</div></div><Tog on={s.auto} color={dd.c} s="s" onChange={()=>uTool(tid,{auto:!s.auto})}/></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:`1px solid ${C.border}`}}><div><div style={{fontSize:11,fontWeight:600,color:C.text}}>Thông báo khi xong</div></div><Tog on={s.notify} color={dd.c} s="s" onChange={()=>uTool(tid,{notify:!s.notify})}/></div></>)}
        {tid==="lastdrop"&&(<><Sld value={s.pulse} min={1} max={5} step={1} color={dd.c} label="Pulse Cycles" unit="x" onChange={v=>uTool(tid,{pulse:v})}/><Sld value={s.int} min={30} max={100} step={5} color={dd.c} label="Cường độ" unit="%" onChange={v=>uTool(tid,{int:v})}/><Sld value={s.minLevel} min={1} max={15} step={1} color={dd.c} label="Ngưỡng kích hoạt" unit="%" onChange={v=>uTool(tid,{minLevel:v})}/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:`1px solid ${C.border}`}}><div><div style={{fontSize:11,fontWeight:600,color:C.text}}>Auto-Detect Level</div><div style={{fontSize:9,color:C.text3}}>AI phát hiện cartridge sắp hết</div></div><Tog on={s.autoDetect} color={dd.c} s="s" onChange={()=>uTool(tid,{autoDetect:!s.autoDetect})}/></div></>)}
        {tid==="flavorfusion"&&(<><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,fontWeight:700,color:tanks[0]?.color||C.text3}}>{tanks[0]?.name||"T1"}</span><span style={{fontSize:13,fontWeight:800,fontFamily:"monospace",color:dd.c}}>{s.bal}:{100-s.bal}</span><span style={{fontSize:11,fontWeight:700,color:tanks[1]?.color||C.text3}}>{tanks[1]?.name||"T2"}</span></div><input type="range" min={0} max={100} value={s.bal} onChange={e=>uTool(tid,{bal:+e.target.value})} style={{width:"100%",accentColor:dd.c,marginBottom:12}}/><div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:6}}>Transition Curve</div><div style={{display:"flex",gap:6}}>{["sharp","smooth","wave"].map(c=>(<div key={c} onClick={()=>uTool(tid,{curve:c})} style={{flex:1,padding:"10px 0",borderRadius:10,textAlign:"center",cursor:"pointer",background:s.curve===c?`${dd.c}20`:C.bg3,border:`1.5px solid ${s.curve===c?dd.c+"50":C.border}`,fontSize:11,fontWeight:700,color:s.curve===c?dd.c:C.text3}}>{c==="sharp"?"⚡ Sharp":c==="smooth"?"〰 Smooth":"🌊 Wave"}</div>))}</div></>)}
        {tid==="extractfusion"&&(<><div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:6}}>Priority</div><div style={{display:"flex",gap:6,marginBottom:12}}>{["balanced","tank1","tank2"].map(p=>(<div key={p} onClick={()=>uTool(tid,{pri:p})} style={{flex:1,padding:"10px 6px",borderRadius:10,textAlign:"center",cursor:"pointer",background:s.pri===p?`${dd.c}20`:C.bg3,border:`1.5px solid ${s.pri===p?dd.c+"50":C.border}`,fontSize:11,fontWeight:700,color:s.pri===p?dd.c:C.text3}}>{p==="balanced"?"⚖ Balanced":p==="tank1"?"1️⃣ T1 Lead":"2️⃣ T2 Lead"}</div>))}</div><div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:6}}>Sync Mode</div><div style={{display:"flex",gap:6,marginBottom:12}}>{[{k:"simultaneous",l:"⚡ Đồng thời"},{k:"sequential",l:"🔄 Tuần tự"},{k:"alternating",l:"↔ Xen kẽ"}].map(m=>(<div key={m.k} onClick={()=>uTool(tid,{sync:m.k})} style={{flex:1,padding:"10px 4px",borderRadius:10,textAlign:"center",cursor:"pointer",background:s.sync===m.k?`${dd.c}20`:C.bg3,border:`1.5px solid ${s.sync===m.k?dd.c+"50":C.border}`,fontSize:10,fontWeight:700,color:s.sync===m.k?dd.c:C.text3}}>{m.l}</div>))}</div><Sld value={s.ratio} min={10} max={90} step={5} color={dd.c} label="Extract Ratio" unit="%" onChange={v=>uTool(tid,{ratio:v})}/></>)}
        {tid==="jetlag"&&(<><Sld value={s.from} min={-12} max={12} step={1} color={dd.c} label={`From UTC${s.from>=0?"+":""}${s.from}`} unit="" onChange={v=>uTool(tid,{from:v})}/><Sld value={s.to} min={-12} max={12} step={1} color={dd.c} label={`To UTC${s.to>=0?"+":""}${s.to}`} unit="" onChange={v=>uTool(tid,{to:v})}/><Sld value={s.fat} min={10} max={100} step={10} color={dd.c} label="Fatigue" unit="%" onChange={v=>uTool(tid,{fat:v})}/><Sld value={s.sessions} min={1} max={7} step={1} color={dd.c} label="Sessions" unit="x" onChange={v=>uTool(tid,{sessions:v})}/><div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:6}}>Recovery Mode</div><div style={{display:"flex",gap:6}}>{[{k:"gradual",l:"🌅 Gradual"},{k:"intensive",l:"⚡ Intensive"},{k:"adaptive",l:"🧠 Adaptive"}].map(m=>(<div key={m.k} onClick={()=>uTool(tid,{mode:m.k})} style={{flex:1,padding:"10px 4px",borderRadius:10,textAlign:"center",cursor:"pointer",background:s.mode===m.k?`${dd.c}20`:C.bg3,border:`1.5px solid ${s.mode===m.k?dd.c+"50":C.border}`,fontSize:10,fontWeight:700,color:s.mode===m.k?dd.c:C.text3}}>{m.l}</div>))}</div></>)}
        {tid==="damage"&&(<><Sld value={s.maxV} min={2.8} max={3.7} step={0.1} color={s.maxV>3.4?C.red:dd.c} label="Max Voltage" unit="V" onChange={v=>uTool(tid,{maxV:v,warnV:Math.min(s.warnV,v-0.2)})}/>{s.maxV>3.4&&<div style={{padding:"6px 12px",borderRadius:8,background:`${C.red}10`,fontSize:10,color:C.red,fontWeight:600,marginBottom:8}}>⚠ Vượt factory 3.4V</div>}<Sld value={s.warnV} min={2.4} max={s.maxV-0.1} step={0.1} color={C.gold} label="Warn Threshold" unit="V" onChange={v=>uTool(tid,{warnV:v})}/><Sld value={s.autoShutoff} min={3} max={15} step={1} color={dd.c} label="Auto Shutoff" unit="s" onChange={v=>uTool(tid,{autoShutoff:v})}/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:`1px solid ${C.border}`}}><div><div style={{fontSize:11,fontWeight:600,color:C.text}}>Cooldown Period</div><div style={{fontSize:9,color:C.text3}}>Nghỉ giữa puff liên tiếp</div></div><Tog on={s.cooldown} color={dd.c} s="s" onChange={()=>uTool(tid,{cooldown:!s.cooldown})}/></div></>)}
      </div>
    </div>)};

  // ═══ CONTROL ═══
  return(
    <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-100,left:"50%",transform:"translateX(-50%)",width:500,height:500,borderRadius:"50%",pointerEvents:"none",background:`radial-gradient(circle,${acColor}08 0%,transparent 70%)`,transition:"background 1s"}}/>
      {notif&&(<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:100,zIndex:999,background:`${notif.c}18`,border:`1px solid ${notif.c}40`,color:notif.c,fontSize:13,fontWeight:700,animation:"fadeSlide .3s ease",backdropFilter:"blur(12px)"}}>{notif.m}</div>)}

      {/* STATUS */}
      <div style={{padding:"12px 20px 6px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:11,color:C.text3,fontWeight:600,letterSpacing:1}}>MOOD LAB</span>
          <span onClick={()=>{setPhase("setup");setBtOn(false);setProMode(null);setMoodMode(null);setBlendMode(null);setProExp(null);setToolView(null)}} style={{fontSize:9,color:C.text3,padding:"2px 8px",borderRadius:4,background:C.bg3,cursor:"pointer",fontWeight:600}}>⚙</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {aiFlash&&<div style={{fontSize:10,color:C.purple,fontWeight:700,animation:"pulse .8s infinite"}}>AI●</div>}
          <div onClick={connectBT} style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",padding:"4px 10px",borderRadius:100,background:btOn?`${C.blue}15`:btIng?`${C.gold}15`:`${C.text3}10`,border:`1px solid ${btOn?C.blue+"30":btIng?C.gold+"30":C.text3+"20"}`}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:btOn?C.green:btIng?C.gold:C.text3,animation:btIng?"pulse 1s infinite":"none"}}/>
            <span style={{fontSize:10,fontWeight:600,color:btOn?C.blue:btIng?C.gold:C.text3}}>{btIng?"...":btOn?"Connected":"Connect"}</span>
          </div>
        </div>
      </div>

      {/* AI ENGINE STRIP */}
      {mainTab===0&&<AIStrip/>}

      {/* DEVICE — only on Control tab */}
      {mainTab===0&&(<>
        <div style={{padding:"6px 20px 6px",position:"relative",zIndex:2}}>
          <div style={{background:C.bg2,borderRadius:18,padding:"14px 12px 10px",border:`1px solid ${devGlow?devGlow+"40":C.border}`,boxShadow:devGlow?`0 0 30px ${devGlow}15`:"none",transition:"all .4s"}}>
            <div style={{display:"flex",gap:5,marginBottom:8}}>
              {tanks.map((tk,i)=>(<div key={i} onClick={()=>setActiveTank(i)} style={{flex:1,padding:"8px 6px",borderRadius:10,cursor:"pointer",background:activeTank===i?`${tk.color}12`:C.bg3,border:`1.5px solid ${activeTank===i?tk.color+"40":C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}><div style={{width:6,height:6,borderRadius:"50%",background:tankHeat[i]>0?tk.color:C.text3,animation:inhaling&&tankHeat[i]>0?"pulse .5s infinite":"none"}}/><span style={{fontSize:8,fontWeight:700,color:HC[tankHeat[i]]}}>{HL[tankHeat[i]]}</span></div>
                <div style={{fontSize:tanks.length>2?10:12,fontWeight:800,color:C.text}}>{tk.name}</div>
                <div style={{fontSize:8,color:C.text3}}>{tk.type}</div>
                {inhaling&&tankHeat[i]>0&&<div style={{marginTop:4,height:2,borderRadius:2,background:C.bg,overflow:"hidden"}}><div style={{height:"100%",width:`${inhProg*100}%`,background:tk.color}}/></div>}
              </div>))}
            </div>
            <div style={{display:"flex",gap:5}}>
              <div onClick={()=>setShowUsage(true)} style={{flex:1,padding:"6px 0",borderRadius:8,textAlign:"center",background:`${C.cyan}08`,border:`1px solid ${C.cyan}15`,cursor:"pointer"}}>
                <div style={{fontFamily:"monospace",fontSize:18,fontWeight:800,color:C.cyan,letterSpacing:2}}>{pad3(puffs)}</div><div style={{fontSize:7,color:C.text3,fontWeight:600,letterSpacing:1}}>PUFF ›</div>
              </div>
              <div style={{width:30,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:14,height:14,transform:"rotate(45deg)",borderRadius:2,background:inhaling?acColor:`${C.text3}20`,boxShadow:inhaling?`0 0 12px ${acColor}60`:"none",transition:"all .3s"}}/></div>
              <div onClick={()=>setShowUsage(true)} style={{flex:1,padding:"6px 0",borderRadius:8,textAlign:"center",background:`${C.orange}08`,border:`1px solid ${C.orange}15`,cursor:"pointer"}}>
                <div style={{fontFamily:"monospace",fontSize:18,fontWeight:800,color:C.orange,letterSpacing:2}}>{pad3(blinks)}</div><div style={{fontSize:7,color:C.text3,fontWeight:600,letterSpacing:1}}>BLINK ›</div>
              </div>
            </div>
            <div onClick={()=>setShowUsage(true)} style={{marginTop:5,padding:"5px 8px",borderRadius:8,background:btOn?`${C.green}06`:`${C.text3}06`,border:`1px solid ${btOn?C.green+"15":C.text3+"10"}`,cursor:"pointer"}}>
              {btOn?(<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                {(lastThc>0||totalThc>0)&&<div style={{display:"flex",alignItems:"center",gap:3}}><span style={{fontSize:8,fontWeight:700,color:"#ef4444",padding:"1px 4px",borderRadius:3,background:"#ef444412"}}>THC</span><span style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:"#ef4444"}}>{lastThc.toFixed(1)}</span><span style={{fontSize:8,color:C.text3}}>mg</span>{totalThc>0&&<span style={{fontSize:8,color:C.text3}}>(Σ{totalThc.toFixed(1)})</span>}</div>}
                {(lastCbd>0||totalCbd>0)&&<div style={{display:"flex",alignItems:"center",gap:3}}><span style={{fontSize:8,fontWeight:700,color:C.green,padding:"1px 4px",borderRadius:3,background:`${C.green}12`}}>CBD</span><span style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:C.green}}>{lastCbd.toFixed(1)}</span><span style={{fontSize:8,color:C.text3}}>mg</span>{totalCbd>0&&<span style={{fontSize:8,color:C.text3}}>(Σ{totalCbd.toFixed(1)})</span>}</div>}
                <span style={{fontSize:8,color:C.gold,marginLeft:2}}>Details ›</span>
              </div>):(<div style={{textAlign:"center"}}><span style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:C.text3}}>THC --.- · CBD --.-</span><span style={{fontSize:8,color:C.text3,marginLeft:4}}>mg</span></div>)}
            </div>
            {(proMode||moodMode||blendMode)&&(<div style={{marginTop:5,padding:"4px 8px",borderRadius:6,textAlign:"center",background:`${acColor}12`,border:`1px solid ${acColor}25`,fontSize:10,fontWeight:700,color:acColor}}>
              {moodMode?`🧠 ${MOODS.find(m=>m.id===moodMode)?.name} — AI`:proMode?`⚡ ${proMode[0].toUpperCase()+proMode.slice(1)}`:blendMode==="entourage"?`🧬 Entourage THC+CBD ${entR}:${100-entR}`:`🧬 Hybrid Sat+Ind ${hybR}:${100-hybR}`}
            </div>)}
          </div>
        </div>

        {/* PUFF */}
        <div style={{padding:"6px 20px",position:"relative",zIndex:2}}>
          <div onMouseDown={startPuff} onMouseUp={()=>endPuff()} onMouseLeave={()=>{if(inhaling)endPuff()}} onTouchStart={e=>{e.preventDefault();startPuff()}} onTouchEnd={()=>endPuff()} style={{width:"100%",padding:"10px 0",borderRadius:12,textAlign:"center",cursor:"pointer",userSelect:"none",position:"relative",overflow:"hidden",background:inhaling?`linear-gradient(135deg,${acColor}25,${acColor}10)`:`linear-gradient(135deg,${C.bg3},${C.bg2})`,border:`1.5px solid ${inhaling?acColor+"50":C.border}`,transition:"all .2s"}}>
            {vapor&&<div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 50% 100%,${acColor}15,transparent 60%)`,animation:"vapor 1.5s ease-out forwards"}}/>}
            <div style={{position:"relative",zIndex:2}}><div style={{fontSize:12,fontWeight:800,letterSpacing:1.5,color:inhaling?acColor:C.text2}}>{inhaling?"● INHALING...":"HOLD TO PUFF"}</div>
              {inhaling&&<div style={{marginTop:3,height:3,borderRadius:2,background:`${C.bg}80`,overflow:"hidden",margin:"3px 40px 0"}}><div style={{height:"100%",background:acColor,width:`${inhProg*100}%`}}/></div>}
            </div>
          </div>
        </div>

        {/* AI RECOMMENDATION ROLLING */}
        <div onClick={()=>setShowRec(true)} style={{padding:"0 20px",margin:"4px 0",position:"relative",zIndex:2}}>
          <div style={{padding:"8px 12px",borderRadius:10,background:`linear-gradient(135deg,${C.purple}08,${C.purple}03)`,border:`1px solid ${C.purple}18`,cursor:"pointer",display:"flex",alignItems:"center",gap:8,overflow:"hidden",position:"relative"}}>
            <div style={{width:24,height:24,borderRadius:8,background:`${C.purple}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>🧠</div>
            <div style={{flex:1,overflow:"hidden",position:"relative",height:16}}>
              <div key={recIdx} style={{position:"absolute",inset:0,display:"flex",alignItems:"center",animation:"recSlide .4s ease"}}>
                <span style={{fontSize:10,color:AI_RECS[recIdx].c,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{AI_RECS[recIdx].icon} {AI_RECS[recIdx].msg}</span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
              <span style={{fontSize:8,fontWeight:700,color:C.purple,padding:"2px 6px",borderRadius:100,background:`${C.purple}12`}}>AI</span>
              <span style={{fontSize:12,color:C.text3}}>›</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{padding:"0 20px",display:"flex",gap:3,position:"relative",zIndex:2}}>
          {secs.map(s=>(<div key={s.id} onClick={()=>{setSec(s.id);setToolView(null)}} style={{flex:1,padding:"7px 0",borderRadius:10,textAlign:"center",cursor:"pointer",background:sec===s.id?`${acColor}12`:"transparent",border:`1px solid ${sec===s.id?acColor+"30":"transparent"}`}}>
            <div style={{fontSize:14,marginBottom:1}}>{s.i}</div><div style={{fontSize:8,fontWeight:700,color:sec===s.id?acColor:C.text3}}>{s.l}</div>
          </div>))}
        </div>

        {/* CONTENT */}
        <div style={{padding:"10px 20px 100px",position:"relative",zIndex:2}}>
          {/* HEAT — CONDENSED COLUMNS + PRECISION */}
          {sec==="heat"&&!precisionMode&&(<div>
            <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:10}}>QUICK HEAT CONTROL</div>
            <div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:10}}>
              {/* Multi-column tank heat */}
              <div style={{display:"flex",gap:8}}>
                {tanks.map((tk,i)=>(<div key={i} style={{flex:1}}>
                  {/* Tank header */}
                  <div style={{textAlign:"center",marginBottom:8}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:tankHeat[i]>0?tk.color:C.text3,margin:"0 auto 4px",boxShadow:tankHeat[i]>0?`0 0 6px ${tk.color}50`:"none"}}/>
                    <div style={{fontSize:tanks.length>2?10:12,fontWeight:800,color:tk.color,letterSpacing:.3}}>{tk.name}</div>
                    <div style={{fontSize:8,color:C.text3}}>{tk.type}</div>
                    {tankHeat[i]>0&&<div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:HC[tankHeat[i]],marginTop:2}}>{HV[tankHeat[i]]}V</div>}
                    {tankHeat[i]===0&&<div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:C.text3,marginTop:2}}>—</div>}
                  </div>
                  {/* Vertical buttons */}
                  {HL.map((lv,j)=>(<div key={j} onClick={()=>setHeatFn(i,j)} style={{padding:tanks.length>2?"7px 4px":"9px 6px",borderRadius:8,cursor:"pointer",marginBottom:3,textAlign:"center",background:tankHeat[i]===j?`${HC[j]}15`:C.bg3,border:`1.5px solid ${tankHeat[i]===j?HC[j]+"45":C.border}`,transition:"all .2s"}}>
                    <div style={{fontSize:tanks.length>2?9:10,fontWeight:700,color:tankHeat[i]===j?HC[j]:C.text3}}>{lv}</div>
                    {tankHeat[i]===j&&<div style={{width:4,height:4,borderRadius:"50%",background:HC[j],margin:"3px auto 0",boxShadow:`0 0 4px ${HC[j]}`}}/>}
                  </div>))}
                </div>))}
              </div>
            </div>
            {/* Precision Access */}
            <div onClick={()=>setPrecisionMode(true)} style={{padding:"12px 16px",borderRadius:14,background:`linear-gradient(135deg,${C.orange}06,${C.orange}02)`,border:`1.5px dashed ${C.orange}30`,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:38,height:38,borderRadius:12,background:`${C.orange}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📈</div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.orange}}>Precision Heat Control</div><div style={{fontSize:10,color:C.text3}}>X-Y voltage curves · Full manual · App-only</div></div>
              <span style={{fontSize:14,color:C.orange}}>›</span>
            </div>
            <div style={{padding:"8px 14px",borderRadius:10,background:`${C.purple}08`,border:`1px solid ${C.purple}15`,display:"flex",gap:8,alignItems:"center",marginTop:8}}>
              <span style={{fontSize:14}}>🧠</span><div style={{fontSize:10,color:C.purple2,lineHeight:1.5}}>Quick Heat: User chọn intent → AI optimize voltage.</div>
            </div>
          </div>)}

          {/* PRECISION HEAT — DRAGGABLE MULTI-CURVE */}
          {sec==="heat"&&precisionMode&&(<div style={{animation:"slideIn .25s ease"}}>
            <Back onClick={()=>setPrecisionMode(false)} title="📈 Precision Heat" sub="Drag points · No AI · Expert mode" color={C.orange}/>
            <div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.orange}25`,marginBottom:10}}>
              {/* Legend */}
              <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                {tanks.map((tk,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:100,background:`${tk.color}12`,border:`1px solid ${tk.color}25`}}>
                  <div style={{width:8,height:3,borderRadius:2,background:tk.color}}/>
                  <span style={{fontSize:10,fontWeight:700,color:tk.color}}>{tk.name}</span>
                </div>))}
              </div>
              {/* SVG Graph with drag */}
              <div ref={graphRef} style={{position:"relative",height:160,background:C.bg3,borderRadius:12,border:`1px solid ${C.border}`,cursor:"crosshair",touchAction:"none"}}
                onMouseMove={e=>{if(!dragInfo||!graphRef.current)return;const rect=graphRef.current.getBoundingClientRect();const yPct=Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height));const voltage=3.8-(yPct*2.3);const clamped=Math.round(Math.max(1.5,Math.min(3.8,voltage))*10)/10;setPrecisionCurves(prev=>{const n={...prev};n[dragInfo.tank]=[...n[dragInfo.tank]];n[dragInfo.tank][dragInfo.pt]={...n[dragInfo.tank][dragInfo.pt],y:clamped};return n})}}
                onMouseUp={()=>setDragInfo(null)} onMouseLeave={()=>setDragInfo(null)}
                onTouchMove={e=>{if(!dragInfo||!graphRef.current)return;e.preventDefault();const t=e.touches[0];const rect=graphRef.current.getBoundingClientRect();const yPct=Math.max(0,Math.min(1,(t.clientY-rect.top)/rect.height));const voltage=3.8-(yPct*2.3);const clamped=Math.round(Math.max(1.5,Math.min(3.8,voltage))*10)/10;setPrecisionCurves(prev=>{const n={...prev};n[dragInfo.tank]=[...n[dragInfo.tank]];n[dragInfo.tank][dragInfo.pt]={...n[dragInfo.tank][dragInfo.pt],y:clamped};return n})}}
                onTouchEnd={()=>setDragInfo(null)}
              >
                {/* Grid lines */}
                <svg width="100%" height="100%" viewBox="0 0 240 140" style={{position:"absolute",inset:0}} preserveAspectRatio="none">
                  {[1.5,2.0,2.5,3.0,3.5].map((v,i)=>{const y=140-((v-1.5)/2.3)*140;return(<line key={i} x1="0" y1={y} x2="240" y2={y} stroke={C.border} strokeWidth="0.5" strokeDasharray={v===2.5||v===3.0?"":"2,4"}/>)})}
                  {[0,2,4,6,8].map((t,i)=>{const x=(t/8)*240;return(<line key={i} x1={x} y1="0" x2={x} y2="140" stroke={C.border} strokeWidth="0.5" strokeDasharray="2,4"/>)})}
                </svg>
                {/* Curves */}
                <svg width="100%" height="100%" viewBox="0 0 240 140" style={{position:"absolute",inset:0}} preserveAspectRatio="none">
                  {tanks.map((tk,ti)=>{const pts=precisionCurves[ti]||[];if(pts.length===0)return null;const polyPts=pts.map(p=>`${(p.x/8)*240},${140-((p.y-1.5)/2.3)*140}`).join(" ");return(<g key={ti}>
                    <polyline fill="none" stroke={tk.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={polyPts} opacity="0.8"/>
                    <polyline fill="none" stroke={tk.color} strokeWidth="6" strokeLinecap="round" points={polyPts} opacity="0.08"/>
                  </g>)})}
                </svg>
                {/* Draggable points */}
                <svg width="100%" height="100%" viewBox="0 0 240 140" style={{position:"absolute",inset:0}} preserveAspectRatio="none">
                  {tanks.map((tk,ti)=>{const pts=precisionCurves[ti]||[];return pts.map((p,pi)=>{const cx=(p.x/8)*240;const cy=140-((p.y-1.5)/2.3)*140;const isActive=dragInfo&&dragInfo.tank===ti&&dragInfo.pt===pi;return(<g key={`${ti}-${pi}`}>
                    <circle cx={cx} cy={cy} r={isActive?10:7} fill="transparent" style={{cursor:"grab"}}
                      onMouseDown={e=>{e.preventDefault();setDragInfo({tank:ti,pt:pi})}}
                      onTouchStart={e=>{e.preventDefault();setDragInfo({tank:ti,pt:pi})}}/>
                    <circle cx={cx} cy={cy} r={isActive?6:4.5} fill={tk.color} stroke="#fff" strokeWidth={isActive?2:1.5} style={{pointerEvents:"none"}}/>
                    {isActive&&<text x={cx} y={cy-12} textAnchor="middle" fontSize="10" fontWeight="800" fill={tk.color} style={{pointerEvents:"none"}}>{p.y}V</text>}
                  </g>)})})}
                </svg>
                {/* Y axis labels */}
                <div style={{position:"absolute",left:6,top:4,fontSize:8,color:C.text3,fontWeight:600}}>3.8V</div>
                <div style={{position:"absolute",left:6,bottom:4,fontSize:8,color:C.text3,fontWeight:600}}>1.5V</div>
                <div style={{position:"absolute",right:6,bottom:4,fontSize:8,color:C.text3}}>Time →</div>
                {/* X axis time labels */}
                <div style={{position:"absolute",bottom:4,left:0,right:0,display:"flex",justifyContent:"space-between",padding:"0 24px"}}>
                  {[0,2,4,6,8].map(t=>(<span key={t} style={{fontSize:7,color:C.text3}}>{t}s</span>))}
                </div>
              </div>
              <div style={{fontSize:10,color:C.text3,textAlign:"center",marginTop:6}}>👆 Drag points lên/xuống để điều chỉnh voltage curve</div>
            </div>
            {/* Quick tank adjustments */}
            <div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.border}`,marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700,color:C.text2,marginBottom:10}}>Quick Adjust per Tank</div>
              <div style={{display:"flex",gap:8}}>
                {tanks.map((tk,i)=>{const pts=precisionCurves[i]||[];const avgV=pts.length>0?Math.round(pts.reduce((a,p)=>a+p.y,0)/pts.length*10)/10:2.5;const maxV=pts.length>0?Math.max(...pts.map(p=>p.y)):3.0;return(<div key={i} style={{flex:1,padding:10,borderRadius:12,background:`${tk.color}08`,border:`1px solid ${tk.color}20`,textAlign:"center"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:tk.color,margin:"0 auto 4px"}}/>
                  <div style={{fontSize:tanks.length>2?9:11,fontWeight:700,color:tk.color}}>{tk.name}</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                    <div><div style={{fontSize:14,fontWeight:800,fontFamily:"monospace",color:C.text}}>{avgV}</div><div style={{fontSize:7,color:C.text3}}>AVG V</div></div>
                    <div><div style={{fontSize:14,fontWeight:800,fontFamily:"monospace",color:C.orange}}>{maxV}</div><div style={{fontSize:7,color:C.text3}}>MAX V</div></div>
                  </div>
                  <div style={{display:"flex",gap:3,marginTop:6}}>
                    <div onClick={()=>setPrecisionCurves(prev=>{const n={...prev};n[i]=n[i].map(p=>({...p,y:Math.max(1.5,Math.round((p.y-0.2)*10)/10)}));return n})} style={{flex:1,padding:"5px 0",borderRadius:6,background:C.bg3,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:10,fontWeight:700,color:C.blue,textAlign:"center"}}>−</div>
                    <div onClick={()=>setPrecisionCurves(prev=>{const n={...prev};n[i]=n[i].map(p=>({...p,y:Math.min(3.8,Math.round((p.y+0.2)*10)/10)}));return n})} style={{flex:1,padding:"5px 0",borderRadius:6,background:C.bg3,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:10,fontWeight:700,color:C.orange,textAlign:"center"}}>+</div>
                  </div>
                </div>)})}
              </div>
            </div>
            <div style={{padding:"8px 12px",borderRadius:8,background:`${C.orange}08`,border:`1px solid ${C.orange}15`,fontSize:10,color:C.orange}}>⚠ Precision = No AI. Expert users ARE the intelligence.</div>
          </div>)}

          {/* PRO */}
          {sec==="pro"&&(<div>
            <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:10}}>PRO MODES</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              {PROS.map(m=>(<div key={m.id} onClick={()=>selPro(m.id)} style={{padding:"12px 8px",borderRadius:14,cursor:"pointer",textAlign:"center",background:proMode===m.id?`${m.color}15`:C.bg2,border:`1.5px solid ${proMode===m.id?m.color+"50":C.border}`}}>
                <div style={{fontSize:26,marginBottom:3}}>{m.icon}</div><div style={{fontSize:13,fontWeight:800,color:proMode===m.id?m.color:C.text}}>{m.name}</div><div style={{fontSize:9,color:C.text3}}>{m.d}</div>
                <div style={{marginTop:4,fontSize:9,fontWeight:700,color:proMode===m.id?m.color:C.text3}}>{proMode===m.id?"● ACTIVE":"TAP"}</div>
              </div>))}
            </div>
            {proExp==="beast"&&<div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.red}25`}}><div style={{fontSize:12,fontWeight:700,color:C.red,marginBottom:10}}>🔥 Beast — Max Heat</div><Sld value={beastV} min={2.8} max={3.7} step={0.1} color={C.red} label="Max Voltage" unit="V" onChange={v=>{setBeastV(v);flashAI()}}/></div>}
            {proExp==="eco"&&<div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.green}25`}}><div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:10}}>🌿 Eco — Heat Level</div><div style={{display:"flex",gap:6}}>{["CHILL","MED","INTENSE"].map((lv,j)=>(<div key={j} onClick={()=>{setEcoLv(j+1);setTankHeat(tanks.map(()=>j+1));flashAI()}} style={{flex:1,padding:"10px 0",borderRadius:10,textAlign:"center",cursor:"pointer",background:ecoLv===j+1?`${HC[j+1]}20`:C.bg3,border:`1.5px solid ${ecoLv===j+1?HC[j+1]+"50":C.border}`,color:ecoLv===j+1?HC[j+1]:C.text3,fontSize:11,fontWeight:700}}>{lv}</div>))}</div></div>}
            {proExp==="balance"&&<div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.blue}25`}}><div style={{fontSize:12,fontWeight:700,color:C.blue,marginBottom:10}}>⚖️ Balance — Heat Level</div><div style={{display:"flex",gap:6}}>{["CHILL","MED","INTENSE"].map((lv,j)=>(<div key={j} onClick={()=>{setBalLv(j+1);setTankHeat(tanks.map(()=>j+1));flashAI()}} style={{flex:1,padding:"10px 0",borderRadius:10,textAlign:"center",cursor:"pointer",background:balLv===j+1?`${HC[j+1]}20`:C.bg3,border:`1.5px solid ${balLv===j+1?HC[j+1]+"50":C.border}`,color:balLv===j+1?HC[j+1]:C.text3,fontSize:11,fontWeight:700}}>{lv}</div>))}</div></div>}
            {proExp==="micro"&&<div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.purple}25`}}><div style={{fontSize:12,fontWeight:700,color:C.purple,marginBottom:10}}>🔬 Micro — Threshold</div><Sld value={microV} min={1.2} max={2.4} step={0.1} color={C.purple} label="Heat" unit="V" onChange={v=>{setMicroV(v);flashAI()}}/><div style={{fontSize:10,color:C.purple2,textAlign:"center"}}>💡 Lowest dose bạn vẫn cảm nhận</div></div>}
          </div>)}

          {/* BLEND */}
          {sec==="blend"&&(<div>
            <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:10}}>BLEND MODES</div>
            {tanks.length<2?<div style={{padding:20,borderRadius:14,background:C.bg2,border:`1px solid ${C.border}`,textAlign:"center"}}><div style={{fontSize:28}}>🧬</div><div style={{fontSize:13,fontWeight:700,color:C.text2,marginTop:6}}>Requires 2+ Tanks</div></div>:(<>
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                <div onClick={()=>{setBlendMode(blendMode==="entourage"?null:"entourage");setProMode(null);setMoodMode(null);setProExp(null);flashAI()}} style={{flex:1,padding:"14px 12px",borderRadius:14,cursor:"pointer",textAlign:"center",background:blendMode==="entourage"?`${C.green}15`:C.bg2,border:`1.5px solid ${blendMode==="entourage"?C.green+"50":C.border}`}}>
                  <div style={{fontSize:22}}>🧬</div><div style={{fontSize:13,fontWeight:800,color:blendMode==="entourage"?C.green:C.text}}>Entourage</div><div style={{fontSize:10,fontWeight:700,color:blendMode==="entourage"?C.green:C.text3}}>THC + CBD</div>
                </div>
                <div onClick={()=>{setBlendMode(blendMode==="hybrid"?null:"hybrid");setProMode(null);setMoodMode(null);setProExp(null);flashAI()}} style={{flex:1,padding:"14px 12px",borderRadius:14,cursor:"pointer",textAlign:"center",background:blendMode==="hybrid"?`${C.gold}15`:C.bg2,border:`1.5px solid ${blendMode==="hybrid"?C.gold+"50":C.border}`}}>
                  <div style={{fontSize:22}}>⚗️</div><div style={{fontSize:13,fontWeight:800,color:blendMode==="hybrid"?C.gold:C.text}}>True Hybrid</div><div style={{fontSize:10,fontWeight:700,color:blendMode==="hybrid"?C.gold:C.text3}}>Sativa + Indica</div>
                </div>
              </div>
              {blendMode==="entourage"&&<div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.green}25`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,fontWeight:800,color:"#ef4444"}}>THC {entR}%</span><span style={{fontSize:12,fontWeight:800,color:C.green}}>{100-entR}% CBD</span></div><div style={{display:"flex",height:28,borderRadius:8,overflow:"hidden",marginBottom:8}}><div style={{width:`${entR}%`,background:"#ef444430",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#ef4444"}}>THC</div><div style={{width:`${100-entR}%`,background:`${C.green}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:C.green}}>CBD</div></div><input type="range" min={10} max={90} value={entR} onChange={e=>{setEntR(+e.target.value);flashAI()}} style={{width:"100%",accentColor:C.green}}/>
                {/* Consumption tracker */}
                {btOn&&(totalThc>0||totalCbd>0)&&(()=>{const tot=totalThc+totalCbd;const actThc=tot>0?Math.round(totalThc/tot*100):50;const actCbd=100-actThc;const devThc=actThc-entR;const absD=Math.abs(devThc);const corrAmt=Math.round(absD*0.3*10)/10;return(<div style={{marginTop:10,padding:10,borderRadius:10,background:C.bg3,border:`1px solid ${C.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:10,fontWeight:700,color:C.text2}}>Session Consumption</span>
                    <span style={{fontSize:8,fontWeight:600,color:C.text3}}>{puffs} puffs</span>
                  </div>
                  <div style={{display:"flex",gap:10,marginBottom:8}}>
                    <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:8,color:C.text3,marginBottom:2}}>THC actual</div><div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:"#ef4444"}}>{totalThc.toFixed(1)}<span style={{fontSize:9}}>mg</span></div><div style={{fontSize:11,fontWeight:800,color:"#ef4444"}}>{actThc}%</div></div>
                    <div style={{width:1,background:C.border}}/>
                    <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:8,color:C.text3,marginBottom:2}}>CBD actual</div><div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:C.green}}>{totalCbd.toFixed(1)}<span style={{fontSize:9}}>mg</span></div><div style={{fontSize:11,fontWeight:800,color:C.green}}>{actCbd}%</div></div>
                  </div>
                  {/* Actual vs Goal bar */}
                  <div style={{marginBottom:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:8,color:C.text3}}>Goal {entR}:{100-entR}</span><span style={{fontSize:8,color:C.text3}}>Actual {actThc}:{actCbd}</span></div>
                    <div style={{display:"flex",height:6,borderRadius:3,overflow:"hidden",background:C.bg}}><div style={{width:`${actThc}%`,background:"#ef4444",transition:"width .3s"}}/><div style={{width:`${actCbd}%`,background:C.green,transition:"width .3s"}}/></div>
                    <div style={{position:"relative",height:8,marginTop:-7}}><div style={{position:"absolute",left:`${entR}%`,transform:"translateX(-50%)",width:2,height:8,background:"#fff",borderRadius:1,opacity:.8}}/></div>
                  </div>
                  {/* Deviation */}
                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",borderRadius:6,background:absD<=3?`${C.green}08`:absD<=8?`${C.gold}08`:`${C.orange}08`,border:`1px solid ${absD<=3?C.green:absD<=8?C.gold:C.orange}12`}}>
                    <span style={{fontSize:11}}>{absD<=3?"✅":absD<=8?"⚡":"🔄"}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10,fontWeight:700,color:absD<=3?C.green:absD<=8?C.gold:C.orange}}>Deviation: {devThc>0?"+":""}{devThc}% THC</div>
                      <div style={{fontSize:9,color:C.text3}}>{absD<=3?"Ratio on target — maintaining balance":absD<=8?`Minor drift — next puff compensates +${corrAmt}mg ${devThc>0?"CBD":"THC"}`:`Correcting — next ${Math.ceil(absD/3)} puffs will auto-adjust ratio`}</div>
                    </div>
                  </div>
                  {/* Reset */}
                  <div onClick={()=>{setTotalThc(0);setTotalCbd(0);setPuffs(0);setBlinks(0);notify("Tracking reset ✓",C.green);flashAI()}} style={{marginTop:8,padding:"7px 0",borderRadius:8,textAlign:"center",cursor:"pointer",background:C.bg,border:`1px solid ${C.border}`,fontSize:10,fontWeight:600,color:C.text3}}>↺ Reset Session Tracking</div>
                </div>)})()}
              </div>}
              {blendMode==="hybrid"&&<div style={{padding:14,borderRadius:14,background:C.bg2,border:`1px solid ${C.gold}25`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,fontWeight:800,color:C.gold}}>Sativa {hybR}%</span><span style={{fontSize:12,fontWeight:800,color:C.purple}}>{100-hybR}% Indica</span></div><div style={{display:"flex",height:28,borderRadius:8,overflow:"hidden",marginBottom:8}}><div style={{width:`${hybR}%`,background:`${C.gold}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:C.gold}}>Sativa</div><div style={{width:`${100-hybR}%`,background:`${C.purple}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:C.purple}}>Indica</div></div><input type="range" min={10} max={90} value={hybR} onChange={e=>{setHybR(+e.target.value);flashAI()}} style={{width:"100%",accentColor:C.gold}}/>
                {/* Hybrid consumption tracker */}
                {btOn&&puffs>0&&(()=>{const satTanks=tanks.filter(t=>t.type.includes("Sativa")).length;const indTanks=tanks.filter(t=>t.type.includes("Indica")).length;const hybTanks=tanks.filter(t=>t.type.includes("Hybrid")).length;const totalT=tanks.length||1;const actSat=Math.round((satTanks+hybTanks*0.5)/totalT*100);const actInd=100-actSat;const devSat=actSat-hybR;const absD=Math.abs(devSat);const corrAmt=Math.round(absD*0.25*10)/10;return(<div style={{marginTop:10,padding:10,borderRadius:10,background:C.bg3,border:`1px solid ${C.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:10,fontWeight:700,color:C.text2}}>Session Blend Tracking</span>
                    <span style={{fontSize:8,fontWeight:600,color:C.text3}}>{puffs} puffs</span>
                  </div>
                  <div style={{display:"flex",gap:10,marginBottom:8}}>
                    <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:8,color:C.text3,marginBottom:2}}>Sativa actual</div><div style={{fontSize:14,fontWeight:800,fontFamily:"monospace",color:C.gold}}>{actSat}%</div></div>
                    <div style={{width:1,background:C.border}}/>
                    <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:8,color:C.text3,marginBottom:2}}>Indica actual</div><div style={{fontSize:14,fontWeight:800,fontFamily:"monospace",color:C.purple}}>{actInd}%</div></div>
                  </div>
                  <div style={{marginBottom:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:8,color:C.text3}}>Goal {hybR}:{100-hybR}</span><span style={{fontSize:8,color:C.text3}}>Actual {actSat}:{actInd}</span></div>
                    <div style={{display:"flex",height:6,borderRadius:3,overflow:"hidden",background:C.bg}}><div style={{width:`${actSat}%`,background:C.gold,transition:"width .3s"}}/><div style={{width:`${actInd}%`,background:C.purple,transition:"width .3s"}}/></div>
                    <div style={{position:"relative",height:8,marginTop:-7}}><div style={{position:"absolute",left:`${hybR}%`,transform:"translateX(-50%)",width:2,height:8,background:"#fff",borderRadius:1,opacity:.8}}/></div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",borderRadius:6,background:absD<=3?`${C.green}08`:absD<=8?`${C.gold}08`:`${C.orange}08`,border:`1px solid ${absD<=3?C.green:absD<=8?C.gold:C.orange}12`}}>
                    <span style={{fontSize:11}}>{absD<=3?"✅":absD<=8?"⚡":"🔄"}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10,fontWeight:700,color:absD<=3?C.green:absD<=8?C.gold:C.orange}}>Deviation: {devSat>0?"+":""}{devSat}% Sativa</div>
                      <div style={{fontSize:9,color:C.text3}}>{absD<=3?"Blend ratio on target":absD<=8?`Adjusting — compensating +${corrAmt}mg ${devSat>0?"Indica":"Sativa"} next puff`:`Auto-correcting over next ${Math.ceil(absD/3)} puffs`}</div>
                    </div>
                  </div>
                  {/* Reset */}
                  <div onClick={()=>{setTotalThc(0);setTotalCbd(0);setPuffs(0);setBlinks(0);notify("Tracking reset ✓",C.green);flashAI()}} style={{marginTop:8,padding:"7px 0",borderRadius:8,textAlign:"center",cursor:"pointer",background:C.bg,border:`1px solid ${C.border}`,fontSize:10,fontWeight:600,color:C.text3}}>↺ Reset Session Tracking</div>
                </div>)})()}
              </div>}
            </>)}
          </div>)}

          {/* MOOD */}
          {sec==="mood"&&(<div>
            <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:4}}>MOOD MODES — AI HANDLES EVERYTHING</div>
            <div style={{fontSize:10,color:C.text3,marginBottom:10}}>Chọn cảm giác → AI xử lý toàn bộ.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              {MOODS.map(m=>(<div key={m.id} onClick={()=>selMood(m)} style={{padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",background:moodMode===m.id?`${m.color}15`:C.bg2,border:`1.5px solid ${moodMode===m.id?m.color+"50":C.border}`}}>
                <div style={{fontSize:22,marginBottom:2}}>{m.icon}</div><div style={{fontSize:11,fontWeight:800,color:moodMode===m.id?m.color:C.text}}>{m.name}</div><div style={{fontSize:7,color:C.text3}}>{m.d}</div>
                {moodMode===m.id&&<div style={{marginTop:3,fontSize:7,fontWeight:700,color:m.color}}>🧠 AI</div>}
              </div>))}
            </div>
          </div>)}

          {/* TOOLS */}
          {sec==="tools"&&(<div>{toolView?ToolDetail(toolView):(<div>
            <div style={{fontSize:10,fontWeight:700,color:C.text3,letterSpacing:1.5,marginBottom:10}}>PRO TOOLS</div>
            {TDEF.map(t=>{const s=ts[t.id];return(<div key={t.id} onClick={()=>setToolView(t.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:14,marginBottom:6,cursor:"pointer",background:s.on?`${t.color}08`:C.bg2,border:`1.5px solid ${s.on?t.color+"25":C.border}`}}>
              <div style={{width:42,height:42,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,background:s.on?`${t.color}15`:`${C.text3}10`}}>{t.icon}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:s.on?t.color:C.text2}}>{t.name}</div><div style={{fontSize:10,color:C.text3}}>{t.d}</div></div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3}}>
                <span style={{fontSize:9,fontWeight:700,color:s.on?t.color:C.text3,padding:"2px 8px",borderRadius:100,background:s.on?`${t.color}15`:`${C.text3}10`}}>{s.on?"ON":"OFF"}</span>
                <span style={{fontSize:13,color:C.text3}}>›</span>
              </div>
            </div>)})}
          </div>)}</div>)}
        </div>
      </>)}

      {/* ME TAB CONTENT */}
      {mainTab===3&&<MeTab/>}

      {/* OTHER TABS placeholder */}
      {(mainTab===1||mainTab===2)&&(<div style={{padding:"40px 20px",textAlign:"center"}}><div style={{fontSize:40,marginBottom:8}}>{mainTab===1?"🎮":"📡"}</div><div style={{fontSize:16,fontWeight:700,color:C.text2}}>{mainTab===1?"Game Tab":"Live Tab"}</div><div style={{fontSize:12,color:C.text3,marginTop:4}}>Coming soon — Interactive social features</div></div>)}

      {/* NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,padding:"6px 20px 14px",background:`linear-gradient(to top,${C.bg} 60%,transparent)`,zIndex:10}}>
        <div style={{display:"flex",background:C.bg2,borderRadius:16,border:`1px solid ${C.border}`,padding:"4px"}}>
          {["Control","Game","Live","Me"].map((t,i)=>(<div key={t} onClick={()=>{setMainTab(i);setToolView(null)}} style={{flex:1,padding:"7px 0",borderRadius:12,textAlign:"center",cursor:"pointer",background:mainTab===i?`${[C.cyan,C.pink,C.blue,C.purple][i]}12`:"transparent"}}>
            <div style={{fontSize:15,marginBottom:1}}>{["🎛","🎮","📡","👤"][i]}</div><div style={{fontSize:8,fontWeight:700,color:mainTab===i?[C.cyan,C.pink,C.blue,C.purple][i]:C.text3}}>{t}</div>
          </div>))}
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes fadeSlide{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes vapor{0%{opacity:.6}100%{opacity:0;transform:translateY(-20px)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes recSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        input[type=range]{-webkit-appearance:none;background:${C.bg3};border-radius:4px;outline:none;height:6px}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;cursor:pointer;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.3)}
      `}</style>
    </div>);
}
