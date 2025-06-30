import { useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function useInViewAnimation() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return { ref, controls };
}
