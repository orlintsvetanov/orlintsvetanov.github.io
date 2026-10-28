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
window.matchMedia('(min-width:1201px)').addEventListener('change', () => closeMenu());
document.querySelectorAll('[data-open-fees]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('fees').open = true;
}));
const heroPhoto = document.getElementById('hero-photograph');
const bowSheen = document.querySelector('.bow-sheen');
const homeSection = document.getElementById('home');
const contactNavLink = nav.querySelector('a[href="#contact"]');
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
  glintTarget?.classList.remove('navigation-glint', 'navigation-glint-repeat');
  glintTarget = null;
}
function currentGlintTarget() {
  const collapsedMenu = getComputedStyle(menuButton).display !== 'none' && menuButton.getAttribute('aria-expanded') !== 'true';
  return collapsedMenu ? menuButton : contactNavLink;
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
  glintTarget.classList.add('navigation-glint');
  glintEndTimer = setTimeout(() => { stopBowGlint(); scheduleNavigationGlint(); }, 4400);
}
function queueBowGlint(delay = 700) {
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
for (const target of [menuButton, contactNavLink]) {
  const stopForInteraction = () => { stopBowGlint(); scheduleNavigationGlint(); };
  target.addEventListener('pointerdown', stopForInteraction);
  target.addEventListener('focus', stopForInteraction);
}
if (heroPhoto.complete && heroPhoto.naturalWidth) startPortraitMotion();
else heroPhoto.addEventListener('load', startPortraitMotion, { once: true });
const form=document.getElementById('inquiry');
const kind=document.getElementById('kind');
const message=document.getElementById('message');
const status=document.getElementById('form-status');
function updateFields() {
  const studio = kind.value === 'Студиен запис';
  const lesson = kind.value === 'Урок по цигулка';
  document.getElementById('event-fields').hidden = studio || lesson;
  message.placeholder = t(studio ? 'Разкажете за песента или проекта, звученето и желания срок…' : lesson ? 'От колко време свирите и какво бихте искали да развиете?' : 'Повод, брой гости и атмосферата, която си представяте…');
  const choice = document.getElementById('lesson-choice');
  choice.hidden = !(lesson && form.dataset.lessonPackage);
  choice.textContent = choice.hidden ? '' : t('Избран вариант: ') + t(form.dataset.lessonPackage);
}
kind.addEventListener('change', () => { delete form.dataset.lessonPackage; updateFields(); });
document.querySelectorAll('[data-kind]').forEach(link => link.addEventListener('click', () => {
  kind.value = link.dataset.kind;
  if (link.dataset.package) {
    form.dataset.lessonPackage = link.dataset.package;
    if (!message.value.trim()) message.value = t('Здравейте, интересувам се от уроци по цигулка.');
  } else { delete form.dataset.lessonPackage; }
  updateFields();
  if (link.dataset.occasion && !message.value.trim()) message.value = link.dataset.occasion + ' - ';
}));
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const lines=[t('Здравейте, Орлин,'),'',t('Интересувам се от: ')+t(data.get('kind')),t('Име: ')+String(data.get('name')).trim(),t('Имейл: ')+data.get('email')];if(kind.value==='Урок по цигулка'&&form.dataset.lessonPackage)lines.push(t('Избран вариант: ')+t(form.dataset.lessonPackage));if(kind.value!=='Студиен запис'&&kind.value!=='Урок по цигулка'){const date=data.get('date');const readable=date?date.split('-').reverse().join('.'):t('За уточняване');lines.push(t('Желана дата: ')+readable,t('Място: ')+(data.get('place')||t('За уточняване')));}lines.push('',String(data.get('message')).trim());const body=lines.join('\n');document.getElementById('mail-copy').value=body;document.getElementById('fallback').hidden=false;status.textContent=t('Запитването е подготвено. Изпратете го от вашето имейл приложение.');window.location.href='mailto:orlintsvetanov@gmail.com?subject='+encodeURIComponent(t('Запитване: ')+t(data.get('kind')))+'&body='+encodeURIComponent(body);});
document.getElementById('copy').addEventListener('click',async()=>{const field=document.getElementById('mail-copy');try{await navigator.clipboard.writeText(field.value);status.textContent=t('Запитването е копирано.');}catch{field.focus();field.select();status.textContent=t('Текстът е маркиран. Копирайте го от менюто на устройството.');}});
if('IntersectionObserver'in window){const links=[...nav.querySelectorAll('a[href^="#"]')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});document.querySelector('.nav-group').classList.toggle('is-current',!!submenu.querySelector('[aria-current]'));}});},{rootMargin:'-15% 0px -60% 0px'});links.forEach(link=>{const section=document.querySelector(link.hash);if(section)observer.observe(section);});}
updateFields();

window.addEventListener('site-language-change', () => { closeMenu(); updateFields(); status.textContent=''; document.getElementById('fallback').hidden=true; });
