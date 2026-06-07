import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight, Sparkles, Code2, ShoppingBag, Cpu, Megaphone, Share2, Palette, TrendingUp,
  Check, Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Linkedin, Star, Menu, X,
  Rocket, Target, Zap, Users, Award, HeadphonesIcon, BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logoAsset from "@/assets/product-lens-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Product Lens Studio — Websites, Software & AI Marketing That Grow Brands" },
      { name: "description", content: "Product Lens Studio designs and builds premium websites, e-commerce, custom software, and AI-powered ad campaigns that turn businesses into market leaders." },
      { property: "og:title", content: "Product Lens Studio — Design. Develop. Grow." },
      { property: "og:description", content: "Premium digital agency building websites, software, and AI-powered campaigns that drive measurable growth." },
      { property: "og:image", content: logoAsset.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: logoAsset.url },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Product Lens Studio",
          description: "Premium digital agency for websites, software, AI ads, branding and digital growth.",
          image: logoAsset.url,
          url: "https://productlens.studio",
          slogan: "Design • Develop • Grow",
        }),
      },
    ],
  }),
  component: HomePage,
});

/* ---------------- helpers ---------------- */

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto relative">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fade}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6"
    >
      <span className="size-1.5 rounded-full bg-gradient-brand" />
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------------- nav ---------------- */

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all ${scrolled ? "glass-strong shadow-glow" : ""}`}>
          <a href="#top" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Product Lens Studio" className="h-10 w-10 rounded-lg object-cover" />
            <span className="hidden sm:block font-semibold tracking-tight">
              Product Lens <span className="text-gradient-brand">Studio</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-flex">
            <Button className="bg-gradient-brand text-white hover:opacity-90 rounded-full px-5">
              Book Free Call <ArrowRight className="size-4" />
            </Button>
          </a>
          <button className="md:hidden p-2 rounded-lg glass" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-2"
            >
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/5">{n.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)}>
                <Button className="w-full bg-gradient-brand text-white rounded-full">Book Free Call</Button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div id="top" ref={ref} className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-50 animate-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* floating 3D orbs */}
      <motion.div style={{ y: y1 }} className="absolute top-24 -left-10 size-72 rounded-full bg-gradient-brand blur-3xl opacity-30 animate-float" />
      <motion.div style={{ y: y2 }} className="absolute bottom-10 -right-20 size-96 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet blur-3xl opacity-25 animate-float-slow" />

      {/* floating glass cards */}
      <motion.div
        initial={{ opacity: 0, x: -40, rotate: -8 }} animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="hidden lg:block absolute left-8 top-1/2 glass rounded-2xl p-4 w-52 shadow-glow animate-float"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Zap className="size-3.5 text-brand-cyan" /> Live Project</div>
        <div className="mt-2 text-sm font-medium">Conversion +218%</div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-brand" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40, rotate: 6 }} animate={{ opacity: 1, x: 0, rotate: 4 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden lg:block absolute right-8 top-1/3 glass rounded-2xl p-4 w-56 shadow-glow animate-float-slow"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><BrainCircuit className="size-3.5 text-brand-violet" /> AI Campaign</div>
        <div className="mt-2 text-sm font-medium">CTR 11.4%</div>
        <div className="mt-1 text-[11px] text-muted-foreground">↑ 3.2× industry avg</div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <Sparkles className="size-3.5 text-brand-cyan" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Design • Develop • Grow</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.03em] leading-[1.02]"
        >
          Transform Your Business <br className="hidden md:block" />
          With <span className="text-gradient">Modern Digital</span> Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-7 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          We build powerful websites, e-commerce platforms, software solutions, AI-powered ad campaigns,
          and complete brand experiences that help businesses grow faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#contact">
            <Button size="lg" className="h-12 px-7 rounded-full bg-gradient-brand text-white hover:opacity-90 shadow-glow">
              Book Free Consultation <ArrowRight className="size-4" />
            </Button>
          </a>
          <a href="#portfolio">
            <Button size="lg" variant="outline" className="h-12 px-7 rounded-full glass border-white/15 text-foreground hover:bg-white/5">
              View Our Work
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-16 flex items-center justify-center gap-8 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2"><Check className="size-4 text-brand-cyan" /> Trusted by 50+ brands</div>
          <div className="hidden sm:flex items-center gap-2"><Check className="size-4 text-brand-cyan" /> 98% client satisfaction</div>
          <div className="hidden md:flex items-center gap-2"><Check className="size-4 text-brand-cyan" /> 5+ years experience</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- services ---------------- */

const SERVICES = [
  { icon: Code2, title: "Website Development", desc: "Custom business websites built for performance, SEO and conversions." },
  { icon: ShoppingBag, title: "E-Commerce Development", desc: "Online stores designed to increase sales and customer engagement." },
  { icon: Cpu, title: "Software Development", desc: "Custom software solutions tailored to your business requirements." },
  { icon: BrainCircuit, title: "AI Advertisement Creation", desc: "High-converting AI-generated ad creatives and full campaigns." },
  { icon: Share2, title: "Social Media Management", desc: "End-to-end content planning, growth strategy & community management." },
  { icon: Palette, title: "Poster & Creative Design", desc: "Premium posters, branding materials and marketing creatives." },
  { icon: TrendingUp, title: "Digital Marketing", desc: "Lead generation, paid advertising and full-funnel brand growth." },
];

function Services() {
  return (
    <Section id="services">
      <div className="text-center max-w-2xl mx-auto">
        <SectionLabel>What we do</SectionLabel>
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}
          className="text-4xl md:text-6xl font-semibold tracking-[-0.02em]">
          Everything you need to <span className="text-gradient-brand">launch & scale</span>
        </motion.h2>
        <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} custom={1}
          className="mt-5 text-muted-foreground">
          One studio. Seven disciplines. Built to compound your growth.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade} custom={i}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl glass border-gradient p-7 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 size-48 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700" />
            <div className="relative">
              <div className="size-12 rounded-xl glass-strong flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <s.icon className="size-5 text-brand-cyan" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="size-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- why us ---------------- */

const REASONS = [
  { icon: Users, label: "Experienced Team" },
  { icon: Cpu, label: "Modern Technologies" },
  { icon: Rocket, label: "Fast Delivery" },
  { icon: Target, label: "Business-Focused Solutions" },
  { icon: BrainCircuit, label: "AI-Powered Marketing" },
  { icon: HeadphonesIcon, label: "Dedicated Support" },
  { icon: Award, label: "Result-Driven Approach" },
];

function WhyUs() {
  return (
    <Section id="why">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>Why us</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
            Built like a product team. <span className="text-gradient-brand">Delivered like an agency.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg">
            We don't ship "deliverables" — we ship outcomes. Every line of code, every creative, every campaign is engineered to move a business metric.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.label}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fade} custom={i}
              className="glass rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="size-9 rounded-lg bg-gradient-brand/20 grid place-items-center">
                <r.icon className="size-4 text-brand-cyan" />
              </div>
              <span className="text-sm font-medium">{r.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- stats ---------------- */

function Stats() {
  const items = [
    { value: 100, suffix: "+", label: "Projects Completed" },
    { value: 50, suffix: "+", label: "Happy Clients" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
  ];
  return (
    <Section className="!py-20">
      <div className="glass-strong rounded-3xl p-10 md:p-14 border-gradient overflow-hidden relative">
        <div className="absolute inset-0 bg-radial-glow opacity-50" />
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- team ---------------- */

const TEAM = [
  { name: "Ankit A. Jadhav", role: "Manager", desc: "Project management, client communication, business strategy and operations.", initials: "AJ", gradient: "from-brand-violet to-brand-blue" },
  { name: "Kapil K. Jadhav", role: "Web & Software Developer", desc: "Websites, software engineering, backend systems and digital solutions.", initials: "KJ", gradient: "from-brand-blue to-brand-cyan" },
  { name: "Tanmay M. Dusane", role: "Social Media & AI Ads Specialist", desc: "Social growth, AI advertising, content strategy and performance marketing.", initials: "TD", gradient: "from-brand-cyan to-brand-violet" },
  { name: "Disha M. Dusane", role: "Creative Designer & AI Ads", desc: "Posters, branding assets, marketing creatives and AI-powered visuals.", initials: "DD", gradient: "from-brand-violet to-brand-cyan" },
];

function Team() {
  return (
    <Section id="team">
      <div className="text-center max-w-2xl mx-auto">
        <SectionLabel>The team</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em]">
          Specialists behind every <span className="text-gradient-brand">pixel & line of code</span>
        </h2>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TEAM.map((m, i) => (
          <motion.div
            key={m.name}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade} custom={i}
            whileHover={{ y: -6 }}
            className="group glass rounded-2xl p-6 border-gradient relative overflow-hidden"
          >
            <div className={`size-20 rounded-2xl bg-gradient-to-br ${m.gradient} grid place-items-center text-2xl font-semibold shadow-glow group-hover:scale-105 transition-transform`}>
              {m.initials}
            </div>
            <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
            <div className="text-xs uppercase tracking-[0.15em] text-brand-cyan mt-1">{m.role}</div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- process ---------------- */

const STEPS = [
  { n: "01", title: "Consultation", desc: "We listen, audit, and align on business goals." },
  { n: "02", title: "Strategy Planning", desc: "Roadmap, KPIs, scope and the right tech stack." },
  { n: "03", title: "Design & Development", desc: "Premium design + production-grade engineering." },
  { n: "04", title: "Testing & Optimization", desc: "Performance, SEO, accessibility, conversion." },
  { n: "05", title: "Launch & Growth", desc: "Ship, measure, iterate. Scale what works." },
];

function Process() {
  return (
    <Section id="process">
      <div className="text-center max-w-2xl mx-auto">
        <SectionLabel>How we work</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em]">
          A proven <span className="text-gradient-brand">5-step process</span>
        </h2>
      </div>
      <div className="mt-16 relative">
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fade} custom={i}
              className="glass rounded-2xl p-6 relative"
            >
              <div className="size-10 rounded-xl bg-gradient-brand grid place-items-center text-sm font-semibold shadow-glow">{s.n}</div>
              <h3 className="mt-5 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- portfolio ---------------- */

const WORK = [
  { tag: "Website", title: "Luxe Realty Group", color: "from-brand-violet to-brand-blue" },
  { tag: "E-Commerce", title: "Aura Skincare Store", color: "from-brand-cyan to-brand-blue" },
  { tag: "Software", title: "FleetOps Dashboard", color: "from-brand-blue to-brand-violet" },
  { tag: "Social", title: "Café Nova Campaign", color: "from-brand-violet to-brand-cyan" },
  { tag: "AI Ads", title: "FitForge Creative Suite", color: "from-brand-cyan to-brand-violet" },
  { tag: "Poster", title: "Mumbai Music Fest", color: "from-brand-blue to-brand-cyan" },
];

function Portfolio() {
  return (
    <Section id="portfolio">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em] max-w-2xl">
            Brands we helped <span className="text-gradient-brand">level up</span>
          </h2>
        </div>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
          Start your project <ArrowRight className="size-4" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WORK.map((w, i) => (
          <motion.div
            key={w.title}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade} custom={i}
            whileHover={{ y: -6 }}
            className="group rounded-2xl glass border-gradient overflow-hidden"
          >
            <div className={`aspect-[4/3] bg-gradient-to-br ${w.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <motion.div
                className="absolute inset-0 grid place-items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-semibold tracking-tight text-white/90 px-6 text-center">{w.title}</div>
              </motion.div>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-brand-cyan">{w.tag}</div>
                <div className="mt-1 text-sm font-medium">{w.title}</div>
              </div>
              <div className="size-9 rounded-full glass-strong grid place-items-center group-hover:bg-gradient-brand transition-colors">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- testimonials ---------------- */

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Founder, Aura Skincare", quote: "Product Lens rebuilt our store and conversions tripled in 8 weeks. Their AI ads literally pay for themselves." },
  { name: "Rohan Mehta", role: "CEO, FleetOps", quote: "We've worked with 4 agencies. None compare. Strategic, fast, and genuinely care about ROI." },
  { name: "Sara Khan", role: "Marketing Head, Café Nova", quote: "Their creatives feel like a luxury brand. Our footfall jumped 60% in the first month." },
  { name: "Vikram Iyer", role: "Director, Luxe Realty", quote: "From brand to website to lead funnel — they delivered an end-to-end machine. Highly recommend." },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <Section id="testimonials">
      <div className="text-center max-w-2xl mx-auto">
        <SectionLabel>Client love</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em]">
          Trusted by <span className="text-gradient-brand">founders & marketers</span>
        </h2>
      </div>
      <div className="mt-14 max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-strong border-gradient rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-brand-cyan text-brand-cyan" />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight">"{t.quote}"</p>
            <div className="mt-8">
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gradient-brand" : "w-2 bg-white/20"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- contact + form ---------------- */

