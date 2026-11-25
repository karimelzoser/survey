#!/usr/bin/env python3
"""Reconstruct existing approved atlas assets into local, attributed media files.

Source: atlas-2026/parts/*.js (the repository's existing curated material).
No unauthorized video download, automatic hotlink harvest or fabricated OEM marks.
"""
import base64, hashlib, html, json, re, urllib.request
from collections import defaultdict
from pathlib import Path

BASE=Path(__file__).resolve().parents[1]
PARTS=BASE/"atlas-2026"/"parts"
OUT=BASE/"atlas-2026"/"assets"
for p in ["media/cuas","media/uas","icons/types","icons/systems","branding"]:
 (OUT/p).mkdir(parents=True,exist_ok=True)

parts=[]
for i in range(1,22):
 s=(PARTS/f"{i:03d}.js").read_text("utf-8")
 m=re.search(r'__ATLAS_PARTS\['+str(i-1)+r'\]=("(?:\\.|[^"\\])*");\s*$',s,re.S)
 if not m: raise ValueError(f"Cannot decode part {i}")
 parts.append(json.loads(m.group(1)))
source="".join(parts)
def inner(id):
 m=re.search(r'<script\b(?=[^>]*\bid="'+re.escape(id)+r'")[^>]*>(.*?)</script>',source,re.S)
 if not m: raise ValueError("Missing script: "+id)
 return m.group(1)
catalog=json.loads(inner("catalogData"))["items"]
cuas_html=base64.b64decode(inner("inline-cuas")).decode("utf-8")
us_html=base64.b64decode(inner("inline-uas")).decode("utf-8")
def parse_data(s):
 j=s.index("const DATA=")+len("const DATA=")
 return json.JSONDecoder().raw_decode(s[j:])[0]
cuas={r["id"]:r for r in parse_data(cuas_html)["systems"]}
uas={r["id"]:r for r in parse_data(us_html)["catalog"]}
types=sorted({x["category"] for x in catalog})
def slug(s):
 return re.sub("[^a-z0-9]+","-",s.lower()).strip("-")[:60]
def esc(s):return html.escape(str(s or ""))
def icon(t):
 is_uas=t in ("MALE","TAC","LOITER","CCA","ROTOR","ENTERPRISE","LOGISTICS","MARITIME")
 shape=('M20 63 96 41 140 16 149 21 142 55 215 65 214 76 141 70 119 109 106 109 91 70 20 77Z' if is_uas else
 'M120 15 203 57v27l-83 39-83-39V57Z')
 c="#9bd4df" if is_uas else "#e8bb80"
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 130"><rect width="240" height="130" rx="16" fill="#10283e"/><path d="{shape}" fill="none" stroke="{c}" stroke-width="7" stroke-linejoin="round"/><circle cx="120" cy="65" r="14" fill="{c}"/><text x="120" y="122" font-size="10" text-anchor="middle" fill="#ecf3f6" font-family="Arial">{esc(t)}</text></svg>'
iconmap={}
for t in types:
 rel="assets/icons/types/"+slug(t)+".svg"
 (BASE/"atlas-2026"/rel).write_text(icon(t),encoding="utf-8")
 iconmap[t]=rel
