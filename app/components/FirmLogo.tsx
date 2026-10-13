interface FirmLogoProps {
  id: string;
}

export default function FirmLogo({ id }: FirmLogoProps) {
  // แมปโดเมนหลักของแต่ละกองทุนเพื่อดึง Favicon/Logo คุณภาพสูงจาก CDN
  const domains: Record<string, string> = {
    "ftmo": "ftmo.com",
    "funding-pips": "fundingpips.com",
    "the5ers": "the5ers.com",
    "fundednext": "fundednext.com",
    "wemastertrade": "wemastertrade.com",
    "ic-funded": "icfunded.com",
    "blue-guardian": "blueguardian.com",
    "e8-markets": "e8markets.com",
    "alpha-capital": "alphacapitalgroup.uk",
    "upcomers": "upcomers.com",
  };

  const domain = domains[id] || "ftmo.com";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={`${id} logo`}
        className="w-7 h-7 object-contain rounded-md"
        loading="lazy"
      />
    </div>
  );
}