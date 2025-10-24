import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      role: 'user' | 'tenant';
      isEmailVerified: boolean;
      tenantId?: number;
    } & DefaultSession['user'];
    backendToken: string;
  }

  interface User extends DefaultUser {
    role: 'user' | 'tenant';
    isEmailVerified: boolean;
    backendToken: string;
    tenantId?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    picture?: string;
    role: 'user' | 'tenant';
    isEmailVerified: boolean;
    backendToken: string;
    tenantId?: number;
  }
}