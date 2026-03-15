"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { Shield, Zap, Users, ArrowRight, ChevronDown, Clock, Award, Fuel, ArrowUpRight } from "lucide-react";

/* ── Animated floating dots ─────────────────────────── */
function BgDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < 28; i++) {
      const d = document.createElement("div");
      const size = 4 + Math.random() * 12;
      d.className = "dot";
      d.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        bottom:${-size}px;
        animation-duration:${8 + Math.random() * 18}s;
        animation-delay:${Math.random() * 20}s;
      `;
      el.appendChild(d);
      dots.push(d);
    }
    return () => dots.forEach(d => d.remove());
  }, []);
  return <div className="bg-dots" ref={containerRef} />;
}

/* ── Data ────────────────────────────────────────────── */
const FEATURES = [
  { icon: Shield, title: "Trustless Escrow", desc: "Funds locked in smart contract. Released only when work is approved.", color: "#3B6EFF" },
  { icon: Zap, title: "Milestone Payments", desc: "Split any project into steps. Pay progressively, reduce risk.", color: "#FFB020" },
  { icon: Clock, title: "72h Auto-Release", desc: "No response after delivery? Funds release automatically.", color: "#A060FF" },
  { icon: Award, title: "Soulbound Badges", desc: "Earn non-transferable NFT badges as your reputation grows.", color: "#00D48A" },
  { icon: Fuel, title: "Gasless", desc: "We sponsor all gas fees. You pay zero ETH to use the platform.", color: "#FF4060" },
  { icon: Users, title: "On-Chain Reputation", desc: "Every completed job builds a verifiable 0-1000 score on Base.", color: "#3B6EFF" },
];

const FAQS = [
  { q: "How does Workify work?", a: "A client posts a job and locks payment in a smart contract. A freelancer bids. Once work is approved, funds release automatically. Disputes are resolved on-chain." },
  { q: "What network does it run on?", a: "Workify runs on Base blockchain. Payments are in USDC. Currently live on Base Sepolia testnet." },
  { q: "What is the platform fee?", a: "Only 2% on successfully completed jobs — far lower than Upwork (20%) or Fiverr (20%)." },
  { q: "Do I pay gas fees?", a: "No. All transactions are sponsored via Coinbase CDP Paymaster. Zero ETH required." },
  { q: "How do I withdraw as a freelancer?", a: "When a milestone is approved, USDC is added to your balance. Withdraw anytime — no waiting period." },
  { q: "What happens in a dispute?", a: "Both parties submit evidence. The admin reviews and issues an on-chain decision: Client Wins, Freelancer Wins, or Split." },
  { q: "Why do freelancers stake?", a: "A 5 USDC stake prevents spam bids and proves intent. Returned on successful completion." },
  { q: "What are Soulbound badges?", a: "Non-transferable NFTs minted on-chain as you hit milestones. They prove your real track record — impossible to fake." },
];

const BADGES = [
  { name: "First Step",    desc: "1 job",         color: "#FFB020" },
  { name: "Rising Star",  desc: "5 jobs",         color: "#3B6EFF" },
  { name: "Reliable Pro", desc: "10 jobs",        color: "#A060FF" },
  { name: "Veteran",      desc: "25 jobs",        color: "#00D48A" },
  { name: "Elite",        desc: "50 jobs",        color: "#FF4060" },
  { name: "Legend",       desc: "100 jobs",       color: "#FFD700" },
  { name: "Top Earner",   desc: "10k+ USDC",      color: "#00D48A" },
  { name: "Dispute Free", desc: "10 clean jobs",  color: "#3B6EFF" },
  { name: "Speed Demon",  desc: "5 on-time",      color: "#FFB020" },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)", cursor: "pointer" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: open ? "var(--text-primary)" : "var(--text-secondary)", flex: 1, marginRight: 16, transition: "color 0.15s" }}>{q}</span>
        <ChevronDown size={15} color="var(--text-muted)" style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </div>
      {open && <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingBottom: 22, marginTop: -6 }}>{a}</p>}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────── */
export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <>
      <BgDots />
      <div className="page-wrap">

        {/* NAV */}
        <nav className="glass" style={{ position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
              <Image src="/logo.jpg" alt="Workify" width={26} height={26} style={{ borderRadius: 6 }} />
              <span className="font-display" style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                WORKIFY
              </span>
            </Link>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Link href="/jobs" style={{ textDecoration: "none" }}><button className="btn-secondary" style={{ padding: "6px 14px", fontSize: 13 }}>Jobs</button></Link>
              <Link href="/faq" style={{ textDecoration: "none" }}><button className="btn-secondary" style={{ padding: "6px 14px", fontSize: 13 }}>FAQ</button></Link>
              {isConnected
                ? <Link href="/jobs/post"><button className="btn-primary" style={{ fontSize: 13, padding: "6px 16px" }}>Post a Job</button></Link>
                : <ConnectWallet />
              }
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ maxWidth: 1060, margin: "0 auto", padding: "110px 24px 90px" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(59,110,255,0.08)", border: "1px solid rgba(59,110,255,0.18)", borderRadius: 100, padding: "4px 12px", marginBottom: 36 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3B6EFF", display: "inline-block", animation: "pulse-dot 2s infinite" }} />
            <span style={{ fontSize: 10, color: "#3B6EFF", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Live on Base Sepolia · Gas Sponsored
            </span>
          </div>

          <h1 className="font-display fade-up-2" style={{ fontSize: "clamp(42px, 6.5vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: 28 }}>
            Freelance<br />
            <span style={{ color: "var(--text-muted)" }}>without</span>{" "}
            <span style={{ color: "#3B6EFF" }}>trust.</span>
          </h1>

          <p className="fade-up-3" style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 480, lineHeight: 1.75, marginBottom: 48 }}>
            Smart contracts hold payments in escrow. Work gets done. Funds release automatically. No middlemen. No drama.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/jobs">
              <button className="btn-primary" style={{ fontSize: 15, padding: "12px 26px", display: "flex", alignItems: "center", gap: 8 }}>
                Browse Jobs <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/jobs/post">
              <button className="btn-secondary" style={{ fontSize: 15, padding: "12px 26px" }}>Post a Job</button>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
              <Fuel size={12} color="#00D48A" />
              <span style={{ fontSize: 12, color: "#00D48A", fontFamily: "var(--font-display)", fontWeight: 700 }}>Zero gas fees</span>
            </div>
          </div>
        </section>

        {/* DIVIDER LINE */}
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--border-light), transparent)" }} />
        </div>

        {/* STATS */}
        <section style={{ maxWidth: 1060, margin: "0 auto", padding: "52px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
            {[
              { v: "2%", l: "Platform Fee" },
              { v: "72h", l: "Auto-Release" },
              { v: "0 ETH", l: "Gas Cost" },
            ].map((s) => (
              <div key={s.l} style={{ background: "var(--bg-primary)", padding: "32px 28px" }}>
                <div className="font-display" style={{ fontSize: 40, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Features</span>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>Built different.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: "var(--bg-primary)", padding: "32px 28px", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-card)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-primary)")}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <f.icon size={16} color={f.color} />
                </div>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Process</span>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>Three steps.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { n: "01", t: "Lock funds", d: "Client posts a job and locks USDC in escrow. Milestones and deadlines set on-chain." },
              { n: "02", t: "Deliver work", d: "Freelancer bids, gets hired, delivers milestone by milestone. All tracked on-chain." },
              { n: "03", t: "Get paid", d: "Client approves — funds released instantly. Or auto-release after 72 hours." },
            ].map((item) => (
              <div key={item.n} className="card" style={{ padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                <span className="font-display" style={{ position: "absolute", top: 12, right: 20, fontSize: 64, fontWeight: 800, color: "var(--border)", lineHeight: 1, userSelect: "none" }}>{item.n}</span>
                <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, display: "block" }}>Step {item.n}</span>
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BADGES */}
        <section style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Reputation</span>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>Earn on-chain badges.</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8 }}>Non-transferable NFTs. Your reputation lives on-chain forever.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 1, background: "var(--border)" }}>
            {BADGES.map((b) => (
              <div key={b.name} style={{ background: "var(--bg-primary)", padding: "24px 20px", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-card)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-primary)")}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.color, marginBottom: 14 }} />
                <div className="font-display" style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.01em" }}>{b.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)", fontWeight: 600 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>FAQ</span>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>Common questions.</h2>
          </div>
          {FAQS.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px 100px" }}>
          <div style={{ border: "1px solid var(--border-light)", borderRadius: 16, padding: "64px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32, background: "linear-gradient(135deg, rgba(59,110,255,0.04), transparent)" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
                Ready to start?
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                Connect your wallet. Get to work.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/jobs/post"><button className="btn-primary" style={{ fontSize: 15, padding: "13px 28px" }}>Post a Job</button></Link>
              <Link href="/jobs"><button className="btn-secondary" style={{ fontSize: 15, padding: "13px 28px", display: "flex", alignItems: "center", gap: 6 }}>Find Work <ArrowUpRight size={13} /></button></Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Image src="/logo.jpg" alt="Workify" width={18} height={18} style={{ borderRadius: 4, opacity: 0.7 }} />
              <span className="font-display" style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em" }}>WORKIFY</span>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {[["Jobs", "/jobs"], ["Post a Job", "/jobs/post"], ["Profile", "/profile"], ["FAQ", "/faq"], ["Admin", "/admin"]].map(([label, href]) => (
                <Link key={label} href={href} style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "none", fontFamily: "var(--font-display)", fontWeight: 600, transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >{label}</Link>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
              Built on Base · 2% fee
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
