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

/* ============ Real Supabase Auth context ============
   Uses the singleton client created in index.html (window.YAPS_SUPABASE).
   Identifiers are the same as the YAPS mobile app, secured by RLS. */
const AuthCtx = React.createContext(null);
function AuthProvider({ children }) {
  const sb = window.YAPS_SUPABASE;
  const [user, setUser] = React.useState(null);
  const [ready, setReady] = React.useState(false);

  // Helper: build a UI-friendly user object from a Supabase user
  const buildUserObject = (sbUser) => {
    if (!sbUser) return null;
    const email = sbUser.email || "";
    const meta = sbUser.user_metadata || {};
    return {
      id: sbUser.id,
      email,
      firstName: meta.first_name || meta.firstName
        || email.split("@")[0].split(/[.\-_]/)[0].replace(/^./, (c) => c.toUpperCase()),
    };
  };

  // Restore session on mount + listen to auth changes
  React.useEffect(() => {
    if (!sb) {
      setReady(true);
      return;
    }
    sb.auth.getSession().then(({ data: { session } }) => {
      setUser(buildUserObject(session?.user));
      setReady(true);
    }).catch(() => setReady(true));

    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      setUser(buildUserObject(session?.user));
    });
    return () => { try { subscription.unsubscribe(); } catch {} };
  }, [sb]);

  const signIn = async (email, password) => {
    if (!sb) throw new Error("auth-not-ready");
    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail || !password) throw new Error("invalid");
    const { data, error } = await sb.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    if (error) {
      // Map Supabase errors to internal codes for the UI
      if (/credentials|invalid/i.test(error.message)) throw new Error("invalid");
      if (/email/i.test(error.message)) throw new Error("invalid");
      throw new Error(error.message || "invalid");
    }
    const u = buildUserObject(data.user);
    setUser(u);
    return u;
  };

  const signOut = async () => {
    if (!sb) return;
    try { await sb.auth.signOut(); } catch {}
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, signIn, signOut, ready, supabase: sb }}>
      {children}
    </AuthCtx.Provider>
  );
}
const useAuth = () => React.useContext(AuthCtx);

