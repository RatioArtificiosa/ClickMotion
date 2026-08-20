#!/usr/bin/env python3
"""
ClickMotion Product Package PDF generator (golden-rule layout).

Produces buyer-facing packages for Meridian, Aether, Vertex (and more).
Opaque package filenames (ASSET_PIPELINE): {Product}-package-{OpaqueId}[-{PaidSalt}].pdf
No em dashes. Pure white Birthstone wordmark + glow. Font size always fits.
Gold standard structure from Meridian buyer package.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
FONT_PATH = ROOT / "public" / "fonts" / "Birthstone-Regular.ttf"
PACKAGES = ROOT / "public" / "packages"

BRAND = "ClickMotion"
WEBSITE = "www.ClickMotion.dev"
WEBSITE_URL = "https://www.ClickMotion.dev"

INK = (0.047, 0.039, 0.031)
CREAM = (0.969, 0.945, 0.910)
CREAM_DIM = (0.78, 0.74, 0.68)
GOLD = (0.788, 0.651, 0.420)
WHITE = (1, 1, 1)

W, H = letter
ML, MR, MT, MB = 0.7 * inch, 0.7 * inch, 0.62 * inch, 0.62 * inch
CW = W - ML - MR

TOOLS = [
    "Cursor",
    "Claude",
    "Grok Build",
    "Lovable",
    "Codex / ChatGPT",
    "Bolt",
    "Your Smart AI Agent",
]


def register_fonts():
    if FONT_PATH.is_file():
        pdfmetrics.registerFont(TTFont("Birthstone", str(FONT_PATH)))
        return "Birthstone"
    return "Times-Italic"


WORDMARK_FONT = register_fonts()


def no_em(s: str) -> str:
    return (
        s.replace("\u2014", " - ")
        .replace("\u2013", " - ")
        .replace("—", " - ")
        .replace("–", " - ")
    )


def set_fill(c: canvas.Canvas, rgb, a=1):
    c.setFillColorRGB(rgb[0], rgb[1], rgb[2], alpha=a)


def set_stroke(c: canvas.Canvas, rgb, width=0.5, a=1):
    c.setStrokeColorRGB(rgb[0], rgb[1], rgb[2], alpha=a)
    c.setLineWidth(width)


def page_bg(c: canvas.Canvas):
    c.setFillColorRGB(*INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def fit_font_size(c, text, font, max_w, start, min_size=10) -> float:
    size = start
    while size > min_size:
        if c.stringWidth(text, font, size) <= max_w:
            return size
        size -= 0.5
    return min_size


def draw_wordmark(c, x, y, max_w, start_size=42, align="left", min_size=14):
    text = BRAND
    size = fit_font_size(c, text, WORDMARK_FONT, max_w, start_size, min_size=min_size)
    glow_passes = (
        (0, 0, 0.06),
        (3.2, 0, 0.05),
        (-3.2, 0, 0.05),
        (0, 2.8, 0.05),
        (0, -2.8, 0.05),
        (2.4, 2.4, 0.04),
        (-2.4, -2.4, 0.04),
        (2.4, -2.4, 0.04),
        (-2.4, 2.4, 0.04),
        (1.6, 0, 0.12),
        (-1.6, 0, 0.12),
        (0, 1.4, 0.12),
        (0, -1.4, 0.12),
        (1.2, 1.1, 0.1),
        (-1.2, -1.1, 0.1),
        (1.2, -1.1, 0.1),
        (-1.2, 1.1, 0.1),
        (0.7, 0, 0.22),
        (-0.7, 0, 0.22),
        (0, 0.6, 0.22),
        (0, -0.6, 0.22),
        (0.5, 0.45, 0.18),
        (-0.5, -0.45, 0.18),
        (0, 0, 0.28),
    )
    for dx, dy, a in glow_passes:
        c.setFillColorRGB(1, 1, 1, alpha=a)
        c.setFont(WORDMARK_FONT, size)
        if align == "center":
            c.drawCentredString(x + dx, y + dy, text)
        else:
            c.drawString(x + dx, y + dy, text)
    c.setFillColorRGB(1, 1, 1, alpha=1)
    c.setFont(WORDMARK_FONT, size)
    if align == "center":
        c.drawCentredString(x, y, text)
    else:
        c.drawString(x, y, text)
    return size


def footer(c, page, total):
    y = 0.36 * inch
    set_stroke(c, GOLD, 0.4, a=0.35)
    c.line(ML, y + 14, W - MR, y + 14)
    draw_wordmark(c, ML, y + 1, max_w=1.55 * inch, start_size=15, min_size=11)
    c.setFont("Helvetica", 7.5)
    set_fill(c, CREAM_DIM)
    c.drawRightString(W - MR, y + 2, f"{WEBSITE}    {page} / {total}")


def header(c, title, step):
    y = H - MT
    c.setFont("Helvetica", 8)
    set_fill(c, GOLD)
    c.drawString(ML, y, no_em(step).upper())
    y -= 18
    size = fit_font_size(c, title, "Helvetica-Bold", CW, 18, 12)
    c.setFont("Helvetica-Bold", size)
    set_fill(c, CREAM)
    c.drawString(ML, y, no_em(title))
    y -= 10
    set_stroke(c, GOLD, 0.7, a=0.5)
    c.line(ML, y, ML + 2 * inch, y)
    return y - 18


def wrap(c, text, font, size, max_w):
    text = no_em(text)
    words = text.split()
    if not words:
        return [""]
    lines, cur = [], ""
    for w in words:
        test = f"{cur} {w}".strip()
        if c.stringWidth(test, font, size) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            if c.stringWidth(w, font, size) > max_w:
                chunk = ""
                for ch in w:
                    if c.stringWidth(chunk + ch, font, size) <= max_w:
                        chunk += ch
                    else:
                        if chunk:
                            lines.append(chunk)
                        chunk = ch
                cur = chunk
            else:
                cur = w
    if cur:
        lines.append(cur)
    return lines


def para(c, text, x, y, max_w, size=10, leading=13.5, color=CREAM_DIM, font="Helvetica"):
    set_fill(c, color)
    for ln in wrap(c, text, font, size, max_w):
        s = size
        while s > 7 and c.stringWidth(ln, font, s) > max_w:
            s -= 0.3
        c.setFont(font, s)
        c.drawString(x, y, ln)
        y -= leading
    return y


def bullet(c, text, x, y, max_w, size=9.5):
    set_fill(c, GOLD)
    c.circle(x + 2.5, y + 3, 1.5, fill=1, stroke=0)
    return para(c, text, x + 12, y, max_w - 12, size=size, leading=13)


def box_url(c, label, url, y):
    h = 54
    c.setFillColorRGB(0.14, 0.125, 0.11)
    c.roundRect(ML, y - h, CW, h, 8, fill=1, stroke=0)
    set_stroke(c, GOLD, 1.0, a=0.55)
    c.roundRect(ML, y - h, CW, h, 8, fill=0, stroke=1)
    c.setFont("Helvetica", 8)
    set_fill(c, GOLD)
    c.drawString(ML + 12, y - 14, no_em(label).upper())
    size = fit_font_size(c, url, "Helvetica", CW - 28, 11, 7)
    c.setFont("Helvetica", size)
    set_fill(c, CREAM)
    c.drawString(ML + 12, y - 34, url)
    return y - h - 14


# ── Product specs ────────────────────────────────────────────────────────────


@dataclass
class ProductSpec:
    product_id: str
    product: str
    product_line: str
    promise: str
    video_file: str
    video_path: str  # public path
    film_description: str
    shared_design: str
    video_gen: str
    customize: list[tuple[str, str]]
    opaque_id: str
    paid_salt: str | None = None  # only paid
    is_golden_rule: bool = False
    # "film" = classic bg-video SKU. "pack" = files-zip rebuild (never storefront *-preview*).
    media_kind: str = "film"
    # Optional pack-kind copy. None keeps the Zero Energy 3D-range defaults.
    pack_inside: list[str] | None = None
    pack_url_box_label: str | None = None
    pack_file_hint: str | None = None
    pack_section_title: str | None = None
    pack_section_kicker: str | None = None
    pack_section_intro: str | None = None
    pack_url_section_label: str | None = None
    pack_tell_ai: str | None = None
    pack_video_gen_title: str | None = None
    pack_video_gen_intro: str | None = None
    pack_video_gen_ask: str | None = None
    pack_closer: str | None = None
    pack_agent_use: str | None = None

    @property
    def video_url(self) -> str:
        return f"{WEBSITE_URL}{self.video_path}"

    @property
    def pdf_name(self) -> str:
        if self.paid_salt:
            return f"{self.product}-package-{self.opaque_id}-{self.paid_salt}.pdf"
        return f"{self.product}-package-{self.opaque_id}.pdf"

    @property
    def out_path(self) -> Path:
        return PACKAGES / self.product_id / self.pdf_name

    @property
    def public_href(self) -> str:
        return f"/packages/{self.product_id}/{self.pdf_name}"


def meridian_spec() -> ProductSpec:
    video_file = "sequence-01.mp4"
    video_path = "/assets/videos/sequence-01.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a luxury private residences brand called Meridian.

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video must be silent. Do not autoplay as a looping wallpaper. VIRTUAL PROGRESS controls which moment of the video is shown (scroll scrub). When the visitor scrolls the journey forward, the video advances. When they scroll back, it goes backward.

LOOK AND FEEL:
Dark cinematic frame color #0c0a08. Cream text #f7f1e8. One gold accent #c9a66b.
Elegant editorial serif for big headlines (Cormorant Garamond or Playfair Display). Clean sans (Inter) for smaller UI text.
Quiet, expensive, unhurried. Think private residences marketing, not a flashy tech startup.
Never use purple SaaS gradients, glass pill navigation bars, mesh/aurora backgrounds, shiny rainbow text, or emoji.

LAYOUT AND MOTION LAW (PIN-UNTIL-COMPLETE - mandatory - do NOT build a tall multi-vh page scroll track):
One pinned full-viewport stage (100dvh). Wheel / trackpad / touch / arrow keys advance VIRTUAL journey progress from 0 to 1.
Virtual journey effort is exactly 3.2 viewports of wheel distance (gold Meridian pace - do not invent a longer or shorter track).
GSAP scrub lag 0.45 seconds on a progress proxy (same smooth feel as classic scrub 0.45) - lag only, not page height.
At progress 0 + scroll up, or progress 1 + scroll down, RELEASE so the page can continue (membership band below).
Optional capture helper: window.__msScrollNarrative.setProgress(0..1).
Top: brand wordmark MERIDIAN, links Residences, Architecture, Locations, Concierge, and a rectangular outlined gold button "Request Access". Thin gold progress line under the nav that fills as progress advances.
Bottom-left story copy changes in three chapters:
Chapter 1 (start): eyebrow "Private Atlantic · By Appointment", title two lines "The coastline" / "belongs to few.", short body about rare oceanfront residences.
Chapter 2 (middle): eyebrow "Interiors · Bespoke", title "Every ascent" / "is intentional.", body about stone, mahogany, warm interiors.
Chapter 3 (end): eyebrow "The Arrival", title "Where the day" / "ends in gold.", body about path to the shore, plus two buttons "Schedule a private tour" and "View the portfolio".
Right side on large screens: chapter markers 01 02 03 with the active one highlighted in gold.
At the very start only, a small "Scroll" cue with a thin gold line. Do not add instructional paragraphs about how scrolling works.
After the pin releases, a dark closing section: gold "Membership" label, headline "Reserved for those who already have everything.", short support copy, stats "12 Residences · 4 Coastlines · 100% Owners only", and outlined gold button "Begin a conversation" (email link is fine).

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page component (or pack source/MeridianScrollNarrative.tsx). Map virtual progress to video.currentTime with GSAP lag 0.45 if available, or a 0.45s lerp. Video attributes: muted, playsInline, preload ready, no autoplay loop. Pause the video and only seek with progress. Support reduced-motion: show a still frame and chapter 1 only. Keep text readable with dark gradients over the video. Safe side padding so text never touches the screen edges. NEVER use a tall sticky multi-vh document track as the method.

QUALITY BAR:
It should look like a Forbes or private bank lifestyle page, not a generic AI template. One clear system: pin-until-complete virtual progress owns the film at Meridian gold pace (3.2 viewports, lag 0.45).
""".strip()
    return ProductSpec(
        product_id="MS-HERO-MERI01",
        product="Meridian",
        product_line="Pin-Until-Complete Scroll Narrative Hero",
        promise=(
            "A cinematic luxury real estate homepage that moves with pin-until-complete scroll. "
            "Quiet, expensive, and ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: luxury beachfront homes at sunset, then a warm interior staircase, "
            "then a garden path to the ocean. About 12 seconds, no sound."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K continuous single-take feel, about 12 seconds, no audio, 24 frames per second. "
            "One journey: (1) slow aerial over Mediterranean-revival beachfront mansions at golden hour sunset, "
            "Atlantic waves, warm orange sky; (2) dissolve into ascending limestone staircase with dark mahogany "
            "banisters, recessed step lights, warm interior glow toward bright ocean windows; (3) emerge onto "
            "manicured lawn path between palms and hedges leading to beach gates and open sunset ocean horizon. "
            "Ultra luxury real estate atmosphere, natural light only, no people faces, no text, no UI, no logos. "
            "Smooth camera, expensive restraint. Seamless emotional arc."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name MERIDIAN to [YOUR BRAND NAME] everywhere in the design, including the top corner. Keep pin-until-complete virtual progress."',
            ),
            (
                "Change the big headline",
                'Ask your AI: "Change the first big headline to [LINE 1] on the first line and [LINE 2] on the second line. Keep the same elegant style."',
            ),
            (
                "Change the small gold label above the headline",
                'Ask your AI: "Change the gold eyebrow text to [YOUR SHORT LABEL]."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename the button Request Access to [YOUR BUTTON TEXT]. Rename Schedule a private tour to [OTHER BUTTON TEXT]."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep the luxury dark look, but change the gold accent from #c9a66b to [YOUR HEX COLOR], and keep text easy to read."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with this file or URL: [YOUR VIDEO LINK OR FILE NAME]. Keep pin-until-complete virtual progress controlling the video, silent, no wallpaper loop. Keep effort 3.2 viewports and scrub lag 0.45."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so text never clips, buttons are easy to tap, and the pin-until-complete experience still feels premium on a phone."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Meridian luxury style, pin-until-complete virtual progress (3.2 viewports, lag 0.45). Do not build a tall multi-vh scroll track. Do not ask me to write code."',
            ),
        ],
        opaque_id="p4ltcy7t4p0c",
        paid_salt="pd1w65",
        is_golden_rule=True,
    )


def aether_spec() -> ProductSpec:
    video_file = "aether-waves-web-v1.mp4"
    video_path = "/assets/videos/aether-waves-web-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a wellness and meditation brand called AETHER.

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video must be silent, muted, looping, autoplay, playsInline. It is a calm wallpaper loop (not scroll-scrub). Pause when off-screen if you can (IntersectionObserver).

REQUIRED look of the film: golden-hour ocean waves, shoreline, warm natural light, meditative slow motion. No people, no aircraft, no cities, no neon, no text in the film.

LOOK AND FEEL:
Light, serene, biophilic. Cream wash over the video so waves stay visible: linear-gradient from rgba(253,251,247,0.15) to about 0.5 opacity at the bottom. Never cover the ocean with solid beige.
Text dark sage #2D3E35. Accent sage #7BA58F. Optional warm gold #D4A373. Muted body #5C6B63. Cream #FDFBF7.
Display type: Playfair Display. Body and nav: Inter.
Feels like calm premium wellness (Apple mindfulness x Aesop restraint). Never purple SaaS gradients, neon, aviation/jet lifestyle, fintech chrome, shiny rainbow text, or emoji overload.

LAYOUT (single full-viewport hero):
Fixed glass navbar (height about 64px): left brand AETHER plus a small sage dot; center links Meditate, Sleep, Breathe, Stories, Pricing (hide center links on small phones); right pill button "Start Free Trial" sage fill with cream text.
Centered hero content with breathing room:
1) Small badge: FIND YOUR CENTER (optional star), uppercase, sage
2) Huge H1: Breathe. dark sage, clamp about 2.8rem to 6.75rem, Playfair
3) Subline: Be. sage color, about 0.58 times the H1 size, never larger than Breathe.
4) Description exact: Guided meditations, sleep stories, and breathwork designed to help you find calm in a chaotic world.
5) Primary CTA pill: Start Your Journey (with a simple arrow icon if available). Sage fill, cream text. On mobile keep max width about 280px centered, not edge-to-edge full bar.
No floating side cards. Calm centered composition only. Safe horizontal padding so type never clips.

MOTION:
Staggered entrance (badge, headline, Be., description, CTA). Stagger about 0.12s, ease [0.25, 0.46, 0.45, 0.94]. Optional gentle video scale parallax 1 to 1.05 with scroll (skip on mobile and reduced-motion). Reduced-motion: simple opacity fade only.

TECHNICAL (you the AI implement this):
Modern web stack that works in my tool. Prefer one main hero component. Video: autoPlay muted loop playsInline. Light cream wash over video. Support reduced-motion. Focusable CTAs. Premium mobile layout.

QUALITY BAR:
It should feel like a real wellness product homepage, not a generic AI template. Ocean must remain the star under a light wash.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-AETH01",
        product="Aether",
        product_line="Serene Wellness Hero",
        promise=(
            "A serene full-bleed wellness homepage over golden-hour ocean waves. "
            "Calm confidence, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: calm ocean waves at golden hour, soft shoreline light, "
            "slow meditative motion. About 12 seconds, silent, seamless loop."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K seamless loop, 10 to 14 seconds, no audio. Camera just above a calm shoreline "
            "at golden hour looking toward the horizon. Slow turquoise waves roll toward the lens with soft foam. "
            "Warm low sun, gentle haze, creamy highlights, natural reflections on water. Extremely slow contemplative "
            "motion, 24 frames per second feel. No people, no boats, no aircraft, no text, no UI. Pure nature wellness atmosphere. Seamless loop."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: “Change the brand name AETHER to [YOUR BRAND NAME] everywhere, including the top left.”',
            ),
            (
                "Change the big headlines",
                'Ask your AI: “Change Breathe. to [YOUR MAIN WORD] and Be. to [YOUR SECOND WORD]. Keep Be. smaller than the main word.”',
            ),
            (
                "Change the badge and description",
                'Ask your AI: “Change the badge FIND YOUR CENTER to [YOUR BADGE]. Change the description paragraph to [YOUR DESCRIPTION].”',
            ),
            (
                "Change button labels",
                'Ask your AI: “Rename Start Free Trial to [NAV BUTTON]. Rename Start Your Journey to [HERO BUTTON].”',
            ),
            (
                "Change colors",
                'Ask your AI: “Keep the calm wellness look, but change sage from #7BA58F to [YOUR HEX] and keep text easy to read on the video.”',
            ),
            (
                "Use a different background video",
                'Ask your AI: “Replace the background video with [YOUR VIDEO LINK OR FILE NAME]. Keep it muted, looping, full screen, with a light cream wash so the film stays visible.”',
            ),
            (
                "Make it work on phones",
                'Ask your AI: “Improve the mobile layout so text never clips, the CTA is easy to tap, and the hero still feels calm and premium.”',
            ),
            (
                "Something looks wrong",
                'Ask your AI: “Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Aether wellness style. Do not ask me to write code.”',
            ),
        ],
        opaque_id="8rgb4zhx7zrd",
        paid_salt=None,
    )


def vertex_spec() -> ProductSpec:
    video_file = "vertex-globe-web-v1.mp4"
    video_path = "/assets/videos/vertex-globe-web-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for an enterprise cybersecurity brand called VERTEX SECURITY (short brand mark: VERTEX).

BACKGROUND VIDEO (required - PSAVE, not simple autoplay loop, not seek-scrub):
Use this video as the full-screen hero film:
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Do not autoplay as a looping wallpaper. PSAVE (Perfect Scroll Video Engine): scroll aims a destination. Down-scroll PLAYS the film forward at 1.2x. Up-scroll PLAYS it backward at the same 1.2x, one 3-frame step per seek. NEVER jump a frame. NEVER assign currentTime to the destination.
The film is an even, steady asteroid / wireframe globe approach (rocks shed toward the viewpoint the whole 12 seconds). It is not a slow-then-kick cut. Aim on 3.6 viewports, like an even sanctuary film, not a 12-viewport fashion breakout.

LOOK AND FEEL:
Pure black canvas #000000. Pure white type. Monochrome brutalist. Display: Space Grotesk bold for big titles. Body: Inter.
CTAs are sharp rectangles with radius 0 (no rounded pills). Primary CTA: white fill black text. Secondary: white outline.
Left-heavy black scrims so type stays readable over the globe film.
Serious SOC / enterprise security vendor. Never cyan-pink neon kits, aurora mesh, glass pill docks, shiny rainbow text, or emoji.

LAYOUT AND MOTION LAW (PIN-UNTIL-COMPLETE + PSAVE - mandatory - do NOT build a tall multi-vh page scroll track):
One pinned full-viewport stage (100dvh). Wheel / trackpad / touch / arrow keys AIM a destination on a 3.6-viewport track. Raw 1:1. No wheel gain. No swipe cap. No GSAP lag.
PSAVE: Down-scroll PLAYS the film forward at 1.2x (muted play() at playbackRate 1.2). Up-scroll PLAYS it backward at the same 1.2x by walking the live video exactly one 3-frame step (0.125s at 24fps) per seek. NEVER jump a frame. A tiny click creeps a few frames. A crazy scroll may aim ahead - the film still plays normally to that moment.
THE LIFT: leftover dest keeps the film going a little after they stop. After last real intent dest must sit at least 0.55 film-seconds ahead. Ignore opposite trackpad ticks under 32px. Forward rate tapers from 1.2 toward 0.42 over the last 0.55s. Friction, then a graceful stop. Never a tire screech. This 0.55 is leftover dest, NOT old GSAP scrub lag 0.45.
First real opposite gesture cancels a leftover destination and starts from the picture. Reverse starts WHILE they are still scrolling (220ms live window), then continues the same 3-frame steps after they stop. Wait for seeked. No canvas buffer. No loop.
Copy, chapters, and the white bar follow the PICTURE, not the wheel destination.
Release ONLY when the picture has arrived at 0 (scroll up) or 1 (scroll down). After release the PAGE owns scroll until the stage docks. There is NO closing membership footer band. The story ends when the picture arrives. On a client site the host page may continue.
Optional capture helper: window.__msScrollNarrative.setProgress(0..1) may snap. getProgress is the playhead. getTarget is leftover dest.
Top: brand VERTEX, links Platform, Threat Intel, Solutions, Company, and a sharp "Request Demo" button. Thin white progress hairline under the nav that fills as the picture advances.
Left story copy changes in three chapters from the playhead:
Chapter 1 (start): eyebrow "Zero Trust Architecture", titles "SECURITY." / "WITHOUT COMPROMISE.", body about preventing zero-day and nation-state threats.
Chapter 2 (middle): eyebrow "Global Threat Fabric", titles "Every packet" / "is a signal.", body about live telemetry and intent.
Chapter 3 (end): eyebrow "Built for SOC teams", titles "Prevention" / "is the product.", dual CTAs "Request Demo" and "View Threat Intel", stats like "< 4m MTTR · 99.99% Coverage · 2,400+ SOC teams".
Right side large screens: chapter markers 01 02 03, active one bright.
At the start only: a small Scroll cue. Safe padding so type never clips.

HOW TO BUILD IT (mandatory algorithm - do not invent another method):
1. One 100dvh stage in normal document flow. There is no footer band. Do not overflow-hidden the page.
2. Hold a DESTINATION 0 to 1 and a PLAYHEAD that is whatever the video is showing. The poster is about frame 0. Kick-seek 0.04 then 0, wait seeked, fade the film in. Reduced motion may keep that poster and show chapter 1 only.
3. Gestures add deltaPx / (3.6 * window height) to the DESTINATION only.
4. Wheel and trackpad: ignore ctrl/meta zoom. Normalize deltaMode. Map raw delta 1:1 onto the 3.6 track. Ignore opposite ticks under 32px. Apply once per animation frame. preventDefault while the pin owns the gesture.
5. Touch is also destination-only on the 3.6 track. Do not trap Space on a focused button.
6. PSAVE: each animation frame, walk the picture toward destination * duration at 1.2x, never more than 1/24 second of film in one forward fallback tick. Down: play() at playbackRate 1.2, ease over the last 0.55s of leftover dest. After they lift, if dest is closer than 0.55s of film, push dest that far once. Up: first real up-scroll snaps destination to the picture, then walk currentTime backward exactly 0.125s per seek on the live video. No low-res buffer. No loop.
7. If the PICTURE is at 0 and they scroll up, or the PICTURE is at 1 and they scroll down, RELEASE so the host page can continue. If the destination is already at an end but the picture is still walking, keep the pin. After release, page-owns until the stage docks.
8. Reduced motion: still chapter 1 plus poster. No chase.
9. FILM ENCODE: the shipped vertex-globe-web-v1.mp4 is H.264 GOP 3, no B-frames, 97 I-frames, 12.04s, 24fps, 289 frames. If you replace the video, re-encode first: ffmpeg -an -c:v libx264 -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart. Keep 3.6 on an even film. Do not extract PNG frames.
If you are about to write ScrollTrigger.create, position sticky, a 420vh spacer, gsap.to on a progress proxy, or video.currentTime = target * duration on a large jump, stop and use this algorithm instead.
Do not copy old Vertex seek-scrub 3.2 / wheel gain 0.22 / GSAP lag 0.45. Do not copy Revel 12 onto this even asteroid film. Vertex gold is PSAVE on 3.6 viewports with leftover dest floor 0.55s.
PACK DELIVERY: This product ships as a buyer manual PDF plus the sold prompt. There is no files zip and no START-HERE folder. Rebuild from this brief and the video URL (or local vertex-globe-web-v1.mp4).

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page component (or VertexHeroSection.tsx). Scroll aims. The film plays to that moment. Video attributes: muted, playsInline, preload ready, no wallpaper loop. Support reduced-motion: show a still frame and chapter 1 only. Keep text readable with dark gradients over the video. Safe side padding so text never touches the screen edges. NEVER use a tall sticky multi-vh document track as the method. NEVER seek currentTime across a jump. NEVER add a closing footer band.

QUALITY BAR:
Linear / Stripe enterprise density meets brutalist editorial. One clear system: PSAVE on pin-until-complete. Scroll aims on 3.6 viewports. The globe film plays forward at 1.2x and reverse every 3rd frame, never jumps a frame, and on lift it coasts with friction then a graceful stop. After the last frame the host page may continue. No generic AI SaaS look.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-VERT01",
        product="Vertex",
        product_line="Pin-Until-Complete PSAVE Cybersecurity Scroll Hero",
        promise=(
            "A monochrome enterprise security homepage that hardens as visitors scroll. "
            "Serious authority, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: abstract wireframe / globe / asteroid cybersecurity atmosphere, "
            "dark monochrome even approach suitable for a scroll narrative. About 12 seconds, no sound. "
            "Designed for PSAVE (GOP 3, no B-frames, 97 I-frames)."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K about 12 seconds, no audio, 24 frames per second. Abstract dark monochrome "
            "wireframe globe and asteroid / network nodes, even camera drift toward the viewpoint, "
            "enterprise cybersecurity atmosphere. No people, no readable UI text, no logos, no neon rainbow. "
            "Serious, technical, restrained. Even motion, not a slow-then-kick cut. Designed for PSAVE."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name VERTEX to [YOUR BRAND NAME] everywhere in the design, including the top corner. Keep pin-until-complete PSAVE."',
            ),
            (
                "Change the big headlines",
                'Ask your AI: "Change the first chapter titles to [LINE 1] and [LINE 2]. Keep brutalist Space Grotesk style."',
            ),
            (
                "Change eyebrows and body",
                'Ask your AI: "Change the chapter eyebrow labels and body paragraphs to [YOUR COPY]. Keep three chapters."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename Request Demo to [PRIMARY]. Rename View Threat Intel to [SECONDARY]. Keep sharp zero-radius buttons."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep monochrome brutalist, but if you introduce one accent use [YOUR HEX] sparingly. Keep text highly readable."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the globe film with [YOUR VIDEO LINK OR FILE]. Re-encode it for PSAVE reverse first: H.264, no audio, GOP 3, no B-frames, crf 16, +faststart. Then wire the remastered file. Keep PSAVE: scroll aims on 3.6 viewports 1:1, play forward at 1.2x, reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift so it keeps going a little then eases to a stop. Silent, no wallpaper loop. If the new film is slow then a kick, size the aim track to the story beat."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so type never clips, CTAs are easy to tap, and the pin-until-complete PSAVE experience still feels serious and premium."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Vertex brutalist security style and PSAVE (pin-until-complete, 3.6 viewport aim 1:1, play 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift, release only when the picture arrives, no footer band). Do not seek currentTime across a jump. Do not restore old Vertex wheel-gain 0.22 or GSAP lag 0.45. Do not build a tall multi-vh scroll track. Do not ask me to write code."',
            ),
        ],
        opaque_id="b352guxju0ic",
        paid_salt=None,
    )


def neon_spec() -> ProductSpec:
    video_file = "neon-forge-city-v1.mp4"
    video_path = "/assets/videos/neon-forge-city-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a game development studio brand called NEON FORGE.

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Play it as a looping cinematic wallpaper (autoplay, muted, loop, playsInline). Do NOT use scroll-scrub timeline control. Optional light parallax scale on desktop only (about 1.0 to 1.06). Pause when the hero is off-screen.

