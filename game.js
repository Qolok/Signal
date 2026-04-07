'use strict';
// ═══════════════════════════════════════════════════════════════
// PORTRAITS  (inline SVG → data URIs)
// ═══════════════════════════════════════════════════════════════
const PORTRAIT_SVG_UNUSED = [
/* 0 Vasquez — warm brown skin, dark bun, navy suit */
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 72">
<rect width="60" height="72" fill="#07101c"/>
<rect x="0" y="46" width="60" height="26" rx="0" fill="#0c2235"/>
<polygon points="30,45 19,50 30,54 41,50" fill="#163850"/>
<rect x="24" y="41" width="12" height="7" fill="#b87840"/>
<ellipse cx="13" cy="30" rx="3.5" ry="4.5" fill="#b07838"/>
<ellipse cx="47" cy="30" rx="3.5" ry="4.5" fill="#b07838"/>
<ellipse cx="30" cy="29" rx="16" ry="18" fill="#c4884a"/>
<ellipse cx="30" cy="12" rx="15" ry="9" fill="#160806"/>
<circle cx="30" cy="7" r="9" fill="#160806"/>
<path d="M18,23 Q23,21 27,23" stroke="#160806" stroke-width="1.5" fill="none"/>
<path d="M33,23 Q37,21 42,23" stroke="#160806" stroke-width="1.5" fill="none"/>
<ellipse cx="23" cy="27" rx="3.5" ry="3" fill="#120700"/>
<ellipse cx="37" cy="27" rx="3.5" ry="3" fill="#120700"/>
<circle cx="22" cy="26" r="1.1" fill="#5090b8" opacity=".6"/>
<circle cx="36" cy="26" r="1.1" fill="#5090b8" opacity=".6"/>
<path d="M24,38 Q30,42 36,38" stroke="#904020" stroke-width="1.5" fill="none"/>
</svg>`,

/* 1 Okonkwo — deep brown skin, shaved, rust suit */
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 72">
<rect width="60" height="72" fill="#12080a"/>
<rect x="0" y="46" width="60" height="26" fill="#201010"/>
<polygon points="30,45 19,50 30,54 41,50" fill="#2e1414"/>
<rect x="24" y="40" width="12" height="8" fill="#5a2810"/>
<ellipse cx="13" cy="31" rx="3.5" ry="5" fill="#502210"/>
<ellipse cx="47" cy="31" rx="3.5" ry="5" fill="#502210"/>
<ellipse cx="30" cy="30" rx="17" ry="19" fill="#5c2810"/>
<ellipse cx="30" cy="13" rx="16" ry="6" fill="#2c1006"/>
<path d="M17,22 Q23,19 29,22" stroke="#2c1006" stroke-width="2" fill="none"/>
<path d="M31,22 Q37,19 43,22" stroke="#2c1006" stroke-width="2" fill="none"/>
<ellipse cx="23" cy="27" rx="3.5" ry="3" fill="#0e0400"/>
<ellipse cx="37" cy="27" rx="3.5" ry="3" fill="#0e0400"/>
<circle cx="22" cy="26" r="1" fill="#c06030" opacity=".5"/>
<circle cx="36" cy="26" r="1" fill="#c06030" opacity=".5"/>
<path d="M24,38 Q30,41 36,38" stroke="#7a3018" stroke-width="1.5" fill="none"/>
<path d="M23,34 Q30,37 37,34" stroke="#7a3018" stroke-width="0.8" fill="none" opacity=".5"/>
</svg>`,

/* 2 Reyes — tan skin, dark fade cut, olive suit */
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 72">
<rect width="60" height="72" fill="#080f08"/>
<rect x="0" y="46" width="60" height="26" fill="#0e1e0a"/>
<polygon points="30,45 19,50 30,54 41,50" fill="#182c10"/>
<rect x="24" y="40" width="12" height="8" fill="#a87038"/>
<ellipse cx="13" cy="30" rx="3" ry="4.5" fill="#9e6830"/>
<ellipse cx="47" cy="30" rx="3" ry="4.5" fill="#9e6830"/>
<ellipse cx="30" cy="28" rx="16" ry="18" fill="#b07840"/>
<ellipse cx="30" cy="11" rx="15" ry="8" fill="#1a0c06"/>
<rect x="14" y="10" width="32" height="8" fill="#1a0c06"/>
<path d="M18,23 Q23,20 28,23" stroke="#1a0c06" stroke-width="1.5" fill="none"/>
<path d="M32,23 Q37,20 42,23" stroke="#1a0c06" stroke-width="1.5" fill="none"/>
<ellipse cx="23" cy="27" rx="3.5" ry="3" fill="#100600"/>
<ellipse cx="37" cy="27" rx="3.5" ry="3" fill="#100600"/>
<circle cx="22" cy="26" r="1.1" fill="#50a050" opacity=".55"/>
<circle cx="36" cy="26" r="1.1" fill="#50a050" opacity=".55"/>
<path d="M23,38 Q30,42 37,38" stroke="#804020" stroke-width="1.5" fill="none"/>
</svg>`,

/* 3 Kim — light skin, straight black hair, amber suit */
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 72">
<rect width="60" height="72" fill="#100c04"/>
<rect x="0" y="46" width="60" height="26" fill="#201408"/>
<polygon points="30,45 19,50 30,54 41,50" fill="#302010"/>
<rect x="24" y="40" width="12" height="8" fill="#d0a870"/>
<ellipse cx="14" cy="30" rx="3" ry="4.5" fill="#c8a060"/>
<ellipse cx="46" cy="30" rx="3" ry="4.5" fill="#c8a060"/>
<ellipse cx="30" cy="28" rx="15" ry="18" fill="#d4a870"/>
<rect x="14" y="6" width="32" height="22" rx="1" fill="#120806"/>
<ellipse cx="30" cy="8" rx="15" ry="6" fill="#120806"/>
<path d="M16,12 Q30,9 44,12" stroke="#1c0c08" stroke-width="2" fill="none"/>
<path d="M18,23 Q22,21 26,23" stroke="#120806" stroke-width="1.5" fill="none"/>
<path d="M34,23 Q38,21 42,23" stroke="#120806" stroke-width="1.5" fill="none"/>
<ellipse cx="22" cy="27" rx="3.2" ry="2.8" fill="#100600"/>
<ellipse cx="38" cy="27" rx="3.2" ry="2.8" fill="#100600"/>
<circle cx="21" cy="26" r="1" fill="#c08820" opacity=".6"/>
<circle cx="37" cy="26" r="1" fill="#c08820" opacity=".6"/>
<path d="M25,37 Q30,40 35,37" stroke="#905020" stroke-width="1.5" fill="none"/>
<line x1="16" y1="18" x2="14" y2="44" stroke="#120806" stroke-width="3"/>
<line x1="44" y1="18" x2="46" y2="44" stroke="#120806" stroke-width="3"/>
</svg>`,

/* 4 Halvorsen — light skin, blonde, stubble, purple suit */
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 72">
<rect width="60" height="72" fill="#0c0810"/>
<rect x="0" y="46" width="60" height="26" fill="#180e22"/>
<polygon points="30,45 19,50 30,54 41,50" fill="#241432"/>
<rect x="24" y="40" width="12" height="8" fill="#d0b090"/>
<ellipse cx="14" cy="30" rx="3.5" ry="5" fill="#c8a880"/>
<ellipse cx="46" cy="30" rx="3.5" ry="5" fill="#c8a880"/>
<ellipse cx="30" cy="28" rx="16" ry="19" fill="#d4b090"/>
<ellipse cx="30" cy="10" rx="14" ry="8" fill="#c8b060"/>
<rect x="16" y="8" width="28" height="10" fill="#c8b060"/>
<path d="M16,9 Q22,6 30,7 Q38,6 44,9" stroke="#b89848" stroke-width="1.5" fill="none"/>
<path d="M18,23 Q22,20 27,23" stroke="#604828" stroke-width="1.5" fill="none"/>
<path d="M33,23 Q38,20 42,23" stroke="#604828" stroke-width="1.5" fill="none"/>
<ellipse cx="22" cy="27" rx="3.5" ry="3" fill="#1c0c0a"/>
<ellipse cx="38" cy="27" rx="3.5" ry="3" fill="#1c0c0a"/>
<circle cx="21" cy="26" r="1.1" fill="#a060d0" opacity=".5"/>
<circle cx="37" cy="26" r="1.1" fill="#a060d0" opacity=".5"/>
<path d="M23,37 Q30,41 37,37" stroke="#906030" stroke-width="1.5" fill="none"/>
<rect x="18" y="34" width="24" height="6" rx="3" fill="#c0a070" opacity=".25"/>
</svg>`,

/* 5 Tran — medium skin, short dark asymmetric hair, teal suit */
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 72">
<rect width="60" height="72" fill="#060e0e"/>
<rect x="0" y="46" width="60" height="26" fill="#081818"/>
<polygon points="30,45 19,50 30,54 41,50" fill="#102828"/>
<rect x="24" y="40" width="12" height="8" fill="#a88060"/>
<ellipse cx="13" cy="30" rx="3" ry="4.5" fill="#9e7858"/>
<ellipse cx="47" cy="30" rx="3" ry="4.5" fill="#9e7858"/>
<ellipse cx="30" cy="28" rx="15.5" ry="18" fill="#a88060"/>
<ellipse cx="30" cy="12" rx="14" ry="8" fill="#150e08"/>
<rect x="14" y="10" width="20" height="12" fill="#150e08"/>
<ellipse cx="20" cy="10" rx="8" ry="7" fill="#150e08"/>
<path d="M18,23 Q22,21 27,23" stroke="#150e08" stroke-width="1.5" fill="none"/>
<path d="M33,23 Q37,21 41,23" stroke="#150e08" stroke-width="1.5" fill="none"/>
<ellipse cx="22" cy="27" rx="3" ry="2.8" fill="#120a04"/>
<ellipse cx="37" cy="27" rx="3" ry="2.8" fill="#120a04"/>
<circle cx="21" cy="26" r="1" fill="#40b0b0" opacity=".55"/>
<circle cx="36" cy="26" r="1" fill="#40b0b0" opacity=".55"/>
<path d="M24,38 Q30,41 36,38" stroke="#7a5030" stroke-width="1.5" fill="none"/>
</svg>`,
];
// Portrait helper — individual files in img/Crew/<name>.png
// Uses CSS cover crop. fy: 0=top-aligned (default), 0.5=centered
function portBg(portrait, dw, dh, fy=0){
  const ypos=fy===0?'top':'center';
  return `background-image:url(img/Crew/${portrait}.png);background-size:cover;`+
         `background-position:center ${ypos};width:${dw}px;height:${dh}px;flex-shrink:0;`;
}

const CREW_PORTRAITS=[
  {name:'Adaeze'},{name:'Reyes'},{name:'Yun'},{name:'Anand'},{name:'Halvorsen'},
  {name:'Santos'},{name:'Vasquez'},{name:'Okonkwo'},{name:'Morrow'},{name:'Kim'},
];

// ═══════════════════════════════════════════════════════════════
// HEX MATH  (pointy-top, axial)
// ═══════════════════════════════════════════════════════════════
const SQRT3=Math.sqrt(3), SZ=54, SZB=42;
const DIRS=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
const NS='http://www.w3.org/2000/svg';
function h2p(q,r){return[SZ*SQRT3*(q+r/2),SZ*1.5*r];}
function h2pb(q,r){return[SZB*SQRT3*(q+r/2),SZB*1.5*r];}
function p2h(x,y){const q=(x*SQRT3/3-y/3)/SZ,r=(y*2/3)/SZ,s=-q-r;
  let rq=Math.round(q),rr=Math.round(r),rs=Math.round(s);
  if(Math.abs(rq-q)>Math.abs(rr-r)&&Math.abs(rq-q)>Math.abs(rs-s))rq=-rr-rs;
  else if(Math.abs(rr-r)>Math.abs(rs-s))rr=-rq-rs;return[rq,rr];}
function hexPts(cx,cy,sz){sz=sz||SZ-2;let s='';
  for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/6;s+=`${(cx+sz*Math.cos(a)).toFixed(1)},${(cy+sz*Math.sin(a)).toFixed(1)} `;}return s.trim();}
const hk=(q,r)=>`${q},${r}`;
const hparse=k=>k.split(',').map(Number);
const hnbr=(q,r)=>DIRS.map(([dq,dr])=>[q+dq,r+dr]);

function bfsReach(fq,fr,mp){
  const dist=new Map([[hk(fq,fr),0]]),q=[[fq,fr]];
  while(q.length){const[cq,cr]=q.shift(),cd=dist.get(hk(cq,cr));
    if(cd>=mp)continue;
    for(const[nq,nr]of hnbr(cq,cr)){const k=hk(nq,nr);
      if(!dist.has(k)&&G.tiles.has(k)){dist.set(k,cd+1);q.push([nq,nr]);}}}
  dist.delete(hk(fq,fr));return dist;}

function bfsPath(fq,fr,tq,tr){
  if(fq===tq&&fr===tr)return[];
  const prev=new Map([[hk(fq,fr),null]]),q=[[fq,fr]];
  while(q.length){const[cq,cr]=q.shift();
    for(const[nq,nr]of hnbr(cq,cr)){const k=hk(nq,nr);
      if(prev.has(k)||!G.tiles.has(k))continue;prev.set(k,hk(cq,cr));
      if(nq===tq&&nr===tr){const path=[];let cur=k;
        while(cur){const p=prev.get(cur);if(p)path.unshift(hparse(cur));cur=p;}return path;}
      q.push([nq,nr]);}}return null;}

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const PCOLORS=['#4a8fbd','#c04444','#4ab04a','#c09040','#9040c0','#40b0b0'];

const CRASH_HEXES_DEFAULT=[
  {q:0,r:0,  name:'Crash Site',      short:'CRASH'},
  {q:1,r:0,  name:'Medical Bay',     short:'MED'},
  {q:1,r:-1, name:'Signal Array',    short:'SIG\nARR'},
  {q:0,r:-1, name:'Watch Tower',     short:'WATCH'},
  {q:-1,r:0, name:'Equipment Locker',short:'EQUIP'},
  {q:-1,r:1, name:'Airlock',         short:'AIR'},
  {q:0,r:1,  name:'Cargo Hold',      short:'CARGO'},
];

const ANOMALIES=['Stasis Pod','Temporal Rift','Portal','Gravitational Well','Dead Signal','Echo Chamber','Inversion Field'];

