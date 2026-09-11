import React from 'react';

// Common SVG props
const commonProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ObserverSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    {/* Abstract eye-like form */}
    <path d="M4 12c3.5-4.5 9.5-4.5 13 0-3.5 4.5-9.5 4.5-13 0Z" />
    <circle cx="10.5" cy="12" r="1.5" className="accent-path transition-colors duration-500" />
  </svg>
);

export const StrategistSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    {/* Geometric grid with highlighted path */}
    <path d="M3 3h18v18H3z" strokeOpacity="0.2" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeOpacity="0.2" />
    <path d="M3 9h6v6h6v6" className="accent-path transition-colors duration-500" strokeWidth="1.5" />
  </svg>
);

export const DiplomatSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    {/* Opposing geometric forms connected */}
    <circle cx="6" cy="12" r="3" />
    <rect x="15" y="9" width="6" height="6" />
    <line x1="9" y1="12" x2="15" y2="12" className="accent-path transition-colors duration-500" />
  </svg>
);

export const MaverickSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    {/* Grid line breaking away */}
    <path d="M4 18h16" strokeOpacity="0.3" />
    <path d="M4 12h8" strokeOpacity="0.3" />
    <path d="M12 12l5-7h4" className="accent-path transition-colors duration-500" />
  </svg>
);

export const EmpathSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    {/* Overlapping circles */}
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" />
    <path d="M12 8.16A4.98 4.98 0 0 0 12 15.84" className="accent-path transition-colors duration-500" />
  </svg>
);

export const EnigmaSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    {/* Incomplete geometric shape */}
    <path d="M12 3L4 9v6l8 6 8-6v-2" />
    <circle cx="12" cy="12" r="1.5" className="accent-path transition-colors duration-500" />
  </svg>
);