LOOK AND FEEL:
Pure black canvas #000000. Electric cyan #00F0FF and hot pink #FF006E as the only brand accents. White headlines.
Display: Space Grotesk 800-900 for big titles. Body: Inter light.
Liquid-glass navigation and secondary buttons (soft blur, translucent fill). Primary CTAs are cyan pills with black text.
Left-heavy dual black scrims so type stays readable over the rain city film.
AAA game studio launch page energy. Quiet luxury density with neon precision.
Never purple SaaS gradients or mesh aurora as UI fills, shiny rainbow text, emoji, anime kits, cheap stock cyberpunk clutter, wellness cream, or brutalist zero-radius monochrome (that is Vertex).

LAYOUT:
Single full-viewport hero (not multi-chapter scroll scrub). Fixed glass navbar on top.
Top left: brand NEON FORGE in cyan with a small glowing cyan dot. Center links (hide on small phones): Work, Games, Studio, Careers, Contact. Right: two pills "Play Demo" (glass) and "Get Started" (cyan fill, black text).
Hero content left-aligned over the film:
- Badge: GAME DEVELOPMENT STUDIO (uppercase, tracking wide, cyan)
- H1: BUILD WORLDS. (huge white Space Grotesk). On first load only, a brief glitch (opacity/x jitter ~3 cycles) unless reduced motion.
- H2: PLAY GOD. (slightly smaller, pink #FF006E)
- Short body about crafting immersive games from concept to launch
- Two CTAs: View Our Work (cyan fill) and Join The Team (glass outline)
Safe side padding so type never clips. Optional very subtle scanline overlay at ~2% opacity.

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page section component. Video: muted, playsInline, autoPlay, loop, preload metadata, object-fit cover. IntersectionObserver to pause when off-screen. Framer Motion (or equivalent) for staggered entrance + H1 glitch. Optional GSAP ScrollTrigger for light video scale parallax on desktop only. Support prefers-reduced-motion: no glitch, no parallax, simple fade-in. Keep text readable with left-heavy black gradients over the video.

QUALITY BAR:
It should feel like a high-end studio trailer homepage, not a generic AI cyberpunk template. One clear system: looping film + one glitch moment + precise type.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-NEON01",
        product="NeonForge",
        product_line="Cyberpunk Gaming Studio Hero",
        promise=(
            "A black-canvas neon gaming studio homepage with rain megacity film, glitch type, "
            "and liquid glass. Trailer energy, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: night rain-soaked cyberpunk megacity canyon, cyan and magenta "
            "neon practicals, wet reflections, slow cinematic glide. About 60 seconds, seamless loop feel, no sound."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K seamless loop feel, silent, 24 frames per second. Night rain-soaked cyberpunk "
            "megacity canyon, slow aerial or street glide, cyan and magenta neon practical lights only, "
            "wet asphalt reflections, volumetric fog, pure black voids for UI legibility. No people, no faces, "
            "no readable text, no logos, no HUD, no daytime, no ocean, no aircraft as hero. Premium AAA "
            "trailer look. Seamless loop."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name NEON FORGE to [YOUR BRAND NAME] everywhere in the design, including the top left."',
            ),
            (
                "Change the big headlines",
                'Ask your AI: "Change BUILD WORLDS. to [LINE 1] and PLAY GOD. to [LINE 2]. Keep huge Space Grotesk and the cyan/pink split."',
            ),
            (
                "Change badge and body",
                'Ask your AI: "Change the badge GAME DEVELOPMENT STUDIO and the body paragraph to [YOUR COPY]. Keep left-aligned editorial stack."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename View Our Work to [PRIMARY] and Join The Team to [SECONDARY]. Keep cyan primary and glass secondary pills."',
            ),
            (
                "Change colors",
                'Ask your AI: "Swap cyan #00F0FF and pink #FF006E to [ACCENT A] and [ACCENT B]. Keep pure black canvas and readable contrast."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE NAME]. Keep muted loop autoplay, not scroll scrub."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so the headline never clips, nav center links hide, CTAs stack cleanly, and parallax is off under 768px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Neon Forge black/cyan/pink studio style. Do not ask me to write code."',
            ),
        ],
        opaque_id="n7k2m9p4qx1w",
        paid_salt="nf3k8a",
    )


def lumina_spec() -> ProductSpec:
    video_file = "lumina-dolly-v1.mp4"
    video_path = "/assets/videos/lumina-dolly-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a film production studio brand called LUMINA STUDIOS (short brand mark: LUMINA).

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Play it as a looping cinematic wallpaper (autoplay, muted, loop, playsInline). Do NOT use scroll-scrub timeline control. Optional light parallax scale on desktop only (about 1.0 to 1.05). Pause when the hero is off-screen.

LOOK AND FEEL:
Espresso warm canvas #1E140A. Cream type #FEF3C7. Amber accent #F59E0B only.
Display: Playfair Display bold for big titles. Body: Inter light.
Soft liquid-glass navigation and secondary buttons. Primary CTAs are amber pills with espresso text.
Left-heavy dual espresso scrims so type stays readable over the studio lot film.
Quiet film-craft house prestige. Never cyan-pink neon kits, purple mesh, shiny rainbow text, emoji, wellness cream ocean, brutalist zero-radius monochrome (Vertex), or multi-chapter scroll scrub (Meridian).

LAYOUT:
Single full-viewport hero (not multi-chapter scroll scrub). Fixed soft-glass navbar on top.
Top left: brand LUMINA with a small amber glowing dot. Center links (hide on small phones): Work, Films, Studio, Careers, Contact. Right: two pills "Showreel" (glass) and "Start a Project" (amber fill, espresso text).
Hero content left-aligned over the film:
- Badge: FILM PRODUCTION STUDIO (uppercase, tracking wide, amber)
- H1: STORIES THAT (huge cream Playfair)
- Lockup line: MOVE. (amber Playfair)
- Short body about award-minded film and commercial craft from treatment to final grade
- Two CTAs: View the Reel (amber fill) and Book a Call (glass outline)
Safe side padding so type never clips. No glitch effects. Soft staggered entrances only.

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page section component. Video: muted, playsInline, autoPlay, loop, preload metadata, object-fit cover. IntersectionObserver to pause when off-screen. Framer Motion (or equivalent) for staggered entrance. Optional GSAP ScrollTrigger for light video scale parallax on desktop only. Support prefers-reduced-motion: no parallax, simple fade-in. Keep text readable with left-heavy espresso gradients over the video.

QUALITY BAR:
It should feel like a prestige film studio launch page, not a generic AI template. One clear system: looping warm film + soft type + amber craft accent.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-LUMI01",
        product="Lumina",
        product_line="Cinematic Film Production Hero",
        promise=(
            "A warm amber film-studio homepage with empty backlot dolly film, Playfair type, "
            "and soft glass. Prestige craft energy, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: empty film studio backlot / lot at golden hour, warm tungsten "
            "and amber practical light, slow cinematic dolly. About 60 seconds, seamless loop feel, no sound."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K seamless loop feel, silent, 24 frames per second. Empty film studio backlot "
            "or soundstage, slow dolly, warm amber tungsten practicals, cream highlights, espresso voids. "
            "No people, no faces, no readable text, no logos, no neon cyberpunk city. Prestige film-craft "
            "trailer look. Seamless loop."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name LUMINA to [YOUR BRAND NAME] everywhere in the design, including the top left."',
            ),
            (
                "Change the big headlines",
                'Ask your AI: "Change STORIES THAT to [LINE 1] and MOVE. to [LINE 2]. Keep huge Playfair and cream/amber split."',
            ),
            (
                "Change badge and body",
                'Ask your AI: "Change the badge FILM PRODUCTION STUDIO and the body paragraph to [YOUR COPY]. Keep left-aligned editorial stack."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename View the Reel to [PRIMARY] and Book a Call to [SECONDARY]. Keep amber primary and glass secondary pills."',
            ),
            (
                "Change colors",
                'Ask your AI: "Swap amber #F59E0B and cream #FEF3C7 to [ACCENT] and [LIGHT]. Keep warm espresso canvas and readable contrast."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE NAME]. Keep muted loop autoplay, not scroll scrub."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so the headline never clips, nav center links hide, CTAs stack cleanly, and parallax is off under 768px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Lumina amber/cream film-studio style. Do not ask me to write code."',
            ),
        ],
        opaque_id="l8m4k2p9qx7w",
        paid_salt="lm4k9a",
    )


def terra_spec() -> ProductSpec:
    video_file = "terra-aerial-v1.mp4"
    video_path = "/assets/videos/terra-aerial-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a clean energy platform brand called TERRA NOVA.

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Play it as a looping cinematic wallpaper (autoplay, muted, loop, playsInline). Do NOT use scroll-scrub timeline control. Optional light parallax scale on desktop only (about 1.0 to 1.05). Pause when the hero is off-screen.

LOOK AND FEEL:
Deep forest canvas #0B1A14. Cream headlines #F4F7F2. Living sage #7BA58F and soft solar gold #E8B86D as the only accents.
Display: Fraunces (or similar soft editorial serif) for big titles. Body: DM Sans or Inter light.
Soft green-tinted liquid-glass navigation and secondary buttons. Primary CTAs are sage pills with forest text.
Left-heavy dual forest scrims so type stays readable over the aerial renewable landscape film.
Optimistic climate-tech prestige. Never cyan-pink neon kits, purple mesh, shiny rainbow text, emoji, cream wellness spa (Aether), amber film-lot espresso (Lumina), multi-chapter scroll scrub (Meridian), or brutalist zero-radius monochrome (Vertex).

LAYOUT:
Single full-viewport hero (not multi-chapter scroll scrub). Fixed soft-glass navbar on top.
Top left: brand TERRA NOVA with a small living sage glowing dot. Center links (hide on small phones): Solutions, Impact, Technology, About, Contact. Right: two pills "Our Impact" (glass) and "Talk to Us" (sage fill, forest text).
Hero content left-aligned over the film:
- Badge: CLEAN ENERGY PLATFORM (uppercase, tracking wide, sage)
- H1: POWER THE (huge cream Fraunces)
- Lockup line: PLANET. (solar gold)
- Short body about utility-scale renewables and intelligent grids
- Two CTAs: Explore Solutions (sage fill) and See the Impact (glass outline)
Safe side padding so type never clips. No glitch effects. Soft staggered entrances only.

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page section component. Video: muted, playsInline, autoPlay, loop, preload metadata, object-fit cover. IntersectionObserver to pause when off-screen. Framer Motion (or equivalent) for staggered entrance. Optional GSAP ScrollTrigger for light video scale parallax on desktop only. Support prefers-reduced-motion: no parallax, simple fade-in. Keep text readable with left-heavy forest gradients over the video.

QUALITY BAR:
It should feel like a serious climate-tech launch page, not a generic AI green template. One clear system: looping aerial film + soft type + sage craft accent.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-TERR01",
        product="TerraNova",
        product_line="Clean Energy Platform Hero",
        promise=(
            "A deep-forest clean energy homepage with aerial renewable landscape film, Fraunces type, "
            "and sage glass. Optimistic climate-tech energy, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: aerial wind farm / renewable ridge landscape, living greens and soft "
            "solar gold light, slow cinematic glide. About 60 seconds, seamless loop feel, no sound."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K seamless loop feel, silent, 24 frames per second. Aerial renewable landscape - "
            "wind ridges or solar fields, slow glide, living sage and soft solar gold grade, deep forest voids. "
            "No people, no faces, no readable text, no logos, no neon cyberpunk city. Optimistic climate-tech "
            "trailer look. Seamless loop."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name TERRA NOVA to [YOUR BRAND NAME] everywhere in the design, including the top left."',
            ),
            (
                "Change the big headlines",
                'Ask your AI: "Change POWER THE to [LINE 1] and PLANET. to [LINE 2]. Keep huge Fraunces and cream/solar-gold split."',
            ),
            (
                "Change badge and body",
                'Ask your AI: "Change the badge CLEAN ENERGY PLATFORM and the body paragraph to [YOUR COPY]. Keep left-aligned editorial stack."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename Explore Solutions to [PRIMARY] and See the Impact to [SECONDARY]. Keep sage primary and glass secondary pills."',
            ),
            (
                "Change colors",
                'Ask your AI: "Swap sage #7BA58F and solar gold #E8B86D to [ACCENT A] and [ACCENT B]. Keep deep forest canvas and readable contrast."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE NAME]. Keep muted loop autoplay, not scroll scrub."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so the headline never clips, nav center links hide, CTAs stack cleanly, and parallax is off under 768px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Terra Nova forest/sage climate-tech style. Do not ask me to write code."',
            ),
        ],
        opaque_id="t3r9n0v7qx2m",
        paid_salt="tn5k2a",
    )


def apex_spec() -> ProductSpec:
    video_file = "apex-quantum-v1.mp4"
    video_path = "/assets/videos/apex-quantum-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a deep-tech quantum computing brand called APEX QUANTUM.

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Play it as a looping cinematic wallpaper (autoplay, muted, loop, playsInline). Do NOT use scroll-scrub timeline control. Optional light parallax scale on desktop only (about 1.0 to 1.04). Pause when the hero is off-screen.

LOOK AND FEEL:
Void indigo canvas #070A1A. Ice headlines #E8F0FF. Electric quantum cyan #00D4FF and controlled violet #A855F7 as the only accents.
Display: JetBrains Mono for big titles. Body: Inter light.
Cold cyan-tinted liquid-glass navigation and secondary buttons. Primary CTAs are cyan pills with void text.
Left-heavy dual void scrims so type stays readable over the cryogenic quantum lab film.
Deep-tech scientific prestige. Never pink neon rain city kits (Neon), purple mesh SaaS wallpaper, shiny rainbow text, emoji, cream wellness spa (Aether), amber film-lot espresso (Lumina), forest sage climate (Terra), multi-chapter scroll scrub (Meridian), or brutalist zero-radius monochrome (Vertex). No glitch effects.

LAYOUT:
Single full-viewport hero (not multi-chapter scroll scrub). Fixed cold-glass navbar on top.
Top left: brand APEX with QUANTUM caption and a small cyan glowing pulse. Center links (hide on small phones): Platform, Research, Systems, Labs, Contact. Right: two pills "Documentation" (glass) and "Request Access" (cyan fill, void text).
Hero content left-aligned over the film:
- Badge: QUANTUM COMPUTING PLATFORM (uppercase, tracking wide, cyan)
- H1: QUANTUM. (huge ice JetBrains Mono)
- Lockup line: REAL. (violet)
- Short body about error-corrected quantum systems and one stack of hardware, software, and control
- Two CTAs: Access Quantum (cyan fill) and Read the Paper (glass outline)
Safe side padding so type never clips. Soft staggered entrances only.

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page section component. Video: muted, playsInline, autoPlay, loop, preload metadata, object-fit cover. IntersectionObserver to pause when off-screen. Framer Motion (or equivalent) for staggered entrance. Optional GSAP ScrollTrigger for light video scale parallax on desktop only. Support prefers-reduced-motion: no parallax, simple fade-in. Keep text readable with left-heavy void indigo gradients over the video. No Three.js required for v1.

QUALITY BAR:
It should feel like a serious quantum hardware launch page, not a generic AI particle toy. One clear system: looping cryogenic lab film + mono type + cyan instrument accent.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-APEX01",
        product="ApexQuantum",
        product_line="Deep Tech Quantum Hero",
        promise=(
            "A void-indigo quantum platform homepage with cryogenic lab film, JetBrains Mono type, "
            "and cyan instrument glass. Deep-tech energy, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: empty cryogenic quantum lab / cryostat tower environment, electric cyan "
            "and controlled violet instrument light, slow cinematic push. About 60 seconds, seamless loop feel, no sound."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K seamless loop feel, silent, 24 frames per second. Empty cryogenic quantum laboratory "
            "or pure qubit light lattice, slow push, void indigo voids, electric cyan and controlled violet "
            "instrument light. No people, no faces, no readable text, no logos, no neon rain megacity. "
            "Deep-tech quantum prestige trailer look. Seamless loop."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name APEX QUANTUM to [YOUR BRAND NAME] everywhere in the design, including the top left."',
            ),
            (
                "Change the big headlines",
                'Ask your AI: "Change QUANTUM. to [LINE 1] and REAL. to [LINE 2]. Keep huge JetBrains Mono and ice/violet split."',
            ),
            (
                "Change badge and body",
                'Ask your AI: "Change the badge QUANTUM COMPUTING PLATFORM and the body paragraph to [YOUR COPY]. Keep left-aligned stack."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename Access Quantum to [PRIMARY] and Read the Paper to [SECONDARY]. Keep cyan primary and glass secondary pills."',
            ),
            (
                "Change colors",
                'Ask your AI: "Swap cyan #00D4FF and violet #A855F7 to [ACCENT A] and [ACCENT B]. Keep void indigo canvas and readable contrast."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE NAME]. Keep muted loop autoplay, not scroll scrub."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so the headline never clips, nav center links hide, CTAs stack cleanly, and parallax is off under 768px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Apex Quantum void/cyan deep-tech style. Do not ask me to write code."',
            ),
        ],
        opaque_id="a9x4q7m2kp8w",
        paid_salt="aq3n8k",
    )


def revel_spec() -> ProductSpec:
    video_file = "revel-breakout-v1.mp4"
    video_path = "/assets/videos/revel-breakout-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium scroll-as-narrative website hero for a fashion commerce brand called REVEL.

BACKGROUND VIDEO (required - PSAVE, not simple autoplay loop):
Use this video as the full-screen hero film:
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Do not autoplay as a looping wallpaper. PSAVE (Perfect Scroll Video Engine): scroll aims a destination. Down-scroll PLAYS the film forward at 1.2x. Up-scroll PLAYS it backward at the same 1.2x, one 3-frame step per seek. NEVER jump a frame. NEVER assign currentTime to the destination.
The film is designed slow then fast: she lives in the phone and walks up to the glass (slow), then a kick and jump out (fast). Halfway (she leaves the viewpoint) takes about 5 or 6 scrolls. Do not flatten that edit.

LOOK AND FEEL:
Pearl light canvas #F7F4F1. Charcoal ink #1A1614. Rose gold #C4A574 and soft blush #E8B4B8 accents.
Display: Instrument Serif (or elegant editorial serif) for big titles. Body: Inter light.
Thin rose-gold progress bar under the nav. Fashion uppercase tracking. Light studio luxury.
This is a LIGHT mode hero. Never dark private-bank Meridian gold coastal, never mono Vertex security, never neon cyberpunk rain city, never quantum void cyan, never forest climate sage.

LAYOUT AND MOTION LAW (PIN-UNTIL-COMPLETE + PSAVE - mandatory - do NOT build a tall multi-vh page scroll track):
One pinned full-viewport stage (100dvh). Wheel / trackpad / touch / arrow keys AIM a destination on a 12-viewport track. Raw 1:1. No wheel gain. No swipe cap. No GSAP lag.
PSAVE: Down-scroll PLAYS the film forward at 1.2x (muted play() at playbackRate 1.2). Up-scroll PLAYS it backward at the same 1.2x by walking the live video exactly one 3-frame step (0.125s at 24fps) per seek. NEVER jump a frame. A tiny click creeps a few frames. A crazy scroll may aim ahead - the film still plays normally to that moment.
THE LIFT: leftover dest keeps the film going a little after they stop. After last real intent dest must sit at least 0.55 film-seconds ahead. Ignore opposite trackpad ticks under 32px. Forward rate tapers from 1.2 toward 0.42 over the last 0.55s. Friction, then a graceful stop. Never a tire screech. This 0.55 is leftover dest, NOT old GSAP scrub lag.
First real opposite gesture cancels a leftover destination and starts from the picture. Reverse starts WHILE they are still scrolling (280ms live window), then continues the same 3-frame steps after they stop. Wait for seeked. No canvas buffer. No loop.
Copy, chapters, and the rose bar follow the PICTURE, not the wheel destination.
Release ONLY when the picture has arrived at 0 (scroll up) or 1 (scroll down). After release the PAGE owns scroll until the stage docks. Pointer on the atelier must never drive the film.
Optional capture helper: window.__msScrollNarrative.setProgress(0..1) may snap. getProgress is the playhead. getTarget is leftover dest.
Top nav: brand REVEL + Fashion Commerce, center links Collections Lookbook Campaigns Journal, right frost "Enter atelier".
Four chapters swap as the playhead advances:
1) The feed - "She lived / inside the glow." (floating gold phone, social icons)
2) The break - "Then something / had to give." (shoe shatters glass)
3) The shatter - "Shards of / attention fall." (glass and icons midair)
4) The arrival - "Now she / owns the room." (woman free mid-leap) with CTAs Shop the drop and Watch campaign.
Right rail chapter indices 01-04. Scroll cue at start. Closing atelier band AFTER the pin releases.

HOW TO BUILD IT (mandatory algorithm - do not invent another method):
1. One 100dvh stage in normal document flow. The atelier band is the NEXT sibling. Do not overflow-hidden the page.
2. Hold a DESTINATION 0 to 1 and a PLAYHEAD that is whatever the video is showing. The poster IS frame 0. Kick-seek 0.04 then 0, wait seeked, fade the film in. Reduced motion may keep that poster and seek to about 0.45.
3. Gestures add deltaPx / (12 * window height) to the DESTINATION only.
4. Wheel and trackpad: ignore ctrl/meta zoom. Normalize deltaMode. Map raw delta 1:1 onto the 12 track. Ignore opposite ticks under 32px. Apply once per animation frame. preventDefault while the pin owns the gesture.
5. Touch is also destination-only on the 12 track. Do not trap Space on a focused button.
6. PSAVE: each animation frame, walk the picture toward destination * duration at 1.2x, never more than 1/24 second of film in one forward fallback tick. Down: play() at playbackRate 1.2, ease over the last 0.55s of leftover dest. After they lift, if dest is closer than 0.55s of film, push dest that far once. Up: first real up-scroll snaps destination to the picture, then walk currentTime backward exactly 0.125s per seek on the live video. No low-res buffer. No loop.
7. If the PICTURE is at 0 and they scroll up, or the PICTURE is at 1 and they scroll down, RELEASE so the atelier can scroll into view. If the destination is already at an end but the picture is still walking, keep the pin. After release, page-owns until the stage docks.
8. Reduced motion: still mid-film frame around 0.45. No chase.
9. FILM ENCODE: the shipped revel-breakout-v1.mp4 is H.264 GOP 3, no B-frames, 161 I-frames, 20.04s, 24fps, 482 frames. If you replace the video, re-encode first: ffmpeg -an -c:v libx264 -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart. Size the new aim track to the story beat. Do not extract PNG frames.
If you are about to write ScrollTrigger.create, position sticky, a 480vh spacer, or video.currentTime = target * duration on a large jump, stop and use this algorithm instead.
Do not copy old Vertex seek-scrub 0.22 or old Revel seek-scrub 0.11 / 0.035 / 0.09 / GSAP 0.55. Live Vertex is PSAVE on 3.6 viewports with leftover dest floor 0.55s. Revel gold is PSAVE on 12 viewports with leftover dest floor 0.55s.
PACK DELIVERY: This product ships as a buyer manual PDF plus the sold prompt. There is no files zip and no START-HERE folder. Rebuild from this brief and the video URL (or local revel-breakout-v1.mp4).

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page component (or RevelScrollNarrative.tsx). Scroll aims. The film plays to that moment. Video attributes: muted, playsInline, preload ready, no wallpaper loop. Support reduced-motion: show a still mid-film frame (~0.45) and no chase. Keep cream type readable with pearl top fade and dark bottom scrim. NEVER use a tall sticky multi-vh document track as the method. NEVER seek currentTime across a jump. NEVER drive the film from the atelier after release.

QUALITY BAR:
It should feel like a high-fashion campaign site, not a generic AI social template. One clear system: PSAVE on pin-until-complete. Scroll aims on 12 viewports. The breakout film plays forward at 1.2x and reverse every 3rd frame, never jumps a frame, and on lift it coasts with friction then a graceful stop. Halfway (she leaves the phone) is earned. After the last frame the page owns the atelier.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-REVL01",
        product="Revel",
        product_line="Pin-Until-Complete Fashion Scroll Hero",
        promise=(
            "A light pearl fashion homepage where scroll advances an iPhone breakout film - "
            "four chapters from feed to freedom, rose-gold type, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: gold iPhone social-commerce breakout - floating phone and icons, "
            "glass shatter by a shoe, suspended shards, woman leaping free. About 20 seconds, "
            "pearl studio, rose silk, no sound. Designed for PSAVE (GOP 3, no B-frames). "
            "Slow then a kick: about 5 or 6 scrolls to the halfway beat."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K seamless narrative, silent, 24fps. Gold smartphone in a bright pearl fashion "
            "studio, social icons orbit, then a shoe shatters the glass screen, shards and hearts float, "
            "a woman breaks free mid-leap. Rose gold and blush accents. No readable brand logos as UI. "
            "High-fashion campaign look."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name REVEL to [YOUR BRAND NAME] everywhere, including the top left. Keep pin-until-complete virtual progress."',
            ),
            (
                "Change chapter headlines",
                'Ask your AI: "Rewrite the four chapter titles to [YOUR FOUR PAIRS OF LINES]. Keep Instrument Serif and cream type on the film."',
            ),
            (
                "Change chapter bodies",
                'Ask your AI: "Rewrite each chapter body paragraph to [YOUR COPY]. Keep short editorial lines."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename Shop the drop to [PRIMARY] and Watch campaign to [SECONDARY]. Keep charcoal primary and frost secondary."',
            ),
            (
                "Change colors",
                'Ask your AI: "Swap rose gold #C4A574 and blush #E8B4B8 to [ACCENT A] and [ACCENT B]. Keep pearl canvas and readable contrast."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the breakout film with [YOUR VIDEO LINK OR FILE]. Re-encode it for PSAVE reverse first: H.264, no audio, GOP 3, no B-frames, crf 16, +faststart. Then wire backgroundSrc to that remastered file. Keep PSAVE: scroll aims on 12 viewports 1:1, play forward at 1.2x, reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift so it keeps going a little then eases to a stop. Silent, no wallpaper loop. Size the aim track to the story beat if the new film is shorter or longer."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile layout so headlines never clip, center nav hides, CTAs stack, and the pin-until-complete experience still feels premium."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Revel light pearl / rose-gold fashion style and PSAVE (pin-until-complete, 12 viewport aim 1:1, play 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift, release only when the picture arrives, page owns the atelier after). Do not seek currentTime across a jump. Do not copy old Vertex seek-scrub or old Revel wheel-gain. Do not build a tall multi-vh scroll track. Do not ask me to write code."',
            ),
        ],
        opaque_id="r7v3l9k2mx4q",
        paid_salt="rv8n3p",
    )


def prism_spec() -> ProductSpec:
    video_file = "prism-faces-v1.mp4"
    video_path = "/assets/videos/prism-faces-v1.mp4"
    poster_file = "prism-faces-v1.webp"
    poster_path = "/assets/posters/prism-faces-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a creative identity studio called PRISM.

BACKGROUND VIDEO (required):
Use this video as the full-screen film under the hero (not a small thumbnail):
{url}
If the buyer has a local files pack, use assets/{video_file} placed at public/assets/videos/{video_file} (or the path already set in source).
Poster still (while loading / reduced motion still): public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent. Dual process: PSAVE (Perfect Scroll Video Engine) plus No Scroller (pin-until-complete). NOT wallpaper-only. NOT GSAP ScrollTrigger seek-scrub. NOT a tall 520vh sticky track.

PSAVE + NO SCROLLER (non-negotiable):
One pinned 100dvh stage in normal document flow. The page does NOT physically scroll during the journey. Do not use position sticky. Do not build a 520vh spacer. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = 12 (locked: 47.63s even faces; two flicks on 3.6 dump dest). PSAVE_RATE = 1.2. PSAVE_FRAME = 1/24. PSAVE_REV_STRIDE = 3. PSAVE_LIVE_MS = 280. PSAVE_COAST_SEC = 0.55. PSAVE_EASE_SEC = 0.55. PSAVE_FLIP_DEADZONE_PX = 32.
Scroll aims a destination 0-1 on the 12 viewport track (raw 1:1, no wheel gain). The film PLAYS to that destination. Never seek currentTime across a jump.
DOWN: muted native play() at playbackRate 1.2. After they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases toward about 0.42. Friction, then a graceful stop. Ignore tiny opposite trackpad ticks under 32px.
UP: first real up-scroll snaps dest onto the picture. Walk currentTime backward exactly one 3-frame step (0.125s) per seek. Wait seeked. Never seek to the stop point.
Glass panels, moment pill (Atelier / Proof / Invite), and the violet bar follow the PICTURE (currentTime / duration), not the wheel target.
Release the pin only when the picture arrives at 0 (up) or 1 (down). Then the dark #atelier band may scroll in.
Opening: kick-seek 0.04 to 0, wait seeked.
prefers-reduced-motion: still composition at playhead 0.42. No PSAVE.
Do NOT install gsap. Do NOT import ScrollTrigger. Do NOT restore a 520vh sticky track or seek-scrub 0.55.

LOOK AND FEEL:
Soft studio mist canvas #E8EAEF. Ink #0E1016. Prism violet #A78BFA, soft violet #C4B5FD, cyan #67E8F9, fuchsia #F0ABFC.
Display: Syne 600-700. Body: DM Sans 400-600, 11-14px.
White type on liquid glass with a soft text-shadow. Gallery installation, not glassmorphism wallpaper, not a left-only scroll essay, not Meridian estate, not Revel pearl fashion, not Vertex mono security.

