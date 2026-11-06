const t = window.siteTranslate;
const siteHeader = document.querySelector('.site-header');
function updatePinnedHeader() {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 64);
}
updatePinnedHeader();
window.addEventListener('scroll', updatePinnedHeader, { passive: true });
window.addEventListener('pageshow', updatePinnedHeader);
if ('ResizeObserver' in window) {
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--site-header-height', siteHeader.offsetHeight + 'px');
  }).observe(siteHeader);
}
const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
const submenuButton = document.querySelector('.submenu-toggle');
const submenu = document.getElementById('performance-menu');
function setSubmenu(open, restoreFocus = false) {
  submenuButton.setAttribute('aria-expanded', String(open));
  submenu.hidden = !open;
  if (restoreFocus) submenuButton.focus();
}
function closeMenu(restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  setSubmenu(false);
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  if (!open) closeMenu();
  else { menuButton.setAttribute('aria-expanded', 'true'); nav.classList.add('is-open'); }
});
submenuButton.addEventListener('click', () => setSubmenu(submenuButton.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.querySelector('.opening-name a').addEventListener('click', () => closeMenu());
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (submenuButton.getAttribute('aria-expanded') === 'true') { event.preventDefault(); setSubmenu(false, true); }
  else if (menuButton.getAttribute('aria-expanded') === 'true') { event.preventDefault(); closeMenu(true); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
  else if (!event.target.closest('.nav-group')) setSubmenu(false);
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.nav-group')) setSubmenu(false);
});
window.matchMedia('(min-width:701px)').addEventListener('change', () => closeMenu());
document.querySelectorAll('[data-open-fees]').forEach(link => link.addEventListener('click', () => {
  const fees = document.getElementById('fees'); if (fees) fees.open = true;
}));

if (document.getElementById("home") && document.getElementById("hero-photograph")) {
const heroPhoto = document.getElementById('hero-photograph');
const bowSheen = document.querySelector('.bow-sheen');
const homeSection = document.getElementById('home');
const contactNavLinks = [...siteHeader.querySelectorAll('[data-demo-contact]')];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const navigationGlintInterval = 10000;
let glintStartTimer, glintEndTimer, glintResizeTimer, navigationRepeatTimer;
let glintTarget;
let bowHasPlayed = false;
let wasAtOpening = window.scrollY < 64;
function stopBowGlint() {
  clearTimeout(glintStartTimer);
  clearTimeout(glintEndTimer);
  homeSection.classList.remove('is-glinting');
  document.querySelector('.opening-name a')?.classList.remove('brand-glint');
  glintTarget?.classList.remove('navigation-glint', 'navigation-glint-repeat');
  glintTarget = null;
}
function currentGlintTarget() {
  const collapsedMenu = getComputedStyle(menuButton).display !== 'none' && menuButton.getAttribute('aria-expanded') !== 'true';
  return collapsedMenu ? menuButton : (contactNavLinks.find(link => link.getClientRects().length > 0) || contactNavLinks[0]);
}
function scheduleNavigationGlint() {
  clearTimeout(navigationRepeatTimer);
  if (!motionPreference.matches && !document.hidden) navigationRepeatTimer = setTimeout(playNavigationGlint, navigationGlintInterval);
}
function playNavigationGlint() {
  stopBowGlint();
  if (motionPreference.matches || document.hidden) return;
  glintTarget = currentGlintTarget();
  glintTarget.classList.add('navigation-glint', 'navigation-glint-repeat');
  glintEndTimer = setTimeout(stopBowGlint, 1200);
  scheduleNavigationGlint();
}
function playBowGlint() {
  stopBowGlint();
  if (bowHasPlayed || motionPreference.matches || document.hidden || window.scrollY >= 64 || !heroPhoto.naturalWidth) return;
  bowHasPlayed = true;
  clearTimeout(navigationRepeatTimer);
  glintTarget = currentGlintTarget();
  homeSection.classList.add('is-glinting');
  document.querySelector('.opening-name a')?.classList.add('brand-glint');
  glintTarget.classList.add('navigation-glint');
  glintEndTimer = setTimeout(() => { stopBowGlint(); scheduleNavigationGlint(); }, 3200);
}
function queueBowGlint(delay = 120) {
  clearTimeout(glintStartTimer);
  if (!bowHasPlayed && !motionPreference.matches && !document.hidden && window.scrollY < 64 && heroPhoto.complete && heroPhoto.naturalWidth) {
    glintStartTimer = setTimeout(playBowGlint, delay);
  }
}
function startPortraitMotion() {
  heroPhoto.classList.toggle('is-receding', !motionPreference.matches);
  bowSheen.classList.toggle('is-receding', !motionPreference.matches);
  queueBowGlint();
  scheduleNavigationGlint();
}
motionPreference.addEventListener('change', () => {
  stopBowGlint();
  clearTimeout(navigationRepeatTimer);
  startPortraitMotion();
});
window.addEventListener('scroll', () => {
  const atOpening = window.scrollY < 64;
  if (!atOpening && homeSection.classList.contains('is-glinting')) { stopBowGlint(); scheduleNavigationGlint(); }
  else if (!wasAtOpening) queueBowGlint();
  wasAtOpening = atOpening;
}, { passive: true });
window.addEventListener('resize', () => {
  stopBowGlint();
  clearTimeout(glintResizeTimer);
  glintResizeTimer = setTimeout(() => { queueBowGlint(250); scheduleNavigationGlint(); }, 200);
}, { passive: true });
document.addEventListener('visibilitychange', () => {
  stopBowGlint();
  clearTimeout(navigationRepeatTimer);
  if (!document.hidden) { queueBowGlint(); scheduleNavigationGlint(); }
});
for (const target of [menuButton, ...contactNavLinks]) {
  const stopForInteraction = () => { stopBowGlint(); scheduleNavigationGlint(); };
  target.addEventListener('pointerdown', stopForInteraction);
  target.addEventListener('focus', stopForInteraction);
}
if (heroPhoto.complete && heroPhoto.naturalWidth) startPortraitMotion();
else heroPhoto.addEventListener('load', startPortraitMotion, { once: true });

}
if (document.getElementById("inquiry")) {
const form=document.getElementById('inquiry');
const kind=document.getElementById('kind');
const message=document.getElementById('message');
const status=document.getElementById('form-status');
const eventDuration=document.createElement('p');
eventDuration.className='selected-package';
eventDuration.id='event-duration-choice';
eventDuration.setAttribute('role','status');
eventDuration.hidden=true;
document.getElementById('lesson-choice').after(eventDuration);
function updateFields() {
  const studio = kind.value === 'Студиен запис';
  const lesson = kind.value === 'Урок по цигулка';
  document.getElementById('event-fields').hidden = studio || lesson;
  message.placeholder = t(studio ? 'Разкажете за песента или проекта, звученето и желания срок…' : lesson ? 'От колко време свирите и какво бихте искали да развиете?' : 'Повод, брой гости и атмосферата, която си представяте…');
  const choice = document.getElementById('lesson-choice');
  choice.hidden = !(lesson && form.dataset.lessonPackage);
  choice.textContent = choice.hidden ? '' : t('Избран вариант: ') + t(form.dataset.lessonPackage);
  eventDuration.hidden = kind.value !== 'Участие' || !form.dataset.eventDuration;
  eventDuration.textContent = eventDuration.hidden ? '' : t('Желана продължителност: ') + t(form.dataset.eventDuration);
}
kind.addEventListener('change', () => { delete form.dataset.lessonPackage; updateFields(); });
window.addEventListener('programme-duration-change', event => {
  if (event.detail) form.dataset.eventDuration = event.detail;
  else delete form.dataset.eventDuration;
  updateFields();
});
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const lines=[t('Здравейте, Орлин,'),'',t('Интересувам се от: ')+t(data.get('kind')),t('Име: ')+String(data.get('name')).trim(),t('Имейл: ')+data.get('email')];if(kind.value==='Урок по цигулка'&&form.dataset.lessonPackage)lines.push(t('Избран вариант: ')+t(form.dataset.lessonPackage));if(kind.value==='Участие'&&form.dataset.eventDuration)lines.push(t('Желана продължителност: ')+t(form.dataset.eventDuration));if(kind.value!=='Студиен запис'&&kind.value!=='Урок по цигулка'){const date=data.get('date');const readable=date?date.split('-').reverse().join('.'):t('За уточняване');lines.push(t('Желана дата: ')+readable,t('Място: ')+(data.get('place')||t('За уточняване')));}lines.push('',String(data.get('message')).trim());const body=lines.join('\n');document.getElementById('mail-copy').value=body;document.getElementById('fallback').hidden=false;status.textContent=t('Запитването е подготвено. Изпратете го от вашето имейл приложение.');window.location.href='mailto:orlintsvetanov@gmail.com?subject='+encodeURIComponent(t('Запитване: ')+t(data.get('kind')))+'&body='+encodeURIComponent(body);});
document.getElementById('copy').addEventListener('click',async()=>{const field=document.getElementById('mail-copy');try{await navigator.clipboard.writeText(field.value);status.textContent=t('Запитването е копирано.');}catch{field.focus();field.select();status.textContent=t('Текстът е маркиран. Копирайте го от менюто на устройството.');}});

