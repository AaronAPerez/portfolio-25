/**
 * Accessibility Setup
 * File: __tests__/setup/a11y.setup.ts
 */
export const a11ySetup = `
import { configureAxe } from 'jest-axe';

// Configure axe for comprehensive accessibility testing
const axe = configureAxe({
  rules: {
    // Enable additional rules for thorough testing
    'color-contrast-enhanced': { enabled: true },
    'focus-order-semantics': { enabled: true },
    'hidden-content': { enabled: true },
    'landmark-complementary-is-top-level': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
});

// Export configured axe
export { axe };

// Accessibility test utilities
export const a11yTestUtils = {
  // Wait for screen reader announcements
  waitForAnnouncement: async (text) => {
    return waitFor(() => {
      const liveRegions = document.querySelectorAll('[aria-live]');
      return Array.from(liveRegions).some(region => 
        region.textContent?.includes(text)
      );
    });
  },
  
  // Get all focusable elements
  getFocusableElements: (container = document) => {
    return container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  },
  
  // Test keyboard navigation
  testKeyboardNavigation: async (user, container) => {
    const focusableElements = a11yTestUtils.getFocusableElements(container);
    
    for (let i = 0; i < focusableElements.length; i++) {
      await user.tab();
      expect(focusableElements[i]).toHaveFocus();
    }
  },
};
`;