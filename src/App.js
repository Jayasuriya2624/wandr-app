
// ╔══════════════════════════════════════════════════════════╗
// ║           WANDR — Places Discovery App                  ║
// ║  Backend: Firebase (Auth + Firestore + Storage)         ║
// ║  Maps:    Leaflet.js + OpenStreetMap (real GPS)         ║
// ╠══════════════════════════════════════════════════════════╣
// ║  SETUP (2 minutes, totally free):                       ║
// ║  1. Go to console.firebase.google.com                   ║
// ║  2. "Add project" → give it a name → Continue          ║
// ║  3. Disable Google Analytics → Create project           ║
// ║  4. Click "</>" (Web) → Register app → Copy the config  ║
// ║  5. Build → Authentication → Get started                ║
// ║     → Email/Password → Enable → Save                    ║
// ║  6. Build → Firestore Database → Create database        ║
// ║     → Start in TEST mode → Choose region → Done         ║
// ║  7. Build → Storage → Get started → Test mode → Done    ║
// ║  8. Paste your config in FIREBASE_CONFIG below          ║
// ╚══════════════════════════════════════════════════════════╝

import { useState, useEffect, useRef, useCallback } from "react";


// ─── PASTE YOUR FIREBASE CONFIG HERE ─────────────────────
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function showToast(message) {
  alert(message);
}
const firebaseConfig = {
  apiKey: "AIzaSyBin7VtDt4bmTIu5Il_k3EkK8oHlLt59tk",
  authDomain: "wandr-app-393d0.firebaseapp.com",
  projectId: "wandr-app-393d0",
  storageBucket: "wandr-app-393d0.firebasestorage.app",
  messagingSenderId: "990877688798",
  appId: "1:990877688798:web:396ae39581c9837975734f",
  measurementId: "G-G37WLYMSWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// ─────────────────────────────────────────────────────────

const FIREBASE_CONFIG = firebaseConfig;
const IS_CONFIGURED = !!firebaseConfig.apiKey;

let fb = {};
async function loadFirebase() {
  if (fb.auth) return fb;
  const [
    { initializeApp },
    { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updatePassword },
    { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, setDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp, increment },
  ] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"),
  ]);
  const app = initializeApp(FIREBASE_CONFIG);
  fb = { auth: getAuth(app), db: getFirestore(app), createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updatePassword, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, setDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp, increment };
  return fb;
}

const CATEGORIES = ["All","Temple","Park","Tourist Spot","Food Place","Historical","Beach","Museum","Shopping","Adventure","Waterfall","Heritage"];
const CAT_ICONS = { Temple:"🛕",Park:"🌳","Tourist Spot":"📸","Food Place":"🍜",Historical:"🏛️",Beach:"🏖️",Museum:"🎨",Shopping:"🛍️",Adventure:"🧗",Waterfall:"💧",Heritage:"🏰",All:"🌍" };
const LANGS = { en:"English", ta:"தமிழ்", hi:"हिन्दी" };
const T = {
  en:{ app:"Wandr",tagline:"Discover & Share Hidden Gems",login:"Login",signup:"Sign Up",email:"Email",password:"Password",forgot:"Forgot Password?",explore:"Explore",nearby:"Nearby",popular:"Popular",profile:"Profile",settings:"Settings",notif:"Notifications",searchPh:"Search places, cities...",addPlace:"Add Place",editPlace:"Edit Place",placeName:"Place Name",desc:"Description",category:"Category",city:"City",directions:"Get Directions",save:"Save",cancel:"Cancel",report:"Report",share:"Share",reply:"Reply",noPlaces:"No places yet. Be the first!",bio:"Bio",editProfile:"Edit Profile",changePw:"Change Password",myPosts:"My Posts",favorites:"Saved",bestTime:"Best Time",weather:"Weather",rate:"Rate this place",trending:"Trending",recent:"Recent",welcome:"Welcome back!",createAcc:"Create Account",reset:"Reset Password",lang:"Language",admin:"Admin Panel",writeComment:"Write a comment...",writeReply:"Write a reply...",gpsOn:"GPS Active",gpsOff:"Enable GPS",markRead:"Mark all read",deleteConfirm:"Delete this place?",cannotUndo:"This cannot be undone.",addImgUrl:"Add image URL",setupTitle:"Setup Required",setup1:"Go to console.firebase.google.com",setup2:"Create a new project (free)",setup3:"Enable Authentication → Email/Password",setup4:"Create Firestore Database (test mode)",setup5:"Paste config into FIREBASE_CONFIG",openConsole:"Open Firebase Console →",location:"Location",useGPS:"Use My GPS Location",pickMap:"Pick on Map",comment:"Comments" },
  ta:{ app:"வண்ட்ர்",tagline:"மறைந்த இரத்தினங்களை கண்டுபிடி",login:"உள்நுழை",signup:"பதிவு செய்",email:"மின்னஞ்சல்",password:"கடவுச்சொல்",forgot:"கடவுச்சொல் மறந்தீர்களா?",explore:"ஆராய்",nearby:"அருகில்",popular:"பிரபலம்",profile:"சுயவிவரம்",settings:"அமைப்புகள்",notif:"அறிவிப்புகள்",searchPh:"இடங்கள் தேடு...",addPlace:"இடம் சேர்",editPlace:"திருத்து",placeName:"இட பெயர்",desc:"விவரம்",category:"வகை",city:"நகர்",directions:"வழிகாட்டு",save:"சேமி",cancel:"ரத்து",report:"புகார்",share:"பகிர்",reply:"பதில்",noPlaces:"இடங்கள் இல்லை",bio:"சுயவிவரம்",editProfile:"திருத்து",changePw:"கடவுச்சொல் மாற்று",myPosts:"என் பதிவுகள்",favorites:"பிடித்தவை",bestTime:"சிறந்த நேரம்",weather:"வானிலை",rate:"மதிப்பிடு",trending:"பிரபலம்",recent:"புதியவை",welcome:"வரவேற்கிறோம்!",createAcc:"கணக்கு உருவாக்கு",reset:"மீட்டமை",lang:"மொழி",admin:"நிர்வாக பலகை",writeComment:"கருத்து எழுது...",writeReply:"பதில் எழுது...",gpsOn:"GPS செயலில்",gpsOff:"GPS இயக்கு",markRead:"எல்லாம் படித்தது",deleteConfirm:"இந்த இடத்தை நீக்கவா?",cannotUndo:"மீட்டெடுக்க முடியாது.",addImgUrl:"படம் URL சேர்",setupTitle:"அமைவு தேவை",setup1:"console.firebase.google.com செல்லவும்",setup2:"புதிய திட்டம் உருவாக்கவும்",setup3:"Authentication → Email/Password இயக்கவும்",setup4:"Firestore Database உருவாக்கவும்",setup5:"Config ஐ FIREBASE_CONFIG-ல் ஒட்டவும்",openConsole:"Firebase Console திற →",location:"இடம்",useGPS:"என் GPS இடம் பயன்படுத்து",pickMap:"வரைபடத்தில் தேர்வு",comment:"கருத்துகள்" },
  hi:{ app:"वैंडर",tagline:"छुपे हुए रत्न खोजें",login:"लॉगिन",signup:"साइन अप",email:"ईमेल",password:"पासवर्ड",forgot:"पासवर्ड भूल गए?",explore:"खोजें",nearby:"पास में",popular:"लोकप्रिय",profile:"प्रोफाइल",settings:"सेटिंग्स",notif:"सूचनाएं",searchPh:"जगह, शहर खोजें...",addPlace:"जगह जोड़ें",editPlace:"संपादित करें",placeName:"जगह का नाम",desc:"विवरण",category:"श्रेणी",city:"शहर",directions:"दिशा-निर्देश",save:"सहेजें",cancel:"रद्द करें",report:"रिपोर्ट",share:"शेयर",reply:"जवाब",noPlaces:"कोई जगह नहीं",bio:"बायो",editProfile:"प्रोफाइल संपादित करें",changePw:"पासवर्ड बदलें",myPosts:"मेरी पोस्ट",favorites:"पसंदीदा",bestTime:"सबसे अच्छा समय",weather:"मौसम",rate:"रेटिंग दें",trending:"ट्रेंडिंग",recent:"हाल का",welcome:"वापस स्वागत है!",createAcc:"खाता बनाएं",reset:"पासवर्ड रीसेट",lang:"भाषा",admin:"एडमिन पैनल",writeComment:"टिप्पणी लिखें...",writeReply:"जवाब लिखें...",gpsOn:"GPS सक्रिय",gpsOff:"GPS चालू करें",markRead:"सभी पढ़ा हुआ",deleteConfirm:"इस जगह को हटाएं?",cannotUndo:"वापस नहीं किया जा सकता।",addImgUrl:"इमेज URL जोड़ें",setupTitle:"सेटअप आवश्यक",setup1:"console.firebase.google.com पर जाएं",setup2:"नया प्रोजेक्ट बनाएं",setup3:"Authentication → Email/Password चालू करें",setup4:"Firestore Database बनाएं",setup5:"Config को FIREBASE_CONFIG में पेस्ट करें",openConsole:"Firebase Console खोलें →",location:"स्थान",useGPS:"मेरा GPS उपयोग करें",pickMap:"मानचित्र पर चुनें",comment:"टिप्पणियां" }
};

