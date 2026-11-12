import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Search, Building2, Trees, ChevronRight, MessageCircle, Settings,
  CheckCircle2, Bell, Heart, ArrowLeft, Share2, User, Check,
  SlidersHorizontal, MapPin, Send, Star, Plus, LogOut, Shield,
  HelpCircle, ChevronDown, Globe, Home, Car, Tent, ClipboardList,
  Eye, Pencil, X, FileText, Minus,
} from "lucide-react";

// ── font stacks ───────────────────────────────────────────────────
const TF = "'Google Sans Flex','Google Sans',system-ui,sans-serif";

// ── theme palettes ────────────────────────────────────────────────
const NORMAL_C = {
  ink:"#1F1F1E", ink2:"#2B2B2A", sub:"#5C5C66", bg:"#EFEEF2",
  cardSolid:"#FFFFFF",
  cardBg:"linear-gradient(to bottom,rgba(255,255,255,0.80) 55%,rgba(238,235,251,0.80) 100%)",
  cardShadow:"inset 0 0 0 0.6px rgba(15,67,136,0.32),0 1px 3px rgba(0,0,0,0.08)",
  muted:"#ECEBF0", border:"#DDDCE3", borderW:"1px",
  navy:"#0F4388", peach:"#F9E8DF", teal:"#068E8A",
  navyBg:"#E8EEF8",
  ph:"#6B6B75",
  accent:"#0F4388", accentBg:"#E8EEF8",
} as const;

const HC_C = {
  ink:"#111111", ink2:"#1A1A1A", sub:"#3A3A3A", bg:"#FFFFFF",
  cardSolid:"#FFFFFF",
  cardBg:"#FFFFFF",
  cardShadow:"inset 0 0 0 1.5px #6B6B6B,0 1px 3px rgba(0,0,0,0.08)",
  muted:"#EBEBEB", border:"#6B6B6B", borderW:"1.5px",
  navy:"#1A1A1A", peach:"#EBEBEB", teal:"#1A1A1A",
  navyBg:"#E8E8E8",
  ph:"#555555",
  accent:"#1A1A1A", accentBg:"#E8E8E8",
} as const;

type ColorSet = typeof NORMAL_C;
const TEXT_SCALE = {small:0.9,default:1,large:1.15,xl:1.3};