LIQUID GLASS (mandatory - not cheap single blur):
1) SVG filters once: #glass-distortion (Ice Ripple, seed 92, scale 65) and #glass-distortion-mercury (deeper, scale 120).
2) Host isolation + outer glow. FX layer: frost blur + saturate + distortion. Dual reflection washes. Stabilized content plate.
3) Tiers: silk (chips/metrics), ice (standard), mercury (features/quotes/CTA, deeper refraction).
4) prefers-reduced-transparency: solid elevated dark plates, same layout.

LAYOUT LAW (critical - anti left-only trap):
Do NOT put all copy in a left column only.
Float MANY liquid glass panels of DIFFERENT sizes on BOTH left AND right. Keep center faces sacred.
Kinds: chip, metric, stat, profile, quote, feature, CTA. Stagger tops from about 15% to 80%.
Top: PRISM wordmark + Identity studio, nav Work Approach Atelier Journal, Book intro glass pill.
Progress hairline under nav: violet to fuchsia to cyan, scaleX from PLAYHEAD.
Top-center moment pill: Atelier (0-0.34) / Proof (0.34-0.66) / Invite (0.66-1).
Mobile under 640px: hide the multi-panel field; one mercury strip at the bottom with the active act.
After the picture arrives, a dark #atelier band (#0E1016): Prism Atelier, "Identity for brands / with many faces.", Book a studio intro + View selected work.

DEFAULT PANELS (exact starting board):
Atelier: Now booking; 48 Brands shaped; Identity studio / Your brand has more than one face.; 12 Cities.
Proof: They saw every side of us.; Iris Vale / Creative Director; Spring drop live; Awwwards jury; 94% Client return; What we ship / Systems, not one-offs.
Invite: 9 Years open; Next season / Bring your story into the light.; Quiet confidence.; Start a project / Book a studio intro / Request a slot; NYC remote; 6 wk Avg. kickoff.

MOTION (exact):
PSAVE chase on requestAnimationFrame. No GSAP. No ScrollTrigger.
Panel opacity and 36px side enter from playhead (fade about 0.045).
Progress bar scaleX every tick via ref.
Capture helper: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, productId: "MS-HERO-PRSM01" }}. Root data-prism-drive="psave".

TECHNICAL (you the AI implement this; the human may not be a developer):
Prefer React + TypeScript + Tailwind with one drop-in component (PrismLiquidGlass). If a files pack is available, prefer integrating source/PrismLiquidGlass.tsx over rewriting.
Video attributes: muted, playsInline, preload auto, object-fit cover, aria-hidden. No loop as primary mode.
Fonts: load Syne + DM Sans with display swap. Prefer CSS variables --font-prism-display and --font-prism-sans with system fallbacks.
Do NOT install gsap.
Focus rings violet. Semantic header, nav, section. Safe side insets so glass never kisses the frame edge.
Replacement films MUST be re-encoded GOP 3, no B-frames, crf 16 (ffmpeg -g 3 -keyint_min 3 -bf 0). A long-GOP file stalls mid-reverse.

QUALITY BAR:
It should feel like a Forbes-class identity studio homepage - gallery, inevitable, expensive. One clear system: dual process PSAVE plus No Scroller. Never jump a frame. Never restore 520vh GSAP scrub. Never burn storefront UI into the rebuild. Never collapse to a left-column-only essay.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-PRSM01",
        product="Prism",
        product_line="Liquid Glass Multi-Panel Identity Hero",
        promise=(
            "A creative identity homepage where scroll aims a 48-second multi-face film "
            "and the picture never jumps a frame. Liquid glass on both sides, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: a centered multi-face identity sculpture on soft cool-gray studio mist - "
            "stone, porcelain, and painted spectra morph and fragment, always centered with empty left and right thirds. "
            "47.63 seconds, silent. H.264 GOP 3, no B-frames, 24fps, 1143 frames, 381 I-frames, about 126 MB. "
            "No readable text or UI. Pack also includes poster still prism-faces-v1.webp. "
            "If you have the files zip, client film lives under assets/ as prism-faces-v1.mp4."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 4K continuous sculpture study, 24 to 50 seconds, 24fps, silent. "
            "SUBJECT: centered multi-face identity sculpture that morphs and fragments (stone, porcelain, iridescent paint). "
            "Empty left and right thirds for glass. Soft cool-gray studio mist. "
            "ARC: quiet stone faces, then fracture and color, then whole again. EVEN time, not a late kick. "
            "CAMERA: slow locked-horizon orbit or gentle push. Gallery pace. "
            "LOOK: studio mist, violet and cyan edge light, cream specular, gentle film grain. "
            "FORBIDDEN: logos, UI, captions, watermarks, left-locked single portrait that fills the frame, jump cuts. "
            "TECH: 16:9, 3840x2160 preferred or 1920x1080 min, silent. After export RE-ENCODE GOP 3 no B-frames: "
            "ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart prism-faces-v1.mp4. "
            "Save as public/assets/videos/prism-faces-v1.mp4, poster to public/assets/posters/prism-faces-v1.webp. "
            "Keep PSAVE (12 vh aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor). Never wallpaper-only. Never GSAP scrub."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name PRISM to [YOUR BRAND NAME] everywhere, including the top left wordmark. Update Identity studio to [MY KICKER]."',
            ),
            (
                "Rewrite the glass panels",
                'Ask your AI: "Rewrite all glass panel titles, bodies, metrics, quotes, and the CTA for [MY IDENTITY STUDIO]. Keep three playhead acts Atelier / Proof / Invite and panels on BOTH sides. Do not collapse to a left column."',
            ),
            (
                "Change nav and atelier CTAs",
                'Ask your AI: "Replace nav links Work, Approach, Atelier, Journal with [MY FOUR LINKS]. Rename Book intro, Book a studio intro, View selected work, and Request a slot to [MY LABELS]. Keep glass pills."',
            ),
            (
                "Change metrics",
                'Ask your AI: "Change 48 Brands shaped, 12 Cities, 94% Client return, 9 Years open, and 6 wk Avg. kickoff to [MY METRICS]. Keep them as small silk/ice panels on both sides."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep a studio-mist identity look. Change canvas #E8EAEF, violet #A78BFA, and cyan #67E8F9 to [CANVAS], [VIOLET], [CYAN]. Keep readable white type on darkened glass plates. No neon primary system."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the hero film with [YOUR VIDEO LINK OR FILE NAME]. Re-encode GOP 3, no B-frames, crf 16 first. Update the poster still. Keep PSAVE: 12 viewport aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor, both-side glass, center subject clear. Never wallpaper-only. Never GSAP scrub."',
            ),
            (
                "Change fonts",
                'Ask your AI: "Load my geometric display as --font-prism-display and my UI sans as --font-prism-sans. Keep tight wordmark tracking and readable 13px panel body."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so the multi-panel field hides under 640px, one mercury strip sits at the bottom with the active act, Book intro stays reachable, and the stage stays one pinned viewport. Dual process must still hold: page does not physically scroll during the journey."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep dual process PSAVE plus No Scroller (12 vh aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor), both-side liquid glass, and full film duration. Do not restore gsap, a 520vh sticky track, or a left-column-only layout. Do not reduce to wallpaper-only. Do not ask me to write code."',
            ),
        ],
        opaque_id="p8r3sm7k2n4q",
        paid_salt="pr5m2x",
    )


def folio_spec() -> ProductSpec:
    video_file = "folio-blurry-v1.mp4"
    video_path = "/assets/videos/folio-blurry-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium mid-page website SECTION (not a full-bleed hero) for an enterprise growth brand called FOLIO.

BACKGROUND VIDEO (required - LOOP WALLPAPER under glass, not video scrub):
Use this video as the full-stage motion background:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. It loops with autoPlay muted playsInline. A soft dark veil sits over the film so type stays readable. Do NOT map scroll or progress to video.currentTime. Progress drives the GLASS PANELS only.

LOOK AND FEEL - DARK TRANSLUCENT ENTERPRISE GLASS:
One pinned full-viewport stage (100dvh). Display: Syne (or geometric modern). Body: DM Sans.
White type on dark translucent liquid glass. Soft iridescent rim (cyan / violet / rose). Cool accents.
Serious Linear / Stripe enterprise density. Board-ready copy. Not toy charts, not sparse white cards, not purple mesh.

LIQUID GLASS (mandatory - layered, not single blur dump):
1) Translucent fill rgba(255,255,255,0.08-0.18) + backdrop-filter blur ~26px saturate ~185% so the film shows through.
2) Iridescent edge wash (cyan / violet / rose) - edge catch only, not full-card white wash.
3) Specular top highlight + hairline porcelain rim + soft outer glow.
4) prefers-reduced-transparency: solid elevated dark slate cards, same layout.

MOTION LAW (PIN-UNTIL-COMPLETE - mandatory product law - do NOT build a tall multi-vh page scroll track):
One 100dvh stage. Wheel / trackpad / touch / arrow keys advance VIRTUAL journey progress from 0 to 1.
Virtual journey effort about sheets x 1.55 viewports of wheel distance (NOT document height, NOT a long page scrollbar).
Framer Motion: useMotionValue for journeyProgress + useTransform for sheet maps. Do NOT use document useScroll on a tall track.
Five large glass sheets stacked (hidden deck - only the active sheet is visible).
Each sheet: local progress 0 to 1 maps rotateX from about +72 degrees (edge from below) through 0 (face-on, readable) to -72 degrees (edge above).
Slight overlap between sheets (~18%) so handoffs feel continuous. Long face-on plateau. Soft opacity ramps. Mild Y travel (~36px). Last sheet holds face longer then exits.
At progress 0 + user scrolling up, or progress 1 + user scrolling down, RELEASE so the host page can continue (client embed).
PIN FREEING (mandatory): after release at g = 1 plus down, the PAGE owns wheel / touch / keys until the stage docks (getBoundingClientRect().top >= -2). Scrolling up in the next section must move the page, not rewind the cards. Pointer on the next sibling never drives the cards.
Progress bar + step dots under the deck. Capture API: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-FOLI01" }}. Root data-folio-drive="pin".
prefers-reduced-motion: static stacked glass cards, gradient fallback, no video.

CONTENT (five dense decision sheets - board-ready, not marketing fluff):
01 Mandate - Align the enterprise on a single growth thesis. Metrics (ARR, TAM, markets, sponsors) + north star / constraint / non-goal rows + chips.
02 Insight - Buyers who convert. Split columns of ICP stats + evidence bullet list.
03 System - Operating system rows (narrative spine, offer ladder, proof library, channel rules, handoff SLA) + chips.
04 Execution - 90-day phases metrics + workstream rows + kill criteria.
05 Outcomes - Board KPIs (pipeline, CAC payback, win rate, NRR) + executive quote + chips.

HEADER above deck:
Kicker: Enterprise growth system
Heading: Five decisions that turn strategy into revenue.

TECHNICAL:
React + TypeScript. Framer Motion useMotionValue + useTransform mandatory for pin journey (NOT useScroll on a tall track).
Video: muted, loop, autoPlay, playsInline, object-fit cover.
Single default-export component FolioPivotSection. Configurable sheets, kicker, heading, vhPerSheet (virtual effort), backgroundSrc.
Prefer pack source/FolioPivotSection.tsx when the buyer has the files pack.
No forced page intro or outro inside the component - section only.

