"use client";

import { useState } from "react";
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

const propFirms: PropFirm[] = [
  {
    id: "ftmo",
    name: "FTMO",
    rating: "4.9",
    highlight: "อันดับ 1 มั่นคงที่สุดในโลก จ่ายเงินชัวร์ 100%",
    accountSizes: {
      "10K": { price: 170, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 380, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 540, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 1080, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Equity / Balance (5% Daily / 10% Max)",
    payoutCycle: "ทุก 14 วัน (ปรับเป็นรายสัปดาห์ได้)",
    features: ["เทรดชนข่าวได้ (บัญชี Swing)", "ถือข้ามสัปดาห์ได้", "ใช้ EA ได้"],
    discountCode: "ลิงก์ตรง",
    affLink: "https://trader.ftmo.com/?affiliates=pOLOGuzllgOuwxOLSsKg",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "the5ers",
    name: "The5ers",
    rating: "4.8",
    highlight: "สายสวิงเทรด บัญชี High Stakes แผนสเกลพอร์ตโตเร็ว",
    accountSizes: {
      "10K": { price: 95, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 295, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 495, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 995, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Balance Based (5% Daily / 10% Max)",
    payoutCycle: "ทุก 14 วัน",
    features: ["ถือข้ามสัปดาห์ได้", "เทรดชนข่าวได้", "สเกลพอร์ตได้สูงสุด $4M"],
    discountCode: "S6LS",
    affLink: "https://www.the5ers.com/?afmc=1fey",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "funding-pips",
    name: "Funding Pips",
    rating: "4.8",
    highlight: "ขวัญใจเทรดเดอร์ไทย ค่าสอบคุ้มค่า สเปรดแคบ ถอนไว",
    accountSizes: {
      "10K": { price: 60, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 239, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 269, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 799, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Balance Based (5% Daily / 10% Max)",
    payoutCycle: "ทุก 5 วัน (รายสัปดาห์)",
    features: ["ถอนเงินไวสุด 5 วัน", "ค่าคอมมิชชั่นถูก", "ใช้ EA ได้"],
    discountCode: "7EKHW83Z",
    affLink: "https://app.fundingpips.com/register?referral_code=7EKHW83Z",
    paymentMethods: ["Crypto", "บัตรเครดิต"],
  },
  {
    id: "ic-funded",
    name: "IC Funded",
    rating: "4.8",
    highlight: "กองทุนพาร์ตเนอร์ IC โบรกเกอร์ยักษ์ใหญ่ สภาพคล่องระดับสถาบัน",
    accountSizes: {
      "10K": { price: 95, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 295, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 495, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 970, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Balance Based (5% Daily / 10% Max)",
    payoutCycle: "ทุก 14 วัน",
    features: ["สเปรดแบบ Raw จาก IC", "ความมั่นคงสูง", "แพลตฟอร์ม MT5 / cTrader"],
    discountCode: "รอรีวิว",
    affLink: "https://www.icfunded.com/",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "blue-guardian",
    name: "Blue Guardian",
    rating: "4.6",
    highlight: "มีระบบ Guardian Protector ป้องกันการลืมตั้ง SL",
    accountSizes: {
      "10K": { price: 87, maxDailyLoss: 400, maxTotalLoss: 800 },
      "50K": { price: 277, maxDailyLoss: 2000, maxTotalLoss: 4000 },
      "100K": { price: 497, maxDailyLoss: 4000, maxTotalLoss: 8000 },
      "200K": { price: 947, maxDailyLoss: 8000, maxTotalLoss: 16000 },
    },
    drawdownType: "Balance Based (4% Daily / 8% Max)",
    payoutCycle: "ทุก 14 วัน",
    features: ["ระบบ Guardian Protector ตัดขาดทุนออโต้", "เป้ากำไรเพียง 8%", "ไม่มีจำกัดสไตล์"],
    discountCode: "thetradermind",
    affLink: "https://blueguardian.com/?afmc=thetradermind",
    paymentMethods: ["บัตรเครดิต", "Crypto"],
  },
  {
    id: "wemastertrade",
    name: "WeMasterTrade",
    rating: "4.7",
    highlight: "สแกนจ่าย QR PromptPay เงินบาทไทยได้โดยตรง ไม่ต้องใช้บัตร",
    accountSizes: {
      "10K": { price: 85, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 270, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 480, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 890, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Trailing / Balance",
    payoutCycle: "ทุก 14 วัน",
    features: ["รองรับ PromptPay สแกนจ่าย", "มีตัวเลือก Instant Funding", "รับส่วนลด 30% ทันที"],
    discountCode: "TTM30",
    affLink: "https://my.wemastertrade.com/register?ref=072952",
    paymentMethods: ["PromptPay (สแกน QR)", "Crypto", "บัตรเดบิต/เครดิต"],
  },
  {
    id: "fundednext",
    name: "FundedNext",
    rating: "4.7",
    highlight: "รับส่วนแบ่งกำไร 15% ตั้งแต่ช่วงสอบ มีซัพพอร์ตภาษาไทย",
    accountSizes: {
      "10K": { price: 99, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 299, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 319, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 999, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Balance Based (5% Daily / 10% Max)",
    payoutCycle: "ทุก 14 วัน",
    features: ["รับกำไร 15% ในช่วงสอบ", "ทีมงานคนไทยดูแล", "ไม่มีจำกัดเวลาสอบ"],
    discountCode: "THETRADERM",
    affLink: "https://fundednext.com/?fpr=THETRADERM",
    paymentMethods: ["บัตรเครดิต", "Crypto"],
  },
  {
    id: "e8-markets",
    name: "E8 Markets",
    rating: "4.6",
    highlight: "ปรับแต่งขนาดพอร์ตและ Drawdown เองได้อิสระ ถอนเงินไวรอบ 8 วัน",
    accountSizes: {
      "10K": { price: 98, maxDailyLoss: 500, maxTotalLoss: 800 },
      "50K": { price: 288, maxDailyLoss: 2500, maxTotalLoss: 4000 },
      "100K": { price: 488, maxDailyLoss: 5000, maxTotalLoss: 8000 },
      "200K": { price: 988, maxDailyLoss: 10000, maxTotalLoss: 16000 },
    },
    drawdownType: "Balance Based",
    payoutCycle: "ทุก 8 วัน",
    features: ["E8 Customizer ปรับพอร์ตเองได้", "ถอนกำไรได้เร็วทุก 8 วัน", "หน้าแดชบอร์ดลื่นไหล"],
    discountCode: "A5E508CE",
    affLink: "https://e8markets.com/d/A5E508CE",
    paymentMethods: ["บัตรเครดิต", "Crypto"],
  },
  {
    id: "alpha-capital",
    name: "Alpha Capital Group",
    rating: "4.7",
    highlight: "โบรกเกอร์ของตัวเอง สเปรด 0 pip ไม่มีค่าคอมมิชชั่นในคู่หลัก",
    accountSizes: {
      "10K": { price: 97, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 297, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 497, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 997, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Balance Based (5% Daily / 10% Max)",
    payoutCycle: "ทุก 14 วัน",
    features: ["ฟรีค่าคอมมิชชั่น", "มีเครื่องมือ Market Analytics ให้ฟรี", "ระบบเสถียร"],
    discountCode: "รอรีวิว",
    affLink: "https://alphacapitalgroup.uk/",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "upcomers",
    name: "Upcomers",
    rating: "4.7",
    highlight: "ดีลพิเศษส่วนลดสูงสุด 90% กฎเกณฑ์เข้าใจง่าย ไม่มีวันเทรดขั้นต่ำ",
    accountSizes: {
      "10K": { price: 89, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 289, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 489, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 949, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    drawdownType: "Balance Based (5% Daily / 10% Max)",
    payoutCycle: "ทุก 14 วัน",
    features: ["รับโค้ดส่วนลด 90%", "ไม่มีข้อจำกัดวันเทรดขั้นต่ำ", "ใช้ EA และเทรดข่าวได้"],
    discountCode: "3s3fvbf6",
    affLink: "https://www.upcomers.com/?code=3s3fvbf6#challenges",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
];

export default function Home() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    if (code === "ลิงก์ตรง" || code === "รอรีวิว") return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
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

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">10 กองทุนยอดนิยมที่แนะนำ</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">คัดเลือกเฉพาะค่ายที่ได้มาตรฐาน ถอนเงินได้จริง และมีโปรโมชันพิเศษ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propFirms.map((firm) => {
            const currentAccount = firm.accountSizes["100K"];

            return (
              <div
                key={firm.id}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5 group relative backdrop-blur-sm"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                      {firm.highlight}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded">
                      ★ {firm.rating}
                    </span>
                  </div>

                  {/* Firm Name */}
                  <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                    {firm.name}
                  </h3>

                  {/* Price Block */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">พอร์ตขนาด $100K</span>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold text-white">${currentAccount.price}</span>
                    </div>
                  </div>

                  {/* Rules Overview */}
                  <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between pb-2 border-b border-slate-800/50">
                      <span className="text-slate-400">Daily Drawdown</span>
                      <span className="font-medium text-slate-200">
                        ${currentAccount.maxDailyLoss} ({firm.drawdownType.includes("4%") ? "4%" : "5%"})
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-800/50">
                      <span className="text-slate-400">Max Drawdown</span>
                      <span className="font-medium text-slate-200">
                        ${currentAccount.maxTotalLoss} ({firm.drawdownType.includes("8%") ? "8%" : "10%"})
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-800/50">
                      <span className="text-slate-400">รอบการถอนกำไร</span>
                      <span className="font-medium text-cyan-400">{firm.payoutCycle}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {firm.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-800/50 text-slate-300 px-2 py-0.5 rounded border border-slate-700/40"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-3 text-[11px] text-slate-400">
                    <span className="text-slate-500">การชำระเงิน: </span>
                    {firm.paymentMethods.join(", ")}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                  {/* Promo Code Box */}
                  <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 pl-1">
                      <span className="text-slate-400 text-[11px]">โค้ด:</span>
                      <span className="font-mono font-bold text-cyan-400">{firm.discountCode}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(firm.discountCode)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-medium transition-colors"
                    >
                      {copiedCode === firm.discountCode ? "✓ คัดลอกแล้ว!" : "คัดลอก"}
                    </button>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={firm.affLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                  >
                    สมัครสอบ / ดูรายละเอียด →
                  </a>
                </div>
              </div>
            );
          })}
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