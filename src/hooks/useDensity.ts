import { useState, useEffect } from 'react';

// Hook to handle UI density scaling
export const useDensity = () => {
  const [density, setDensity] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setDensity(0.85);
      } else if (width < 600) {
        setDensity(0.9);
      } else {
        setDensity(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return density;
};