QUALITY BAR:
It should feel like a board presentation in liquid glass over motion film - dense, serious, premium. Not a white empty card on a white page. Not Prism multi-panel hero. Not Meridian coastal estate. Not a long traditional scrolling page.
""".strip()
    return ProductSpec(
        product_id="MS-SEC-FOLI01",
        product="Folio",
        product_line="Pin-Until-Complete Liquid Glass Decision Section",
        promise=(
            "A mid-page enterprise section where five dense liquid-glass decision panels "
            "pivot on a pin-until-complete journey over motion film - mandate through outcomes, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: abstract blurred colorful motion vision loop - soft bokeh "
            "fields of light, no people, no UI, no logos. Silent seamless loop for glass refraction."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K silent seamless loop, 10 to 20 seconds, 24fps. Abstract soft-focus "
            "blurry vision motion background - organic color fields, gentle light shifts, no people, "
            "no text, no UI, no logos. Premium ambient atmosphere for liquid glass UI over film."
        ),
        customize=[
            (
                "Change the kicker and heading",
                'Ask your AI: "Change the kicker Enterprise growth system to [YOUR KICKER] and the heading to [YOUR HEADING]."',
            ),
            (
                "Rewrite the five sheets",
                'Ask your AI: "Rewrite all five decision sheets for [YOUR BUSINESS]. Keep dense metrics, rows, and chips. Keep five sheets and pin-until-complete virtual progress."',
            ),
            (
                "Change brand language",
                'Ask your AI: "Replace enterprise growth language with [YOUR INDUSTRY] language. Keep board-ready density."',
            ),
            (
                "Change glass color temperature",
                'Ask your AI: "Keep dark translucent glass, but shift iridescent edges to [YOUR ACCENT HEXES]. Keep white type readable."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE]. Keep it muted, looping, under the glass. Do not scroll-scrub the video."',
            ),
            (
                "Add or remove a sheet",
                'Ask your AI: "Change to [N] sheets with the same pivot motion and dense content blocks."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile so metrics wrap to two columns, content stays readable, and the pivot still feels premium."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Folio dark liquid glass enterprise style. Do not ask me to write code."',
            ),
        ],
        opaque_id="f0l1o9x4k7m2",
        paid_salt="fl8n3q",
    )


def mirage_spec() -> ProductSpec:
    # Client HD only. Never point the buyer PDF at a storefront *-preview* clip.
    video_file = "mirage-desert-v1.mp4"
    video_path = "/assets/videos/mirage-desert-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport advertising-agency website HERO for a brand called MIRAGE.

Prefer the files in the pack. Integrate source/MirageAgencyHero.tsx. Copy assets/mirage-desert-v1.mp4 to public/assets/videos/mirage-desert-v1.mp4.

BACKGROUND VIDEO (required - FREE-PLAYING LOOP, not scroll scrub, not PSAVE):
Use this video as the full-screen background film:
{url}
If the pack has a local file named {video_file}, use that path instead of downloading.
The video is silent. It plays freely with autoPlay muted loop playsInline. Subject (desert figure) holds on the RIGHT (object-position about 72% center). Soft left scrim so type stays readable. Do NOT map scroll to video.currentTime. Do NOT reverse the film. Scroll drives the FIVE LEFT-RAIL GLASS CARDS only.

NO SCROLLER (pin-until-complete) (non-negotiable):
One pinned 100dvh stage #mirage-hero in normal document flow. The page does NOT physically scroll during the viewing. Do not use position sticky. Do not build a 5 x 1.55 vh document spacer. Do not overflow-hidden the host page.
VIRTUAL_EARN = max(2.4, sheets x 1.55) viewports (7.75 at five sheets). Wheel / trackpad / touch / keys add deltaPx / (earn * window.innerHeight) to progress g (0 to 1). Cards follow g 1:1 (old useScroll feel). At g 0 plus up, or g 1 plus down, RELEASE so the host page can continue.
PIN FREEING (mandatory): after release at g = 1 plus down, the PAGE owns wheel / touch / keys until the stage docks (getBoundingClientRect().top >= -2). Scrolling up in the next section must move the page, not rewind the cards. Pointer on the next sibling never drives the cards. If stage.top >= -2, page-owns clears and the pin may take the wheel again.
NOT GSAP ScrollTrigger pin. NOT Lenis. NOT PSAVE. NOT Framer useScroll on a tall spacer. Do NOT install gsap. Do NOT install lenis.

LOOK AND FEEL - MORPHIC DARK LIQUID GLASS (M.A.C. / Triada stack):
Dark cinematic desert film. Minimal TEXT-ONLY top nav (no pill bar, no frosted toolbar). Brand MIRAGE left. Links: Work, Method, Clients, Culture, Contact.
Left rail: kicker, two-line large headline, stacked morphic glass cards, centered progress footer.
Right: pure film / subject space (keep face clear).
Display: geometric modern (Syne or similar). Body: clean sans (DM Sans / system).
Accents: soft gold #FDE68A, cool cyan #7DD3FC on near-white type.
Never white frosted glass. Never opaque black cards. Never Motionsites pill dock.

MORPHIC LIQUID GLASS (mandatory - three-layer stack, content NEVER on the blur node):
Shell (radius ~22px, rim, depth shadow)
  -> glass layers (absolute, pointer-events none)
       -> fill: background rgba(28, 30, 42, 0.38) + backdrop-filter blur(36px) saturate(190%)
       -> specular: top-edge catch only (inset highlight + diagonal white gradient fading out, NOT a full white wash)
  -> body (relative, z-index above glass): all readable content
Nested chips: light rgba white 0.08 fill + 0.5px border (glass-on-glass).
Do NOT kill glass with prefers-reduced-transparency on this product - Windows transparency-off was making solid dark slabs. Keep morphic fill. Reduced-motion is separate (static cards).

CARD MOTION (virtual progress, same rotateX maps as the original):
Five glass sheets stacked in a left deck (absolute stack - only active sheet face-on).
Each sheet local progress 0 to 1 maps rotateX from about +64 degrees through 0 (face-on) to -64 degrees.
Sheet 0 starts near face-on (from about 0.38) so the hero never opens empty.
Mild Y travel (~26px), scale ~0.975 to 1, content opacity ramp.
Progress bar + dots + active label + "Scroll to continue" centered under the cards.
prefers-reduced-motion: static stacked cards, gradient fallback, no video chase.
Capture helper: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-MIRA01" }}. Root data-mirage-drive="pin". After release data-mirage-owns="page". While the pin owns data-mirage-owns="pin".

CONTENT:
Kicker: Advertising · Brand · Growth
Headline two lines exactly:
  Creative that
  survives the heat.
Five sheets:
01 Brand thesis - Find the idea that outlasts the feed. Metrics (40+, 3.2y, 94) + chips Positioning / Narrative / Identity system.
02 Creative systems - Campaigns built like products, not one-offs. Format lattice / craft bar / versioning rows + list.
03 Media craft - Put every dollar where attention is honest. Metrics waste/reach/payback + chips.
04 Always-on - A studio cadence, not a campaign panic. Sprint rows + client quote.
05 Growth proof - Outcomes the board can audit. Four metrics + chips Measurement / Incrementality / Board ready.

TECHNICAL:
React + TypeScript. Framer Motion useMotionValue / useTransform for card pivot. Virtual progress listeners (wheel non-passive, touch, keys). No GSAP. No ScrollTrigger. No Lenis. No PSAVE.
Video: muted, loop, autoPlay, playsInline, object-fit cover, object-position 72% center.
Single default-export component MirageAgencyHero. Props: sheets, brand, tagline, backgroundSrc, vhPerSheet.
Optional uniform zoom ~1.2 on the left rail composition for premium scale (keep proportions).

CUSTOMIZATION LAW:
Every visible string, every sheet, and the film itself must be easy to replace. After the default builds, the buyer will tell their AI to restage brand, headline, cards, accents, and film until the hero feels made for their brand alone.

QUALITY BAR:
Ultra-premium ad-agency hero. Morphic dark glass over desert film. Free-playing subject on the right. Scroll only owns the cards. After the last card the page owns until dock. Not Folio mid-page section. Not Prism both-side constellation. Not white frosted SaaS. Never restore a tall sticky track. Never add PSAVE.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-MIRA01",
        product="Mirage",
        product_line="Agency Desert Scroll Glass Hero",
        promise=(
            "An advertising-agency homepage hero where morphic liquid-glass story cards "
            "pivot on scroll over free-playing desert film - ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: cinematic desert survivor figure with cybernetic blue "
            "markings, dunes and heat haze, subject held on the right. Silent loop. "
            "It free-plays under the glass. Scroll aims the cards only. The film does not rewind."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K silent seamless loop, 12 to 20 seconds, 24fps. Desert heat, dunes, "
            "hooded figure with subtle futuristic face markings, cool cyan accents, warm sand. "
            "Subject on the right third. No logos, no UI text, no watermark. Premium ad-film atmosphere."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name MIRAGE to [YOUR BRAND] everywhere, including the top left and any aria-label."',
            ),
            (
                "Change the headline",
                'Ask your AI: "Change the two-line headline Creative that / survives the heat. to [LINE 1] / [LINE 2]. Keep exactly two lines. Keep nowrap on each line."',
            ),
            (
                "Rewrite the five cards",
                'Ask your AI: "Rewrite all five glass cards for [YOUR AGENCY / BRAND]. Keep dense metrics, rows, chips, and the scroll pivot. Keep No Scroller and pin freeing. Do not add PSAVE."',
            ),
            (
                "Change accents",
                'Ask your AI: "Keep dark morphic glass, but shift gold and cyan accents to [HEX A] and [HEX B]. Keep type readable."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE]. Keep it muted, looping, free-playing. Do not scroll-scrub the video. Keep the subject on the right if possible."',
            ),
            (
                "Fix pin freeing",
                'Ask your AI: "After the last card, scrolling down must release the pin. Then the PAGE owns the wheel until the hero docks at the top of the viewport again (stage.top >= 0). Scrolling up in the next section must move the page, not rewind the cards. Pointer on the next sibling must never drive the cards. Do not restore a tall sticky track. Do not add PSAVE."',
            ),
            (
                "Change nav links",
                'Ask your AI: "Replace Work Method Clients Culture Contact with [YOUR LINKS]. Keep minimal text-only nav."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile so the headline stays two lines when possible, cards stay readable, and the subject film still feels premium. Keep No Scroller and pin freeing."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Mirage as a morphic dark liquid-glass agency hero over free-playing desert film. Keep No Scroller (pin-until-complete) and pin freeing (page owns until dock). Do not restore a tall multi-vh sticky track. Do not add PSAVE. Do not scrub the film. Do not ask me to write code."',
            ),
        ],
        opaque_id="m1r4ge8k2n9x",
        paid_salt="mg7k3p",
    )


def sable_spec() -> ProductSpec:
    video_file = "sable-winter-v1.mp4"
    video_path = "/assets/videos/sable-winter-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport luxury fashion holiday website HERO for a private house brand called SABLE (wordmark: SABLE. with a champagne-gold period).

BACKGROUND VIDEO (required - FREE-PLAYING FULL FILM, never scroll scrub, never cut):
Use this video as the full-screen background film:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. It plays the COMPLETE walk uncut with autoPlay muted loop playsInline.
object-fit cover, object-position center about 42% vertical so the walking figure stays framed.
Do NOT map scroll to video.currentTime. Do NOT trim the film. The full duration is the product.
Soft charcoal edge veils only - keep the center subject clear. Soft vignette. No heavy fog over her face.

LOOK AND FEEL - MINIMAL PRIVATE-HOUSE LUXURY:
Dark ink stage #0C0B0A under the film edges. Ivory type #F7F3EC. Champagne gold #C4A574.
Display: Cormorant Garamond (or fine transitional serif). Utility: Inter.
Sparse. Quiet. Expensive. Holiday without kitsch. No pill nav. No glass card stacks. No mid-frame marketing essays.
Think The Row / Toteme film discipline. Forbes top-tier restraint.

LAYOUT (sparse by law):
Top nav: brand SABLE. left (tracking wide, gold period). Center links: Collection, Look, House, Reserve. Right: Book private view (underline gold).
Top-left intro only: season "Holiday 2026" in gold uppercase micro type. House line "Maison Sable · Private collection" in soft serif.
CENTER: intentionally empty - the walk is the product.
Bottom: label "Maison Sable" + film time readout. Hairline gold progress bar driven by video.currentTime / duration (true film clock, not scroll).
Line under bar: "The holiday season is a time for love and luxury."
Footer row: "Holiday · Private collection" + ivory CTA button "Discover the collection →".
Short scroll pin (~180vh) for atmosphere only - optional 8px intro Y drift. Never seek the film.

FORBIDDEN:
Scroll-scrubbing the video. Cutting the video. Mid-frame chapter titles or body essays over the subject.
Word "Atelier" as UI filler. Purple mesh, neon, emoji, Motionsites pill docks, dense metric cards on the film.

TECHNICAL:
React + TypeScript. Framer Motion optional for intro drift and reduced-motion.
Video: muted, loop, autoPlay, playsInline, full uncut duration.
Single default-export component SableHolidayHero. Props: brand, backgroundSrc.
prefers-reduced-motion: static fallback, no required autoplay.

QUALITY BAR:
It should feel like a private holiday film from a serious fashion house - quiet, complete, uncut. The UI frames; the walk sells.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-SABL01",
        product="Sable",
        product_line="Holiday Luxury Fashion Walk Hero",
        promise=(
            "A private-house holiday homepage where a full uncut winter walk film "
            "is the product - sparse editorial type, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: a complete winter village walk of a fashion figure "
            "in a refined grey ribbed look, soft snow, holiday lights, uncut continuous motion. "
            "About 17 seconds, silent, loops."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K silent seamless loop, about 17 seconds, 24fps. Fashion figure walking "
            "a snowy European holiday village street, refined monochrome knit look, soft snow, "
            "warm window light, elegant and quiet. No logos, no UI text, no watermark. Full continuous walk."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name SABLE to [YOUR BRAND] everywhere, including the top left wordmark and gold period."',
            ),
            (
                "Change the season and house line",
                'Ask your AI: "Change Holiday 2026 to [YOUR SEASON] and Maison Sable · Private collection to [YOUR HOUSE LINE]. Keep sparse type."',
            ),
            (
                "Change the holiday line",
                'Ask your AI: "Change The holiday season is a time for love and luxury. to [YOUR LINE]. Keep it one quiet sentence."',
            ),
            (
                "Change the CTA",
                'Ask your AI: "Rename Discover the collection to [YOUR CTA] and Book private view to [YOUR NAV CTA]. Keep ivory luxury buttons."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE]. Keep it muted, looping, free-playing, FULL uncut. Do not scroll-scrub."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep private-house luxury, but shift champagne gold to [HEX] and keep ivory type readable on the film."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile so the figure stays centered, nav stays clean, and the CTA is easy to tap. Keep the film full and uncut."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Sable sparse holiday luxury. Do not ask me to write code."',
            ),
        ],
        opaque_id="s4b1e9k7m2x3",
        paid_salt="sb8n4p",
    )


def axiom_spec() -> ProductSpec:
    video_file = "axiom-upside-v1.mp4"
    video_path = "/assets/videos/axiom-upside-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport institutional fintech website HERO for a markets platform called AXIOM.

BACKGROUND VIDEO (required - FREE-PLAYING FULL FILM, never scroll scrub, never cut):
Use this video as the full-screen background film:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. It plays the COMPLETE inverted NYC golden-hour street run uncut with autoPlay muted loop playsInline.
object-fit cover, object-position center. Scale about 1.02.
Do NOT map scroll to video.currentTime. Do NOT trim the film. The full duration is the product.
Soft deep-ink edge veils - keep the inverted street readable. Soft vignette.

LOOK AND FEEL - INSTITUTIONAL PRIVATE-BANK FINTECH:
Stage ink #07090F under the film edges. Cool ivory type #EEF2F7 / #F4F7FB. Champagne gold #D4AF6A. Cream italic accent #F0E6D0.
Display: Instrument Serif (or fine transitional serif). Utility: Inter.
Quiet authority. Order when markets invert. No neon crypto. No purple mesh SaaS. No Motionsites pill docks.

SIGNATURE (mandatory):
A fixed level gold hairline horizon at about 48% of the viewport height. It NEVER tilts with the inverted city.
Left on the horizon: small badge "True north" with a gold live dot.

LAYOUT:
Top nav: brand AXIOM left (wide tracking). Center links: Platform, Markets, Research, Access. Right: Request access (gold underline).
Copy lower-left: kicker "Institutional markets · New York" in gold uppercase micro type.
H1 three stacked lines: When markets / turn upside down, / we still know up. (third line italic cream)
Lead EXACTLY two lines (about 56ch so it holds):
  Line 1: Axiom turns inverted noise into a single decision path.
  Line 2: Chaos stays in the frame. Clarity stays in the system.
Three proof chips: 12µs Median decision path · 99.99% Matching uptime · 0 noise Signal policy.
Bottom: label "Axiom" + film time readout. Hairline gold progress bar driven by video.currentTime / duration.
Line under bar: "Wise, precise and tactical positions maintain the calm."
Footer row: "Order in inverted markets" + ivory CTA "Read the thesis →".
Short scroll pin (~175vh) for atmosphere only. Never seek the film.

FORBIDDEN:
Scroll-scrubbing the video. Cutting the video. Scaffold notes like "Full market film, uncut" in the UI.
Purple mesh, neon crypto, emoji, Motionsites pill docks, mid-frame multi-paragraph essays.

TECHNICAL:
React + TypeScript. Framer Motion optional for copy drift and reduced-motion.
Video: muted, loop, autoPlay, playsInline, full uncut duration.
Single default-export component AxiomFintechHero. Props: brand, backgroundSrc.
prefers-reduced-motion: static fallback, no required autoplay.

QUALITY BAR:
Serious institutional markets product film - calm, complete, uncut. True north while the world inverts.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-AXIO01",
        product="Axiom",
        product_line="Fintech Inverted Markets Hero",
        promise=(
            "An institutional fintech homepage where a full uncut inverted NYC film "
            "meets a fixed true-north horizon - order when markets flip, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: a continuous inverted New York City golden-hour street run, "
            "cars and buildings flipped, sun low on the horizon, uncut motion. "
            "About 10 seconds, silent, loops."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K silent seamless loop, about 10 seconds, 24fps. Inverted New York City "
            "street at golden hour, cars and architecture upside down, sun on horizon, "
            "serious and cinematic. No logos, no UI text, no watermark. Full continuous run."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name AXIOM to [YOUR BRAND] everywhere, including the top left wordmark and footer label."',
            ),
            (
                "Change the headline",
                'Ask your AI: "Change When markets / turn upside down, / we still know up. to [YOUR THREE LINES]. Keep the third line italic cream."',
            ),
            (
                "Change the lead",
                'Ask your AI: "Change the two-line lead to [LINE 1] then [LINE 2]. Keep line 1 as one full sentence and both following sentences on line 2."',
            ),
            (
                "Change the proofs",
                'Ask your AI: "Replace the three proof chips with [VALUE + LABEL] x3. Keep glass + gold rim."',
            ),
            (
                "Change the calm line",
                'Ask your AI: "Change Wise, precise and tactical positions maintain the calm. to [YOUR LINE]. Keep it one quiet sentence."',
            ),
            (
                "Change the CTA",
                'Ask your AI: "Rename Read the thesis to [YOUR CTA] and Request access to [YOUR NAV CTA]. Keep ivory luxury buttons."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE]. Keep it muted, looping, free-playing, FULL uncut. Do not scroll-scrub. Keep the true-north horizon level."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Axiom institutional true-north fintech. Do not ask me to write code."',
            ),
        ],
        opaque_id="a9x10m7k3n2p",
        paid_salt="ax8n4q",
    )


def nexus_spec() -> ProductSpec:
    video_file = "nexus-neural-v1.mp4"
    video_path = "/assets/videos/nexus-neural-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport enterprise AI website HERO for an intelligence platform called NEXUS AI.

BACKGROUND VIDEO (required - FREE-PLAYING FULL FILM, never scroll scrub, never cut):
Use this video as the full-screen background film:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. It plays the COMPLETE neural lattice run uncut with autoPlay muted loop playsInline.
object-fit cover, object-position about 58% center. Scale about 1.015.
Do NOT map scroll to video.currentTime. Do NOT trim the film. The full duration is the product.
Soft deep-ink edge veils - keep the lattice readable. Soft vignette.

LOOK AND FEEL - ENTERPRISE INTELLIGENCE (not liquid-glass kitsch):
Stage ink #07080F under the film edges. Cool type #E8F0FF / #F2F6FF. Cyan #00D4FF. Magenta #FF006E.
Display: Space Grotesk (or similar geometric sans). Utility: Inter.
Quiet institutional density. Anthropic/OpenAI launch restraint. No purple mesh SaaS. No Motionsites pill docks. No Three.js particle spam as the signature.

SIGNATURE A - DECISION PATH RAIL (desktop, left):
Label "Path". Vertical line cyan to magenta. Three nodes:
  01 Sense - Signals enter clean
  02 Route - Policy owns the path
  03 Compound - Outcomes accumulate
A small light pulse travels down the line ON TOP of the nodes (centered). Between nodes the ball is small; on each hit it grows and the node fills/brightens. Last node magenta-tinted.

SIGNATURE B - LETTER-MELT HEADLINE:
H1 line 1: Intelligence.
H1 line 2: That [rotating word].
Prefix "That " is static. The period is PART of each dynamic word (compounds. decides. scales. routes. multiplies.).
Split the dynamic word into individual letter spans. Each letter fades opacity and Gaussian-blurs independently with RANDOM delays (not left-to-right wave, not whole-word at once).
STRICT sequence: outgoing letters must fully finish melting out before the next word starts melting in. Hold fully sharp about 3 seconds. Slow and elegant.

LAYOUT:
Top nav: brand NEXUS + small AI, center links Platform Models Safety Research, right Docs + primary CTA "Begin with Nexus".
Kicker: NX / 01 + Intelligence layer for production systems.
Lead: One stack for models, agents, and evaluation - built for teams that put AI on the critical path, not the slide deck.
Secondary link: Read the architecture →
Bottom system tape: LIVE pulse + GRAPH LIVE · NODES 14.2k · ROUTES 48 · EVAL CONT. · REGION GLOBAL
Optional wide desktop: floating "Active graph · Inference lattice · multi-region" plate in the film field.

FORBIDDEN:
Scroll-scrubbing the video. Cutting the video. Scaffold notes in the UI.
Purple mesh, emoji, rainbow gradient headlines, liquid-glass card stacks as the hero signature, Motionsites pill docks.

TECHNICAL:
React + TypeScript. Framer Motion for entrance. GSAP for per-letter melt (independent random delays).
Video: muted, loop, autoPlay, playsInline, full uncut duration.
Single default-export component NexusAiHero. Props: brand, backgroundSrc, posterSrc.
prefers-reduced-motion: static fallback, first cycle word only, no required autoplay.

QUALITY BAR:
Serious enterprise AI product film - calm, complete, uncut. Path pulse + letter melt are the signatures.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-NEXU01",
        product="Nexus",
        product_line="Enterprise Intelligence Layer Hero",
        promise=(
            "An enterprise AI homepage where a full uncut neural lattice film "
            "meets a Sense→Route→Compound path rail and a sequential letter-melt headline - free, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: a continuous dark neural lattice / constellation field, "
            "cyan and magenta light along node connections, deep void, uncut motion. "
            "About 59 seconds, silent, loops."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K silent seamless loop, about 60 seconds, 24fps. Dark neural lattice "
            "network in void space, cyan and magenta glowing connections, slow camera drift, "
            "serious and cinematic. No logos, no UI text, no watermark. Full continuous run."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name NEXUS to [YOUR BRAND] everywhere, including the top left wordmark and AI label."',
            ),
            (
                "Change the headline",
                'Ask your AI: "Change Intelligence. to [YOUR LINE 1]. Keep That [verb]. as line 2 with the letter-melt cycle."',
            ),
            (
                "Change the rotating words",
                'Ask your AI: "Replace compounds decides scales routes multiplies with [FIVE WORDS]. Keep the period on each word and sequential random letter melt."',
            ),
            (
                "Change the path nodes",
                'Ask your AI: "Rename Sense Route Compound to [THREE STEPS] and update the short notes. Keep the travel pulse and node fill on hit."',
            ),
            (
                "Change the lead",
                'Ask your AI: "Change the lead paragraph to [YOUR COPY]. Keep it two sentences, calm enterprise voice."',
            ),
            (
                "Change the CTAs",
                'Ask your AI: "Rename Begin with Nexus to [PRIMARY] and Read the architecture to [SECONDARY]."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE]. Keep it muted, looping, free-playing, FULL uncut. Do not scroll-scrub. Keep the path rail and letter melt."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Nexus enterprise neural intelligence chrome. Do not ask me to write code."',
            ),
        ],
        opaque_id="n3xu9k2m7p4w",
        paid_salt=None,
    )


def elyse_spec() -> ProductSpec:
    video_file = "elyse-nature-v1.mp4"
    video_path = "/assets/videos/elyse-nature-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium scroll-as-narrative website HERO for a private luxury wellness retreat house called ELYSE.

BACKGROUND VIDEO (required - SCROLL SCRUB, not simple autoplay loop):
Use this video as the full-screen hero film:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. Do not autoplay as a looping wallpaper. VIRTUAL PROGRESS controls which moment of the video is shown (scroll scrub). When the visitor scrolls the journey forward, the video advances. When they scroll back, it goes backward.
object-fit cover, object-position center about 48% vertical so the dual tree faces and sun stay framed.

LOOK AND FEEL - PRIVATE LUXURY WELLNESS (not spa SaaS):
Stage ink #0B0907. Cream type #F4EDE3 / #F7F1E8. Soft gold #C9A46A and warm highlight #F0D9A8.
Display: Cormorant Garamond (or fine editorial serif). Utility: Inter light.
Quiet Aman / Six Senses restraint. Invitation only. Never cream Aether wellness app. Never climate Terra green. Never pearl Revel fashion. Never Motionsites pill docks. Never purple mesh.

SIGNATURE:
Optional soft gold filament at about 46% height where the two nature faces meet - subtle, never competing with type.

LAYOUT AND MOTION LAW (PIN-UNTIL-COMPLETE + PSAVE / Perfect Scroll Video Engine - mandatory - do NOT build a tall multi-vh page scroll track):
One pinned full-viewport stage (100dvh). Wheel / trackpad / touch / arrow keys AIM a destination on a 3.6-viewport track (same distance as the old 460vh track). Raw 1:1. No wheel gain. No swipe cap. No GSAP lag.
PSAVE: Down-scroll PLAYS the film forward at 1.2x (muted play() at playbackRate 1.2). Up-scroll PLAYS it backward at the same 1.2x by walking the live video exactly one 3-frame step (0.125s at 24fps) per seek. NEVER jump a frame. NEVER assign currentTime to the destination. A tiny click creeps a few frames. A crazy scroll may aim halfway through the movie - the film still plays normally to that moment. THE LIFT (by design): leftover dest keeps the film going a little after they stop - friction, then a graceful stop, never a tire screech. Ignore tiny opposite trackpad ticks so dest is not snapped dead. First real opposite gesture cancels a leftover destination and starts from the picture. Reverse starts WHILE they are still scrolling (220ms live window), then continues the same 3-frame steps after they stop. Wait for seeked before the next reverse step. No canvas buffer. No loop. If a replacement film is long or eventful (slow then a kick) and leftover dest dies, dest must sit at least 0.55s of film ahead after last intent and forward rate eases over that last half-second. Size a replacement aim track to the story beat, not another SKU's number.
Copy, chapters, and the gold bar follow the PICTURE, not the wheel destination.
Release ONLY when the picture has arrived at 0 (scroll up) or 1 (scroll down). Test live currentTime as well as the playhead (settle can stop one frame short). Do not unpin because the destination already hit an end. After release the PAGE owns scroll until the stage docks at the top. Pointer on the membership band must never drive the film.
Optional capture helper: window.__msScrollNarrative.setProgress(0..1) may snap. getProgress is the playhead. getTarget is the destination.
Top nav: brand ELYSE + Private Wellness Retreats, center links Retreats Places Practice Membership, right "Request invitation".
Thin gold progress bar under the nav driven by the playhead.
Four chapters swap as the playhead advances (lower-left copy, right index rail 01-04):
1) The call - "The earth is / still waiting." Beyond the noise, places where light moves slower.
2) The land - "Sanctuaries, / not destinations." Remote valleys, quiet coasts, forests that remember.
3) The practice - "Days shaped / by intention." Guided rest, bodywork, table and trail.
4) The return - "Leave whole. / Return clear." with CTAs Begin a private inquiry and View the calendar.
Closing membership band AFTER the pin releases: "For those who measure wealth in stillness." Stats 12 sanctuaries / 6 continents / 8 guests max. Request an introduction.

HOW TO BUILD IT (mandatory algorithm - do not invent another method):
1. One 100dvh stage in normal document flow. The membership band is the NEXT sibling. Do not overflow-hidden the page.
2. Hold a DESTINATION 0 to 1 and a PLAYHEAD that is whatever the video is showing. Do not set the mid-film poster (elyse-nature-v1.webp, heads down) as the HTML video poster. Kick-seek 0.04 then 0, wait seeked, fade the film in so first paint is heads up. Reduced motion may use that poster as a stage fallback and seek to about 0.42.
3. Gestures add deltaPx / (3.6 * window height) to the DESTINATION only.
4. Wheel and trackpad: ignore ctrl/meta zoom. Normalize deltaMode. Map raw delta 1:1 onto the 3.6 track. Apply once per animation frame. preventDefault while the pin owns the gesture.
5. Touch is also destination-only on the 3.6 track. Do not trap Space on a focused button.
6. PSAVE: each animation frame, walk the picture toward destination * duration at 1.2x, never more than 1/24 second of film in one forward fallback tick. Down: play() at playbackRate 1.2. After they lift, leftover dest keeps play going a little, then it arrives and pauses. Ignore tiny opposite ticks. Up: first real up-scroll snaps destination to the picture, then walk currentTime backward exactly 0.125s per seek on the live video. No low-res buffer. No loop.
7. If the PICTURE is at 0 and they scroll up, or the PICTURE is at 1 and they scroll down, RELEASE so the membership band can scroll into view. If the destination is already at an end but the picture is still walking, keep the pin. After release, page-owns until the stage docks. Ignore wheel events whose target is the band.
8. Reduced motion: still mid-film frame around 0.42. No chase.
9. FILM ENCODE: the shipped elyse-nature-v1.mp4 is H.264 GOP 3, no B-frames, 81 I-frames. If you replace the video, re-encode first: ffmpeg -an -c:v libx264 -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart. A one-I-frame file will stall mid-reverse then jump near the start. Do not extract PNG frames.
If you are about to write ScrollTrigger.create, position sticky, a 460vh spacer, or video.currentTime = target * duration on a large jump, stop and use this algorithm instead.
Do not copy old Vertex or old Revel seek-scrub. Live Vertex is also PSAVE (3.6 + 0.55 coast). Elyse gold is PSAVE at 1.2x forward and reverse (every 3rd frame) on a 3.6 viewport aim track.
PACK DELIVERY: This product ships as a buyer manual PDF plus the sold prompt. There is no files zip and no START-HERE folder. Rebuild from this brief and the video URL (or local elyse-nature-v1.mp4).

TECHNICAL:
Use a modern web stack that works in the tool I am using. Prefer one main page component (or ElyseScrollNarrative.tsx). Scroll aims. The film plays to that moment. Video attributes: muted, playsInline, preload ready, no wallpaper loop, no HTML mid-film poster. Support reduced-motion: show a still mid-film frame (~0.42) and no chase. Keep cream type readable with earth veils - never crush the luminous center sun/faces. NEVER use a tall sticky multi-vh document track as the method. NEVER seek currentTime across a jump. NEVER drive the film from the membership band after release.
Single default-export component ElyseScrollNarrative. Props: brand, backgroundSrc, posterSrc.

QUALITY BAR:
It should feel like a private wellness house for people who measure wealth in stillness. One clear system: PSAVE (Perfect Scroll Video Engine) on pin-until-complete. Scroll aims. The sanctuary film plays forward at 1.2x and reverse every 3rd frame, never jumps a frame, and on lift leftover dest keeps going a little then friction-stops. After the last frame the page owns the runway. Not a hotel chain. Not a spa SaaS landing page.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ELYS01",
        product="Elyse",
        product_line="Pin-Until-Complete Wellness Scroll Hero",
        promise=(
            "A private wellness retreat homepage where scroll advances a golden-hour "
            "sanctuary film - four chapters from call to return, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: two monumental tree faces (warm and cool) meeting over a "
            "golden-hour valley river landscape - dual nature forms, luminous sun between them. "
            "About 10 seconds, silent, 24fps, already remastered for PSAVE reverse "
            "(H.264 GOP 3, no B-frames). If you replace it, re-encode the same way before wiring."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K silent narrative, about 10 seconds, 24fps. Two ancient trees formed as "
            "human faces facing each other over a river valley at golden hour, warm and cool duality, "
            "sun between them. Mythic, serene, no logos, no UI text, no watermark."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name ELYSE to [YOUR BRAND] everywhere, including the top left wordmark and membership copy."',
            ),
            (
                "Change chapter headlines",
                'Ask your AI: "Rewrite the four chapter titles to [YOUR FOUR PAIRS OF LINES]. Keep Cormorant serif and cream type on the film."',
            ),
            (
                "Change chapter bodies",
                'Ask your AI: "Rewrite each chapter body paragraph to [YOUR COPY]. Keep short editorial lines under 180 characters."',
            ),
            (
                "Change the CTA",
                'Ask your AI: "Rename Begin a private inquiry to [PRIMARY] and View the calendar to [SECONDARY]. Keep cream primary and ghost secondary."',
            ),
            (
                "Change membership band",
                'Ask your AI: "Change For those who measure wealth in stillness. to [YOUR LINE] and update the three stats."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the sanctuary film with [YOUR VIDEO LINK OR FILE]. Re-encode it for PSAVE reverse first: H.264, no audio, GOP 3, no B-frames, crf 16, +faststart. Then wire backgroundSrc to that remastered file. Keep PSAVE: scroll aims on 3.6 viewports 1:1, play forward at 1.2x, reverse every 3rd frame on the live video, leftover dest on lift so the film keeps going a little then friction-stops, never jump a frame. If the new film is long or eventful, size the aim track to the story beat and add a 0.55s dest floor if the stop becomes a screech. Do not set a mid-film still as the HTML poster. Silent, no wallpaper loop."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile so nav stays clean, chapters remain readable, and the pin-until-complete experience still feels premium. Keep luxury restraint."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Elyse earth-ink / cream / gold wellness style and PSAVE (pin-until-complete, 3.6 viewport aim 1:1, play 1.2x forward, reverse every 3rd frame, leftover dest on lift, release only when the picture arrives, page owns the runway after). Do not seek currentTime across a jump. Do not copy old Vertex seek-scrub or old Revel wheel-gain. Do not build a tall multi-vh scroll track. Do not ask me to write code."',
            ),
        ],
        opaque_id="e9l7s3e2k4m1",
        paid_salt="el5n8q",
    )


def lineup_spec() -> ProductSpec:
    # File-pack SKU: mesh + labels + HDRI. Never point the buyer PDF at a storefront *-preview* clip.
    video_file = "can.glb"
    video_path = "/models/can.glb"
    mesh_url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium mid-page website SECTION (not a full-bleed hero) called LINEUP - a product line reveal.

Prefer the files in the pack. Integrate source/LineupSection.tsx and source/lineup-data.ts. Copy assets/can.glb to public/models/can.glb, label PNGs to public/textures/labels/, and the HDRI to public/hdri/.

This is a WORLD-SCALE PRODUCT REVEAL. Bone paper stage (#efede6). As the visitor scrolls, each segment introduces a new SKU: 3D vessel cross-fades, bloom tint changes, ghost number, copy card rebuilds. Desktop earn equals N viewports where N is PRODUCTS.length. Snap on lift to 0, 1/N, ..., 1. Mobile uses horizontal snap cards.

NO SCROLLER (pin-until-complete) (non-negotiable):
One pinned 100dvh stage #flavors in normal document flow. The page does NOT physically scroll during the viewing. Do not use position sticky. Do not build an N vh document spacer. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = PRODUCTS.length. Wheel / trackpad / touch / keys add deltaPx / (N * window.innerHeight) to progress g (0 to 1). Snap on lift. At g 0 plus up, or g 1 plus down, RELEASE.
PIN FREEING (mandatory): after release at g = 1 plus down, the PAGE owns wheel / touch / keys until the stage docks (getBoundingClientRect().top >= -2). Pointer on the next sibling never drives the lineup.
NOT GSAP ScrollTrigger pin. NOT Lenis. NOT PSAVE. Do NOT install lenis. gsap is for SKU cross-fade tweens only.

DEFAULT DEMO (replace entirely): three nootropic cans Clear / Dawn / Dusk (ACTUALLY.01-03). Starting board only.

CLIENT MEDIA:
- Mesh: {mesh_url} (pack: assets/can.glb)
- Labels: still-01-clear-2.png, still-02-dawn-2.png, still-03-dusk-2.png
- HDRI: studio_small_03_1k.hdr

LOOK: editorial CPG tasting room. No purple mesh. No Motionsites docks. Not a flat shop grid.

TECHNICAL:
React + TypeScript. Virtual progress listeners. gsap tweens only. three + R3F + drei. No Lenis. No ScrollTrigger pin.
Capture helper: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-LINE01" }}. Root data-lineup-drive="pin". After release: data-lineup-owns="page".

CUSTOMIZATION LAW:
Every string, product object, mesh, label, color, spec row, and N count is replaceable.

QUALITY BAR:
It should feel like a private tasting room. One clear system: No Scroller. Scroll aims the SKUs. The page stays still until the viewing ends. Never restore lenis. Never add PSAVE.
""".strip()
    return ProductSpec(
        product_id="MS-SEC-LINE01",
        product="Lineup",
        product_line="Product Line Scroll Reveal Section",
        promise=(
            "Your products enter one by one as the visitor scrolls - a living 3D vessel, "
            "soft copy, and a quiet stage that can hold any line from two SKUs to a full collection."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is the 3D product pack (mesh, labels, HDRI) in the files zip. "
            "There is no background film. Scroll aims the SKUs. The page stays still until "
            "the viewing ends, then the pin releases. After release the page owns until dock."
        ),
        shared_design=design,
        video_gen=(
            "No looping background film required. Optional: generate label art or product stills "
            "for each SKU as clean editorial boards, no watermarks, ready as public textures."
        ),
        customize=[
            (
                "Replace the whole product line",
                'Ask your AI: "Replace PRODUCTS and SECTION_META in lineup-data.ts with my brand [NAME] and products: [LIST]. Keep No Scroller, snap, 3D cross-fade, and pin freeing. H2 and eyebrow must match count N. Never leave ACTUALLY demo copy."',
            ),
            (
                "Expand to more products",
                'Ask your AI: "Expand Lineup from 3 to [N] products using [DATA]. Virtual earn must be N viewports (not a document spacer). Snap 0…1. Tabs 01…N. Update SECTION_META. Do not restore ScrollTrigger pin or lenis."',
            ),
            (
                "Reduce products",
                'Ask your AI: "Remove products [ids] from PRODUCTS. Update SECTION_META. Virtual earn and snap must shrink with PRODUCTS.length."',
            ),
            (
                "Any product vessel (not a can)",
                'Ask your AI: "Replace can.glb with [MESH] and labels with [TEXTURES]. Set meshPath/labelPath per product. Keep cross-fade stage motion and No Scroller."',
            ),
            (
                "Change industry / specs",
                'Ask your AI: "Rewrite names, pitches, and SPEC_ROWS for [CATEGORY]. Replace SECTION_META totalLabel, totalUnit, specUnit, leadBadge. dosageMg is just the numeric cell."',
            ),
            (
                "Brand and colors",
                'Ask your AI: "Change bone/ink CSS vars to [PAPER]/[INK]. Set each bloomColor to my palette. Change ACTUALLY.01 wordmarks to [BRAND].01 style."',
            ),
            (
                "Pin freeing if scroll feels stuck after the last product",
                'Ask your AI: "After the last product, scrolling down must release the pin. Then the PAGE owns the wheel until the section docks at the top again. Scrolling up in the next section must move the page, not rewind the lineup."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep Lineup as a No Scroller multi-SKU reveal with data-driven N products. Keep pin freeing. Do not restore ScrollTrigger pin, lenis, or a tall sticky track. Do not add PSAVE. Do not ask me to write code."',
            ),
        ],
        opaque_id="l7n3e9k2m4p8",
        paid_salt="q3n7w2",
        media_kind="pack",
        pack_inside=[
            "3D mesh, labels, HDRI, and React source in the files zip",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to restage products, count, and mesh",
        ],
        pack_url_box_label="Client vessel mesh (replace with your product)",
        pack_file_hint=(
            "Offline files: can.glb, three label PNGs, studio HDRI. "
            "Copy as START-HERE.md describes. Never use a storefront preview as rebuild media."
        ),
        pack_section_title="Your product pack",
        pack_section_kicker="02  ·  Pack only",
        pack_section_intro=(
            "Rebuild Lineup from the files zip: mesh plus labels plus LineupSection. "
            "Never use a storefront recording as a hero film."
        ),
        pack_url_section_label="Default vessel in the catalog",
        pack_tell_ai=(
            "Tell your AI: “Use the files zip. Copy assets/can.glb to public/models/can.glb. "
            "Prefer source/LineupSection.tsx. Keep No Scroller and pin freeing. "
            "Do not install lenis. Do not pin with ScrollTrigger.”"
        ),
        pack_video_gen_title="New labels (optional)",
        pack_video_gen_intro=(
            "This product has no hero film. Only if you want new label art: generate stills, "
            "then ask your coding AI to swap the files in the pack."
        ),
        pack_video_gen_ask=(
            'Ask your AI: “Replace the label PNGs with [MY ART]. '
            "Keep the same Lineup No Scroller pin, snap, and 3D cross-fade.”"
        ),
        pack_closer=(
            "\n\nWhen done: I should see the full Lineup reveal from the files zip "
            "(each SKU lands, page still during the viewing, then the page owns until dock). "
            "Do not install lenis. Do not add PSAVE. "
            "If something is missing, fix it without asking me for code knowledge."
        ),
        pack_agent_use="use the files zip (source plus mesh plus labels), ",
    )


def actually_spec() -> ProductSpec:
    # File-pack SKU: mesh + labels + HDRI. Never point the buyer PDF at a storefront *-preview* clip.
    video_file = "can.glb"
    video_path = "/models/can.glb"
    mesh_url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website HERO for a CPG / beverage brand called Actually! (buyer will rebrand).

Prefer the files in the pack. Integrate source/ActuallyHero.tsx. Copy assets/can.glb to public/models/can.glb, labels to public/textures/labels/, HDRI to public/hdri/.

This is a PRODUCT-FIRST HERO. Bone paper (#efede6) over ink (#1a1b1d). Giant wordmark ACTUALLY. Pointer circle window into a React Three Fiber can under studio HDRI. Scroll aims the reveal. Mobile stacks wordmark, can (drag to spin), and formula.

NO SCROLLER (pin-until-complete) (non-negotiable):
One pinned 100dvh stage #hero. The page does NOT physically scroll during the viewing. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = 1.2. Wheel / trackpad / touch / keys add deltaPx / (1.2 * window.innerHeight) to progress g.
At g 0 plus up, or g 1 plus down, RELEASE.
PIN FREEING: after release at g = 1 plus down, the PAGE owns until dock (top >= -2).
NOT GSAP ScrollTrigger pin. NOT Lenis. NOT PSAVE. Do NOT install lenis. gsap is for pointer, clip, and support tweens only.

CLIENT MEDIA:
- Mesh: {mesh_url} (pack: assets/can.glb)
- Labels: still-01-clear-2.png (and dawn / dusk)
- HDRI: studio_small_03_1k.hdr

SIGNATURES: pointer window, living 3D can, scroll reveal (clip expand, lock, dolly, formula after g 0.58).

TECHNICAL:
React + TypeScript. Virtual progress. gsap tweens only. three + R3F + drei. No Lenis. No ScrollTrigger pin.
Capture helper: window.__msScrollNarrative productId MS-HERO-ACTU01. data-actually-drive=pin. After release data-actually-owns=page.

ACCESSIBILITY:
Semantic section#hero. Wordmark aria-label. Loader role=status. Arrow / Page / Space drive g while the pin owns. Never trap Tab. Reduced motion: static product pose.

CONFIRM:
Page scrollY stays 0 while a 1080px flick on a 900px viewport reaches g=1. One more down-scroll moves the page. After release, scrolling up moves the page, not the reveal.

QUALITY BAR:
Quiet tasting room. Pointer invites. Scroll completes. Never restore lenis. Never add PSAVE.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ACTU01",
        product="Actually",
        product_line="Interactive Product Can Hero",
        promise=(
            "Your product becomes the stage: a living 3D object, a pointer that opens a window "
            "into the brand, and scroll that reveals all, your product and presentation - "
            "restage it for any offer."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is the 3D product pack (can mesh, label textures, studio HDRI) in the files zip. "
            "There is no background film. Scroll aims the reveal. The page stays still until the viewing ends, "
            "then the pin releases. After release the page owns until dock."
        ),
        shared_design=design,
        video_gen=(
            "This product does not require a looping background film. "
            "Replace the GLB and label maps with the buyer's product."
        ),
        customize=[
            (
                "Change the brand wordmark",
                'Ask your AI: "Change the hero wordmark from ACTUALLY. to [YOUR BRAND]. Keep No Scroller and pin freeing."',
            ),
            (
                "Change taglines and meta",
                'Ask your AI: "Change Actually? / Really. Actually. to [LINE 1] / [LINE 2] and the bottom-right meta to [CATEGORY] / [LOCATION]."',
            ),
            (
                "Change the formula story",
                'Ask your AI: "Rewrite the support index, H2, body, and two stats for [PRODUCT STORY]. Keep the left column reveal after mid progress."',
            ),
            (
                "Load your product mesh and labels",
                'Ask your AI: "Replace can.glb and the label map. Keep grab spin, HDRI, No Scroller, and pin freeing."',
            ),
            (
                "Change colors",
                'Ask your AI: "Change bone, ink, and accent to [PAPER] / [STAGE] / [ACCENT]. Keep type readable."',
            ),
            (
                "Pin freeing if scroll feels stuck",
                'Ask your AI: "After the last moment, scrolling down must release the pin. Then the PAGE owns until dock. Scrolling up in the next section must move the page."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep Actually! as a product-first hero with No Scroller and pin freeing. Do not restore ScrollTrigger pin or lenis. Do not add PSAVE. Do not ask me to write code."',
            ),
        ],
        opaque_id="a9ct7u4l2y1x",
        paid_salt="r5m4x9",
        media_kind="pack",
        pack_inside=[
            "3D mesh, labels, HDRI, and React source in the files zip",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to restage brand, mesh, and formula",
        ],
        pack_url_box_label="Client vessel mesh (replace with your product)",
        pack_file_hint=(
            "Offline files: can.glb, three label PNGs, studio HDRI. "
            "Copy as START-HERE.md describes. Never use a storefront preview as rebuild media."
        ),
        pack_section_title="Your product pack",
        pack_section_kicker="02  ·  Pack only",
        pack_section_intro=(
            "Rebuild Actually! from the files zip: mesh plus labels plus ActuallyHero. "
            "Never use a storefront recording as a hero film."
        ),
        pack_url_section_label="Default vessel in the catalog",
        pack_tell_ai=(
            "Tell your AI: “Use the files zip. Copy assets/can.glb to public/models/can.glb. "
            "Prefer source/ActuallyHero.tsx. Keep No Scroller and pin freeing. Do not install lenis.”"
        ),
        pack_video_gen_title="New labels (optional)",
        pack_video_gen_intro="This product has no hero film. Only if you want new label art.",
        pack_video_gen_ask=(
            'Ask your AI: “Replace the label PNGs with [MY ART]. Keep No Scroller and the pointer window.”'
        ),
        pack_closer=(
            "\n\nWhen done: I should see the Actually! hero from the files zip "
            "(pointer window, living can, page still during the viewing, then the page owns until dock). "
            "Do not install lenis. Do not add PSAVE."
        ),
        pack_agent_use="use the files zip (source plus mesh plus labels), ",
    )


