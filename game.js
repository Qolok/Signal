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

const ANOMALIES=['Stasis Pod','Temporal Rift','Portal','Gravitational Well','Dead Zone','Echo Chamber','Inversion Field'];

// ═══════════════════════════════════════════════════════════════
// FIXED 43-TILE TERRAIN DECK SPEC
// ═══════════════════════════════════════════════════════════════
function buildTerrainDeck(){
  const deck=[];
  // 3 Ship Sections — alternate image variants
  const shipImgs=['ship-section1.png','ship-section2.png','ship-section1.png'];
  for(let i=0;i<3;i++)deck.push({type:'ship_section',pois:['Airlock','Emergency Bay','Supply Cache'],investigatedCount:0,imgOverride:shipImgs[i]});
  // 7 Anomalies
  ANOMALIES.forEach(a=>deck.push({type:'anomaly',anomaly:a,pois:[],investigatedCount:0}));
  // 33 Terrain tiles — single POI per tile
  const terrainSpec=[
    {pois:['Dead Tower'],          radioFragment:true,  requiresTool:'lockpick',      noEvent:true, count:1},
    {pois:['Collapsed Tower'],     radioFragment:true,  requiresTool:'plasma_cutter', noEvent:true, count:1},
    {pois:['Fuselage'],            radioFragment:false, count:2},
    {pois:['Cave'],                radioFragment:false, count:9},
    {pois:['Abandoned Outpost'],   radioFragment:false, requiresTool:'lockpick',   toolReward:'rollFood', noEvent:true, count:1},
    {pois:['Mysterious Outpost'],  radioFragment:false, requiresTool:'data_spike',  toolReward:'drawEq',      noEvent:true, count:1},
    {pois:['Wreckage Field'],      radioFragment:false, count:9},
    {pois:['Cache'],               radioFragment:false, count:3},
    {pois:['Recovered Terminal'],  radioFragment:false, requiresTool:'data_spike', toolReward:'drawPrivateEvent', noEvent:true, count:1},
    {pois:['Passage'],             radioFragment:false, count:1},
    {pois:['Bloody Passage'],      radioFragment:false, count:1},
  ];
  terrainSpec.forEach(spec=>{
    for(let i=0;i<spec.count;i++){
      const tile={type:'terrain',pois:[...spec.pois],radioFragment:spec.radioFragment,requiresTool:spec.requiresTool||null,toolReward:spec.toolReward||null,noEvent:spec.noEvent||false,investigatedCount:0};
      if(spec.pois[0]==='Abandoned Outpost'){tile.imgOverride='outpost1.png';}
      if(spec.pois[0]==='Mysterious Outpost'){tile.imgOverride='outpost2.png';}
      deck.push(tile);
    }
  });
  // shuffle
  for(let i=deck.length-1;i>0;i--){const j=0|Math.random()*(i+1);[deck[i],deck[j]]=[deck[j],deck[i]];}
  return deck;
}

const POI_COLOR={
  'Fuselage':'#3a7080','Cave':'#2a5030','Abandoned Outpost':'#7a6030','Mysterious Outpost':'#305060',
  'Dead Tower':'#2870a0','Collapsed Tower':'#1a5080','Wreckage Field':'#705030',
  'Recovered Terminal':'#2060a8','Cache':'#507040',
  'Passage':'#4a4a60','Bloody Passage':'#702020',
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
  'Dead Tower':         'signal-tower.png',
  'Collapsed Tower':    'signal-tower.png',
  'Abandoned Outpost':  'outpost1.png',
  'Mysterious Outpost': 'outpost2.png',
  'Fuselage':           'fuselage.png',
  'Wreckage Field':     'wreckage.png',
  'Recovered Terminal': 'terminal.png',
  'Cache':              'cache.png',
  'Passage':            'passage.png',
  'Bloody Passage':     'passage-bloody.png',
  'Stasis Pod':         'stasis.png',
  'Temporal Rift':      'temporal-distortion.png',
  'Gravitational Well': 'gravity-well.png',
  'Echo Chamber':       'echo-chamber.png',
  'Dead Zone':          'dead-zone.png',
  'Portal':             'portal.png',
  'Inversion Field':    'inversion-field.png',
  'Ship Section':       'ship-section1.png',
};

function getTileImg(t){
  if(t.imgOverride)return`img/Tiles/${t.imgOverride}`;
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
  {id:'plasma_cutter', name:'Plasma Cutter',     cat:'Tool',   txt:'Cut through sealed structures.'},
  {id:'grappling',     name:'Grappling Hook',    cat:'Tool',   txt:'Move to any adjacent tile without using move points. Use once per round.'},
  {id:'excavator',     name:'Excavator',         cat:'Tool',   txt:'Reveal a face-down tile without entering it.',use:'excavator'},
  {id:'lockpick',      name:'Lockpick',          cat:'Tool',   txt:'Bypass mechanical locks on many structures.',},
  {id:'walkie',        name:'Walkie',            cat:'Tool',   txt:'Trade resources with a player on an adjacent tile.',use:'walkie'},
  {id:'medpack',       name:'MedPack',           cat:'Supply', txt:'Restore 1 Health to HEALTHY. Discard after use.', use:'medpack'},
  {id:'emer_food',     name:'Emergency Rations', cat:'Supply', txt:'Flip 3 EMPTY Food to FULL. Discard after use.', use:'emer_food'},
  {id:'compressed_o2', name:'Compressed O2',     cat:'Supply', txt:'Flip 2 EMPTY O2 Tanks to FULL. Discard after use.', use:'compressed_o2'},
  {id:'hazard_suit',   name:'Hazard Suit',       cat:'Tech',   txt:'Negates Health loss from toxic exposure Event cards.'},
  {id:'scanner',       name:'Scanner',           cat:'Tech',   txt:'Reveals all adjacent undiscovered tiles. Once per round, 3 charges total.',use:'scanner'},
  {id:'rebreather',    name:'Rebreather',        cat:'Tech',   txt:'Your O\u2082 depletes every 2 turns in the field instead of every turn.'},
  {id:'data_spike',    name:'Data Spike',        cat:'Tech',   txt:'Bypass electronic locks on high-tech structures.'},
  {id:'stun_baton',    name:'Stun Baton',        cat:'Weapon', txt:'A player on your tile skips their next turn. Discard after use.',use:'stun_baton'},
  {id:'flare_gun',     name:'Flare Gun',         cat:'Weapon', txt:'Force any player within 2 tiles to move to your tile immediately. Discard after use.',use:'flare_gun'},
  {id:'shock_trap',    name:'Shock Trap',        cat:'Weapon', txt:'Place on your current tile. The next player to enter loses 1 Health. Discard after use.',use:'shock_trap'},
  {id:'jammer',        name:'Signal Jammer',     cat:'Weapon', txt:'No Signal Roll occurs this round, regardless of Radio Fragments. Discard after use.',use:'jammer'},
];

// Note: The Event Cards should be designed to sew distrust among the crew. They should also be based in the actual game mechanics with real consequences.
const EVENT_CARDS=[
  // Public — yields
  {text:'Emergency supplies found, partially intact. Roll 1 die for Food yield.',pub:true,rollFood:true},
  {text:['Salvageable material nearby. Roll 1 die:','1–3: nothing','4–5: +1 Food','6: Equipment card'],pub:true,rollWreckage:true},
  {text:'A sealed equipment cache. Contents intact.',pub:true,drawEq:true},
  {text:'Half-buried in the soil, you find a Radio Fragment from the Endymion 7 that was jettisoned with the rest of the cargo before impact.',pub:true,rf:true},
  {text:'In a pile of debris, you find a Radio Fragment in a makeshift casing. Someone wanted it to survive. If you take it back to the Signal Array, it might take a charge.',pub:true,rf:true},
  {text:'You trip over a rock and uncover a Radio Fragment, wrapped in cloth. Whoever left it here thought they\'d come back.',pub:true,rf:true},
  {text:'Natural shelter here. The terrain blocks atmospheric sensors. Skip your O\u2082 flip this round.',pub:true,skipO2:true},
  // Public — hazards
  {text:'Structural instability. The ground shifts — brace yourself. Lose 1 Food.',pub:true,loseFood:1},
  {text:'Toxic residue from the crash. Lose 1 Food.',pub:true,loseFood:1},
  {text:'The air here reeks of chemical burn. Something toxic has seeped into the soil. Your lungs are burning.',pub:true,loseHealth:1},
  {text:'Your suit registers a spike in atmospheric toxins. The source is somewhere in the wreckage above you. You inhale before you can seal the mask.',pub:true,loseHealth:1},
  // Public — narrative
  {text:'Nothing here. Whatever this place held has been taken by the terrain.',pub:true},
  {text:'Signs of prior occupation — too recent to be from the crash. Someone else was here.',pub:true},
  {text:'Clear. No hazards, no yield. Move on.',pub:true},
  {text:'Something jammed the sensors on the way in. You can\'t tell if it was the terrain or something else.',pub:true},
  // Private — resources
  {text:'A hidden cache — stowed deliberately, not by the crash. You pocket the contents before anyone else arrives.',pub:false,drawEq:true},
  {text:'There\'s food here nobody logged. Take it. If anyone asks about your count, you found it in the field. That\'s true enough.',pub:false,gainFood:1},
  {text:'You were at the equipment locker before your turn. Draw 1 Equipment card now and keep it face-down. Don\'t mention it.',pub:false,drawEqHidden:true},
  {text:'You reached this cache first. Refill your depleted Food from the Cargo Hold — take only what you\'re missing. No rule says you have to tell anyone.',pub:false,takeAllCargo:true},
  // Private — competing objectives
  {text:'Everyone else is just slowing you down. Occupy the Signal Array for 3 consecutive rounds, then roll a 6 or higher to abandon the others and be rescued alone. The choice is yours.',pub:false,trackSignalArray:true},
  {text:'Your mission briefing had a clause the others weren\'t cleared for. Bring a Radio Fragment to the Signal Array and your extraction is guaranteed. Everyone else is on their own.',pub:false,rfExtraction:true},
  // Private — psychological
  {text:'You\'re playing a different game than the others. Help when it\'s convenient. Nod along. But you know what you\'d do if it came down to it.',pub:false},
  {text:'Someone was at the Cargo Hold when they shouldn\'t have been. You didn\'t see who. Say nothing. Information is worth more than accusations.',pub:false},
  {text:'You\'ve calculated the O\u2082 supply against the extraction window. It supports three people. Not four. You haven\'t corrected anyone\'s assumptions. You\'re still running the numbers.',pub:false},
];

