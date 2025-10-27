import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { api } from '@/lib/api';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  // Session configuration - Store in JWT and cookies
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Cookie configuration - Save token in httpOnly cookies
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      }
    },
  },

  // Secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,

  debug: false,

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          console.log('🔐 Starting Google OAuth authentication...');
          console.log('📧 User email:', user.email);
          console.log('🆔 Google ID:', account.providerAccountId);
          
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
          console.log('🌐 Backend API URL:', `${apiUrl}/auth/google`);
          
          // Send Google user data to backend for authentication/registration
          const response = await fetch(`${apiUrl}/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              googleId: account.providerAccountId,
              avatar: user.image,
            }),
          });

          console.log('📡 Backend response status:', response.status);

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            console.error('❌ Backend authentication failed:', errorData);
            throw new Error(errorData.message || 'Backend authentication failed');
          }

          const data = await response.json();
          console.log('✅ Backend authentication successful');
          console.log('👤 User role:', data.user?.role);
          
          // Store backend data in user object
          user.id = data.user.id;
          user.role = data.user.role;
          user.isEmailVerified = data.user.isEmailVerified;
          user.backendToken = data.token;
          
          if (data.user.role === 'tenant') {
            user.tenantId = data.user.tenantId;
          }
        }
        
        return true;
      } catch (error) {
        console.error('❌ Google sign-in error:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        // Return false to prevent sign in
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id || '';
        token.email = user.email || '';
        token.name = user.name || '';
        token.picture = user.image || undefined;
        token.role = user.role || 'user';
        token.isEmailVerified = user.isEmailVerified || false;
        token.backendToken = user.backendToken || '';
        
        if (user.role === 'tenant') {
          token.tenantId = user.tenantId;
        }
      }
      
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.role = token.role as 'user' | 'tenant';
        session.user.isEmailVerified = token.isEmailVerified as boolean;
        session.backendToken = token.backendToken as string;
        
        if (token.role === 'tenant') {
          session.user.tenantId = token.tenantId as number;
        }
      }

      
      return session;
    },

    // Redirect after successful sign in
    async redirect({ url, baseUrl }) {
      console.log('🔄 Redirect callback:', { url, baseUrl });
      
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },

  // Events for logging
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log('✅ User signed in successfully:', {
        userId: user.id,
        email: user.email,
        provider: account?.provider,
        isNewUser
      });
    },
    async signOut({ token }) {
      console.log('👋 User signed out:', { userId: token?.id });
    },
    // Removed session event to prevent excessive logging
  },
};

