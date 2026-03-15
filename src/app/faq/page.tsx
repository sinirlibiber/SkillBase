"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowLeft } from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "General",
    items: [
      { q: "What is Workify?", a: "Workify is a decentralized freelance marketplace on the Base blockchain. Clients lock payment in a smart contract; once work is completed and approved, funds are automatically released." },
      { q: "Which network does it run on?", a: "Base blockchain (Coinbase's Layer 2 network). Payments are made in USDC. The current version runs on Base Sepolia testnet." },
      { q: "Why Base?", a: "Base is a fast and low-cost Ethereum Layer 2 developed by Coinbase. Transaction fees are very low and it has native integration with Coinbase Wallet." },
      { q: "Can it be used on mobile?", a: "Yes. Workify runs as a Mini App on the Base App and is Farcaster compatible." },
    ]
  },
  {
    title: "Payments",
    items: [
      { q: "What is the platform fee?", a: "Only 2% is charged on successfully completed jobs. No fees are deducted for open jobs, cancelled jobs, or disputed jobs." },
      { q: "Do I need to pay gas fees?", a: "No. All transactions are sponsored by the platform via CDP Paymaster integration. Users with Coinbase Smart Wallet spend zero ETH." },
      { q: "How do I get USDC?", a: "You can obtain USDC on Base Sepolia from Coinbase or any DEX. For testing, use Circle Faucet: faucet.circle.com" },
      { q: "When can I withdraw as a freelancer?", a: "When a milestone is approved, USDC is added to your balance. Use the Withdraw Funds button to transfer it to your wallet at any time. No waiting period." },
    ]
  },
  {
    title: "Escrow & Security",
    items: [
      { q: "How does the escrow system work?", a: "When a client posts a job, USDC is locked in the smart contract. The contract holds the funds securely. When the job is approved, it is automatically sent to the freelancer. No intermediary is involved." },
      { q: "Why do freelancers stake?", a: "Placing a bid requires staking 5 USDC. This deposit prevents non-serious bids. The stake is returned when the job is successfully completed." },
      { q: "What does 72-hour auto-release mean?", a: "If the freelancer delivers the work but the client neither approves nor raises a dispute within 72 hours, funds are automatically released to the freelancer." },
      { q: "What if the client deliberately refuses to approve?", a: "The 72-hour rule exists exactly for this. If the client intentionally refuses to approve, funds are automatically released when the timer expires." },
    ]
  },
  {
    title: "Disputes",
    items: [
      { q: "How do I raise a dispute?", a: "Click the Dispute button on the job detail page and upload evidence (IPFS hash, link, or description). Both parties can submit evidence." },
      { q: "Who is the admin?", a: "The platform administrator is the owner of the wallet address that deployed the contract. They review disputes, evaluate evidence, and issue on-chain decisions." },
      { q: "How is a decision made?", a: "After reviewing both parties' evidence, the admin applies one of three options: (1) Client Wins — full refund, (2) Freelancer Wins — full payment, (3) Split — division at a specified ratio." },
      { q: "What happens if I raise a bad-faith dispute?", a: "Every lost dispute deducts 50 points from your reputation score. Multiple lost disputes may result in account restrictions." },
    ]
  },
  {
    title: "Badges & Reputation",
    items: [
      { q: "What are Soulbound NFT badges?", a: "NFTs automatically minted on-chain based on the number of completed jobs or USDC earned. They are non-transferable — they belong only to that address. This makes fake reputation impossible." },
      { q: "What badges are available?", a: "First Step (1 job), Rising Star (5 jobs), Reliable Pro (10 jobs), Veteran (25 jobs), Elite (50 jobs), Legend (100 jobs), Top Earner (10,000+ USDC), Dispute Free (10 consecutive dispute-free jobs), Speed Demon (5 on-time deliveries)." },
      { q: "How is the reputation score calculated?", a: "Every user starts with 500 points (range: 0–1000). Each successfully completed job earns +20 points. Each lost dispute deducts 50 points." },
    ]
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)", cursor: "pointer" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0" }}>
        <span className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", flex: 1, marginRight: 16 }}>{q}</span>
        <ChevronDown size={15} color="var(--text-muted)" style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </div>
      {open && <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75, paddingBottom: 18, marginTop: -4 }}>{a}</p>}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <nav className="glass" style={{ position: "sticky", top: 0, zIndex: 50, borderTop: "none", borderLeft: "none", borderRight: "none" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/logo.jpg" alt="Workify" width={28} height={28} style={{ borderRadius: 6 }} />
            <span className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #4F7FFF, #A064FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Workify</span>
          </Link>
          <Link href="/" style={{ textDecoration: "none" }}>
            <button className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "7px 14px" }}>
              <ArrowLeft size={13} /> Back
            </button>
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 100px" }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>FAQ</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 56 }}>Everything you need to know about Workify.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>
                {section.title}
              </h2>
              <div className="card" style={{ padding: "4px 28px" }}>
                {section.items.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