const TILE_TIPS={
  'Crash Site':        [[0,'','Starting point for all crew. The heart of Base Camp.'],[0,'act','No specific action — this is your anchor point.']],
  'Medical Bay':       [[0,'','Emergency medical equipment salvaged from the wreckage.'],[0,'act','Passive: Restore 1 Health automatically when entering.']],
  'Signal Array':      [[0,'','The ship\'s emergency transmitter. Fits one player at a time.'],[0,'act','Activate Radio Fragments. Roll Signal dice if fragments are activated. Contest occupancy if blocked.']],
  'Equipment Locker':  [[0,'','The crew\'s tool cache. Raided but not empty.'],[0,'act','Draw 1 Equipment card.']],
  'Cargo Hold':        [[0,'','Communal food and supply storage.'],[0,'act','Deposit or withdraw Food freely.']],
  'Airlock':           [[0,'','The pressurized entry point from the field. O₂ reserves fully restored on re-entry.'],[0,'act','Passive: Refill all O₂ Tanks automatically when entering from terrain.']],
  'Watch Tower':       [[0,'','An elevated vantage point over the surrounding terrain.'],[0,'act','Reveal all face-down tiles adjacent to any crew member currently in the field.']],
  'Dead Tower':        [[0,'','A broadcast tower, hand-built and long-abandoned. Inside, a logbook in a language you recognize. The last entry is dated eighteen years ago. The final page is a list of names with lines drawn through them. You salvage some Radio Fragments from the equipment.'],[0,'act','Use Lockpick to recover 1 Radio Fragment.']],
  'Collapsed Tower':   [[0,'','A relay tower, partially collapsed. The door is jammed, but you can see a radio inside with a dead body slumped over the transmitter.'],[0,'act','A crew member with a plasma cutter can get inside and salvage the Radio Fragment.']],
  'Cave':              [[0,'','Natural shelter. Atmospheric sensors can\'t reach inside.'],[0,'act','Skip O2 Tank flip this round. Draw an Event card.']],
  'Abandoned Outpost': [[0,'','The door hasn\'t moved in years — maybe decades. Through the window, you see overturned furniture. A layer of dust. Someone lived here for a long time.'],[0,'act','Use the Lockpick to enter.'],[0,'act','Roll 1 die for Food yield.']],
  'Mysterious Outpost':[[0,'','The structure doesn\'t match anything on your planetary scans. The materials are unfamiliar. The door has a digital lock — no keypad, no biometrics, nothing you recognize. Someone built this here and didn\'t want visitors.'],[0,'act','Use Data Spike to enter. Draw 1 Equipment card.']],
  'Fuselage':          [[0,'','Hull section from the Endymion 7. Still holds cargo.'],[0,'act','May yield Equipment cards or a Radio Fragment. Draw an Event card.']],
  'Wreckage Field':    [[0,'','Debris scattered across the terrain — hazardous, but potentially useful.'],[0,'act','Roll for salvage. Draw an Event card.']],
  'Recovered Terminal':[[0,'','The terminal still draws power from a source you can\'t locate. The login screen shows a corporate logo. The last active session was filed seven years ago. The project was marked INCOMPLETE. No crew names are listed. You weren\'t briefed on any prior missions to this planet.'],[0,'act','Draw a Private Event card. The data is yours alone.']],
  'Cache':             [[0,'','A sealed supply cache — military or civilian, hard to tell.'],[0,'act','Roll 1 die.'],[0,'good','1–2: +1 Food'],[0,'good','3–4: +2 Food'],[0,'good','5–6: +3 Food']],
  'Passage':           [[0,'','A narrow route through the terrain. Something passed through here recently.'],[0,'act','Draw an Event card.']],
  'Bloody Passage':    [[0,'','A narrow route marked with signs of violence. Whatever happened here was recent.'],[0,'act','Draw an Event card.']],
  'Stasis Pod':        [[0,'','Alien preservation technology. Time moves differently inside.'],[0,'act','Enter: Turn pawn sideways. Skip Resource Flip each round inside. Cannot move or interact. Exit any time.']],
  'Temporal Rift':     [[0,'','You experience an unexplained spacetime distortion. Past and future flickers. You fight to keep down your breakfast.'],[0,'act','Roll 1 die.'],[0,'crit','1\u20133: lose that many Food.'],[0,'good','4\u20136: recover that many Food.']],
  'Portal':            [[0,'','Instantaneous transit point. Origin unknown.'],[0,'act','Option: Move immediately to Crash Site. Turn ends.']],
  'Gravitational Well':[[0,'','Intense localized gravity field.'],[0,'act','Roll 1 die.'],[0,'act','The player to your left moves your pawn that many steps in any direction.']],
  'Dead Zone':         [[0,'','Something blocks all transmission here.'],[0,'act','No Signal Roll occurs this round for any player.']],
  'Echo Chamber':      [[0,'','The terrain resonates with past events.'],[0,'act','Resolve the most recent Public Event card again in full.']],
  'Inversion Field':   [[0,'','Gravity inversion. Resources change hands involuntarily.'],[0,'act','Choose any other player. Swap your Food with theirs.']],
  'Ship Section':      [[0,'','A section of the Endymion 7 that came down separately. Emergency systems are still online.'],[0,'act','Roll 1 die.'],[0,'good','1\u20132: Food'],[0,'sys','3\u20134: Oxygen'],[0,'crit','5\u20136: Health']],
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
    return{id:i,name,color:PCOLORS[i],portrait,q:0,r:0,food:10,o2:3,health:3,
           radioFragments:0,equipment,incapacitated:0,alive:true,location:'Crash Site',skipO2:false,
           inStasis:false,signalArrayRounds:0,soloRescueActive:false,rfExtractionActive:false,
           scannerUsed:false,scannerCharges:3,rebreatherCycle:false,stunned:false};
  });
  G={players,currentPlayer:0,tiles,terrainDeck:buildTerrainDeck(),
     eqDeck,eqDeckCount:eqDeck.length,evtDeckCount:80,
     radioFragmentsActivated:0,turn:1,phase:'roll',movementLeft:0,reach:new Map(),excavatorMode:false,tileActionUsed:false,signalRolled:false,cargoHold:players.length*5,lastPublicEvt:null,jammerActive:false};
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

