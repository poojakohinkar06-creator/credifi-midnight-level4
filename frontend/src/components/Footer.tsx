import { BrandMark } from "./Icons";

type FooterProps = {
  deploymentNote: string;
};

export function Footer({ deploymentNote }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <BrandMark size={26} />
          <div>
            <p className="footer-name">CrediFi</p>
            <p className="footer-tag">Privacy-preserving financial eligibility verification.</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <span className="footer-link disabled">
            GitHub
            <span className="coming-soon">Soon</span>
          </span>
          <span className="footer-link disabled">
            X
            <span className="coming-soon">Soon</span>
          </span>
          <a className="footer-link" href="#verification">
            Verification
          </a>
          <a className="footer-link" href="#privacy">
            Privacy
          </a>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>{deploymentNote}</p>
        <p>Built on the Midnight Network · Zero-knowledge proofs</p>
      </div>
    </footer>
  );
}
