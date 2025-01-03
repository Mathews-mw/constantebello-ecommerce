import { JWT } from "next-auth/jwt"
import { UserRole } from '@prisma/client';
import NextAuth, { DefaultSession, Account, User, Session } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      password?: string;
      role?: UserRole
    } & DefaultSession['user']
  }
  

  interface User {
    password?: string;
    role?: UserRole
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    role?: UserRole
  } 
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole 
  }
}