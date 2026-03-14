'use server';

import prisma from '@/app/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function syncUser() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) return null;

  const dbUser = await prisma.user.upsert({
    where: {
      kindeId: kindeUser.id,
    },
    update: {},
    create: {
      kindeId: kindeUser.id,
      name: kindeUser.given_name ?? null,
      email: kindeUser.email ?? null,
      imageUrl: kindeUser.picture ?? null,
    },
  });

  return dbUser; // ✅ return database user
}
