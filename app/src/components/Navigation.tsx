import { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/skills', label: 'Skills' },
  { path: '/frameworks', label: 'Frameworks' },
  { path: '/workflows', label: 'Workflows' },
];

export default function Navigation() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeIndex = navItems.findIndex((item) => item.path === location.pathname);

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    const activeLink = linkRefs.current[activeIndex];
    if (!nav || !activeLink) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setIndicatorStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, [activeIndex]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  // Recalculate on resize
  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-center pt-4 px-6">
        <nav
          ref={navRef}
          className="relative inline-flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/40 backdrop-blur-2xl border border-white/30 shadow-sm"
        >
          {/* Sliding indicator */}
          <div
            className="absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-secondary transition-all duration-300 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />

          {navItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              ref={(el) => { linkRefs.current[i] = el; }}
              className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                i === activeIndex
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
