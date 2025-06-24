/**
 * MSW Server Configuration
 * File: __tests__/setup/msw-server.ts
 */
export const mswServerSetup = `
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// API handlers for testing
const handlers = [
  // Contact form submission
  rest.post('/api/contact', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Message sent successfully' })
    );
  }),

  // Analytics endpoints
  rest.post('/api/analytics/events', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ recorded: true }));
  }),

  rest.post('/api/analytics/web-vitals', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ recorded: true }));
  }),

  // Newsletter subscription
  rest.post('/api/newsletter/subscribe', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Subscribed successfully' })
    );
  }),

  // Error simulation
  rest.post('/api/error-test', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ error: 'Internal server error' })
    );
  }),
];

export const server = setupServer(...handlers);
`;