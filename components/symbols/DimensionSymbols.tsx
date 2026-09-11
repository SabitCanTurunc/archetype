import React from 'react';

const commonProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ControlSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    <circle cx="12" cy="12" r="8" strokeOpacity="0.3" />
    <circle cx="12" cy="12" r="2" className="accent-path" />
  </svg>
);

export const SocialSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    <circle cx="8" cy="12" r="4" strokeOpacity="0.3" />
    <circle cx="16" cy="12" r="4" strokeOpacity="0.3" />
    <circle cx="12" cy="12" r="1.5" className="accent-path" />
  </svg>
);

export const DecisionSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    <path d="M6 20v-6a4 4 0 0 1 4-4h4" strokeOpacity="0.3" />
    <path d="M14 6l4 4-4 4" strokeOpacity="0.3" />
    <path d="M10 10l4-4" className="accent-path" />
    <circle cx="18" cy="6" r="1.5" className="accent-path" fill="currentColor" />
  </svg>
);

export const EmotionSymbol = ({ className = "" }: { className?: string }) => (
  <svg className={className} {...commonProps}>
    <path d="M4 12c3-4 5-4 8 0s5 4 8 0" strokeOpacity="0.3" />
    <path d="M4 16c3-4 5-4 8 0" className="accent-path" />
  </svg>
);
