interface RoBoothLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function RoBoothLogo({ size = 'md' }: RoBoothLogoProps) {
  const sizeClasses = {
    sm: { width: 28, height: 32, text: 'text-sm', gap: 'gap-0.5' },
    md: { width: 48, height: 56, text: 'text-2xl', gap: 'gap-0' },
    lg: { width: 56, height: 64, text: 'text-3xl', gap: 'gap-1' },
    xl: { width: 72, height: 80, text: 'text-4xl', gap: 'gap-2' },
    '2xl': { width: 96, height: 108, text: 'text-6xl', gap: 'gap-3' },
  };

  const config = sizeClasses[size];

  return (
    <div className={`flex items-center ${config.gap} font-bold ${config.text}`}>
      <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Ro</span>
      
      {/* Robot integrated as the "B" */}
      <svg
        viewBox="0 0 60 70"
        width={config.width}
        height={config.height}
        className="mx-px drop-shadow-lg"
      >
        {/* Robot Body - main torso (B shape suggestion) */}
        <g>
          {/* Head */}
          <rect x="16" y="8" width="28" height="20" rx="4" fill="url(#robotGradient)" />
          
          {/* Eyes */}
          <circle cx="24" cy="15" r="3.5" fill="white" />
          <circle cx="36" cy="15" r="3.5" fill="white" />
          
          {/* Mouth - simple line */}
          <line x1="24" y1="22" x2="36" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Antenna Left */}
          <line x1="22" y1="8" x2="20" y2="-2" stroke="url(#robotGradient)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="-3" r="2" fill="url(#robotGradient)" />
          
          {/* Antenna Right */}
          <line x1="38" y1="8" x2="40" y2="-2" stroke="url(#robotGradient)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="-3" r="2" fill="url(#robotGradient)" />
          
          {/* Body/Chest */}
          <rect x="14" y="28" width="32" height="24" rx="3" fill="url(#robotGradient)" />
          
          {/* Chest panel lines - suggests B curve */}
          <circle cx="25" cy="35" r="2.5" fill="white" opacity="0.8" />
          <circle cx="35" cy="35" r="2.5" fill="white" opacity="0.8" />
          <circle cx="25" cy="45" r="2.5" fill="white" opacity="0.8" />
          <circle cx="35" cy="45" r="2.5" fill="white" opacity="0.8" />
          
          {/* Left Arm */}
          <rect x="2" y="32" width="12" height="6" rx="2" fill="url(#robotGradient)" />
          <rect x="0" y="35" width="4" height="5" rx="1.5" fill="url(#robotGradient)" />
          
          {/* Right Arm */}
          <rect x="46" y="32" width="12" height="6" rx="2" fill="url(#robotGradient)" />
          <rect x="56" y="35" width="4" height="5" rx="1.5" fill="url(#robotGradient)" />
          
          {/* Left Leg */}
          <rect x="18" y="52" width="6" height="18" rx="2" fill="url(#robotGradient)" />
          <rect x="16" y="68" width="10" height="4" rx="1.5" fill="url(#robotGradient)" />
          
          {/* Right Leg */}
          <rect x="36" y="52" width="6" height="18" rx="2" fill="url(#robotGradient)" />
          <rect x="34" y="68" width="10" height="4" rx="1.5" fill="url(#robotGradient)" />
        </g>
        
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>
      
      <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">ooth</span>
    </div>
  );
}
