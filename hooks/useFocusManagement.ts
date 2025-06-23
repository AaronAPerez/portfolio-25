import { useCallback } from "react";

// Enhanced focus management for SPA navigation
export const useFocusManagement = () => {
  const focusOnPageChange = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return { focusOnPageChange };
};