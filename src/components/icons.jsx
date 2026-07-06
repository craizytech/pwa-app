const defaults = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function AlertTriangleIcon(props) {
  return (
    <svg {...defaults} {...props}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function WifiOffIcon(props) {
  return (
    <svg {...defaults} {...props}>
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.8" />
      <path d="M19 12.55a10.94 10.94 0 0 0-2.5-1.9" />
      <path d="M2 8.82a16 16 0 0 1 4.17-2.65" />
      <path d="M22 8.82a15.91 15.91 0 0 0-11.29-4.02" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}