def helix_spec() -> ProductSpec:
    # Client media is nine gallery stills. Never point the buyer PDF at a storefront *-preview* clip.
    video_file = "orbit-01.jpg"
    video_path = "/assets/images/orbit/orbit-01.jpg"
    stills = ", ".join(
        [f"{WEBSITE_URL}/assets/images/orbit/orbit-{str(i).zfill(2)}.jpg" for i in range(1, 10)]
    )
    design = f"""
Build a premium mid-page website SECTION (not a full-bleed hero) for a design-studio gallery brand called HELIX.

This is a SPATIAL GALLERY CAROUSEL. Solid stage color (#C3C3C3 by default, fully recolorable) with a WebGL cylindrical card helix. Cards are the focus so the buyer can load their own work. Do not force a loud underlay film unless the buyer asks for a soft stage treatment.

Prefer the files in the pack. Integrate source/HelixGallerySection.tsx and source/OrbitHelix.tsx. Copy assets/orbit-01.jpg through orbit-09.jpg to public/assets/images/orbit/.

NO SCROLLER (pin-until-complete) (non-negotiable):
One pinned 100dvh stage in normal document flow. The page does NOT physically scroll during the viewing. Do not use position sticky. Do not build a 3vh / 5vh document spacer. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = 5 on desktop, 3 when window.innerWidth < 768. Wheel / trackpad / touch / keys add deltaPx / (viewports * window.innerHeight) to progress g (0 to 1). Titles and helix follow g 1:1 (old scrub:true). At g 0 plus up, or g 1 plus down, RELEASE so the host page can continue.
PIN FREEING (mandatory): after release at g = 1 plus down, the PAGE owns wheel / touch / keys until the stage docks (getBoundingClientRect().top >= -2). Scrolling up in the next section must move the page, not rewind the helix. Pointer on the next sibling never drives the helix.
NOT GSAP ScrollTrigger pin. NOT Lenis. NOT PSAVE. There is no reverse-played film. Do NOT install gsap. Do NOT install lenis.

GALLERY STILLS (required - nine images on the helix - replace with buyer work):
Default demo textures (load order reverse: 09 down to 01):
{stills}
If the pack has local files named orbit-01.jpg through orbit-09.jpg, place those at public/assets/images/orbit/ and use those paths.
Each card is a rounded rectangle on a helical ribbon (radius about 12, two full turns, spacing about 6.2). Thin gray guide rails along the path.
The buyer will swap every card for their portfolio, UI frames, campaigns, or product boards. Prefer portrait-ish high-resolution stills without watermarks.

LOOK AND FEEL - EDITORIAL GALLERY (not SaaS glass):
Stage #C3C3C3. Ink #0a0a0a / #1a1a1a. Quiet Swiss board. Private design studio.
Display: geometric sans (Neue Haas / Inter / Helvetica Neue). Wordmark: Birthstone script for demo brand ClickMotion (buyer will rebrand).
Never purple mesh, never Motionsites pill docks, never a required third-party Dribbble button.

SIGNATURE A - CROSSING TITLES:
Giant uppercase "Design in" starts off the left and travels right.
Giant uppercase "motion" starts off the right and travels left.
They peak near center at g about 0.18, then continue out of frame as the journey finishes.
Backface-hidden for clean motion. Both strings are buyer-editable.

SIGNATURE B - CENTER LOCKUP:
Above a quiet uppercase line "Exploring ideas through / daily design practice." place the brand wordmark in Birthstone (default ClickMotion). Fade the lockup after g about 0.55. All of these strings are buyer-editable.

SIGNATURE C - WEBGL HELIX:
React Three Fiber Canvas full viewport, transparent clear, high-performance. Cards ease in from off-path as progress advances (do not seed mid-arc on first paint). Force the canvas to the viewport size (never stuck at 300x150).

LAYOUT:
Section only - no forced page header/footer.
Pin stage 100dvh solid stage color. Virtual earn 5 viewport heights on desktop, 3 on mobile (not page height).
Stack: titles + concepts under the canvas; concepts bottom-left three lines (buyer-editable).
Do not add a pin-spacer. The section background is the stage.

TECHNICAL:
React + TypeScript. Virtual progress listeners (wheel non-passive, touch, keys). No GSAP. No ScrollTrigger. No Lenis.
three + @react-three/fiber for helix. Birthstone from Google Fonts for wordmark (or buyer brand font).
prefers-reduced-motion: static mid pose at g 0.45, titles near center, no chase.
Capture helper: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-HELI01" }}. Root data-helix-drive="pin". After release: data-helix-owns="page".
Single default-export component HelixGallerySection plus OrbitHelix. Do not add SmoothScroll or gsap-register.

CUSTOMIZATION LAW:
Every visible string and every card image must be easy to replace. After the default builds, the buyer will tell their AI to restage brand, titles, center lines, concepts copy, nine cards, and stage color until the section feels made for their brand alone.

QUALITY BAR:
It should feel like a private viewing of craft work on a calm board - spatial, intentional, complete. One clear system: No Scroller. Scroll aims the helix. The page stays still until the viewing ends. Never restore gsap. Never add PSAVE.
""".strip()
    return ProductSpec(
        product_id="MS-SEC-HELI01",
        product="Helix",
        product_line="Helical Design Gallery Carousel Section",
        promise=(
            "A spatial mid-page gallery where your work rides a 3D helix as titles "
            "cross the stage. Fully customizable cards, copy, and color so it feels made for your brand."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is nine gallery stills on a helical carousel (swap every card for your work). "
            "There is no background film and no reverse-played video. Scroll aims the helix. "
            "The page stays still until the viewing ends, then the pin releases. "
            "After release the page owns until the stage docks."
        ),
        shared_design=design,
        video_gen=(
            "Generate nine premium UI/design mock stills for the helix cards "
            "(portrait boards, fashion / product / editorial) as orbit-01.jpg through orbit-09.jpg, "
            "clean, high resolution, no watermarks, consistent lighting. "
            "Or replace with the buyer's own nine images when provided."
        ),
        customize=[
            (
                "Change the brand wordmark",
                'Ask your AI: "Change the center wordmark from ClickMotion to [YOUR BRAND NAME]. Keep it one line, elegant script or brand font, centered above the small uppercase lines. Update aria-label to match."',
            ),
            (
                "Change the giant titles",
                'Ask your AI: "Change the left-entering giant title from Design in to [TITLE A] and the right-entering title from motion to [TITLE B]. Keep uppercase, huge clamp sizing, and the left-to-right / right-to-left cross."',
            ),
            (
                "Change the center lines",
                'Ask your AI: "Change the two center uppercase lines to [LINE 1] and [LINE 2]. Keep small tracking under the wordmark and the late-scroll fade."',
            ),
            (
                "Change the concepts copy",
                'Ask your AI: "Replace the bottom-left three-line concepts paragraph with [LINE 1] / [LINE 2] / [LINE 3]. Keep left-aligned under the cards in z-order."',
            ),
            (
                "Load your nine gallery images",
                'Ask your AI: "Replace orbit-01 through orbit-09 with [YOUR NINE IMAGE PATHS OR DESCRIPTIONS]. Keep rounded cards, helix path, and high-quality textures. If I only give descriptions, generate tasteful boards that match [BRAND TONE]."',
            ),
            (
                "Change stage and type color",
                'Ask your AI: "Change the stage color #C3C3C3 to [STAGE HEX] and type ink to [INK HEX]. Keep the section background matched to the stage so there is no flash when the pin releases. Keep wordmark readable."',
            ),
            (
                "Brand voice pass",
                'Ask your AI: "Rewrite every visible string so the voice matches [BRAND VOICE]. Do not change helix math or No Scroller behavior unless I ask."',
            ),
            (
                "Pin freeing if scroll feels stuck after the last moment",
                'Ask your AI: "After the last moment, scrolling down must release the pin. Then the PAGE owns the wheel until the section docks at the top again. Scrolling up in the next section must move the page, not rewind the helix. Pointer on the next sibling must never drive the helix."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Helix as a spatial mid-page gallery with No Scroller (pin-until-complete), helix cards, and crossing titles. Keep pin freeing (page owns until dock). Do not restore gsap, lenis, SmoothScroll, or a tall multi-vh sticky track. Do not add PSAVE. Do not ask me to write code."',
            ),
        ],
        opaque_id="h3l1x9k2m7p4",
        paid_salt="t2v8c6",
        media_kind="pack",
        pack_inside=[
            "Nine gallery stills plus React source in the files zip",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to restage brand, titles, cards, and colors",
        ],
        pack_url_box_label="First gallery still (replace all nine)",
        pack_file_hint=(
            "Offline files: orbit-01.jpg through orbit-09.jpg. "
            "Copy assets/ to public/assets/images/orbit/. This is not a background film."
        ),
        pack_section_title="Your gallery stills",
        pack_section_kicker="02  ·  Pack only",
        pack_section_intro=(
            "This is not a background-film product. Rebuild Helix from the files zip: "
            "nine stills plus HelixGallerySection and OrbitHelix. Never use a storefront recording as a hero film."
        ),
        pack_url_section_label="First still in the pack",
        pack_tell_ai=(
            "Tell your AI: “Use the files zip. Copy assets/orbit-01.jpg through orbit-09.jpg "
            "to public/assets/images/orbit/. Prefer source/HelixGallerySection.tsx. "
            "Keep No Scroller and pin freeing (page owns until dock). "
            "Do not add a background video. Do not install gsap or lenis.”"
        ),
        pack_video_gen_title="New gallery cards (optional)",
        pack_video_gen_intro=(
            "This product has no hero film. Only if you want new card art: generate nine portrait stills, "
            "then ask your coding AI to swap the files in the pack."
        ),
        pack_video_gen_ask=(
            'Ask your AI: “Replace orbit-01.jpg through orbit-09.jpg with [MY NINE IMAGES]. '
            "Keep the same Helix No Scroller pin, helix math, and crossing titles. Do not add a background film.”"
        ),
        pack_closer=(
            "\n\nWhen done: I should see the full Helix spatial gallery from the files zip "
            "(nine cards on a helix, crossing titles, page still during the viewing, "
            "then the page owns until dock). "
            "Do not add a looping background film. Do not install gsap or lenis. "
            "If something is missing, fix it without asking me for code knowledge."
        ),
        pack_agent_use="use the files zip (source plus nine stills), ",
    )


def studio_spec() -> ProductSpec:
    # File-pack SKU: pure billboard film + street plate. Never point the buyer PDF at a storefront *-preview* clip.
    video_file = "studio-surreal-v1.mp4"
    video_path = "/assets/videos/studio-surreal-v1.mp4"
    film_url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium mid-page website SECTION (not a free-floating video box) called STUDIO SEQUENCE - a cinematic camera pull-out billboard.

Prefer the files in the pack. Integrate source/StudioSequence.tsx and source/studio-data.ts. Copy assets/billboard-film.mp4 to public/assets/studio/billboard-film.mp4 and assets/street-plate.png to public/assets/studio/street-plate.png.

This is a WORLD-SCALE CAMERA PULL-OUT. At the start the visitor is inside a full-bleed film (no street rim). As they scroll, a single world layer scales down around the billboard center until they see a full street photograph with the same film still playing inside the gray billboard rectangle on that plate.

Scroll moves the CAMERA only. Video time is independent: the film plays from start to end and loops. Never seek currentTime with scroll. Never trim the film. Never regrade with CSS filters unless the buyer asks. Never reverse the film.

CLIENT MEDIA (required - in the product files zip):
- Pure billboard cinema: public/assets/studio/billboard-film.mp4 (pack: assets/billboard-film.mp4)
- Street / facade plate: public/assets/studio/street-plate.png (prefer 1920x1080+)
- Default plate measure (fractions of plate, already in studio-data.ts): left 0.2521, top 0.2630, width 0.5026, height 0.3870
Optional operator catalog reference (not storefront chrome):
{film_url}

NO SCROLLER (pin-until-complete) (non-negotiable):
One pinned 100dvh stage #studio-sequence in normal document flow. The page does NOT physically scroll during the viewing. Do not use position sticky. Do not build a 3vh / 4vh document spacer. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = 4 on desktop. VIRTUAL_VIEWPORTS = 3 when window.innerWidth < 768. Wheel / trackpad / touch / keys add deltaPx / (viewports * window.innerHeight) to progress g (0 to 1). Camera follows g 1:1. Hold in 0.06 / hold out 0.90 / smootherstep. Four-edge cover startScale so off-center boards still open full-bleed.
At g 0 plus up, or g 1 plus down, RELEASE so the host page can continue.
PIN FREEING (mandatory): after release at g = 1 plus down, the PAGE owns wheel / touch / keys until the stage docks (getBoundingClientRect().top >= -2). Scrolling up in the next section must move the page, not rewind the camera. Pointer on the next sibling never drives the camera.
NOT GSAP ScrollTrigger pin. NOT Lenis. NOT PSAVE. There is no reverse-played film. Do NOT install gsap. Do NOT install lenis.

LOOK AND FEEL:
Quiet cinematic street architecture. No purple SaaS mesh. No Motionsites docks. No website UI frames burned into the billboard film.
The open must be full-bleed film; the end must read as a living street billboard.

ARCHITECTURE (non-negotiable):
- One world layer contains the street plate (object-fit cover) and a video shell locked to the billboard rect (fractions of the plate).
- Transform scale the world from startScale to 1 around the billboard center.
- startScale must use four-edge cover so off-center boards still open full-bleed (not a floating video rect).
- Video: muted, loop, playsInline, preload auto, object-fit cover inside the board.
- Reduced motion: scale stays at 1; film may still play.

TECHNICAL:
React + TypeScript. Virtual progress listeners (wheel non-passive, touch, keys). No GSAP. No ScrollTrigger. No Lenis. No Three.js.
Prefer integrating pack source: StudioSequence.tsx and studio-data.ts. Do not add SmoothScroll or gsap-register.
Capture helper: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-STUDIO01" }}. Root data-studio-drive="pin" and data-product="MS-SEC-STUDIO01". After release: data-studio-owns="page". While the pin owns: data-studio-owns="pin".
Single default-export StudioSequence. Mount after assets are under public/assets/studio/.

CUSTOMIZATION LAW:
Buyer swaps film, plate, earn viewports, and board measure without inventing a different interaction.
After default builds, restage for campaign film + real facade still.

QUALITY BAR:
It should feel expensive, calm, and inevitable - full-bleed open, living street end, film glued to the board. One clear system: No Scroller. Scroll aims the camera. The page stays still until the viewing ends. Never restore gsap. Never add PSAVE.
""".strip()
    return ProductSpec(
        product_id="MS-SEC-STUDIO01",
        product="Studio",
        product_line="Camera Pull-Out Billboard Section",
        promise=(
            "Start inside a full-bleed film. Scroll draws the camera out until that same "
            "story lights a street billboard: cinematic, continuous, unforgettable."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is pure billboard cinema (billboard-film.mp4) plus street-plate.png "
            "in the files zip - no website chrome. The film free-plays. Scroll aims the camera. "
            "The page stays still until the viewing ends, then the pin releases. "
            "After release the page owns until the stage docks. "
            "Never use storefront previews as the rebuild film."
        ),
        shared_design=design,
        video_gen=(
            "Optional new billboard film: cinematic 4K silent loop or short film, no UI chrome, "
            "no watermarks, designed to play full duration on a street billboard. "
            "Or use the buyer campaign MP4 as provided."
        ),
        customize=[
            (
                "Swap the billboard film",
                'Ask your AI: "Use my MP4 as public/assets/studio/billboard-film.mp4. Play full duration with loop. Do not seek video with scroll. Do not regrade with CSS filters unless I ask. Keep No Scroller and pin freeing."',
            ),
            (
                "Swap the street plate",
                'Ask your AI: "Replace street-plate.png with my facade still. Update plateWidth/plateHeight and re-measure billboard left/top/width/height as fractions of the plate. Keep four-edge cover full-bleed open."',
            ),
            (
                "Slower camera",
                'Ask your AI: "Set virtualViewportsDesktop to 5 and virtualViewportsMobile to 4 in studio-data.ts. Keep holdIn 0.06 and holdOut 0.9. Film still plays full length on its own timeline. Do not restore a tall sticky track."',
            ),
            (
                "Keep included film",
                'Ask your AI: "Keep assets/billboard-film.mp4 as the billboard film. Full duration loop. No trim. No regrade."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile so the open is still full-bleed, the street remains readable at the end, and earn does not feel endless. Keep No Scroller and pin freeing. Do not add a tall page track."',
            ),
            (
                "Pin freeing if scroll feels stuck after the last moment",
                'Ask your AI: "After the last moment, scrolling down must release the pin. Then the PAGE owns the wheel until the section docks at the top again. Scrolling up in the next section must move the page, not rewind the camera. Pointer on the next sibling must never drive the camera."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep Studio Sequence as a world-scale camera pull-out with No Scroller (pin-until-complete) and independent film playback. Keep pin freeing (page owns until dock). Do not shrink a free-floating video box. Do not restore gsap, lenis, or a tall multi-vh sticky track. Do not add PSAVE. Do not ask me to write code."',
            ),
        ],
        opaque_id="s7u2d1o9q4x1",
        paid_salt="p8k2m1",
        media_kind="pack",
        pack_inside=[
            "Pure billboard film plus street plate plus React source in the files zip",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to restage film, plate, and earn",
        ],
        pack_url_box_label="Client billboard film (replace with your cinema)",
        pack_file_hint=(
            "Offline files: billboard-film.mp4 and street-plate.png. "
            "Copy assets/ to public/assets/studio/. Never use a storefront preview as the board film."
        ),
        pack_section_title="Your cinema and street plate",
        pack_section_kicker="02  ·  Pack only",
        pack_section_intro=(
            "Rebuild Studio Sequence from the files zip: billboard film plus street plate "
            "plus StudioSequence. Never use a storefront recording as the billboard cinema."
        ),
        pack_url_section_label="Client film in the catalog",
        pack_tell_ai=(
            "Tell your AI: “Use the files zip. Copy assets/billboard-film.mp4 and "
            "assets/street-plate.png to public/assets/studio/. Prefer source/StudioSequence.tsx. "
            "Keep No Scroller and pin freeing (page owns until dock). "
            "Do not seek the film with scroll. Do not install gsap or lenis.”"
        ),
        pack_video_gen_title="New billboard film (optional)",
        pack_video_gen_intro=(
            "Only if you want new cinema: generate a silent cinematic loop with no UI chrome, "
            "then ask your coding AI to swap the file in the pack."
        ),
        pack_video_gen_ask=(
            'Ask your AI: “Replace billboard-film.mp4 with [MY FILM]. '
            "Keep the same Studio Sequence No Scroller pin, four-edge cover, and street plate. "
            "Do not seek the film with scroll. Do not add PSAVE.”"
        ),
        pack_closer=(
            "\n\nWhen done: I should see the full Studio Sequence pull-out from the files zip "
            "(full-bleed open, living street end, page still during the viewing, "
            "then the page owns until dock). "
            "Do not install gsap or lenis. Do not add PSAVE. "
            "If something is missing, fix it without asking me for code knowledge."
        ),
        pack_agent_use="use the files zip (source plus film plus plate), ",
    )


def phobia_spec() -> ProductSpec:
    # File-pack SKU: cutouts + React source (zip). PDF is luxury manual.
    video_file = "phobia-forms-preview-v1.mp4"
    video_path = "/assets/videos/phobia-forms-preview-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium mid-page or full-viewport website SECTION called PHOBIA - cursor-fleeing forms on a pure black void.

This is POINTER-FIRST. Photo cutouts and letter debris rest in a crafted cluster. When the pointer is away, they spread. When the pointer approaches a rest home, they flee radially with rotation and scale, then elastic-return when clear. A premium white-glow cursor with a soft trail makes the stage feel expensive, not gimmicky.

CLIENT MEDIA (required - in the product files zip):
Place pack assets under public/assets/phobia/ with the same filenames:
papier-froisse.webp, asterix.webp, fluff-orange.png, chwing.webp, bonbon.webp, gold-die.png
Paths in phobia-data.ts already match /assets/phobia/...
Storefront preview videos on ClickMotion are presentation only - never use them as rebuild media.

LOOK AND FEEL:
Pure black void. Photo cutouts. White letter debris. Crystalline white cursor bloom.
Gallery installation x playful editorial x high-end digital toy.
No purple SaaS mesh. No Motionsites docks. No required site chrome. No olive system cursors as the signature.

MOTION LAW (non-negotiable):
- CSS rest pose; GSAP x/y are offsets from that rest (home = 0,0).
- Distance and angle: mouse to REST CENTER (visual center minus current GSAP offset), never live offset alone.
- Desktop: influenceRadius 460, maxDistance 380, rotForce 30, scaleForce 0.2.
- Mobile max-width 767: 260 / 110 / 12 / 0.1 (from PHOBIA_PARAMS).
- Flee: L = ((R - d) / R) ** 1.6, U = L * maxDistance, offset (-cos(theta)*U, -sin(theta)*U), duration 0.45, ease power4.out.
- Return: x:0 y:0 baseRot scale 1, duration 1.2, ease elastic.out(1, 0.35).
- overwrite auto. Prefer force3D true.
- Idle / pointer outside section: treat mouse as viewport center so objects spread.
- prefers-reduced-motion: do not run flee thrashing; leave objects at rest.

ARCHITECTURE:
- Section h-dvh (or tall mid-page), black, overflow hidden, cursor none on the stage.
- Centered stage ~1872x1056 max holding absolute rest poses.
- Drive all items and params from phobia-data.ts (PHOBIA_ITEMS, PHOBIA_PARAMS).
- Custom cursor + trail as HTML overlays.
- Prefer integrating pack source PhobiaSection.tsx + phobia-data.ts over rewriting.

TECHNICAL:
React + TypeScript. gsap only (no Club InertiaPlugin). Optional Tailwind as written in source.
Single default-export PhobiaSection.

CUSTOMIZATION LAW:
Every cutout, letter, rest pose, z-index, and influence param is replaceable.
After default builds, restage for buyer brand objects and name lettering.

QUALITY BAR:
Idle spread feels intentional. Flee feels alive. Return feels elastic and expensive. Cursor is the signature jewel.

REFERENCE MOTION (storefront presentation - do NOT use as rebuild media):
{url}
""".strip()
    return ProductSpec(
        product_id="MS-SEC-PHOB01",
        product="Phobia",
        product_line="Cursor-Fleeing Forms Section",
        promise=(
            "Black void. Photo cutouts and letter debris scatter, flee your pointer with "
            "elastic return, and a premium white-glow cursor - restaged for any brand."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is transparent cutouts in the files zip under assets/ "
            "(not a background film product). Storefront presentation shows the full "
            "pointer interaction (page + fullscreen previews). Rebuild only from pack source + cutouts."
        ),
        shared_design=design,
        video_gen=(
            "Optional new cutouts: transparent PNG or WebP product / brand objects on pure alpha, "
            "clean edges, no UI chrome, consistent lighting. "
            "Or replace with the buyer photos as provided."
        ),
        customize=[
            (
                "Replace cutouts with brand photos",
                'Ask your AI: "Replace the cutout images with my product photos (transparent PNG/WebP) under public/assets/phobia/. Update PHOBIA_ITEMS src paths. Keep rest poses for now."',
            ),
            (
                "Change letter debris",
                'Ask your AI: "Change the letter debris to spell [MY BRAND], one character per letter item. Adjust sizes so the field still feels scattered and premium."',
            ),
            (
                "Add density",
                'Ask your AI: "Add three more objects to PHOBIA_ITEMS using my new assets. Keep z-index so letters stay on top."',
            ),
            (
                "Stronger or softer flee",
                'Ask your AI: "Tune PHOBIA_PARAMS.desktop maxDistance and rotForce slightly. Keep elastic return soft. Keep mobile gentler than desktop."',
            ),
            (
                "Nudge the cluster",
                'Ask your AI: "Nudge the whole rest cluster down for ultrawide screens (SHIFT_Y or left/top values). Keep rest-based flee."',
            ),
            (
                "Cursor accessibility",
                'Ask your AI: "Keep the white glow but make the core slightly larger for accessibility. Do not switch to a system default cursor on the section."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep rest-based radial flee and elastic return. Do not switch to CSS hover only. Do not ask me to write code."',
            ),
        ],
        opaque_id="p8h0b2a9k1m4",
        paid_salt="f3n8k2",
    )


def roadster_spec() -> ProductSpec:
    # File-pack SKU: loop film + cards + pull-up specs + GLB. Never point the buyer PDF at a storefront *-preview* clip.
    video_file = "studio-drive.mp4"
    video_path = "/assets/roadster/studio-drive.mp4"
    film_url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website HERO called ROADSTER - Studio Drive (buyer will rebrand).

Prefer the files in the pack. Integrate source/TeslaRoadsterPromo.tsx. Copy assets/studio-drive.mp4 and assets/roadster.glb to public/assets/roadster/.

This is a STUDIO-DRIVE HERO. High-key film loops forever. Scroll aims enter-hold-exit cards, then a black rounded specs sheet pulls up over the live film with a spinning GLB.

NO SCROLLER (pin-until-complete) (non-negotiable):
One pinned 100dvh stage #hero. The page does NOT physically scroll during the viewing. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = 13.3 (12 panel + 1.3 sheet). Wheel / trackpad / touch / keys add deltaPx / (13.3 * window.innerHeight) to progress g.
At g 0 plus up, or g 1 plus down, RELEASE.
PIN FREEING: after release at g = 1 plus down, the PAGE owns until dock (top >= -2).
NOT GSAP ScrollTrigger pin. NOT Lenis. NOT PSAVE. Do NOT install gsap or lenis. Film free-plays. NEVER map scroll to video.currentTime.

CLIENT MEDIA:
- Film: {film_url} (pack: assets/studio-drive.mp4)
- Mesh: roadster.glb (Y-axis turntable)

SIGNATURES: looping studio film, enter-hold-exit cards, pull-up specs sheet, Y-spin GLB.

TECHNICAL:
React + TypeScript. Virtual progress. No gsap. three + R3F + drei. No Lenis. No ScrollTrigger pin.
Capture helper: window.__msScrollNarrative productId MS-HERO-ROAD01. data-roadster-drive=pin. After release data-roadster-owns=page.

ACCESSIBILITY:
Semantic section#hero. Arrow / Page / Space drive g while the pin owns. Never trap Tab. Reduced motion: settled cards, docked sheet, spin paused.

CONFIRM:
Page scrollY stays 0 while flicks advance g (13.3 x 900 = 1.0). One more down-scroll moves the page. After release, scrolling up moves the page, not the cards. Film keeps looping.

QUALITY BAR:
Catalog-grade vehicle unveil. Pointer invites. Scroll completes. Never restore gsap. Never add PSAVE.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ROAD01",
        product="Roadster",
        product_line="Studio Drive Scroll Hero",
        promise=(
            "Looping studio film, scroll-paced product cards, and a black specs sheet "
            "that pulls up with a spinning 3D model. Hybrid motion that stays bright, "
            "catalog-grade, and restageable."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is studio-drive.mp4 plus roadster.glb in the files zip. "
            "The film loops. Scroll aims the cards and the sheet. The page stays still until the viewing ends, "
            "then the pin releases. After release the page owns until dock."
        ),
        shared_design=design,
        video_gen=(
            "Optional new film: cinematic 4K seamless loop, 10 to 20 seconds, no audio. "
            "High-key white studio, single luxury vehicle orbit or slow push, clean floor reflections. "
            "No UI, no logos burned in, no grey grade. Optional new GLB: +Y up, origin under car, Principled materials."
        ),
        customize=[
            (
                "Rebrand chrome",
                'Ask your AI: "Change TESLA and ROADSTER labels to [BRAND] and [MODEL]. Keep No Scroller and pin freeing."',
            ),
            (
                "Rewrite story cards",
                'Ask your AI: "Update PANELS kickers, titles, bodies, and stats for [MY PRODUCT]. Keep enter-hold-exit timing and No Scroller."',
            ),
            (
                "Swap film",
                'Ask your AI: "Replace studio-drive.mp4 with my film. Keep muted loop. Never scrub with scroll. Do not add PSAVE."',
            ),
            (
                "Swap 3D model",
                'Ask your AI: "Replace roadster.glb with my GLB. Tune MODEL_SCALE and MODEL_Y. Keep Y-spin and late WebGL mount."',
            ),
            (
                "Edit specs sheet",
                'Ask your AI: "Update DRIVE_SPECS and MORE_SPECS and CTA labels to [MY SPECS AND CTAS]. Keep the rounded pull-up sheet."',
            ),
            (
                "Pin freeing if scroll feels stuck",
                'Ask your AI: "After the last moment, scrolling down must release the pin. Then the PAGE owns until dock. Scrolling up in the next section must move the page."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep Roadster as a No Scroller studio-drive hero. Do not restore ScrollTrigger pin or gsap. Do not add PSAVE. Do not ask me to write code."',
            ),
        ],
        opaque_id="r0ad8t3r5k2m",
        paid_salt="rd7n4x",
        media_kind="pack",
        pack_inside=[
            "Studio film, GLB, and React source in the files zip",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to restage brand, film, mesh, and specs",
        ],
        pack_url_box_label="Client studio film (replace with your product)",
        pack_file_hint=(
            "Offline files: studio-drive.mp4 and roadster.glb. "
            "Copy as START-HERE.md describes. Never use a storefront preview as rebuild media."
        ),
        pack_section_title="Your product pack",
        pack_section_kicker="02  ·  Pack only",
        pack_section_intro=(
            "Rebuild Roadster from the files zip: film plus GLB plus TeslaRoadsterPromo. "
            "Never use a storefront recording as a hero film."
        ),
        pack_url_section_label="Default film in the catalog",
        pack_tell_ai=(
            "Tell your AI: “Use the files zip. Copy assets/studio-drive.mp4 and assets/roadster.glb "
            "to public/assets/roadster/. Prefer source/TeslaRoadsterPromo.tsx. Keep No Scroller and pin freeing. Do not install gsap or lenis.”"
        ),
        pack_video_gen_title="New film (optional)",
        pack_video_gen_intro="Only if you want a new studio loop. The default film is already in the zip.",
        pack_video_gen_ask=(
            'Ask your AI: “Replace studio-drive.mp4 with [MY FILM]. Keep No Scroller and never scrub the film.”'
        ),
        pack_closer=(
            "\n\nWhen done: I should see the Roadster hero from the files zip "
            "(looping film, cards then sheet, page still during the viewing, then the page owns until dock). "
            "Do not install gsap. Do not add PSAVE."
        ),
        pack_agent_use="use the files zip (source plus film plus GLB), ",
    )


