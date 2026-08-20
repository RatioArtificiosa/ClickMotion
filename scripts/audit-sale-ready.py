#!/usr/bin/env python3
"""Audit Meridian / Aether / Vertex sale-readiness against registries + disk."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
bad = 0


def fail(msg: str):
    global bad
    bad += 1
    print(f"  FAIL: {msg}")


def ok(msg: str):
    print(f"  OK: {msg}")


def main():
    pp = (ROOT / "src/lib/product-packages.ts").read_text(encoding="utf-8")
    od = (ROOT / "src/lib/owner-designs.ts").read_text(encoding="utf-8")
    store = json.loads((ROOT / "data/cms/store.json").read_text(encoding="utf-8"))

    expected = {
        "MS-HERO-MERI01": {
            "client": "/assets/videos/sequence-01.mp4",
            "preview": "/assets/videos/meridian-scroll-preview-v1.mp4",
            "preview_fs": "/assets/videos/meridian-scroll-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-MERI01.webp",
            "poster": "/assets/posters/sequence-01.webp",
            "pdf": "/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf",
            "paid_salt": True,
            "bg": None,
        },
        "MS-HERO-AETH01": {
            "client": "/assets/videos/aether-waves-web-v1.mp4",
            "preview": "/assets/videos/aether-preview-v1.mp4",
            "preview_fs": "/assets/videos/aether-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-AETH01.webp",
            "poster": "/assets/posters/aether-waves-v1.webp",
            "pdf": "/packages/MS-HERO-AETH01/Aether-package-8rgb4zhx7zrd.pdf",
            "paid_salt": False,
            "bg": "/assets/videos/backgrounds/aether-waves-bg-v1.mp4",
        },
        "MS-HERO-VERT01": {
            "client": "/assets/videos/vertex-globe-web-v1.mp4",
            "preview": "/assets/videos/vertex-preview-v1.mp4",
            "preview_fs": "/assets/videos/vertex-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-VERT01.webp",
            "poster": "/assets/posters/vertex-globe-v1.webp",
            "pdf": "/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf",
            "paid_salt": False,
            "bg": "/assets/videos/backgrounds/vertex-globe-bg-v1.mp4",
        },
        "MS-HERO-NEON01": {
            "client": "/assets/videos/neon-forge-city-v1.mp4",
            "preview": "/assets/videos/neon-forge-preview-v1.mp4",
            "preview_fs": "/assets/videos/neon-forge-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-NEON01.webp",
            "poster": "/assets/posters/neon-forge-city-v1.webp",
            "pdf": "/packages/MS-HERO-NEON01/NeonForge-package-n7k2m9p4qx1w-nf3k8a.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/neon-forge-bg-v1.mp4",
        },
        "MS-HERO-LUMI01": {
            "client": "/assets/videos/lumina-dolly-v1.mp4",
            "preview": "/assets/videos/lumina-preview-v1.mp4",
            "preview_fs": "/assets/videos/lumina-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-LUMI01.webp",
            "poster": "/assets/posters/lumina-dolly-v1.webp",
            "pdf": "/packages/MS-HERO-LUMI01/Lumina-package-l8m4k2p9qx7w-lm4k9a.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/lumina-dolly-bg-v1.mp4",
        },
        "MS-HERO-TERR01": {
            "client": "/assets/videos/terra-aerial-v1.mp4",
            "preview": "/assets/videos/terra-preview-v1.mp4",
            "preview_fs": "/assets/videos/terra-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-TERR01.webp",
            "poster": "/assets/posters/terra-aerial-v1.webp",
            "pdf": "/packages/MS-HERO-TERR01/TerraNova-package-t3r9n0v7qx2m-tn5k2a.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/terra-aerial-bg-v1.mp4",
        },
        "MS-HERO-APEX01": {
            "client": "/assets/videos/apex-quantum-v1.mp4",
            "preview": "/assets/videos/apex-preview-v1.mp4",
            "preview_fs": "/assets/videos/apex-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-APEX01.webp",
            "poster": "/assets/posters/apex-quantum-v1.webp",
            "pdf": "/packages/MS-HERO-APEX01/ApexQuantum-package-a9x4q7m2kp8w-aq3n8k.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/apex-quantum-bg-v1.mp4",
        },
        "MS-HERO-REVL01": {
            "client": "/assets/videos/revel-breakout-v1.mp4",
            "preview": "/assets/videos/revel-scroll-preview-v1.mp4",
            "preview_fs": "/assets/videos/revel-scroll-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-REVL01.webp",
            "poster": "/assets/posters/revel-breakout-v1.webp",
            "pdf": "/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/revel-breakout-bg-v1.mp4",
        },
        "MS-HERO-PRSM01": {
            "client": "/assets/videos/prism-faces-v1.mp4",
            "preview": "/assets/videos/prism-scroll-preview-v1.mp4",
            "preview_fs": "/assets/videos/prism-scroll-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-PRSM01.webp",
            "poster": "/assets/posters/prism-faces-v1.webp",
            "pdf": "/packages/MS-HERO-PRSM01/Prism-package-p8r3sm7k2n4q-pr5m2x.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/prism-faces-bg-v1.mp4",
        },
        "MS-SEC-FOLI01": {
            "client": "/assets/videos/folio-blurry-v1.mp4",
            "preview": "/assets/videos/folio-scroll-preview-v1.mp4",
            "preview_fs": "/assets/videos/folio-scroll-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-SEC-FOLI01.webp",
            "poster": "/assets/posters/folio-scroll-preview-v1.webp",
            "pdf": "/packages/MS-SEC-FOLI01/Folio-package-f0l1o9x4k7m2-fl8n3q.pdf",
            "zip": "/packages/MS-SEC-FOLI01/Folio-files-f0l1o9x4k7m2-fl8n3q.zip",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/folio-blurry-bg-v1.mp4",
        },
        "MS-HERO-MIRA01": {
            "client": "/assets/videos/mirage-desert-v1.mp4",
            "preview": "/assets/videos/mirage-scroll-preview-v1.mp4",
            "preview_fs": "/assets/videos/mirage-scroll-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-MIRA01.webp",
            "poster": "/assets/posters/mirage-desert-v1.webp",
            "pdf": "/packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf",
            "zip": "/packages/MS-HERO-MIRA01/Mirage-files-m1r4ge8k2n9x-mg7k3p.zip",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/mirage-desert-bg-v1.mp4",
        },
        "MS-HERO-SABL01": {
            "client": "/assets/videos/sable-winter-v1.mp4",
            "preview": "/assets/videos/sable-holiday-preview-v1.mp4",
            "preview_fs": "/assets/videos/sable-holiday-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-SABL01.webp",
            "poster": "/assets/posters/sable-winter-v1.webp",
            "pdf": "/packages/MS-HERO-SABL01/Sable-package-s4b1e9k7m2x3-sb8n4p.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/sable-winter-bg-v1.mp4",
        },
        "MS-HERO-AXIO01": {
            "client": "/assets/videos/axiom-upside-v1.mp4",
            "preview": "/assets/videos/axiom-fintech-preview-v1.mp4",
            "preview_fs": "/assets/videos/axiom-fintech-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-AXIO01.webp",
            "poster": "/assets/posters/axiom-upside-v1.webp",
            "pdf": "/packages/MS-HERO-AXIO01/Axiom-package-a9x10m7k3n2p-ax8n4q.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/axiom-upside-bg-v1.mp4",
        },
        "MS-HERO-ELYS01": {
            "client": "/assets/videos/elyse-nature-v1.mp4",
            "preview": "/assets/videos/elyse-scroll-preview-v1.mp4",
            "preview_fs": "/assets/videos/elyse-scroll-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-ELYS01.webp",
            "poster": "/assets/posters/elyse-nature-v1.webp",
            "pdf": "/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/elyse-nature-bg-v1.mp4",
        },
        "MS-HERO-NEXU01": {
            "client": "/assets/videos/nexus-neural-v1.mp4",
            "preview": "/assets/videos/nexus-enterprise-preview-v1.mp4",
            "preview_fs": "/assets/videos/nexus-enterprise-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-NEXU01.webp",
            "poster": "/assets/posters/nexus-neural-v1.webp",
            "pdf": "/packages/MS-HERO-NEXU01/Nexus-package-n3xu9k2m7p4w.pdf",
            "paid_salt": False,
            "bg": "/assets/videos/backgrounds/nexus-neural-bg-v1.mp4",
        },
        "MS-SEC-HELI01": {
            "client": "/assets/images/orbit/orbit-01.jpg",
            "preview": "/assets/videos/helix-gallery-preview-v1.mp4",
            "preview_fs": "/assets/videos/helix-gallery-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-SEC-HELI01.webp",
            "poster": "/assets/posters/helix-gallery-preview-v1.webp",
            "pdf": "/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4-t2v8c6.pdf",
            "zip": "/packages/MS-SEC-HELI01/Helix-files-h3l1x9k2m7p4-t2v8c6.zip",
            "paid_salt": True,
            "bg": None,  # no background film / not on /backgrounds
        },
        "MS-SEC-STUDIO01": {
            "client": "/assets/videos/studio-surreal-v1.mp4",
            "preview": "/assets/videos/studio-sequence-preview-v1.webm",
            "preview_fs": "/assets/videos/studio-sequence-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-SEC-STUDIO01.webp",
            "poster": "/assets/posters/studio-sequence-preview-v1.webp",
            "pdf": "/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1-p8k2m1.pdf",
            "zip": "/packages/MS-SEC-STUDIO01/Studio-files-s7u2d1o9q4x1-p8k2m1.zip",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/studio-surreal-bg-v1.mp4",
        },
        "MS-HERO-ROAD01": {
            "client": "/assets/roadster/studio-drive.mp4",
            "preview": "/assets/videos/roadster-studio-drive-preview-v1.mp4",
            "preview_fs": "/assets/videos/roadster-studio-drive-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-ROAD01.webp",
            "poster": "/assets/posters/roadster-studio-drive-v1.webp",
            "pdf": "/packages/MS-HERO-ROAD01/Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf",
            "zip": "/packages/MS-HERO-ROAD01/Roadster-files-r0ad8t3r5k2m-rd7n4x.zip",
            "paid_salt": True,
            "bg": None,
        },
        "MS-HERO-GROK01": {
            "client": "/assets/videos/grokbot-sphere-v1.mp4",
            "preview": "/assets/videos/grokbot-preview-v1.webm",
            "preview_fs": "/assets/videos/grokbot-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-GROK01.webp",
            "poster": "/assets/posters/grokbot-preview-v1.webp",
            "pdf": "/packages/MS-HERO-GROK01/GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf",
            "zip": "/packages/MS-HERO-GROK01/GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/grokbot-sphere-bg-v1.mp4",
        },
        "MS-HERO-SKYS01": {
            "client": "/assets/videos/skyspires-sunrise-v1.mp4",
            "preview": "/assets/videos/skyspires-preview-v1.mp4",
            "preview_fs": "/assets/videos/skyspires-preview-fs-v1.mp4",
            "thumb": "/thumbnails/MS-HERO-SKYS01.webp",
            "poster": "/assets/posters/skyspires-preview-v1.webp",
            "pdf": "/packages/MS-HERO-SKYS01/SkySpires-package-s4y8p1r3sk7n-sk5n2q.pdf",
            "zip": "/packages/MS-HERO-SKYS01/SkySpires-files-s4y8p1r3sk7n-sk5n2q.zip",
            "paid_salt": True,
            "bg": "/assets/videos/backgrounds/skyspires-sunrise-bg-v1.mp4",
        },
    }

    for pid, exp in expected.items():
        print(f"=== {pid}")
        # disk
        for key in ("client", "preview", "preview_fs", "thumb", "poster", "pdf"):
            path = ROOT / "public" / exp[key].lstrip("/")
            if path.is_file():
                ok(f"disk {key}")
            else:
                fail(f"disk missing {key} {path}")
        zip_href = exp.get("zip")
        if zip_href:
            zip_path = ROOT / "public" / zip_href.lstrip("/")
            if zip_path.is_file():
                ok("disk zip")
            else:
                fail(f"disk missing zip {zip_path}")
            if zip_href not in pp:
                fail("filesZipHref not in product-packages.ts")
            else:
                ok("product-packages has filesZip")
        bg = exp.get("bg")
        if bg:
            bg_path = ROOT / "public" / bg.lstrip("/")
            if bg_path.is_file():
                ok("disk backgrounds small encode")
                client_path = ROOT / "public" / exp["client"].lstrip("/")
                if client_path.is_file() and bg_path.stat().st_size >= client_path.stat().st_size:
                    fail("backgrounds file not smaller than client HD")
                else:
                    ok("backgrounds smaller than client HD")
            else:
                fail(f"disk missing bg {bg_path}")
            if bg == exp["client"] or "preview" in Path(bg).name:
                fail("backgrounds path collides with client/preview role")
            else:
                ok("backgrounds role separated")

        # roles never mix
        if exp["client"] == exp["preview"]:
            fail("client == preview")
        else:
            ok("client != preview")
        if "preview" in Path(exp["client"]).name.lower():
            fail("client looks like storefront name")
        else:
            ok("client name not storefront-style")

        # product-packages
        if exp["pdf"] not in pp:
            fail("pdfHref not in product-packages.ts")
        else:
            ok("product-packages has pdf")
        if exp["client"] not in pp:
            fail("clientHd not in product-packages.ts")
        else:
            ok("product-packages has clientHd")

        # owner-designs
        if exp["pdf"] not in od:
            fail("packagePdf not in owner-designs.ts")
        else:
            ok("owner-designs has packagePdf")
        if exp["client"] not in od:
            fail("broll not in owner-designs.ts")
        else:
            ok("owner-designs has broll")

        # CMS
        prod = next((p for p in store["products"] if p["id"] == pid), None)
        if not prod:
            fail("missing CMS product")
            continue
        if prod.get("status") != "published":
            fail(f"CMS status {prod.get('status')}")
        else:
            ok("CMS published")
        if prod.get("previewVideo") != exp["preview"]:
            fail(f"CMS previewVideo {prod.get('previewVideo')}")
        else:
            ok("CMS previewVideo")
        if prod.get("thumbnail") != exp["thumb"]:
            fail(f"CMS thumbnail {prod.get('thumbnail')}")
        else:
            ok("CMS thumbnail")
        if prod.get("poster") != exp["poster"]:
            fail(f"CMS poster {prod.get('poster')}")
        else:
            ok("CMS poster")
        desc = prod.get("description") or ""
        if "\u2014" in desc or "\u2013" in desc or "—" in desc or "–" in desc:
            fail("em dash in CMS description")
        else:
            ok("CMS description no emdash")
        if len(desc) > 230:
            fail(f"description len {len(desc)} > 230")
        else:
            ok(f"description len {len(desc)}")

        # paid salt rule
        pdf_name = Path(exp["pdf"]).name
        if exp["paid_salt"]:
            if pdf_name.count("-") < 3:
                fail("paid package should have PaidSalt segment")
            else:
                ok("paid opaque+salt naming")
        else:
            if re.search(r"package-[a-z0-9]+-[a-z0-9]{6}\.pdf$", pdf_name):
                # free should not have extra salt of 6 after opaque - our free are Product-package-opaque.pdf
                parts = pdf_name.replace(".pdf", "").split("-")
                # Aether-package-8rgb4zhx7zrd -> 3 parts
                if len(parts) > 3:
                    fail(f"free package may have unexpected salt: {pdf_name}")
                else:
                    ok("free opaque naming no salt")
            else:
                ok("free opaque naming")

        # guessable names banned
        if "GOLDEN-RULE" in pdf_name or "GOLDEN" in pdf_name:
            fail("guessable golden-rule filename")
        else:
            ok("not guessable golden-rule name")

    legacy = ROOT / "public/packages/MS-HERO-MERI01/Meridian-package-GOLDEN-RULE.pdf"
    if legacy.exists():
        fail("legacy GOLDEN-RULE.pdf still present")
    else:
        ok("legacy GOLDEN-RULE.pdf removed")

    print()
    if bad:
        print(f"RESULT: {bad} failure(s)")
        sys.exit(1)
    print("RESULT: ALL CHECKS PASSED")
    sys.exit(0)


if __name__ == "__main__":
    main()
