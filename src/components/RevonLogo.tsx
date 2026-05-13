interface RevonLogoProps {
  size?: number
  showWordmark?: boolean
  horizontal?: boolean
}

export function RevonLogo({ size = 40, showWordmark = false, horizontal = false }: RevonLogoProps) {
  const h = size
  const w = Math.round(size * 0.75)

  return (
    <div className={`flex items-center gap-3 ${horizontal ? 'flex-row' : 'flex-col'}`}>
      <svg width={w} height={h} viewBox="0 0 60 80" fill="none">
        <defs>
          <linearGradient id="s1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3BFFA0" stopOpacity="0"/>
            <stop offset="50%" stopColor="#3BFFA0"/>
            <stop offset="100%" stopColor="#3BFFA0" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="s2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3BFFA0" stopOpacity="0"/>
            <stop offset="40%" stopColor="#3BFFA0"/>
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="s3" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00D4AA" stopOpacity="0"/>
            <stop offset="30%" stopColor="#00D4AA"/>
            <stop offset="100%" stopColor="#00B8D4" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="s4" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00B8D4" stopOpacity="0"/>
            <stop offset="25%" stopColor="#4A90E2"/>
            <stop offset="100%" stopColor="#4A90E2" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="s5" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#4A90E2" stopOpacity="0"/>
            <stop offset="35%" stopColor="#7E57C2"/>
            <stop offset="100%" stopColor="#7E57C2" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="s6" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#7E57C2" stopOpacity="0"/>
            <stop offset="50%" stopColor="#7E57C2"/>
            <stop offset="100%" stopColor="#7E57C2" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="s7" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#CE59B2" stopOpacity="0"/>
            <stop offset="50%" stopColor="#CE59B2"/>
            <stop offset="100%" stopColor="#CE59B2" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect x="0"  y="51" width="6"  height="29" rx="3"   fill="url(#s1)"/>
        <rect x="9"  y="33" width="5"  height="47" rx="2.5" fill="url(#s2)"/>
        <rect x="17" y="14" width="7"  height="66" rx="3.5" fill="url(#s3)"/>
        <rect x="27" y="0"  width="8"  height="80" rx="4"   fill="url(#s4)"/>
        <rect x="38" y="22" width="7"  height="58" rx="3.5" fill="url(#s5)"/>
        <rect x="48" y="38" width="5"  height="42" rx="2.5" fill="url(#s6)"/>
        <rect x="56" y="51" width="4"  height="29" rx="2"   fill="url(#s7)"/>
      </svg>

      {showWordmark && (
        <div className={`flex ${horizontal ? 'items-baseline gap-1' : 'flex-col items-center'}`}>
          <span
            className="font-black"
            style={{
              fontSize: size * 0.45,
              background: 'linear-gradient(135deg, #3BFFA0 0%, #00D4AA 30%, #4A90E2 60%, #7E57C2 85%, #CE59B2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
            }}
          >
            Revon
          </span>
          <span
            className="font-light tracking-widest uppercase text-[#8BACD4]"
            style={{ fontSize: size * 0.2 }}
          >
            Finance
          </span>
        </div>
      )}
    </div>
  )
}