try {
 const saved = JSON.parse(sessionStorage.getItem('orlin-enquiry-choice') || '{}');
 if (saved.kind && [...kind.options].some(option => option.value === saved.kind)) kind.value=saved.kind;
 if (saved.package) form.dataset.lessonPackage=saved.package;
 if (saved.duration) form.dataset.eventDuration=saved.duration;
 if (saved.occasion && !message.value.trim()) message.value=saved.occasion+' - ';
 sessionStorage.removeItem('orlin-enquiry-choice');
} catch {}
updateFields();
window.addEventListener('site-language-change',()=>{closeMenu();updateFields();status.textContent='';document.getElementById('fallback').hidden=true;});

}

// Carry the chosen subject to the contact page without storing form inputs.
document.querySelectorAll('a[data-kind]').forEach(link=>link.addEventListener('click',()=>{
 try { const previous=JSON.parse(sessionStorage.getItem('orlin-enquiry-choice')||'{}');
 sessionStorage.setItem('orlin-enquiry-choice',JSON.stringify({...previous,kind:link.dataset.kind||'',package:link.dataset.package||'',occasion:link.dataset.occasion||''})); } catch {}
}));
const previousURLs={about:'about.html',interview:'about.html#interview','sofia-soloists-bio':'about.html#sofia-soloists-bio',live:'events-live.html',formats:'events-formats.html',fees:'events-formats.html#fees',process:'events-process.html',videos:'projects.html','lili-videos':'lili.html',tango:'tango.html','tango-musicians':'tango.html#tango-musicians',libertango:'tango.html#libertango','emil-dimitrov':'emil.html',surbahar:'surbahar.html',bingo:'bingo.html','dream-of-oz':'oz.html',studio:'studio.html',lessons:'lessons.html','lesson-packages':'lessons-packages.html',contact:'contact.html',inquiry:'contact.html#inquiry'};
if(document.body.dataset.demoPage==='home' && location.hash.length>1){
 const slug=decodeURIComponent(location.hash.slice(1));
 if(previousURLs[slug]) location.replace((document.documentElement.lang==='en'?'/en/':'/')+previousURLs[slug]);
}
if(location.hash==='#fees') {const fees=document.getElementById('fees');if(fees) fees.open=true;}
const soloists=document.getElementById('sofia-soloists-bio');
if(location.hash==='#sofia-soloists-bio' && soloists){soloists.closest('details').open=true;requestAnimationFrame(()=>soloists.scrollIntoView());}
const programme=document.querySelector('.duration-programme');
if(programme){
 const options=document.createElement('div');options.className='programme-options';options.setAttribute('role','group');options.setAttribute('aria-label',t('Продължителност на програмата'));
 const status=document.createElement('p');status.className='programme-status';status.setAttribute('role','status');
 const defaultText='Избираме продължителността според вашето събитие.';status.textContent=t(defaultText);
 const contact=document.createElement('a');contact.className='text-link';contact.href=(document.documentElement.lang==='en'?'/en/':'/')+'contact.html#inquiry';contact.dataset.kind='Участие';contact.textContent=t('Към запитването');
 let chosen='';
 for(const label of ['Един час','Час и половина','Два часа']){const b=document.createElement('button');b.type='button';b.textContent=t(label);b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{
  chosen=chosen===label?'':label;for(const x of options.children)x.setAttribute('aria-pressed',String(x.dataset.label===chosen));
  status.textContent=t(chosen?'Избран ориентир: '+chosen.toLowerCase()+' музика на живо.':defaultText);
 });b.dataset.label=label;options.append(b);}
 contact.addEventListener('click',()=>{try{sessionStorage.setItem('orlin-enquiry-choice',JSON.stringify({kind:'Участие',duration:chosen}));}catch{}});
 programme.querySelector('.duration-description').after(options,status,contact);
 window.addEventListener('site-language-change',()=>{options.setAttribute('aria-label',t('Продължителност на програмата'));for(const x of options.children)x.textContent=t(x.dataset.label);status.textContent=t(chosen?'Избран ориентир: '+chosen.toLowerCase()+' музика на живо.':defaultText);contact.textContent=t('Към запитването');});
}
const dialog=document.createElement('dialog');dialog.className='photo-dialog';dialog.setAttribute('aria-label',t('Преглед на фотография'));
const photo=document.createElement('img'),caption=document.createElement('p'),close=document.createElement('button');
let currentViewedPhoto=null;
close.className='close-photo';close.type='button';close.setAttribute('aria-label',t('Затворете снимката'));close.textContent='×';dialog.append(photo,caption,close);document.body.append(dialog);
close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
document.querySelectorAll('.section:not(#home) figure img').forEach(img=>{const button=document.createElement('button');button.type='button';button.className='photo-open';button.setAttribute('aria-label',t('Разгледайте снимката: ')+img.alt);img.before(button);button.append(img);button.addEventListener('click',()=>{currentViewedPhoto=img;photo.src=img.src;photo.alt=img.alt;caption.textContent=img.closest('figure').querySelector('figcaption')?.textContent||img.alt;dialog.showModal();});});
window.addEventListener('site-language-change',()=>{
 dialog.setAttribute('aria-label',t('Преглед на фотография'));
 close.setAttribute('aria-label',t('Затворете снимката'));
 document.querySelectorAll('.photo-open').forEach(button=>{const image=button.querySelector('img');if(image)button.setAttribute('aria-label',t('Разгледайте снимката: ')+image.alt);});
 if(currentViewedPhoto){photo.alt=currentViewedPhoto.alt;caption.textContent=currentViewedPhoto.closest('figure').querySelector('figcaption')?.textContent||currentViewedPhoto.alt;}
});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{rootMargin:'0px 0px 50px 0px',threshold:.05});document.querySelectorAll('.occasion,.lesson-package,.music-project,.studio-image').forEach(e=>{e.classList.add('reveal-ready');observer.observe(e);});}