function trDesc(steps,charDelay=15){
  const el=document.getElementById('tr-desc');
  el.innerHTML='';
  termSeq(el,Array.isArray(steps[0])?steps:[[0,'',steps]],charDelay);
}
function showTileRevealModal(t, onDismiss){
  let title;
  let steps=[];
  if(t.type==='anomaly'){
    title=t.anomaly||'Anomaly';
    steps=[...(TILE_TIPS[t.anomaly]||[[0,'','An anomaly of unknown origin.']])];
  } else if(t.type==='ship_section'){
    title='Ship Section — Endymion 7';
    steps=[...TILE_TIPS['Ship Section']];
  } else {
    title=t.pois.join(' \u00b7 ');
    t.pois.forEach(poi=>{if(TILE_TIPS[poi])steps.push(...TILE_TIPS[poi]);});
  }
  if(t.requiresTool&&!t.radioFragment){
    const p=cp();
    const TOOL_NAMES={lockpick:'Lockpick',plasma_cutter:'Plasma Cutter',data_spike:'Data Spike'};
    const toolName=TOOL_NAMES[t.requiresTool]||t.requiresTool;
    const hasTool=p.equipment&&p.equipment.some(c=>c.id===t.requiresTool);
    steps.push([0,'act',hasTool?`\u25c8 You have a ${toolName}. You can enter.`:`\u25c8 Requires ${toolName} to enter.`]);
  }
  if(t.radioFragment&&!t.requiresTool){
    const p=cp();p.radioFragments++;t.radioFragment=false;
    addLog(`${p.name} recovered a Radio Fragment.`,'frag');
    steps.push([0,'good','\u25c8 Radio Fragment recovered.']);
  } else if(t.radioFragment&&t.requiresTool){
    const p=cp();
    const TOOL_NAMES={lockpick:'Lockpick',plasma_cutter:'Plasma Cutter'};
    const toolName=TOOL_NAMES[t.requiresTool]||t.requiresTool;
    const hasTool=p.equipment&&p.equipment.some(c=>c.id===t.requiresTool);
    steps.push([0,'act',hasTool?`\u25c8 You have a ${toolName}. Use it to recover the Radio Fragment.`:`\u25c8 Requires ${toolName} to access the Radio Fragment.`]);
  }
  // Populate overlay
  const isAnomaly=t.type==='anomaly';
  const trov=document.getElementById('trov');
  const tileImg=getTileImg(t);
  trov.style.backgroundImage=tileImg?`url(${tileImg})`:'none';
  document.getElementById('tr-name').textContent=title.toUpperCase();
  trDesc(steps.length?steps:[[0,'','Unknown terrain.']]);
  const deck=document.getElementById('tr-deck');
  const actionsEl=document.getElementById('tr-actions');
  actionsEl.innerHTML='';
  document.getElementById('trov-cancel').style.display='none';
  const dismiss=()=>{
    trov.onclick=null;
    deck.onclick=null;
    actionsEl.innerHTML='';
    trov.classList.remove('show','anomaly-mode');
    trov.style.display='none';
    trov.style.backgroundImage='';
    if(onDismiss)onDismiss();
    else if(t.noEvent||t.type==='ship_section'||t.type==='anomaly'||t.pois?.includes('Cache')){updateUI();render();}
    else drawTileEvent(t);
  };
  if(t.type==='ship_section'){
    deck.style.display='none';
    trov.onclick=null;
    const descEl=document.getElementById('tr-desc');
    const dieWrap=make3DDie('idle');
    dieWrap.style.cssText='margin:0 auto;';
    actionsEl.appendChild(dieWrap);
    dieWrap.onclick=()=>{
      dieWrap.className='td-die-wrap rolling';dieWrap.onclick=null;
      const val=1+(0|Math.random()*6);
      setTimeout(()=>{
        actionsEl.innerHTML='';
        const resDie=makeResultDie(val);
        resDie.style.cssText='width:52px;height:52px;margin:0 auto;display:block;';
        actionsEl.appendChild(resDie);
        const p=cp();
        let outcome='';
        if(val<=2){const gained=Math.min(10-p.food,3);p.food+=gained;outcome=`Rolled ${val} — Food: +${gained}.`;addLog(`${p.name} salvaged ${gained} Food from Ship Section.`,'good');}
        else if(val<=4){const gained=Math.min(3-p.o2,2);p.o2+=gained;outcome=`Rolled ${val} — Oxygen: +${gained}.`;addLog(`${p.name} refilled ${gained} O\u2082 from Ship Section.`,'good');}
        else{if(p.health<3){p.health++;outcome=`Rolled ${val} — Health restored.`;addLog(`${p.name} treated at Ship Section. Health: ${p.health}/3.`,'good');}else{outcome=`Rolled ${val} — Health already full.`;addLog(`${p.name} searched Ship Section — health already full.`);}}
        const outEl=document.createElement('div');
        outEl.style.cssText='color:#a0c8e8;font-size:.8rem;margin-top:10px;text-align:center;';
        outEl.textContent=outcome;descEl.appendChild(outEl);
        updateUI();
        const cont=document.createElement('button');cont.className='mbtn';cont.textContent='Continue';
        cont.onclick=dismiss;
        actionsEl.appendChild(cont);
      },1500);
    };
  } else if(t.pois&&t.pois.includes('Cache')){
    deck.style.display='none';
    trov.onclick=null;
    const descEl=document.getElementById('tr-desc');
    const dieWrap=make3DDie('idle');
    dieWrap.style.cssText='margin:0 auto;';
    actionsEl.appendChild(dieWrap);
    dieWrap.onclick=()=>{
      dieWrap.className='td-die-wrap rolling';dieWrap.onclick=null;
      const val=1+(0|Math.random()*6);
      setTimeout(()=>{
        actionsEl.innerHTML='';
        const resDie=makeResultDie(val);
        resDie.style.cssText='width:52px;height:52px;margin:0 auto;display:block;';
        actionsEl.appendChild(resDie);
        const p=cp();
        const yield_=val<=2?1:val<=4?2:3;
        const gained=Math.min(10-p.food,yield_);
        p.food+=gained;
        const outcome=`Rolled ${val} — Food: +${gained}.`;
        addLog(`${p.name} raided the cache — gained ${gained} Food.`,'good');
        const outEl=document.createElement('div');
        outEl.style.cssText='color:#a0c8e8;font-size:.8rem;margin-top:10px;text-align:center;';
        outEl.textContent=outcome;
        descEl.appendChild(outEl);
        updateUI();
        const cont=document.createElement('button');cont.className='mbtn';cont.textContent='Continue';
        cont.onclick=dismiss;
        actionsEl.appendChild(cont);
      },1500);
    };
  } else if(isAnomaly&&t.anomaly==='Portal'){
    deck.style.display='none';
    const p=cp();
    const useBtn=document.createElement('button');useBtn.className='mbtn pri';useBtn.textContent='Use Portal';
    useBtn.onclick=()=>{dismiss();p.q=0;p.r=0;p.location='Crash Site';G.movementLeft=0;G.phase='action';addLog(`${p.name} used Portal — returned to Crash Site.`);updateUI();render();};
    const decBtn=document.createElement('button');decBtn.className='mbtn';decBtn.textContent='Decline';
    decBtn.onclick=()=>{dismiss();addLog(`${p.name} declined the Portal.`);updateUI();};
    actionsEl.appendChild(decBtn);actionsEl.appendChild(useBtn);
  } else if(isAnomaly&&(t.anomaly==='Temporal Rift'||t.anomaly==='Gravitational Well')){
    deck.style.display='none';
    trov.onclick=null;
    const descEl=document.getElementById('tr-desc');
    const dieWrap=make3DDie('idle');
    dieWrap.style.cssText='margin:0 auto;';
    actionsEl.appendChild(dieWrap);
    dieWrap.onclick=()=>{
      dieWrap.className='td-die-wrap rolling';dieWrap.onclick=null;
      const val=1+(0|Math.random()*6);
      setTimeout(()=>{
        actionsEl.innerHTML='';
        const resDie=makeResultDie(val);
        resDie.style.cssText='width:52px;height:52px;margin:0 auto;display:block;';
        actionsEl.appendChild(resDie);
        let outcome='';
        const p=cp();
        if(t.anomaly==='Temporal Rift'){
          if(val<=3){const lost=Math.min(p.food,val);p.food-=lost;outcome=`Rolled ${val} — lost ${lost} Food.`;addLog(`Temporal Rift: rolled ${val} — lost ${lost} Food.`,'crit');}
          else{const gain=Math.min(10-p.food,val);p.food+=gain;outcome=`Rolled ${val} — gained ${gain} Food.`;addLog(`Temporal Rift: rolled ${val} — gained ${gain} Food.`,'good');}
        } else if(t.anomaly==='Gravitational Well'){
          let q=p.q,r=p.r;
          for(let i=0;i<val;i++){const d=DIRS[0|Math.random()*6];const nq=q+d[0],nr=r+d[1];if(G.tiles.has(hk(nq,nr))){q=nq;r=nr;}}
          p.q=q;p.r=r;const dest=G.tiles.get(hk(q,r));p.location=tileName(dest);
          outcome=`Rolled ${val} — thrown to ${p.location}.`;
          addLog(`Gravitational Well: rolled ${val} — ${p.name} thrown to ${p.location}.`,'crit');render();
        }
        const outEl=document.createElement('div');
        outEl.style.cssText='color:#a0c8e8;font-size:.8rem;margin-top:10px;text-align:center;';
        outEl.textContent=outcome;descEl.appendChild(outEl);
        updateUI();
        const cont=document.createElement('button');cont.className='mbtn';cont.textContent='Continue';
        cont.onclick=()=>{
          trov.onclick=null;deck.onclick=null;actionsEl.innerHTML='';
          trov.classList.remove('show','anomaly-mode');trov.style.display='none';trov.style.backgroundImage='';
          if(onDismiss)onDismiss();else{updateUI();render();}
        };
        actionsEl.appendChild(cont);
      },1500);
    };
  } else if(isAnomaly){
    deck.style.display='none';
    trov.classList.add('anomaly-mode');
    trov.onclick=e=>{if(e.target===trov)dismiss();};
  } else {
    trov.onclick=null;
    if(t.noEvent){
      deck.style.display='none';
    } else {
      deck.style.display='';
      document.getElementById('tr-evtn').textContent=G.evtDeckCount;
      document.getElementById('tr-deck-lbl').textContent='Draw Event';
      deck.onclick=dismiss;
    }
    if(t.requiresTool&&!t.radioFragment){
      const p=cp();
      const hasTool=p.equipment&&p.equipment.some(c=>c.id===t.requiresTool);
      const TOOL_NAMES={lockpick:'Lockpick',plasma_cutter:'Plasma Cutter',data_spike:'Data Spike'};
      const toolName=TOOL_NAMES[t.requiresTool];
      if(hasTool){
        const enterBtn=document.createElement('button');
        enterBtn.className='mbtn pri';
        enterBtn.textContent=`Use ${toolName} — Enter`;
        enterBtn.onclick=()=>{
          const reward=t.toolReward;t.toolReward=null;t.investigatedCount=t.pois.length;
          if(reward==='rollFood'){
            const bg=getTileImg(t);
            dismiss();
            showDieRoll('Search the outpost. Roll for Food yield.',val=>{
              const gained=Math.min(10-p.food,val);
              p.food+=gained;
              addLog(`${p.name} searched the outpost — gained ${gained} Food.`,'good');
              return`Rolled ${val} — gained ${gained} Food.`;
            },null,bg?`url(${bg})`:undefined);
          } else if(reward==='drawEq'){
            const c=drawEqCard(p);
            if(c)addLog(`${p.name} found ${c.name} inside.`,'good');
            else addLog(`${p.name} searched the outpost — equipment cache empty.`);
            dismiss();
          } else if(reward==='drawPrivateEvent'){
            dismiss();
            const privCards=EVENT_CARDS.filter(e=>e.pub===false);
            const evt=privCards[0|Math.random()*privCards.length];
            G.evtDeckCount=Math.max(0,G.evtDeckCount-1);
            const evtnEl=document.getElementById('evtn');if(evtnEl)evtnEl.textContent=G.evtDeckCount;
            addLog(`${p.name} accessed the Recovered Terminal.`,'act');
            showEventCard(evt,'Recovered Terminal',()=>{updateUI();render();},null);
          }
        };
        actionsEl.appendChild(enterBtn);
      } else {
        const leaveBtn=document.createElement('button');
        leaveBtn.className='mbtn';
        leaveBtn.textContent='Leave';
        leaveBtn.onclick=dismiss;
        actionsEl.appendChild(leaveBtn);
      }
    }
    if(t.radioFragment&&t.requiresTool){
      const p=cp();
      const hasTool=p.equipment&&p.equipment.some(c=>c.id===t.requiresTool);
      if(hasTool){
        const TOOL_NAMES={lockpick:'Lockpick',plasma_cutter:'Plasma Cutter'};
        const toolName=TOOL_NAMES[t.requiresTool];
        const fragBtn=document.createElement('button');
        fragBtn.className='mbtn pri';
        fragBtn.textContent=`Use ${toolName} — Recover Fragment`;
        fragBtn.onclick=()=>{p.radioFragments++;t.radioFragment=false;t.investigatedCount=t.pois.length;addLog(`${p.name} used ${toolName} to recover a Radio Fragment.`,'frag');dismiss();};
        actionsEl.appendChild(fragBtn);
      } else {
        const leaveBtn=document.createElement('button');
        leaveBtn.className='mbtn';
        leaveBtn.textContent='Leave';
        leaveBtn.onclick=dismiss;
        actionsEl.appendChild(leaveBtn);
      }
    }
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
  if(evt.drawEqHidden){drawEqCard(p);}
  if(evt.gainFood){p.food=Math.min(10,p.food+evt.gainFood);}
  if(evt.takeAllCargo){const taken=Math.min(10-p.food,G.cargoHold||0);p.food+=taken;G.cargoHold-=taken;if(taken>0)addLog(`${p.name} took ${taken} Food from the Cargo Hold.`,'good');}
  if(evt.loseFood){const lost=Math.min(p.food,evt.loseFood);p.food-=lost;addLog(`${p.name} lost ${lost} Food.`,'crit');}
  if(evt.skipO2){p.skipO2=true;addLog('O\u2082 flip skipped this turn.');}
  if(evt.loseHealth){
    if(p.equipment.some(c=>c.id==='hazard_suit')){addLog(`${p.name}'s Hazard Suit blocked toxic exposure.`,'good');}
    else{if(p.health>0)p.health--;addLog(`${p.name} suffered toxic exposure. Health: ${p.health}/3.`,'crit');}
  }
  if(evt.pub)G.lastPublicEvt=evt;
  if(evt.trackSignalArray){p.soloRescueActive=true;addLog(`${p.name} has a private objective.`,'act');}
  if(evt.rfExtraction){p.rfExtractionActive=true;addLog(`${p.name} has a private objective.`,'act');}
  const locName=t.pois&&t.pois.length?t.pois.join(' \u00b7 '):(t.name||'');
  let rollCallback=null;
  if(evt.rollFood){
    rollCallback=r=>{const gained=Math.min(10-p.food,r);p.food+=gained;addLog(`Loot roll: ${r} \u2014 +${gained} Food.`,gained?'good':'');return`Rolled ${r} \u2014 gained ${gained} Food.`;};
  } else if(evt.rollWreckage){
    rollCallback=r=>{
      if(r<=3){addLog(`Wreckage roll: ${r} \u2014 nothing found.`);return`Rolled ${r} \u2014 nothing found.`;}
      if(r<=5){const gained=Math.min(10-p.food,1);p.food+=gained;addLog(`Wreckage roll: ${r} \u2014 +1 Food.`,'good');return`Rolled ${r} \u2014 gained 1 Food.`;}
      const c=drawEqCard(p);const msg=c?`drew ${c.name}.`:'equipment deck empty.';addLog(`Wreckage roll: 6 \u2014 ${msg}`,'good');return`Rolled 6 \u2014 ${msg}`;
    };
  }
  const evImg=getTileImg(t);
  const _evOv=document.getElementById('evc-ov');
  _evOv.style.backgroundImage=evImg?`url(${evImg})`:'none';
  _evOv.style.backgroundSize='cover';_evOv.style.backgroundPosition='center';
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
  const count=mode==='signal'?3:mode==='move'?1:0;
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

  const isSignal=diceState.mode==='signal';
  const container=isSignal?(()=>{const g=document.createElement('div');g.className='td-signal-grid';return g;})():row;

  diceState.values.forEach((v,i)=>{
    let el;
    if(!diceState.rolled&&!diceState.spinning){
      el=make3DDie('idle');
      el.onclick=rollTableDice;
    } else if(diceState.spinning){
      el=make3DDie('rolling');
    } else {
      el=makeResultDie(v);
      el.id='td-die-result';
      el.style.animationDelay=(i*0.1)+'s';
      if(moveCounting&&G.movementLeft>0){
        const ov=document.createElement('div');
        ov.className='td-die-moves';
        ov.id='td-die-moves-ov';
        ov.textContent=G.movementLeft;
        el.appendChild(ov);
      }
    }
    if(isSignal&&i===0)el.classList.add('td-signal-top');
    container.appendChild(el);
  });

  if(isSignal)row.appendChild(container);

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
      if(!G||G.phase!=='roll'){renderTableDice();return;}
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
    if(t.name==='Airlock'){p.o2=3;addLog(`${p.name} passed through Airlock. Oxygen fully restored.`,'good');}
    if(t.name==='Medical Bay'&&p.health<3){p.health++;addLog(`${p.name} treated at Medical Bay. Health: ${p.health}/3.`,'good');}
  }
  if(t?.shockTrap&&t.shockTrapOwner!==p.id){
    t.shockTrap=false;t.shockTrapOwner=null;
    if(p.health>0)p.health--;
    addLog(`${p.name} triggered a Shock Trap! Health: ${p.health}/3.`,'crit');
  }
  const isNewAnomaly=!wasRevealed&&t?.type==='anomaly';
  if(t?.type==='anomaly'&&!isNewAnomaly)triggerAnomaly(t);
  const wasInvestigated=(G.tiles.get(hk(q,r))?.investigatedCount||0)>0;
  const stillPending=t?.requiresTool&&(t.radioFragment||t.toolReward);
  const needsDraw=!wasInvestigated&&t&&(t.type==='terrain'||t.type==='ship_section')&&t.pois?.length>0||stillPending;
  if(needsDraw&&!stillPending)t.investigatedCount=t.pois.length;
  G.phase='action';G.reach=bfsReach(p.q,p.r,G.movementLeft);
  addLog(`${p.name} → ${p.location}`);
  updateUI();render();
  const rollingAnomaly=t?.type==='anomaly'&&(t.anomaly==='Temporal Rift'||t.anomaly==='Gravitational Well');
  if(needsDraw)showTileRevealModal(t);
  else if(isNewAnomaly)showTileRevealModal(t,rollingAnomaly?()=>{updateUI();render();}:()=>triggerAnomaly(t));
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
  else if(c.use==='emer_food'){const gain=Math.min(3,10-p.food);p.food+=gain;p.equipment.splice(ci,1);addLog(`${p.name} used Emergency Food. +${gain} Food.`,'good');}
  else if(c.use==='compressed_o2'){const gain=Math.min(2,3-p.o2);p.o2+=gain;p.equipment.splice(ci,1);addLog(`${p.name} used Compressed O₂. +${gain} O₂.`,'good');}
  else if(c.use==='excavator'){p.equipment.splice(ci,1);closeCardModal();G.excavatorMode=true;addLog('Excavator: click an adjacent face-down tile to reveal it.','act');updateUI();render();return;}
  else if(c.use==='scanner'){
    if(p.scannerUsed){addLog('Scanner already used this round.','act');closeCardModal();return;}
    if(p.scannerCharges<=0){addLog('Scanner is depleted.','act');closeCardModal();return;}
    p.scannerUsed=true;
    p.scannerCharges--;
    let revealed=0;
    hnbr(p.q,p.r).forEach(([nq,nr])=>{
      const nt=G.tiles.get(hk(nq,nr));
      if(nt&&!nt.revealed){revealAt(nq,nr);revealed++;}
    });
    const chargesLeft=p.scannerCharges>0?` (${p.scannerCharges} charge${p.scannerCharges!==1?'s':''} remaining)`:'';
    if(revealed>0)addLog(`${p.name} used Scanner — ${revealed} adjacent tile${revealed!==1?'s':''} revealed.${chargesLeft}`,'tile');
    else addLog(`${p.name} used Scanner — no undiscovered tiles adjacent.${chargesLeft}`,'act');
    if(p.scannerCharges<=0){p.equipment.splice(ci,1);addLog('Scanner battery depleted.','act');}
    closeCardModal();render();updateUI();return;
  }
  else if(c.use==='stun_baton'){
    const targets=G.players.filter(pl=>pl.alive&&pl.id!==p.id&&pl.q===p.q&&pl.r===p.r);
    if(!targets.length){addLog('No crew on this tile to stun.','act');closeCardModal();return;}
    const applyStun=target=>{target.stunned=true;p.equipment.splice(ci,1);addLog(`${p.name} stunned ${target.name}. They skip their next turn.`,'crit');closeCardModal();updateUI();render();};
    if(targets.length===1){applyStun(targets[0]);return;}
    showModal('STUN BATON','Select a crew member to stun.',true,()=>{},'Cancel',undefined,undefined,'');
    const btns=document.createElement('div');btns.style.cssText='display:flex;flex-direction:column;gap:8px;margin-top:12px;';
    targets.forEach(tgt=>{const b=document.createElement('button');b.className='mbtn wrn';b.textContent=tgt.name;b.onclick=()=>{document.getElementById('mov').classList.remove('show');applyStun(tgt);};btns.appendChild(b);});
    document.getElementById('mact').prepend(btns);return;
  }
  else if(c.use==='flare_gun'){
    const targets=G.players.filter(pl=>{if(!pl.alive||pl.id===p.id)return false;const path=bfsPath(p.q,p.r,pl.q,pl.r);return path&&path.length<=2;});
    if(!targets.length){addLog('No crew within range of the Flare Gun.','act');closeCardModal();return;}
    const applyFlare=target=>{target.q=p.q;target.r=p.r;target.location=tileName(G.tiles.get(hk(p.q,p.r)));p.equipment.splice(ci,1);addLog(`${p.name} fired the Flare Gun — ${target.name} forced to this tile.`,'crit');closeCardModal();updateUI();render();};
    if(targets.length===1){applyFlare(targets[0]);return;}
    showModal('FLARE GUN','Select a crew member to pull to your position.',true,()=>{},'Cancel',undefined,undefined,'');
    const btns=document.createElement('div');btns.style.cssText='display:flex;flex-direction:column;gap:8px;margin-top:12px;';
    targets.forEach(tgt=>{const b=document.createElement('button');b.className='mbtn wrn';b.textContent=`${tgt.name} (${bfsPath(p.q,p.r,tgt.q,tgt.r)?.length||'?'} tiles)`;b.onclick=()=>{document.getElementById('mov').classList.remove('show');applyFlare(tgt);};btns.appendChild(b);});
    document.getElementById('mact').prepend(btns);return;
  }
  else if(c.use==='shock_trap'){
    const t=G.tiles.get(hk(p.q,p.r));if(!t){closeCardModal();return;}
    t.shockTrap=true;t.shockTrapOwner=p.id;p.equipment.splice(ci,1);
    addLog(`${p.name} placed a Shock Trap on this tile.`,'act');closeCardModal();updateUI();return;
  }
  else if(c.use==='walkie'){
    const adjacent=G.players.filter(pl=>{
      if(!pl.alive||pl.id===p.id)return false;
      return DIRS.some(([dq,dr])=>pl.q===p.q+dq&&pl.r===p.r+dr);
    });
    if(!adjacent.length){addLog('No crew on adjacent tiles.','act');closeCardModal();return;}
    const openWith=partner=>{closeCardModal();initTradeModal(p,partner);};
    if(adjacent.length===1){openWith(adjacent[0]);return;}
    showModal('WALKIE','Select a crew member to trade with.',true,()=>{},'Cancel',undefined,undefined,'');
    const btns=document.createElement('div');btns.style.cssText='display:flex;flex-direction:column;gap:8px;margin-top:12px;';
    adjacent.forEach(pl=>{const b=document.createElement('button');b.className='mbtn';b.textContent=pl.name;b.onclick=()=>{document.getElementById('mov').classList.remove('show');openWith(pl);};btns.appendChild(b);});
    document.getElementById('mact').prepend(btns);return;
  }
  else if(c.use==='jammer'){
    G.jammerActive=true;p.equipment.splice(ci,1);
    addLog(`${p.name} activated the Signal Jammer — no Signal Roll this round.`,'act');closeCardModal();updateUI();return;
  }
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
  const p=cp();
  if(G.phase!=='action'&&G.phase!=='move')return;
  if(G.signalRolled)return;
  const t=G.tiles.get(hk(p.q,p.r));if(t?.name!=='Signal Array')return;
  if(!G.radioFragmentsActivated)return;
  if(G.jammerActive){addLog('Signal Jammer active — Signal Roll blocked this round.','crit');return;}
  // Dead Zone blocks the roll if any player occupies that anomaly tile
  const deadSignalActive=G.players.some(pl=>pl.alive&&G.tiles.get(hk(pl.q,pl.r))?.anomaly==='Dead Zone');
  if(deadSignalActive){addLog('Dead Zone active — transmission blocked this round.','crit');return;}
  // RF Extraction: auto-success if this player holds a Radio Fragment
  if(p.rfExtractionActive&&p.radioFragments>0){
    addLog(`${p.name} — Radio Fragment detected. Extraction guaranteed.`,'good');
    showModal('RESCUE SIGNAL RECEIVED','',true,()=>{},undefined,undefined,undefined,
      '<div id="mov-e7log" class="mov-e7log"></div>');
    e7ScreenSeq('mov-e7log',[
      [300,'sys',`> PRIORITY SIGNAL: ${p.name}.`],
      [600,'','Manifest override confirmed.'],
      [1200,'good','> All surviving crew have been rescued.'],
    ],22);
    return;
  }
  const frags=G.radioFragmentsActivated;
  const thr=[null,18,16,14,12,10][frags];
  document.getElementById('sig-frags').textContent=`Establish rescue signal`;
  const diceEl=document.getElementById('sig-dice');diceEl.innerHTML='';
  const outEl=document.getElementById('sig-out');outEl.textContent='';
  const btn=document.getElementById('sig-btn');
  btn.textContent='Attempt Rescue Signal';btn.disabled=false;delete btn.dataset.done;
  const wraps=[];
  for(let i=0;i<3;i++){const w=make3DDie('idle');diceEl.appendChild(w);wraps.push(w);}
  function closeOv(){
    document.getElementById('sig-ov').classList.remove('show');
    updateUI();render();
  }
  btn.onclick=()=>{
    if(btn.dataset.done){closeOv();return;}
    btn.disabled=true;
    G.signalRolled=true;
    wraps.forEach(w=>{w.className='td-die-wrap';w.getBoundingClientRect();w.className='td-die-wrap rolling';});
    const finals=[1+(0|Math.random()*6),1+(0|Math.random()*6),1+(0|Math.random()*6)];
    setTimeout(()=>{
      diceEl.innerHTML='';
      const row=document.createElement('div');row.style.cssText='display:flex;gap:14px;';
      finals.forEach(v=>row.appendChild(makeResultDie(v)));
      diceEl.appendChild(row);
      const total=finals.reduce((a,b)=>a+b,0);const success=total>=thr;
      addLog(`Signal Roll: ${total} vs ${thr} — ${success?'SUCCESS':'FAIL'}`,success?'good':'crit');
      outEl.textContent=`${finals[0]} + ${finals[1]} + ${finals[2]} = ${total} · ${success?'SUCCESS':'FAIL'}`;
      outEl.style.color=success?'#50c840':'#d04040';
      btn.textContent='OK';btn.disabled=false;btn.dataset.done='1';
      if(success){
        btn.onclick=()=>{
          closeOv();
          showModal('RESCUE SIGNAL RECEIVED','',true,
            ()=>{},
            undefined,undefined,undefined,
            '<div id="mov-e7log" class="mov-e7log"></div>');
          e7ScreenSeq('mov-e7log',[
            [300,'sys','> SIGNAL RECEIVED.'],
            [500,'','Rescue craft entering orbit.'],
            [1200,'','All surviving crew have been rescued.'],
          ],22);
        };
      }
    },1500);
  };
  document.getElementById('sig-ov').classList.add('show');
  document.getElementById('bsig').disabled=true;
  const e7el=document.getElementById('sig-e7');e7el.innerHTML='';
  e7ScreenSeq('sig-e7',[
    [0,  'sys',   `> Radio Fragments: ${frags}.`],
    [600,'act',   `Roll 3 dice.`],
    [600,'act',   `You must roll a ${thr} or above to establish a rescue signal.`],
  ],18);
}

