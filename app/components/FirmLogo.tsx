interface FirmLogoProps {
  id: string;
}

export default function FirmLogo({ id }: FirmLogoProps) {
  switch (id) {
    case "ftmo":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <polygon points="50,15 80,35 65,45 50,35 35,45 20,35" fill="#38bdf8" />
          <polygon points="50,45 80,65 65,75 50,65 35,75 20,65" fill="#ffffff" />
          <polygon points="50,75 65,85 50,95 35,85" fill="#38bdf8" />
        </svg>
      );

    case "funding-pips":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <path d="M28 20 H54 C68 20 74 32 68 45 C62 54 52 54 38 54 V80 H28 Z" fill="#22d3ee" />
          <path d="M42 36 H52 C57 36 58 41 53 41 H42 Z" fill="#040d1a" />
          <polygon points="62,50 82,72 70,72 54,54" fill="#38bdf8" />
        </svg>
      );

    case "the5ers":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <text
            x="50%"
            y="56%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#fbbf24"
            fontWeight="900"
            fontSize="46"
            fontStyle="italic"
            fontFamily="sans-serif"
          >
            5%
          </text>
        </svg>
      );

    case "fundednext":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <path d="M25 25 H55 V38 H40 V48 H52 V61 H40 V75 H25 Z" fill="#818cf8" />
          <path d="M58 75 V25 H72 L72 58 L72 75 Z" fill="#38bdf8" />
          <polygon points="62,25 76,55 76,25" fill="#c084fc" />
        </svg>
      );

    case "wemastertrade":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <path
            d="M20 30 L32 70 L44 42 L56 70 L68 30 L80 70"
            fill="none"
            stroke="#34d399"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "ic-funded":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <rect x="22" y="22" width="56" height="56" rx="14" fill="#0284c7" />
          <text
            x="50%"
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#ffffff"
            fontWeight="900"
            fontSize="30"
            fontFamily="sans-serif"
          >
            IC
          </text>
        </svg>
      );

    case "blue-guardian":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <path
            d="M50 18 L76 28 V50 C76 68 64 80 50 86 C36 80 24 68 24 50 V28 Z"
            fill="#1e3a8a"
            stroke="#38bdf8"
            strokeWidth="6"
          />
          <polygon points="50,34 58,48 50,66 42,48" fill="#38bdf8" />
        </svg>
      );

    case "e8-markets":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#e879f9"
            fontWeight="900"
            fontSize="38"
            fontFamily="sans-serif"
          >
            E8
          </text>
        </svg>
      );

    case "alpha-capital":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <circle cx="50" cy="50" r="32" stroke="#94a3b8" strokeWidth="6" fill="none" />
          <path
            d="M38 58 C42 42 58 42 62 58 C62 68 46 68 38 58 Z"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="7"
          />
        </svg>
      );

    case "upcomers":
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <path
            d="M26 62 L50 36 L74 62"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36 76 L50 60 L64 76"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return <span className="font-black text-cyan-400 text-lg">PH</span>;
  }
}