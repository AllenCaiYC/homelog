// ── Translation helpers ──────────────────────────────────────────────
// Stored data keeps English IDs (space types, priority, role, filter) so saved
// records survive a language change; only the labels are translated.
let lang='en';
function t(k,vars={}){
 const s=i18n[lang]?.[k]??i18n.en[k]??k;
 return s.replace(/\{(\w+)\}/g,(m,n)=>n in vars?String(vars[n]):m);
}
const has=k=>k in i18n.en;
const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const statusLabel=i=>t('status.'+i);
const priorityLabel=p=>t('priority.'+p);
const today=()=>new Date().toISOString().slice(0,10);
const addDays=(date,n)=>new Date(Date.parse(date+'T00:00:00Z')+n*864e5).toISOString().slice(0,10);

// ── Demo data ────────────────────────────────────────────────────────
// Everything lives in one browser "database" so several demo accounts can
// work on the same properties (landlord, tenants in a shared house, …).
const STORE='homelog-v2',LEGACY='zhujidemo-v1',DEMO_PASSWORD='test',SEED_REV=6;
const SPACE_TYPES=['bedroom','kitchen','living','bathroom','other'];
function seedDb(){
 const acc=(id,name,email,role,demo)=>({id,name,email,role,...(demo?{demo}:{})});
 const accounts=Object.fromEntries([
  acc('t-wei','Wei Zhang','wei@homelog.demo','tenant','demo.tWei'),
  acc('t-aisha','Aisha Khan','aisha@homelog.demo','tenant','demo.tAisha'),
  acc('t-tom','Tom Becker','tom@homelog.demo','tenant','demo.tTom'),
  acc('t-new','Test User','test@homelog.demo','tenant','demo.tNew'),
  acc('ll-main','Priya Shah','landlord@homelog.demo','landlord','demo.llMain'),
  acc('ll-new','Alex Morgan','new.landlord@homelog.demo','landlord','demo.llNew'),
  acc('t-lucas','Lucas Silva','lucas@homelog.demo','tenant','demo.tLucas'),
  acc('t-mina','Mina Park','mina@homelog.demo','tenant'),
  acc('t-sofia','Sofia Rossi','sofia@homelog.demo','tenant')
 ].map(a=>[a.id,a]));
 const sp=(id,type,shared,photo,n)=>({id,type,shared,photo,nameKey:n?'space.'+type+'N':'type.'+type,...(n?{n}:{})});
 const rec=(notes,photo,date='2026-08-28')=>({notes,photo:photo?{demo:photo}:null,photoDate:date,by:'ll-main'});
 const alderRecords={
  b1:rec('Front bedroom with bay window. Carpet clean. Small chip on the windowsill paint. Wardrobe, desk and chair in good condition.','alder-bedroom-1'),
  b2:rec('Carpet clean. Chest of drawers and desk in good condition. Window opens and locks.','alder-bedroom-2'),
  b3:rec('Small single room. Two light scratches on the desk. Carpet and wardrobe in good condition.','alder-bedroom-3'),
  b4:rec('Loft room with skylight. Skylight opens and closes. Carpet clean.','alder-bedroom-4'),
  b5:rec('Loft room. Wardrobe door slightly stiff. Carpet clean.','alder-bedroom-5'),
  kitchen:rec('Hob, oven and fridge-freezer working. Small crack on one fridge door shelf. Worktops have light wear.','alder-kitchen'),
  living:rec('Sofa and coffee table in good condition. Laminate has light scratches by the door.','alder-living'),
  bath1:rec('Bath, shower and basin working. Silicone along the bath in good condition.','alder-bathroom-1'),
  bath2:rec('Shower cubicle working. Grout slightly discoloured in one corner.','alder-bathroom-2')
 };
 const alder={id:'alder',ownerId:'ll-main',name:'12 Alder Road',address:'Alder Road, London E3 · Demo',mode:'rooms',ready:true,plan:{svg:'alder'},cover:'alder-road-exterior',
  spaces:[sp('b1','bedroom',false,'alder-bedroom-1',1),sp('b2','bedroom',false,'alder-bedroom-2',2),sp('b3','bedroom',false,'alder-bedroom-3',3),sp('b4','bedroom',false,'alder-bedroom-4',4),sp('b5','bedroom',false,'alder-bedroom-5',5),
   sp('kitchen','kitchen',true,'alder-kitchen'),sp('living','living',true,'alder-living'),sp('bath1','bathroom',true,'alder-bathroom-1',1),sp('bath2','bathroom',true,'alder-bathroom-2',2)],
  tenancies:[
   {id:'alder-b1',spaceIds:['b1'],tenantIds:['t-wei'],code:'ALDER-B1',start:'2026-09-01',end:'2027-06-30',inventory:'confirmed'},
   {id:'alder-b2',spaceIds:['b2'],tenantIds:[],code:'ALDER-B2',inventory:'none'},
   {id:'alder-b3',spaceIds:['b3'],tenantIds:['t-aisha'],code:'ALDER-B3',start:'2026-11-12',end:'2027-08-31',inventory:'pending'},
   {id:'alder-b4',spaceIds:['b4'],tenantIds:['t-lucas'],code:'ALDER-B4',start:'2026-09-01',end:'2027-06-30',inventory:'confirmed'},
   {id:'alder-b5',spaceIds:['b5'],tenantIds:['t-mina'],code:'ALDER-B5',start:'2026-09-08',end:'2027-07-07',inventory:'confirmed'}
  ],
  records:alderRecords,
  items:[
   {id:'alder-hob',spaceId:'kitchen',floor:'g',x:790,y:1228,photo:'item-alder-hob'},
   {id:'alder-fridge',spaceId:'kitchen',floor:'g',x:240,y:1215,photo:'item-alder-fridge'},
   {id:'alder-boiler',spaceId:'kitchen',floor:'g',x:640,y:1425,photo:'item-alder-boiler'},
   {id:'alder-b1-window',spaceId:'b1',floor:'g',x:405,y:92,photo:'item-alder-b1-window'},
   {id:'alder-shower',spaceId:'bath1',floor:'1',x:255,y:905,photo:'item-alder-shower'},
   {id:'alder-b3-desk',spaceId:'b3',floor:'1',x:690,y:1390,photo:'item-alder-b3-desk'}
  ],
  tickets:[
   {id:'k1',spaceId:'kitchen',reporterId:'t-wei',created:'2026-11-08',noticed:'2026-11-07',location:'Under the kitchen sink',description:'Water is dripping from a pipe joint under the sink. The cupboard base is wet.',priority:'Urgent',status:2,photo:{demo:'repair-leak-before'},photoDate:'2026-11-08',baseline:alderRecords.kitchen},
   {id:'k2',spaceId:'bath1',itemId:'alder-shower',reporterId:'t-aisha',created:'2026-11-14',location:'Silicone along the bath',description:'Black mould spots on the silicone and grout along the bath edge.',priority:'Routine',status:0,photo:{demo:'repair-mould-before'},photoDate:'2026-11-14',baseline:alderRecords.bath1},
   {id:'k5',spaceId:'b4',reporterId:'t-lucas',created:'2026-10-20',location:'Carpet by the bed',description:'Coffee spilled on the carpet next to the bed and left a dark stain.',priority:'Routine',status:4,photo:{demo:'repair-carpet-before'},photoDate:'2026-10-20',baseline:alderRecords.b4,after:{notes:'Carpet professionally cleaned. Stain removed.',photo:{demo:'repair-carpet-after'},photoDate:'2026-10-24'}},
   {id:'k3',spaceId:'b1',reporterId:'t-wei',created:'2026-10-02',location:'Wardrobe door',description:'The wardrobe door hangs crooked because the top hinge is broken.',priority:'Routine',status:4,photo:{demo:'repair-wardrobe-before'},photoDate:'2026-10-02',baseline:alderRecords.b1,after:{notes:'Hinge replaced. Door closes properly now.',photo:{demo:'repair-wardrobe-after'},photoDate:'2026-10-06'}}
  ]
 };
 const riverRecords={
  rkl:rec('Kitchen units, oven and induction hob working. Washing machine tested. Laminate in good condition.','riverside-kitchen-living','2026-09-10'),
  rb1:rec('Mirrored wardrobe slides smoothly. Minor scuff on the window frame.','riverside-bedroom-1','2026-09-10'),
  rb2:rec('Desk, chair and wardrobe in good condition. Blind works.','riverside-bedroom-2','2026-09-10'),
  rbath:rec('Bath and shower working. Small hairline crack near the basin overflow.','riverside-bathroom','2026-09-10')
 };
 const riverside={id:'riverside',ownerId:'ll-main',name:'Riverside Flat 4B',address:'Riverside Walk, London SE16 · Demo',mode:'joint',ready:true,plan:{svg:'riverside'},cover:'riverside-flat-exterior',
  spaces:[{id:'rkl',type:'kitchen',nameKey:'space.kitchenLiving',shared:false,photo:'riverside-kitchen-living'},sp('rb1','bedroom',false,'riverside-bedroom-1',1),sp('rb2','bedroom',false,'riverside-bedroom-2',2),sp('rbath','bathroom',false,'riverside-bathroom')],
  tenancies:[{id:'river-joint',spaceIds:['rkl','rb1','rb2','rbath'],tenantIds:['t-tom','t-sofia'],code:'RIVER-4B',start:'2026-09-15',end:'2027-09-14',inventory:'confirmed'}],
  records:riverRecords,
  items:[
   {id:'river-washer',spaceId:'rkl',floor:'f',x:185,y:88,photo:'item-riverside-washer'},
   {id:'river-hob',spaceId:'rkl',floor:'f',x:318,y:88,photo:'item-riverside-hob'},
   {id:'river-window',spaceId:'rb1',floor:'f',x:1440,y:220,photo:'item-riverside-window'},
   {id:'river-basin',spaceId:'rbath',floor:'f',x:275,y:945,photo:'item-riverside-basin'}
  ],
  tickets:[
   {id:'k4',spaceId:'rbath',itemId:'river-basin',reporterId:'t-tom',created:'2026-11-12',location:'Bathroom basin',description:'The basin tap is loose and turns in its fitting.',priority:'Routine',status:1,photo:{demo:'repair-tap-before'},photoDate:'2026-11-12',baseline:riverRecords.rbath}
  ]
 };
 // Activity logs, housemates marked as affected, and tenants' inventory checks.
 const log=(by,at,status,note)=>({by,at,status,...(note?{note}:{})});
 const updates={
  k1:[log('t-wei','2026-11-08',0),log('ll-main','2026-11-08',1,'Plumber booked for Tuesday morning. Please keep the cupboard under the sink empty.'),log('ll-main','2026-11-11',2,'Plumber on site. The leaking joint is being replaced.')],
  k2:[log('t-aisha','2026-11-14',0)],
  k3:[log('t-wei','2026-10-02',0),log('ll-main','2026-10-03',1,'Handyman will come on Monday.'),log('ll-main','2026-10-06',2),log('ll-main','2026-10-06',3,'Top hinge replaced and door realigned.'),log('t-wei','2026-10-07',4,'Hinge replaced. Door closes properly now.')],
  k4:[log('t-tom','2026-11-12',0),log('ll-main','2026-11-13',1,'I will fix the tap at the weekend.')],
  k5:[log('t-lucas','2026-10-20',0),log('ll-main','2026-10-21',1),log('ll-main','2026-10-23',2),log('ll-main','2026-10-24',3,'Carpet professionally cleaned.'),log('t-lucas','2026-10-25',4,'Carpet professionally cleaned. Stain removed.')]
 };
 for(const p of [alder,riverside])for(const x of p.tickets){x.updates=updates[x.id]||[];x.affected=x.id==='k1'?['t-lucas','t-mina']:[]}
 for(const p of [alder,riverside])for(const tn of p.tenancies){
  if(tn.inventory!=='confirmed')continue;
  const ids=p.spaces.filter(sp=>tn.spaceIds.includes(sp.id)||(p.mode==='rooms'&&sp.shared)).map(sp=>sp.id),at=addDays(tn.start,3);
  tn.due=addDays(tn.start,7);tn.lockedAt=at;tn.checks={};tn.submitted={};
  for(const who of tn.tenantIds){tn.checks[who]=Object.fromEntries(ids.map(id=>[id,{status:'ok',at}]));tn.submitted[who]=at}
 }
 alder.tenancies[0].checks['t-wei'].b1={status:'issue',at:'2026-09-04',note:'The chip on the windowsill is about 3 cm wide, larger than described. There is also a small scuff on the wardrobe door.',photo:{demo:'check-alder-b1-windowsill'}};
 // Aisha moved in a few days ago, so her 7-day inventory check is still open.
 const b3=alder.tenancies[2];b3.start=addDays(today(),-5);b3.due=addDays(b3.start,7);b3.checks={'t-aisha':{b3:{status:'ok',at:addDays(today(),-4)}}};b3.submitted={};
 // Safety and compliance dates (demo values): one item due soon on each property.
 alder.compliance={deposit:{protectedOn:'2026-09-10'},gas:{expires:addDays(today(),20)},eicr:{expires:'2029-03-01'},epc:{expires:'2033-05-01'}};
 riverside.compliance={deposit:{protectedOn:'2026-09-25'},gas:{expires:'2027-08-14'},eicr:{expires:addDays(today(),45)},epc:{expires:'2031-02-01'}};
 Object.assign(alder.tickets.find(x=>x.id==='k3'),{contractor:'Fix-It Handyman',cost:45});
 Object.assign(alder.tickets.find(x=>x.id==='k5'),{contractor:'CleanPro Carpets',cost:80});
 Object.assign(alder.tickets.find(x=>x.id==='k1'),{contractor:'Bow Plumbing'});
 // Lucas moves out soon, so the move-out check can be demonstrated.
 const b4=alder.tenancies[3];b4.end=addDays(today(),5);
 const note=(to,at,key,vars,link,read=false)=>({to,at:at+'T09:00:00Z',key,vars,link,read});
 const notifications=[
  note('ll-main','2026-11-14','note.reported',{name:'Aisha Khan',what:'Silicone along the bath'},{prop:'alder',ticket:'k2'}),
  note('ll-main','2026-11-12','note.reported',{name:'Tom Becker',what:'Bathroom basin'},{prop:'riverside',ticket:'k4'},true),
  note('ll-main','2026-09-04','note.checkDone',{name:'Wei Zhang',issues:1},{prop:'alder'},true),
  note('t-wei','2026-11-14','note.reported',{name:'Aisha Khan',what:'Silicone along the bath'},{prop:'alder',ticket:'k2'}),
  note('t-wei','2026-11-11','note.status',{name:'Priya Shah',what:'Under the kitchen sink',status:2},{prop:'alder',ticket:'k1'}),
  note('t-aisha',today(),'note.checkReminder',{date:b3.due},{prop:'alder',page:'check'}),
  note('t-tom','2026-11-13','note.status',{name:'Priya Shah',what:'Bathroom basin',status:1},{prop:'riverside',ticket:'k4'},true),
  note('t-lucas',today(),'note.endingSoon',{date:b4.end},{prop:'alder'})
 ].map((n,i)=>({id:'seed-n'+i,...n}));
 return {version:2,rev:SEED_REV,seq:100,notifications,session:null,prefs:{theme:'system',lang:'en'},accounts,properties:[alder,riverside]};
}
// Old single-property data (before accounts existed) becomes a personal
// record owned by the "Test User" tenant.
function migrateLegacy(d,old){
 d.prefs.theme=old.theme||d.prefs.theme;d.prefs.lang=old.lang||d.prefs.lang;
 if(!old.account)return;
 d.session='t-new';d.accounts['t-new'].name=old.account.name||'Test User';
 if(!old.ready||old.linkedRoom||old.demoProperty)return;
 const ids={'Living room':'living','Bedroom':'bedroom','Kitchen':'kitchen','Bathroom':'bathroom','客厅':'living','卧室':'bedroom','厨房':'kitchen','浴室':'bathroom'};
 const spaces=[['living','living'],['bedroom','bedroom'],['kitchen','kitchen'],['bathroom','bathroom']].map(([id,type])=>({id,type,shared:false,nameKey:'type.'+type}));
 const records={};for(const [name,r] of Object.entries(old.records||{}))if(ids[name])records[ids[name]]=r;
 const tickets=(old.tickets||[]).map((x,i)=>({...x,id:'m'+i,spaceId:ids[x.room]||'living',reporterId:'t-new',priority:{'一般':'Routine','紧急':'Urgent'}[x.priority]||x.priority}));
 d.properties.push({id:'p'+(d.seq++),ownerId:'t-new',selfManaged:true,name:old.name,address:old.address||'',date:old.date||'',mode:'joint',ready:true,plan:old.plan||null,spaces,records,tickets,items:[],
  tenancies:[{id:'self',spaceIds:spaces.map(s=>s.id),tenantIds:['t-new']}]});
}
// When the built-in demo changes, replace the demo properties and accounts
// but keep anything the user created.
function refreshDemo(d){
 const fresh=seedDb(),ids=fresh.properties.map(p=>p.id);
 d.properties=[...fresh.properties,...d.properties.filter(p=>!ids.includes(p.id))];
 d.accounts={...fresh.accounts,...Object.fromEntries(Object.entries(d.accounts).filter(([id])=>!fresh.accounts[id]))};
 d.notifications=[...fresh.notifications,...(d.notifications||[]).filter(n=>!String(n.id).startsWith('seed-'))];
 d.rev=SEED_REV;d.seq=Math.max(d.seq||100,fresh.seq);
}
function loadDb(){
 try{const d=JSON.parse(localStorage.getItem(STORE)||'null');if(d?.version===2){if(d.rev!==SEED_REV)refreshDemo(d);return d}}catch{}
 const d=seedDb();
 try{const old=JSON.parse(localStorage.getItem(LEGACY)||'null');if(old)migrateLegacy(d,old)}catch{}
 return d;
}
let db=loadDb();

