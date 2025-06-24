/**
 * Performance Setup
 * File: __tests__/setup/performance.setup.ts
 */
export const performanceSetup = `
// Performance testing utilities
global.performance = global.performance || {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
};

// Mock PerformanceObserver
global.PerformanceObserver = class PerformanceObserver {
  constructor(callback) {
    this.callback = callback;
  }
  
  observe() {}
  disconnect() {}
};

// Performance test utilities
export const performanceTestUtils = {
  // Measure component render time
  measureRenderTime: (renderFn) => {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    return { result, duration: end - start };
  },
  
  // Assert performance budget
  expectWithinBudget: (duration, budget, label) => {
    if (duration > budget) {
      throw new Error(
        \`Performance budget exceeded for \${label}: \${duration}ms > \${budget}ms\`
      );
    }
  },
  
  // Mock slow network
  mockSlowNetwork: (delay = 1000) => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn((...args) => 
      new Promise(resolve => 
        setTimeout(() => resolve(originalFetch(...args)), delay)
      )
    );
  },
};
`;