// ── BASE CAMP ACTIONS ──────────────────────────────────────────
function doEquipLocker(){
  const p=cp();if(G.phase!=='action'&&G.phase!=='move')return;
  if(G.tiles.get(hk(p.q,p.r))?.name!=='Equipment Locker')return;
  G.phase='action';
  if(G.tileActionUsed){showModal('Already Used','You have already used a tile action this turn.',true,()=>{});return;}
  cancelTooltip();
  const trov=document.getElementById('trov');
  trov.style.backgroundImage='url(img/Tiles/locker.png)';
  trov.classList.add('equip-locker');
  document.getElementById('tr-name').textContent='EQUIPMENT LOCKER';
  const deck=document.getElementById('tr-deck');
  const actionsEl=document.getElementById('tr-actions');
  actionsEl.innerHTML='';
  const cancelBtn=document.getElementById('trov-cancel');
  cancelBtn.style.display='';
  const dismiss=()=>{
    deck.onclick=null;
    cancelBtn.onclick=null;
    cancelBtn.style.display='none';
    actionsEl.innerHTML='';actionsEl.style.cssText='';
    trov.classList.remove('show','equip-locker');
    trov.style.display='none';
    trov.style.backgroundImage='';
  };
  cancelBtn.onclick=dismiss;
  trov.onclick=null;
  const hasCards=p.equipment&&p.equipment.length>0;
  const deckEmpty=G.eqDeckCount<=0;
  if(hasCards){
    // Exchange mode: select a card to discard, then draw a replacement
    deck.style.display='none';
    trDesc(deckEmpty?'The equipment deck is empty — nothing to exchange.':'Select a card to discard. It will be replaced with a new one.');
    if(!deckEmpty){
      actionsEl.style.cssText='display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:8px;';
      p.equipment.forEach(card=>{
        const d=document.createElement('div');
        d.className=`eqcard exchange-target cc-${card.cat}`;
        d.innerHTML=cardFaceHTML(card.cat,card.name,card.txt);
        d.onclick=()=>{
          const ci=p.equipment.findIndex(c=>c.uid===card.uid);
          if(ci>=0){p.equipment.splice(ci,1);G.eqDeckCount++;}// return card to deck
          dismiss();
          const newCard=drawEqCard(p);
          G.tileActionUsed=true;
          if(newCard){
            addLog(`${p.name} exchanged ${card.name} → ${newCard.name}.`,'good');
            openCardModal(p.id,newCard,'url(img/Tiles/locker.png)');
          } else {
            addLog(`${p.name} discarded ${card.name} — deck is now empty.`);
          }
          updateUI();
        };
        actionsEl.appendChild(d);
      });
    }
  } else {
    // Draw mode: no existing cards, just draw one
    trDesc(deckEmpty?'The equipment deck is empty.':'Draw 1 card from the equipment deck.');
    document.getElementById('tr-evtn').textContent=G.eqDeckCount;
    document.getElementById('tr-deck-lbl').textContent='Draw Equipment Card';
    deck.style.display=deckEmpty?'none':'';
    deck.onclick=()=>{
      dismiss();
      const c=drawEqCard(p);
      G.tileActionUsed=true;
      if(c){
        addLog(`${p.name} drew ${c.name} from Equipment Locker.`,'good');
        openCardModal(p.id,c,'url(img/Tiles/locker.png)');
      } else {addLog('Equipment Locker: deck empty.');}
      updateUI();
    };
  }
  trov.style.display='flex';
  trov.classList.add('show');
}
function doCargo(){
  const p=cp();if(G.phase!=='action'&&G.phase!=='move')return;
  if(G.tiles.get(hk(p.q,p.r))?.name!=='Cargo Hold')return;
  G.phase='action';
  renderCargoModal();
}
function renderCargoModal(){
  const p=cp();
  const hold=G.cargoHold||0;
  const cap=10-p.food;// room on player
  const body=`Hold: ${hold} Food\nYours: ${p.food} Food\n\nChoose action:`;
  const mov=document.getElementById('mov');
  mov.classList.add('cargo');
  const ma=document.getElementById('mact');
  document.getElementById('mtit').textContent='Cargo Hold';
  document.getElementById('mbod').textContent=body;
  ma.innerHTML='';
  // Deposit 1
  const d1=document.createElement('button');d1.className='mbtn';d1.textContent='Deposit 1';d1.disabled=p.food<=0;
  d1.onclick=()=>{if(p.food>0){p.food--;G.cargoHold=(G.cargoHold||0)+1;addLog(`${p.name} deposited 1 Food. Hold: ${G.cargoHold}.`);updateUI();}renderCargoModal();};
  // Withdraw 1
  const w1=document.createElement('button');w1.className='mbtn wrn';w1.textContent='Withdraw 1';w1.disabled=hold<=0||cap<=0;
  w1.onclick=()=>{if(hold>0&&cap>0){G.cargoHold--;p.food++;addLog(`${p.name} withdrew 1 Food. Hold: ${G.cargoHold}.`);updateUI();}renderCargoModal();};
  // Close
  const cl=document.createElement('button');cl.className='mbtn pri';cl.textContent='Done';
  cl.onclick=()=>{const m=document.getElementById('mov');m.classList.remove('show','cargo');};
  ma.appendChild(d1);ma.appendChild(w1);ma.appendChild(cl);
  document.getElementById('mov').classList.add('show');
}
function doWatchTower(){
  const p=cp();if(G.phase!=='action'&&G.phase!=='move')return;
  if(G.tiles.get(hk(p.q,p.r))?.name!=='Watch Tower')return;
  G.phase='action';
  const inField=G.players.filter(x=>x.alive&&G.tiles.get(hk(x.q,x.r))?.type!=='crash_site');
  let msg;
  if(!inField.length){
    msg='No crew are currently in the field.\n\nThere are no tiles to reveal.';
  } else {
    let revealed=0;
    inField.forEach(fp=>{
      hnbr(fp.q,fp.r).forEach(([nq,nr])=>{
        const nt=G.tiles.get(hk(nq,nr));
        if(nt&&!nt.revealed){revealAt(nq,nr);revealed++;}
      });
    });
    const names=inField.map(x=>x.name).join(', ');
    addLog(`Watch Tower: ${revealed} tile${revealed!==1?'s':''} revealed around ${names}.`,'tile');
    msg=`Scanning terrain around ${names}.\n\n${revealed} tile${revealed!==1?'s':''} revealed.`;
    render();updateUI();
  }
  cancelTooltip();
  const trov=document.getElementById('trov');
  trov.style.backgroundImage='url(img/Tiles/watch-tower.png)';
  trov.classList.add('watch-tower');
  document.getElementById('tr-name').textContent='WATCH TOWER';
  trDesc(msg);
  const deck=document.getElementById('tr-deck');
  deck.style.display='none';
  const dismiss=()=>{
    trov.onclick=null;
    trov.classList.remove('show','anomaly-mode','watch-tower');
    trov.style.display='none';
    trov.style.backgroundImage='';
  };
  trov.classList.add('anomaly-mode');
  trov.onclick=e=>{if(e.target===trov)dismiss();};
  trov.style.display='flex';
  trov.classList.add('show');
}

