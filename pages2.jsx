/* YAPS · Phase 2 page components — Features, Pricing, Sciences, Download, Contact
   Each page is responsive and reuses the design system from styles.css */

/* ============ FEATURES PAGE ============ */
function FeaturesPage({ lang, navigate }) {
  const { user } = window.useAuth();
  const [authOpen, setAuthOpen] = React.useState(false);

  // Logged-in users get the dashboard view directly
  if (user) return <window.Dashboard lang={lang} />;

  const t = lang === "fr" ? {
    title_a: "Toutes les",
    title_b: "fonctionnalités YAPS",
    sub: "Découvrez ce que YAPS peut faire pour vous.",
    seeStats: "Voir mes stats personnelles",
    inSituation: "Mockups en situation",
    inSituationSub: "Trois exemples concrets d'utilisation quotidienne.",
    readyTitle: "Prêt à essayer ?",
    readySub: "Téléchargez gratuitement. Sans engagement.",
    features: [
      { ic: "scan",     t: "Scan IA",                       d: "Photographiez votre repas, l'IA calcule les calories et macros en 2 secondes." },
      { ic: "journal",  t: "Journal alimentaire",            d: "Suivez vos repas et votre consommation au quotidien." },
      { ic: "recipe",   t: "Recettes personnalisées",        d: "Des recettes adaptées à vos objectifs nutritionnels." },
      { ic: "coach",    t: "Coach IA 24/7",                  d: "Posez n'importe quelle question, réponses instantanées et personnalisées." },
      { ic: "planner",  t: "Planificateur de repas",         d: "Organisez votre semaine, générez vos listes de courses." },
      { ic: "progress", t: "Progression",                    d: "Suivez poids, IMC et calories sur la durée avec des graphiques clairs." },
    ],
    previewItems: [
      { t: "Scan & analyse en 2 secondes",       d: "Pointez l'objectif sur votre assiette : YAPS identifie les ingrédients, estime les portions et calcule les macros." },
      { t: "Un coach disponible 24/7",            d: "Posez vos questions en langage naturel. Le coach connaît vos objectifs et adapte ses réponses au contexte." },
      { t: "Une progression sans bruit",          d: "Poids, énergie, micro-nutriments : tout ce qui compte, jamais ce qui distrait. Données chiffrées sur la durée." },
    ],
  } : {
    title_a: "All the",
    title_b: "YAPS features",
    sub: "Discover what YAPS can do for you.",
    seeStats: "View my personal stats",
    inSituation: "In real life",
    inSituationSub: "Three concrete examples of daily usage.",
    readyTitle: "Ready to try?",
    readySub: "Download free. No commitment.",
    features: [
      { ic: "scan",     t: "AI Scan",                       d: "Snap a photo of your meal — AI computes calories and macros in 2 seconds." },
      { ic: "journal",  t: "Food journal",                  d: "Track meals and consumption day by day." },
      { ic: "recipe",   t: "Personalized recipes",          d: "Recipes tailored to your nutritional goals." },
      { ic: "coach",    t: "AI coach 24/7",                  d: "Ask any nutrition question — instant, personalized answers." },
      { ic: "planner",  t: "Meal planner",                   d: "Plan your week, generate shopping lists." },
      { ic: "progress", t: "Progress",                       d: "Track weight, BMI and calories over time with clear charts." },
    ],
    previewItems: [
      { t: "Scan & analyze in 2 seconds",   d: "Point the camera at your plate: YAPS identifies ingredients, estimates portions, computes macros." },
      { t: "A coach available 24/7",        d: "Ask in plain language. Your coach knows your goals and adapts to context." },
      { t: "Quiet progress",                d: "Weight, energy, micronutrients: what matters, none of the noise. Real numbers, over real time." },
    ],
  };

  return (
    <main>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 80, textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>YAPS · {lang === "fr" ? "Fonctionnalités" : "Features"}</div>
          <h1 className="h1" style={{ fontSize: "clamp(40px, 6vw, 84px)", marginBottom: 20 }}>
            {t.title_a} <span className="grad-text">{t.title_b}</span>
          </h1>
          <p className="lead" style={{ margin: "0 auto 32px" }}>{t.sub}</p>
          <button className="btn btn-primary" style={{ height: 52, padding: "0 22px" }} onClick={() => setAuthOpen(true)}>
            {t.seeStats} <window.YapsIcons.arrow />
          </button>
        </div>
      </section>

      {/* Features grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="features-grid">
            {t.features.map((f, i) => {
              const Ic = window.YapsIcons[f.ic];
              return (
                <window.RevealBlock key={f.t} delay={i * 60}>
                  <div className="feature-card">
                    <div className="feature-icon"><Ic /></div>
                    <h3 className="h3" style={{ marginBottom: 8 }}>{f.t}</h3>
                    <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.55 }}>{f.d}</p>
                  </div>
                </window.RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* In situation — reuses landing's phone mockups */}
      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="wrap">
          <window.RevealBlock>
            <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{t.inSituation}</div>
              <h2 className="h2" style={{ marginBottom: 14 }}>{t.inSituationSub}</h2>
            </div>
          </window.RevealBlock>
          <window.PreviewCarousel items={t.previewItems} lang={lang} />
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="wrap">
          <window.RevealBlock>
            <h2 className="h2" style={{ marginBottom: 18 }}>{t.readyTitle}</h2>
            <p className="lead" style={{ margin: "0 auto 32px" }}>{t.readySub}</p>
            <StoreBadges lang={lang} />
          </window.RevealBlock>
        </div>
      </section>

      <window.AuthModal open={authOpen} onClose={() => setAuthOpen(false)} lang={lang} navigate={navigate} />
    </main>
  );
}