// ═══════════════════════════════════════════════════════════════
// FIXED 43-TILE TERRAIN DECK SPEC
// ═══════════════════════════════════════════════════════════════
function buildTerrainDeck(){
  const deck=[];
  // 3 Ship Sections
  for(let i=0;i<3;i++)deck.push({type:'ship_section',pois:['Airlock','Emergency Bay','Supply Cache'],investigatedCount:0});
  // 7 Anomalies
  ANOMALIES.forEach(a=>deck.push({type:'anomaly',anomaly:a,pois:[],investigatedCount:0}));
  // 33 Terrain tiles
  const terrainSpec=[
    {pois:['Signal Tower'],radioFragment:true,  count:2},
    {pois:['Signal Tower'],radioFragment:false, count:1},
    {pois:['Signal Tower','Fuselage'],radioFragment:true, count:2},
    {pois:['Signal Tower'],radioFragment:true,  count:1},
    {pois:['Signal Tower','Cave'],   radioFragment:false,count:1},
    {pois:['Fuselage'],               radioFragment:false,count:2},
    {pois:['Fuselage','Cave'],        radioFragment:false,count:2},
    {pois:['Fuselage','Outpost'],     radioFragment:false,count:2},
    {pois:['Fuselage','Wreckage Field'],radioFragment:false,count:1},
    {pois:['Cave'],                   radioFragment:false,count:3},
    {pois:['Cave','Outpost'],         radioFragment:false,count:2},
    {pois:['Cave','Wreckage Field'],  radioFragment:false,count:2},
    {pois:['Outpost'],                radioFragment:false,count:3},
    {pois:['Outpost','Wreckage Field'],radioFragment:false,count:2},
    {pois:['Wreckage Field'],         radioFragment:false,count:2},
    {pois:['Wreckage Field'],         radioFragment:false,count:2},
    {pois:['Wreckage Field'],         radioFragment:false,count:4},
    {pois:['Cave','Signal Tower'],   radioFragment:true, count:2},
    {pois:['Fuselage'],               radioFragment:false,count:2},
    {pois:['Outpost','Cave'],         radioFragment:false,count:2},
  ];
  terrainSpec.forEach(spec=>{
    for(let i=0;i<spec.count;i++)deck.push({type:'terrain',pois:[...spec.pois],radioFragment:spec.radioFragment,investigatedCount:0});
  });
  // shuffle
  for(let i=deck.length-1;i>0;i--){const j=0|Math.random()*(i+1);[deck[i],deck[j]]=[deck[j],deck[i]];}
  return deck;
}

const POI_COLOR={
  'Fuselage':'#3a7080','Cave':'#2a5030','Outpost':'#7a6030',
  'Signal Tower':'#2870a0','Wreckage Field':'#705030',
  'Recovered Terminal':'#2060a8',
};

// ── TILE IMAGES ───────────────────────────────────────────────
// Individual PNG files in img/Tiles/ — one per tile/POI name
const TILE_IMAGE_MAP={
  'Crash Site':         'crash-site.png',
  'Cave':               'cave.png',
  'Equipment Locker':   'locker.png',
  'Signal Array':       'signal-array.png',
  'Watch Tower':        'watch-tower.png',
  'Medical Bay':        'medbay.png',
  'Cargo Hold':         'cargo.png',
  'Airlock':            'airlock.png',
  'Signal Tower':       'signal-tower.png',
  'Outpost':            'outpost1.png',
  'Fuselage':           'fuselage.png',
  'Wreckage Field':     'wreckage.png',
  'Recovered Terminal': 'terminal.png',
  'Stasis Pod':         'stasis.png',
  'Temporal Rift':      'temporal-distortion.png',
  'Gravitational Well': 'gravity-well.png',
  'Echo Chamber':       'echo-chamber.png',
  'Dead Signal':        'dead-signal.png',
  'Inversion Field':    'inversion-field.png',
  'Ship Section':       'ship-section1.png',
};

function getTileImg(t){
  let key;
  if(t.type==='crash_site')key=t.name;
  else if(t.type==='terrain')key=t.pois?.[0];
  else if(t.type==='anomaly')key=t.anomaly;
  else if(t.type==='ship_section')key='Ship Section';
  const file=TILE_IMAGE_MAP[key];
  return file?`img/Tiles/${file}`:null;
}
function spriteCssForName(name){
  const file=TILE_IMAGE_MAP[name];
  if(!file)return'background-color:#0e1e30';
  return`background:#0e1e30 url(img/Tiles/${file}) center/cover no-repeat`;
}

const EQ_CARDS=[
  {id:'plasma_cutter', name:'Plasma Cutter',    cat:'Tool',   txt:'Move through a tile edge with no printed path connection.'},
  {id:'grappling',     name:'Grappling Hook',   cat:'Tool',   txt:'Move to any adjacent tile ignoring path costs this turn.'},
  {id:'excavator',     name:'Excavator',        cat:'Tool',   txt:'Reveal a face-down tile without entering it.',use:'excavator'},
  {id:'lockpick',      name:'Lockpick',         cat:'Tool',   txt:'Reach any POI on your current tile regardless of path.'},
  {id:'walkie',        name:'Walkie',           cat:'Tool',   txt:'Trade resources or share an Event card with a player on an adjacent tile.'},
  {id:'medpack',       name:'MedPack',          cat:'Supply', txt:'Restore 1 Health to HEALTHY. Discard after use.', use:'medpack'},
  {id:'emer_rations',  name:'Emergency Rations',cat:'Supply', txt:'Flip 3 EMPTY Rations to FULL. Discard after use.', use:'emer_rations'},
  {id:'compressed_o2', name:'Compressed O2',    cat:'Supply', txt:'Flip 2 EMPTY O2 Tanks to FULL. Discard after use.', use:'compressed_o2'},
  {id:'hazard_suit',   name:'Hazard Suit',       cat:'Tech',   txt:'Do not flip a Ration when entering a Toxic terrain tile.'},
  {id:'scanner',       name:'Scanner',           cat:'Tech',   txt:'When placing a new tile face-down, peek at it before others see it.'},
  {id:'rebreather',    name:'Rebreather',        cat:'Tech',   txt:'Your O2 Tanks deplete every 2 rounds away from Crash Site instead of every round.'},
  {id:'motion_sensor', name:'Motion Sensor',     cat:'Tech',   txt:'Once per turn, before moving, look at the top 3 tiles of the terrain stack.'},
  {id:'stun_baton',    name:'Stun Baton',        cat:'Weapon', txt:'A player on your tile skips their next turn. No roll required.'},
  {id:'flare_gun',     name:'Flare Gun',         cat:'Weapon', txt:'Force any player within 2 tiles to move to your tile immediately.'},
  {id:'shock_trap',    name:'Shock Trap',        cat:'Weapon', txt:'Place face-down on any POI. The next player to investigate it flips 1 Health to WOUNDED.'},
  {id:'jammer',        name:'Signal Jammer',     cat:'Weapon', txt:'No Signal Roll occurs this round, regardless of Radio Fragments.'},
];

const EVENT_CARDS=[
  // Public — yields
  {text:'Emergency supplies found, partially intact. Roll 1 die for Ration yield.',pub:true,rollRations:true},
  {text:'Salvageable material nearby. Roll 1 die: 1–3 = nothing; 4–5 = 1 Ration; 6 = Equipment card.',pub:true,rollWreckage:true},
  {text:'A sealed equipment cache. Contents intact.',pub:true,drawEq:true},
  {text:'A Radio Fragment — yours, ejected on impact. Still functional.',pub:true,rf:true},
  {text:'Natural shelter here. The terrain blocks atmospheric sensors. Skip your O\u2082 flip this round.',pub:true,skipO2:true},
  // Public — hazards
  {text:'Structural instability. The ground shifts — brace yourself. Flip 1 Ration to EMPTY.',pub:true,loseRation:1},
  {text:'Toxic residue from the crash. Flip 1 Ration to EMPTY.',pub:true,loseRation:1},
  // Public — narrative
  {text:'Nothing here. Whatever this place held has been taken by the terrain.',pub:true},
  {text:'Signs of prior occupation — too recent to be from the crash. Someone else was here.',pub:true},
  {text:'Structural damage beyond salvage. The area offers nothing useful.',pub:true},
  {text:'Clear. No hazards, no yield. Move on.',pub:true},
  {text:'Something jammed the sensors on the way in. You can\'t tell if it was the terrain or something else.',pub:true},
  // Private
  {text:'You find something personal. A crew member\'s effects, separated from the wreck. You keep it to yourself.',pub:false},
  {text:'A data chip, still readable. The contents are for your eyes only.',pub:false},
  {text:'You rest here alone. Nobody needs to know what you found.',pub:false},
  {text:'Something moves at the edge of your vision. You say nothing to the others.',pub:false},
  {text:'A hidden cache — stowed deliberately, not by the crash. You pocket the contents before anyone else arrives.',pub:false,drawEq:true},
  {text:'A partial crew log from before the crash. Someone knew this was coming. You now know something the others don\'t.',pub:false},
  {text:'You find a fragment of the ship\'s manifest. Names, cargo, discrepancies. Yours to keep.',pub:false},
];

const TILE_TIPS={
  'Crash Site':        {desc:'Starting point for all crew. The heart of Base Camp.',         act:'No specific action — this is your anchor point.'},
  'Medical Bay':       {desc:'Emergency medical equipment salvaged from the wreckage.',      act:'Action: Restore 1 Health token to HEALTHY.'},
  'Signal Array':      {desc:'The ship\'s emergency transmitter. Fits one player at a time.',act:'Action: Activate Radio Fragments. Roll Signal dice if fragments are activated. Contest occupancy if blocked.'},
  'Equipment Locker':  {desc:'The crew\'s tool cache. Raided but not empty.',               act:'Action: Draw 1 Equipment card.'},
  'Cargo Hold':        {desc:'Communal food and supply storage.',                            act:'Action: Deposit or withdraw Rations freely.'},
  'Airlock':           {desc:'The pressurized entry point from the field. O₂ reserves partially restored on re-entry.',act:'Passive: Refill 1 O₂ Tank automatically when entering from terrain.'},
  'Watch Tower':       {desc:'An elevated vantage point over the surrounding terrain.',      act:'Action: Reveal all face-down tiles adjacent to any crew member currently in the field.'},
  'Signal Tower':      {desc:'A broadcasting structure, origin unknown. Possibly from a prior expedition.',act:'Investigate: Draw an Event card. May yield a Radio Fragment.'},
  'Cave':              {desc:'Natural shelter. Atmospheric sensors can\'t reach inside.',    act:'Investigate: Skip O2 Tank flip this round. Draw an Event card.'},
  'Outpost':           {desc:'A supply depot, damaged but stocked.',                         act:'Investigate: Roll 1 die for Ration yield. Draw an Event card.'},
  'Fuselage':          {desc:'Hull section from the Endymion 7. Still holds cargo.',        act:'Investigate: May yield Equipment cards or a Radio Fragment. Draw an Event card.'},
  'Wreckage Field':    {desc:'Debris scattered across the terrain — hazardous, but potentially useful.',act:'Investigate: Roll for salvage. Draw an Event card.'},
  'Recovered Terminal':{desc:'A functional console partially salvaged from the wreckage, still drawing power.',act:'Investigate: Draw a Private Event card. The data is yours alone.'},
  'Stasis Pod':        {desc:'Alien preservation technology. Time moves differently inside.', act:'Enter: Turn pawn sideways. Skip Resource Flip each round inside. Cannot move or interact. Exit any time.'},
  'Temporal Rift':     {desc:'Spacetime distortion. Past and future Rations flicker.',       act:'Automatic: Roll 1 die. 1–3: lose that many Rations. 4–6: recover that many empty Rations.'},
  'Portal':            {desc:'Instantaneous transit point. Origin unknown.',                  act:'Option: Move pawn immediately to Crash Site. Turn ends.'},
  'Gravitational Well':{desc:'Intense localized gravity field.',                             act:'Automatic: Roll 1 die. The player to your left moves your pawn that many points in any direction.'},
  'Dead Signal':       {desc:'Something blocks all transmission here.',                       act:'Automatic: No Signal Roll occurs this round for any player.'},
  'Echo Chamber':      {desc:'The terrain resonates with past events.',                      act:'Automatic: Resolve the most recent Public Event card again in full.'},
  'Inversion Field':   {desc:'Gravity inversion. Resources change hands involuntarily.',     act:'Automatic: Choose any other player. Swap your Ration tokens with theirs.'},
  'Ship Section':      {desc:'A fragment of the Endymion 7 that came down separately.',      act:'Contains: Airlock (refill O2), Emergency Bay (restore Health), Supply Cache (roll for Rations).'},
};

// ═══════════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════════
let G=null, cardUid=0;
let pendingNames=[], pendingPortraits=[];
let viewedPlayer=0;
function cp(){return G.players[G.currentPlayer];}

