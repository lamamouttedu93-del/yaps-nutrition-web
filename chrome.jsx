/* YAPS · Navigation, Footer, StoreBadges */

const STORE_URLS = {
  ios: "https://apps.apple.com/app/id6753997960",
  android: "https://play.google.com/store/apps/details?id=fr.yapsnutrition.yaps",
};
window.STORE_URLS = STORE_URLS;

const NAV_ITEMS_FR = [
  { label: "À propos", href: "/about" },
  { label: "Fonctionnalités", href: "/features" },
  { label: "Tarifs", href: "/pricing" },
  { label: "Sources Scientifiques", href: "/sciences" },
  { label: "Téléchargements", href: "/download" },
  { label: "Contact", href: "/contact" },
];
const NAV_ITEMS_EN = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Scientific Sources", href: "/sciences" },
  { label: "Download", href: "/download" },
  { label: "Contact", href: "/contact" },
];

/* Detect mobile OS — runs only on mount (no SSR) */
function detectOS() {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent || navigator.vendor || "";
  // iOS detection — also covers iPadOS reporting as Mac with touch
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "ios";
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
}

/* QR via api.qrserver.com — no extra dep */
function qrUrl(data, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=4&data=${encodeURIComponent(data)}`;
}

function DownloadModal({ open, onClose, lang }) {
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
    title: "Téléchargez YAPS",
    sub: "Scannez avec votre téléphone pour télécharger YAPS",
    close: "Fermer",
    or: "ou",
  } : {
    title: "Download YAPS",
    sub: "Scan with your phone to download YAPS",
    close: "Close",
    or: "or",
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
          padding: 36,
          maxWidth: 560,
          width: "100%",
          textAlign: "center",
          position: "relative",
          animation: "modal-pop 280ms var(--ease-out)",
        }}
      >
        <button
          onClick={onClose}
          aria-label={t.close}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 36, height: 36, borderRadius: 999,
            background: "var(--bg-sunken)", border: "1px solid var(--line)",
            display: "grid", placeItems: "center", cursor: "pointer",
            color: "var(--ink-2)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12" /></svg>
        </button>

        <div style={{ display: "inline-flex", marginBottom: 16 }}><YapsLogo size={48} /></div>
        <h3 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.02em", fontWeight: 600 }}>{t.title}</h3>
        <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "10px auto 28px", maxWidth: "36ch" }}>{t.sub}</p>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
        }}>
          {[
            { key: "ios", title: "App Store", url: STORE_URLS.ios, badge: <AppStoreBadge lang={lang} /> },
            { key: "and", title: "Google Play", url: STORE_URLS.android, badge: <PlayStoreBadge lang={lang} /> },
          ].map((s) => (
            <div key={s.key} style={{
              border: "1px solid var(--line)",
              borderRadius: 18,
              padding: 18,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
              background: "linear-gradient(180deg, #fff, #fbfaff)",
            }}>
              <div style={{
                width: 168, height: 168,
                borderRadius: 14,
                background: "#fff",
                border: "1px solid var(--line)",
                padding: 10,
                display: "grid", placeItems: "center",
              }}>
                <img src={qrUrl(s.url, 200)} alt={`QR ${s.title}`} width="148" height="148" style={{ display: "block" }} />
              </div>
              <a href={s.url} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                {s.badge}
              </a>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes modal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-pop { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}

function SmartDownloadButton({ lang, label }) {
  const [os, setOs] = React.useState("desktop"); // SSR-safe default
  const [modalOpen, setModalOpen] = React.useState(false);
  React.useEffect(() => { setOs(detectOS()); }, []);
  const onClick = (e) => {
    e.preventDefault();
    if (os === "ios") {
      window.open(STORE_URLS.ios, "_blank", "noopener");
    } else if (os === "android") {
      window.open(STORE_URLS.android, "_blank", "noopener");
    } else {
      setModalOpen(true);
    }
  };
  return (
    <>
      <button className="btn btn-primary" onClick={onClick}>
        {label}
      </button>
      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} lang={lang} />
    </>
  );
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div className="lang" role="group" aria-label="Language">
      <button
        className={lang === "fr" ? "active" : ""}
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

function Navigation({ route, navigate, lang, setLang }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const items = lang === "fr" ? NAV_ITEMS_FR : NAV_ITEMS_EN;

  const go = (href) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap header-inner">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go("/");
            }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
          >
            <YapsLogo size={32} />
            <span style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
              YAPS
            </span>
          </a>
          <nav className="nav" aria-label="Primary">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className={route === it.href ? "current" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  go(it.href);
                }}
              >
                <span>{it.label}</span>
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <LangSwitcher lang={lang} setLang={setLang} />
            <div className="header-cta-desktop">
              <SmartDownloadButton lang={lang} label={lang === "fr" ? "Télécharger" : "Download"} />
            </div>
            <button
              className="hamburger"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={mobileOpen}
        items={items}
        route={route}
        lang={lang}
        setLang={setLang}
        onClose={() => setMobileOpen(false)}
        onNavigate={go}
      />
    </>
  );
}

/* Mobile menu — full-screen slide-in panel from the right */
function MobileMenu({ open, items, route, lang, setLang, onClose, onNavigate }) {
  return (
    <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="mobile-menu-backdrop" onClick={onClose} />
      <aside className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mobile-menu-top">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate("/"); }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
          >
            <YapsLogo size={30} />
            <span style={{ fontWeight: 700 }}>YAPS</span>
          </a>
          <button
            className="mobile-menu-close"
            aria-label="Fermer le menu"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 3l12 12M15 3L3 15"/></svg>
          </button>
        </div>
        <ul className="mobile-menu-list">
          {items.map((it, i) => (
            <li key={it.href} style={{ "--i": i }}>
              <a
                href={it.href}
                className={route === it.href ? "current" : ""}
                onClick={(e) => { e.preventDefault(); onNavigate(it.href); }}
              >
                {it.label}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.4}}>
                  <path d="M5 3l5 5-5 5" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-bottom">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
          <div className="mobile-menu-cta">
            <SmartDownloadButton lang={lang} label={lang === "fr" ? "Télécharger" : "Download"} />
          </div>
        </div>
      </aside>
    </div>
  );
}

/* Store badges — original recreations, not the real Apple/Google art */
function AppStoreBadge({ lang = "fr" }) {
  return (
    <a className="badge-store" href={STORE_URLS.ios} target="_blank" rel="noopener" aria-label="App Store">
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path
          d="M17.5 13.7c0-3.1 2.5-4.6 2.6-4.7-1.4-2-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3.1 1.5-.1 2.1-1 3.9-1s2.3 1 3.9 1c1.6 0 2.7-1.5 3.7-3 1.2-1.7 1.6-3.4 1.6-3.5-.1 0-3.1-1.2-3.1-4.8zM14.6 4.7c.8-1 1.4-2.4 1.2-3.8-1.2 0-2.6.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.3.1 2.7-.7 3.6-1.7z"
          fill="#fff"
        />
      </svg>
      <div className="meta">
        <span className="top">
          {lang === "fr" ? "Télécharger sur" : "Download on the"}
        </span>
        <span className="bot">App Store</span>
      </div>
    </a>
  );
}

function PlayStoreBadge({ lang = "fr" }) {
  return (
    <a className="badge-store" href={STORE_URLS.android} target="_blank" rel="noopener" aria-label="Google Play">
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <defs>
          <linearGradient id="ps-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD86E" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          <linearGradient id="ps-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF7A6B" />
            <stop offset="100%" stopColor="#E03F3F" />
          </linearGradient>
          <linearGradient id="ps-c" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3FD0FF" />
            <stop offset="100%" stopColor="#1090E0" />
          </linearGradient>
          <linearGradient id="ps-d" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#52E394" />
            <stop offset="100%" stopColor="#1AA85B" />
          </linearGradient>
        </defs>
        <g transform="translate(2 1.5)">
          <path d="M0 0.5 L0 22.5 L10.2 11.5 Z" fill="url(#ps-c)" />
          <path d="M0 0.5 L13.5 8 L10.2 11.5 Z" fill="url(#ps-d)" />
          <path d="M0 22.5 L13.5 15 L10.2 11.5 Z" fill="url(#ps-b)" />
          <path d="M13.5 8 L17.5 10.3 C18.5 10.9 18.5 12.1 17.5 12.7 L13.5 15 L10.2 11.5 Z" fill="url(#ps-a)" />
        </g>
      </svg>
      <div className="meta">
        <span className="top">
          {lang === "fr" ? "Disponible sur" : "Get it on"}
        </span>
        <span className="bot">Google Play</span>
      </div>
    </a>
  );
}

function StoreBadges({ lang = "fr" }) {
  return (
    <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      <AppStoreBadge lang={lang} />
      <PlayStoreBadge lang={lang} />
    </div>
  );
}

/* Footer */
function FooterLink({ item, navigate }) {
  const isRoute = item.href && item.href.startsWith("/");
  return (
    <a
      href={item.href}
      onClick={(e) => {
        if (isRoute) {
          e.preventDefault();
          navigate(item.href);
        }
      }}
    >
      {item.label}
    </a>
  );
}

function Footer({ lang, setLang, navigate }) {
  const t = lang === "fr" ? {
    product: "Produit",
    legal: "Légal",
    support: "Support",
    social: "Réseaux",
    items: {
      product: [
        { label: "Fonctionnalités", href: "/features" },
        { label: "Tarifs",          href: "/pricing" },
        { label: "Téléchargements", href: "/download" },
        { label: "Sources Scientifiques", href: "/sciences" },
      ],
      legal: [
        { label: "Confidentialité", href: "/privacy" },
        { label: "CGU",              href: "/terms" },
        { label: "Mentions légales", href: "#" },
        { label: "Cookies",          href: "#" },
      ],
      support: [
        { label: "Contact", href: "/contact" },
        { label: "FAQ",     href: "#" },
        { label: "Aide",    href: "#" },
        { label: "Statut",  href: "#" },
      ],
      social: [
        { label: "Instagram",   href: "#" },
        { label: "TikTok",      href: "#" },
        { label: "X / Twitter", href: "#" },
        { label: "LinkedIn",    href: "#" },
      ],
    },
    rights: "Tous droits réservés.",
    tagline: "Votre assistant nutritionnel intelligent.",
  } : {
    product: "Product",
    legal: "Legal",
    support: "Support",
    social: "Social",
    items: {
      product: [
        { label: "Features", href: "/features" },
        { label: "Pricing",  href: "/pricing" },
        { label: "Download", href: "/download" },
        { label: "Scientific Sources", href: "/sciences" },
      ],
      legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms",   href: "/terms" },
        { label: "Imprint", href: "#" },
        { label: "Cookies", href: "#" },
      ],
      support: [
        { label: "Contact", href: "/contact" },
        { label: "FAQ",     href: "#" },
        { label: "Help",    href: "#" },
        { label: "Status",  href: "#" },
      ],
      social: [
        { label: "Instagram",   href: "#" },
        { label: "TikTok",      href: "#" },
        { label: "X / Twitter", href: "#" },
        { label: "LinkedIn",    href: "#" },
      ],
    },
    rights: "All rights reserved.",
    tagline: "Your intelligent nutrition assistant.",
  };

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <YapsLogo size={36} />
              <span style={{ fontWeight: 700 }}>YAPS</span>
            </div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, maxWidth: 28 + "ch", margin: 0, lineHeight: 1.5 }}>
              {t.tagline}
            </p>
            <div style={{ marginTop: 18 }}>
              <span className="chip"><span className="dot" /> v1.2.0 · iOS · Android</span>
            </div>
          </div>
          <div>
            <h4>{t.product}</h4>
            <ul>{t.items.product.map((x) => <li key={x.label}><FooterLink item={x} navigate={navigate} /></li>)}</ul>
          </div>
          <div>
            <h4>{t.legal}</h4>
            <ul>{t.items.legal.map((x) => <li key={x.label}><FooterLink item={x} navigate={navigate} /></li>)}</ul>
          </div>
          <div>
            <h4>{t.support}</h4>
            <ul>{t.items.support.map((x) => <li key={x.label}><FooterLink item={x} navigate={navigate} /></li>)}</ul>
          </div>
          <div>
            <h4>{t.social}</h4>
            <ul>{t.items.social.map((x) => <li key={x.label}><FooterLink item={x} navigate={navigate} /></li>)}</ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 YAPS Nutrition. {t.rights}</span>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </footer>
  );
}

window.Navigation = Navigation;
window.Footer = Footer;
window.StoreBadges = StoreBadges;
window.AppStoreBadge = AppStoreBadge;
window.PlayStoreBadge = PlayStoreBadge;
window.LangSwitcher = LangSwitcher;
window.SmartDownloadButton = SmartDownloadButton;
window.DownloadModal = DownloadModal;
window.detectOS = detectOS;
