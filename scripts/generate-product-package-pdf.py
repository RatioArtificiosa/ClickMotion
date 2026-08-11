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
The video must be silent. Do not autoplay as a looping wallpaper. Scroll position controls which moment of the video is shown (scroll scrub). When the visitor scrolls down, the video advances. When they scroll up, it goes backward.

LOOK AND FEEL:
Dark cinematic frame color #0c0a08. Cream text #f7f1e8. One gold accent #c9a66b.
Elegant editorial serif for big headlines (Cormorant Garamond or Playfair Display). Clean sans (Inter) for smaller UI text.
Quiet, expensive, unhurried. Think private residences marketing, not a flashy tech startup.
Never use purple SaaS gradients, glass pill navigation bars, mesh/aurora backgrounds, shiny rainbow text, or emoji.

LAYOUT:
A tall page the visitor scrolls through. The hero stage sticks to the screen at full height while scroll moves the video timeline (about 4 screen-heights of scroll on desktop).
Top: brand wordmark MERIDIAN, links Residences, Architecture, Locations, Concierge, and a rectangular outlined gold button "Request Access". Thin gold progress line under the nav that fills as they scroll.
Bottom-left story copy changes in three chapters as they scroll:
Chapter 1 (start): eyebrow "Private Atlantic · By Appointment", title two lines "The coastline" / "belongs to few.", short body about rare oceanfront residences.
Chapter 2 (middle): eyebrow "Interiors · Bespoke", title "Every ascent" / "is intentional.", body about stone, mahogany, warm interiors.
Chapter 3 (end): eyebrow "The Arrival", title "Where the day" / "ends in gold.", body about path to the shore, plus two buttons "Schedule a private tour" and "View the portfolio".
Right side on large screens: chapter markers 01 02 03 with the active one highlighted in gold.
At the very start only, a small "Scroll" cue with a thin gold line. Do not add instructional paragraphs about how scrolling works.
After the hero, a dark closing section: gold "Membership" label, headline "Reserved for those who already have everything.", short support copy, stats "12 Residences · 4 Coastlines · 100% Owners only", and outlined gold button "Begin a conversation" (email link is fine).

TECHNICAL (you the AI implement this, the human may not be a developer):
Use a modern web stack that works in the tool I am using. Prefer one main page section component that I can drop into a site. Use scroll-linked video currentTime (GSAP ScrollTrigger scrub around 0.45 if available, or a simple scroll listener). Video attributes: muted, playsInline, preload ready, no autoplay loop. Pause the video and only seek with scroll. Support reduced-motion: show a still frame and chapter 1 only, no long scrub track. Keep text readable with dark gradients over the video. Safe side padding so text never touches the screen edges.