function doEndTurn(){
  if(G.phase==='roll')return;
  const p=cp();const curTile=G.tiles.get(hk(p.q,p.r));const onBase=curTile?.type==='crash_site';
  // Stasis: skip all depletion
  if(p.inStasis){
    if(curTile?.anomaly!=='Stasis Pod'){p.inStasis=false;}
    else{advanceTurn();return;}
  }
  if(p.food>0)p.food--;
  else{if(p.health>0)p.health--;addLog(`${p.name} is starving. Health: ${p.health}/3.`,'crit');}
  if(!onBase&&!p.skipO2){
    const hasRebreather=p.equipment.some(c=>c.id==='rebreather');
    if(hasRebreather){p.rebreatherCycle=!p.rebreatherCycle;}
    if(!hasRebreather||p.rebreatherCycle){
      if(p.o2>0)p.o2--;
      else{if(p.health>0)p.health--;addLog(`${p.name} has no O₂. Health: ${p.health}/3.`,'crit');}
    }
  }
  p.skipO2=false;
  if(p.health===0&&p.alive){p.incapacitated++;
    if(p.incapacitated>=2){p.alive=false;addLog(`${p.name} has DIED.`,'crit');}
    else addLog(`${p.name} is INCAPACITATED (${p.incapacitated}/2).`,'crit');}
  // Signal Array occupancy tracking
  if(curTile?.name==='Signal Array'){
    p.signalArrayRounds++;
    if(p.soloRescueActive&&p.signalArrayRounds>=3){
      showDieRoll(`${p.name} — Solo Extraction attempt. Roll 6 or higher to be rescued alone.`,val=>{
        addLog(`${p.name} solo rescue: rolled ${val}.`,val>=6?'good':'crit');
        if(val>=6){
          p.alive=false;
          showModal('SOLO EXTRACTION','',true,()=>{advanceTurn();},undefined,undefined,undefined,
            '<div id="mov-e7log" class="mov-e7log"></div>');
          e7ScreenSeq('mov-e7log',[
            [300,'sys',`> SIGNAL ISOLATED: ${p.name}.`],
            [600,'','Rescue craft locked on single life sign.'],
            [1200,'good',`> ${p.name} has been extracted. The others remain.`],
          ],22);
          return`Rolled ${val} — EXTRACTED.`;
        }
        return`Rolled ${val} — signal not strong enough. Remain on the array.`;
      },()=>advanceTurn());
      return;
    }
  } else {
    p.signalArrayRounds=0;
  }
  advanceTurn();
}

function advanceTurn(){
  const alive=G.players.filter(p=>p.alive);if(!alive.length){
    showModal('ALL CREW LOST','',true,()=>{clearSave();location.reload();},'End Mission',undefined,undefined,'<div id="mov-e7log" class="mov-e7log"></div>');
    e7ScreenSeq('mov-e7log',[
      [200,'crit','> LIFE SIGN MONITOR: no signals detected.'],
      [600,'sys','> INITIATING FAILSAFE PROTOCOL.'],
      [800,'','Rebooting Signal Array...'],
      [1000,'sys','> SIGNAL RESTORED.'],
      [700,'','Recommending salvage operations.'],
    ],20);
    return;
  }
  let next=(G.currentPlayer+1)%G.players.length,tries=0;
  while(!G.players[next].alive&&tries++<G.players.length)next=(next+1)%G.players.length;
  if(next<=G.currentPlayer){G.turn++;G.jammerActive=false;}
  G.currentPlayer=next;viewedPlayer=next;eqGalleryOffset=0;G.phase='roll';G.movementLeft=0;G.reach=new Map();G.tileActionUsed=false;G.excavatorMode=false;G.signalRolled=false;
  G.players[next].scannerUsed=false;
  if(G.players[next].stunned){
    G.players[next].stunned=false;
    addLog(`${G.players[next].name} is stunned — skipping turn.`,'crit');
    advanceTurn();return;
  }
  addLog(`Turn ${G.turn}: ${G.players[next].name}.`,'act');
  showTableDice('move');
  updateUI();render();
}

