import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import './i18n';

export function render(url: string): string {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  const app = (
    <StaticRouter location={url}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StaticRouter>
  );

  return renderToString(app);
}