QUALITY BAR:
It should look like a Forbes or private bank lifestyle page, not a generic AI template. One clear system: scroll owns the film.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-MERI01",
        product="Meridian",
        product_line="Private Residences Hero",
        promise=(
            "A cinematic luxury real estate homepage that moves with the scroll. "
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
                'Ask your AI: “Change the brand name MERIDIAN to [YOUR BRAND NAME] everywhere in the design, including the top corner.”',
            ),
            (
                "Change the big headline",
                'Ask your AI: “Change the first big headline to [LINE 1] on the first line and [LINE 2] on the second line. Keep the same elegant style.”',
            ),
            (
                "Change the small gold label above the headline",
                'Ask your AI: “Change the gold eyebrow text to [YOUR SHORT LABEL].”',
            ),
            (
                "Change button labels",
                'Ask your AI: “Rename the button Request Access to [YOUR BUTTON TEXT]. Rename Schedule a private tour to [OTHER BUTTON TEXT].”',
            ),
            (
                "Change colors",
                'Ask your AI: “Keep the luxury dark look, but change the gold accent from #c9a66b to [YOUR HEX COLOR], and keep text easy to read.”',
            ),
            (
                "Use a different background video",
                'Ask your AI: “Replace the background video with this file or URL: [YOUR VIDEO LINK OR FILE NAME]. Keep scroll controlling the video, silent, no wallpaper loop.”',
            ),
            (
                "Make it work on phones",
                'Ask your AI: “Improve the mobile layout so text never clips, buttons are easy to tap, and the experience still feels premium on a phone.”',
            ),
            (
                "Something looks wrong",
                'Ask your AI: “Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Meridian luxury style. Do not ask me to write code.”',
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

BACKGROUND VIDEO (required):
Use this video as the full-screen background film (not a small thumbnail):
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video must be silent. Do not autoplay as a looping wallpaper. Scroll position controls which moment of the video is shown (scroll scrub). When the visitor scrolls down, the video advances. When they scroll up, it goes backward.

LOOK AND FEEL:
Pure black canvas #000000. Pure white type. Monochrome brutalist. Display: Space Grotesk bold for big titles. Body: Inter.
CTAs are sharp rectangles with radius 0 (no rounded pills). Primary CTA: white fill black text. Secondary: white outline.
Left-heavy black scrims so type stays readable over the globe film.
Serious SOC / enterprise security vendor. Never cyan-pink neon kits, aurora mesh, glass pill docks, shiny rainbow text, or emoji.

LAYOUT:
A tall page. Hero stage sticks full viewport while scroll moves the video (about 4+ screen heights). There is NO closing membership footer band. The story ends when the scroll track ends.
Top: brand VERTEX, links Platform, Threat Intel, Solutions, Company, and a sharp "Request Demo" button. Thin white progress hairline under the nav that fills as they scroll.
Left story copy changes in three chapters:
Chapter 1 (start): eyebrow "Zero Trust Architecture", titles "SECURITY." / "WITHOUT COMPROMISE.", body about preventing zero-day and nation-state threats.
Chapter 2 (middle): eyebrow "Global Threat Fabric", titles "Every packet" / "is a signal.", body about live telemetry and intent.
Chapter 3 (end): eyebrow "Built for SOC teams", titles "Prevention" / "is the product.", dual CTAs "Request Demo" and "View Threat Intel", stats like "< 4m MTTR · 99.99% Coverage · 2,400+ SOC teams".
Right side large screens: chapter markers 01 02 03, active one bright.
At the start only: a small Scroll cue. Safe padding so type never clips.

TECHNICAL (you the AI implement this):
Modern web stack for my tool. Prefer one main component. Map scroll progress to video.currentTime (GSAP ScrollTrigger scrub around 0.45 or a scroll listener). Video: muted, playsInline, no autoplay loop, pause and only seek. Reduced-motion: still frame + chapter 1 only. Dark scrims for readability.

QUALITY BAR:
Linear / Stripe enterprise density meets brutalist editorial. One clear system: scroll owns the film. No generic AI SaaS look.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-VERT01",
        product="Vertex",
        product_line="Cybersecurity Scroll Hero",
        promise=(
            "A monochrome enterprise security homepage that hardens as visitors scroll. "
            "Serious authority, ready to build with your favorite AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: abstract wireframe / globe cybersecurity atmosphere, "
            "dark monochrome motion suitable for a scroll narrative. About 12 seconds, no sound."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K about 12 seconds, no audio, 24 frames per second. Abstract dark monochrome "
            "wireframe globe and network nodes, slow camera drift, enterprise cybersecurity atmosphere. "
            "No people, no readable UI text, no logos, no neon rainbow. Serious, technical, restrained. Seamless emotional arc for scroll scrubbing."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: “Change the brand name VERTEX to [YOUR BRAND NAME] everywhere in the design, including the top corner.”',
            ),
            (
                "Change the big headlines",
                'Ask your AI: “Change the first chapter titles to [LINE 1] and [LINE 2]. Keep brutalist Space Grotesk style.”',
            ),
            (
                "Change eyebrows and body",
                'Ask your AI: “Change the chapter eyebrow labels and body paragraphs to [YOUR COPY]. Keep three chapters.”',
            ),
            (
                "Change button labels",
                'Ask your AI: “Rename Request Demo to [PRIMARY]. Rename View Threat Intel to [SECONDARY]. Keep sharp zero-radius buttons.”',
            ),
            (
                "Change colors",
                'Ask your AI: “Keep monochrome brutalist, but if you introduce one accent use [YOUR HEX] sparingly. Keep text highly readable.”',
            ),
            (
                "Use a different background video",
                'Ask your AI: “Replace the background video with [YOUR VIDEO LINK OR FILE NAME]. Keep scroll controlling the video, silent, no wallpaper loop.”',
            ),
            (
                "Make it work on phones",
                'Ask your AI: “Improve the mobile layout so type never clips, CTAs are easy to tap, and the scroll narrative still feels serious and premium.”',
            ),
            (
                "Something looks wrong",
                'Ask your AI: “Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Vertex brutalist security style. Do not ask me to write code.”',
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

BACKGROUND VIDEO (required - SCROLL SCRUB, not simple autoplay loop):
Use this video as the full-screen sticky hero film:
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Map page scroll progress (0 to 1) to video.currentTime (0 to duration) with GSAP ScrollTrigger scrub about 0.5. Pin or sticky a full-viewport stage inside a tall track about 480vh. Do NOT use autoplay loop as the primary mode. Pause the video and let scroll own time.

LOOK AND FEEL:
Pearl light canvas #F7F4F1. Charcoal ink #1A1614. Rose gold #C4A574 and soft blush #E8B4B8 accents.
Display: Instrument Serif (or elegant editorial serif) for big titles. Body: Inter light.
Thin rose-gold progress bar under the nav. Fashion uppercase tracking. Light studio luxury.
This is a LIGHT mode hero. Never dark private-bank Meridian gold coastal, never mono Vertex security, never neon cyberpunk rain city, never quantum void cyan, never forest climate sage.

LAYOUT:
Tall scroll track with sticky full-viewport stage.
Top nav: brand REVEL + Fashion Commerce, center links Collections Lookbook Campaigns Journal, right pill "Enter atelier".
Four chapters swap as scroll progresses:
1) The feed - "She lived / inside the glow." (floating gold phone, social icons)
2) The break - "Then something / had to give." (shoe shatters glass)
3) The shatter - "Shards of / attention fall." (glass and icons midair)
4) The arrival - "Now she / owns the room." (woman free mid-leap) with CTAs Shop the drop and Watch campaign.
Right rail chapter indices 01-04. Scroll cue at start. Closing atelier band below the track.

TECHNICAL:
React + TypeScript + Tailwind. GSAP ScrollTrigger scrub is mandatory for the signature. Video: muted, playsInline, preload auto, object-fit cover. No autoPlay as primary. prefers-reduced-motion: single static frame, no scrub, 100vh track. Keep cream type legible over the film with soft bottom dark scrim and top pearl fade.

