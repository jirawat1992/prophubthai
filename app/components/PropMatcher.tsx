"use client";

import { useState } from "react";

export default function PropMatcher() {
  // State พื้นฐาน
  const [modelType, setModelType] = useState<string>("all");
  const [accountSize, setAccountSize] = useState<string>("100K");
  const [customSize, setCustomSize] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("all");

  // State กฎการเทรดพื้นฐาน
  const [allowNews, setAllowNews] = useState<boolean>(false);
  const [allowWeekend, setAllowWeekend] = useState<boolean>(false);
  const [allowEA, setAllowEA] = useState<boolean>(false);

  // State ขั้นสูง (Advanced Filter)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [drawdownType, setDrawdownType] = useState<string>("all");
  const [payoutSpeed, setPayoutSpeed] = useState<string>("all");
  const [noConsistencyRule, setNoConsistencyRule] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>("all");
  const [profitSplit, setProfitSplit] = useState<string>("all");
  const [noMinDays, setNoMinDays] = useState<boolean>(false);
  const [noSlRequired, setNoSlRequired] = useState<boolean>(false);
  const [scalingPlan, setScalingPlan] = useState<boolean>(false);

  const resetFilters = () => {
    setModelType("all");
    setAccountSize("100K");
    setCustomSize("");
    setPaymentMethod("all");
    setAllowNews(false);
    setAllowWeekend(false);
    setAllowEA(false);
    setShowAdvanced(false);
    setDrawdownType("all");
    setPayoutSpeed("all");
    setNoConsistencyRule(false);
    setPlatform("all");
    setProfitSplit("all");
    setNoMinDays(false);
    setNoSlRequired(false);
    setScalingPlan(false);
  };

  const sizeOptions = [
    { value: "5K", label: "$5,000 (5K)" },
    { value: "10K", label: "$10,000 (10K)" },
    { value: "25K", label: "$25,000 (25K)" },
    { value: "50K", label: "$50,000 (50K)" },
    { value: "100K", label: "$100,000 (100K) - ยอดนิยม" },
    { value: "200K", label: "$200,000 (200K)" },
    { value: "300K", label: "$300,000 (300K)" },
    { value: "400K", label: "$400,000 (400K)" },
    { value: "500K", label: "$500,000 (500K)" },
    { value: "1M", label: "$1,000,000 (1M)" },
    { value: "custom", label: "⚙️ กำหนดเอง (Custom...)" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="relative rounded-3xl bg-slate-900/95 border border-slate-700/80 p-6 sm:p-10 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] backdrop-blur-2xl overflow-hidden">
        {/* Glow Ambient */}
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Block */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold mb-3 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              ⚡ SMART MATCHER
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ค้นหากองทุนที่ตอบโจทย์สไตล์คุณ
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-normal">
              เลือกเงื่อนไขที่ต้องการ เพื่อหากองทุนที่คุ้มค่าและเหมาะกับระบบเทรดของคุณที่สุด
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="self-start md:self-auto text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-2 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/90 shadow-sm hover:border-slate-500 active:scale-95"
          >
            <span>🔄 ล้างตัวกรองทั้งหมด</span>
          </button>
        </div>

        {/* Main Filter Section */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {/* 1. รูปแบบพอร์ต */}
          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <label className="block text-sm font-bold text-slate-100 mb-3 flex items-center justify-between">
              <span>1. รูปแบบพอร์ต</span>
              <span className="text-[11px] text-cyan-400 font-semibold">Model</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: "all", label: "ทั้งหมด" },
                { id: "2-step", label: "2-Step ยอดนิยม" },
                { id: "1-step", label: "1-Step เฟสเดียว" },
                { id: "instant", label: "Instant ไม่ต้องสอบ" },
              ].map((item) => {
                const active = modelType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setModelType(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center ${
                      active
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.02]"
                        : "bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. ขนาดพอร์ต Dropdown + Custom */}
          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <label className="block text-sm font-bold text-slate-100 mb-3 flex items-center justify-between">
                <span>2. ขนาดพอร์ต ($5K - $1M)</span>
                <span className="text-[11px] text-cyan-400 font-semibold">Balance</span>
              </label>

              <div className="relative">
                <select
                  value={accountSize}
                  onChange={(e) => setAccountSize(e.target.value)}
                  className="w-full appearance-none bg-slate-800/95 hover:bg-slate-800 border border-slate-700 focus:border-cyan-400 text-slate-100 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl cursor-pointer transition-all outline-none shadow-sm"
                >
                  {sizeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100 py-1">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-bold">
                  ▼
                </div>
              </div>
            </div>

            {accountSize === "custom" && (
              <div className="mt-3 animate-fadeIn">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-xs">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="ระบุขนาดพอร์ต เช่น 75000"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    className="w-full bg-slate-900 border border-cyan-500/50 focus:border-cyan-400 text-white pl-8 pr-4 py-2 rounded-xl text-xs outline-none shadow-inner font-semibold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. ช่องทางการชำระเงิน */}
          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <label className="block text-sm font-bold text-slate-100 mb-3 flex items-center justify-between">
              <span>3. ช่องทางชำระเงิน</span>
              <span className="text-[11px] text-cyan-400 font-semibold">Payment</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "all", label: "ทุกวิธี" },
                { id: "promptpay", label: "📲 พร้อมเพย์" },
                { id: "card_crypto", label: "💳 บัตร/Crypto" },
              ].map((pay) => {
                const active = paymentMethod === pay.id;
                return (
                  <button
                    key={pay.id}
                    onClick={() => setPaymentMethod(pay.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center ${
                      active
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.02]"
                        : "bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                    }`}
                  >
                    {pay.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Trading Rules */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800">
          <label className="block text-sm font-bold text-slate-100 mb-3">
            กฎการเทรดพื้นฐานที่ต้องรองรับ:
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              {
                active: allowNews,
                toggle: () => setAllowNews(!allowNews),
                label: "📰 เทรดชนข่าวกล่องแดงได้",
              },
              {
                active: allowWeekend,
                toggle: () => setAllowWeekend(!allowWeekend),
                label: "📅 ถือข้ามสัปดาห์ได้ (Weekend Hold)",
              },
              {
                active: allowEA,
                toggle: () => setAllowEA(!allowEA),
                label: "🤖 รัน EA / บอทเทรดได้",
              },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.toggle}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  btn.active
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-black ${
                    btn.active ? "bg-cyan-400 text-slate-950" : "border border-slate-500 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Button for Advanced Filters */}
        <div className="relative z-10 mt-8 pt-5 border-t border-slate-800 flex justify-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-bold text-slate-200 hover:text-cyan-300 flex items-center gap-2 transition-all py-2.5 px-5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 shadow-md"
          >
            <span>
              {showAdvanced
                ? "▲ ซ่อนตัวกรองเงื่อนไขเชิงลึก"
                : "▼ ตัวกรองเงื่อนไขเชิงลึก (แพลตฟอร์ม, Drawdown, Profit Split, SL, Scaling)"}
            </span>
          </button>
        </div>

        {/* Advanced Filters Expandable Grid */}
        {showAdvanced && (
          <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/90 space-y-6">
            
            {/* Row 1: Trading Platform & Profit Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Trading Platform (รวม TradingView) */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                <span className="block text-xs font-bold text-slate-100 mb-3">
                  💻 แพลตฟอร์มการเทรด (Platform):
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "ทุกแพลตฟอร์ม" },
                    { id: "tradingview", label: "📈 TradingView" },
                    { id: "mt5", label: "MT5" },
                    { id: "ctrader", label: "cTrader" },
                    { id: "tradelocker", label: "TradeLocker" },
                    { id: "dxtrade", label: "DXtrade" },
                  ].map((p) => {
                    const active = platform === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPlatform(p.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          active
                            ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-sm"
                            : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Profit Split */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                <span className="block text-xs font-bold text-slate-100 mb-3">
                  💰 ส่วนแบ่งกำไร (Profit Split):
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "มาตรฐาน (80%+)" },
                    { id: "90", label: "สูงสุด 90%+" },
                    { id: "challenge_profit", label: "🎁 มีกำไรช่วงสอบ 15%" },
                  ].map((ps) => {
                    const active = profitSplit === ps.id;
                    return (
                      <button
                        key={ps.id}
                        onClick={() => setProfitSplit(ps.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          active
                            ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-sm"
                            : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {ps.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 2: Drawdown & Payout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Daily Drawdown Type */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                <span className="block text-xs font-bold text-slate-100 mb-3">
                  🛡️ ประเภท Daily Drawdown:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "all", label: "ไม่ระบุ" },
                    { id: "balance", label: "Balance-based (ปลอดภัย)" },
                  ].map((dd) => {
                    const active = drawdownType === dd.id;
                    return (
                      <button
                        key={dd.id}
                        onClick={() => setDrawdownType(dd.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                          active
                            ? "bg-cyan-500/25 border-cyan-400 text-cyan-200"
                            : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {dd.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payout Speed */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                <span className="block text-xs font-bold text-slate-100 mb-3">
                  ⏱️ รอบการถอนกำไร (Payout):
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "all", label: "รอบปกติ (14 วัน)" },
                    { id: "fast", label: "⚡ ถอนไวพิเศษ (5–8 วัน)" },
                  ].map((po) => {
                    const active = payoutSpeed === po.id;
                    return (
                      <button
                        key={po.id}
                        onClick={() => setPayoutSpeed(po.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                          active
                            ? "bg-cyan-500/25 border-cyan-400 text-cyan-200"
                            : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {po.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 3: Strict Rules & Scaling Toggles */}
            <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
              <span className="block text-xs font-bold text-slate-100 mb-3">
                ⚖️ กฎเกณฑ์พิเศษและโอกาสเติบโต:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 3. Minimum Trading Days */}
                <button
                  onClick={() => setNoMinDays(!noMinDays)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-left flex items-center justify-between transition-all ${
                    noMinDays
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-200"
                      : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>⚡ ไม่มีวันเทรดขั้นต่ำ (0 วัน)</span>
                  <span className="font-black text-sm">{noMinDays ? "✓" : "+"}</span>
                </button>

                {/* 4. Stop Loss Requirement */}
                <button
                  onClick={() => setNoSlRequired(!noSlRequired)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-left flex items-center justify-between transition-all ${
                    noSlRequired
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-200"
                      : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>🔓 ไม่บังคับตั้ง Stop Loss</span>
                  <span className="font-black text-sm">{noSlRequired ? "✓" : "+"}</span>
                </button>

                {/* Consistency Rule */}
                <button
                  onClick={() => setNoConsistencyRule(!noConsistencyRule)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-left flex items-center justify-between transition-all ${
                    noConsistencyRule
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-200"
                      : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>🚫 ไม่มี Consistency Rule</span>
                  <span className="font-black text-sm">{noConsistencyRule ? "✓" : "+"}</span>
                </button>

                {/* 5. Scaling Plan */}
                <button
                  onClick={() => setScalingPlan(!scalingPlan)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-left flex items-center justify-between transition-all ${
                    scalingPlan
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-200"
                      : "bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>🚀 สเกลพอร์ตโตได้ ($1M - $4M)</span>
                  <span className="font-black text-sm">{scalingPlan ? "✓" : "+"}</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}