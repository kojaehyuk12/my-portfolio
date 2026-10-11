const paths = {
  folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3V7Z" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  branch: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M6 7v10m12-10v2a6 6 0 0 1-6 6H6" /></>,
  pin: <><path d="m9 3 12 12-3 1-3-3-5 5-4-4 5-5-3-3 1-3Zm-1 13-5 5" /></>,
  arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  down: <><path d="M12 4v16m-6-6 6 6 6-6" /></>,
  up: <><path d="M12 20V4m-6 6 6-6 6 6" /></>,
  chevron: <path d="m9 5 7 7-7 7" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" /></>,
  window: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>,
  server: <><rect x="3" y="3" width="18" height="7" rx="2" /><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M7 6.5h.01M7 17.5h.01M17 6.5h1M17 17.5h1" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></>,
  trophy: <><path d="M8 3h8v7a4 4 0 0 1-8 0V3Zm4 11v7M8 21h8M8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4" /></>,
  education: <><path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 3 8 3 12 0v-7m4-2v9" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18M7 15h2m6 0h2M7 18h2" /></>,
  person: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
  link: <><path d="m10 13 4-4m-5 6-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 12a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-2 2" transform="translate(1 0) scale(.92)" /></>,
  spark: <><path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z" /></>,
  book: <><path d="M12 5c-4-3-8-2-10-1v15c3-1 7-2 10 1 3-3 7-2 10-1V4c-2-1-6-2-10 1Zm0 0v15" /></>,
  github: <><path d="M9 19c-4.3 1.2-4.3-2-6-2m12 5v-3.9c.04-1.07-.37-2.1-1.14-2.84 3.8-.42 7.8-1.86 7.8-8.4a6.5 6.5 0 0 0-1.8-4.51A6 6 0 0 0 19.75-2S18.3-2.42 15 0a15.5 15.5 0 0 0-8 0C3.7-2.42 2.25-2 2.25-2a6 6 0 0 0-.11 4.35A6.5 6.5 0 0 0 .34 6.9c0 6.5 4 8 7.8 8.4A3.65 3.65 0 0 0 7 18.1V22" transform="translate(2 4) scale(.82)" /></>,
};

export default function Icon({ name, size = 20, className = '' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name] || paths.code}</svg>;
}
