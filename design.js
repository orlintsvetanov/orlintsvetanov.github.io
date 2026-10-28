// Gallery, project filters and programme choices for the selected design.
const presentationText = text => window.siteTranslate ? window.siteTranslate(text) : text;
const projectList = document.querySelector('.project-list');
const projectCategories = {tango:'tango','emil-dimitrov':'stage',bingo:'stage',surbahar:'original','dream-of-oz':'original'};
const filterBar = document.createElement('div');
filterBar.className = 'preview-filters';
filterBar.setAttribute('role','group');
filterBar.setAttribute('aria-label','Филтрирайте музикалните проекти');
const filterChoices = [['all','Всички проекти'],['tango','Танго'],['stage','Сценични проекти'],['original','Авторска музика']];
function selectProjects(value) {
  filterBar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===value)));
  projectList.querySelectorAll('.music-project').forEach(p=>p.hidden=value!=='all'&&projectCategories[p.id]!==value);
}
for (const [value,label] of filterChoices) {
 const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.filter=value;button.setAttribute('aria-pressed',String(value==='all'));button.addEventListener('click',()=>selectProjects(value));filterBar.append(button);
}
projectList.before(filterBar);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const target=document.getElementById(a.hash.slice(1));if(target?.matches('.music-project'))selectProjects('all');}));
const programme = document.querySelector('.duration-programme');
const programmeOptions=document.createElement('div');programmeOptions.className='programme-options';programmeOptions.setAttribute('role','group');programmeOptions.setAttribute('aria-label','Продължителност на програмата');
const programmeStatus=document.createElement('p');programmeStatus.className='programme-status';programmeStatus.setAttribute('role','status');programmeStatus.textContent='Избираме продължителността според вашето събитие.';
let selectedProgramme = '';
const programmeLabels = ['Един час','Час и половина','Два часа'];
for(const label of programmeLabels){const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{programmeOptions.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));selectedProgramme=label;programmeStatus.textContent=presentationText('Избран ориентир: '+label.toLowerCase()+' музика на живо.');});programmeOptions.append(b);}
programme.querySelector('.duration-description').after(programmeOptions,programmeStatus);
const photoDialog=document.createElement('dialog');photoDialog.className='photo-dialog';photoDialog.setAttribute('aria-label','Преглед на фотография');
const largePhoto=document.createElement('img');const photoCaption=document.createElement('p');const closePhoto=document.createElement('button');closePhoto.className='close-photo';closePhoto.type='button';closePhoto.setAttribute('aria-label','Затворете снимката');closePhoto.textContent='×';photoDialog.append(largePhoto,photoCaption,closePhoto);document.body.append(photoDialog);
let currentPhoto = null;
closePhoto.addEventListener('click',()=>photoDialog.close());photoDialog.addEventListener('click',e=>{if(e.target===photoDialog)photoDialog.close();});
document.querySelectorAll('.section:not(#home) figure img').forEach(img=>{const button=document.createElement('button');button.type='button';button.className='photo-open';button.setAttribute('aria-label','Разгледайте снимката: '+img.alt);img.before(button);button.append(img);button.addEventListener('click',()=>{currentPhoto=img;largePhoto.src=img.src;largePhoto.alt=img.alt;photoCaption.textContent=img.closest('figure').querySelector('figcaption')?.textContent||img.alt;photoDialog.showModal();});});
function syncPresentationLanguage() {
 filterBar.setAttribute('aria-label',presentationText('Филтрирайте музикалните проекти'));
 filterChoices.forEach((choice,index)=>filterBar.children[index].textContent=presentationText(choice[1]));
 programmeOptions.setAttribute('aria-label',presentationText('Продължителност на програмата'));
 programmeLabels.forEach((label,index)=>programmeOptions.children[index].textContent=presentationText(label));
 programmeStatus.textContent=presentationText(selectedProgramme?'Избран ориентир: '+selectedProgramme.toLowerCase()+' музика на живо.':'Избираме продължителността според вашето събитие.');
 photoDialog.setAttribute('aria-label',presentationText('Преглед на фотография'));
 closePhoto.setAttribute('aria-label',presentationText('Затворете снимката'));
 document.querySelectorAll('.photo-open').forEach(button=>button.setAttribute('aria-label',presentationText('Разгледайте снимката: ')+button.querySelector('img').alt));
 if(currentPhoto){largePhoto.alt=currentPhoto.alt;photoCaption.textContent=currentPhoto.closest('figure').querySelector('figcaption')?.textContent||currentPhoto.alt;}
}
window.addEventListener('site-language-change',syncPresentationLanguage);
syncPresentationLanguage();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{rootMargin:'0px 0px 50px 0px',threshold:.05});document.querySelectorAll('.occasion,.lesson-package,.music-project,.studio-image').forEach(e=>{e.classList.add('reveal-ready');observer.observe(e);});}
