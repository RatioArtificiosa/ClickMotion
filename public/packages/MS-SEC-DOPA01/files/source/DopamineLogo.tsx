/** Premium DOPAMINE wordmark — geometric sans matching exclusion blend footer logo */
export function DopamineLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 920 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DOPAMINE"
      role="img"
    >
      <g style={{ mixBlendMode: "exclusion" }}>
        <text
          x="0"
          y="96"
          fill="white"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="108"
          letterSpacing="-6"
        >
          DOPAMINE
        </text>
      </g>
    </svg>
  );
}
