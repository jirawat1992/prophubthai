"use client";

import { useState, useRef, useMemo } from "react";
import PropMatcher, { FilterState } from "./components/PropMatcher";

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
  models: string[]; // "2-step", "1-step", "instant"
  drawdownType: string; // "equity_balance", "balance", "trailing"
  payoutCycle: string;
  payoutDays: number; // 5, 8, 14
  features: string[];
  discountCode: string;
  affLink: string;
  paymentMethods: string[];
  platforms: string[]; // "mt5", "ctrader", "tradingview", "tradelocker", "dxtrade"
  hasPromptPay: boolean;
  allowNews: boolean;
  allowWeekend: boolean;
  allowEA: boolean;
  noMinDays: boolean;
  noSlRequired: boolean;
  noConsistencyRule: boolean;
  scalingPlan: boolean;
  profitSplitRate: number; // 80, 90
  hasChallengeProfit: boolean;
}

const propFirms: PropFirm[] = [
  {
    id: "ftmo",
    name: "FTMO",
    shortName: "FT",
    rating: "4.8",
    trustpilotReviews: "25,000+ รีวิวบน Trustpilot",
    thaiRankLabel: "อันดับ 1 ในไทย (มั่นคงสูงสุด)",
    popularityRank: 1,
    highlight: "กองทุนอันดับ 1 ตลอดกาล จ่ายเงินชัวร์ 100%",
    accountSizes: {
      "10K": { price: 170, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "25K": { price: 275, maxDailyLoss: 1250, maxTotalLoss: 2500 },
      "50K": { price: 380, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 540, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 1080, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step"],
    drawdownType: "equity_balance",
    payoutCycle: "ทุก 14 วัน (ปรับเป็นรายสัปดาห์ได้)",
    payoutDays: 14,
    features: ["เทรดชนข่าวได้ (Swing)", "ถือข้ามสัปดาห์ได้", "ใช้ EA ได้"],
    discountCode: "ลิงก์ตรง",
    affLink: "https://trader.ftmo.com/?affiliates=pOLOGuzllgOuwxOLSsKg",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
    platforms: ["mt5", "ctrader", "dxtrade"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: false,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 90,
    hasChallengeProfit: false,
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
    accountSizes: {
      "5K": { price: 32, maxDailyLoss: 250, maxTotalLoss: 500 },
      "10K": { price: 60, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "25K": { price: 139, maxDailyLoss: 1250, maxTotalLoss: 2500 },
      "50K": { price: 239, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 269, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 799, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step", "1-step"],
    drawdownType: "balance",
    payoutCycle: "ทุก 5 วัน (รายสัปดาห์)",
    payoutDays: 5,
    features: ["ถอนเงินไวสุด 5 วัน", "ค่าคอมมิชชั่นต่ำ", "ใช้ EA ได้"],
    discountCode: "7EKHW83Z",
    affLink: "https://app.fundingpips.com/register?referral_code=7EKHW83Z",
    paymentMethods: ["Crypto", "บัตรเครดิต"],
    platforms: ["tradingview", "mt5", "ctrader", "match-trader"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: true,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 90,
    hasChallengeProfit: false,
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
    accountSizes: {
      "5K": { price: 39, maxDailyLoss: 250, maxTotalLoss: 500 },
      "10K": { price: 95, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "25K": { price: 175, maxDailyLoss: 1250, maxTotalLoss: 2500 },
      "50K": { price: 295, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 495, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 995, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step", "1-step", "instant"],
    drawdownType: "balance",
    payoutCycle: "ทุก 14 วัน",
    payoutDays: 14,
    features: ["ถือข้ามสัปดาห์ได้", "เทรดชนข่าวได้", "สเกลพอร์ตได้สูงสุด $4M"],
    discountCode: "S6LS",
    affLink: "https://www.the5ers.com/?afmc=1fey",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
    platforms: ["mt5"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: false,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 90,
    hasChallengeProfit: false,
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
    accountSizes: {
      "10K": { price: 99, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "25K": { price: 199, maxDailyLoss: 1250, maxTotalLoss: 2500 },
      "50K": { price: 299, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 319, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 999, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step", "1-step"],
    drawdownType: "balance",
    payoutCycle: "ทุก 14 วัน",
    payoutDays: 14,
    features: ["รับกำไร 15% ในช่วงสอบ", "ทีมงานคนไทยดูแล", "ไม่มีจำกัดเวลาสอบ"],
    discountCode: "THETRADERM",
    affLink: "https://fundednext.com/?fpr=THETRADERM",
    paymentMethods: ["บัตรเครดิต", "Crypto"],
    platforms: ["tradingview", "mt5", "ctrader"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: true,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 90,
    hasChallengeProfit: true,
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
    accountSizes: {
      "10K": { price: 85, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "25K": { price: 165, maxDailyLoss: 1250, maxTotalLoss: 2500 },
      "50K": { price: 270, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 480, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 890, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step", "instant"],
    drawdownType: "trailing",
    payoutCycle: "ทุก 14 วัน",
    payoutDays: 14,
    features: ["รองรับ PromptPay สแกนจ่าย", "มีตัวเลือก Instant Funding", "รับส่วนลด 30% ทันที"],
    discountCode: "TTM30",
    affLink: "https://my.wemastertrade.com/register?ref=072952",
    paymentMethods: ["PromptPay (สแกน QR)", "Crypto", "บัตรเดบิต/เครดิต"],
    platforms: ["mt5"],
    hasPromptPay: true,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: true,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 85,
    hasChallengeProfit: false,
  },
  {
    id: "ic-funded",
    name: "IC Funded",
    shortName: "IC",
    rating: "4.8",
    trustpilotReviews: "4.8 สภาพคล่องระดับสถาบัน",
    thaiRankLabel: "กองทุนสเปรดต่ำ พาร์ตเนอร์ IC",
    popularityRank: 6,
    highlight: "กองทุนพาร์ตเนอร์ IC โบรกเกอร์ยักษ์ใหญ่ สภาพคล่องระดับสถาบัน",
    accountSizes: {
      "10K": { price: 95, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 295, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 495, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 970, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step"],
    drawdownType: "balance",
    payoutCycle: "ทุก 14 วัน",
    payoutDays: 14,
    features: ["สเปรดแบบ Raw", "ความมั่นคงสูง", "แพลตฟอร์ม MT5 / cTrader"],
    discountCode: "รอรีวิว",
    affLink: "https://www.icfunded.com/",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
    platforms: ["mt5", "ctrader", "tradingview"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: false,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 85,
    hasChallengeProfit: false,
  },
  {
    id: "blue-guardian",
    name: "Blue Guardian",
    shortName: "BG",
    rating: "4.6",
    trustpilotReviews: "รีวิว 4.6 บน Trustpilot",
    thaiRankLabel: "มี Guardian Protector กันลืม SL",
    popularityRank: 7,
    highlight: "มีระบบ Guardian Protector ป้องกันการลืมตั้ง SL",
    accountSizes: {
      "10K": { price: 87, maxDailyLoss: 400, maxTotalLoss: 800 },
      "50K": { price: 277, maxDailyLoss: 2000, maxTotalLoss: 4000 },
      "100K": { price: 497, maxDailyLoss: 4000, maxTotalLoss: 8000 },
      "200K": { price: 947, maxDailyLoss: 8000, maxTotalLoss: 16000 },
    },
    models: ["2-step", "1-step", "instant"],
    drawdownType: "balance",
    payoutCycle: "ทุก 14 วัน",
    payoutDays: 14,
    features: ["Guardian Protector ตัดออโต้", "เป้ากำไรเพียง 8%", "ไม่มีจำกัดสไตล์"],
    discountCode: "thetradermind",
    affLink: "https://blueguardian.com/?afmc=thetradermind",
    paymentMethods: ["บัตรเครดิต", "Crypto"],
    platforms: ["dxtrade", "tradelocker", "match-trader"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: true,
    noSlRequired: false,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 85,
    hasChallengeProfit: false,
  },
  {
    id: "e8-markets",
    name: "E8 Markets",
    shortName: "E8",
    rating: "4.6",
    trustpilotReviews: "Trustpilot Rating 4.6",
    thaiRankLabel: "ถอนเงินไวรอบ 8 วัน ปรับพอร์ตได้",
    popularityRank: 8,
    highlight: "ปรับแต่งพอร์ตเองได้อิสระ ถอนกำไรเร็วทุกรอบ 8 วัน",
    accountSizes: {
      "10K": { price: 98, maxDailyLoss: 500, maxTotalLoss: 800 },
      "25K": { price: 178, maxDailyLoss: 1250, maxTotalLoss: 2000 },
      "50K": { price: 288, maxDailyLoss: 2500, maxTotalLoss: 4000 },
      "100K": { price: 488, maxDailyLoss: 5000, maxTotalLoss: 8000 },
      "200K": { price: 988, maxDailyLoss: 10000, maxTotalLoss: 16000 },
    },
    models: ["2-step", "1-step"],
    drawdownType: "balance",
    payoutCycle: "ทุก 8 วัน",
    payoutDays: 8,
    features: ["E8 Customizer ปรับพอร์ตเองได้", "ถอนกำไรได้เร็วทุก 8 วัน", "หน้าแดชบอร์ดลื่นไหล"],
    discountCode: "A5E508CE",
    affLink: "https://e8markets.com/d/A5E508CE",
    paymentMethods: ["บัตรเครดิต", "Crypto"],
    platforms: ["tradingview", "mt5", "match-trader"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: true,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 80,
    hasChallengeProfit: false,
  },
  {
    id: "alpha-capital",
    name: "Alpha Capital Group",
    shortName: "AC",
    rating: "4.7",
    trustpilotReviews: "Trustpilot 4.7 โบรกเกอร์ตัวเอง",
    thaiRankLabel: "ฟรีค่าคอมมิชชั่น สเปรด 0 pip",
    popularityRank: 9,
    highlight: "โบรกเกอร์ของตัวเอง สเปรด 0 pip ไม่มีค่าคอมมิชชั่นในคู่หลัก",
    accountSizes: {
      "10K": { price: 97, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "25K": { price: 187, maxDailyLoss: 1250, maxTotalLoss: 2500 },
      "50K": { price: 297, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 497, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 997, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step"],
    drawdownType: "balance",
    payoutCycle: "ทุก 14 วัน",
    payoutDays: 14,
    features: ["ฟรีค่าคอมมิชชั่น", "มี Analytics ฟรี", "ระบบเสถียร"],
    discountCode: "รอรีวิว",
    affLink: "https://alphacapitalgroup.uk/",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
    platforms: ["mt5", "ctrader", "tradingview"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: false,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 90,
    hasChallengeProfit: false,
  },
  {
    id: "upcomers",
    name: "Upcomers",
    shortName: "UP",
    rating: "4.7",
    trustpilotReviews: "รีวิว 4.7 ส่วนลดสูงสุด 90%",
    thaiRankLabel: "โค้ดลดสูงสุด 90% ไม่มีวันเทรดขั้นต่ำ",
    popularityRank: 10,
    highlight: "ดีลพิเศษส่วนลดสูงสุด 90% กฎเข้าใจง่าย ไม่มีวันเทรดขั้นต่ำ",
    accountSizes: {
      "10K": { price: 89, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "25K": { price: 169, maxDailyLoss: 1250, maxTotalLoss: 2500 },
      "50K": { price: 289, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 489, maxDailyLoss: 5000, maxTotalLoss: 10000 },
      "200K": { price: 949, maxDailyLoss: 10000, maxTotalLoss: 20000 },
    },
    models: ["2-step", "1-step"],
    drawdownType: "balance",
    payoutCycle: "ทุก 14 วัน",
    payoutDays: 14,
    features: ["รับโค้ดส่วนลด 90%", "ไม่มีวันเทรดขั้นต่ำ", "ใช้ EA และเทรดข่าวได้"],
    discountCode: "3s3fvbf6",
    affLink: "https://www.upcomers.com/?code=3s3fvbf6#challenges",
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
    platforms: ["mt5", "dxtrade", "tradelocker"],
    hasPromptPay: false,
    allowNews: true,
    allowWeekend: true,
    allowEA: true,
    noMinDays: true,
    noSlRequired: true,
    noConsistencyRule: true,
    scalingPlan: true,
    profitSplitRate: 85,
    hasChallengeProfit: false,
  },
];

const initialFilters: FilterState = {
  modelType: "all",
  accountSize: "100K",
  customSize: "",
  paymentMethod: "all",
  allowNews: false,
  allowWeekend: false,
  allowEA: false,
  showAdvanced: false,
  drawdownType: "all",
  payoutSpeed: "all",
  noConsistencyRule: false,
  platform: "all",
  profitSplit: "all",
  noMinDays: false,
  noSlRequired: false,
  scalingPlan: false,
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const handleCopy = (code: string) => {
    if (code === "ลิงก์ตรง" || code === "รอรีวิว") return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // ⚡ Reactive Filter Logic: คัดกรองและตัดกองทุนที่ไม่ตรงเงื่อนไขออกทันที
  const filteredFirms = useMemo(() => {
    return propFirms.filter((firm) => {
      // 1. Model Type
      if (filters.modelType !== "all" && !firm.models.includes(filters.modelType)) {
        return false;
      }

      // 2. Account Size (ตรวจสอบว่ามีพอร์ตไซส์นี้หรือไม่)
      if (filters.accountSize !== "all" && filters.accountSize !== "custom") {
        if (!firm.accountSizes[filters.accountSize]) {
          return false;
        }
      }

      // 3. Payment Method
      if (filters.paymentMethod === "promptpay" && !firm.hasPromptPay) {
        return false;
      }

      // 4. Trading Rules
      if (filters.allowNews && !firm.allowNews) return false;
      if (filters.allowWeekend && !firm.allowWeekend) return false;
      if (filters.allowEA && !firm.allowEA) return false;

      // 5. Advanced Filters
      if (filters.platform !== "all" && !firm.platforms.includes(filters.platform)) {
        return false;
      }
      if (filters.profitSplit === "90" && firm.profitSplitRate < 90) {
        return false;
      }
      if (filters.profitSplit === "challenge_profit" && !firm.hasChallengeProfit) {
        return false;
      }
      if (filters.drawdownType === "balance" && firm.drawdownType !== "balance") {
        return false;
      }
      if (filters.payoutSpeed === "fast" && firm.payoutDays > 8) {
        return false;
      }
      if (filters.noMinDays && !firm.noMinDays) {
        return false;
      }
      if (filters.noSlRequired && !firm.noSlRequired) {
        return false;
      }
      if (filters.noConsistencyRule && !firm.noConsistencyRule) {
        return false;
      }
      if (filters.scalingPlan && !firm.scalingPlan) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const scrollLeft = () => {
    if (slideRef.current) slideRef.current.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (slideRef.current) slideRef.current.scrollBy({ left: 360, behavior: "smooth" });
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
            <p className="text-xs text-slate-400">เลือกกองทุนที่ใช่สำหรับคุณ</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          เปรียบเทียบ <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">พอร์ตกองทุนที่ดีที่สุด</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light">
          คลังความรู้การสอบกองทุน กฏและเงื่อนไขการเทรด โค้ดส่วนลด ระบบคัดกรองกองทุน อับเดตข้อมูลตรงสำหรับเทรดเดอร์ไทย
        </p>
      </section>

      {/* Smart Matcher Component พร้อมรับและส่งตัวกรอง */}
      <PropMatcher
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        resultCount={filteredFirms.length}
      />

      {/* 🏆 Horizontal Slider: แสดงผลกองทุนที่ผ่านเกณฑ์ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-2.5 border border-amber-500/20">
              🏆 กองทุนที่ตรงตามเงื่อนไข ({filteredFirms.length} ค่าย)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ผลการค้นหากองทุนที่ตอบโจทย์คุณ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              จัดลำดับตามความนิยมในไทย สถิติรีวิว Trustpilot จริง และประวัติการจ่ายเงิน
            </p>
          </div>

          {filteredFirms.length > 0 && (
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
          )}
        </div>

        {/* ถ้าไม่มีกองทุนใดตรงเงื่อนไขเลย */}
        {filteredFirms.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center my-6">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-white">ไม่พบกองทุนที่ตรงตามเงื่อนไขทั้งหมดของคุณ</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              ลองลดเงื่อนไขบางข้อ หรือปรับตัวกรองแพลตฟอร์ม/ขนาดพอร์ตให้กว้างขึ้น
            </p>
            <button
              onClick={handleResetFilters}
              className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md"
            >
              🔄 รีเซ็ตตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          /* คอนเทนเนอร์การ์ดแบบปัดข้าง */
          <div
            ref={slideRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-4"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredFirms.map((firm) => {
              // ดึงราคาตามพอร์ตที่ผู้ใช้เลือก (ถ้าไม่มีให้ใช้ 100K เป็นฐาน)
              const selectedSize =
                filters.accountSize !== "all" && filters.accountSize !== "custom" && firm.accountSizes[filters.accountSize]
                  ? filters.accountSize
                  : "100K";
              const currentAccount = firm.accountSizes[selectedSize] || Object.values(firm.accountSizes)[0];

              return (
                <div
                  key={firm.id}
                  className="snap-start shrink-0 w-[330px] sm:w-[410px] rounded-3xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] relative backdrop-blur-xl group"
                >
                  <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full shadow-md shadow-amber-500/20 z-10 flex items-center gap-1">
                    <span>#{firm.popularityRank}</span>
                  </div>

                  <div>
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

                    <div className="text-[11px] text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{firm.trustpilotReviews}</span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium mb-4 line-clamp-1 bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                      💡 {firm.highlight}
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block">พอร์ตขนาด ${selectedSize}</span>
                        <span className="text-xl font-black text-white">${currentAccount.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">รอบการถอนกำไร</span>
                        <span className="text-xs font-bold text-cyan-300 block mt-1">{firm.payoutCycle}</span>
                      </div>
                    </div>

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
        )}
      </section>

      {/* 📚 ส่วนบทความและคู่มือยอดนิยม */}
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