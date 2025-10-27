'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <NextAuthSessionProvider
      // Refetch session every 15 minutes (reduced to avoid excessive requests)
      refetchInterval={15 * 60}
      // Only refetch on window focus if session is stale
      refetchOnWindowFocus={false}
      // Keep session alive on client side
      refetchWhenOffline={false}
    >
      {children}
    </NextAuthSessionProvider>
  );
}