def dopamine_spec() -> ProductSpec:
    # File-pack SKU: figure + masks + Lottie + React footer (zip). PDF luxury manual.
    video_file = "dopamine-footer-preview-v1.mp4"
    video_path = "/assets/videos/dopamine-footer-preview-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium website FOOTER section (not a hero) called DOPAMINE - a complete fashion close.

This is a FULL FOOTER SYSTEM. Dark couture stage with CSS-masked backgrounds, an absolute hero figure, a Lottie discount badge, dual mono navigation with letter scramble on enter, an exclusion-blend wordmark, a subscribe title + email form (client validation only), and a legal bottom row with a credits panel. No external hyperlinks unless the buyer asks.

CLIENT MEDIA (required - in the product files zip):
Place under public/assets/dopamine/:
Woman1.png, footer_bg_mob.webp, footer_bg_tablet.webp, footer_bg_desk.webp, footer_bg_desk-scaled.webp, FOOTER_LOTTIE_v1.json
Paths in SiteFooter.tsx already match /assets/dopamine/...
Storefront preview videos on ClickMotion are presentation only - never use them as rebuild media.

LOOK AND FEEL:
Dark stage, cream-adjacent fashion energy, heavy geometric wordmark with mix-blend exclusion over the figure, IBM Plex Mono (or equal) for legal/nav, Inter for UI. Red accent #ed3833 sparingly. Quiet luxury, not SaaS glass.

MOTION (non-negotiable):
ScrollTrigger once when footer top hits 80% of viewport:
- Logo yPercent 300 to 0 (1.2s power3.out)
- Figure yPercent 100 to 0 (1.2s)
- Form opacity 0 to 1 (2s)
- Title scaleY 0 to 1 from bottom (0.8s @ 0.4)
- Letter scramble on nav + bottom data-split text
- Lottie badge enter; desktop hover advances frame range
- prefers-reduced-motion: reduce -> settled readable footer (no entrance thrash / scramble)
Prefer integrating pack source SiteFooter.tsx, scramble.ts, DopamineLogo.tsx, dopamine-footer.css.

LAYOUT LAW:
Use class dop-container for padding - NEVER Tailwind .container (max-width breaks the design).
Desktop: dual nav, full-width logo, title left + form right, bottom legal grid.
Figure height-driven (desktop about 65rem). Mask backgrounds swap by breakpoint.

TECHNICAL:
React + TypeScript. gsap + ScrollTrigger. lottie-web canvas. Import dopamine-footer.css once.
Single export SiteFooter (named export).

CUSTOMIZATION LAW:
Every nav label, wordmark string, figure, Lottie, credit line, and accent is replaceable.
After default builds, restage for buyer brand.

QUALITY BAR:
The last screen of the site must feel like a campaign end-card - expensive, complete, alive on scroll.