function dealEquipment(){
  const pool=[...EQ_CARDS,...EQ_CARDS,...EQ_CARDS];
  for(let i=pool.length-1;i>0;i--){const j=0|Math.random()*(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool;
}

function newGame(names, portraits, placedMap){
  const tiles=new Map();
  // Use builder placed map or defaults
  if(placedMap && placedMap.size>0){
    placedMap.forEach((info,k)=>{
      tiles.set(k,{...info,type:'crash_site',revealed:true,short:info.short||info.name.toUpperCase().slice(0,5)});
    });
  } else {
    CRASH_HEXES_DEFAULT.forEach(h=>tiles.set(hk(h.q,h.r),{...h,type:'crash_site',revealed:true}));
  }
  const eqDeck=dealEquipment();
  const players=names.map((name,i)=>{
    const equipment=eqDeck.splice(0,3).map(c=>({...c,uid:++cardUid}));
    const portrait=(portraits&&portraits[i])||CREW_PORTRAITS[i%CREW_PORTRAITS.length].name;
    return{id:i,name,color:PCOLORS[i],portrait,q:0,r:0,rations:10,o2:3,health:3,
           radioFragments:0,equipment,incapacitated:0,alive:true,location:'Crash Site',skipO2:false};
  });
  G={players,currentPlayer:0,tiles,terrainDeck:buildTerrainDeck(),
     eqDeck,eqDeckCount:eqDeck.length,evtDeckCount:80,
     radioFragmentsActivated:0,turn:1,phase:'roll',movementLeft:0,reach:new Map(),excavatorMode:false,tileActionUsed:false};
  expandFrontier();
}

// ═══════════════════════════════════════════════════════════════
// TERRAIN DECK & FRONTIER  (capped at 43)
// ═══════════════════════════════════════════════════════════════
function countTerrainTiles(){
  let n=0;
  for(const[,t]of G.tiles){if(t.type==='face_down'||t.type==='terrain'||t.type==='anomaly'||t.type==='ship_section')n++;}
  return n;
}

function expandFrontier(){
  const MAX_TERRAIN=43;
  for(const[k,t]of G.tiles){
    if(!t.revealed)continue;
    const[q,r]=hparse(k);
    for(const[nq,nr]of hnbr(q,r)){
      const nk=hk(nq,nr);
      if(!G.tiles.has(nk)){
        if(countTerrainTiles()<MAX_TERRAIN){
          G.tiles.set(nk,{q:nq,r:nr,type:'face_down',revealed:false,pois:[]});
        }
      }
    }
  }
}

function revealAt(q,r){
  const k=hk(q,r);const t=G.tiles.get(k);if(!t||t.revealed)return;
  if(!G.terrainDeck.length){G.tiles.set(k,{...t,type:'terrain',revealed:true,pois:['Wreckage Field'],investigatedCount:0});expandFrontier();return;}
  const drawn=G.terrainDeck.pop();
  G.tiles.set(k,{...t,...drawn,q,r,revealed:true,investigatedCount:0});
  const nt=G.tiles.get(k);
  if(nt.type==='anomaly')addLog(`Tile revealed: Anomaly — ${nt.anomaly}`,'tile');
  else if(nt.type==='ship_section')addLog('Ship Section discovered!','tile');
  else addLog(`Tile revealed: ${nt.pois.join(', ')}`,'tile');
  expandFrontier();
}

function tileName(t){
  if(!t)return'Unknown';if(t.name)return t.name;if(t.type==='anomaly')return t.anomaly||'Anomaly';
  if(t.type==='ship_section')return'Ship Section';if(t.pois&&t.pois.length)return t.pois[0];return'Terrain';
}

// ═══════════════════════════════════════════════════════════════
// TILE REVEAL + EVENT DRAW
// ═══════════════════════════════════════════════════════════════
function setTileHeroSprite(el,t){
  const img=getTileImg(t);
  if(!img){el.style.backgroundImage='none';return;}
  el.style.backgroundImage=`url(${img})`;
  el.style.backgroundSize='cover';
  el.style.backgroundPosition='center';
}

function tileImgHtml(t){
  const img=getTileImg(t);
  if(!img)return'';
  return `<div style="width:200px;height:140px;background:url(${img}) center/cover no-repeat;border-radius:4px;margin:0 auto 10px;overflow:hidden;display:block"></div>`;
}

function showTileRevealModal(t, onDismiss){
  let title, desc;
  if(t.type==='anomaly'){
    title=t.anomaly||'Anomaly';
    const tip=TILE_TIPS[t.anomaly]||{};
    desc=[tip.desc,tip.act].filter(Boolean).join('\n\n');
    if(!desc)desc='An anomaly of unknown origin.';
  } else if(t.type==='ship_section'){
    title='Ship Section — Endymion 7';
    desc='A section of the Endymion 7 rests here, partially intact.\n\nFacilities: Airlock · Emergency Bay · Supply Cache';
  } else {
    title=t.pois.join(' \u00b7 ');
    desc=t.pois.map(poi=>TILE_TIPS[poi]?.desc).filter(Boolean).join('\n\n');
  }
  if(t.radioFragment){
    const p=cp();p.radioFragments++;t.radioFragment=false;
    addLog(`${p.name} recovered a Radio Fragment from the Signal Tower.`,'frag');
    desc=(desc?desc+'\n\n':'')+'\u25c8 Radio Fragment recovered from this tower.';
  }
  // Populate overlay
  const isAnomaly=t.type==='anomaly';
  setTileHeroSprite(document.getElementById('tr-hex'),t);
  document.getElementById('tr-name').textContent=title.toUpperCase();
  document.getElementById('tr-desc').textContent=desc||'Unknown terrain.';
  const deck=document.getElementById('tr-deck');
  const trov=document.getElementById('trov');
  const dismiss=()=>{
    trov.onclick=null;
    deck.onclick=null;
    trov.classList.remove('show','anomaly-mode');
    trov.style.display='none';
    if(onDismiss)onDismiss();
    else drawTileEvent(t);
  };
  if(isAnomaly){
    deck.style.display='none';
    trov.classList.add('anomaly-mode');
    trov.onclick=e=>{if(e.target===trov)dismiss();};
  } else {
    deck.style.display='';
    trov.onclick=null;
    document.getElementById('tr-evtn').textContent=G.evtDeckCount;
    document.getElementById('tr-deck-lbl').textContent='Draw Event';
    deck.onclick=dismiss;
  }
  cancelTooltip();
  trov.style.display='flex';
  trov.classList.add('show');
}

function drawTileEvent(t){
  const p=cp();
  const evt=EVENT_CARDS[0|Math.random()*EVENT_CARDS.length];
  G.evtDeckCount=Math.max(0,G.evtDeckCount-1);
  const evtnEl=document.getElementById('evtn');if(evtnEl)evtnEl.textContent=G.evtDeckCount;
  // Apply guaranteed (non-roll) effects immediately
  if(evt.rf){p.radioFragments++;addLog(`${p.name} found a Radio Fragment!`,'frag');}
  if(evt.drawEq){const c=drawEqCard(p);if(c)addLog(`${p.name} drew ${c.name}.`,'good');}
  if(evt.loseRation){const lost=Math.min(p.rations,evt.loseRation);p.rations-=lost;addLog(`${p.name} lost ${lost} Ration(s).`,'crit');}
  if(evt.skipO2){p.skipO2=true;addLog('O\u2082 flip skipped this turn.');}
  const locName=t.pois&&t.pois.length?t.pois.join(' \u00b7 '):(t.name||'');
  let rollCallback=null;
  if(evt.rollRations){
    rollCallback=r=>{const gained=Math.min(10-p.rations,r);p.rations+=gained;addLog(`Loot roll: ${r} \u2014 +${gained} Ration(s).`,gained?'good':'');return`Rolled ${r} \u2014 gained ${gained} Ration${gained!==1?'s':''}.`;};
  } else if(evt.rollWreckage){
    rollCallback=r=>{
      if(r<=3){addLog(`Wreckage roll: ${r} \u2014 nothing found.`);return`Rolled ${r} \u2014 nothing found.`;}
      if(r<=5){const gained=Math.min(10-p.rations,1);p.rations+=gained;addLog(`Wreckage roll: ${r} \u2014 +1 Ration.`,'good');return`Rolled ${r} \u2014 gained 1 Ration.`;}
      const c=drawEqCard(p);const msg=c?`drew ${c.name}.`:'equipment deck empty.';addLog(`Wreckage roll: 6 \u2014 ${msg}`,'good');return`Rolled 6 \u2014 ${msg}`;
    };
  }
  showEventCard(evt,locName,()=>{updateUI();render();},rollCallback);
}

// ═══════════════════════════════════════════════════════════════
// TABLETOP DICE
// ═══════════════════════════════════════════════════════════════
const FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
let diceState={mode:'move',values:[],rolled:false,spinning:false};

function showTableDice(mode){
  // mode: 'move' (1 clickable die) | 'signal' (3 clickable dice) | 'result' (locked after roll)
  diceState.mode=mode;diceState.spinning=false;
  const count=mode==='signal'?3:1;
  diceState.values=new Array(count).fill(null);
  diceState.rolled=false;
  renderTableDice();
}

// ── Shared die-building helpers (used by table dice + event card dice) ──
const PIPS=[
  [[2,2]],
  [[1,1],[3,3]],
  [[1,1],[2,2],[3,3]],
  [[1,1],[1,3],[3,1],[3,3]],
  [[1,1],[1,3],[2,2],[3,1],[3,3]],
  [[1,1],[1,3],[2,1],[2,3],[3,1],[3,3]],
];
function makeDieFace(cls,val){
  const f=document.createElement('div');
  f.className=`td-face ${cls}`;
  f.style.gridTemplateRows='repeat(3,1fr)';
  f.style.gridTemplateColumns='repeat(3,1fr)';
  PIPS[val-1].forEach(([r,c])=>{
    const p=document.createElement('div');
    p.className='pip';
    p.style.gridRow=r;p.style.gridColumn=c;
    f.appendChild(p);
  });
  return f;
}
function make3DDie(state){
  const wrap=document.createElement('div');
  wrap.className=`td-die-wrap ${state}`;
  const cube=document.createElement('div');
  cube.className='td-die3';
  [[1,'f1'],[2,'f2'],[3,'f3'],[4,'f4'],[5,'f5'],[6,'f6']].forEach(([v,cls])=>cube.appendChild(makeDieFace(cls,v)));
  wrap.appendChild(cube);
  return wrap;
}
function makeResultDie(val){
  const die=document.createElement('div');
  die.className='td-die rolling';
  const grid=document.createElement('div');
  grid.style.cssText='position:absolute;inset:0;display:grid;grid-template-rows:repeat(3,1fr);grid-template-columns:repeat(3,1fr);padding:4px;box-sizing:border-box;';
  PIPS[val-1].forEach(([r,c])=>{
    const p=document.createElement('div');
    p.className='pip';
    p.style.gridRow=r;p.style.gridColumn=c;
    grid.appendChild(p);
  });
  die.appendChild(grid);
  return die;
}

function renderTableDice(){
  const row=document.getElementById('td-row');
  const movesEl=document.getElementById('td-moves');
  if(!diceState.values.length){
    row.innerHTML='';
    if(movesEl)movesEl.textContent='';
    return;
  }

  const moveCounting=diceState.mode==='move'&&diceState.rolled&&G;
  row.innerHTML='';

  diceState.values.forEach((v,i)=>{
    if(!diceState.rolled&&!diceState.spinning){
      const wrap=make3DDie('idle');
      wrap.onclick=rollTableDice;
      row.appendChild(wrap);
    } else if(diceState.spinning){
      row.appendChild(make3DDie('rolling'));
    } else {
      const die=makeResultDie(v);
      die.id='td-die-result';
      die.style.animationDelay=(i*0.1)+'s';
      if(moveCounting&&G.movementLeft>0){
        const ov=document.createElement('div');
        ov.className='td-die-moves';
        ov.id='td-die-moves-ov';
        ov.textContent=G.movementLeft;
        die.appendChild(ov);
      }
      row.appendChild(die);
    }
  });

  if(diceState.rolled&&diceState.values.length>1){
    const tot=document.createElement('div');
    tot.className='td-total';
    tot.textContent=diceState.values.reduce((a,b)=>a+b,0);
    row.appendChild(tot);
  }

  // Update moves overlay on the die face if it already exists
  if(movesEl)movesEl.textContent='';
  const existingOv=document.getElementById('td-die-moves-ov');
  if(existingOv){
    if(moveCounting&&G.movementLeft>0)existingOv.textContent=G.movementLeft;
    else existingOv.remove();
  }
}

function rollTableDice(){
  if(diceState.rolled)return;
  const finalValues=diceState.values.map(()=>1+(0|Math.random()*6));
  diceState.spinning=true;
  renderTableDice(); // create rolling die once — do NOT recreate during animation
  setTimeout(()=>{
    diceState.spinning=false;
    diceState.values=finalValues;
    diceState.rolled=true;
    if(diceState.mode==='move'){
      const r=finalValues[0];
      if(!G||G.phase!=='roll')return;
      G.movementLeft=r;G.phase='move';
      G.reach=bfsReach(cp().q,cp().r,r);
      addLog(`${cp().name} rolled ${r}.`);
      renderTableDice();
      updateUI();render();
    } else if(diceState.mode==='signal'){
      renderTableDice();
      finishSignalRoll(finalValues);
    }
  },1500);
}

function hideTableDice(){
  diceState.values=[];
  document.getElementById('td-row').innerHTML='';
}


function doMove(q,r){
  const p=cp();if(G.phase!=='move'&&G.phase!=='action')return;if(!G.movementLeft)return;
  const path=bfsPath(p.q,p.r,q,r);if(!path||!path.length)return;if(path.length>G.movementLeft)return;
  const fromTile=G.tiles.get(hk(p.q,p.r));
  const comingFromTerrain=fromTile?.type!=='crash_site';
  const wasRevealed=G.tiles.get(hk(q,r))?.revealed;
  path.forEach(([pq,pr])=>{if(!G.tiles.get(hk(pq,pr))?.revealed)revealAt(pq,pr);});
  // Signal Array: only 1 player allowed at a time
  const destT=G.tiles.get(hk(q,r));
  if(destT?.name==='Signal Array'){
    const occupant=G.players.find(x=>x.alive&&x.id!==p.id&&x.q===q&&x.r===r);
    if(occupant){showModal('Signal Array Occupied',`${occupant.name} is already at the Signal Array. Only one crew member can use it at a time.`,true,()=>{updateUI();render();});return;}
  }
  p.q=q;p.r=r;G.movementLeft-=path.length;renderTableDice();
  const t=G.tiles.get(hk(q,r));
  p.location=tileName(t);
  if(t?.type==='crash_site'){
    // Airlock: refill 1 O2 when entering from outside base camp
    if(t.name==='Airlock'&&comingFromTerrain&&p.o2<3){p.o2=Math.min(3,p.o2+1);addLog(`${p.name} passed through Airlock. +1 O₂.`,'good');}
  }
  const isNewAnomaly=!wasRevealed&&t?.type==='anomaly';
  if(t?.type==='anomaly'&&!isNewAnomaly)triggerAnomaly(t);
  const needsDraw=!wasRevealed&&t&&(t.type==='terrain'||t.type==='ship_section')&&t.pois?.length>0;
  if(needsDraw)t.investigatedCount=t.pois.length;
  G.phase='action';G.reach=bfsReach(p.q,p.r,G.movementLeft);
  addLog(`${p.name} → ${p.location}`);
  updateUI();render();
  if(needsDraw)showTileRevealModal(t);
  else if(isNewAnomaly)showTileRevealModal(t,()=>triggerAnomaly(t));
}


function drawEqCard(player){
  if(!G.eqDeckCount)return null;
  const card=EQ_CARDS[0|Math.random()*EQ_CARDS.length];
  player.equipment.push({...card,uid:++cardUid});
  G.eqDeckCount--;
  const el=document.getElementById('equpn');if(el)el.textContent=G.eqDeckCount;
  return card;
}

function useCard(playerIdx,uid){
  const p=G.players[playerIdx];const ci=p.equipment.findIndex(c=>c.uid===uid);if(ci<0)return;
  const c=p.equipment[ci];
  if(!c.use)return;
  if(c.use==='medpack'){if(p.health<3){p.health++;p.equipment.splice(ci,1);addLog(`${p.name} used MedPack. Health: ${p.health}/3.`,'good');}else{addLog('Health already full.');return;}}
  else if(c.use==='emer_rations'){const gain=Math.min(3,10-p.rations);p.rations+=gain;p.equipment.splice(ci,1);addLog(`${p.name} used Emergency Rations. +${gain} Rations.`,'good');}
  else if(c.use==='compressed_o2'){const gain=Math.min(2,3-p.o2);p.o2+=gain;p.equipment.splice(ci,1);addLog(`${p.name} used Compressed O₂. +${gain} O₂.`,'good');}
  else if(c.use==='excavator'){p.equipment.splice(ci,1);closeCardModal();G.excavatorMode=true;addLog('Excavator: click an adjacent face-down tile to reveal it.','act');updateUI();render();return;}
  closeCardModal();updateUI();
}

function doActivateFrag(){
  const p=cp();if(p.radioFragments<=0)return;
  const t=G.tiles.get(hk(p.q,p.r));if(t?.name!=='Signal Array')return;
  if(G.radioFragmentsActivated>=5)return;
  p.radioFragments--;G.radioFragmentsActivated++;
  const thr=[null,18,16,14,12,10][G.radioFragmentsActivated];
  addLog(`Fragment activated. Array: ${G.radioFragmentsActivated}/5. Threshold: ${thr}+`,'frag');
  updateUI();render();
}

function doSignalRoll(){
  const p=cp();if(G.phase!=='action'&&G.phase!=='roll')return;
  const t=G.tiles.get(hk(p.q,p.r));if(t?.name!=='Signal Array')return;
  if(!G.radioFragmentsActivated)return;
  // Put 3 clickable dice on the table — resolution happens in finishSignalRoll()
  showTableDice('signal');
  document.getElementById('bsig').disabled=true;
}

function finishSignalRoll(d){
  const thr=[null,18,16,14,12,10][G.radioFragmentsActivated];
  const total=d[0]+d[1]+d[2];const success=total>=thr;
  const body=`Dice: ${d[0]}  ${d[1]}  ${d[2]}\nTotal: ${total}\nNeeded: ${thr} or higher\n\n${success?'SIGNAL RECEIVED.\nRescue craft entering orbit.':'No response. Signal insufficient.'}`;
  addLog(`Signal Roll: ${total} vs ${thr} — ${success?'SUCCESS':'FAIL'}`,success?'good':'crit');
  if(success){showModal('RESCUE SIGNAL RECEIVED',body,true,()=>{
    showModal('MISSION COMPLETE','Rescue confirmed.\n\nAll surviving crew whose goal is rescue have won.',true,()=>{});});}
  else showModal('Signal Roll',body,true,()=>{});
}

// ── BASE CAMP ACTIONS ──────────────────────────────────────────
function doMedBay(){
  const p=cp();if(G.phase!=='action')return;
  if(G.tiles.get(hk(p.q,p.r))?.name!=='Medical Bay')return;
  if(p.health>=3){addLog(`${p.name}: Health already full.`);return;}
  p.health=Math.min(3,p.health+1);
  addLog(`${p.name} treated at Medical Bay. Health: ${p.health}/3.`,'good');
  updateUI();
}
function doEquipLocker(){
  const p=cp();if(G.phase!=='action')return;
  if(G.tiles.get(hk(p.q,p.r))?.name!=='Equipment Locker')return;
  if(G.tileActionUsed){showModal('Already Used','You have already used a tile action this turn.',true,()=>{});return;}
  // Show equipment draw overlay
  document.getElementById('eqd-equpn').textContent=G.eqDeckCount;
  document.getElementById('eqd-desc').textContent=G.eqDeckCount>0?'Draw 1 card from the equipment deck.':'The equipment deck is empty.';
  const deck=document.getElementById('eqd-deck');
  deck.onclick=()=>{
    deck.onclick=null;
    document.getElementById('eqdov').classList.remove('show');
    document.getElementById('eqdov').style.display='none';
    const c=drawEqCard(p);
    G.tileActionUsed=true;
    if(c){
      addLog(`${p.name} drew ${c.name} from Equipment Locker.`,'good');
      // Show the drawn card immediately
      openCardModal(p.id,c);
    } else {
      addLog('Equipment Locker: deck empty.');
    }
    updateUI();
  };
  cancelTooltip();
  document.getElementById('eqdov').style.display='flex';
  document.getElementById('eqdov').classList.add('show');
}
function doCargo(){
  const p=cp();if(G.phase!=='action')return;
  if(G.tiles.get(hk(p.q,p.r))?.name!=='Cargo Hold')return;
  // Build communal store display
  const comm=G.cargoHold||0;
  showModal('Cargo Hold',
    `Communal Rations in hold: ${comm}\nYour Rations: ${p.rations}/10\n\nDeposit: move FULL Rations from your stack to the hold.\nWithdraw: take from the hold (up to your capacity).`,
    true,
    ()=>{renderCargoModal();},
    'Open Cargo',()=>{},'Cancel');
}
function renderCargoModal(){
  const p=cp();
  const hold=G.cargoHold||0;
  const cap=10-p.rations;// room on player
  const body=`Hold: ${hold} rations\nYours: ${p.rations}/10\n\nChoose action:`;
  const ma=document.getElementById('mact');
  document.getElementById('mtit').textContent='Cargo Hold';
  document.getElementById('mbod').textContent=body;
  ma.innerHTML='';
  // Deposit 1
  const d1=document.createElement('button');d1.className='btn';d1.textContent='Deposit 1';d1.disabled=p.rations<=0;
  d1.onclick=()=>{if(p.rations>0){p.rations--;G.cargoHold=(G.cargoHold||0)+1;addLog(`${p.name} deposited 1 Ration. Hold: ${G.cargoHold}.`);updateUI();}renderCargoModal();};
  // Withdraw 1
  const w1=document.createElement('button');w1.className='btn wrn';w1.textContent='Withdraw 1';w1.disabled=hold<=0||cap<=0;
  w1.onclick=()=>{if(hold>0&&cap>0){G.cargoHold--;p.rations++;addLog(`${p.name} withdrew 1 Ration. Hold: ${G.cargoHold}.`);updateUI();}renderCargoModal();};
  // Close
  const cl=document.createElement('button');cl.className='btn pri';cl.textContent='Done';
  cl.onclick=()=>document.getElementById('mov').classList.remove('show');
  ma.appendChild(d1);ma.appendChild(w1);ma.appendChild(cl);
  document.getElementById('mov').classList.add('show');
}
function doWatchTower(){
  const p=cp();if(G.phase!=='action')return;
  if(G.tiles.get(hk(p.q,p.r))?.name!=='Watch Tower')return;
  // Find all alive players in terrain (not on base camp)
  const inField=G.players.filter(x=>x.alive&&G.tiles.get(hk(x.q,x.r))?.type!=='crash_site');
  if(!inField.length){showModal('Watch Tower','No crew are currently in the field. There are no tiles to reveal.',true,()=>{});return;}
  // Reveal all face-down tiles adjacent to each field player
  let revealed=0;
  inField.forEach(fp=>{
    hnbr(fp.q,fp.r).forEach(([nq,nr])=>{
      const nt=G.tiles.get(hk(nq,nr));
      if(nt&&!nt.revealed){revealAt(nq,nr);revealed++;}
    });
  });
  const names=inField.map(x=>x.name).join(', ');
  addLog(`Watch Tower: ${revealed} tile${revealed!==1?'s':''} revealed around ${names}.`,'tile');
  render();updateUI();
}

function doEndTurn(){
  if(G.phase==='roll')return;
  const p=cp();const curTile=G.tiles.get(hk(p.q,p.r));const onBase=curTile?.type==='crash_site';
  if(p.rations>0)p.rations--;
  else{if(p.health>0)p.health--;addLog(`${p.name} is starving. Health: ${p.health}/3.`,'crit');}
  if(!onBase&&!p.skipO2){
    if(p.o2>0)p.o2--;
    else{if(p.health>0)p.health--;addLog(`${p.name} has no O₂. Health: ${p.health}/3.`,'crit');}
  }
  p.skipO2=false;
  if(p.health===0&&p.alive){p.incapacitated++;
    if(p.incapacitated>=2){p.alive=false;addLog(`${p.name} has DIED.`,'crit');}
    else addLog(`${p.name} is INCAPACITATED (${p.incapacitated}/2).`,'crit');}
  advanceTurn();
}

function advanceTurn(){
  const alive=G.players.filter(p=>p.alive);if(!alive.length){showModal('All Dead','All crew have perished.\nNobody wins.',true,()=>{});return;}
  let next=(G.currentPlayer+1)%G.players.length,tries=0;
  while(!G.players[next].alive&&tries++<G.players.length)next=(next+1)%G.players.length;
  if(next<=G.currentPlayer)G.turn++;
  G.currentPlayer=next;viewedPlayer=next;eqGalleryOffset=0;G.phase='roll';G.movementLeft=0;G.reach=new Map();G.tileActionUsed=false;G.excavatorMode=false;
  addLog(`Turn ${G.turn}: ${G.players[next].name}.`,'act');
  showTableDice('move');
  updateUI();render();
}

function triggerAnomaly(t){
  const p=cp();
  switch(t.anomaly){
    case'Temporal Rift':{
      const r=1+(0|Math.random()*6);
      if(r<=3){const lost=Math.min(p.rations,r);p.rations-=lost;addLog(`Temporal Rift: rolled ${r} — lost ${lost} Ration(s).`,'crit');}
      else{const gain=Math.min(10-p.rations,r);p.rations+=gain;addLog(`Temporal Rift: rolled ${r} — gained ${gain} Ration(s).`,'good');}
      updateUI();break;
    }
    case'Portal':
      showModal('Portal Anomaly','Use the portal to return to the Crash Site?',true,
        ()=>{p.q=0;p.r=0;p.location='Crash Site';G.movementLeft=0;G.phase='action';addLog(`${p.name} used Portal — returned to Crash Site.`);updateUI();render();},
        'Use Portal',()=>{addLog(`${p.name} declined the Portal.`);updateUI();},'Decline');
      break;
    case'Inversion Field':addLog('Inversion Field: swap Rations with another player. (Resolve at the table.)','act');updateUI();break;
    case'Gravitational Well':addLog('Gravitational Well: player to your left moves your pawn 1 die roll. (Resolve at the table.)','act');break;
    case'Dead Signal':addLog('Dead Signal: no Signal Roll occurs this round.');break;
    case'Echo Chamber':addLog('Echo Chamber: resolve the most recent Public Event again. (Resolve at the table.)','act');break;
    case'Stasis Pod':addLog('Stasis Pod: you may enter stasis — turn pawn sideways. (Resolve at the table.)','act');break;
    default:addLog(`Anomaly: ${t.anomaly}.`);
  }
}

// ═══════════════════════════════════════════════════════════════
// TRADE  (drag-and-drop UI)
// ═══════════════════════════════════════════════════════════════
let tradeState=null;

function openTrade(){
  const p=cp();if(G.phase!=='action')return;
  const here=G.players.filter(x=>x.alive&&x.id!==p.id&&x.q===p.q&&x.r===p.r);
  if(!here.length){addLog('No crew on this tile to trade with.');return;}
  let partner=here[0];
  if(here.length>1){
    // Show picker first — simple modal for now
    const names=here.map((x,i)=>`${i+1}. ${x.name}`).join('\n');
    showModal('Choose Trade Partner','Multiple crew on this tile:\n\n'+names+'\n\nTrading with: '+here[0].name+'\n(For multiple partners, cancel and retry.)',true,
      ()=>{initTradeModal(p,here[0]);});
    return;
  }
  initTradeModal(p,partner);
}

function initTradeModal(pA,pB){
  tradeState={pA,pB,stagedAtoB:new Set(),stagedBtoA:new Set(),aRat:0,bRat:0,aO2:0,bO2:0};
  renderTradeModal();
  document.getElementById('trademodal').classList.add('show');
}

function renderTradeModal(){
  if(!tradeState)return;
  const{pA,pB,stagedAtoB,stagedBtoA,aRat,bRat,aO2,bO2}=tradeState;
  const body=document.getElementById('trbody');
  body.innerHTML='';
  [pA,pB].forEach((p,side)=>{
    const isA=side===0;
    const staged=isA?stagedAtoB:stagedBtoA;
    const otherStaged=isA?stagedBtoA:stagedAtoB;
    const panel=document.createElement('div');panel.className='trpanel';
    // Portrait + name
    const nameRow=document.createElement('div');
    nameRow.innerHTML=`<div style="${portBg(p.portrait,36,44)}border:1px solid ${p.color};border-radius:2px;display:inline-block;vertical-align:middle;margin-right:8px"></div>
      <span class="trpname" style="color:${p.color}">${p.name}</span>`;
    nameRow.style.display='flex';nameRow.style.alignItems='center';nameRow.style.marginBottom='8px';
    panel.appendChild(nameRow);
    const infoDiv=document.createElement('div');
    infoDiv.className='trpinfo';
    infoDiv.textContent=`Rations: ${p.rations} · O₂: ${p.o2}`;
    panel.appendChild(infoDiv);
    // Equipment area label
    const eqLbl=document.createElement('div');
    eqLbl.style.cssText='font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-bottom:4px';
    eqLbl.textContent='Equipment';
    panel.appendChild(eqLbl);
    // Equipment drag area
    const eqArea=document.createElement('div');
    eqArea.className='treqarea';
    eqArea.dataset.side=side;
    eqArea.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='move';});
    eqArea.addEventListener('drop',e=>{
      e.preventDefault();
      const uid=parseInt(e.dataTransfer.getData('text/plain'));
      const fromSide=parseInt(e.dataTransfer.getData('from-side'));
      if(fromSide===side)return; // drop back = unstage
      const srcStaged=fromSide===0?tradeState.stagedAtoB:tradeState.stagedBtoA;
      srcStaged.add(uid);
      renderTradeModal();
    });
    // Own cards (not staged away)
    p.equipment.forEach(c=>{
      const isStaged=staged.has(c.uid);
      const card=document.createElement('div');
      card.className='treqcard'+(isStaged?' staged':'');
      card.draggable=true;
      card.innerHTML=`<div class="eqcat ${c.cat}" style="font-size:.4rem;padding:2px 3px">${c.cat}</div><div class="eqname" style="font-size:.48rem;padding:2px 3px">${c.name}</div>`;
      card.addEventListener('dragstart',e=>{
        e.dataTransfer.setData('text/plain',c.uid);
        e.dataTransfer.setData('from-side',side);
      });
      // Click to toggle stage
      card.addEventListener('click',()=>{
        if(staged.has(c.uid))staged.delete(c.uid);
        else staged.add(c.uid);
        renderTradeModal();
      });
      eqArea.appendChild(card);
    });
    // Show cards staged from other side incoming
    const incomingStaged=isA?stagedBtoA:stagedAtoB;
    const otherPlayer=isA?pB:pA;
    otherPlayer.equipment.filter(c=>incomingStaged.has(c.uid)).forEach(c=>{
      const card=document.createElement('div');
      card.className='treqcard';
      card.style.borderColor='#2a8060';card.style.background='rgba(30,80,60,.1)';
      card.innerHTML=`<div style="font-size:.38rem;padding:1px 3px;color:#4a9070">incoming</div><div class="eqcat ${c.cat}" style="font-size:.4rem;padding:2px 3px">${c.cat}</div><div class="eqname" style="font-size:.48rem;padding:2px 3px">${c.name}</div>`;
      eqArea.appendChild(card);
    });
    panel.appendChild(eqArea);
    // Resource controls
    const ratGive=isA?aRat:bRat;
    const o2Give=isA?aO2:bO2;
    const ratMax=p.rations;
    const o2Max=p.o2;
    const resDiv=document.createElement('div');
    resDiv.style.marginTop='10px';
    resDiv.innerHTML=`
      <div class="trresrow"><label>Give Rations</label>
        <button class="trbtn" onclick="trAdj('${isA?'aRat':'bRat'}',-1)">−</button>
        <span class="trcnt">${ratGive}</span>
        <button class="trbtn" onclick="trAdj('${isA?'aRat':'bRat'}',1)">+</button>
        <span style="font-size:.58rem;color:var(--dim)">/ ${ratMax}</span>
      </div>
      <div class="trresrow" style="margin-top:6px"><label>Give O₂</label>
        <button class="trbtn" onclick="trAdj('${isA?'aO2':'bO2'}',-1)">−</button>
        <span class="trcnt">${o2Give}</span>
        <button class="trbtn" onclick="trAdj('${isA?'aO2':'bO2'}',1)">+</button>
        <span style="font-size:.58rem;color:var(--dim)">/ ${o2Max}</span>
      </div>`;
    panel.appendChild(resDiv);
    body.appendChild(panel);
  });
}

