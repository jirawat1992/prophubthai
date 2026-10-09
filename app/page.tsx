'use client';

import { useState } from 'react';

interface PropFirm {
  id: string;
  name: string;
  rank: number;
  badge: string;
  rating: string;
  reviews: string;
  highlight: string;
  payoutSpeed: string;
  newsTrade: boolean;
  weekendHold: boolean;
  eaAllowed: boolean;
  dailyDDType: string;
  maxDD: string;
  payoutCycle: string;
  prices: Record<string, number>;
  discountCode: string;
  affLink: string;
}

const propFirms: PropFirm[] = [
  {
    id: 'ftmo',
    name: 'FTMO',
    rank: 1,
    badge: 'อันดับ 1 มั่นคงที่สุดในโลก',
    rating: '4.9',
    reviews: '5,800+',
    highlight: 'ประวัติการจ่ายเงินยาวนานกว่า 10 ปี ถอนเงินชัวร์ 100% มีระบบซัพพอร์ตมืออาชีพ',
    payoutSpeed: '1-2 วันทำการ',
    newsTrade: true,
    weekendHold: true,
    eaAllowed: true,
    dailyDDType: 'Equity / Balance (5%)',
    maxDD: '10%',
    payoutCycle: 'ทุก 14 วัน (ปรับเป็นรายสัปดาห์ได้)',
    prices: { '10k': 155, '50k': 345, '100k': 540, '200k': 1080 },
    discountCode: 'PROPHUB10',
    affLink: 'https://ftmo.com'
  },
  {
    id: 'funding-pips',
    name: 'Funding Pips',
    rank: 2,
    badge: 'ขวัญใจเทรดเดอร์ไทย',
    rating: '4.8',
    reviews: '1,420+',
    highlight: 'ราคาค่าสอบถูกที่สุดในตลาด กฎ Daily Drawdown คิดจาก Balance พอร์ตไม่แตกง่าย',
    payoutSpeed: 'ทุกวันอังคาร',
    newsTrade: true,
    weekendHold: true,
    eaAllowed: true,
    dailyDDType: 'Balance Based (5%)',
    maxDD: '10%',
    payoutCycle: 'ทุก 5 วัน (รายสัปดาห์)',
    prices: { '10k': 32, '50k': 139, '100k': 269, '200k': 538 },
    discountCode: 'PROPHUB10',
    affLink: 'https://fundingpips.com'
  },
  {
    id: 'fundednext',
    name: 'FundedNext',
    rank: 3,
    badge: 'แถมเงินกำไร 15% ช่วงสอบ',
    rating: '4.7',
    reviews: '2,100+',
    highlight: 'แจกส่วนแบ่งกำไรตั้งแต่รอบ Challenge แม้ยังไม่ผ่านรอบจริง มีแอดมินดูแลภาษาไทย',
    payoutSpeed: '24 ชั่วโมง',
    newsTrade: true,
    weekendHold: true,
    eaAllowed: true,
    dailyDDType: 'Balance Based (5%)',
    maxDD: '10%',
    payoutCycle: 'ทุก 14 วัน',
    prices: { '10k': 59, '50k': 199, '100k': 319, '200k': 599 },
    discountCode: 'PROPHUB10',
    affLink: 'https://fundednext.com'
  },
  {
    id: 'alpha-capital',
    name: 'Alpha Capital Group',
    rank: 4,
    badge: 'ฟรีค่าคอมมิชชั่น / สเปรด 0',
    rating: '4.7',
    reviews: '980+',
    highlight: 'มีแพลตฟอร์มโบรกเกอร์ของตัวเอง สเปรดแคบมาก และไม่มีค่าสว็อปในหลายสินทรัพย์',
    payoutSpeed: '1-3 วันทำการ',
    newsTrade: true,
    weekendHold: true,
    eaAllowed: true,
    dailyDDType: 'Balance Based (5%)',
    maxDD: '10%',
    payoutCycle: 'ทุก 14 วัน',
    prices: { '10k': 65, '50k': 245, '100k': 395, '200k': 790 },
    discountCode: 'PROPHUB10',
    affLink: 'https://alphacapitalgroup.uk'
  },
  {
    id: 'the-5ers',
    name: 'The5ers',
    rank: 5,
    badge: 'สายขยายพอร์ตทุนสูง (Scaling)',
    rating: '4.8',
    reviews: '3,200+',
    highlight: 'โมเดลเพิ่มทุนไวสูงสุดถึง 4 ล้านดอลลาร์ และมีระบบ Bootcamp ค่าสมัครสอบเริ่มต้นสบายกระเป๋า',
    payoutSpeed: '1-2 วันทำการ',
    newsTrade: true,
    weekendHold: true,
    eaAllowed: true,
    dailyDDType: 'Equity Based (4%)',
    maxDD: '10%',
    payoutCycle: 'ทุก 14 วัน',
    prices: { '10k': 85, '50k': 235, '100k': 450, '200k': 850 },
    discountCode: 'PROPHUB10',
    affLink: 'https://the5ers.com'
  }
];

