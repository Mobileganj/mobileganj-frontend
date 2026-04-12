'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40">
      <Button
        size="icon"
        className="rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 md:h-12 md:w-12"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </div>
  );
}