QUALITY BAR:
It should feel like a high-fashion campaign site, not a generic AI social template. One clear system: scroll owns the breakout film + rose-gold editorial type.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-REVL01",
        product="Revel",
        product_line="Scroll Narrative Fashion Commerce Hero",
        promise=(
            "A light pearl fashion homepage where scroll advances an iPhone breakout film - "
            "four chapters from feed to freedom, rose-gold type, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: gold iPhone social-commerce breakout - floating phone and icons, "
            "glass shatter by a shoe, suspended shards, woman leaping free. About 20 seconds, "
            "pearl studio, rose silk, no sound. Designed for scroll scrub."
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
                'Ask your AI: "Change the brand name REVEL to [YOUR BRAND NAME] everywhere, including the top left."',
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
                'Ask your AI: "Replace the scrubbed video with [YOUR VIDEO LINK OR FILE NAME]. Keep scroll owning currentTime, not autoplay loop."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile layout so headlines never clip, center nav hides, CTAs stack, scroll scrub still works."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep the Revel light pearl / rose-gold fashion scroll style. Do not ask me to write code."',
            ),
        ],
        opaque_id="r7v3l9k2mx4q",
        paid_salt="rv8n3p",
    )


def prism_spec() -> ProductSpec:
    video_file = "prism-faces-v1.mp4"
    video_path = "/assets/videos/prism-faces-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium scroll-as-narrative website hero for a creative identity brand called PRISM.

BACKGROUND VIDEO (required - SCROLL SCRUB, not simple autoplay loop):
Use this video as the full-screen sticky hero film:
{url}
If the user has a local file named {video_file}, use that file path in the project instead of downloading.
The video is silent. Map page scroll progress (0 to 1) to video.currentTime (0 to duration) with GSAP ScrollTrigger scrub about 0.55. Pin or sticky a full-viewport stage inside a tall track about 520vh. Do NOT use autoplay loop as the primary mode. Pause the video and let scroll own time.

LOOK AND FEEL - LIQUID GLASS MATERIAL SYSTEM:
Soft studio mist canvas. Multi-face surreal sculpture stays CENTERED and clear.
Display: Syne (or geometric modern display). Body: DM Sans.
Accents: prism violet #A78BFA, soft violet #C4B5FD, cyan #67E8F9, fuchsia #F0ABFC.
Progress bar under nav: violet to fuchsia to cyan.

LIQUID GLASS (mandatory - not cheap single blur):
1) Include ONE SVG filter (feTurbulence + feGaussianBlur + feDisplacementMap) id prism-glass-distortion.
2) Each panel is a STACK: outer shell (backdrop-filter blur + saturate, soft white fill), specular top-edge highlight + hairline rim, and a stabilized darker plate under text for readability.
3) Tiers: thin chips (~12px blur, no distortion), standard (~18px), thick (~24px + distortion filter).
4) prefers-reduced-transparency: solid elevated cards, same layout.

LAYOUT LAW (critical - anti left-only trap):
Do NOT put all copy in a left column only.
Float MANY liquid glass panels of DIFFERENT sizes on BOTH left AND right margins of the stage.
Kinds: chip, metric, stat, profile card, quote, feature, CTA.
Stagger tops from ~18% to ~78%. Keep center faces open (no full-width text block).
Top-center chapter pill: 01 Spectrum / 02 Margins / 03 Clarity.
Top nav: PRISM + Liquid glass identity, links Studio Personas Materials Archive, right glass pill Enter studio.
Mobile: one thick bottom glass strip instead of many panels.

CHAPTERS:
1) Spectrum - "Every face is a spectrum." feature left + stats right
2) Margins - quote right, profile left, chips both sides, "Both margins speak."
3) Clarity - "Shatter into clarity." feature left + CTA "Build with Prism" right

TECHNICAL:
React + TypeScript + Tailwind. GSAP ScrollTrigger scrub mandatory.
Video: muted, playsInline, preload auto, object-fit cover. No autoPlay as primary.
prefers-reduced-motion: single static mid frame, no scrub, 100vh track.
Closing dark atelier band below the track.

