"use client";

import { useState } from "react";

export default function PropMatcher() {
  // State พื้นฐาน
  const [modelType, setModelType] = useState<string>("all");
  const [accountSize, setAccountSize] = useState<string>("100K");
  const [paymentMethod, setPaymentMethod] = useState<string>("all");

  // State กฎการเทรด
  const [allowNews, setAllowNews] = useState<boolean>(false);
  const [allowWeekend, setAllowWeekend] = useState<boolean>(false);
  const [allowEA, setAllowEA] = useState<boolean>(false);

  // State กฎขั้นสูง (Advanced)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [drawdownType, setDrawdownType] = useState<string>("all");
  const [payoutSpeed, setPayoutSpeed] = useState<string>("all");
  const [noConsistencyRule, setNoConsistencyRule] = useState<boolean>(false);

  const resetFilters = () => {
    setModelType("all");
    setAccountSize("100K");
    setPaymentMethod("all");
    setAllowNews(false);
    setAllowWeekend(false);
    setAllowEA(false);
    setDrawdownType("all");
    setPayoutSpeed("all");
    setNoConsistencyRule(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow Background Effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-500/20">
              ⚡ SMART MATCHER
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ค้นหากองทุนที่ตอบโจทย์สไตล์คุณ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              เลือกเงื่อนไขที่คุณต้องการ แล้วระบบจะคัดกรองกองทุนที่ตรงใจคุณที่สุด
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="self-start md:self-auto text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/50"
          >
            <span>🔄 ล้างตัวกรองทั้งหมด</span>
          </button>
        </div>

        {/* Main Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* 1. รูปแบบพอร์ต */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2.5">
              1. รูปแบบการสอบ / การรับพอร์ต
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "all", label: "ทั้งหมด" },
                { id: "2-step", label: "2-Step (ยอดนิยม)" },
                { id: "1-step", label: "1-Step (สอบเฟสเดียว)" },
                { id: "instant", label: "Instant (ไม่ต้องสอบ)" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setModelType(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    modelType === item.id
                      ? "bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-500/20 font-bold"
                      : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. ขนาดพอร์ต */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2.5">
              2. ขนาดพอร์ตที่ต้องการ
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["10K", "50K", "100K", "200K"].map((size) => (
                <button
                  key={size}
                  onClick={() => setAccountSize(size)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    accountSize === size
                      ? "bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold shadow-md shadow-cyan-500/30"
                      : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  ${size}
                </button>
              ))}
            </div>
          </div>

          {/* 3. ช่องทางการชำระเงิน */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2.5">
              3. วิธีการชำระเงิน
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "all", label: "ทุกช่องทาง" },
                { id: "promptpay", label: "📲 PromptPay" },
                { id: "card_crypto", label: "💳 บัตร / Crypto" },
              ].map((pay) => (
                <button
                  key={pay.id}
                  onClick={() => setPaymentMethod(pay.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    paymentMethod === pay.id
                      ? "bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-500/20 font-bold"
                      : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {pay.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style & Allowed Actions (Checkboxes) */}
        <div className="mt-6 pt-5 border-t border-slate-800/60">
          <label className="block text-xs font-semibold text-slate-300 mb-3">
            กฎและสไตล์การเทรดที่ต้องรองรับ:
          </label>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setAllowNews(!allowNews)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                allowNews
                  ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm shadow-blue-500/20"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <span>{allowNews ? "☑" : "☐"}</span>
              <span>📰 เทรดชนข่าวกล่องแดงได้</span>
            </button>

            <button
              onClick={() => setAllowWeekend(!allowWeekend)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                allowWeekend
                  ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm shadow-blue-500/20"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <span>{allowWeekend ? "☑" : "☐"}</span>
              <span>📅 ถือข้ามสัปดาห์ได้ (Weekend Hold)</span>
            </button>

            <button
              onClick={() => setAllowEA(!allowEA)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                allowEA
                  ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm shadow-blue-500/20"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <span>{allowEA ? "☑" : "☐"}</span>
              <span>🤖 รัน EA / บอทเทรดได้</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters Accordion Button */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors py-1 px-3 rounded-lg hover:bg-slate-800/40"
          >
            <span>{showAdvanced ? "▲ ซ่อนตัวกรองขั้นสูง" : "▼ ตัวกรองเงื่อนไขขั้นสูง (Drawdown, รอบถอน, Consistency Rule)"}</span>
          </button>
        </div>

        {/* Collapsible Advanced Section */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-5 animate-fadeIn">
            {/* Drawdown Type */}
            <div>
              <span className="block text-xs font-medium text-slate-400 mb-2">ประเภท Daily Drawdown:</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "ไม่ระบุ" },
                  { id: "balance", label: "Balance-based (ปลอดภัย)" },
                ].map((dd) => (
                  <button
                    key={dd.id}
                    onClick={() => setDrawdownType(dd.id)}
                    className={`py-1.5 px-2 rounded-lg text-xs border transition-all ${
                      drawdownType === dd.id
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    {dd.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Speed */}
            <div>
              <span className="block text-xs font-medium text-slate-400 mb-2">รอบการถอนกำไร (Payout):</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "รอบปกติ (14 วัน)" },
                  { id: "fast", label: "⚡ ถอนไว (5–8 วัน)" },
                ].map((po) => (
                  <button
                    key={po.id}
                    onClick={() => setPayoutSpeed(po.id)}
                    className={`py-1.5 px-2 rounded-lg text-xs border transition-all ${
                      payoutSpeed === po.id
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    {po.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Consistency Rule */}
            <div>
              <span className="block text-xs font-medium text-slate-400 mb-2">Consistency Rule:</span>
              <button
                onClick={() => setNoConsistencyRule(!noConsistencyRule)}
                className={`w-full py-1.5 px-3 rounded-lg text-xs border text-left flex items-center justify-between transition-all ${
                  noConsistencyRule
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <span>ไม่เอากฎคุมความสม่ำเสมอ</span>
                <span>{noConsistencyRule ? "✓" : "+"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}