(()=>{"use strict";const e=document.querySelector(".date"),t=document.querySelector(".time"),n=document.querySelector(".greeting"),o=document.querySelector(".name");let a,c=new Date;function r(){const e=c.getHours();return e<=5?"Night":e<=11?"Morning":e<=17?"Day":e<=23?"Evening":void 0}const s=document.querySelector("body");function u(){a||(a=Math.floor(20*Math.random())+1);const e=a.toString().padStart(2,"0"),t=r().toLowerCase(),n=new Image;n.src=`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${t}/${e}.jpg`,n.onload=()=>{s.style.backgroundImage=`url(${n.src})`}}s.style.backgroundImage="url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";const l=document.querySelector(".slide-prev"),i=document.querySelector(".slide-next"),d=document.querySelector(".quote"),g=document.querySelector(".author"),m=document.querySelector(".change-quote");async function h(){const e=await fetch("../assets/data/quotesData.json"),t=await e.json(),n=(o=t.length,Math.floor(Math.random()*o));var o;d.textContent=t[n].text,g.textContent=t[n].author}i.addEventListener("click",(function(){a<20?a++:a=1,u()})),l.addEventListener("click",(function(){a>1?a--:a=20,u()})),m.addEventListener("click",h),window.addEventListener("load",(function(){localStorage.getItem("name")?o.value=localStorage.getItem("name"):o.value=""})),window.addEventListener("beforeunload",(function(){localStorage.setItem("name",o.value)})),function o(){const a=(new Date).toLocaleTimeString(),s=`Good ${r()}`;t.textContent=a,n.textContent=s,function(){const t=c.toLocaleDateString("en-En",{weekday:"long",month:"long",day:"numeric"});e.textContent=t}(),setTimeout(o,1e3)}(),u(),h()})();