/** Line-art botanicals for Inside stages (drawSVG targets via data-bot). */

const STROKE = {
  fill: "none" as const,
  stroke: "rgba(239,237,230,0.65)",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Props = { stage: number };

export function BotanicalIcon({ stage }: Props) {
  if (stage === 0) {
    // Leaf — L-Theanine
    return (
      <>
        <path
          data-bot
          {...STROKE}
          d="M 24 6 C 34 14 37 28 24 42 C 11 28 14 14 24 6 Z"
        />
        <path data-bot {...STROKE} d="M 24 12 L 24 38" />
        <path data-bot {...STROKE} d="M 24 20 C 27 19 29 17 30 15" />
        <path data-bot {...STROKE} d="M 24 28 C 20 27 18 25 17 22" />
      </>
    );
  }
  if (stage === 1) {
    // Mushroom — Lion's Mane
    return (
      <>
        <path data-bot {...STROKE} d="M 10 24 C 10 12 38 12 38 24" />
        <path data-bot {...STROKE} d="M 13 24 L 13 32" />
        <path data-bot {...STROKE} d="M 19 24 L 19 38" />
        <path data-bot {...STROKE} d="M 25 24 L 25 34" />
        <path data-bot {...STROKE} d="M 31 24 L 31 40" />
        <path data-bot {...STROKE} d="M 36 24 L 36 30" />
      </>
    );
  }
  if (stage === 2) {
    // Root — Rhodiola
    return (
      <>
        <path data-bot {...STROKE} d="M 24 6 L 24 20" />
        <path data-bot {...STROKE} d="M 24 20 C 17 26 15 33 13 42" />
        <path data-bot {...STROKE} d="M 24 20 C 31 26 33 33 35 42" />
        <path data-bot {...STROKE} d="M 24 20 L 24 40" />
        <path data-bot {...STROKE} d="M 19 30 L 15 32" />
        <path data-bot {...STROKE} d="M 29 32 L 33 34" />
      </>
    );
  }
  // Leaves — Bacopa
  return (
    <>
      <path data-bot {...STROKE} d="M 24 42 C 24 30 24 18 24 8" />
      <path
        data-bot
        {...STROKE}
        d="M 24 34 C 19 34 16 31 15 28 C 20 28 23 30 24 34 Z"
      />
      <path
        data-bot
        {...STROKE}
        d="M 24 34 C 29 34 32 31 33 28 C 28 28 25 30 24 34 Z"
      />
      <path
        data-bot
        {...STROKE}
        d="M 24 22 C 20 22 17 19 16 16 C 21 16 23 18 24 22 Z"
      />
      <path
        data-bot
        {...STROKE}
        d="M 24 22 C 28 22 31 19 32 16 C 27 16 25 18 24 22 Z"
      />
    </>
  );
}
