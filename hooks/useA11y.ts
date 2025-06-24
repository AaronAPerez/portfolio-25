
import { useState, useCallback } from "react";

// accessibility hook
export const useA11y = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  
  const announce = useCallback((message: string) => {
    setAnnouncements(prev => [...prev, message]);
    // Automatically clear after announcement
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  }, []);

  return { announce, announcements };
};

// Skip links component
// export const SkipLinks = () => (
//     <>
//   <div className="skip-links">
//     <a href="#main-content" className="skip-link">
//       Skip to main content
//     </a>
//     <a href="#navigation" className="skip-link">
//       Skip to navigation
//     </a>
//   </div>
// );