/* ============ AuthModal ============ */
function AuthModal({ open, onClose, lang, navigate }) {
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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
    title: "Connexion à votre espace",
    sub: "Utilisez les mêmes identifiants que votre application mobile YAPS.",
    email: "Email",
    password: "Mot de passe",
    submit: "Se connecter",
    submitting: "Connexion…",
    forgot: "Mot de passe oublié ?",
    noAccount: "Pas encore de compte ? Téléchargez l'app",
    err_generic: "Email ou mot de passe incorrect.",
    err_short: "Veuillez saisir votre email et votre mot de passe.",
  } : {
    title: "Sign in to your account",
    sub: "Use the same credentials as your YAPS mobile app.",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    submitting: "Signing in…",
    forgot: "Forgot password?",
    noAccount: "No account yet? Download the app",
    err_generic: "Invalid email or password.",
    err_short: "Please enter your email and password.",
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error("missing");
      }
      await signIn(email, password);
      onClose();
    } catch (e) {
      setErr(e.message === "missing" ? t.err_short : t.err_generic);
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
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={showPassword ? "Votre mot de passe" : "••••••••"}
                style={{ paddingRight: 44, width: "100%" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword
                  ? (lang === "fr" ? "Masquer le mot de passe" : "Hide password")
                  : (lang === "fr" ? "Afficher le mot de passe" : "Show password")}
                title={showPassword
                  ? (lang === "fr" ? "Masquer le mot de passe" : "Hide password")
                  : (lang === "fr" ? "Afficher le mot de passe" : "Show password")}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                  display: "grid",
                  placeItems: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-3)",
                  padding: 0,
                  borderRadius: 6,
                }}
              >
                {showPassword ? (
                  /* Eye-off icon (mot de passe visible → cliquer pour masquer) */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  /* Eye icon (mot de passe masqué → cliquer pour afficher) */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>
          {err && <div className="auth-error">{err}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: 48, marginTop: 8 }}>
            {loading ? t.submitting : t.submit}
          </button>
          <div className="auth-links">
            <a href="#" onClick={async (e) => {
              e.preventDefault();
              const target = (email || "").trim().toLowerCase();
              if (!target) {
                alert(lang === "fr" ? "Saisissez d'abord votre email dans le champ ci-dessus." : "Please enter your email first.");
                return;
              }
              try {
                const sb = window.YAPS_SUPABASE;
                await sb.auth.resetPasswordForEmail(target, {
                  redirectTo: "yaps://reset-password",
                });
                alert(lang === "fr"
                  ? "Si un compte est associé à cette adresse, vous recevrez un email pour réinitialiser votre mot de passe."
                  : "If an account exists for this email, you will receive a password reset email.");
              } catch (err) {
                alert(lang === "fr" ? "Erreur lors de l'envoi. Réessayez." : "Could not send reset email. Try again.");
              }
            }}>{t.forgot}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onClose(); navigate("/download"); }}>{t.noAccount}</a>
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
  const { user, signOut, supabase: sb } = useAuth();
  const [profile, setProfile] = React.useState(null);
  const [weightHistory, setWeightHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");

  const t = lang === "fr" ? {
    hello: "Bonjour",
    today: "Voici votre tableau de bord nutritionnel",
    signout: "Se déconnecter",
    cal: "Objectif calorique",
    prot: "Protéines (objectif)",
    carbs: "Glucides (objectif)",
    fat: "Lipides (objectif)",
    weight: "Poids",
    weightSub: "30 derniers jours",
    weightCurrent: "Poids actuel",
    weightTarget: "Objectif",
    bmi: "IMC",
    bmr: "Métabolisme de base",
    tdee: "Dépense énergétique totale",
    recent: "Vos repas récents",
    recentEmpty: "Le journal alimentaire détaillé est synchronisé dans l'application mobile YAPS. Ouvrez l'app pour consulter, ajouter ou modifier vos repas.",
    openApp: "Ouvrir l'application YAPS",
    moreInApp: "Plus de fonctionnalités dans l'app mobile",
    connectedChip: "Connecté à votre compte YAPS",
    loading: "Chargement de vos données…",
    error: "Impossible de charger vos données pour le moment.",
    noWeight: "Pas encore d'historique de poids. Pesez-vous depuis l'app YAPS pour voir votre courbe.",
  } : {
    hello: "Hi",
    today: "Here is your nutrition dashboard",
    signout: "Sign out",
    cal: "Calorie target",
    prot: "Protein (target)",
    carbs: "Carbs (target)",
    fat: "Fat (target)",
    weight: "Weight",
    weightSub: "Last 30 days",
    weightCurrent: "Current weight",
    weightTarget: "Goal",
    bmi: "BMI",
    bmr: "Basal metabolic rate",
    tdee: "Total daily energy expenditure",
    recent: "Your recent meals",
    recentEmpty: "Your detailed food journal lives in the YAPS mobile app. Open the app to view, add or edit your meals.",
    openApp: "Open the YAPS app",
    moreInApp: "More features in the mobile app",
    connectedChip: "Connected to your YAPS account",
    loading: "Loading your data…",
    error: "Could not load your data right now.",
    noWeight: "No weight history yet. Log a weight in the YAPS app to see your trend.",
  };

  /* ============ Fetch real data from Supabase ============ */
  React.useEffect(() => {
    let cancelled = false;
    if (!sb || !user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError("");

    // 30-day window for bmi_logs
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const sinceIso = since.toISOString();

    Promise.all([
      // Profile (single row by id)
      sb.from("profiles")
        .select("first_name, last_name, weight, height, goal, bmi, bmr, tdee, caloric_goal")
        .eq("id", user.id)
        .maybeSingle(),
      // Weight history (last 30 days)
      sb.from("bmi_logs")
        .select("weight_kg, created_at")
        .eq("user_id", user.id)
        .gte("created_at", sinceIso)
        .order("created_at", { ascending: true }),
    ]).then(([profRes, weightRes]) => {
      if (cancelled) return;
      if (profRes.error) {
        console.warn("[Dashboard] profile fetch error:", profRes.error.message);
      }
      if (weightRes.error) {
        console.warn("[Dashboard] weight fetch error:", weightRes.error.message);
      }
      setProfile(profRes.data || null);
      setWeightHistory(Array.isArray(weightRes.data) ? weightRes.data : []);
      setLoading(false);
    }).catch((e) => {
      if (cancelled) return;
      console.error("[Dashboard] unexpected error:", e);
      setLoadError(t.error);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [sb, user?.id]);

  // Derive macros (target only — actual intake is in the mobile app)
  // Use Macros split standards : 25% protein, 50% carbs, 25% fat
  const cal = profile?.caloric_goal ? Math.round(profile.caloric_goal) : null;
  const macros = [
    { k: t.cal, n: cal, unit: "kcal" },
    { k: t.prot, n: cal ? Math.round((cal * 0.25) / 4) : null, unit: "g" },
    { k: t.carbs, n: cal ? Math.round((cal * 0.50) / 4) : null, unit: "g" },
    { k: t.fat, n: cal ? Math.round((cal * 0.25) / 9) : null, unit: "g" },
  ];

  // Weight series from real data (last 30 days)
  const weightSeries = weightHistory
    .map((r) => Number(r.weight_kg))
    .filter((n) => Number.isFinite(n));

  // Variation (first → last in the window)
  let variation = null;
  if (weightSeries.length >= 2) {
    const diff = weightSeries[weightSeries.length - 1] - weightSeries[0];
    variation = diff;
  }

  const fmt = (n) => n == null ? "—" : new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: 1 }).format(n);
  const currentWeight = profile?.weight
    || (weightSeries.length ? weightSeries[weightSeries.length - 1] : null);

  return (
    <main>
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
            <span className="chip"><span className="dot" /> {t.connectedChip}</span>
            <button className="btn btn-ghost" onClick={signOut}>{t.signout}</button>
          </div>
          <h1 className="h2" style={{ marginTop: 24, marginBottom: 8 }}>
            {t.hello}, <span className="grad-text">{profile?.first_name || user?.firstName || "YAPS"}</span> 👋
          </h1>
          <p className="lead" style={{ marginBottom: 36 }}>{t.today}</p>

          {loading && (
            <div style={{ padding: 24, textAlign: "center", color: "var(--ink-2)" }}>{t.loading}</div>
          )}

          {!loading && loadError && (
            <div style={{ padding: 24, textAlign: "center", color: "#c0392b" }}>{loadError}</div>
          )}

          {!loading && !loadError && (
            <>
              {/* Macros target (calculated from caloric_goal) */}
              <div className="dash-grid" style={{ marginBottom: 24 }}>
                {macros.map((m) => (
                  <div key={m.k} className="dash-card">
                    <div className="k">{m.k}</div>
                    <div className="v">
                      {m.n == null ? "—" : m.n}
                      <span className="of"> {m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Body summary card : weight + bmi + bmr + tdee */}
              <div className="dash-grid" style={{ marginBottom: 24 }}>
                <div className="dash-card">
                  <div className="k">{t.weightCurrent}</div>
                  <div className="v">{fmt(currentWeight)}<span className="of"> kg</span></div>
                </div>
                <div className="dash-card">
                  <div className="k">{t.bmi}</div>
                  <div className="v">{fmt(profile?.bmi)}</div>
                </div>
                <div className="dash-card">
                  <div className="k">{t.bmr}</div>
                  <div className="v">{fmt(profile?.bmr)}<span className="of"> kcal</span></div>
                </div>
                <div className="dash-card">
                  <div className="k">{t.tdee}</div>
                  <div className="v">{fmt(profile?.tdee)}<span className="of"> kcal</span></div>
                </div>
              </div>

              {/* Weight history sparkline */}
              <div className="dash-card" style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div className="k" style={{ marginBottom: 6 }}>{t.weight} · {t.weightSub}</div>
                    {weightSeries.length > 0 ? (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>
                          {fmt(weightSeries[weightSeries.length - 1])}
                        </span>
                        <span style={{ color: "var(--ink-3)", fontSize: 14 }}>kg</span>
                        {variation != null && (
                          <span style={{
                            color: variation <= 0 ? "#1aa85b" : "#c0392b",
                            fontSize: 14,
                            fontFamily: "var(--font-mono)"
                          }}>
                            {variation > 0 ? "+" : ""}{fmt(variation)} kg / 30j
                          </span>
                        )}
                      </div>
                    ) : (
                      <div style={{ color: "var(--ink-2)", fontSize: 14 }}>{t.noWeight}</div>
                    )}
                  </div>
                </div>
                {weightSeries.length > 1 && <Sparkline points={weightSeries} />}
              </div>

              {/* Recent meals -> placeholder (no meals table yet) */}
              <h3 className="h3" style={{ marginBottom: 14 }}>{t.recent}</h3>
              <div className="dash-card" style={{ marginBottom: 18, textAlign: "center", padding: 28 }}>
                <p style={{ color: "var(--ink-2)", margin: "0 0 18px", lineHeight: 1.55 }}>{t.recentEmpty}</p>
                <a className="btn btn-ghost" href="https://yaps-nutrition.fr/download" onClick={(e) => e.preventDefault()}>
                  {t.openApp} <Icons.arrow />
                </a>
              </div>
            </>
          )}
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