/* ============ PRICING PAGE ============ */
function PricingPage({ lang, navigate }) {
  const t = lang === "fr" ? {
    title_a: "Un tarif simple,",
    title_b: "sans surprise",
    sub: "Commencez gratuitement, passez Pro quand vous êtes prêt.",
    free: {
      badge: "Pour découvrir",
      price: "0€",
      per: "",
      sub: "À vie. Sans engagement.",
      features: [
        "Journal alimentaire",
        "Calcul IMC, MB et AETQ",
        "1 scan photo par jour",
        "3 recettes par semaine (renouvelables le lundi)",
        "Suivi des calories",
        "Sources scientifiques accessibles",
      ],
      cta: "Télécharger gratuitement",
    },
    pro: {
      badge: "Pour aller plus loin",
      popular: "Populaire",
      price: "9,99€",
      per: "/mois",
      sub: "Annulable à tout moment.",
      features: [
        "Tout du plan Gratuit",
        "Scans photo illimités avec IA",
        "Recettes illimitées et personnalisées",
        "Coach IA personnel 24/7",
        "Programme fitness sur mesure",
        "Planificateur de repas hebdomadaire",
        "Conseils nutritionnels avancés",
        "Export PDF de vos suivis",
        "Support prioritaire",
      ],
      cta: "Passer Pro",
    },
    notice: "L'abonnement Pro s'achète directement depuis l'app, via votre compte Apple ou Google. Le paiement est sécurisé ; l'annulation se fait depuis les réglages de votre compte App Store ou Google Play.",
    faqTitle: "Questions fréquentes sur les tarifs",
    faq: [
      { q: "Comment annuler mon abonnement ?",
        a: "Depuis les réglages de votre compte Apple ou Google. iOS : Réglages → votre nom → Abonnements → YAPS Pro → Annuler. Android : Google Play → Profil → Paiements et abonnements → Abonnements → YAPS Pro → Annuler." },
      { q: "Suis-je débité automatiquement ?",
        a: "Oui, votre abonnement se renouvelle automatiquement chaque mois tant qu'il n'est pas annulé. Vous recevez un email avant chaque renouvellement." },
      { q: "Puis-je obtenir un remboursement ?",
        a: "Les remboursements sont gérés directement par Apple et Google selon leurs politiques. Contactez le support de l'App Store ou de Google Play pour faire une demande." },
      { q: "Y a-t-il une période d'essai gratuite ?",
        a: "Le plan Gratuit est disponible à vie sans engagement et permet de découvrir l'essentiel de YAPS. Des offres d'essai du plan Pro peuvent être proposées ponctuellement, directement dans l'app." },
    ],
  } : {
    title_a: "Simple pricing,",
    title_b: "no surprises",
    sub: "Start free, go Pro when you're ready.",
    free: {
      badge: "To discover",
      price: "€0",
      per: "",
      sub: "Forever. No commitment.",
      features: [
        "Food journal",
        "BMI, BMR and TDEE calculation",
        "1 photo scan per day",
        "3 recipes per week (renewed Monday)",
        "Calorie tracking",
        "Open access to scientific sources",
      ],
      cta: "Download free",
    },
    pro: {
      badge: "To go further",
      popular: "Popular",
      price: "€9.99",
      per: "/mo",
      sub: "Cancel anytime.",
      features: [
        "Everything in Free",
        "Unlimited AI photo scans",
        "Unlimited, personalized recipes",
        "Personal AI coach 24/7",
        "Custom fitness program",
        "Weekly meal planner",
        "Advanced nutrition guidance",
        "PDF export of your tracking",
        "Priority support",
      ],
      cta: "Go Pro",
    },
    notice: "The Pro plan is purchased directly inside the app, through your Apple or Google account. Payment is secure; cancellation happens from the App Store or Google Play account settings.",
    faqTitle: "Pricing FAQ",
    faq: [
      { q: "How do I cancel my subscription?",
        a: "From your Apple or Google account settings. iOS: Settings → your name → Subscriptions → YAPS Pro → Cancel. Android: Google Play → Profile → Payments & subscriptions → Subscriptions → YAPS Pro → Cancel." },
      { q: "Am I billed automatically?",
        a: "Yes, the subscription renews monthly until cancelled. You'll receive an email before each renewal." },
      { q: "Can I get a refund?",
        a: "Refunds are handled directly by Apple and Google per their policies. Contact App Store or Google Play support to request one." },
      { q: "Is there a free trial?",
        a: "The Free plan is available forever with no commitment and covers the essentials. Promotional Pro trials may be offered occasionally, directly inside the app." },
    ],
  };

  const PlanCard = ({ plan, featured }) => (
    <div className={`plan-card ${featured ? "featured" : ""}`}>
      {featured && <span className="plan-popular">★ {plan.popular}</span>}
      <span className="plan-badge">{plan.badge}</span>
      <div className="plan-price">
        {plan.price}
        {plan.per && <span className="per">{plan.per}</span>}
      </div>
      <p className="plan-sub">{plan.sub}</p>
      <ul className="plan-features">
        {plan.features.map((f) => (
          <li key={f}>
            <span className={`check ${featured ? "check-pro" : "check-free"}`}><window.YapsIcons.check /></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {featured ? (
        <window.SmartDownloadButton lang={lang} label={plan.cta} />
      ) : (
        <button className="btn btn-ghost" style={{ height: 48 }} onClick={() => navigate("/download")}>
          {plan.cta}
        </button>
      )}
    </div>
  );

  return (
    <main>
      <section className="section" style={{ paddingTop: 80, textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>YAPS · {lang === "fr" ? "Tarifs" : "Pricing"}</div>
          <h1 className="h1" style={{ fontSize: "clamp(40px, 6vw, 84px)", marginBottom: 20 }}>
            {t.title_a} <span className="grad-text">{t.title_b}</span>
          </h1>
          <p className="lead" style={{ margin: "0 auto" }}>{t.sub}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="pricing-grid">
            <PlanCard plan={t.free} featured={false} />
            <PlanCard plan={t.pro} featured={true} />
          </div>
          <div style={{
            maxWidth: 820, margin: "44px auto 0",
            padding: "18px 22px",
            background: "var(--bg-sunken)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-md)",
            display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 999,
              background: "var(--yaps-gold)", color: "#1a1100",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}><window.YapsIcons.warn /></div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>
              {t.notice}
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
          <h2 className="h2" style={{ marginBottom: 28 }}>{t.faqTitle}</h2>
          <div className="faq-list">
            {t.faq.map((q, i) => <window.FAQItem key={i} q={q.q} a={q.a} />)}
          </div>
        </div>
      </section>
    </main>
  );
}


/* ============ SCIENCES PAGE ============ */
function SciencesPage({ lang }) {
  const t = lang === "fr" ? {
    title_a: "La science",
    title_b: "derrière YAPS",
    sub: "Toutes nos recommandations sont basées sur des publications scientifiques validées et des organismes de référence.",
    disclaimer: "YAPS fournit des estimations à but informatif et ne remplace pas un avis médical. En cas de pathologie, grossesse, allaitement, trouble alimentaire ou régime particulier, consultez un professionnel de santé qualifié.",
  } : {
    title_a: "The science",
    title_b: "behind YAPS",
    sub: "All our recommendations are grounded in validated scientific publications and reference health organizations.",
    disclaimer: "YAPS provides informational estimates and does not replace medical advice. In case of pathology, pregnancy, breastfeeding, eating disorders or special diets, consult a qualified health professional.",
  };

  // Source titles stay in original language; intros are translated
  const sections = [
    {
      id: "bmi",
      title: lang === "fr" ? "Indice de Masse Corporelle (IMC)" : "Body Mass Index (BMI)",
      intro: lang === "fr"
        ? "L'IMC est un indicateur simple pour estimer la corpulence."
        : "BMI is a simple indicator for estimating body weight category.",
      sources: [
        { org: "World Health Organization (WHO)", title: "Obesity and overweight — BMI classification", url: "https://www.who.int/health-topics/obesity" },
      ],
    },
    {
      id: "bmr",
      title: lang === "fr" ? "Métabolisme de base (MB / BMR)" : "Basal Metabolic Rate (BMR)",
      intro: lang === "fr"
        ? "Le métabolisme de base est l'énergie que votre corps dépense au repos."
        : "Basal metabolic rate is the energy your body expends at rest.",
      sources: [
        { org: "Am J Clin Nutr. 1990", title: "Mifflin MD, St Jeor ST, et al. — A new predictive equation for resting energy expenditure in healthy individuals.", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
        { org: "Hum Nutr Clin Nutr. 1985", title: "Schofield WN — Predicting basal metabolic rate, new standards and review of previous work.", url: "https://pubmed.ncbi.nlm.nih.gov/4044297/" },
      ],
    },
    {
      id: "tdee",
      title: lang === "fr" ? "Dépense énergétique totale (AETQ / TDEE)" : "Total Daily Energy Expenditure (TDEE)",
      intro: lang === "fr"
        ? "Votre besoin calorique quotidien selon votre niveau d'activité."
        : "Your daily caloric need based on your activity level.",
      sources: [
        { org: "FAO Food and Nutrition Technical Report Series, 2004", title: "FAO/WHO/UNU Expert Consultation — Human energy requirements.", url: "https://www.fao.org/4/y5686e/y5686e00.htm" },
      ],
    },
    {
      id: "nutrients",
      title: lang === "fr" ? "Apports nutritionnels et macronutriments" : "Nutritional intake and macronutrients",
      intro: lang === "fr"
        ? "Recommandations officielles pour la population française et générale."
        : "Official recommendations for the French and general population.",
      sources: [
        { org: "ANSES", title: lang === "fr" ? "Apports nutritionnels conseillés pour la population française" : "Nutritional reference values for the French population", url: "https://www.anses.fr/fr/content/les-r%C3%A9f%C3%A9rences-nutritionnelles" },
        { org: lang === "fr" ? "Programme National Nutrition Santé (PNNS)" : "French National Nutrition Health Program (PNNS)", title: "Manger Bouger", url: "https://www.mangerbouger.fr/" },
      ],
    },
    {
      id: "activity",
      title: lang === "fr" ? "Activité physique" : "Physical activity",
      intro: lang === "fr"
        ? "Les recommandations mondiales pour bouger sainement."
        : "Global recommendations for healthy movement.",
      sources: [
        { org: "World Health Organization (WHO)", title: lang === "fr" ? "Recommandations mondiales sur l'activité physique" : "Global recommendations on physical activity", url: "https://www.who.int/fr/news-room/fact-sheets/detail/physical-activity" },
      ],
    },
  ];

  return (
    <main>
      <section className="section" style={{ paddingTop: 80 }}>
        <div className="wrap" style={{ maxWidth: 880, marginInline: "auto" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>YAPS · {lang === "fr" ? "Sources scientifiques" : "Scientific sources"}</div>
          <h1 className="h1" style={{ fontSize: "clamp(40px, 5.5vw, 76px)", marginBottom: 20 }}>
            {t.title_a} <span className="grad-text">{t.title_b}</span>
          </h1>
          <p className="lead" style={{ marginBottom: 36 }}>{t.sub}</p>

          <div className="science-disclaimer" role="note">
            <div className="ic"><window.YapsIcons.warn /></div>
            <p>{t.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap" style={{ maxWidth: 880, marginInline: "auto" }}>
          {sections.map((s) => (
            <div key={s.id} className="science-section">
              <h3 className="h3">{s.title}</h3>
              <p className="science-intro">{s.intro}</p>
              <div className="sources-list">
                {s.sources.map((src) => (
                  <a
                    key={src.url}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-card"
                  >
                    <div className="src-ic"><window.YapsIcons.book /></div>
                    <div className="src-meta">
                      <div className="src-title">{src.title}</div>
                      <div className="src-org">{src.org}</div>
                    </div>
                    <div className="src-go"><window.YapsIcons.arrow /></div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


/* ============ DOWNLOAD PAGE ============ */
function DownloadPage({ lang, navigate }) {
  const t = lang === "fr" ? {
    title_a: "Téléchargez",
    title_b: "YAPS",
    sub: "Disponible gratuitement sur iPhone et Android.",
    iosReq: "iOS 15.1 et versions ultérieures",
    andReq: "Android 7.0 et versions ultérieures",
    iosHint: "Scannez avec votre iPhone",
    andHint: "Scannez avec votre Android",
    techTitle: "Détails techniques",
    tech: [
      { k: "Version", v: "1.2.0" },
      { k: "Taille",  v: "≈ 80 Mo" },
      { k: "Langues", v: "FR · EN" },
      { k: "Note",    v: "★★★★★" },
    ],
    screensTitle: "Captures de l'app",
    contactCTA: "Une question avant de télécharger ? Contactez-nous",
    contactBtn: "Aller au contact",
  } : {
    title_a: "Download",
    title_b: "YAPS",
    sub: "Available free on iPhone and Android.",
    iosReq: "iOS 15.1 and later",
    andReq: "Android 7.0 and later",
    iosHint: "Scan with your iPhone",
    andHint: "Scan with your Android",
    techTitle: "Technical details",
    tech: [
      { k: "Version", v: "1.2.0" },
      { k: "Size",    v: "≈ 80 MB" },
      { k: "Languages", v: "FR · EN" },
      { k: "Rating",  v: "★★★★★" },
    ],
    screensTitle: "App screenshots",
    contactCTA: "A question before downloading? Get in touch",
    contactBtn: "Go to contact",
  };

  const qr = (data) => `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=4&data=${encodeURIComponent(data)}`;

  return (
    <main>
      <section className="section" style={{ paddingTop: 80, textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>YAPS · {lang === "fr" ? "Téléchargements" : "Download"}</div>
          <h1 className="h1" style={{ fontSize: "clamp(40px, 6vw, 84px)", marginBottom: 20 }}>
            {t.title_a} <span className="grad-text">{t.title_b}</span>
          </h1>
          <p className="lead" style={{ margin: "0 auto" }}>{t.sub}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="store-columns">
            <div className="store-column">
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0e0e12", color: "#fff", display: "grid", placeItems: "center" }}>
                <window.YapsIcons.apple />
              </div>
              <h3>App Store</h3>
              <div className="req">{t.iosReq}</div>
              <div className="store-qr">
                <img src={qr(window.STORE_URLS.ios)} alt="QR App Store" width="176" height="176" />
              </div>
              <div style={{ color: "var(--ink-3)", fontSize: 13, fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>{t.iosHint}</div>
              <window.AppStoreBadge lang={lang} />
            </div>
            <div className="store-column">
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center" }}>
                <window.YapsIcons.play />
              </div>
              <h3>Google Play</h3>
              <div className="req">{t.andReq}</div>
              <div className="store-qr">
                <img src={qr(window.STORE_URLS.android)} alt="QR Google Play" width="176" height="176" />
              </div>
              <div style={{ color: "var(--ink-3)", fontSize: 13, fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>{t.andHint}</div>
              <window.PlayStoreBadge lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <window.RevealBlock>
            <h2 className="h2" style={{ textAlign: "center", marginBottom: 28 }}>{t.techTitle}</h2>
            <div className="tech-strip">
              {t.tech.map((d) => (
                <div key={d.k}>
                  <div className="k">{d.k}</div>
                  <div className="v">{d.v}</div>
                </div>
              ))}
            </div>
          </window.RevealBlock>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="wrap">
          <window.RevealBlock>
            <h2 className="h2" style={{ textAlign: "center", marginBottom: 48 }}>{t.screensTitle}</h2>
          </window.RevealBlock>
          <window.PreviewCarousel
            lang={lang}
            items={lang === "fr" ? [
              { title: "Scan & analyse",      body: "Photographiez votre repas, ajoutez-le en un tap." },
              { title: "Coach IA",             body: "Une conversation, votre coach répond avec contexte." },
              { title: "Progression claire",   body: "Vos chiffres sur la durée, visuels et nets." },
            ] : [
              { title: "Scan & analyze",       body: "Snap your meal, log it in one tap." },
              { title: "AI coach",             body: "A conversation — your coach replies with context." },
              { title: "Clear progress",       body: "Your numbers over time, visual and crisp." },
            ]}
          />
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <div className="wrap">
          <h3 className="h3" style={{ marginBottom: 18, color: "var(--ink-2)" }}>{t.contactCTA}</h3>
          <button className="btn btn-ghost" onClick={() => navigate("/contact")}>
            {t.contactBtn} <window.YapsIcons.arrow />
          </button>
        </div>
      </section>
    </main>
  );
}


/* ============ CONTACT PAGE ============ */
function ContactPage({ lang, navigate }) {
  const t = lang === "fr" ? {
    title_a: "Contact",
    title_b: "& Support",
    sub: "Une question ? Une suggestion ? Nous sommes là pour vous.",
    mail: {
      label: "Écrivez-nous",
      hint: "Nous répondons sous 48h en moyenne.",
    },
    faqTitle: "Foire aux questions",
    faqSub: "10 réponses aux questions qu'on nous pose le plus souvent.",
    linksTitle: "Liens utiles",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    bottomCTA: "Votre question n'est pas listée ? Écrivez-nous directement :",
    faq: [
      { q: "Qu'est-ce que YAPS ?",
        a: "YAPS est une application mobile de nutrition intelligente qui vous aide à suivre vos repas, calculer vos besoins nutritionnels (IMC, métabolisme de base, calories), analyser vos plats par photo grâce à l'IA, et atteindre vos objectifs." },
      { q: "YAPS est-il gratuit ?",
        a: "Oui, YAPS propose un plan Gratuit incluant : journal alimentaire basique, calcul IMC/MB/AETQ, 1 scan photo par jour, 3 recettes par semaine, suivi des calories. Le plan Pro à 9,99€/mois débloque les scans illimités, recettes personnalisées, coach IA 24/7, programme fitness et planificateur de repas." },
      { q: "Comment fonctionne l'analyse de mes repas par photo ?",
        a: "Vous photographiez votre plat depuis l'application. Notre intelligence artificielle identifie le plat et estime ses valeurs nutritionnelles par portion. Vous l'ajoutez à votre journal en un clic." },
      { q: "Mes données personnelles sont-elles protégées ?",
        a: "Oui. YAPS est conforme au RGPD. Nous ne vendons ni ne partageons vos données. Les photos de repas sont analysées puis immédiatement supprimées. Vous pouvez consulter notre Politique de confidentialité et supprimer votre compte à tout moment depuis l'app." },
      { q: "Sur quels appareils YAPS est-il disponible ?",
        a: "YAPS est disponible sur iPhone (iOS 15.1+) via l'App Store et sur Android (7.0+) via Google Play." },
      { q: "Comment annuler mon abonnement Pro ?",
        a: "À tout moment depuis votre compte. iOS : Réglages → votre nom → Abonnements → YAPS Pro → Annuler. Android : Google Play → Profil → Paiements et abonnements → Abonnements → YAPS Pro → Annuler." },
      { q: "YAPS remplace-t-il un nutritionniste ?",
        a: "Non. YAPS fournit des estimations à but informatif basées sur des équations scientifiques reconnues (Mifflin-St Jeor, Schofield, recommandations OMS et ANSES). En cas de pathologie, grossesse, allaitement ou trouble alimentaire, consultez un professionnel." },
      { q: "Comment YAPS calcule-t-il mes besoins caloriques ?",
        a: "YAPS utilise la formule Mifflin-St Jeor pour calculer votre métabolisme de base, puis applique un coefficient d'activité physique (recommandations FAO/OMS) pour estimer votre dépense énergétique totale. Détails dans l'onglet Sources Scientifiques." },
      { q: "J'ai oublié mon mot de passe, comment le réinitialiser ?",
        a: "Sur l'écran de connexion de l'app, appuyez sur « Mot de passe oublié ? », entrez votre email et suivez le lien reçu pour définir un nouveau mot de passe." },
      { q: "Comment vous contacter ?",
        a: "Pour toute question, suggestion ou problème technique : info@yaps-nutrition.fr — nous répondons sous 48h." },
    ],
  } : {
    title_a: "Contact",
    title_b: "& Support",
    sub: "A question? A suggestion? We're here to help.",
    mail: { label: "Write to us", hint: "We reply within 48h on average." },
    faqTitle: "Frequently asked questions",
    faqSub: "10 answers to the questions we get most often.",
    linksTitle: "Useful links",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    bottomCTA: "Question not listed? Write to us directly:",
    faq: [
      { q: "What is YAPS?",
        a: "YAPS is an intelligent mobile nutrition app that helps you track meals, compute nutritional needs (BMI, basal metabolic rate, calories), analyze meals from photos via AI, and reach your goals." },
      { q: "Is YAPS free?",
        a: "Yes. The Free plan includes: basic food journal, BMI/BMR/TDEE calculation, 1 photo scan per day, 3 recipes per week, calorie tracking. The Pro plan at €9.99/mo unlocks unlimited scans, personalized recipes, AI coach 24/7, fitness program and meal planner." },
      { q: "How does meal photo analysis work?",
        a: "Take a photo of your dish in the app. Our AI identifies the dish and estimates its nutritional values per portion. Add to your journal in one tap." },
      { q: "Is my personal data protected?",
        a: "Yes. YAPS is GDPR-compliant. We do not sell or share your data. Meal photos are analyzed then immediately deleted. You can read our Privacy Policy and delete your account at any time from the app." },
      { q: "Which devices is YAPS available on?",
        a: "YAPS is available on iPhone (iOS 15.1+) via the App Store and on Android (7.0+) via Google Play." },
      { q: "How do I cancel my Pro subscription?",
        a: "Anytime from your account. iOS: Settings → your name → Subscriptions → YAPS Pro → Cancel. Android: Google Play → Profile → Payments & subscriptions → Subscriptions → YAPS Pro → Cancel." },
      { q: "Does YAPS replace a nutritionist?",
        a: "No. YAPS provides informational estimates based on recognized scientific equations (Mifflin-St Jeor, Schofield, WHO and ANSES recommendations). For pathologies, pregnancy, breastfeeding or eating disorders, consult a professional." },
      { q: "How does YAPS compute my caloric needs?",
        a: "YAPS uses the Mifflin-St Jeor formula to compute your basal metabolic rate, then applies a physical activity coefficient (FAO/WHO recommendations) to estimate your total daily energy expenditure. Details in the Scientific Sources tab." },
      { q: "I forgot my password — how do I reset it?",
        a: "On the app's sign-in screen, tap 'Forgot password?', enter your email and follow the link to set a new password." },
      { q: "How do I contact you?",
        a: "For any question, suggestion or technical issue: info@yaps-nutrition.fr — we reply within 48h." },
    ],
  };

  return (
    <main>
      <section className="section" style={{ paddingTop: 80, textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 820, marginInline: "auto" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>YAPS · {lang === "fr" ? "Contact" : "Contact"}</div>
          <h1 className="h1" style={{ fontSize: "clamp(40px, 6vw, 84px)", marginBottom: 20 }}>
            {t.title_a} <span className="grad-text">{t.title_b}</span>
          </h1>
          <p className="lead" style={{ margin: "0 auto" }}>{t.sub}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="mail-card">
            <div className="mail-ic"><window.YapsIcons.mail /></div>
            <div className="mail-body">
              <div style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--ink-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                {t.mail.label}
              </div>
              <a href="mailto:info@yaps-nutrition.fr">info@yaps-nutrition.fr</a>
              <div className="mail-hint">{t.mail.hint}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="wrap" style={{ maxWidth: 880, marginInline: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 className="h2" style={{ marginBottom: 12 }}>{t.faqTitle}</h2>
            <p className="lead" style={{ margin: "0 auto" }}>{t.faqSub}</p>
          </div>
          <div className="faq-list">
            {t.faq.map((q, i) => <window.FAQItem key={i} q={q.q} a={q.a} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 720, marginInline: "auto" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>{t.linksTitle}</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a className="btn btn-ghost" href="/privacy" onClick={(e) => { e.preventDefault(); navigate("/privacy"); }}>
              {t.privacy} <window.YapsIcons.arrow />
            </a>
            <a className="btn btn-ghost" href="/terms" onClick={(e) => { e.preventDefault(); navigate("/terms"); }}>
              {t.terms} <window.YapsIcons.arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center" }}>
        <div className="wrap">
          <p className="lead" style={{ margin: "0 auto 18px" }}>{t.bottomCTA}</p>
          <a className="btn btn-primary" href="mailto:info@yaps-nutrition.fr">
            info@yaps-nutrition.fr
          </a>
        </div>
      </section>
    </main>
  );
}

window.FeaturesPage = FeaturesPage;
window.PricingPage = PricingPage;
window.SciencesPage = SciencesPage;
window.DownloadPage = DownloadPage;
window.ContactPage = ContactPage;
