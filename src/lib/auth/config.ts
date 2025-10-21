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

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          // Send Google user data to backend for authentication/registration
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              googleId: account.providerAccountId,
              avatar: user.image,
            }),
          });

          if (!response.ok) {
            console.error('Backend authentication failed');
            return false;
          }

          const data = await response.json();
          
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
        console.error('Google sign-in error:', error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = user.role;
        token.isEmailVerified = user.isEmailVerified;
        token.backendToken = user.backendToken;
        
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
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

