import { useEffect } from 'react';

export function useReveal(dependencies = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.hero-reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 180);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, dependencies);
}
