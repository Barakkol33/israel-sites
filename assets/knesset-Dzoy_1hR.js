import{t as e}from"./features-DSEovFpp.js";e();var t=await(await fetch(`/israel-sites/data/knesset.json`)).json(),n,r=()=>n??=fetch(`/israel-sites/data/knesset-details.json`).then(e=>e.json()),{factions:i,mks:a,laws:o,failed:s}=t,c=[`#1f6fb2`,`#c4471b`,`#11806a`,`#7a4fb5`,`#b8860b`,`#c2337a`,`#3d7a2e`,`#5a6472`,`#0e8fa8`,`#a0522d`,`#6b4e16`,`#3f51b5`,`#8e244d`,`#2e7d6b`,`#786fa6`],l=Object.fromEntries(i.map((e,t)=>[e.id,{...e,color:c[t%c.length]}])),u={id:0,name:`בלי סיעה בנתונים`,color:`#7b7f88`},d=e=>l[e.faction]??u,f=Object.fromEntries(a.map(e=>[e.id,e])),ee=Object.fromEntries([...o,...s].map(e=>[e.id,e])),p=[[`for`,`בעד`,`v-for`],[`against`,`נגד`,`v-against`],[`abstain`,`נמנע`,`v-abstain`]],m=[`ממשלתית`,`פרטית`,`ועדה`],h=e=>e.vote&&e.vote.for.length+e.vote.against.length+e.vote.abstain.length>0,g={preliminary:`קריאה טרומית`,first:`קריאה ראשונה`,other:null,second:`קריאה שנייה`,reservation:`הסתייגויות`,third:`קריאה שלישית`},_=Object.keys(g),te=[`preliminary`,`first`,`third`,`other`],v=e=>[...e.stages??[]].sort((e,t)=>e.date.localeCompare(t.date)||_.indexOf(e.stage)-_.indexOf(t.stage)),y=e=>v(e).filter(e=>te.includes(e.stage)).at(-1),b=e=>String(e).replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`),x=e=>new Date(e).toLocaleDateString(`he-IL`,{day:`numeric`,month:`numeric`,year:`numeric`}),S=e=>e.split(` `).map(e=>e[0]).join(``),C=(e,t)=>`<span class="vote ${t}">${e}</span>`,w=`<div class="law-legend">${p.map(([,e,t])=>`<span><i class="${t}"></i>${e}</span>`).join(``)}</div>`;function T(e){let t=p.reduce((t,[n])=>t+e[n],0)||1;return`<div class="vote-bar" aria-hidden="true">${p.map(([n,,r])=>`<i class="${r}" style="width:${e[n]/t*100}%"></i>`).join(``)}</div>`}var E=(e,t=()=>!0)=>Object.fromEntries(p.map(([n])=>[n,e[n].filter(e=>t(f[e])).length]));function D(e,t){return h(e)?p.find(([n])=>e.vote[n].includes(t))??null:null}function ne(e){let t=0,n=0;for(let r of o){let i=D(r,e.id);if(!i)continue;let a=E(r.vote,t=>t.faction===e.faction),o=p.reduce((e,t)=>a[t[0]]>a[e[0]]?t:e);n++,i===o&&t++}return n?Math.round(t/n*100):0}var O={tab:`laws`,search:``,party:``,kind:``,split:``},k=document.getElementById(`search`),A=document.getElementById(`filter-party`),j=document.getElementById(`filter-kind`),M=document.getElementById(`filter-split`),N={contested:[`במחלוקת`,e=>h(e)&&e.vote.against.length>=10],unanimous:[`בלי מתנגדים`,e=>h(e)&&e.vote.against.length===0],unknown:[`בלי פירוט הצבעה`,e=>!h(e)]};A.innerHTML=`<option value="">כל הסיעות</option>${i.map(e=>`<option value="${e.id}">${b(e.name)}</option>`).join(``)}`,j.innerHTML=`<option value="">כל ההצעות</option>${m.map(e=>`<option value="${e}">${e}</option>`).join(``)}`,M.innerHTML=`<option value="">כל התוצאות</option>${Object.entries(N).map(([e,[t]])=>`<option value="${e}">${t}</option>`).join(``)}`;function re(){let e=e=>o.filter(t=>t.kind===e).length,t=o.filter(h),n=t.map(e=>e.vote.for.length+e.vote.against.length+e.vote.abstain.length).sort((e,t)=>e-t),r=n[Math.floor(n.length/2)];document.getElementById(`knesset-kpis`).innerHTML=`
    <div class="kpi"><div class="kpi-label">חוקים שעברו</div><div class="kpi-value">${o.length}</div>
      <div class="kpi-sub">${e(`ממשלתית`)} ממשלתיים · ${e(`פרטית`)} פרטיים · ${e(`ועדה`)} של ועדה</div></div>
    <div class="kpi"><div class="kpi-label">עם פירוט הצבעה</div><div class="kpi-value">${t.length}</div>
      <div class="kpi-sub">בשאר אין פירוט לפי חבר כנסת</div></div>
    <div class="kpi"><div class="kpi-label">חציון מצביעים בקריאה שלישית</div><div class="kpi-value">${r}</div>
      <div class="kpi-sub">מתוך 120 חברי כנסת</div></div>`}function ie(e){let t=d(e),n=o.filter(t=>D(t,e.id)).length;return`<button type="button" class="mk-card" data-mk="${e.id}">
    <span class="avatar" style="background:${t.color}">${b(S(e.name))}</span>
    <span class="mk-info">
      <b>${b(e.name)}</b>
      <span class="mk-party"><i class="dot" style="background:${t.color}"></i>${b(t.name)}</span>
      <span class="mk-att">הצביע בקריאה שלישית על ${n} חוקים</span>
    </span>
  </button>`}var P=e=>e.replace(/,?\s*התש[א-ת"״]+[-–]\d{4}\s*$/,``);function F(e){if(e.status)return I(e);let t=h(e),n=t?E(e.vote):null;return`<button type="button" class="law-row" data-law="${e.id}">
    <span class="lr-name">${b(P(e.name))}</span>
    <span class="lr-kind">${b(e.kind)}</span>
    ${t?`<span class="lr-tally" title="בעד ${n.for}, נגד ${n.against}"><b class="t-for">${n.for}</b><b class="t-against">${n.against}</b></span>${T(n)}`:`<span class="lr-tally lr-none">אין פירוט</span><span></span>`}
  </button>`}function I(e){let t=e.last;return`<button type="button" class="law-row" data-law="${e.id}">
    <span class="lr-name">${b(P(e.name.replace(/^הצעת /,``)))}</span>
    <span class="lr-kind">${b(e.status)} ב${b(g[t.stage]??`הצבעה`)}</span>
    <span class="lr-tally" title="בעד ${t.for}, נגד ${t.against}"><b class="t-for">${t.for}</b><b class="t-against">${t.against}</b></span>${T(t)}
  </button>`}var L=[`ינואר`,`פברואר`,`מרץ`,`אפריל`,`מאי`,`יוני`,`יולי`,`אוגוסט`,`ספטמבר`,`אוקטובר`,`נובמבר`,`דצמבר`],R=e=>(e.vote?.date??e.date).slice(0,7),ae=e=>`${L[Number(e.slice(5))-1]} ${e.slice(0,4)}`,z=6,B=z;function V(){for(let e of document.querySelectorAll(`[data-tab]`))e.setAttribute(`aria-pressed`,e.dataset.tab===O.tab);A.hidden=O.tab!==`mks`,j.hidden=O.tab!==`laws`,M.hidden=O.tab!==`laws`,O.tab===`failed`&&(j.hidden=!1);let e=O.search.trim(),t=document.getElementById(`view`);if(O.tab===`mks`){let n=a.filter(t=>(!O.party||t.faction===Number(O.party))&&(!e||t.name.includes(e)));t.innerHTML=[...i.map(e=>l[e.id]),u].filter(e=>n.some(t=>d(t).id===e.id)).map(e=>`<div class="party-group">
          <h2 class="section-title"><i class="dot big" style="background:${e.color}"></i>${b(e.name)}${e.seats?` <small>${e.seats===1?`מושב אחד`:`${e.seats} מושבים`} בסוף הכנסת</small>`:``}</h2>
          <div class="mk-grid">${n.filter(t=>d(t).id===e.id).map(ie).join(``)}</div>
        </div>`).join(``)||`<p class="empty">לא נמצאו חברי כנסת.</p>`}else{let n=(O.tab===`failed`?s:o).filter(t=>(!O.kind||t.kind===O.kind)&&(O.tab===`failed`||!O.split||N[O.split][1](t))&&(!e||t.name.includes(e))).sort((e,t)=>R(t).localeCompare(R(e))||t.date.localeCompare(e.date)),r=[...new Set(n.map(R))];t.innerHTML=n.length?`<p class="lr-summary">${O.tab===`failed`?`${n.length} הצעות · ${n.filter(e=>e.status===`נפלה`).length} נפלו בהצבעה, והשאר נעצרו בדרך. ליד כל הצעה: ההצבעה האחרונה עליה.`:`${n.length} חוקים · ליד כל חוק: כמה הצביעו בעד ונגד בקריאה שלישית.`} ${w}</p>
         ${r.slice(0,B).map(e=>{let t=n.filter(t=>R(t)===e);return`<section class="lr-month"><h2 class="lr-month-title">${ae(e)} <small>${t.length} ${O.tab===`failed`?`הצעות`:`חוקים`}</small></h2>
               <div class="law-rows">${t.map(F).join(``)}</div></section>`}).join(``)}
         ${r.length>B?`<button type="button" class="chip" id="more-laws">חודשים קודמים (${r.length-B})</button>`:``}`:`<p class="empty">לא נמצאו חוקים.</p>`}}var H=document.getElementById(`kdetail`),U=document.getElementById(`kdetail-body`);function W(e,{push:t=!0}={}){let n=f[e];if(!n)return;let r=d(n),i=o.map(e=>({law:e,v:D(e,n.id)})).filter(e=>e.v),a=o.filter(e=>e.initiators.includes(n.id));U.innerHTML=`
    <div class="mk-head">
      <span class="avatar big" style="background:${r.color}">${b(S(n.name))}</span>
      <div>
        <p class="detail-domain"><i class="dot" style="background:${r.color}"></i> ${b(r.name)}</p>
        <h2 id="kdetail-title">${b(n.name)}</h2>
      </div>
    </div>
    <div class="detail-stats">
      <div>הצבעות בקריאה שלישית<b>${i.length} מתוך ${o.filter(h).length}</b></div>
      <div>הצביע/ה כמו רוב הסיעה<b>${ne(n)}%</b></div>
      <div>חוקים שיזם/ה ועברו<b>${a.length}</b></div>
    </div>
    <p class="detail-hint">היעדרות מהצבעה לא בהכרח אומרת הזנחה: שרים וסגני שרים למשל לא תמיד מצביעים, וחבר כנסת לא כיהן בהכרח בכל הקדנציה.</p>

    ${a.length?`<h3 class="k-h">חוקים שיזם/ה</h3>
    <ul class="k-list">${a.map(e=>`<li><button type="button" class="link" data-law="${e.id}">${b(e.name)}</button></li>`).join(``)}</ul>`:``}

    <h3 class="k-h">כל ההצבעות</h3>
    <table class="k-table">
      <thead><tr><th>תאריך</th><th>חוק</th><th>הצבעה</th></tr></thead>
      <tbody>${i.map(({law:e,v:t})=>`<tr>
            <td>${x(e.vote.date)}</td>
            <td><button type="button" class="link" data-law="${e.id}">${b(e.name)}</button></td>
            <td>${C(t[1],t[2])}</td>
          </tr>`).join(``)}</tbody>
    </table>
    <p class="detail-source">מקור: קבצי כנסת פתוחה, לפי טבלאות ההצבעות של הכנסת.</p>`,Z(`mk-${e}`,t)}var G=e=>`https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawBill.aspx?t=lawsuggestionssearch&lawitemid=${e}`;function K(e){let t=e.docs??{},n=[t.law&&[t.law,`החוק כפי שפורסם ברשומות`],(t.first??t.early)&&[t.first??t.early,`הצעת החוק עם דברי ההסבר`],[G(e.id),`הדף באתר הכנסת`]].filter(Boolean);return`${e.summary?`<h3 class="k-h">מה החוק קובע</h3>
    <blockquote class="piece-quote k-summary">${b(e.summary)}</blockquote>
    <p class="detail-source">התקציר הרשמי של הכנסת.</p>`:``}
    <div class="reform-links">${n.map(([e,t])=>`<a class="chip" href="${b(e)}" target="_blank" rel="noopener">${t} ←</a>`).join(``)}</div>`}function q(e){let t=v(e).map(e=>{let t=g[e.stage]??e.title,n=e.stage===`second`?`${e.count} הצבעות על סעיפים`:e.stage===`reservation`?`${e.count} הצבעות · ${e.accepted} התקבלו`:`<span class="lr-tally"><b class="t-for">${e.for}</b><b class="t-against">${e.against}</b></span>`;return`<tr><td>${b(t)}</td><td>${x(e.date)}</td><td>${n}</td></tr>`});return t.length?`<h3 class="k-h">כל ההצבעות במליאה</h3>
    <table class="k-table"><thead><tr><th>שלב</th><th>תאריך</th><th>בעד · נגד</th></tr></thead><tbody>${t.join(``)}</tbody></table>`:``}function oe(e){return`<div class="party-votes">${[...i.map(e=>l[e.id]),u].filter(t=>e[t.id]).map(t=>{let[n,r,i]=e[t.id];return`<div class="pv-row">
          <span class="pv-name"><i class="dot" style="background:${t.color}"></i>${b(t.name)}</span>
          ${T({for:n,against:r,abstain:i})}
          <span class="pv-nums">בעד ${n} · נגד ${r}${i?` · נמנעו ${i}`:``}</span>
        </div>`}).join(``)}${w}</div>`}function J(e,t){let n=y(e);U.innerHTML=`
    <p class="detail-domain">הצעה ${b(e.kind)} · ${b(e.status)} ב${b(g[n.stage]??`הצבעה`)}</p>
    <h2 id="kdetail-title">${b(e.name)}</h2>
    ${K(e)}
    <div class="detail-stats">
      <div>ההצבעה האחרונה<b>${x(n.date)}</b></div>
      <div>בעד<b>${n.for}</b></div>
      <div>נגד<b>${n.against}</b></div>
      <div>נמנעו<b>${n.abstain}</b></div>
    </div>
    <p class="detail-hint">${e.status===`נפלה`?`ההצעה נדחתה בהצבעה הזו.`:`ההצעה עברה את ההצבעה האחרונה עליה, ולא התקדמה משם עד סוף הכנסת.`}</p>
    ${e.initiators.length?`<h3 class="k-h">יוזמים</h3><div class="vg-list">${e.initiators.map(X).join(``)}</div>`:``}
    <h3 class="k-h">ההצבעה האחרונה לפי סיעה</h3>
    ${oe(n.byFaction)}
    ${q(e)}
    <p class="detail-source">מקור: קבצי כנסת פתוחה, לפי טבלאות הצעות החוק וההצבעות של הכנסת. הסיעה היא האחרונה של חבר הכנסת בקדנציה.</p>`,Z(`law-${e.id}`,t)}async function Y(e,{push:t=!0}={}){let n=ee[e];if(!n)return;let a={...n,...(await r())[e]};if(a.status)return J(a,t);let o=h(a),s=o?E(a.vote):null,c=o?[...i.map(e=>l[e.id]),u].map(e=>({f:e,c:E(a.vote,t=>d(t).id===e.id)})).filter(({c:e})=>e.for+e.against+e.abstain):[];U.innerHTML=`
    <p class="detail-domain">הצעה ${b(a.kind)} · פורסם ב־${x(a.date)}</p>
    <h2 id="kdetail-title">${b(a.name)}</h2>
    ${K(a)}
    ${o?`<div class="detail-stats">
      <div>תאריך ההצבעה<b>${x(a.vote.date)}</b></div>
      <div>בעד<b>${s.for}</b></div>
      <div>נגד<b>${s.against}</b></div>
      <div>נמנעו<b>${s.abstain}</b></div>
    </div>`:`<p class="detail-hint">אין פירוט של ההצבעה בקריאה שלישית לפי חבר כנסת.</p>`}
    ${a.initiators.length?`<h3 class="k-h">יוזמים</h3><div class="vg-list">${a.initiators.map(X).join(``)}</div>`:``}
    ${o?`<h3 class="k-h">הצבעה לפי סיעה</h3>
    <div class="party-votes">${c.map(({f:e,c:t})=>`<div class="pv-row">
          <span class="pv-name"><i class="dot" style="background:${e.color}"></i>${b(e.name)}</span>
          ${T(t)}
          <span class="pv-nums">בעד ${t.for} · נגד ${t.against}${t.abstain?` · נמנעו ${t.abstain}`:``}</span>
        </div>`).join(``)}${w}</div>

    <h3 class="k-h">מי הצביע איך</h3>
    ${p.filter(([e])=>a.vote[e].length).map(([e,t,n])=>`<div class="vote-group">
          <span class="vg-title">${C(t,n)} ${a.vote[e].length}</span>
          <div class="vg-list">${a.vote[e].map(X).join(``)}</div>
        </div>`).join(``)}`:``}
    ${q(a)}
    <p class="detail-source">מקור: קבצי כנסת פתוחה, לפי טבלאות הצעות החוק וההצבעות של הכנסת. הסיעה היא האחרונה של חבר הכנסת בקדנציה, ולא בהכרח זו שבה היה ביום ההצבעה.</p>`,Z(`law-${e}`,t)}function X(e){let t=f[e];return t?`<button type="button" class="mk-chip" data-mk="${t.id}"><i class="dot" style="background:${d(t).color}"></i>${b(t.name)}</button>`:``}function Z(e,t){t&&history.replaceState(null,``,`#${e}`),H.open||H.showModal(),H.querySelector(`.detail-inner`).scrollTop=0,H.scrollTop=0}document.getElementById(`kdetail-close`).addEventListener(`click`,()=>H.close()),H.addEventListener(`click`,e=>{e.target===H&&H.close()}),H.addEventListener(`close`,()=>history.replaceState(null,``,location.pathname+location.search)),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-mk]`);if(t)return W(Number(t.dataset.mk));let n=e.target.closest(`[data-law]`);if(n)return Y(Number(n.dataset.law));if(e.target.id===`more-laws`)return B+=z,V();let r=e.target.closest(`[data-tab]`);r&&(O.tab=r.dataset.tab,V())}),k.addEventListener(`input`,()=>{O.search=k.value,B=z,V()}),A.addEventListener(`change`,()=>{O.party=A.value,V()}),j.addEventListener(`change`,()=>{O.kind=j.value,B=z,V()}),M.addEventListener(`change`,()=>{O.split=M.value,B=z,V()});try{let e=localStorage.getItem(`theme`);e&&(document.documentElement.dataset.theme=e)}catch{}document.getElementById(`theme-toggle`).addEventListener(`click`,()=>{let e=(document.documentElement.dataset.theme??(matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`))===`dark`?`light`:`dark`;document.documentElement.dataset.theme=e;try{localStorage.setItem(`theme`,e)}catch{}});var Q=location.hash.match(/^#(laws|failed|mks)$/);Q&&(O.tab=Q[1]),re(),V();var $=location.hash.match(/^#(mk|law)-(\d+)$/);$&&($[1]===`mk`?W:Y)(Number($[2]),{push:!1});