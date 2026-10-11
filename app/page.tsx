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
  rating: string;
  highlight: string;
  popularityRank: number; // ลำดับความนิยม (ผู้ใช้เยอะสุด)
  accountSizes: {
    [key: string]: AccountDetail;
  };
  drawdownType: string;
  payoutCycle: string;
  features: string[];
  discountCode: string;
  affLink: string;
  paymentMethods: string[];
  userCountLabel: string; // ปริมาณผู้ใช้
}

// ข้อมูล 5 กองทุนยอดนิยม (เรียงตามปริมาณผู้ใช้งานจริง: อันดับ 1-5)
const top5Firms: PropFirm[] = [
  {
    id: "ftmo",
    name: "FTMO",
    rating: "4.9",
    popularityRank: 1,
    userCountLabel: "ผู้ใช้มากกว่า 50,000+ คน (สูงสุด)",
    highlight: "อันดับ 1 มั่นคงที่สุดในโลก จ่ายเงินชัวร์ 100%",
    accountSizes: { "100K": { price: 540, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Equity / Balance",
    payoutCycle: "ทุก 14 วัน (ปรับเป็นสัปดาห์ได้)",
    features: ["เทรดชนข่าวได้ (Swing)", "ถือข้ามสัปดาห์ได้", "ใช้ EA ได้"],
    discountCode: "ลิงก์ตรง",
    affLink: "https://trader.ftmo.com/?affiliates=pOLOGuzllgOuwxOLSsKg",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "funding-pips",
    name: "Funding Pips",
    rating: "4.8",
    popularityRank: 2,
    userCountLabel: "ผู้ใช้มากกว่า 42,000+ คน",
    highlight: "ขวัญใจเทรดเดอร์ไทย ค่าสอบคุ้มค่า สเปรดแคบ ถอนไว",
    accountSizes: { "100K": { price: 269, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Balance Based",
    payoutCycle: "ทุก 5 วัน (รายสัปดาห์)",
    features: ["ถอนเงินไวสุด 5 วัน", "ค่าคอมมิชชั่นถูก", "ใช้ EA ได้"],
    discountCode: "7EKHW83Z",
    affLink: "https://app.fundingpips.com/register?referral_code=7EKHW83Z",
    paymentMethods: ["Crypto", "บัตรเครดิต"],
  },
  {
    id: "fundednext",
    name: "FundedNext",
    rating: "4.7",
    popularityRank: 3,
    userCountLabel: "ผู้ใช้มากกว่า 35,000+ คน",
    highlight: "รับส่วนแบ่งกำไร 15% ตั้งแต่ช่วงสอบ มีซัพพอร์ตภาษาไทย",
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
    rating: "4.7",
    popularityRank: 4,
    userCountLabel: "ผู้ใช้มากกว่า 28,000+ คน (สแกนจ่ายเยอะสุด)",
    highlight: "สแกนจ่าย QR PromptPay เงินบาทไทยได้โดยตรง",
    accountSizes: { "100K": { price: 480, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Trailing / Balance",
    payoutCycle: "ทุก 14 วัน",
    features: ["รองรับ PromptPay สแกนจ่าย", "มีตัวเลือก Instant Funding", "รับส่วนลด 30% ทันที"],
    discountCode: "TTM30",
    affLink: "https://my.wemastertrade.com/register?ref=072952",
    paymentMethods: ["PromptPay (สแกน QR)", "Crypto", "บัตรเดบิต/เครดิต"],
  },
  {
    id: "the5ers",
    name: "The5ers",
    rating: "4.8",
    popularityRank: 5,
    userCountLabel: "ผู้ใช้มากกว่า 25,000+ คน",
    highlight: "สายสวิงเทรด บัญชี High Stakes แผนสเกลพอร์ตโตเร็ว",
    accountSizes: { "100K": { price: 495, maxDailyLoss: 5000, maxTotalLoss: 10000 } },
    drawdownType: "Balance Based",
    payoutCycle: "ทุก 14 วัน",
    features: ["ถือข้ามสัปดาห์ได้", "เทรดชนข่าวได้", "สเกลพอร์ตได้สูงสุด $4M"],
    discountCode: "S6LS",
    affLink: "https://www.the5ers.com/?afmc=1fey",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
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
      slideRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({ left: 340, behavior: "smooth" });
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

      {/* Smart Matcher Component */}
      <PropMatcher />

      {/* 🏆 TOP 5 Horizontal Slider Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-2 border border-amber-500/20">
              🥇 RANKINGS 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              TOP 5 อันดับยอดนิยมสูงสุด (Best Prop Firms)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              จัดลำดับจากปริมาณผู้ใช้งานสูงสุดและสถิติการจ่ายเงินจริง ความน่าเชื่อถือของคนไทย
            </p>
          </div>

          {/* Slider Arrow Buttons (Desktop) */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition-all text-slate-300"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition-all text-slate-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Swipe Carousel Wrapper */}
        <div
          ref={slideRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {top5Firms.map((firm) => {
            const currentAccount = firm.accountSizes["100K"];
            return (
              <div
                key={firm.id}
                className="snap-start shrink-0 w-[300px] sm:w-[350px] bg-slate-900/60 border border-slate-800 hover:border-cyan-500/35 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-sm"
              >
                {/* Ranking Badge */}
                <div className="absolute -top-3.5 -left-3 w-10 h-10 bg-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 z-10 text-sm">
                  #{firm.popularityRank}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3.5 pl-6">
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      ★ {firm.rating}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {firm.userCountLabel}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">{firm.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold mb-4">{firm.highlight}</p>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-baseline justify-between mb-4">
                    <span className="text-xs text-slate-400">พอร์ตขนาด $100K</span>
                    <span className="text-2xl font-black text-white">${currentAccount.price}</span>
                  </div>

                  <div className="space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between pb-1.5 border-b border-slate-800/50">
                      <span className="text-slate-400">Daily Drawdown</span>
                      <span className="font-semibold text-slate-200">5% ({firm.drawdownType})</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-slate-800/50">
                      <span className="text-slate-400">Max Drawdown</span>
                      <span className="font-semibold text-slate-200">10% (Static/Balance)</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-slate-800/50">
                      <span className="text-slate-400">รอบถอนเงิน</span>
                      <span className="font-semibold text-cyan-400">{firm.payoutCycle}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {firm.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-800/50 text-slate-300 px-2 py-0.5 rounded">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 text-xs">
                    <span className="font-mono font-bold text-cyan-400 pl-1">{firm.discountCode}</span>
                    <button
                      onClick={() => handleCopy(firm.discountCode)}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-semibold transition-colors"
                    >
                      {copiedCode === firm.discountCode ? "✓ คัดลอกแล้ว!" : "คัดลอก"}
                    </button>
                  </div>

                  <a
                    href={firm.affLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/10"
                  >
                    สมัครสอบ / ดูรายละเอียด →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📚 Popular Articles & Guides Section */}
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