import { ExternalLink, Youtube, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t mt-12" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div id="about-pma" className="card p-6 sm:p-8 mb-8">
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            About Product Manager Accelerator
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            The Product Manager Accelerator Program is designed to support PM professionals through
            every stage of their careers. From students preparing to land their first PM role to
            Directors looking to take on a VP position, our program has helped people from all
            backgrounds achieve their career goals.
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            Our Product Manager Accelerator community offers mentorship, structured curriculum, and
            interview preparation programs covering product strategy, leadership, and execution,
            helping members break into product management or accelerate into senior leadership roles.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.pmaccelerator.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              <ExternalLink size={14} /> pmaccelerator.io
            </a>
            <a
              href="https://www.drnancyli.com/pmresume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              <FileText size={14} /> Resume Resource
            </a>
            <a
              href="https://www.youtube.com/c/drnancyli"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              <Youtube size={14} /> YouTube Channel
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p style={{ color: 'var(--text-muted)' }}>
            Built by <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Ayush Mayekar</span>
            {' '}for Product Manager Accelerator
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            Weather data from Open-Meteo · Maps from OpenStreetMap
          </p>
        </div>
      </div>
    </footer>
  );
}
