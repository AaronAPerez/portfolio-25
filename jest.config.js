/**
 * Jest Configuration
 * File: jest.config.js
 */
export const jestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/jest.setup.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__tests__/setup/__mocks__/fileMock.js'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/__tests__/**/*',
    '!src/app/**/*', // Exclude Next.js app directory
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testTimeout: 10000,
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/*.{test,spec}.{ts,tsx}'],
      testPathIgnorePatterns: ['/e2e/', '/integration/'],
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/src/**/__tests__/integration/**/*.{test,spec}.{ts,tsx}'],
    },
    {
      displayName: 'accessibility',
      testMatch: ['<rootDir>/src/**/__tests__/accessibility/**/*.{test,spec}.{ts,tsx}'],
      setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/a11y.setup.ts'],
    },
    {
      displayName: 'performance',
      testMatch: ['<rootDir>/src/**/__tests__/performance/**/*.{test,spec}.{ts,tsx}'],
      setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/performance.setup.ts'],
    }
  ],
};