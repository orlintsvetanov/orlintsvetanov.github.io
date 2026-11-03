#!/usr/bin/env python3
"""Generate the four static, bilingual service pages for GitHub Pages."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://orlintsvetanov.com"
BOOKING = "https://calendar.app.google/DCDcAbxZRjc2Q6gV7"

PAGES = {
    ("events", "bg"): {
        "path": "/tsigular-za-sabitiya/", "other": "/en/violinist-for-events/", "home": "/",
        "title": "Цигулар за събитие в София | Орлин Цветанов",
        "description": "Цигулар за частни и корпоративни събития в София и страната. Жива музика и програма според повода с Орлин Цветанов.",
        "eyebrow": "МУЗИКА НА ЖИВО · СОФИЯ", "h1": "Цигулар за вашето събитие",
        "lead": "Музика на живо за посрещане на гости, частни празници и корпоративни събития. Избираме репертоара, състава и продължителността според повода.",
        "image": "/orlin-garden.jpeg", "alt": "Орлин Цветанов свири на цигулка на събитие на открито", "credit": "Снимка: Ина Янева",
        "primary": "Обсъдете вашето събитие", "primary_url": "/#contact", "secondary": "Формати и условия", "secondary_url": "/#formats",
        "section_eyebrow": "ПОВОДИ", "section_title": "Музика за различни срещи", "section_intro": "От посрещането на гостите до специалния момент на вечерта.",
        "cards": [("Welcome drink", "Музика на живо за посрещането на вашите гости."), ("Частни празници", "Изпълнение за юбилей, рожден ден или друг личен повод."), ("Корпоративни събития", "Музика за приеми, коктейли и фирмени вечери.")],
        "detail_eyebrow": "ФОРМАТ", "detail_title": "Соло или с гост-музиканти",
        "detail_a": "Свиря на акустична или електрическа цигулка със съвременни инструментални подложки. Според замисъла са възможни и участия с пиано, кавал, арфа или по-голям състав.",
        "detail_b": "Можем да планираме един час, час и половина или два часа музика. Разпределението на сетовете, репертоарът и условията се уточняват за събитието.",
        "faq_title": "Практични въпроси",
        "faq": [("Какво озвучаване е необходимо?", "Организаторът осигурява подходяща озвучителна система и озвучител. Подавам стерео сигнал от малък миксер."), ("Възможно ли е участие извън София?", "Възможността за пътуване се уточнява според събитието. Пътните разходи и необходимите нощувки са отделно от хонорара."), ("Как се определя цената?", "Хонорарът и условията се уточняват по телефона.")],
        "closing_eyebrow": "ВАШЕТО СЪБИТИЕ", "closing_title": "Нека обсъдим идеята ви",
        "closing_text": "Разкажете ми за повода, датата и мястото. Ще уточним музиката и организацията заедно.",
        "service_type": "Музика на живо с цигулка за събития", "area": "София, България"
    },
    ("events", "en"): {
        "path": "/en/violinist-for-events/", "other": "/tsigular-za-sabitiya/", "home": "/en/",
        "title": "Violinist for events in Sofia | Orlin Tsvetanov",
        "description": "Live violin music for private and corporate events in Sofia and across Bulgaria, with a programme tailored to the occasion.",
        "eyebrow": "LIVE MUSIC · SOFIA", "h1": "A violinist for your event",
        "lead": "Live music to welcome guests and for private celebrations and corporate events. We choose the repertoire, performers and duration to suit the occasion.",
        "image": "/orlin-garden.jpeg", "alt": "Orlin Tsvetanov plays the violin at an outdoor event", "credit": "Photograph: Ina Yaneva",
        "primary": "Discuss your event", "primary_url": "/en/#contact", "secondary": "Formats and terms", "secondary_url": "/en/#formats",
        "section_eyebrow": "OCCASIONS", "section_title": "Music for different gatherings", "section_intro": "From welcoming guests to a special moment in the evening.",
        "cards": [("Welcome drink", "Live music to welcome your guests."), ("Private celebrations", "A performance for an anniversary, birthday or another personal occasion."), ("Corporate events", "Music for receptions, cocktails and company evenings.")],
        "detail_eyebrow": "THE FORMAT", "detail_title": "Solo or with guest musicians",
        "detail_a": "I play acoustic or electric violin with contemporary instrumental backing. Depending on the occasion, performances with piano, kaval, harp or a larger ensemble are also possible.",
        "detail_b": "We can plan an hour, an hour and a half or two hours of music. We agree on the set structure, repertoire and terms for the event.",
        "faq_title": "Practical questions",
        "faq": [("What sound equipment is needed?", "The organiser provides a suitable sound system and sound engineer. I provide a stereo signal from a small mixer."), ("Can you perform outside Sofia?", "Travel is discussed for each event. Travel costs and any necessary accommodation are separate from the fee."), ("How is the fee determined?", "Please call to discuss the performance fee and terms.")],
        "closing_eyebrow": "YOUR EVENT", "closing_title": "Let's discuss your idea",
        "closing_text": "Tell me about the occasion, date and venue. We can work out the music and practical details together.",
        "service_type": "Live violin music for events", "area": "Sofia, Bulgaria"
    },
    ("lessons", "bg"): {
        "path": "/urotsi-po-cigulka/", "other": "/en/online-violin-lessons/", "home": "/",
        "title": "Онлайн уроци по цигулка | Орлин Цветанов",
        "description": "Индивидуални онлайн уроци по цигулка с Орлин Цветанов за начинаещи и напреднали. Редовен урок 45 минути и пробна среща.",
        "eyebrow": "ИНДИВИДУАЛНО ОБУЧЕНИЕ · ОНЛАЙН", "h1": "Онлайн уроци по цигулка",
        "lead": "Индивидуална работа според вашия опит и цели. Развиваме техниката, музикалния слух и интерпретацията чрез подходящи за нивото ви пиеси.",
        "image": "/orlin-portrait.jpeg", "alt": "Цигуларят Орлин Цветанов с инструмента си", "credit": "Снимка: Станислав Димитров",
        "primary": "Изберете свободен час", "primary_url": BOOKING, "secondary": "Вижте пакетите и условията", "secondary_url": "/#lessons",
        "section_eyebrow": "НАЧИН НА РАБОТА", "section_title": "Урок според вашето ниво", "section_intro": "Независимо дали започвате или искате да развиете вече придобити умения.",
        "cards": [("Индивидуален подход", "Работим върху техника, слух и интерпретация според целите ви."), ("45 минути", "Всеки редовен урок, единичен или в пакет, продължава 45 минути."), ("Онлайн", "Уроците се провеждат през Discord или друго удобно за двете страни приложение.")],
        "detail_eyebrow": "ПЪРВА СРЕЩА", "detail_title": "Нека се запознаем",
        "detail_a": "Безплатната пробна среща е 15–20 минути. Обсъждаме целите ви и начина на работа. За да я уговорите, обадете се по телефона.",
        "detail_b": "Редовните часове са от понеделник до петък между 17:00 и 19:00 ч. по българско време, според свободните места. Цената на урока или пакета се уточнява по телефона. Пакетите и начинът на плащане се уточняват след записване.",
        "faq_title": "Въпроси за уроците",
        "faq": [("Подходящи ли са за начинаещи?", "Да. Работата се съобразява с нивото ви, включително ако започвате без музикална подготовка."), ("Какво е необходимо за онлайн урок?", "Цигулка и лък, устройство с камера и микрофон, стабилна интернет връзка и спокойно място за свирене."), ("Как се записва редовен урок?", "Изберете свободен час в календара. След записването уточняваме пакета, плащането и връзката за урока по имейл.")],
        "closing_eyebrow": "ЗАПИСВАНЕ", "closing_title": "Вашето време с цигулката",
        "closing_text": "Изберете свободен час за редовен урок или се обадете, за да уговорим пробна среща.",
        "service_type": "Индивидуални онлайн уроци по цигулка", "area": None
    },
    ("lessons", "en"): {
        "path": "/en/online-violin-lessons/", "other": "/urotsi-po-cigulka/", "home": "/en/",
        "title": "Online violin lessons | Orlin Tsvetanov",
        "description": "Individual online violin lessons with Orlin Tsvetanov for beginners and experienced players. Regular 45-minute lessons and a trial meeting.",
        "eyebrow": "ONE-TO-ONE TUITION · ONLINE", "h1": "Online violin lessons",
        "lead": "Individual lessons shaped around your experience and goals. We develop technique, musical listening and interpretation through pieces suited to your level.",
        "image": "/orlin-portrait.jpeg", "alt": "Violinist Orlin Tsvetanov with his instrument", "credit": "Photograph: Stanislav Dimitrov",
        "primary": "Choose a lesson time", "primary_url": BOOKING, "secondary": "Packages and terms", "secondary_url": "/en/#lessons",
        "section_eyebrow": "HOW WE WORK", "section_title": "Lessons at your level", "section_intro": "Whether you are starting out or developing skills you already have.",
        "cards": [("Individual approach", "We work on technique, listening and interpretation according to your goals."), ("45 minutes", "Every regular lesson, single or in a package, lasts 45 minutes."), ("Online", "Lessons take place on Discord or another app that works for both of us.")],
        "detail_eyebrow": "FIRST MEETING", "detail_title": "Let's get acquainted",
        "detail_a": "The free trial meeting lasts 15–20 minutes. We discuss your goals and how we work. Please call to arrange it.",
        "detail_b": "Regular times are Monday to Friday, 17:00–19:00 Bulgarian time, subject to availability. Please call to discuss the price of a lesson or package. We agree on packages and payment after booking.",
        "faq_title": "Questions about lessons",
        "faq": [("Are the lessons suitable for beginners?", "Yes. Lessons are adapted to your level, including if you are starting without musical training."), ("What do I need for an online lesson?", "A violin and bow, a device with a camera and microphone, a stable internet connection and a quiet place to play."), ("How do I book a regular lesson?", "Choose an available time in the calendar. After booking, we will agree on the package, payment and lesson connection by email.")],
        "closing_eyebrow": "BOOKING", "closing_title": "Your time with the violin",
        "closing_text": "Choose an available time for a regular lesson or call to arrange a trial meeting.",
        "service_type": "Individual online violin lessons", "area": None
    },
}


def render(kind, lang, p):
    bg = lang == "bg"
    event_url = "/tsigular-za-sabitiya/" if bg else "/en/violinist-for-events/"
    lesson_url = "/urotsi-po-cigulka/" if bg else "/en/online-violin-lessons/"
    nav = ("Начало", "Участия", "Онлайн уроци", "Контакт") if bg else ("Home", "Live events", "Online lessons", "Contact")
    skip = "Към съдържанието" if bg else "Skip to content"
    phone_label = "Обадете се за пробна среща" if bg else "Call to arrange a trial meeting"
    lang_label = "Език" if bg else "Language"
    home_title = "Орлин Цветанов" if bg else "Orlin Tsvetanov"
    footer_city = "София, България" if bg else "Sofia, Bulgaria"
    switch_bg = p["path"] if bg else p["other"]
    switch_en = p["other"] if bg else p["path"]
    alt_bg = p["path"] if bg else p["other"]
    alt_en = p["other"] if bg else p["path"]
    service = {"@context": "https://schema.org", "@type": "Service", "name": p["service_type"],
               "serviceType": p["service_type"], "url": ORIGIN + p["path"],
               "provider": {"@type": "Person", "name": "Орлин Цветанов" if bg else "Orlin Tsvetanov", "url": ORIGIN + p["home"]}}
    if p["area"]:
        service["areaServed"] = p["area"]
    cards = "".join(f'<article class="card"><h3>{title}</h3><p>{body}</p></article>' for title, body in p["cards"])
    faq = "".join(f'<details><summary>{question}</summary><p>{answer}</p></details>' for question, answer in p["faq"])
    booking_attrs = ' target="_blank" rel="noopener noreferrer"' if p["primary_url"] == BOOKING else ""
    closing_secondary = f'<a class="text-link" href="tel:+359888855035">{phone_label}</a>' if kind == "lessons" else f'<a class="text-link" href="{p["secondary_url"]}">{p["secondary"]}</a>'
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{p["title"]}</title><meta name="description" content="{p["description"]}">
<link rel="canonical" href="{ORIGIN + p["path"]}">
<link rel="alternate" hreflang="bg" href="{ORIGIN + alt_bg}"><link rel="alternate" hreflang="en" href="{ORIGIN + alt_en}"><link rel="alternate" hreflang="x-default" href="{ORIGIN + alt_bg}">
<meta property="og:type" content="website"><meta property="og:title" content="{p["title"]}"><meta property="og:description" content="{p["description"]}"><meta property="og:url" content="{ORIGIN + p["path"]}"><meta property="og:image" content="{ORIGIN + p["image"]}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{p["title"]}"><meta name="twitter:description" content="{p["description"]}"><meta name="twitter:image" content="{ORIGIN + p["image"]}">
<link rel="stylesheet" href="/fonts.css?v=63a2b125256a"><link rel="stylesheet" href="/service-pages.css?v=2">
<script type="application/ld+json">{json.dumps(service, ensure_ascii=False)}</script>
</head>
<body>
<a class="skip" href="#main">{skip}</a>
<header class="service-header"><div class="service-header-inner"><a class="brand" href="{p["home"]}">{home_title}</a>
<nav class="service-nav" aria-label="{('Основна навигация' if bg else 'Main navigation')}"><a href="{p["home"]}">{nav[0]}</a><a href="{event_url}"{(' aria-current="page"' if kind == 'events' else '')}>{nav[1]}</a><a href="{lesson_url}"{(' aria-current="page"' if kind == 'lessons' else '')}>{nav[2]}</a><a href="{p["home"]}#contact">{nav[3]}</a><span class="language" aria-label="{lang_label}"><a href="{switch_bg}" lang="bg" hreflang="bg"{(' aria-current="page"' if bg else '')}>БГ</a><span aria-hidden="true">/</span><a href="{switch_en}" lang="en" hreflang="en"{(' aria-current="page"' if not bg else '')}>EN</a></span></nav></div></header>
<main id="main"><div class="wrap"><section class="hero"><div><p class="eyebrow">{p["eyebrow"]}</p><h1>{p["h1"]}</h1><p class="hero-lead">{p["lead"]}</p><div class="actions"><a class="button" href="{p["primary_url"]}"{booking_attrs}>{p["primary"]}</a><a class="text-link" href="{p["secondary_url"]}">{p["secondary"]}</a></div></div><figure class="hero-figure"><img src="{p["image"]}" alt="{p["alt"]}" {'width="1280" height="852"' if kind == 'events' else 'width="854" height="1280"'}><figcaption>{p["credit"]}</figcaption></figure></section>
<section class="section"><div class="section-intro"><p class="eyebrow">{p["section_eyebrow"]}</p><h2>{p["section_title"]}</h2><p>{p["section_intro"]}</p></div><div class="cards">{cards}</div></section>
<section class="section"><div class="details-grid"><div><p class="eyebrow">{p["detail_eyebrow"]}</p><h2>{p["detail_title"]}</h2></div><div><p>{p["detail_a"]}</p><p>{p["detail_b"]}</p></div></div></section>
<section class="section faq"><h2>{p["faq_title"]}</h2>{faq}</section></div>
<section class="closing"><div class="wrap"><p class="eyebrow">{p["closing_eyebrow"]}</p><h2>{p["closing_title"]}</h2><p>{p["closing_text"]}</p><div class="actions"><a class="button" href="{p["primary_url"]}"{booking_attrs}>{p["primary"]}</a>{closing_secondary}</div></div></section></main>
<footer class="service-footer"><div class="wrap"><span>{home_title} · {footer_city}</span><a href="{p["home"]}">{nav[0]}</a></div></footer>
</body></html>'''


for (kind, language), page in PAGES.items():
    path = ROOT / page["path"].strip("/") / "index.html"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(render(kind, language, page) + "\n", encoding="utf-8")
    print(path.relative_to(ROOT))