QUALITY BAR:
It should feel like a gallery installation UI with real liquid glass (shell + plate + light model), not glassmorphism wallpaper and not a left-only scroll essay.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-PRSM01",
        product="Prism",
        product_line="Liquid Glass Multi-Panel Identity Hero",
        promise=(
            "A creative identity homepage where scroll advances a multi-face film while "
            "liquid glass panels of many sizes pop on both sides - ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: surreal multi-persona face sculpture on soft cool-gray studio - "
            "stone, porcelain, and painted spectra morph and fragment, always centered with empty "
            "margins. About 48 seconds, silent. Designed for scroll scrub + floating UI glass."
        ),
        shared_design=design,
        video_gen=(
            "Cinematic 4K silent 24fps. Soft cool gray studio. Center floating multi-face identity "
            "sculpture morphing and fragmenting (stone, porcelain, iridescent paint). Generous empty "
            "left and right thirds for UI. No logos, no readable UI chrome."
        ),
        customize=[
            (
                "Change the brand name",
                'Ask your AI: "Change the brand name PRISM to [YOUR BRAND NAME] everywhere, including the top left."',
            ),
            (
                "Rewrite panel copy",
                'Ask your AI: "Rewrite the glass panel titles and bodies to [YOUR COPY]. Keep both-side multi-panel layout."',
            ),
            (
                "Add or remove panels",
                'Ask your AI: "Add two more small glass chips on the right and remove the profile card. Keep liquid glass tiers."',
            ),
            (
                "Change button labels",
                'Ask your AI: "Rename Enter studio to [PRIMARY] and Build with Prism to [SECONDARY]. Keep glass buttons."',
            ),
            (
                "Change colors",
                'Ask your AI: "Swap violet #A78BFA and cyan #67E8F9 to [ACCENT A] and [ACCENT B]. Keep readable white type on glass plates."',
            ),
            (
                "Use a different background video",
                'Ask your AI: "Replace the background video with [YOUR VIDEO]. Keep scroll scrub and both-side glass panels."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "On mobile stack a single thick glass strip at the bottom; hide multi-panel field under 640px."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Prism liquid glass multi-panel style. Do not ask me to write code."',
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

BACKGROUND VIDEO (required - LOOP WALLPAPER under glass, not scroll scrub):
Use this video as the full-stage motion background:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. It loops with autoPlay muted playsInline. A soft dark veil sits over the film so type stays readable. Do NOT map scroll to video.currentTime. Scroll drives the GLASS PANELS only.

LOOK AND FEEL - DARK TRANSLUCENT ENTERPRISE GLASS:
Sticky full-viewport stage inside a tall scroll track. Display: Syne (or geometric modern). Body: DM Sans.
White type on dark translucent liquid glass. Soft iridescent rim (cyan / violet / rose). Cool accents.
Serious Linear / Stripe enterprise density. Board-ready copy. Not toy charts, not sparse white cards, not purple mesh.

LIQUID GLASS (mandatory - layered, not single blur dump):
1) Translucent fill rgba(255,255,255,0.08-0.18) + backdrop-filter blur ~26px saturate ~185% so the film shows through.
2) Iridescent edge wash (cyan / violet / rose) - edge catch only, not full-card white wash.
3) Specular top highlight + hairline porcelain rim + soft outer glow.
4) prefers-reduced-transparency: solid elevated dark slate cards, same layout.

MOTION LAW (scroll pivot paper journey - Framer Motion useScroll / useTransform):
Tall track about 5 x 1.55 viewport heights. Sticky 100vh stage.
Five large glass sheets stacked (hidden deck - only the active sheet is visible).
Each sheet: local progress 0 to 1 maps rotateX from about +72 degrees (edge from below) through 0 (face-on, readable) to -72 degrees (edge above). One-way journey - do not reverse.
Slight overlap between sheets so handoffs feel continuous. Long face-on plateau. Soft opacity ramps. Mild Y travel (~36px). Last sheet holds face longer then exits.
Progress bar + step dots under the deck.
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
React + TypeScript. Framer Motion useScroll / useTransform mandatory for pivot.
Video: muted, loop, autoPlay, playsInline, object-fit cover.
Single default-export component FolioPivotSection. Configurable sheets, kicker, heading, backgroundSrc.
No forced page intro or outro inside the component - section only.

