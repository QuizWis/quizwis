import { PrismaClient } from '@prisma/client';

import auth from '../features/auth/firebase';
import { prisma } from '../lib/prisma';

export type Context = {
  prisma: PrismaClient
  user: {
    id: string
  }
};

/**
 * GraphQLのクエリに渡されるcontext
 */
export async function createContext(): Promise<Context> {
  return {
    prisma,
    user: {
      id: auth.currentUser?.uid || '',
    },
  };
}
