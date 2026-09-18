import { useEffect, useRef } from "react";

interface AnimeInViewOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  delayStep?: number;
  translateY?: number;
}

/**
 * Runs one lightweight Anime.js entrance when a group enters the viewport.
 * Content stays visible before JavaScript loads, and reduced-motion users skip it.
 */
export const useAnimeInView = <T extends HTMLElement>({
  selector = "[data-anime-item]",
  threshold = 0.16,
  rootMargin = "0px 0px -8% 0px",
  delayStep = 70,
  translateY = 18,
}: AnimeInViewOptions = {}) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animation: { revert: () => unknown } | undefined;
    let cancelled = false;

    const play = async () => {
      const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
      if (items.length === 0) return;

      const { animate, stagger } = await import("animejs");
      if (cancelled) return;

      animation = animate(items, {
        opacity: { from: 0 },
        y: { from: translateY },
        scale: { from: 0.985 },
        duration: 620,
        delay: stagger(delayStep),
        ease: "outExpo",
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      void play();
      return () => {
        cancelled = true;
        animation?.revert();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void play();
      },
      { threshold, rootMargin },
    );

    observer.observe(root);
    return () => {
      cancelled = true;
      observer.disconnect();
      animation?.revert();
    };
  }, [delayStep, rootMargin, selector, threshold, translateY]);

  return ref;
};