#!/usr/bin/env python3
"""Validate manifest-referenced local files without downloading third-party content."""
import json, hashlib
from pathlib import Path
from collections import Counter
root=Path(__file__).resolve().parents[1]/"atlas-2026"
manifest=json.loads((root/"assets/media-manifest.json").read_text(encoding="utf-8"))
records=manifest["records"]
assert len(records)==215 and len({r["key"] for r in records})==215
paths=set()
kinds=Counter()
families=Counter()
for r in records:
    paths.update([r["type_icon"],r["system_icon"]])
    local=[x for x in r.get("equipment_images",[]) if x.get("local")]
    for x in local:
        paths.add(x["local"])
        kinds[x.get("kind","unclassified")]+=1
    families["with_local_media"]+=bool(local)
    families["with_local_photo"]+=any(x.get("kind")=="photo" for x in local)
    families["with_video_link"]+=bool(r.get("video_items"))
missing=[]
for rel in sorted(paths):
    p=(root/rel).resolve()
    if root.resolve() not in p.parents or not p.is_file() or p.stat().st_size==0:
        missing.append(rel)
print(json.dumps({"records":len(records),"unique_local_paths":len(paths),"missing":missing,"asset_kinds":kinds,"coverage":families,"emblem_exists":(root/"assets/branding/egyptian-air-defence-forces.png").is_file()},indent=2))
assert not missing, "Missing or invalid local assets"
