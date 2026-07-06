"use client";

import { useState, useEffect, useRef } from "react";

/* ─── DATA ─── */
const RATES = [
  { item: "Simple Blouse",        rate: 70,  tag: "Popular", tagColor: "#C9A84C", desc: "Classic plain blouse with clean finishing" },
  { item: "Star Design Blouse",   rate: 150, tag: null,       tagColor: "",        desc: "Elegant star-pattern designer blouse" },
  { item: "Custom Design Blouse", rate: 200, tag: "Premium",  tagColor: "#7B1A3A", desc: "Premium hand-crafted embroidered blouse" },
  { item: "Saya (Petticoat)",     rate: 30,  tag: null,       tagColor: "",        desc: "Neat & perfectly stitched petticoat" },
  { item: "Suit (Full Set)",      rate: 250, tag: "Best Value", tagColor: "#059669", desc: "Complete suit — top, bottom & dupatta" },
  { item: "Fall Lagai",           rate: 30,  tag: null,       tagColor: "",        desc: "Neat fall attachment with perfect finish" },
  { item: "Piko Work",            rate: 25,  tag: null,       tagColor: "",        desc: "Beautiful piko edge finishing" },
];

const STATS = [
  { value: "500+",  label: "Happy Customers",   icon: "heart"   },
  { value: "15+",   label: "Years Experience",   icon: "award"   },
  { value: "7",     label: "Expert Services",    icon: "scissors"},
  { value: "100%",  label: "Quality Assured",    icon: "shield"  },
];

const FEATURES = [
  { icon: "scissors", title: "Expert Craftsmanship", desc: "15+ years of tailoring expertise — perfect finishing on every stitch, every time." },
  { icon: "gem",      title: "Premium Quality",      desc: "All fabric types handled with care — silk, cotton, georgette, chiffon & more." },
  { icon: "clock",    title: "On-Time Delivery",     desc: "Your garments are always ready on schedule. No delays, no excuses." },
  { icon: "tag",      title: "Affordable Pricing",   desc: "Top-quality stitching at the most reasonable rates in town." },
];

const STEPS = [
  { n: "01", title: "Choose Your Style",   desc: "Browse blouse designs — simple, star pattern, or custom embroidery", badge: null },
  { n: "02", title: "Share Measurements", desc: "WhatsApp your measurements or visit us at Bihar Sharif, Nalanda", badge: "In-person or WhatsApp" },
  { n: "03", title: "Expert Stitching",   desc: "Madhuri Ji crafts every garment with 15+ years of expertise", badge: "Blouse in 3–5 days" },
  { n: "04", title: "Ready to Wear",      desc: "Collect your perfectly fitted garment — or get it delivered", badge: "Free alterations" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma",  text: "The blouse stitching is absolutely perfect! Madhuri Ji has been my go-to tailor for 5 years. Her work is unmatched.", stars: 5 },
  { name: "Kavita Singh",  text: "Amazing quality at such reasonable prices. My wedding blouse was beautifully crafted — every guest complimented it!", stars: 5 },
  { name: "Reena Patel",   text: "Always on time and the finishing is top-notch. I've sent all my friends and family here. Highly recommend!", stars: 5 },
];

const FAQS = [
  { q: "How long does stitching take?",         a: "A blouse is ready in 3–5 working days. A full suit takes 7–10 days. For urgent orders, WhatsApp us and we'll do our best to accommodate." },
  { q: "Do I need to visit the shop in person?", a: "Not at all! WhatsApp your measurements and fabric details. We'll stitch and you can collect. You can also visit our shop in Bihar Sharif, Nalanda for a personal fitting." },
  { q: "What fabrics do you work with?",         a: "We handle all fabric types — silk, cotton, georgette, chiffon, net, crepe, velvet, raw silk, dupion, and more. Just bring your fabric!" },
  { q: "Can I get a custom blouse design?",       a: "Absolutely! Share a reference photo on WhatsApp and Madhuri Ji will craft it exactly as you want — any neckline, sleeve style, or embroidery pattern." },
  { q: "What if the garment doesn't fit right?",  a: "We offer free alterations within 7 days of delivery. Your perfect fit is our promise — we don't rest until you're 100% satisfied." },
  { q: "What payment methods are accepted?",      a: "We accept PhonePe (scan QR on this page) and cash at the shop. After PhonePe payment, share the screenshot on WhatsApp for confirmation." },
];

const FABRICS = ["Silk", "Cotton", "Georgette", "Chiffon", "Net", "Crepe", "Velvet", "Raw Silk", "Dupion", "Banarasi"];

const DELIVERY = [
  { service: "Blouse (all types)", time: "3–5 days" },
  { service: "Full Suit",          time: "7–10 days" },
  { service: "Saya / Petticoat",   time: "1–2 days" },
  { service: "Fall Lagai / Piko",  time: "Same day" },
];

const MARQUEE_ITEMS = [
  "Expert Blouse Stitching",
  "Star Design Blouses",
  "Custom Embroidery",
  "Saya & Petticoat",
  "Full Suit Stitching",
  "Fall Lagai",
  "Piko Work",
  "Trusted by 500+ Women",
  "15+ Years of Excellence",
];

/* ─── SVG ICONS ─── */
function Icon({ name, size = 24, color = "#C9A84C" }: { name: string; size?: number; color?: string }) {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "scissors") return <svg {...s}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>;
  if (name === "gem")     return <svg {...s}><polygon points="6 3 18 3 22 9 12 22 2 9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="6" y2="9"/><line x1="12" y1="3" x2="18" y2="9"/><line x1="12" y1="22" x2="6" y2="9"/><line x1="12" y1="22" x2="18" y2="9"/></svg>;
  if (name === "clock")   return <svg {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  if (name === "tag")     return <svg {...s}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
  if (name === "heart")   return <svg {...s} fill={color} strokeWidth={1}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
  if (name === "award")   return <svg {...s}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
  if (name === "shield")  return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
  if (name === "check")    return <svg {...s}><polyline points="20 6 9 17 4 12"/></svg>;
  if (name === "star")     return <svg {...s} fill={color} strokeWidth={0.5}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  if (name === "chevron")  return <svg {...s}><polyline points="6 9 12 15 18 9"/></svg>;
  if (name === "phone")    return <svg {...s}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  if (name === "map")      return <svg {...s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  if (name === "clock2")   return <svg {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  if (name === "truck")    return <svg {...s}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
  return null;
}

/* ─── DECORATIVE MANDALA ─── */
function MandalaSVG() {
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    const cx = 200 + 60 * Math.cos(angle);
    const cy = 200 + 60 * Math.sin(angle);
    return { cx, cy, angle: i * 45 };
  });
  const outerDots = Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 * Math.PI) / 180;
    return { x: 200 + 168 * Math.cos(a), y: 200 + 168 * Math.sin(a), r: i % 2 === 0 ? 5 : 3 };
  });
  const midDots = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return { x: 200 + 120 * Math.cos(a), y: 200 + 120 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="mg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="192" fill="url(#mg)"/>
      {[180, 145, 110].map((r, i) => (
        <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="#C9A84C"
          strokeWidth="0.6" strokeDasharray="4 6" opacity={0.35 + i * 0.1}/>
      ))}
      <circle cx="200" cy="200" r="170" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.55"/>
      {petals.map((p, i) => (
        <ellipse key={i} cx={p.cx} cy={p.cy} rx="22" ry="9"
          fill="#C9A84C" opacity="0.28"
          transform={`rotate(${p.angle}, ${p.cx}, ${p.cy})`}/>
      ))}
      <circle cx="200" cy="200" r="28" fill="#C9A84C" opacity="0.15"/>
      <text x="200" y="218" textAnchor="middle" fontSize="52" fill="#C9A84C" opacity="0.55">◆</text>
      {outerDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#C9A84C" opacity="0.45"/>
      ))}
      {midDots.map((d, i) => (
        <text key={i} x={d.x} y={d.y + 5} textAnchor="middle" fontSize="14" fill="#C9A84C" opacity="0.35">◆</text>
      ))}
      {/* Needle */}
      <line x1="200" y1="32" x2="200" y2="62" stroke="#C9A84C" strokeWidth="2" opacity="0.5"/>
      <line x1="200" y1="338" x2="200" y2="368" stroke="#C9A84C" strokeWidth="2" opacity="0.5"/>
      <line x1="32" y1="200" x2="62" y2="200" stroke="#C9A84C" strokeWidth="2" opacity="0.5"/>
      <line x1="338" y1="200" x2="368" y2="200" stroke="#C9A84C" strokeWidth="2" opacity="0.5"/>
    </svg>
  );
}