function trAdj(field,delta){
  if(!tradeState)return;
  const{pA,pB}=tradeState;
  const maxMap={aRat:pA.rations,bRat:pB.rations,aO2:pA.o2,bO2:pB.o2};
  tradeState[field]=Math.max(0,Math.min(maxMap[field],tradeState[field]+delta));
  renderTradeModal();
}

function confirmTrade(){
  if(!tradeState)return;
  const{pA,pB,stagedAtoB,stagedBtoA,aRat,bRat,aO2,bO2}=tradeState;
  // Transfer equipment A→B
  stagedAtoB.forEach(uid=>{
    const ci=pA.equipment.findIndex(c=>c.uid===uid);
    if(ci>=0){pB.equipment.push(pA.equipment.splice(ci,1)[0]);}
  });
  // Transfer equipment B→A
  stagedBtoA.forEach(uid=>{
    const ci=pB.equipment.findIndex(c=>c.uid===uid);
    if(ci>=0){pA.equipment.push(pB.equipment.splice(ci,1)[0]);}
  });
  // Resources
  pA.rations=Math.max(0,Math.min(10,pA.rations-aRat+bRat));
  pB.rations=Math.max(0,Math.min(10,pB.rations-bRat+aRat));
  pA.o2=Math.max(0,Math.min(3,pA.o2-aO2+bO2));
  pB.o2=Math.max(0,Math.min(3,pB.o2-bO2+aO2));
  addLog(`Trade completed: ${pA.name} ↔ ${pB.name}.`,'good');
  closeTrade();
  updateUI();render();
}