// ── Lookups and permissions ─────────────────────────────────────────
const me=()=>db.accounts[db.session]||null;
const isLandlord=()=>me()?.role==='landlord';
const prop=id=>db.properties.find(p=>p.id===id);
const tenancyOf=(p,a=me())=>a?p?.tenancies.find(x=>x.tenantIds.includes(a.id)):null;
const myProps=()=>{const a=me();return a?db.properties.filter(p=>p.ownerId===a.id||tenancyOf(p,a)):[]};
const tenantHome=()=>myProps().find(p=>p.ready)||null;
const isManager=p=>!!p&&p.ownerId===db.session;           // landlord, or tenant keeping a personal record
const landlordView=p=>isManager(p)&&!p.selfManaged;
const spaceOf=(p,id)=>p?.spaces.find(s=>s.id===id);
const spaceName=s=>s?(s.name||t(s.nameKey,{n:s.n})):'';
const itemName=i=>t('item.'+i.id+'.name');
const tenancyForSpace=(p,id)=>p.tenancies.find(x=>x.spaceIds.includes(id));
function visibleSpaceIds(p){
 if(isManager(p))return p.spaces.map(s=>s.id);
 const tn=tenancyOf(p);if(!tn)return [];
 return p.spaces.filter(s=>tn.spaceIds.includes(s.id)||s.shared).map(s=>s.id);
}
const canSee=(p,id)=>visibleSpaceIds(p).includes(id);
const visibleTickets=p=>p.tickets.filter(x=>canSee(p,x.spaceId));
// Inventory checks: each tenant checks their own spaces (plus shared areas when
// letting by room) within 7 days. Confirmed or overdue inventories are locked:
// the record can't be edited, only extended with dated notes.
function checkSpaceIds(p,tn){return p.spaces.filter(s=>tn.spaceIds.includes(s.id)||(p.mode==='rooms'&&s.shared)).map(s=>s.id)}
const tnLocked=tn=>!!tn.lockedAt||(tn.inventory==='pending'&&!!tn.due&&today()>tn.due);
const spaceLocked=(p,id)=>p.tenancies.some(tn=>tn.tenantIds.length&&tnLocked(tn)&&checkSpaceIds(p,tn).includes(id));
function checksFor(p,id){const out=[];for(const tn of p.tenancies)for(const [who,c] of Object.entries(tn.checks||{}))if(c[id])out.push({who,...c[id]});return out}
const myCheckDue=p=>{const tn=tenancyOf(p);return tn&&!p.selfManaged&&tn.inventory==='pending'&&tn.due&&today()<=tn.due&&!tn.submitted?.[db.session]?tn:null};
const daysLeft=due=>Math.max(0,Math.round((Date.parse(due)-Date.parse(today()))/864e5));
// Landlord compliance: legal checks with renewal periods (England; demo dates).
const COMPLIANCE=[['gas',1],['eicr',5],['epc',10]];
const daysSince=date=>Math.round((Date.parse(today())-Date.parse(date))/864e5);
function complianceState(p,key){
 const c=p.compliance?.[key]||{};
 if(key==='deposit'){
  const holds=p.tenancies.some(tn=>tn.tenantIds.length);
  if(c.protectedOn)return {status:'ok',date:c.protectedOn};
  const start=p.tenancies.filter(tn=>tn.tenantIds.length&&tn.start).map(tn=>tn.start).sort()[0];
  return {status:!holds?'na':start&&daysSince(start)>30?'overdue':'due',date:start?addDays(start,30):''};
 }
 if(!c.expires)return {status:'missing'};
 const left=Math.round((Date.parse(c.expires)-Date.parse(today()))/864e5);
 return {status:left<0?'overdue':left<=60?'due':'ok',date:c.expires};
}
const complianceAlerts=p=>p.selfManaged?0:['deposit',...COMPLIANCE.map(c=>c[0])].filter(k=>['due','overdue','missing'].includes(complianceState(p,k).status)).length;
// A report is overdue if nobody acknowledged it in time: 1 day if urgent, 7 days otherwise.
const isOverdue=x=>x.status===0&&!!x.created&&daysSince(x.created)>(x.priority==='Urgent'?1:7);
function repairStats(p){
 const done=p.tickets.filter(x=>x.status===4),durations=done.map(x=>{const end=(x.updates||[]).find(u=>u.status===4)?.at;return end&&x.created?daysSince(x.created)-daysSince(end):null}).filter(n=>n!=null);
 return {avg:durations.length?Math.round(durations.reduce((a,b)=>a+b,0)/durations.length):null,spend:p.tickets.reduce((a,x)=>a+(x.cost||0),0),overdue:p.tickets.filter(isOverdue).length};
}
const money=n=>new Intl.NumberFormat(t('locale'),{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(n||0);
// ── Notifications ───────────────────────────────────────────────────
// Stored as a text key plus raw values, so they follow the reader's language.
// In the real product these would also go out by email or push.
function notify(to,key,vars={},link={}){
 const ids=[...new Set(to)].filter(id=>id&&id!==db.session&&db.accounts[id]);
 for(const id of ids)(db.notifications||=[]).push({id:'n'+(db.seq++),to:id,at:new Date().toISOString(),key,vars,link,read:false});
}
// Everyone who can see a space: the owner, its tenants, and housemates for shared areas.
function audience(p,sid){const s=spaceOf(p,sid);return [p.ownerId,...p.tenancies.flatMap(tn=>tn.spaceIds.includes(sid)||(p.mode==='rooms'&&s?.shared)?tn.tenantIds:[])]}
const myNotes=()=>(db.notifications||[]).filter(n=>n.to===db.session).sort((a,b)=>b.at.localeCompare(a.at));
const unreadCount=()=>myNotes().filter(n=>!n.read).length;
function noteText(n){
 const p=prop(n.link?.prop),raw=n.vars||{},v={};
 for(const [k,val] of Object.entries(raw))v[k]=esc(val);
 if(raw.status!=null)v.status=statusLabel(raw.status);
 if(raw.date)v.date=dateText(raw.date);
 if(raw.space)v.space=esc(spaceName(spaceOf(p,raw.space)));
 for(const k of ['agreed','disputed','amount'])if(raw[k]!=null)v[k]=money(raw[k]);
 v.prop=esc(p?.name||'');
 return t(n.key,v);
}
const firstName=id=>id===db.session?t('people.you'):(db.accounts[id]?.name||'').split(' ')[0];
const personName=id=>id===db.session?t('people.you'):(db.accounts[id]?.name||t('people.unknown'));

// ── Navigation state ────────────────────────────────────────────────
let page='start',trail=[];
let propId=null,spaceSel=null,floorSel=null,itemSel=null,ticketSel=null,editId=null,recordSpace=null;
let packTn=null,onDialogClose=null,signinRole='tenant',repairFilter='All',reportCtx={},draft=null,checkOpen=null,checkoutTn=null,demoOpen=false,tourStep=-1;
let method='upload',material=null,materialPending=false,materialVersion=0,importText='',drafts={};
let postcodeQuery='',postcodeSearched=false,foundProperty=null;
const sampleProperty={name:'Harbour Court · Flat 3',address:'Harbour Street, London E1 · Demo'};
const postcodeKey=value=>value.toUpperCase().replace(/\s/g,'');
const app=document.querySelector('#app'),notice=document.querySelector('#notice');
const darkQuery=window.matchMedia?.('(prefers-color-scheme: dark)');
const applyTheme=()=>{const th=db.prefs.theme;document.documentElement.dataset.theme=th==='system'?(darkQuery?.matches?'dark':'light'):th};
darkQuery?.addEventListener?.('change',applyTheme);

function save(message=''){
 try{localStorage.setItem(STORE,JSON.stringify(db));notice.textContent=message}
 catch{notice.textContent=t('msg.storageFull')}
}
const SIGNED_IN=['move-in','link','setup','upload','mode','spaces','records','property','report','repair','asset','check','inbox','checkout','pack'];
function go(next,{replace=false}={}){
 if(!me()&&SIGNED_IN.includes(next))next='signin';
 if(isLandlord()&&['move-in','link'].includes(next))next='home';
 if(next==='back')page=trail.pop()||'start';
 else if(next!==page){if(!replace)trail.push(page);page=next}
 notice.textContent='';render();window.scrollTo(0,0);
 const heading=app.querySelector('h1,h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}
}
const btn=(label,to,primary=false)=>`<button type="button" class="${primary?'primary':''}" data-go="${to}">${label}</button>`;
const actionBtn=(label,action,primary=false,extra='')=>`<button type="button" class="${primary?'primary':''}" data-action="${action}" ${extra}>${label}</button>`;
const filePicker=attrs=>`<span class="file-picker"><input ${attrs}><span class="file-picker-button" aria-hidden="true">${t('common.chooseFile')}</span><span class="file-picker-status" aria-live="polite">${t('common.noFile')}</span></span>`;
const optional=(upTo2MB=false)=>`<small>${t(upTo2MB?'common.optionalUpTo2MB':'common.optional')}</small>`;
const pill=(text,cls='')=>`<span class="pill ${cls}">${text}</span>`;
const priorityPill=p=>p==='Urgent'?pill(priorityLabel('Urgent'),'urgent'):'';

// ── Images ──────────────────────────────────────────────────────────
// Demo photos are looked up as demo/<name>.jpg, then .webp, then .png.
// If none exists yet, a "photo coming soon" placeholder is shown instead.
const demoImg=(name,alt='',cls='')=>`<img class="${cls}" src="demo/${name}.jpg" data-demo="${name}" data-next="webp,png" alt="${esc(alt)}" loading="lazy">`;
function media(file){
 if(!file)return '';
 if(file.demo)return demoImg(file.demo,file.name||'');
 const src=esc(file.src),name=esc(file.name);
 if(file.type.startsWith('image/'))return `<img src="${src}" alt="${name}">`;
 if(file.type.startsWith('video/'))return `<video src="${src}" controls></video>`;
 return `<iframe src="${src}" title="${name}"></iframe>`;
}
function photoDate(date){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return '';
 const value=new Date(date+'T00:00:00Z');
 if(Number.isNaN(value.getTime()))return '';
 return `<time datetime="${date}">${new Intl.DateTimeFormat(t('locale'),{dateStyle:'medium',timeZone:'UTC'}).format(value)}</time>`;
}
const dateText=date=>photoDate(date)||esc(date);
function evidence(item,placeholder){return item?`${media(item.photo)}${item.photo&&item.photoDate?`<small>${t('common.photoTaken',{date:photoDate(item.photoDate)})}</small>`:''}${item.photo?.uploadedAt?`<small>${item.photo&&item.photoDate?' · ':''}${t('photo.uploaded',{date:dateText(item.photo.uploadedAt.slice(0,10))})}</small>`:''}<p>${userText(item.notes||item.description)}</p>${(item.addenda||[]).map(a=>`<p class="addendum"><small>${t('addendum.label',{name:esc(personName(a.by)),date:dateText(a.at)})}</small><br>${userText(a.note)}</p>`).join('')}`:`<p>${placeholder}</p>`}

// ── Floor plans ─────────────────────────────────────────────────────
// Drawn plans are a floor-plan image (demo/plan-*.png) with clickable room
// outlines laid over it. Each room is [spaceId, points, labelPosition]; a
// fourth value marks a hall or landing (not a space) and gives its label key.
// Coordinates are image pixels. `unit` scales text and markers to the image.
const R=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
const BAY=(right,bottom)=>[[195,145],[258,145],[302,42],[508,42],[550,145],[right,145],[right,bottom],[195,bottom]];
const PLANS={
 alder:{floors:[
  {id:'g',nameKey:'floor.ground',img:'plan-alder-ground',w:1024,h:1536,unit:3.1,rooms:[
   ['b1',BAY(626,633),[420,492]],['hall',R(640,145,190,955),[735,300],'plan.hall'],['living',R(195,650,431,446),[360,705]],['kitchen',R(195,1115,635,350),[360,1250]]]},
  {id:'1',nameKey:'floor.first',img:'plan-alder-first',w:1024,h:1536,unit:3.1,rooms:[
   ['b2',BAY(626,760),[430,585]],['landing',R(640,145,190,955),[735,300],'plan.landing'],['bath1',R(195,775,431,325),[440,860]],['b3',R(195,1115,635,350),[620,1250]]]},
  {id:'2',nameKey:'floor.second',img:'plan-alder-second',w:1024,h:1536,unit:3.1,rooms:[
   ['b4',BAY(640,945),[400,830]],['landing2',[[655,145],[830,145],[830,1080],[575,1080],[575,962],[655,962]],[740,300],'plan.landing'],['b5',R(195,962,365,503),[370,1095]],['bath2',R(575,1085,255,380),[702,1240]]]}
 ]},
 riverside:{floors:[{id:'f',nameKey:'floor.flat',img:'plan-riverside',w:1536,h:1024,unit:4.6,rooms:[
  ['rkl',R(128,42,730,601),[715,570]],['rb1',R(878,42,594,558),[1180,430]],['rb2',[[1005,612],[1472,612],[1472,985],[842,985],[842,728],[1005,728]],[1110,770]],['rbath',R(130,665,450,320),[370,800]],['hall',R(600,665,222,320),[711,850],'plan.hall']]}]}
};
// Properties without a drawn plan get a simple tile layout of their spaces.
function schematic(p){
 const n=p.spaces.length,rows=Math.ceil(n/2);
 return {schematic:true,floors:[{id:'s',nameKey:'floor.flat',w:300,h:rows*96,unit:1,rooms:p.spaces.map((s,i)=>{const last=i===n-1&&n%2,x=last?0:(i%2)*150,y=Math.floor(i/2)*96,w=last?300:150;return [s.id,R(x,y,w,96),[x+w/2,y+48]]})}]};
}
const planDef=p=>PLANS[p.plan?.svg]||schematic(p);
function spaceState(p,s){
 const visible=canSee(p,s.id),tn=tenancyForSpace(p,s.id);
 const repair=visible&&p.tickets.some(x=>x.spaceId===s.id&&x.status<4);
 let kind;
 if(!visible)kind='locked';
 else if(p.mode==='rooms'&&s.shared)kind='shared';
 else if(landlordView(p))kind=tn?.tenantIds.length?'let':'vacant';
 else kind='mine';
 return {kind,repair,tn};
}
function spaceCaption(p,s,st){
 if(st.kind==='locked')return t('plan.private');
 if(st.kind==='shared')return t('plan.shared');
 if(st.kind==='vacant')return t('plan.vacant');
 if(st.kind==='let')return st.tn.tenantIds.map(firstName).join(', ');
 return p.mode==='rooms'&&!s.shared?t('plan.yours'):'';
}
function floorPlan(p){
 const floors=planDef(p).floors;
 const f=floors.find(x=>x.id===floorSel)||floors.find(x=>x.rooms.some(r=>r[0]===spaceSel))||floors[0];
 const u=f.unit||1,kinds=new Set();let repairs=false;
 const pts=list=>list.map(([x,y])=>x+','+y).join(' ');
 const text=(x,y,content,cls='')=>`<text class="${cls}" x="${x}" y="${y}" font-size="${(cls?10:12)*u}" stroke-width="${4*u}">${content}</text>`;
 const rooms=f.rooms.map(([id,shape,[lx,ly],labelKey])=>{
  if(labelKey!==undefined)return `<g class="circ">${f.img?'':`<polygon class="shape" points="${pts(shape)}"/>`}${text(lx,ly,t(labelKey),'circ-label')}</g>`;
  const s=spaceOf(p,id);if(!s)return '';
  const st=spaceState(p,s),cap=spaceCaption(p,s,st),sel=id===spaceSel,label=esc(spaceName(s));
  kinds.add(st.kind);repairs||=st.repair;
  const xs=shape.map(q=>q[0]),ys=shape.map(q=>q[1]);
  const attrs=st.kind==='locked'?'aria-hidden="true"':`data-space="${id}" role="button" tabindex="0" aria-pressed="${sel}" aria-label="${label}${cap?', '+esc(cap):''}${st.repair?', '+t('plan.openRepair'):''}"`;
  return `<g class="room ${st.kind}${sel?' selected':''}" ${attrs}><polygon class="shape" points="${pts(shape)}"/>${text(lx,cap?ly-7*u:ly,label)}${cap?text(lx,ly+9*u,esc(cap),'cap'):''}${st.repair?`<circle class="repair-dot" cx="${Math.max(...xs)-14*u}" cy="${Math.min(...ys)+14*u}" r="${5*u}" stroke-width="${2*u}"/>`:''}</g>`;
 }).join('');
 const pins=(p.items||[]).map((it,i)=>({it,n:i+1})).filter(({it})=>it.floor===f.id&&canSee(p,it.spaceId)).map(({it,n})=>`<g class="pin-svg" data-item="${it.id}" role="button" tabindex="0" aria-label="${n}. ${esc(itemName(it))}"><circle cx="${it.x}" cy="${it.y}" r="${11*u}" stroke-width="${2*u}"/><text x="${it.x}" y="${it.y+u}" font-size="${11*u}">${n}</text></g>`).join('');
 const pad=f.img?0:6,maxWidth=f.img?(f.h>f.w?380:560):400;
 const tabs=floors.length>1?`<div class="row floor-tabs" role="group" aria-label="${t('plan.floors')}">${floors.map(x=>`<button type="button" class="filter" data-floor="${x.id}" aria-pressed="${x.id===f.id}">${t(x.nameKey)}</button>`).join('')}</div>`:'';
 const legendKinds=['mine','let','vacant','shared','locked'].filter(k=>kinds.has(k)&&!(k==='mine'&&kinds.size===1));
 const legend=legendKinds.length||repairs?`<div class="legend">${legendKinds.map(k=>`<span><i class="swatch s-${k}"></i>${t('legend.'+k)}</span>`).join('')}${repairs?`<span><i class="swatch s-repair"></i>${t('legend.repair')}</span>`:''}</div>`:'';
 return `${tabs}<svg class="floorplan${f.img?' imgplan':''}" style="max-width:${maxWidth}px" viewBox="${-pad} ${-pad} ${f.w+2*pad} ${f.h+2*pad}" role="group" aria-label="${t('plan.label',{floor:t(f.nameKey)})}">${f.img?`<image href="demo/${f.img}.png" x="0" y="0" width="${f.w}" height="${f.h}"/>`:''}${rooms}${f.img?'':`<rect class="outer" x="0" y="0" width="${f.w}" height="${f.h}"/>`}${pins}</svg>${legend}`;
}

// ── Pages: start, sign-in, account ──────────────────────────────────
function start(){
 const a=me();
 const [label,to]=!a?['start.signIn','signin']:a.role==='landlord'?['start.viewProperties','home']:tenantHome()?['start.view','home']:['start.moveIn','move-in'];
 return `<section class="hero"><div><h1>${t('start.title')}</h1><p>${t('start.intro')}</p><div class="row">${btn(t(label),to,true)}</div></div><img class="welcome-cover" src="demo/welcome-cover.png" alt=""></section><div class="grid three"><section class="card"><h3>${t('start.inventoryTitle')}</h3><p>${t('start.inventoryBody')}</p></section><section class="card"><h3>${t('start.repairsTitle')}</h3><p>${t('start.repairsBody')}</p></section><section class="card"><h3>${t('start.landlordTitle')}</h3><p>${t('start.landlordBody')}</p>${btn(t('about.open'),'about')}</section></div>`;
}
const avatar=(name,cls='')=>`<span class="avatar ${cls}" aria-hidden="true">${esc((name||'?').slice(0,1).toUpperCase())}</span>`;
function signIn(){
 const list=Object.values(db.accounts).filter(a=>a.demo&&a.role===signinRole);
 return `<div class="panel"><section class="card"><h1>${t('signin.title')}</h1><p>${t('signin.intro')}</p><div class="segmented" role="group" aria-label="${t('signin.roleLabel')}">${['tenant','landlord'].map(r=>`<button type="button" data-signin-role="${r}" aria-pressed="${signinRole===r}">${t('signin.as.'+r)}</button>`).join('')}</div><h2>${t('signin.demoAccounts')}</h2><ul class="account-list">${list.map(a=>`<li><button type="button" data-login="${a.id}">${avatar(a.name,'small')}<span><strong>${esc(a.name)}</strong><br><small>${t(a.demo)}</small></span><span class="arrow" aria-hidden="true">›</span></button></li>`).join('')}</ul><details class="email-signin"><summary>${t('signin.withEmail')}</summary><form id="signin"><label>${t('signin.email')} <input name="email" type="email" required autocomplete="username" placeholder="${list[0]?.email||''}"></label><label>${t('signin.password')} <input name="password" type="password" required autocomplete="current-password"></label><p class="help">${t('signin.hint')}</p><button class="primary">${t('signin.submit')}</button></form></details></section></div>`;
}
function profile(){
 const a=me();if(!a)return signIn();
 const option=(value,label,current)=>`<option value="${value}" ${current===value?'selected':''}>${label}</option>`;
 const th=db.prefs.theme;
 return `<div class="panel"><section class="card"><h1>${t('profile.title')}</h1><div class="account-summary">${avatar(a.name)}<div><strong>${esc(a.name)}</strong><br><small>${esc(a.email)} · ${t('role.'+a.role)} · ${t('profile.testAccount')}</small></div></div><form id="profile"><label>${t('profile.displayName')} <input name="displayName" required maxlength="60" value="${esc(a.name)}"></label><button class="primary">${t('profile.save')}</button></form></section><section class="card"><h2>${t('settings.title')}</h2><form id="settings"><label>${t('settings.appearance')} <select name="theme">${option('system',t('settings.system'),th)}${option('light',t('settings.light'),th)}${option('dark',t('settings.dark'),th)}</select></label><button class="primary">${t('settings.save')}</button></form></section><section class="card"><h2>${t('demoData.title')}</h2><p>${t('demoData.body')}</p><div class="row">${actionBtn(t('demoData.signOut'),'signout')}</div><details><summary>${t('demoData.resetTitle')}</summary><p>${t('demoData.resetBody')}</p>${actionBtn(t('demoData.reset'),'reset')}</details></section></div>`;
}

// ── Pages: dashboards ───────────────────────────────────────────────
function home(){
 const a=me();
 if(!a)return `<section class="panel card"><h1>${t('dash.eyebrow')}</h1><p>${t('home.signInPrompt')}</p>${btn(t('start.signIn'),'signin',true)}</section>`;
 if(a.role==='landlord')return portfolio();
 const p=tenantHome();
 if(!p)return `<section class="panel card"><h1>${t('dash.eyebrow')}</h1><p>${t('home.noProperty')}</p>${btn(t('home.startMoveIn'),'move-in',true)}</section>`;
 propId=p.id;return propertyView(p);
}
function occupancy(p){
 if(p.mode==='rooms'){const let_=p.tenancies.filter(x=>x.tenantIds.length).length;return t('ll.letRooms',{let:let_,total:p.tenancies.length})}
 const n=p.tenancies[0]?.tenantIds.length||0;return n?t('ll.jointTenants',{n}):t('ll.vacantWhole');
}
function attention(p){
 const open=p.tickets.filter(x=>x.status<4),urgent=open.filter(x=>x.priority==='Urgent').length;
 const pending=p.tenancies.filter(x=>x.inventory==='pending'&&x.due&&today()<=x.due).length,vacant=p.tenancies.filter(x=>!x.tenantIds.length).length;
 const ending=p.tenancies.filter(endingSoon).length,compliance=complianceAlerts(p),overdue=p.tickets.filter(isOverdue).length;
 const score=urgent*100+overdue*60+compliance*30+ending*20+open.length*10+pending*5+vacant;
 const line=urgent?t('ll.attnUrgent',{n:urgent}):overdue?t('ll.attnOverdue',{n:overdue}):compliance?t('ll.attnCompliance',{n:compliance}):ending?t('ll.attnEnding',{n:ending}):pending?t('ll.attnInventory',{n:pending}):open.length?t('ll.attnOpen',{n:open.length}):vacant?t('ll.attnVacant',{n:vacant}):t('ll.attnNone');
 return {open:open.length,urgent,score,line,warn:urgent>0};
}
function portfolio(){
 const a=me(),mine=myProps(),ready=mine.filter(p=>p.ready),unfinished=mine.filter(p=>!p.ready);
 if(!ready.length&&!unfinished.length)return `<section class="panel card"><div class="eyebrow">${t('ll.eyebrow')}</div><h1>${t('ll.welcomeTitle',{name:esc(a.name.split(' ')[0])})}</h1><p>${t('ll.welcomeBody')}</p><ol class="steps-list"><li>${t('ll.step1')}</li><li>${t('ll.step2')}</li><li>${t('ll.step3')}</li></ol>${actionBtn(t('ll.addFirst'),'add-property',true)}</section>`;
 const cards=ready.map(p=>({p,at:attention(p)})).sort((x,y)=>y.at.score-x.at.score).map(({p,at})=>`<li><button type="button" class="prop-card" data-prop="${p.id}">${p.cover?demoImg(p.cover,'','cover'):''}<span class="prop-body"><span class="row spread"><strong>${esc(p.name)}</strong>${pill(t(p.mode==='rooms'?'mode.roomsShort':'mode.jointShort'))}</span><small>${esc(p.address)}</small><span class="prop-stats">${occupancy(p)} · ${t('ll.openRepairs',{n:at.open})}${at.urgent?' '+priorityPill('Urgent'):''}</span><span class="attention ${at.warn?'warn':''}">${at.line}</span></span></button></li>`).join('');
 return `<div class="row spread dash-head"><div><div class="eyebrow">${t('ll.eyebrow')}</div><h1>${t('ll.title')}</h1><p>${t('ll.summary',{n:ready.length})}</p></div>${actionBtn(t('ll.add'),'add-property',true)}</div>${unfinished.length?`<section class="card"><h2>${t('ll.unfinished')}</h2><ul class="repair-list">${unfinished.map(p=>`<li><button type="button" data-continue="${p.id}"><strong>${esc(p.name)}</strong><br><small>${t('ll.continueSetup')}</small></button></li>`).join('')}</ul></section>`:''}<ul class="prop-grid">${cards}</ul>`;
}
function propertyPage(){const p=prop(propId);return p&&myProps().includes(p)?propertyView(p):home()}
function spaceKindLabel(p,s){
 const st=spaceState(p,s);
 return {let:t('kind.let'),vacant:t('kind.vacant'),shared:t('kind.shared'),mine:p.mode==='rooms'&&!s.shared?t('kind.yours'):''}[st.kind]||'';
}
function spacePanel(p){
 const s=spaceOf(p,spaceSel);
 if(!s)return `<p class="help">${t('plan.selectHint')}</p>`;
 const items=(p.items||[]).map((it,i)=>({it,n:i+1})).filter(({it})=>it.spaceId===s.id);
 const tickets=visibleTickets(p).filter(x=>x.spaceId===s.id&&x.status<4);
 const kind=spaceKindLabel(p,s);
 return `<section class="space-panel" aria-live="polite"><div class="row spread"><h3>${esc(spaceName(s))}</h3>${kind?pill(kind):''}</div>${evidence(p.records[s.id],t('home.noRecord'))}${items.length?`<ol class="item-list compact">${items.map(({it,n})=>`<li><button type="button" data-item="${it.id}"><span class="item-number">${n}</span><span>${esc(itemName(it))}</span><span class="arrow" aria-hidden="true">›</span></button></li>`).join('')}</ol>`:''}${tickets.length?`<p><strong>${t('space.openRepairs',{n:tickets.length})}</strong></p><ul class="repair-list">${tickets.map(ticketRow(p)).join('')}</ul>`:''}${checksHtml(p,s)}${spaceLocked(p,s.id)?lockedNote(s.id):''}${landlordView(p)?'':actionBtn(t('space.report'),'report-space')}</section>`;
}
function spacesCard(p){
 const vis=visibleSpaceIds(p),tn=tenancyOf(p);
 const entry=s=>{const r=p.records[s.id];const st=spaceState(p,s);
  const side=landlordView(p)?(st.kind==='let'?st.tn.tenantIds.map(personName).join(', '):st.kind==='vacant'?t('plan.vacant'):t('plan.shared')):'';
  return `<li><button type="button" data-space="${s.id}" aria-pressed="${s.id===spaceSel}"><strong>${esc(spaceName(s))}</strong>${r?' ✓':''}${side?`<br><small>${esc(side)}</small>`:''}${!landlordView(p)&&r?`<span class="notes snippet">${esc(r.notes)}</span>`:''}</button></li>`};
 const groups=[];
 if(p.mode==='rooms'){
  if(landlordView(p))groups.push(['spaces.bedrooms',p.spaces.filter(s=>!s.shared)]);
  else groups.push(['spaces.myRoom',p.spaces.filter(s=>tn?.spaceIds.includes(s.id))]);
  groups.push(['spaces.shared',p.spaces.filter(s=>s.shared&&vis.includes(s.id))]);
 } else groups.push(['spaces.rooms',p.spaces.filter(s=>vis.includes(s.id))]);
 const fromLandlord=!isManager(p);
 return `<section class="card"><div class="row spread"><h2>${t(fromLandlord?'landlord.title':landlordView(p)?'spaces.titleLandlord':'spaces.titleOwn')} ${term('inventory')}</h2>${fromLandlord?pill(t('landlord.badge')):''}</div>${fromLandlord?`<p>${t('landlord.body')}</p>`:''}${groups.filter(([,list])=>list.length).map(([key,list])=>`<h3>${t(key)}</h3><ul class="space-list">${list.map(entry).join('')}</ul>`).join('')}${isManager(p)?actionBtn(t('home.editInventory'),'edit-inventory'):''}</section>`;
}
function complianceCard(p){
 const row=(key,label,extra='')=>{const st=complianceState(p,key);if(st.status==='na')return '';
  const pillCls=st.status==='ok'?'':'urgent';
  const date=key==='deposit'?(st.status==='ok'?t('compliance.protectedOn',{date:dateText(st.date)}):st.date?t('compliance.protectBy',{date:dateText(st.date)}):''):st.date?t('compliance.expires',{date:dateText(st.date)}):t('compliance.notRecorded');
  const action=key==='deposit'?(st.status==='ok'?'':`<button type="button" data-renew="deposit">${t('compliance.markProtected')}</button>`):`<button type="button" data-renew="${key}">${t(st.date?'compliance.renew':'compliance.add')}</button>`;
  return `<li><div><strong>${label}</strong> ${pill(t('compliance.status.'+st.status),pillCls)}<br><small>${date}${extra}</small></div>${action}</li>`};
 return `<section class="card"><h2>${t('compliance.title')}</h2><ul class="compliance-list">${row('deposit',t('compliance.deposit'))}${COMPLIANCE.map(([k])=>row(k,t('compliance.'+k),' · '+t('compliance.every.'+k))).join('')}</ul><p class="help">${t('compliance.help')} <a href="https://www.gov.uk/private-renting/your-landlords-safety-responsibilities" target="_blank" rel="noopener noreferrer">GOV.UK</a></p></section>`;
}
function tenanciesCard(p){
 const ending=x=>endingSoon(x)||(x.tenantIds.length&&x.end&&x.end>=today()&&daysLeft(x.end)<=14)?' · '+t('tenancy.endingSoon',{n:daysLeft(x.end)}):'';
 const inv=x=>{
  const issues=Object.values(x.checks||{}).flatMap(c=>Object.values(c)).filter(c=>c.status==='issue').length;
  const base=x.inventory==='pending'?(tnLocked(x)?t('inventory.autoLocked'):t('inventory.pendingDue',{date:dateText(x.due)})):t('inventory.'+(x.inventory||'none'));
  return base+(issues?' · '+t('inventory.flagged',{n:issues}):'');
 };
 return `<section class="card"><h2>${t('tenancy.title')} ${term(p.mode==='rooms'?'hmo':'joint')}</h2><p class="help">${t(p.mode==='rooms'?'tenancy.helpRooms':'tenancy.helpJoint')}</p><ul class="tenancy-list">${p.tenancies.map(x=>`<li><div><strong>${x.spaceIds.length===p.spaces.length?t('tenancy.wholeHome'):x.spaceIds.map(id=>esc(spaceName(spaceOf(p,id)))).join(', ')}</strong> · ${x.tenantIds.length?x.tenantIds.map(id=>esc(personName(id))).join(', '):`<em>${t('plan.vacant')}</em>`}<br><small>${x.start?t('tenancy.dates',{start:dateText(x.start),end:x.end?dateText(x.end):t('tenancy.open')})+' · ':''}${x.tenantIds.length?inv(x)+ending(x):t('tenancy.shareCode')}</small></div><div class="code-box"><code>${esc(x.code)}</code><button type="button" data-copy="${esc(x.code)}" aria-label="${t('tenancy.copyLabel',{code:esc(x.code)})}">${t('tenancy.copy')}</button></div>${x.tenantIds.length?`<div class="tenancy-actions row"><button type="button" data-pack="${x.id}">${t('pack.button')}</button>${x.checkout?`<button type="button" data-checkout="${x.id}">${t('checkout.view')} · ${t('checkout.status.'+x.checkout.status)}</button>`:`<button type="button" data-start-checkout="${x.id}">${t('checkout.start')}</button>`}</div>`:''}</li>`).join('')}</ul></section>`;
}
const ticketRow=p=>x=>`<li><button type="button" data-ticket="${x.id}"><strong>${esc(x.location)}</strong>${priorityPill(x.priority)}${isOverdue(x)?' '+pill(t('sla.overdue'),'urgent'):''}<br><small>${statusLabel(x.status)} · ${esc(spaceName(spaceOf(p,x.spaceId)))}${x.affected?.length?' · '+t('affected.short',{n:x.affected.length+1}):''}${x.reporterId&&x.reporterId!==db.session?' · '+t('repair.by',{name:esc(personName(x.reporterId))}):''}</small></button></li>`;
function repairQueue(p){
 const entries=visibleTickets(p).filter(x=>repairFilter==='All'||(repairFilter==='Open'?x.status<4:x.status===4)).slice().reverse();
 const st=landlordView(p)?repairStats(p):null;
 return `<section class="card"><h2>${t('repairs.title')}</h2>${st?`<p class="help repair-stats">${[st.avg!=null&&t('stats.avgDays',{n:st.avg}),t('stats.spend',{amount:money(st.spend)}),st.overdue&&t('stats.overdue',{n:st.overdue})].filter(Boolean).join(' · ')}</p>`:''}<div class="row">${['All','Open','Signed off'].map(f=>`<button type="button" class="filter" data-filter="${f}" aria-pressed="${repairFilter===f}">${t('filter.'+f)}</button>`).join('')}</div>${entries.length?`<ul class="repair-list">${entries.map(ticketRow(p)).join('')}</ul>`:`<p>${t('repairs.empty')}</p>`}</section>`;
}
function itemsCard(p){
 const list=(p.items||[]).map((it,i)=>({it,n:i+1})).filter(({it})=>canSee(p,it.spaceId));
 if(!list.length)return '';
 return `<section class="card"><h2>${t('dash.items')}</h2><ol class="item-list">${list.map(({it,n})=>`<li><button type="button" data-item="${it.id}"><span class="item-number">${n}</span><span><strong>${esc(itemName(it))}</strong><br><small>${esc(spaceName(spaceOf(p,it.spaceId)))}</small></span><span class="arrow" aria-hidden="true">›</span></button></li>`).join('')}</ol></section>`;
}
function propertyView(p){
 if(!canSee(p,spaceSel))spaceSel=null;
 const lv=landlordView(p),tn=tenancyOf(p);
 const eyebrow=lv?t(p.mode==='rooms'?'mode.rooms':'mode.joint'):p.selfManaged?t('dash.personal'):t(p.mode==='rooms'?'dash.roomTenant':'dash.jointTenant');
 const meta=[p.address&&esc(p.address),p.selfManaged&&p.date&&t('home.moveInDate',{date:dateText(p.date)}),!lv&&!p.selfManaged&&tn?.start&&t('tenancy.dates',{start:dateText(tn.start),end:tn.end?dateText(tn.end):t('tenancy.open')}),lv&&occupancy(p)].filter(Boolean).join(' · ');
 const uploaded=p.plan?.src?(p.plan.type.startsWith('image/')?`<details class="uploaded-plan"><summary>${t('home.viewUpload')}</summary><div class="property-plan">${media(p.plan)}</div></details>`:`<details class="uploaded-plan"><summary>${t('home.viewUpload')}</summary>${media(p.plan)}</details>`):'';
 return `<div class="row spread dash-head"><div><div class="eyebrow">${t('dash.eyebrow')} · ${eyebrow}</div><h1>${esc(p.name)}</h1><p>${meta}</p></div><div class="row">${lv?'':actionBtn(t('home.report'),'report',true)}${!lv&&tn?`<button type="button" data-pack="${tn.id}">${t('pack.button')}</button>`:''}</div></div>${inventoryBanner(p)}<div class="grid"><div><section class="card"><h2>${t('dash.floorPlan')}</h2>${floorPlan(p)}${uploaded}${spacePanel(p)}</section>${itemsCard(p)}</div><div>${lv?tenanciesCard(p):''}${lv?complianceCard(p):''}${spacesCard(p)}${repairQueue(p)}</div></div>`;
}

// ── Inventory checks and locking ────────────────────────────────────
function inventoryBanner(p){
 const own=tenancyOf(p),co=own?.checkout;
 if(co&&co.status!=='draft'&&!p.selfManaged){
  if(co.status==='sent'&&!co.responses?.[db.session])return `<section class="card banner"><div><h2>${t('checkout.bannerTitle')}</h2><p>${t('checkout.bannerBody',{amount:money(checkoutTotals(own).proposed)})}</p></div><button type="button" class="primary" data-checkout="${own.id}">${t('checkout.review')}</button></section>`;
  return `<section class="card banner"><p>${t('checkout.bannerDone')}</p><button type="button" data-checkout="${own.id}">${t('checkout.viewSummary')}</button></section>`;
 }
 const due=myCheckDue(p);
 if(due){
  const done=Object.keys(due.checks?.[db.session]||{}).length,total=checkSpaceIds(p,due).length;
  return `<section class="card banner"><div><h2>${t('check.bannerTitle')}</h2><p>${t('check.bannerBody',{days:daysLeft(due.due),date:dateText(due.due)})}</p><small>${t('check.progress',{done,total})}</small></div>${btn(t(done?'check.continue':'check.start'),'check',true)}</section>`;
 }
 const tn=tenancyOf(p);
 if(tn&&!p.selfManaged&&tn.inventory==='pending'&&tn.submitted?.[db.session]&&!tnLocked(tn))return `<section class="card banner"><p>${t('check.waitingHousemates')}</p></section>`;
 return '';
}
const addendumForm=id=>`<details class="addendum-form"><summary>${t('addendum.add')}</summary><form id="addendum"><input type="hidden" name="space" value="${id}"><label>${t('addendum.note')} <textarea name="note" required></textarea></label><button class="primary">${t('addendum.save')}</button></form></details>`;
const lockedNote=id=>`<p class="help lock-note">🔒 ${t('lock.spaceLocked')}</p>${addendumForm(id)}`;
function checksHtml(p,s){
 const list=checksFor(p,s.id);if(!list.length)return '';
 return `<h4>${t('check.resultsTitle')}</h4><ul class="check-results">${list.map(c=>`<li class="${c.status}"><span class="mark" aria-hidden="true">${c.status==='ok'?'✓':'⚠'}</span> <strong>${esc(personName(c.who))}</strong> · ${t('check.'+c.status)} <small>${dateText(c.at)}</small>${c.note?`<br>${userText(c.note)}`:''}${c.photo?media(c.photo):''}</li>`).join('')}</ul>`;
}
const affectBtn=x=>{if(!x.reporterId||x.reporterId===db.session)return '';const on=(x.affected||[]).includes(db.session);return `<button type="button" data-affect="${x.id}" aria-pressed="${on}">${t(on?'affected.undo':'affected.add')}</button>`};
// Before reporting in a shared area, show what housemates already reported there.
function dupHint(p,id){
 const s=spaceOf(p,id);if(!s||!(p.mode==='rooms'&&s.shared))return '';
 const open=p.tickets.filter(x=>x.spaceId===id&&x.status<4);if(!open.length)return '';
 return `<div class="dup-hint"><strong>${t('report.alreadyTitle',{room:esc(spaceName(s))})}</strong><ul class="repair-list">${open.map(x=>`<li class="dup-row"><span><strong>${esc(x.location)}</strong><br><small>${statusLabel(x.status)} · ${t('repair.by',{name:esc(personName(x.reporterId))})}</small></span><span class="row"><button type="button" data-ticket="${x.id}">${t('report.view')}</button>${affectBtn(x)}</span></li>`).join('')}</ul><p class="help">${t('report.alreadyHelp')}</p></div>`;
}
function checkPage(){
 const p=prop(propId),tn=p&&myCheckDue(p);if(!tn)return home();
 const mine=tn.checks?.[db.session]||{},ids=checkSpaceIds(p,tn),done=ids.filter(id=>mine[id]).length;
 const card=id=>{
  const s=spaceOf(p,id),c=mine[id];
  const status=c?pill(c.status==='ok'?'✓ '+t('check.ok'):'⚠ '+t('check.issue'),c.status==='issue'?'urgent':''):pill(t('check.notChecked'));
  const body=checkOpen===id
   ?`<form id="check-issue"><input type="hidden" name="space" value="${id}"><label>${t('check.issueNote')} <textarea name="note" required>${esc(c?.status==='issue'?c.note:'')}</textarea></label><label>${t('check.issuePhoto')} ${optional(true)}${filePicker('name="photo" type="file" accept="image/png,image/jpeg,image/webp" capture="environment"')}</label><div class="row"><button class="primary">${t('check.saveIssue')}</button>${actionBtn(t('check.cancel'),'check-cancel')}</div></form>`
   :`${c?.note?`<p class="notes issue-note">${esc(c.note)}</p>`:''}<div class="row"><button type="button" data-check-ok="${id}" aria-pressed="${c?.status==='ok'}">✓ ${t('check.ok')}</button><button type="button" data-check-issue="${id}" aria-pressed="${c?.status==='issue'}">⚠ ${t('check.issue')}</button></div>`;
  return `<section class="card check-card"><div class="row spread"><h2>${esc(spaceName(s))}</h2>${status}</div>${evidence(p.records[id],t('home.noRecord'))}${body}</section>`;
 };
 return `<div class="panel"><section class="card"><h1>${t('check.title')} ${term('inventory')}</h1><p>${t('check.intro')}</p><p><strong>${t('check.due',{date:dateText(tn.due),days:daysLeft(tn.due)})}</strong> · ${pill(t('check.progress',{done,total:ids.length}))}</p></section>${ids.map(card).join('')}<section class="card"><p class="help">${done<ids.length?t('check.remaining',{n:ids.length-done}):t('check.submitHelp')}</p>${actionBtn(t('check.submit'),'submit-check',true,done<ids.length?'aria-disabled="true"':'')}</section></div>`;
}

// ── Notifications page ──────────────────────────────────────────────
function inbox(){
 const list=myNotes();
 return `<div class="panel"><section class="card"><div class="row spread"><h1>${t('inbox.title')}</h1>${list.some(n=>!n.read)?actionBtn(t('inbox.markAll'),'read-all'):''}</div><p class="help">${t('inbox.help')}</p>${list.length?`<ul class="inbox-list">${list.map(n=>`<li class="${n.read?'':'unread'}"><button type="button" data-note="${n.id}"><span>${n.read?'':`<span class="visually-hidden">${t('inbox.new')} </span>`}${noteText(n)}</span><small>${dateText(n.at.slice(0,10))}${prop(n.link?.prop)?' · '+esc(prop(n.link.prop).name):''}</small></button></li>`).join('')}</ul>`:`<p>${t('inbox.empty')}</p>`}</section></div>`;
}
function openNote(link={}){
 if(link.prop)propId=link.prop;
 if(link.ticket){ticketSel=link.ticket;go('repair')}
 else if(link.page==='check')go('check');
 else if(link.page==='checkout'){checkoutTn=link.tenancy;go('checkout')}
 else go(isLandlord()?'property':'home');
}

// ── Move-out check ──────────────────────────────────────────────────
// The landlord compares each room with the move-in record and proposes
// deductions only for damage beyond fair wear and tear; tenants agree or
// dispute each item. The summary can be printed as evidence for the
// deposit protection scheme.
const findTenancy=(p,id)=>p?.tenancies.find(x=>x.id===id);
const endingSoon=x=>x.tenantIds.length&&x.end&&x.end>=today()&&daysLeft(x.end)<=14&&(!x.checkout||x.checkout.status==='draft');
const tenancyLabel=(p,tn)=>tn.spaceIds.length===p.spaces.length?t('tenancy.wholeHome'):tn.spaceIds.map(id=>esc(spaceName(spaceOf(p,id)))).join(', ');
function checkoutTotals(tn){
 const co=tn.checkout||{},damage=Object.entries(co.items||{}).filter(([,i])=>i.outcome==='damage');
 const disputedIds=new Set(Object.values(co.responses||{}).flatMap(r=>Object.entries(r).filter(([,x])=>!x.agree).map(([id])=>id)));
 const sum=list=>list.reduce((a,[,i])=>a+(i.amount||0),0);
 const proposed=sum(damage),disputed=sum(damage.filter(([id])=>disputedIds.has(id)));
 return {proposed,disputed,agreed:proposed-disputed};
}
const outcomePill=i=>pill(t('checkout.outcome.'+i.outcome),i.outcome==='damage'?'urgent':'');
function checkoutCard(p,tn,id,mode){
 const s=spaceOf(p,id),co=tn.checkout,item=co.items?.[id];
 const flagged=checksFor(p,id).filter(c=>tn.tenantIds.includes(c.who)&&c.status==='issue');
 const moveIn=`<div><h3>${t('checkout.moveIn')}</h3>${evidence(p.records[id],t('home.noRecord'))}${flagged.map(c=>`<p class="notes issue-note"><small>${t('check.resultsTitle')} · ${esc(personName(c.who))}</small><br>${esc(c.note)}</p>`).join('')}</div>`;
 const moveOut=mode==='edit'
  ?`<form data-form="checkout-item" data-target="${id}"><h3>${t('checkout.moveOut')}</h3><label>${t('checkout.outcome')} <select name="outcome">${['same','wear','damage'].map(o=>`<option value="${o}" ${(item?.outcome||'same')===o?'selected':''}>${t('checkout.outcome.'+o)}</option>`).join('')}</select></label><label>${t('checkout.notes')} <textarea name="notes" required>${esc(item?.notes||'')}</textarea></label><label>${t('checkout.amount')} <small>${t('checkout.amountHelp')}</small><input type="number" name="amount" min="0" step="1" inputmode="numeric" value="${item?.amount||''}"></label><label>${t('checkout.photo')} ${optional(true)}${filePicker('name="photo" type="file" accept="image/png,image/jpeg,image/webp" capture="environment"')}</label>${item?.photo?media(item.photo):''}<div class="row"><button class="primary">${t('checkout.save')}</button>${item?pill('✓ '+t('checkout.saved')):''}</div></form>`
  :`<div><h3>${t('checkout.moveOut')}</h3>${item?`${outcomePill(item)}${evidence(item,'')}${item.outcome==='damage'?`<p><strong>${t('checkout.proposed')}: ${money(item.amount)}</strong></p>`:''}`:`<p>${t('checkout.notRecorded')}</p>`}</div>`;
 const reps=p.tickets.filter(x=>x.spaceId===id&&(!tn.start||x.created>=tn.start)&&(!tn.end||x.created<=tn.end));
 const repairs=reps.length?`<h4>${t('checkout.repairsDuring')}</h4><ul class="repair-list">${reps.map(ticketRow(p)).join('')}</ul>`:'';
 const responses=Object.entries(co.responses||{}).map(([who,r])=>r[id]?`<p class="${r[id].agree?'':'issue-note'}"><strong>${t(r[id].agree?'checkout.responseAgree':'checkout.responseDispute',{name:esc(personName(who))})}</strong>${r[id].comment?` · <span class="notes">${esc(r[id].comment)}</span>`:''}</p>`:'').join('');
 const reply=mode==='reply'&&item?.outcome==='damage'?`<fieldset class="reply"><legend>${t('checkout.yourResponse',{amount:money(item.amount)})}</legend><label class="check"><input type="radio" name="agree-${id}" value="agree" required> ${t('checkout.agree')}</label><label class="check"><input type="radio" name="agree-${id}" value="dispute"> ${t('checkout.dispute')}</label><label>${t('checkout.comment')} <small>${t('checkout.commentHelp')}</small><textarea name="comment-${id}"></textarea></label></fieldset>`:'';
 return `<section class="card"><h2>${esc(spaceName(s))}</h2><div class="compare">${moveIn}${moveOut}</div>${repairs}${responses}${reply}</section>`;
}
function checkoutPage(){
 const p=prop(propId),tn=findTenancy(p,checkoutTn),co=tn?.checkout;
 if(!co)return home();
 const lv=landlordView(p),tenant=tn.tenantIds.includes(db.session);
 if(!lv&&!(tenant&&co.status!=='draft'))return home();
 const myReply=co.responses?.[db.session],replying=tenant&&co.status==='sent'&&!myReply;
 const mode=lv&&co.status==='draft'?'edit':replying?'reply':'view';
 const totals=checkoutTotals(tn),recorded=tn.spaceIds.every(id=>co.items?.[id]);
 const head=`<section class="card"><div class="eyebrow">${t('checkout.eyebrow')} · ${esc(p.name)}</div><div class="row spread"><h1>${t('checkout.title')} ${term('wearTear')}</h1>${pill(t('checkout.status.'+co.status))}</div><p>${tenancyLabel(p,tn)} · ${tn.tenantIds.map(id=>esc(personName(id))).join(', ')}${tn.start?' · '+t('tenancy.dates',{start:dateText(tn.start),end:tn.end?dateText(tn.end):t('tenancy.open')}):''}</p><p>${t(lv?'checkout.introLandlord':'checkout.introTenant')}</p></section>`;
 const cards=tn.spaceIds.map(id=>checkoutCard(p,tn,id,mode)).join('');
 const total=`<p><strong>${t('checkout.total',{amount:money(totals.proposed)})}</strong></p>`;
 if(mode==='edit')return `<div class="panel">${head}${cards}<section class="card">${total}<p class="help">${t('checkout.sendHelp')}</p>${actionBtn(t('checkout.send'),'send-checkout',true,recorded?'':'aria-disabled="true"')}</section></div>`;
 if(mode==='reply')return `<div class="panel">${head}<form id="checkout-reply">${cards}<section class="card">${total}<button class="primary">${t('checkout.reply')}</button></section></form></div>`;
 const summary=`<section class="card summary"><h2>${t('checkout.summaryTitle')}</h2>${totals.proposed?`<ul class="totals"><li>${t('checkout.summaryProposed',{amount:money(totals.proposed)})}</li>${co.status==='responded'?`<li>${t('checkout.summaryAgreed',{amount:money(totals.agreed)})}</li><li><strong>${t('checkout.summaryDisputed',{amount:money(totals.disputed)})}</strong></li>`:''}</ul>`:`<p>${t('checkout.noDamage')}</p>`}${co.status==='sent'?`<p class="help">${t('checkout.waiting',{date:dateText(co.sentAt)})}</p>`:''}${myReply?`<p class="help">${t('checkout.youResponded',{date:dateText(co.respondedBy?.[db.session])})}</p>`:''}${co.status==='responded'&&totals.disputed?`<p class="help">${t('checkout.disputeHelp')} ${term('deposit')}</p>`:''}${actionBtn(t('checkout.print'),'print')}</section>`;
 return `<div class="panel">${head}${summary}${cards}</div>`;
}

// ── Translation of user-written content ─────────────────────────────
// Landlords usually write in English. Tenants can show a translation next to
// the original, which stays the reference. The demo ships translations for its
// sample content; a real product would call a translation service.
const CONTENT_TR={'zh-CN':{
 'Front bedroom with bay window. Carpet clean. Small chip on the windowsill paint. Wardrobe, desk and chair in good condition.':'前卧室带飘窗。地毯干净。窗台油漆有一处小缺口。衣柜、书桌和椅子状况良好。',
 'Carpet clean. Chest of drawers and desk in good condition. Window opens and locks.':'地毯干净。五斗柜和书桌状况良好。窗户可以正常开关和上锁。',
 'Small single room. Two light scratches on the desk. Carpet and wardrobe in good condition.':'小单人间。书桌上有两道轻微划痕。地毯和衣柜状况良好。',
 'Loft room with skylight. Skylight opens and closes. Carpet clean.':'带天窗的阁楼房间。天窗可以正常开关。地毯干净。',
 'Loft room. Wardrobe door slightly stiff. Carpet clean.':'阁楼房间。衣柜门有点紧。地毯干净。',
 'Hob, oven and fridge-freezer working. Small crack on one fridge door shelf. Worktops have light wear.':'灶台、烤箱和冰箱都能正常使用。冰箱门上有一层隔板有小裂纹。台面有轻微磨损。',
 'Sofa and coffee table in good condition. Laminate has light scratches by the door.':'沙发和茶几状况良好。门边的复合地板有轻微划痕。',
 'Bath, shower and basin working. Silicone along the bath in good condition.':'浴缸、淋浴和洗手盆都能正常使用。浴缸边的密封胶状况良好。',
 'Shower cubicle working. Grout slightly discoloured in one corner.':'淋浴间能正常使用。一个角落的瓷砖缝有轻微变色。',
 'Kitchen units, oven and induction hob working. Washing machine tested. Laminate in good condition.':'橱柜、烤箱和电磁炉都能正常使用。洗衣机已测试。复合地板状况良好。',
 'Mirrored wardrobe slides smoothly. Minor scuff on the window frame.':'镜面衣柜推拉顺畅。窗框有轻微擦痕。',
 'Desk, chair and wardrobe in good condition. Blind works.':'书桌、椅子和衣柜状况良好。百叶帘正常。',
 'Bath and shower working. Small hairline crack near the basin overflow.':'浴缸和淋浴都能正常使用。洗手盆溢水口附近有一道细裂纹。',
 'Water is dripping from a pipe joint under the sink. The cupboard base is wet.':'水槽下方的水管接头在滴水，橱柜底板是湿的。',
 'Black mould spots on the silicone and grout along the bath edge.':'浴缸边的密封胶和瓷砖缝上有黑色霉斑。',
 'The wardrobe door hangs crooked because the top hinge is broken.':'衣柜门上方的合页坏了，门歪着挂。',
 'The basin tap is loose and turns in its fitting.':'洗手盆水龙头松了，会在底座里转动。',
 'Coffee spilled on the carpet next to the bed and left a dark stain.':'床边的地毯洒了咖啡，留下一块深色污渍。',
 'Plumber booked for Tuesday morning. Please keep the cupboard under the sink empty.':'已约好水管工周二上午上门。请把水槽下面的柜子清空。',
 'Plumber on site. The leaking joint is being replaced.':'水管工已经到场，正在更换漏水的接头。',
 'Handyman will come on Monday.':'维修师傅周一会来。',
 'Top hinge replaced and door realigned.':'已更换上方合页并调正柜门。',
 'Hinge replaced. Door closes properly now.':'合页已更换，门现在能正常关上。',
 'I will fix the tap at the weekend.':'我周末来修水龙头。',
 'Carpet professionally cleaned.':'地毯已经专业清洗。',
 'Carpet professionally cleaned. Stain removed.':'地毯已经专业清洗，污渍已去除。',
 'The chip on the windowsill is about 3 cm wide, larger than described. There is also a small scuff on the wardrobe door.':'窗台上的缺口大约 3 厘米宽，比记录的大。衣柜门上还有一小块擦痕。'
}};
const shownTr=new Set();
const hashText=s=>{let h=0x811c9dc5;for(const c of s){h^=c.codePointAt(0);h=Math.imul(h,16777619)>>>0}return h.toString(36)};
function userText(text){
 const raw=String(text??''),tr=lang!=='en'&&CONTENT_TR[lang]?.[raw.trim()];
 if(!tr)return `<span class="notes">${esc(raw)}</span>`;
 const k=hashText(raw),open=shownTr.has(k);
 return `<span class="notes">${esc(raw)}</span> <button type="button" class="tr-toggle" data-tr="${k}" aria-expanded="${open}">${t(open?'tr.hide':'tr.show')}</button>${open?`<span class="tr-text"><small>${t('tr.label')}</small><br>${esc(tr)}</span>`:''}`;
}

// ── Glossary of UK renting terms ────────────────────────────────────
const TERMS={inventory:'https://www.gov.uk/government/publications/how-to-rent',deposit:'https://www.gov.uk/tenancy-deposit-protection',wearTear:'https://www.gov.uk/tenancy-deposit-protection',joint:'https://www.gov.uk/government/publications/how-to-rent',hmo:'https://www.gov.uk/house-in-multiple-occupation-licence',checkout:'https://www.gov.uk/tenancy-deposit-protection'};
const term=k=>`<button type="button" class="term" data-term="${k}" aria-label="${t('term.label',{term:t('term.'+k+'.title')})}">?</button>`;
function showDialog(html){
 const dlg=document.querySelector('#info-dialog');
 dlg.innerHTML=`<div class="dialog-body">${html}<div class="row"><button type="button" class="primary" data-action="close-dialog">${t('dialog.close')}</button></div></div>`;
 if(dlg.showModal&&!dlg.open)dlg.showModal();else dlg.setAttribute('open','');
}
function showTerm(k){
 showDialog(`<h2 id="info-title">${t('term.'+k+'.title')}</h2><p>${t('term.'+k+'.body')}</p><p><a href="${TERMS[k]}" target="_blank" rel="noopener noreferrer">${t('term.more')}</a></p><p class="help">${t('term.disclaimer')}</p>`);
}

// ── Help writing repair reports in English ──────────────────────────
// The landlord receives clear English; the tenant sees what it means.
const REPAIR_TPL={
 leak:{urgent:true,loc:'Under the kitchen sink',text:'Water is leaking from [where]. It started on [date]. [Describe any damage, e.g. the cupboard base is wet.] Please could someone fix it as soon as possible?'},
 heating:{urgent:true,loc:'Boiler',text:'There is no [heating / hot water] since [date]. The boiler shows [error code or light, if any]. Please could someone check it urgently?'},
 lock:{urgent:true,loc:'Front door lock',text:'The [front door / window] lock is broken and the property cannot be secured. It happened on [date]. Please could someone repair it urgently?'},
 electrics:{urgent:true,loc:'Sockets',text:'[Lights / sockets] in [room] stopped working on [date]. The fuse box [has / has not] tripped. Please could an electrician check it?'},
 mould:{urgent:false,loc:'Bathroom ceiling',text:'There is black mould on [where], about [size]. I first noticed it on [date]. I ventilate the room regularly. Please could you arrange treatment?'},
 appliance:{urgent:false,loc:'Washing machine',text:'The [appliance] is not working: [what happens]. It started on [date]. Please could someone repair or replace it?'},
 pests:{urgent:false,loc:'Kitchen',text:'I have seen [mice / insects] in [room] since [date]. Please could you arrange pest control?'}
};
function repairHelper(){
 return `<section class="helper"><h3>${t('helper.title')}</h3><p class="help">${t('helper.help')}</p><div class="row chips">${Object.keys(REPAIR_TPL).map(k=>`<button type="button" class="chip" data-tpl="${k}">${t('tpl.'+k+'.label')}</button>`).join('')}</div><div id="tpl-preview" aria-live="polite"></div></section>`;
}

// ── Evidence pack ───────────────────────────────────────────────────
// One printable record of a tenancy: inventory, tenant checks, dated notes,
// repairs with their logs, and the move-out comparison. Each record shows a
// short fingerprint (a checksum of its content) so later changes can be
// spotted; a real product would use a cryptographic hash stored on a server.
function fingerprint(value){
 const s=JSON.stringify(value??null);let a=0x811c9dc5,b=0x01000193;
 for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);a=Math.imul(a^c,16777619)>>>0;b=Math.imul(b^c,2246822519)>>>0}
 return (a.toString(16).padStart(8,'0')+b.toString(16).padStart(8,'0')).replace(/(.{4})(?=.)/g,'$1 ');
}
const fpLine=v=>`<small class="fingerprint">${t('pack.fingerprint')}: <code>${fingerprint(v)}</code></small>`;
function packPage(){
 const p=prop(propId),tn=findTenancy(p,packTn);
 if(!tn||!(isManager(p)||tn.tenantIds.includes(db.session)))return home();
 const ids=tn.selfManaged||p.selfManaged?p.spaces.map(s=>s.id):checkSpaceIds(p,tn);
 const inTenancy=x=>(!tn.start||x.created>=tn.start)&&(!tn.end||x.created<=tn.end);
 const people=tn.tenantIds.map(id=>esc(personName(id))).join(', ');
 const section=id=>{
  const s=spaceOf(p,id),r=p.records[id],checks=checksFor(p,id).filter(c=>tn.tenantIds.includes(c.who));
  const tickets=p.tickets.filter(x=>x.spaceId===id&&inTenancy(x)&&canSee(p,x.spaceId));
  return `<section class="card pack-space"><h2>${esc(spaceName(s))}${p.mode==='rooms'&&s.shared?' · '+t('kind.shared'):''}</h2><h3>${t('pack.moveIn')}</h3>${evidence(r,t('home.noRecord'))}${r?fpLine(r):''}${checks.length?`<h3>${t('check.resultsTitle')}</h3><ul class="check-results">${checks.map(c=>`<li class="${c.status}"><span class="mark" aria-hidden="true">${c.status==='ok'?'✓':'⚠'}</span> <strong>${esc(personName(c.who))}</strong> · ${t('check.'+c.status)} <small>${dateText(c.at)}</small>${c.note?`<br>${userText(c.note)}`:''}${c.photo?media(c.photo):''}</li>`).join('')}</ul>`:''}${tickets.length?`<h3>${t('pack.repairs')}</h3>${tickets.map(x=>`<div class="pack-ticket"><p><strong>${esc(x.location)}</strong> · ${statusLabel(x.status)} · ${t('repair.reportedBy',{name:esc(personName(x.reporterId)),date:dateText(x.created)})}</p><p>${userText(x.description)}</p>${media(x.photo)}<ol class="update-log">${(x.updates||[]).map(u=>`<li><strong>${esc(personName(u.by))}</strong> · ${u.status!=null?statusLabel(u.status):t('update.comment')} <small>${dateText(u.at)}</small>${u.note?`<br>${userText(u.note)}`:''}</li>`).join('')}</ol>${x.after?evidence(x.after,''):''}${fpLine(x)}</div>`).join('')}`:''}</section>`;
 };
 const co=tn.checkout,tot=co?checkoutTotals(tn):null;
 const checkout=co&&co.status!=='draft'?`<section class="card"><h2>${t('checkout.title')}</h2><p>${t('checkout.status.'+co.status)} · ${t('checkout.summaryProposed',{amount:money(tot.proposed)})}${co.status==='responded'?` · ${t('checkout.summaryAgreed',{amount:money(tot.agreed)})} · ${t('checkout.summaryDisputed',{amount:money(tot.disputed)})}`:''}</p>${tn.spaceIds.map(id=>{const i=co.items?.[id];return i?`<p><strong>${esc(spaceName(spaceOf(p,id)))}</strong> · ${t('checkout.outcome.'+i.outcome)}${i.outcome==='damage'?' · '+money(i.amount):''}<br>${userText(i.notes)}</p>`:''}).join('')}${fpLine(co)}</section>`:'';
 const whole={property:p.id,tenancy:tn,records:ids.map(id=>p.records[id]||null),tickets:p.tickets.filter(x=>ids.includes(x.spaceId)&&inTenancy(x))};
 return `<div class="panel pack"><section class="card"><div class="eyebrow">${t('pack.eyebrow')}</div><div class="row spread"><h1>${esc(p.name)}</h1>${actionBtn(t('checkout.print'),'print',true)}</div><p>${esc(p.address||'')}</p><p>${tenancyLabel(p,tn)}${people?' · '+people:''}${tn.start?' · '+t('tenancy.dates',{start:dateText(tn.start),end:tn.end?dateText(tn.end):t('tenancy.open')}):''}</p><p class="help">${t('pack.generated',{date:dateText(today()),name:esc(me().name)})}</p><p class="help">${t('pack.help')}</p>${fpLine(whole)}</section>${ids.map(section).join('')}${checkout}</div>`;
}

// ── Usability feedback ──────────────────────────────────────────────
// For testing the prototype with students: record how a task went and export
// all answers as a CSV file for the report.
const FEEDBACK_TASKS=['report','check','join','checkout','translate','other'];
function feedbackForm(){
 const list=db.feedback||[];
 return `<form id="feedback"><label>${t('feedback.task')} <select name="task">${FEEDBACK_TASKS.map(k=>`<option value="${k}">${t('feedback.task.'+k)}</option>`).join('')}</select></label><fieldset class="inline-choice"><legend>${t('feedback.done')}</legend>${['yes','partly','no'].map(k=>`<label class="check"><input type="radio" name="done" value="${k}" ${k==='yes'?'checked':''}> ${t('feedback.done.'+k)}</label>`).join('')}</fieldset><fieldset class="inline-choice"><legend>${t('feedback.ease')}</legend>${[1,2,3,4,5].map(n=>`<label class="check"><input type="radio" name="ease" value="${n}" ${n===4?'checked':''}> ${n}</label>`).join('')}</fieldset><label>${t('feedback.comment')} ${optional()}<textarea name="comment" rows="2"></textarea></label><div class="row"><button class="primary">${t('feedback.save')}</button>${list.length?actionBtn(t('feedback.export',{n:list.length}),'export-feedback'):''}</div></form>`;
}
function exportFeedback(){
 const rows=[['time','account','role','language','task','completed','ease_1_to_5','comment'],...(db.feedback||[]).map(f=>[f.at,f.name,f.role,f.lang,f.task,f.done,f.ease,f.comment])];
 const csv=rows.map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
 const url=URL.createObjectURL(new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=`homelog-feedback-${today()}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

// ── Page for landlords: value and concept pricing ──────────────────
function aboutPage(){
 const plans=['free','pro','agency'];
 return `<div class="panel"><section class="hero about-hero"><div><div class="eyebrow">${t('about.eyebrow')}</div><h1>${t('about.title')}</h1><p>${t('about.lead')}</p><div class="row">${btn(t('about.tryLandlord'),'signin',true)}</div></div></section><div class="grid three">${[1,2,3].map(n=>`<section class="card"><h3>${t('about.value.'+n+'.title')}</h3><p>${t('about.value.'+n+'.body')}</p></section>`).join('')}</div><section class="card"><h2>${t('about.tenantTitle')}</h2><p>${t('about.tenantBody')}</p></section><section class="card"><h2>${t('about.pricingTitle')}</h2><p class="help">${t('about.pricingHelp')}</p><div class="grid three">${plans.map(k=>`<div class="plan-card"><h3>${t('about.plan.'+k+'.name')}</h3><p class="price">${t('about.plan.'+k+'.price')}</p><p>${t('about.plan.'+k+'.body')}</p></div>`).join('')}</div></section></div>`;
}

// ── Demo panel: account switcher and guided tour ────────────────────
// For presentations: switch between demo accounts without signing out,
// and walk through the main story step by step.
const TOUR=[
 {as:'t-wei',run:()=>{spaceSel='b1';floorSel=null;go('home')}},
 {as:'t-aisha',run:()=>{const p=tenantHome();if(p)propId=p.id;go(p&&myCheckDue(p)?'check':'home')}},
 {as:'ll-main',run:()=>go('home')},
 {as:'ll-main',run:()=>{propId='alder';spaceSel='b1';floorSel=null;go('property')}},
 {as:'ll-main',run:()=>{propId='alder';ticketSel='k2';go('repair')}},
 {as:'t-wei',run:()=>{propId='alder';ticketSel='k2';go('repair')}},
 {as:'ll-main',run:()=>{propId='alder';const tn=findTenancy(prop('alder'),'alder-b4');if(tn&&!tn.checkout){tn.checkout={status:'draft',items:{}};save()}checkoutTn='alder-b4';go('checkout')}},
 {as:'t-lucas',run:()=>{propId='alder';const co=findTenancy(prop('alder'),'alder-b4')?.checkout;if(co&&co.status!=='draft'){checkoutTn='alder-b4';go('checkout')}else go('home')}},
 {as:'t-new',run:()=>go(tenantHome()?'home':'link')}
];
function switchTo(id){
 db.session=id;trail=['start'];page='start';propId=spaceSel=floorSel=editId=draft=null;checkOpen=null;repairFilter='All';
 if(db.accounts[id])db.accounts[id].seenIntro=true;
}
function runTour(i){
 tourStep=Math.max(0,Math.min(TOUR.length-1,i));
 const step=TOUR[tourStep];
 if(db.session!==step.as)switchTo(step.as);
 step.run();save();
}
function renderDemo(){
 const fab=document.querySelector('#demo-fab'),panel=document.querySelector('#demo-panel');
 fab.textContent=t('demo.button');fab.setAttribute('aria-expanded',demoOpen);
 panel.hidden=!demoOpen;if(!demoOpen)return;
 const accounts=Object.values(db.accounts).filter(a=>a.demo);
 const n=tourStep+1;
 const tour=tourStep<0
  ?`<p class="help">${t('tour.intro')}</p>${actionBtn(t('tour.start'),'tour-start',true)}`
  :`<p class="tour-step"><strong>${t('tour.stepOf',{n,total:TOUR.length})} · ${t('tour.'+n+'.title')}</strong></p><p>${t('tour.'+n+'.body')}</p><p class="help">${t('tour.as',{name:esc(db.accounts[TOUR[tourStep].as]?.name||'')})}</p><div class="row">${actionBtn(t('tour.prev'),'tour-prev',false,tourStep===0?'disabled':'')}${tourStep<TOUR.length-1?actionBtn(t('tour.next'),'tour-next',true):actionBtn(t('tour.finish'),'tour-end',true)}${tourStep<TOUR.length-1?actionBtn(t('tour.exit'),'tour-end'):''}</div>`;
 panel.innerHTML=`<div class="row spread"><h2>${t('demo.title')}</h2><button type="button" class="close" data-action="demo-panel" aria-label="${t('demo.close')}">✕</button></div><section><h3>${t('tour.title')}</h3>${tour}</section><section><h3>${t('demo.switch')}</h3><ul class="switch-list">${accounts.map(a=>`<li><button type="button" data-switch="${a.id}" aria-pressed="${a.id===db.session}">${avatar(a.name,'small')}<span><strong>${esc(a.name)}</strong> · ${t('role.'+a.role)}<br><small>${t(a.demo)}</small></span></button></li>`).join('')}</ul></section><section><h3>${t('feedback.title')}</h3><p class="help">${t('feedback.help')}</p>${feedbackForm()}</section><section><h3>${t('about.eyebrow')}</h3>${btn(t('about.open'),'about')}</section><section><h3>${t('demo.resetTitle')}</h3><p class="help">${t('demo.resetHelp')}</p>${actionBtn(t('demoData.reset'),'reset')}</section>`;
}

// ── Pages: getting started (tenant) ─────────────────────────────────
function moveIn(){return `<div class="panel"><h1>${t('moveIn.title')}</h1><div class="grid"><section class="card"><h2>${t('moveIn.linkTitle')}</h2><p>${t('moveIn.linkBody')}</p>${btn(t('moveIn.linkButton'),'link',true)}</section><section class="card"><h2>${t('moveIn.ownTitle')}</h2><p>${t('moveIn.ownBody')}</p>${actionBtn(t('moveIn.ownButton'),'add-property',true)}</section></div></div>`}
function linkRoom(){return `<section class="panel card"><h1>${t('link.title')}</h1><p>${t('link.intro')}</p><form id="link-room"><label>${t('link.code')} <input name="code" required autocapitalize="characters" spellcheck="false" placeholder="${t('link.placeholder')}"></label><p>${t('link.hint')}</p><button class="primary">${t('link.submit')}</button></form></section>`}

// ── Pages: adding a property (landlord, or tenant's own record) ─────
function setup(){
 const match=postcodeSearched&&postcodeKey(postcodeQuery)==='E18ER';
 return `<section class="panel card"><div class="steps">${t('flow.step',{n:1,total:isLandlord()?5:4})}</div><h1>${t('setup.title')}</h1><form id="postcode-search"><label>${t('setup.postcode')} <input name="postcode" required maxlength="12" autocomplete="postal-code" placeholder="${t('setup.postcodePlaceholder')}" value="${esc(postcodeQuery)}"></label><p class="help">${t('setup.hint')}</p><div class="setup-actions"><button class="primary">${t('setup.find')}</button>${btn(t('setup.upload'),'upload')}</div></form>${postcodeSearched?(match?`<section class="postcode-result"><h2>${sampleProperty.name}</h2><p>${sampleProperty.address} · ${t('setup.sampleResult')}</p><img src="demo/floor-plan.png" alt="${t('setup.planAlt',{name:sampleProperty.name})}"><div class="setup-actions"><button type="button" class="primary" data-action="use-found-plan">${t('setup.usePlan')}</button></div></section>`:`<p>${t('setup.noMatch')}</p>`):''}</section>`;
}
function upload(){
 draft??={};
 return `<div class="panel"><section class="card"><div class="steps">${t('flow.step',{n:2,total:isLandlord()?5:4})}</div><h2>${t('upload.title')}</h2><form id="setup"><label>${t('upload.name')} <input name="name" required placeholder="${t('upload.namePlaceholder')}" value="${esc(foundProperty?.name||draft.name||'')}"></label><div class="grid"><label>${t('upload.address')} ${optional()}<input name="address" value="${esc(foundProperty?.address||draft.address||'')}"></label><label>${t(isLandlord()?'upload.availableDate':'upload.date')} ${optional()}<input type="date" name="date" value="${esc(draft.date||'')}"></label></div><div class="choices setup-actions">${[['upload','upload.methodPlan'],['video','upload.methodVideo']].map(([id,label])=>`<button type="button" data-method="${id}" aria-pressed="${method===id}">${t(label)}</button>`).join('')}</div><div id="material"></div><div class="setup-actions"><button class="primary">${t(isLandlord()?'upload.nextMode':'upload.nextSpaces')}</button></div></form></section></div>`;
}
function showMaterial(){
 const box=document.querySelector('#material');if(!box)return;
 const video=method==='video';
 box.innerHTML=`<label>${t(video?'upload.videoLabel':'upload.planLabel')} ${optional(true)}${filePicker(`id="file" type="file" accept="${video?'video/*':'image/png,image/jpeg,image/webp,application/pdf'}" ${video?'capture="environment"':''}`)}</label><p>${t(video?'upload.videoHelp':'upload.planHelp')}</p><div id="material-preview">${media(material)}</div>`;
}
function modePage(){
 if(!draft)return home();
 return `<div class="panel"><div class="steps">${t('flow.step',{n:3,total:5})}</div><h1>${t('mode.title')}</h1><p>${t('mode.intro')}</p><div class="grid">${['joint','rooms'].map(m=>`<section class="card choice-card"><h2>${t('mode.'+m)} ${term(m==='joint'?'joint':'hmo')}</h2><p>${t('mode.'+m+'Body')}</p><p class="help">${t('mode.'+m+'Example')}</p><button type="button" class="${draft.mode===m?'primary':''}" data-mode="${m}">${t('mode.choose'+(m==='joint'?'Joint':'Rooms'))}</button></section>`).join('')}</div></div>`;
}
function defaultSpaces(mode){
 const s=(type,shared,n)=>({type,shared,name:t(n?'space.'+type+'N':'type.'+type,{n})});
 return mode==='rooms'?[s('bedroom',false,1),s('bedroom',false,2),s('bedroom',false,3),s('kitchen',true),s('living',true),s('bathroom',true)]:[s('living',false),s('bedroom',false,1),s('kitchen',false),s('bathroom',false)];
}
function spacesPage(){
 if(!draft)return home();
 const mode=isLandlord()?draft.mode:'joint';
 draft.spaces??=defaultSpaces(mode);
 const rooms=mode==='rooms';
 return `<div class="panel"><section class="card"><div class="steps">${t('flow.step',{n:isLandlord()?4:3,total:isLandlord()?5:4})}</div><h1>${t('spaces.editTitle')}</h1><p>${t(rooms?'spaces.editIntroRooms':'spaces.editIntro')}</p><form id="spaces"><ol class="space-editor">${draft.spaces.map((s,i)=>`<li><label>${t('spaces.name')} <input name="name-${i}" required maxlength="40" value="${esc(s.name)}"></label><label>${t('spaces.type')} <select name="type-${i}">${SPACE_TYPES.map(ty=>`<option value="${ty}" ${s.type===ty?'selected':''}>${t('type.'+ty)}</option>`).join('')}</select></label>${rooms?`<label class="check"><input type="checkbox" name="shared-${i}" ${s.shared?'checked':''}> ${t('spaces.sharedArea')}</label>`:''}<button type="button" class="remove" data-remove-space="${i}" aria-label="${t('spaces.removeLabel',{name:esc(s.name)})}">${t('spaces.remove')}</button></li>`).join('')}</ol><div class="row">${actionBtn(t('spaces.add'),'add-space')}</div><div class="setup-actions"><button class="primary">${t('spaces.next')}</button></div></form></section></div>`;
}
function readSpacesForm(){
 const form=document.querySelector('#spaces');if(!form||!draft?.spaces)return;
 const data=new FormData(form);
 draft.spaces=draft.spaces.map((s,i)=>({type:String(data.get('type-'+i)||s.type),name:String(data.get('name-'+i)??s.name),shared:form.elements['shared-'+i]?form.elements['shared-'+i].checked:s.shared}));
}
function records(){
 const p=prop(editId);if(!p||!isManager(p))return home();
 if(!spaceOf(p,recordSpace))recordSpace=p.spaces[0]?.id;
 const s=spaceOf(p,recordSpace),item=p.records[recordSpace]||{};
 const count=p.spaces.filter(x=>p.records[x.id]).length,locked=spaceLocked(p,recordSpace);
 return `<div class="panel"><section class="card">${p.ready?'':`<div class="steps">${t('flow.step',{n:isLandlord()?5:4,total:isLandlord()?5:4})}</div>`}<div class="row spread"><h2>${t('records.title')} · ${esc(p.name)}</h2>${pill(t('records.count',{count,total:p.spaces.length}))}</div><div class="row">${p.spaces.map(x=>`<button type="button" data-record-space="${x.id}" aria-pressed="${x.id===recordSpace}" class="${x.id===recordSpace?'primary':''}">${esc(spaceName(x))}${p.records[x.id]?' ✓':''}</button>`).join('')}</div><p><strong>${t('records.whatToRecord')}</strong> &nbsp; ${t('records.tip.'+(s?.type||'other'))}</p>${locked?`${evidence(p.records[recordSpace],t('home.noRecord'))}<p class="help lock-note">🔒 ${t('lock.recordsLocked')}</p>${addendumForm(recordSpace)}<div class="row">${btn(t(p.ready?'records.done':'records.finish'),'finish')}</div>`:`<form id="record"><label>${t('records.condition')} <textarea name="notes" required placeholder="${t('records.conditionPlaceholder')}">${esc(drafts[recordSpace]??item.notes)}</textarea></label><label>${t('records.photo')} ${optional()}${filePicker('type="file" name="photo" accept="image/png,image/jpeg,image/webp"')}</label>${media(item.photo)}<div class="row"><button class="primary">${t('records.save')}</button>${btn(t(p.ready?'records.done':'records.finish'),'finish')}</div></form>`}</section><section class="card"><h3>${t('records.importTitle')}</h3><form id="import"><label>${t('records.importLabel')} <textarea name="existing" placeholder="${esc(t('records.importPlaceholder'))}" required>${esc(importText)}</textarea></label><button>${t('records.importButton')}</button></form></section></div>`;
}
function uniqueCode(base){
 const all=new Set(db.properties.flatMap(p=>p.tenancies.map(x=>x.code)));
 let code=base,i=2;while(all.has(code))code=base+'-'+i++;
 return code;
}
function finishSetup(){
 const p=prop(editId);if(!p)return go('home');
 if(!p.ready){
  p.ready=true;
  if(p.selfManaged)p.tenancies=[{id:'self',spaceIds:p.spaces.map(s=>s.id),tenantIds:[db.session]}];
  else{
   const prefix=(p.name.toUpperCase().replace(/[^A-Z0-9 ]/g,'').trim().split(/\s+/).find(w=>/[A-Z]/.test(w))||'HOME').slice(0,6);
   p.tenancies=p.mode==='rooms'
    ?p.spaces.filter(s=>!s.shared).map((s,i)=>({id:'tn'+(db.seq++),spaceIds:[s.id],tenantIds:[],code:uniqueCode(prefix+'-R'+(i+1)),inventory:'none'}))
    :[{id:'tn'+(db.seq++),spaceIds:p.spaces.map(s=>s.id),tenantIds:[],code:uniqueCode(prefix+'-HOME'),inventory:'none'}];
  }
  propId=p.id;spaceSel=null;floorSel=null;trail=p.selfManaged?['start']:['start','home'];
  page='records';go(p.selfManaged?'home':'property',{replace:true});save(t(p.selfManaged?'msg.moveInSaved':'msg.propertyCreated'));
 } else {propId=p.id;go('back');save(t('msg.moveInSaved'))}
}

// ── Pages: items, repairs ───────────────────────────────────────────
function assetDetail(){
 const p=prop(propId),it=p?.items?.find(x=>x.id===itemSel);
 if(!it||!canSee(p,it.spaceId))return home();
 const n=p.items.indexOf(it)+1,hk='item.'+it.id+'.history';
 const history=p.tickets.filter(x=>x.itemId===it.id&&canSee(p,x.spaceId)).slice().reverse();
 return `<div class="panel"><section class="card"><div class="eyebrow">${t('asset.eyebrow',{id:n,room:esc(spaceName(spaceOf(p,it.spaceId)))})}</div><h1>${esc(itemName(it))}</h1>${demoImg(it.photo,t('asset.photoAlt',{name:itemName(it)}),'asset-photo')}<small>${t('asset.illustrative')}</small><h2>${t('asset.condition')}</h2><p>${t('item.'+it.id+'.notes')}</p>${actionBtn(t('asset.report'),'report-item',true)}</section><section class="card"><h2>${t('asset.history')}</h2><ul class="history">${history.map(x=>`<li><button type="button" data-ticket="${x.id}">${esc(x.description)} · ${statusLabel(x.status)}</button></li>`).join('')}${has(hk)?`<li><strong>${t('asset.previous')}</strong><br>${t(hk)}</li>`:''}${!history.length&&!has(hk)?`<li>${t('asset.noHistory')}</li>`:''}</ul></section></div>`;
}
function report(){
 const p=prop(propId);if(!p)return home();
 const it=p.items?.find(x=>x.id===reportCtx.itemId);
 const fixed=it?spaceOf(p,it.spaceId):null;
 const choices=p.spaces.filter(s=>canSee(p,s.id));
 const pre=reportCtx.spaceId||spaceSel;
 return `<section class="panel card"><h2>${t(it?'report.titleItem':'report.title')}</h2>${it?`<p><strong>${esc(itemName(it))}</strong> · ${esc(spaceName(fixed))}</p>`:''}<p>${t('report.intro')}</p><form id="report">${it?'':`<label>${t('report.room')} <select name="space">${choices.map(s=>`<option value="${s.id}" ${s.id===pre?'selected':''}>${esc(spaceName(s))}${p.mode==='rooms'&&s.shared?' · '+t('kind.shared'):''}</option>`).join('')}</select></label><div id="dup-hint">${dupHint(p,pre)}</div>`}${p.mode==='rooms'&&!it?`<p class="help">${t('report.sharedHelp')}</p>`:''}${lang==='en'?'':repairHelper()}<label>${t('report.location')} <input name="location" required value="${it?esc(itemName(it)):''}" placeholder="${t('report.locationPlaceholder')}"></label><label>${t('report.description')} <textarea name="description" required></textarea></label><label>${t('report.noticed')} ${optional()}<input type="date" name="noticed"></label><label>${t('report.priority')} <select name="priority">${['Routine','Urgent'].map(v=>`<option value="${v}">${priorityLabel(v)}</option>`).join('')}</select></label><label>${t('report.photo')} ${optional(true)}${filePicker('name="photo" type="file" accept="image/png,image/jpeg,image/webp" capture="environment"')}</label><label>${t('common.photoTakenOn')} ${optional()}<input type="date" name="photoDate"></label><button class="primary">${t('report.save')}</button></form></section>`;
}
function repair(){
 const p=prop(propId),x=p?.tickets.find(k=>k.id===ticketSel);
 if(!x||!canSee(p,x.spaceId))return home();
 const s=spaceOf(p,x.spaceId),status=statusLabel(x.status),roomName=esc(spaceName(s));
 const shared=p.mode==='rooms'&&s?.shared,manage=isManager(p),mine=x.reporterId===db.session;
 const people=[x.reporterId,...(x.affected||[])].filter(Boolean);
 const reporter=x.reporterId?(mine?t('repair.reportedByYou',{date:dateText(x.created)}):t('repair.reportedBy',{name:esc(personName(x.reporterId)),date:dateText(x.created)})):'';
 // The landlord (or a tenant keeping their own record) moves the repair forward.
 const step=manage?['ack','start','done'][x.status]:null;
 const stepForm=step?`<form id="repair-step" class="step-form" data-step="${step}"><h3>${t('step.'+step+'.title')}</h3><p class="help">${t('step.'+step+'.help')}</p>${step==='ack'?`<label>${t('step.visitDate')} ${optional()}<input type="date" name="date"></label>`:''}${step==='start'?`<label>${t('step.contractor')} ${optional()}<input name="contractor" maxlength="60" value="${esc(x.contractor||'')}" placeholder="${t('step.contractorPlaceholder')}"></label>`:''}${step==='done'?`<label>${t('step.cost')} ${optional()}<input name="cost" type="number" min="0" step="1" inputmode="numeric"></label>`:''}<label>${t(step==='done'?'step.doneNote':'step.note')} ${step==='done'?'':optional()}<textarea name="note" ${step==='done'?'required':''}></textarea></label>${step==='done'?`<label>${t('repair.afterPhoto')} ${optional(true)}${filePicker('name="photo" type="file" accept="image/png,image/jpeg,image/webp"')}</label>`:''}<button class="primary">${t('step.'+step+'.button')}</button></form>`:'';
 // The person who reported it signs off.
 const canSignOff=x.status===3&&(mine||(p.selfManaged&&manage));
 const waiting=x.status<3&&!manage?t('repair.tenantWaiting'):x.status===3&&!canSignOff?t(manage?'repair.waitingSignOff':'repair.waitingReporter'):'';
 const log=(x.updates||[]).slice().reverse().map(u=>`<li><div><strong>${esc(personName(u.by))}</strong> · ${u.status!=null?statusLabel(u.status):t('update.comment')} <small>${dateText(u.at)}</small></div>${u.visit?`<small>${t('step.visitOn',{date:dateText(u.visit)})}</small>`:''}${u.contractor?`<small> ${t('step.contractorIs',{name:esc(u.contractor)})}</small>`:''}${u.cost!=null&&manage?`<small> · ${t('step.costIs',{amount:money(u.cost)})}</small>`:''}${u.note?`<p>${userText(u.note)}</p>`:''}</li>`).join('');
 const afterItem=x.after||x.completion;
 const signOff=canSignOff?`<section class="card"><h3>${t('repair.reviewTitle')}</h3>${x.completion?.notes?`<p><strong>${t('step.doneNote')}</strong></p><p class="notes">${esc(x.completion.notes)}</p>`:''}<p>${t('repair.reviewHint')}</p><form id="accept"><label>${t('repair.signOffNotes')} <textarea name="notes" required></textarea></label><label>${t('repair.afterPhoto')} ${optional()}${filePicker('name="photo" type="file" accept="image/png,image/jpeg,image/webp"')}</label><label>${t('common.photoTakenOn')} ${optional()}<input type="date" name="photoDate"></label><button class="primary">${t('repair.signOff')}</button></form>${actionBtn(t('repair.reopen'),'reopen',false,'style="margin-top:10px"')}</section>`:'';
 return `<section class="card"><div class="row spread"><h2>${roomName} · ${esc(x.location)}</h2>${pill(status)}</div><p>${priorityPill(x.priority)||esc(priorityLabel(x.priority))}${x.noticed?` · ${t('repair.firstNoticed',{date:dateText(x.noticed)})}`:''}${reporter?' · '+reporter:''}${shared?' · '+pill(t('kind.shared')):''}</p><p>${userText(x.description)}</p>${x.contractor||(manage&&x.cost)?`<p class="help">${[x.contractor&&t('step.contractorIs',{name:esc(x.contractor)}),manage&&x.cost&&t('step.costIs',{amount:money(x.cost)})].filter(Boolean).join(' · ')}</p>`:''}${isOverdue(x)?`<p>${pill(t('sla.overdue'),'urgent')} ${t(manage?'sla.landlordHelp':'sla.tenantHelp')}</p>`:''}${people.length>1?`<p><strong>${t('affected.count',{n:people.length})}</strong>: ${people.map(id=>esc(firstName(id))).join(', ')}</p>`:''}<progress class="repair-meter" aria-label="${t('repair.progressAria',{status})}" value="${x.status+1}" max="5"></progress><ol class="timeline steps-inline">${[0,1,2,3,4].map(i=>`<li ${i===x.status?'aria-current="step"':''}>${i<x.status?'✓ ':''}${statusLabel(i)}</li>`).join('')}</ol>${waiting?`<p class="help">${waiting}</p>`:''}${!manage&&shared&&x.status<4?affectBtn(x):''}${stepForm}</section>${signOff}<div class="grid evidence ${afterItem?'comparison':''}"><section class="card"><h3>${t('repair.atMoveIn',{room:roomName})}</h3>${evidence(x.baseline,t('repair.noBaseline'))}</section><section class="card"><h3>${t('repair.before')}</h3>${evidence(x,'')}</section>${afterItem?`<section class="card evidence"><h3>${t('repair.after')}</h3>${evidence(afterItem,'')}</section>`:''}</div><section class="card"><h3>${t('repair.updates')}</h3>${log?`<ol class="update-log">${log}</ol>`:''}<details><summary>${t('update.add')}</summary><form id="repair-comment"><label>${t('update.note')} <textarea name="note" required></textarea></label><button class="primary">${t('update.save')}</button></form></details></section>`;
}

// ── Rendering ───────────────────────────────────────────────────────
const PAGES={start,signin:signIn,'move-in':moveIn,link:linkRoom,setup,upload,mode:modePage,spaces:spacesPage,records,home,property:propertyPage,asset:assetDetail,report,repair,profile,check:checkPage,inbox,checkout:checkoutPage,pack:packPage,about:aboutPage};
function render(){
 lang=i18n[db.prefs.lang]?db.prefs.lang:'en';
 document.documentElement.lang=t('locale');
 document.title=t('app.title');
 applyTheme();
 document.querySelector('nav').setAttribute('aria-label',t('nav.label'));
 document.querySelector('nav .logo').setAttribute('aria-label',t('nav.home'));
 document.querySelector('nav [data-go="home"]').textContent=t(isLandlord()?'nav.properties':'nav.dashboard');
 document.querySelector('#account-nav').textContent=me()?t('nav.account'):t('nav.signIn');
 document.querySelector('#account-nav').dataset.go=me()?'profile':'signin';
 const inboxNav=document.querySelector('#inbox-nav'),unread=me()?unreadCount():0;
 inboxNav.hidden=!me();
 inboxNav.innerHTML=`<span aria-hidden="true">🔔</span>${unread?`<span class="badge" aria-hidden="true">${unread}</span>`:''}`;
 inboxNav.setAttribute('aria-label',t('nav.inbox')+(unread?' · '+t('inbox.unreadLabel',{n:unread}):''));
 const langSwitch=document.querySelector('#lang-switch'),languages=Object.keys(i18n);
 langSwitch.hidden=languages.length<2;
 langSwitch.setAttribute('aria-label',t('settings.language'));
 langSwitch.innerHTML=languages.map(code=>`<option value="${code}" ${code===lang?'selected':''}>${esc(i18n[code]['lang.name']||code)}</option>`).join('');
 const back=document.querySelector('[data-go="back"]');
 back.textContent=t('nav.back');
 back.hidden=page==='start'||!trail.length;
 const navPage=page==='property'?'home':page==='signin'?'signin':page;
 for(const control of document.querySelectorAll('nav [data-go]')){
  if(control.dataset.go===navPage)control.setAttribute('aria-current','page');
  else control.removeAttribute('aria-current');
 }
 app.innerHTML=(PAGES[page]||start)();
 showMaterial();
 renderDemo();
}

// ── Files ───────────────────────────────────────────────────────────
function fileData(file,types){
 if(!file||!file.size)return Promise.resolve(null);
 if(file.size>2*1024*1024)return Promise.reject(new Error(t('err.fileTooLarge')));
 if(!types.some(x=>x.endsWith('/')?file.type.startsWith(x):file.type===x))return Promise.reject(new Error(t('err.fileType')));
 return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve({src:r.result,type:file.type,name:file.name,uploadedAt:new Date().toISOString()});r.onerror=()=>reject(new Error(t('err.fileRead')));r.readAsDataURL(file)});
}
const images=['image/png','image/jpeg','image/webp'];
document.addEventListener('error',e=>{
 const img=e.target;
 if(img.tagName!=='IMG'||!img.dataset.demo)return;
 const rest=(img.dataset.next||'').split(',').filter(Boolean);
 if(rest.length){img.dataset.next=rest.slice(1).join(',');img.src=`demo/${img.dataset.demo}.${rest[0]}`;return}
 const ph=document.createElement('div');
 ph.className='img-placeholder '+img.className;ph.setAttribute('role','img');ph.setAttribute('aria-label',img.alt||t('img.pending'));
 ph.innerHTML=`<span aria-hidden="true">📷</span><small>${esc(t('img.pending'))}</small>`;
 img.replaceWith(ph);
},true);

// ── Events ──────────────────────────────────────────────────────────
function keepRecordDraft(){
 const draftBox=document.querySelector('#record textarea'),p=prop(editId);
 if(draftBox&&p&&draftBox.value!==(p.records[recordSpace]?.notes||''))drafts[recordSpace]=draftBox.value;
}
function showIntro(){
 const a=me();if(!a||a.seenIntro)return;
 const role=a.role==='landlord'?'landlord':'tenant';
 showDialog(`<h2 id="info-title">${t('intro.title',{name:esc(a.name.split(' ')[0])})}</h2><p>${t('intro.'+role+'.lead')}</p><ol class="intro-steps">${[1,2,3].map(n=>`<li><strong>${t('intro.'+role+'.'+n+'.title')}</strong><br>${t('intro.'+role+'.'+n+'.body')}</li>`).join('')}</ol><p class="help">${t('intro.help')}</p>`);
 a.seenIntro=true;save();
}
function login(id){
 db.session=id;trail=[];page='start';propId=spaceSel=floorSel=editId=draft=null;repairFilter='All';
 go('home');save(t('msg.signedIn',{name:db.accounts[id].name}));showIntro();
}
function startAddProperty(){draft={};editId=null;foundProperty=null;material=null;materialPending=false;materialVersion++;postcodeQuery='';postcodeSearched=false;go('setup')}
document.addEventListener('change',async e=>{
 if(e.target.name==='space'&&e.target.closest('#report')){const box=document.querySelector('#dup-hint');if(box)box.innerHTML=dupHint(prop(propId),e.target.value);return}
 if(e.target.id==='lang-switch'){
  if(!i18n[e.target.value])return;
  keepRecordDraft();readSpacesForm();
  db.prefs.lang=e.target.value;render();save();return;
 }
 if(e.target.type==='file'){
  const status=e.target.parentElement.querySelector('.file-picker-status');
  if(status)status.textContent=e.target.files[0]?.name||t('common.noFile');
 }
 if(e.target.id!=='file')return;
 const version=++materialVersion;material=null;materialPending=true;notice.textContent='';
 try{const loaded=await fileData(e.target.files[0],method==='video'?['video/']:[...images,'application/pdf']);if(version===materialVersion){material=loaded;document.querySelector('#material-preview')?.replaceChildren(document.createRange().createContextualFragment(media(material)))}}
 catch(err){if(version===materialVersion){notice.textContent=err.message;document.querySelector('#material-preview')?.replaceChildren()}}
 finally{if(version===materialVersion)materialPending=false}
});
// SVG rooms and pins act as buttons: support Enter and Space.
document.addEventListener('keydown',e=>{
 const g=e.target.closest?.('svg [role="button"]');
 if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();g.dispatchEvent(new MouseEvent('click',{bubbles:true}))}
});
document.addEventListener('click',e=>{
 const b=e.target.closest('button,svg [data-space],svg [data-item]');if(!b)return;
 const d=b.dataset;
 if(d.action==='signout'){db.session=null;trail=[];page='start';render();save(t('msg.signedOut'));return}
 if(d.action==='reset'){const prefs=db.prefs,feedback=db.feedback;db=seedDb();db.prefs=prefs;db.feedback=feedback;trail=[];page='start';drafts={};tourStep=-1;render();save(t('msg.reset'));return}
 if(d.signinRole){signinRole=d.signinRole;render();return}
 if(d.login){login(d.login);return}
 if(d.tr){shownTr.has(d.tr)?shownTr.delete(d.tr):shownTr.add(d.tr);render();document.querySelector(`[data-tr="${d.tr}"]`)?.focus();return}
 if(d.term){showTerm(d.term);return}
 if(d.tpl){
  const tpl=REPAIR_TPL[d.tpl],form=document.querySelector('#report');if(!tpl||!form)return;
  form.elements.description.value=tpl.text;
  if(!form.elements.location.value)form.elements.location.value=tpl.loc;
  form.elements.priority.value=tpl.urgent?'Urgent':'Routine';
  for(const c of document.querySelectorAll('[data-tpl]'))c.setAttribute('aria-pressed',c.dataset.tpl===d.tpl);
  document.querySelector('#tpl-preview').innerHTML=`<p class="tpl-preview"><strong>${t('helper.preview')}</strong> ${t('tpl.'+d.tpl+'.meaning')}</p><p class="help">${t(tpl.urgent?'helper.urgent':'helper.edit')}</p>`;
  form.elements.description.focus();return;
 }
 if(d.switch){switchTo(d.switch);tourStep=-1;go(isLandlord()?'home':'home');save(t('msg.switched',{name:db.accounts[d.switch].name}));return}
 if(d.note){const n=(db.notifications||[]).find(x=>x.id===d.note);if(!n)return;n.read=true;save();openNote(n.link);return}
 if(d.checkout){checkoutTn=d.checkout;go('checkout');return}
 if(d.pack){packTn=d.pack;go('pack');return}
 if(d.renew){const p=prop(propId);if(!p||!landlordView(p))return;const c=p.compliance||={};
  if(d.renew==='deposit')c.deposit={protectedOn:today()};
  else{const years=COMPLIANCE.find(x=>x[0]===d.renew)?.[1]||1;c[d.renew]={expires:addDays(today(),Math.round(365.25*years))}}
  render();save(t('msg.complianceSaved'));return}
 if(d.startCheckout){const tn=findTenancy(prop(propId),d.startCheckout);if(!tn)return;tn.checkout||={status:'draft',items:{}};checkoutTn=tn.id;go('checkout');save(t('msg.checkoutStarted'));return}
 if(d.filter){repairFilter=d.filter;render();return}
 if(d.floor){floorSel=d.floor;render();return}
 if(d.copy){const code=d.copy;Promise.resolve(navigator.clipboard?.writeText(code)).then(()=>{notice.textContent=t('msg.codeCopied',{code})},()=>{notice.textContent=code});return}
 if(d.prop){propId=d.prop;spaceSel=floorSel=null;go('property');return}
 if(d.continue){editId=d.continue;go('records');return}
 if(d.space){spaceSel=d.space;floorSel=null;render();document.querySelector('.space-panel')?.scrollIntoView({block:'nearest'});return}
 if(d.item){itemSel=d.item;go('asset');return}
 if(d.ticket){ticketSel=d.ticket;go('repair');return}
 if(d.mode){if(draft.mode!==d.mode)draft.spaces=null;draft.mode=d.mode;go('spaces');return}
 if(d.recordSpace){keepRecordDraft();recordSpace=d.recordSpace;render();return}
 if(d.removeSpace!==undefined){readSpacesForm();if(draft.spaces.length>1)draft.spaces.splice(Number(d.removeSpace),1);else notice.textContent=t('err.needSpace');render();return}
 if(d.method){method=d.method;material=null;materialPending=false;materialVersion++;for(const x of document.querySelectorAll('[data-method]'))x.setAttribute('aria-pressed',x.dataset.method===method);showMaterial();return}
 if(d.affect){
  const p=prop(propId),x=p?.tickets.find(k=>k.id===d.affect);if(!x||x.reporterId===db.session)return;
  const list=x.affected||=[],on=list.includes(db.session);
  if(on)list.splice(list.indexOf(db.session),1);
  else{list.push(db.session);notify([p.ownerId],'note.affected',{name:me().name,what:x.location},{prop:p.id,ticket:x.id})}
  const box=document.querySelector('#dup-hint'),sel=document.querySelector('#report select[name="space"]');
  if(page==='report'&&box&&sel)box.innerHTML=dupHint(p,sel.value);else render();
  save(t(on?'msg.affectedOff':'msg.affectedOn'));return;
 }
 if(d.checkOk){const p=prop(propId),tn=p&&myCheckDue(p);if(!tn)return;((tn.checks||={})[db.session]||={})[d.checkOk]={status:'ok',at:today()};checkOpen=null;render();save();return}
 if(d.checkIssue){checkOpen=d.checkIssue;render();document.querySelector('#check-issue textarea')?.focus();return}
 switch(d.action){
  case 'add-property':startAddProperty();return;
  case 'add-space':readSpacesForm();draft.spaces.push({type:'other',shared:false,name:''});render();document.querySelector(`[name="name-${draft.spaces.length-1}"]`)?.focus();return;
  case 'edit-inventory':editId=propId;recordSpace=spaceSel;go('records');return;
  case 'report':reportCtx={spaceId:spaceSel};go('report');return;
  case 'report-space':reportCtx={spaceId:spaceSel};go('report');return;
  case 'report-item':{const it=prop(propId)?.items.find(x=>x.id===itemSel);reportCtx={itemId:it?.id,spaceId:it?.spaceId};go('report');return}
  case 'use-found-plan':
   foundProperty=sampleProperty;method='upload';materialVersion++;materialPending=false;
   material={src:'demo/floor-plan.png',type:'image/png',name:t('setup.planAlt',{name:sampleProperty.name})};
   go('upload');return;
  case 'reopen':{const x=prop(propId)?.tickets.find(k=>k.id===ticketSel);if(!x||x.status!==3)return;x.status=2;(x.updates||=[]).push({by:db.session,at:today(),status:2,note:t('update.reopened')});notify([prop(propId).ownerId],'note.reopened',{name:me().name,what:x.location},{prop:propId,ticket:x.id});render();save(t('msg.reopened'));return}
  case 'check-cancel':checkOpen=null;render();return;
  case 'close-dialog':{const dlg=document.querySelector('#info-dialog');dlg.close?dlg.close():dlg.removeAttribute('open');onDialogClose?.();return}
  case 'demo-panel':demoOpen=!demoOpen;renderDemo();if(demoOpen)document.querySelector('#demo-panel h2')?.focus();else document.querySelector('#demo-fab').focus();return;
  case 'tour-start':runTour(0);return;
  case 'tour-next':runTour(tourStep+1);return;
  case 'tour-prev':runTour(tourStep-1);return;
  case 'tour-end':tourStep=-1;renderDemo();return;
  case 'read-all':for(const n of myNotes())n.read=true;render();save();return;
  case 'print':window.print();return;
  case 'export-feedback':exportFeedback();return;
  case 'send-checkout':{
   const p=prop(propId),tn=findTenancy(p,checkoutTn),co=tn?.checkout;if(!co||co.status!=='draft'||!landlordView(p))return;
   if(!tn.spaceIds.every(id=>co.items?.[id])){notice.textContent=t('err.recordAll');return}
   co.status='sent';co.sentAt=today();
   notify(tn.tenantIds,'note.checkoutSent',{name:me().name},{prop:p.id,page:'checkout',tenancy:tn.id});
   render();window.scrollTo(0,0);save(t('msg.checkoutSent'));return;
  }
  case 'submit-check':{
   const p=prop(propId),tn=p&&myCheckDue(p);if(!tn)return;
   const ids=checkSpaceIds(p,tn),mine=tn.checks?.[db.session]||{};
   if(ids.some(id=>!mine[id])){notice.textContent=t('err.checkAll');return}
   (tn.submitted||={})[db.session]=today();
   notify([p.ownerId],'note.checkDone',{name:me().name,issues:Object.values(mine).filter(c=>c.status==='issue').length},{prop:p.id});
   if(tn.tenantIds.every(id=>tn.submitted[id])){tn.inventory='confirmed';tn.lockedAt||=today()}
   go('home');save(t(tn.inventory==='confirmed'?'msg.inventoryConfirmed':'msg.checkSubmitted'));return;
  }
 }
 if(d.go==='upload'&&foundProperty){foundProperty=null;material=null;materialPending=false;materialVersion++}
 if(d.go==='finish'){keepRecordDraft();finishSetup();return}
 if(d.go)go(d.go);
});
// Match a pasted room name in English, the current language, or legacy Chinese.
function findSpace(p,name){
 const n=name.trim().toLowerCase();
 const legacy={'客厅':'living','卧室':'bedroom','厨房':'kitchen','浴室':'bathroom'}[name.trim()];
 return p.spaces.find(s=>spaceName(s).toLowerCase()===n)||p.spaces.find(s=>s.type===legacy||t('type.'+s.type).toLowerCase()===n||i18n.en['type.'+s.type].toLowerCase()===n);
}
document.addEventListener('submit',async e=>{
 const form=e.target;e.preventDefault();if(form.dataset.busy)return;
 const data=new FormData(form),v=k=>String(data.get(k)||'').trim(),photo=()=>fileData(data.get('photo'),images);
 form.dataset.busy='yes';
 try{
  switch(form.dataset.form||form.id){
   case 'signin':{
    const a=Object.values(db.accounts).find(x=>x.email===v('email').toLowerCase());
    if(!a||data.get('password')!==DEMO_PASSWORD)throw new Error(t('err.signIn'));
    login(a.id);break;
   }
   case 'link-room':{
    const code=v('code').toUpperCase();
    if(tenantHome())throw new Error(t('err.alreadyHaveHome'));
    let found=null;
    for(const p of db.properties){const tn=p.tenancies.find(x=>x.code&&x.code===code);if(tn){found={p,tn};break}}
    if(!found)throw new Error(t('err.roomCode'));
    if(found.p.mode==='rooms'&&found.tn.tenantIds.length)throw new Error(t('err.roomTaken'));
    found.tn.tenantIds.push(db.session);found.tn.start||=today();found.tn.inventory='pending';found.tn.due=addDays(today(),7);found.tn.checks||={};found.tn.submitted||={};
    notify([found.p.ownerId],found.p.mode==='rooms'?'note.joined':'note.joinedHome',{name:me().name,space:found.tn.spaceIds[0]},{prop:found.p.id});
    propId=found.p.id;spaceSel=found.tn.spaceIds[0];trail=['start'];
    go('home',{replace:true});save(t('msg.roomLinked',{name:found.p.name}));break;
   }
   case 'postcode-search':
    postcodeQuery=v('postcode');
    if(!postcodeQuery)throw new Error(t('err.postcodeRequired'));
    postcodeSearched=true;render();notice.textContent=t(postcodeKey(postcodeQuery)==='E18ER'?'msg.planFound':'msg.noPlans');break;
   case 'setup':
    if(materialPending)throw new Error(t('err.fileLoading'));
    if(!v('name'))throw new Error(t('err.nameRequired'));
    draft={...draft,name:v('name'),address:v('address'),date:v('date'),plan:material||draft?.plan||null};foundProperty=null;
    go(isLandlord()?'mode':'spaces');break;
   case 'spaces':{
    readSpacesForm();
    const list=draft.spaces.map(s=>({...s,name:s.name.trim()}));
    if(!list.length||list.some(s=>!s.name))throw new Error(t('err.spaceNames'));
    const landlord=isLandlord(),mode=landlord?draft.mode:'joint';
    if(mode==='rooms'&&!list.some(s=>!s.shared))throw new Error(t('err.needLettable'));
    const p={id:'p'+(db.seq++),ownerId:db.session,selfManaged:!landlord,name:draft.name,address:draft.address,date:draft.date,mode,ready:false,plan:draft.plan,
     spaces:list.map((s,i)=>({id:'s'+(i+1),type:s.type,name:s.name,shared:mode==='rooms'&&s.shared})),records:{},tickets:[],items:[],tenancies:[]};
    db.properties.push(p);editId=p.id;recordSpace=p.spaces[0].id;draft=null;
    go('records',{replace:true});save(t('msg.spacesSaved'));break;
   }
   case 'record':{
    const p=prop(editId),sid=recordSpace,notes=v('notes');if(!p)break;
    if(spaceLocked(p,sid))throw new Error(t('lock.recordsLocked'));
    if(!notes)throw new Error(t('err.conditionRequired'));
    p.records[sid]={notes,photo:await photo()||p.records[sid]?.photo||null,photoDate:p.records[sid]?.photoDate,by:db.session};delete drafts[sid];
    const next=p.spaces.find(s=>!p.records[s.id]);if(next)recordSpace=next.id;
    render();save(t('msg.roomSaved',{room:spaceName(spaceOf(p,sid))}));break;
   }
   case 'import':{
    const p=prop(editId);if(!p)break;
    importText=v('existing');const imported={};
    for(const line of importText.split('\n')){
     const m=line.trim().match(/^([^:：]+)[:：]\s*(.+)$/);
     const s=m&&findSpace(p,m[1]);
     if(s&&!spaceLocked(p,s.id))imported[s.id]=[imported[s.id],m[2]].filter(Boolean).join('\n');
    }
    const entries=Object.entries(imported);
    if(!entries.length)throw new Error(t('err.importFormat'));
    for(const [id,notes] of entries){const prior=p.records[id];p.records[id]={...prior,notes:[prior?.notes,notes].filter(Boolean).join('\n'),by:db.session}}
    importText='';render();save(t('msg.imported',{count:entries.length}));break;
   }
   case 'report':{
    const p=prop(propId);if(!p)break;
    if(!v('location')||!v('description'))throw new Error(t('err.reportRequired'));
    const it=p.items?.find(x=>x.id===reportCtx.itemId);
    const sid=it?.spaceId||v('space');
    if(!canSee(p,sid))throw new Error(t('err.reportRequired'));
    const baseline=it?{notes:t('item.'+it.id+'.notes'),photo:{demo:it.photo,name:itemName(it)}}:p.records[sid]||null;
    const x={id:'k'+(db.seq++),spaceId:sid,itemId:it?.id,reporterId:db.session,created:today(),noticed:v('noticed'),location:v('location'),description:v('description'),priority:v('priority'),status:0,baseline,photo:await photo(),photoDate:v('photoDate'),updates:[{by:db.session,at:today(),status:0}],affected:[]};
    p.tickets.push(x);ticketSel=x.id;
    notify(audience(p,sid),'note.reported',{name:me().name,what:x.location},{prop:p.id,ticket:x.id});
    go('repair',{replace:true});save(t('msg.reportSaved'));break;
   }
   case 'accept':{
    const x=prop(propId)?.tickets.find(k=>k.id===ticketSel);if(!x)break;
    if(!v('notes'))throw new Error(t('err.signOffRequired'));
    if(x.status!==3)break;
    x.after={notes:v('notes'),photo:await photo(),photoDate:v('photoDate')};x.status=4;(x.updates||=[]).push({by:db.session,at:today(),status:4,note:v('notes')});notify([prop(propId).ownerId,...(x.affected||[])],'note.signedOff',{name:me().name,what:x.location},{prop:propId,ticket:x.id});render();save(t('msg.signedOff'));break;
   }
   case 'repair-step':{
    const p=prop(propId),x=p?.tickets.find(k=>k.id===ticketSel);if(!x||!isManager(p))break;
    const step=form.dataset.step,note=v('note'),next={ack:1,start:2,done:3}[step];
    if(next!==x.status+1)break;
    if(step==='done'&&!note)throw new Error(t('err.noteRequired'));
    const shot=step==='done'?await photo():null;
    x.status=next;
    const u={by:db.session,at:today(),status:next};if(note)u.note=note;if(v('date'))u.visit=v('date');
    if(v('contractor')){u.contractor=v('contractor');x.contractor=v('contractor')}
    if(v('cost')){x.cost=Math.max(0,Math.round(Number(v('cost'))||0));u.cost=x.cost}
    (x.updates||=[]).push(u);
    notify([x.reporterId,...(x.affected||[])],'note.status',{name:me().name,what:x.location,status:next},{prop:p.id,ticket:x.id});
    if(step==='done')x.completion={notes:note,photo:shot,photoDate:shot?today():'',by:db.session};
    render();save(t({ack:'msg.ackSaved',start:'msg.started',done:'msg.completed'}[step]));break;
   }
   case 'repair-comment':{
    const x=prop(propId)?.tickets.find(k=>k.id===ticketSel);if(!x)break;
    if(!v('note'))throw new Error(t('err.noteRequired'));
    (x.updates||=[]).push({by:db.session,at:today(),note:v('note')});
    notify([prop(propId).ownerId,x.reporterId,...(x.affected||[])],'note.comment',{name:me().name,what:x.location},{prop:propId,ticket:x.id});
    render();save(t('msg.commentSaved'));break;
   }
   case 'check-issue':{
    const p=prop(propId),tn=p&&myCheckDue(p),sid=v('space');if(!tn)break;
    if(!v('note'))throw new Error(t('err.noteRequired'));
    const prev=tn.checks?.[db.session]?.[sid];
    ((tn.checks||={})[db.session]||={})[sid]={status:'issue',note:v('note'),photo:await photo()||prev?.photo||null,at:today()};
    checkOpen=null;render();save(t('msg.checkSaved'));break;
   }
   case 'addendum':{
    const p=page==='records'?prop(editId):prop(propId),sid=v('space');
    if(!p||!canSee(p,sid)||!spaceLocked(p,sid))break;
    if(!v('note'))throw new Error(t('err.noteRequired'));
    const r=p.records[sid]||={notes:''};
    (r.addenda||=[]).push({by:db.session,at:today(),note:v('note')});render();save(t('msg.addendumSaved'));break;
   }
   case 'checkout-item':{
    const p=prop(propId),tn=findTenancy(p,checkoutTn),co=tn?.checkout,sid=form.dataset.target;
    if(!co||co.status!=='draft'||!landlordView(p)||!tn.spaceIds.includes(sid))break;
    if(!v('notes'))throw new Error(t('err.noteRequired'));
    const outcome=['same','wear','damage'].includes(v('outcome'))?v('outcome'):'same';
    const amount=outcome==='damage'?Math.max(0,Math.round(Number(v('amount'))||0)):0;
    if(outcome==='damage'&&!amount)throw new Error(t('err.amountRequired'));
    const prev=co.items?.[sid];
    (co.items||={})[sid]={outcome,notes:v('notes'),amount,photo:await photo()||prev?.photo||null,photoDate:today()};
    render();save(t('msg.checkoutItemSaved',{room:spaceName(spaceOf(p,sid))}));break;
   }
   case 'checkout-reply':{
    const p=prop(propId),tn=findTenancy(p,checkoutTn),co=tn?.checkout;
    if(!co||co.status!=='sent'||!tn.tenantIds.includes(db.session)||co.responses?.[db.session])break;
    const reply={};
    for(const [id,i] of Object.entries(co.items||{})){
     if(i.outcome!=='damage')continue;
     const agree=v('agree-'+id)!=='dispute',comment=v('comment-'+id);
     if(!agree&&!comment)throw new Error(t('err.disputeComment'));
     reply[id]={agree,comment};
    }
    (co.responses||={})[db.session]=reply;(co.respondedBy||={})[db.session]=today();
    if(tn.tenantIds.every(id=>co.responses[id])){co.status='responded';co.respondedAt=today()}
    const tot=checkoutTotals(tn);
    notify([p.ownerId],'note.checkoutReply',{name:me().name,agreed:tot.agreed,disputed:tot.disputed},{prop:p.id,page:'checkout',tenancy:tn.id});
    render();window.scrollTo(0,0);save(t('msg.checkoutReplied'));break;
   }
   case 'feedback':{
    const a=me();
    (db.feedback||=[]).push({at:new Date().toISOString(),name:a?.name||'',role:a?.role||'',lang,task:v('task'),done:v('done'),ease:Number(v('ease'))||'',comment:v('comment')});
    save();renderDemo();notice.textContent=t('msg.feedbackSaved',{n:db.feedback.length});break;
   }
   case 'profile':
    if(!me()||!v('displayName'))throw new Error(t('err.displayName'));
    me().name=v('displayName');render();save(t('msg.profileSaved'));break;
   case 'settings':
    db.prefs.theme=['light','dark'].includes(v('theme'))?v('theme'):'system';render();save(t('msg.settingsSaved'));break;
  }
 }catch(err){notice.textContent=err.message}finally{delete form.dataset.busy}
});
render();
// Installable and usable offline when served over http(s).
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
