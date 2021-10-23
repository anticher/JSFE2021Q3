(()=>{"use strict";let e={data:{language:"",weatherLanguage:"",photoSource:"",userName:"",city:"",settingsInputsStatus:{sourceTagInput:"",sourceTagInputBlock:!1}},setStateLanguage(e){"russian"===e?(this.data.language="russian",this.data.weatherLanguage="ru"):(this.data.language="english",this.data.weatherLanguage="en")},setStateUserName(e){this.data.userName=e},setStateCity(e){this.data.city=e},setStatePhotoSource(e){this.data.photoSource=e},setStatePhotoTag(e){this.data.settingsInputsStatus.sourceTagInput=e},setStatePhotoTagBlock(e){this.data.settingsInputsStatus.sourceTagInputBlock=e}};const t={english:{"Good Afternoon":"Good afternoon","Good Evening":"Good evening","Good Night":"Good night","Good Morning":"Good morning",PlaceHolder:"[Enter name]"},russian:{"Good Afternoon":"Добрый день","Good Evening":"Добрый вечер","Good Night":"Доброй ночи","Good Morning":"Доброе утро",PlaceHolder:"[Введите имя]"}},o=document.querySelector(".weather-icon"),n=document.querySelector(".temperature"),a=document.querySelector(".wind"),c=document.querySelector(".humidity"),s=document.querySelector(".weather-description"),r=document.querySelector(".weather-error"),u=document.querySelector(".city");async function i(t){const i=`https://api.openweathermap.org/data/2.5/weather?q=${u.value}&lang=${t}&appid=abe902bf94114fcd5fea4eb6170592ab&units=metric`,d=await fetch(i),l=await d.json();l.cod>=400?(r.textContent="ru"===t?"Название города введено некорректно":"Wrong city name",o.className="",a.textContent="",c.textContent="",n.textContent="",s.textContent=""):(r.textContent="",o.className="weather-icon owf",o.classList.add(`owf-${l.weather[0].id}`),n.textContent=`${Math.ceil(l.main.temp)}°C`,s.textContent=l.weather[0].description,"en"===t?(a.textContent=`Wind speed: ${Math.ceil(l.wind.speed)} m/s`,c.textContent=`Humidity: ${l.main.humidity}%`):"ru"===t&&(a.textContent=`Скорость ветра: ${Math.ceil(l.wind.speed)} м/с`,c.textContent=`Влажность: ${l.main.humidity}%`)),"Minsk"===u.value||"Минск"===u.value?(e.data.city="",u.value="ru"===t?"Минск":"Minsk"):e.data.city=u.value}const d=document.querySelector(".quote"),l=document.querySelector(".author"),g=document.querySelector(".change-quote");async function m(e){const t=`../assets/data/${e}QuotesData.json`,o=await fetch(t),n=await o.json(),a=(c=n.length,Math.floor(Math.random()*c));var c;d.textContent=n[a].text,l.textContent=n[a].author}const h=document.querySelector(".todos-button"),S=document.querySelector(".todos-input"),p=document.querySelector(".todos-output"),y=document.querySelector(".todos-window"),v=document.querySelector(".todos-overlay");let k=1;function L(e){"russian"===e?(S.placeholder="Новое дело",h.textContent="Задачи"):(S.placeholder="New Todo",h.textContent="Todo")}function f(){y.classList.toggle("active"),v.classList.toggle("active")}function q(e,t){const o=document.createElement("div");o.classList.add("todos-item"),o.id=`todosItem${k}`;const n=document.createElement("input");n.type="checkbox",n.classList.add("todos-checkbox"),n.id=`todosCheckbox${k}`,n.name="checkTodo",n.checked="true"===t,n.addEventListener("click",I);const a=document.createElement("label");a.classList.add("todos-label"),a.htmlFor=`todosCheckbox${k}`,a.textContent=e;const c=document.createElement("button");c.textContent="delete",c.classList.add("todos-delete"),c.id=`todosDelete${k}`,c.type="button";let s=(r=k,function(){document.querySelector(`#todosItem${r}`).remove(),function(e){localStorage.removeItem(`todoItem${e}`),localStorage.removeItem(`todoItemStatus${e}`)}(r)});var r;c.addEventListener("click",(()=>{s()})),o.append(n),o.append(a),o.append(c),p.append(o),function(e,t){localStorage.setItem(`todoItem${e}`,t)}(k,e),C(k,"true"===t),k++}function I(){let e=this.id.split("").splice(13).join("");!0===this.checked?C(e,!0):C(e,!1)}function C(e,t){localStorage.setItem(`todoItemStatus${e}`,t)}const w=document.querySelector(".settings-button"),E=document.querySelector(".settings-window"),x=document.querySelector(".settings-overlay"),b=document.querySelector(".weather"),T=document.querySelector(".player"),B=document.querySelector(".time"),$=document.querySelector(".date"),P=document.querySelector(".greeting-container"),H=document.querySelector(".quotes"),N=document.querySelector(".todos"),G=document.querySelector("#radioLanguageEnglish"),M=document.querySelector("#radioLanguageRussian"),A=document.querySelector("#radioGitHub"),D=document.querySelector("#radioUnsplash"),j=document.querySelector("#radioFlickr"),W=document.querySelector("#inputTag"),U=document.querySelector("#checkWeather"),_=document.querySelector("#checkPlayer"),F=document.querySelector("#checkTime"),R=document.querySelector("#checkDate"),Y=document.querySelector("#checkGreeting"),Q=document.querySelector("#checkQuotes"),V=document.querySelector("#checkTodos");function X(){w.classList.toggle("active"),E.classList.toggle("active"),x.classList.toggle("active")}function z(){!0===e.data.settingsInputsStatus.sourceTagInputBlock?(W.disabled=!0,W.value="",e.setStatePhotoTag(W.value)):W.disabled=!1}function J(){this===j?e.setStatePhotoSource("flickr"):this===D?e.setStatePhotoSource("unsplash"):e.setStatePhotoSource("github"),we(e.data.photoSource)}function K(){this===M?e.setStateLanguage("russian"):e.setStateLanguage("english"),Le(e.data.language),i(e.data.weatherLanguage),m(e.data.language),L(e.data.language),me(e.data.language)}function O(e,t){e.checked?t.classList.remove("visibility-hidden"):t.classList.add("visibility-hidden")}const Z=document.querySelector("#choseLanguage"),ee=document.querySelector("#chooseLanguageEnglish"),te=document.querySelector("#chooseLanguageRussian"),oe=document.querySelector("#chooseImageSource"),ne=document.querySelector("#enterTags"),ae=document.querySelector("#inputTag"),ce=document.querySelector("#chooseBlock"),se=document.querySelector("#chooseBlockTime"),re=document.querySelector("#chooseBlockDate"),ue=document.querySelector("#chooseBlockGreeting"),ie=document.querySelector("#chooseBlockQuotes"),de=document.querySelector("#chooseBlockWeather"),le=document.querySelector("#chooseBlockPlayer"),ge=document.querySelector("#chooseBlockToDo");function me(e){"russian"===e?(Z.textContent="Выберите язык",ee.textContent="Английский",te.textContent="Русский",oe.textContent="Выберите источник изображения",ne.textContent="Введите теги (только для Unsplash API и Flickr API)",ae.placeholder="тег,тег,тег,тег",ce.textContent="Выберите блок",se.textContent="Время",re.textContent="Дата",ue.textContent="Приветствие",ie.textContent="Цитаты",de.textContent="Погода",le.textContent="Проигрыватель",ge.textContent="Сделать"):(Z.textContent="Chose language",ee.textContent="English",te.textContent="Russian",oe.textContent="Choose image source",ne.textContent="Enter tags (only for Unsplash API and Flickr API)",ae.placeholder="tag,tag,tag,tag",ce.textContent="Choose block",se.textContent="Time",re.textContent="Date",ue.textContent="Greeting",ie.textContent="Quotes",de.textContent="Weather",le.textContent="Player",ge.textContent="ToDo")}const he=document.querySelector(".date"),Se=document.querySelector(".time"),pe=document.querySelector(".greeting"),ye=document.querySelector(".name");let ve,ke=new Date;function Le(e){fe(),function(e){const o=`Good ${qe()}`;pe.textContent=t[e][o],ye.placeholder=t[e].PlaceHolder}(e),function(e){const t={weekday:"long",month:"long",day:"numeric"};if("english"===e){const e=ke.toLocaleDateString("en-En",t);he.textContent=e}else if("russian"===e){const e=ke.toLocaleDateString("ru-Ru",t);he.textContent=e}}(e)}function fe(){const e=(new Date).toLocaleTimeString();Se.textContent=e,setTimeout(fe,1e3)}function qe(){const e=ke.getHours();return e<=5?"Night":e<=11?"Morning":e<=17?"Afternoon":e<=23?"Evening":void 0}const Ie=document.querySelector("body");function Ce(e){return Math.floor(Math.random()*e)+1}async function we(t){let o=qe().toLowerCase();const n=new Image;if(ve||(ve=Ce(20)),"github"===t){const t=ve.toString().padStart(2,"0");n.src=`https://raw.githubusercontent.com/anticher/stage1-tasks/assets/images/${o}/${t}.jpg`,e.setStatePhotoTagBlock(!0),z()}else if(e.setStatePhotoTagBlock(!1),z(),""!==e.data.settingsInputsStatus.sourceTagInput&&(o=e.data.settingsInputsStatus.sourceTagInput),"unsplash"===t){const e=`https://api.unsplash.com/photos/random?orientation=landscape&query=${o}&client_id=aoX0rDfQk1G2xigkewYXnpqSgjlV1kHW8YLBVAT5CkY`,t=await fetch(e),a=await t.json();n.src=a.urls.regular}else if("flickr"===t){let e=Ce(100);const t=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b71a9c1cb303457bc8491e750660b116&orientation=landscape&tags=${o}&extras=url_h,%20url_l&format=json&nojsoncallback=1`,a=await fetch(t),c=await a.json();c.photos.photo[e].url_l?n.src=c.photos.photo[e].url_l:n.src=c.photos.photo[e].url_h}n.onload=()=>{Ie.style.backgroundImage=`url(${n.src})`,Ie.style.backgroundSize="cover"}}const Ee=document.querySelector(".slide-prev"),xe=document.querySelector(".slide-next");function be(){xe.disabled=!0,Ee.disabled=!0}function Te(){setTimeout((function(){xe.disabled=!1,Ee.disabled=!1}),1500)}const Be=[{author:"Sensorica",title:"Aqua Caelestis",src:"../assets/sounds/Aqua Caelestis.mp3",duration:"00:40"},{author:"Yiruma",title:"River Flows In You",src:"../assets/sounds/River Flows In You.mp3",duration:"01:37"},{author:"Summer Wind",title:"Summer Wind",src:"../assets/sounds/Summer Wind.mp3",duration:"01:51"},{author:"Ennio Morricone",title:"Ennio Morricone",src:"../assets/sounds/Ennio Morricone.mp3",duration:"01:37"}],$e=document.querySelector(".play-current"),Pe=document.querySelector(".play-next"),He=document.querySelector(".play-prev"),Ne=new Audio,Ge=document.querySelector(".play-list"),Me=document.querySelector(".progress-bar-track-name");let Ae,De=!1,je=0;function We(){Ne.src=Be[je].src,Ne.currentTime=0,Me.textContent=`${je+1}. ${Be[je].author} - ${Be[je].title}`}function Ue(){Ne.currentTime||We(),Ne.play(),Ve(),$e.classList.add("pause"),Ae.classList.add("pause"),De=!0}function _e(){Ne.pause(),$e.classList.remove("pause"),Ae.classList.remove("pause"),De=!1}function Fe(){Ne.pause(),Ne.currentTime=0,$e.classList.remove("pause"),Ae.classList.remove("pause"),De=!1}function Re(){De?_e():Ue()}function Ye(){Fe(),je<Be.length-1?je++:je=0,Ve(),Ue()}function Qe(){this.dataset.trackNumber==je?Re():(Fe(),je=+this.dataset.trackNumber,Ve(),Ue())}function Ve(){const e=Ge.querySelectorAll("li");e.forEach((e=>{e.classList.remove("item-active"),e.lastChild.classList.remove("pause"),e.lastChild.classList.remove("play-little")})),e[je].classList.add("item-active"),e[je].lastChild.classList.add("play-little"),Ae=document.querySelector(".play-little"),Ae.classList.add("pause")}const Xe=document.querySelector(".progress-bar"),ze=document.querySelector(".progress-current"),Je=document.querySelector(".progress-total");function Ke(e,t=0){e.style.background=`linear-gradient(to right, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) ${t}%, transparent ${t}%, transparent 100%)`}function Oe(e){e=Math.round(e);let t=Math.floor(e/60)||0,o=e-60*t||0;return t+":"+(o<10?"0":"")+o}Xe.value=0;const Ze=document.querySelector(".mute-btn"),et=document.querySelector(".volume-bar");let tt=0;function ot(e,t,o){localStorage.getItem(t)?"true"===localStorage.getItem(t)?(e.checked=!0,o.classList.remove("visibility-hidden")):(e.checked=!1,o.classList.add("visibility-hidden")):(e.checked=!0,o.classList.remove("visibility-hidden"))}window.addEventListener("load",(function(){if("russian"===localStorage.getItem("language")?(e.setStateLanguage("russian"),G.checked=!1,M.checked=!0):(e.setStateLanguage("english"),M.checked=!1,G.checked=!0),localStorage.getItem("userName")?e.setStateUserName(localStorage.getItem("userName")):e.setStateUserName(""),ye.value=e.data.userName,localStorage.getItem("city")?(e.setStateCity(localStorage.getItem("city")),u.value=e.data.city):"russian"===e.data.language?u.value="Минск":u.value="Minsk",localStorage.getItem("photoSource")?e.setStatePhotoSource(localStorage.getItem("photoSource")):e.setStatePhotoSource("github"),"unsplash"===e.data.photoSource?(A.checked=!1,j.checked=!1,D.checked=!0):"flickr"===e.data.photoSource?(A.checked=!1,D.checked=!1,j.checked=!0):(D.checked=!1,j.checked=!1,A.checked=!0),localStorage.getItem("sourceTagInput")?e.setStatePhotoTag(localStorage.getItem("sourceTagInput")):e.setStatePhotoTag(""),W.value=e.data.settingsInputsStatus.sourceTagInput,localStorage.getItem("sourceTagInputBlock")?e.setStatePhotoTagBlock(localStorage.getItem("sourceTagInputBlock")):e.setStatePhotoTagBlock(!1),ot(U,"weatherHideButton",b),ot(_,"playerHideButton",T),ot(F,"timeHideButton",B),ot(R,"dateHideButton",$),ot(Y,"greetingHideButton",P),ot(Q,"quotesHideButton",H),ot(V,"todosHideButton",N),localStorage.getItem("todosCounter")){let e=localStorage.getItem("todosCounter");for(let t=1;t<e;t++)localStorage.getItem(`todoItem${t}`)&&q(localStorage.getItem(`todoItem${t}`),localStorage.getItem(`todoItemStatus${t}`))}})),window.addEventListener("beforeunload",(function(){localStorage.setItem("city",e.data.city),localStorage.setItem("language",e.data.language),localStorage.setItem("photoSource",e.data.photoSource),localStorage.setItem("userName",e.data.userName),localStorage.setItem("sourceTagInput",e.data.settingsInputsStatus.sourceTagInput),localStorage.setItem("sourceTagInputBlock",e.data.settingsInputsStatus.sourceTagInputBlock),localStorage.setItem("weatherHideButton",U.checked),localStorage.setItem("playerHideButton",_.checked),localStorage.setItem("timeHideButton",F.checked),localStorage.setItem("dateHideButton",R.checked),localStorage.setItem("greetingHideButton",Y.checked),localStorage.setItem("quotesHideButton",Q.checked),localStorage.setItem("todosHideButton",V.checked),localStorage.setItem("todosCounter",k)})),window.addEventListener("load",(()=>{we(e.data.photoSource)})),window.addEventListener("load",(()=>{Le(e.data.language)})),xe.addEventListener("click",(()=>{var t;t=e.data.photoSource,ve<20?ve++:ve=1,be(),we(t),Te()})),Ee.addEventListener("click",(()=>{var t;t=e.data.photoSource,ve>1?ve--:ve=20,be(),we(t),Te()})),ye.addEventListener("change",(()=>{e.setStateUserName(ye.value)})),window.addEventListener("load",(Be.forEach(((e,t)=>{const o=document.createElement("li");o.classList.add("play-item"),o.textContent=Be[t].title;const n=document.createElement("button");n.classList.add("play"),n.classList.add("player-icon"),n.dataset.trackNumber=t,0===t&&n.classList.add("play-little"),n.addEventListener("click",Qe),o.append(n),Ge.append(o)})),We(),void(Ae=document.querySelector(".play-little")))),$e.addEventListener("click",Re),Pe.addEventListener("click",Ye),He.addEventListener("click",(function(){Fe(),je>0?je--:je=Be.length-1,Ve(),Ue()})),Ne.addEventListener("ended",Ye),Ke(Xe),Ne.ontimeupdate=()=>{ze.textContent=Oe(Ne.currentTime),Je.textContent=Oe(Ne.duration),Ne.duration===Ne.currentTime&&_e(),0===Ne.currentTime?Ke(Xe):(Xe.value=100/Ne.duration*Ne.currentTime,Ke(Xe,Xe.value))},Xe.addEventListener("input",(function(){const e=this.value;Ne.currentTime=e/(100/Ne.duration),Ke(Xe)})),Ze.addEventListener("click",(function(){Ze.classList.contains("muted")?(Ze.classList.remove("muted"),et.value=tt,Ke(et,tt),Ne.volume=tt/100):(Ze.classList.add("muted"),tt=et.value,et.value=0,Ke(et),Ne.volume=0)})),Ne.volume=et.value/100,Ke(et,et.value),et.addEventListener("input",(function(){const e=this.value;Ke(et,e),Ne.volume=e/100,tt=e,e>0?Ze.classList.remove("muted"):Ze.classList.add("muted")})),window.addEventListener("load",(()=>{i(e.data.weatherLanguage)})),u.addEventListener("change",(()=>{i(e.data.weatherLanguage)})),window.addEventListener("load",(()=>{m(e.data.language)})),g.addEventListener("click",(()=>{m(e.data.language)})),window.addEventListener("load",z),window.addEventListener("load",(()=>{me(e.data.language)})),w.addEventListener("click",X),x.addEventListener("click",X),window.addEventListener("load",(()=>{L(e.data.language)})),h.addEventListener("click",f),v.addEventListener("click",f),S.addEventListener("change",(()=>{q(S.value,!1),S.value=""})),G.addEventListener("click",K),M.addEventListener("click",K),A.addEventListener("click",J),D.addEventListener("click",J),j.addEventListener("click",J),W.addEventListener("change",(function(){e.setStatePhotoTag(W.value),we(e.data.photoSource)})),U.addEventListener("change",(function(){O(this,b)})),_.addEventListener("change",(function(){O(this,T)})),F.addEventListener("change",(function(){O(this,B)})),R.addEventListener("change",(function(){O(this,$)})),Y.addEventListener("change",(function(){O(this,P)})),Q.addEventListener("change",(function(){O(this,H)})),V.addEventListener("change",(function(){O(this,N)})),console.log("\n1. Часы и календарь +15\n\n2. Приветствие +10\n\n3. Смена фонового изображения +20\n\n4. Виджет погоды +15\n\n5. Виджет цитата дня +10\n\n6. Аудиоплеер +15\n\n7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20\n\n8. Перевод приложения на два языка (en/ru или en/be) +15\n\n9. Получение фонового изображения от API +10 \n\n10. Настройки приложения +20\n\n11. Дополнительный функционал на выбор +10\n\nТребования к репозиторию выполнены\n\nТехнические требования выполнены\n\nТребования к оформлению приложения выполнены\n\nСпасибо за проверку и хорошего дня!\n")})();