def poster(r):
 domain=r["domain"].upper()
 title=esc(r["name"][:48]);country=esc(r["country"]);cat=esc(r["category"])
 c="#a9d7e2" if r["domain"]=="uas" else "#e9c18d"
 # The diagonal motif is an editorial placeholder, never a platform silhouette.
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540"><rect width="960" height="540" fill="#102b42"/><circle cx="480" cy="239" r="155" fill="none" stroke="{c}" stroke-opacity=".32" stroke-width="6"/><path d="M320 239h320M480 79v320" stroke="{c}" stroke-opacity=".32" stroke-width="6"/><path d="M420 239l60-60 60 60-60 60Z" fill="{c}"/><rect x="18" y="410" width="924" height="118" rx="12" fill="#081b2c"/><text x="42" y="445" fill="{c}" font-size="21" font-family="Arial">{domain} / {cat} / {country}</text><text x="42" y="478" fill="#fff" font-size="25" font-family="Arial" font-weight="bold">{title}</text><text x="42" y="509" fill="#a9c1ce" font-size="13" font-family="Arial">EDITORIAL TYPE ILLUSTRATION · NOT EQUIPMENT PHOTOGRAPHY</text></svg>'
records=[]
for r in catalog:
 key=f'{r["domain"]}-{r["id"]:03d}'
 rel_icon=f"assets/icons/systems/{key}.svg"
 (BASE/"atlas-2026"/rel_icon).write_text(poster(r),encoding="utf-8")
 src=cuas.get(r["id"]) if r["domain"]=="cuas" else uas.get(r["id"])
 gallery=src.get("gallery_items",[]) if r["domain"]=="cuas" else ([{"src":r["thumb"],"type":"photo","credit":r.get("imageCredit","")}] if r.get("thumb") else [])
 videos=src.get("video_items",[]) if r["domain"]=="cuas" else r.get("videos",[])
 media=[]
 for i,g in enumerate(gallery,1):
  url=g.get("src","")
  ent={"source_url":g.get("url") or (url if url.startswith("http") else r.get("source")),"credit":g.get("credit") or g.get("tag") or "Unknown rights", "kind":g.get("type") or "study media","local":None}
  if url.startswith("data:image/") and "," in url:
   head,b64=url.split(",",1)
   ext=head.split("/")[1].split(";")[0].replace("svg+xml","svg")
   if ext in ("png","jpeg","jpg","webp","svg","gif"):
    data=base64.b64decode(b64)
    digest=hashlib.sha256(data).hexdigest()[:10]
    name=f"{key}-{i:02d}-{digest}.{ext}"
    path=f"assets/media/{r['domain']}/{name}"
    (BASE/"atlas-2026"/path).write_bytes(data)
    ent["local"]=path
  if url.startswith("http"):ent["original_image_url"]=url
  media.append(ent)
 rec={"key":key,"id":r["id"],"name":r["name"],"country":r["country"],"domain":r["domain"],"category":r["category"],"manufacturer":r["manufacturer"],"source_url":r.get("source"),"type_icon":iconmap[r["category"]],"system_icon":rel_icon,"equipment_images":media,"video_items":[{"title":x.get("title","Publisher video"),"external_url":x.get("url"),"local":None} for x in videos if isinstance(x,dict) and x.get("url")],"manufacturer_logo":None,"logo_status":"Not verified — no substitute for official artwork"}
 records.append(rec)
manifest={"version":"2026-11-23","rights_notice":"Publisher-owned imagery and footage may require redistribution permission. Video URLs are links, not downloaded videos. Editorial icons are not OEM logos.","records":records}
(OUT/"media-manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
(OUT/"media-manifest.js").write_text("window.LOCAL_MEDIA_MANIFEST="+json.dumps(manifest,ensure_ascii=False,separators=(",",":"))+";\nwindow.LOCAL_TYPE_ICONS="+json.dumps(iconmap,separators=(",",":"))+";\n",encoding="utf-8")
# Official-force emblem from the same reference file the existing presentation uses.
logo=OUT/"branding"/"egyptian-air-defence-forces.png"
if not logo.exists():
 try:
  url="https://upload.wikimedia.org/wikipedia/commons/7/71/Egyptian_Air_Defense_Forces_Logo.png"
  req=urllib.request.Request(url,headers={"User-Agent":"Research-Atlas-Media-Attribution/1.0 (GitHub Actions)"})
  with urllib.request.urlopen(req,timeout=25) as resp:
   data=resp.read(3*1024*1024+1)
  if data[:8]!=b"\x89PNG\r\n\x1a\n" or len(data)>3*1024*1024:raise ValueError("Unexpected emblem response")
  logo.write_bytes(data)
 except Exception as e: print("Emblem download deferred:",e)
assert len(records)==215 and len(types)==17,(len(records),len(types))
print("Generated",len(records),"records,",len(types),"type icons,",sum(bool(x["local"]) for r in records for x in r["equipment_images"]),"local study media files.")