// ── data ──────────────────────────────────────────────────────────
const u=(id:string,w=600,h=360)=>`https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
const pA=u("1585492197563-572494c5ff0f"),pB=u("1530398231547-70832467b336"),
      pC=u("1564078516393-cf04bd966897"),pD=u("1724582586529-62622e50c0b3"),
      pE=u("1688646953306-5ec93eab8c06"),pF=u("1724582586458-a51791349977"),
      i1=u("1564078516393-cf04bd966897",400,280),i2=u("1724582586529-62622e50c0b3",400,280),
      i3=u("1688646953306-5ec93eab8c06",400,280),i4=u("1724582586458-a51791349977",400,280);

const ALL_LISTINGS=[
  {id:1,projectId:[1],photo:pA,photos:[pA,i1,i2],price:"648€",size:"54 m²",rooms:"2 rooms",title:"Bright 2-room apartment in Prenzlauer Berg",address:"Danziger Str. 2/3, 10435 Berlin",description:"Bright, south-facing 2-room apartment on the 3rd floor of a well-maintained Altbau building. High ceilings, original wooden floors and large windows fill the space with natural light.",features:["Private balcony","New kitchen","Hardwood floors","Altbau","Pets allowed"],deposit:"1.944€",available:"1 Aug 2026",floor:"3rd of 5"},
  {id:2,projectId:[1],photo:pB,photos:[pB,i3,i4],price:"820€",size:"68 m²",rooms:"3 rooms",title:"Spacious flat with balcony near Mauerpark",address:"Eberswalder Str. 15, 10437 Berlin",description:"Generous 3-room flat with a south-west facing balcony on a quiet side street, just 5 minutes walk from Mauerpark. Renovated bathroom, fitted kitchen included.",features:["Balcony","Fitted kitchen","Central heating","Elevator","Cellar storage"],deposit:"2.460€",available:"15 Jul 2026",floor:"2nd of 4"},
  {id:3,projectId:[1],photo:pC,photos:[pC,i2,i3],price:"590€",size:"41 m²",rooms:"1 room",title:"Cosy studio in the heart of Mitte",address:"Torstr. 78, 10119 Berlin",description:"Compact and efficiently designed studio apartment in the vibrant Mitte district. Fully furnished option available. Walk to U-Bahn Rosa-Luxemburg-Platz in 3 minutes.",features:["Furnished option","U-Bahn 3 min","New bathroom","Intercom","Bike storage"],deposit:"1.770€",available:"1 Sep 2026",floor:"1st of 6"},
  {id:4,projectId:[2],photo:pD,photos:[pD,i1,i3],price:"710€",size:"62 m²",rooms:"3 rooms",title:"Charming Altbau flat in Friedrichshain",address:"Revaler Str. 31, 10245 Berlin",description:"Beautiful Altbau apartment with original stucco ceilings and herringbone parquet floors. Large bright rooms near RAW-Gelände.",features:["Stucco ceilings","Parquet floors","High ceilings","Bike storage","Quiet courtyard"],deposit:"2.130€",available:"1 Aug 2026",floor:"2nd of 5"},
  {id:5,projectId:[2],photo:pE,photos:[pE,i4,i1],price:"760€",size:"55 m²",rooms:"2 rooms",title:"Loft-style flat in Kreuzberg",address:"Oranienstr. 193, 10999 Berlin",description:"Open-plan loft-style apartment in the heart of Kreuzberg. Industrial details with modern renovation. Exposed brick walls and high windows.",features:["Open plan","Exposed brick","Soundproof windows","Intercom","Courtyard access"],deposit:"2.280€",available:"15 Jun 2026",floor:"3rd of 4"},
  {id:6,projectId:[2],photo:pF,photos:[pF,i2,i4],price:"890€",size:"75 m²",rooms:"3 rooms",title:"Bright top-floor flat in Schöneberg",address:"Akazienstr. 22, 10823 Berlin",description:"Light-filled top-floor apartment with a private rooftop terrace. Fully renovated in 2024 with high-end finishes. Quiet residential street.",features:["Rooftop terrace","Fully renovated","New kitchen","Underfloor heating","Elevator"],deposit:"2.670€",available:"1 Jul 2026",floor:"5th of 5"},
  {id:7,projectId:[2],photo:pA,photos:[pA,i3,i4],price:"620€",size:"48 m²",rooms:"2 rooms",title:"Garden-level apartment in Steglitz",address:"Schlossstr. 74, 12163 Berlin",description:"Cosy garden-level apartment with direct access to a shared garden. Recently refurbished with new bathroom and kitchen.",features:["Garden access","New bathroom","New kitchen","Storage room","Pets negotiable"],deposit:"1.860€",available:"1 Aug 2026",floor:"Ground floor"},
  {id:8,projectId:[2],photo:pB,photos:[pB,i1,i2],price:"680€",size:"52 m²",rooms:"2 rooms",title:"Modern flat near Tempelhof Field",address:"Herrfurthstr. 9, 12049 Berlin",description:"Well-maintained modern apartment close to Tempelhof Field. Open-plan living and dining area, separate bedroom, fully fitted kitchen.",features:["Close to park","Fitted kitchen","Quiet building","Bike room","Near S-Bahn"],deposit:"2.040€",available:"15 Jul 2026",floor:"1st of 5"},
  {id:9,projectId:[2],photo:pC,photos:[pC,i3,i4],price:"1.200€",size:"95 m²",rooms:"4 rooms",title:"Spacious family flat in Charlottenburg",address:"Kantstr. 145, 10623 Berlin",description:"Generous 4-room family apartment in one of Berlin's most desirable neighbourhoods. Altbau with high ceilings, two bathrooms and a large eat-in kitchen.",features:["Two bathrooms","Eat-in kitchen","High ceilings","Elevator","Cellar"],deposit:"3.600€",available:"1 Oct 2026",floor:"4th of 5"},
  {id:10,projectId:[2],photo:pD,photos:[pD,i2,i4],price:"550€",size:"38 m²",rooms:"1 room",title:"Studio flat near Ostkreuz",address:"Sonntagstr. 5, 10245 Berlin",description:"Compact studio in the creative Ostkreuz neighbourhood. Smart layout with mezzanine sleeping area. Walking distance to Boxhagener Platz flea market.",features:["Mezzanine bed","Smart layout","Near Ostkreuz","Intercom","Bike storage"],deposit:"1.650€",available:"1 Jun 2026",floor:"2nd of 3"},
];

// ── types ─────────────────────────────────────────────────────────
type TabId="search"|"alerts"|"favorites"|"applied";
type AppStatus="submitted"|"viewed"|"no_response";
type TextSize="small"|"default"|"large"|"xl";
type Screen=
  |{name:"home"}|{name:"settings"}|{name:"accessibility"}|{name:"application-profile"}
  |{name:"search-filter"}|{name:"search-location"}|{name:"search-filters"}
  |{name:"results";projectId:number;title:string}
  |{name:"listing-detail";listingId:number}
  |{name:"messages"}|{name:"chat";contactId:number}
  |{name:"list-property"}|{name:"discover-plus"}
  |{name:"alerts-tab"}|{name:"favorites-tab"}|{name:"applied-tab"};

type ChatMsg={id:number;text:string;fromMe:boolean;time:string};
type Contact={id:number;name:string;avatar:string;listing:string;unread:number;thread:ChatMsg[]};
type AlertItem={id:number;title:string;body:string;time:string;listingId?:number;read:boolean};
type Application={listingId:number;status:AppStatus;appliedDate:string};
type FilterState={intent:"rent"|"buy"|null;category:"residential"|"business"|null;leaseTerm:string|null;propertyTypes:string[]};

const DEFAULT_SF={
  intent:"rent" as "rent"|"buy",
  rentalTypes:[] as string[],
  rentMin:0,rentMax:3000,
  rooms:null as string|null,
  spaceMin:10,spaceMax:250,
  furnishing:[] as string[],
  propTypes:[] as string[],
  accessibility:[] as string[],
  permit:null as string|null,
  pets:null as string|null,
  floor:null as string|null,
  yearMin:1900,yearMax:2026,
  heatingTypes:[] as string[],
  energyCert:null as string|null,
  keyword:"",
};
type SearchFiltersState=typeof DEFAULT_SF;

function countActiveSF(f:SearchFiltersState):number{
  let n=0;
  if(f.intent!=="rent")n++;
  if(f.intent==="rent"&&f.rentalTypes.length>0)n++;
  if(f.rentMin>0)n++;if(f.rentMax<3000)n++;
  if(f.rooms!==null)n++;
  if(f.spaceMin>10)n++;if(f.spaceMax<250)n++;
  if(f.furnishing.length>0)n++;
  if(f.propTypes.length>0)n++;
  if(f.accessibility.length>0)n++;
  if(f.permit!==null)n++;
  if(f.pets!==null)n++;
  if(f.floor!==null)n++;
  if(f.yearMin>1900)n++;if(f.yearMax<2026)n++;
  if(f.heatingTypes.length>0)n++;
  if(f.energyCert!==null)n++;
  if(f.keyword.trim()!=="")n++;
  return n;
}

type AppProfile={
  fullName:string;email:string;phone:string;
  occupation:string;employer:string;monthlyIncome:string;
  adults:number;children:number;pets:boolean;
  introduction:string;applicationMessage:string;
  documents:{id:number;name:string;size:string}[];
};
const DEFAULT_PROFILE:AppProfile={
  fullName:"",email:"",phone:"",occupation:"",employer:"",monthlyIncome:"",
  adults:1,children:0,pets:false,introduction:"",applicationMessage:"",documents:[],
};
function calcProfilePct(p:AppProfile):number{
  const f=[p.fullName,p.email,p.phone,p.occupation,p.employer,p.monthlyIncome,p.introduction,p.applicationMessage];
  return Math.round(f.filter(x=>x.trim()!=="").length/8*100);
}

// ── seed data ─────────────────────────────────────────────────────
const INIT_CONTACTS:Contact[]=[
  {id:1,name:"Markus Berger",avatar:"MB",listing:"Prenzlauer Berg · 54m²",unread:2,thread:[
    {id:1,text:"Hi Rachel! I saw your inquiry about the apartment. Are you still interested?",fromMe:false,time:"Yesterday"},
    {id:2,text:"Yes, definitely! Is it still available?",fromMe:true,time:"Yesterday"},
    {id:3,text:"Thanks for your interest! The apartment is still available.",fromMe:false,time:"14:23"},
    {id:4,text:"When would you like to schedule a viewing?",fromMe:false,time:"14:24"},
  ]},
  {id:2,name:"Sandra Voigt",avatar:"SV",listing:"Mauerpark · 68m²",unread:1,thread:[
    {id:1,text:"Hello! I noticed you applied for the flat near Mauerpark.",fromMe:false,time:"Yesterday"},
    {id:2,text:"Yes, I'm very interested in the property!",fromMe:true,time:"Yesterday"},
    {id:3,text:"Could you come for a viewing on Saturday morning?",fromMe:false,time:"10:15"},
  ]},
  {id:3,name:"Thomas Krüger",avatar:"TK",listing:"Neukölln · 62m²",unread:0,thread:[
    {id:1,text:"Thank you for your application to the Neukölln apartment.",fromMe:false,time:"Monday"},
    {id:2,text:"Thank you! I'm looking forward to a viewing.",fromMe:true,time:"Monday"},
    {id:3,text:"The landlord has confirmed your application.",fromMe:false,time:"Monday"},
    {id:4,text:"I'll be in touch with viewing times very soon.",fromMe:false,time:"Monday"},
  ]},
];
const INIT_ALERTS:AlertItem[]=[
  {id:1,title:"3 new offers in Prenzlauer Berg",body:"New apartments matching your apartment/house search.",time:"2m",listingId:1,read:false},
  {id:2,title:"Price drop in Mitte",body:"A listing you viewed reduced its price to 590€/month.",time:"1h",listingId:3,read:false},
  {id:3,title:"New listing: Altbau Friedrichshain",body:"A 62m² apartment now matches your criteria.",time:"3h",listingId:4,read:true},
  {id:4,title:"Viewing confirmed",body:"Sandra Voigt confirmed your Saturday morning viewing.",time:"Yesterday",listingId:2,read:true},
  {id:5,title:"7 new offers for your second search",body:"New listings added matching your rental criteria.",time:"2 days ago",read:true},
];
const INIT_APPS:Application[]=[
  {listingId:1,status:"viewed",appliedDate:"3 Jun 2026"},
  {listingId:2,status:"submitted",appliedDate:"5 Jun 2026"},
  {listingId:5,status:"no_response",appliedDate:"7 Jun 2026"},
];

// ── context ───────────────────────────────────────────────────────
interface Ctx {
  activeTab:TabId;currentStack:Screen[];slideDir:"forward"|"back"|"none";renderKey:number;
  push:(s:Screen)=>void;pop:()=>void;switchTab:(t:TabId)=>void;
  favorites:Set<number>;toggleFavorite:(id:number)=>void;
  applications:Application[];applyToListing:(id:number)=>void;isApplied:(id:number)=>boolean;
  contacts:Contact[];markRead:(id:number)=>void;sendMessage:(id:number,text:string)=>void;totalUnread:number;
  alerts:AlertItem[];markAlertRead:(id:number)=>void;
  filter:FilterState;setFilter:(f:FilterState)=>void;
  searchFilters:SearchFiltersState;setSearchFilters:(f:SearchFiltersState)=>void;
  appProfile:AppProfile;setAppProfile:(p:AppProfile)=>void;
  highContrast:boolean;setHighContrast:(v:boolean)=>void;
  textSize:TextSize;setTextSize:(v:TextSize)=>void;
  showTabLabels:boolean;setShowTabLabels:(v:boolean)=>void;
  locationLabel:string;setLocationLabel:(s:string)=>void;
}
const AppCtx=createContext<Ctx|null>(null);
function useApp(){const c=useContext(AppCtx);if(!c)throw new Error("no ctx");return c;}

function useTheme():{C:ColorSet;fs:(n:number)=>number;card:(r?:number)=>React.CSSProperties}{
  const {highContrast,textSize}=useApp();
  const C=highContrast?HC_C:NORMAL_C;
  const scale=TEXT_SCALE[textSize]??1;
  const fs=(n:number)=>Math.round(n*scale);
  const card=(r=32):React.CSSProperties=>({background:C.cardBg,boxShadow:C.cardShadow,borderRadius:r});
  return {C,fs,card};
}

function AppProvider({children}:{children:React.ReactNode}){
  const [tabStacks,setStacks]=useState<Record<TabId,Screen[]>>({
    search:[{name:"home"}],alerts:[{name:"alerts-tab"}],
    favorites:[{name:"favorites-tab"}],applied:[{name:"applied-tab"}],
  });
  const [activeTab,setTab]=useState<TabId>("search");
  const [slideDir,setDir]=useState<"forward"|"back"|"none">("none");
  const [renderKey,setKey]=useState(0);
  const [favorites,setFavs]=useState<Set<number>>(new Set([2]));
  const [applications,setApps]=useState<Application[]>(INIT_APPS);
  const [contacts,setContacts]=useState<Contact[]>(INIT_CONTACTS);
  const [alerts,setAlerts]=useState<AlertItem[]>(INIT_ALERTS);
  const [filter,setFilter]=useState<FilterState>({intent:null,category:null,leaseTerm:null,propertyTypes:[]});
  const [searchFilters,setSearchFilters]=useState<SearchFiltersState>(DEFAULT_SF);
  const [appProfile,setAppProfile]=useState<AppProfile>(DEFAULT_PROFILE);
  const [highContrast,setHighContrast]=useState(false);
  const [textSize,setTextSize]=useState<TextSize>("default");
  const [showTabLabels,setShowTabLabels]=useState(false);
  const [locationLabel,setLocationLabel]=useState("Berlin · Prenzlauer Berg");
  const currentStack=tabStacks[activeTab];
  const totalUnread=contacts.reduce((s,c)=>s+c.unread,0);
  const push=(s:Screen)=>{setDir("forward");setKey(k=>k+1);setStacks(p=>({...p,[activeTab]:[...p[activeTab],s]}));};
  const pop=()=>{if(tabStacks[activeTab].length<=1)return;setDir("back");setKey(k=>k+1);setStacks(p=>({...p,[activeTab]:p[activeTab].slice(0,-1)}));};
  const switchTab=(t:TabId)=>{if(t===activeTab)return;setDir("none");setKey(k=>k+1);setTab(t);};
  const toggleFavorite=(id:number)=>setFavs(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  const applyToListing=(id:number)=>{
    if(applications.find(a=>a.listingId===id))return;
    const now=new Date();
    setApps(p=>[...p,{listingId:id,status:"submitted",appliedDate:`${now.getDate()} ${now.toLocaleString("en",{month:"short"})} ${now.getFullYear()}`}]);
  };
  const isApplied=(id:number)=>applications.some(a=>a.listingId===id);
  const markRead=(id:number)=>setContacts(p=>p.map(c=>c.id===id?{...c,unread:0}:c));
  const sendMessage=(id:number,text:string)=>setContacts(p=>p.map(c=>c.id===id?{...c,thread:[...c.thread,{id:c.thread.length+1,text,fromMe:true,time:"Now"}]}:c));
  const markAlertRead=(id:number)=>setAlerts(p=>p.map(a=>a.id===id?{...a,read:true}:a));
  return (
    <AppCtx.Provider value={{activeTab,currentStack,slideDir,renderKey,push,pop,switchTab,favorites,toggleFavorite,applications,applyToListing,isApplied,contacts,markRead,sendMessage,totalUnread,alerts,markAlertRead,filter,setFilter,searchFilters,setSearchFilters,appProfile,setAppProfile,highContrast,setHighContrast,textSize,setTextSize,showTabLabels,setShowTabLabels,locationLabel,setLocationLabel}}>
      {children}
    </AppCtx.Provider>
  );
}

// ── primitives ────────────────────────────────────────────────────
function Tap({children,onClick,style={}}:{children:React.ReactNode;onClick?:()=>void;style?:React.CSSProperties}){
  const [p,setP]=useState(false);
  return <div style={{...style,opacity:p?.6:1,transition:"opacity 0.1s",cursor:"pointer"}} onPointerDown={()=>setP(true)} onPointerUp={()=>{setP(false);onClick?.();}} onPointerLeave={()=>setP(false)}>{children}</div>;
}
function TapBtn({children,onClick,style={},disabled=false,ariaLabel}:{children:React.ReactNode;onClick?:()=>void;style?:React.CSSProperties;disabled?:boolean;ariaLabel?:string}){
  const [p,setP]=useState(false);
  return <button aria-label={ariaLabel} disabled={disabled} style={{...style,opacity:(p||disabled)?.6:1,transition:"opacity 0.1s"}} onPointerDown={()=>!disabled&&setP(true)} onPointerUp={()=>{setP(false);if(!disabled)onClick?.();}} onPointerLeave={()=>setP(false)}>{children}</button>;
}
function BackBtn(){
  const {pop}=useApp();
  const {C,card}=useTheme();
  return <TapBtn onClick={pop} style={{...card(10),width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",border:"none",cursor:"pointer",flexShrink:0}}>
    <ArrowLeft size={18} strokeWidth={1.3} style={{color:C.ink}}/>
  </TapBtn>;
}
function BackHeader({title,sub}:{title:string;sub?:string}){
  const {C,fs}=useTheme();
  return <div style={{display:"flex",alignItems:"center",gap:12,padding:"16px 20px 12px"}}>
    <BackBtn/>
    <div>
      <h1 style={{fontSize:fs(20),fontWeight:500,color:C.ink,margin:0,lineHeight:1.2,fontFamily:TF}}>{title}</h1>
      {sub&&<p style={{fontSize:fs(12),color:C.sub,margin:"2px 0 0"}}>{sub}</p>}
    </div>
  </div>;
}
function Toggle({value,onChange}:{value:boolean;onChange:(v:boolean)=>void}){
  const {C}=useTheme();
  return <div onClick={()=>onChange(!value)} style={{width:44,height:26,borderRadius:13,background:value?C.navy:"#DDDCE3",position:"relative",cursor:"pointer",transition:"background 0.2s",flexShrink:0}}>
    <div style={{width:22,height:22,borderRadius:11,background:"#FFF",position:"absolute",top:2,left:value?20:2,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
  </div>;
}

// ── status bar ────────────────────────────────────────────────────
function StatusBar(){
  const {C}=useTheme();
  return (
    <div className="hf-statusbar" style={{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",height:54,paddingLeft:24,paddingRight:24}}>
      <span style={{fontSize:15,fontWeight:600,color:C.ink}}>9:41</span>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={C.ink}><rect x="0" y="4" width="3" height="8" rx="0.5" opacity="0.3"/><rect x="4" y="3" width="3" height="9" rx="0.5" opacity="0.5"/><rect x="8" y="1" width="3" height="11" rx="0.5" opacity="0.7"/><rect x="12" y="0" width="3" height="12" rx="0.5"/></svg>
        <svg width="16" height="12" viewBox="0 0 20 14" fill={C.ink}><path d="M10 2.5C12.8 2.5 15.3 3.7 17 5.6L18.5 4C16.4 1.5 13.4 0 10 0C6.6 0 3.6 1.5 1.5 4L3 5.6C4.7 3.7 7.2 2.5 10 2.5Z"/><path d="M10 6C11.9 6 13.6 6.8 14.8 8.1L16.3 6.5C14.7 4.9 12.5 4 10 4C7.5 4 5.3 4.9 3.7 6.5L5.2 8.1C6.4 6.8 8.1 6 10 6Z"/><circle cx="10" cy="12" r="2"/></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={C.ink} strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="9" rx="2" fill={C.ink}/><path d="M24 4.5V8.5C24.8 8.2 25.5 7.4 25.5 6.5C25.5 5.6 24.8 4.8 24 4.5Z" fill={C.ink} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
}

// ── bottom nav ────────────────────────────────────────────────────
const NAV_ITEMS:[TabId,typeof Search,string][]=[["search",Search,"Search"],["alerts",Bell,"Alerts"],["favorites",Heart,"Favorites"],["applied",ClipboardList,"Applied"]];

function BottomNav(){
  const {activeTab,switchTab,showTabLabels}=useApp();
  const {C}=useTheme();
  return (
    <div style={{flexShrink:0,background:C.cardSolid,borderTop:`1px solid ${C.border}`,boxShadow:"0 -2px 8px rgba(0,0,0,0.04)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",paddingLeft:12,paddingRight:12,height:showTabLabels?56:52}}>
        {NAV_ITEMS.map(([key,Icon,label])=>{
          const active=key===activeTab;
          return (
            <TapBtn key={key} onClick={()=>switchTab(key)} ariaLabel={label} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:showTabLabels?4:2,minHeight:44,color:active?C.navy:C.sub,background:"none",border:"none",cursor:"pointer"}}>
              <Icon size={24} strokeWidth={active?1.8:1.3}/>
              {showTabLabels&&<span style={{fontSize:11,fontWeight:600,lineHeight:1}}>{label}</span>}
              {!showTabLabels&&active&&<div style={{width:4,height:4,borderRadius:2,background:C.navy,marginTop:1}}/>}
            </TapBtn>
          );
        })}
      </div>
      <div className="hf-homebar" style={{height:28,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:8}}>
        <div style={{width:134,height:5,borderRadius:999,background:C.ink}}/>
      </div>
    </div>
  );
}

// ── carousel ──────────────────────────────────────────────────────
function Carousel({photos,saved,onSave}:{photos:string[];saved:boolean;onSave:()=>void}){
  const [idx,setIdx]=useState(0);
  const sx=useRef(0);
  return (
    <div style={{position:"relative",height:190,overflow:"hidden",userSelect:"none"}} onPointerDown={e=>{sx.current=e.clientX;}} onPointerUp={e=>{const d=e.clientX-sx.current;if(d<-40)setIdx(i=>Math.min(i+1,photos.length-1));else if(d>40)setIdx(i=>Math.max(i-1,0));}}>
      <div style={{display:"flex",height:"100%",transition:"transform 0.3s",transform:`translateX(-${idx*100}%)`,width:`${photos.length*100}%`}}>
        {photos.map((src,i)=><img key={i} src={src} alt="" style={{objectFit:"cover",height:"100%",width:`${100/photos.length}%`}} draggable={false}/>)}
      </div>
      <TapBtn onClick={onSave} style={{position:"absolute",top:10,right:10,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.92)",borderRadius:999,boxShadow:"0 1px 4px rgba(0,0,0,0.15)",border:"none",cursor:"pointer"}}>
        <Heart size={15} style={{color:saved?"#E5373A":"#1F1F1E",fill:saved?"#E5373A":"none"}}/>
      </TapBtn>
      {photos.length>1&&<div style={{position:"absolute",bottom:8,left:0,right:0,display:"flex",justifyContent:"center",gap:4,pointerEvents:"none"}}>{photos.map((_,i)=><span key={i} style={{borderRadius:999,transition:"all 0.2s",background:"#FFF",opacity:i===idx?1:0.5,width:i===idx?12:6,height:6}}/>)}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HOME SCREEN
// ════════════════════════════════════════════════════════════════
const HOME_PROJECTS=[
  {id:1,projectId:1,icon:Building2,title:"Finding an apartment or house to rent",detail:"3 new offers"},
  {id:2,projectId:2,icon:Trees,title:"Renting our dream plot",detail:"7 new offers"},
];

function HomeScreen(){
  const {push,contacts,totalUnread}=useApp();
  const {C,fs,card}=useTheme();
  const latestUnread=contacts.find(c=>c.unread>0);
  const sl:React.CSSProperties={fontSize:fs(10),fontWeight:600,letterSpacing:"0.8px",color:C.sub,textTransform:"uppercase",margin:"0 0 8px"};
  return (
    <div style={{background:C.bg,display:"flex",flexDirection:"column",minHeight:"100%"}}>
      {/* header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px"}}>
        <h1 style={{fontSize:fs(20),fontWeight:500,color:C.ink,margin:0,fontFamily:TF}}>Hello Rachel :)</h1>
        <TapBtn onClick={()=>push({name:"settings"})} style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:C.peach,borderRadius:10,boxShadow:"0 1px 4px rgba(0,0,0,0.10)",border:"none",cursor:"pointer"}}>
          <Settings size={16} strokeWidth={1.3} style={{color:C.navy}}/>
        </TapBtn>
      </div>
      {/* search bar */}
      <div style={{padding:"0 20px 20px"}}>
        <Tap onClick={()=>push({name:"search-filter"})} style={{display:"flex",alignItems:"center",gap:12,...card(16),padding:"12px 16px"}}>
          <Search size={15} strokeWidth={1.3} style={{color:C.ph,flexShrink:0}}/><span style={{fontSize:fs(14),color:C.ph}}>Start your search</span>
        </Tap>
      </div>
      {/* projects */}
      <div style={{padding:"0 20px 20px"}}>
        <p style={sl}>Your Active Search Projects</p>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {HOME_PROJECTS.map(proj=>{const Icon=proj.icon;return(
            <Tap key={proj.id} onClick={()=>push({name:"results",projectId:proj.projectId,title:proj.title})} style={{...card(32),padding:18}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{width:34,height:34,borderRadius:10,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={17} strokeWidth={1.3} style={{color:C.navy}}/></div>
                <span style={{fontSize:fs(10),fontWeight:600,padding:"3px 9px",borderRadius:999,background:C.navy,color:"#FFF",letterSpacing:"0.5px"}}>{proj.detail}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <p style={{fontSize:fs(13),fontWeight:500,color:C.ink,lineHeight:1.3,flex:1,margin:0,fontFamily:TF}}>{proj.title}</p>
                <ChevronRight size={15} strokeWidth={1.3} style={{color:C.sub,flexShrink:0}}/>
              </div>
            </Tap>
          );})}
        </div>
      </div>
      {/* messages card */}
      <div style={{padding:"0 20px 20px"}}>
        <Tap onClick={()=>push({name:"messages"})} style={{...card(32),padding:18,boxShadow:`inset 0 0 0 0.6px rgba(6,142,138,0.20),0 1px 3px rgba(0,0,0,0.08)`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:latestUnread?12:0}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <MessageCircle size={13} strokeWidth={1.3} style={{color:C.ink}}/>
              <p style={{fontSize:fs(10),fontWeight:600,letterSpacing:"0.8px",color:C.ink,textTransform:"uppercase",margin:0}}>Messages</p>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              {totalUnread>0&&<span style={{minWidth:18,height:18,padding:"0 5px",borderRadius:999,background:C.teal,color:"#FFF",fontSize:fs(9),fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{totalUnread}</span>}
              <ChevronRight size={13} strokeWidth={1.3} style={{color:C.sub}}/>
            </div>
          </div>
          {latestUnread?(
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:999,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:fs(10),fontWeight:700,color:"#FFF",flexShrink:0}}>{latestUnread.avatar}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:fs(12),fontWeight:500,color:C.ink,margin:"0 0 1px",fontFamily:TF}}>Latest from {latestUnread.name}</p>
                <p style={{fontSize:fs(11),color:C.sub,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{latestUnread.thread[latestUnread.thread.length-1]?.text}</p>
              </div>
            </div>
          ):(
            <p style={{fontSize:fs(13),color:C.sub,margin:0}}>No new messages</p>
          )}
        </Tap>
      </div>
      {/* featured */}
      <div style={{marginTop:"auto",padding:"0 20px 30px"}}>
        <p style={{...sl,margin:"0 0 23px"}}>Featured & Recommended</p>
        <div style={{display:"flex",gap:12}}>
          <Tap onClick={()=>push({name:"list-property"})} style={{flex:1,background:C.navy,borderRadius:32,padding:18,display:"flex",flexDirection:"column",minHeight:150,boxShadow:"0 1px 3px rgba(0,0,0,0.10)"}}>
            <div style={{width:30,height:30,borderRadius:10,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><Building2 size={14} strokeWidth={1.3} style={{color:C.peach}}/></div>
            <p style={{color:"#FFF",fontSize:fs(13),fontWeight:400,lineHeight:1.3,margin:"0 0 3px",fontFamily:TF}}>List Your Property</p>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:fs(11),lineHeight:1.4,margin:"0 0 auto"}}>Reach verified seekers</p>
            <div style={{background:C.peach,color:C.navy,fontSize:fs(11),fontWeight:600,padding:"9px 0",borderRadius:10,textAlign:"center",letterSpacing:"0.55px",marginTop:12,textTransform:"uppercase"}}>Post Offer</div>
          </Tap>
          <Tap onClick={()=>push({name:"discover-plus"})} style={{flex:1,...card(32),padding:18,display:"flex",flexDirection:"column",minHeight:150}}>
            <div style={{width:30,height:30,borderRadius:10,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><CheckCircle2 size={14} strokeWidth={1.3} style={{color:C.navy}}/></div>
            <p style={{color:C.ink,fontSize:fs(13),fontWeight:400,lineHeight:1.3,margin:"0 0 3px",fontFamily:TF}}>Discover Plus+</p>
            <p style={{color:C.sub,fontSize:fs(11),lineHeight:1.4,margin:"0 0 auto"}}>Unlock tools for matches</p>
            <div style={{background:C.peach,color:C.navy,fontSize:fs(11),fontWeight:600,padding:"9px 0",borderRadius:10,textAlign:"center",letterSpacing:"0.55px",marginTop:12,textTransform:"uppercase"}}>See More</div>
          </Tap>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SETTINGS + ACCESSIBILITY
// ════════════════════════════════════════════════════════════════
function SettingsScreen(){
  const {push,appProfile}=useApp();
  const {C,fs,card}=useTheme();
  const profilePct=calcProfilePct(appProfile);
  type RowDef={icon:React.ElementType;label:string;sub:string;screen:Screen|null;pct?:number};
  const rows:RowDef[]=[
    {icon:User,       label:"Profile",             sub:"Rachel Müller",                         screen:null},
    {icon:FileText,   label:"Application Profile", sub:"Everything landlords need to see",      screen:{name:"application-profile"},pct:profilePct},
    {icon:Eye,        label:"Accessibility",        sub:"Display, audio, and interaction options",screen:{name:"accessibility"}},
    {icon:Bell,       label:"Notifications",        sub:"All alerts enabled",                    screen:null},
    {icon:Globe,      label:"Language",             sub:"English",                               screen:null},
    {icon:Shield,     label:"Privacy & Security",   sub:"Manage your data",                      screen:null},
    {icon:HelpCircle, label:"Help & Support",       sub:"FAQ, contact us",                       screen:null},
  ];
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <BackHeader title="Settings"/>
      <div style={{padding:"0 20px 20px"}}>
        <div style={{...card(32),display:"flex",alignItems:"center",gap:14,padding:18,marginBottom:16}}>
          <div style={{width:50,height:50,borderRadius:999,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF",fontSize:fs(19),fontWeight:700,flexShrink:0,fontFamily:TF}}>R</div>
          <div><p style={{fontSize:fs(15),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>Rachel Müller</p><p style={{fontSize:fs(12),color:C.sub,margin:0}}>rachel.muller@mail.com</p></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {rows.map(row=>{const Icon=row.icon;return(
            <Tap key={row.label} onClick={()=>row.screen&&push(row.screen)} style={{...card(32),display:"flex",alignItems:"center",gap:12,padding:"14px 18px",minHeight:60}}>
              <div style={{width:34,height:34,borderRadius:10,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={15} strokeWidth={1.3} style={{color:C.navy}}/></div>
              <div style={{flex:1}}><p style={{fontSize:fs(14),fontWeight:500,color:C.ink,margin:"0 0 1px",fontFamily:TF}}>{row.label}</p><p style={{fontSize:fs(11),color:C.sub,margin:0}}>{row.sub}</p></div>
              {row.pct!==undefined
                ?<span style={{fontSize:fs(13),fontWeight:600,color:C.navy,letterSpacing:"-0.2px"}}>{row.pct}%</span>
                :<ChevronRight size={13} strokeWidth={1.3} style={{color:C.sub}}/>}
            </Tap>
          );})}
          <Tap style={{...card(32),display:"flex",alignItems:"center",gap:12,padding:"14px 18px",minHeight:54,marginTop:6}}>
            <div style={{width:34,height:34,borderRadius:10,background:"#FFF0F1",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><LogOut size={15} strokeWidth={1.3} style={{color:"#E5373A"}}/></div>
            <p style={{fontSize:fs(14),fontWeight:500,color:"#E5373A",margin:0,fontFamily:TF}}>Sign Out</p>
          </Tap>
        </div>
      </div>
    </div>
  );
}

function AccessibilityScreen(){
  const {highContrast,setHighContrast,textSize,setTextSize,showTabLabels,setShowTabLabels}=useApp();
  const {C,fs,card}=useTheme();
  const rowBorder={borderBottom:`1px solid ${C.border}`};
  const TS_OPTS:[TextSize,string,number][]=[["small","Small",13],["default","Default",15],["large","Large",18],["xl","XL",21]];
  const sl:React.CSSProperties={fontSize:fs(10),fontWeight:600,letterSpacing:"0.8px",color:C.sub,textTransform:"uppercase",margin:"0 0 8px"};
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <BackHeader title="Accessibility" sub="Display, audio, and interaction options"/>
      <div style={{height:1,background:C.border,margin:"0 20px 20px"}}/>
      <div style={{padding:"0 20px"}}>
        <p style={sl}>Display</p>
        <div style={{...card(32),overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12,padding:"16px 18px",...rowBorder}}>
            <div style={{width:34,height:34,borderRadius:10,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Eye size={15} strokeWidth={1.3} style={{color:C.navy}}/></div>
            <div style={{flex:1}}>
              <p style={{fontSize:fs(14),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>High contrast mode</p>
              <p style={{fontSize:fs(11),color:C.sub,margin:0,lineHeight:1.45}}>Stronger borders and darker text for reduced eye strain.</p>
            </div>
            <Toggle value={highContrast} onChange={setHighContrast}/>
          </div>
          <div style={{padding:"16px 18px",...rowBorder}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:12}}>
              <div style={{width:34,height:34,borderRadius:10,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:fs(15),fontWeight:700,color:C.navy,lineHeight:1,fontFamily:TF}}>T</span></div>
              <div style={{flex:1}}>
                <p style={{fontSize:fs(14),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>Text size</p>
                <p style={{fontSize:fs(11),color:C.sub,margin:0,lineHeight:1.45}}>Scales all text across the app.</p>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
              {TS_OPTS.map(([sz,label,aaSize])=>{
                const sel=textSize===sz;
                return(
                  <TapBtn key={sz} onClick={()=>setTextSize(sz)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"9px 4px",borderRadius:10,background:sel?C.navy:C.cardSolid,color:sel?"#FFF":C.sub,boxShadow:sel?`0 1px 3px rgba(0,0,0,0.15)`:C.cardShadow,border:"none",cursor:"pointer",transition:"all 0.15s"}}>
                    <span style={{fontSize:aaSize,fontWeight:700,lineHeight:1,fontFamily:TF}}>Aa</span>
                    <span style={{fontSize:10,fontWeight:500}}>{label}</span>
                  </TapBtn>
                );
              })}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",gap:12,padding:"16px 18px"}}>
            <div style={{width:34,height:34,borderRadius:10,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><ClipboardList size={15} strokeWidth={1.3} style={{color:C.navy}}/></div>
            <div style={{flex:1}}>
              <p style={{fontSize:fs(14),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>Show tab bar labels</p>
              <p style={{fontSize:fs(11),color:C.sub,margin:0,lineHeight:1.45}}>Show the name under each icon in the bottom bar.</p>
            </div>
            <Toggle value={showTabLabels} onChange={setShowTabLabels}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SEARCH FILTER + LOCATION SCREENS
// ════════════════════════════════════════════════════════════════
const PROP_TYPES=[
  {k:"House",I:Home,label:"House"},{k:"Apartment",I:Building2,label:"Apartment"},
  {k:"Plot",I:Trees,label:"Plot"},{k:"Garage",I:Car,label:"Garage"},{k:"Cabin",I:Tent,label:"Cabin"},
];

function SearchFilterScreen(){
  const {push,filter,setFilter,locationLabel}=useApp();
  const {C,fs,card}=useTheme();
  const [intent,setIntent]=useState<"rent"|"buy"|null>(filter.intent??"rent");
  const [cat,setCat]=useState<"residential"|"business"|null>(filter.category??"residential");
  const [lease,setLease]=useState<string|null>(filter.leaseTerm??"Long term");
  const [types,setTypes]=useState<string[]>(filter.propertyTypes.length>0?filter.propertyTypes:["Apartment"]);
  const tog=(k:string)=>setTypes(p=>p.includes(k)?p.filter(x=>x!==k):[...p,k]);
  const confirm=()=>{setFilter({intent,category:cat,leaseTerm:lease,propertyTypes:types});push({name:"results",projectId:1,title:locationLabel});};
  const sl:React.CSSProperties={fontSize:fs(10),fontWeight:600,letterSpacing:"0.8px",color:C.sub,textTransform:"uppercase",margin:"0 0 6px"};
  const SegBtn=({val,cur,set,label}:{val:string;cur:string|null;set:(v:any)=>void;label:string})=>{
    const sel=cur===val;
    return <TapBtn onClick={()=>set(cur===val?null:val)} style={{flex:1,padding:"10px 0",borderRadius:8,fontSize:fs(13),fontWeight:500,background:sel?C.navy:"transparent",color:sel?"#FFF":C.sub,display:"flex",alignItems:"center",justifyContent:"center",gap:5,border:"none",cursor:"pointer",transition:"all 0.15s"}}>{sel&&<Check size={12} strokeWidth={3} style={{color:"#FFF"}}/>}{label}</TapBtn>;
  };
  return (
    <div style={{background:C.bg,display:"flex",flexDirection:"column",flex:1}}>
      <BackHeader title="What are you looking for?"/>
      <div style={{flex:1,minHeight:0,overflowY:"auto",padding:"0 20px",display:"flex",flexDirection:"column",gap:20,paddingBottom:12}}>
        <div><p style={sl}>Intent</p>
          <div style={{display:"flex",background:C.muted,borderRadius:12,padding:4,gap:4}}><SegBtn val="rent" cur={intent} set={setIntent} label="Rent"/><SegBtn val="buy" cur={intent} set={setIntent} label="Buy"/></div>
        </div>
        <div><p style={sl}>Category</p>
          <div style={{display:"flex",background:C.muted,borderRadius:12,padding:4,gap:4}}><SegBtn val="residential" cur={cat} set={setCat} label="Residential"/><SegBtn val="business" cur={cat} set={setCat} label="Business"/></div>
        </div>
        {intent==="rent"&&(
          <div><p style={sl}>Lease Terms</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {["Long term","Short term","Home swap","Sublet"].map(t=>{const sel=lease===t;return(
                <TapBtn key={t} onClick={()=>setLease(lease===t?null:t)} style={{minHeight:46,...(sel?{background:C.navy,color:"#FFF",borderRadius:10,border:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.10)"}:{...card(10),border:"none",color:C.ink}),fontSize:fs(13),fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer",transition:"all 0.15s",fontFamily:TF}}>
                  {sel&&<Check size={12} strokeWidth={3} style={{color:"#FFF"}}/>}{t}
                </TapBtn>
              );})}
            </div>
          </div>
        )}
        <div>
          <p style={sl}>Property Types</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            {PROP_TYPES.slice(0,2).map(({k,I,label})=>{const a=types.includes(k);return(
              <TapBtn key={k} onClick={()=>tog(k)} style={{position:"relative",height:80,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,borderRadius:16,border:"none",cursor:"pointer",transition:"all 0.15s",...(a?{background:C.navyBg,boxShadow:`inset 0 0 0 2px ${C.navy},0 1px 3px rgba(0,0,0,0.06)`}:{...card(16)})}}>
                {a&&<span style={{position:"absolute",top:7,right:7}}><CheckCircle2 size={12} strokeWidth={1.5} style={{color:C.navy}}/></span>}
                <I size={19} strokeWidth={1.3} style={{color:a?C.navy:C.ink2}}/><span style={{fontSize:fs(12),fontWeight:500,color:C.ink}}>{label}</span>
              </TapBtn>
            );})}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {PROP_TYPES.slice(2).map(({k,I,label})=>{const a=types.includes(k);return(
              <TapBtn key={k} onClick={()=>tog(k)} style={{position:"relative",height:68,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,borderRadius:16,border:"none",cursor:"pointer",transition:"all 0.15s",...(a?{background:C.navyBg,boxShadow:`inset 0 0 0 2px ${C.navy},0 1px 3px rgba(0,0,0,0.06)`}:{...card(16)})}}>
                {a&&<span style={{position:"absolute",top:5,right:5}}><CheckCircle2 size={10} strokeWidth={1.5} style={{color:C.navy}}/></span>}
                <I size={16} strokeWidth={1.3} style={{color:a?C.navy:C.ink2}}/><span style={{fontSize:fs(11),fontWeight:500,color:C.ink}}>{label}</span>
              </TapBtn>
            );})}
          </div>
        </div>
        <div>
          <p style={sl}>Location</p>
          <Tap onClick={()=>push({name:"search-location"})} style={{display:"flex",alignItems:"center",gap:12,...card(16),padding:"12px 16px",minHeight:48}}>
            <MapPin size={14} strokeWidth={1.3} style={{color:C.ph,flexShrink:0}}/><span style={{fontSize:fs(13),color:C.ink,fontWeight:500,flex:1}}>{locationLabel}</span><ChevronRight size={13} strokeWidth={1.3} style={{color:C.sub}}/>
          </Tap>
        </div>
      </div>
      <div style={{flexShrink:0,background:C.cardSolid,padding:"12px 20px 16px",borderTop:`1px solid ${C.border}`}}>
        <TapBtn onClick={confirm} style={{width:"100%",background:C.navy,color:"#FFF",fontSize:fs(11),fontWeight:600,padding:"14px 0",borderRadius:10,border:"none",cursor:"pointer",letterSpacing:"0.55px",textTransform:"uppercase"}}>Confirm Selection</TapBtn>
      </div>
    </div>
  );
}

// ── berlin districts map background ──────────────────────────────
function BerlinMapBg(){
  return (
    <svg width="100%" height="100%" viewBox="0 0 370 320" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}>
      <rect width="370" height="320" fill="#E8E4D8"/>
      <rect x="55" y="100" width="80" height="55" fill="#C5D9A8" rx="6"/>
      <ellipse cx="185" cy="255" rx="45" ry="30" fill="#C5D9A8"/>
      <rect x="275" y="70" width="30" height="40" fill="#C5D9A8" rx="4"/>
      <path d="M0,155 Q50,140 100,150 Q150,158 200,145 Q250,132 310,148 Q340,155 370,145" fill="none" stroke="#A8C4DC" strokeWidth="9"/>
      <line x1="0" y1="130" x2="370" y2="170" stroke="#FFF" strokeWidth="3.5" strokeOpacity="0.9"/>
      <line x1="140" y1="0" x2="185" y2="320" stroke="#FFF" strokeWidth="2.5" strokeOpacity="0.85"/>
      <line x1="0" y1="200" x2="370" y2="190" stroke="#FFF" strokeWidth="2" strokeOpacity="0.8"/>
      {[55,110,185,255,320].map(x=><line key={x} x1={x} y1="0" x2={x} y2="320" stroke="#FFF" strokeWidth="1.2" strokeOpacity="0.7"/>)}
      {[55,95,155,210,265].map(y=><line key={y} x1="0" y1={y} x2="370" y2={y} stroke="#FFF" strokeWidth="1.2" strokeOpacity="0.7"/>)}
      {[[30,55,35,28],[165,55,28,22],[225,85,32,25],[70,195,28,22],[280,200,30,20],[100,60,20,16],[320,130,22,18]].map(([x,y,w,h],i)=>
        <rect key={i} x={x} y={y} width={w} height={h} fill="#D8D0BE" rx="2"/>)}
    </svg>
  );
}

const DISTRICTS=["Mitte","Prenzlauer Berg","Kreuzberg","Friedrichshain","Neukölln","Charlottenburg","Schöneberg","Wedding"];

function SearchLocationScreen(){
  const {pop,setLocationLabel,locationLabel}=useApp();
  const {C,fs,card}=useTheme();
  const [tab,setTab]=useState<"locations"|"map">("locations");
  const [selected,setSelected]=useState<string[]>(()=>{const parts=locationLabel.split(", ");return parts.filter(p=>DISTRICTS.includes(p));});
  const [distSearch,setDistSearch]=useState("");
  const [mapMode,setMapMode]=useState<"pin"|"draw">("pin");
  const [pinPos,setPinPos]=useState({x:185,y:140});
  const [radius,setRadius]=useState(4.5);
  const [drawPoints,setDrawPoints]=useState<{x:number;y:number}[]>([]);
  const [isDrawing,setIsDrawing]=useState(false);
  const svgRef=useRef<SVGSVGElement>(null);
  const filtered=DISTRICTS.filter(d=>d.toLowerCase().includes(distSearch.toLowerCase()));
  const togDist=(d:string)=>setSelected(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);
  const radiusPx=radius*30;
  const getSVGCoords=(e:React.PointerEvent<SVGSVGElement>)=>{
    if(!svgRef.current)return{x:185,y:140};
    const rect=svgRef.current.getBoundingClientRect();
    const k=svgRef.current.clientWidth/rect.width||1;
    return{x:Math.round((e.clientX-rect.left)*k),y:Math.round((e.clientY-rect.top)*k)};
  };
  const onSVGDown=(e:React.PointerEvent<SVGSVGElement>)=>{
    e.currentTarget.setPointerCapture(e.pointerId);
    const p=getSVGCoords(e);
    if(mapMode==="pin"){setPinPos(p);}else{setIsDrawing(true);setDrawPoints([p]);}
  };
  const onSVGMove=(e:React.PointerEvent<SVGSVGElement>)=>{
    if(mapMode==="pin"&&e.buttons>0){setPinPos(getSVGCoords(e));}
    else if(mapMode==="draw"&&isDrawing){setDrawPoints(p=>[...p,getSVGCoords(e)]);}
  };
  const onSVGUp=()=>{if(isDrawing)setIsDrawing(false);};
  const handleSearch=()=>{
    let label="Berlin · Prenzlauer Berg";
    if(tab==="locations"&&selected.length>0){label=selected.join(", ");}
    else if(tab==="map"){label=mapMode==="pin"?`Pin · ${radius} km radius`:drawPoints.length>2?"Custom area":label;}
    setLocationLabel(label);pop();
  };
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,background:C.bg}}>
      <BackHeader title="Search location"/>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,padding:"0 20px",background:C.cardSolid}}>
        {(["locations","map"] as const).map(t=>(
          <TapBtn key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",fontSize:fs(13),fontWeight:600,color:tab===t?C.ink:C.sub,background:"none",border:"none",cursor:"pointer",borderBottom:tab===t?`2px solid ${C.navy}`:"2px solid transparent",marginBottom:-1,fontFamily:TF}}>
            {t==="locations"?"Locations":"Map"}
          </TapBtn>
        ))}
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {tab==="locations"?(
          <div style={{flex:1,overflow:"auto",padding:"14px 20px"}}>
            <input value={distSearch} onChange={e=>setDistSearch(e.target.value)} placeholder="Search districts…" style={{width:"100%",boxSizing:"border-box",...card(16) as any,border:"none",padding:"11px 16px",fontSize:fs(13),color:C.ink,outline:"none",marginBottom:10}}/>
            {filtered.map((d,i)=>(
              <Tap key={d} onClick={()=>togDist(d)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 4px",borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",minHeight:48}}>
                <span style={{fontSize:fs(14),color:C.ink}}>{d}</span>
                {selected.includes(d)&&<Check size={16} strokeWidth={2} style={{color:C.navy}}/>}
              </Tap>
            ))}
          </div>
        ):(
          <div style={{flex:1,display:"flex",flexDirection:"column"}}>
            <div style={{flexShrink:0,padding:"10px 20px 8px",background:C.cardSolid,borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",background:C.muted,borderRadius:10,padding:3,gap:3}}>
                {([["pin","Pin + Radius",MapPin],["draw","Draw Area",Pencil]] as const).map(([mode,lbl,Icon])=>{
                  const sel=mapMode===mode;
                  return(
                    <TapBtn key={mode} onClick={()=>setMapMode(mode)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"7px 0",borderRadius:8,background:sel?C.navy:"transparent",color:sel?"#FFF":C.sub,border:"none",cursor:"pointer",fontSize:fs(12),fontWeight:500}}>
                      <Icon size={12} strokeWidth={1.3}/>{lbl}
                    </TapBtn>
                  );
                })}
              </div>
              <p style={{fontSize:fs(11),color:C.sub,margin:"6px 0 0",textAlign:"center"}}>
                {mapMode==="pin"?"Drag the slider to adjust the radius.":"Draw a shape on the map to set your search area."}
              </p>
            </div>
            <div style={{flex:1,minHeight:320,position:"relative",overflow:"hidden",background:"#E8E4D8"}}>
              <BerlinMapBg/>
              <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=13.32%2C52.47%2C13.50%2C52.57&layer=mapnik" title="Berlin map" style={{position:"absolute",inset:0,width:"100%",height:"100%",border:"none",pointerEvents:"none",opacity:0.92}}/>
              <svg ref={svgRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",touchAction:"none"}} onPointerDown={onSVGDown} onPointerMove={onSVGMove} onPointerUp={onSVGUp} onPointerLeave={onSVGUp}>
                {mapMode==="pin"&&(
                  <>
                    <circle cx={pinPos.x} cy={pinPos.y} r={radiusPx} fill="rgba(15,67,136,0.09)" stroke={C.navy} strokeWidth="2"/>
                    <circle cx={pinPos.x} cy={pinPos.y} r={10} fill={C.navy}/>
                    <circle cx={pinPos.x} cy={pinPos.y} r={4.5} fill="#FFF"/>
                  </>
                )}
                {mapMode==="draw"&&drawPoints.length>1&&(
                  <polygon points={drawPoints.map(p=>`${p.x},${p.y}`).join(" ")} fill="rgba(15,67,136,0.09)" stroke={C.navy} strokeWidth="2" strokeLinejoin="round"/>
                )}
              </svg>
              <div style={{position:"absolute",top:10,right:10,display:"flex",flexDirection:"column",gap:6}}>
                {["+","−"].map(s=>(
                  <TapBtn key={s} style={{width:30,height:30,background:"rgba(255,255,255,0.95)",border:`1px solid ${C.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,color:C.ink,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.12)"}}>{s}</TapBtn>
                ))}
              </div>
              {mapMode==="draw"&&drawPoints.length>2&&(
                <TapBtn onClick={()=>setDrawPoints([])} style={{position:"absolute",bottom:10,right:10,background:"rgba(255,255,255,0.95)",border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 12px",fontSize:fs(12),fontWeight:600,color:C.ink,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.12)"}}>Clear</TapBtn>
              )}
            </div>
            {mapMode==="pin"&&(
              <div style={{flexShrink:0,padding:"10px 20px 8px",background:C.cardSolid,borderTop:`1px solid ${C.border}`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:fs(13),fontWeight:500,color:C.ink}}>Radius</span>
                  <span style={{fontSize:fs(13),fontWeight:600,color:C.navy}}>{radius} km</span>
                </div>
                <input type="range" min={0.5} max={10} step={0.5} value={radius} onChange={e=>setRadius(Number(e.target.value))} style={{width:"100%",accentColor:C.navy}}/>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{flexShrink:0,padding:"12px 20px 16px",background:C.cardSolid,borderTop:`1px solid ${C.border}`}}>
        <TapBtn onClick={handleSearch} style={{width:"100%",background:C.navy,color:"#FFF",fontSize:fs(11),fontWeight:600,padding:"14px 0",borderRadius:10,border:"none",cursor:"pointer",letterSpacing:"0.55px",textTransform:"uppercase"}}>Search</TapBtn>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// RESULTS
// ════════════════════════════════════════════════════════════════
const CHIPS=["Balcony/Terrace","Central Heating","New Kitchen","Parking","Furnished","Pet Friendly"];

function ResultsScreen({screen}:{screen:Extract<Screen,{name:"results"}>}){
  const {push,favorites,toggleFavorite,locationLabel,searchFilters}=useApp();
  const {C,fs,card}=useTheme();
  const sfCount=countActiveSF(searchFilters);
  const listings=ALL_LISTINGS.filter(l=>l.projectId.includes(screen.projectId));
  const filteredListings=searchFilters.intent==="buy"?[]:listings.filter(l=>{
    if(searchFilters.rooms&&searchFilters.rooms!=="Studio"){const min=parseInt(searchFilters.rooms)||0;const lr=parseInt(l.rooms)||1;if(lr<min)return false;}
    if(searchFilters.rooms==="Studio"&&!l.rooms.toLowerCase().includes("studio"))return false;
    return true;
  });
  const displayCount=sfCount>0?filteredListings.length:listings.length;
  const [chips,setChips]=useState<Set<string>>(new Set());
  const [sort,setSort]=useState("Most recent");
  const [sortOpen,setSortOpen]=useState(false);
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <div style={{padding:"10px 20px 8px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <BackBtn/>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8,...card(16),padding:"9px 14px",minWidth:0}}>
            <Search size={13} strokeWidth={1.3} style={{color:C.sub,flexShrink:0}}/><span style={{fontSize:fs(12),color:C.ink,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{locationLabel}</span>
          </div>
          <div style={{position:"relative",flexShrink:0}}>
            <TapBtn onClick={()=>push({name:"search-filters"})} style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:C.peach,borderRadius:10,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",border:"none",cursor:"pointer"}}>
              <SlidersHorizontal size={18} strokeWidth={1.3} style={{color:"#1F1F1E"}}/>
            </TapBtn>
            {sfCount>0&&<div style={{position:"absolute",top:-4,right:-4,minWidth:16,height:16,borderRadius:999,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",padding:"0 3px",boxSizing:"border-box"}}>
              <span style={{fontSize:9,fontWeight:700,color:"#FFF",lineHeight:1,fontFamily:"'Inter',system-ui,sans-serif"}}>{sfCount}</span>
            </div>}
          </div>
        </div>
        <div style={{display:"flex",gap:7,marginTop:10,overflowX:"auto",paddingBottom:2,scrollbarWidth:"none"}}>
          {CHIPS.map(c=>{const a=chips.has(c);return<TapBtn key={c} onClick={()=>setChips(p=>{const n=new Set(p);n.has(c)?n.delete(c):n.add(c);return n;})} style={{flexShrink:0,fontSize:fs(11),fontWeight:500,borderRadius:999,padding:"5px 12px",whiteSpace:"nowrap",background:a?C.navy:C.cardBg,color:a?"#FFF":C.ink,boxShadow:a?`0 1px 3px rgba(0,0,0,0.12)`:C.cardShadow,border:"none",cursor:"pointer"}}>{c}</TapBtn>;})}
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 20px 12px"}}>
        <p style={{fontSize:fs(19),fontWeight:500,color:C.ink,margin:0,fontFamily:TF}}>{displayCount} <span style={{fontSize:fs(14),fontWeight:400,color:C.sub}}>{sfCount>0?"Filtered":"Found"}</span></p>
        <div style={{position:"relative"}}>
          <TapBtn onClick={()=>setSortOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:4,fontSize:fs(11),fontWeight:500,color:C.ink,...card(999),border:"none",borderRadius:999,padding:"6px 11px",cursor:"pointer"}}>{sort}<ChevronDown size={9} strokeWidth={2}/></TapBtn>
          {sortOpen&&<div style={{position:"absolute",top:"calc(100% + 4px)",right:0,...card(16),zIndex:10,minWidth:150,overflow:"hidden",border:"none"}}>
            {["Most recent","Price: low–high","Price: high–low","Best match"].map(o=><TapBtn key={o} onClick={()=>{setSort(o);setSortOpen(false);}} style={{display:"block",width:"100%",textAlign:"left",padding:"9px 14px",fontSize:fs(12),fontWeight:500,color:o===sort?C.navy:C.sub,background:o===sort?C.navyBg:"transparent",borderBottom:`1px solid ${C.border}`,cursor:"pointer",border:"none"}}>{o}</TapBtn>)}
          </div>}
        </div>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:16}}>
        {listings.map(l=>(
          <Tap key={l.id} onClick={()=>push({name:"listing-detail",listingId:l.id})} style={{...card(32),overflow:"hidden"}}>
            <Carousel photos={l.photos} saved={favorites.has(l.id)} onSave={()=>toggleFavorite(l.id)}/>
            <div style={{padding:"12px 18px 14px"}}>
              <p style={{fontSize:fs(13),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>{l.price} · {l.size} · {l.rooms}</p>
              <p style={{fontSize:fs(12),color:C.ink,lineHeight:1.4,margin:"0 0 3px"}}>{l.title}</p>
              <p style={{fontSize:fs(11),color:C.sub,margin:"0 0 10px",lineHeight:1.4}}>{l.address}</p>
              <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                <span style={{fontSize:fs(10),fontWeight:500,background:C.muted,color:C.sub,padding:"2px 8px",borderRadius:999}}>Verified</span>
                <span style={{fontSize:fs(10),color:C.sub}}>· Response rate</span>
                <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(d=><span key={d} style={{width:5,height:5,borderRadius:999,background:d<=4?C.navy:C.muted}}/>)}</div>
              </div>
            </div>
          </Tap>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// LISTING DETAIL
// ════════════════════════════════════════════════════════════════
function ListingDetailScreen({screen}:{screen:Extract<Screen,{name:"listing-detail"}>}){
  const {favorites,toggleFavorite,isApplied,applyToListing,switchTab,push,appProfile}=useApp();
  const profilePct=calcProfilePct(appProfile);
  const {C,fs,card}=useTheme();
  const l=ALL_LISTINGS.find(x=>x.id===screen.listingId);
  const [pidx,setPidx]=useState(0);
  const [done,setDone]=useState(false);
  if(!l)return<div style={{padding:32,color:C.ink}}>Listing not found</div>;
  const applied=isApplied(l.id);
  const handleApply=()=>{applyToListing(l.id);setDone(true);setTimeout(()=>switchTab("applied"),1400);};
  return (
    <div style={{background:C.bg}}>
      {/* sticky transparent header */}
      <div style={{position:"sticky",top:0,zIndex:20,height:56,marginBottom:-56,pointerEvents:"none",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 20px"}}>
        <div style={{pointerEvents:"auto"}}><BackBtn/></div>
        <div style={{display:"flex",gap:8,pointerEvents:"auto"}}>
          <TapBtn onClick={()=>toggleFavorite(l.id)} style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.92)",borderRadius:999,boxShadow:"0 1px 4px rgba(0,0,0,0.15)",border:"none",cursor:"pointer"}}>
            <Heart size={14} strokeWidth={1.3} style={{color:favorites.has(l.id)?"#E5373A":C.ink,fill:favorites.has(l.id)?"#E5373A":"none"}}/>
          </TapBtn>
          <TapBtn style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.92)",borderRadius:999,boxShadow:"0 1px 4px rgba(0,0,0,0.15)",border:"none",cursor:"pointer"}}>
            <Share2 size={14} strokeWidth={1.3} style={{color:C.ink}}/>
          </TapBtn>
        </div>
      </div>
      {/* photo */}
      <div style={{height:220,position:"relative",overflow:"hidden",borderRadius:24,margin:"0 20px",boxShadow:C.cardShadow}}>
        <img src={l.photos[pidx]} alt={l.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.22) 0%,transparent 50%)"}}/>
        {l.photos.length>1&&<div style={{position:"absolute",bottom:10,left:0,right:0,display:"flex",justifyContent:"center",gap:5}}>{l.photos.map((_,i)=><TapBtn key={i} onClick={()=>setPidx(i)} style={{borderRadius:999,transition:"all 0.2s",background:"#FFF",opacity:i===pidx?1:0.5,width:i===pidx?14:6,height:6,border:"none",cursor:"pointer"}}/>)}</div>}
      </div>
      <div style={{padding:"18px 20px 0",display:"flex",flexDirection:"column",gap:16}}>
        <div>
          <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:10}}><span style={{fontSize:fs(24),fontWeight:500,color:C.ink,fontFamily:TF}}>{l.price}</span><span style={{fontSize:fs(12),color:C.sub}}>/ month</span></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[{label:"Size",value:l.size},{label:"Rooms",value:l.rooms},{label:"Floor",value:l.floor}].map(s=>(
              <div key={s.label} style={{background:C.muted,borderRadius:12,padding:"10px 0",textAlign:"center"}}>
                <p style={{fontSize:fs(10),color:C.sub,margin:"0 0 2px"}}>{s.label}</p>
                <p style={{fontSize:fs(11),fontWeight:600,color:C.ink,margin:0}}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div><h2 style={{fontSize:fs(15),fontWeight:500,color:C.ink,lineHeight:1.35,margin:"0 0 3px",fontFamily:TF}}>{l.title}</h2><p style={{fontSize:fs(11),color:C.sub,margin:0}}>{l.address}</p></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{label:"Available from",value:l.available},{label:"Deposit",value:l.deposit}].map(s=>(
            <div key={s.label} style={{...card(16),padding:"10px 14px"}}>
              <p style={{fontSize:fs(10),color:C.sub,margin:"0 0 2px"}}>{s.label}</p><p style={{fontSize:fs(11),fontWeight:600,color:C.ink,margin:0}}>{s.value}</p>
            </div>
          ))}
        </div>
        <div><p style={{fontSize:fs(10),fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:"0.8px",margin:"0 0 7px"}}>Description</p><p style={{fontSize:fs(12),color:C.sub,lineHeight:1.6,margin:0}}>{l.description}</p></div>
        <div>
          <p style={{fontSize:fs(10),fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:"0.8px",margin:"0 0 7px"}}>Features</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{l.features.map(f=><span key={f} style={{display:"flex",alignItems:"center",gap:3,fontSize:fs(11),fontWeight:500,background:C.muted,color:C.ink,padding:"4px 10px",borderRadius:999}}><Check size={9} strokeWidth={2.5}/>{f}</span>)}</div>
        </div>
        <div style={{...card(32),display:"flex",alignItems:"center",gap:12,padding:14}}>
          <div style={{width:40,height:40,borderRadius:999,background:C.muted,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={16} strokeWidth={1.3} style={{color:C.sub}}/></div>
          <div style={{flex:1,minWidth:0}}>
            <p style={{fontSize:fs(12),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>Verified advertiser</p>
            <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:fs(11),color:C.sub}}>Response rate</span><div style={{display:"flex",gap:2,marginLeft:3}}>{[1,2,3,4,5].map(d=><span key={d} style={{width:5,height:5,borderRadius:999,background:d<=4?C.navy:C.muted}}/>)}</div></div>
          </div>
        </div>
      </div>
      {/* Application profile completeness card */}
      <div style={{padding:"16px 20px 12px"}}>
        <Tap onClick={()=>push({name:"application-profile"})} style={{...card(20),padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
          {profilePct===100?(
            <>
              <Check size={14} strokeWidth={2.5} style={{color:C.teal,flexShrink:0}}/>
              <span style={{fontSize:fs(12),fontWeight:500,color:C.teal,flex:1}}>Your application profile is complete</span>
            </>
          ):(
            <>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:fs(12),fontWeight:500,color:C.ink,margin:"0 0 5px"}}>Application profile {profilePct}% complete</p>
                <div style={{height:4,background:C.border,borderRadius:999,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${profilePct}%`,background:C.navy,borderRadius:999}}/>
                </div>
              </div>
              <span style={{fontSize:fs(12),fontWeight:600,color:C.navy,flexShrink:0}}>Complete</span>
              <ChevronRight size={12} strokeWidth={1.5} style={{color:C.sub,flexShrink:0}}/>
            </>
          )}
        </Tap>
      </div>
      <div style={{padding:"0 20px 28px"}}>
        {done
          ?<div style={{width:"100%",background:"#E8F7EE",borderRadius:10,padding:"13px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:7,boxShadow:"inset 0 0 0 1px #A3D9B8"}}><CheckCircle2 size={16} strokeWidth={1.5} style={{color:"#1A7940"}}/><span style={{fontSize:fs(12),fontWeight:600,color:"#1A7940"}}>Application sent! Going to Applied…</span></div>
          :<TapBtn onClick={handleApply} disabled={applied} style={{width:"100%",background:applied?C.muted:C.navy,color:applied?C.sub:"#FFF",fontSize:fs(11),fontWeight:600,padding:"14px 0",borderRadius:10,border:"none",cursor:applied?"default":"pointer",letterSpacing:"0.55px",textTransform:"uppercase"}}>
            {applied?"Already applied ✓":"Apply now"}
          </TapBtn>
        }
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MESSAGES + CHAT
// ════════════════════════════════════════════════════════════════
function MessagesScreen(){
  const {push,contacts}=useApp();
  const {C,fs,card}=useTheme();
  const sl:React.CSSProperties={fontSize:fs(10),fontWeight:600,letterSpacing:"0.8px",color:C.sub,textTransform:"uppercase",margin:"0 0 8px"};
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <BackHeader title="Messages"/>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
        {contacts.map(c=>(
          <Tap key={c.id} onClick={()=>push({name:"chat",contactId:c.id})} style={{...card(32),display:"flex",alignItems:"center",gap:12,padding:18,minHeight:72}}>
            <div style={{position:"relative",flexShrink:0}}>
              <div style={{width:44,height:44,borderRadius:999,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:fs(12),fontWeight:700,color:"#FFF",fontFamily:TF}}>{c.avatar}</div>
              {c.unread>0&&<div style={{position:"absolute",top:-2,right:-2,width:16,height:16,borderRadius:999,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 2px "+C.bg}}><span style={{fontSize:fs(8),fontWeight:700,color:"#FFF"}}>{c.unread}</span></div>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                <span style={{fontSize:fs(13),fontWeight:500,color:C.ink,fontFamily:TF}}>{c.name}</span>
                <span style={{fontSize:fs(10),color:C.sub}}>{c.thread[c.thread.length-1]?.time}</span>
              </div>
              <p style={{fontSize:fs(11),color:C.sub,margin:0}}>{c.listing}</p>
              <p style={{fontSize:fs(11),color:C.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",margin:"1px 0 0"}}>{c.thread[c.thread.length-1]?.text}</p>
            </div>
            <ChevronRight size={13} strokeWidth={1.3} style={{color:C.sub,flexShrink:0}}/>
          </Tap>
        ))}
      </div>
    </div>
  );
}

function ChatScreen({screen}:{screen:Extract<Screen,{name:"chat"}>}){
  const {contacts,markRead,sendMessage}=useApp();
  const {C,fs,card}=useTheme();
  const c=contacts.find(x=>x.id===screen.contactId);
  const [input,setInput]=useState("");
  const bot=useRef<HTMLDivElement>(null);
  useEffect(()=>{markRead(screen.contactId);setTimeout(()=>bot.current?.scrollIntoView({behavior:"auto"}),60);},[screen.contactId]);
  useEffect(()=>{bot.current?.scrollIntoView({behavior:"smooth"});},[c?.thread.length]);
  if(!c)return<div style={{padding:32,color:C.ink}}>Not found</div>;
  const send=()=>{const t=input.trim();if(!t)return;sendMessage(c.id,t);setInput("");};
  return (
    <div style={{background:C.bg,display:"flex",flexDirection:"column",flex:1}}>
      <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:12,padding:"14px 20px 12px",background:C.cardSolid,borderBottom:`1px solid ${C.border}`}}>
        <BackBtn/>
        <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
          <div style={{width:36,height:36,borderRadius:999,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:fs(10),fontWeight:700,color:"#FFF",flexShrink:0,fontFamily:TF}}>{c.avatar}</div>
          <div><p style={{fontSize:fs(13),fontWeight:500,color:C.ink,margin:0,lineHeight:1,fontFamily:TF}}>{c.name}</p><p style={{fontSize:fs(10),color:C.sub,margin:"2px 0 0"}}>{c.listing}</p></div>
        </div>
      </div>
      <div style={{flex:1,minHeight:0,overflowY:"auto",padding:"12px 20px 6px",display:"flex",flexDirection:"column",gap:8}}>
        {c.thread.map(m=>(
          <div key={m.id} style={{display:"flex",justifyContent:m.fromMe?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"76%",padding:"10px 14px",borderRadius:18,fontSize:fs(12),lineHeight:1.45,...(m.fromMe?{background:C.teal,color:"#FFF",borderBottomRightRadius:4}:{...card(18),border:"none",color:C.ink,borderBottomLeftRadius:4})}}>
              {m.text}<p style={{fontSize:fs(10),marginTop:3,margin:"4px 0 0",color:m.fromMe?"rgba(255,255,255,0.55)":C.sub}}>{m.time}</p>
            </div>
          </div>
        ))}
        <div ref={bot}/>
      </div>
      <div style={{flexShrink:0,background:C.cardSolid,padding:"8px 20px 14px",borderTop:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message…" style={{flex:1,...card(16) as any,border:"none",padding:"10px 14px",fontSize:fs(13),color:C.ink,outline:"none",minHeight:42}}/>
          <TapBtn onClick={send} style={{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",background:C.navy,borderRadius:10,flexShrink:0,border:"none",cursor:"pointer"}}><Send size={14} strokeWidth={1.3} style={{color:"#FFF"}}/></TapBtn>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// LIST PROPERTY + DISCOVER PLUS
// ════════════════════════════════════════════════════════════════
function ListPropertyScreen(){
  const {C,fs,card}=useTheme();
  const [atype,setAtype]=useState("Apartment");
  const sl:React.CSSProperties={fontSize:fs(10),fontWeight:600,letterSpacing:"0.8px",color:C.sub,textTransform:"uppercase",margin:"0 0 7px"};
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <BackHeader title="List Your Property"/>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:20}}>
        <div style={{...card(32),padding:18}}>
          <p style={{...sl,margin:"0 0 12px"}}>Steps to publish</p>
          {["Add photos","Set price","Add description","Publish"].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<3?10:0}}>
              <div style={{width:28,height:28,borderRadius:999,display:"flex",alignItems:"center",justifyContent:"center",fontSize:fs(11),fontWeight:700,flexShrink:0,background:i===0?C.navy:C.muted,color:i===0?"#FFF":C.sub,fontFamily:TF}}>{i+1}</div>
              <span style={{fontSize:fs(13),fontWeight:500,color:i===0?C.ink:C.sub,fontFamily:TF}}>{s}</span>
            </div>
          ))}
        </div>
        <Tap style={{border:`2px dashed ${C.border}`,borderRadius:32,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 0",gap:10,background:C.cardBg}}>
          <div style={{width:48,height:48,borderRadius:999,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center"}}><Plus size={22} strokeWidth={1.5} style={{color:C.navy}}/></div>
          <p style={{fontSize:fs(13),fontWeight:500,color:C.ink,margin:0,fontFamily:TF}}>Add photos</p>
          <p style={{fontSize:fs(11),color:C.sub,textAlign:"center",padding:"0 24px",margin:0}}>Listings with 5+ photos get 3× more inquiries</p>
        </Tap>
        <div>
          <p style={sl}>Property type</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {["Apartment","House","Plot","Studio","Room","Other"].map(t=>{const a=atype===t;return(
              <TapBtn key={t} onClick={()=>setAtype(t)} style={{position:"relative",padding:"12px 0",borderRadius:16,border:"none",cursor:"pointer",minHeight:46,transition:"all 0.15s",fontSize:fs(12),fontWeight:500,color:a?C.navy:C.ink,...(a?{background:C.navyBg,boxShadow:`inset 0 0 0 2px ${C.navy},0 1px 3px rgba(0,0,0,0.06)`}:{...card(16)}),fontFamily:TF}}>
                {a&&<span style={{position:"absolute",top:5,right:5}}><CheckCircle2 size={10} strokeWidth={1.5} style={{color:C.navy}}/></span>}{t}
              </TapBtn>
            );})}
          </div>
        </div>
        <TapBtn style={{width:"100%",background:C.navy,color:"#FFF",fontSize:fs(11),fontWeight:600,padding:"14px 0",borderRadius:10,border:"none",cursor:"pointer",letterSpacing:"0.55px",textTransform:"uppercase"}}>Continue</TapBtn>
      </div>
    </div>
  );
}

function DiscoverPlusScreen(){
  const {C,fs,card}=useTheme();
  const feats=[{I:Star,t:"Priority Listing",d:"Your applications appear first to landlords"},{I:Shield,t:"Verified Badge",d:"Build trust with a verified profile badge"},{I:Bell,t:"Instant Alerts",d:"Get notified seconds after a new listing posts"},{I:User,t:"Dedicated Support",d:"Priority access to our housing specialists"}];
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <BackHeader title="Discover Plus+"/>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:C.navy,borderRadius:32,padding:"24px 24px 28px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",boxShadow:"0 2px 8px rgba(15,67,136,0.18)"}}>
          <div style={{width:62,height:62,borderRadius:999,background:"rgba(255,255,255,0.10)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><CheckCircle2 size={28} strokeWidth={1.3} style={{color:"#FFF"}}/></div>
          <h2 style={{color:"#FFF",fontSize:fs(20),fontWeight:500,margin:"0 0 7px",fontFamily:TF}}>Discover Plus+</h2>
          <p style={{color:"rgba(255,255,255,0.55)",fontSize:fs(12),lineHeight:1.55,margin:"0 0 14px"}}>The premium plan for serious apartment seekers in Berlin's competitive market.</p>
          <div style={{display:"flex",alignItems:"baseline",gap:4}}><span style={{color:"#FFF",fontSize:fs(28),fontWeight:500,fontFamily:TF}}>9.99€</span><span style={{color:"rgba(255,255,255,0.5)",fontSize:fs(12)}}>/ month</span></div>
        </div>
        {feats.map(f=>(
          <div key={f.t} style={{...card(32),display:"flex",alignItems:"flex-start",gap:12,padding:18}}>
            <div style={{width:40,height:40,borderRadius:10,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><f.I size={17} strokeWidth={1.3} style={{color:C.navy}}/></div>
            <div><p style={{fontSize:fs(13),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>{f.t}</p><p style={{fontSize:fs(11),color:C.sub,lineHeight:1.45,margin:0}}>{f.d}</p></div>
          </div>
        ))}
        <TapBtn style={{width:"100%",background:C.navy,color:"#FFF",fontSize:fs(11),fontWeight:600,padding:"14px 0",borderRadius:10,border:"none",cursor:"pointer",letterSpacing:"0.55px",textTransform:"uppercase",marginTop:4}}>Start 7-day free trial</TapBtn>
        <p style={{textAlign:"center",fontSize:fs(11),color:C.sub,margin:0}}>Cancel anytime. No commitment.</p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ALERTS / FAVORITES / APPLIED TABS
// ════════════════════════════════════════════════════════════════
function AlertsScreen(){
  const {alerts,markAlertRead,push}=useApp();
  const {C,fs,card}=useTheme();
  const unread=alerts.filter(a=>!a.read).length;
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 14px"}}>
        <h1 style={{fontSize:fs(20),fontWeight:500,color:C.ink,margin:0,fontFamily:TF}}>Alerts</h1>
        {unread>0&&<span style={{fontSize:fs(10),fontWeight:600,color:C.navy,background:C.navyBg,padding:"3px 10px",borderRadius:999,letterSpacing:"0.5px"}}>{unread} new</span>}
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:10}}>
        {alerts.map(a=>(
          <Tap key={a.id} onClick={()=>{markAlertRead(a.id);if(a.listingId)push({name:"listing-detail",listingId:a.listingId});}} style={{display:"flex",alignItems:"flex-start",gap:12,padding:18,borderRadius:32,minHeight:64,...(a.read?{...card(32)}:{background:C.navyBg,boxShadow:C.cardShadow})}}>
            <div style={{width:34,height:34,borderRadius:999,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:a.read?C.muted:C.navy}}><Bell size={13} strokeWidth={1.3} style={{color:a.read?C.sub:"#FFF"}}/></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
                <p style={{fontSize:fs(12),fontWeight:500,color:C.ink,lineHeight:1.3,margin:0,fontFamily:TF}}>{a.title}</p>
                <span style={{fontSize:fs(10),color:C.sub,flexShrink:0}}>{a.time}</span>
              </div>
              <p style={{fontSize:fs(11),color:C.sub,marginTop:2,lineHeight:1.4,margin:"3px 0 0"}}>{a.body}</p>
            </div>
            {!a.read&&<div style={{width:6,height:6,borderRadius:999,background:C.navy,flexShrink:0,marginTop:4}}/>}
          </Tap>
        ))}
      </div>
    </div>
  );
}

function FavoritesScreen(){
  const {push,favorites,toggleFavorite}=useApp();
  const {C,fs,card}=useTheme();
  const saved=ALL_LISTINGS.filter(l=>favorites.has(l.id));
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <div style={{padding:"16px 20px 12px"}}><h1 style={{fontSize:fs(20),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>Favorites</h1><p style={{fontSize:fs(12),color:C.sub,margin:0}}>{saved.length} saved</p></div>
      {saved.length===0
        ?<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"48px 32px",gap:12,textAlign:"center"}}>
           <div style={{width:62,height:62,borderRadius:999,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center"}}><Heart size={26} strokeWidth={1.3} style={{color:C.navy}}/></div>
           <p style={{fontSize:fs(14),fontWeight:500,color:C.ink,margin:0,fontFamily:TF}}>No saved listings yet</p>
           <p style={{fontSize:fs(12),color:C.sub,margin:0}}>Tap the heart icon on any listing to save it here.</p>
         </div>
        :<div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:14}}>
          {saved.map(l=>(
            <div key={l.id} style={{...card(32),overflow:"hidden"}}>
              <Tap onClick={()=>push({name:"listing-detail",listingId:l.id})}>
                <div style={{position:"relative",height:160}}>
                  <img src={l.photo} alt={l.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  <TapBtn onClick={()=>toggleFavorite(l.id)} style={{position:"absolute",top:9,right:9,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.92)",borderRadius:999,border:"none",cursor:"pointer"}}>
                    <Heart size={13} style={{color:"#E5373A",fill:"#E5373A"}}/>
                  </TapBtn>
                </div>
                <div style={{padding:"12px 18px 14px"}}>
                  <p style={{fontSize:fs(12),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>{l.price} · {l.size} · {l.rooms}</p>
                  <p style={{fontSize:fs(12),color:C.ink,lineHeight:1.4,margin:"0 0 2px"}}>{l.title}</p>
                  <p style={{fontSize:fs(11),color:C.sub,margin:0}}>{l.address}</p>
                </div>
              </Tap>
            </div>
          ))}
         </div>
      }
    </div>
  );
}

const S_STEPS=["Submitted","Viewed by landlord","Response received"];
const S_IDX:Record<string,number>={submitted:0,viewed:1,no_response:0};
const S_LBL:Record<string,{label:string;bg:string;clr:string}>={
  submitted:{label:"Submitted",bg:"#E8EEF8",clr:"#0F4388"},
  viewed:{label:"Viewed by landlord",bg:"#E6F7EE",clr:"#1A7940"},
  no_response:{label:"No response yet",bg:"#F0F0F3",clr:"#5C5C66"},
};

function ProgressLine({status,C,fs}:{status:string;C:ColorSet;fs:(n:number)=>number}){
  const reached=S_IDX[status]??0;
  return (
    <div style={{display:"flex",alignItems:"center",marginTop:10}}>
      {S_STEPS.map((step,i)=>(
        <React.Fragment key={step}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:0}}>
            <div style={{width:10,height:10,borderRadius:999,border:"2px solid",flexShrink:0,borderColor:i<=reached?C.navy:C.border,background:i<=reached?C.navy:"#FFF"}}/>
            <p style={{fontSize:fs(8),color:C.sub,marginTop:2,textAlign:"center",lineHeight:1.2,maxWidth:46,margin:"2px 0 0"}}>{step}</p>
          </div>
          {i<S_STEPS.length-1&&<div style={{flex:1,height:2,margin:"0 2px 14px",background:i<reached?C.navy:C.border}}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

function AppliedScreen(){
  const {push,applications}=useApp();
  const {C,fs,card}=useTheme();
  return (
    <div style={{background:C.bg,paddingBottom:24}}>
      <div style={{padding:"16px 20px 12px"}}><h1 style={{fontSize:fs(20),fontWeight:500,color:C.ink,margin:"0 0 2px",fontFamily:TF}}>My Applications</h1><p style={{fontSize:fs(12),color:C.sub,margin:0}}>{applications.length} active</p></div>
      {applications.length===0
        ?<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"48px 32px",gap:12,textAlign:"center"}}>
           <div style={{width:62,height:62,borderRadius:999,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center"}}><CheckCircle2 size={26} strokeWidth={1.3} style={{color:C.navy}}/></div>
           <p style={{fontSize:fs(14),fontWeight:500,color:C.ink,margin:0,fontFamily:TF}}>No applications yet</p>
           <p style={{fontSize:fs(12),color:C.sub,margin:0}}>Apply to listings and track them here.</p>
         </div>
        :<div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
          {applications.map(app=>{
            const l=ALL_LISTINGS.find(x=>x.id===app.listingId);
            if(!l)return null;
            const s=S_LBL[app.status]??S_LBL.no_response;
            return(
              <Tap key={app.listingId} onClick={()=>push({name:"listing-detail",listingId:l.id})} style={{...card(32),overflow:"hidden"}}>
                <div style={{display:"flex"}}>
                  <img src={l.photo} alt={l.title} style={{width:96,objectFit:"cover",flexShrink:0,height:108}}/>
                  <div style={{flex:1,padding:"10px 14px",minWidth:0}}>
                    <p style={{fontSize:fs(12),fontWeight:500,color:C.ink,lineHeight:1.3,margin:"0 0 2px",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",fontFamily:TF}}>{l.title}</p>
                    <p style={{fontSize:fs(11),fontWeight:500,color:C.ink,margin:"0 0 2px"}}>{l.price} · {l.rooms}</p>
                    <p style={{fontSize:fs(10),color:C.sub,margin:"0 0 5px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.address}</p>
                    <p style={{fontSize:fs(10),color:C.sub,margin:"0 0 5px"}}>Applied {app.appliedDate}</p>
                    <div style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 8px",borderRadius:999,background:s.bg}}>
                      <span style={{width:5,height:5,borderRadius:999,background:s.clr,flexShrink:0}}/><span style={{fontSize:fs(10),fontWeight:600,color:s.clr}}>{s.label}</span>
                    </div>
                  </div>
                </div>
                <div style={{padding:"0 14px 12px"}}><ProgressLine status={app.status} C={C} fs={fs}/></div>
              </Tap>
            );
          })}
         </div>
      }
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// APPLICATION PROFILE SCREEN
// ════════════════════════════════════════════════════════════════
const SUGGESTED_DOCS=[
  {name:"Proof of income (last 3 payslips)",size:"350 KB"},
  {name:"SCHUFA credit report",size:"420 KB"},
  {name:"ID / passport",size:"1.2 MB"},
  {name:"Rental debt-free certificate",size:"180 KB"},
  {name:"Employment contract",size:"890 KB"},
];

function ApplicationProfileScreen(){
  const {pop,appProfile,setAppProfile}=useApp();
  const {C,fs,card}=useTheme();
  const [fullName,setFullName]=useState(appProfile.fullName);
  const [email,setEmail]=useState(appProfile.email);
  const [phone,setPhone]=useState(appProfile.phone);
  const [occupation,setOccupation]=useState(appProfile.occupation);
  const [employer,setEmployer]=useState(appProfile.employer);
  const [monthlyIncome,setMonthlyIncome]=useState(appProfile.monthlyIncome);
  const [adults,setAdults]=useState(appProfile.adults);
  const [children,setChildren]=useState(appProfile.children);
  const [pets,setPets]=useState(appProfile.pets);
  const [introduction,setIntroduction]=useState(appProfile.introduction);
  const [applicationMessage,setApplicationMessage]=useState(appProfile.applicationMessage);
  const [documents,setDocuments]=useState(appProfile.documents);
  const [saved,setSaved]=useState(false);
  const [focused,setFocused]=useState<string|null>(null);

  const pct=calcProfilePct({fullName,email,phone,occupation,employer,monthlyIncome,adults,children,pets,introduction,applicationMessage,documents});

  const handleSave=()=>{
    setAppProfile({fullName,email,phone,occupation,employer,monthlyIncome,adults,children,pets,introduction,applicationMessage,documents});
    setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  };

  const addDoc=(d:{name:string;size:string})=>setDocuments(p=>[...p,{id:Date.now(),name:d.name,size:d.size}]);
  const removeDoc=(id:number)=>setDocuments(p=>p.filter(x=>x.id!==id));
  const existingNames=documents.map(d=>d.name);
  const suggestVisible=SUGGESTED_DOCS.filter(d=>!existingNames.includes(d.name));

  const sl:React.CSSProperties={fontSize:fs(10),fontWeight:600,letterSpacing:"0.8px",color:C.sub,textTransform:"uppercase",margin:"0 0 10px"};

  const inputSty=(field:string):React.CSSProperties=>({
    width:"100%",boxSizing:"border-box",height:56,padding:"0 16px",borderRadius:16,
    border:"none",outline:"none",fontSize:fs(14),color:C.ink,
    fontFamily:"'Inter',system-ui,sans-serif",background:C.cardBg,
    boxShadow:focused===field?`inset 0 0 0 2px ${C.navy},0 1px 3px rgba(0,0,0,0.08)`:C.cardShadow,
    caretColor:C.navy,transition:"box-shadow 0.15s",
  });

  const rowCard=(active?:boolean):React.CSSProperties=>({
    display:"flex",alignItems:"center",height:56,borderRadius:16,
    background:C.cardBg,boxShadow:active?`inset 0 0 0 2px ${C.navy},0 1px 3px rgba(0,0,0,0.08)`:C.cardShadow,
    padding:"0 16px",transition:"box-shadow 0.15s",
  });

  const Divider=()=><div style={{height:1,background:C.border,margin:"20px 0"}}/>;

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,background:C.bg}}>
      {/* Header */}
      <div style={{flexShrink:0,background:C.cardSolid}}>
        <div style={{display:"flex",alignItems:"center",padding:"12px 20px",gap:12}}>
          <TapBtn onClick={pop} style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:C.peach,borderRadius:10,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",border:"none",cursor:"pointer",flexShrink:0}}>
            <ArrowLeft size={18} strokeWidth={1.3} style={{color:"#1F1F1E"}}/>
          </TapBtn>
          <h1 style={{flex:1,fontSize:fs(17),fontWeight:500,color:C.ink,margin:0,fontFamily:TF,lineHeight:1}}>Application Profile</h1>
          <TapBtn onClick={handleSave} style={{background:C.navy,color:"#FFF",fontSize:fs(12),fontWeight:600,padding:"7px 16px",borderRadius:999,border:"none",cursor:"pointer",flexShrink:0,letterSpacing:"0.2px"}}>Save</TapBtn>
        </div>
        <div style={{height:1,background:C.border}}/>
      </div>

      {/* Save toast */}
      {saved&&<div style={{flexShrink:0,display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:"#E8F7EE",borderBottom:"1px solid #A3D9B8"}}>
        <CheckCircle2 size={14} strokeWidth={1.5} style={{color:"#1A7940"}}/><span style={{fontSize:fs(13),fontWeight:500,color:"#1A7940"}}>Profile saved</span>
      </div>}

      {/* Scrollable content */}
      <div style={{flex:1,minHeight:0,overflowY:"auto",padding:"20px"}}>

        {/* Completeness card */}
        <div style={{...card(20),padding:"16px 18px",marginBottom:24}}>
          <p style={{fontSize:fs(14),fontWeight:500,color:C.ink,margin:"0 0 10px",fontFamily:TF}}>Profile {pct}% complete</p>
          <div style={{height:6,background:C.border,borderRadius:999,overflow:"hidden",marginBottom:9}}>
            <div style={{height:"100%",width:`${pct}%`,background:pct===100?C.teal:C.navy,borderRadius:999,transition:"width 0.3s"}}/>
          </div>
          {pct===100?(
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <Check size={12} strokeWidth={2.5} style={{color:C.teal}}/>
              <span style={{fontSize:fs(12),color:C.teal,fontWeight:500}}>Ready to apply</span>
            </div>
          ):(
            <span style={{fontSize:fs(12),color:C.sub}}>Complete your profile to apply to apartments faster.</span>
          )}
        </div>

        {/* 1. PERSONAL INFORMATION */}
        <p style={sl}>Personal Information</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full name"
            onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} style={inputSty("name")}/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address"
            onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)} style={inputSty("email")}/>
          <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number"
            onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)} style={inputSty("phone")}/>
        </div>

        <Divider/>

        {/* 2. EMPLOYMENT */}
        <p style={sl}>Employment</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <input value={occupation} onChange={e=>setOccupation(e.target.value)} placeholder="Occupation / job title"
            onFocus={()=>setFocused("occ")} onBlur={()=>setFocused(null)} style={inputSty("occ")}/>
          <input value={employer} onChange={e=>setEmployer(e.target.value)} placeholder="Employer / company"
            onFocus={()=>setFocused("emp")} onBlur={()=>setFocused(null)} style={inputSty("emp")}/>
          <div style={{...rowCard(focused==="income"),gap:8}}>
            <input type="number" value={monthlyIncome} onChange={e=>setMonthlyIncome(e.target.value)} placeholder="Monthly net income"
              onFocus={()=>setFocused("income")} onBlur={()=>setFocused(null)}
              style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:fs(14),color:C.ink,fontFamily:"'Inter',system-ui,sans-serif",caretColor:C.navy}}/>
            <span style={{fontSize:fs(13),color:C.sub,flexShrink:0,fontWeight:500}}>EUR / mo</span>
          </div>
        </div>

        <Divider/>

        {/* 3. HOUSEHOLD */}
        <p style={sl}>Household</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {/* Adults */}
          <div style={rowCard()}>
            <span style={{flex:1,fontSize:fs(14),color:C.ink}}>Adults</span>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <TapBtn onClick={()=>setAdults(v=>Math.max(1,v-1))} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:C.muted,borderRadius:999,border:"none",cursor:"pointer"}}>
                <Minus size={12} strokeWidth={2} style={{color:C.ink}}/>
              </TapBtn>
              <span style={{fontSize:fs(15),fontWeight:600,color:C.ink,minWidth:20,textAlign:"center"}}>{adults}</span>
              <TapBtn onClick={()=>setAdults(v=>v+1)} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:C.muted,borderRadius:999,border:"none",cursor:"pointer"}}>
                <Plus size={12} strokeWidth={2} style={{color:C.ink}}/>
              </TapBtn>
            </div>
          </div>
          {/* Children */}
          <div style={rowCard()}>
            <span style={{flex:1,fontSize:fs(14),color:C.ink}}>Children</span>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <TapBtn onClick={()=>setChildren(v=>Math.max(0,v-1))} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:C.muted,borderRadius:999,border:"none",cursor:"pointer"}}>
                <Minus size={12} strokeWidth={2} style={{color:C.ink}}/>
              </TapBtn>
              <span style={{fontSize:fs(15),fontWeight:600,color:C.ink,minWidth:20,textAlign:"center"}}>{children}</span>
              <TapBtn onClick={()=>setChildren(v=>v+1)} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:C.muted,borderRadius:999,border:"none",cursor:"pointer"}}>
                <Plus size={12} strokeWidth={2} style={{color:C.ink}}/>
              </TapBtn>
            </div>
          </div>
          {/* Pets */}
          <div style={rowCard()}>
            <span style={{flex:1,fontSize:fs(14),color:C.ink}}>Pets</span>
            <Toggle value={pets} onChange={setPets}/>
          </div>
        </div>

        <Divider/>

        {/* 4. PERSONAL INTRODUCTION */}
        <p style={sl}>Personal Introduction</p>
        <textarea value={introduction} onChange={e=>setIntroduction(e.target.value)}
          placeholder="Tell landlords about yourself, your lifestyle and why you're a reliable tenant…"
          rows={4} onFocus={()=>setFocused("intro")} onBlur={()=>setFocused(null)}
          style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"none",outline:"none",resize:"none",fontSize:fs(14),color:C.ink,fontFamily:"'Inter',system-ui,sans-serif",background:C.cardBg,boxShadow:focused==="intro"?`inset 0 0 0 2px ${C.navy},0 1px 3px rgba(0,0,0,0.08)`:C.cardShadow,caretColor:C.navy,lineHeight:1.55,transition:"box-shadow 0.15s",display:"block"}}/>
        <p style={{fontSize:fs(11),color:C.sub,margin:"6px 0 0",paddingLeft:2}}>Reused in every application</p>

        <Divider/>

        {/* 5. APPLICATION MESSAGE TEMPLATE */}
        <p style={sl}>Application Message Template</p>
        <textarea value={applicationMessage} onChange={e=>setApplicationMessage(e.target.value)}
          placeholder="Add a personal note that gets included with every application…"
          rows={3} onFocus={()=>setFocused("msg")} onBlur={()=>setFocused(null)}
          style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"none",outline:"none",resize:"none",fontSize:fs(14),color:C.ink,fontFamily:"'Inter',system-ui,sans-serif",background:C.cardBg,boxShadow:focused==="msg"?`inset 0 0 0 2px ${C.navy},0 1px 3px rgba(0,0,0,0.08)`:C.cardShadow,caretColor:C.navy,lineHeight:1.55,transition:"box-shadow 0.15s",display:"block"}}/>
        <p style={{fontSize:fs(11),color:C.sub,margin:"6px 0 0",paddingLeft:2}}>Optional extra note added to each application</p>

        <Divider/>

        {/* 6. DOCUMENTS */}
        <p style={sl}>Documents</p>
        {documents.length>0&&(
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
            {documents.map(doc=>(
              <div key={doc.id} style={{display:"flex",alignItems:"center",gap:12,height:56,...card(16),padding:"0 16px"}}>
                <div style={{width:32,height:32,borderRadius:8,background:C.peach,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <FileText size={14} strokeWidth={1.3} style={{color:C.navy}}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:fs(12),fontWeight:500,color:C.ink,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{doc.name}</p>
                  <p style={{fontSize:fs(10),color:C.sub,margin:"1px 0 0"}}>{doc.size}</p>
                </div>
                <TapBtn onClick={()=>removeDoc(doc.id)} style={{width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",background:C.muted,borderRadius:999,border:"none",cursor:"pointer",flexShrink:0}}>
                  <X size={11} strokeWidth={2} style={{color:C.sub}}/>
                </TapBtn>
              </div>
            ))}
          </div>
        )}
        {suggestVisible.length>0&&(
          <div>
            <p style={{fontSize:fs(11),fontWeight:500,color:C.sub,margin:"0 0 10px"}}>Suggested</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {suggestVisible.map(d=>(
                <TapBtn key={d.name} onClick={()=>addDoc(d)} style={{...card(999),fontSize:fs(11),fontWeight:500,color:C.ink,padding:"7px 12px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                  <Plus size={9} strokeWidth={2.5} style={{color:C.sub}}/>{d.name.length>34?d.name.slice(0,32)+"…":d.name}
                </TapBtn>
              ))}
            </div>
          </div>
        )}

        <div style={{height:20}}/>
      </div>

      {/* Footer */}
      <div style={{flexShrink:0,background:C.cardSolid,borderTop:`1px solid ${C.border}`,padding:"12px 20px 16px"}}>
        <TapBtn onClick={handleSave} style={{width:"100%",background:C.navy,color:"#FFF",fontSize:fs(11),fontWeight:600,padding:"14px 0",borderRadius:10,border:"none",cursor:"pointer",letterSpacing:"0.55px",textTransform:"uppercase"}}>Save Profile</TapBtn>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SEARCH FILTERS SCREEN
// ════════════════════════════════════════════════════════════════
function DualSlider({min,max,step,low,high,onLow,onHigh,fmtVal}:{
  min:number;max:number;step:number;low:number;high:number;
  onLow:(v:number)=>void;onHigh:(v:number)=>void;fmtVal:(v:number)=>string;
}){
  const {C}=useTheme();
  const pL=((low-min)/(max-min))*100;
  const pH=((high-min)/(max-min))*100;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <div style={{flex:1,background:C.muted,borderRadius:10,padding:"7px 10px"}}>
          <p style={{fontSize:10,color:C.sub,margin:"0 0 1px",fontWeight:500}}>Min</p>
          <p style={{fontSize:13,fontWeight:600,color:C.navy,margin:0}}>{low===min?"Any":fmtVal(low)}</p>
        </div>
        <div style={{flex:1,background:C.muted,borderRadius:10,padding:"7px 10px",textAlign:"right"}}>
          <p style={{fontSize:10,color:C.sub,margin:"0 0 1px",fontWeight:500}}>Max</p>
          <p style={{fontSize:13,fontWeight:600,color:C.navy,margin:0}}>{high===max?"Any":fmtVal(high)}</p>
        </div>
      </div>
      <div style={{position:"relative",height:28,display:"flex",alignItems:"center",margin:"0 8px 2px"}}>
        <div style={{position:"absolute",left:0,right:0,height:4,background:C.border,borderRadius:2}}>
          <div style={{position:"absolute",left:pL+"%",right:(100-pH)+"%",height:"100%",background:C.navy,borderRadius:2}}/>
        </div>
        <div style={{position:"absolute",left:`calc(${pL}% - 9px)`,width:18,height:18,borderRadius:999,background:C.navy,border:"2.5px solid #FFF",boxShadow:"0 1px 4px rgba(0,0,0,0.18)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",left:`calc(${pH}% - 9px)`,width:18,height:18,borderRadius:999,background:C.navy,border:"2.5px solid #FFF",boxShadow:"0 1px 4px rgba(0,0,0,0.18)",pointerEvents:"none"}}/>
        <input type="range" min={min} max={max} step={step} value={low}
          onChange={e=>onLow(Math.min(+e.target.value,high-step))}
          style={{position:"absolute",width:"100%",margin:0,opacity:0,height:"100%",cursor:"pointer",zIndex:pL>=pH-6?5:3}}/>
        <input type="range" min={min} max={max} step={step} value={high}
          onChange={e=>onHigh(Math.max(+e.target.value,low+step))}
          style={{position:"absolute",width:"100%",margin:0,opacity:0,height:"100%",cursor:"pointer",zIndex:4}}/>
      </div>
    </div>
  );
}

function FilterSection({title,children}:{title:string;children:React.ReactNode}){
  const [open,setOpen]=useState(true);
  const {C,fs}=useTheme();
  return (
    <div style={{borderBottom:`1px solid ${C.border}`}}>
      <TapBtn onClick={()=>setOpen(o=>!o)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
        <span style={{fontSize:fs(15),fontWeight:500,color:C.ink,fontFamily:TF}}>{title}</span>
        <ChevronDown size={16} strokeWidth={1.3} style={{color:C.sub,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0}}/>
      </TapBtn>
      {open&&<div style={{padding:"0 20px 18px"}}>{children}</div>}
    </div>
  );
}

function FilterChip({label,selected,onPress}:{label:string;selected:boolean;onPress:()=>void}){
  const {C,fs,card}=useTheme();
  return (
    <TapBtn onClick={onPress} style={{padding:"7px 14px",borderRadius:999,border:"none",cursor:"pointer",fontSize:fs(13),fontWeight:500,transition:"all 0.15s",flexShrink:0,
      ...(selected?{background:C.navy,color:"#FFF",boxShadow:"0 1px 3px rgba(0,0,0,0.12)"}:{...card(999),color:C.ink}),
    }}>{label}</TapBtn>
  );
}

function SearchFiltersScreen(){
  const {pop,searchFilters,setSearchFilters}=useApp();
  const {C,fs,card}=useTheme();

  const [intent,setIntent]=useState(searchFilters.intent);
  const [rentalTypes,setRentalTypes]=useState(searchFilters.rentalTypes);
  const [rentMin,setRentMin]=useState(searchFilters.rentMin);
  const [rentMax,setRentMax]=useState(searchFilters.rentMax);
  const [rooms,setRooms]=useState(searchFilters.rooms);
  const [spaceMin,setSpaceMin]=useState(searchFilters.spaceMin);
  const [spaceMax,setSpaceMax]=useState(searchFilters.spaceMax);
  const [furnishing,setFurnishing]=useState(searchFilters.furnishing);
  const [propTypes,setPropTypes]=useState(searchFilters.propTypes);
  const [accessibility,setAccessibility]=useState(searchFilters.accessibility);
  const [permit,setPermit]=useState(searchFilters.permit);
  const [pets,setPets]=useState(searchFilters.pets);
  const [floor,setFloor]=useState(searchFilters.floor);
  const [yearMin,setYearMin]=useState(searchFilters.yearMin);
  const [yearMax,setYearMax]=useState(searchFilters.yearMax);
  const [heatingTypes,setHeatingTypes]=useState(searchFilters.heatingTypes);
  const [energyCert,setEnergyCert]=useState(searchFilters.energyCert);
  const [keyword,setKeyword]=useState(searchFilters.keyword);

  const togArr=(arr:string[],v:string,set:(x:string[])=>void)=>set(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);
  const togSingle=(cur:string|null,v:string,set:(x:string|null)=>void)=>set(cur===v?null:v);

  const reset=()=>{const d=DEFAULT_SF;setIntent(d.intent);setRentalTypes(d.rentalTypes);setRentMin(d.rentMin);setRentMax(d.rentMax);setRooms(d.rooms);setSpaceMin(d.spaceMin);setSpaceMax(d.spaceMax);setFurnishing(d.furnishing);setPropTypes(d.propTypes);setAccessibility(d.accessibility);setPermit(d.permit);setPets(d.pets);setFloor(d.floor);setYearMin(d.yearMin);setYearMax(d.yearMax);setHeatingTypes(d.heatingTypes);setEnergyCert(d.energyCert);setKeyword(d.keyword);};
  const apply=()=>{setSearchFilters({intent,rentalTypes,rentMin,rentMax,rooms,spaceMin,spaceMax,furnishing,propTypes,accessibility,permit,pets,floor,yearMin,yearMax,heatingTypes,energyCert,keyword});pop();};

  const Chips=({opts,selected,onToggle}:{opts:string[];selected:string[];onToggle:(v:string)=>void})=>(
    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{opts.map(o=><FilterChip key={o} label={o} selected={selected.includes(o)} onPress={()=>onToggle(o)}/>)}</div>
  );
  const SingleChips=({opts,selected,onToggle}:{opts:string[];selected:string|null;onToggle:(v:string)=>void})=>(
    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{opts.map(o=><FilterChip key={o} label={o} selected={selected===o} onPress={()=>onToggle(o)}/>)}</div>
  );

  const btnBase:React.CSSProperties={padding:"10px 0",borderRadius:12,border:"none",cursor:"pointer",fontSize:fs(14),fontWeight:500,flex:1,transition:"all 0.15s",fontFamily:TF};

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,background:C.bg}}>
      {/* header */}
      <div style={{flexShrink:0,background:C.cardSolid}}>
        <div style={{display:"flex",alignItems:"center",padding:"12px 16px",gap:8}}>
          <TapBtn onClick={reset} style={{background:"none",border:"none",cursor:"pointer",padding:"0 4px",fontSize:fs(13),fontWeight:500,color:C.sub,whiteSpace:"nowrap",flexShrink:0}}>Reset</TapBtn>
          <span style={{flex:1,textAlign:"center",fontSize:fs(17),fontWeight:500,color:C.ink,fontFamily:TF,lineHeight:1}}>Search Filters</span>
          <TapBtn onClick={pop} style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:C.peach,borderRadius:10,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",border:"none",cursor:"pointer",flexShrink:0}}>
            <X size={18} strokeWidth={1.3} style={{color:"#1F1F1E"}}/>
          </TapBtn>
        </div>
        <div style={{height:1,background:C.border}}/>
      </div>

      {/* scrollable content */}
      <div style={{flex:1,minHeight:0,overflowY:"auto"}}>

        {/* 1. Intent */}
        <FilterSection title="What are you looking for?">
          <div style={{display:"flex",gap:10}}>
            {(["rent","buy"] as const).map(v=>{const sel=intent===v;return(
              <TapBtn key={v} onClick={()=>setIntent(v)} style={{...btnBase,background:sel?C.navy:C.muted,color:sel?"#FFF":C.ink,textTransform:"capitalize"}}>{v==="rent"?"Rent":"Buy"}</TapBtn>
            );})}
          </div>
        </FilterSection>

        {/* 2. Rental type (Rent only) */}
        {intent==="rent"&&(
          <FilterSection title="Rental Type">
            <Chips opts={["Long-term","Short-term","Sublet","Home Swap"]} selected={rentalTypes} onToggle={v=>togArr(rentalTypes,v,setRentalTypes)}/>
          </FilterSection>
        )}

        {/* 3. Monthly rent */}
        <FilterSection title="Total Monthly Rent (EUR)">
          <DualSlider min={0} max={3000} step={50} low={rentMin} high={rentMax} onLow={setRentMin} onHigh={setRentMax} fmtVal={v=>`${v}€`}/>
        </FilterSection>

        {/* 4. Rooms */}
        <FilterSection title="Rooms">
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Studio","1+","2+","3+","4+","5+"].map(v=>{const sel=rooms===v;return(
              <TapBtn key={v} onClick={()=>togSingle(rooms,v,setRooms)} style={{width:50,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10,border:"none",cursor:"pointer",fontSize:fs(13),fontWeight:500,transition:"all 0.15s",
                ...(sel?{background:C.navy,color:"#FFF"}:{...card(10),color:C.ink}),
              }}>{v}</TapBtn>
            );})}
          </div>
        </FilterSection>

        {/* 5. Living space */}
        <FilterSection title="Living Space (m²)">
          <DualSlider min={10} max={250} step={5} low={spaceMin} high={spaceMax} onLow={setSpaceMin} onHigh={setSpaceMax} fmtVal={v=>`${v} m²`}/>
        </FilterSection>

        {/* 6. Furnishing & extras */}
        <FilterSection title="Furnishing & Extras">
          <Chips opts={["Balcony/Terrace","Fitted Kitchen","Garden","Garage/Parking","Cellar","Elevator","Guest Toilet","Step-free Access"]} selected={furnishing} onToggle={v=>togArr(furnishing,v,setFurnishing)}/>
        </FilterSection>

        {/* 7. Property type */}
        <FilterSection title="Property Type">
          <Chips opts={["House","Apartment","Plot","Garage","Cabin"]} selected={propTypes} onToggle={v=>togArr(propTypes,v,setPropTypes)}/>
        </FilterSection>

        {/* 8. Accessibility */}
        <FilterSection title="Accessibility Features">
          <Chips opts={["Elevator","Wheelchair accessible","Smoke-free","Step-free entrance"]} selected={accessibility} onToggle={v=>togArr(accessibility,v,setAccessibility)}/>
        </FilterSection>

        {/* 9. Subsidized housing */}
        <FilterSection title="Subsidized Housing">
          <SingleChips opts={["Required","Not Required"]} selected={permit} onToggle={v=>togSingle(permit,v,setPermit)}/>
        </FilterSection>

        {/* 10. Pets */}
        <FilterSection title="Pets">
          <SingleChips opts={["Allowed","On Request","Not Allowed"]} selected={pets} onToggle={v=>togSingle(pets,v,setPets)}/>
        </FilterSection>

        {/* 11. Floor */}
        <FilterSection title="Floor">
          <SingleChips opts={["Ground Floor","1+","2+","3+","Top Floor","Any"]} selected={floor} onToggle={v=>togSingle(floor,v,setFloor)}/>
        </FilterSection>

        {/* 12. Year of construction */}
        <FilterSection title="Year of Construction">
          <DualSlider min={1900} max={2026} step={1} low={yearMin} high={yearMax} onLow={setYearMin} onHigh={setYearMax} fmtVal={v=>`${v}`}/>
          <p style={{fontSize:fs(11),color:C.sub,margin:"8px 0 0",textAlign:"center"}}>{yearMin} – {yearMax}</p>
        </FilterSection>

        {/* 13. Heating type */}
        <FilterSection title="Heating Type">
          <Chips opts={["Central Heating","Self-contained Central Heating","District Heating","Underfloor Heating","Heat Pump","Stove Heating"]} selected={heatingTypes} onToggle={v=>togArr(heatingTypes,v,setHeatingTypes)}/>
        </FilterSection>

        {/* 14. Energy certificate */}
        <FilterSection title="Energy Certificate">
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["A+","A","B","C","D","E","F","G","H"].map(v=>{const sel=energyCert===v;return(
              <TapBtn key={v} onClick={()=>togSingle(energyCert,v,setEnergyCert)} style={{width:40,height:38,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10,border:"none",cursor:"pointer",fontSize:fs(13),fontWeight:600,transition:"all 0.15s",
                ...(sel?{background:C.navy,color:"#FFF"}:{...card(10),color:C.ink}),
              }}>{v}</TapBtn>
            );})}
          </div>
        </FilterSection>

        {/* 15. Keyword */}
        <FilterSection title="Keyword Search">
          <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="e.g. balcony, Altbau, quiet…"
            style={{width:"100%",boxSizing:"border-box",...card(12) as any,border:"none",padding:"11px 14px",fontSize:fs(13),color:C.ink,outline:"none",caretColor:C.navy}}/>
        </FilterSection>

        <div style={{height:12}}/>
      </div>

      {/* footer */}
      <div style={{flexShrink:0,background:C.cardSolid,borderTop:`1px solid ${C.border}`,padding:"12px 20px 16px"}}>
        <TapBtn onClick={apply} style={{width:"100%",background:C.navy,color:"#FFF",fontSize:fs(11),fontWeight:600,padding:"14px 0",borderRadius:10,border:"none",cursor:"pointer",letterSpacing:"0.55px",textTransform:"uppercase"}}>Show Results</TapBtn>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SHELL
// ════════════════════════════════════════════════════════════════
function ScreenContent({screen}:{screen:Screen}){
  switch(screen.name){
    case"home":           return <HomeScreen/>;
    case"settings":            return <SettingsScreen/>;
    case"accessibility":       return <AccessibilityScreen/>;
    case"application-profile": return <ApplicationProfileScreen/>;
    case"search-filter":       return <SearchFilterScreen/>;
    case"search-location":return <SearchLocationScreen/>;
    case"search-filters": return <SearchFiltersScreen/>;
    case"results":        return <ResultsScreen screen={screen}/>;
    case"listing-detail": return <ListingDetailScreen screen={screen}/>;
    case"messages":       return <MessagesScreen/>;
    case"chat":           return <ChatScreen screen={screen}/>;
    case"list-property":  return <ListPropertyScreen/>;
    case"discover-plus":  return <DiscoverPlusScreen/>;
    case"alerts-tab":     return <AlertsScreen/>;
    case"favorites-tab":  return <FavoritesScreen/>;
    case"applied-tab":    return <AppliedScreen/>;
    default:              return null;
  }
}

function PhoneShell(){
  const {currentStack,slideDir,renderKey}=useApp();
  const {C}=useTheme();
  const screen=currentStack[currentStack.length-1];
  const contentRef=useRef<HTMLDivElement>(null);
  const dragging=useRef(false);
  const startY=useRef(0);
  const scrollStart=useRef(0);
  useEffect(()=>{if(contentRef.current)contentRef.current.scrollTop=0;},[renderKey]);
  const isUp=screen.name==="search-filters";
  const initial=isUp?{y:"100%",x:0,opacity:1}:slideDir==="forward"?{x:"100%",opacity:1}:slideDir==="back"?{x:"-30%",opacity:0.7}:{x:0,opacity:1};
  const animateTo={x:0,y:0,opacity:1};
  return (
    <div className="hf-stage" style={{minHeight:"100vh",background:"#D0CFCC",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <div className="hf-phone" style={{position:"relative",width:402,height:874,flexShrink:0,userSelect:"none",borderRadius:55,overflow:"hidden",background:C.bg,boxShadow:"0 40px 80px rgba(0,0,0,0.28),0 0 0 1px rgba(0,0,0,0.08),inset 0 0 0 1px rgba(255,255,255,0.25)"}}>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",overflow:"hidden",borderRadius:55,background:C.bg}}>
          <StatusBar/>
          <div ref={contentRef} className="content-scroll" style={{flex:1,minHeight:0,overflowY:"auto",scrollbarWidth:"none"} as React.CSSProperties}
            onMouseDown={e=>{dragging.current=true;startY.current=e.clientY;scrollStart.current=contentRef.current?.scrollTop??0;}}
            onMouseMove={e=>{if(!dragging.current||!contentRef.current)return;e.preventDefault();contentRef.current.scrollTop=scrollStart.current-(e.clientY-startY.current);}}
            onMouseUp={()=>{dragging.current=false;}} onMouseLeave={()=>{dragging.current=false;}}>
            <motion.div key={renderKey} initial={initial} animate={animateTo} transition={{type:"spring",damping:28,stiffness:300}} style={{willChange:"transform",minHeight:"100%",display:"flex",flexDirection:"column"}}>
              <ScreenContent screen={screen}/>
            </motion.div>
          </div>
          <BottomNav/>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  return <AppProvider><PhoneShell/></AppProvider>;
}

