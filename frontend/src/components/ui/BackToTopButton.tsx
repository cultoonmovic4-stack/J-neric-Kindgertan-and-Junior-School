import { useEffect, useState } from 'react';

const VISIBILITY_SCROLL_THRESHOLD = 200;
const RING_RADIUS = 19;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function BackToTopButton() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > VISIBILITY_SCROLL_THRESHOLD);
    }

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - scrollProgress);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-pure-white border border-rule-gray shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer group hover:border-crest-navy ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg
        viewBox="0 0 48 48"
        width="48"
        height="48"
        aria-hidden="true"
        className="h-12 w-12"
      >
        {/* Subtle inner track ring */}
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="#ECEAE4"
          strokeWidth="3"
        />
        {/* Live royal navy scroll progress arc starting at 12 o'clock */}
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="#1E2B7B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 24 24)"
          className="transition-[stroke-dashoffset] duration-100 ease-out"
        />
        {/* Crisp upward chevron */}
        <polyline
          points="18.5,26.5 24,21 29.5,26.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-ink group-hover:text-crest-crimson transition-colors"
        />
      </svg>
    </button>
  );
}