function closeTrade(){
  tradeState=null;
  document.getElementById('trademodal').classList.remove('show');
}

// ═══════════════════════════════════════════════════════════════
// BOARD RENDERING
// ═══════════════════════════════════════════════════════════════
let pan={x:0,y:0},zoom=1;
let sbPan={x:0,y:0},sbZoom=1,sbEventsInit=false;
function svgEl(tag,attrs){const e=document.createElementNS(NS,tag);if(attrs)Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e;}

function render(){
  const svg=document.getElementById('bsvg');
  const W=svg.clientWidth||800,H=svg.clientHeight||600;
  svg.innerHTML='';
  const defs=svgEl('defs');
  ['terrain','anomaly','ship','crash','fd'].forEach(id=>{
    const gr=svgEl('radialGradient',{id:'gr-'+id,cx:'40%',cy:'35%',r:'65%'});
    const stops=GRAD_STOPS[id]||GRAD_STOPS.fd;
    stops.forEach(([off,col])=>{const s=svgEl('stop',{'offset':off,'stop-color':col});gr.appendChild(s);});
    defs.appendChild(gr);
  });
  svg.appendChild(defs);
  svg.appendChild(svgEl('rect',{x:0,y:0,width:W,height:H,fill:'#06080d'}));
  const g=svgEl('g',{transform:`translate(${W/2+pan.x} ${H/2+pan.y}) scale(${zoom})`});
  // Radial gradient mask: full opacity at origin (base camp), fades to nothing at edges
  const hgGrad=svgEl('radialGradient',{id:'hg-fade',gradientUnits:'userSpaceOnUse',cx:'0',cy:'0',r:'900'});
  hgGrad.appendChild(svgEl('stop',{offset:'0%','stop-color':'white','stop-opacity':'1'}));
  hgGrad.appendChild(svgEl('stop',{offset:'55%','stop-color':'white','stop-opacity':'0.5'}));
  hgGrad.appendChild(svgEl('stop',{offset:'100%','stop-color':'white','stop-opacity':'0'}));
  const hgMask=svgEl('mask',{id:'hg-mask'});
  hgMask.appendChild(svgEl('rect',{x:'-5000',y:'-5000',width:'10000',height:'10000',fill:'url(#hg-fade)'}));
  defs.appendChild(hgGrad);defs.appendChild(hgMask);
  // Hex grid texture: explicit path inside <g> so it pans/zooms with the board.
  // Drawn as a single path to avoid any SVG pattern clipping artifacts.
  {const GR=22,pd=[];
  for(let q=-GR;q<=GR;q++)for(let r=-GR;r<=GR;r++){
    const[cx,cy]=h2p(q,r);
    for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/6;
      pd.push(`${i===0?'M':'L'}${(cx+SZ*Math.cos(a)).toFixed(1)},${(cy+SZ*Math.sin(a)).toFixed(1)}`);}
    pd.push('Z');}
  g.appendChild(svgEl('path',{d:pd.join(' '),fill:'none',stroke:'rgba(255,255,255,0.06)','stroke-width':'0.7','pointer-events':'none',mask:'url(#hg-mask)'}));}
  svg.appendChild(g);
  for(const[,t]of G.tiles)drawTile(g,t);
  if((G.phase==='move'||G.phase==='action')&&G.movementLeft>0){
    for(const[k]of G.reach){const[q,r]=hparse(k);const[cx,cy]=h2p(q,r);
      g.appendChild(svgEl('polygon',{points:hexPts(cx,cy,SZ-4),fill:'rgba(20,70,120,.2)',stroke:'#205888','stroke-width':'1','pointer-events':'none'}));}}
  G.players.forEach(p=>{if(p.alive)drawPawn(g,p);});
}

const GRAD_STOPS={
  terrain:[['0%','#122014'],['100%','#06100a']],
  anomaly:[['0%','#1a0c28'],['100%','#080410']],
  ship:   [['0%','#0c1c2e'],['100%','#060e18']],
  crash:  [['0%','#0e1e30'],['100%','#06101e']],
  fd:     [['0%','#0c1420'],['100%','#060c14']],
};

function drawTile(g,t){
  const[cx,cy]=h2p(t.q,t.r);
  const hexPoly=hexPts(cx,cy,SZ-1);

  // Face-down tiles: dashed border + plus sign (matches site builder candidate style)
  if(t.type==='face_down'){
    g.appendChild(svgEl('polygon',{points:hexPoly,fill:'rgba(20,50,100,.15)','pointer-events':'none'}));
    const poly=svgEl('polygon',{points:hexPoly,fill:'transparent',stroke:'#2a70d0','stroke-width':'1.2','stroke-dasharray':'4.33 3.24','stroke-dashoffset':'5.95',style:'cursor:pointer','data-q':t.q,'data-r':t.r});
    poly.addEventListener('click',()=>onHexClick(t.q,t.r));
    poly.addEventListener('mouseenter',e=>startTooltip(t,e));
    poly.addEventListener('mouseleave',cancelTooltip);
    g.appendChild(poly);
    const plus=svgEl('text',{'x':cx,'y':cy+6,'text-anchor':'middle','font-family':'Courier New,monospace','font-size':'18','fill':'#2a70d0','opacity':'.6','pointer-events':'none'});
    plus.textContent='＋';
    g.appendChild(plus);
    return;
  }

  const strokeC=t.type==='anomaly'?'#6a28a8':t.type==='ship_section'?'#2060a8':t.type==='crash_site'?'#e07820':'#1a2e1a';
  const sw=t.type==='crash_site'?'2.2':'1.4';
  const tileImg=getTileImg(t);
  if(tileImg){
    // Clip path for this hex — added to SVG defs (in root coord space of g group)
    const clipId=`tc_${t.q}_${t.r}`;
    const svgDefs=document.getElementById('bsvg').querySelector('defs');
    if(!svgDefs.querySelector(`#${clipId}`)){
      const cp=svgEl('clipPath',{id:clipId});
      cp.appendChild(svgEl('polygon',{points:hexPoly}));
      svgDefs.appendChild(cp);
    }
    const hw=SZ*SQRT3,hh=SZ*2;
    g.appendChild(svgEl('image',{
      href:tileImg,
      x:cx-hw/2,y:cy-hh/2,
      width:hw,height:hh,
      'clip-path':`url(#${clipId})`,
      'pointer-events':'none',
      preserveAspectRatio:'xMidYMid slice',
    }));
    // Subtle dark vignette so labels and icons stay legible
    g.appendChild(svgEl('polygon',{points:hexPoly,fill:'rgba(0,0,0,.32)','pointer-events':'none'}));
  } else {
    const gradId=t.type==='crash_site'?'gr-crash':t.type==='anomaly'?'gr-anomaly':t.type==='ship_section'?'gr-ship':t.type==='face_down'?'gr-fd':'gr-terrain';
    g.appendChild(svgEl('polygon',{points:hexPoly,fill:`url(#${gradId})`,'pointer-events':'none'}));
  }

  // Hex border + event receiver (transparent fill, on top)
  const poly=svgEl('polygon',{points:hexPoly,fill:'transparent',stroke:strokeC,'stroke-width':sw,style:'cursor:pointer','data-q':t.q,'data-r':t.r});
  poly.addEventListener('click',()=>onHexClick(t.q,t.r));
  poly.addEventListener('mouseenter',e=>startTooltip(t,e));
  poly.addEventListener('mouseleave',cancelTooltip);
  g.appendChild(poly);

  if(!t.revealed)return;
  drawTileArtwork(g,cx,cy,t);
  drawTileLabel(g,cx,cy,t);
}



// Tile artwork uses individual images from img/Tiles/.
// Radio Fragment indicator drawn for Signal Tower tiles.
function drawTileArtwork(g,cx,cy,t){
  if(t.type==='terrain'&&t.radioFragment){
    const poi=t.pois?.[0];
    if(poi==='Signal Tower'){
      g.appendChild(svgEl('circle',{cx:cx+18,cy:cy-20,r:5,fill:'#1a4010',stroke:'#60c040','stroke-width':'1.2','pointer-events':'none'}));
      lbl(g,cx+18,cy-17,'RF','5.5','#60c040');
    }
  }
  if(t.type==='crash_site'&&t.name==='Signal Array'&&G?.radioFragmentsActivated){
    lbl(g,cx,cy+14,`${G.radioFragmentsActivated}/5`,'7','#60c040');
  }
}

function drawTileLabel(g,cx,cy,t){
  if(t.type==='crash_site'){
    lbl(g,cx,cy+26,t.short||t.name,'6','#2a6090','middle');
  } else if(t.type==='anomaly'){
    lbl(g,cx,cy+28,t.anomaly,'6','#5a1880','middle');
  } else if(t.type==='ship_section'){
    lbl(g,cx,cy+28,'SHIP SECTION','5.5','#204878','middle');
  } else if(t.type==='terrain'){
    const cnt=typeof t.investigatedCount==='number'?t.investigatedCount:0;
    if(cnt>0&&cnt>=t.pois.length)lbl(g,cx,cy+30,'· investigated ·','5','#1e3a2a','middle');
  }
}

function lbl(g,x,y,str,fs,fill,anchor){
  const e=svgEl('text',{x,y,'text-anchor':anchor||'middle','font-family':'monospace','font-size':fs,fill,'pointer-events':'none'});
  e.textContent=str;g.appendChild(e);}

function drawPawn(g,p){
  const[cx,cy]=h2p(p.q,p.r);
  const same=G.players.filter(x=>x.alive&&x.q===p.q&&x.r===p.r);
  const idx=same.indexOf(p);
  const ox=same.length>1?(idx-(same.length-1)/2)*14:0;
  const px=cx+ox,py=cy+15;
  if(p.id===G.currentPlayer)g.appendChild(svgEl('circle',{cx:px,cy:py,r:13,fill:'none',stroke:p.color,'stroke-width':'1.5',opacity:'.35','pointer-events':'none'}));
  const cid=`pc-${p.id}`;
  const defs=document.getElementById('bsvg').querySelector('defs');
  const cp2=svgEl('clipPath',{id:cid});
  cp2.appendChild(svgEl('circle',{cx:px,cy:py,r:11}));
  defs.appendChild(cp2);
  const imgEl=svgEl('image',{
    href:`img/Crew/${p.portrait}.png`,
    x:px-11, y:py-11,
    width:22, height:22,
    'clip-path':`url(#${cid})`,
    'pointer-events':'none',
    preserveAspectRatio:'xMidYMin slice',
  });
  g.appendChild(imgEl);
  g.appendChild(svgEl('circle',{cx:px,cy:py,r:11,fill:'none',stroke:p.color,'stroke-width':'1.8','pointer-events':'none'}));
}

