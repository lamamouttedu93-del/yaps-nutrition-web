/* YAPS · Phase 2 pages — Features, Pricing, Sciences, Download, Contact
   Shared components: FAQItem, AuthModal, Dashboard, PricingCard, SourceCard
   Each page receives { lang, navigate } from the router. */

/* ============ Shared: Icon library (small inline set) ============ */
const Icons = {
  scan: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="8" width="10" height="8" rx="1.5"/><circle cx="12" cy="12" r="2"/></svg>,
  journal: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 6h8M8 10h8M8 14h5"/></svg>,
  recipe: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="7"/><path d="M9 13c0-1.5 1.2-3 3-3M12 6V3M9 3h6"/></svg>,
  coach: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 1 0-15.5 2.7L4 20l5.3-1.5A8 8 0 0 0 21 12Z"/><path d="M9 11h.01M12 11h.01M15 11h.01"/></svg>,
  planner: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><path d="M8 14h2M14 14h2"/></svg>,
  progress: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 4 7-7"/><path d="M14 9h5v5"/></svg>,
  book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3v15a2 2 0 0 0-2-2H3z"/><path d="M21 5a2 2 0 0 0-2-2h-4a3 3 0 0 0-3 3v15a2 2 0 0 1 2-2h7z"/></svg>,
  arrow: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>,
  apple: () => <svg width="22" height="26" viewBox="0 0 22 26" fill="none"><path d="M17.5 13.7c0-3.1 2.5-4.6 2.6-4.7-1.4-2-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3.1 1.5-.1 2.1-1 3.9-1s2.3 1 3.9 1c1.6 0 2.7-1.5 3.7-3 1.2-1.7 1.6-3.4 1.6-3.5-.1 0-3.1-1.2-3.1-4.8zM14.6 4.7c.8-1 1.4-2.4 1.2-3.8-1.2 0-2.6.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.3.1 2.7-.7 3.6-1.7z" fill="currentColor"/></svg>,
  play: () => <svg width="22" height="24" viewBox="0 0 22 24" fill="none"><defs><linearGradient id="pl-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFD86E"/><stop offset="100%" stopColor="#FFB300"/></linearGradient><linearGradient id="pl-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF7A6B"/><stop offset="100%" stopColor="#E03F3F"/></linearGradient><linearGradient id="pl-c" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#3FD0FF"/><stop offset="100%" stopColor="#1090E0"/></linearGradient><linearGradient id="pl-d" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#52E394"/><stop offset="100%" stopColor="#1AA85B"/></linearGradient></defs><g transform="translate(2 1)"><path d="M0 0 L0 22 L10.2 11 Z" fill="url(#pl-c)"/><path d="M0 0 L13.5 7.5 L10.2 11 Z" fill="url(#pl-d)"/><path d="M0 22 L13.5 14.5 L10.2 11 Z" fill="url(#pl-b)"/><path d="M13.5 7.5 L17.5 9.8 C18.5 10.4 18.5 11.6 17.5 12.2 L13.5 14.5 L10.2 11 Z" fill="url(#pl-a)"/></g></svg>,
  mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  check: () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.5l2.5 2.5 4.5-5"/></svg>,
  plus: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 2v10M2 7h10"/></svg>,
  warn: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 1L13 12H1z"/><path d="M7 6v3M7 11h0"/></svg>,
};

/* ============ FAQ accordion item ============ */
function FAQItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{q}</span>
        <span className="faq-icon"><Icons.plus /></span>
      </button>
      <div className="faq-body">
        <div><p>{a}</p></div>
      </div>
    </div>
  );
}

/* ============ Mock Auth context (Supabase placeholder) ============ */
const AuthCtx = React.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    try {
      const raw = localStorage.getItem("yaps-mock-user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const signIn = async (email, password) => {
    // Simulate Supabase auth.signInWithPassword latency
    await new Promise((r) => setTimeout(r, 700));
    if (!email || !password) throw new Error("invalid");
    if (password.length < 4) throw new Error("short");
    const u = {
      email,
      firstName: email.split("@")[0].split(/[.\-_]/)[0].replace(/^./, (c) => c.toUpperCase()),
      id: "mock-" + email,
    };
    setUser(u);
    try { localStorage.setItem("yaps-mock-user", JSON.stringify(u)); } catch {}
    return u;
  };
  const signOut = () => {
    setUser(null);
    try { localStorage.removeItem("yaps-mock-user"); } catch {}
  };
  return <AuthCtx.Provider value={{ user, signIn, signOut }}>{children}</AuthCtx.Provider>;
}
const useAuth = () => React.useContext(AuthCtx);

