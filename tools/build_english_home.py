#!/usr/bin/env python3
"""Render the English homepage from the approved Bulgarian source and translations."""

import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://orlintsvetanov.com"
source = (ROOT / "i18n.js").read_text(encoding="utf-8")
dictionary = json.loads(source.split("const english = ", 1)[1].split(";\nlet currentLanguage", 1)[0])
if len(set(dictionary.values())) != len(dictionary):
    raise ValueError("English translations must remain unique for the language switch")


def translate(value):
    stripped = value.strip()
    return value.replace(stripped, dictionary[stripped], 1) if stripped in dictionary else value


def root_asset(value):
    if not value or value.startswith(("/", "#", "http:", "https:", "data:", "mailto:", "tel:", "//")):
        return value
    return "/" + value


class EnglishHome(HTMLParser):
    ATTR = re.compile(r'([\w:-]+)(\s*=\s*)(["\'])(.*?)\3', re.S)

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.output = []
        self.raw_text = None
        self.json_ld = False

    def tag(self, tag, attrs):
        values = dict(attrs)
        raw = self.get_starttag_text()

        def update(match):
            name, equals, quote, raw_value = match.groups()
            value = html.unescape(raw_value)
            if tag == "html" and name == "lang":
                value = "en"
            elif name in ("alt", "aria-label", "placeholder", "content", "data-occasion"):
                value = translate(value)
            if tag == "link" and "canonical" in (values.get("rel") or "").split() and name == "href":
                value = ORIGIN + "/en/"
            if tag == "meta" and name == "content":
                if values.get("property") == "og:url": value = ORIGIN + "/en/"
                if values.get("property") == "og:locale": value = "en_GB"
                if values.get("property") == "og:locale:alternate": value = "bg_BG"
            if tag == "button" and name == "aria-pressed" and values.get("data-language") in ("bg", "en"):
                value = "true" if values["data-language"] == "en" else "false"
            if tag == "a" and name == "href" and values.get("data-en-href"):
                value = values["data-en-href"]
            elif name in ("src", "poster") or (name == "href" and tag in ("a", "link")):
                value = root_asset(value)
            return name + equals + quote + html.escape(value, quote=True) + quote

        self.output.append(self.ATTR.sub(update, raw))
        if tag in ("script", "style"):
            self.raw_text = tag
            self.json_ld = tag == "script" and values.get("type") == "application/ld+json"

    def handle_starttag(self, tag, attrs): self.tag(tag, attrs)
    def handle_startendtag(self, tag, attrs): self.tag(tag, attrs)

    def handle_endtag(self, tag):
        self.output.append(f"</{tag}>")
        if tag == self.raw_text:
            self.raw_text = None
            self.json_ld = False

    def handle_data(self, data):
        if self.json_ld:
            person = json.loads(data)
            person.update({"name": "Orlin Tsvetanov", "alternateName": "Орлин Цветанов", "url": ORIGIN + "/en/", "jobTitle": ["Violinist", "Composer", "Sound designer"]})
            self.output.append(json.dumps(person, ensure_ascii=False))
        elif self.raw_text:
            self.output.append(data)
        else:
            self.output.append(html.escape(translate(data), quote=False))

    def handle_decl(self, decl): self.output.append(f"<!{decl}>")
    def handle_comment(self, data): self.output.append(f"<!--{data}-->")
    def handle_pi(self, data): self.output.append(f"<?{data}>")


renderer = EnglishHome()
renderer.feed((ROOT / "index.html").read_text(encoding="utf-8"))
renderer.close()
target = ROOT / "en" / "index.html"
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text("".join(renderer.output), encoding="utf-8")
print(target.relative_to(ROOT))