/* ─── SVG BLOUSE ILLUSTRATIONS ─── */
function SimpleBlouseSVG() {
  return (
    <svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="sb1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B2A4A"/>
          <stop offset="100%" stopColor="#5C1229"/>
        </linearGradient>
        <linearGradient id="sb1s" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B1A3A"/>
          <stop offset="100%" stopColor="#4A0E22"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="208" rx="58" ry="6" fill="rgba(0,0,0,0.15)"/>
      <path d="M 58,42 L 8,75 L 38,112 L 58,95 Z" fill="url(#sb1s)"/>
      <path d="M 142,42 L 192,75 L 162,112 L 142,95 Z" fill="url(#sb1s)"/>
      <path d="M 58,42 L 58,95 L 38,112 L 36,198 L 164,198 L 162,112 L 142,95 L 142,42 Q 100,5 58,42 Z" fill="url(#sb1)"/>
      <path d="M 58,42 Q 100,5 142,42" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="8" y1="75" x2="38" y2="112" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="192" y1="75" x2="162" y2="112" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      {[130, 148, 166, 184].map((y, i) => <circle key={i} cx="100" cy={y} r="2.5" fill="#C9A84C" opacity="0.8"/>)}
      <line x1="36" y1="193" x2="164" y2="193" stroke="#C9A84C" strokeWidth="1.5" opacity="0.7"/>
      <path d="M 70,50 Q 85,30 100,28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function StarBlouseSVG() {
  const stars = [[100,108],[78,128],[122,128],[88,150],[112,150],[75,168],[125,168],[100,170],[100,188]];
  return (
    <svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="sb2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B1A4A"/>
          <stop offset="100%" stopColor="#5A0E30"/>
        </linearGradient>
        <linearGradient id="sb2s" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B1235"/>
          <stop offset="100%" stopColor="#45091E"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="208" rx="58" ry="6" fill="rgba(0,0,0,0.15)"/>
      <path d="M 55,45 L 6,78 L 36,115 L 55,98 Z" fill="url(#sb2s)"/>
      <path d="M 145,45 L 194,78 L 164,115 L 145,98 Z" fill="url(#sb2s)"/>
      <path d="M 55,45 L 55,98 L 36,115 L 34,198 L 166,198 L 164,115 L 145,98 L 145,45 L 100,88 Z" fill="url(#sb2)"/>
      <path d="M 55,45 L 100,88 L 145,45" fill="none" stroke="#E8C97A" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="6" y1="78" x2="36" y2="115" stroke="#E8C97A" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="194" y1="78" x2="164" y2="115" stroke="#E8C97A" strokeWidth="2.5" strokeLinecap="round"/>
      {stars.map(([x, y], i) => <text key={i} x={x} y={y} textAnchor="middle" fontSize="11" fill="#E8C97A" opacity="0.75">★</text>)}
      <text x="22" y="97" textAnchor="middle" fontSize="9" fill="#E8C97A" opacity="0.6">★</text>
      <text x="178" y="97" textAnchor="middle" fontSize="9" fill="#E8C97A" opacity="0.6">★</text>
      <line x1="34" y1="193" x2="166" y2="193" stroke="#E8C97A" strokeWidth="1.5" opacity="0.8"/>
      <path d="M 65,55 Q 80,35 96,32" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function DesignBlouseSVG() {
  const diamonds = [[100,118],[84,138],[116,138],[100,158],[84,178],[116,178],[100,192]];
  return (
    <svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="sb3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B1535"/>
          <stop offset="100%" stopColor="#420C20"/>
        </linearGradient>
        <linearGradient id="sb3s" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#521228"/>
          <stop offset="100%" stopColor="#320919"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="208" rx="58" ry="6" fill="rgba(0,0,0,0.2)"/>
      <path d="M 52,40 L 4,76 L 28,120 L 50,105 Z" fill="url(#sb3s)"/>
      <path d="M 148,40 L 196,76 L 172,120 L 150,105 Z" fill="url(#sb3s)"/>
      <path d="M 52,40 L 50,105 L 28,120 L 32,198 L 168,198 L 172,120 L 150,105 L 148,40 Q 130,60 100,58 Q 70,60 52,40 Z" fill="url(#sb3)"/>
      <path d="M 52,40 Q 70,60 100,58 Q 130,60 148,40" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"/>
      {[65,80,95,105,120,135].map((x, i) => <circle key={i} cx={x} cy={i < 3 ? 48 + i * 3 : 51 - (i - 3) * 3} r="2" fill="#E8C97A" opacity="0.9"/>)}
      <path d="M 4,76 L 28,120" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 196,76 L 172,120" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 12,82 L 34,116" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>
      <path d="M 188,82 L 166,116" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>
      {diamonds.map(([x, y], i) => <text key={i} x={x} y={y} textAnchor="middle" fontSize="12" fill="#C9A84C" opacity="0.7">◆</text>)}
      <text x="55" y="158" textAnchor="middle" fontSize="18" fill="#C9A84C" opacity="0.45">✿</text>
      <text x="145" y="158" textAnchor="middle" fontSize="18" fill="#C9A84C" opacity="0.45">✿</text>
      <line x1="32" y1="191" x2="168" y2="191" stroke="#C9A84C" strokeWidth="2"/>
      <line x1="32" y1="195" x2="168" y2="195" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
      <path d="M 62,50 Q 78,38 94,36" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

const BLOUSE_TYPES = [
  {
    name: "Simple Blouse",
    price: "₹70",
    tag: "Most Popular",
    tagColor: "#C9A84C",
    desc: "A beautifully fitted plain blouse perfect for everyday sarees — clean lines, smooth fabric handling.",
    features: ["Round neckline", "Perfect fit & finish", "All fabric types", "Quick turnaround"],
    Svg: SimpleBlouseSVG,
    bg: "linear-gradient(145deg, #FFF4F8, #FBDCE8)",
    border: "rgba(201,168,76,0.25)",
  },
  {
    name: "Star Design Blouse",
    price: "₹150",
    tag: "Trending",
    tagColor: "#7C3AED",
    desc: "Stylish V-neck blouse adorned with elegant star patterns — perfect for parties and functions.",
    features: ["V-neckline style", "Star motif work", "Party & function wear", "Premium finishing"],
    Svg: StarBlouseSVG,
    bg: "linear-gradient(145deg, #FFFBEF, #FFF3C8)",
    border: "rgba(201,168,76,0.25)",
  },
  {
    name: "Custom Design Blouse",
    price: "₹200",
    tag: "Premium",
    tagColor: "#7B1A3A",
    desc: "Exquisitely hand-crafted embroidered blouse for weddings, bridal sets, and special occasions.",
    features: ["Sweetheart neckline", "Embroidery & stonework", "Bridal & wedding wear", "Luxury finish"],
    Svg: DesignBlouseSVG,
    bg: "linear-gradient(145deg, #F8EEF4, #EDD5E3)",
    border: "rgba(123,26,58,0.2)",
  },
];

/* ─── CHATBOT DATA ─── */
type ChatOption = { label: string; value: string };
type BotEntry   = { text: string; options?: ChatOption[] };

const MENU_OPTIONS: ChatOption[] = [
  { label: "💰 Rate / Price List",       value: "rates"    },
  { label: "👗 Blouse Designs",          value: "blouse"   },
  { label: "⏰ Delivery Time",           value: "delivery" },
  { label: "💳 Payment Options",         value: "payment"  },
  { label: "📍 Our Location & Hours",   value: "location" },
  { label: "📞 WhatsApp Par Baat Karein", value: "whatsapp" },
];

const BOT_KB: Record<string, BotEntry> = {
  welcome: {
    text: "Namaste! 🙏 *Madhuri Silai Centre* mein aapka swagat hai!\n\nMain aapki kya help kar sakti hun?",
    options: MENU_OPTIONS,
  },
  rates: {
    text: "📋 *Rate List — 1st July 2026 se*\n\n👗 Simple Blouse         ₹70\n⭐ Star Design Blouse    ₹150\n✨ Custom Design Blouse  ₹200\n🪡 Saya / Petticoat      ₹30\n👘 Full Suit (3 piece)   ₹250\n🧵 Fall Lagai             ₹30\n💫 Piko Work              ₹25\n\nSabse acchi quality, sabse sahi rate! ✨",
    options: [{ label: "🔙 Main Menu", value: "menu" }, { label: "💬 Order on WhatsApp", value: "whatsapp" }],
  },
  blouse: {
    text: "👗 *Hamare Blouse Types:*\n\n1️⃣ *Simple Blouse — ₹70*\n   Round neckline, daily wear, sabhi fabrics\n\n2️⃣ *Star Design Blouse — ₹150*\n   V-neckline, star motif, party & function wear\n\n3️⃣ *Custom Design Blouse — ₹200*\n   Sweetheart neckline, embroidery, bridal/wedding\n\nKoi bhi design WhatsApp par photo bhejkar order karein!",
    options: [{ label: "💰 Full Rate List", value: "rates" }, { label: "💬 Order on WhatsApp", value: "whatsapp" }, { label: "🔙 Main Menu", value: "menu" }],
  },
  delivery: {
    text: "⏰ *Delivery Timeline:*\n\n✅ Blouse (all types) → 3–5 din\n✅ Full Suit           → 7–10 din\n✅ Saya / Petticoat    → 1–2 din\n✅ Fall Lagai / Piko   → Same Day!\n\nUrgent order? WhatsApp karein — hum try karenge! 🙏",
    options: [{ label: "💰 Rate List", value: "rates" }, { label: "💬 WhatsApp Par Order Karein", value: "whatsapp" }, { label: "🔙 Main Menu", value: "menu" }],
  },
  payment: {
    text: "💳 *Payment Options:*\n\n📱 *PhonePe*\n   Madhuri Devi — 7484836382\n   (QR code website pe scan karein)\n\n💵 *Cash*\n   Shop par akar de sakte hain\n\n⚡ Payment ke baad WhatsApp par screenshot bhejein!",
    options: [{ label: "📍 Our Location", value: "location" }, { label: "💬 WhatsApp Par Baat Karein", value: "whatsapp" }, { label: "🔙 Main Menu", value: "menu" }],
  },
  location: {
    text: "📍 *Hamari Location:*\n\nMadhuri Silai Centre\nNear Gas Godown,\nNear RK Library,\nBelow Fitness Gym,\nBihar Sharif, Nalanda — 803101\n\n🕐 *Mon–Sat:* 9:00 AM – 7:00 PM\n🕐 *Sunday:* 10:00 AM – 5:00 PM\n\nWhatsApp orders 24/7 accepted! 📲",
    options: [{ label: "💬 WhatsApp Par Message Karein", value: "whatsapp" }, { label: "🔙 Main Menu", value: "menu" }],
  },
  fallback: {
    text: "Hmm, yeh mujhe samajh nahi aaya 😊\nIs question ke liye seedha WhatsApp par poochhen — ya niche se koi option choose karein:",
    options: MENU_OPTIONS,
  },
};

/* ─── CHAT WIDGET ─── */
type Msg = { id: number; from: "bot" | "user"; text: string; options?: ChatOption[] };

function ChatWidget({ waUrl }: { waUrl: string }) {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const started   = useRef(false);

  /* Welcome on first open */
  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs([{ id: 1, from: "bot", ...BOT_KB.welcome }]);
      }, 1000);
    }
  }, [open]);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  function addBotReply(key: string) {
    const entry = BOT_KB[key] ?? BOT_KB.fallback;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, { id: Date.now(), from: "bot", ...entry }]);
    }, 850);
  }

  function handleOption(val: string) {
    if (val === "whatsapp") { window.open(waUrl, "_blank"); return; }
    const label = MENU_OPTIONS.find(o => o.value === val)?.label ?? val;
    setMsgs(prev => [...prev, { id: Date.now(), from: "user", text: label }]);
    if (val === "menu") {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs(prev => [...prev, { id: Date.now() + 1, from: "bot", text: "Kya jaanna chahte hain? 😊", options: MENU_OPTIONS }]);
      }, 700);
    } else {
      addBotReply(val);
    }
  }

  function handleSend() {
    const q = input.trim();
    if (!q) return;
    setMsgs(prev => [...prev, { id: Date.now(), from: "user", text: q }]);
    setInput("");
    const ql = q.toLowerCase();
    let key = "fallback";
    if (/blouse|blaus|design/.test(ql))                             key = "blouse";
    else if (/rate|price|kitna|charges|cost|paisa|rupee|₹|rs\.?/.test(ql)) key = "rates";
    else if (/delivery|kitne\s*din|kab\s*milega|ready|time|deri/.test(ql))  key = "delivery";
    else if (/pay|phonepe|upi|cash|payment/.test(ql))               key = "payment";
    else if (/location|address|kahan|dukan|where|shop/.test(ql))    key = "location";
    else if (/hi|hello|namaste|hlo|hey|jai/.test(ql))               key = "welcome";
    addBotReply(key);
  }

  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-[150] flex flex-col rounded-3xl overflow-hidden"
          style={{ width: "min(360px, calc(100vw - 24px))", height: "min(580px, calc(100dvh - 130px))", boxShadow: "0 24px 80px rgba(0,0,0,0.45)", border: "1px solid rgba(0,0,0,0.1)" }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: "#075E54" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", color: "#3A0A1A", fontFamily: "'Playfair Display',serif" }}>
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Madhuri Silai Centre</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
                <p className="text-green-300 text-xs">Online · Instant Reply</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-xl leading-none">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
            style={{ background: "#E5DDD5" }}>

            {msgs.map(msg => (
              <div key={msg.id} className={`flex flex-col gap-1.5 ${msg.from === "user" ? "items-end" : "items-start"}`}>
                <div className="max-w-[85%] px-3 py-2 text-sm leading-relaxed"
                  style={{
                    background: msg.from === "bot" ? "#fff" : "#DCF8C6",
                    color: "#111",
                    borderRadius: msg.from === "bot" ? "2px 16px 16px 16px" : "16px 2px 16px 16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                    whiteSpace: "pre-wrap",
                  }}>
                  {/* Render bold *text* */}
                  {msg.text.split(/(\*[^*]+\*)/g).map((part, i) =>
                    part.startsWith("*") && part.endsWith("*")
                      ? <strong key={i}>{part.slice(1, -1)}</strong>
                      : <span key={i}>{part}</span>
                  )}
                  <span className="text-xs opacity-40 ml-2 float-right mt-0.5">{now}</span>
                </div>

                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 max-w-[92%]">
                    {msg.options.map((opt, i) => (
                      <button key={i} onClick={() => handleOption(opt.value)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
                        style={{ background: "#fff", color: "#075E54", border: "1.5px solid #25D366", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-start">
                <div className="px-4 py-3 rounded-2xl flex items-center gap-1"
                  style={{ background: "#fff", borderRadius: "2px 16px 16px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full"
                      style={{ background: "#aaa", animation: `typingDot 1.2s ease infinite`, animationDelay: `${i * 0.2}s` }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 shrink-0" style={{ background: "#F0F0F0", borderTop: "1px solid #ddd" }}>
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Kuch poochhna hai? Type karein…"
              className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
              style={{ background: "#fff", border: "none", color: "#111" }}
            />
            <button onClick={handleSend}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0"
              style={{ background: "#25D366" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{
          background: open ? "#7B1A3A" : "#25D366",
          boxShadow: open ? "0 4px 24px rgba(123,26,58,0.5)" : "0 4px 24px rgba(37,211,102,0.5)",
        }}
        aria-label={open ? "Close chat" : "Chat with us"}>
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <WAIcon size={28}/>
        }
      </button>
    </>
  );
}

/* ─── SPLASH SCREEN ─── */
function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2200);
    const t2 = setTimeout(onDone, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1E0610 0%, #3A0A1A 35%, #5C1229 65%, #7B1A3A 100%)",
        animation: fading ? "splashFadeOut 0.5s ease forwards" : "none",
      }}
    >
      {/* Diamond BG */}
      <div className="absolute inset-0 diamond-pattern opacity-40" />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, transparent)" }} />

      {/* Spinning rings */}
      <div className="absolute w-72 h-72 rounded-full"
        style={{ border: "1px solid rgba(201,168,76,0.18)", animation: "spinSlow 10s linear infinite" }} />
      <div className="absolute w-52 h-52 rounded-full"
        style={{ border: "1px solid rgba(201,168,76,0.25)", animation: "spinReverse 7s linear infinite" }} />
      <div className="absolute w-36 h-36 rounded-full"
        style={{ border: "1px solid rgba(201,168,76,0.15)", animation: "spinSlow 5s linear infinite" }} />

      {/* Logo mark */}
      <div className="relative mb-7" style={{ animation: "splashLogo 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
            animation: "pulseGold 2s ease infinite",
          }}>
          <span className="font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "#3A0A1A", lineHeight: 1 }}>M</span>
        </div>
      </div>

      {/* Brand name */}
      <h1
        className="font-bold text-white text-center"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,8vw,3rem)", lineHeight: 1.1,
          animation: "splashText 0.7s ease 0.3s forwards", opacity: 0 }}>
        MADHURI
      </h1>
      <h1
        className="font-bold gold-shimmer text-center mb-3"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,8vw,3rem)", lineHeight: 1.1,
          animation: "splashText 0.7s ease 0.5s forwards", opacity: 0 }}>
        SILAI CENTRE
      </h1>

      {/* Tagline */}
      <p className="text-xs tracking-[0.3em] uppercase mb-10 text-center"
        style={{ color: "rgba(201,168,76,0.7)", animation: "splashText 0.7s ease 0.7s forwards", opacity: 0 }}>
        Ladies Tailoring & Boutique
      </p>

      {/* Loading bar */}
      <div className="w-48 h-0.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)", animation: "splashText 0.5s ease 0.8s forwards", opacity: 0 }}>
        <div className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #C9A84C, #E8C97A, #C9A84C)", animation: "loadBar 1.8s ease 0.9s forwards", width: "0%" }} />
      </div>

      {/* Location */}
      <p className="absolute bottom-8 text-xs"
        style={{ color: "rgba(255,255,255,0.28)", animation: "splashText 0.6s ease 1s forwards", opacity: 0 }}>
        Bihar Sharif, Nalanda
      </p>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, transparent)" }} />
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredRate, setHoveredRate] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const wa = "https://wa.me/917484836382?text=Hello%20Madhuri%20Ji%2C%20I%20would%20like%20to%20enquire%20about%20your%20tailoring%20services.";

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      <div style={{ animation: !showSplash ? "mainFadeIn 0.6s ease forwards" : "none", opacity: showSplash ? 0 : 1 }}>
      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(92,18,41,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 2px 28px rgba(0,0,0,0.28)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(201,168,76,0.15)", border: "1.5px solid rgba(201,168,76,0.4)" }}>
              <Icon name="scissors" size={15} color="#C9A84C"/>
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-xs sm:text-sm leading-tight tracking-wide truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                MADHURI SILAI CENTRE
              </p>
              <p className="text-xs hidden sm:block" style={{ color: "#E8C97A" }}>Ladies Tailoring & Boutique</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {["#blouses", "#process", "#rates", "#contact"].map((href, i) => (
              <a key={i} href={href} className="hidden lg:block text-white text-sm font-medium transition-colors hover:text-amber-300" style={{ letterSpacing: "0.02em" }}>
                {["Blouses", "Process", "Pricing", "Contact"][i]}
              </a>
            ))}
            <a
              href={wa} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full transition-all hover:scale-105 hover:brightness-110"
              style={{ background: "#25D366" }}
            >
              <WAIcon size={14}/>
              <span className="hidden xs:inline">WhatsApp</span>
              <span className="xs:hidden">Chat</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3A0A1A 0%, #5C1229 35%, #7B1A3A 65%, #9B2A4A 100%)" }}
      >
        {/* BG effects */}
        <div className="absolute inset-0 diamond-pattern opacity-100"/>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, transparent)" }}/>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)" }}/>
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.10), transparent 70%)" }}/>

        {/* Mandala — positioned on right, behind text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-25 pointer-events-none hidden lg:block">
          <MandalaSVG/>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <Icon name="star" size={13} color="#E8C97A"/>
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#E8C97A" }}>
              Trusted by 500+ Happy Women
            </span>
          </div>

          {/* Top ornament */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ color: "#C9A84C" }}>◆</span>
            <div className="h-px w-20 opacity-60" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
            <span className="text-xl" style={{ color: "#C9A84C" }}>◇</span>
            <div className="h-px w-20 opacity-60" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            <span style={{ color: "#C9A84C" }}>◆</span>
          </div>

          <h1 className="font-bold text-white leading-none mb-1 w-full"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 4px 40px rgba(0,0,0,0.35)", letterSpacing: "-0.01em", fontSize: "clamp(2.8rem, 8vw, 5rem)" }}>
            MADHURI
          </h1>
          <h1 className="font-bold mb-6 leading-none gold-shimmer w-full"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em", fontSize: "clamp(2.8rem, 8vw, 5rem)" }}>
            SILAI CENTRE
          </h1>

          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
            <p className="text-xs tracking-[0.28em] uppercase font-semibold" style={{ color: "#E8C97A" }}>
              Ladies Tailoring & Boutique
            </p>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
          </div>

          <p className="text-lg sm:text-xl mb-3 font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
            Perfection in every stitch. Care in every garment.
          </p>
          <p className="text-sm font-semibold mb-10" style={{ color: "#E8C97A" }}>
            ✦ New Rates Effective from 1st July 2026 ✦
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#blouses"
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)", color: "#3A0A1A", minWidth: "180px", textAlign: "center" }}>
              View Blouses ✦
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold text-base text-white border-2 transition-all hover:scale-105 hover:bg-white/10 flex items-center justify-center gap-2"
              style={{ borderColor: "rgba(255,255,255,0.3)", minWidth: "180px" }}>
              <WAIcon size={18} color="#25D366"/>
              Contact Us
            </a>
          </div>

          {/* Scroll cue */}
          <div className="mt-14 flex flex-col items-center gap-2 animate-bounce opacity-50">
            <p className="text-white text-xs tracking-widest uppercase">Scroll</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M7 10l5 5 5-5"/>
            </svg>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full" style={{ display: "block" }}>
            <path d="M0 70L60 58C120 46 240 22 360 18C480 14 600 30 720 40C840 50 960 54 1080 50C1200 46 1320 34 1380 28L1440 22V70H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-4 overflow-hidden" style={{ background: "linear-gradient(90deg, #C9A84C, #E8C97A, #C9A84C)" }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-3 px-8 text-sm font-bold tracking-wide whitespace-nowrap"
              style={{ color: "#3A0A1A" }}>
              <span>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ background: "linear-gradient(135deg, #3A0A1A, #5C1229)" }} className="py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <Icon name={s.icon} size={26} color="#C9A84C"/>
              </div>
              <p className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#E8C97A" }}>
                {s.value}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOUSE SHOWCASE ── */}
      <section id="blouses" className="py-24 px-6" style={{ background: "linear-gradient(180deg, #fff 0%, #FCF0F4 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#C9A84C" }}>Our Speciality</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#7B1A3A" }}>
              Blouse Collection
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
              <span style={{ color: "#C9A84C" }}>◆</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            </div>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Three distinct styles crafted for every occasion — from daily wear to bridal elegance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOUSE_TYPES.map((b, i) => (
              <div key={i} className="service-card rounded-3xl overflow-hidden flex flex-col"
                style={{ background: b.bg, border: `1px solid ${b.border}`, boxShadow: "0 8px 32px rgba(123,26,58,0.10)" }}>
                {/* Image */}
                <div className="relative flex items-center justify-center pt-8 pb-4 px-6"
                  style={{ background: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
                  <div style={{ width: "170px", height: "220px" }}>
                    <b.Svg/>
                  </div>
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-lg"
                    style={{ background: b.tagColor }}>
                    {b.tag}
                  </span>
                  {/* Stars */}
                  <div className="absolute top-4 right-4 flex gap-0.5">
                    {Array.from({length:5}).map((_, j) => <Icon key={j} name="star" size={10} color="#C9A84C"/>)}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#5C1229" }}>
                      {b.name}
                    </h3>
                    <div className="text-right ml-2 shrink-0">
                      <span className="text-2xl font-bold block" style={{ color: "#C9A84C" }}>{b.price}</span>
                      <span className="text-xs text-gray-400">per piece</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{b.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {b.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(123,26,58,0.1)" }}>
                          <Icon name="check" size={10} color="#7B1A3A"/>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={wa} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: "#25D366", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}>
                    <WAIcon size={18}/>
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="process" className="py-24 px-6" style={{ background: "linear-gradient(135deg, #FCF0F4, #FFF8F0)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#C9A84C" }}>Simple & Easy</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#7B1A3A" }}>
              How It Works
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
              <span style={{ color: "#C9A84C" }}>◆</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
              style={{ background: "linear-gradient(90deg, #C9A84C, #E8C97A, #C9A84C)", opacity: 0.4 }}/>

            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="step-ring mb-4 shrink-0">{step.n}</div>
                <div className="p-5 rounded-2xl w-full"
                  style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(201,168,76,0.18)", boxShadow: "0 4px 20px rgba(123,26,58,0.07)" }}>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#5C1229", fontFamily: "'Playfair Display', serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{step.desc}</p>
                  {step.badge && (
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: "rgba(201,168,76,0.15)", color: "#7B1A3A", border: "1px solid rgba(201,168,76,0.3)" }}>
                      ✦ {step.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#C9A84C" }}>Why We Stand Out</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#7B1A3A" }}>
              Crafted with Passion
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
              <span style={{ color: "#C9A84C" }}>◆</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {FEATURES.map((f, i) => (
              <div key={i} className="service-card p-7 rounded-2xl text-center group"
                style={{ background: "linear-gradient(145deg, #FFF8F0, #FCF0F4)", border: "1px solid #F5D0DF" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, #7B1A3A, #9B2A4A)" }}>
                  <Icon name={f.icon} size={24} color="#E8C97A"/>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#7B1A3A", fontFamily: "'Playfair Display', serif" }}>
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Fabrics Strip */}
          <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #FFF0F5, #FFF8F0)", border: "1px solid #F5D0DF" }}>
            <p className="text-center text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C9A84C" }}>
              Fabrics We Work With
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {FABRICS.map((f, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(123,26,58,0.08)", color: "#7B1A3A", border: "1px solid rgba(123,26,58,0.15)" }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(135deg, #5C1229, #7B1A3A, #9B2A4A)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#E8C97A" }}>What Our Customers Say</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Happy Stories
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
              <span style={{ color: "#C9A84C" }}>◆</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card relative rounded-3xl p-7"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.22)", backdropFilter: "blur(12px)" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({length: t.stars}).map((_, j) => <Icon key={j} name="star" size={14} color="#E8C97A"/>)}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "rgba(255,255,255,0.8)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)", color: "#3A0A1A" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERY TIME ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: "#C9A84C" }}>Fast Turnaround</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#7B1A3A" }}>
              Delivery Timeline
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DELIVERY.map((d, i) => (
              <div key={i} className="rounded-2xl p-5 text-center service-card"
                style={{ background: "linear-gradient(145deg, #FFF0F5, #FFF8F0)", border: "1px solid #F5D0DF" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "linear-gradient(135deg, #7B1A3A, #9B2A4A)" }}>
                  <Icon name="truck" size={20} color="#E8C97A"/>
                </div>
                <p className="text-xl font-bold mb-1" style={{ color: "#C9A84C", fontFamily: "'Playfair Display', serif" }}>{d.time}</p>
                <p className="text-xs text-gray-500 leading-snug">{d.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#C9A84C" }}>Common Questions</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#7B1A3A" }}>
              FAQ
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
              <span style={{ color: "#C9A84C" }}>◆</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            </div>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #F5C0D4", boxShadow: "0 2px 12px rgba(123,26,58,0.06)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors"
                  style={{ background: openFaq === i ? "linear-gradient(135deg, #7B1A3A, #9B2A4A)" : "#fff" }}>
                  <span className="font-semibold text-sm" style={{ color: openFaq === i ? "#fff" : "#3A0A1A" }}>
                    {faq.q}
                  </span>
                  <span className="shrink-0 transition-transform" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <Icon name="chevron" size={18} color={openFaq === i ? "#E8C97A" : "#C9A84C"}/>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4" style={{ background: "#FFFAF5", borderTop: "1px solid #F5D8E4" }}>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-3">Still have a question?</p>
            <a href="https://wa.me/917484836382?text=Hello%20Madhuri%20Ji%2C%20I%20have%20a%20question%20about%20your%20tailoring%20services."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm transition-all hover:scale-105"
              style={{ background: "#25D366" }}>
              <WAIcon size={16}/>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── RATE LIST ── */}
      <section id="rates" className="py-24 px-6" style={{ background: "#FFF8F0" }}>
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#C9A84C" }}>Transparent Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#7B1A3A" }}>
              Rate List
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
              <span style={{ color: "#C9A84C" }}>◆</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            </div>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
              style={{ background: "#FFF0F5", color: "#7B1A3A", border: "1px solid #F5C0D4" }}>
              <Icon name="star" size={12} color="#C9A84C"/>
              Effective from 1st July 2026
            </span>
          </div>

          <div className="rounded-3xl overflow-hidden w-full"
            style={{ boxShadow: "0 16px 48px rgba(123,26,58,0.14)", border: "1px solid #F5C0D4" }}>
            {/* Header */}
            <div className="flex px-6 py-4" style={{ background: "linear-gradient(135deg, #5C1229, #9B2A4A)" }}>
              <span className="text-white font-bold text-xs tracking-[0.22em] uppercase flex-1">Service</span>
              <span className="text-white font-bold text-xs tracking-[0.22em] uppercase">Rate (₹)</span>
            </div>

            {RATES.map((r, i) => (
              <div key={i}
                className="flex items-center px-6 py-4 cursor-default transition-all duration-200"
                style={{
                  background: hoveredRate === i ? "#FFF0F5" : i % 2 === 0 ? "#FFF8F2" : "#fff",
                  borderBottom: i < RATES.length - 1 ? "1px solid #F5D8E4" : "none",
                }}
                onMouseEnter={() => setHoveredRate(i)}
                onMouseLeave={() => setHoveredRate(null)}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mr-4"
                  style={{ background: hoveredRate === i ? "rgba(123,26,58,0.1)" : "rgba(201,168,76,0.1)" }}>
                  <Icon name="scissors" size={14} color={hoveredRate === i ? "#7B1A3A" : "#C9A84C"}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800 text-sm">{r.item}</p>
                    {r.tag && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: r.tagColor, fontSize: "9px" }}>
                        {r.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                </div>
                <span className="text-lg font-bold ml-4 shrink-0" style={{ color: "#7B1A3A" }}>₹{r.rate}</span>
              </div>
            ))}

            <div className="px-6 py-4 text-center text-xs italic text-gray-400"
              style={{ background: "#FFF8F0", borderTop: "1px solid #F5D8E4" }}>
              * Rates subject to change without prior notice
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT & PAYMENT ── */}
      <section id="contact" className="py-24 px-6" style={{ background: "linear-gradient(160deg, #2A0612 0%, #5C1229 50%, #3A0A1A 100%)" }}>
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "#E8C97A" }}>Payment & Contact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get in Touch
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }}/>
              <span style={{ color: "#C9A84C" }}>◆</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }}/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ── PhonePe Card ── */}
            <div className="rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35)", border: "1px solid rgba(201,168,76,0.2)" }}>
              {/* Card Header */}
              <div className="flex items-center gap-3 px-6 py-4"
                style={{ background: "linear-gradient(135deg, #5F2D91, #7C3AED)" }}>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-white font-black text-base">Pe</span>
                </div>
                <div>
                  <p className="text-white font-bold text-base">Pay via PhonePe</p>
                  <p className="text-purple-200 text-xs">Scan QR code to pay instantly</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="bg-white p-6 text-center">
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#5F2D91" }}>
                  ◆ Scan to Pay ◆
                </p>
                {/* QR Code */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-2xl" style={{ border: "2px solid #EDE9FE", background: "#FAF8FF" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Phonepe.png"
                      alt="PhonePe QR Code — Madhuri Devi"
                      style={{ width: "280px", height: "280px", objectFit: "contain", display: "block" }}
                    />
                  </div>
                </div>
                {/* Name & Number */}
                <p className="font-bold text-gray-900 text-lg mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Madhuri Devi
                </p>
                <p className="font-semibold text-base mb-4" style={{ color: "#5F2D91" }}>7484836382</p>
                <div className="rounded-xl px-4 py-3 text-xs text-gray-500 leading-relaxed"
                  style={{ background: "#F5F3FF", border: "1px dashed #C4B5FD" }}>
                  💡 After payment, send the screenshot on WhatsApp for order confirmation
                </div>
              </div>
            </div>

            {/* ── WhatsApp Card ── */}
            <div className="rounded-3xl overflow-hidden flex flex-col"
              style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35)", border: "1px solid rgba(201,168,76,0.2)" }}>
              {/* Card Header */}
              <div className="flex items-center gap-3 px-6 py-4" style={{ background: "#128C7E" }}>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <WAIcon size={22}/>
                </div>
                <div>
                  <p className="text-white font-bold text-base">WhatsApp</p>
                  <p className="text-green-200 text-xs">Quick response guaranteed</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="bg-white p-6 flex flex-col flex-1">
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center" style={{ color: "#128C7E" }}>
                  ◆ Contact Us ◆
                </p>

                {/* Phone number */}
                <div className="text-center mb-5">
                  <p className="text-gray-400 text-xs mb-1">WhatsApp Number</p>
                  <p className="font-bold text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#128C7E" }}>
                    +91 7484836382
                  </p>
                </div>

                {/* What you can do */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: "scissors", text: "Place a stitching order" },
                    { icon: "star",     text: "Ask about blouse designs" },
                    { icon: "tag",      text: "Get a price quote" },
                    { icon: "shield",   text: "Confirm payment receipt" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                      style={{ background: "#F0FDF4" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "#DCFCE7" }}>
                        <Icon name={item.icon} size={13} color="#16A34A"/>
                      </div>
                      <p className="text-sm text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a href={wa} target="_blank" rel="noopener noreferrer"
                  className="whatsapp-pulse mt-auto w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-[1.02] hover:brightness-105"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <WAIcon size={22}/>
                  Message Now on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Address + Hours Strip */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Address */}
            <div className="rounded-2xl px-5 py-4 flex items-start gap-4"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.18)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <Icon name="map" size={16} color="#C9A84C"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>Our Location</p>
                <p className="text-white text-sm font-semibold leading-snug">Near Gas Godown, Near RK Library</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Below Fitness Gym, Bihar Sharif, Nalanda — PIN 803101
                </p>
                <a href="https://www.google.com/maps/search/Madhuri+Silai+Centre+Bihar+Sharif+803101"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ color: "#E8C97A" }}>
                  View on Map ↗
                </a>
              </div>
            </div>
            {/* Hours */}
            <div className="rounded-2xl px-5 py-4 flex items-start gap-4"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.18)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <Icon name="clock2" size={16} color="#C9A84C"/>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>Business Hours</p>
                {[
                  { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
                  { day: "Sunday",             time: "10:00 AM – 5:00 PM" },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between gap-6 mb-1">
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{h.day}</p>
                    <p className="text-xs font-semibold text-white">{h.time}</p>
                  </div>
                ))}
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                  WhatsApp orders accepted anytime
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <p className="text-center mt-10 italic text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            &ldquo;Your style, our craftsmanship — together we create something beautiful&rdquo;
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6" style={{ background: "#1E0610" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span style={{ color: "#C9A84C" }}>◆</span>
                <p className="text-white font-bold tracking-widest text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                  MADHURI SILAI CENTRE
                </p>
                <span style={{ color: "#C9A84C" }}>◆</span>
              </div>
              <p className="text-xs mb-4" style={{ color: "#E8C97A" }}>Ladies Tailoring & Boutique</p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                Expert tailoring with 15+ years of experience. Perfect stitching for every occasion.
              </p>
            </div>

            {/* Services */}
            <div>
              <p className="text-white font-semibold text-sm mb-4 tracking-wide">Our Services</p>
              <ul className="space-y-2">
                {["Simple Blouse — ₹70", "Star Design Blouse — ₹150", "Custom Design — ₹200", "Saya — ₹30", "Full Suit — ₹250"].map((s, i) => (
                  <li key={i} className="text-xs flex items-center gap-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                    <span style={{ color: "#C9A84C", fontSize: "8px" }}>◆</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white font-semibold text-sm mb-4 tracking-wide">Contact & Location</p>
              <div className="space-y-3">
                <a href={wa} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs transition-opacity hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#25D366" }}>
                    <WAIcon size={14}/>
                  </div>
                  +91 7484836382
                </a>
                <div className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #5F2D91, #8B5CF6)" }}>
                    <span className="text-white font-black text-xs">Pe</span>
                  </div>
                  PhonePe — Madhuri Devi
                </div>
                <div className="flex items-start gap-3 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(201,168,76,0.15)" }}>
                    <Icon name="map" size={13} color="#C9A84C"/>
                  </div>
                  <span className="leading-relaxed">
                    Near Gas Godown, Near RK Library,<br/>
                    Below Fitness Gym, Bihar Sharif,<br/>
                    Nalanda — PIN 803101
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(201,168,76,0.15)" }}>
                    <Icon name="clock2" size={13} color="#C9A84C"/>
                  </div>
                  <span className="leading-relaxed">
                    Mon–Sat: 9:00 AM – 7:00 PM<br/>
                    Sunday: 10:00 AM – 5:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              © 2026 Madhuri Silai Centre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      </div>{/* end fade-in wrapper */}

      {/* ── CHAT WIDGET ── */}
      <ChatWidget waUrl={wa} />
    </div>
  );
}

function WAIcon({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.334-1.508A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.944 0-3.763-.5-5.349-1.376l-.383-.226-3.976.946.964-3.875-.25-.4A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}
