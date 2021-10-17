(()=>{"use strict";const e=document.querySelector(".date"),t=document.querySelector(".time"),n=document.querySelector(".greeting"),o=document.querySelector(".name");let a,s=new Date;function c(){const e=s.getHours();return e<=5?"Night":e<=11?"Morning":e<=17?"Day":e<=23?"Evening":void 0}const r=document.querySelector("body");function i(){a||(a=Math.floor(20*Math.random())+1);const e=a.toString().padStart(2,"0"),t=c().toLowerCase(),n=new Image;n.src=`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${t}/${e}.jpg`,n.onload=()=>{r.style.backgroundImage=`url(${n.src})`}}r.style.backgroundImage="url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";const u=document.querySelector(".slide-prev"),d=document.querySelector(".slide-next"),l=document.querySelector(".quote"),m=document.querySelector(".author"),g=document.querySelector(".change-quote");async function p(){const e=await fetch("../assets/data/quotesData.json"),t=await e.json(),n=(o=t.length,Math.floor(Math.random()*o));var o;l.textContent=t[n].text,m.textContent=t[n].author}const w=document.querySelector(".weather-icon"),y=document.querySelector(".temperature"),v=document.querySelector(".weather-description"),h=document.querySelector(".city");async function f(){h.value||(h.value="Minsk");const e=`https://api.openweathermap.org/data/2.5/weather?q=${h.value}&lang=ru&appid=abe902bf94114fcd5fea4eb6170592ab&units=metric`,t=await fetch(e),n=await t.json();w.className="weather-icon owf",w.classList.add(`owf-${n.weather[0].id}`),y.textContent=`${n.main.temp}°C`,v.textContent=n.weather[0].description}h.addEventListener("change",f);const S=[{title:"Aqua Caelestis",src:"../assets/sounds/Aqua Caelestis.mp3",duration:"00:40"},{title:"River Flows In You",src:"../assets/sounds/River Flows In You.mp3",duration:"01:37"},{title:"Summer Wind",src:"../assets/sounds/Summer Wind.mp3",duration:"01:51"},{title:"Ennio Morricone",src:"../assets/sounds/Ennio Morricone.mp3",duration:"01:37"}],q=document.querySelector(".play"),L=document.querySelector(".play-next"),E=document.querySelector(".play-prev"),k=document.querySelector(".play-list"),C=new Audio;let x=!1,b=0;function I(){C.currentTime||(C.src=S[b].src,C.currentTime=0),C.play(),j(),q.classList.add("pause"),x=!0}function M(){C.pause(),C.currentTime=0,q.classList.remove("pause"),x=!1}function $(){M(),b<S.length-1?b++:b=0,j(),I()}function j(){const e=k.querySelectorAll("li");e.forEach((e=>{e.classList.remove("item-active")})),e[b].classList.add("item-active")}d.addEventListener("click",(function(){a<20?a++:a=1,i()})),u.addEventListener("click",(function(){a>1?a--:a=20,i()})),g.addEventListener("click",p),q.addEventListener("click",(function(){x?(C.pause(),q.classList.remove("pause"),x=!1):I()})),L.addEventListener("click",$),E.addEventListener("click",(function(){M(),b>0?b--:b=S.length-1,j(),I()})),C.addEventListener("ended",$),window.addEventListener("load",(function(){localStorage.getItem("name")?o.value=localStorage.getItem("name"):o.value=""})),window.addEventListener("beforeunload",(function(){localStorage.setItem("name",o.value)})),window.addEventListener("load",f),window.addEventListener("load",(function o(){const a=(new Date).toLocaleTimeString(),r=`Good ${c()}`;t.textContent=a,n.textContent=r,function(){const t=s.toLocaleDateString("en-En",{weekday:"long",month:"long",day:"numeric"});e.textContent=t}(),setTimeout(o,1e3)})),window.addEventListener("load",i),window.addEventListener("load",p),S.forEach(((e,t)=>{const n=document.createElement("li");n.classList.add("play-item"),n.textContent=S[t].title,k.append(n)}))})();