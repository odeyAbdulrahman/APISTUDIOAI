import type { SVGProps } from "react";

export type IconName =
  | "arrow-left"
  | "bank"
  | "boxes"
  | "building"
  | "chart"
  | "check"
  | "chevron-left"
  | "chevron-right"
  | "cloud-check"
  | "contactless"
  | "file-chart"
  | "globe"
  | "pause"
  | "play"
  | "search"
  | "sparkles"
  | "star"
  | "store"
  | "trending-up"
  | "user"
  | "users";

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
};

function IconPaths({ name }: { name: IconName }) {
  switch (name) {
    case "arrow-left": return <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>;
    case "bank": return <><path d="m3 9 9-6 9 6" /><path d="M5 10h14M6 10v8m4-8v8m4-8v8m4-8v8M3 21h18M4 18h16" /></>;
    case "boxes": return <><path d="m7.5 4.3 4.5 2.6 4.5-2.6L21 7v5l-4.5 2.7L12 12 7.5 14.7 3 12V7z" /><path d="M12 7v5m-4.5 2.7V20L12 22l4.5-2v-5.3" /></>;
    case "building": return <><path d="M4 21V5l8-3v19M12 8h8v13M2 21h20" /><path d="M7 7h2m-2 4h2m-2 4h2m8-3h1m-1 4h1" /></>;
    case "chart": return <><path d="M4 19V9m6 10V5m6 14v-7m4 7V3" /><path d="M2 21h20" /></>;
    case "check": return <path d="m5 12 4 4L19 6" />;
    case "chevron-left": return <path d="m15 18-6-6 6-6" />;
    case "chevron-right": return <path d="m9 18 6-6-6-6" />;
    case "cloud-check": return <><path d="M17.5 19H7a5 5 0 0 1-.5-10A7 7 0 0 1 20 11.5 3.8 3.8 0 0 1 17.5 19Z" /><path d="m9 14 2 2 4-4" /></>;
    case "contactless": return <><path d="M7.5 8.5a5 5 0 0 1 0 7" /><path d="M10.5 5.5a9 9 0 0 1 0 13" /><path d="M13.5 2.5a13 13 0 0 1 0 19" /><circle cx="4" cy="12" r="1" /></>;
    case "file-chart": return <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 17v-3m3 3v-6m3 6v-4" /></>;
    case "globe": return <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>;
    case "pause": return <><path d="M9 7v10M15 7v10" /></>;
    case "play": return <path d="m9 7 8 5-8 5z" />;
    case "search": return <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>;
    case "sparkles": return <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2z" /><path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8zM5 12l.7 1.8L7.5 14l-1.8.7L5 16.5l-.7-1.8L2.5 14l1.8-.7z" /></>;
    case "star": return <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z" />;
    case "store": return <><path d="M4 10v10h16V10M3 4h18l-2 6a3 3 0 0 1-5 1 3 3 0 0 1-4 0 3 3 0 0 1-5-1z" /><path d="M9 20v-5h6v5" /></>;
    case "trending-up": return <><path d="m3 17 6-6 4 4 8-9" /><path d="M15 6h6v6" /></>;
    case "user": return <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>;
    case "users": return <><path d="M16 21a6 6 0 0 0-12 0" /><circle cx="10" cy="8" r="4" /><path d="M17 11a3 3 0 1 0-1-5.8M19 21a5 5 0 0 0-4-4.6" /></>;
  }
}

export function Icon({ name, size = 20, className, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" className={["ui-icon", className].filter(Boolean).join(" ")} fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        <IconPaths name={name} />
      </g>
    </svg>
  );
}
