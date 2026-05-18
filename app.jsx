/* YAPS · Landing + About pages, route transition portal, root app */

const I18N = {
  fr: {
    hero: {
      eyebrow: "v1.4.2 · iOS · Android · 9,99€/mois",
      title_a: "Votre nutrition,",
      title_grad: "réinventée par l'IA",
      sub: "Suivez vos repas, atteignez vos objectifs et bénéficiez d'un coach IA personnel 24/7. Disponible sur iPhone et Android.",
      scroll: "Faites défiler"
    },
    stats: {
      eyebrow: "Aujourd'hui sur YAPS",
      title: "Une communauté qui mange plus intelligemment.",
      items: [
      { n: 90, label: "de nos utilisateurs recommandent YAPS", suffix: "%" },
      { n: 7.4, label: "Millions de repas analysés", suffix: "M" },
      { n: 12800, label: "Recettes proposées", suffix: "+" },
      { n: 2.1, label: "Milliards de calories suivies", suffix: "Mds" }]

    },
    preview: {
      eyebrow: "Aperçu",
      title: "Conçue pour les vraies vies.",
      lead: "Trois interfaces. Une promesse simple : comprendre ce que vous mangez, sans effort.",
      items: [
      { title: "Scan & analyse", body: "Prenez une photo de votre assiette — l'IA identifie les ingrédients et calcule les macros en quelques secondes." },
      { title: "Coach IA 24/7", body: "Posez n'importe quelle question nutrition. Le coach connaît vos objectifs et adapte ses réponses." },
      { title: "Progression claire", body: "Poids, énergie, micro-nutriments. Tout ce qui compte, jamais ce qui distrait." }]

    },
    cta: {
      title: "Prêt à commencer ?",
      sub: "Téléchargez gratuitement. Sans engagement."
    }
  },
  en: {
    hero: {
      eyebrow: "v1.4.2 · iOS · Android · €9.99/mo",
      title_a: "Your nutrition,",
      title_grad: "rethought by AI",
      sub: "Track your meals, hit your goals, and get a personal AI coach 24/7. Available on iPhone and Android.",
      scroll: "Scroll"
    },
    stats: {
      eyebrow: "Today on YAPS",
      title: "A community eating more intelligently.",
      items: [
      { n: 90, label: "of our users recommend YAPS", suffix: "%" },
      { n: 7.4, label: "Million meals analyzed", suffix: "M" },
      { n: 12800, label: "Recipes suggested", suffix: "+" },
      { n: 2.1, label: "Billion calories tracked", suffix: "B" }]

    },
    preview: {
      eyebrow: "Preview",
      title: "Designed for real life.",
      lead: "Three interfaces. One simple promise: understand what you eat, effortlessly.",
      items: [
      { title: "Scan & analyze", body: "Snap a photo of your plate — AI identifies ingredients and computes macros in seconds." },
      { title: "AI coach 24/7", body: "Ask any nutrition question. Your coach knows your goals and adapts." },
      { title: "Clear progress", body: "Weight, energy, micronutrients. Everything that matters, none of the noise." }]

    },
    cta: {
      title: "Ready to begin?",
      sub: "Download free. No commitment."
    }
  }
};