function calcDist(la1,lo1,la2,lo2){const R=6371,dL=(la2-la1)*Math.PI/180,dl=(lo2-lo1)*Math.PI/180,a=Math.sin(dL/2)**2+Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dl/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
function fmtD(km){return km<1?`${Math.round(km*1000)}m`:`${km.toFixed(1)}km`;}
function ago(d){if(!d)return"";const s=(Date.now()-(d?.toDate?d.toDate():new Date(d)))/1000;if(s<60)return"just now";if(s<3600)return`${Math.floor(s/60)}m ago`;if(s<86400)return`${Math.floor(s/3600)}h ago`;return`${Math.floor(s/86400)}d ago`;}

const C={bg:"#080C1A",card:"#0E1425",border:"rgba(255,255,255,0.07)",text:"#E8EAF0",muted:"rgba(255,255,255,0.4)",faint:"rgba(255,255,255,0.11)",accent:"#6C63FF",a2:"#FF6B9D",green:"#2ED573",red:"#FF4757",gold:"#FFD700",grad:"linear-gradient(135deg,#6C63FF,#FF6B9D)"};
const IS={width:"100%",background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 16px",color:C.text,fontSize:15,marginBottom:12,boxSizing:"border-box",outline:"none",fontFamily:"inherit"};
const BP={width:"100%",background:C.grad,border:"none",borderRadius:16,padding:"14px",color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",marginBottom:10,fontFamily:"inherit"};
const BG={width:"100%",background:"transparent",border:`1px solid ${C.faint}`,borderRadius:16,padding:"12px",color:C.muted,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8,fontFamily:"inherit"};

function Avatar({user,size=36}){
  const COLS=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#DDA0DD","#F7DC6F","#FF8C69","#98D8C8"];
  const name=user?.name||user?.displayName||user?.email||"?";
  const bg=COLS[name.charCodeAt(0)%COLS.length];
  const initials=name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return(
    <div style={{width:size,height:size,borderRadius:"50%",background:user?.photoURL?"transparent":bg,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:size*0.38,flexShrink:0,overflow:"hidden",border:"2px solid rgba(255,255,255,0.12)"}}>
      {user?.photoURL?<img src={user.photoURL} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:initials}
    </div>
  );
}

function Stars({val=0,onChange,size=20}){
  const[h,setH]=useState(0);
  return(
    <div style={{display:"flex",gap:2}}>
      {[1,2,3,4,5].map(s=>(
        <span key={s} onClick={()=>onChange&&onChange(s)} onMouseEnter={()=>onChange&&setH(s)} onMouseLeave={()=>onChange&&setH(0)} style={{fontSize:size,cursor:onChange?"pointer":"default",color:s<=(h||val)?C.gold:"#333",transition:"color 0.1s"}}>★</span>
      ))}
    </div>
  );
}

function Toast({msg,type="success"}){
  const bg={success:C.green,error:C.red,info:C.accent,warn:"#FFA502"}[type]||C.green;
  return <div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",zIndex:99999,background:bg,color:"#fff",padding:"10px 24px",borderRadius:24,fontWeight:700,fontSize:14,boxShadow:"0 4px 24px rgba(0,0,0,0.5)",whiteSpace:"nowrap",pointerEvents:"none"}}>{msg}</div>;
}

function IBtn({icon,onClick,style={}}){
  return <button onClick={onClick} style={{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:12,width:38,height:38,cursor:"pointer",color:C.text,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",...style}}>{icon}</button>;
}

function Leaflet({center,zoom=13,places=[],userGPS,onMarkerClick,onMapClick,height=280}){
  const divRef=useRef();
  const mapRef=useRef();
  const markersRef=useRef([]);
  const userMarkerRef=useRef();
  const[ready,setReady]=useState(!!window.L);

  useEffect(()=>{
    if(window.L){setReady(true);return;}
    const link=document.createElement("link");link.rel="stylesheet";link.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(link);
    const s=document.createElement("script");s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";s.onload=()=>setReady(true);document.head.appendChild(s);
  },[]);

  useEffect(()=>{
    if(!ready||mapRef.current||!divRef.current)return;
    const L=window.L;
    const m=L.map(divRef.current,{zoomControl:true,attributionControl:false}).setView(center,zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(m);
    mapRef.current=m;
    if(onMapClick)m.on("click",e=>onMapClick({lat:e.latlng.lat,lng:e.latlng.lng}));
  },[ready]);

  useEffect(()=>{
    const L=window.L;if(!L||!mapRef.current)return;
    if(userMarkerRef.current)userMarkerRef.current.remove();
    if(!userGPS)return;
    const icon=L.divIcon({html:`<div style="width:16px;height:16px;background:#6C63FF;border:3px solid #fff;border-radius:50%;box-shadow:0 0 14px rgba(108,99,255,0.9)"></div>`,className:"",iconSize:[16,16],iconAnchor:[8,8]});
    userMarkerRef.current=L.marker([userGPS.lat,userGPS.lng],{icon}).addTo(mapRef.current).bindPopup("📍 You");
  },[userGPS,ready]);

  useEffect(()=>{
    const L=window.L;if(!L||!mapRef.current)return;
    markersRef.current.forEach(m=>m.remove());markersRef.current=[];
    places.forEach(p=>{
      if(!p.lat||!p.lng)return;
      const icon=L.divIcon({html:`<div style="background:linear-gradient(135deg,#FF6B9D,#6C63FF);width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center"><span style="transform:rotate(45deg);font-size:15px">${CAT_ICONS[p.category]||"📍"}</span></div>`,className:"",iconSize:[34,34],iconAnchor:[17,34]});
      const pop=`<div style="font:14px/1.4 sans-serif;min-width:140px"><b>${p.name}</b><br><small style="color:#888">${p.city||""} • ${p.category||""}</small>${p.images?.[0]?`<br><img src="${p.images[0]}" style="width:100%;height:70px;object-fit:cover;border-radius:6px;margin-top:5px">`:""}</div>`;
      const m=L.marker([p.lat,p.lng],{icon}).addTo(mapRef.current).bindPopup(pop);
      if(onMarkerClick)m.on("click",()=>onMarkerClick(p));
      markersRef.current.push(m);
    });
  },[JSON.stringify(places.map(p=>p.id)),ready]);

  useEffect(()=>{if(mapRef.current&&center)mapRef.current.setView(center,mapRef.current.getZoom());},[center?.[0],center?.[1]]);

  return(
    <div style={{position:"relative"}}>
      <div ref={divRef} style={{width:"100%",height,borderRadius:20,overflow:"hidden",zIndex:1}}/>
      {!ready&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:C.card,borderRadius:20,color:C.muted,fontSize:14}}>Loading map…</div>}
    </div>
  );
}

// ── Setup screen ─────────────────────────────────────────
function SetupScreen({t}){
  return(
    <div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:`linear-gradient(135deg,${C.bg},#1a1f3e)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,color:C.text,maxWidth:480,margin:"0 auto"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Playfair+Display:wght@800&display=swap" rel="stylesheet"/>
      <div style={{fontSize:72,marginBottom:16}}>🔥</div>
      <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:800,marginBottom:8,textAlign:"center"}}>{t.setupTitle}</h1>
      <p style={{color:C.muted,marginBottom:28,textAlign:"center",maxWidth:340,lineHeight:1.7}}>Connect Firebase to enable real users, live data sync, and GPS-based discovery.</p>
      <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,borderRadius:22,padding:22,width:"100%",maxWidth:380}}>
        <div style={{color:C.accent,fontWeight:700,marginBottom:14}}>Quick Setup (free):</div>
        {[t.setup1,t.setup2,t.setup3,t.setup4,t.setup5].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:12,padding:"8px 0",borderBottom:`1px solid ${C.border}`,alignItems:"flex-start"}}>
            <div style={{width:24,height:24,borderRadius:8,background:C.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>{i+1}</div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:14,lineHeight:1.45}}>{s}</div>
          </div>
        ))}
      </div>
      <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{marginTop:22,background:C.grad,color:"#fff",padding:"14px 32px",borderRadius:16,fontWeight:800,textDecoration:"none",fontSize:16}}>{t.openConsole}</a>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  MAIN APP
// ════════════════════════════════════════════════════════════
export default function App(){
  const[lang,setLang]=useState("en");
  const t=T[lang];
  const[user,setUser]=useState(null);
  const[profile,setProfile]=useState(null);
  const[authReady,setAuthReady]=useState(false);
  const[authView,setAuthView]=useState("login");
  const[places,setPlaces]=useState([]);
  const[loading,setLoading]=useState(false);
  const[comments,setComments]=useState({});
  const[userLikes,setUserLikes]=useState(new Set());
  const[userFavs,setUserFavs]=useState(new Set());
  const[notifs,setNotifs]=useState([]);
  const[unread,setUnread]=useState(0);
  const[profiles,setProfiles]=useState({});
  const[view,setView]=useState("explore");
  const[selPlace,setSelPlace]=useState(null);
  const[editPlace,setEditPlace]=useState(null);
  const[viewUser,setViewUser]=useState(null);
  const[toast,setToast]=useState(null);
  const[searchQ,setSearchQ]=useState("");
  const[filterCat,setFilterCat]=useState("All");
  const[sortBy,setSortBy]=useState("recent");
  const[gps,setGps]=useState(null);
  const[gpsStatus,setGpsStatus]=useState("idle");
  const watchRef=useRef(null);

  const showToast=useCallback((msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3000);},[]);

  // Firebase init
  useEffect(()=>{
    if(!IS_CONFIGURED){setAuthReady(true);return;}
    loadFirebase().then(({auth,onAuthStateChanged})=>{
      onAuthStateChanged(auth,async fbUser=>{
        setUser(fbUser);
        if(fbUser){
          const p=await fetchProfile(fbUser.uid);
          if(p){setProfile(p);}
          await refreshLikes(fbUser.uid);
          await refreshFavs(fbUser.uid);
          subscribeNotifs(fbUser.uid);
        }
        setAuthReady(true);
      });
    });
  },[]);

  // GPS
  function startGPS(){
    if(!navigator.geolocation){showToast("GPS not supported","error");return;}
    setGpsStatus("loading");
    if(watchRef.current)navigator.geolocation.clearWatch(watchRef.current);
    watchRef.current=navigator.geolocation.watchPosition(
      pos=>{setGps({lat:pos.coords.latitude,lng:pos.coords.longitude});setGpsStatus("ok");},
      e=>{setGpsStatus("error");showToast("GPS: "+e.message,"warn");},
      {enableHighAccuracy:true,maximumAge:4000,timeout:12000}
    );
  }
  useEffect(()=>{startGPS();return()=>{if(watchRef.current)navigator.geolocation.clearWatch(watchRef.current);};},[]);

  async function fetchProfile(uid){
    if(profiles[uid])return profiles[uid];
    const{db,doc,getDoc}=await loadFirebase();
    const snap=await getDoc(doc(db,"users",uid));
    if(snap.exists()){const d={id:uid,...snap.data()};setProfiles(p=>({...p,[uid]:d}));return d;}
    return null;
  }

  async function refreshLikes(uid){
    const{db,collection,query,where,getDocs}=await loadFirebase();
    const snap=await getDocs(query(collection(db,"likes"),where("userId","==",uid)));
    setUserLikes(new Set(snap.docs.map(d=>d.data().placeId)));
  }

  async function refreshFavs(uid){
    const{db,collection,query,where,getDocs}=await loadFirebase();
    const snap=await getDocs(query(collection(db,"favorites"),where("userId","==",uid)));
    setUserFavs(new Set(snap.docs.map(d=>d.data().placeId)));
  }

  // Real-time places
  useEffect(()=>{
    if(!IS_CONFIGURED||!user)return;
    let unsub;
    setLoading(true);
    loadFirebase().then(({db,collection,query,orderBy,onSnapshot})=>{
      const q=query(collection(db,"places"),orderBy("createdAt","desc"));
      unsub=onSnapshot(q,snap=>{
        setPlaces(snap.docs.map(d=>({id:d.id,...d.data()})));
        setLoading(false);
      });
    });
    return()=>unsub&&unsub();
  },[user?.uid]);

  function subscribeNotifs(uid){
    loadFirebase().then(({db,collection,query,where,orderBy,limit,onSnapshot})=>{
      const q=query(collection(db,"notifications"),where("toUserId","==",uid),orderBy("createdAt","desc"),limit(30));
      onSnapshot(q,snap=>{
        const list=snap.docs.map(d=>({id:d.id,...d.data()}));
        setNotifs(list);setUnread(list.filter(n=>!n.read).length);
      });
    });
  }

  async function fetchComments(placeId){
    const{db,collection,query,where,orderBy,getDocs}=await loadFirebase();
    const snap=await getDocs(query(collection(db,"comments"),where("placeId","==",placeId),orderBy("createdAt","asc")));
    const all=snap.docs.map(d=>({id:d.id,...d.data()}));
    const top=all.filter(c=>!c.parentId).map(c=>({...c,replies:all.filter(r=>r.parentId===c.id)}));
    setComments(prev=>({...prev,[placeId]:top}));
    [...new Set(all.map(c=>c.userId))].forEach(uid=>{if(!profiles[uid])fetchProfile(uid);});
  }

  async function handleLike(placeId){
    if(!user){showToast("Login to like","error");return;}
    const{db,collection,query,where,getDocs,addDoc,deleteDoc,doc,updateDoc,increment,serverTimestamp}=await loadFirebase();
    const isLiked=userLikes.has(placeId);
    setUserLikes(prev=>{const s=new Set(prev);isLiked?s.delete(placeId):s.add(placeId);return s;});
    setPlaces(prev=>prev.map(p=>p.id===placeId?{...p,likeCount:(p.likeCount||0)+(isLiked?-1:1)}:p));
    if(isLiked){
      const snap=await getDocs(query(collection(db,"likes"),where("userId","==",user.uid),where("placeId","==",placeId)));
      snap.docs.forEach(d=>deleteDoc(d.ref));
      await updateDoc(doc(db,"places",placeId),{likeCount:increment(-1)});
    } else {
      await addDoc(collection(db,"likes"),{userId:user.uid,placeId,createdAt:serverTimestamp()});
      await updateDoc(doc(db,"places",placeId),{likeCount:increment(1)});
      const place=places.find(p=>p.id===placeId);
      if(place&&place.userId!==user.uid){
        await addDoc(collection(db,"notifications"),{toUserId:place.userId,fromUserId:user.uid,type:"like",placeId,read:false,createdAt:serverTimestamp()});
      }
    }
  }

  async function handleFav(placeId){
    if(!user)return;
    const{db,collection,query,where,getDocs,addDoc,deleteDoc,serverTimestamp}=await loadFirebase();
    const isFav=userFavs.has(placeId);
    setUserFavs(prev=>{const s=new Set(prev);isFav?s.delete(placeId):s.add(placeId);return s;});
    if(isFav){
      const snap=await getDocs(query(collection(db,"favorites"),where("userId","==",user.uid),where("placeId","==",placeId)));
      snap.docs.forEach(d=>deleteDoc(d.ref));
    } else {
      await addDoc(collection(db,"favorites"),{userId:user.uid,placeId,createdAt:serverTimestamp()});
    }
  }

  async function handleComment(placeId,text,parentId=null){
    if(!user){showToast("Login to comment","error");return;}
    if(!text.trim())return;
    const{db,collection,addDoc,doc,updateDoc,increment,serverTimestamp}=await loadFirebase();
    await addDoc(collection(db,"comments"),{userId:user.uid,placeId,parentId:parentId||null,text,createdAt:serverTimestamp()});
    await updateDoc(doc(db,"places",placeId),{commentCount:increment(1)});
    fetchComments(placeId);
    const place=places.find(p=>p.id===placeId);
    if(place&&place.userId!==user.uid){
      await addDoc(collection(db,"notifications"),{toUserId:place.userId,fromUserId:user.uid,type:parentId?"reply":"comment",placeId,read:false,createdAt:serverTimestamp()});
    }
  }

  async function handleSavePlace(data){
    const{db,collection,addDoc,doc,updateDoc,serverTimestamp}=await loadFirebase();
    if(editPlace){
      await updateDoc(doc(db,"places",editPlace.id),{...data,updatedAt:serverTimestamp()});
      showToast("Place updated!");
    } else {
      await addDoc(collection(db,"places"),{...data,userId:user.uid,userName:profile?.name||"User",likeCount:0,commentCount:0,rating:0,createdAt:serverTimestamp()});
      showToast("Place added! 🎉");
    }
    setEditPlace(null);setView("explore");
  }

  async function handleDeletePlace(placeId){
    const{db,doc,deleteDoc}=await loadFirebase();
    await deleteDoc(doc(db,"places",placeId));
    showToast("Deleted");setView("explore");
  }

  async function handleRate(placeId,rating){
    const{db,doc,updateDoc}=await loadFirebase();
    await updateDoc(doc(db,"places",placeId),{rating});
  }

  async function handleReport(placeId){
    const{db,collection,addDoc,serverTimestamp}=await loadFirebase();
    await addDoc(collection(db,"reports"),{userId:user.uid,placeId,createdAt:serverTimestamp()});
    showToast("Reported","info");
  }

  function handleShare(p){
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out ${p.name} in ${p.city}!\n${(p.description||"").slice(0,100)}...\nShared via Wandr 🌍`)}`,"_blank");
  }

  async function handleLogin(email,pw){
    const{auth,signInWithEmailAndPassword}=await loadFirebase();
    const res=await signInWithEmailAndPassword(auth,email,pw).catch(e=>({error:e}));
    if(res.error)showToast(res.error.message,"error");
    else showToast(t.welcome);
  }

  async function handleSignup(email,pw,name,username){
    const{auth,db,createUserWithEmailAndPassword,doc,setDoc,serverTimestamp}=await loadFirebase();
    const res=await createUserWithEmailAndPassword(auth,email,pw).catch(e=>({error:e}));
    if(res.error){showToast(res.error.message,"error");return;}
    await setDoc(doc(db,"users",res.user.uid),{name,username,email,bio:"",location:"",isAdmin:false,createdAt:serverTimestamp()});
    showToast("Account created! 🎉");
  }

  async function handleForgot(email){
    const{auth,sendPasswordResetEmail}=await loadFirebase();
    const res=await sendPasswordResetEmail(auth,email).catch(e=>({error:e}));
    if(res?.error)showToast(res.error.message,"error");
    else{showToast("Reset email sent!");setAuthView("login");}
  }

  async function handleLogout(){
    const{auth,signOut}=await loadFirebase();
    await signOut(auth);
    setUser(null);setProfile(null);setPlaces([]);setUserLikes(new Set());setUserFavs(new Set());setView("explore");
  }

  async function handleUpdateProfile(data){
    const{db,doc,updateDoc}=await loadFirebase();
    await updateDoc(doc(db,"users",user.uid),data);
    const updated={...profile,...data};
    setProfile(updated);
    setProfiles(prev=>({...prev,[user.uid]:updated}));
    showToast("Profile updated!");
  }

  async function handleChangePw(newPw){
    const{auth,updatePassword}=await loadFirebase();
    await updatePassword(auth.currentUser,newPw).catch(e=>showToast(e.message,"error"));
    showToast("Password changed!");
  }

  async function markAllRead(){
    const{db,collection,query,where,getDocs,updateDoc}=await loadFirebase();
    const snap=await getDocs(query(collection(db,"notifications"),where("toUserId","==",user.uid),where("read","==",false)));
    snap.docs.forEach(d=>updateDoc(d.ref,{read:true}));
    setUnread(0);
  }

  const MAP_CENTER=gps?[gps.lat,gps.lng]:[13.0827,80.2707];

  function withDist(arr){
    if(!gps)return arr;
    return arr.map(p=>({...p,_d:p.lat&&p.lng?calcDist(gps.lat,gps.lng,p.lat,p.lng):null}));
  }

  function applyFilters(arr){
    let f=[...arr];
    if(filterCat!=="All")f=f.filter(p=>p.category===filterCat);
    if(searchQ){const q=searchQ.toLowerCase();f=f.filter(p=>(p.name||"").toLowerCase().includes(q)||(p.city||"").toLowerCase().includes(q)||(p.category||"").toLowerCase().includes(q));}
    if(sortBy==="popular")f.sort((a,b)=>(b.likeCount||0)-(a.likeCount||0));
    else if(sortBy==="recent")f.sort((a,b)=>((b.createdAt?.toDate?.()??0)-(a.createdAt?.toDate?.()??0)));
    else if(sortBy==="distance")f.sort((a,b)=>(a._d??99999)-(b._d??99999));
    else if(sortBy==="rating")f.sort((a,b)=>(b.rating||0)-(a.rating||0));
    return f;
  }

  const allPlaces=withDist(places);
  const dispPlaces=applyFilters(allPlaces);

  if(!IS_CONFIGURED)return <SetupScreen t={t}/>;
  if(!authReady)return <Splash t={t}/>;
  if(!user)return <AuthScreen t={t} view={authView} setView={setAuthView} onLogin={handleLogin} onSignup={handleSignup} onForgot={handleForgot} lang={lang} setLang={setLang} toast={toast}/>;

  const sp={t,user,profile,places:allPlaces,userLikes,userFavs,profiles,gps,showToast};

  return(
    <div style={{fontFamily:"'Nunito','Segoe UI',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:480,margin:"0 auto",position:"relative"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
      {toast&&<Toast msg={toast.msg} type={toast.type}/>}
      <TopBar t={t} profile={profile} unread={unread} view={view} setView={setView} onLogout={handleLogout} gpsStatus={gpsStatus} onGPS={startGPS}/>
      <div style={{paddingTop:64,paddingBottom:74}}>
        {view==="explore"&&<ExploreView {...sp} dispPlaces={dispPlaces} mapCenter={MAP_CENTER} onSelect={p=>{setSelPlace(p);fetchComments(p.id);setView("detail");}} onLike={handleLike} searchQ={searchQ} setSearchQ={setSearchQ} filterCat={filterCat} setFilterCat={setFilterCat} sortBy={sortBy} setSortBy={setSortBy} loading={loading}/>}
        {view==="nearby"&&<NearbyView {...sp} mapCenter={MAP_CENTER} onSelect={p=>{setSelPlace(p);fetchComments(p.id);setView("detail");}} onGPS={startGPS} gpsStatus={gpsStatus}/>}
        {view==="popular"&&<PopularView {...sp} onSelect={p=>{setSelPlace(p);fetchComments(p.id);setView("detail");}} onLike={handleLike}/>}
        {view==="search"&&<SearchView {...sp} onSelect={p=>{setSelPlace(p);fetchComments(p.id);setView("detail");}} onLike={handleLike} filterCat={filterCat} setFilterCat={setFilterCat}/>}
        {view==="notif"&&<NotifView t={t} notifs={notifs} profiles={profiles} places={places} onSelect={p=>{setSelPlace(p);fetchComments(p.id);setView("detail");}} onMarkRead={markAllRead} fetchProfile={fetchProfile}/>}
        {view==="profile"&&<ProfileView {...sp} targetUser={viewUser||profile} isOwn={!viewUser||viewUser.id===user.uid} onSelect={p=>{setSelPlace(p);fetchComments(p.id);setView("detail");}} onEdit={()=>setView("settings")}/>}
        {view==="settings"&&<SettingsView t={t} profile={profile} onUpdateProfile={handleUpdateProfile} onChangePw={handleChangePw} lang={lang} setLang={setLang} showToast={showToast} user={user} isAdmin={profile?.isAdmin} onAdmin={()=>setView("admin")}/>}
        {view==="detail"&&selPlace&&<DetailView {...sp} place={places.find(p=>p.id===selPlace.id)||selPlace} comments={comments[selPlace.id]||[]} onLike={handleLike} onComment={handleComment} onEdit={()=>{setEditPlace(places.find(p=>p.id===selPlace.id)||selPlace);setView("addEdit");}} onDelete={handleDeletePlace} onReport={handleReport} onShare={handleShare} onFav={handleFav} onRate={handleRate} onBack={()=>setView("explore")} onViewUser={u=>{setViewUser(u);setView("profile");}} fetchProfile={fetchProfile}/>}
        {view==="addEdit"&&<AddEditView t={t} editPlace={editPlace} onSave={handleSavePlace} onCancel={()=>{setEditPlace(null);setView("explore");}} showToast={showToast} gps={gps}/>}
        {view==="admin"&&profile?.isAdmin&&<AdminView t={t} places={places} profiles={profiles} onDelete={handleDeletePlace}/>}
      </div>
      <BottomNav t={t} view={view} setView={v=>{if(v==="addEdit")setEditPlace(null);setView(v);}} unread={unread}/>
    </div>
  );
}

function Splash({t}){
  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Nunito',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&display=swap" rel="stylesheet"/>
      <div style={{fontSize:60,marginBottom:12}}>🌍</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:34,fontWeight:800,background:C.grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.app}</div>
      <div style={{color:C.muted,marginTop:8,fontSize:14}}>Connecting…</div>
    </div>
  );
}

function TopBar({t,profile,unread,view,setView,onLogout,gpsStatus,onGPS}){
  const dot={idle:"rgba(255,255,255,0.22)",loading:C.gold,ok:C.green,error:C.red}[gpsStatus];
  return(
    <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,zIndex:1000,background:"rgba(8,12,26,0.94)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}`,padding:"0 16px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div onClick={()=>setView("explore")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:800,background:C.grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.app}</span>
        <div onClick={e=>{e.stopPropagation();onGPS();}} title={t[gpsStatus==="ok"?"gpsOn":"gpsOff"]} style={{width:9,height:9,borderRadius:"50%",background:dot,cursor:"pointer",boxShadow:gpsStatus==="ok"?`0 0 8px ${C.green}`:"none",transition:"all 0.3s"}}/>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <IBtn icon="🔍" onClick={()=>setView("search")}/>
        <div style={{position:"relative"}}>
          <IBtn icon="🔔" onClick={()=>setView("notif")}/>
          {unread>0&&<div style={{position:"absolute",top:-4,right:-4,background:C.red,borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"#fff"}}>{unread}</div>}
        </div>
        <div onClick={()=>setView("profile")} style={{cursor:"pointer"}}><Avatar user={profile} size={38}/></div>
      </div>
    </div>
  );
}

function BottomNav({t,view,setView,unread}){
  const items=[{id:"explore",icon:"🏠",l:t.explore},{id:"nearby",icon:"🗺️",l:t.nearby},{id:"addEdit",icon:"➕",l:t.addPlace,sp:true},{id:"popular",icon:"🔥",l:t.popular},{id:"profile",icon:"👤",l:t.profile}];
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(8,12,26,0.96)",backdropFilter:"blur(20px)",borderTop:`1px solid ${C.border}`,display:"flex",zIndex:1000}}>
      {items.map(item=>(
        <button key={item.id} onClick={()=>setView(item.id)} style={{flex:1,background:"transparent",border:"none",padding:"10px 0 14px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:"inherit"}}>
          {item.sp
            ?<div style={{width:44,height:44,background:C.grad,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginTop:-20,boxShadow:"0 4px 20px rgba(108,99,255,0.5)",border:`3px solid ${C.bg}`}}>{item.icon}</div>
            :<span style={{fontSize:22}}>{item.icon}</span>
          }
          <span style={{fontSize:10,color:view===item.id?C.accent:C.muted,fontWeight:view===item.id?700:400}}>{item.l}</span>
        </button>
      ))}
    </div>
  );
}

function AuthScreen({t,view,setView,onLogin,onSignup,onForgot,lang,setLang,toast}){
  const[f,setF]=useState({email:"",pw:"",name:"",username:"",confirm:""});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const[busy,setBusy]=useState(false);
  const go=async fn=>{setBusy(true);await fn();setBusy(false);};
  return(
    <div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:`linear-gradient(135deg,${C.bg},#1a1f3e)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,maxWidth:480,margin:"0 auto",position:"relative"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Playfair+Display:wght@800&display=swap" rel="stylesheet"/>
      {toast&&<Toast msg={toast.msg} type={toast.type}/>}
      <div style={{position:"absolute",top:18,right:18,display:"flex",gap:6}}>
        {Object.entries(LANGS).map(([k])=>(
          <button key={k} onClick={()=>setLang(k)} style={{background:lang===k?C.accent:"rgba(255,255,255,0.08)",color:"#fff",border:"none",borderRadius:10,padding:"4px 10px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{k.toUpperCase()}</button>
        ))}
      </div>
      <div style={{textAlign:"center",marginBottom:30}}>
        <div style={{width:76,height:76,background:C.grad,borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 14px",boxShadow:"0 8px 32px rgba(108,99,255,0.4)"}}>🌍</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:800,color:"#fff",margin:0}}>{t.app}</h1>
        <p style={{color:C.muted,fontSize:14,marginTop:5}}>{t.tagline}</p>
      </div>
      <div style={{background:"rgba(255,255,255,0.04)",backdropFilter:"blur(20px)",borderRadius:26,padding:26,width:"100%",maxWidth:370,border:`1px solid ${C.border}`}}>
        {view==="forgot"&&<>
          <h2 style={{color:"#fff",fontWeight:800,marginBottom:18,fontSize:20}}>{t.reset}</h2>
          <input placeholder={t.email} type="email" style={IS} onChange={e=>set("email",e.target.value)}/>
          <button style={{...BP,opacity:busy?0.6:1}} onClick={()=>go(()=>onForgot(f.email))} disabled={busy}>Send Reset Email</button>
          <button style={BG} onClick={()=>setView("login")}>← {t.login}</button>
        </>}
        {view==="signup"&&<>
          <h2 style={{color:"#fff",fontWeight:800,marginBottom:18,fontSize:20}}>{t.createAcc}</h2>
          {[["name","Full Name","text"],["username","Username","text"],["email",t.email,"email"],["pw",t.password,"password"],["confirm","Confirm Password","password"]].map(([k,ph,type])=>(
            <input key={k} placeholder={ph} type={type} style={IS} onChange={e=>set(k,e.target.value)}/>
          ))}
          <button style={{...BP,opacity:busy?0.6:1}} onClick={()=>{if(f.pw!==f.confirm){showToast&&showToast("Passwords don't match","error");return;}go(()=>onSignup(f.email,f.pw,f.name,f.username));}} disabled={busy}>{busy?"…":t.signup}</button>
          <button style={BG} onClick={()=>setView("login")}>Already have account? {t.login}</button>
        </>}
        {view==="login"&&<>
          <h2 style={{color:"#fff",fontWeight:800,marginBottom:18,fontSize:20}}>{t.welcome}</h2>
          <input placeholder={t.email} type="email" style={IS} onChange={e=>set("email",e.target.value)} onKeyDown={e=>e.key==="Enter"&&go(()=>onLogin(f.email,f.pw))}/>
          <input placeholder={t.password} type="password" style={IS} onChange={e=>set("pw",e.target.value)} onKeyDown={e=>e.key==="Enter"&&go(()=>onLogin(f.email,f.pw))}/>
          <div style={{textAlign:"right",marginBottom:14}}><span onClick={()=>setView("forgot")} style={{color:C.accent,fontSize:13,cursor:"pointer"}}>{t.forgot}</span></div>
          <button style={{...BP,opacity:busy?0.6:1}} onClick={()=>go(()=>onLogin(f.email,f.pw))} disabled={busy}>{busy?"…":t.login}</button>
          <button style={BG} onClick={()=>setView("signup")}>{t.createAcc}</button>
        </>}
      </div>
    </div>
  );
}

function SmallCard({place,onSelect,userLikes,user,onLike}){
  const liked=user&&userLikes.has(place.id);
  return(
    <div onClick={()=>onSelect(place)} style={{background:C.card,border:`1px solid ${C.border}`,width:172,flexShrink:0,cursor:"pointer",borderRadius:20,overflow:"hidden"}}>
      <div style={{height:100,background:"#1a1f3e",overflow:"hidden",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34}}>
        {place.images?.[0]?<img src={place.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:CAT_ICONS[place.category]||"📍"}
        <div style={{position:"absolute",top:7,right:7,background:"rgba(0,0,0,0.6)",borderRadius:9,padding:"2px 8px",fontSize:11,color:"#fff"}}>{place.category}</div>
      </div>
      <div style={{padding:"9px 12px"}}>
        <div style={{fontWeight:800,fontSize:13,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:2}}>{place.name}</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:6}}>📍 {place.city}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:C.gold}}>★ {(place.rating||0).toFixed(1)}</span>
          <button onClick={e=>{e.stopPropagation();onLike(place.id);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:liked?"#FF6B9D":C.muted,display:"flex",alignItems:"center",gap:3,fontFamily:"inherit"}}>{liked?"❤️":"🤍"} {place.likeCount||0}</button>
        </div>
      </div>
    </div>
  );
}

function LargeCard({place,onSelect,userLikes,user,onLike}){
  const liked=user&&userLikes.has(place.id);
  return(
    <div onClick={()=>onSelect(place)} style={{background:C.card,border:`1px solid ${C.border}`,cursor:"pointer",overflow:"hidden",borderRadius:22}}>
      <div style={{height:188,background:"#1a1f3e",overflow:"hidden",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",fontSize:52}}>
        {place.images?.[0]?<img src={place.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:CAT_ICONS[place.category]||"🏔️"}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 55%)"}}/>
        <div style={{position:"absolute",bottom:12,left:14,right:14}}>
          <div style={{background:"rgba(108,99,255,0.75)",borderRadius:8,padding:"2px 10px",fontSize:11,color:"#fff",display:"inline-block",marginBottom:4}}>{CAT_ICONS[place.category]||"📍"} {place.category}</div>
          <div style={{color:"#fff",fontWeight:800,fontSize:18,textShadow:"0 1px 4px rgba(0,0,0,0.5)"}}>{place.name}</div>
          <div style={{color:"rgba(255,255,255,0.65)",fontSize:13}}>📍 {place.city}{place._d!=null?` • ${fmtD(place._d)}`:""}</div>
        </div>
      </div>
      <div style={{padding:"12px 16px"}}>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:13,margin:"0 0 12px",lineHeight:1.55,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{place.description}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:14}}>
            <button onClick={e=>{e.stopPropagation();onLike(place.id);}} style={{background:"none",border:"none",cursor:"pointer",color:liked?"#FF6B9D":C.muted,fontSize:14,display:"flex",alignItems:"center",gap:4,fontFamily:"inherit"}}>{liked?"❤️":"🤍"} {place.likeCount||0}</button>
            <span style={{color:C.muted,fontSize:14}}>💬 {place.commentCount||0}</span>
            <span style={{color:C.gold,fontSize:14}}>★ {(place.rating||0).toFixed(1)}</span>
          </div>
          <span style={{color:"rgba(255,255,255,0.2)",fontSize:12}}>{ago(place.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

function ExploreView({t,places,dispPlaces,userLikes,user,gps,mapCenter,onSelect,onLike,searchQ,setSearchQ,filterCat,setFilterCat,sortBy,setSortBy,loading}){
  const trending=[...places].sort((a,b)=>(b.likeCount||0)-(a.likeCount||0)).slice(0,5);
  const showSections=!searchQ&&filterCat==="All";
  return(
    <div style={{padding:16}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <span>🔍</span>
        <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder={t.searchPh} style={{background:"transparent",border:"none",outline:"none",color:C.text,fontSize:15,flex:1,fontFamily:"inherit"}}/>
        {searchQ&&<span onClick={()=>setSearchQ("")} style={{cursor:"pointer",color:C.muted,fontSize:20,lineHeight:1}}>×</span>}
      </div>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:12,scrollbarWidth:"none"}}>
        {CATEGORIES.map(cat=>(
          <button key={cat} onClick={()=>setFilterCat(cat)} style={{background:filterCat===cat?C.grad:"rgba(255,255,255,0.06)",border:"none",borderRadius:20,padding:"6px 14px",color:"#fff",fontSize:13,fontWeight:filterCat===cat?700:400,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"inherit"}}>
            {CAT_ICONS[cat]} {cat}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:6,marginBottom:18,overflowX:"auto",scrollbarWidth:"none"}}>
        {[["recent","🕐 Recent"],["popular","🔥 Popular"],["distance","📍 Nearby"],["rating","⭐ Rating"]].map(([v,l])=>(
          <button key={v} onClick={()=>setSortBy(v)} style={{background:sortBy===v?"rgba(108,99,255,0.2)":"transparent",border:`1px solid ${sortBy===v?C.accent:C.faint}`,borderRadius:20,padding:"5px 12px",color:sortBy===v?"#A8A4FF":C.muted,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"inherit"}}>{l}</button>
        ))}
      </div>
      {showSections&&gps&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:22,marginBottom:18,overflow:"hidden"}}>
          <div style={{padding:"10px 14px 6px",display:"flex",justifyContent:"space-between"}}>
            <span style={{color:C.muted,fontSize:13,fontWeight:700}}>🗺️ Live Map</span>
            <span style={{color:C.green,fontSize:12,fontWeight:700}}>● GPS Active</span>
          </div>
          <Leaflet center={mapCenter} zoom={11} places={places.filter(p=>p.lat&&p.lng)} userGPS={gps} onMarkerClick={onSelect} height={170}/>
        </div>
      )}
      {showSections&&trending.length>0&&(
        <>
          <h3 style={{color:C.text,fontWeight:800,fontSize:16,marginBottom:10}}>🔥 {t.trending}</h3>
          <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginBottom:18,scrollbarWidth:"none"}}>
            {trending.map(p=><SmallCard key={p.id} place={p} onSelect={onSelect} userLikes={userLikes} user={user} onLike={onLike}/>)}
          </div>
        </>
      )}
      {loading
        ?<div style={{textAlign:"center",padding:50,color:C.muted}}><div style={{fontSize:36,marginBottom:8}}>⏳</div>Loading…</div>
        :dispPlaces.length===0
          ?<div style={{textAlign:"center",padding:56,color:"rgba(255,255,255,0.2)"}}>
            <div style={{fontSize:56,marginBottom:12}}>🌍</div>
            <div style={{fontSize:16,fontWeight:700,color:"rgba(255,255,255,0.35)"}}>{t.noPlaces}</div>
          </div>
          :<>
            {showSections&&<h3 style={{color:C.text,fontWeight:800,fontSize:16,marginBottom:12}}>✨ All Places</h3>}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {dispPlaces.map(p=><LargeCard key={p.id} place={p} onSelect={onSelect} userLikes={userLikes} user={user} onLike={onLike}/>)}
            </div>
          </>
      }
    </div>
  );
}

function NearbyView({t,places,gps,mapCenter,onSelect,onGPS,gpsStatus}){
  const nearby=[...places].filter(p=>p.lat&&p.lng).sort((a,b)=>(a._d??99999)-(b._d??99999)).slice(0,25);
  return(
    <div style={{padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h2 style={{color:C.text,fontWeight:800,fontSize:22,margin:0}}>📍 {t.nearby}</h2>
        <button onClick={onGPS} style={{background:gpsStatus==="ok"?"rgba(46,213,115,0.15)":C.grad,border:`1px solid ${gpsStatus==="ok"?C.green:"transparent"}`,borderRadius:14,padding:"8px 16px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"inherit"}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:gpsStatus==="ok"?C.green:"#fff",display:"inline-block"}}/>
          {gpsStatus==="ok"?t.gpsOn:t.gpsOff}
        </button>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:22,marginBottom:18,overflow:"hidden"}}>
        <Leaflet center={mapCenter} zoom={13} places={nearby} userGPS={gps} onMarkerClick={onSelect} height={300}/>
      </div>
      <h3 style={{color:C.text,fontWeight:800,marginBottom:12}}>Nearest Places</h3>
      {nearby.length===0
        ?<div style={{textAlign:"center",padding:40,color:"rgba(255,255,255,0.2)"}}><div style={{fontSize:52}}>📡</div><div style={{marginTop:8}}>Enable GPS to find nearby places</div></div>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {nearby.map(p=>(
            <div key={p.id} onClick={()=>onSelect(p)} style={{background:C.card,border:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",gap:12,alignItems:"center",cursor:"pointer",borderRadius:18}}>
              <div style={{width:52,height:52,borderRadius:14,overflow:"hidden",flexShrink:0,background:"#1a1f3e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:CAT_ICONS[p.category]||"📍"}
              </div>
              <div style={{flex:1}}>
                <div style={{color:C.text,fontWeight:700,fontSize:15}}>{p.name}</div>
                <div style={{color:C.muted,fontSize:12}}>{p.city} • {CAT_ICONS[p.category]} {p.category}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:C.accent,fontWeight:800,fontSize:15}}>{p._d!=null?fmtD(p._d):"—"}</div>
                <div style={{color:C.gold,fontSize:12}}>★ {(p.rating||0).toFixed(1)}</div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

function PopularView({t,places,onSelect,userLikes,user,onLike}){
  const byLike=[...places].sort((a,b)=>(b.likeCount||0)-(a.likeCount||0));
  const byRating=[...places].sort((a,b)=>(b.rating||0)-(a.rating||0));
  const M=({i})=><div style={{width:34,height:34,background:["#FFD700","#C0C0C0","#CD7F32"][i]||C.card,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:15,flexShrink:0,color:i<3?"#000":C.text}}>{i+1}</div>;
  const Row=({p,i,right})=>(
    <div onClick={()=>onSelect(p)} style={{background:C.card,border:`1px solid ${C.border}`,padding:"12px 14px",display:"flex",gap:12,cursor:"pointer",alignItems:"center",borderRadius:18,marginBottom:10}}>
      <M i={i}/>
      <div style={{width:44,height:44,borderRadius:12,overflow:"hidden",flexShrink:0,background:"#1a1f3e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
        {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:CAT_ICONS[p.category]||"📍"}
      </div>
      <div style={{flex:1}}><div style={{color:C.text,fontWeight:700,fontSize:14}}>{p.name}</div><div style={{color:C.muted,fontSize:12}}>{p.city}</div></div>
      <div style={{color:C.a2,fontWeight:700,fontSize:14}}>{right}</div>
    </div>
  );
  return(
    <div style={{padding:16}}>
      <h2 style={{color:C.text,fontWeight:800,fontSize:22,marginBottom:18}}>🔥 {t.popular}</h2>
      <h3 style={{color:C.text,fontWeight:800,fontSize:15,marginBottom:10}}>❤️ Most Liked</h3>
      {byLike.slice(0,5).map((p,i)=><Row key={p.id} p={p} i={i} right={`❤️ ${p.likeCount||0}`}/>)}
      <h3 style={{color:C.text,fontWeight:800,fontSize:15,marginBottom:10,marginTop:16}}>⭐ Top Rated</h3>
      {byRating.slice(0,5).map((p,i)=><Row key={p.id} p={p} i={i} right={`★ ${(p.rating||0).toFixed(1)}`}/>)}
    </div>
  );
}

function SearchView({t,places,onSelect,userLikes,user,onLike,filterCat,setFilterCat}){
  const[q,setQ]=useState("");
  const res=places.filter(p=>{
    const mC=filterCat==="All"||p.category===filterCat;
    const sq=q.toLowerCase();
    const mQ=!q||(p.name||"").toLowerCase().includes(sq)||(p.city||"").toLowerCase().includes(sq)||(p.category||"").toLowerCase().includes(sq);
    return mC&&mQ;
  });
  return(
    <div style={{padding:16}}>
      <h2 style={{color:C.text,fontWeight:800,fontSize:22,marginBottom:14}}>🔍 {t.searchPh.replace("...","")}</h2>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <span>🔍</span>
        <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder={t.searchPh} style={{background:"transparent",border:"none",outline:"none",color:C.text,fontSize:15,flex:1,fontFamily:"inherit"}}/>
        {q&&<span onClick={()=>setQ("")} style={{cursor:"pointer",color:C.muted,fontSize:20}}>×</span>}
      </div>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:14,scrollbarWidth:"none"}}>
        {CATEGORIES.map(cat=>(
          <button key={cat} onClick={()=>setFilterCat(cat)} style={{background:filterCat===cat?C.grad:"rgba(255,255,255,0.06)",border:"none",borderRadius:20,padding:"6px 14px",color:"#fff",fontSize:13,fontWeight:filterCat===cat?700:400,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"inherit"}}>{CAT_ICONS[cat]} {cat}</button>
        ))}
      </div>
      {q||filterCat!=="All"
        ?res.length===0
          ?<div style={{textAlign:"center",padding:56,color:"rgba(255,255,255,0.2)"}}><div style={{fontSize:52}}>🔍</div><div style={{marginTop:8}}>{t.noPlaces}</div></div>
          :<div style={{display:"flex",flexDirection:"column",gap:14}}>{res.map(p=><LargeCard key={p.id} place={p} onSelect={onSelect} userLikes={userLikes} user={user} onLike={onLike}/>)}</div>
        :<div style={{textAlign:"center",padding:64,color:"rgba(255,255,255,0.15)"}}><div style={{fontSize:68,marginBottom:12}}>🌍</div><div>Search for amazing places</div></div>
      }
    </div>
  );
}

function DetailView({t,place,user,profile,profiles,fetchProfile,userLikes,userFavs,gps,onLike,comments,onComment,onEdit,onDelete,onReport,onShare,onFav,onRate,onBack,onViewUser}){
  const[imgIdx,setImgIdx]=useState(0);
  const[cmtTxt,setCmtTxt]=useState("");
  const[replyTo,setReplyTo]=useState(null);
  const[replyTxt,setReplyTxt]=useState("");
  const[showDel,setShowDel]=useState(false);
  const[showMap,setShowMap]=useState(false);
  const[author,setAuthor]=useState(profiles[place.userId]);

  useEffect(()=>{
    if(!author&&place.userId)fetchProfile(place.userId).then(p=>p&&setAuthor(p));
  },[place.userId]);

  const liked=user&&userLikes.has(place.id);
  const isFav=userFavs.has(place.id);
  const isOwner=user&&place.userId===user.uid;
  const d=gps&&place.lat&&place.lng?calcDist(gps.lat,gps.lng,place.lat,place.lng):null;

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px"}}>
        <IBtn icon="←" onClick={onBack}/>
        <div style={{display:"flex",gap:8}}>
          <IBtn icon={isFav?"🌟":"⭐"} onClick={()=>onFav(place.id)}/>
          <IBtn icon="📤" onClick={()=>onShare(place)}/>
          {isOwner&&<><IBtn icon="✏️" onClick={onEdit}/><IBtn icon="🗑️" onClick={()=>setShowDel(true)}/></>}
          {!isOwner&&<IBtn icon="🚩" onClick={()=>onReport(place.id)}/>}
        </div>
      </div>
      {(place.images||[]).length>0
        ?<div style={{height:240,background:"#1a1f3e",position:"relative",overflow:"hidden"}}>
          <img src={place.images[imgIdx]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          {place.images.length>1&&(
            <div style={{position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6}}>
              {place.images.map((_,i)=><div key={i} onClick={()=>setImgIdx(i)} style={{width:i===imgIdx?20:8,height:8,borderRadius:4,background:i===imgIdx?"#fff":"rgba(255,255,255,0.4)",cursor:"pointer",transition:"all 0.2s"}}/>)}
            </div>
          )}
        </div>
        :<div style={{height:180,background:`linear-gradient(135deg,${C.card},#0d1528)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64}}>{CAT_ICONS[place.category]||"🏔️"}</div>
      }
      <div style={{padding:16}}>
        <h1 style={{color:C.text,fontWeight:900,fontSize:26,margin:"0 0 4px",fontFamily:"'Playfair Display',serif"}}>{place.name}</h1>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{color:C.muted,fontSize:14}}>📍 {place.city}{d?` • ${fmtD(d)} away`:""}</span>
          <Stars val={place.rating||0}/>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          <div onClick={()=>onLike(place.id)} style={{flex:1,background:liked?"rgba(255,107,157,0.15)":C.card,border:`1px solid ${liked?"#FF6B9D":C.border}`,borderRadius:14,padding:"10px",color:liked?"#FF6B9D":C.muted,fontWeight:700,fontSize:14,textAlign:"center",cursor:"pointer"}}>
            {liked?"❤️":"🤍"} {place.likeCount||0}
          </div>
          <div style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"10px",color:C.muted,fontWeight:700,fontSize:14,textAlign:"center"}}>💬 {place.commentCount||0}</div>
          <div style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"10px",color:C.muted,fontWeight:700,fontSize:13,textAlign:"center"}}>{CAT_ICONS[place.category]||"📍"} {place.category}</div>
        </div>
        <p style={{color:"rgba(255,255,255,0.65)",lineHeight:1.7,marginBottom:16,fontSize:15}}>{place.description}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {[[`🌤️ ${t.weather}`,place.weatherInfo],[`🕐 ${t.bestTime}`,place.bestTime]].filter(([,v])=>v).map(([k,v])=>(
            <div key={k} style={{background:C.card,border:`1px solid ${C.border}`,padding:"12px 14px",borderRadius:16}}>
              <div style={{color:C.muted,fontSize:11,marginBottom:4}}>{k}</div>
              <div style={{color:C.text,fontSize:13,fontWeight:600}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"12px 16px",marginBottom:14,borderRadius:16}}>
          <div style={{color:C.muted,fontSize:12,marginBottom:8}}>{t.rate}</div>
          <Stars val={place.rating||0} onChange={r=>onRate(place.id,r)} size={28}/>
        </div>
        {place.lat&&place.lng&&(
          <div style={{marginBottom:14}}>
            <button onClick={()=>setShowMap(v=>!v)} style={{background:C.card,border:`1px solid ${C.border}`,width:"100%",padding:"12px",color:C.muted,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,borderRadius:16,fontFamily:"inherit"}}>
              🗺️ {showMap?"Hide Map":"Show on Map"}
            </button>
            {showMap&&<div style={{marginTop:8,borderRadius:18,overflow:"hidden"}}><Leaflet center={[place.lat,place.lng]} zoom={15} places={[place]} userGPS={gps} height={220}/></div>}
          </div>
        )}
        {place.lat&&place.lng&&(
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`} target="_blank" rel="noreferrer" style={{display:"block",background:C.grad,borderRadius:16,padding:"14px",color:"#fff",textDecoration:"none",textAlign:"center",fontWeight:800,fontSize:16,marginBottom:18}}>
            🗺️ {t.directions}
          </a>
        )}
        {author&&(
          <div onClick={()=>onViewUser(author)} style={{background:C.card,border:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:20,cursor:"pointer",borderRadius:18}}>
            <Avatar user={author} size={44}/>
            <div><div style={{color:C.text,fontWeight:700}}>{author.name||author.username}</div><div style={{color:C.muted,fontSize:12}}>Added {ago(place.createdAt)}</div></div>
          </div>
        )}
        <h3 style={{color:C.text,fontWeight:800,marginBottom:14}}>💬 {t.comment} ({comments.reduce((a,c)=>a+1+(c.replies||[]).length,0)})</h3>
        <div style={{display:"flex",gap:10,marginBottom:18}}>
          <Avatar user={profile} size={36}/>
          <div style={{flex:1,display:"flex",gap:8}}>
            <input value={cmtTxt} onChange={e=>setCmtTxt(e.target.value)} placeholder={t.writeComment} style={{flex:1,background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,borderRadius:14,padding:"10px 14px",color:C.text,fontSize:14,outline:"none",fontFamily:"inherit"}} onKeyDown={e=>e.key==="Enter"&&cmtTxt.trim()&&(onComment(place.id,cmtTxt),setCmtTxt(""))}/>
            <button onClick={()=>cmtTxt.trim()&&(onComment(place.id,cmtTxt),setCmtTxt(""))} style={{background:C.grad,border:"none",borderRadius:14,width:44,cursor:"pointer",color:"#fff",fontSize:18}}>↑</button>
          </div>
        </div>
        {comments.map(cc=>{
          const cu=profiles[cc.userId];
          return(
            <div key={cc.id} style={{marginBottom:14}}>
              <div style={{display:"flex",gap:10}}>
                <Avatar user={cu} size={34}/>
                <div style={{flex:1}}>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"10px 14px",borderRadius:16}}>
                    <div style={{color:"#A8A4FF",fontWeight:700,fontSize:13,marginBottom:4}}>{cu?.name||cu?.username||"User"}</div>
                    <div style={{color:"rgba(255,255,255,0.75)",fontSize:14}}>{cc.text}</div>
                  </div>
                  <div style={{display:"flex",gap:12,marginTop:5,paddingLeft:4}}>
                    <span style={{color:"rgba(255,255,255,0.22)",fontSize:12}}>{ago(cc.createdAt)}</span>
                    <span onClick={()=>setReplyTo(replyTo===cc.id?null:cc.id)} style={{color:C.accent,fontSize:12,cursor:"pointer",fontWeight:600}}>↩ {t.reply}</span>
                  </div>
                  {replyTo===cc.id&&(
                    <div style={{display:"flex",gap:8,marginTop:8}}>
                      <input value={replyTxt} onChange={e=>setReplyTxt(e.target.value)} placeholder={t.writeReply} style={{flex:1,background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,borderRadius:12,padding:"8px 12px",color:C.text,fontSize:13,outline:"none",fontFamily:"inherit"}} onKeyDown={e=>e.key==="Enter"&&replyTxt.trim()&&(onComment(place.id,replyTxt,cc.id),setReplyTxt(""),setReplyTo(null))}/>
                      <button onClick={()=>replyTxt.trim()&&(onComment(place.id,replyTxt,cc.id),setReplyTxt(""),setReplyTo(null))} style={{background:C.accent,border:"none",borderRadius:12,width:36,cursor:"pointer",color:"#fff"}}>↑</button>
                    </div>
                  )}
                  {(cc.replies||[]).map(r=>{
                    const ru=profiles[r.userId];
                    return(
                      <div key={r.id} style={{display:"flex",gap:8,marginTop:8,paddingLeft:8}}>
                        <Avatar user={ru} size={28}/>
                        <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"8px 12px",flex:1,borderRadius:14}}>
                          <div style={{color:"#A8A4FF",fontWeight:700,fontSize:12}}>{ru?.name||ru?.username||"User"}</div>
                          <div style={{color:"rgba(255,255,255,0.65)",fontSize:13}}>{r.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showDel&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:24}}>
          <div style={{background:"#151929",borderRadius:24,padding:28,width:"100%",maxWidth:300,textAlign:"center",border:`1px solid ${C.border}`}}>
            <div style={{fontSize:44,marginBottom:10}}>🗑️</div>
            <h3 style={{color:C.text,marginBottom:6}}>{t.deleteConfirm}</h3>
            <p style={{color:C.muted,marginBottom:20,fontSize:13}}>{t.cannotUndo}</p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowDel(false)} style={{flex:1,background:"rgba(255,255,255,0.07)",border:"none",borderRadius:14,padding:12,color:C.text,cursor:"pointer",fontFamily:"inherit"}}>{t.cancel}</button>
              <button onClick={()=>{onDelete(place.id);setShowDel(false);}} style={{flex:1,background:C.red,border:"none",borderRadius:14,padding:12,color:"#fff",cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddEditView({t,editPlace,onSave,onCancel,showToast,gps}){
  const[f,setF]=useState({name:editPlace?.name||"",description:editPlace?.description||"",city:editPlace?.city||"",category:editPlace?.category||"Temple",lat:editPlace?.lat||(gps?.lat||13.0827),lng:editPlace?.lng||(gps?.lng||80.2707),images:editPlace?.images||[],bestTime:editPlace?.bestTime||"",weatherInfo:editPlace?.weatherInfo||""});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const[imgUrl,setImgUrl]=useState("");
  const[showPicker,setShowPicker]=useState(false);

  function addImg(){
    if(!imgUrl.trim()){showToast("Enter image URL","error");return;}
    if(f.images.length>=5){showToast("Max 5 images","error");return;}
    set("images",[...f.images,imgUrl.trim()]);setImgUrl("");
  }

  function validate(){
    if(!f.name.trim()){showToast("Place name required","error");return false;}
    if(!f.city.trim()){showToast("City required","error");return false;}
    if(!f.description.trim()){showToast("Description required","error");return false;}
    return true;
  }

  return(
    <div style={{padding:16}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <IBtn icon="←" onClick={onCancel}/>
        <h2 style={{color:C.text,fontWeight:800,margin:0,fontSize:20}}>{editPlace?t.editPlace:t.addPlace}</h2>
      </div>
      <div style={{marginBottom:18}}>
        <label style={{color:C.muted,fontSize:12,marginBottom:8,display:"block"}}>{t.addImgUrl} (max 5)</label>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:8}}>
          {f.images.map((img,i)=>(
            <div key={i} style={{width:74,height:74,borderRadius:14,overflow:"hidden",position:"relative"}}>
              <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <button onClick={()=>set("images",f.images.filter((_,j)=>j!==i))} style={{position:"absolute",top:3,right:3,background:C.red,border:"none",borderRadius:"50%",width:20,height:20,cursor:"pointer",color:"#fff",fontSize:12,lineHeight:"20px",padding:0}}>×</button>
            </div>
          ))}
          {f.images.length<5&&<div onClick={()=>document.getElementById("imgIn").focus()} style={{width:74,height:74,borderRadius:14,border:`2px dashed ${C.faint}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:28,color:"rgba(255,255,255,0.2)"}}>+</div>}
        </div>
        <div style={{display:"flex",gap:8}}>
          <input id="imgIn" value={imgUrl} onChange={e=>setImgUrl(e.target.value)} placeholder="https://example.com/photo.jpg" style={{...IS,marginBottom:0,flex:1}} onKeyDown={e=>e.key==="Enter"&&addImg()}/>
          <button onClick={addImg} style={{background:"rgba(108,99,255,0.25)",border:"none",borderRadius:14,padding:"0 16px",color:"#A8A4FF",cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>Add</button>
        </div>
      </div>
      {[{k:"name",ph:"e.g. Brindavan Gardens",l:t.placeName},{k:"city",ph:"e.g. Mysuru",l:t.city},{k:"description",ph:"Describe this amazing place...",l:t.desc,ta:true},{k:"bestTime",ph:"e.g. October to March",l:t.bestTime},{k:"weatherInfo",ph:"e.g. Cool, 18–26°C",l:t.weather}].map(({k,ph,l,ta})=>(
        <div key={k} style={{marginBottom:14}}>
          <label style={{color:C.muted,fontSize:12,marginBottom:6,display:"block"}}>{l}</label>
          {ta?<textarea value={f[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} rows={3} style={{...IS,resize:"vertical",marginBottom:0}}/>:<input value={f[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} style={IS}/>}
        </div>
      ))}
      <div style={{marginBottom:16}}>
        <label style={{color:C.muted,fontSize:12,marginBottom:8,display:"block"}}>{t.category}</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {CATEGORIES.filter(x=>x!=="All").map(cat=>(
            <button key={cat} onClick={()=>set("category",cat)} style={{background:f.category===cat?C.grad:"rgba(255,255,255,0.06)",border:"none",borderRadius:20,padding:"6px 14px",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:f.category===cat?700:400,fontFamily:"inherit"}}>{CAT_ICONS[cat]} {cat}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom:18}}>
        <label style={{color:C.muted,fontSize:12,marginBottom:8,display:"block"}}>📍 {t.location}</label>
        <div style={{display:"flex",gap:10,marginBottom:8}}>
          <input value={f.lat} onChange={e=>set("lat",parseFloat(e.target.value)||0)} type="number" step="0.0001" placeholder="Latitude" style={{...IS,marginBottom:0,flex:1}}/>
          <input value={f.lng} onChange={e=>set("lng",parseFloat(e.target.value)||0)} type="number" step="0.0001" placeholder="Longitude" style={{...IS,marginBottom:0,flex:1}}/>
        </div>
        {gps&&<button onClick={()=>{set("lat",gps.lat);set("lng",gps.lng);}} style={{background:"rgba(46,213,115,0.12)",border:`1px solid rgba(46,213,115,0.3)`,borderRadius:14,padding:"9px 14px",color:C.green,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:8,fontFamily:"inherit",width:"100%"}}>📡 {t.useGPS}</button>}
        <button onClick={()=>setShowPicker(v=>!v)} style={{background:C.card,border:`1px solid ${C.border}`,width:"100%",padding:"10px",color:C.muted,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,borderRadius:16,fontFamily:"inherit",marginBottom:showPicker?8:0}}>
          🗺️ {showPicker?"Hide map":t.pickMap}
        </button>
        {showPicker&&(
          <div style={{borderRadius:18,overflow:"hidden"}}>
            <Leaflet center={[f.lat,f.lng]} zoom={12} places={[{id:"p",lat:f.lat,lng:f.lng,name:"Selected",category:"",images:[]}]} userGPS={gps} onMapClick={({lat,lng})=>{set("lat",lat);set("lng",lng);}} height={220}/>
            <div style={{padding:"6px 10px",fontSize:12,color:C.muted,background:"rgba(0,0,0,0.3)"}}>Tap anywhere on the map to set location</div>
          </div>
        )}
      </div>
      <button onClick={()=>validate()&&onSave(f)} style={BP}>{t.save}</button>
      <button onClick={onCancel} style={BG}>{t.cancel}</button>
    </div>
  );
}

function NotifView({t,notifs,profiles,places,onSelect,onMarkRead,fetchProfile}){
  const icons={like:"❤️",comment:"💬",reply:"↩️"};
  const msgs={like:"liked your place",comment:"commented on your place",reply:"replied to a comment"};
  useEffect(()=>{notifs.forEach(n=>{if(!profiles[n.fromUserId])fetchProfile(n.fromUserId);});},[notifs.length]);
  return(
    <div style={{padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h2 style={{color:C.text,fontWeight:800,fontSize:22,margin:0}}>🔔 {t.notif}</h2>
        <button onClick={onMarkRead} style={{background:"rgba(108,99,255,0.18)",border:"none",borderRadius:12,padding:"6px 14px",color:"#A8A4FF",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit"}}>{t.markRead}</button>
      </div>
      {notifs.length===0
        ?<div style={{textAlign:"center",padding:60,color:"rgba(255,255,255,0.18)"}}><div style={{fontSize:52}}>🔔</div><div style={{marginTop:8}}>No notifications yet</div></div>
        :notifs.map(n=>{
          const from=profiles[n.fromUserId];
          const place=places.find(p=>p.id===n.placeId);
          return(
            <div key={n.id} onClick={()=>place&&onSelect(place)} style={{display:"flex",gap:12,padding:"13px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer",opacity:n.read?0.5:1}}>
              <div style={{position:"relative"}}><Avatar user={from} size={44}/><div style={{position:"absolute",bottom:-2,right:-2,fontSize:14}}>{icons[n.type]||"🔔"}</div></div>
              <div style={{flex:1}}>
                <div style={{color:C.text,fontSize:14}}><strong>{from?.name||from?.username||"Someone"}</strong> {msgs[n.type]||"interacted"}</div>
                {place&&<div style={{color:C.accent,fontSize:13,marginTop:2}}>📍 {place.name}</div>}
                <div style={{color:"rgba(255,255,255,0.22)",fontSize:12,marginTop:3}}>{ago(n.createdAt)}</div>
              </div>
              {!n.read&&<div style={{width:9,height:9,borderRadius:"50%",background:C.accent,flexShrink:0,marginTop:6}}/>}
            </div>
          );
        })
      }
    </div>
  );
}

function ProfileView({t,targetUser,user,places,userLikes,userFavs,gps,onSelect,isOwn,onEdit}){
  const[tab,setTab]=useState("posts");
  const myPlaces=places.filter(p=>p.userId===targetUser?.id);
  const favPlaces=places.filter(p=>userFavs.has(p.id));
  const totalLikes=myPlaces.reduce((a,p)=>a+(p.likeCount||0),0);
  if(!targetUser)return <div style={{padding:32,textAlign:"center",color:C.muted}}>Loading…</div>;
  return(
    <div>
      <div style={{background:`linear-gradient(135deg,${C.card},#0d1528)`,padding:"24px 16px 16px"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:14}}>
          <Avatar user={targetUser} size={78}/>
          <div style={{flex:1}}>
            <h2 style={{color:C.text,fontWeight:900,fontSize:22,margin:"0 0 3px"}}>{targetUser.name||targetUser.username}</h2>
            <div style={{color:"#A8A4FF",fontSize:14}}>@{targetUser.username||targetUser.name}</div>
            {targetUser.location&&<div style={{color:C.muted,fontSize:13,marginTop:4}}>📍 {targetUser.location}</div>}
          </div>
          {isOwn&&<button onClick={onEdit} style={{background:"rgba(255,255,255,0.07)",border:"none",borderRadius:14,padding:"8px 14px",color:C.text,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit"}}>✏️ Edit</button>}
        </div>
        {targetUser.bio&&<p style={{color:"rgba(255,255,255,0.55)",fontSize:14,margin:"0 0 14px",lineHeight:1.6}}>{targetUser.bio}</p>}
        <div style={{display:"flex",gap:28}}>
          {[["Places",myPlaces.length],["Likes",totalLikes],...(isOwn?[["Saved",favPlaces.length]]:[])]
            .map(([l,v])=><div key={l} style={{textAlign:"center"}}><div style={{color:C.text,fontWeight:800,fontSize:20}}>{v}</div><div style={{color:C.muted,fontSize:12}}>{l}</div></div>)}
        </div>
      </div>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`}}>
        {[["posts",`📍 ${t.myPosts}`],...(isOwn?[["favs",`⭐ ${t.favorites}`]]:[])].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,background:"transparent",border:"none",padding:"13px 0",color:tab===id?C.accent:C.muted,fontWeight:tab===id?700:400,fontSize:14,cursor:"pointer",borderBottom:`2px solid ${tab===id?C.accent:"transparent"}`,fontFamily:"inherit"}}>{label}</button>
        ))}
      </div>
      <div style={{padding:16}}>
        {tab==="posts"&&(myPlaces.length===0
          ?<div style={{textAlign:"center",padding:50,color:"rgba(255,255,255,0.18)"}}><div style={{fontSize:52}}>📍</div><div style={{marginTop:8}}>No places yet</div></div>
          :<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {myPlaces.map(p=>(
              <div key={p.id} onClick={()=>onSelect(p)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,overflow:"hidden",cursor:"pointer"}}>
                <div style={{height:98,background:"#1a1f3e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>
                  {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:CAT_ICONS[p.category]||"📍"}
                </div>
                <div style={{padding:"8px 10px"}}>
                  <div style={{color:C.text,fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                  <div style={{color:C.muted,fontSize:11}}>❤️ {p.likeCount||0}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="favs"&&isOwn&&(favPlaces.length===0
          ?<div style={{textAlign:"center",padding:50,color:"rgba(255,255,255,0.18)"}}><div style={{fontSize:52}}>⭐</div><div style={{marginTop:8}}>No saved places</div></div>
          :<div style={{display:"flex",flexDirection:"column",gap:14}}>{favPlaces.map(p=><LargeCard key={p.id} place={p} onSelect={onSelect} userLikes={userLikes} user={user} onLike={()=>{}}/>)}</div>
        )}
      </div>
    </div>
  );
}

function SettingsView({t,profile,onUpdateProfile,onChangePw,lang,setLang,showToast,user,isAdmin,onAdmin}){
  const[sec,setSec]=useState("main");
  const[f,setF]=useState({name:profile?.name||"",bio:profile?.bio||"",location:profile?.location||""});
  const[pw,setPw]=useState({n:"",c:""});

  if(sec==="profile")return(
    <div style={{padding:16}}>
      <Back onClick={()=>setSec("main")} label={t.editProfile}/>
      {[["name","Full Name"],["bio",t.bio],["location",t.location]].map(([k,l])=>(
        <div key={k} style={{marginBottom:14}}>
          <label style={{color:C.muted,fontSize:12,marginBottom:6,display:"block"}}>{l}</label>
          {k==="bio"?<textarea value={f[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} rows={3} style={{...IS,resize:"none",marginBottom:0}}/>:<input value={f[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} style={IS}/>}
        </div>
      ))}
      <button onClick={()=>{onUpdateProfile(f);setSec("main");}} style={BP}>{t.save}</button>
    </div>
  );

  if(sec==="password")return(
    <div style={{padding:16}}>
      <Back onClick={()=>setSec("main")} label={t.changePw}/>
      <input type="password" placeholder="New Password" style={IS} onChange={e=>setPw(p=>({...p,n:e.target.value}))}/>
      <input type="password" placeholder="Confirm Password" style={IS} onChange={e=>setPw(p=>({...p,c:e.target.value}))}/>
      <button onClick={()=>{if(pw.n!==pw.c){showToast("Passwords don't match","error");return;}if(pw.n.length<6){showToast("Min 6 characters","error");return;}onChangePw(pw.n);setSec("main");}} style={BP}>{t.save}</button>
    </div>
  );

  return(
    <div style={{padding:16}}>
      <h2 style={{color:C.text,fontWeight:800,fontSize:22,marginBottom:18}}>⚙️ {t.settings}</h2>
      <div style={{background:C.card,border:`1px solid ${C.border}`,padding:16,display:"flex",gap:14,alignItems:"center",marginBottom:20,borderRadius:20}}>
        <Avatar user={profile} size={56}/>
        <div><div style={{color:C.text,fontWeight:800,fontSize:16}}>{profile?.name||profile?.username}</div><div style={{color:C.muted,fontSize:13}}>{user?.email}</div></div>
      </div>
      {[{icon:"👤",label:t.editProfile,fn:()=>setSec("profile")},{icon:"🔒",label:t.changePw,fn:()=>setSec("password")},...(isAdmin?[{icon:"🛡️",label:t.admin,fn:onAdmin,color:"#FF6B9D"}]:[])].map((item,i)=>(
        <div key={i} onClick={item.fn} style={{background:C.card,border:`1px solid ${C.border}`,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14,cursor:"pointer",borderRadius:16}}>
          <span style={{fontSize:22}}>{item.icon}</span>
          <span style={{color:item.color||C.text,fontWeight:600,fontSize:15,flex:1}}>{item.label}</span>
          <span style={{color:"rgba(255,255,255,0.2)"}}>›</span>
        </div>
      ))}
      <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"14px 16px",borderRadius:16}}>
        <div style={{color:C.muted,fontSize:12,marginBottom:10}}>🌐 {t.lang}</div>
        <div style={{display:"flex",gap:8}}>
          {Object.entries(LANGS).map(([k,v])=>(
            <button key={k} onClick={()=>setLang(k)} style={{background:lang===k?C.grad:"rgba(255,255,255,0.07)",border:"none",borderRadius:12,padding:"8px 14px",color:"#fff",cursor:"pointer",fontWeight:lang===k?700:400,fontSize:14,fontFamily:"inherit"}}>{v}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Back({onClick,label}){
  return <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}><IBtn icon="←" onClick={onClick}/><h2 style={{color:C.text,fontWeight:800,margin:0,fontSize:20}}>{label}</h2></div>;
}

function AdminView({t,places,profiles,onDelete}){
  const[tab,setTab]=useState("places");
  const[confirm,setConfirm]=useState(null);
  const users=Object.values(profiles);
  return(
    <div style={{padding:16}}>
      <h2 style={{color:"#FF6B9D",fontWeight:800,fontSize:22,marginBottom:14}}>🛡️ {t.admin}</h2>
      <div style={{display:"flex",gap:10,marginBottom:18}}>
        {[["places",`Places (${places.length})`],["users",`Users (${users.length})`]].map(([tb,l])=>(
          <button key={tb} onClick={()=>setTab(tb)} style={{background:tab===tb?"rgba(255,107,157,0.18)":C.card,border:`1px solid ${tab===tb?"#FF6B9D":C.border}`,borderRadius:14,padding:"8px 18px",color:tab===tb?"#FF6B9D":C.muted,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>{l}</button>
        ))}
      </div>
      {tab==="places"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {places.map(p=>(
            <div key={p.id} style={{background:C.card,border:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderRadius:16}}>
              <div style={{width:44,height:44,borderRadius:12,overflow:"hidden",flexShrink:0,background:"#1a1f3e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                {p.images?.[0]?<img src={p.images[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:CAT_ICONS[p.category]||"📍"}
              </div>
              <div style={{flex:1}}><div style={{color:C.text,fontWeight:700,fontSize:14}}>{p.name}</div><div style={{color:C.muted,fontSize:12}}>{p.city} • ❤️ {p.likeCount||0}</div></div>
              <button onClick={()=>setConfirm(p.id)} style={{background:"rgba(255,71,87,0.2)",border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",color:C.red,fontSize:16}}>🗑️</button>
            </div>
          ))}
        </div>
      )}
      {tab==="users"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {users.map(u=>(
            <div key={u.id} style={{background:C.card,border:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderRadius:16}}>
              <Avatar user={u} size={44}/>
              <div><div style={{color:C.text,fontWeight:700}}>{u.name||u.username}</div><div style={{color:C.muted,fontSize:12}}>@{u.username||u.name}{u.isAdmin?" • 🛡️":""}</div></div>
            </div>
          ))}
        </div>
      )}
      {confirm&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:24}}>
          <div style={{background:"#151929",borderRadius:24,padding:28,width:"100%",maxWidth:300,textAlign:"center",border:`1px solid ${C.border}`}}>
            <h3 style={{color:C.text,marginBottom:20}}>Delete this place?</h3>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirm(null)} style={{flex:1,background:"rgba(255,255,255,0.07)",border:"none",borderRadius:14,padding:12,color:C.text,cursor:"pointer",fontFamily:"inherit"}}>{t.cancel}</button>
              <button onClick={()=>{onDelete(confirm);setConfirm(null);}} style={{flex:1,background:C.red,border:"none",borderRadius:14,padding:12,color:"#fff",cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
