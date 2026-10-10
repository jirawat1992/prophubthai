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
    id: "ftmo",
    name: "FTMO",
    rating: 4.9,
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
    rating: 4.8,
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
    rating: 4.8,
    highlight: "ขวัญใจเทรดเดอร์ไทย ค่าสอบคุ้มค่า สเปรดแคบ ถอนไว",
    accountSizes: {
      "10K": { price: 60, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 239, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 399, maxDailyLoss: 5000, maxTotalLoss: 10000 },
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
    rating: 4.8,
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
    affLink: "https://www.icfunded.com/", // รอเปลี่ยนเป็น Affiliate Link หลังได้รับอนุมัติ
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "blue-guardian",
    name: "Blue Guardian",
    rating: 4.6,
    highlight: "มีระบบ Guardian Protector ช่วยคุมความเสี่ยงและป้องกันพอร์ตแตก",
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
    rating: 4.7,
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
    rating: 4.7,
    highlight: "รับส่วนแบ่งกำไร 15% ตั้งแต่ช่วงสอบ มีซัพพอร์ตภาษาไทย",
    accountSizes: {
      "10K": { price: 99, maxDailyLoss: 500, maxTotalLoss: 1000 },
      "50K": { price: 299, maxDailyLoss: 2500, maxTotalLoss: 5000 },
      "100K": { price: 549, maxDailyLoss: 5000, maxTotalLoss: 10000 },
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
    rating: 4.6,
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
    rating: 4.7,
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
    affLink: "https://alphacapitalgroup.uk/", // รอเปลี่ยนเป็น Affiliate Link หลังได้รับอนุมัติ
    paymentMethods: ["บัตรเครดิต/เดบิต", "Crypto"],
  },
  {
    id: "upcomers",
    name: "Upcomers",
    rating: 4.7,
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