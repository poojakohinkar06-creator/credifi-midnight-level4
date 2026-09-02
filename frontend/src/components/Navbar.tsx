import { useState } from "react";
import type { WalletState } from "../wallet";
import { shortenAddress } from "../lib/format";
import { Button } from "./Button";
import { BrandMark, CheckIcon, MenuIcon, WalletIcon, XIcon } from "./Icons";

type NavbarProps = {
  wallet: WalletState | null;
  connected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  activeSection: string;
};

const LINKS = [
  { id: "how-it-works", label: "How It Works" },
  { id: "privacy", label: "Privacy" },
  { id: "verification", label: "Verification" },
];

export function Navbar({ wallet, connected, isConnecting, onConnect, onDisconnect, activeSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <BrandMark />
          <span className="brand-name">CrediFi</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link ${activeSection === l.id ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); goTo(l.id); }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-wallet">
            {connected && wallet ? (
              <div className="wallet-chip connected">
                <ShieldStatus />
                <div className="wallet-chip-text">
                  <span className="wallet-chip-addr">{shortenAddress(wallet.address)}</span>
                  <button type="button" className="wallet-chip-disconnect" onClick={onDisconnect}>
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={onConnect} disabled={isConnecting} icon={<WalletIcon />}>
                {isConnecting ? "Connecting…" : "Connect wallet"}
              </Button>
            )}
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="mobile-link" onClick={(e) => { e.preventDefault(); goTo(l.id); }}>
              {l.label}
            </a>
          ))}
          {connected && wallet && (
            <button type="button" className="mobile-link" onClick={() => { onDisconnect(); setMenuOpen(false); }}>
              Disconnect wallet
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function ShieldStatus() {
  return (
    <span className="wallet-chip-icon" aria-hidden>
      <CheckIcon size={14} />
    </span>
  );
}
