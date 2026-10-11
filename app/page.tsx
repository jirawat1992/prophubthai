"use client";

import { useState, useRef } from "react";
import PropMatcher from "./components/PropMatcher";

interface AccountDetail {
  price: number;
  maxDailyLoss: number;
  maxTotalLoss: number;
}

interface PropFirm {
  id: string;
  name: string;
  shortName: string;
  rating: string;
  trustpilotReviews: string;
  highlight: string;
  thaiRankLabel: string;
  popularityRank: number;
  accountSizes: {
    [key: string]: AccountDetail;
  };
  drawdownType: string;
  payoutCycle: string;
  features: string[];
  discountCode: string;
  affLink: string;
  paymentMethods: string[];
}

// 🏆 5 อันดับยอดนิยม อ้างอิงสถิติ Trustpilot และความนิยมในไทยจริง
const top5Firms: PropFirm[] = [
  {
    id: "ftmo",
    name: "FTMO",
    shortName: "FT",
    rating: "4.8",
    trustpilotReviews: "25,000+ รีวิวบน Trustpilot",
    thaiRankLabel: "อันดับ 1 ในไทย (มั่นคงสูงสุด)",
    popularityRank: 1,
    highlight: "กองทุนอันดับ 1 ตลอดกาล จ่ายเงินชัวร์ 100%",
    accountSizes: { "100K": { price: 540, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Equity / Balance",
    payoutCycle: "ทุก 14 วัน (ปรับเป็นรายสัปดาห์ได้)",
    features: ["เทรดชนข่าวได้ (Swing)", "ถือข้ามสัปดาห์ได้", "ใช้ EA ได้"],
    discountCode: "ลิงก์ตรง",
    affLink: "https://trader.ftmo.com/?affiliates=pOLOGuzllgOuwxOLSsKg",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "funding-pips",
    name: "Funding Pips",
    shortName: "FP",
    rating: "4.5",
    trustpilotReviews: "23,000+ รีวิวบน Trustpilot",
    thaiRankLabel: "ยอดนิยมอันดับ 1 สายคุ้มค่าในไทย",
    popularityRank: 2,
    highlight: "ค่าสอบคุ้มค่า สเปรดแคบ ถอนไวรอบ 5 วัน",
    accountSizes: { "100K": { price: 269, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Balance Based",
    payoutCycle: "ทุก 5 วัน (รายสัปดาห์)",
    features: ["ถอนเงินไวสุด 5 วัน", "ค่าคอมมิชชั่นต่ำ", "ใช้ EA ได้"],
    discountCode: "7EKHW83Z",
    affLink: "https://app.fundingpips.com/register?referral_code=7EKHW83Z",
    paymentMethods: ["Crypto", "บัตรเครดิต"],
  },
  {
    id: "the5ers",
    name: "The5ers",
    shortName: "5E",
    rating: "4.8",
    trustpilotReviews: "6,000+ รีวิวบน Trustpilot",
    thaiRankLabel: "ยอดนิยมอันดับ 1 สาย Swing Trade",
    popularityRank: 3,
    highlight: "เปิดมาตั้งแต่ปี 2016 แผนสเกลพอร์ตโตเร็วสูงสุด $4M",
    accountSizes: { "100K": { price: 495, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Balance Based",
    payoutCycle: "ทุก 14 วัน",
    features: ["ถือข้ามสัปดาห์ได้", "เทรดชนข่าวได้", "สเกลพอร์ตได้สูงสุด $4M"],
    discountCode: "S6LS",
    affLink: "https://www.the5ers.com/?afmc=1fey",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "fundednext",
    name: "FundedNext",
    shortName: "FN",
    rating: "4.6",
    trustpilotReviews: "18,000+ รีวิวบน Trustpilot",
    thaiRankLabel: "ยอดนิยมในไทย มีทีมซัพพอร์ตภาษาไทย",
    popularityRank: 4,
    highlight: "แบ่งกำไร 15% ตั้งแต่ช่วงสอบ กฎยืดหยุ่นสูง",
    accountSizes: { "100K": { price: 319, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Balance Based",
    payoutCycle: "ทุก 14 วัน",
    features: ["รับกำไร 15% ในช่วงสอบ", "ทีมงานคนไทยดูแล", "ไม่มีจำกัดเวลาสอบ"],
    discountCode: "THETRADERM",
    affLink: "https://fundednext.com/?fpr=THETRADERM",
    paymentMethods: ["บัตรเครดิต", "Crypto"],
  },
  {
    id: "wemastertrade",
    name: "WeMasterTrade",
    shortName: "WM",
    rating: "4.6",
    trustpilotReviews: "Trustpilot Rating 4.6",
    thaiRankLabel: "อันดับ 1 รองรับสแกน QR PromptPay",
    popularityRank: 5,
    highlight: "สแกนจ่ายเงินบาทไทยได้ตรง ไม่ต้องใช้บัตรหรือ Crypto",
    accountSizes: { "100K": { price: 480, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Trailing / Balance",
    payoutCycle: "ทุก 14 วัน",
    features: ["รองรับ PromptPay สแกนจ่าย", "มีตัวเลือก Instant Funding", "รับส่วนลด 30% ทันที"],
    discountCode: "TTM30",
    affLink: "https://my.wemastertrade.com/register?ref=072952",
    paymentMethods: ["PromptPay (สแกน QR)", "Crypto", "บัตรเดบิต/เครดิต"],
  },
];

export default function Home() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const handleCopy = (code: string) => {
    if (code === "ลิงก์ตรง" || code === "รอรีวิว") return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollLeft = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-white pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white py-2.5 px-4 text-center text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2 shadow-lg">
        <span>🔥 แจกโค้ดลดค่าสอบพิเศษทุกกองทุน กรอกโค้ดลดทันที:</span>
        <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold">PROPHUB10</span>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-extrabold text-xl">P</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">PropHub</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded border border-cyan-500/30">TH</span>
            </div>
            <p className="text-xs text-slate-400">ศูนย์รวมเปรียบเทียบพอร์ตกองทุนเพื่อคนไทย</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          เปรียบเทียบ <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">พอร์ตกองทุนที่ดีที่สุด</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light">
          เทียบกฎ Drawdown, ราคาค่าสอบ, กฎเทรดข่าว พร้อมรับส่วนลดค่าสอบทันที อัปเดตข้อมูลตรงสำหรับเทรดเดอร์ไทย
        </p>
      </section>

      {/* Smart Matcher Component (ตัวกรองอัจฉริยะยังคงอยู่ตรงนี้) */}
      <PropMatcher />

      {/* 🏆 TOP 5 Rankings Horizontal Slider (ออกแบบตามต้นแบบ UI เนี้ยบ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-2.5 border border-amber-500/20">
              🏆 RANKINGS 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              TOP 5 อันดับยอดนิยมสูงสุด (Best Prop Firms)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              จัดลำดับตามความนิยมในไทย สถิติรีวิว Trustpilot จริง และประวัติการจ่ายเงิน
            </p>
          </div>

          {/* ปุ่มลูกศรเลื่อนซ้าย-ขวา */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center hover:bg-slate-800 hover:border-cyan-400 text-slate-200 transition-all shadow-md active:scale-95"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center hover:bg-slate-800 hover:border-cyan-400 text-slate-200 transition-all shadow-md active:scale-95"
            >
              →
            </button>
          </div>
        </div>

        {/* คอนเทนเนอร์การ์ดแบบปัดข้าง (Swipeable Scroll-Snap) */}
        <div
          ref={slideRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-4"
          style={{ scrollbarWidth: "none" }}
        >
          {top5Firms.map((firm) => {
            const currentAccount = firm.accountSizes["100K"];
            return (
              <div
                key={firm.id}
                className="snap-start shrink-0 w-[330px] sm:w-[410px] rounded-3xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] relative backdrop-blur-xl group"
              >
                {/* ป้ายอันดับ #1, #2, #3 */}
                <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full shadow-md shadow-amber-500/20 z-10 flex items-center gap-1">
                  <span>#{firm.popularityRank}</span>
                </div>

                <div>
                  {/* หัวการ์ด: โลโก้ + ชื่อ + คะแนนรีวิว */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center text-cyan-300 font-black text-lg shadow-inner group-hover:border-cyan-400 transition-colors">
                        {firm.shortName}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                          {firm.name}
                        </h3>
                        <p className="text-[11px] text-cyan-400 font-bold line-clamp-1">{firm.thaiRankLabel}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                        ★ {firm.rating}
                      </span>
                    </div>
                  </div>

                  {/* แถบระบุความน่าเชื่อถือ Trustpilot จริง */}
                  <div className="text-[11px] text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{firm.trustpilotReviews}</span>
                  </div>

                  {/* สรุปจุดเด่นประจำกองทุน */}
                  <p className="text-xs text-slate-300 font-medium mb-4 line-clamp-1 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                    💡 {firm.highlight}
                  </p>

                  {/* กล่องราคาและรอบการถอนเงิน */}
                  <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4">
                    <div>
                      <span className="text-[11px] text-slate-400 block">พอร์ตขนาด $100K</span>
                      <span className="text-xl font-black text-white">${currentAccount.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">รอบการถอนกำไร</span>
                      <span className="text-xs font-bold text-cyan-300 block mt-1">{firm.payoutCycle}</span>
                    </div>
                  </div>

                  {/* จุดเด่นสำคัญ */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {firm.features.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 px-2.5 py-1 rounded-lg"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ปุ่มคัดลอกโค้ดและปุ่มสมัคร */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(firm.discountCode)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all flex items-center justify-center gap-1 hover:border-slate-500 active:scale-95"
                  >
                    <span>{copiedCode === firm.discountCode ? "✓ คัดลอกแล้ว" : `โค้ด: ${firm.discountCode}`}</span>
                  </button>

                  <a
                    href={firm.affLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                  >
                    สมัครสอบ →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📚 ส่วนบทความและคู่มือยอดนิยม (Knowledge Hub) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-500/20">
              📚 KNOWLEDGE HUB
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              บทความและคู่มือยอดนิยม
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              รวมเทคนิคการสอบพอร์ตกองทุน วิเคราะห์กฎสำคัญ และวิธีบริหารพอร์ตให้ยั่งยืน
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tag: "คู่มือมือใหม่",
              readTime: "อ่าน 4 นาที",
              title: "วิธีเลือกพอร์ตกองทุน Forex ฉบับอัปเดต 2026 เลือกแบบไหนให้เหมาะกับคุณ",
              desc: "เปรียบเทียบข้อดี-ข้อเสียของโมเดล 1-Step, 2-Step และ Instant Funding พร้อมเช็กความน่าเชื่อถือ",
            },
            {
              tag: "การบริหารความเสี่ยง",
              readTime: "อ่าน 6 นาที",
              title: "เจาะลึก Balance Drawdown vs Equity Drawdown ต่างกันอย่างไร?",
              desc: "ทำความเข้าใจกฎตัดขาดทุนที่เทรดเดอร์มือใหม่ตกม้าตายบ่อยที่สุด เพื่อป้องกันพอร์ตแตกก่อนครบสัญญา",
            },
            {
              tag: "เทคนิคการชำระเงิน",
              readTime: "อ่าน 3 นาที",
              title: "วิธีซื้อพอร์ตสอบด้วย QR PromptPay เงินบาทไทย ไม่ต้องมีบัตรเครดิต",
              desc: "ขั้นตอนการสั่งซื้อพอร์ตผ่านระบบพร้อมเพย์ รวดเร็ว ค่าธรรมเนียมต่ำ และเริ่มสอบได้ทันที",
            },
          ].map((post, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-0.5 rounded">
                    {post.tag}
                  </span>
                  <span className="text-slate-500">{post.readTime}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {post.desc}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>อ่านบทความเต็ม</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center text-xs text-slate-500 border-t border-slate-800/80 pt-8">
        <p>© 2026 PropHub TH. รวบรวมข้อมูลเปรียบเทียบพอร์ตกองทุน Forex เพื่อเทรดเดอร์ไทย</p>
        <p className="mt-2 text-slate-600">การซื้อพอร์ตสอบมีความเสี่ยง โปรดศึกษาเงื่อนไขและกฎของแต่ละกองทุนอย่างละเอียดก่อนตัดสินใจ</p>
      </footer>
    </main>
  );
}