const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(80),
  business: z.string().trim().min(2, "Enter business name").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid number").max(20),
  service: z.string().min(1, "Pick a service"),
  budget: z.string().min(1, "Pick a budget"),
  details: z.string().trim().min(10, "Tell us a bit more").max(1500),
});
type LeadForm = z.infer<typeof leadSchema>;

const SERVICE_OPTIONS = ["Website Development","E-Commerce","Software Development","AI Advertisement","Social Media Management","Poster & Creative Design","Digital Marketing"];
const BUDGET_OPTIONS = ["Under ₹50k","₹50k – ₹1.5L","₹1.5L – ₹5L","₹5L – ₹15L","₹15L+"];

function ContactSection() {
  const form = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: { fullName: "", business: "", email: "", phone: "", service: "", budget: "", details: "" },
  });

  const onSubmit = async (data: LeadForm) => {
    // Backend hookup: connect Resend + a leads table to deliver emails.
    console.log("New lead:", data);
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Thanks! We received your request — we'll reach out within 24 hours.");
    form.reset();
  };

  return (
    <Section id="contact">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* left: contact info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <SectionLabel>Let's talk</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              Get a <span className="text-gradient-brand">free strategy call</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your business. We'll come back with a clear plan within one business day.
            </p>
          </div>

          {[
            { icon: Mail, label: "Email", value: "hello@productlens.studio", href: "mailto:hello@productlens.studio" },
            { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919876543210" },
            { icon: MapPin, label: "Office", value: "Mumbai, Maharashtra, India" },
          ].map((c) => (
            <a key={c.label} href={c.href ?? "#"} className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/5 transition-colors">
              <div className="size-11 rounded-xl bg-gradient-brand/20 grid place-items-center">
                <c.icon className="size-5 text-brand-cyan" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{c.label}</div>
                <div className="font-medium">{c.value}</div>
              </div>
            </a>
          ))}

          <div className="glass rounded-2xl overflow-hidden h-56">
            <iframe
              title="Office location"
              src="https://www.google.com/maps?q=Mumbai%20Maharashtra&output=embed"
              className="w-full h-full grayscale-[40%] contrast-110 opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* right: form */}
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="lg:col-span-3 glass-strong border-gradient rounded-3xl p-6 md:p-10 space-y-5 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 size-80 rounded-full bg-gradient-brand opacity-20 blur-3xl pointer-events-none" />
          <div className="grid md:grid-cols-2 gap-5 relative">
            <Field label="Full Name" error={form.formState.errors.fullName?.message}>
              <Input {...form.register("fullName")} placeholder="Jane Doe" className="bg-white/5 border-white/10 h-11" />
            </Field>
            <Field label="Business Name" error={form.formState.errors.business?.message}>
              <Input {...form.register("business")} placeholder="Acme Inc." className="bg-white/5 border-white/10 h-11" />
            </Field>
            <Field label="Email Address" error={form.formState.errors.email?.message}>
              <Input {...form.register("email")} type="email" placeholder="jane@acme.com" className="bg-white/5 border-white/10 h-11" />
            </Field>
            <Field label="Mobile Number" error={form.formState.errors.phone?.message}>
              <Input {...form.register("phone")} placeholder="+91 98xxx xxxxx" className="bg-white/5 border-white/10 h-11" />
            </Field>
            <Field label="Service Required" error={form.formState.errors.service?.message}>
              <Select onValueChange={(v) => form.setValue("service", v, { shouldValidate: true })} value={form.watch("service")}>
                <SelectTrigger className="bg-white/5 border-white/10 h-11"><SelectValue placeholder="Choose service" /></SelectTrigger>
                <SelectContent>{SERVICE_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Budget Range" error={form.formState.errors.budget?.message}>
              <Select onValueChange={(v) => form.setValue("budget", v, { shouldValidate: true })} value={form.watch("budget")}>
                <SelectTrigger className="bg-white/5 border-white/10 h-11"><SelectValue placeholder="Choose budget" /></SelectTrigger>
                <SelectContent>{BUDGET_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Project Details" error={form.formState.errors.details?.message}>
            <Textarea {...form.register("details")} rows={5} placeholder="Tell us about your goals, timeline, and what success looks like."
              className="bg-white/5 border-white/10" />
          </Field>
          <Button type="submit" disabled={form.formState.isSubmitting}
            className="w-full h-12 rounded-full bg-gradient-brand text-white hover:opacity-90 shadow-glow text-base">
            {form.formState.isSubmitting ? "Sending..." : <>Get Free Consultation <ArrowRight className="size-4" /></>}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            By submitting you agree to be contacted about your enquiry. We never spam.
          </p>
        </form>
      </div>
    </Section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{label}</div>
      {children}
      {error && <div className="mt-1.5 text-xs text-destructive">{error}</div>}
    </label>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Product Lens Studio" className="h-10 w-10 rounded-lg" />
            <div className="font-semibold">Product Lens <span className="text-gradient-brand">Studio</span></div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Design • Develop • Grow. A premium digital studio building products and campaigns that move the needle.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { icon: Instagram, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: MessageCircle, href: "https://wa.me/919876543210" },
            ].map((s, i) => (
              <a key={i} href={s.href} aria-label="social" className="size-9 rounded-full glass grid place-items-center hover:bg-gradient-brand/20 transition-colors">
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Services</div>
          <ul className="space-y-2 text-sm">
            {["Website Development","E-Commerce","Software Development","AI Ads","Social Media","Poster Design"].map((s) =>
              <li key={s}><a href="#services" className="text-muted-foreground hover:text-foreground">{s}</a></li>
            )}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm">
            {[["Home","#top"],["Services","#services"],["Portfolio","#portfolio"],["Team","#team"],["Contact","#contact"]].map(([l,h]) =>
              <li key={l}><a href={h} className="text-muted-foreground hover:text-foreground">{l}</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
        © 2026 Product Lens Studio. All Rights Reserved.
      </div>
    </footer>
  );
}

/* ---------------- page ---------------- */

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        
        <Process />
        <Portfolio />
        <Team />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