QUALITY BAR:
It should feel like a board presentation in liquid glass over motion film - dense, serious, premium. Not a white empty card on a white page. Not Prism multi-panel hero. Not Meridian coastal estate.
""".strip()
    return ProductSpec(
        product_id="MS-SEC-FOLI01",
        product="Folio",
        product_line="Scroll Pivot Liquid Glass Decision Section",
        promise=(
            "A mid-page enterprise section where five dense liquid-glass decision panels "
            "pivot on scroll over motion film - mandate through outcomes, ready for your AI coding tool."
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
                'Ask your AI: "Rewrite all five decision sheets for [YOUR BUSINESS]. Keep dense metrics, rows, and chips. Keep five sheets and the scroll pivot."',
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
    video_file = "mirage-desert-v1.mp4"
    video_path = "/assets/videos/mirage-desert-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport advertising-agency website HERO for a brand called MIRAGE.

BACKGROUND VIDEO (required - FREE-PLAYING LOOP, not scroll scrub):
Use this video as the full-screen background film:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. It plays freely with autoPlay muted loop playsInline. Subject (desert figure) holds on the RIGHT (object-position about 72% center). Soft left scrim so type stays readable. Do NOT map scroll to video.currentTime. Scroll drives the FIVE LEFT-RAIL GLASS CARDS only.

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

MOTION LAW (scroll pivot cards - Framer Motion useScroll / useTransform):
Tall track about 5 x ~1.35 viewport heights. Sticky 100vh stage.
Five glass sheets stacked in a left deck (absolute stack - only active sheet face-on).
Each sheet local progress 0 to 1 maps rotateX from about +64 degrees through 0 (face-on) to -64 degrees.
Sheet 0 starts near face-on so the hero never opens empty.
Mild Y travel (~26px), scale ~0.975 to 1, content opacity ramp.
Progress bar + dots + active label + "Scroll to continue" centered under the cards.
prefers-reduced-motion: static stacked cards, gradient fallback, no video autoplay required.

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
React + TypeScript. Framer Motion useScroll / useTransform mandatory for card pivot.
Video: muted, loop, autoPlay, playsInline, object-fit cover, object-position right-biased.
Single default-export component MirageAgencyHero. Props: sheets, brand, tagline, backgroundSrc, vhPerSheet.
Optional uniform zoom ~1.2 on the left rail composition for premium scale (keep proportions).

QUALITY BAR:
Ultra-premium ad-agency hero. Morphic dark glass over desert film. Free-playing subject on the right. Scroll only owns the cards. Not Folio mid-page section. Not Prism both-side constellation. Not white frosted SaaS.
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
            "markings, dunes and heat haze, subject held on the right. Silent loop suitable "
            "as free-playing wallpaper under glass UI."
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
                'Ask your AI: "Change the brand name MIRAGE to [YOUR BRAND] everywhere, including the top left."',
            ),
            (
                "Change the headline",
                'Ask your AI: "Change the two-line headline Creative that / survives the heat. to [LINE 1] / [LINE 2]. Keep exactly two lines."',
            ),
            (
                "Rewrite the five cards",
                'Ask your AI: "Rewrite all five glass cards for [YOUR AGENCY / BRAND]. Keep dense metrics, rows, chips, and the scroll pivot."',
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
                "Change nav links",
                'Ask your AI: "Replace Work Method Clients Culture Contact with [YOUR LINKS]. Keep minimal text-only nav."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile so the headline stays two lines when possible, cards stay readable, and the subject film still feels premium."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Mirage morphic dark liquid glass over desert film. Do not ask me to write code."',
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
Use this video as the full-screen sticky hero film:
{url}
If the user has a local file named {video_file}, use that path instead of downloading.
The video is silent. Map page scroll progress (0 to 1) to video.currentTime (0 to duration) with GSAP ScrollTrigger scrub about 0.55. Pin a sticky full-viewport stage inside a tall track about 460vh. Do NOT use autoplay loop as the primary mode. Pause the video and let scroll own time.
object-fit cover, object-position center about 48% vertical so the dual tree faces and sun stay framed.

LOOK AND FEEL - PRIVATE LUXURY WELLNESS (not spa SaaS):
Stage ink #0B0907. Cream type #F4EDE3 / #F7F1E8. Soft gold #C9A46A and warm highlight #F0D9A8.
Display: Cormorant Garamond (or fine editorial serif). Utility: Inter light.
Quiet Aman / Six Senses restraint. Invitation only. Never cream Aether wellness app. Never climate Terra green. Never pearl Revel fashion. Never Motionsites pill docks. Never purple mesh.

SIGNATURE:
Optional soft gold filament at about 46% height where the two nature faces meet - subtle, never competing with type.

LAYOUT:
Tall scroll track with sticky full-viewport stage.
Top nav: brand ELYSE + Private Wellness Retreats, center links Retreats Places Practice Membership, right "Request invitation".
Thin gold progress bar under the nav driven by scroll progress.
Four chapters swap as scroll progresses (lower-left copy, right index rail 01-04):
1) The call - "The earth is / still waiting." Beyond the noise, places where light moves slower.
2) The land - "Sanctuaries, / not destinations." Remote valleys, quiet coasts, forests that remember.
3) The practice - "Days shaped / by intention." Guided rest, bodywork, table and trail.
4) The return - "Leave whole. / Return clear." with CTAs Begin a private inquiry and View the calendar.
Closing membership band: "For those who measure wealth in stillness." Stats 12 sanctuaries / 6 continents / 8 guests max. Request an introduction.

TECHNICAL:
React + TypeScript. GSAP ScrollTrigger scrub is mandatory for the signature. Video: muted, playsInline, preload auto, object-fit cover. No autoPlay as primary. prefers-reduced-motion: single static mid frame, no scrub, 100vh track. Keep cream type legible with soft earth veils - never crush the luminous center sun/faces.
Single default-export component ElyseScrollNarrative. Props: brand, backgroundSrc, posterSrc.

QUALITY BAR:
It should feel like a private wellness house for people who measure wealth in stillness - quiet, complete, scroll-owned film. Not a hotel chain. Not a spa SaaS landing page.
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ELYS01",
        product="Elyse",
        product_line="Luxury Wellness Retreat Scroll Hero",
        promise=(
            "A private wellness retreat homepage where scroll advances a golden-hour "
            "sanctuary film - four chapters from call to return, ready for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "What the film shows: two monumental tree faces (warm and cool) meeting over a "
            "golden-hour valley river landscape - dual nature forms, luminous sun between them. "
            "About 10 seconds, silent, designed for scroll scrub."
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
                'Ask your AI: "Replace the background video with [YOUR VIDEO LINK OR FILE]. Keep it muted, scroll-scrubbed (not free-play primary), and keep faces/sun clear of type."',
            ),
            (
                "Make it work on phones",
                'Ask your AI: "Improve mobile so nav stays clean, chapters remain readable, and scroll scrub still owns the film. Keep luxury restraint."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Elyse private luxury wellness scroll narrative. Do not ask me to write code."',
            ),
        ],
        opaque_id="e9l7s3e2k4m1",
        paid_salt="el5n8q",
    )


def lineup_spec() -> ProductSpec:
    video_file = "lineup-reveal-preview-v1.mp4"
    video_path = "/assets/videos/lineup-reveal-preview-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium mid-page website SECTION (not a full-bleed hero) called LINEUP - a product line scroll reveal.

This is a PINNED PRODUCT REVEAL. Bone paper stage (#efede6). As the visitor scrolls, each segment of the pin introduces a new SKU: 3D product vessel cross-fades on the right, soft bloom tint changes, giant ghost number, and left copy card rebuilds (wordmark, name, subtitle, pitch, optional spec rows). Desktop pin length equals N viewport heights where N is the number of products in a data array. Snap points at 0, 1/N, 2/N, ..., 1. Mobile uses horizontal snap cards. Keyboard arrows jump SKUs while the section is in view.

DEFAULT DEMO (replace entirely): three nootropic cans Clear / Dawn / Dusk (ACTUALLY.01-03) with can.glb and label textures still-01/02/03. Spec sheet L-Theanine, Lion's Mane, Rhodiola, Bacopa with Active blend 1,150 mg. Demo is a starting board only.

CLIENT MEDIA:
- Mesh: {WEBSITE_URL}/models/can.glb (buyer may replace with any product vessel - bottle, box, device, pouch)
- Labels: {WEBSITE_URL}/textures/labels/still-01-clear-2.png (and dawn/dusk variants); each product may set labelPath
- HDRI: {WEBSITE_URL}/hdri/studio_small_03_1k.hdr (Environment background=false)

CRITICAL - EXPANDABLE PRODUCT COUNT (data-driven N):
Drive the UI from lineup-data.ts: PRODUCTS array (length N, default 3) + SECTION_META (eyebrow, H2, total footer labels) + SPEC_ROWS.
Pin end = N * 100vh. Snap = 0..1/N..1. Tabs 01..N. Blooms, ghosts, 3D stage all map over PRODUCTS.
Buyer can expand to 4-8 or reduce to 2 without rewriting scroll math. Always update SECTION_META title/eyebrow when N changes - never leave "Three formulations." when N is not 3.
Each product supports labelPath and optional meshPath so AI can place any product textures without hardcoding LABEL_MAP only.

LOOK: editorial CPG tasting room. Display serif for names. Heavy geometric wordmark for SKU line. No purple mesh, no Motionsites docks, no free-play background film. Not a flat shop grid. Not a full-bleed hero (pair with Actually! hero above if desired).

TECHNICAL:
React + TypeScript. GSAP ScrollTrigger pin scrub + snap. Lenis. three + @react-three/fiber + drei. Single default-export LineupSection.
prefers-reduced-motion: first product static, readable copy.
Cleanroom: cleanroom/lineup-from-prompt/ with CUSTOMIZATION.md for AI expand playbook.

CUSTOMIZATION LAW:
Every string, product object, mesh, label, color, spec row, and N count is replaceable. After default builds, restage for buyer brand and product type (beverage, skincare, hardware, wine, apparel, multi-SKU CPG). dosageMg is a generic numeric column - reuse for prices, ml, SPF, watts.

REFERENCE MOTION (storefront presentation of full pin journey):
{url}
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
            "Client media is the 3D product pack (mesh, labels, HDRI). "
            "Storefront presentation shows the full pin journey through the demo SKUs "
            "with natural holds and eases between products (about 24-28 seconds)."
        ),
        shared_design=design,
        video_gen=(
            "No looping background film required. Optional: generate label art or product stills "
            "for each SKU as clean editorial boards, no watermarks, ready as public textures."
        ),
        customize=[
            (
                "Replace the whole product line",
                'Ask your AI: "Replace PRODUCTS and SECTION_META in lineup-data.ts with my brand [NAME] and products: [LIST with name, subtitle, pitch, accent hex, sku, label path]. Keep pin snap and 3D cross-fade. H2 and eyebrow must match count N. Never leave ACTUALLY demo copy."',
            ),
            (
                "Expand to more products",
                'Ask your AI: "Expand Lineup from 3 to [N] products using [DATA]. Pin must be N * 100vh with snap 0…1. Tabs 01…N. Update SECTION_META title and eyebrow. Add labelPath for every new SKU. Do not hardcode N=3."',
            ),
            (
                "Reduce products",
                'Ask your AI: "Remove products [ids] from PRODUCTS. Update SECTION_META for the new count. Pin and snap must shrink with PRODUCTS.length."',
            ),
            (
                "Any product vessel (not a can)",
                'Ask your AI: "Replace can.glb with [MESH] and labels with [TEXTURES or art direction]. Set meshPath/labelPath per product. Frame a bottle/box/device with correct targetHeight and camera. Keep cross-fade stage motion."',
            ),
            (
                "Change industry / specs",
                'Ask your AI: "Rewrite names, pitches, and SPEC_ROWS for [CATEGORY: skincare/wine/hardware/apparel]. Replace SECTION_META totalLabel, totalUnit, specUnit, leadBadge. dosageMg is just the numeric cell."',
            ),
            (
                "Brand and colors",
                'Ask your AI: "Change bone/ink CSS vars to [PAPER]/[INK]. Set each bloomColor to my palette. Change ACTUALLY.01 wordmarks to [BRAND].01 style."',
            ),
            (
                "Place after Actually! hero",
                'Ask your AI: "Mount LineupSection below ActuallyHero. Shared Lenis + ScrollTrigger. Keep both bone stages coherent. No forced site chrome inside either component."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE]. Keep Lineup as a scroll-pinned multi-SKU reveal with data-driven N products from PRODUCTS. Do not ask me to write code."',
            ),
        ],
        opaque_id="l7n3e9k2m4p8",
        paid_salt=None,
    )


def actually_spec() -> ProductSpec:
    # Client media is 3D product pack (GLB + labels + HDRI), not a bg-film SKU.
    # PDF video URL is storefront presentation of the full UI motion.
    video_file = "actually-hero-preview-v1.mp4"
    video_path = "/assets/videos/actually-hero-preview-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    design = f"""