export default function Home() {
  const [accountSize, setAccountSize] = useState<string>('100k');
  const [filterNews, setFilterNews] = useState<boolean>(false);
  const [filterWeekend, setFilterWeekend] = useState<boolean>(false);
  const [filterEA, setFilterEA] = useState<boolean>(false);

  const filteredFirms = propFirms.filter((firm) => {
    if (filterNews && !firm.newsTrade) return false;
    if (filterWeekend && !firm.weekendHold) return false;
    if (filterEA && !firm.eaAllowed) return false;
    return true;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`คัดลอกโค้ดส่วนลด "${code}" เรียบร้อยแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 text-white text-xs font-semibold py-2.5 px-4 text-center">
        🔥 แจกโค้ดลดค่าสอบ 10% ทุกกองทุน กรอกโค้ด: <span className="bg-black/30 px-2 py-0.5 rounded font-mono font-bold">PROPHUB10</span>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0e1626]/80 backdrop-blur sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/20">
              P
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                PropHub <span className="text-xs bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-mono">TH</span>
              </span>
              <p className="text-[11px] text-slate-400">ศูนย์รวมเปรียบเทียบพอร์ตกองทุนเพื่อคนไทย</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            เปรียบเทียบ <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">พอร์ตกองทุนที่ดีที่สุด</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            เทียบกฎ Drawdown, ราคาค่าสอบ, กฎเทรดข่าว พร้อมรับส่วนลดค่าสอบทันที
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#131d2e] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <span className="text-xs font-semibold uppercase text-slate-400">
              เลือกขนาดพอร์ตที่ต้องการสอบ:
            </span>
            <div className="inline-flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              {['10k', '50k', '100k', '200k'].map((size) => (
                <button
                  key={size}
                  onClick={() => setAccountSize(size)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    accountSize === size
                      ? 'bg-sky-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ${size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">ตัวกรอง:</span>
            <button
              onClick={() => setFilterNews(!filterNews)}
              className={`px-3 py-1.5 rounded-lg border transition ${
                filterNews
                  ? 'bg-sky-600 text-white border-sky-500'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              📰 เทรดชนข่าวได้
            </button>
            <button
              onClick={() => setFilterWeekend(!filterWeekend)}
              className={`px-3 py-1.5 rounded-lg border transition ${
                filterWeekend
                  ? 'bg-sky-600 text-white border-sky-500'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              📅 ถือข้ามสัปดาห์ได้
            </button>
            <button
              onClick={() => setFilterEA(!filterEA)}
              className={`px-3 py-1.5 rounded-lg border transition ${
                filterEA
                  ? 'bg-sky-600 text-white border-sky-500'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              🤖 ใช้ EA ได้
            </button>
          </div>
        </div>

        {/* Dynamic Firm Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFirms.map((firm) => (
            <div
              key={firm.id}
              className="bg-[#131d2e] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                    {firm.badge}
                  </span>
                  <span className="text-xs text-amber-400 font-bold">
                    ★ {firm.rating}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{firm.name}</h3>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 mb-4 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">ขนาด ${accountSize.toUpperCase()}</span>
                  <span className="text-2xl font-black text-white font-mono">
                    ${firm.prices[accountSize]}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 mb-6">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Daily Drawdown</span>
                    <span>{firm.dailyDDType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Max Drawdown</span>
                    <span>{firm.maxDD}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">รอบการถอนกำไร</span>
                    <span className="text-emerald-400 font-semibold">{firm.payoutCycle}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleCopy(firm.discountCode)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition"
                >
                  📋 ก็อปโค้ดลด: <strong className="font-mono text-sky-400">{firm.discountCode}</strong>
                </button>
                <a
                  href={firm.affLink}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow transition"
                >
                  สมัครสอบ {firm.name} ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION: TOP 5 BEST PROP FIRMS (จัดอันดับยอดนิยมสูงสุด) */}
        <section className="pt-6 border-t border-slate-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                🏆 Rankings 2026
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                TOP 5 กองทุนยอดนิยมสูงสุด (Best Prop Firms)
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              จัดอันดับจากสถิติการจ่ายเงินจริง ความน่าเชื่อถือ และความคุ้มค่าสำหรับคนไทย
            </p>
          </div>

          <div className="space-y-3">
            {propFirms.slice(0, 5).map((firm) => (
              <div
                key={`rank-${firm.id}`}
                className="bg-[#131d2e] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
              >
                {/* Left: Rank Number + Details */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${
                    firm.rank === 1 ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' :
                    firm.rank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-400/30' :
                    firm.rank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-600/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    #{firm.rank}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-bold text-white">{firm.name}</span>
                      <span className="text-[10px] font-semibold text-sky-400 bg-sky-950/80 border border-sky-800/40 px-2 py-0.5 rounded-md">
                        {firm.badge}
                      </span>
                      <span className="text-xs text-amber-400 font-medium">★ {firm.rating}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {firm.highlight}
                    </p>
                  </div>
                </div>

                {/* Right: Quick Stats & Action Button */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-left md:text-right pr-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">สปีดการจ่ายเงิน</span>
                    <span className="text-xs font-semibold text-emerald-400">{firm.payoutSpeed}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(firm.discountCode)}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs transition"
                      title="คัดลอกโค้ดส่วนลด"
                    >
                      📋 {firm.discountCode}
                    </button>
                    <a
                      href={firm.affLink}
                      target="_blank"
                      rel="nofollow sponsored"
                      className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs transition shrink-0"
                    >
                      รับดีล ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}