function onHexClick(q,r){
  if(!G)return;
  if(G.excavatorMode){
    const p=cp();
    const t=G.tiles.get(hk(q,r));
    if(!t||t.revealed){addLog('Excavator: select a face-down tile.','act');return;}
    // Must be adjacent to current player
    const adj=hnbr(p.q,p.r).some(([aq,ar])=>aq===q&&ar===r);
    if(!adj){addLog('Excavator: tile must be adjacent to you.','act');return;}
    revealAt(q,r);
    G.excavatorMode=false;
    addLog(`${p.name} revealed a tile with the Excavator.`,'tile');
    // Show the reveal modal if it has POIs
    const nt=G.tiles.get(hk(q,r));
    if(nt&&(nt.type==='terrain'||nt.type==='ship_section')&&nt.pois?.length>0){
      nt.investigatedCount=nt.pois.length;
      updateUI();render();
      showTileRevealModal(nt);
    } else {
      updateUI();render();
    }
    return;
  }
  if(G.phase!=='move'&&G.phase!=='action')return;
  if(!G.movementLeft)return;
  const p=cp();if(q===p.q&&r===p.r)return;
  if(!G.reach.has(hk(q,r)))return;
  doMove(q,r);
}

// ═══════════════════════════════════════════════════════════════
// TOOLTIP  (1 second delay)
// ═══════════════════════════════════════════════════════════════
let tipTimer=null, tipMx=0, tipMy=0;
function anyOverlayActive(){
  return ['trov','eqdov','evc-ov','mov','trademodal'].some(id=>{
    const el=document.getElementById(id);
    return el&&(el.classList.contains('show')||el.style.display==='flex');
  });
}
function startTooltip(t,e){
  if(anyOverlayActive())return;
  tipMx=e.clientX;tipMy=e.clientY;
  clearTimeout(tipTimer);
  tipTimer=setTimeout(()=>{if(!anyOverlayActive())showHexTip(t);},1000);
  document.getElementById('bsvg').addEventListener('mousemove',trackMouse,{passive:true});
}
function trackMouse(e){tipMx=e.clientX;tipMy=e.clientY;}
function cancelTooltip(){clearTimeout(tipTimer);hideHexTip();}
function hideHexTip(){
  document.getElementById('htip').classList.remove('show');
  document.getElementById('bsvg').removeEventListener('mousemove',trackMouse);
}
function showHexTip(t){
  const tip=document.getElementById('htip');
  let key=t.name||t.anomaly||t.type;
  if(t.type==='ship_section')key='Ship Section';
  if(t.type==='face_down')key='face_down';
  const info=TILE_TIPS[key]||{desc:'Unknown terrain.',act:''};
  const title=t.name||(t.type==='anomaly'?t.anomaly:t.type==='ship_section'?'Ship Section':t.pois&&t.pois.length?t.pois.join(' · '):'Unknown');
  document.getElementById('tiptit').textContent=title.toUpperCase();
  document.getElementById('tipdesc').textContent=t.type==='face_down'?'Face-down tile. Enter to reveal what lies ahead.':info.desc;
  document.getElementById('tipact').textContent=t.type==='face_down'?'':info.act;
  // Hero image
  const heroEl=document.getElementById('tip-hero-img');
  const tImg=getTileImg(t);
  if(tImg){
    heroEl.style.backgroundImage=`url(${tImg})`;
    heroEl.style.backgroundSize='cover';
    heroEl.style.backgroundPosition='center';
    heroEl.textContent='';
  } else {
    heroEl.style.backgroundImage='none';
    heroEl.textContent='?';
  }
  // Position — follow mouse, flip if near edges
  const tw=460,th=130;
  let tx=tipMx+16,ty=tipMy-th/2;
  if(tx+tw>window.innerWidth-10)tx=tipMx-tw-16;
  if(ty<8)ty=8;
  if(ty+th>window.innerHeight-8)ty=window.innerHeight-th-8;
  tip.style.left=tx+'px';tip.style.top=ty+'px';
  tip.classList.add('show');
}

// ═══════════════════════════════════════════════════════════════
// HUD + UI UPDATE
// ═══════════════════════════════════════════════════════════════
function buildCrewTabs(){
  const tabs=document.getElementById('hctabs');tabs.innerHTML='';
  G.players.forEach(pl=>{
    const t=document.createElement('div');
    const isCurrent=pl.id===G.currentPlayer;
    const isViewing=pl.id===viewedPlayer;
    t.className='hctab'+(pl.alive?'':' dead');
    t.style.cssText=`background-image:url(img/Crew/${pl.portrait}.png);background-size:cover;background-position:center top;`+
      `border-color:${isCurrent?pl.color:isViewing?'rgba(255,255,255,.4)':'transparent'};`+
      `box-shadow:${isCurrent?`0 0 0 1px ${pl.color}`:'none'};`+
      `opacity:${pl.alive?1:.3};`;
    t.title=pl.name+(isCurrent?' · Active':'')+(!pl.alive?' · Dead':pl.incapacitated?' · Incap':'');
    if(pl.alive)t.onclick=()=>{viewedPlayer=pl.id;eqGalleryOffset=0;updateUI();};
    tabs.appendChild(t);
  });
}

function updateUI(){
  if(!G)return;
  const p=cp();                          // active player (actions)
  const v=G.players[viewedPlayer]||p;   // viewed player (card display)
  document.getElementById('hturn').textContent=`Turn ${G.turn} · ${p.name}`;
  const ph=document.getElementById('hphase');
  const PHM={roll:['Roll','ph-roll'],move:['Move','ph-move'],action:['Action','ph-act']};
  const[pt,pc]=PHM[G.phase]||['—',''];ph.textContent=pt;ph.className=`hphase ${pc}`;
  const frags=G.radioFragmentsActivated,THR=[null,18,16,14,12,10];
  document.getElementById('hsig').textContent=frags?`${frags}/5 fragments · threshold ${THR[frags]}+`:'0 fragments · signal offline';
  // Card shows viewed player
  document.getElementById('hcimg').style.cssText=`background-image:url(img/Crew/${v.portrait}.png);background-size:cover;background-position:center top;width:100%;height:100%;`;
  document.getElementById('hcname').textContent=v.name;
  document.getElementById('hcname').style.color=v.color;
  document.getElementById('hcloc').textContent=v.location;
  buildTokGrid('htr',v.rations,10,'rf','re',2,5);
  buildTokRow('hto',v.o2,3,'of','oe');
  buildTokRow('hth',v.health,3,'hf','he');
  const fragRow=document.getElementById('hud-frags');
  const fragEl=document.getElementById('htfrag');
  if(v.radioFragments>0){
    fragRow.style.display='';
    fragEl.innerHTML='';
    for(let i=0;i<v.radioFragments;i++){const s=document.createElement('span');s.className='frag-tok';s.textContent='◈';fragEl.appendChild(s);}
  } else {
    fragRow.style.display='none';
  }
  buildEqHand(v);
  buildCrewTabs();
  // Actions always tied to active player
  document.getElementById('bend').disabled=G.phase==='roll';
  const t=G.tiles.get(hk(p.q,p.r));
  const act=G.phase==='action';
  const atArr=t?.name==='Signal Array';
  const show=v=>v?'':'none';
  document.getElementById('bmed').style.display=   show(t?.name==='Medical Bay');
  document.getElementById('bequip').style.display=  show(t?.name==='Equipment Locker');
  document.getElementById('bcargo').style.display=  show(t?.name==='Cargo Hold');
  document.getElementById('bwatch').style.display=  show(t?.name==='Watch Tower');
  document.getElementById('bmed').disabled=   !(act&&t?.name==='Medical Bay'&&p.health<3);
  document.getElementById('bequip').disabled=  !(act&&t?.name==='Equipment Locker');
  document.getElementById('bcargo').disabled=  !(act&&t?.name==='Cargo Hold');
  document.getElementById('bwatch').disabled=  !(act&&t?.name==='Watch Tower');
  document.getElementById('bfrag').style.display= show(atArr);
  document.getElementById('bsig').style.display=  show(atArr);
  document.getElementById('bfrag').disabled=!(act&&atArr&&p.radioFragments>0&&G.radioFragmentsActivated<5);
  document.getElementById('bsig').disabled=!((act||G.phase==='roll')&&atArr&&G.radioFragmentsActivated>0);
  const hereOthers=G.players.filter(x=>x.alive&&x.id!==p.id&&x.q===p.q&&x.r===p.r);
  document.getElementById('btrd').disabled=!(act&&hereOthers.length>0);
  updateE7Prompt();
}

function buildTokGrid(id,full,total,fc,ec,rows,cols){
  const c=document.getElementById(id);c.innerHTML='';
  for(let i=0;i<total;i++){const s=document.createElement('span');s.className=`tok ${i<full?fc:ec}`;s.title=i<full?'Full':'Empty';c.appendChild(s);}
}
function buildTokRow(id,full,total,fc,ec){
  const c=document.getElementById(id);c.innerHTML='';
  for(let i=0;i<total;i++){const s=document.createElement('span');s.className=`tok ${i<full?fc:ec}`;c.appendChild(s);}
}
let eqGalleryOffset=0;
function eqNav(dir){
  const v=G.players[viewedPlayer]||cp();
  const total=v.equipment.length;
  eqGalleryOffset=Math.max(0,Math.min(Math.max(0,total-3),eqGalleryOffset+dir));
  buildEqHand(v);
}
function cardFaceHTML(cat,name,txt,brand='◆  ENDYMION 7  ◆'){
  return `<div class="eqcard-inner">
    <div class="eqcorners"><span>◆</span><span>◆</span></div>
    <div class="eqcat">${cat}</div>
    <div class="eqname">${name}</div>
    <div class="eqdivider"></div>
    <div class="eqtxt">${txt}</div>
    <div class="eqbrand">${brand}</div>
  </div>`;
}
function buildEqHand(p){
  const hand=document.getElementById('eqhand');hand.innerHTML='';
  const all=p.equipment;
  const max=Math.max(0,all.length-3);
  if(eqGalleryOffset>max)eqGalleryOffset=max;
  for(let i=0;i<3;i++){
    const c=all[eqGalleryOffset+i];
    const d=document.createElement('div');
    if(!c){d.className='eqcard empty';hand.appendChild(d);continue;}
    d.className=`eqcard cc-${c.cat}`;
    d.dataset.uid=c.uid;
    if(c.uid===selectedCardUid)d.classList.add('selected');
    d.innerHTML=cardFaceHTML(c.cat,c.name,c.txt);
    d.onclick=()=>openCardModal(p.id,c);
    hand.appendChild(d);
  }
  const showNav=all.length>=4;
  const prevBtn=document.getElementById('eq-prev');
  const nextBtn=document.getElementById('eq-next');
  prevBtn.style.display=showNav?'':'none';
  nextBtn.style.display=showNav?'':'none';
  if(showNav){prevBtn.disabled=eqGalleryOffset<=0;nextBtn.disabled=eqGalleryOffset+3>=all.length;}
}

// ═══════════════════════════════════════════════════════════════
// CARD DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
let selectedCardUid=null;
function openCardModal(playerIdx,c){
  const isOwner=playerIdx===G.currentPlayer;
  // set category CSS vars on the overlay card
  const card=document.getElementById('evc');
  document.getElementById('evc-ov').className=`cc-${c.cat}`;
  card.className='evc eq';
  document.getElementById('evc-badge').textContent=c.cat.toUpperCase();
  document.getElementById('evc-loc').textContent=c.name;
  document.getElementById('evc-body').textContent=c.txt;
  const pills=document.getElementById('evc-pills');pills.innerHTML='';
  if(c.use&&isOwner){
    const b=document.createElement('button');
    b.className='btn wrn';b.textContent='Use Card';
    b.onclick=()=>useCard(playerIdx,c.uid);
    pills.appendChild(b);
  }
  document.getElementById('evc-die').style.display='none';
  document.getElementById('evc-outcome').style.display='none';
  const btn=document.getElementById('evc-btn');
  btn.className='eq';btn.textContent='Close';
  btn.disabled=false;btn.style.opacity='';
  btn.onclick=()=>closeCardModal();
  selectedCardUid=c.uid;
  document.getElementById('evc-ov').classList.add('show');
}
function closeCardModal(){
  selectedCardUid=null;
  const ov=document.getElementById('evc-ov');
  ov.className='';
  ov.classList.remove('show');
}

// ═══════════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════════
function showModal(title,body,isPub,onOk,okLbl,onCancel,cancelLbl,extraHtml){
  document.getElementById('mtit').textContent=title;
  const mb=document.getElementById('mbod');mb.innerHTML='';
  if(!isPub){const n=document.createElement('div');n.className='pvnote';n.textContent='PRIVATE — read silently. Show only to crew on your tile.';mb.appendChild(n);}
  if(extraHtml){const xh=document.createElement('div');xh.innerHTML=extraHtml;mb.appendChild(xh);}
  const tb=document.createElement('div');tb.textContent=body;mb.appendChild(tb);
  const ma=document.getElementById('mact');ma.innerHTML='';
  if(onCancel&&cancelLbl){const b=document.createElement('button');b.className='btn';b.textContent=cancelLbl;
    b.onclick=()=>{document.getElementById('mov').classList.remove('show');onCancel();};ma.appendChild(b);}
  const ob=document.createElement('button');ob.className='btn pri';ob.textContent=okLbl||'OK';
  ob.onclick=()=>{document.getElementById('mov').classList.remove('show');onOk();};ma.appendChild(ob);
  document.getElementById('mov').classList.add('show');
}

