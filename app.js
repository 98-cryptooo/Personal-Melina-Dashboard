(function(){
  const AREAS={momente:{l:"Schöne Momente",c:"--a-momente"},arbeit:{l:"Arbeit",c:"--a-arbeit"},lernen:{l:"Lernen",c:"--a-lernen"},kreativ:{l:"Kreativ",c:"--a-kreativ"},privat:{l:"Privat",c:"--a-privat"},auszeit:{l:"Auszeit & Reisen",c:"--a-auszeit"},gym:{l:"Sport",c:"--a-gym"}};
  const YEAR=String(new Date().getFullYear());
  const M=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
  const ML=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  const MOOD=["Mies","Eher schlecht","Okay","Gut","Richtig gut"], ENERGY=["Leer","Müde","Normal","Wach","Voll da"];
  const WHO=["Ich war froh und guter Laune.","Ich habe mich ruhig und entspannt gefühlt.","Ich habe mich energisch und aktiv gefühlt.","Ich bin frisch und ausgeruht aufgewacht.","Mein Alltag war voller Dinge, die mich interessieren."];
  const ICON={gym:"M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12",book:"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 5v16",cap:"M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5",brief:"M3 8h18v11H3zM9 8V5h6v3M3 13h18",glass:"M8 3h8l-1 7a3 3 0 0 1-6 0zM12 13v7M8 21h8",cam:"M4 8h4l2-3h4l2 3h4v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7",pad:"M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5 2l-2-2H9l-2 2a3 3 0 0 1-5-2v-1a4 4 0 0 1 4-4zM8 11v4M6 13h4M16 12h.01M18 14h.01",tv:"M3 6h18v12H3zM8 21h8M12 18v3",ppl:"M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a2.5 2.5 0 1 0 0-5M18 15c2 .5 3 2 3 5",heart:"M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",tree:"M12 3l6 9h-4l4 6H6l4-6H6zM12 18v3",moon:"M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z",home:"M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-5h4v5",flower:"M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 3c2 2 2 4 0 6-2-2-2-4 0-6zM12 15c2 2 2 4 0 6-2-2-2-4 0-6zM3 12c2-2 4-2 6 0-2 2-4 2-6 0zM15 12c2-2 4-2 6 0-2 2-4 2-6 0z",check:"M5 12l4 4L19 6",head:"M9 21v-4c-2-1-4-3.5-4-7a7 7 0 0 1 14 0c0 1.5.5 2.5 1.5 4L19 15v2h-3v4",bolt:"M13 2L4 14h7l-1 8 9-12h-7z",wave:"M2 12h4l2-6 4 12 3-9 2 3h5",chat:"M4 5h16v11H9l-5 4z",pill:"M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7zM7 7l7 7",dot:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",plus:"M12 5v14M5 12h14"};
  const BASE_WORK=[{k:"gym",l:"Sport",type:"flag",flag:"gym",area:"gym",ic:"gym",c:"--a-gym"},{k:"arbeit",l:"Arbeit",type:"work",area:"arbeit",ic:"brief",c:"--a-arbeit"},{k:"lernen",l:"Lernen",type:"work",area:"lernen",ic:"cap",c:"--a-lernen"},{k:"kreativ",l:"Kreativ",type:"work",area:"kreativ",ic:"cam",c:"--a-kreativ"},{k:"haushalt",l:"Haushalt & Orga",type:"work",area:"privat",ic:"home",c:"--a-privat"},{k:"read",l:"Lesen",type:"flag",flag:"read",ic:"book",c:"--a-privat"}];
  let TILES_WORK=BASE_WORK.slice();
  const TILES_BREAK=[["Selfcare","flower"],["Serie/Film","tv"],["Freunde","ppl"],["Date","heart"],["Draußen","tree"],["Nichts tun","moon"]].map(([k,ic])=>({k,l:k,type:"break",ic,c:"--a-auszeit"}));
  const DUR=[15,30,60,90,120,180,240];
  const $=id=>document.getElementById(id);
  const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  function h(tag,a,kids){const e=document.createElement(tag);if(a)for(const k in a){if(k==="text")e.textContent=a[k];else e.setAttribute(k,a[k]);}(kids||[]).forEach(c=>{if(c!=null)e.append(c)});return e;}
  const SVG="http://www.w3.org/2000/svg";
  function s(tag,a){const e=document.createElementNS(SVG,tag);for(const k in a)e.setAttribute(k,a[k]);return e;}
  function icon(name){const v=s("svg",{viewBox:"0 0 24 24",fill:"none","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"});v.append(s("path",{d:ICON[name]}));return v;}
  function faceSvg(i){const m=["M14 31q8-7 16 0","M15 30q7-3 14 0","M15 29h14","M15 28q7 4 14 0","M14 27q8 8 16 0"][i-1];const v=s("svg",{viewBox:"0 0 44 44","aria-hidden":"true"});v.append(s("circle",{cx:22,cy:22,r:18,fill:"none",stroke:"currentColor","stroke-width":2}));v.append(s("circle",{cx:16,cy:18,r:1.8,fill:"currentColor"}));v.append(s("circle",{cx:28,cy:18,r:1.8,fill:"currentColor"}));v.append(s("path",{d:m,fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round"}));return v;}
  const pad=n=>String(n).padStart(2,"0"), ymd=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
  const today=new Date(), TODAY=ymd(today), fmt=x=>x.slice(8,10)+"."+x.slice(5,7)+".";
  const YEST=(()=>{const d=new Date(today);d.setDate(d.getDate()-1);return ymd(d);})();
  const clone=o=>o==null?null:JSON.parse(JSON.stringify(o));
  const fmtMin=m=>!m?"":(m<60?m+" Min":(m/60).toString().replace(".",",")+" Std");
  function isoWeek(d){const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const y0=new Date(Date.UTC(t.getUTCFullYear(),0,1));return t.getUTCFullYear()+"-W"+pad(Math.ceil(((t-y0)/864e5+1)/7));}
  function monday(d){const x=new Date(d);x.setHours(12,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x;}
  function weekDays(off){const m=monday(today);m.setDate(m.getDate()+off*7);return Array.from({length:7},(_,i)=>{const x=new Date(m);x.setDate(m.getDate()+i);return ymd(x);});}
  const longDate=d=>new Date(d+"T12:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long"});
  let db=null,uid=null,timeline=[],mine={},portfolio=null,goals=null,who=[null,null,null,null,null],filter=null,canWrite=true,wkOff=0,logDate=TODAY,focusTile=null,catchDismissed=false;
  let mode="quick";try{mode=localStorage.getItem("zr-mode")||"quick";}catch(_){}

  const day=d=>mine["d-"+d]||{};
  const breaksOf=d=>Array.isArray(day(d).breaks)?day(d).breaks.map(x=>typeof x==="string"?{k:x,min:0}:x):[];
  const hasB=(d,k)=>breaksOf(d).some(x=>x.k===k);
  const workOf=d=>Array.isArray(day(d).work)?day(d).work:[];
  const dayFlag=(d,f)=>!!day(d)[f];
  const SOFT=a=>a==="auszeit"||a==="momente";
  const bodyOf=d=>Array.isArray(day(d).body)?day(d).body:[];
  const isActive=d=>timeline.some(e=>e.date===d&&!SOFT(e.area))||workOf(d).length>0||dayFlag(d,"gym")||dayFlag(d,"read")||Object.keys(day(d)).some(k=>k.startsWith("h-")&&day(d)[k]===true);
  const hasBreak=d=>breaksOf(d).length>0||timeline.some(e=>e.area==="auszeit"&&e.date<=d&&(e.end||e.date)>=d);
  const gymOn=d=>dayFlag(d,"gym")||timeline.some(e=>e.date===d&&e.area==="gym");

  // ---------- Rückgängig ----------
  const undoStack=[];let toastT;
  function toast(msg,withUndo){$("toastMsg").textContent=msg;$("toastUndo").hidden=!withUndo;$("toast").hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>{$("toast").hidden=true;},5000);}
  function updUndo(){const b=$("undoBtn");b.disabled=!undoStack.length;b.title=undoStack.length?"Rückgängig: "+undoStack[undoStack.length-1].label:"Nichts rückgängig zu machen";}
  function pushUndo(label,fn){undoStack.push({label,fn});if(undoStack.length>40)undoStack.shift();updUndo();toast(label,true);}
  async function undo(){const u=undoStack.pop();updUndo();if(!u)return;try{await u.fn();toast("Zurückgenommen: "+u.label,false);}catch(_){toast("Rückgängig hat nicht geklappt",false);}}
  $("undoBtn").addEventListener("click",undo);$("toastUndo").addEventListener("click",undo);
  document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="z"&&!/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||"")){e.preventDefault();undo();}});
  function needDb(){if(!db||!canWrite){toast("Speichern geht in diesem Browser gerade nicht.",false);return false;}return true;}
  const dayRef=d=>db.collection("data/users/"+uid).doc("d-"+d);
  function flash(t){const el=$("saved");el.textContent=t||"Gespeichert ✓";clearTimeout(flash.t);flash.t=setTimeout(()=>el.textContent="",2500);}
  async function writeDay(patch,label,d){
    d=d||TODAY;if(!needDb())return false;if(!uid){toast("Speichern geht gerade nicht.",false);return false;}
    const prev=clone(mine["d-"+d]);const doc=Object.assign({},prev||{},{type:"day",date:d,at:new Date().toISOString()},patch);
    try{await dayRef(d).set(doc);}catch(_){toast("Nicht gespeichert. Versuch es gleich noch mal.",false);return false;}
    pushUndo(label,()=>prev?dayRef(d).set(prev):dayRef(d).delete());flash();return true;
  }
  let sampleP=null;const getSample=()=>Promise.resolve(null);
  async function improve(id,title,area){
    try{const smp=await getSample();if(!smp||!db)return;
      const r=await smp("Formuliere diesen Eintrag aus Melinas Erfolgs-Tagebuch sauber und klar auf Deutsch um. Bereich: "+((AREAS[area]||{}).l||area)+".\nRegeln: Inhalt und Fakten exakt behalten, nichts erfinden, nichts übertreiben. Kurze Erfolgsnotiz ohne Ich, zum Beispiel: Urlaub für März geplant und Flüge verglichen. Höchstens 2 Sätze. Rechtschreibung korrigieren. Keine Gedankenstriche, keine Anführungszeichen, keine Emojis. Antworte in genau zwei Zeilen und sonst nichts:\nLANG: die saubere Fassung\nKURZ: derselbe Erfolg als Stichpunkt mit höchstens 5 Wörtern, zum Beispiel Urlaub März geplant\n\nEintrag:\n"+title,{modelTier:"quick"});
      const raw=((r&&r.text)||"").trim(),cl=x=>x.trim().replace(/^["„“]+|["“”]+$/g,"").replace(/\s[–—]\s/g,", ");
      const mL=raw.match(/LANG:\s*(.+)/i),mK=raw.match(/KURZ:\s*(.+)/i),upd={};
      const t=cl(mL?mL[1]:(mK?"":raw));if(t)upd.clean=t;if(mK)upd.short=cl(mK[1]).replace(/[.]$/,"");
      if(Object.keys(upd).length)await db.collection("timeline").doc(id).update(upd);
    }catch(e){if(!e||e.code!=="not_granted")toast(e&&e.code==="rate_limited"?"KI gerade ausgelastet, später noch mal.":"KI-Verbesserung ging gerade nicht.",false);}
  }
  async function addEntry(doc,label){
    if(!needDb())return false;
    try{const ref=await db.collection("timeline").add(doc);pushUndo(label,()=>ref.delete());flash();return ref;}
    catch(e){toast(e&&e.code==="quota_exceeded"?"Speicher voll.":"Nicht gespeichert. Versuch es gleich noch mal.",false);return false;}
  }
  async function delEntry(id){
    if(!needDb())return;const e=timeline.find(x=>x._id===id);if(!e)return;const data=Object.assign({},e);delete data._id;
    try{await db.collection("timeline").doc(id).delete();pushUndo("Gelöscht: "+data.title,()=>db.collection("timeline").doc(id).set(data));}catch(_){toast("Löschen ging nicht.",false);}
  }
  async function writeGoals(items,label){
    if(!needDb()||!goals)return;const prev=clone(goals.items);
    try{await db.doc("goals/main").update({items});pushUndo(label,()=>db.doc("goals/main").update({items:prev}));}catch(_){toast("Nicht gespeichert.",false);}
  }

  // ---------- Tabs ----------
  const VIEWS=["heute","einkauf","gedanken","woche","ziele","jahr"];
  function show(v){VIEWS.forEach(x=>{$("view-"+x).hidden=x!==v;$("tab-"+x).setAttribute("aria-selected",x===v);});try{history.replaceState(null,"","#"+v)}catch(_){} if(v==="jahr")drawChart();if(v==="gedanken")setTimeout(()=>{try{$("tText").focus();}catch(_){}},0);if(v==="woche")drawBars();window.scrollTo({top:0});}
  document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>show(b.dataset.view)));
  const sv=(location.hash||"").slice(1);show(VIEWS.includes(sv)?sv:(window.innerWidth>=900?"woche":"heute"));
  window.addEventListener("hashchange",()=>{const v=location.hash.slice(1);if(VIEWS.includes(v))show(v);});
  $("toGoals").addEventListener("click",()=>show("ziele"));
  $("toThoughts").addEventListener("click",()=>{tReview=true;show("gedanken");renderGedanken();});
  $("wkPrev").addEventListener("click",()=>{wkOff--;renderWoche();});
  $("wkNext").addEventListener("click",()=>{if(wkOff<0){wkOff++;renderWoche();}});
  $("tab-jahr").textContent=YEAR;$("yearH").textContent="Dein "+YEAR+": was du erlebt hast";
  $("zEyebrow").textContent="Ziele · KW "+isoWeek(today).slice(6)+" · "+ML[today.getMonth()];

  const tip=$("tip");
  function tipOn(e,txt){tip.textContent=txt;tip.hidden=false;const x=Math.min(e.clientX+12,innerWidth-tip.offsetWidth-8),y=Math.max(8,e.clientY-tip.offsetHeight-10);tip.style.left=x+"px";tip.style.top=y+"px";}
  function tipOff(){tip.hidden=true;}
  function chipFor(area){const a=AREAS[area]||AREAS.privat;return h("span",{class:"chip"},[h("i",{style:"background:var("+a.c+")"}),a.l]);}

  // ---------- HEUTE ----------
  function setMode(m){mode=m;try{localStorage.setItem("zr-mode",m);}catch(_){} $("modeQuick").setAttribute("aria-pressed",m==="quick");$("modeFull").setAttribute("aria-pressed",m==="full");document.querySelectorAll("details.more").forEach(x=>x.open=m==="full");}
  $("modeQuick").addEventListener("click",()=>setMode("quick"));$("modeFull").addEventListener("click",()=>setMode("full"));setMode(mode);
  for(let i=1;i<=5;i++){const b=h("button",{class:"face",type:"button","aria-pressed":"false","aria-label":MOOD[i-1]},[faceSvg(i),MOOD[i-1]]);b.addEventListener("click",()=>writeDay({mood:i},"Stimmung: "+MOOD[i-1],logDate));$("faces").append(b);}
  ENERGY.forEach((l,i)=>{const b=h("button",{type:"button","aria-pressed":"false"},[h("b",{text:String(i+1)}),l]);b.addEventListener("click",()=>writeDay({energy:i+1},"Energie: "+l,logDate));$("energyScale").append(b);});
  Object.keys(AREAS).forEach(k=>$("qArea").append(h("option",{value:k,text:AREAS[k].l})));
  $("dayNote").addEventListener("blur",()=>{const v=$("dayNote").value.trim();if(v!==(day(logDate).note||""))writeDay({note:v},"Notiz gespeichert",logDate);});
  $("qAdd").addEventListener("click",async()=>{const t=$("qTitle").value.trim();if(!t){toast("Schreib kurz, was du gemacht hast.",false);return;}const qd=$("qDate").value||logDate,qe=$("qEnd").value;if(qd>TODAY){toast("Datum liegt in der Zukunft.",false);return;}const doc={date:qd,title:t,area:$("qArea").value,source:"selbst",at:new Date().toISOString()},pl=$("qPlace").value.trim();if(pl)doc.place=pl;if(qe&&qe>qd)doc.end=qe;const ref=await addEntry(doc,"Erfolg: "+t+(qd!==logDate?" ("+fmt(qd)+")":""));if(ref){$("qTitle").value="";$("qPlace").value="";$("qDate").value="";$("qEnd").value="";}});
  $("qTitle").addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault();$("qAdd").click();}});
  $("catchupBtn").addEventListener("click",()=>{logDate=logDate===TODAY?YEST:TODAY;focusTile=null;renderHeute.noteFor=null;renderHeute();window.scrollTo({top:0,behavior:"smooth"});});

  function tileOn(t,d){if(t.type==="body")return bodyOf(d).some(x=>x.k===t.k);if(t.type==="addbody")return false;if(t.type==="flag")return dayFlag(d,t.flag);if(t.type==="work")return workOf(d).includes(t.area);return hasB(d,t.k);}
  function tileDur(t,d){if(t.type==="break"){const b=breaksOf(d).find(x=>x.k===t.k);return b&&b.min;}if(t.flag==="gym")return day(d).gymMin;if(t.flag==="read")return day(d).readMin;return 0;}
  async function tapTile(t){
    if(t.type==="addbody"){addSymptom();return;}
    const d=logDate,on=tileOn(t,d);
    if(on){await removeTile(t);return;}
    focusTile=t.k;
    if(t.type==="flag"){const p={};p[t.flag]=true;await writeDay(p,t.l+" ✓",d);}
    else if(t.type==="work")await writeDay({work:workOf(d).concat(t.area)},t.l+" ✓",d);
    else if(t.type==="body"){const it={k:t.k,lvl:0};if(t.custom)it.l=t.l;await writeDay({body:bodyOf(d).concat(it)},t.l+" eingetragen",d);if(!t.sev)focusTile=null;}
    else await writeDay({breaks:breaksOf(d).concat({k:t.k,min:0})},"Auszeit: "+t.l,d);
    renderHeute();
  }
  async function removeTile(t){
    const d=logDate;focusTile=null;
    if(t.type==="flag"){const p={};p[t.flag]=false;if(t.flag==="read")p.breaks=breaksOf(d).filter(x=>x.k!=="Lesen");await writeDay(p,"Entfernt: "+t.l,d);}
    else if(t.type==="body")await writeDay({body:bodyOf(d).filter(x=>x.k!==t.k)},"Entfernt: "+t.l,d);
    else if(t.type==="work")await writeDay({work:workOf(d).filter(a=>a!==t.area)},"Entfernt: "+t.l,d);
    else await writeDay({breaks:breaksOf(d).filter(x=>x.k!==t.k)},"Entfernt: "+t.l,d);
    renderHeute();
  }
  function renderDetail(){
    $("detail").innerHTML="";$("detailWork").innerHTML="";$("detailBody").innerHTML="";const all=TILES_WORK.concat(TILES_BREAK,bodyTiles()),t=all.find(x=>x.k===focusTile);if(!t||!tileOn(t,logDate))return;const box=$(TILES_WORK.includes(t)?"detailWork":t.type==="body"?"detailBody":"detail");
    const d=logDate,closeB=h("button",{class:"close",type:"button",text:"Fertig"});closeB.addEventListener("click",()=>{focusTile=null;renderHeute();});
    const panel=h("div",{class:"detail"},[h("div",{class:"dh2"},[h("b",{style:"font-weight:500",text:t.l}),closeB])]);
    if(t.type==="body"){bodyDetail(t,panel,d);}
    else if(t.type==="work"){
      const ents=timeline.filter(e=>e.date===d&&e.area===t.area);
      ents.forEach(e=>panel.append(h("div",{class:"small muted",style:"white-space:pre-wrap",text:"✓ "+e.title})));
      const ta=h("textarea",{rows:"2",maxlength:"600",placeholder:"Was genau? (optional, wird ein Erfolg)","aria-label":"Was genau bei "+t.l});
      const sv=h("button",{class:"gbtn primary",type:"button",text:"Als Erfolg speichern"});
      sv.addEventListener("click",async()=>{const v=ta.value.trim();if(!v){ta.focus();return;}const ref=await addEntry({date:d,title:v,area:t.area,source:"heute",at:new Date().toISOString()},"Erfolg: "+v);if(ref){ta.value="";improve(ref.id,v,t.area);}});
      ta.addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault();sv.click();}});
      panel.append(ta);const rm=h("button",{class:"gbtn",type:"button",text:"Markierung entfernen"});rm.addEventListener("click",()=>removeTile(t));panel.append(h("div",{class:"gact"},[sv,rm]));
    } else {
      const cur=tileDur(t,d);panel.append(h("div",{class:"small muted",text:"Wie lange? (optional)"}));
      const row=h("div",{class:"gact"});DUR.forEach(m=>{const b=h("button",{class:"gbtn"+(cur===m?" on":""),type:"button",text:fmtMin(m)});b.addEventListener("click",async()=>{if(t.type==="break")await writeDay({breaks:breaksOf(d).map(x=>x.k===t.k?{k:x.k,min:m}:x)},t.l+": "+fmtMin(m),d);else{const p={};p[t.flag+"Min"]=m;await writeDay(p,t.l+": "+fmtMin(m),d);}focusTile=null;renderHeute();});row.append(b);});
      const rm=h("button",{class:"gbtn",type:"button",text:"Entfernen"});rm.addEventListener("click",()=>removeTile(t));row.append(rm);panel.append(row);
    }
    box.append(panel);
  }
  function renderTiles(id,list){const box=$(id);box.innerHTML="";list.forEach(t=>{const on=tileOn(t,logDate);let sub="";if(on){if(t.type==="body"){const b=bodyOf(logDate).find(x=>x.k===t.k);sub=b&&b.lvl?LVL[b.lvl]:"";}else{const dur=tileDur(t,logDate);sub=dur?fmtMin(dur):"";}}const at={class:"tile"+(focusTile===t.k?" focus":"")+(t.type==="addbody"?" add":""),type:"button",style:"--tc:var("+t.c+")"};if(t.type==="addbody")at["aria-label"]="Eigene Beschwerde hinzufügen";else at["aria-pressed"]=String(on);const b=h("button",at,[icon(t.ic),h("span",{text:t.l}),sub?h("span",{class:"dur",text:sub}):null]);b.addEventListener("click",()=>tapTile(t));box.append(b);});}
  function renderHeute(){
    const d=logDate,rec=day(d);
    $("lgDate").innerHTML="";$("lgDate").append(h("b",{text:d===TODAY?"Heute":"Gestern"}),", "+longDate(d));
    $("lgQ").textContent=d===TODAY?"Wie war dein Tag?":"Wie war gestern?";
    [...$("faces").children].forEach((c,i)=>c.setAttribute("aria-pressed",rec.mood===i+1));
    [...$("energyScale").children].forEach((c,i)=>c.setAttribute("aria-pressed",rec.energy===i+1));
    if(renderHeute.noteFor!==d||document.activeElement!==$("dayNote")){$("dayNote").value=rec.note||"";renderHeute.noteFor=d;}
    const missY=!(mine["d-"+YEST]&&mine["d-"+YEST].mood);
    if(d!==TODAY){$("catchup").hidden=false;$("catchupTxt").textContent="Du trägst gerade für gestern ein.";$("catchupBtn").textContent="Zurück zu heute";}
    else if(missY&&uid&&!catchDismissed&&Object.keys(mine).some(k=>k.startsWith("d-")&&k.slice(2)<YEST)){$("catchup").hidden=false;$("catchupTxt").textContent="Gestern ist noch leer. Ein Tipp reicht.";$("catchupBtn").textContent="Gestern nachtragen";}
    else $("catchup").hidden=true;
    renderTiles("tilesWork",TILES_WORK);renderTiles("tilesBreak",TILES_BREAK);renderTiles("tilesBody",bodyTiles().concat([ADD_TILE]));renderDetail();renderBackupNag();
    const tl=$("todayList");tl.innerHTML="";$("todayHead").textContent=d===TODAY?"Heute festgehalten":"Gestern festgehalten";
    const ents=timeline.filter(e=>e.date===d);
    if(!ents.length)tl.append(h("div",{class:"small muted",text:"Noch nichts festgehalten. Tipp unten, wie dein Tag war."}));
    ents.forEach(e=>{const x=h("button",{class:"x",type:"button","aria-label":"Löschen: "+e.title,text:"Löschen"});x.addEventListener("click",()=>delEntry(e._id));
      const col=h("div",{style:"display:flex;flex-direction:column;gap:4px;min-width:0"},[h("span",{class:"t",text:e.clean||e.title})]);if(e.clean)col.append(h("span",{class:"orig",text:"Original: "+e.title}));col.append(chipFor(e.area));
      const acts=h("div",{class:"acts"});if(canWrite){const ai=h("button",{class:"x ai",type:"button",text:e.clean?"Neu formulieren":"Mit KI verbessern"});ai.addEventListener("click",async()=>{ai.disabled=true;ai.textContent="Formuliere …";await improve(e._id,e.title,e.area);ai.disabled=false;ai.textContent="Neu formulieren";});acts.append(ai,x);}
      tl.append(h("div",{class:"tli"},[col,acts]));});
  }

  // ---------- WOCHE ----------
  function weekStats(days){
    const el=days.filter(d=>d<=TODAY);const active=el.filter(isActive).length;
    const ents=timeline.filter(e=>e.date>=days[0]&&e.date<=days[6]&&!SOFT(e.area)).length;
    const gym=days.filter(gymOn).length,brkDays=days.filter(hasBreak).length;
    const brkN=days.reduce((a,d)=>a+breaksOf(d).length,0)+timeline.filter(e=>e.area==="auszeit"&&e.date>=days[0]&&e.date<=days[6]).length;
    const brkMin=days.reduce((a,d)=>a+breaksOf(d).reduce((x,b)=>x+(b.min||0),0),0);
    const moods=days.map(d=>day(d).mood).filter(Boolean);
    const work=el.filter(d=>workOf(d).includes("arbeit")||timeline.some(e=>e.date===d&&e.area==="arbeit")).length,moments=timeline.filter(e=>e.area==="momente"&&e.date>=days[0]&&e.date<=days[6]).length,good=days.filter(d=>(day(d).mood||0)>=4).length;
    return {el:el.length,active,ents,gym,brkDays,brkN,brkMin,moods,work,moments,good};
  }
  function renderWoche(){
    const days=weekDays(wkOff),st=weekStats(days);$("wkNext").disabled=wkOff>=0;
    $("wkEyebrow").textContent=(wkOff===0?"Diese Woche":"KW "+isoWeek(new Date(days[3]+"T12:00")).slice(6))+" · "+fmt(days[0])+"–"+fmt(days[6]);
    $("wkRange").textContent=wkOff===0?"Stand heute, "+st.el+" von 7 Tagen vorbei":"Abgeschlossene Woche";
    const sm=$("wkSummary");sm.innerHTML="";
    [[String(st.active),"von "+st.el+" Tagen aktiv"],[String(st.work),st.work===1?"Arbeitstag":"Arbeitstage"],[String(st.moments),st.moments===1?"schöner Moment":"schöne Momente"],[String(st.good),st.good===1?"guter Tag":"gute Tage"]]
      .forEach(([n,l],i)=>sm.append(h("div",{class:"ws"+(i===0&&n!=="0"?" hl":"")},[h("b",{text:n}),h("span",{text:l})])));
    renderDone(days);renderMoments(days);renderBody(days);renderMood(days);renderReview(days);renderBadges();renderWho();renderGoals();
    const det=document.querySelector(".wk-more");if(det&&det.open)drawBars();
  }
  const wd=d=>new Date(d+"T12:00").toLocaleDateString("de-DE",{weekday:"short"});
  function renderDone(days){
    const box=$("wkDone");box.innerHTML="";const ents=timeline.filter(e=>e.date>=days[0]&&e.date<=days[6]&&!SOFT(e.area)).sort((a,b)=>a.date<b.date?-1:1);
    const groups={};const add=(a,item)=>(groups[a]=groups[a]||[]).push(item);
    ents.forEach(e=>add(e.area,{t:e.short||e.clean||e.title,full:e.clean||e.title,d:e.date,id:e._id}));
    const marked={};days.forEach(d=>{workOf(d).forEach(a=>{if(!ents.some(e=>e.date===d&&e.area===a))(marked[a]=marked[a]||[]).push(d);});if(dayFlag(d,"gym")&&!ents.some(e=>e.date===d&&e.area==="gym"))(marked.gym=marked.gym||[]).push(d);if(dayFlag(d,"read"))(marked.read=marked.read||[]).push(d);});
    Object.keys(marked).forEach(a=>{const ds=marked[a];add(a==="read"?"privat":a,{t:(a==="gym"?"Training":a==="read"?"Gelesen":"Dran gearbeitet")+(ds.length>1?" an "+ds.length+" Tagen":""),d:ds[0],days:ds,mark:true});});
    const keys=Object.keys(groups).sort((a,b)=>groups[b].length-groups[a].length);
    $("wkDoneCount").textContent=ents.length?ents.length+" mit Text":"";
    if(!keys.length){box.append(h("div",{class:"empty",text:"Noch nichts eingetragen. Ein Tipp in Heute reicht."}));return;}
    keys.forEach(a=>{const ar=AREAS[a]||AREAS.privat,g=h("div",{class:"dg"},[h("div",{class:"dg-h"},[h("i",{style:"background:var("+ar.c+")"}),h("b",{text:ar.l}),h("span",{text:String(groups[a].length)})])]);
      groups[a].forEach(it=>{const li=h("div",{class:"bul"+(it.mark?" mark":""),title:it.full||it.t},[h("span",{text:it.t}),h("small",{text:(it.days||[it.d]).map(wd).join(", ")})]);
        if(canWrite&&it.id){const x=h("button",{class:"bx",type:"button","aria-label":"Löschen: "+it.t,text:"×"});x.addEventListener("click",()=>delEntry(it.id));li.append(x);}g.append(li);});
      box.append(g);});
  }
  function renderMood(days){
    const box=$("wkMood");box.innerHTML="";const moods=days.map(d=>day(d).mood||0),mins=days.map(d=>breaksOf(d).reduce((a,b)=>a+(b.min||0),0)),cnt=days.map(d=>breaksOf(d).length+(timeline.some(e=>e.area==="auszeit"&&e.date<=d&&(e.end||e.date)>=d)?1:0));
    const got=moods.filter(Boolean);$("wkMoodAvg").textContent=got.length?"Ø "+(got.reduce((a,b)=>a+b,0)/got.length).toFixed(1).replace(".",",")+" · "+MOOD[Math.round(got.reduce((a,b)=>a+b,0)/got.length)-1]:"Noch keine Stimmung";
    const mx=Math.max(60,...mins),wrap=h("div",{class:"mood7"});
    const svg=s("svg",{class:"mline",viewBox:"0 0 700 100",preserveAspectRatio:"none","aria-hidden":"true"});const pts=[];moods.forEach((m,i)=>{if(m)pts.push((i*100+50)+","+(100-(m-1)*25));});
    if(pts.length>1)svg.append(s("polyline",{points:pts.join(" "),fill:"none",stroke:css("--gold"),"stroke-width":2,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round",opacity:".7"}));wrap.append(svg);
    days.forEach((d,i)=>{const m=moods[i],col=h("div",{class:"mc"+(d===TODAY?" now":"")+(d>TODAY?" fut":"")});
      const track=h("div",{class:"mtrack"});if(m){const dot=h("i",{class:"mdot",style:"bottom:calc("+((m-1)*25)+"% - 7px)"});dot.title=MOOD[m-1];track.append(dot);}col.append(track);
      const pb=h("div",{class:"ptrack"});if(cnt[i]){const bar=h("i",{style:"height:"+(mins[i]?Math.max(14,mins[i]/mx*100):14)+"%"});bar.title=breaksOf(d).map(b=>b.k+(b.min?" "+fmtMin(b.min):"")).join(", ")||"Auszeit";pb.append(bar);}col.append(pb);
      col.append(h("span",{class:"ml",text:wd(d)}));wrap.append(col);});
    box.append(wrap,h("div",{class:"mlegend"},[h("span",{},[h("i",{class:"lg-m"}),"Stimmung"]),h("span",{},[h("i",{class:"lg-p"}),"Pause, Höhe = Dauer"])]));
  }
  function renderReview(days){
    const wk=isoWeek(new Date(days[3]+"T12:00")),r=mine["r-"+wk]||{};
    ["rvGood","rvNext"].forEach(id=>{const el=$(id);if(document.activeElement!==el||renderReview.wk!==wk)el.value=r[id==="rvGood"?"good":"next"]||"";el.disabled=!canWrite;});renderReview.wk=wk;
  }
  async function saveReview(){
    if(!needDb()||!uid)return;const wk=renderReview.wk;if(!wk)return;const prev=clone(mine["r-"+wk]),good=$("rvGood").value.trim(),next=$("rvNext").value.trim();
    if(prev&&prev.good===good&&prev.next===next)return;if(!prev&&!good&&!next)return;
    const ref=db.collection("data/users/"+uid).doc("r-"+wk);
    try{await ref.set({type:"review",week:wk,good,next,at:new Date().toISOString()});pushUndo("Wochenrückblick gespeichert",()=>prev?ref.set(prev):ref.delete());}catch(_){toast("Nicht gespeichert.",false);}
  }
  $("rvGood").addEventListener("blur",saveReview);$("rvNext").addEventListener("blur",saveReview);
  document.querySelector(".wk-more").addEventListener("toggle",e=>{if(e.target.open)drawBars();});
  function drawBars(){
    const box=$("bars");if(!box||box.offsetParent===null)return;box.innerHTML="";const N=12,weeks=[];
    for(let i=N-1;i>=0;i--){const d=weekDays(-i);weeks.push({k:isoWeek(new Date(d[3]+"T12:00")),from:d[0],to:d[6],n:d.filter(x=>x<=TODAY&&isActive(x)).length,cur:i===0});}
    const avg=weeks.reduce((a,b)=>a+b.n,0)/N;$("cAvg").textContent=avg.toFixed(1).replace(".",",");
    const W=Math.max(box.clientWidth||520,280),H=170,top=7.4;
    const svg=s("svg",{viewBox:"0 0 "+W+" "+(H+18),width:"100%",role:"img","aria-label":"Aktive Tage pro Woche, letzte 12 Wochen"});
    const defs=s("defs",{});defs.innerHTML='<linearGradient id="gS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5C4D8"/><stop offset="1" stop-color="#FCE8F0"/></linearGradient><linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4568F"/><stop offset="1" stop-color="#F7B3CE"/></linearGradient>';svg.append(defs);
    const slot=W/N,bw=Math.min(54,slot*.78),y=v=>H-(v/top)*(H-8);
    weeks.forEach((w,i)=>{const x=i*slot+(slot-bw)/2,hg=Math.max(6,H-y(w.n));const r=s("rect",{x,y:H-hg,width:bw,height:hg+14,rx:Math.min(18,bw/2),fill:w.cur?"url(#gG)":"url(#gS)"});
      r.addEventListener("mousemove",e=>tipOn(e,"KW "+w.k.slice(6)+": "+w.n+" aktive Tage ("+fmt(w.from)+"–"+fmt(w.to)+")"));r.addEventListener("mouseleave",tipOff);svg.append(r);});
    const ay=y(avg);svg.append(s("line",{x1:0,x2:W,y1:ay,y2:ay,stroke:"rgba(58,30,43,.35)","stroke-dasharray":"6 6"}));box.append(svg);
    const best=weeks.reduce((a,b)=>b.n>a.n?b:a,weeks[0]);const p=h("div",{class:"peak",text:"Bestwoche: KW "+best.k.slice(6)+" · "+best.n+(best.n===1?" Tag":" Tage")});box.append(p);
    p.style.top=Math.max(0,(ay*(box.clientWidth/W))-18)+"px";
  }
  function renderWeekTl(days){
    const tl=$("weekTl");tl.innerHTML="";const inWeek=timeline.filter(e=>e.date>=days[0]&&e.date<=days[6]);
    days.forEach(d=>{const dt=new Date(d+"T12:00");tl.append(h("div",{class:"dh"+(d===TODAY?" now":""),style:"grid-row:1"},[dt.toLocaleDateString("de-DE",{weekday:"short"}),h("small",{text:fmt(d)})]));});
    let row=2;
    timeline.filter(e=>e.end&&e.end!==e.date&&e.end>=days[0]&&e.date<=days[6]).forEach(e=>{const a=e.date<days[0]?0:days.indexOf(e.date),b=e.end>days[6]?6:days.indexOf(e.end);tl.append(h("div",{class:"ev span",style:"--s:"+(a+1)+";--e:"+(b+2)+";grid-row:"+row},[h("div",{class:"t",text:e.clean||e.title}),chipFor(e.area)]));row++;});
    days.forEach((d,i)=>{const col=h("div",{class:"col",style:"grid-column:"+(i+1)+";grid-row:"+row});
      inWeek.filter(e=>e.date===d&&!(e.end&&e.end!==e.date)).forEach(e=>{const ev=h("div",{class:"bul",title:e.clean||e.title},[h("i",{style:"background:var("+(AREAS[e.area]||AREAS.privat).c+")"}),h("span",{text:e.short||e.clean||e.title})]);if(canWrite&&e._id){const x=h("button",{class:"bx",type:"button","aria-label":"Löschen: "+e.title,text:"×"});x.addEventListener("click",()=>delEntry(e._id));ev.append(x);}col.append(ev);});
      const tags=[];if(dayFlag(d,"gym")&&!inWeek.some(e=>e.date===d&&e.area==="gym"))tags.push(["Gym","--a-gym"]);if(dayFlag(d,"read"))tags.push(["Lesen","--a-privat"]);workOf(d).forEach(a=>{if(!inWeek.some(e=>e.date===d&&e.area===a))tags.push([(AREAS[a]||{}).l||a,(AREAS[a]||{c:"--muted"}).c]);});
      breaksOf(d).forEach(b=>tags.push([b.k+(b.min?" · "+fmtMin(b.min):""),"--a-auszeit"]));
      if(tags.length){const tw=h("div",{class:"tags"});tags.forEach(([l,c])=>tw.append(h("span",{class:"tg"},[h("i",{style:"background:var("+c+")"}),l])));col.append(tw);}
      tl.append(col);});
    $("tlCount").textContent=inWeek.length?inWeek.length+" Erfolge mit Text":"Noch keine Erfolge mit Text";
  }
  function renderBadges(){
    const b=$("badges");b.innerHTML="";const checks=Object.values(mine).filter(x=>x.type==="day"&&x.mood).length;
    const days=weekDays(0),ym=TODAY.slice(0,7),yr=timeline.filter(e=>e.date.startsWith(YEAR)).length,mDone=timeline.filter(e=>e.date.startsWith(ym)&&!SOFT(e.area)).length,crea=timeline.filter(e=>e.date.startsWith(YEAR)&&e.area==="kreativ").length;
    [["Erster Check-in",checks>=1],["10 Check-ins",checks>=10],["30 Check-ins",checks>=30],["3× Sport diese Woche",days.filter(gymOn).length>=3],["Auszeit diese Woche",days.some(hasBreak)],["5 aktive Tage diese Woche",days.filter(isActive).length>=5],["3 schöne Momente diese Woche",timeline.filter(e=>e.area==="momente"&&e.date>=days[0]&&e.date<=days[6]).length>=3],["10 Erfolge im "+ML[today.getMonth()],mDone>=10],["10 Kreativ-Projekte "+YEAR,crea>=10],["100 Einträge "+YEAR,yr>=100]]
      .forEach(([l,on])=>b.append(h("span",{class:"badge"+(on?" on":""),text:(on?"✓ ":"")+l})));
  }
  WHO.forEach((q,i)=>{const o=h("div",{class:"opts"});for(let v=0;v<=5;v++){const b=h("button",{type:"button","aria-pressed":"false",id:"who-"+i+"-"+v,text:String(v)});b.addEventListener("click",()=>{who[i]=v;[...o.children].forEach((c,j)=>c.setAttribute("aria-pressed",j===v));});o.append(b);}$("whoForm").append(h("div",{},[h("div",{class:"q",text:(i+1)+". "+q}),o]));});
  $("whoSave").addEventListener("click",async()=>{
    const st=$("whoStatus");if(!needDb()||!uid)return;if(who.some(v=>v==null)){st.style.color="var(--warn)";st.textContent="Bitte alle fünf Fragen beantworten.";return;}
    st.style.color="";const wk=isoWeek(today),score=who.reduce((a,b)=>a+b,0)*4,ref=db.collection("data/users/"+uid).doc("w-"+wk),prev=clone(mine["w-"+wk]);
    try{await ref.set({type:"who5",week:wk,answers:who.slice(),score,at:new Date().toISOString()});st.textContent="Gespeichert: "+score+" von 100.";pushUndo("Wochen-Check gespeichert",()=>prev?ref.set(prev):ref.delete());}
    catch(_){st.style.color="var(--warn)";st.textContent="Nicht gespeichert.";}
  });
  function renderWho(){
    const wk=isoWeek(today),done=mine["w-"+wk],hist=Object.values(mine).filter(x=>x.type==="who5").sort((a,b)=>a.week<b.week?-1:1),el=$("whoHistory");el.innerHTML="";
    if(done){$("whoSave").textContent="Wochen-Check aktualisieren";if(!renderWho.loaded&&Array.isArray(done.answers)){who=done.answers.slice();who.forEach((v,i)=>{for(let j=0;j<=5;j++){const x=$("who-"+i+"-"+j);if(x)x.setAttribute("aria-pressed",j===v);}});renderWho.loaded=true;}}
    if(hist.length){el.append(h("div",{text:"Verlauf: "+hist.slice(-8).map(x=>"KW "+x.week.slice(6)+": "+x.score).join(" · ")}));const l=hist[hist.length-1];if(l.score<=50)el.append(h("div",{style:"margin-top:8px;color:var(--warn)",text:"Dein letzter Wert liegt bei "+l.score+" von 100. Bleibt er ein paar Wochen so niedrig, sprich mit jemandem, dem du vertraust, oder sprich es in deiner Therapie an."}));}
    else el.textContent="Der erste Wert wird deine Ausgangslinie.";
  }
  // ---------- Ziele ----------
  function habitCount(g,days){return days.filter(d=>d<=TODAY&&(dayFlag(d,g.flag)||(g.area&&timeline.some(e=>e.date===d&&e.area===g.area))||(g.flag==="read"&&hasB(d,"Lesen")))).length;}
  function monthCount(g,ym){const re=g.match?new RegExp(g.match,"i"):null;return timeline.filter(e=>e.date.startsWith(ym)&&(!g.area||e.area===g.area)&&(!re||re.test(e.title))).length;}
  function stats(g){
    if(g.type==="weekly"){const days=weekDays(0),n=habitCount(g,days),el=days.filter(d=>d<=TODAY).length;
      if(!g.target)return {n,pct:null,onPlan:null,st:"open",label:"Ziel offen",short:n+" Tage diese Woche"};
      const need=Math.floor(g.target*el/7),onPlan=n>=need;return {n,pct:Math.min(1,n/g.target),onPlan,st:n>=g.target?"ok":"go",label:n>=g.target?"Woche geschafft":(onPlan?"Im Plan":"Noch "+(g.target-n)+" diese Woche"),short:n+"/"+g.target+" diese Woche"};}
    if(g.type==="monthly"){const n=monthCount(g,TODAY.slice(0,7));const dim=new Date(today.getFullYear(),today.getMonth()+1,0).getDate();
      if(!g.target)return {n,pct:null,onPlan:null,st:"open",label:"Ziel offen",short:n+" im "+M[today.getMonth()]};
      const onPlan=n>=g.target||today.getDate()<=dim-7;return {n,pct:Math.min(1,n/g.target),onPlan,st:n>=g.target?"ok":"go",label:n>=g.target?"Monat geschafft":(onPlan?"Im Plan":"Diese Woche dran"),short:n+"/"+g.target+" im "+M[today.getMonth()]};}
    if(g.type==="deadline"){const steps=g.steps||[],d=steps.filter(x=>x.done).length,pct=steps.length?d/steps.length:0,left=Math.ceil((new Date(g.deadline+"T23:59")-today)/864e5);const fin=steps.length&&d===steps.length;
      return {d,total:steps.length,pct,left,onPlan:fin||left>=0,st:fin?"ok":"go",label:fin?"Erledigt":(left>=0?"Noch "+left+" Tage":"Frist vorbei"),short:d+"/"+steps.length+" Schritte"};}
    return {pct:null,onPlan:null,st:"open",label:"",short:""};
  }
  function ring(pct,label){const r=18,c=2*Math.PI*r;const svg=s("svg",{class:"ring",width:"46",height:"46",viewBox:"0 0 46 46","aria-hidden":"true"});
    svg.append(s("circle",{cx:23,cy:23,r,fill:"none",stroke:css("--line-2"),"stroke-width":4,"stroke-dasharray":pct==null?"3 4":"none"}));
    if(pct)svg.append(s("circle",{cx:23,cy:23,r,fill:"none",stroke:css("--gold"),"stroke-width":4,"stroke-linecap":"round","stroke-dasharray":(c*pct)+" "+c,transform:"rotate(-90 23 23)"}));
    const t=s("text",{x:23,y:27,"text-anchor":"middle"});t.textContent=label;svg.append(t);return svg;}

  function syncHabitTiles(){const items=goals&&Array.isArray(goals.items)?goals.items:[];TILES_WORK=BASE_WORK.concat(items.filter(g=>g.type==="weekly"&&g.flag&&g.flag.startsWith("h-")).map(g=>({k:g.flag,l:g.short||g.title,type:"flag",flag:g.flag,ic:"check",c:"--a-kreativ"})));}
  function renderGoals(){
    syncHabitTiles();const strip=$("gstrip"),rows=$("goalRows");strip.innerHTML="";rows.innerHTML="";
    const items=goals&&Array.isArray(goals.items)?goals.items:[];
    if(!items.length){rows.append(h("div",{class:"empty",text:"Noch keine Ziele. Leg unten dein erstes an."}));strip.append(h("div",{class:"small muted",text:"Noch keine Ziele angelegt."}));$("goalsOk").textContent="—";return;}
    let ok=0,cnt=0;
    items.forEach((g,idx)=>{const st=stats(g);if(st.onPlan!==null){cnt++;if(st.onPlan)ok++;}
      let soll,ist;if(g.type==="weekly"){ist=st.n;soll=g.target?String(g.target):null;}else if(g.type==="monthly"){ist=st.n;soll=g.target?String(g.target):null;}else{ist=st.d;soll=String(st.total);}
      const unit=g.type==="weekly"?"diese Woche":g.type==="monthly"?"im "+ML[today.getMonth()]:"Schritte";
      const bar=h("div",{class:"gbar"});if(st.pct!=null){bar.append(h("i",{class:st.st==="ok"?"ok":"",style:"width:"+Math.max(st.pct?4:0,st.pct*100)+"%"}));}else bar.classList.add("open");
      strip.append(h("div",{class:"gl"},[h("div",{class:"gl-t"},[h("span",{text:g.short||g.title}),h("b",{text:soll?ist+" von "+soll:ist+" "+unit})]),bar,h("div",{class:"gl-s",text:(soll?unit+" · ":"")+st.label})]));
      rows.append(goalRow(g,idx,st));});
    $("goalsOk").textContent=ok+"/"+cnt;
  }
  function planBox(g,idx){
    const inp=h("textarea",{maxlength:"600",rows:"3",placeholder:g.planHint||"Wenn …, dann …","aria-label":"Plan für "+g.title});inp.value=g.plan||"";
    const save=()=>{const v=inp.value.trim();if(v===(g.plan||""))return;writeGoals(goals.items.map((x,i)=>i===idx?Object.assign({},x,{plan:v}):x),"Plan geändert: "+(g.short||g.title));};
    inp.addEventListener("blur",save);
    return h("div",{class:"plan"},[h("label",{text:"Wenn-dann-Plan"}),inp]);
  }

  function goalRow(g,idx,st){
    const typeTxt={weekly:"Gewohnheit · pro Woche",monthly:"Pro Monat",deadline:"Projekt mit Frist"}[g.type]||"";
    const left=h("div",{class:"g-left"},[h("div",{class:"g-type",text:typeTxt}),h("div",{class:"g-title",text:g.title}),h("span",{class:"state "+st.st,text:st.label})]);
    const right=h("div",{class:"g-right"});
    if(g.type==="weekly"){
      left.append(h("div",{class:"g-big"},[String(st.n),h("small",{text:g.target?"von "+g.target+" diese Woche":"Tage diese Woche"})]));
      const days=weekDays(0),wk=h("div",{class:"wk"});
      days.forEach(d=>{const on=habitCount(g,[d])>0;const dt=new Date(d+"T12:00");wk.append(h("div",{class:"d"},[h("i",{class:(on?"on ":"")+(d===TODAY?"today ":"")+(d>TODAY?"future":"")}),dt.toLocaleDateString("de-DE",{weekday:"short"})]));});
      right.append(wk);
      const N=8,hist=h("div",{class:"hist"}),counts=[];
      for(let i=N-1;i>=0;i--){const n=habitCount(g,weekDays(-i));counts.push(n);}
      const mx=Math.max(g.target||1,...counts,1);counts.forEach((n,i)=>{const sp=h("span",{class:g.target&&n>=g.target?"hit":"",style:"height:"+Math.max(6,n/mx*100)+"%"});sp.addEventListener("mousemove",e=>tipOn(e,(i===N-1?"Diese Woche":"Vor "+(N-1-i)+" Wo.")+": "+n+" Tage"));sp.addEventListener("mouseleave",tipOff);hist.append(sp);});
      const hits=g.target?counts.filter(n=>n>=g.target).length:null;
      right.append(h("div",{},[hist,h("div",{class:"hist-l"},[h("span",{text:"vor 7 Wochen"}),h("span",{text:g.target?("Ziel erreicht in "+hits+" von "+N+" Wochen"):("Ø "+(counts.reduce((a,b)=>a+b,0)/N).toFixed(1).replace(".",",")+" Tage pro Woche")}),h("span",{text:"jetzt"})])]));
      const on=dayFlag(TODAY,g.flag);const b=h("button",{class:"gbtn"+(on?" on":" primary"),type:"button",text:on?"✓ "+g.action:g.action});
      b.addEventListener("click",()=>{const patch={};patch[g.flag]=!on;if(g.flag==="read"){const br=breaksOf(TODAY);patch.breaks=on?br.filter(x=>x.k!=="Lesen"):(hasB(TODAY,"Lesen")?br:br.concat({k:"Lesen",min:0}));}writeDay(patch,(on?"Zurückgenommen: ":"")+g.action);});
      right.append(h("div",{class:"gact"},[b]));
    } else if(g.type==="monthly"){
      left.append(h("div",{class:"g-big"},[String(st.n),h("small",{text:g.target?"von "+g.target+" im "+ML[today.getMonth()]:"im "+ML[today.getMonth()]})]));
      const mo=h("div",{class:"months"});let sum=0,act=0;
      for(let m=0;m<12;m++){const ym=YEAR+"-"+pad(m+1),n=monthCount(g,ym);if(m<=today.getMonth()){sum+=n;act++;}const hit=g.target?n>=g.target:false;
        mo.append(h("div",{class:"m"+(m===today.getMonth()?" cur":"")},[h("b",{class:hit?"hit":(n?"some":""),text:m>today.getMonth()?"":String(n)}),M[m]]));}
      right.append(mo);
      right.append(h("div",{class:"small muted",text:g.target?(YEAR+": "+sum+" insgesamt, Ziel erreicht in "+[...Array(today.getMonth()+1).keys()].filter(m=>monthCount(g,YEAR+"-"+pad(m+1))>=g.target).length+" von "+act+" Monaten"):(YEAR+": "+sum+" insgesamt, Ø "+(sum/act).toFixed(1).replace(".",",")+" pro Monat")}));
      const inp=h("textarea",{maxlength:"600",rows:"3",placeholder:(g.placeholder||"Was genau?")+" (Strg/⌘ + Enter speichert)","aria-label":g.action});
      const b=h("button",{class:"gbtn primary",type:"button",text:g.action});
      b.addEventListener("click",async()=>{const t=inp.value.trim()||g.defaultTitle;b.disabled=true;if(await addEntry({date:TODAY,title:t,area:g.area,source:"ziel",at:new Date().toISOString()},"Eingetragen: "+t))inp.value="";b.disabled=false;});
      inp.addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault();b.click();}});
      right.append(h("div",{style:"display:flex;flex-direction:column;gap:8px"},[inp,h("div",{class:"gact"},[b])]));
    } else if(g.type==="deadline"){
      const dl=new Date(g.deadline+"T12:00").toLocaleDateString("de-DE",{day:"numeric",month:"long"});
      left.append(h("div",{class:"g-big"},[Math.round(st.pct*100)+"%",h("small",{text:"bis "+dl})]));
      const seg=h("div",{class:"seg"});(g.steps||[]).forEach(x=>seg.append(h("i",{class:x.done?"on":""})));right.append(seg);
      const list=h("div",{class:"steps"});let nextMarked=false;
      (g.steps||[]).forEach((x,si)=>{const isNext=!x.done&&!nextMarked;if(isNext)nextMarked=true;
        const b=h("button",{class:"step"+(x.done?" done":"")+(isNext?" next":""),type:"button","aria-pressed":String(!!x.done)},[h("span",{class:"bx",text:x.done?"✓":""}),h("span",{text:x.t+(isNext?"  · nächster Schritt":"")})]);
        b.addEventListener("click",()=>{const steps=g.steps.map((y,j)=>j===si?Object.assign({},y,{done:!y.done}):y);writeGoals(goals.items.map((z,i)=>i===idx?Object.assign({},z,{steps}):z),(x.done?"Wieder offen: ":"Erledigt: ")+x.t);});
        list.append(b);});
      right.append(list);
    }
    if(g.note)right.append(h("div",{class:"small muted",text:g.note}));
    right.append(planBox(g,idx));
    const del=h("button",{class:"gdel",type:"button",text:"Ziel löschen"});del.addEventListener("click",()=>{if(!confirm("Ziel „"+(g.short||g.title)+"“ löschen? Deine Einträge bleiben."))return;writeGoals(goals.items.filter((_,i)=>i!==idx),"Ziel gelöscht: "+(g.short||g.title));});left.append(del);
    return h("div",{class:"goal-row"},[left,right]);
  }

  // ---------- Jahr ----------
  function entryRow(e){const t=h("div",{class:"t"},[h("div",{text:e.clean||e.title})]);if(e.clean)t.append(h("div",{class:"note",text:"Original: "+e.title}));if(e.note)t.append(h("div",{class:"note",text:e.note}));if(e.place)t.append(h("div",{class:"note",text:"📍 "+e.place}));return h("div",{class:"entry"},[h("span",{class:"d",text:fmt(e.date)+(e.end&&e.end!==e.date?"–"+fmt(e.end):"")}),t,h("div",{},[chipFor(e.area)])]);}
  function renderJahr(){
    const yr=timeline.filter(e=>e.date.startsWith(YEAR)),k=$("yearKpis");k.innerHTML="";const places=new Set(yr.filter(e=>e.place).map(e=>e.place));
    [[yr.filter(e=>!SOFT(e.area)).length,"Dinge geschafft"],[yr.filter(e=>e.area==="auszeit").length,"Auszeiten & Reisen"],[yr.filter(e=>e.area==="momente").length,"Schöne Momente"],[places.size,"Orte"]].forEach(([n,l])=>k.append(h("div",{class:"kpi"},[h("div",{class:"n",text:String(n)}),h("div",{class:"l",text:l})])));
    const ch=$("areaChips");ch.innerHTML="";const all=h("button",{class:"fchip",type:"button","aria-pressed":String(!filter),text:"Alle "+yr.length});all.addEventListener("click",()=>{filter=null;renderJahr();drawChart();});ch.append(all);
    Object.keys(AREAS).forEach(key=>{const c=h("button",{class:"fchip",type:"button","aria-pressed":String(filter===key)},[h("i",{style:"background:var("+AREAS[key].c+")"}),AREAS[key].l+" "+yr.filter(e=>e.area===key).length]);c.addEventListener("click",()=>{filter=filter===key?null:key;renderJahr();drawChart();});ch.append(c);});
    const list=(filter?yr.filter(e=>e.area===filter):yr).slice().sort((a,b)=>a.date<b.date?1:-1);$("tlHead").textContent=filter?AREAS[filter].l:"Alle Einträge";const tl=$("timeline");tl.innerHTML="";
    if(!list.length)tl.append(h("div",{class:"empty",text:"Noch keine Einträge in diesem Bereich."}));
    const by={};list.forEach(e=>{const m=+e.date.slice(5,7)-1;(by[m]=by[m]||[]).push(e);});
    Object.keys(by).sort((a,b)=>b-a).forEach(m=>{const box=h("div",{class:"month"},[h("h3",{},[ML[m],h("span",{class:"small muted",text:by[m].length+" Einträge"})])]);by[m].forEach(e=>box.append(entryRow(e)));tl.append(box);});
    const pl=$("places");pl.innerHTML="";const pm={};yr.filter(e=>e.place).forEach(e=>(pm[e.place]=pm[e.place]||[]).push(e));const keys=Object.keys(pm).sort((a,b)=>pm[a][0].date<pm[b][0].date?-1:1);$("placeCount").textContent=keys.length+(keys.length===1?" Ort":" Orte");
    if(!keys.length)pl.append(h("div",{class:"empty",text:"Noch keine Orte."}));
    keys.forEach(p=>{const es=pm[p].sort((a,b)=>a.date<b.date?-1:1);pl.append(h("div",{class:"place"},[h("div",{},[h("div",{style:"font-weight:500",text:p}),h("div",{class:"small muted",text:es.map(e=>e.title).join(" · ")})]),h("span",{class:"mono small muted",style:"white-space:nowrap",text:fmt(es[0].date)})]));});
  }
  function drawChart(){
    const box=$("monthChart");if(!box||box.offsetParent===null)return;box.innerHTML="";
    const yr=timeline.filter(e=>e.date.startsWith(YEAR)),keys=Object.keys(AREAS),W=Math.max(box.clientWidth||700,360),H=240,pl=28,pb=26,pt=10;
    const counts=Array.from({length:12},()=>({}));yr.forEach(e=>{const m=+e.date.slice(5,7)-1;counts[m][e.area]=(counts[m][e.area]||0)+1;});
    const tot=counts.map(c=>keys.filter(k=>!filter||k===filter).reduce((a,k)=>a+(c[k]||0),0)),max=Math.max(4,...tot),step=max<=10?2:max<=25?5:10,top=Math.ceil(max/step)*step;
    const svg=s("svg",{viewBox:"0 0 "+W+" "+H,width:"100%",role:"img","aria-label":"Einträge pro Monat "+YEAR}),y=v=>pt+(H-pt-pb)*(1-v/top);
    for(let v=0;v<=top;v+=step){svg.append(s("line",{x1:pl,x2:W,y1:y(v),y2:y(v),stroke:css("--line")}));const t=s("text",{x:0,y:y(v)+4});t.textContent=v;svg.append(t);}
    const bw=(W-pl)/12;
    counts.forEach((c,m)=>{let acc=0;const x=pl+m*bw+bw*.2,w=bw*.6;keys.forEach(k=>{if(filter&&filter!==k)return;const n=c[k]||0;if(!n)return;const r=s("rect",{x,width:w,y:y(acc+n)+1,height:Math.max(1,y(acc)-y(acc+n)-2),rx:3,fill:css(AREAS[k].c)});r.addEventListener("mousemove",e=>tipOn(e,ML[m]+": "+n+" × "+AREAS[k].l));r.addEventListener("mouseleave",tipOff);svg.append(r);acc+=n;});
      const t=s("text",{x:pl+m*bw+bw/2,y:H-6,"text-anchor":"middle"});t.textContent=M[m];if(m===today.getMonth())t.setAttribute("style","fill:var(--ink)");svg.append(t);});
    box.append(svg);
  }


    // ---------- GEDANKEN ----------
  const TCATS=[["todo","To-do"],["ideen","Ideen"],["film","Filme & Serien"],["geschenk","Geschenkideen"],["date","Date-Ideen"],["reise","Reisen"],["kaufen","Wunschliste"],["rezepte","Rezepte"],["lernen","Lernen & Bücher"],["mindset","Mindset"],["kopf","Kopf frei"],["privat","Privat"]];
  const tcl=k=>(TCATS.find(c=>c[0]===k)||[k,"Ohne Kategorie"])[1];
  const TST={open:"offen",kept:"behalten",done:"erledigt",converted:"als Erfolg",archived:"archiviert"};
  let tCat=null,tFilter="open",tReview=false;
  const thoughts=()=>Object.keys(mine).filter(k=>mine[k]&&mine[k].type==="thought").map(k=>Object.assign({_id:k},mine[k])).sort((a,b)=>a.at<b.at?1:-1);
  const tRef=id=>db.collection("data/users/"+uid).doc(id);
  async function tWrite(id,data,label){if(!needDb()||!uid)return false;const prev=clone(mine[id]);try{await tRef(id).set(data);}catch(_){toast("Nicht gespeichert.",false);return false;}pushUndo(label,()=>prev?tRef(id).set(prev):tRef(id).delete());return true;}
  async function tPatch(id,patch,label){const cur=mine[id];if(!cur)return false;return tWrite(id,Object.assign({},cur,patch),label);}
  async function tClassify(id,doc){
    try{const smp=await getSample();if(!smp||!db)return;
      const r=await smp("Ordne diesen spontanen Gedanken von Melina genau einer Kategorie zu und gib eine Kurzform.\nKategorien (nur den Schlüssel verwenden): "+TCATS.map(c=>c[0]+" = "+c[1]).join(", ")+".\nkopf heißt: etwas, das ihn belastet oder das er loswerden will. todo heißt: eine konkrete Aufgabe.\nRegeln: Kurzform höchstens 6 Wörter, Inhalt exakt behalten, nichts erfinden, Rechtschreibung korrigieren, keine Gedankenstriche, keine Anführungszeichen.\nAntworte in genau zwei Zeilen und sonst nichts:\nKAT: schlüssel\nKURZ: kurzform\n\nGedanke:\n"+doc.text,{modelTier:"quick"});
      const raw=(r&&r.text)||"",mK=raw.match(/KAT:\s*([a-z]+)/i),mS=raw.match(/KURZ:\s*(.+)/i);
      const upd=Object.assign({},mine[id]||doc);if(mS)upd.short=mS[1].trim().replace(/^["„“]+|["“”]+$/g,"").replace(/[.]$/,"").replace(/\s[–—]\s/g,", ");
      const k=mK&&mK[1].toLowerCase();if(!doc.cat&&k&&TCATS.some(c=>c[0]===k)){upd.cat=k;upd.catBy="ki";}
      await tRef(id).set(upd);
    }catch(e){if(e&&e.code==="rate_limited")toast("KI gerade ausgelastet, Kategorie später setzen.",false);}
  }
  async function tSave(){
    const ta=$("tText"),v=ta.value.trim();if(!v){ta.focus();return;}
    const id="t-"+Date.now().toString(36),doc={type:"thought",text:v,at:new Date().toISOString(),date:TODAY,status:"open"};if(tCat){doc.cat=tCat;doc.catBy="me";}
    if(await tWrite(id,doc,"Gedanke gemerkt")){ta.value="";tCat=null;renderGedanken();ta.focus();tClassify(id,doc);}
  }
  $("tSave").addEventListener("click",tSave);
  $("tText").addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault();tSave();}});
  TCATS.forEach(([k,l])=>{const b=h("button",{class:"tc",type:"button","aria-pressed":"false","data-k":k,text:l});b.addEventListener("click",()=>{tCat=tCat===k?null:k;renderGedanken();});$("tCats").append(b);});
  async function tToErfolg(t){const ref=await addEntry({date:TODAY,title:t.text,area:t.cat==="content"?"kreativ":"privat",source:"gedanke",at:new Date().toISOString()},"Erfolg aus Gedanke");if(ref){improve(ref.id,t.text,t.cat==="content"?"kreativ":"privat");await tPatch(t._id,{status:"converted"},"Als Erfolg verbucht");}}
  function tItem(t){
    const sel=h("select",{"aria-label":"Kategorie"});sel.append(h("option",{value:"",text:"Ohne Kategorie"}));TCATS.forEach(([k,l])=>{const o=h("option",{value:k,text:l});if(t.cat===k)o.selected=true;sel.append(o);});
    sel.addEventListener("change",()=>tPatch(t._id,{cat:sel.value||null,catBy:"me"},"Kategorie: "+tcl(sel.value)));
    const isOpen=t.status==="open"||t.status==="kept",done=h("button",{class:"act",type:"button",text:isOpen?"✓ Erledigt":"Wieder offen"});done.addEventListener("click",()=>tPatch(t._id,{status:isOpen?"done":"open"},isOpen?"Gedanke erledigt":"Wieder offen"));
    const del=h("button",{class:"act",type:"button",text:"Löschen"});del.addEventListener("click",async()=>{const prev=clone(mine[t._id]);try{await tRef(t._id).delete();pushUndo("Gedanke gelöscht",()=>tRef(t._id).set(prev));}catch(_){toast("Löschen ging nicht.",false);}});
    const meta=h("div",{class:"meta"},[sel,t.catBy==="ki"?h("span",{class:"ki",text:"von Claude sortiert"}):null,h("span",{text:fmt(t.date)+" · "+TST[t.status||"open"]}),canWrite?done:null,canWrite?del:null]);
    return h("div",{class:"ti"+(isOpen?"":" done")},[t.short?h("div",{class:"s",text:t.short}):null,h("div",{class:t.short?"o":"s",text:t.text}),meta]);
  }
  function renderReviewCard(open){
    const box=$("tReviewBox");box.innerHTML="";
    if(!tReview){if(open.length>=3){const b=h("button",{type:"button",text:"Durchsehen"});b.addEventListener("click",()=>{tReview=true;renderGedanken();});box.append(h("div",{class:"catchup"},[h("span",{text:open.length+" Gedanken warten. 2 Minuten reichen."}),b]));}return;}
    const t=open.slice().sort((a,b)=>a.at<b.at?-1:1)[0];
    if(!t){tReview=false;box.append(h("div",{class:"catchup"},[h("span",{text:"Alles durchgesehen. Kopf frei."})]));return;}
    const B=(txt,fn,cls)=>{const b=h("button",{class:"gbtn"+(cls?" "+cls:""),type:"button",text:txt});b.addEventListener("click",fn);return b;};
    const stop=B("Fertig",()=>{tReview=false;renderGedanken();});
    box.append(h("div",{class:"rcard"},[h("div",{class:"small muted",text:"Noch "+open.length+" · "+tcl(t.cat)+" · "+fmt(t.date)}),h("div",{class:"q",text:t.text}),
      h("div",{class:"gact"},[B("Behalten",()=>tPatch(t._id,{status:"kept"},"Behalten")),B("✓ Erledigt",()=>tPatch(t._id,{status:"done"},"Erledigt"),"primary"),B("Als Erfolg",()=>tToErfolg(t)),B("Archivieren",()=>tPatch(t._id,{status:"archived"},"Archiviert")),stop])]));
  }
  function renderGedanken(){
    if(!$("view-gedanken"))return;
    [...$("tCats").children].forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===tCat));
    $("tHint").textContent=tCat?"Kategorie: "+tcl(tCat):"Kategorie optional.";
    const all=thoughts(),open=all.filter(t=>t.status==="open");
    renderReviewCard(open);
    const f=$("tFilters");f.innerHTML="";const counts={};all.filter(t=>t.status!=="archived").forEach(t=>{const k=t.cat||"";counts[k]=(counts[k]||0)+1;});
    const fb=(key,label)=>{const b=h("button",{class:"fchip",type:"button","aria-pressed":String(tFilter===key),text:label});b.addEventListener("click",()=>{tFilter=key;renderGedanken();});f.append(b);};
    fb("open","Offen "+open.length);fb("all","Alle "+all.filter(t=>t.status!=="archived").length);
    TCATS.forEach(([k,l])=>{if(counts[k])fb(k,l+" "+counts[k]);});if(counts[""])fb("","Ohne Kategorie "+counts[""]);
    if(all.some(t=>t.status==="archived"))fb("archived","Archiv");
    const list=$("tList");list.innerHTML="";
    const shown=tFilter==="open"?open:tFilter==="all"?all.filter(t=>t.status!=="archived"):tFilter==="archived"?all.filter(t=>t.status==="archived"):all.filter(t=>(t.cat||"")===tFilter&&t.status!=="archived");
    if(!shown.length)list.append(h("div",{class:"empty",text:all.length?"Hier ist gerade nichts.":"Noch keine Gedanken. Schreib oben einfach los."}));
    shown.slice(0,60).forEach(t=>list.append(tItem(t)));
    const st=$("tStats");st.innerHTML="";const since=(()=>{const d=new Date(today);d.setDate(d.getDate()-30);return ymd(d);})();const m={};all.filter(t=>t.date>=since).forEach(t=>{const k=t.cat||"";m[k]=(m[k]||0)+1;});
    const ks=Object.keys(m).sort((a,b)=>m[b]-m[a]),mx=Math.max(1,...ks.map(k=>m[k]));
    st.append(h("div",{class:"small muted",style:"margin-bottom:10px",text:"Letzte 30 Tage: "+all.filter(t=>t.date>=since).length+" Gedanken, davon "+all.filter(t=>t.date>=since&&t.status!=="open").length+" verarbeitet"}));
    ks.forEach(k=>st.append(h("div",{class:"tbar"},[h("span",{text:tcl(k)}),h("div",{},[h("i",{style:"width:"+(m[k]/mx*100)+"%"})]),h("span",{class:"mono muted",text:String(m[k])})])));
    const rep=mine["tr-main"],rb=$("tReport");rb.innerHTML="";$("tReportAt").textContent=rep?"Stand "+new Date(rep.at).toLocaleDateString("de-DE")+", "+rep.n+" Gedanken":"";
    if(rep&&rep.text)rep.text.split("\n").forEach(line=>{const l=line.trim();if(!l)return;if(/^[-•*]\s/.test(l))rb.append(h("div",{class:"rl",text:"• "+l.replace(/^[-•*]\s*/,"")}));else rb.append(h("h3",{class:"rh",text:l.replace(/^#+\s*/,"").replace(/\*\*/g,"")}));});
    const lk=$("toThoughts");if(lk)lk.textContent=open.length?open.length+" Gedanken offen":"Gedanken";
  }
  $("tReportBtn").addEventListener("click",async()=>{
    const btn=$("tReportBtn"),smp=await getSample();if(!smp||!db||!uid){toast("KI ist hier gerade nicht verfügbar.",false);return;}
    const since=(()=>{const d=new Date(today);d.setDate(d.getDate()-30);return ymd(d);})(),list=thoughts().filter(t=>t.date>=since&&t.status!=="archived");
    if(list.length<3){toast("Sammle erst ein paar Gedanken.",false);return;}
    btn.disabled=true;btn.textContent="Wertet aus …";
    try{const r=await smp("Hier sind Melinas spontane Gedanken der letzten 30 Tage mit Datum, Kategorie und Status. Werte sie für ihn aus, auf Deutsch, direkt und konkret, in Du-Form, ohne Gedankenstriche und ohne Anführungszeichen.\nGliedere mit genau diesen vier Überschriften, je eine eigene Zeile, darunter 2 bis 4 Stichpunkte, die mit - beginnen:\nWas immer wiederkommt\nWas du daraus machen kannst\nWas dich beschäftigt\nWas du schon erledigt hast\nBeziehe dich auf konkrete Gedanken. Keine Diagnosen, kein Druck, nichts erfinden.\n\n"+list.map(t=>t.date+" ["+tcl(t.cat)+"] ("+TST[t.status||"open"]+") "+t.text).join("\n"),{modelTier:"default"});
      const text=((r&&r.text)||"").replace(/\s[–—]\s/g,", ").trim();if(text)await tRef("tr-main").set({type:"treport",text,at:new Date().toISOString(),n:list.length});}
    catch(e){toast(e&&e.code==="rate_limited"?"KI gerade ausgelastet, später noch mal.":"Auswertung ging gerade nicht.",false);}
    btn.disabled=false;btn.textContent="Neu auswerten";
  });

  // ---------- v3: Körper, Momente, Einkauf ----------
  const LVL=["","leicht","mittel","stark"];
  const BODY_BASE=[{k:"kopf",l:"Kopfschmerzen",ic:"head",sev:true},{k:"migraene",l:"Migräne",ic:"bolt",sev:true},{k:"therapie",l:"Therapie",ic:"chat",sev:false},{k:"meds",l:"Schmerzmittel",ic:"pill",sev:false}];
  const ADD_TILE={k:"_add",l:"Eigene",type:"addbody",ic:"plus",c:"--a-body"};
  let settings={symptoms:[]},shop=[],shopHist={};
  function bodyTiles(){return BODY_BASE.map(b=>Object.assign({type:"body",c:"--a-body"},b)).concat((settings.symptoms||[]).map(s=>({k:s.k,l:s.l,ic:"dot",type:"body",sev:true,custom:true,c:"--a-body"})));}
  const LEGACY_BODY={kreislauf:"Kreislauf / Schwindel"};
  const bodyLabel=x=>(bodyTiles().find(b=>b.k===x.k)||{}).l||x.l||LEGACY_BODY[x.k]||x.k;
  const isSym=x=>x.k!=="meds"&&x.k!=="therapie";
  const addDays=(s,n)=>{const x=new Date(s+"T12:00");x.setDate(x.getDate()+n);return ymd(x);};
  const fmtFull=s=>s.slice(8,10)+"."+s.slice(5,7)+"."+s.slice(0,4);
  async function setSettings(next,label){if(!needDb())return;const prev=clone(settings);try{await db.doc("settings/main").set(next);pushUndo(label,()=>db.doc("settings/main").set(prev));}catch(_){toast("Nicht gespeichert.",false);}}
  async function addSymptom(){
    const n=(prompt("Was möchtest du festhalten? Zum Beispiel Übelkeit oder Rückenschmerzen.")||"").trim().slice(0,30);if(!n)return;
    if(bodyTiles().some(x=>x.l.toLowerCase()===n.toLowerCase())){toast("Die Kachel gibt es schon.",false);return;}
    await setSettings(Object.assign({},settings,{symptoms:(settings.symptoms||[]).concat({k:"c-"+Date.now().toString(36),l:n})}),"Neue Kachel: "+n);
  }
  async function removeSymptom(t){if(!confirm("Kachel „"+t.l+"“ ausblenden? Deine bisherigen Einträge bleiben."))return;focusTile=null;await setSettings(Object.assign({},settings,{symptoms:(settings.symptoms||[]).filter(s=>s.k!==t.k)}),"Kachel ausgeblendet: "+t.l);}
  function bodyDetail(t,panel,d){
    const cur=(bodyOf(d).find(x=>x.k===t.k)||{}).lvl||0;panel.append(h("div",{class:"small muted",text:"Wie stark? (optional)"}));
    const row=h("div",{class:"gact"});[1,2,3].forEach(l=>{const b=h("button",{class:"gbtn"+(cur===l?" on":""),type:"button",text:LVL[l]});b.addEventListener("click",async()=>{await writeDay({body:bodyOf(d).map(x=>x.k===t.k?Object.assign({},x,{lvl:l}):x)},t.l+": "+LVL[l],d);focusTile=null;renderHeute();});row.append(b);});
    const rm=h("button",{class:"gbtn",type:"button",text:"Entfernen"});rm.addEventListener("click",()=>removeTile(t));row.append(rm);panel.append(row);
    if(t.custom){const hide=h("button",{class:"gdel",type:"button",text:"Kachel ausblenden"});hide.addEventListener("click",()=>removeSymptom(t));panel.append(hide);}
  }
  async function shareText(text,title){
    try{if(navigator.share){await navigator.share({title,text});return true;}}catch(e){if(e&&e.name==="AbortError")return false;}
    try{await navigator.clipboard.writeText(text);toast("Kopiert. Du kannst es jetzt einfügen.",false);return true;}catch(_){toast("Teilen ging nicht.",false);return false;}
  }
  // Momente
  let mTogether=false;
  $("mTog").addEventListener("click",()=>{mTogether=!mTogether;$("mTog").setAttribute("aria-pressed",String(mTogether));});
  async function saveMoment(){const ta=$("mText"),v=ta.value.trim();if(!v){ta.focus();return;}const doc={date:logDate,title:v,area:"momente",source:"heute",at:new Date().toISOString()};if(mTogether)doc.together=true;if(await addEntry(doc,"Schöner Moment gemerkt")){ta.value="";mTogether=false;$("mTog").setAttribute("aria-pressed","false");}}
  $("mSave").addEventListener("click",saveMoment);
  $("mText").addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault();saveMoment();}});
  function renderMoments(days){
    const box=$("wkMoments");box.innerHTML="";const list=timeline.filter(e=>e.area==="momente"&&e.date>=days[0]&&e.date<=days[6]).sort((a,b)=>a.date<b.date?-1:1);
    const tog=list.filter(e=>e.together).length;$("wkMomCount").textContent=list.length?(list.length+(tog?", davon "+tog+" zu zweit":"")):"—";
    if(!list.length){box.append(h("div",{class:"empty",text:"Noch keine schönen Momente diese Woche. Unter Heute kannst du einen festhalten."}));return;}
    list.forEach(e=>{const tx=h("div",{},[e.clean||e.title]);if(e.together)tx.append(h("span",{class:"tag",text:"zu zweit"}));box.append(h("div",{class:"mom"},[h("span",{class:"d",text:wd(e.date)+" "+fmt(e.date)}),tx]));});
  }
  // Körper-Tagebuch
  function bodyReport(){
    const since=addDays(TODAY,-29),lines=["Körper-Tagebuch "+fmtFull(since)+" bis "+fmtFull(TODAY),""],cnt={},rows=[];let meds=0,ther=0,logged=0,free=0;
    for(let i=29;i>=0;i--){const d=addDays(TODAY,-i);if(!mine["d-"+d])continue;logged++;const b=bodyOf(d),sym=b.filter(isSym);if(!sym.length)free++;
      sym.forEach(x=>{const l=bodyLabel(x);cnt[l]=cnt[l]||{n:0,s:0};cnt[l].n++;if(x.lvl===3)cnt[l].s++;});if(b.some(x=>x.k==="meds"))meds++;if(b.some(x=>x.k==="therapie"))ther++;
      if(b.length)rows.push(wd(d)+" "+fmt(d)+": "+b.map(x=>bodyLabel(x)+(x.lvl?" ("+LVL[x.lvl]+")":"")).join(", "));}
    lines.push("Eingetragene Tage: "+logged,"Davon ohne Beschwerden: "+free);Object.keys(cnt).forEach(k=>lines.push(k+": "+cnt[k].n+(cnt[k].n===1?" Tag":" Tage")+(cnt[k].s?", davon "+cnt[k].s+" stark":"")));
    lines.push("Tage mit Schmerzmitteln: "+meds,"Therapie-Termine: "+ther,"","Tage im Einzelnen:");return lines.concat(rows.length?rows:["Keine Beschwerden eingetragen."]).join("\n");
  }
  function renderBody(days){
    const box=$("wkBody");if(!box)return;box.innerHTML="";const el=days.filter(d=>d<=TODAY),logged=el.filter(d=>mine["d-"+d]),free=logged.filter(d=>!bodyOf(d).filter(isSym).length).length;
    box.append(h("div",{class:"small",text:logged.length?(free+" von "+logged.length+" eingetragenen Tagen ohne Beschwerden."):"Diese Woche ist noch nichts eingetragen."}));
    const rows=h("div",{});el.forEach(d=>{const b=bodyOf(d);if(b.length)rows.append(h("div",{class:"brow"},[h("b",{style:"font-weight:500",text:wd(d)+" "+fmt(d)+"  "}),b.map(x=>bodyLabel(x)+(x.lvl?" ("+LVL[x.lvl]+")":"")).join(", ")]));});if(rows.childNodes.length)box.append(rows);
    const last=[];for(let i=29;i>=0;i--)last.push(addDays(TODAY,-i));const c=k=>last.filter(d=>bodyOf(d).some(x=>x.k===k)).length;
    const stats=[[c("kopf"),"Kopfschmerz-Tage"],[c("migraene"),"Migräne-Tage"],[c("meds"),"Tage mit Schmerzmitteln"],[c("therapie"),"Therapie-Termine"]].concat((settings.symptoms||[]).map(s=>[c(s.k),s.l+" (Tage)"]));
    box.append(h("div",{class:"tgroup",style:"margin:6px 0 0",text:"Letzte 30 Tage"}));const g=h("div",{class:"bstats"});stats.forEach(([n,l])=>g.append(h("div",{class:"bs"},[h("b",{text:String(n)}),h("span",{text:l})])));box.append(g);
    if(c("meds")>=10)box.append(h("div",{class:"hint",text:"An "+c("meds")+" der letzten 30 Tage Schmerzmittel. Ab etwa 10 Tagen im Monat lohnt es sich, das mit deiner Ärztin zu besprechen."}));
    const sh=h("button",{class:"gbtn primary",type:"button",text:"Für Ärztin oder Therapie teilen"});sh.addEventListener("click",()=>shareText(bodyReport(),"Körper-Tagebuch"));box.append(h("div",{class:"gact"},[sh]));
    box.append(h("div",{class:"small muted",text:"Das Tagebuch stellt keine Diagnose. Es hilft dir, Muster zu sehen und beim Termin genauer zu erzählen."}));
  }
  // Einkauf
  // Datenmodell je Eintrag in "shop": {t: Name, done, at, doneAt?, q?: Menge, g?: Gruppe, u?: Rezept-Link}. Ohne g = "Allgemein".
  const sKey=x=>x.trim().toLowerCase().replace(/\s+/g," ");
  const GEN="Allgemein",BASE_GROUPS=[GEN,"Drogerie","Haushalt"];
  const gOf=i=>(i.g&&String(i.g).trim())||GEN;
  const iKey=(g,t)=>sKey(g)+"|"+sKey(t);
  let sGroup=GEN,sExtraGroups=[];
  const itemLabel=i=>(i.q?i.q+" ":"")+i.t;
  async function shopAddItems(list,group,url,countHist){
    // list: [{t,q?}] , legt fehlende Einträge in einer Gruppe an
    if(!list.length||!needDb())return false;
    const g=group&&group!==GEN?String(group).trim().slice(0,60):null;
    const open=new Set(shop.filter(i=>!i.done).map(i=>iKey(gOf(i),i.t))),added=[];
    try{for(const it of list){const t=String(it.t||"").trim().slice(0,80);if(!t)continue;const k=iKey(g||GEN,t);if(open.has(k))continue;open.add(k);
      const old=shop.find(i=>i.done&&iKey(gOf(i),i.t)===k);const q=it.q?String(it.q).trim().slice(0,30):"";
      if(old){const upd={done:false,doneAt:null,at:new Date().toISOString()};if(q)upd.q=q;await db.collection("shop").doc(old._id).update(upd);added.push({id:old._id,reopen:true,t:old.t});}
      else{const doc={t,done:false,at:new Date().toISOString()};if(q)doc.q=q;if(g)doc.g=g;if(g&&url)doc.u=url;const ref=await db.collection("shop").add(doc);added.push({id:ref.id,t});}}}
    catch(_){toast("Nicht gespeichert.",false);return false;}
    if(!added.length){toast("Steht schon drauf.",false);return true;}
    if(countHist){const hist=Object.assign({},shopHist);added.forEach(a=>{const k=sKey(a.t),o=hist[k]||{t:a.t,n:0};hist[k]={t:o.t,n:o.n+1,last:TODAY};});try{await db.doc("meta/shop").set({items:hist});}catch(_){}}
    pushUndo(added.length===1?"Dazu: "+added[0].t:added.length+" Sachen dazu",async()=>{for(const a of added){if(a.reopen)await db.collection("shop").doc(a.id).update({done:true});else await db.collection("shop").doc(a.id).delete();}});return true;
  }
  function shopAdd(raw){
    const parts=String(raw||"").split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean).slice(0,30);
    return shopAddItems(parts.map(t=>({t})),sGroup,null,true);
  }
  async function shopToggle(i){if(!needDb())return;try{await db.collection("shop").doc(i._id).update({done:!i.done,doneAt:i.done?null:new Date().toISOString()});}catch(_){toast("Nicht gespeichert.",false);}}
  async function shopRemove(items,label){if(!items.length||!needDb())return;const saved=items.map(i=>{const x=Object.assign({},i);delete x._id;return [i._id,x];});
    try{for(const i of items)await db.collection("shop").doc(i._id).delete();pushUndo(label,async()=>{for(const [id,x] of saved)await db.collection("shop").doc(id).set(x);});}catch(_){toast("Löschen ging nicht.",false);}}
  function shopClearDone(){const done=shop.filter(i=>i.done);shopRemove(done,done.length+" erledigte gelöscht");}
  function shopRow(i,showGroup){const kids=[h("span",{class:"bx",text:i.done?"✓":""}),h("span",{style:"flex:1;min-width:0;overflow-wrap:anywhere"},[i.q?h("span",{class:"sq",text:i.q+" "}):null,i.t,showGroup&&i.g?h("span",{class:"sg",text:" · "+i.g}):null])];
    const b=h("button",{class:"sitem"+(i.done?" done":""),type:"button","aria-pressed":String(!!i.done)},kids);b.addEventListener("click",()=>shopToggle(i));
    if(i.done)return b;const x=h("button",{class:"x",type:"button","aria-label":"Löschen: "+i.t,text:"✕"});x.addEventListener("click",()=>shopRemove([i],"Gelöscht: "+i.t));return h("div",{class:"srow"},[b,x]);}
  function groupText(name,items){const u=items.find(i=>i.u);return name+"\n"+items.map(i=>"• "+itemLabel(i)).join("\n")+(u?"\nRezept: "+u.u:"");}
  function openGroups(){const open=shop.filter(i=>!i.done).sort((a,b)=>a.at<b.at?-1:1),m=new Map();
    open.forEach(i=>{const g=gOf(i);if(!m.has(g))m.set(g,[]);m.get(g).push(i);});
    const names=[...m.keys()].sort((a,b)=>a===GEN?-1:b===GEN?1:(m.get(a)[0].at<m.get(b)[0].at?-1:1));return {open,m,names};}
  function renderGroupPick(names){
    const all=[...new Set(BASE_GROUPS.concat(names,sExtraGroups))];if(!all.includes(sGroup))sGroup=GEN;
    const c=$("sGroups");c.innerHTML="";c.append(h("span",{class:"small muted",style:"align-self:center",text:"Für:"}));
    all.forEach(g=>{const b=h("button",{class:"fchip",type:"button","aria-pressed":String(g===sGroup),text:g});b.addEventListener("click",()=>{sGroup=g;renderEinkauf();});c.append(b);});
    const add=h("button",{class:"fchip",type:"button",text:"+ Gruppe"});add.addEventListener("click",()=>{if(add.dataset.on)return;add.dataset.on="1";
      const inp=h("input",{type:"text",maxlength:"40",placeholder:"Name, z. B. Grillabend","aria-label":"Neue Gruppe",style:"width:auto;flex:1;min-width:140px;padding:6px 12px;border-radius:999px;font-size:13px"});
      const ok=()=>{const v=inp.value.trim();if(v){if(!sExtraGroups.includes(v))sExtraGroups.push(v);sGroup=v;}renderEinkauf();$("sText").focus();};
      inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();ok();}if(e.key==="Escape")renderEinkauf();});inp.addEventListener("blur",ok);add.replaceWith(inp);inp.focus();});c.append(add);
  }
  function renderEinkauf(){
    const {open,m,names}=openGroups(),done=shop.filter(i=>i.done).sort((a,b)=>(a.doneAt||"")<(b.doneAt||"")?1:-1);
    renderGroupPick(names);
    const lo=$("sOpen");lo.innerHTML="";if(!open.length)lo.append(h("div",{class:"empty",text:done.length?"Alles im Wagen.":"Die Liste ist leer. Schreib oben, was fehlt, oder füg ein Rezept ein."}));
    const many=names.length>1||(names.length===1&&names[0]!==GEN);
    names.forEach(g=>{const items=m.get(g);
      if(many){const u=(items.find(i=>i.u)||{}).u,acts=h("span",{class:"gacts"});
        if(u&&/^https?:\/\//i.test(u))acts.append(h("a",{class:"gbtn",href:u,target:"_blank",rel:"noopener noreferrer",text:"Rezept"}));
        const sh=h("button",{class:"gbtn",type:"button",text:"Teilen"});sh.addEventListener("click",()=>shareText(groupText(g,items),g));acts.append(sh);
        if(g!==GEN){const rm=h("button",{class:"gbtn",type:"button","aria-label":"Gruppe "+g+" löschen",text:"✕"});rm.addEventListener("click",()=>shopRemove(items,"Gruppe gelöscht: "+g));acts.append(rm);}
        lo.append(h("div",{class:"shead"},[h("div",{class:"tgroup",style:"margin:0;min-width:0;overflow-wrap:anywhere",text:g+" ("+items.length+")"}),acts]));}
      items.forEach(i=>lo.append(shopRow(i,false)));});
    const openK=new Set(open.map(i=>sKey(i.t))),sug=Object.keys(shopHist).filter(k=>!openK.has(k)).sort((a,b)=>(shopHist[b].n-shopHist[a].n)||((shopHist[b].last||"")>(shopHist[a].last||"")?1:-1)).slice(0,10);
    const sg=$("sSuggest");sg.innerHTML="";if(sug.length){sg.append(h("div",{class:"tgroup",style:"margin:0 2px 8px",text:"Schnell dazu"}));const c=h("div",{class:"chips"});sug.forEach(k=>{const b=h("button",{class:"fchip",type:"button",text:"+ "+shopHist[k].t});b.addEventListener("click",()=>shopAdd(shopHist[k].t));c.append(b);});sg.append(c);}
    const bx=$("sDoneBox");bx.innerHTML="";if(done.length){const clr=h("button",{class:"gbtn",type:"button",text:"Erledigte löschen"});clr.addEventListener("click",shopClearDone);bx.append(h("div",{class:"lg-head",style:"margin:10px 0 8px"},[h("div",{class:"tgroup",style:"margin:0",text:"Im Wagen ("+done.length+")"}),clr]));const l=h("div",{class:"shoplist"});done.slice(0,40).forEach(i=>l.append(shopRow(i,true)));bx.append(l);}
    $("tab-einkauf").textContent=open.length?"Einkauf ("+open.length+")":"Einkauf";
  }
  async function shopSubmit(){const inp=$("sText");if(await shopAdd(inp.value))inp.value="";inp.focus();}
  $("sAdd").addEventListener("click",shopSubmit);
  $("sText").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();shopSubmit();}});
  $("sShare").addEventListener("click",()=>{const {open,m,names}=openGroups();if(!open.length){toast("Die Liste ist leer.",false);return;}
    const txt=names.length===1&&names[0]===GEN?"Einkaufsliste\n"+open.map(i=>"• "+itemLabel(i)).join("\n"):"Einkaufsliste\n\n"+names.map(g=>groupText(g,m.get(g))).join("\n\n");shareText(txt,"Einkaufsliste");});

  // Rezept-Import: Link (über r.jina.ai, weil die App keinen Server hat), Screenshot (Texterkennung auf dem Gerät) oder eingefügter Text
  const UNITS="kg|g|gr|mg|ml|cl|dl|l|liter|el|tl|msp|prise[n]?|bund|bd|dose[n]?|pck|pkg|packung(?:en)?|päckchen|becher|glas|gläser|tasse[n]?|stück|stk|scheibe[n]?|zehe[n]?|handvoll|zweig[e]?|blatt|blätter|knolle[n]?|kopf|köpfe|stange[n]?|stiel[e]?|würfel|tüte[n]?|beutel|flasche[n]?|schuss|spritzer|cup[s]?|tbsp|tsp|oz|lb";
  const AMT_RE=new RegExp("^((?:ca\\.?\\s*|etwa\\s*)?[\\d½¼¾⅓⅔⅛][\\d½¼¾⅓⅔⅛.,/\\s–-]*)\\s*(?:("+UNITS+")\\.?(?=\\s|$))?\\s*(.*)$","i");
  const PANTRY=/^(salz|pfeffer|salz und pfeffer|salz & pfeffer|wasser|öl|olivenöl|rapsöl|sonnenblumenöl|pflanzenöl|neutrales öl|zucker)\b/i;
  const STOP_HEAD=/^(zubereitung|anleitung|so geht'?s|so wird'?s gemacht|instructions|method|schritt|nährwerte|notizen|tipps?|kommentare)\b/i;
  function decodeEnt(s){const ta=document.createElement("textarea");ta.innerHTML=String(s);return ta.value;}
  function cleanLine(s){return decodeEnt(String(s||"")).replace(/!\[[^\]]*\]\([^)]*\)/g,"").replace(/\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/<[^>]+>/g," ")
    .replace(/^\s*(?:[*+•·▢☐□◻○●-]|\d+\.(?=\s)|\[[ xX]?\])\s*/,"").replace(/^\s*(?:▢|☐|□)\s*/,"").replace(/[*_`#]+/g,"").replace(/\s+/g," ").trim();}
  function splitAmt(line){const m=line.match(AMT_RE);if(!m||!m[3])return {q:"",t:line};let q=m[1].trim().replace(/\s*[–-]\s*/g,"–");if(m[2])q+=" "+m[2];return {q:q.trim(),t:m[3].replace(/^(?:x\s+)/i,"").trim()||line};}
  function looksIngredient(s){return s.length>1&&s.length<=70&&/[a-zäöüß]/i.test(s)&&!/[.!?]$/.test(s.replace(/\b(ca|bzw|evtl|ggf|z\.b|stk|pck|el|tl)\.$/i,""))&&!/^(zutaten|für (das|den|die)\b.*:?$|portionen?\b)/i.test(s);}
  function toItems(lines){const out=[],seen=new Set();lines.forEach(l=>{const c=cleanLine(l);if(!looksIngredient(c))return;const it=splitAmt(c);const k=sKey(it.q+" "+it.t);if(seen.has(k))return;seen.add(k);it.on=!PANTRY.test(it.t);out.push(it);});return out.slice(0,60);}
  function fromText(txt){
    const lines=String(txt||"").split(/\r?\n/);let best=null;
    lines.forEach((l,idx)=>{if(!/^\W*(?:#+\s*)?\**\s*zutaten\b/i.test(l.trim()))return;const got=[];
      for(let j=idx+1;j<lines.length&&j<idx+90;j++){const raw=lines[j].trim();if(!raw)continue;const c=cleanLine(raw);if(STOP_HEAD.test(c)&&(/^#|^\*\*/.test(raw)||c.length<40))break;
        const isList=/^\s*(?:[*+•·▢☐□-]|\d+\.\s|\[[ xX]?\])/.test(raw);if(/^#/.test(raw)||(!isList&&/:$/.test(c)))continue;got.push(raw);}
      const its=toItems(got);if(its.length>=2&&(!best||its.length>best.length))best=its;});
    if(best)return best;
    const amt=lines.filter(l=>AMT_RE.test(cleanLine(l)));const its=toItems(amt.length>=2?amt:lines);return its;
  }
  function fromLdJson(html){
    const blocks=[...String(html).matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
    const walk=o=>{if(!o||typeof o!=="object")return null;if(Array.isArray(o)){for(const x of o){const r=walk(x);if(r)return r;}return null;}
      if([].concat(o["@type"]).some(t=>String(t).toLowerCase()==="recipe")&&Array.isArray(o.recipeIngredient))return o;return walk(o["@graph"]);};
    for(const b of blocks){try{const r=walk(JSON.parse(b.trim()));if(r){const its=toItems(r.recipeIngredient);if(its.length)return {name:cleanLine(r.name||""),items:its};}}catch(_){}}
    return null;
  }
  async function fetchWithTimeout(url,opts,ms){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);try{const r=await fetch(url,Object.assign({signal:c.signal,referrerPolicy:"no-referrer",credentials:"omit"},opts||{}));if(!r.ok)throw new Error("http "+r.status);return await r.text();}finally{clearTimeout(t);}}
  async function importFromUrl(url){
    const proxy="https://r.jina.ai/"+url;
    try{const html=await fetchWithTimeout(proxy,{headers:{"X-Return-Format":"html"}},15000);const r=fromLdJson(html);if(r)return r;}catch(_){}
    const md=await fetchWithTimeout(proxy,null,20000);const tm=md.match(/^Title:\s*(.+)$/m);
    const body=md.split(/^Markdown Content:\s*$/m).pop();return {name:tm?cleanLine(tm[1]).replace(/\s+[|–-]\s+[^|–-]*$/,""):"",items:fromText(body)};
  }
  let tessLoad=null;
  function loadTesseract(){if(window.Tesseract)return Promise.resolve();if(tessLoad)return tessLoad;
    tessLoad=new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/tesseract.min.js";
      s.integrity="sha384-2BQ3U3OdKOb0Uczxqr41I9UvZkzr4V9Hv8uSzMMZAlmhsFClvdZX5wi5fDCzG+tM";s.crossOrigin="anonymous";s.onload=()=>res();s.onerror=()=>{tessLoad=null;rej(new Error("load"));};document.head.append(s);});return tessLoad;}
  async function ocrImage(file,onProg){
    await loadTesseract();
    const w=await window.Tesseract.createWorker("deu",1,{workerPath:"https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/worker.min.js",
      logger:m=>{if(m&&m.status==="recognizing text"&&typeof m.progress==="number")onProg(Math.round(m.progress*100));}});
    try{const r=await w.recognize(file);return (r&&r.data&&r.data.text)||"";}finally{try{await w.terminate();}catch(_){}}
  }
  let rcpUrl=null;
  const rStatus=(t,err)=>{const s=$("rStatus");s.textContent=t||"";s.hidden=!t;s.classList.toggle("err",!!err);};
  function rcpOpen(on){$("rBox").hidden=!on;$("rToggle").setAttribute("aria-expanded",String(on));if(!on){rcpReset();}}
  function rcpReset(){rcpUrl=null;$("rUrl").value="";$("rTxt").value="";$("rFile").value="";$("rPrev").hidden=true;$("rItems").innerHTML="";$("rInput").hidden=false;rStatus("");}
  function rcpRow(it){const cb=h("input",{type:"checkbox","aria-label":"Mitnehmen"});cb.checked=it.on!==false;
    const t=h("input",{type:"text",maxlength:"110",value:(it.q?it.q+" ":"")+it.t,"aria-label":"Zutat"});
    const row=h("div",{class:"rrow"+(cb.checked?"":" off")},[cb,t]);cb.addEventListener("change",()=>row.classList.toggle("off",!cb.checked));
    if(it.on===false&&PANTRY.test(it.t))row.append(h("span",{class:"small muted",style:"white-space:nowrap",text:"meist da"}));return row;}
  function rcpShow(name,items){
    if(!items.length){rStatus("Ich habe keine Zutaten gefunden. Kopier die Zutatenliste und füg sie unten als Text ein.",true);return;}
    $("rName").value=name||"";const box=$("rItems");box.innerHTML="";items.forEach(it=>box.append(rcpRow(it)));
    $("rInput").hidden=true;$("rPrev").hidden=false;rStatus("");rcpCount();
    if(!name)$("rName").focus();}
  function rcpCount(){const n=[...document.querySelectorAll("#rItems .rrow")].filter(r=>r.querySelector("input[type=checkbox]").checked&&r.querySelector("input[type=text]").value.trim()).length;$("rSave").textContent=n===1?"1 Sache auf die Liste":n+" Sachen auf die Liste";$("rSave").disabled=!n;}
  $("rItems").addEventListener("input",rcpCount);$("rItems").addEventListener("change",rcpCount);
  $("rToggle").addEventListener("click",()=>rcpOpen($("rBox").hidden));
  $("rCancel").addEventListener("click",()=>rcpOpen(false));
  $("rBack").addEventListener("click",()=>{$("rPrev").hidden=true;$("rInput").hidden=false;});
  $("rMore").addEventListener("click",()=>{const r=rcpRow({q:"",t:"",on:true});$("rItems").append(r);r.querySelector("input[type=text]").focus();rcpCount();});
  async function rcpFromUrl(){
    let u=$("rUrl").value.trim();const m=u.match(/https?:\/\/[^\s"'<>]+/i);if(!m){rStatus("Das ist kein Link. Er fängt mit https:// an.",true);return;}u=m[0];$("rUrl").value=u;
    if(!navigator.onLine){rStatus("Du bist offline. Rezepte laden geht nur mit Internet.",true);return;}
    rStatus("Rezept wird geladen …");$("rLoad").disabled=true;
    try{const r=await importFromUrl(u);rcpUrl=u;rcpShow(r.name,r.items);}
    catch(_){rStatus("Die Seite ließ sich nicht laden. Probier es gleich nochmal oder kopier die Zutaten und füg sie unten als Text ein.",true);}
    finally{$("rLoad").disabled=false;}
  }
  $("rLoad").addEventListener("click",rcpFromUrl);
  $("rUrl").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();rcpFromUrl();}});
  $("rPaste").addEventListener("click",async()=>{let t="";try{t=await navigator.clipboard.readText();}catch(_){rStatus("Einfügen ging nicht. Tipp lange ins Feld und wähl „Einfügen“.",true);return;}
    t=(t||"").trim();if(!t){rStatus("Die Zwischenablage ist leer.",true);return;}
    if(/^https?:\/\/\S+$/i.test(t)){$("rUrl").value=t;rcpFromUrl();}else{$("rTxt").value=t;rcpFromText();}});
  function rcpFromText(){const t=$("rTxt").value.trim();if(!t){rStatus("Füg erst die Zutaten ein.",true);return;}rcpUrl=null;rcpShow("",fromText(t));}
  $("rTxtGo").addEventListener("click",rcpFromText);
  $("rFile").addEventListener("change",async()=>{const f=$("rFile").files&&$("rFile").files[0];if(!f)return;
    if(!navigator.onLine&&!window.Tesseract){rStatus("Für die erste Texterkennung brauchst du Internet.",true);return;}
    rStatus("Screenshot wird gelesen …");
    try{const txt=await ocrImage(f,p=>rStatus("Screenshot wird gelesen … "+p+" %"));rcpUrl=null;rcpShow("",fromText(txt));}
    catch(_){rStatus("Den Screenshot konnte ich nicht lesen. Probier einen schärferen Ausschnitt oder füg die Zutaten als Text ein.",true);}
    finally{$("rFile").value="";}});
  $("rSave").addEventListener("click",async()=>{
    const name=$("rName").value.trim().slice(0,60)||"Rezept";
    const list=[...document.querySelectorAll("#rItems .rrow")].filter(r=>r.querySelector("input[type=checkbox]").checked).map(r=>splitAmt(r.querySelector("input[type=text]").value.trim().replace(/\s+/g," "))).filter(x=>x.t);
    if(!list.length)return;
    const grp=name.toLowerCase()===GEN.toLowerCase()?GEN:name;
    if(await shopAddItems(list,grp,rcpUrl,false)){rcpOpen(false);}
  });
  // Sicherungs-Erinnerung
  const META_KEY="melina-dashboard-meta";
  const getMeta=()=>{try{return JSON.parse(localStorage.getItem(META_KEY)||"{}")||{};}catch(_){return {};}};
  const setMeta=p=>{try{localStorage.setItem(META_KEY,JSON.stringify(Object.assign(getMeta(),p)));}catch(_){}};
  function renderBackupNag(){
    const el=$("bkNag");if(!el)return;const m=getMeta(),n=Object.keys(mine).length+timeline.length;
    const days=m.lastBackup?Math.floor((Date.now()-m.lastBackup)/864e5):null;
    $("bkLast").textContent=m.lastBackup?"Zuletzt gesichert am "+new Date(m.lastBackup).toLocaleDateString("de-DE"):"Noch nie gesichert";
    if(n<5||m.snooze===TODAY||(days!=null&&days<14)){el.hidden=true;return;}
    $("bkNagTxt").textContent=days==null?"Noch keine Sicherung gemacht.":"Letzte Sicherung vor "+days+" Tagen.";el.hidden=false;
  }
  $("bkNagLater").addEventListener("click",()=>{setMeta({snooze:TODAY});renderBackupNag();});
  $("bkNagGo").addEventListener("click",()=>$("bkExport").click());
  function renderAll(){renderHeute();renderGedanken();renderWoche();renderJahr();drawChart();renderEinkauf();}
  renderAll();
  let rz;window.addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{drawBars();drawChart();},150);});


  // ---------- Neues Ziel ----------
  (function buildGoalForm(){
    const f=$("gForm");
    const title=h("input",{type:"text",maxlength:"80",placeholder:"z. B. 3× pro Woche Sport, 2 Bücher im Monat, Umzug bis März"});
    const type=h("select",{});[["weekly","Gewohnheit (pro Woche)"],["monthly","Monatsziel (Anzahl)"],["deadline","Projekt mit Frist"]].forEach(([v,l])=>type.append(h("option",{value:v,text:l})));
    const wTarget=h("select",{});for(let i=1;i<=7;i++)wTarget.append(h("option",{value:String(i),text:i+"× pro Woche"}));wTarget.value="3";
    const wLink=h("select",{});[["own","Eigene Gewohnheit (neue Kachel in Heute)"],["gym","Zählt Sport aus Heute"],["read","Zählt Lesen aus Heute"]].forEach(([v,l])=>wLink.append(h("option",{value:v,text:l})));
    const mTarget=h("input",{type:"number",min:"1",max:"99",value:"4"});
    const mArea=h("select",{});Object.keys(AREAS).forEach(k=>mArea.append(h("option",{value:k,text:AREAS[k].l})));mArea.value="kreativ";
    const dDate=h("input",{type:"date"});
    const dSteps=h("textarea",{rows:"4",maxlength:"1200",placeholder:"Ein Schritt pro Zeile"});
    const F=(l,el)=>h("label",{class:"field"},[l,el]);
    const rowW=h("div",{class:"row"},[F("Wie oft?",wTarget),F("Was zählt?",wLink)]);
    const rowM=h("div",{class:"row"},[F("Wie viele pro Monat?",mTarget),F("Bereich",mArea)]);
    const rowD=h("div",{class:"gform"},[h("div",{class:"row"},[F("Bis wann?",dDate)]),F("Schritte",dSteps)]);
    const add=h("button",{class:"btn gold",type:"button",text:"Ziel anlegen"});
    const sync=()=>{rowW.hidden=type.value!=="weekly";rowM.hidden=type.value!=="monthly";rowD.hidden=type.value!=="deadline";};
    type.addEventListener("change",sync);sync();
    add.addEventListener("click",()=>{
      const tt=title.value.trim();if(!tt){title.focus();toast("Gib dem Ziel einen Namen.",false);return;}
      const id=Date.now().toString(36);let g;
      if(type.value==="weekly"){const ln=wLink.value;g={id,type:"weekly",title:tt,short:tt,target:+wTarget.value,flag:ln==="own"?"h-"+id:ln,action:ln==="gym"?"Heute Sport gemacht":ln==="read"?"Heute gelesen":"Heute erledigt"};if(ln==="gym")g.area="gym";}
      else if(type.value==="monthly"){const n=Math.max(1,Math.min(99,parseInt(mTarget.value,10)||1));g={id,type:"monthly",title:tt,short:tt,target:n,area:mArea.value,action:"Eintragen",defaultTitle:tt,placeholder:"Was genau?"};}
      else{if(!dDate.value){dDate.focus();toast("Wähl eine Frist.",false);return;}const st=dSteps.value.split("\n").map(x=>x.trim()).filter(Boolean).slice(0,20);g={id,type:"deadline",title:tt,short:tt,deadline:dDate.value,steps:(st.length?st:[tt]).map(x=>({t:x,done:false}))};}
      writeGoals((goals&&goals.items||[]).concat(g),"Ziel angelegt: "+tt);title.value="";dSteps.value="";
    });
    f.append(F("Name",title),F("Art",type),rowW,rowM,rowD,h("div",{class:"row"},[add]));
  })();


  function validBackup(d){const isO=x=>x&&typeof x==="object"&&!Array.isArray(x);if(!isO(d))return false;return Object.keys(d).every(c=>isO(d[c])&&Object.values(d[c]).every(isO));}
  // ---------- Lokaler Speicher ----------
  const KEY="melina-dashboard-v1";
  function makeStore(){
    let data={};let ok=true;
    let raw=null;try{raw=localStorage.getItem(KEY);data=JSON.parse(raw||"{}")||{};if(typeof data!=="object"||Array.isArray(data))throw 0;}catch(_){ok=false;data={};try{if(raw)localStorage.setItem(KEY+"-corrupt-"+Date.now(),raw);}catch(__){}}
    if(!data.goals)data.goals={main:{items:[]}};if(!data.goals.main)data.goals.main={items:[]};
    const subs=[];
    const persist=()=>{if(!ok)throw Object.assign(new Error("blocked"),{code:"blocked"});try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){throw Object.assign(new Error("save"),{code:e&&e.name==="QuotaExceededError"?"quota_exceeded":"save_failed"});}};
    const emit=coll=>subs.forEach(s=>{if(!coll||s.coll===coll)queueMicrotask(s.fire);});
    const col=c=>data[c]||(data[c]={});
    function docRef(c,id){return{id,
      async set(v){col(c)[id]=clone(v);persist();emit(c);},
      async update(p){col(c)[id]=Object.assign({},col(c)[id]||{},clone(p));persist();emit(c);},
      async delete(){delete col(c)[id];persist();emit(c);},
      onSnapshot(cb){const s={coll:c,fire:()=>{const v=col(c)[id];cb({exists:v!=null,data:()=>clone(v)});}};subs.push(s);s.fire();return()=>subs.splice(subs.indexOf(s),1);}
    };}
    return{
      get ok(){return ok;},
      collection(c){return{
        doc:id=>docRef(c,id),
        async add(v){const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);await docRef(c,id).set(v);return docRef(c,id);},
        onSnapshot(cb){const s={coll:c,fire:()=>{const o=col(c);cb({docs:Object.keys(o).map(id=>({id,data:()=>clone(o[id])}))});}};subs.push(s);s.fire();return()=>subs.splice(subs.indexOf(s),1);}
      };},
      doc(path){const i=path.lastIndexOf("/");return docRef(path.slice(0,i),path.slice(i+1));},
      dump(){return clone(data);},
      load(obj){data=obj;if(!data.goals)data.goals={main:{items:[]}};persist();emit(null);},
      reload(){try{data=JSON.parse(localStorage.getItem(KEY)||"{}")||{};if(!data.goals)data.goals={main:{items:[]}};}catch(_){}emit(null);}
    };
  }
  (function(){
    db=makeStore();uid="me";canWrite=true;
    if(!db.ok){canWrite=false;$("connNote").textContent="Gespeicherte Daten waren beschädigt. Zum Schutz ist Speichern gesperrt. Lade eine Sicherung über „Sicherung laden“.";}
    try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist().catch(()=>{});}catch(_){}
    if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("sw.js").catch(()=>{});
    try{localStorage.setItem(KEY+"-t","1");localStorage.removeItem(KEY+"-t");}catch(_){canWrite=false;$("connNote").textContent="Dieser Browser erlaubt kein Speichern (privater Modus?). Öffne die Datei in einem normalen Fenster.";}
    db.collection("timeline").onSnapshot(x=>{timeline=x.docs.map(d=>Object.assign({_id:d.id},d.data())).filter(e=>typeof e.date==="string");renderAll();});
    db.doc("goals/main").onSnapshot(x=>{goals=x.exists?x.data():{items:[]};renderGoals();renderHeute();});
    db.doc("settings/main").onSnapshot(x=>{settings=x.exists?x.data():{symptoms:[]};renderHeute();renderWoche();});
    db.collection("shop").onSnapshot(x=>{shop=x.docs.map(d=>Object.assign({_id:d.id},d.data())).filter(i=>typeof i.t==="string");renderEinkauf();});
    db.doc("meta/shop").onSnapshot(x=>{shopHist=(x.exists&&x.data().items)||{};renderEinkauf();});
    db.collection("data/users/"+uid).onSnapshot(x=>{mine={};x.docs.forEach(d=>mine[d.id]=d.data());renderHeute();renderGedanken();renderWoche();});
    window.addEventListener("storage",e=>{if(e.key===KEY)db.reload();});
    $("bkExport").addEventListener("click",async()=>{
      const blob=new Blob([JSON.stringify({app:"melina-dashboard",v:1,at:new Date().toISOString(),data:db.dump()},null,1)],{type:"application/json"});
      const fname="melina-dashboard-"+TODAY+".json";
      try{const file=new File([blob],fname,{type:"application/json"});if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:"Melina Dashboard Sicherung"});setMeta({lastBackup:Date.now(),snooze:null});renderBackupNag();toast("Sicherung geteilt",false);return;}}catch(e){if(e&&e.name==="AbortError")return;}
      const a=h("a",{href:URL.createObjectURL(blob),download:fname});document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);setMeta({lastBackup:Date.now(),snooze:null});renderBackupNag();toast("Sicherung heruntergeladen",false);
    });
    $("bkImport").addEventListener("click",()=>$("bkFile").click());
    $("bkFile").addEventListener("change",async e=>{
      const f=e.target.files&&e.target.files[0];e.target.value="";if(!f)return;
      try{const j=JSON.parse(await f.text());if(!j||j.app!=="melina-dashboard"||!validBackup(j.data))throw 0;
        if(!confirm("Sicherung vom "+new Date(j.at).toLocaleDateString("de-DE")+" laden? Alles, was gerade hier steht, wird ersetzt."))return;
        try{localStorage.setItem(KEY+"-vor-import",JSON.stringify(db.dump()));}catch(_){}
        db.load(j.data);undoStack.length=0;updUndo();toast("Sicherung geladen. Der vorherige Stand ist intern gemerkt.",false);}
      catch(_){toast("Das ist keine gültige Sicherung.",false);}
    });
    // Datum frisch halten (App über Mitternacht offen)
    const fresh=()=>{if(ymd(new Date())!==TODAY&&!/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||""))location.reload();};
    document.addEventListener("visibilitychange",()=>{if(document.hidden){const a=document.activeElement;if(a&&/INPUT|TEXTAREA/.test(a.tagName))a.blur();}else fresh();});
    window.addEventListener("pagehide",()=>{const a=document.activeElement;if(a&&/INPUT|TEXTAREA/.test(a.tagName))a.blur();});
    window.addEventListener("pageshow",fresh);setInterval(()=>{if(!document.hidden)fresh();},60000);
  })();
})();
