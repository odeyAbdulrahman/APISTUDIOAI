export type BusinessLogoKind =
  | "burger"
  | "coffee"
  | "dokan"
  | "market"
  | "dining"
  | "retail";

type BusinessLogoMarkProps = { kind: BusinessLogoKind };

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function BusinessLogoMark({ kind }: BusinessLogoMarkProps) {
  return (
    <span className={`business-logo-icon business-logo-icon--${kind}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {kind === "burger" && <>
          <path {...line} d="M11 22c.8-6.7 5.9-11 13-11s12.2 4.3 13 11H11Z" />
          <path {...line} d="M10 27h28M12 32h24l-1.5 4.2A3 3 0 0 1 31.7 38H16.3a3 3 0 0 1-2.8-1.8L12 32Z" />
          <path {...line} d="m15 27 3.4 3 4.1-3 4.1 3 3.9-3 2.8 3M18 16l1.5 1M24 14.5V16M30 16l-1.5 1" />
        </>}

        {kind === "coffee" && <>
          <path {...line} d="M12 19h23v10a9 9 0 0 1-9 9h-5a9 9 0 0 1-9-9V19Z" />
          <path {...line} d="M35 22h2a5 5 0 0 1 0 10h-3M18 14c-2-2-.2-3.4 1-5M25 14c-2-2-.2-3.4 1-5M10 39h28" />
        </>}

        {kind === "dokan" && <>
          <path {...line} d="M10 19h28l-3-8H13l-3 8ZM11 19v18h26V19" />
          <path {...line} d="M9.5 19a4 4 0 0 0 7 2.7A4 4 0 0 0 24 21.7a4 4 0 0 0 7.5 0 4 4 0 0 0 7-2.7M17 37V28h14v9" />
        </>}

        {kind === "market" && <>
          <path {...line} d="M10 20h28l-2 15H12l-2-15Zm7 0 3-9M31 20l-3-9M16 26h16M15 31h18M18 24v8M24 24v8M30 24v8" />
        </>}

        {kind === "dining" && <>
          <circle {...line} cx="24" cy="24" r="16" />
          <path {...line} d="M18 13v9M14.5 13v5c0 2.2 1.6 4 3.5 4s3.5-1.8 3.5-4v-5M18 22v13M29 35V13c3.1 1.4 5 4.4 5 8v4h-5" />
        </>}

        {kind === "retail" && <>
          <path {...line} d="M9.5 24.5 22 12h12l5 5v12L26.5 41.5l-17-17Z" />
          <circle {...line} cx="30.5" cy="20.5" r="2.3" />
          <path {...line} d="m19 25 10 10M27.5 24.5l-9 9" />
        </>}
      </svg>
      <span className="business-logo-icon-accent" />
    </span>
  );
}
