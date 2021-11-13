(()=>{"use strict";function t(t,n){const e=document.querySelector("main");e.classList.add("hiding"),setTimeout((()=>{e.innerHTML=t(),n(),e.classList.remove("hiding")}),300)}function n(t){for(let n=t.length-1;n>0;n--){let e=Math.floor(Math.random()*(n+1)),s=t[n];t[n]=t[e],t[e]=s}return t}function e(){let t=Math.ceil(0),n=Math.floor(240);return Math.floor(Math.random()*(n-t))+t}function s(){return'\n    <div class="choose_author_page">\n      <div class="top">\n          <div class="back">\n              <button class="back_button"></button>\n          </div>\n          <div class="header font30 font700">\n              Who is the author of this picture?\n          </div>\n          <button class="timer">\n              00:00\n          </button>\n      </div>\n      <div class="middle">\n          <div class="item">\n              \n          </div>\n          <div class="bullets">\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n              <div class="bullet"></div>\n          </div>\n      </div>\n      \n      <div class="bottom font24">\n          <button class="bottom_item">1item</button>\n          <button class="bottom_item">2item</button>\n          <button class="bottom_item">3item</button>\n          <button class="bottom_item">4item</button>\n      </div>\n  </div>\n    '}let i={authorAnswers:[],authorQuestionIndex:void 0,authorUserAnswers:[],authorCategoriesScoreNumber:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0}};function o(e,o=[]){i.authorQuestionIndex=e,t(s,(()=>{document.querySelector(".item").style.backgroundImage=`url(assets/images/full/${e}full.jpg)`,document.querySelector(".back_button").addEventListener("click",(()=>v("author"))),document.querySelectorAll(".bullet").forEach(((t,n)=>{!0===o[n]?t.style.background="green":!1===o[n]?t.style.background="red":t.style.background="grey"}));let t=[...document.querySelectorAll(".bottom_item")];n(t),i.authorAnswers=[],t.forEach((t=>{u(e,t)})),console.log(e)}))}async function u(t,n){let s=(await async function(t){const n=await fetch("js/images.json");return(await n.json())[t]}(t)).author;i.authorAnswers.indexOf(s)>-1?u(e(),n):(i.authorAnswers.push(s),n.textContent=s,n.addEventListener("click",(()=>{n.textContent===i.authorAnswers[0]?(n.style.background="#88ff00",setTimeout((()=>{i.authorUserAnswers.push(!0),(i.authorQuestionIndex+1)%10!=0&&o(i.authorQuestionIndex+1,i.authorUserAnswers)}),500)):(setTimeout((()=>{i.authorUserAnswers.push(!1),(i.authorQuestionIndex+1)%10!=0&&o(i.authorQuestionIndex+1,i.authorUserAnswers)}),500),n.style.background="#ff0022"),(i.authorQuestionIndex+1)%10==0&&(i.authorCategoriesScoreNumber[(i.authorQuestionIndex-9)/10]=i.authorUserAnswers.filter((t=>!0===t)).length,i.authorUserAnswers=[],console.log(i.authorCategoriesScoreNumber),v("author"))})))}function c(){return'\n    <div class="choose_picture_page">\n    <div class="top">\n        <div class="back">\n            <button class="back_button"></button>\n        </div>\n        <div class="header font30 font700">\n            What picture was written by <span class="header_author">[name of artist]</span>\n        </div>\n        <button class="timer">\n            00:00\n        </button>\n    </div>\n    <div class="middle">\n        <div class="items">\n            <button class="item">\n            \n            </button>\n            <button class="item">\n                \n            </button>\n            <button class="item">\n                \n            </button>\n            <button class="item">\n                \n            </button>\n        </div>\n        \n        <div class="bullets">\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n            <div class="bullet"></div>\n        </div>\n    </div>\n</div>\n    \n    \n    \n    '}let a={picturesAnswers:[],picturesQuestionIndex:void 0,picturesUserAnswers:[],picturesCategoriesScoreNumber:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0}};function r(e,s=[]){a.picturesQuestionIndex=e,t(c,(async()=>{const t=document.querySelector(".header_author"),i=await l(e);t.textContent=i.author,a.picturesAnswers=[];let o=[...document.querySelectorAll(".item")];n(o),o.forEach((t=>{d(e,t)})),document.querySelector(".back_button").addEventListener("click",(()=>v("pictures"))),document.querySelectorAll(".bullet").forEach(((t,n)=>{!0===s[n]?t.style.background="green":!1===s[n]?t.style.background="red":t.style.background="grey"}))}))}async function l(t){const n=await fetch("js/images.json");return(await n.json())[t]}async function d(t,n){let s=(await l(t)).imageNum;a.picturesAnswers.indexOf(s)>-1?d(e(),n):(a.picturesAnswers.push(s),n.style.background=`url(assets/images/square/${s}.jpg)`,n.style.backgroundSize="cover",n.style.backgroundPosition="50%",n.dataset.picture=s,n.addEventListener("click",(()=>{n.dataset.picture===a.picturesAnswers[0]?(n.style.outline="5px solid #88ff00",setTimeout((()=>{a.picturesUserAnswers.push(!0),(a.picturesQuestionIndex+1)%10!=0&&r(a.picturesQuestionIndex+1,a.picturesUserAnswers)}),500)):(setTimeout((()=>{a.picturesUserAnswers.push(!1),(a.picturesQuestionIndex+1)%10!=0&&r(a.picturesQuestionIndex+1,a.picturesUserAnswers)}),500),n.style.outline="5px solid #ff0022"),(a.picturesQuestionIndex+1)%10==0&&(a.picturesCategoriesScoreNumber[(a.picturesQuestionIndex-9)/10]=a.picturesUserAnswers.filter((t=>!0===t)).length,a.picturesUserAnswers=[],console.log(a.picturesCategoriesScoreNumber),v("pictures"))})))}function v(n){t(b,(()=>function(t){!function(t){const n=document.querySelectorAll(".item");"author"===t?n.forEach(((n,e)=>{m(t,n,e,e>0?10*e:e)})):"pictures"===t&&n.forEach(((n,e)=>{m(t,n,e,12*e>0?10*(e+12):e+120)}))}(t),document.querySelector(".home_button").addEventListener("click",(()=>f()))}(n)))}function b(){return'\n    <div class="categories_page">\n  <div class="top">\n      <div class="header">\n          Categories\n      </div>\n      <div class="buttons_wrapper">\n          <button class="home_button button">\n              \n          </button>\n      </div>\n  </div>\n  <div class="middle">\n      <div class="items_wrapper">\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      <button class="item"></button>\n      </div>\n  </div>\n    '}function m(t,n,e,s){if("author"===t)n.addEventListener("click",(()=>o(s)));else{if("pictures"!==t)throw Error("wrong category");n.addEventListener("click",(()=>r(s)))}n.innerHTML=`\n        <div class="item_number">${e+1}</div>\n        <button class="item_score">10/10</button>\n        `,n.style.backgroundImage=`url(assets/images/square/${s}.jpg)`}function h(){return'\n      <div class="settings_page">\n  <div class="top">\n      <div class="header">\n          Settings\n      </div>\n  </div>\n  <div class="middle">\n  \n      <div class="item">\n          <div class="item_top sound">\n  \n          </div>\n          <div class="item_middle">\n              <div class="sound_off"></div>\n              <input type="range" name="volume_range">\n          </div>\n          <div class="item_bottom font30 font700">Volume</div>\n      </div>\n  \n  \n      <div class="item">\n          <div class="item_top time">\n          </div>\n          <div class="item_middle">\n              <input type="checkbox" name="timer_checkbox">\n              <input type="range" name="timer_range">\n          </div>\n  \n          <div class="item_bottom font30 font700">Time game</div>\n      </div>\n  \n  \n  \n  </div>\n  \n  <div class="bottom">\n      <button class="save_button button button_center">\n          Save\n      </button>\n      <button class="defaults_button button button_center">\n          Defaults\n      </button>\n  </div>\n  </div>\n      '}function p(){const t=document.querySelector(".save_button"),n=document.querySelector(".defaults_button");t.addEventListener("click",(()=>{console.log("save!")})),n.addEventListener("click",(()=>{console.log("defaults!")}))}function f(){t(g,_)}function g(){return'\n    <div class="start_page">\n  <div class="top">\n      <div class="logo">\n  \n      </div>\n  </div>\n  <div class="middle">\n      <div class="item">\n          <button class="item_img author">\n          </button>\n          <div class="item_descr font36">\n              <span class="font700">Artists</span> quiz\n          </div>\n      </div>\n      <div class="item">\n          <button class="item_img picture">\n          </button>\n          <div class="item_descr font36">\n              <span class="font700">Pictures</span> quiz\n          </div>\n      </div>\n  </div>\n  <div class="bottom">\n      <button class="settings_button button">\n          Settings\n      </button>\n  </div>\n  </div>\n    '}function _(){document.querySelector(".settings_button").addEventListener("click",(()=>{t(h,p)})),document.querySelector(".item_img.author").addEventListener("click",(()=>v("author"))),document.querySelector(".item_img.picture").addEventListener("click",(()=>v("pictures")))}document.addEventListener("DOMContentLoaded",(function(){f()}))})();