interface PortfolioFooterProps {
  readonly resumeHref: string;
}

export function PortfolioFooter({ resumeHref }: PortfolioFooterProps) {
  return (
    <footer aria-labelledby="portfolio-footer-title" className="portfolio-footer" id="contact">
      <div className="portfolio-footer-main">
        <div>
          <p className="portfolio-footer-kicker"><span /> Melbourne, Australia · Open to roles nationwide</p>
          <h2 className="font-cinzel" id="portfolio-footer-title">Let’s build something useful.</h2>
        </div>
        <a className="portfolio-footer-cta" href="mailto:nsushant09@gmail.com?subject=Software%20engineering%20opportunity">
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="portfolio-footer-bottom">
        <a className="portfolio-footer-top-link" href="#top">Sushant Neupane <span aria-hidden="true">↑</span></a>
        <nav aria-label="Social and professional links" className="portfolio-footer-links">
          <a href="https://www.linkedin.com/in/nsushant09/" rel="noreferrer" target="_blank">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/nsushant09" rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>
          <a href={resumeHref} rel="noreferrer" target="_blank">Resume <span aria-hidden="true">↗</span></a>
        </nav>
        <span className="portfolio-footer-copyright">© {new Date().getFullYear()} Sushant Neupane</span>
      </div>
    </footer>
  );
}
