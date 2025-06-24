/**
 * Custom Test Utilities
 * File: src/__tests__/utils/test-utils.tsx
 */
export const testUtils = `
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/lib/theme-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  theme?: 'light' | 'dark';
}

const AllTheProviders = ({ 
  children, 
  theme = 'light' 
}: { 
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={theme}>
        <div data-testid="app-wrapper">
          {children}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { theme, ...renderOptions } = options;
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllTheProviders theme={theme}>{children}</AllTheProviders>
  );

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Page Object Model for complex components
export class NavigationPageObject {
  constructor(private container: HTMLElement) {}

  get menuButton() {
    return this.container.querySelector('[aria-label*="menu"]') as HTMLElement;
  }

  get navLinks() {
    return Array.from(this.container.querySelectorAll('nav a'));
  }

  async openMobileMenu() {
    if (this.menuButton) {
      userEvent.click(this.menuButton);
      await waitFor(() => 
        expect(this.menuButton).toHaveAttribute('aria-expanded', 'true')
      );
    }
  }

  async navigateTo(linkText: string) {
    const link = this.navLinks.find(link => 
      link.textContent?.includes(linkText)
    );
    if (link) {
      await userEvent.click(link);
    }
  }
}

export class ProjectSectionPageObject {
  constructor(private container: HTMLElement) {}

  get searchInput() {
    return this.container.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
  }

  get filterButtons() {
    return Array.from(this.container.querySelectorAll('[role="button"][aria-pressed]'));
  }

  get projectCards() {
    return Array.from(this.container.querySelectorAll('[data-testid*="project-card"]'));
  }

  async searchFor(query: string) {
    if (this.searchInput) {
      await userEvent.clear(this.searchInput);
      await userEvent.type(this.searchInput, query);
    }
  }

  async filterByCategory(category: string) {
    const button = this.filterButtons.find(btn => 
      btn.textContent?.includes(category)
    );
    if (button) {
      await userEvent.click(button);
    }
  }

  async openCaseStudy(projectIndex: number = 0) {
    const projectCard = this.projectCards[projectIndex];
    if (projectCard) {
      const caseStudyButton = projectCard.querySelector('[data-action="open-case-study"]');
      if (caseStudyButton) {
        await userEvent.click(caseStudyButton);
      }
    }
  }
}

// Visual regression testing utilities
export const visualTestUtils = {
  // Take screenshot and compare
  expectToMatchSnapshot: async (element: HTMLElement, name: string) => {
    // This would integrate with a visual regression testing tool
    // like Percy, Chromatic, or a custom solution
    console.log(\`Taking screenshot: \${name}\`);
  },

  // Test responsive breakpoints
  testResponsiveBreakpoints: async (component: React.ReactElement) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    for (const breakpoint of breakpoints) {
      // Mock viewport size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: breakpoint.width,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: breakpoint.height,
      });

      // Trigger resize event
      window.dispatchEvent(new Event('resize'));

      // Render component at this breakpoint
      const { container } = customRender(component);
      
      // Take screenshot (would integrate with visual testing tool)
      await visualTestUtils.expectToMatchSnapshot(
        container, 
        \`\${component.type.name}-\${breakpoint.name}\`
      );
    }
  },
};

// API mocking utilities
export const apiMockUtils = {
  // Mock successful API response
  mockApiSuccess: (data: any) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => data,
      headers: new Headers(),
      status: 200,
    });
  },

  // Mock API error
  mockApiError: (status: number = 500, message: string = 'Internal Server Error') => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: message }),
      headers: new Headers(),
      status,
    });
  },

  // Mock network delay
  mockApiDelay: (delay: number = 1000) => {
    global.fetch = jest.fn().mockImplementation(
      () => new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => ({}),
          headers: new Headers(),
          status: 200,
        }), delay)
      )
    );
  },
};

// Export everything
export * from '@testing-library/react';
export { customRender as render };
export { userEvent };
`;