function triggerAnomaly(t){
  const p=cp();
  t.investigatedCount=1;
  switch(t.anomaly){
    case'Temporal Rift':
      showTileRevealModal(t,()=>{updateUI();render();});break;
    case'Portal':showTileRevealModal(t,()=>{updateUI();render();});break;
    case'Dead Zone':addLog('Dead Zone: transmission blocked. No Signal Roll can be made while this tile is occupied.');updateUI();break;
    case'Gravitational Well':
      showTileRevealModal(t,()=>{updateUI();render();});break;
    case'Echo Chamber':{
      if(!G.lastPublicEvt){addLog('Echo Chamber: no prior public event to repeat.','act');break;}
      const evt=G.lastPublicEvt;
      if(evt.rf){p.radioFragments++;addLog(`${p.name} found a Radio Fragment! (Echo Chamber)`,'frag');}
      if(evt.drawEq){const c=drawEqCard(p);if(c)addLog(`${p.name} drew ${c.name}. (Echo Chamber)`,'good');}
      if(evt.gainFood){p.food=Math.min(10,p.food+evt.gainFood);}
      if(evt.takeAllCargo){const taken=Math.min(10-p.food,G.cargoHold||0);p.food+=taken;G.cargoHold-=taken;if(taken>0)addLog(`${p.name} took ${taken} Food from the Cargo Hold.`,'good');}
      if(evt.loseFood){const lost=Math.min(p.food,evt.loseFood);p.food-=lost;addLog(`${p.name} lost ${lost} Food. (Echo Chamber)`,'crit');}
      if(evt.skipO2){p.skipO2=true;}
      let rollCb=null;
      if(evt.rollFood){rollCb=r=>{const g=Math.min(10-p.food,r);p.food+=g;addLog(`Echo Chamber loot roll: ${r} — +${g} Food.`,g?'good':'');return`Rolled ${r} — gained ${g} Food.`;};}
      else if(evt.rollWreckage){rollCb=r=>{if(r<=3){addLog(`Echo Chamber wreckage: ${r} — nothing.`);return`Rolled ${r} — nothing.`;}if(r<=5){const g=Math.min(10-p.food,1);p.food+=g;addLog(`Echo Chamber wreckage: ${r} — +1 Food.`,'good');return`Rolled ${r} — 1 Food.`;}const c=drawEqCard(p);const msg=c?`drew ${c.name}.`:'deck empty.';addLog(`Echo Chamber wreckage: 6 — ${msg}`,'good');return`Rolled 6 — ${msg}`;};}
      const ecOv=document.getElementById('evc-ov');
      ecOv.style.backgroundImage='url(img/Tiles/echo-chamber.png)';
      ecOv.style.backgroundSize='cover';ecOv.style.backgroundPosition='center';
      showEventCard(evt,'Echo Chamber',()=>{updateUI();render();},rollCb);
      break;
    }
    case'Inversion Field':{
      const others=G.players.filter(pl=>pl.alive&&pl.id!==p.id);
      if(!others.length){addLog('Inversion Field: no other players to swap with.','act');break;}
      const body='Gravity inversion — choose a crew member to swap Food with, or decline.';
      const extraBtns=document.createElement('div');extraBtns.style.cssText='display:flex;flex-direction:column;gap:8px;margin-top:12px;';
      others.forEach(other=>{
        const b=document.createElement('button');b.className='mbtn';
        b.textContent=`Swap with ${other.name} (${other.food} Food)`;
        b.onclick=()=>{
          document.getElementById('mov').classList.remove('show');
          const tmp=p.food;p.food=other.food;other.food=tmp;
          addLog(`Inversion Field: ${p.name} swapped Food with ${other.name}.`,'crit');
          updateUI();render();
        };
        extraBtns.appendChild(b);
      });
      showModal('INVERSION FIELD',body,true,()=>{addLog(`${p.name} declined the Inversion Field.`);updateUI();render();},'Decline',undefined,undefined,'');
      document.getElementById('mact').prepend(extraBtns);
      break;
    }
    case'Stasis Pod':{
      if(p.inStasis){
        showModal('STASIS POD','You are in stasis. Resource depletion is suspended. Exit stasis?',true,
          ()=>{p.inStasis=false;addLog(`${p.name} exited stasis.`,'act');updateUI();render();},
          'Exit Stasis',
          ()=>{updateUI();render();},'Stay in Stasis');
      } else {
        showModal('STASIS POD','Alien preservation technology. Enter stasis to suspend all resource depletion. You cannot take actions while in stasis. Exit any time by choosing to leave.',true,
          ()=>{p.inStasis=true;addLog(`${p.name} entered stasis.`,'act');updateUI();render();},
          'Enter Stasis',
          ()=>{updateUI();render();},'Decline');
      }
      break;
    }
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
  tradeState={pA,pB,stagedAtoB:new Set(),stagedBtoA:new Set(),aFood:0,bFood:0,aO2:0,bO2:0};
  renderTradeModal();
  document.getElementById('trademodal').classList.add('show');
}

function renderTradeModal(){
  if(!tradeState)return;
  const{pA,pB,stagedAtoB,stagedBtoA,aFood,bFood,aO2,bO2}=tradeState;
  const body=document.getElementById('trbody');
  body.innerHTML='';
  [pA,pB].forEach((p,side)=>{
    const isA=side===0;
    const staged=isA?stagedAtoB:stagedBtoA;
    const otherStaged=isA?stagedBtoA:stagedAtoB;
    const panel=document.createElement('div');panel.className='trpanel';
    // Portrait + name
    const nameRow=document.createElement('div');
    nameRow.style.cssText='display:flex;align-items:flex-end;gap:10px;margin-bottom:10px';
    const portEl=document.createElement('div');
    portEl.style.cssText=portBg(p.portrait,104,104)+'border:1px solid '+p.color+';border-radius:3px;flex-shrink:0';
    const nameBlock=document.createElement('div');
    nameBlock.style.cssText='display:flex;flex-direction:column;gap:6px;padding-bottom:2px';
    const nameSpan=document.createElement('span');
    nameSpan.className='trpname';nameSpan.style.color=p.color;nameSpan.textContent=p.name;
    function makeToks(full,total,fc,ec){const r=document.createElement('div');r.className='tokrow';for(let i=0;i<total;i++){const s=document.createElement('span');s.className=`tok ${i<full?fc:ec}`;r.appendChild(s);}return r;}
    const foodGrid=document.createElement('div');foodGrid.className='tokgrid';
    for(let i=0;i<10;i++){const s=document.createElement('span');s.className=`tok ${i<p.food?'rf':'re'}`;foodGrid.appendChild(s);}
    const o2Row=makeToks(p.o2,3,'of','oe');
    const hpRow=makeToks(p.health,3,'hf','he');
    nameBlock.appendChild(nameSpan);nameBlock.appendChild(foodGrid);nameBlock.appendChild(o2Row);nameBlock.appendChild(hpRow);
    nameRow.appendChild(portEl);nameRow.appendChild(nameBlock);
    panel.appendChild(nameRow);
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
      card.className='eqcard cc-'+c.cat+(isStaged?' staged':'');
      card.draggable=true;
      card.innerHTML=cardFaceHTML(c.cat,c.name,c.txt);
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
      card.className='eqcard cc-'+c.cat+' incoming';
      card.innerHTML=cardFaceHTML(c.cat,c.name,c.txt);
      eqArea.appendChild(card);
    });
    panel.appendChild(eqArea);
    // Resource controls
    const ratGive=isA?aFood:bFood;
    const o2Give=isA?aO2:bO2;
    const foodMax=p.food;
    const o2Max=p.o2;
    const resDiv=document.createElement('div');
    resDiv.style.marginTop='10px';
    resDiv.innerHTML=`
      <div class="trresrow"><label>Give Food</label>
        <button class="trbtn" onclick="trAdj('${isA?'aFood':'bFood'}',-1)">−</button>
        <span class="trcnt">${ratGive}</span>
        <button class="trbtn" onclick="trAdj('${isA?'aFood':'bFood'}',1)">+</button>
        <span style="font-size:.58rem;color:var(--dim)">/ ${foodMax}</span>
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
  const maxMap={aFood:pA.food,bFood:pB.food,aO2:pA.o2,bO2:pB.o2};
  tradeState[field]=Math.max(0,Math.min(maxMap[field],tradeState[field]+delta));
  renderTradeModal();
}

function confirmTrade(){
  if(!tradeState)return;
  const{pA,pB,stagedAtoB,stagedBtoA,aFood,bFood,aO2,bO2}=tradeState;
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
  pA.food=Math.max(0,Math.min(10,pA.food-aFood+bFood));
  pB.food=Math.max(0,Math.min(10,pB.food-bFood+aFood));
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
let pan={x:0,y:0},zoom=2;
let sbPan={x:0,y:0},sbZoom=1,sbEventsInit=false;
let usesTrackpad=false;
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
    const poly=svgEl('polygon',{points:hexPoly,fill:'transparent',stroke:'#0c1d35','stroke-width':'1',style:'cursor:pointer','data-q':t.q,'data-r':t.r});
    poly.addEventListener('click',()=>onHexClick(t.q,t.r));
    poly.addEventListener('mouseenter',e=>startTooltip(t,e));
    poly.addEventListener('mouseleave',cancelTooltip);
    g.appendChild(poly);
    const plus=svgEl('text',{'x':cx,'y':cy+6,'text-anchor':'middle','font-family':'Courier New,monospace','font-size':'18','fill':'#2a70d0','opacity':'.6','pointer-events':'none'});
    plus.textContent='＋';
    g.appendChild(plus);
    return;
  }

  const strokeC=t.type==='anomaly'?'#6a28a8':t.type==='crash_site'?'#b2dbee':'none';
  const sw='1.5';
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
  // Undiscovered overlay: revealed by Watch Tower but not yet visited
  if(t.revealed&&!t.investigatedCount&&(t.type==='terrain'||t.type==='anomaly'||t.type==='ship_section'))
    g.appendChild(svgEl('polygon',{points:hexPoly,fill:'rgba(20,50,100,0.55)','pointer-events':'none'}));

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
const BASECAMP_ICON_MAP={
  'Crash Site':         'rocket-solid-full.svg',
  'Medical Bay':        'heart-solid-full.svg',
  'Signal Array':       'satellite-dish-solid-full.svg',
  'Watch Tower':        'eye-solid-full.svg',
  'Equipment Locker':   'wrench-solid-full.svg',
  'Airlock':            'mask-ventilator-solid-full.svg',
  'Cargo Hold':         'cubes-solid-full.svg',
};

function drawTileArtwork(g,cx,cy,t){
  if(t.type==='terrain'&&t.radioFragment){
    const poi=t.pois?.[0];
    if(poi==='Dead Tower'||poi==='Collapsed Tower'){
      g.appendChild(svgEl('circle',{cx:cx+18,cy:cy-20,r:5,fill:'#1a4010',stroke:'#60c040','stroke-width':'1.2','pointer-events':'none'}));
      lbl(g,cx+18,cy-17,'RF','5.5','#60c040');
    }
  }
  if(t.type==='crash_site'){
    const icon=BASECAMP_ICON_MAP[t.name];
    if(icon){
      const filterId='basecamp-icon-tint';
      const svgDefs=document.getElementById('bsvg').querySelector('defs');
      if(!svgDefs.querySelector(`#${filterId}`)){
        const filt=svgEl('filter',{id:filterId,x:'0',y:'0',width:'1',height:'1'});
        const flood=svgEl('feFlood',{'flood-color':'#b2dbee',result:'color'});
        const comp=svgEl('feComposite',{in:'color',in2:'SourceGraphic',operator:'in'});
        filt.appendChild(flood);filt.appendChild(comp);
        svgDefs.appendChild(filt);
      }
      const sz=28;
      g.appendChild(svgEl('image',{
        href:`img/Icons/${icon}`,
        x:cx-sz/2, y:cy-sz/2,
        width:sz, height:sz,
        opacity:'0.55',
        filter:`url(#${filterId})`,
        'pointer-events':'none',
      }));
    }
    if(t.name==='Signal Array'&&G?.radioFragmentsActivated){
      lbl(g,cx,cy+22,`${G.radioFragmentsActivated}/5`,'7','#60c040');
    }
  }
}

