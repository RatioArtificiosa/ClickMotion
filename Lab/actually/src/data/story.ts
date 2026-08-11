export type StoryChapter = {
  year: string;
  chapterTitle: string;
  paragraph: string;
  imageCaption: string;
  imageSrc: string;
};

/** Five editorial chapters — STILL → ACTUALLY in body copy only. */
export const STORY_CHAPTERS: StoryChapter[] = [
  {
    year: "2021",
    chapterTitle: "An idea, in a flat white office.",
    paragraph:
      "ACTUALLY began on the south coast of the North Island, in a Cuba Street studio that smelled faintly of the harbor. The founders had spent a decade in tech and beverage R&D, watching a generation caffeinate itself toward burnout. The brief was simple: build a drink that delivered focus without the spike, the crash, or the dependency.",
    imageCaption: "Founders' first whiteboard sketch, Cuba Street, 2021",
    imageSrc: "/story/2021.svg",
  },
  {
    year: "2022",
    chapterTitle: "Formula development.",
    paragraph:
      "Working with a clinical nutrition researcher at Massey University, the team narrowed the active blend to four functional inputs: L-Theanine, Lion's Mane, Rhodiola, and Bacopa. Twelve months of iteration on flavor, dosage, and shelf stability followed. The first drinkable prototype tasted of cucumber, yuzu, and faint regret. The team kept going.",
    imageCaption: "Lab samples, formulation phase, 2022",
    imageSrc: "/story/2022.svg",
  },
  {
    year: "2023",
    chapterTitle: "Wellington launch.",
    paragraph:
      "ACTUALLY launched on a Tuesday in March, stocked at three specialty grocers across Wellington. SKU 01 Clear arrived first. The cans sold out in a week. Within a month, the brand was on the shelves of every meaningful corner store from Newtown to Karori. ACTUALLY Beverages Ltd. was officially incorporated.",
    imageCaption: "First shelf placement, Moore Wilson's Fresh, March 2023",
    imageSrc: "/story/2023.svg",
  },
  {
    year: "2024",
    chapterTitle: "A second flavor. A second city.",
    paragraph:
      "SKU 02 Dawn (ginger and bergamot) released in late winter, designed for mornings that needed momentum without the spike. ACTUALLY expanded to Auckland and Christchurch through specialty grocers and independent cafes. The brand stayed deliberately small, refusing supermarket distribution. Word of mouth carried it further than budget ever could.",
    imageCaption: "Auckland stockist launch event, July 2024",
    imageSrc: "/story/2024.svg",
  },
  {
    year: "2025",
    chapterTitle: "Late focus, by design.",
    paragraph:
      "SKU 03 Dusk (blackcurrant and manuka) closed the trio, formulated for evening work without bedtime interference. ACTUALLY crossed the Tasman with a limited launch at Melbourne specialty grocers, and was featured in Monocle's autumn wellness issue. The studio doubled in size. The cans stayed the same.",
    imageCaption: "Melbourne launch, Smith Street Grocer, September 2025",
    imageSrc: "/story/2025.svg",
  },
];

export const STORY_INTRO =
  "ACTUALLY began as a quiet rejection of caffeine-as-default. Four ingredients, three SKUs, five years of work, built to feel like baseline, not a stimulant high.";

export const CHAPTER_COUNT = STORY_CHAPTERS.length;