/* ============ AuthModal ============ */
function AuthModal({ open, onClose, lang, navigate }) {
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const t = lang === "fr" ? {
    title: "Connectez-vous",
    sub: "Utilisez les identifiants de votre compte YAPS.",
    email: "Email",
    password: "Mot de passe",
    submit: "Se connecter",
    submitting: "Connexion…",
    forgot: "Mot de passe oublié ?",
    noAccount: "Pas encore de compte ? Téléchargez l'app",
    err_generic: "Identifiants invalides.",
    err_short: "Le mot de passe doit faire au moins 4 caractères.",
    hint: "Mode démo : n'importe quel email + mot de passe (≥ 4 car.) ouvre un tableau de bord d'exemple.",
  } : {
    title: "Sign in",
    sub: "Use your YAPS account credentials.",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    submitting: "Signing in…",
    forgot: "Forgot password?",
    noAccount: "No account yet? Download the app",
    err_generic: "Invalid credentials.",
    err_short: "Password must be at least 4 characters.",
    hint: "Demo mode: any email + password (≥ 4 chars) opens a sample dashboard.",
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signIn(email, password);
      onClose();
    } catch (e) {
      setErr(e.message === "short" ? t.err_short : t.err_generic);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(20, 14, 40, 0.42)",
        backdropFilter: "blur(8px)",
        display: "grid", placeItems: "center",
        padding: 24,
        animation: "modal-fade 200ms var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid var(--line)",
          boxShadow: "0 40px 80px -30px rgba(60, 30, 100, 0.4)",
          padding: 32,
          maxWidth: 420,
          width: "100%",
          position: "relative",
          animation: "modal-pop 280ms var(--ease-out)",
        }}
      >
        <button onClick={onClose} aria-label="Fermer" style={{
          position: "absolute", top: 14, right: 14,
          width: 36, height: 36, borderRadius: 999,
          background: "var(--bg-sunken)", border: "1px solid var(--line)",
          display: "grid", placeItems: "center", cursor: "pointer",
          color: "var(--ink-2)",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12" /></svg>
        </button>
        <div style={{ display: "inline-flex", marginBottom: 12 }}><YapsLogo size={40} /></div>
        <h3 style={{ margin: 0, fontSize: 24, letterSpacing: "-0.02em", fontWeight: 600 }}>{t.title}</h3>
        <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "8px 0 0" }}>{t.sub}</p>
        <form className="auth-form" onSubmit={submit}>
          <label>
            {t.email}
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@email.com"
            />
          </label>
          <label>
            {t.password}
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>
          {err && <div className="auth-error">{err}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: 48, marginTop: 8 }}>
            {loading ? t.submitting : t.submit}
          </button>
          <div className="auth-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert(lang === "fr" ? "Ouvrez l'app YAPS pour réinitialiser votre mot de passe." : "Open the YAPS app to reset your password."); }}>{t.forgot}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onClose(); navigate("/download"); }}>{t.noAccount}</a>
          </div>
          <div style={{ marginTop: 10, padding: "10px 12px", background: "var(--bg-sunken)", borderRadius: 10, fontSize: 12, color: "var(--ink-3)", lineHeight: 1.4, fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>
            {t.hint}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============ Dashboard (mocked) ============ */
function Sparkline({ points }) {
  const w = 600, h = 90, pad = 6;
  const max = Math.max(...points), min = Math.min(...points);
  const path = points.map((v, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const area = `${path} L${w - pad} ${h - pad} L${pad} ${h - pad} Z`;
  return (
    <svg className="sparkline" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="dash-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8347D" />
          <stop offset="100%" stopColor="#7B4FD8" />
        </linearGradient>
        <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(139, 61, 158, 0.18)" />
          <stop offset="100%" stopColor="rgba(139, 61, 158, 0)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#dash-area)" />
      <path d={path} fill="none" stroke="url(#dash-line)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dashboard({ lang }) {
  const { user, signOut } = useAuth();
  const t = lang === "fr" ? {
    hello: "Bonjour",
    today: "Voici vos statistiques d'aujourd'hui",
    signout: "Se déconnecter",
    cal: "Calories",
    prot: "Protéines",
    carbs: "Glucides",
    fat: "Lipides",
    weight: "Poids",
    weightSub: "30 derniers jours",
    recent: "Repas récents",
    viewAll: "Voir tout l'historique",
    inApp: "Ouvrir l'app",
    moreInApp: "Plus de fonctionnalités dans l'app mobile",
    demoChip: "Mode démo · données simulées",
  } : {
    hello: "Hi",
    today: "Here are your stats for today",
    signout: "Sign out",
    cal: "Calories",
    prot: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    weight: "Weight",
    weightSub: "Last 30 days",
    recent: "Recent meals",
    viewAll: "View full history",
    inApp: "Open the app",
    moreInApp: "More features in the mobile app",
    demoChip: "Demo mode · simulated data",
  };

  // Realistic, slightly-randomized mock numbers
  const macros = [
    { k: t.cal, n: 1450, of: 2200, unit: "kcal" },
    { k: t.prot, n: 85, of: 130, unit: "g" },
    { k: t.carbs, n: 180, of: 275, unit: "g" },
    { k: t.fat, n: 55, of: 75, unit: "g" },
  ];
  const weightSeries = [72.8, 72.6, 72.5, 72.5, 72.3, 72.1, 72.0, 71.9, 71.9, 71.8, 71.7, 71.7, 71.6, 71.6, 71.5, 71.5, 71.5, 71.4, 71.4, 71.3, 71.3, 71.4, 71.4, 71.3, 71.3, 71.4, 71.4, 71.3, 71.4, 71.4];
  const recentMeals = lang === "fr" ? [
    { name: "Bol poké saumon",      kcal: 587, time: "12:42", ic: "BP" },
    { name: "Café au lait",          kcal: 95,  time: "10:18", ic: "CL" },
    { name: "Salade chèvre chaud",   kcal: 412, time: "13:05 hier", ic: "SC" },
    { name: "Yaourt grec + miel",    kcal: 168, time: "16:20 hier", ic: "YG" },
    { name: "Pâtes pesto",           kcal: 543, time: "19:45 hier", ic: "PP" },
  ] : [
    { name: "Salmon poke bowl",     kcal: 587, time: "12:42",    ic: "SP" },
    { name: "Latte",                kcal: 95,  time: "10:18",    ic: "LT" },
    { name: "Warm goat cheese salad", kcal: 412, time: "yesterday 13:05", ic: "GC" },
    { name: "Greek yogurt + honey", kcal: 168, time: "yesterday 16:20", ic: "GY" },
    { name: "Pesto pasta",          kcal: 543, time: "yesterday 19:45", ic: "PP" },
  ];

  return (
    <main>
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
            <span className="chip"><span className="dot" /> {t.demoChip}</span>
            <button className="btn btn-ghost" onClick={signOut}>{t.signout}</button>
          </div>
          <h1 className="h2" style={{ marginTop: 24, marginBottom: 8 }}>
            {t.hello}, <span className="grad-text">{user?.firstName || "YAPS"}</span> 👋
          </h1>
          <p className="lead" style={{ marginBottom: 36 }}>{t.today}</p>

          {/* Macros today */}
          <div className="dash-grid" style={{ marginBottom: 24 }}>
            {macros.map((m) => {
              const pct = Math.min(100, (m.n / m.of) * 100);
              return (
                <div key={m.k} className="dash-card">
                  <div className="k">{m.k}</div>
                  <div className="v">{m.n}<span className="of">/ {m.of} {m.unit}</span></div>
                  <div className="dash-bar"><i style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>

          {/* Weight card */}
          <div className="dash-card" style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div className="k" style={{ marginBottom: 6 }}>{t.weight} · {t.weightSub}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>71,4</span>
                  <span style={{ color: "var(--ink-3)", fontSize: 14 }}>kg</span>
                  <span style={{ color: "#1aa85b", fontSize: 14, fontFamily: "var(--font-mono)" }}>−1,4 kg / 30j</span>
                </div>
              </div>
            </div>
            <Sparkline points={weightSeries} />
          </div>

          {/* Recent meals */}
          <h3 className="h3" style={{ marginBottom: 14 }}>{t.recent}</h3>
          <div className="meals-list" style={{ marginBottom: 18 }}>
            {recentMeals.map((m, i) => (
              <div key={i} className="meal">
                <div className="ic">{m.ic}</div>
                <div className="name">{m.name}</div>
                <div className="time">{m.time}</div>
                <div className="kcal">{m.kcal} kcal</div>
              </div>
            ))}
          </div>
          <a href="#" className="btn btn-ghost" onClick={(e) => e.preventDefault()}>
            {t.viewAll} <Icons.arrow />
          </a>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)", textAlign: "center" }}>
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: 28 }}>
            <span className="grad-text">{t.moreInApp}</span>
          </h2>
          <StoreBadges lang={lang} />
        </div>
      </section>
    </main>
  );
}

window.FAQItem = FAQItem;
window.AuthModal = AuthModal;
window.AuthProvider = AuthProvider;
window.useAuth = useAuth;
window.Dashboard = Dashboard;
window.YapsIcons = Icons;