function drawTileLabel(){
  // no text labels on any tiles
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
  if(p.id===G.currentPlayer){
    if(!document.getElementById('beacon-style')){
      const s=document.createElement('style');s.id='beacon-style';
      s.textContent='@keyframes beacon{0%{r:13;opacity:.6;stroke-width:1.5}100%{r:26;opacity:0;stroke-width:.4}}';
      document.head.appendChild(s);
    }
    const beacon=svgEl('circle',{cx:px,cy:py,r:13,fill:'none',stroke:p.color,'stroke-width':'1.5',opacity:'.6','pointer-events':'none'});
    beacon.style.animation='beacon 1.6s ease-out infinite';
    g.appendChild(beacon);
  }
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
  const steps=TILE_TIPS[key]||[[0,'','Unknown terrain.']];
  const title=t.name||(t.type==='anomaly'?t.anomaly:t.type==='ship_section'?'Ship Section':t.pois&&t.pois.length?t.pois.join(' · '):'Unknown');
  document.getElementById('tiptit').textContent=title.toUpperCase();
  const descSteps=steps.filter(([,cls])=>cls==='');
  const actSteps=steps.filter(([,cls])=>cls!=='');
  document.getElementById('tipdesc').textContent=t.type==='face_down'?'Face-down tile. Enter to reveal what lies ahead.':descSteps.map(([,,msg])=>msg).join('\n');
  const TOOL_NAMES={lockpick:'Lockpick',plasma_cutter:'Plasma Cutter',data_spike:'Data Spike'};
  const toolNote=t.requiresTool&&(t.radioFragment||t.toolReward)?`\n*Requires ${TOOL_NAMES[t.requiresTool]||t.requiresTool}`:'';
  document.getElementById('tipact').textContent=t.type==='face_down'?'':(actSteps.map(([,,msg])=>msg).join('\n')+toolNote);
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

function startBuilderTooltip(info,e){
  tipMx=e.clientX;tipMy=e.clientY;
  clearTimeout(tipTimer);
  const fakeTile={name:info.name,type:'crash_site',q:info.q,r:info.r};
  tipTimer=setTimeout(()=>showHexTip(fakeTile),600);
  document.getElementById('sbsvg').addEventListener('mousemove',trackMouse,{passive:true});
}
function cancelBuilderTooltip(){
  clearTimeout(tipTimer);
  document.getElementById('htip').classList.remove('show');
  document.getElementById('sbsvg').removeEventListener('mousemove',trackMouse);
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

function saveGame(){
  if(!G)return;
  try{
    const s={
      G:{...G,
        tiles:[...G.tiles.entries()],
        reach:[],                          // transient — recalculated
        terrainDeck:[...G.terrainDeck],
        eqDeck:[...G.eqDeck],
      },
      cardUid,viewedPlayer,pendingNames,pendingPortraits
    };
    s.G.players=G.players.map(p=>({...p,equipment:[...p.equipment]}));
    localStorage.setItem('signal_save',JSON.stringify(s));
  }catch(e){}
}
function loadGame(){
  try{
    const raw=localStorage.getItem('signal_save');
    if(!raw)return false;
    const s=JSON.parse(raw);
    const sg=s.G;
    sg.tiles=new Map(sg.tiles);
    sg.reach=new Map();
    G=sg;
    cardUid=s.cardUid||0;
    viewedPlayer=s.viewedPlayer||0;
    pendingNames=s.pendingNames||[];
    pendingPortraits=s.pendingPortraits||[];
    return true;
  }catch(e){return false;}
}
function clearSave(){localStorage.removeItem('signal_save');}
function confirmNewGame(){
  let countdownInterval=null;
  const doNewGame=()=>{clearInterval(countdownInterval);clearSave();location.reload();};
  const doAbort=()=>{clearInterval(countdownInterval);};
  showModal('SELF-DESTRUCT','',true,doNewGame,'Self-destruct',doAbort,'Abort','<div id="ng-e7log" class="mov-e7log"></div>','dng');
  e7ScreenSeq('ng-e7log',[
    [0,   'crit','> SELF-DESTRUCT SEQUENCE INITIATED.'],
    [600, '',    'This ship will self-destruct in:'],
  ],14);
  const introMs=(37+32)*14+700;
  setTimeout(()=>{
    const container=document.getElementById('ng-e7log');
    if(!container)return;
    const el=document.createElement('div');
    el.className='e7m crit';
    let count=10;
    el.textContent=String(count);
    container.appendChild(el);
    container.scrollTop=container.scrollHeight;
    countdownInterval=setInterval(()=>{
      count--;
      if(count>0){
        el.textContent=String(count);
      } else {
        el.textContent='> DETONATION IMMINENT.';
        clearInterval(countdownInterval);
        setTimeout(doNewGame,1200);
      }
    },900);
  },introMs);
}
function updateUI(){
  if(!G)return;
  saveGame();
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
  buildTokGrid('htr',v.food,10,'rf','re',2,5);
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
  const actOrMove=act||G.phase==='move';
  const atArr=t?.name==='Signal Array';
  const show=v=>v?'':'none';
  document.getElementById('bequip').style.display=  show(t?.name==='Equipment Locker');
  document.getElementById('bcargo').style.display=  show(t?.name==='Cargo Hold');
  document.getElementById('bwatch').style.display=  show(t?.name==='Watch Tower');
  document.getElementById('bequip').disabled=  !(actOrMove&&t?.name==='Equipment Locker'&&!G.tileActionUsed);
  document.getElementById('bcargo').disabled=  !(actOrMove&&t?.name==='Cargo Hold');
  document.getElementById('bwatch').disabled=  !(actOrMove&&t?.name==='Watch Tower');
  document.getElementById('bfrag').style.display= show(atArr);
  document.getElementById('bsig').style.display=  show(atArr);
  document.getElementById('bfrag').disabled=!(act&&atArr&&p.radioFragments>0&&G.radioFragmentsActivated<5);
  document.getElementById('bsig').disabled=!((act||G.phase==='move')&&atArr&&G.radioFragmentsActivated>0&&!G.signalRolled);
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
const CAT_ICONS={Tool:'wrench-solid-full.svg',Supply:'cubes-solid-full.svg',Tech:'microchip-solid-full.svg',Weapon:'gun-solid-full.svg'};
function catIconStyle(cat){const f=CAT_ICONS[cat];return f?`style="--eq-icon-url:url('img/Icons/${f}')"`:'';
}
function cardFaceHTML(cat,name,txt,brand='◆  ENDYMION 7  ◆'){
  const iconHtml=CAT_ICONS[cat]?`<span class="eq-icon" ${catIconStyle(cat)}></span>`:'';
  return `<div class="eqcard-inner">
    ${iconHtml}
    <div class="eqdivider"></div>
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
function openCardModal(playerIdx,c,bgImage){
  const isOwner=playerIdx===G.currentPlayer;
  // set category CSS vars on the overlay card
  const card=document.getElementById('evc');
  const ov=document.getElementById('evc-ov');
  ov.style.backgroundImage=bgImage||'';ov.style.backgroundSize='cover';ov.style.backgroundPosition='center';
  ov.className=`cc-${c.cat}`;
  card.className='evc eq';
  const badge=document.getElementById('evc-badge');
  const iconHtml=CAT_ICONS[c.cat]?`<span class="evc-cat-icon" ${catIconStyle(c.cat)}></span>`:'';
  badge.innerHTML=iconHtml||c.cat.toUpperCase();
  document.getElementById('evc-loc').textContent=c.name;
  document.getElementById('evc-body').textContent=c.txt;
  const pills=document.getElementById('evc-pills');pills.innerHTML='';
  if(c.use&&isOwner){
    const b=document.createElement('button');
    b.className='mbtn wrn';b.textContent='Use Card';
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
  document.getElementById('evc-ov').style.backgroundImage='';
}

// ═══════════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════════
function showModal(title,body,isPub,onOk,okLbl,onCancel,cancelLbl,extraHtml,okClass){
  const mov=document.getElementById('mov');
  const isRescue=title==='RESCUE SIGNAL RECEIVED';
  const isAllDead=title==='ALL CREW LOST';
  const isNewGame=title==='SELF-DESTRUCT';
  const isStasis=title==='STASIS POD';
  const isInversion=title==='INVERSION FIELD';
  mov.classList.toggle('rescue',isRescue);
  mov.classList.toggle('all-dead',isAllDead);
  mov.classList.toggle('new-game',isNewGame);
  mov.classList.toggle('stasis-pod',isStasis);
  mov.classList.toggle('inversion-field',isInversion);
  document.getElementById('mtit').textContent=title;
  const mb=document.getElementById('mbod');mb.innerHTML='';
  if(!isPub){const n=document.createElement('div');n.className='pvnote';n.textContent='PRIVATE — read silently. Show only to crew on your tile.';mb.appendChild(n);}
  if(extraHtml){const xh=document.createElement('div');xh.innerHTML=extraHtml;mb.appendChild(xh);}
  const tb=document.createElement('div');tb.textContent=body;mb.appendChild(tb);
  const ma=document.getElementById('mact');ma.innerHTML='';
  if(onCancel&&cancelLbl){const b=document.createElement('button');b.className='mbtn';b.textContent=cancelLbl;
    b.onclick=()=>{document.getElementById('mov').classList.remove('show');onCancel();};ma.appendChild(b);}
  const ob=document.createElement('button');ob.className=`mbtn ${okClass||'pri'}`;ob.textContent=okLbl||'OK';
  ob.onclick=()=>{document.getElementById('mov').classList.remove('show');onOk();};ma.appendChild(ob);
  document.getElementById('mov').classList.add('show');
}

// ═══════════════════════════════════════════════════════════════
// EVENT CARD
// ═══════════════════════════════════════════════════════════════
function showDieRoll(prompt, onRoll, onDismiss, bgImage){
  const ov=document.getElementById('evc-ov');
  ov.className='';ov.style.backgroundImage=bgImage||'';ov.style.backgroundSize='cover';ov.style.backgroundPosition='center';
  const card=document.getElementById('evc');card.className='evc pub';
  document.getElementById('evc-badge').textContent='ROLL';
  document.getElementById('evc-loc').textContent='';
  document.getElementById('evc-body').textContent=prompt;
  document.getElementById('evc-pills').innerHTML='';
  const outEl=document.getElementById('evc-outcome');outEl.style.display='none';
  const dieEl=document.getElementById('evc-die');
  const btn=document.getElementById('evc-btn');
  btn.className='';btn.textContent='OK';btn.disabled=true;btn.style.opacity='.35';
  dieEl.innerHTML='';dieEl.style.display='flex';
  const wrap=make3DDie('idle');
  dieEl.appendChild(wrap);
  wrap.onclick=()=>{
    wrap.className='td-die-wrap rolling';wrap.onclick=null;
    const val=1+(0|Math.random()*6);
    setTimeout(()=>{
      dieEl.innerHTML='';
      const res=document.createElement('div');res.className='evc-die-result';
      res.appendChild(makeResultDie(val));dieEl.appendChild(res);
      const outcome=onRoll(val);
      if(outcome){outEl.textContent=outcome;outEl.style.display='';}
      updateUI();
      btn.disabled=false;btn.style.opacity='';
    },1500);
  };
  btn.onclick=()=>{ov.classList.remove('show');document.getElementById('evc-ov').style.backgroundImage='';if(onDismiss)onDismiss();else{updateUI();render();}};
  cancelTooltip();
  ov.classList.add('show');
}

function showEventCard(evt, _locName, onOk, rollCallback){
  const isPub=evt.pub;
  const card=document.getElementById('evc');
  card.className='evc '+(isPub?'pub':'priv');
  const evtBadge=document.getElementById('evc-badge');
  const evtIcon=isPub?'group-solid-full.svg':'person-solid-full.svg';
  const evtLbl=isPub?'PUBLIC EVENT':'PRIVATE EVENT';
  evtBadge.innerHTML=`<span class="evc-cat-icon" style="--eq-icon-url:url('img/Icons/${evtIcon}')"></span>`;
  document.getElementById('evc-loc').textContent=evtLbl;
  const body=document.getElementById('evc-body');
  if(Array.isArray(evt.text)){
    body.innerHTML='';
    evt.text.forEach(line=>{const d=document.createElement('div');d.textContent=line;body.appendChild(d);});
  } else {body.textContent=evt.text;}
  const pills=document.getElementById('evc-pills');pills.innerHTML='';
  function addPill(txt,cls){const p=document.createElement('div');p.className='evc-pill '+cls;p.textContent=txt;pills.appendChild(p);}
  if(evt.rf)           addPill('+ Radio Fragment','good');
  if(evt.drawEq)       addPill('+ Equipment Card','good');
  if(evt.drawEqHidden) addPill('+ Equipment Card','good');
  if(evt.gainFood)   addPill('+ '+evt.gainFood+' Food','good');
  if(evt.takeAllCargo) addPill('+ Food (Cargo)','good');
  if(evt.rollFood)  addPill('Roll for Food','good');
  if(evt.rollWreckage) addPill('Roll: Wreckage','good');
  if(evt.loseFood)   addPill('\u2212 '+evt.loseFood+' Food','bad');
  if(evt.loseHealth)   addPill('\u2212 1 Health','bad');
  if(evt.skipO2)       addPill('O\u2082 Spared','good');
  const outEl=document.getElementById('evc-outcome');
  outEl.style.display='none';
  const dieEl=document.getElementById('evc-die');
  const btn=document.getElementById('evc-btn');
  btn.className='';
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
  btn.onclick=()=>{ov.classList.remove('show');document.getElementById('evc-ov').style.backgroundImage='';onOk();};
  cancelTooltip();
  ov.classList.add('show');
}

// ═══════════════════════════════════════════════════════════════
// TERMINAL SYSTEM — unified rendering for all terminal elements
// ═══════════════════════════════════════════════════════════════

// Type text character-by-character into el; auto-scrolls parent container
function e7Type(el,msg,charDelay=15){
  el.textContent='';
  for(let i=0;i<msg.length;i++)
    setTimeout(()=>{el.textContent=msg.slice(0,i+1);const p=el.parentElement;if(p)p.scrollTop=p.scrollHeight;},i*charDelay);
}
// Append a colored line to any terminal container
// cls: 'sys'|'good'|'act'|'crit'|'imp'|'frag'|'tile'|''   base: 'e7m' (voice) or 'le' (log entry)
function termAppend(container,msg,cls='',charDelay=15,base='e7m'){
  const d=document.createElement('div');
  d.className=base+(cls?' '+cls:'');
  container.appendChild(d);
  container.scrollTop=container.scrollHeight;
  e7Type(d,msg,charDelay);
}
// Append a divider to any terminal container
function termDiv(container){
  const d=document.createElement('div');d.className='e7div';
  container.appendChild(d);container.scrollTop=container.scrollHeight;
}
// Run a timed sequence into any terminal container
// steps: [[gapMs, cls, msg], ...]
// cls: 'sys'|'good'|'act'|'crit'|'imp'|'' for e7m voice lines
//      'log'|'log-act'|'log-good'|'log-imp' for compact le log lines
//      'div' for a divider (msg ignored)
function termSeq(container,steps,charDelay=15){
  let t=0;
  steps.forEach(([gap,cls,msg])=>{
    t+=gap;
    if(cls==='div'){
      const at=t;setTimeout(()=>termDiv(container),at);
    } else {
      const isLog=cls==='log'||cls.startsWith('log-');
      const base=isLog?'le':'e7m';
      const c=isLog?cls.replace(/^log-?/,''):cls;
      const at=t;
      setTimeout(()=>termAppend(container,msg,c,charDelay,base),at);
      t+=msg.length*charDelay;
    }
  });
}
// Convenience wrappers — all existing call sites unchanged
function addE7(msg,cls='',charDelay=15){termAppend(document.getElementById('e7log'),msg,cls,charDelay);}
function addLog(msg,cls='',charDelay=15){termAppend(document.getElementById('e7log'),msg,cls,charDelay,'le');}
function addE7Div(){termDiv(document.getElementById('e7log'));}
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
  if(p.classList.contains('show')){const l=document.getElementById('e7log');l.scrollTop=l.scrollHeight;updateE7Prompt();}
}
function e7Seq(steps,charDelay=15){termSeq(document.getElementById('e7log'),steps,charDelay);}
function e7ScreenSeq(containerId,steps,charDelay=20){const c=document.getElementById(containerId);if(c)termSeq(c,steps,charDelay);}
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
  wrap.addEventListener('mousedown',e=>{if(e.button!==2&&e.button!==1)return;e.preventDefault();dragging=true;df={x:e.clientX,y:e.clientY};svg.classList.add('drag');});
  wrap.addEventListener('contextmenu',e=>{e.preventDefault();});
  document.addEventListener('mousemove',e=>{if(!dragging||!df)return;pan.x+=e.clientX-df.x;pan.y+=e.clientY-df.y;df={x:e.clientX,y:e.clientY};render();});
  document.addEventListener('mouseup',e=>{if(e.button!==2&&e.button!==1)return;dragging=false;df=null;svg.classList.remove('drag');});
  wrap.addEventListener('wheel',e=>{
    e.preventDefault();
    if(e.ctrlKey){zoom=Math.max(.3,Math.min(3,zoom*(e.deltaY>0?.985:1.015)));render();return;}
    if(usesTrackpad){pan.x-=e.deltaX;pan.y-=e.deltaY;render();return;}
    zoom=Math.max(.3,Math.min(3,zoom*(e.deltaY>0?.88:1.13)));render();
  },{passive:false});
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
  {name:'Medical Bay',     short:'MED',  desc:'On entry: restore 1 Health token automatically.'},
  {name:'Signal Array',    short:'SIG',  desc:'Activate fragments & roll for rescue.'},
  {name:'Equipment Locker',short:'EQUIP',desc:'Draw 1 Equipment card.'},
  {name:'Cargo Hold',      short:'CARGO',desc:'Deposit or withdraw Food freely.'},
  {name:'Watch Tower',     short:'WATCH',desc:'Reveal tiles adjacent to any frontier player.'},
  {name:'Airlock',         short:'AIR',  desc:'On entry from terrain: refill all O₂ Tanks.'},
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
    wrap.addEventListener('mousedown',e=>{if(e.button!==2&&e.button!==1)return;e.preventDefault();sbDragging=true;sbDf={x:e.clientX,y:e.clientY};wrap.style.cursor='grabbing';});
    wrap.addEventListener('contextmenu',e=>e.preventDefault());
    document.addEventListener('mousemove',e=>{if(!sbDragging||!sbDf)return;sbPan.x+=e.clientX-sbDf.x;sbPan.y+=e.clientY-sbDf.y;sbDf={x:e.clientX,y:e.clientY};renderSiteBuilder();});
    document.addEventListener('mouseup',e=>{if(e.button!==2&&e.button!==1)return;sbDragging=false;sbDf=null;wrap.style.cursor='';});
    wrap.addEventListener('wheel',e=>{
      e.preventDefault();
      if(e.ctrlKey){sbZoom=Math.max(.3,Math.min(4,sbZoom*(e.deltaY>0?.97:1.03)));renderSiteBuilder();return;}
      if(usesTrackpad){sbPan.x-=e.deltaX;sbPan.y-=e.deltaY;renderSiteBuilder();return;}
      sbZoom=Math.max(.3,Math.min(4,sbZoom*(e.deltaY>0?.88:1.13)));renderSiteBuilder();
    },{passive:false});
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
  const sbFilt=document.createElementNS(ns,'filter');sbFilt.setAttribute('id','sb-icon-tint');sbFilt.setAttribute('x','0');sbFilt.setAttribute('y','0');sbFilt.setAttribute('width','1');sbFilt.setAttribute('height','1');
  const sbFlood=document.createElementNS(ns,'feFlood');sbFlood.setAttribute('flood-color','#b2dbee');sbFlood.setAttribute('result','color');
  const sbComp=document.createElementNS(ns,'feComposite');sbComp.setAttribute('in','color');sbComp.setAttribute('in2','SourceGraphic');sbComp.setAttribute('operator','in');
  sbFilt.appendChild(sbFlood);sbFilt.appendChild(sbComp);defs.appendChild(sbFilt);
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
    border.setAttribute('stroke','#b2dbee');border.setAttribute('stroke-width','1.5');border.setAttribute('style','cursor:default');
    border.addEventListener('mouseenter',e=>startBuilderTooltip(info,e));
    border.addEventListener('mouseleave',cancelBuilderTooltip);
    g.appendChild(border);
    const icon=BASECAMP_ICON_MAP[info.name];
    if(icon){
      const sz=SZB*0.7;
      const iconEl=document.createElementNS(ns,'image');
      iconEl.setAttribute('href',`img/Icons/${icon}`);
      iconEl.setAttribute('x',cx-sz/2);iconEl.setAttribute('y',cy-sz/2);
      iconEl.setAttribute('width',sz);iconEl.setAttribute('height',sz);
      iconEl.setAttribute('opacity','0.55');
      iconEl.setAttribute('filter','url(#sb-icon-tint)');
      iconEl.setAttribute('pointer-events','none');
      g.appendChild(iconEl);
    }
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
  clearSave();
  newGame(pendingNames,pendingPortraits,placedMap);
  setTimeout(()=>{
    initBoard();render();updateUI();
    showTableDice('move');
    // Open E7 panel and seed with mission controls + game log
    document.getElementById('e7panel').classList.add('show');
    const crew=pendingNames;
    const ctrlLines=usesTrackpad
      ?[
        [0,'good','Click — Interact'],
        [0,'good','Two-finger scroll — Pan'],
        [0,'good','Pinch — Zoom'],
      ]
      :[
        [0,'good','Left-click — Interact'],
        [0,'good','Right-click — Pan'],
        [0,'good','Scroll wheel — Zoom'],
      ];
    e7Seq([
      [0,   'sys', '> MISSION CONTROLS'],
      [0,   'div', null],
      ...ctrlLines,
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
    [0, 'crit', '> Signal Array: OFFLINE.'],
    [300, '',    'You must recover Radio Fragments to restore the Signal Array.'],
    [500, '',    'Establish your base camp by placing life support structures near the crash site.'],
  ]);
}

window.addEventListener('DOMContentLoaded',()=>{
  window.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>2||e.ctrlKey)usesTrackpad=true;},{passive:true,once:false,capture:true});
  document.querySelectorAll('.hud-vtab').forEach(tab=>{
    const parent=tab.parentElement;
    tab.addEventListener('click',()=>parent?.classList.toggle('hud-collapsed'));
  });

  document.getElementById('setup').style.display='none';
  if(loadGame()){
    // Resume saved game
    document.getElementById('intro').style.display='none';
    document.getElementById('game').className='running';
    initBoard();render();updateUI();
    showTableDice(G.phase==='roll'?'move':G.phase==='move'?'move':null);
    if(G.phase==='move'&&G.movementLeft>0)G.reach=bfsReach(cp().q,cp().r,G.movementLeft);
    document.getElementById('e7panel').classList.add('show');
    addE7('> Session restored.','sys');
    return;
  }
  e7ScreenSeq('e7-intro-msg',[
    [300, 'sys', '> ENDYMION 7 — SYSTEMS INITIALIZING...'],
    [400, 'good', '> Primary diagnostics: COMPLETE. Life support: NOMINAL.'],
    [600, '',    'Welcome aboard. I am E7, your ship\'s emergency computer. You are the crew of the Endymion 7, a deep-range mining vessel. You have crash-landed on an uncharted planet. The cause of the accident is unknown.'],
    [500, '',    'Somewhere out there, scattered across the terrain, are pieces of your radio. Find them and bring them back to the Signal Array to call for rescue.'],
    [400, 'crit',    'You have a 1 in 10,358 chance of survival.'],
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