REFERENCE MOTION (storefront presentation - do NOT use as rebuild media):
{url}
""".strip()
    return ProductSpec(
        product_id="MS-SEC-DOPA01",
        product="Dopamine",
        product_line="Complete Fashion Footer Section",
        promise=(
            "Close every fashion page with authority: dual nav, exclusion wordmark, "
            "living figure, Lottie badge, letter scramble, and a couture subscribe form."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is figure + mask webps + Lottie in the files zip under assets/ "
            "(not a background film product). Storefront presentation shows the full footer "
            "enter (page + fullscreen previews). Rebuild only from pack source + assets."
        ),
        shared_design=design,
        video_gen=(
            "Optional new figure: transparent fashion PNG, full body or 3/4, clean edges, "
            "no UI chrome. Optional new Lottie badge matching brand. "
            "Or replace with buyer assets as provided."
        ),
        customize=[
            (
                "Rebrand the wordmark",
                'Ask your AI: "Change DOPAMINE in DopamineLogo and copyright to [YOUR BRAND]. Keep exclusion blend and full-width logo."',
            ),
            (
                "Swap the figure",
                'Ask your AI: "Replace Woman1.png under public/assets/dopamine/ with my PNG. Keep height-driven desktop scale. Nudge left/bottom only if needed."',
            ),
            (
                "Change navigation",
                'Ask your AI: "Update SHOP_NAV and LEGAL_NAV to [MY LABELS]. Keep scramble. Do not add external links unless I ask."',
            ),
            (
                "Subscribe copy",
                'Ask your AI: "Change Subscribe (latest news) to [HEADLINE] and the button to [CTA]. Keep client-only validation."',
            ),
            (
                "Lottie badge",
                'Ask your AI: "Replace FOOTER_LOTTIE_v1.json with my file at the same path, or hide .footer__discount if I do not want a badge."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep Dopamine footer motion (logo rise, figure enter, scramble, Lottie). Use dop-container not Tailwind container. Do not ask me to write code."',
            ),
        ],
        opaque_id="d0p4m1n38k2x",
        paid_salt="f7t3r9",
    )


def nomad_spec() -> ProductSpec:
    video_file = "nomad-montage-v1.mp4"
    video_path = "/assets/videos/nomad-montage-v1.mp4"
    poster_file = "nomad-montage-v1.webp"
    poster_path = "/assets/posters/nomad-montage-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a luxury travel and private-stays brand called NOMAD TRAVEL.

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the buyer has a local files pack, use assets/{video_file} placed at public/assets/videos/{video_file} (or the path already set in source).
Poster still (while loading / reduced motion still): public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent. It MUST free-play as a muted looping wallpaper (autoPlay, muted, loop, playsInline). Scroll does NOT control video time. NEVER set video.currentTime from scroll. Optional desktop-only light scale parallax on the film WRAPPER only (scale about 1 to 1.06), never on the timeline.

LOOK AND FEEL:
Canvas espresso #1C140A. Cream type #FEF3C7. One terracotta accent #C17A4A.
Display headlines: Playfair Display (or equal elegant serif), weight 500-700, tracking about -0.03em, line-height about 0.9, size clamp roughly 3rem to 7.5rem.
Body and UI: Inter (or equal clean sans), 300-500, 15-16px, line-height about 1.7, cream at about 68 percent opacity.
Soft cream glass (cream about 8 percent + blur about 48px) for secondary controls. Full pills (radius 9999px).
Quiet, expensive, unhurried private travel club. Think Aman x Conde Nast Traveler launch craft, not backpacker, not neon cyberpunk, not cold fintech chrome, not spa-white wellness, not purple SaaS mesh, not multi-chapter scroll-scrub film products.

LAYOUT (exact structure):
Full viewport hero (100dvh / min-h 100dvh), overflow hidden, espresso canvas under the film.
Video absolute cover, object-fit cover, under content.
Dual gradients over the film so type stays legible: left espresso type field, bottom vignette, soft terracotta horizon glow. NEVER grey-wash the entire frame.
Fixed top nav: Compass mark (lucide Compass or equal) + NOMAD wordmark left; desktop center links Destinations, Stays, Journeys, Concierge, Journal; right: Sign in (glass pill) + Book a Stay (solid terracotta pill).
Content left column, max width about 44rem, vertically centered, safe horizontal padding at least about 2rem:
- Badge (uppercase micro): Curated luxury stays
- H1 huge cream Playfair: Go beyond.
- Accent line terracotta Playfair: Stay forever.
- Body: Curated luxury stays in the world's most extraordinary places. Private villas, cliffside hideaways, and journeys written for the few who never settle for ordinary.
- Dual CTAs: Explore Stays (solid terracotta) + Watch Journey (glass) with a small ArrowUpRight mark on primary if useful
- Quiet proof rail under a hairline border: 48 Countries · 120+ Private stays · 24/7 Concierge
Optional scroll cue on desktop only when motion is allowed. Hide center nav links under 768px. Stack CTAs on small screens. Disable film parallax under 768px.

MOTION (exact):
Staggered entrance fade/up with ease [0.25, 0.46, 0.45, 0.94] about 0.75s, order: badge, H1, accent, body, CTAs, stats.
Desktop only: GSAP ScrollTrigger scales the film wrap 1 to 1.06, scrub about 1.25, start top top, end bottom top. Film time stays free-play loop.
prefers-reduced-motion: opacity-only entrance, no parallax, hide scroll cue. Video may still play muted or show poster.

TECHNICAL (you the AI implement this; the human may not be a developer):
Prefer React + TypeScript + Tailwind with one drop-in component (NomadTravelHero). If a files pack is available, prefer integrating source/NomadTravelHero.tsx over rewriting.
Video attributes: muted, playsInline, autoPlay, loop, preload auto, object-fit cover, aria-hidden.
IntersectionObserver: pause when off-screen, play when visible.
Fonts: load Playfair Display + Inter with display swap. Prefer CSS variables --font-nomad-display and --font-nomad-body with system fallbacks.
Install when needed: framer-motion, gsap (+ ScrollTrigger), lucide-react.
Focus rings terracotta. Semantic section, header, nav, h1. Safe side padding so type never kisses the frame edge.

QUALITY BAR:
It should feel like a private travel club homepage in a Forbes / private-bank lifestyle register, not a generic AI vacation template. One clear system: free-play empty-destination cinema + cream editorial type + terracotta craft. Never scrub the film. Never burn storefront UI into the rebuild.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-NOMA01",
        product="NomadTravel",
        product_line="Luxury Travel Platform Hero",
        promise=(
            "A warm terracotta luxury travel homepage with empty-destination cinema, Playfair type, "
            "and cream glass. Private-club aspiration, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: a cinematic glide through extraordinary empty luxury destinations "
            "(cliff villa and infinity pool, desert lodge, or hidden jungle edge energy), warm terracotta "
            "and cream grade, espresso voids, slow prestige pace. About 30 seconds, silent, seamless loop feel. "
            "No people as heroes, no logos, no UI. Pack also includes poster still nomad-montage-v1.webp. "
            "If you have the files zip, client film lives under assets/ as nomad-montage-v1.mp4."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 4K seamless loop, 14 to 30 seconds, 24fps film feel, no audio. "
            "SUBJECT: Empty luxury travel destinations from one coherent high-end cinema language. "
            "Primary: slow aerial or elevated glide over a cliffside luxury villa and infinity pool at golden hour, "
            "warm terracotta stone, cream limestone, deep espresso rock voids, turquoise or ink-blue water far below, soft haze. "
            "Alt A: empty desert boutique lodge at magic hour. Alt B: misty jungle canopy toward a hidden infinity edge. "
            "CAMERA: continuous slow aerial or elevated dolly, locked horizon, one smooth move only. No cuts, whip pans, handheld chaos, snap zooms, or FPV freestyle. "
            "LOOK: warm luxury editorial grade (espresso voids, terracotta highlights, cream sun-kissed limestone), gentle film grain. "
            "Aman resort brand film meets Conde Nast Traveler opening shot. Not teal-orange blockbuster cliche, not neon cyberpunk, not cold blue fintech chrome, not white wellness spa. "
            "FORBIDDEN: people or faces as focus; readable text, logos, watermarks, hotel brands, UI, HUD, map pins; backpacker energy; overcrowded tourist beaches as hero subject. "
            "TECH: 16:9, 3840x2160 preferred or 1920x1080 minimum, silent, photoreal cinematic. Seamless loop: end frame compositionally matches start. "
            "After export: save as public/assets/videos/nomad-montage-v1.mp4, export a poster still to public/assets/posters/nomad-montage-v1.webp, "
            "keep muted loop autoplay, never scrub video.currentTime with scroll, keep type-legibility gradients (do not grey-wash the frame)."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name NOMAD to [YOUR BRAND NAME] everywhere in the design, including the top left wordmark and any aria labels."',
            ),
            (
                "Change the big headlines",
                'Ask your AI: "Change Go beyond. to [LINE 1] and Stay forever. to [LINE 2]. Keep huge Playfair, cream H1, and terracotta accent line."',
            ),
            (
                "Change badge and body",
                'Ask your AI: "Change the badge Curated luxury stays and the body paragraph to [YOUR COPY]. Keep left-aligned editorial stack and cream readability."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename Explore Stays to [PRIMARY] and Watch Journey to [SECONDARY]. Also rename Sign in and Book a Stay if needed. Keep terracotta primary and glass secondary pills."',
            ),
            (
                "Change nav links and stats",
                'Ask your AI: "Replace nav links Destinations, Stays, Journeys, Concierge, Journal with [MY FIVE LINKS]. Change the three proof stats to [A], [B], [C]. Keep three max."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep a warm luxury travel look. Change canvas #1C140A, cream #FEF3C7, and terracotta #C17A4A to [CANVAS], [CREAM], [ACCENT]. Keep readable cream-on-dark contrast. No cyan or neon primary system."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE NAME] and update the poster still. Keep muted loop autoplay, object-fit cover, and type-legibility gradients. Never scrub video.currentTime with scroll."',
            ),
            (
                "Change fonts or mark",
                'Ask your AI: "Load my display serif as --font-nomad-display and my UI sans as --font-nomad-body. Swap the Compass icon for [MY MARK]. Keep large display H1 scale."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so the headline never clips, center nav links hide under 768px, CTAs stack cleanly, safe padding stays at least 2rem, and film parallax is off under 768px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep free-play muted film loop, soft entrance, desktop film parallax only, and the Nomad Travel espresso/terracotta luxury style. Do not scrub video.currentTime. Do not ask me to write code."',
            ),
        ],
        opaque_id="n0m4d7tr4v3l",
        paid_salt="nm8k4p",
    )


def still_spec() -> ProductSpec:
    video_file = "still-cosmos-v1.mp4"
    video_path = "/assets/videos/still-cosmos-v1.mp4"
    poster_file = "still-cosmos-v1.webp"
    poster_path = "/assets/posters/still-cosmos-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a mindfulness and mental wellness brand called STILL.

BACKGROUND VIDEO (required):
Use this video as the full-screen film under the hero (not a small thumbnail):
{url}
If the buyer has a local files pack, use assets/{video_file} placed at public/assets/videos/{video_file} (or the path already set in source).
Poster still (while loading / reduced motion still): public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent. Dual process: PSAVE (Perfect Scroll Video Engine) plus No Scroller (pin-until-complete). NOT wallpaper-only. NOT hybrid idle free-play. NOT a tall 960vh sticky track.

PSAVE + NO SCROLLER (non-negotiable):
One pinned 100dvh stage in normal document flow. The page does NOT physically scroll during the journey. Do not use position sticky. Do not build a 960vh spacer. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = 12 (locked: 30s even cosmos; two flicks on 3.6 dump dest). PSAVE_RATE = 1.2. PSAVE_FRAME = 1/24. PSAVE_REV_STRIDE = 3. PSAVE_LIVE_MS = 280. PSAVE_COAST_SEC = 0.55. PSAVE_EASE_SEC = 0.55. PSAVE_FLIP_DEADZONE_PX = 32.
Scroll aims a destination 0-1 on the 12 viewport track (raw 1:1, no wheel gain). The film PLAYS to that destination. Never seek currentTime across a jump.
DOWN: muted native play() at playbackRate 1.2. After they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases toward about 0.42. Friction, then a graceful stop. Ignore tiny opposite trackpad ticks under 32px.
UP: first real up-scroll snaps dest onto the picture. Walk currentTime backward exactly one 3-frame step (0.125s) per seek. Wait seeked. Never seek to the stop point.
Copy, five chapters, whispers, and the mint bar follow the PICTURE (currentTime / duration), not the wheel target.
Release the pin only when the picture arrives at 0 (up) or 1 (down). Then the host page may continue.
Opening: kick-seek 0.04 to 0, wait seeked, fade the film in.
prefers-reduced-motion: still frame at t=0 + chapter 1 only. No PSAVE.
Do NOT install gsap. Do NOT import ScrollTrigger. Do NOT restore STILL_IDLE_MS, TRACK_VH, a mode chip, or hybrid Option A.

LOOK AND FEEL:
Canvas deep night #070b12. Moon cream type #eef6f4. One mint accent #8fd0c8. Sparing soft violet #c5b8e0 on the progress gradient end only.
Display headlines: Cormorant Garamond or Playfair Display, medium weight, tracking about -0.02em, line-height about 0.94, size clamp roughly 2.6rem to 5.75rem.
Body and UI: Inter 300-500, 15-16px, cream about 72 percent opacity.
Quiet mindfulness prestige. Calm and Headspace craft language with cosmic prestige film. Not clinical white spa, not neon SaaS, not purple mesh, not Meridian estate scrub, not Elyse gold earth, not Revel pearl fashion.

LAYOUT (exact structure):
One pinned 100dvh stage, night canvas under the film. No tall spacer.
Video absolute cover, object-fit cover, under content. No intentional CSS zoom or blur on the film. No center breath circle covering the cosmos.
Dual edge scrims only (left type field + bottom vignette) so type stays legible while the center film stays clean. NEVER grey-wash the entire frame.
Top header: STILL wordmark left; desktop nav Practice, Sleep, Stress, Retreats; right Sign in (glass) + Begin free (mint solid).
Mint-to-violet progress hairline under the header (transform scaleX from PLAYHEAD, origin left, driven every tick via DOM ref).
NO mode chip. Do not add "Scroll to guide" or "Breathing with you".
Floating whisper words (one per chapter): Breathe in, Unclench, Ease, Expand, Return - soft mint when active.
Bottom content: chapter eyebrow, two-line display H1, body. Right-side chapter markers 01-05 on desktop.
Five chapters mapped to playhead bands 0-0.14, 0.14-0.34, 0.34-0.56, 0.56-0.78, 0.78-1.01:
1) Soften. / Begin again. - private practice for a louder world
2) When your mind / never lands. - short sessions, no judgment
3) Softness / is a skill. - evidence-backed minutes that hold you
4) Grow into / your quiet. - daily calm and night rest
5) Come home / to yourself. - feeling and benefits: quieter body, clearer mornings, restorative sleep. Dual CTAs Start free session + Explore programs. Three quiet stats: 10 min daily sessions, Science led programs, Live retreats and circles.
Safe horizontal padding at least about 2rem. Hide center nav under 768px. Stack CTAs on small screens.

MOTION (exact):
PSAVE chase on requestAnimationFrame. No GSAP. No ScrollTrigger.
Chapter crossfade about 0.75s cubic-bezier(0.22, 0.61, 0.36, 1) from playhead.
Progress bar scaleX every tick via ref. Chapter React state only when index changes.
Capture helper: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, productId: "MS-HERO-STIL01" }}. Root data-still-drive="psave".

TECHNICAL (you the AI implement this; the human may not be a developer):
Prefer React + TypeScript + Tailwind with one drop-in component (StillMindfulnessHero). If a files pack is available, prefer integrating source/StillMindfulnessHero.tsx over rewriting.
Video attributes: muted, playsInline, preload auto, object-fit cover, aria-hidden. No loop as primary mode.
Fonts: load Cormorant Garamond + Inter with display swap. Prefer CSS variables --font-still-display and --font-still-body with system fallbacks.
Do NOT install gsap.
Focus rings mint. Semantic section, header, nav, h1. Safe side padding so type never kisses the frame edge.
Replacement films MUST be re-encoded GOP 3, no B-frames, crf 16 (ffmpeg -g 3 -keyint_min 3 -bf 0). A long-GOP file stalls mid-reverse.

QUALITY BAR:
It should feel like a Forbes-class mindfulness product homepage - quiet, inevitable, expensive. One clear system: dual process PSAVE plus No Scroller. Never jump a frame. Never restore hybrid idle. Never burn storefront UI into the rebuild. Never reduce to wallpaper-only loop.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-STIL01",
        product="Still",
        product_line="Mindfulness Scroll Narrative Hero",
        promise=(
            "A night-sky mindfulness homepage where scroll aims a 30-second cosmic film "
            "and the picture never jumps a frame. Five soft chapters, mint craft, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: a continuous cosmic growth journey - arid desert under planets, "
            "soft greening, then lush emerald cosmos with mint-teal planet light. 30 seconds, silent. "
            "H.264 GOP 3, no B-frames, 24fps, 720 frames, 240 I-frames, about 82 MB. "
            "Optional distant figure, never as a logo. No readable text or UI. Pack also includes poster still "
            "still-cosmos-v1.webp. If you have the files zip, client film lives under assets/ as still-cosmos-v1.mp4."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 4K continuous journey, 24 to 40 seconds, 24fps, silent. "
            "ARC: (1) arid desert under vast starfield and giant planets; (2) soft greening - moss, ferns, living path; "
            "(3) lush cosmic valley, deep emerald ground, teal-cyan planets, hopeful night sky. "
            "Optional single distant figure in pale fabric, back to camera - no faces as product, no brands. "
            "CAMERA: slow elevated glide or gentle push, contemplative prestige pace. EVEN time, not a late kick. "
            "LOOK: deep night voids, mint-teal planet glow, cream moonlight edges, gentle film grain. "
            "Calm app cinema meets high-end nature documentary. Not neon cyberpunk, not corporate office meditation stock. "
            "FORBIDDEN: logos, UI, captions, watermarks, overcrowded tourist scenes, harsh teal-orange blockbuster grade, jump cuts. "
            "TECH: 16:9, 3840x2160 preferred or 1920x1080 min, silent. After export RE-ENCODE GOP 3 no B-frames: "
            "ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart still-cosmos-v1.mp4. "
            "Save as public/assets/videos/still-cosmos-v1.mp4, poster to public/assets/posters/still-cosmos-v1.webp. "
            "Keep PSAVE (12 vh aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor). Never wallpaper-only. Never hybrid idle."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name STILL to [YOUR BRAND NAME] everywhere in the design, including the top left wordmark and any aria labels."',
            ),
            (
                "Rewrite the five chapters",
                'Ask your AI: "Rewrite all five chapters (eyebrow, two title lines, body, whisper) for [MY MINDFULNESS BRAND]. Keep five playhead bands and soft non-clinical language. No medical claims. No mode chip."',
            ),
            (
                "Change nav and end CTAs",
                'Ask your AI: "Replace nav links Practice, Sleep, Stress, Retreats with [MY FOUR LINKS]. Rename Sign in, Begin free, Start free session, and Explore programs to [MY LABELS]. Keep mint primary and glass secondary pills."',
            ),
            (
                "Change stats",
                'Ask your AI: "Change the three end stats 10 min daily sessions, Science led programs, Live retreats and circles to [A], [B], [C]. Keep three max and only show them in the final chapter."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep a deep-night mindfulness look. Change canvas #070b12, cream #eef6f4, and mint #8fd0c8 to [CANVAS], [CREAM], [ACCENT]. Keep readable cream-on-night contrast. No neon primary system."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the hero film with [YOUR VIDEO LINK OR FILE NAME]. Re-encode GOP 3, no B-frames, crf 16 first. Update the poster still. Keep PSAVE: 12 viewport aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor, type-legibility edge scrims. Never wallpaper-only. Never hybrid idle."',
            ),
            (
                "Change fonts",
                'Ask your AI: "Load my display serif as --font-still-display and my UI sans as --font-still-body. Keep large two-line chapter titles and quiet body scale."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so headlines never clip, center nav links hide under 768px, CTAs stack cleanly, safe padding stays at least 2rem, and the stage stays one pinned viewport. Dual process must still hold: page does not physically scroll during the journey."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep dual process PSAVE plus No Scroller (12 vh aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor), the STILL night/mint craft, and full film duration. Do not restore gsap, a 960vh sticky track, or 5s idle free-play. Do not reduce to wallpaper-only. Do not ask me to write code."',
            ),
        ],
        opaque_id="s7i1l9m4ndf0",
        paid_salt="sk3p8w",
    )


def grokbot_spec() -> ProductSpec:
    video_file = "grokbot-sphere-v1.mp4"
    video_path = "/assets/videos/grokbot-sphere-v1.mp4"
    poster_file = "grokbot-sphere-v1.webp"
    poster_path = "/assets/posters/grokbot-sphere-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for an AI-agent product called Grok Bot.

BACKGROUND VIDEO (required):
Use this video as the full-screen Sphere film under the hero (not a small thumbnail):
{url}
If the buyer has a local files pack, use assets/{video_file} placed at public/assets/videos/{video_file} (or the path already set in source).
Poster still (while loading / reduced motion still): public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent. Dual process: PSAVE (Perfect Scroll Video Engine) plus No Scroller (pin-until-complete). NOT wallpaper-only. NOT a tall sticky track. The WHOLE film plays on scroll.

PSAVE + NO SCROLLER (non-negotiable):
One pinned 100dvh stage in normal document flow. The page does NOT physically scroll during the journey. Do not use position sticky. Do not build a tall spacer. Do not overflow-hidden the host page.
VIRTUAL_VIEWPORTS = 12 (locked: 62.5s even Sphere; two flicks on 3.6 dump dest). PSAVE_RATE = 1.2. PSAVE_FRAME = 1/25. PSAVE_REV_STRIDE = 3. PSAVE_LIVE_MS = 280. PSAVE_COAST_SEC = 0.55. PSAVE_EASE_SEC = 0.55. PSAVE_FLIP_DEADZONE_PX = 32.
Scroll aims a destination 0-1 on the 12 viewport track (raw 1:1, no wheel gain). The film PLAYS to that destination. Never seek currentTime across a jump.
DOWN: muted native play() at playbackRate 1.2. After they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases toward about 0.42. Friction, then a graceful stop. Ignore tiny opposite trackpad ticks under 32px.
UP: first real up-scroll snaps dest onto the picture. Walk currentTime backward exactly one 3-frame step (0.12s at 25fps) per seek. Wait seeked. Never seek to the stop point.
HUD CSS loops stay alive the whole time (primary sheen 12.5s, ice trip, marquee, orb spin, live dots).
Release the pin only when the picture arrives at 0 (up) or 1 (down). Then the host page may continue. After release the page owns scroll until the stage docks (top >= -2).
Opening: film starts black. Show a Scroll badge. Hide it 5 seconds after the first real scroll.
prefers-reduced-motion: still frame + HUD only. No PSAVE.
Do NOT install gsap. Do NOT import ScrollTrigger.

LOOK AND FEEL:
Ice liquid-glass on night-city Sphere. Ice type #eef4ff. Amber #f0d7a8. Mist rgba(232, 238, 248, 0.74). Frost 3-6 percent white. Primary 3D #0a0c12.
Display: Syne 800 (--font-gb-display). Body: Outfit 300-500 (--font-gb-body). Lead line-height 1.55.
Thin blur 12 on nav, proofs, ticker. Heavy blur 18 on the thread only. Saturate 210-250 percent. Ice trip --trace-at 0 to 880, hide at 890. One sheen every 12.5s.
Not neon SaaS, not purple mesh, not Optimus, not a Sphere partnership claim. The Sphere is setting only.

LAYOUT (exact structure):
One pinned 100dvh stage. Film cover, slight scale 1.04, object-position 52% 46%. Dual-edge veil. Center Sphere stays clean.
Top header: orb + Grok Bot mark; desktop nav Product, How it works, Safety, Enterprise; Sign in (ghost) + Download (small 3D primary).
Left copy: Early beta kicker + SuperGrok Heavy, three-line H1 Finish / the / swing., lead, Meet your first Bot + Download for macOS.
Right: Inbox Bot thread (heavy glass, ice trip, three messages).
Bottom: three proof cards, Sphere · Las Vegas, In flight ticker.
Safe horizontal padding at least about 2rem. Hide center nav under 768px. Stack CTAs on small screens.
Tailwind preflight: use button.gb-primary, button.gb-primary.gb-primary-sm, a.gb-mark so resets do not flatten the 3D CTA.

MOTION (exact):
PSAVE chase on requestAnimationFrame. No GSAP. No ScrollTrigger.
Capture helper: window.__msScrollNarrative = {{ setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-GROK01" }}. Root data-grokbot-drive="psave". After release data-grokbot-owns="page".

TECHNICAL (you the AI implement this; the human may not be a developer):
Prefer React + TypeScript with source/GrokBotHero.tsx, source/hero.css, and source/copy.ts. Do not rewrite the engine unless those files are missing.
Video attributes: muted, playsInline, preload auto, object-fit cover, aria-hidden. No loop as primary mode.
Fonts: load Syne 600/700/800 + Outfit 300/400/500 with display swap.
Do NOT install gsap.
Replacement films MUST be re-encoded GOP 3, no B-frames, 25fps, crf 18 (ffmpeg -g 3 -keyint_min 3 -bf 0). A long-GOP file stalls mid-reverse.

QUALITY BAR:
It should feel like a Forbes-class AI-agent product homepage - ice, inevitable, expensive. One clear system: dual process PSAVE plus No Scroller. The whole film plays. Never jump a frame. Never freeze the HUD. Never burn storefront UI into the rebuild. Never reduce to wallpaper-only loop.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-GROK01",
        product="GrokBot",
        product_line="Las Vegas Sphere Scroll Hero",
        promise=(
            "A night-city AI-agent homepage where scroll aims a Sphere-scale film "
            "and the picture never jumps a frame. Ice HUD stays alive, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: Las Vegas Sphere at blue hour and night with a white Grok Bot face "
            "on the dome, hotels, even night-city time. 62.52 seconds, silent. "
            "H.264 GOP 3, no B-frames, 25fps, 521 I-frames, 1042 P, 0 B, about 127 MB. "
            "No readable text or UI. Pack also includes poster still grokbot-sphere-v1.webp. "
            "If you have the files zip, client film lives under assets/ as grokbot-sphere-v1.mp4."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 4K continuous night-city film, 50 to 70 seconds, 25fps, silent. "
            "SUBJECT: Las Vegas Sphere at blue hour and night. A smooth white Grok Bot face "
            "(two oval eyes, no mouth) fills the dome. Surrounding hotels, desert-city lights, deep blue sky. "
            "CAMERA: elevated glide or slow push, prestige pace. EVEN time, not a late kick. "
            "LOOK: night blue, warm hotel tungsten, white dome, gentle film grain. "
            "FORBIDDEN: logos other than the dome face, UI, captions, watermarks, Optimus or any humanoid robot, "
            "title cards, partnership language, jump cuts. "
            "TECH: 16:9, 3840x2160 preferred or 1920x1080 min, silent. After export RE-ENCODE GOP 3 no B-frames: "
            "ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart grokbot-sphere-v1.mp4. "
            "Save as public/assets/videos/grokbot-sphere-v1.mp4, poster to public/assets/posters/grokbot-sphere-v1.webp. "
            "Keep PSAVE (12 vh aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor). "
            "The whole film plays. Never wallpaper-only."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name Grok Bot to [YOUR BRAND NAME] everywhere in the design, including the top left wordmark and any aria labels."',
            ),
            (
                "Rewrite headlines and lead",
                'Ask your AI: "Update the three-line title Finish / the / swing., Early beta kicker, SuperGrok Heavy, and the lead paragraph for [MY AI PRODUCT]. Keep ice / amber contrast. No partnership claims. No humanoid robot."',
            ),
            (
                "Change nav and CTAs",
                'Ask your AI: "Replace nav links Product, How it works, Safety, Enterprise with [MY FOUR LINKS]. Rename Sign in, Download, Meet your first Bot, and Download for macOS to [MY LABELS]. Keep the 3D primary and ghost secondary."',
            ),
            (
                "Rewrite proofs, thread, ticker",
                'Ask your AI: "Replace the three proof cards, the Inbox Bot thread, and the In flight ticker jobs with my product language. Keep three proofs and a short thread."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep a near-black ice look. Change ice #eef4ff, amber #f0d7a8, and primary #0a0c12 to [ICE], [AMBER], [PRIMARY]. Keep frost at 3-6 percent white. No neon primary system."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the hero film with [YOUR VIDEO LINK OR FILE NAME]. Re-encode GOP 3, no B-frames, crf 18, 25fps first. Update the poster still. Keep PSAVE: 12 viewport aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor. The whole film must play. Never wallpaper-only."',
            ),
            (
                "Change fonts",
                'Ask your AI: "Load my display sans as --font-gb-display and my UI sans as --font-gb-body. Keep heavy display and light body scale."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so headlines never clip, center nav links hide under 768px, CTAs stack cleanly, the thread does not overflow, safe padding stays at least 2rem, and the stage stays one pinned viewport. Dual process must still hold: page does not physically scroll during the journey. The whole film still plays."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep dual process PSAVE plus No Scroller (12 vh aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor), the ice HUD, and the full film duration. Do not restore gsap or a tall sticky track. Do not freeze the HUD. Do not reduce to wallpaper-only. Do not ask me to write code."',
            ),
        ],
        opaque_id="g7k0b8t4vg2n",
        paid_salt="gk4n8x",
    )


def skyspires_spec() -> ProductSpec:
    video_file = "skyspires-sunrise-v1.mp4"
    video_path = "/assets/videos/skyspires-sunrise-v1.mp4"
    poster_file = "skyspires-sunrise-v1.webp"
    poster_path = "/assets/posters/skyspires-sunrise-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a design studio called SkySpires.

BACKGROUND VIDEO (required):
Use this video as the full-screen sunrise film under the hero (not a small thumbnail):
{url}
If the buyer has a local files pack, use assets/{video_file} placed at public/assets/videos/{video_file}.
Poster: public/assets/posters/{poster_file}.
The video must be silent. Dual process: PSAVE (Perfect Scroll Video Engine) plus No Scroller (pin-until-complete). The WHOLE film plays on scroll. HUD loops stay. NOT wallpaper-only. NOT Nexora.

PSAVE + NO SCROLLER:
One pinned 100dvh stage in normal document flow. The page does NOT physically scroll during the journey.
VIRTUAL_VIEWPORTS = 12 (25.04s even sunrise). PSAVE_RATE = 1.2. PSAVE_FRAME = 1/24. PSAVE_REV_STRIDE = 3. PSAVE_LIVE_MS = 280. PSAVE_COAST_SEC = 0.55. PSAVE_EASE_SEC = 0.55. PSAVE_FLIP_DEADZONE_PX = 32.
Scroll aims destination. Film PLAYS to that destination. Never seek currentTime across a jump.
HUD CSS/interval loops stay: CTA 12.5s, dock sheen 6.4s, dock gold 12s, stats 10s then gauge, rings 2.8s, CDMX clock 15s.
Do NOT retune .lg-fill or .lg-spec on dock, CTA, Log In, or stats.
Release only when the picture arrives at 0 or 1. Then the page owns until dock (top >= -2).
Do NOT install gsap. Do NOT restore filament, colored step boxes, purple S, or Lab · hero.

LOOK AND FEEL:
Editorial frost on cinematic sunrise. Ink #f7f3ec. Gold #e8c48a / edge #f6e2a8. Peach #f0b090. Violet #8b7cff.
Display: Playfair Display 500 italic on limits. Body: Outfit 300-500.
Wordmark SKYSPIRES, no S icon. Nav: Home, About, Process (chevron), Community, News, Students, Contact. Log In right = stats right (--sky-right 3.2%).

QUALITY BAR:
Forbes-class design-studio homepage. Dual process PSAVE plus No Scroller. The whole film plays. HUD never freezes. Never restore Nexora or filament.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-SKYS01",
        product="SkySpires",
        product_line="Sunrise Scroll Hero",
        promise=(
            "A sunrise design-studio homepage where scroll aims a 25-second film "
            "and the picture never jumps a frame. Frost HUD stays alive, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: cinematic sunrise / sky architecture, 25.04 seconds, silent. "
            "H.264 GOP 3, no B-frames, 24fps, 201 I-frames, 400 P, 0 B, about 18 MB. "
            "No readable text or UI. Pack includes poster still skyspires-sunrise-v1.webp."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 4K continuous sunrise, 20 to 30 seconds, 24fps, silent. "
            "Sky architecture at first light. Warm cloud, gold rim, peach haze. EVEN time. "
            "FORBIDDEN: logos, UI, captions, watermarks, Nexora wordmark. "
            "RE-ENCODE GOP 3 no B-frames crf 18 24fps then wire as skyspires-sunrise-v1.mp4. "
            "Keep PSAVE 12 vh, 1.2x, reverse every 3rd frame, leftover dest plus 0.55s dest floor."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change SkySpires to [YOUR BRAND NAME] everywhere, including the top left wordmark."',
            ),
            (
                "Rewrite headlines",
                'Ask your AI: "Update Design / without / limits., the kicker, and the body for [MY STUDIO]. Keep the italic gradient on the last word. No Nexora."',
            ),
            (
                "Change nav and CTAs",
                'Ask your AI: "Replace nav links and rename Start Your Project / See Case Studies / Sign Up / Log In to [MY LABELS]. Keep the chevron on the Process-equivalent item only."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep frost glass. Change ink, gold, and peach/violet accents to [INK], [GOLD], [ACCENT]. Do not retune .lg-fill or .lg-spec on dock, CTA, Log In, or stats."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the hero film with [YOUR FILE]. Re-encode GOP 3, no B-frames, 24fps, crf 18 first. Keep PSAVE 12 vh. The whole film must play."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Hide center nav and stats under 820px, keep the dock readable, keep one pinned viewport. Dual process must still hold."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep dual process PSAVE plus No Scroller, frost HUD, and full film duration. Do not restore filament, gsap, or Nexora. Do not ask me to write code."',
            ),
        ],
        opaque_id="s4y8p1r3sk7n",
        paid_salt="sk5n2q",
    )


def bloom_spec() -> ProductSpec:
    video_file = "luna-yoga-v1.mp4"
    video_path = "/assets/videos/luna-yoga-v1.mp4"
    poster_file = "luna-yoga-v1.webp"
    poster_path = "/assets/posters/luna-yoga-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website hero for a kids and teen girls yoga course + app brand called BLOOM.

BACKGROUND VIDEO (required):
Use this video as the full-screen class film under the hero (not a small thumbnail):
{url}
If the buyer has a local files pack, use assets/{video_file} placed at public/assets/videos/{video_file} (or the path already set in source).
Poster still (while loading / reduced motion still): public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent. It MUST free-play as a muted looping class film (autoPlay, muted, loop, playsInline). Scroll does NOT control video time. NEVER set video.currentTime from scroll. Optional desktop-only light scale parallax on the film WRAPPER only (scale about 1 to 1.05), never on the timeline.

LOOK AND FEEL:
Canvas warm paper #fff8f5. Ink type #2a2438. Lilac accent #c4a8e8. Peach solid CTA #ffb5a7. Kids butter pill #ffe8a3. Teens soft mint #b8e0d2.
Display and UI: Plus Jakarta Sans (or equal soft geometric), medium-semibold weight, tracking slightly tight on H1, line-height about 0.95, size clamp roughly 2.4rem to 5rem.
Body 15-16px, ink about 72 percent opacity.
Cream glass (paper about 72 percent + blur about 28px) for secondary controls and the age path. Full pills (radius 9999px). Soft shadows.
Soft kids education prestige meets beauty-commerce warmth. Belonging class energy. Not adult dark spa, not neon cyber yoga, not emoji kids junk, not body-shame fitness, not STILL night hybrid scrub, not espresso travel wallpaper.

LAYOUT (exact structure):
Full viewport hero (100dvh / min-h 100dvh), overflow hidden, warm paper canvas under the film.
Video absolute cover, object-fit cover, under content.
Dual paper gradients over the film so type stays legible: left paper type field, bottom vignette, soft lilac rim glow at lower right. NEVER grey-wash the entire frame.
Fixed top nav: flower mark (lucide Flower2 or equal) + BLOOM wordmark left; desktop center links Classes, App, Ages, Stories; right: Sign in (glass pill) + Get the app (solid peach pill).
Content grid: left column about 6-7 of 12 cols on desktop, vertically centered or bottom-aligned on small screens, safe horizontal padding at least about 2rem:
- Age path tablist Kids | Teens (glass pill; active kids uses butter fill, active teens uses soft mint fill)
- Badge (soft micro): Kids "For girls 7-12" / Teens "Course + app for teens"
- H1 two lines Plus Jakarta: Kids "Soft strength. / Big smiles." · Teens "Your calm. / Your circle."
- Body paragraph matching the active path
- Dual CTAs: primary free class (peach solid) + secondary get/download app (glass)
- Module chips with minutes (four per path); selecting a chip updates the phone card
- Quiet proof stats: 120+ interactive classes · 7-17 ages welcome · 10 min starter flows
- Parent trust line: Made for girls. Easy for parents to start.
Right column desktop: soft cream phone card showing active module title, minutes, and path meta (Kids/Teens).
Hide center nav under 768px. Stack CTAs on small screens. Disable film parallax under 768px. Touch targets at least 44px.

KIDS PATH DEFAULT COPY:
Badge For girls 7-12. H1 Soft strength. / Big smiles. Body: Short classes you can finish. Breathe, stretch, and feel proud in your own body. Whisper Join the circle. CTAs Start free class · Get the app. Modules Breathe 5, Stretch 8, Animal flows 10, Wind-down 7. Phone app title Morning stretch circle · 8 min · Kids.

TEENS PATH COPY:
Badge Course + app for teens. H1 Your calm. / Your circle. Body: Flows for busy school days, soft nights, and real confidence. No judgment. Just show up. Whisper Come as you are. CTAs Join free · Download app. Modules Focus 8, Flow 15, Soft strength 12, Sleep wind-down 10. Phone app title After-school reset · 12 min · Teens.

MOTION (exact):
Staggered entrance fade/up with ease [0.25, 0.46, 0.45, 0.94] about 0.7s for badge, titles, body, CTAs, modules, phone card.
Age path toggle crossfades the copy stack about 0.35s while the film keeps free-playing.
Module select updates phone card without stopping the film.
Desktop only: GSAP ScrollTrigger scales the film wrap 1 to 1.05, scrub about 1.2, start top top, end bottom top. Film time stays free-play loop.
prefers-reduced-motion: opacity-only or static entrance, no parallax, video paused on poster still.

TECHNICAL (you the AI implement this; the human may not be a developer):
Prefer React + TypeScript + Tailwind with one drop-in component (BloomYogaHero). If a files pack is available, prefer integrating source/BloomYogaHero.tsx over rewriting.
Video attributes: muted, playsInline, autoPlay, loop, preload auto, object-fit cover, aria-hidden.
IntersectionObserver: pause when off-screen, play when visible.
Fonts: load Plus Jakarta Sans with display swap. Prefer CSS variables --font-bloom-display and --font-bloom-body with system fallbacks.
Install when needed: framer-motion, gsap (+ ScrollTrigger), lucide-react.
Focus rings lilac. Semantic section, header, nav, h1, role=tablist for age path. Safe side padding so type never kisses the frame edge.
Soft-power language only. No body shame. No medical claims. No competitor brand names in UI.

QUALITY BAR:
It should feel like a Forbes-class kids wellness product homepage - soft, inevitable, expensive, impossible not to join. One clear system: free-play belonging class film + Kids/Teens path restage + peach craft. Never scrub the film. Never burn storefront UI into the rebuild. Never adult night spa.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-BLOM01",
        product="Bloom",
        product_line="Kids & Teen Girls Yoga Course Hero",
        promise=(
            "A sunlit kids and teen girls yoga homepage where a living class film free-plays "
            "under a Kids/Teens course path, modules, and app CTAs. Soft paper craft, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: a sunlit multi-girl stylized yoga class in a bright white studio, "
            "diverse characters, rainbow mats, belonging circle energy. About 45 seconds, silent, seamless loop feel. "
            "No logos, no UI, no readable text. Pack also includes poster still luna-yoga-v1.webp. "
            "If you have the files zip, client film lives under assets/ as luna-yoga-v1.mp4."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 4K seamless loop, 20 to 50 seconds, 24fps film feel, no audio. "
            "SUBJECT: Stylized diverse girls in a bright sunlit yoga class studio. Belonging circle energy, rainbow mats, "
            "soft white walls, warm daylight. Multi-girl class, not a single adult spa model. Soft natural poses, "
            "age-inclusive kid-to-teen energy (stylized, never creepy, never body-shame). "
            "CAMERA: Slow elevated glide or gentle orbit around the circle, locked prestige pace. One continuous move preferred. "
            "LOOK: Warm paper and cream highlights, lilac soft fill, peach sun edge. Clean beauty-commerce grade. "
            "Not neon cyber yoga, not dark spa, not clinical gym fluorescent. "
            "FORBIDDEN: logos, UI, captions, watermarks, brand names, adult dark spa only, empty mat only, body-shame fitness energy. "
            "TECH: 16:9, 3840x2160 preferred or 1920x1080 minimum, silent. Seamless loop: end frame compositionally matches start. "
            "After export: save as public/assets/videos/luna-yoga-v1.mp4, poster to public/assets/posters/luna-yoga-v1.webp, "
            "keep muted free-play loop, never scrub video.currentTime with scroll, keep type-legibility paper scrims."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name BLOOM to [YOUR BRAND NAME] everywhere in the design, including the top left wordmark and any aria labels."',
            ),
            (
                "Rewrite Kids and Teens paths",
                'Ask your AI: "Rewrite the Kids path (badge, two title lines, body, whisper, CTAs, four modules with minutes) and the Teens path the same way for [MY YOGA BRAND]. Keep soft-power language. No body shame. No medical claims."',
            ),
            (
                "Change nav and CTAs",
                'Ask your AI: "Replace nav links Classes, App, Ages, Stories with [MY FOUR LINKS]. Rename Sign in, Get the app, and both path primary/secondary CTAs to [MY LABELS]. Keep peach primary and glass secondary pills."',
            ),
            (
                "Change modules and phone card",
                'Ask your AI: "Change the four Kids modules and four Teens modules (label + minutes) and the phone card titles/meta to [MY CLASS LIST]. Keep four modules per path and phone card update on chip select."',
            ),
            (
                "Change stats and parent line",
                'Ask your AI: "Change the three stats 120+ interactive classes, 7-17 ages welcome, 10 min starter flows to [A], [B], [C]. Change the parent trust line to [PARENT LINE]. Keep three stats max."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep a warm paper kids wellness look. Change paper #fff8f5, ink #2a2438, lilac #c4a8e8, and peach #ffb5a7 to [PAPER], [INK], [ACCENT], [CTA]. Keep readable ink-on-paper contrast. No neon primary system."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the hero class film with [YOUR VIDEO LINK OR FILE NAME] and update the poster still. Keep muted free-play loop, object-fit cover, and type-legibility paper scrims. Never scrub video.currentTime with scroll."',
            ),
            (
                "Change fonts or mark",
                'Ask your AI: "Load my soft geometric sans as --font-bloom-display and --font-bloom-body. Swap the flower icon for [MY MARK]. Keep large two-line H1 scale."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve the mobile layout so headlines never clip, center nav links hide under 768px, CTAs stack cleanly, phone card stacks under content, safe padding stays at least 2rem, and film parallax is off under 768px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep free-play muted class film loop, Kids/Teens path restage, dual CTAs, soft paper/lilac craft. Do not scrub video.currentTime. Do not ask me to write code."',
            ),
        ],
        opaque_id="b1o0m7y0g4k2",
        paid_salt="bm4k8p",
    )


def verve_spec() -> ProductSpec:
    video_file = "verve-presence-v1.mp4"
    video_path = "/assets/videos/verve-presence-v1.mp4"
    poster_file = "verve-presence-v1.webp"
    poster_path = "/assets/posters/verve-presence-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport creator social platform hero (VERVE SOCIAL).

BACKGROUND VIDEO (required):
Use this video as the hero film:
{url}
If the buyer has a local files pack, use assets/{video_file} at public/assets/videos/{video_file}.
Poster: public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent for muted autoplay. Free-play muted loop. NEVER set video.currentTime from scroll.

LOOK AND FEEL:
Canvas plum-ink #1A0A14. Cream type #FDF7FA. Hot rose #EC4899. Amber #F59E0B.
Syne or Clash Display 800 for headlines, Inter for body.
Premium Gen-Z / creator social night - belonging and presence. Not Motionsites cyan kit, not TikTok sticker kitsch, not cyberpunk rain city.

LAYOUT AND MOTION (exact):
Full viewport 100dvh hero.
Film absolute cover under left/bottom plum scrims for type legibility.
Top: VERVE wordmark + nav Feed People Live Join + Sign in / Join free.
Left lockup: badge New creator social, H1 BE PRESENT. then rose line BE TOGETHER., body, dual CTAs Join free + See how it works, proof rail.
Bottom: infinite horizontal social marquee (CSS transform, synthetic tokens only, no competitor brands).
Desktop only: film wrap scale 1 to 1.06 with ScrollTrigger scrub 1.2. Off mobile.
prefers-reduced-motion: poster still, static marquee row, no parallax.
Touch targets at least 44px.

COPY DEFAULTS (restage freely; no em dashes; no competitor brands):
H1: BE PRESENT. / BE TOGETHER.
Body: nights out, small circles, people who make your week feel alive - not ads dressed as friends.
Marquee examples: #nightsout · @crew · live now · your people · stay late · real faces · soft chaos · belong.
CTA: Join free.

TECHNICAL:
Prefer React + TypeScript + Tailwind with VerveSocialHero drop-in from source/.
Install framer-motion, gsap, lucide-react.
Fonts: Syne + Inter with CSS variables --font-verve-display and --font-verve-body.
Video: muted playsInline autoPlay loop preload auto object-fit cover.
IntersectionObserver pause when off-screen. Kill ScrollTrigger on unmount.

QUALITY BAR:
Funded creator-social launch night. Bold, warm, human. Never scroll-scrub film. Never burn UI into the client film.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-VERV01",
        product="VerveSocial",
        product_line="Creator Social Platform Hero",
        promise=(
            "A plum-night culture film free-plays under bold presence type and an infinite "
            "community marquee. Rebuild the lockup, marquee tokens, and film until every "
            "pixel reads as your brand alone."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: human presence / social culture cinema for a muted autoplay hero. "
            "About 15 seconds, silent MP4 loop. No competitor logos or UI. Pack includes poster still "
            "verve-presence-v1.webp. If you have the files zip, client film lives under assets/ as verve-presence-v1.mp4."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 16:9 silent loop, 15-30s, 24fps. Premium Gen-Z social culture energy, "
            "plum shadows, rose and amber practicals, human presence, large dark voids for type. "
            "No UI captions, no hashtags burned into frame, no cyberpunk rain city. "
            "After export: public/assets/videos/verve-presence-v1.mp4 and poster webp. Keep muted free-play; never scrub with scroll."
        ),
        customize=[
            (
                "Change brand name",
                'Ask your AI: "Change VERVE wordmark and Join free CTA to [MY APP] and [MY CTA]. Keep plum night + rose energy."',
            ),
            (
                "Rewrite social copy",
                'Ask your AI: "Rewrite BE PRESENT / BE TOGETHER, body, marquee tokens, and proof for [MY COMMUNITY BRAND]. No competitor names. No em dashes."',
            ),
            (
                "Swap the film",
                'Ask your AI: "Use my MP4 as the hero film at public/assets/videos/verve-presence-v1.mp4 with a matching poster. Keep muted free-play. Never scrub with scroll."',
            ),
            (
                "Colors",
                'Ask your AI: "Change canvas #1A0A14, rose #EC4899, amber #F59E0B to my tokens. No cyan Motionsites primary."',
            ),
        ],
        paid_salt="vs7k2m",
        opaque_id="v3rv3s0c1al",
    )


def orbit_spec() -> ProductSpec:
    video_file = "orbit-vault-v1.mp4"
    video_path = "/assets/videos/orbit-vault-v1.mp4"
    poster_file = "orbit-vault-v1.webp"
    poster_path = "/assets/posters/orbit-vault-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport trustworthy neobank hero (ORBIT FINANCE).

BACKGROUND VIDEO (required):
Use this video as the hero film:
{url}
If the buyer has a local files pack, use assets/{video_file} at public/assets/videos/{video_file}.
Poster: public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent for muted autoplay. Free-play muted loop. NEVER set video.currentTime from scroll.

LOOK AND FEEL:
Canvas vault navy #0B1426. Cream type #F7F4EC. Orbit gold #C9A84C.
DM Serif Display for headlines, Inter for body.
Premium modern private-bank / neobank night - trust and elevation. Not Motionsites cyan kit, not crypto neon, not inverted city gimmick.

LAYOUT AND MOTION (exact):
Full viewport 100dvh hero.
Film absolute cover under left/bottom navy scrims for type legibility.
Signature gold orbital ring (SVG UI geometry, slow rotate ~64s) on the right - never burned into film.
Top: ORBIT wordmark + nav Products Wealth Cards Security + Open account.
Left lockup: badge Trusted globally Private by design, H1 Money, elevated., lead, dual CTAs Open account + How it works, proof rail.
Optional soft card plate lower-right with no PAN or numbers.
Desktop only: film wrap scale 1 to 1.05 with ScrollTrigger scrub 1.2. Off mobile.
prefers-reduced-motion: poster still, static ring, no parallax.
Touch targets at least 44px.

COPY DEFAULTS (rebrand freely; no em dashes; no guaranteed returns):
H1: Money, elevated.
Lead: Banking without borders. Multi-currency wealth, quiet control, and a vault that never shouts.
CTA: Open account.
Proof: 2M+ clients · 140 currencies · Bank-grade encryption (placeholders).

TECHNICAL:
Prefer React + TypeScript + Tailwind with OrbitFinanceHero drop-in from source/.
Install framer-motion, gsap, lucide-react.
Fonts: DM Serif Display + Inter with CSS variables --font-orbit-display and --font-orbit-body.
Video: muted playsInline autoPlay loop preload auto object-fit cover.
IntersectionObserver pause when off-screen. Kill ScrollTrigger and ring tween on unmount.

QUALITY BAR:
Forbes-grade digital bank shortlist energy. Calm, solvent, expensive. Never scroll-scrub film. Never burn UI into the client film.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ORBI01",
        product="OrbitFinance",
        product_line="Trustworthy Premium Neobank Hero",
        promise=(
            "A navy vault film free-plays under DM Serif money type and a gold orbital ring. "
            "Rebuild every line and token until the stage is unmistakably your bank."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: elevated wealth architecture / private-bank atmosphere for a muted autoplay hero. "
            "About 15 seconds, silent MP4 loop. No competitor logos, charts with numbers, or UI. Pack includes poster still "
            "orbit-vault-v1.webp. If you have the files zip, client film lives under assets/ as orbit-vault-v1.mp4."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 16:9 silent loop, 15-28s, 24fps. Premium private-bank / neobank vault energy, "
            "deep navy shadows, orbit gold practicals, architecture and quiet wealth light, large dark voids for type. "
            "No UI captions, no charts with numbers, no crypto neon. "
            "After export: public/assets/videos/orbit-vault-v1.mp4 and poster webp. Keep muted free-play; never scrub with scroll."
        ),
        customize=[
            (
                "Change brand name",
                'Ask your AI: "Change ORBIT wordmark and Open account CTA to [MY BANK] and [MY CTA]. Keep navy vault + gold energy."',
            ),
            (
                "Rewrite banking copy",
                'Ask your AI: "Rewrite Money, elevated., lead, badge, and proof for [MY NEOBANK BRAND]. No guaranteed returns. No em dashes."',
            ),
            (
                "Swap the film",
                'Ask your AI: "Use my MP4 as the hero film at public/assets/videos/orbit-vault-v1.mp4 with a matching poster. Keep muted free-play. Never scrub with scroll."',
            ),
            (
                "Colors",
                'Ask your AI: "Change canvas #0B1426, gold #C9A84C, cream #F7F4EC to my tokens. No cyan Motionsites primary. No crypto neon."',
            ),
        ],
        paid_salt="ob7k3n",
        opaque_id="o4b1tv4ult",
    )


def acne_spec() -> ProductSpec:
    video_file = "acne-secret-v1.webm"
    video_path = "/assets/videos/acne-secret-v1.webm"
    poster_file = "acne-secret-v1.webp"
    poster_path = "/assets/posters/acne-secret-v1.webp"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport HVCO lead-capture hero for a private clear-skin / anti-acne cream brand (brand name locked until email).

BACKGROUND VIDEO (required):
Use this video as the hero film:
{url}
If the buyer has a local files pack, use assets/{video_file} at public/assets/videos/{video_file}.
Poster: public/assets/posters/{poster_file} (or {WEBSITE_URL}{poster_path}).
The video must be silent for muted autoplay. Free-play muted loop. NEVER set video.currentTime from scroll.

LOOK AND FEEL:
Canvas near-black #070708. Cream type #f4f1ea. Gold signal #f5c518.
Inter (or equal bold geometric sans). Direct-response prestige - Sabri Suby / King Kong soft HVCO energy, not pastel spa, not neon SaaS mesh.
Private briefing micro header. News-style WARNING headline. Gold solid CTA.

LAYOUT AND MOTION (exact):
Full viewport 100dvh hero.
Phase A (0 to 15 seconds wall/video clock): film centered at about 50 percent viewport width, rounded premium frame, dark frosted blur plate behind the film (transparent dark + backdrop blur). Optional gold progress hairline filling to dock.
Phase B (after 15s): film eases moderately to the left (~44 percent width). Lead stack docks on the right: eyebrow Breaking clear skin market, WARNING H1, body, three value bullets, first name + email fields, CTA Unlock the brand name free, short privacy line.
Brand name must stay hidden until valid email submit, then reveal (demo brand may be labeled synthetic).
prefers-reduced-motion: docked layout immediately.
Mobile: stacked film top + form below, still one hero.
Touch targets at least 44px.

COPY DEFAULTS (restage freely; no medical cure claims; no body shame; no em dashes):
H1: WARNING: The clear-skin brand they hide from you is not on the shelf label.
Body: hope marketing reframe + free Private Clear Skin Brief + brand unlock via email.
Bullets: brand name shelves will not print free; Private Clear Skin Brief tactical not fluff; how the quiet protocol reaches them.
CTA: Unlock the brand name free.

TECHNICAL:
Prefer React + TypeScript + Tailwind with AcneSecretHero drop-in from source/.
Install framer-motion, lucide-react.
Fonts: Inter with CSS variables --font-acne-display and --font-acne-body.
Video: muted playsInline autoPlay loop preload auto object-fit cover.
IntersectionObserver pause when off-screen.
Optional QA event ms-acne-force-dock to force dock phase.

QUALITY BAR:
Forbes-class private briefing meets direct-response HVCO squeeze. Sell the opt-in, not the whole catalog. No cure claims. No brand leak before email.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ACNE01",
        product="AcneSecret",
        product_line="Private Clear Skin HVCO Hero",
        promise=(
            "A cinematic private clear-skin lead page where the film holds, then docks into "
            "a brand-reveal opt-in. Direct-response prestige, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: premium clear-skin / skincare ritual cinema suitable for a muted autoplay hero. "
            "About 45 seconds, silent WebM loop feel. No competitor logos or UI. Pack includes poster still "
            "acne-secret-v1.webp. If you have the files zip, client film lives under assets/ as acne-secret-v1.webm."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic ultra-premium 16:9 silent loop, 20-50s, 24fps. Premium clear-skin ritual energy, "
            "soft clinical luxury light, optional product vessel without competitor brands. "
            "No medical gore, no body-shame montage, no UI captions. "
            "After export: public/assets/videos/acne-secret-v1.webm and poster webp. Keep muted free-play; never scrub with scroll."
        ),
        customize=[
            (
                "Change the unlock brand name",
                'Ask your AI: "Change the unlock brand AETHERA CLEAR to [YOUR BRAND]. Keep it hidden until email submit. Remove synthetic demo labels if this is a real product."',
            ),
            (
                "Rewrite HVCO copy",
                'Ask your AI: "Rewrite the WARNING headline, body, three bullets, and CTA for [MY SKINCARE BRAND]. Keep news-style cadence. No medical cure claims. No body shame."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep near-black prestige. Change canvas #070708, cream #f4f1ea, and gold #f5c518 to [CANVAS], [CREAM], [ACCENT]."',
            ),
            (
                "Use a different film",
                'Ask your AI: "Replace the hero film with [FILE] and update the poster. Keep muted free-play, 15s cinema hold, then left dock. Never scrub video.currentTime with scroll."',
            ),
            (
                "Change cinema timing",
                'Ask your AI: "Change CINEMA_S from 15 to [8|12|20]. Keep moderate dock ease. Never bind scroll to film time."',
            ),
            (
                "Wire a real form backend",
                'Ask your AI: "On submit, POST name and email to [MY ESP OR WEBHOOK] and keep the unlock UI success state."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Keep stacked film + form on small screens, 44px targets, readable type, and brand locked until email."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep free-play muted film, 15s cinema hold, left dock + lead form, brand until email. No cure claims. Do not ask me to write code."',
            ),
        ],
        opaque_id="a0cne7s3cr3t",
        paid_salt="ac8k2n",
    )


def zero_spec() -> ProductSpec:
    # Client media is the 3D range pack (GLB + six labels + HDRI), not a bg-film SKU.
    # Never point PDF video_path at storefront *-preview* (PRODUCT_PACKAGE 8F.2).
    video_file = "can.glb"
    video_path = "/assets/zero-energy/webgl/can.glb"
    design = f"""
