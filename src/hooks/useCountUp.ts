import { useEffect, useRef, useState } from "react";

interface CountUpOptions {
  end: number;
  duration?: number; // ms
  delay?: number;    // ms before starting
  startOnMount?: boolean;
}

/**
 * Counts from 0 up to `end` over `duration` ms.
 * Returns { count, ref } — attach ref to the element you want to observe.
 * Counting starts when the element enters the viewport (IntersectionObserver).
 */
export default function useCountUp({
  end,
  duration = 1800,
  delay = 0,
  startOnMount = false,
}: CountUpOptions) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection observer — triggers when element scrolls into view
  useEffect(() => {
    if (startOnMount) {
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnMount]);

  // Actual counting animation using requestAnimationFrame
  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let raf: number;

    const delayTimer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, [started, end, duration, delay]);

  return { count, ref };
}