/* ============ Reveal-on-scroll wrapper ============ */
function Reveal({ children, delay = 0, as = "div", ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""}`} {...rest}>
      {children}
    </Tag>);

}

/* ============ Animated counter ============ */
function CountUp({ to, suffix = "", decimals = 0 }) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) {
          started = true;
          const dur = 1600;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(eased * to);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  const formatted =
  decimals > 0 ?
  val.toFixed(decimals) :
  Math.round(val).toLocaleString("fr-FR");
  return (
    <span ref={ref} className="stat-num">
      {formatted}
      <span style={{ color: "var(--yaps-violet)" }}>{suffix}</span>
    </span>);

}

/* ============ Phone mockup with stubbed UI ============ */
function PhoneMock({ variant = "scan" }) {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        {variant === "scan" && <PhoneScreenScan />}
        {variant === "coach" && <PhoneScreenCoach />}
        {variant === "progress" && <PhoneScreenProgress />}
      </div>
    </div>);

}

function PhoneScreenScan() {
  return (
    <div style={{ padding: "44px 14px 14px", height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Scan · 12:42
      </div>
      <div style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.15 }}>Bol poké saumon</div>
      <div
        style={{
          aspectRatio: "1 / 1",
          borderRadius: 16,
          background: "linear-gradient(135deg, #ffd2bd, #ffabd1 60%, #c79bff)",
          position: "relative",
          overflow: "hidden"
        }}>
        
        {/* viewfinder corners */}
        {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) =>
        <div key={i} style={{
          position: "absolute",
          [x ? "right" : "left"]: 10,
          [y ? "bottom" : "top"]: 10,
          width: 18, height: 18,
          border: "2px solid rgba(255,255,255,0.85)",
          borderTopWidth: y ? 0 : 2,
          borderBottomWidth: y ? 2 : 0,
          borderLeftWidth: x ? 0 : 2,
          borderRightWidth: x ? 2 : 0,
          borderRadius: 4
        }} />
        )}
        <div style={{
          position: "absolute", bottom: 12, left: 12, right: 12,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderRadius: 12, padding: "10px 12px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12
        }}>
          <span style={{ fontWeight: 600 }}>587 kcal</span>
          <span style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>P 42 · G 48 · L 22</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {["Saumon", "Riz", "Avocat"].map((x) =>
        <div key={x} style={{
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: "8px 6px",
          textAlign: "center",
          fontSize: 11,
          fontWeight: 500
        }}>
            {x}
          </div>
        )}
      </div>
      <button style={{
        marginTop: "auto",
        height: 38,
        borderRadius: 999,
        border: 0,
        background: "var(--grad-brand-h)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 13
      }}>Ajouter au journal</button>
    </div>);

}

function PhoneScreenCoach() {
  return (
    <div style={{ padding: "44px 14px 14px", height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Coach IA
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28 }}><YapsLogo size={28} /></div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>YAPS</div>
        <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "var(--font-mono)", color: "#1aa85b" }}>● en ligne</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
        <div style={{
          alignSelf: "flex-end",
          background: "var(--grad-brand-h)",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "14px 14px 4px 14px",
          fontSize: 12,
          maxWidth: "80%"
        }}>
          Que manger avant ma course de 10km demain matin ?
        </div>
        <div style={{
          alignSelf: "flex-start",
          background: "#f3f0fa",
          color: "var(--ink)",
          padding: "8px 12px",
          borderRadius: "14px 14px 14px 4px",
          fontSize: 12,
          maxWidth: "85%",
          lineHeight: 1.4
        }}>
          Idéalement 2h avant : flocons d'avoine, banane, miel. Glucides lents + rapides, faciles à digérer.
        </div>
        <div style={{
          alignSelf: "flex-start",
          background: "#f3f0fa",
          padding: "8px 12px",
          borderRadius: "14px 14px 14px 4px",
          fontSize: 12,
          color: "var(--ink-2)",
          maxWidth: "85%"
        }}>
          Je peux te générer la recette ?
        </div>
      </div>
      <div style={{
        marginTop: "auto",
        height: 36,
        borderRadius: 999,
        background: "#fff",
        border: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        fontSize: 12,
        color: "var(--ink-3)"
      }}>
        Écrire un message…
      </div>
    </div>);

}

function PhoneScreenProgress() {
  // Tiny SVG chart
  const points = [62, 58, 60, 55, 53, 54, 50, 48, 46, 47, 45, 43];
  const max = Math.max(...points),min = Math.min(...points);
  const w = 200,h = 80,pad = 6;
  const path = points.map((v, i) => {
    const x = pad + i / (points.length - 1) * (w - pad * 2);
    const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <div style={{ padding: "44px 14px 14px", height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Progression
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>71,4</span>
        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>kg · –4,2 ce mois</span>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 10 }}>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="80">
          <defs>
            <linearGradient id="prog-g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A8347D" />
              <stop offset="100%" stopColor="#7B4FD8" />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="url(#prog-g)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((v, i) => {
            const x = pad + i / (points.length - 1) * (w - pad * 2);
            const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
            return <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 3 : 1.4} fill="#7B4FD8" />;
          })}
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {[
        ["Cal. moy.", "1 847"],
        ["Protéines", "112 g"],
        ["Hydratation", "2,1 L"],
        ["Sommeil", "7 h 24"]].
        map(([k, v]) =>
        <div key={k} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "8px 10px" }}>
            <div style={{ fontSize: 9, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{v}</div>
          </div>
        )}
      </div>
    </div>);

}

/* ============ Preview carousel (mobile: snap+dots) ============ */
function PreviewCarousel({ items, lang }) {
  const trackRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const upd = () => setIsMobile(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  // Track which card is centered in the scroll viewport
  React.useEffect(() => {
    if (!isMobile) return;
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const kids = Array.from(track.children);
        const r = track.getBoundingClientRect();
        const center = r.left + r.width / 2;
        let nearest = 0, minD = Infinity;
        kids.forEach((el, i) => {
          const cr = el.getBoundingClientRect();
          const c = cr.left + cr.width / 2;
          const d = Math.abs(c - center);
          if (d < minD) { minD = d; nearest = i; }
        });
        setActive(nearest);
      });
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const kid = track.children[i];
    if (kid) kid.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <>
      <div ref={trackRef} className="preview-track">
        {["scan", "coach", "progress"].map((v, i) => (
          <div key={v} className="preview-item">
            <div style={{
              transform: !isMobile && (i === 1
                ? "perspective(900px) rotateY(0deg) translateY(-12px)"
                : `perspective(900px) rotateY(${i === 0 ? 8 : -8}deg)`) || "none",
              transformOrigin: "center",
            }}>
              <PhoneMock variant={v} />
            </div>
            <div className="copy">
              <h3 className="h3" style={{ marginBottom: 10 }}>{items[i].title}</h3>
              <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.55, margin: 0 }}>
                {items[i].body}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="preview-dots" role="tablist" aria-label="Pagination">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            aria-label={`${lang === "fr" ? "Diapositive" : "Slide"} ${i + 1}`}
            className={active === i ? "active" : ""}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
}

/* ============ LANDING ============ */
function LandingPage({ lang }) {
  const t = I18N[lang];
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <Hero3D />
        <div className="hero-inner wrap">
          <div className="chip" style={{ marginBottom: 28 }}>
            <span className="dot" /> {t.hero.eyebrow}
          </div>
          <h1 className="h1">
            {t.hero.title_a}
            <br />
            <span className="grad-text">{t.hero.title_grad}</span>
          </h1>
          <p className="lead" style={{ marginTop: 28 }}>{t.hero.sub}</p>
          <div className="hero-ctas" style={{ marginTop: 36 }}>
            <StoreBadges lang={lang} />
          </div>
        </div>
        <div className="scroll-cue">{t.hero.scroll}</div>
      </section>

      {/* STATS */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.stats.eyebrow}</div>
            <h2 className="h2" style={{ maxWidth: "20ch", marginBottom: 56 }}>
              {t.stats.title}
            </h2>
          </Reveal>
          <div className="stats-grid">
            {t.stats.items.map((s, i) =>
            <Reveal key={s.label} delay={i * 80} className="stat">
                <CountUp
                to={s.n}
                suffix={s.suffix}
                decimals={s.n < 10 ? 1 : 0} />
              
                <div style={{ marginTop: 14, color: "var(--ink-2)", fontSize: 14, maxWidth: "20ch" }}>
                  {s.label}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="wrap">
          <Reveal style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 72px" }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{t.preview.eyebrow}</div>
            <h2 className="h2" style={{ marginBottom: 18 }}>{t.preview.title}</h2>
            <p className="lead" style={{ margin: "0 auto" }}>{t.preview.lead}</p>
          </Reveal>
          <PreviewCarousel items={t.preview.items} lang={lang} />
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingBlock: "clamp(60px, 8vw, 120px)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="h2" style={{ marginBottom: 18 }}>
              {t.cta.title.split(" ").slice(0, -1).join(" ")} <span className="grad-text">{t.cta.title.split(" ").slice(-1)[0]}</span>
            </h2>
            <p className="lead" style={{ margin: "0 auto 36px" }}>{t.cta.sub}</p>
            <StoreBadges lang={lang} />
          </Reveal>
        </div>
      </section>
    </main>);

}

/* ============ ABOUT ============ */
const ABOUT = {
  fr: {
    h1_a: "L'histoire",
    h1_b: "de YAPS",
    sub: "Une vision : rendre la nutrition intelligente accessible à tous.",
    paras: [
    "YAPS est né d'une frustration. Pendant des années, j'ai voulu mieux comprendre ce que je mangeais — sans pour autant transformer chaque repas en équation. Les applis de suivi nutritionnel demandaient trop de saisie, les coachs étaient inaccessibles, et les recommandations changeaient chaque semaine selon la dernière tendance.",
    "L'idée a pris forme fin 2024 quand j'ai réalisé qu'un modèle multimodal pouvait faire en deux secondes ce qui me prenait dix minutes : regarder une assiette, identifier les ingrédients, estimer les portions, calculer les macros — et surtout, expliquer.",
    "YAPS, c'est cette idée portée à son terme : une IA entraînée sur des milliers de plats du monde réel, un coach conversationnel disponible 24/7, et une interface qui disparaît quand vous n'en avez plus besoin. Le but n'est pas de vous faire compter — c'est de vous faire comprendre.",
    "Aujourd'hui, 90% de nos utilisateurs recommandent YAPS. Athlètes, jeunes parents, étudiants, professionnels en reconversion. Chacun avec son propre objectif. La mission reste la même : démocratiser un coaching nutritionnel qui était jusqu'ici réservé à une minorité."],

    values_t: "Nos valeurs",
    values: [
    { t: "Rigueur scientifique", d: "Nos recommandations s'appuient sur des sources peer-reviewed. Chaque affirmation est traçable." },
    { t: "Respect de la vie privée", d: "Vos données vous appartiennent. Chiffrement de bout en bout. Aucun partage à des tiers." },
    { t: "Accessibilité", d: "9,99€/mois, sans engagement. Une version gratuite généreuse. Disponible sur iOS et Android." }],

    cta: "Rejoignez YAPS"
  },
  en: {
    h1_a: "The story",
    h1_b: "of YAPS",
    sub: "One vision: make intelligent nutrition accessible to everyone.",
    paras: [
    "YAPS was born out of frustration. For years I wanted to better understand what I was eating — without turning every meal into an equation. Nutrition apps demanded too much manual entry, coaches were unreachable, and recommendations changed every week with the latest trend.",
    "The idea took shape in late 2024 when I realized a multimodal model could do in two seconds what was taking me ten minutes: look at a plate, identify ingredients, estimate portions, compute macros — and most importantly, explain.",
    "YAPS is that idea taken to its conclusion: an AI trained on thousands of real-world meals, a conversational coach available 24/7, and an interface that gets out of the way when you no longer need it. The goal isn't to make you count — it's to make you understand.",
    "Today, 90% of our users recommend YAPS. Athletes, new parents, students, career-changers. Each with their own goal. The mission stays the same: democratize a kind of nutrition coaching that used to be reserved for a few."],

    values_t: "Our values",
    values: [
    { t: "Scientific rigor", d: "Our recommendations are grounded in peer-reviewed sources. Every claim is traceable." },
    { t: "Privacy first", d: "Your data is yours. End-to-end encryption. No third-party sharing." },
    { t: "Accessibility", d: "€9.99/mo, no commitment. Generous free tier. Available on iOS and Android." }],

    cta: "Join YAPS"
  }
};

function ValueIcon({ kind }) {
  // Original, simple geometric glyphs only — no medical/branded marks
  if (kind === "science") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V3" />
      <path d="M8 3h8" />
    </svg>);

  if (kind === "privacy") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 4.5-3.5 8.4-8 9-4.5-.6-8-4.5-8-9V6z" />
    </svg>);

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>);

}

function AboutPage({ lang, navigate }) {
  const t = ABOUT[lang];
  return (
    <main>
      <section className="section" style={{ paddingTop: 40, position: "relative", overflow: "hidden" }}>
        {/* Ambient backdrop blob (subtle brand reflection) */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: -120, right: -120,
          width: 560, height: 560,
          borderRadius: 999,
          background: "radial-gradient(closest-side, rgba(168,52,125,0.18), transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none"
        }} />
        <div aria-hidden="true" style={{
          position: "absolute",
          bottom: -180, left: -120,
          width: 540, height: 540,
          borderRadius: 999,
          background: "radial-gradient(closest-side, rgba(123,79,216,0.16), transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none"
        }} />

        <div className="wrap about-hero" style={{ position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <div className="founder" aria-label="Pascal Olivier YAPO, fondateur de YAPS">
              {/* Try real photo; falls back gracefully to the styled gradient circle */}
              <img
                src="public/about/founder.jpg"
                alt="Pascal Olivier YAPO, fondateur de YAPS"
                width="480"
                height="480"
                onError={(e) => {e.currentTarget.style.display = "none";}}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                  zIndex: 1
                }} />
              
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>
                Pascal Olivier YAPO
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
                {lang === "fr" ? "Fondateur de YAPS" : "Founder of YAPS"}
              </div>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>YAPS · 2026</div>
            <h1 className="h1" style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}>
              {t.h1_a} <span className="grad-text">{t.h1_b}</span>
            </h1>
            <p className="lead" style={{ marginTop: 22 }}>{t.sub}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr", maxWidth: 760, marginInline: "auto" }}>
          <Reveal as="div" className="prose">
            {t.paras.map((p, i) => <p key={i}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{t.values_t}</div>
            <h2 className="h2" style={{ marginBottom: 48, maxWidth: "16ch" }}>
              {lang === "fr" ?
              <>Trois principes <span className="grad-text">non-négociables</span>.</> :
              <>Three <span className="grad-text">non-negotiables</span>.</>}
            </h2>
          </Reveal>
          <div className="values">
            {t.values.map((v, i) =>
            <Reveal key={v.t} delay={i * 90}>
                <div className="card">
                  <div className="value-icon">
                    <ValueIcon kind={["science", "privacy", "access"][i]} />
                  </div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>{v.t}</h3>
                  <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{v.d}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <div className="wrap">
          <Reveal>
            <h2 className="h2" style={{ marginBottom: 28 }}>
              <span className="grad-text">{t.cta}</span>
            </h2>
            <StoreBadges lang={lang} />
          </Reveal>
        </div>
      </section>
    </main>);

}

/* ============ Portal page transition ============
   12 meal-photo cards float in 3D, gently spinning. If the user has
   /public/meals/meal-NN.jpg in place they show as textures; otherwise
   a soft monogram placeholder card is drawn. Glassmorphism on edges. */
function PortalCard({ idx, x, y, w, h, rx, ry, rz, delay }) {
  const num = String(idx % 12 + 1).padStart(2, "0");
  const src = `public/meals/meal-${num}.jpg`;
  const [hasImg, setHasImg] = React.useState(true);
  return (
    <div
      className="portal-card"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: w,
        height: h,
        animation: `portal-card 760ms ${delay}ms var(--ease-out) forwards`,
        // Custom CSS vars consumed by the keyframes
        "--rx": `${rx}deg`,
        "--ry": `${ry}deg`,
        "--rz": `${rz}deg`
      }}>
      
      {hasImg ?
      <img
        src={src}
        alt=""
        onError={() => setHasImg(false)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "inherit",
          display: "block"
        }} /> :


      <div
        aria-hidden="true"
        style={{
          width: "100%", height: "100%",
          borderRadius: "inherit",
          background:
          `linear-gradient(${135 + idx * 23}deg, #efe7f7, #f7e7ed 60%, #e6dcf4)`,
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(60, 30, 100, 0.42)",
          letterSpacing: "0.12em"
        }}>
        
          MEAL · {num}
        </div>
      }
      {/* Glass edge: subtle gradient frame + reflective highlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background:
          "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.05) 22%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.18) 100%)",
          mixBlendMode: "overlay"
        }} />
      
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.45), inset 0 0 24px rgba(168, 52, 125, 0.18)"
        }} />
      
    </div>);

}

function PagePortal({ active, onDone }) {
  const cards = React.useMemo(
    () =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 8 + Math.random() * 78,
      w: 150 + Math.random() * 170,
      h: 110 + Math.random() * 150,
      rx: -24 + Math.random() * 48,
      ry: -24 + Math.random() * 48,
      rz: -10 + Math.random() * 20,
      delay: Math.random() * 140
    })),
    [active]
  );
  React.useEffect(() => {
    if (!active) return;
    const t = setTimeout(onDone, 820);
    return () => clearTimeout(t);
  }, [active, onDone]);
  if (!active) return null;
  return (
    <div className="portal" aria-hidden="true">
      {cards.map((c) =>
      <PortalCard key={c.id} idx={c.id} {...c} />
      )}
      <style>{`
        @keyframes portal-card {
          0%   {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              translateZ(-400px)
              rotateX(40deg)
              rotateY(calc(var(--ry) * 0.3))
              rotateZ(calc(var(--rz) * 0.3))
              scale(0.42);
          }
          35%  { opacity: 1; }
          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              translateZ(600px)
              rotateX(var(--rx))
              rotateY(calc(var(--ry) + 60deg))
              rotateZ(calc(var(--rz) + 12deg))
              scale(1.35);
          }
        }
      `}</style>
    </div>);

}

/* ============ PRIVACY / TERMS — placeholder routes ============ */
function LegalPage({ kind, lang }) {
  const titles = {
    privacy: { fr: "Politique de confidentialité", en: "Privacy Policy" },
    terms: { fr: "Conditions d'utilisation", en: "Terms of Use" }
  };
  const stub = lang === "fr" ?
  "Contenu en cours de finalisation. Cette page sera remplacée par la version officielle publiée sur yaps-nutrition.fr." :
  "Content being finalized. This page will be replaced with the official version published at yaps-nutrition.fr.";
  return (
    <main>
      <section className="section" style={{ paddingTop: 80 }}>
        <div className="wrap" style={{ maxWidth: 760, marginInline: "auto" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>YAPS · {kind === "privacy" ? "01" : "02"}</div>
          <h1 className="h1" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 18 }}>
            {titles[kind][lang]}
          </h1>
          <p className="lead">{stub}</p>
          <div style={{ marginTop: 32 }}>
            <span className="chip"><span className="dot" /> /{kind} · placeholder</span>
          </div>
        </div>
      </section>
    </main>);

}

/* ============ App root ============ */
function App() {
  const [route, setRoute] = React.useState(
    typeof window !== "undefined" && window.location.hash ?
    window.location.hash.replace("#", "") :
    "/"
  );
  const [lang, setLang] = React.useState("fr");
  const [loading, setLoading] = React.useState(true);
  const [portal, setPortal] = React.useState(false);
  const [pendingRoute, setPendingRoute] = React.useState(null);

  // Initial loader (gives the 3D scene a moment + showcases the loader)
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  // Sync hash for deep links
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "") || "/";
      setRoute(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (to) => {
    if (to === route) return;
    // Trigger portal transition
    setPortal(true);
    setPendingRoute(to);
  };

  // Mid-transition: swap route at ~peak, then end transition
  React.useEffect(() => {
    if (!portal || !pendingRoute) return;
    const swap = setTimeout(() => {
      setRoute(pendingRoute);
      window.location.hash = pendingRoute;
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 320);
    return () => clearTimeout(swap);
  }, [portal, pendingRoute]);

  const onPortalDone = () => {
    setPortal(false);
    setPendingRoute(null);
  };

  // Pages
  let page;
  if (route === "/about") {
    page = <AboutPage lang={lang} navigate={navigate} />;
  } else if (route === "/features") {
    page = <window.FeaturesPage lang={lang} navigate={navigate} />;
  } else if (route === "/pricing") {
    page = <window.PricingPage lang={lang} navigate={navigate} />;
  } else if (route === "/sciences" || route === "/science") {
    page = <window.SciencesPage lang={lang} navigate={navigate} />;
  } else if (route === "/download") {
    page = <window.DownloadPage lang={lang} navigate={navigate} />;
  } else if (route === "/contact") {
    page = <window.ContactPage lang={lang} navigate={navigate} />;
  } else if (route === "/privacy") {
    page = <LegalPage kind="privacy" lang={lang} />;
  } else if (route === "/terms") {
    page = <LegalPage kind="terms" lang={lang} />;
  } else {
    page = <LandingPage lang={lang} />;
  }

  return (
    <window.AuthProvider>
      <YapsLoader done={!loading} />
      <Navigation route={route} navigate={navigate} lang={lang} setLang={setLang} />
      <div style={{ opacity: portal ? 0.4 : 1, transition: "opacity 280ms var(--ease-out)" }}>
        {page}
      </div>
      <Footer lang={lang} setLang={setLang} navigate={navigate} />
      <PagePortal active={portal} onDone={onPortalDone} />
    </window.AuthProvider>);

}

// Expose shared building blocks so pages2.jsx can use them across the script boundary
window.RevealBlock = Reveal;
window.PreviewCarousel = PreviewCarousel;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);