Build a premium full-page website GALLERY for a beverage or physical product family called Zero Energy (buyer will rebrand).

This is a 3D RANGE GALLERY. The difference is the lineup. Six labeled vessels share one dark stage. Visitors grab the can they want and turn the whole range by hand. Scroll then opens flavor, four proof beats, a hard closer, the pack, and FAQ. One piece does hero and landing page.

CLIENT MEDIA (required - in the product files zip, not a background film):
Place pack assets under public/assets/zero-energy/ with the same folder names:
- webgl/can.glb, webgl/base.glb, webgl/hdri2.hdr
- textures/ six flavor label WebP files (source order must match data/flavors.ts)
- img/zero-energy_logo.webp (the italic Z cut is designed - do not redraw it)
- fonts/ Geist + Franklin Gothic ATF Black Italic woff2
- audio/ UI mp3s
- css/ gallery sheets
If the user has the files zip, copy assets/ onto public/assets/zero-energy/ and use source/ as written.
This product has no looping hero film. Do not invent a background video.

LOOK AND FEEL:
Pure black canvas #000. Geist for UI. Franklin Gothic ATF Black Italic for display. Local fonts only.
Six flavor color pairs drive lights, pager, and HUD.
Private tasting room x editorial beverage launch. Not SaaS glass. Not a photo slider. Not a single-can hero.

SIGNATURE A - 3D RANGE CAROUSEL:
Raw Three 0.161.0 (exact). No React Three Fiber. No drei. Do not bump Three.
Six cans. Spacing 3.5. Camera FOV 20. Grab + arrows + liquid pager stay in sync.

SIGNATURE B - PIN-UNTIL-COMPLETE CLOCK:
Lenis infinite true, autoRaf false. Lenis scroll seeks the GSAP timeline.
NOT ScrollTrigger.scrub. NOT a tall multi-vh sticky page.
The stage stays pinned. Wheel / trackpad / touch drive virtual progress.
When this is the whole site, Lenis owns the document.
When embedded in a longer page, pin until the closer chapter finishes, then release.

SIGNATURE C - STORY CHAPTERS (in this order):
1) 3D can carousel
2) Flavor profile for the active can
3) Four benefit beats
4) ZERO BULLSHIT mark
5) Packshot
6) Nine FAQ
7) Closer
Contact is an in-page jump to #FAQ. No outbound URLs. No emails.

MOTION:
Flavor HUD: SplitText line mask, stagger 0.08s, duration 0.7s, ease power3.out.
Benefits: same SplitText band, stagger 0.05-0.2s.
FAQ: height + opacity about 0.35s power2.out.
prefers-reduced-motion: settle on chapter 1, readable cans, no timeline thrash.

LAYOUT:
Full viewport immersive page. Nav: logo + Gamme / Benefices / FAQ.
Safe side padding so type never touches the edges. Touch targets at least 44px.
No site header/footer required inside the component.

TECHNICAL:
React + TypeScript. three@0.161.0 exact. lenis@^1.3.0. gsap@^3.13.0 + ScrollTrigger + real SplitText.
Prefer pack source: ZeroEnergyGallery.tsx, CanGallery.tsx, webgl-scene.js, hud-init.ts, flavors.ts, copy.ts.
Isolate this Three from any host three@0.185 or R3F.
Dispose WebGL, composer, textures, and animation frame on unmount.

CUSTOMIZATION LAW:
Every visible string, the six labels, the logo, flavor tokens, mesh, and FAQ must be easy to replace.
After the default builds, the buyer will tell their AI to restage brand, labels, and copy until a stranger knows it is theirs.

QUALITY BAR:
It should feel like opening a private tasting of a range: one stage, a living lineup, a hand that chooses, then a scroll that earns the proof. Not a template carousel. Not a single hero can. Not a tall sticky page.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ZERO01",
        product="ZeroEnergy",
        product_line="3D Range Gallery Hero",
        promise=(
            "A private tasting of your range: six vessels on one 3D stage you turn by hand, "
            "then a scroll that earns the proof. Restage every can until it could only be yours."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is the 3D range pack in the files zip (can mesh, six labels, HDRI, fonts). "
            "This is not a background-film product. Use the files zip, not a storefront recording."
        ),
        shared_design=design,
        video_gen=(
            "This product does not require a looping background film. "
            "If generating new can labels: six high-resolution wrap maps, same UV layout, no watermarks, "
            "no website chrome. Or replace the GLB and six labels with the buyer's product family."
        ),
        customize=[
            (
                "Replace the six labels",
                'Ask your AI: "Replace the six can labels with my product art under public/assets/zero-energy/textures/. Update canLabels in webgl-scene.js. Keep six items in the same order as data/flavors.ts."',
            ),
            (
                "Rename the flavors",
                'Ask your AI: "Replace FLAVORS in data/flavors.ts with my six products (id, two-line title, desc, primary hex, secondary hex). Rewrite every Zero Energy sentence into my brand voice."',
            ),
            (
                "Swap the logo",
                'Ask your AI: "Replace zero-energy_logo.webp with my logo. Keep the navbar lockup. Do not redraw letter geometry unless I ask. Update the aria-label to my brand name."',
            ),
            (
                "Rewrite proof and FAQ",
                'Ask your AI: "Rewrite BENEFITS, FAQ, and CLOSER in data/copy.ts for [MY BRAND]. Keep four benefit beats and nine FAQ. Contact still jumps to #FAQ. No outbound links."',
            ),
            (
                "Change colors",
                'Ask your AI: "Keep the black canvas. Change each flavor primary/secondary pair in data/flavors.ts to [MY HEX PAIRS]. Keep type readable on #000."',
            ),
            (
                "Use my own can mesh",
                'Ask your AI: "Replace webgl/can.glb with my GLB. Keep UV layout compatible with the six labels, or remake the labels to match. Keep Three at 0.161.0."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Compress the HUD on small screens, keep 44px targets, touch-drag the carousel, and keep the stage pinned. No horizontal overflow at 320px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep six cans on one 3D stage, Lenis seeking the timeline, pin-until-complete, Three 0.161.0, no React Three Fiber. Do not ask me to write code."',
            ),
        ],
        opaque_id="q8w3n6k2xm5r",
        paid_salt="n4k8p2",
        media_kind="pack",
    )


PRODUCTS = [
    meridian_spec(),
    aether_spec(),
    vertex_spec(),
    neon_spec(),
    lumina_spec(),
    terra_spec(),
    apex_spec(),
    revel_spec(),
    prism_spec(),
    folio_spec(),
    mirage_spec(),
    sable_spec(),
    axiom_spec(),
    elyse_spec(),
    nexus_spec(),
    helix_spec(),
    actually_spec(),
    roadster_spec(),
    lineup_spec(),
    studio_spec(),
    phobia_spec(),
    dopamine_spec(),
    nomad_spec(),
    still_spec(),
    grokbot_spec(),
    skyspires_spec(),
    bloom_spec(),
    acne_spec(),
    verve_spec(),
    orbit_spec(),
    zero_spec(),
]


def prompt_for_tool(spec: ProductSpec, tool: str) -> str:
    openers = {
        "Cursor": (
            "You are building production UI in my coding editor (Cursor). "
            "Create the files I need and keep the solution clean and complete.\n\n"
        ),
        "Claude": (
            "You are my coding assistant. Build a complete, production-ready solution I can use. "
            "Explain briefly what you created after you finish, in plain language.\n\n"
        ),
        "Grok Build": (
            "Build this as a complete, production-ready web section in Grok Build. "
            "Prefer a single polished component or page I can run immediately.\n\n"
        ),
        "Lovable": (
            "Build this as a complete page in Lovable. I am not a professional programmer. "
            "You handle all technical setup, libraries, and layout. Show me a working preview.\n\n"
        ),
        "Codex / ChatGPT": (
            "You are Codex / ChatGPT acting as my coding agent. Build a complete, production-ready "
            "web section or page. Create clear files, install what you need, and leave me a working result. "
            "Explain briefly what you built in plain language when finished.\n\n"
        ),
        "Bolt": (
            "Build this as a complete page in Bolt. I am not a professional programmer. "
            "You handle all technical setup, libraries, and layout. Show me a working preview.\n\n"
        ),
        "Your Smart AI Agent": (
            "You are my smart AI agent. I may not be a professional programmer. "
            "Build a complete, production-ready website hero from the brief below. "
            + (
                "You choose the stack that works in my environment, create every file, "
                + (spec.pack_agent_use or "use the 3D pack files, ")
                if spec.media_kind == "pack"
                else "You choose the stack that works in my environment, create every file, wire the background video, "
            )
            + "and deliver a polished preview. Do not leave steps for me that require writing code. "
            "When finished, explain in plain English how I view and share the result.\n\n"
        ),
    }
    if spec.media_kind == "pack":
        closer = spec.pack_closer or (
            f"\n\nWhen done: I should see the full {spec.product} 3D range gallery from the files zip "
            "(six cans on one pinned stage). Do not add a looping background film. "
            "If something is missing, fix it without asking me for code knowledge."
        )
    else:
        closer = (
            f"\n\nWhen done: I should see the full {spec.product} experience with the background video linked above "
            "and every layout requirement above. "
            "If something is missing, fix it without asking me for code knowledge."
        )
    default = (
        "You are my AI coding assistant. Build a complete, production-ready solution I can use. "
        "Handle all technical work. Explain briefly in plain language when finished.\n\n"
    )
    return no_em(openers.get(tool, default) + spec.shared_design + closer)


def chunk_text_lines(c, text, first_n, later_n):
    all_lines: list[str] = []
    for raw in text.splitlines():
        raw = no_em(raw)
        if not raw.strip():
            all_lines.append("")
            continue
        all_lines.extend(wrap(c, raw, "Helvetica", 8.0, CW - 20))
    pages, i, n = [], 0, first_n
    while i < len(all_lines):
        pages.append(all_lines[i : i + n])
        i += n
        n = later_n
    return pages or [[""]]


def draw_cover(c, spec: ProductSpec, page, total):
    page_bg(c)
    corner_x, corner_y = ML, H - MT + 4
    set_stroke(c, GOLD, 0.65, a=0.55)
    c.line(corner_x, corner_y, corner_x + 40, corner_y)
    c.line(corner_x, corner_y, corner_x, corner_y - 40)
    brand_x = ML + 10
    draw_wordmark(c, brand_x, H - MT - 34, max_w=CW * 0.62, start_size=46, min_size=22)
    c.setFont("Helvetica", 9)
    set_fill(c, CREAM_DIM)
    c.drawString(brand_x, H - MT - 50, WEBSITE)

    y = H - 3.05 * inch
    c.setFont("Helvetica", 9)
    set_fill(c, GOLD)
    c.drawString(ML, y, "YOUR PRODUCT PACKAGE")
    y -= 28
    size = fit_font_size(c, spec.product, "Helvetica-Bold", CW, 34, 18)
    c.setFont("Helvetica-Bold", size)
    set_fill(c, CREAM)
    c.drawString(ML, y, spec.product)
    y -= 22
    c.setFont("Helvetica", 13)
    set_fill(c, CREAM_DIM)
    c.drawString(ML, y, spec.product_line)
    y -= 16
    set_stroke(c, GOLD, 0.7, a=0.45)
    c.line(ML, y, ML + 1.4 * inch, y)
    y -= 22
    y = para(c, spec.promise, ML, y, CW * 0.95, size=11, leading=15, color=CREAM_DIM)

    y = 2.35 * inch
    c.setFillColorRGB(0.12, 0.11, 0.10)
    c.roundRect(ML, y - 8, CW, 88, 8, fill=1, stroke=0)
    set_stroke(c, GOLD, 0.9, a=0.55)
    c.roundRect(ML, y - 8, CW, 88, 8, fill=0, stroke=1)
    c.setFont("Helvetica", 8)
    set_fill(c, GOLD)
    c.drawString(ML + 14, y + 62, "WHAT IS INSIDE")
    set_fill(c, CREAM)
    inside = (
        spec.pack_inside
        or [
            "Your 3D rebuild files (cans, labels, fonts) in the files zip",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to restage labels, copy, and colors",
        ]
        if spec.media_kind == "pack"
        else [
            "Your background video link (and how to use the file)",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to customize text, colors, and the video look",
        ]
    )
    for i, t in enumerate(inside):
        line = no_em("·  " + t)
        s = 10
        while s > 7.5 and c.stringWidth(line, "Helvetica", s) > CW - 28:
            s -= 0.3
        c.setFont("Helvetica", s)
        c.drawString(ML + 14, y + 42 - i * 16, line)

    c.setFont("Helvetica", 8)
    set_fill(c, CREAM_DIM)
    c.drawString(ML, 1.05 * inch, "You do not need to know how to program. Your AI does the technical work.")
    c.drawString(ML, 0.88 * inch, WEBSITE)
    footer(c, page, total)


def draw_easy_start(c, spec: ProductSpec, page, total):
    page_bg(c)
    y = header(c, "Start here (about 10 minutes)", "01  ·  Easy path")
    y = para(
        c,
        "Follow these steps in order. If you get stuck, paste the error message into the same AI and ask it to fix the project for you.",
        ML,
        y,
        CW,
        size=10.5,
        leading=14,
        color=CREAM,
    )
    y -= 12
    if spec.media_kind == "pack":
        steps = [
            "Unzip the files zip next to your app. You should see START-HERE.md at the top level.",
            "Open the AI tool you already use.",
            "Find that tool’s section in this PDF (or “Your Smart AI Agent” if your tool is not listed by name). Select the whole prompt under “Copy this into [tool]”. Copy it.",
            "Paste it into a new chat or project in that tool and run it. Tell it to use the source and assets in the zip.",
            "When the preview looks absolutely stunning, ask your AI: “Explain in plain language how I open and share this site.”",
            "To change labels, wording, colors, or branding, use the “Ask your AI to change…” lines later in this PDF.",
        ]
    else:
        steps = [
            "Save your background video somewhere easy to find. You can use the link below or the video file that came with this package.",
            "Open the AI tool you already use.",
            "Find that tool’s section in this PDF (or “Your Smart AI Agent” if your tool is not listed by name). Select the whole prompt under “Copy this into [tool]”. Copy it.",
            "Paste it into a new chat or project in that tool and run it. Let the AI build everything.",
            "When the preview looks absolutely stunning, ask your AI: “Explain in plain language how I open and share this site.”",
            "To change wording, colors, or branding, use the “Ask your AI to change…” lines later in this PDF. You do not edit code by hand unless you want to.",
        ]
    for i, s in enumerate(steps, 1):
        c.setFont("Helvetica-Bold", 11)
        set_fill(c, GOLD)
        c.drawString(ML, y, f"Step {i}")
        y -= 14
        y = para(c, s, ML, y, CW, size=10, leading=13.5)
        y -= 10
    if spec.media_kind == "pack":
        y = box_url(
            c,
            spec.pack_url_box_label or "Primary 3D file in your pack",
            spec.video_url,
            y,
        )
        y = para(
            c,
            spec.pack_file_hint
            or (
                f"Offline file name: {spec.video_file}. Copy the whole assets/ folder to public/assets/zero-energy/. This is not a background film."
            ),
            ML,
            y,
            CW,
            size=9,
            leading=12,
        )
    else:
        y = box_url(c, "Your background video link", spec.video_url, y)
        y = para(
            c,
            f"Offline file name if you were given a file: {spec.video_file}. A still image may be included next to your video file for a clean first frame.",
            ML,
            y,
            CW,
            size=9,
            leading=12,
        )
    footer(c, page, total)


def draw_video_page(c, spec: ProductSpec, page, total):
    page_bg(c)
    if spec.media_kind == "pack":
        y = header(
            c,
            spec.pack_section_title or "Your 3D rebuild files",
            spec.pack_section_kicker or "02  ·  Pack only",
        )
        y = para(
            c,
            spec.pack_section_intro
            or (
                f"This is not a background-film product. Rebuild {spec.product} from the files zip: "
                "meshes, labels, HDRI, fonts, and source. Never use a storefront recording as a hero film."
            ),
            ML,
            y,
            CW,
            size=10.5,
            leading=14,
            color=CREAM,
        )
        y -= 8
        y = box_url(
            c,
            spec.pack_url_section_label or "Primary mesh in the pack",
            spec.video_url,
            y,
        )
        y = para(c, f"File name: {spec.video_file}", ML, y, CW, size=10, color=CREAM)
        y -= 10
        y = para(c, spec.film_description, ML, y, CW, size=10, leading=13.5)
        y -= 14
        y = para(
            c,
            spec.pack_tell_ai
            or (
                f"Tell your AI: “Use the files zip. Copy assets/ to public/assets/zero-energy/ "
                f"and keep {spec.video_file} as the can mesh. Do not add a background video.”"
            ),
            ML,
            y,
            CW,
            size=10,
            leading=13.5,
            color=CREAM_DIM,
        )
    else:
        y = header(c, "Your background video", "02  ·  Link only")
        y = para(
            c,
            f"This is the film that plays behind the {spec.product} design. Keep this link. It is also written inside every AI prompt below so your AI can attach it automatically.",
            ML,
            y,
            CW,
            size=10.5,
            leading=14,
            color=CREAM,
        )
        y -= 8
        y = box_url(c, "Video URL", spec.video_url, y)
        y = para(c, f"File name: {spec.video_file}", ML, y, CW, size=10, color=CREAM)
        y -= 10
        y = para(c, spec.film_description, ML, y, CW, size=10, leading=13.5)
        y -= 14
        y = para(
            c,
            f"Prefer the URL when online. If you were given a local download, tell your AI: "
            f"“Use my local file {spec.video_file} as the full-screen background video.”",
            ML,
            y,
            CW,
            size=10,
            leading=13.5,
            color=CREAM_DIM,
        )
    footer(c, page, total)


def draw_tool_prompt_page(c, page, total, tool, part, parts, lines, is_first):
    page_bg(c)
    if is_first:
        y = header(c, f"Copy this into {tool}", f"03  ·  {tool}  ·  part {part}/{parts}")
        y = para(
            c,
            f"Select everything in the box area below (all parts if more than one page). Copy, then paste into {tool}. "
            "You do not need to understand the technical lines. Your AI does.",
            ML,
            y,
            CW,
            size=9.5,
            leading=12.5,
            color=CREAM_DIM,
        )
        y -= 6
    else:
        y = header(c, f"{tool} prompt (continued)", f"03  ·  {tool}  ·  part {part}/{parts}")

    y_min = 0.7 * inch
    panel_h = max(24, y - y_min + 10)
    c.setFillColorRGB(0.14, 0.125, 0.11)
    c.roundRect(ML - 2, y_min, CW + 4, panel_h, 8, fill=1, stroke=0)
    set_stroke(c, GOLD, 1.0, a=0.55)
    c.roundRect(ML - 2, y_min, CW + 4, panel_h, 8, fill=0, stroke=1)
    set_stroke(c, CREAM, 0.4, a=0.12)
    c.roundRect(ML + 2, y_min + 4, CW - 4, panel_h - 8, 6, fill=0, stroke=1)

    for ln in lines:
        if y < y_min + 14:
            break
        size = 8.0
        while size > 6.5 and c.stringWidth(ln, "Helvetica", size) > CW - 20:
            size -= 0.25
        c.setFont("Helvetica", size)
        set_fill(c, CREAM)
        c.drawString(ML + 10, y, ln)
        y -= 10.4
    footer(c, page, total)


def draw_customize(c, spec: ProductSpec, page, total):
    page_bg(c)
    y = header(c, "Customize without coding", "04  ·  Ask your AI")
    y = para(
        c,
        "You never have to open code. After the site is built, start a new message to the same AI and paste one of these lines. Fill in the brackets with your words.",
        ML,
        y,
        CW,
        size=10.5,
        leading=14,
        color=CREAM,
    )
    y -= 12
    for title, line in spec.customize:
        c.setFont("Helvetica-Bold", 9.5)
        set_fill(c, GOLD)
        c.drawString(ML, y, no_em(title))
        y -= 12
        y = para(c, line, ML, y, CW, size=9, leading=12)
        y -= 8
        if y < 1.2 * inch:
            break
    footer(c, page, total)


def draw_video_gen(c, spec: ProductSpec, page, total):
    page_bg(c)
    if spec.media_kind == "pack":
        y = header(
            c,
            spec.pack_video_gen_title or "New labels or mesh (optional)",
            "05  ·  Restage",
        )
        y = para(
            c,
            spec.pack_video_gen_intro
            or "This product has no hero film. Only if you want new can art: generate six wrap maps, or supply your own GLB, then ask your coding AI to swap the files in the pack.",
            ML,
            y,
            CW,
            size=10,
            leading=13.5,
            color=CREAM,
        )
    else:
        y = header(c, "New background video (optional)", "05  ·  Video AI")
        y = para(
            c,
            "Only if you want a different film. Open a video generation AI, paste the prompt below, generate a silent clip about 12 seconds long, then ask your coding AI to use your new file as the background.",
            ML,
            y,
            CW,
            size=10,
            leading=13.5,
            color=CREAM,
        )
    y -= 10
    c.setFont("Helvetica", 8)
    set_fill(c, GOLD)
    c.drawString(ML, y, "COPY THIS INTO A VIDEO AI")
    y -= 8
    lines = wrap(c, no_em(spec.video_gen), "Helvetica", 8.2, CW - 20)
    box_h = 16 + len(lines) * 11
    c.setFillColorRGB(0.14, 0.125, 0.11)
    c.roundRect(ML, y - box_h, CW, box_h, 8, fill=1, stroke=0)
    set_stroke(c, GOLD, 0.9, a=0.5)
    c.roundRect(ML, y - box_h, CW, box_h, 8, fill=0, stroke=1)
    yy = y - 14
    for ln in lines:
        c.setFont("Helvetica", 8.2)
        set_fill(c, CREAM)
        c.drawString(ML + 10, yy, ln)
        yy -= 11
    y = y - box_h - 14
    c.setFont("Helvetica-Bold", 10)
    set_fill(c, CREAM)
    c.drawString(ML, y, "Then tell your coding AI")
    y -= 12
    y = para(
        c,
        (
            spec.pack_video_gen_ask
            or f'Ask your AI: “Replace the six labels or can.glb with [MY FILES]. Keep the same {spec.product} 3D range, Three 0.161.0, and Lenis clock. Do not add a background film.”'
            if spec.media_kind == "pack"
            else f'Ask your AI: “Use my new video file [FILE NAME OR LINK] as the full-screen background. Keep the same {spec.product} layout and behavior.”'
        ),
        ML,
        y,
        CW,
        size=10,
        leading=13.5,
    )
    footer(c, page, total)


def draw_close(c, spec: ProductSpec, page, total):
    page_bg(c)
    y = header(c, "You are ready", "06  ·  Reminders")
    close_first = (
        "Your rebuild files are in the files zip (START-HERE.md, source, and assets)."
        if spec.media_kind == "pack"
        else "Your video link is on the video page of this package and inside every tool prompt."
    )
    for t in [
        close_first,
        "Pick one AI tool (or Your Smart AI Agent), paste that full prompt, and let it build.",
        "Customize by asking your AI in plain English. You do not need to know React or other frameworks.",
        f"Brand site: {WEBSITE}",
    ]:
        y = bullet(c, t, ML, y, CW, size=10)
        y -= 6
    y -= 16
    draw_wordmark(c, ML, y, max_w=CW * 0.62, start_size=38, min_size=18)
    y -= 28
    c.setFont("Helvetica", 10)
    set_fill(c, CREAM_DIM)
    c.drawString(ML, y, WEBSITE)
    y -= 18
    y = para(
        c,
        "If something fails, paste the error into your AI and say: “Fix this for me without asking me to write code.”",
        ML,
        y,
        CW,
        size=10,
        leading=13.5,
    )
    footer(c, page, total)


def build_one(spec: ProductSpec) -> Path:
    out = spec.out_path
    out.parent.mkdir(parents=True, exist_ok=True)

    measure = canvas.Canvas(str(out.with_suffix(".measure.pdf")), pagesize=letter)
    tool_pages = []
    for tool in TOOLS:
        chunks = chunk_text_lines(measure, prompt_for_tool(spec, tool), 48, 54)
        tool_pages.append((tool, chunks))
    measure.save()
    try:
        out.with_suffix(".measure.pdf").unlink(missing_ok=True)
    except Exception:
        pass

    n_tool = sum(len(ch) for _, ch in tool_pages)
    total = 3 + n_tool + 3

    c = canvas.Canvas(str(out), pagesize=letter)
    c.setTitle(f"{spec.product} · {BRAND} Product Package")
    c.setAuthor(BRAND)
    c.setSubject(f"Customer product package · {spec.product_id}")

    page = 1
    draw_cover(c, spec, page, total)
    c.showPage()
    page += 1
    draw_easy_start(c, spec, page, total)
    c.showPage()
    page += 1
    draw_video_page(c, spec, page, total)
    c.showPage()
    page += 1

    for tool, chunks in tool_pages:
        for i, lines in enumerate(chunks, 1):
            draw_tool_prompt_page(c, page, total, tool, i, len(chunks), lines, i == 1)
            c.showPage()
            page += 1

    draw_customize(c, spec, page, total)
    c.showPage()
    page += 1
    draw_video_gen(c, spec, page, total)
    c.showPage()
    page += 1
    draw_close(c, spec, page, total)
    c.showPage()
    c.save()
    return out


def main(argv: list[str] | None = None):
    import sys

    args = list(sys.argv[1:] if argv is None else argv)
    print(f"Wordmark font: {WORDMARK_FONT}")
    selected = PRODUCTS
    if args:
        keys = {a.strip().lower() for a in args}
        selected = [
            s
            for s in PRODUCTS
            if s.product_id.lower() in keys
            or s.product.lower() in keys
            or s.product.lower().replace(" ", "") in keys
        ]
        if not selected:
            print(f"No matching products for: {args}")
            print("Known ids:", ", ".join(s.product_id for s in PRODUCTS))
            raise SystemExit(1)

    for spec in selected:
        path = build_one(spec)
        print(f"Wrote {path}")
        print(f"  href={spec.public_href} golden={spec.is_golden_rule}")

    # Remove obsolete guessable Meridian golden-rule filename if present
    legacy = PACKAGES / "MS-HERO-MERI01" / "Meridian-package-GOLDEN-RULE.pdf"
    if legacy.is_file():
        try:
            legacy.unlink()
            print(f"Removed legacy guessable name: {legacy.name}")
        except Exception as e:
            print(f"Could not remove legacy PDF: {e}")


if __name__ == "__main__":
    main()