Build a premium full-viewport website HERO for a CPG / beverage brand called Actually! (buyer will rebrand).

This is a PRODUCT-FIRST HERO. The vessel is the stage. Bone paper (#efede6) sits over ink (#1a1b1d). A giant heavy wordmark ACTUALLY. (with accent period in #bcd3d8) lives on the bone layer. A circular clip-path window peels into the ink studio where a React Three Fiber can (GLB) lives under studio HDRI. The circle follows the pointer on desktop. Scroll pins the hero about 120% of viewport height, expands the circle, soft-locks the can, and reveals left support copy (formula story). Mobile stacks wordmark, can (drag to spin), and formula without the pin clip.

CLIENT MEDIA (required - swap for buyer product):
- Mesh: {WEBSITE_URL}/models/can.glb
- Default label: {WEBSITE_URL}/textures/labels/still-01-clear-2.png
- Optional labels: still-02-dawn-2.png, still-03-dusk-2.png under /textures/labels/
- Studio HDRI: {WEBSITE_URL}/hdri/studio_small_03_1k.hdr (Environment background=false)
- Optional pack still: {WEBSITE_URL}/assets/images/cans/actually-01.png

LOOK AND FEEL - EDITORIAL CPG (not SaaS glass):
Bone paper + ink studio. Quiet Swiss restraint. Soft clear accent. Heavy geometric wordmark. Light display serif for support headline.
Never purple mesh, never Motionsites pill docks, never free-play background film as the signature.

SIGNATURE A - POINTER WINDOW:
Desktop only. Bone paper layer over ink. Circle clip-path follows pointer with smooth lag. Entrance grows the radius. Soft halo ring tracks the window.

SIGNATURE B - LIVING 3D CAN:
useGLTF can, label texture on body, metal on rest, Environment HDRI, ContactShadows, drag-to-spin, subtle float after entrance drop.

SIGNATURE C - SCROLL PIN REVEAL:
Pin top top end +=120% scrub. Expand clip to cover, lock pointer blend, dolly scale slightly, fade bone wordmark layer, reveal support column (index, H2, rule, body, stats) past ~58% progress.

LOADER:
Bone curtain with brand mark and ingredient pop chips. Soft ~2.2s reveal with optional FLIP into hero H1.

LAYOUT:
Hero only - no forced site header/footer inside the component.
Desktop pin stage full viewport. Support column left on ink (hidden until scroll).
Mobile: no clip pin; stacked layout with drag spin.

TECHNICAL:
React + TypeScript. GSAP ScrollTrigger scrub. Lenis smooth scroll coupled to ScrollTrigger.update.
three + @react-three/fiber + @react-three/drei. Tailwind optional for utility classes.
prefers-reduced-motion: static product pose, readable copy, no long scrub required.
Single default-export component ActuallyHero.

CUSTOMIZATION LAW:
Every visible string, the mesh path, label maps, colors, and stats must be easy to replace. After the default builds, the buyer will tell their AI to restage brand, formula, and product until it feels made for their CPG alone.

QUALITY BAR:
It should feel like a quiet tasting room - paper, light, a real vessel, formula that earns the scroll. Pointer invites. Scroll completes.

REFERENCE MOTION (storefront presentation of the full hero):
{url}
""".strip()
    return ProductSpec(
        product_id="MS-HERO-ACTU01",
        # product used in PDF filename — no special chars (! breaks URLs/paths)
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
            "Client media is the 3D product pack (can mesh, label textures, studio HDRI). "
            "Storefront presentation shows the full hero: loader, pointer window, can grab, "
            "and scroll pin formula reveal (about 24-28 seconds)."
        ),
        shared_design=design,
        video_gen=(
            "This product does not require a looping background film. "
            "If generating marketing stills: premium beverage can on bone paper, studio light, "
            "editorial restraint, no watermarks. Or replace the GLB and label maps with the buyer's product."
        ),
        customize=[
            (
                "Change the brand wordmark",
                'Ask your AI: "Change the hero wordmark from ACTUALLY. to [YOUR BRAND]. Keep the heavy geometric weight, giant sizing, and optional accent on the final glyph. Update the loader mark and aria-label to match."',
            ),
            (
                "Change taglines and meta",
                'Ask your AI: "Change Actually? / Really. Actually. to [LINE 1] / [LINE 2] and the bottom-right meta to [CATEGORY LINE] / [LOCATION LINE]. Keep editorial spacing."',
            ),
            (
                "Change the formula story",
                'Ask your AI: "Rewrite the support index, H2, body paragraph, and two stats for [PRODUCT STORY]. Keep the left column reveal on scroll."',
            ),
            (
                "Load your product mesh and labels",
                'Ask your AI: "Replace /models/can.glb with [YOUR GLB PATH] and the label map with [YOUR LABEL PNG]. Keep metal vs label material split, studio HDRI, grab spin, and contact shadow."',
            ),
            (
                "Change colors",
                'Ask your AI: "Change bone #efede6, ink #1a1b1d, and accent #bcd3d8 to [PAPER] / [STAGE] / [ACCENT]. Keep type readable on both layers."',
            ),
            (
                "Brand voice pass",
                'Ask your AI: "Rewrite every visible string so the voice matches [BRAND VOICE]. Do not change pin length or 3D math unless I ask."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Actually! as a product-first hero with pointer window, living 3D vessel, and scroll formula reveal. Do not ask me to write code."',
            ),
        ],
        opaque_id="a9ct7u4l2y1x",
        paid_salt=None,
    )


def helix_spec() -> ProductSpec:
    # Client media is nine gallery stills on a WebGL helix (not a bg-film SKU).
    # PDF video URL is storefront presentation of the full UI motion.
    video_file = "helix-gallery-preview-v1.mp4"
    video_path = "/assets/videos/helix-gallery-preview-v1.mp4"
    url = f"{WEBSITE_URL}{video_path}"
    stills = ", ".join(
        [f"{WEBSITE_URL}/assets/images/orbit/orbit-{str(i).zfill(2)}.jpg" for i in range(1, 10)]
    )
    design = f"""
Build a premium mid-page website SECTION (not a full-bleed hero) for a design-studio gallery brand called HELIX.

This is a SPATIAL GALLERY CAROUSEL. Solid stage color (#C3C3C3 by default, fully recolorable) with a WebGL cylindrical card helix. Cards are the focus so the buyer can load their own work. Do not force a loud underlay film unless the buyer asks for a soft stage treatment.

GALLERY STILLS (required - nine images on the helix - replace with buyer work):
Default demo textures (load order reverse: 09 down to 01):
{stills}
If the user has local files named orbit-01.jpg through orbit-09.jpg, use those paths instead.
Each card is a rounded rectangle on a helical ribbon (radius about 12, two full turns, spacing about 6.2). Thin gray guide rails along the path.
The buyer will swap every card for their portfolio, UI frames, campaigns, or product boards. Prefer portrait-ish high-resolution stills without watermarks.

LOOK AND FEEL - EDITORIAL GALLERY (not SaaS glass):
Stage #C3C3C3. Ink #0a0a0a / #1a1a1a. Quiet Swiss board. Private design studio.
Display: geometric sans (Neue Haas / Inter / Helvetica Neue). Wordmark: Birthstone script for demo brand ClickMotion (buyer will rebrand).
Never purple mesh, never Motionsites pill docks, never a required third-party Dribbble button.

SIGNATURE A - CROSSING TITLES:
Giant uppercase "Design in" starts off the left and travels right.
Giant uppercase "motion" starts off the right and travels left.
They peak near center early, then continue out of frame as scroll finishes.
Backface-hidden for clean motion. Both strings are buyer-editable.

SIGNATURE B - CENTER LOCKUP:
Above a quiet uppercase line "Exploring ideas through / daily design practice." place the brand wordmark in Birthstone (default ClickMotion). Fade the lockup in the second half of the scroll. All of these strings are buyer-editable.

SIGNATURE C - WEBGL HELIX:
React Three Fiber Canvas full viewport, transparent clear, high-performance. Cards ease in from off-path as scroll advances (do not seed mid-arc on first paint). Pin type fixed so the canvas fills the viewport (never stuck at 300x150).

LAYOUT:
Section only - no forced page header/footer.
Pin stage 100dvh solid stage color. Scroll length about 5 viewport heights on desktop, 3 on mobile.
Stack: titles + concepts under the canvas; concepts bottom-left three lines (buyer-editable).
Pin spacer background must match the stage (no white flash).

TECHNICAL:
React + TypeScript. GSAP ScrollTrigger scrub for pin + title x. Lenis smooth scroll coupled to ScrollTrigger.update.
three + @react-three/fiber for helix. Birthstone from Google Fonts for wordmark (or buyer brand font).
prefers-reduced-motion: static mid pose, titles near center, no long scrub required.
Single default-export component HelixGallerySection.

CUSTOMIZATION LAW:
Every visible string and every card image must be easy to replace. After the default builds, the buyer will tell their AI to restage brand, titles, center lines, concepts copy, nine cards, and stage color until the section feels made for their brand alone.

QUALITY BAR:
It should feel like a private viewing of craft work on a calm board - spatial, intentional, complete. Scroll owns the helix. Cards own the focus.

REFERENCE MOTION (storefront presentation of the full section):
{url}
""".strip()
    return ProductSpec(
        product_id="MS-SEC-HELI01",
        product="Helix",
        product_line="Helical Design Gallery Carousel Section",
        promise=(
            "A spatial mid-page gallery where your work rides a 3D helix as titles "
            "cross the stage - fully customizable cards, copy, and color, free for your AI coding tool."
        ),
        video_file=video_file,
        video_path=video_path,
        film_description=(
            "Client media is nine gallery stills on a helical carousel (swap for your work). "
            "Storefront presentation shows the full stage, crossing titles, brand wordmark, "
            "and WebGL cards over a full scroll pin (about 28 seconds)."
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
                'Ask your AI: "Change the stage color #C3C3C3 to [STAGE HEX] and type ink to [INK HEX]. Match the pin spacer to the stage so there is no white flash. Keep wordmark readable."',
            ),
            (
                "Brand voice pass",
                'Ask your AI: "Rewrite every visible string so the voice matches [BRAND VOICE]. Do not change helix math or scroll pin behavior unless I ask."',
            ),
            (
                "Something looks wrong",
                'Ask your AI: "Something is broken: [DESCRIBE WHAT YOU SEE]. Fix it and keep Helix as a spatial mid-page gallery with scroll-pinned helix cards and crossing titles. Do not ask me to write code."',
            ),
        ],
        opaque_id="h3l1x9k2m7p4",
        paid_salt=None,
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
    lineup_spec(),
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
            "You choose the stack that works in my environment, create every file, wire the background video, "
            "and deliver a polished preview. Do not leave steps for me that require writing code. "
            "When finished, explain in plain English how I view and share the result.\n\n"
        ),
    }
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
    for i, t in enumerate(
        [
            "Your background video link (and how to use the file)",
            "A ready prompt for Cursor, Claude, Grok Build, Lovable, Codex, Bolt or any smart AI",
            "Simple ways to ask your AI to customize text, colors, and the video look",
        ]
    ):
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
        f'Ask your AI: “Use my new video file [FILE NAME OR LINK] as the full-screen background. Keep the same {spec.product} layout and behavior.”',
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
    for t in [
        "Your video link is on the video page of this package and inside every tool prompt.",
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


def main():
    print(f"Wordmark font: {WORDMARK_FONT}")
    for spec in PRODUCTS:
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