// ═══════════════════════════════════════════════════════════════
// EVENT CARD
// ═══════════════════════════════════════════════════════════════
function showEventCard(evt, locName, onOk, rollCallback){
  const isPub=evt.pub;
  const card=document.getElementById('evc');
  card.className='evc '+(isPub?'pub':'priv');
  document.getElementById('evc-badge').textContent=isPub?'PUBLIC EVENT':'\u2697  PRIVATE EVENT';
  document.getElementById('evc-loc').textContent=locName||'';
  document.getElementById('evc-body').textContent=evt.text;
  const pills=document.getElementById('evc-pills');pills.innerHTML='';
  function addPill(txt,cls){const p=document.createElement('div');p.className='evc-pill '+cls;p.textContent=txt;pills.appendChild(p);}
  if(evt.rf)           addPill('+ Radio Fragment','good');
  if(evt.drawEq)       addPill('+ Equipment Card','good');
  if(evt.rollRations)  addPill('Roll for Rations','good');
  if(evt.rollWreckage) addPill('Roll: Wreckage','good');
  if(evt.loseRation)   addPill('\u2212 '+evt.loseRation+' Ration','bad');
  if(evt.skipO2)       addPill('O\u2082 Spared','good');
  const outEl=document.getElementById('evc-outcome');
  outEl.style.display='none';
  const dieEl=document.getElementById('evc-die');
  const btn=document.getElementById('evc-btn');
  btn.className=isPub?'pub':'priv';
  btn.textContent='Acknowledge';
  if(rollCallback){
    dieEl.innerHTML='';
    dieEl.style.display='flex';
    const wrap=make3DDie('idle');
    dieEl.appendChild(wrap);
    btn.disabled=true;
    btn.style.opacity='.35';
    wrap.onclick=()=>{
      wrap.className='td-die-wrap rolling';
      wrap.onclick=null;
      const finalVal=1+(0|Math.random()*6);
      setTimeout(()=>{
        dieEl.innerHTML='';
        const result=document.createElement('div');
        result.className='evc-die-result';
        result.appendChild(makeResultDie(finalVal));
        dieEl.appendChild(result);
        const outcome=rollCallback(finalVal);
        if(outcome){outEl.textContent=outcome;outEl.style.display='';}
        updateUI();
        btn.disabled=false;
        btn.style.opacity='';
      },1500);
    };
  } else {
    dieEl.style.display='none';
    btn.disabled=false;
    btn.style.opacity='';
  }
  const ov=document.getElementById('evc-ov');
  ov.className='';
  btn.onclick=()=>{ov.classList.remove('show');onOk();};
  cancelTooltip();
  ov.classList.add('show');
}

// ═══════════════════════════════════════════════════════════════
// ENDYMION 7 — SHIP COMPUTER
// ═══════════════════════════════════════════════════════════════
function e7Scroll(){
  const p=document.getElementById('e7panel');
  if(p?.classList.contains('show')){const l=document.getElementById('e7log');l.scrollTop=l.scrollHeight;}
}
// Type text character-by-character into an existing element
function e7Type(el,msg,charDelay=15){
  el.textContent='';
  for(let i=0;i<msg.length;i++)setTimeout(()=>{el.textContent=msg.slice(0,i+1);e7Scroll();},i*charDelay);
}
// Ship computer voice message
function addE7(msg,type='',charDelay=15){
  const l=document.getElementById('e7log');
  const d=document.createElement('div');
  d.className='e7m'+(type?' '+type:'');l.appendChild(d);e7Scroll();
  e7Type(d,msg,charDelay);
}
// Horizontal divider in the E7 log
function addE7Div(){
  const l=document.getElementById('e7log');
  const d=document.createElement('div');d.className='e7div';l.appendChild(d);e7Scroll();
}
// Standard game-event log entry (now lives inside the E7 panel)
function addLog(msg,cls,charDelay=15){
  const l=document.getElementById('e7log');
  const d=document.createElement('div');
  d.className='le'+(cls?' '+cls:'');l.appendChild(d);e7Scroll();
  e7Type(d,msg,charDelay);
}
// Prompt bar — updated on every updateUI call
function updateE7Prompt(){
  const el=document.getElementById('e7prompt');if(!el)return;
  if(!G){el.textContent='';el.className='';return;}
  const p=cp();let text='',warn=false;
  if(p.o2<=1){text=`⚠ ${p.name}'s oxygen is critical — return to the Airlock.`;warn=true;}
  else if(G.phase==='roll')text=`${p.name}: roll the die to move.`;
  else if(G.phase==='move')text=`${G.movementLeft} step${G.movementLeft!==1?'s':''} remaining — choose a hex.`;
  else if(G.phase==='action'){text=`At ${p.location}. Take an action or end your turn.`;}
  el.textContent=text;el.className=warn?'warn':'';
}

// ═══════════════════════════════════════════════════════════════
// RULEBOOK — loaded from docs/FieldGuide.md
// ═══════════════════════════════════════════════════════════════
let RULEBOOK_SECTIONS=[];

function parseFieldGuide(md){
  var sections=[];
  var cur=null;
  var lines=md.split('\n');
  for(var i=0;i<lines.length;i++){
    var line=lines[i];
    var h1=line.match(/^# (.+)/);
    if(h1){
      if(cur)sections.push({id:cur.id,h:cur.h,title:cur.title,body:cur.body.trim()});
      var title=h1[1].trim();
      var id=title.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
      cur={id:id,h:1,title:title,body:''};
    } else if(cur){
      cur.body+=line+'\n';
    }
  }
  if(cur)sections.push({id:cur.id,h:cur.h,title:cur.title,body:cur.body.trim()});
  return sections.filter(function(s){return s.body.length>0;});
}

fetch('docs/FieldGuide.md')
  .then(r=>r.text())
  .then(md=>{RULEBOOK_SECTIONS=parseFieldGuide(md);})
  .catch(()=>{RULEBOOK_SECTIONS=[{id:'error',h:1,title:'Field Guide',body:'Could not load docs/FieldGuide.md.'}];});


function toggleE7(){
  const p=document.getElementById('e7panel');
  p.classList.toggle('show');
  if(p.classList.contains('show')){e7Scroll();updateE7Prompt();}
}
// Write a timed narrative into the floating E7 panel (#e7log)
// steps: [[gapMs, type, msg], ...] — gapMs is pause after previous entry finishes typing
// type: 'sys'|''|'div'|'log'|'log-imp'   charDelay: ms per character
function e7Seq(steps,charDelay=15){
  let t=0;
  steps.forEach(([gap,type,msg])=>{
    t+=gap;
    if(type==='div'){
      const at=t;setTimeout(()=>addE7Div(),at);
    } else {
      const at=t;
      setTimeout(()=>{
        if(type==='sys')addE7(msg,'sys',charDelay);
        else if(type==='log-imp')addLog(msg,'imp',charDelay);
        else if(type==='log-act')addLog(msg,'act',charDelay);
        else if(type==='log')addLog(msg,'',charDelay);
        else addE7(msg,'',charDelay);
      },at);
      t+=msg.length*charDelay;
    }
  });
}
// Write a timed narrative into an inline setup-screen terminal (typewriter effect)
// steps: [[gapMs, type, msg], ...] — gapMs is delay after previous element finishes
// type: 'sys'|''|'div'   charDelay: ms between characters
function e7ScreenSeq(containerId,steps,charDelay=20){
  const container=document.getElementById(containerId);
  if(!container)return;
  let t=0;
  steps.forEach(([gap,type,msg])=>{
    t+=gap;
    if(type==='div'){
      const at=t;
      setTimeout(()=>{
        const d=document.createElement('div');d.className='e7div';container.appendChild(d);
        container.scrollTop=container.scrollHeight;
      },at);
    } else {
      const at=t;
      setTimeout(()=>{
        const d=document.createElement('div');
        d.className='e7m'+(type?' '+type:'');
        d.textContent='';
        container.appendChild(d);
        for(let i=0;i<msg.length;i++){
          setTimeout(()=>{d.textContent=msg.slice(0,i+1);container.scrollTop=container.scrollHeight;},i*charDelay);
        }
      },at);
      t+=msg.length*charDelay;
    }
  });
}
// E7 panel stays open until explicitly closed via the ✕ button or E7 toggle

function openRulebook(){
  const modal=document.getElementById('rbmodal');
  modal.classList.add('show');
  buildRulebookToc();
  renderRulebookSection(RULEBOOK_SECTIONS[0]);
}
function closeRulebook(){document.getElementById('rbmodal').classList.remove('show');}

function buildRulebookToc(){
  const toc=document.getElementById('rbtoc');toc.innerHTML='';
  RULEBOOK_SECTIONS.forEach(s=>{
    const a=document.createElement('a');a.href='#';a.className=`rbti h${s.h}`;
    a.textContent=s.title;a.dataset.id=s.id;
    a.onclick=e=>{e.preventDefault();renderRulebookSection(s);rbSearch('');};
    toc.appendChild(a);
  });
}

function renderRulebookSection(s){
  document.querySelectorAll('.rbti').forEach(a=>a.classList.toggle('active',a.dataset.id===s.id));
  const c=document.getElementById('rbcontent');
  c.innerHTML=`<h1>${s.title}</h1>${markdownToHtml(s.body)}`;
  c.scrollTop=0;
}

function markdownToHtml(md){
  if(typeof marked!=='undefined')return marked.parse(md);
  return '<p>'+md.replace(/\n\n/g,'</p><p>')+'</p>';
}

function rbSearch(query){
  const q=query.trim().toLowerCase();
  if(!q){renderRulebookSection(RULEBOOK_SECTIONS.find(s=>document.querySelector('.rbti.active')?.dataset?.id===s.id)||RULEBOOK_SECTIONS[0]);return;}
  const results=[];
  RULEBOOK_SECTIONS.forEach(s=>{
    if(s.title.toLowerCase().includes(q)||s.body.toLowerCase().includes(q))results.push(s);
  });
  const c=document.getElementById('rbcontent');
  if(!results.length){c.innerHTML='<p style="color:var(--dim)">No results found.</p>';return;}
  const re=new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  c.innerHTML=results.map(s=>`<h2>${s.title}</h2>${markdownToHtml(s.body)}`).join('<hr style="border:none;border-top:1px solid var(--bdr);margin:20px 0">');
  c.querySelectorAll('td,th,p,li,blockquote').forEach(el=>{
    if(el.textContent.toLowerCase().includes(q))el.innerHTML=el.innerHTML.replace(re,'<span class="hl">$1</span>');
  });
}

// ═══════════════════════════════════════════════════════════════
// PAN / ZOOM / INTERACTION
// ═══════════════════════════════════════════════════════════════
function initBoard(){
  const wrap=document.getElementById('bwrap'),svg=document.getElementById('bsvg');
  let dragging=false,df=null;
  wrap.addEventListener('mousedown',e=>{if(e.button!==2)return;e.preventDefault();dragging=true;df={x:e.clientX,y:e.clientY};svg.classList.add('drag');});
  wrap.addEventListener('contextmenu',e=>{e.preventDefault();});
  document.addEventListener('mousemove',e=>{if(!dragging||!df)return;pan.x+=e.clientX-df.x;pan.y+=e.clientY-df.y;df={x:e.clientX,y:e.clientY};render();});
  document.addEventListener('mouseup',e=>{if(e.button!==2)return;dragging=false;df=null;svg.classList.remove('drag');});
  wrap.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.3,Math.min(3,zoom*(e.deltaY>0?.88:1.13)));render();},{passive:false});
  let lt=null;
  wrap.addEventListener('touchstart',e=>{if(e.touches.length===1)lt={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  wrap.addEventListener('touchmove',e=>{if(e.touches.length===1&&lt){pan.x+=e.touches[0].clientX-lt.x;pan.y+=e.touches[0].clientY-lt.y;lt={x:e.touches[0].clientX,y:e.touches[0].clientY};render();}},{passive:true});
  wrap.addEventListener('touchend',()=>{lt=null;});
  svg.addEventListener('touchend',e=>{
    if(e.changedTouches.length!==1)return;const T=e.changedTouches[0],rect=svg.getBoundingClientRect();
    const W=svg.clientWidth,H=svg.clientHeight;
    const lx=(T.clientX-rect.left-W/2-pan.x)/zoom,ly=(T.clientY-rect.top-H/2-pan.y)/zoom;
    const[q,r]=p2h(lx,ly);onHexClick(q,r);
  });
}

// ═══════════════════════════════════════════════════════════════
// CRASH SITE BUILDER
// ═══════════════════════════════════════════════════════════════
const BUILDER_PALETTE=[
  {name:'Medical Bay',     short:'MED',  desc:'Action: Restore 1 Health token to HEALTHY.'},
  {name:'Signal Array',    short:'SIG',  desc:'Action: Activate fragments & roll for rescue.'},
  {name:'Equipment Locker',short:'EQUIP',desc:'Action: Draw 1 Equipment card.'},
  {name:'Cargo Hold',      short:'CARGO',desc:'Action: Deposit or withdraw Rations freely.'},
  {name:'Watch Tower',     short:'WATCH',desc:'Action: Reveal tiles adjacent to any frontier player.'},
  {name:'Airlock',         short:'AIR',  desc:'On entry from terrain: refill 1 O₂ Tank.'},
];

let builderState=null;

function initBuilder(){
  builderState={
    placed:new Map([[hk(0,0),{q:0,r:0,name:'Crash Site',short:'CRASH'}]]),
    palette:[...BUILDER_PALETTE.map((p,i)=>({...p,idx:i,placed:false}))],
    selectedIdx:-1
  };
  sbPan={x:0,y:0};sbZoom=Math.min(4,window.innerHeight/(SZB*8));
  if(!sbEventsInit){
    sbEventsInit=true;
    const wrap=document.getElementById('sbsvg-wrap');
    let sbDragging=false,sbDf=null;
    wrap.addEventListener('mousedown',e=>{if(e.button!==2)return;e.preventDefault();sbDragging=true;sbDf={x:e.clientX,y:e.clientY};wrap.style.cursor='grabbing';});
    wrap.addEventListener('contextmenu',e=>e.preventDefault());
    document.addEventListener('mousemove',e=>{if(!sbDragging||!sbDf)return;sbPan.x+=e.clientX-sbDf.x;sbPan.y+=e.clientY-sbDf.y;sbDf={x:e.clientX,y:e.clientY};renderSiteBuilder();});
    document.addEventListener('mouseup',e=>{if(e.button!==2)return;sbDragging=false;sbDf=null;wrap.style.cursor='';});
    wrap.addEventListener('wheel',e=>{e.preventDefault();sbZoom=Math.max(.3,Math.min(4,sbZoom*(e.deltaY>0?.88:1.13)));renderSiteBuilder();},{passive:false});
  }
  renderPalette();
  renderSiteBuilder();
}

function isValidBuilderPos(q,r){
  const k=hk(q,r);
  if(builderState.placed.has(k))return false;
  // Must be adjacent to at least one placed tile
  for(const[dq,dr]of DIRS){
    if(builderState.placed.has(hk(q+dq,r+dr)))return true;
  }
  return false;
}

function selectBuilderTile(idx){
  const item=builderState.palette[idx];
  if(item.placed)return;
  builderState.selectedIdx=(builderState.selectedIdx===idx?-1:idx);
  renderPalette();
  renderSiteBuilder();
}

function placeBuilderTile(q,r){
  if(builderState.selectedIdx<0)return;
  if(!isValidBuilderPos(q,r))return;
  const item=builderState.palette[builderState.selectedIdx];
  if(item.placed)return;
  builderState.placed.set(hk(q,r),{q,r,name:item.name,short:item.short});
  item.placed=true;
  builderState.selectedIdx=-1;
  renderPalette();
  renderSiteBuilder();
  updateBuilderProgress();
}

function updateBuilderProgress(){
  const placed=builderState.palette.filter(p=>p.placed).length;
  document.getElementById('sbprogress').textContent=`${placed} / 6 placed`;
  const btn=document.getElementById('sblaunbtn');
  btn.disabled=placed<6;
}

function resetBuilder(){
  initBuilder();
  updateBuilderProgress();
}

function randomBuilder(){
  initBuilder();
  // Shuffle palette
  const pal=[...builderState.palette];
  for(let i=pal.length-1;i>0;i--){const j=0|Math.random()*(i+1);[pal[i],pal[j]]=[pal[j],pal[i]];}
  // Place each tile on a random valid adjacent hex
  for(const item of pal){
    const valid=[];
    for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++){if(isValidBuilderPos(q,r))valid.push([q,r]);}
    if(!valid.length)break;
    const[q,r]=valid[0|Math.random()*valid.length];
    builderState.placed.set(hk(q,r),{q,r,name:item.name,short:item.short});
    item.placed=true;
  }
  builderState.selectedIdx=-1;
  renderPalette();
  renderSiteBuilder();
  updateBuilderProgress();
}

function renderPalette(){
  const pal=document.getElementById('sbpalette');
  pal.innerHTML='<div class="sbpaltit">Crash Site Tiles</div>';
  builderState.palette.forEach((item,i)=>{
    const card=document.createElement('div');
    const isSelected=builderState.selectedIdx===i;
    card.className='sbpalcard'+(item.placed?' placed':isSelected?' selected':'');
    const th=spriteCssForName(item.name,32,36);
    card.innerHTML=`<div style="display:flex;align-items:center;gap:9px"><div style="width:32px;height:36px;flex-shrink:0;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);${th}"></div><div><div class="sbpalname">${item.name}</div><div class="sbpaldesc">${item.desc}</div></div></div>`;
    if(!item.placed)card.onclick=()=>selectBuilderTile(i);
    pal.appendChild(card);
  });
}

function renderSiteBuilder(){
  const svg=document.getElementById('sbsvg');
  svg.innerHTML='';
  const ns=NS;
  const W=svg.clientWidth||640,H=svg.clientHeight||640;
  const defs=document.createElementNS(ns,'defs');svg.appendChild(defs);
  // Hex grid fade mask (same as game board)
  const hgGrad=document.createElementNS(ns,'radialGradient');
  hgGrad.setAttribute('id','sb-hg-fade');hgGrad.setAttribute('gradientUnits','userSpaceOnUse');
  hgGrad.setAttribute('cx','0');hgGrad.setAttribute('cy','0');hgGrad.setAttribute('r','900');
  ['0%,1','55%,0.5','100%,0'].forEach(s=>{const[off,op]=s.split(',');const st=document.createElementNS(ns,'stop');st.setAttribute('offset',off);st.setAttribute('stop-color','white');st.setAttribute('stop-opacity',op);hgGrad.appendChild(st);});
  const hgMask=document.createElementNS(ns,'mask');hgMask.setAttribute('id','sb-hg-mask');
  const hgMaskRect=document.createElementNS(ns,'rect');hgMaskRect.setAttribute('x','-5000');hgMaskRect.setAttribute('y','-5000');hgMaskRect.setAttribute('width','10000');hgMaskRect.setAttribute('height','10000');hgMaskRect.setAttribute('fill','url(#sb-hg-fade)');
  hgMask.appendChild(hgMaskRect);defs.appendChild(hgGrad);defs.appendChild(hgMask);
  svg.appendChild(svgEl('rect',{x:0,y:0,width:W,height:H,fill:'#06080d'}));
  const g=document.createElementNS(ns,'g');
  g.setAttribute('transform',`translate(${W/2+sbPan.x} ${H/2+sbPan.y}) scale(${sbZoom})`);
  svg.appendChild(g);
  // Hex grid texture (same style as game board, using builder hex size)
  {const GR=22,pd=[];
  for(let q=-GR;q<=GR;q++)for(let r=-GR;r<=GR;r++){
    const[cx,cy]=h2pb(q,r);
    for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/6;
      pd.push(`${i===0?'M':'L'}${(cx+SZB*Math.cos(a)).toFixed(1)},${(cy+SZB*Math.sin(a)).toFixed(1)}`);}
    pd.push('Z');}
  const gridPath=document.createElementNS(ns,'path');
  gridPath.setAttribute('d',pd.join(' '));gridPath.setAttribute('fill','none');
  gridPath.setAttribute('stroke','rgba(255,255,255,0.06)');gridPath.setAttribute('stroke-width','0.7');
  gridPath.setAttribute('pointer-events','none');gridPath.setAttribute('mask','url(#sb-hg-mask)');
  g.appendChild(gridPath);}
  // Draw placed tiles
  builderState.placed.forEach((info)=>{
    const[cx,cy]=h2pb(info.q,info.r);
    const pts=hexPtsB(cx,cy,SZB-2);
    const bFile=TILE_IMAGE_MAP[info.name];
    if(bFile){
      const clipId='bc_'+info.q+'_'+info.r;
      const cp=document.createElementNS(ns,'clipPath');cp.setAttribute('id',clipId);
      const cpPoly=document.createElementNS(ns,'polygon');cpPoly.setAttribute('points',pts);
      cp.appendChild(cpPoly);defs.appendChild(cp);
      const hw=SZB*SQRT3,hh=SZB*2;
      const img=document.createElementNS(ns,'image');
      img.setAttribute('href',`img/Tiles/${bFile}`);
      img.setAttribute('x',cx-hw/2);img.setAttribute('y',cy-hh/2);
      img.setAttribute('width',hw);img.setAttribute('height',hh);
      img.setAttribute('preserveAspectRatio','xMidYMid slice');
      img.setAttribute('clip-path','url(#'+clipId+')');img.setAttribute('pointer-events','none');
      g.appendChild(img);
      const vig=document.createElementNS(ns,'polygon');
      vig.setAttribute('points',pts);vig.setAttribute('fill','rgba(0,0,0,.38)');vig.setAttribute('pointer-events','none');
      g.appendChild(vig);
    } else {
      const poly=document.createElementNS(ns,'polygon');
      poly.setAttribute('points',pts);poly.setAttribute('fill','#0e1e30');poly.setAttribute('pointer-events','none');
      g.appendChild(poly);
    }
    const border=document.createElementNS(ns,'polygon');
    border.setAttribute('points',pts);border.setAttribute('fill','transparent');
    border.setAttribute('stroke','#2a5a90');border.setAttribute('stroke-width','1.5');border.setAttribute('pointer-events','none');
    g.appendChild(border);
    const txt=document.createElementNS(ns,'text');
    txt.setAttribute('x',cx);txt.setAttribute('y',cy+4);
    txt.setAttribute('text-anchor','middle');txt.setAttribute('font-family','Courier New,monospace');
    txt.setAttribute('font-size','7');txt.setAttribute('fill','#c8dde8');txt.setAttribute('pointer-events','none');
    txt.textContent=info.short||info.name;
    g.appendChild(txt);
  });
  // Draw valid placement hexes
  if(builderState.selectedIdx>=0){
    // Compute all adjacent to placed, not yet placed
    const candidates=new Set();
    builderState.placed.forEach((_,k)=>{
      const[q,r]=k.split(',').map(Number);
      for(const[dq,dr]of DIRS){
        const nk=hk(q+dq,r+dr);
        if(!builderState.placed.has(nk))candidates.add(nk);
      }
    });
    candidates.forEach(k=>{
      const[q,r]=k.split(',').map(Number);
      const[cx,cy]=h2pb(q,r);
      const poly=document.createElementNS(ns,'polygon');
      const pts=hexPtsB(cx,cy,SZB-2);
      poly.setAttribute('points',pts);
      poly.setAttribute('fill','rgba(30,80,160,.1)');
      poly.setAttribute('stroke','#2a70d0');
      poly.setAttribute('stroke-width','1.2');
      poly.setAttribute('stroke-dasharray','3.81 2.86');
      poly.setAttribute('stroke-dashoffset','5.24');
      poly.setAttribute('cursor','pointer');
      poly.addEventListener('click',()=>placeBuilderTile(q,r));
      g.appendChild(poly);
      const plus=document.createElementNS(ns,'text');
      plus.setAttribute('x',cx);plus.setAttribute('y',cy+5);
      plus.setAttribute('text-anchor','middle');plus.setAttribute('font-family','Courier New,monospace');
      plus.setAttribute('font-size','16');plus.setAttribute('fill','#2a70d0');plus.setAttribute('opacity','.7');
      plus.setAttribute('pointer-events','none');
      plus.textContent='＋';
      g.appendChild(plus);
    });
  }
}

function hexPtsB(cx,cy,sz){
  sz=sz||SZB-2;let s='';
  for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/6;s+=`${(cx+sz*Math.cos(a)).toFixed(1)},${(cy+sz*Math.sin(a)).toFixed(1)} `;}return s.trim();
}

function finalizeGame(){
  // Convert builder placed map into crash site tiles
  const placedMap=new Map();
  builderState.placed.forEach((info,k)=>{
    placedMap.set(k,{...info,type:'crash_site',revealed:true});
  });
  document.getElementById('setup-site').classList.remove('show');
  document.getElementById('setup-site').style.display='none';
  document.getElementById('game').className='running';
  newGame(pendingNames,pendingPortraits,placedMap);
  setTimeout(()=>{
    initBoard();render();updateUI();
    showTableDice('move');
    // Open E7 panel and seed with mission controls + game log
    document.getElementById('e7panel').classList.add('show');
    const crew=pendingNames;
    e7Seq([
      [0,   'sys', '> MISSION CONTROLS'],
      [0,   'div', null],
      [0,   '',    'Left-click — Interact'],
      [0,   '',    'Right-click — Pan'],
      [0,   '',    'Scroll wheel — Zoom'],
      [0,   'div', null],
      [0,   '',    'Explore the planet to recover radio fragments. Your food and oxygen dwindle each round. Find caches or return to the base to heal.'],
      [0,   'div', null],
      [0,   'log-act', `Mission initialized. ${crew.length} crew active.`],
      [0,   'log-act', `Turn 1: ${crew[0]}. Roll for movement.`],
    ]);
    updateE7Prompt();
  },40);
}

// ═══════════════════════════════════════════════════════════════
// SETUP SCREEN
// ═══════════════════════════════════════════════════════════════
let setupN=2;
let setupPortraits=CREW_PORTRAITS.map((_,i)=>i); // one index per slot

function buildSetup(){
  const row=document.getElementById('crow');row.innerHTML='';
  for(let i=1;i<=6;i++){const b=document.createElement('button');b.className='cbtn'+(i===setupN?' sel':'');b.textContent=i;b.onclick=()=>{setupN=i;buildSetup();};row.appendChild(b);}
  const nl=document.getElementById('plist');const prev=[...nl.querySelectorAll('input')].map(x=>x.value);nl.innerHTML='';
  for(let i=0;i<setupN;i++){
    const pi=setupPortraits[i]??i%CREW_PORTRAITS.length;
    setupPortraits[i]=pi;
    const pname=CREW_PORTRAITS[pi].name;
    const d=document.createElement('div');d.className='prow';
    d.innerHTML=`<div class="ppick">
      <button class="parr" onclick="cyclePortrait(${i},-1)">&#8249;</button>
      <div style="${portBg(pname,40,50)}border:1px solid ${PCOLORS[i]};border-radius:2px;"></div>
      <button class="parr" onclick="cyclePortrait(${i},1)">&#8250;</button>
    </div><input class="pi" type="text" id="pn-${i}" value="${prev[i]!==undefined?prev[i]:pname}" maxlength="16" placeholder="Crew ${i+1}">`;
    nl.appendChild(d);
  }
}

function cyclePortrait(i, dir){
  const n=CREW_PORTRAITS.length;
  const oldName=CREW_PORTRAITS[setupPortraits[i]??0].name;
  setupPortraits[i]=((setupPortraits[i]??0)+dir+n)%n;
  const newName=CREW_PORTRAITS[setupPortraits[i]].name;
  const input=document.getElementById(`pn-${i}`);
  if(input&&input.value===oldName) input.value=newName;
  buildSetup();
}

function goToSiteBuilder(){
  const names=[],portraits=[];
  for(let i=0;i<setupN;i++){
    const v=(document.getElementById(`pn-${i}`)?.value||'').trim();
    const pname=CREW_PORTRAITS[setupPortraits[i]??0].name;
    names.push(v||pname);
    portraits.push(pname);
  }
  pendingNames=names;
  pendingPortraits=portraits;
  document.getElementById('setup').style.display='none';
  const sb=document.getElementById('setup-site');
  sb.style.display='flex';sb.classList.add('show');
  initBuilder();
  updateBuilderProgress();
  e7ScreenSeq('sb-e7-log',[
    [0,   'sys', '> ENDYMION 7 - EMERGENCY PROTOCOLS'],
    [300, 'crit', '> Signal Array: OFFLINE.'],
    [500, '',    'You must recover Radio Fragments to restore the Signal Array.'],
    [800, '',    'Establish your base camp by placing life support structures near the crash site.'],
  ]);
}

window.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('setup').style.display='none';
  e7ScreenSeq('e7-intro-msg',[
    [300, 'sys', '> ENDYMION 7 — SYSTEMS INITIALIZING...'],
    [400, 'sys', '> Primary diagnostics: complete. Life support: NOMINAL.'],
    [600, '',    'Welcome aboard. I am E7, your ship\'s emergency computer. You are the crew of the Endymion 7, a deep-range mining vessel. You have crash-landed on an uncharted planet. The cause of the accident is unknown.'],
    [500, '',    'Somewhere out there, scattered across the terrain, are pieces of your radio. Find them and bring them back to the Signal Array to call for rescue.'],
    [400, '',    'You have a 1 in 10,358 chance of survival.'],
    [300, '',    'Please acknowledge.'],
  ]);
});
function showCrewSetup(){
  document.getElementById('intro').style.display='none';
  document.getElementById('setup').style.display='flex';
  buildSetup();
  e7ScreenSeq('e7-setup-msg',[
    [0,   'sys', '> ENDYMION 7 — CREW INITIALIZATION...'],
    [400, '',    'Please confirm the surviving crew members.'],
  ]);
}
