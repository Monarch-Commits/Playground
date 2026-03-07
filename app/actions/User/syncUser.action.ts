'use server'

import prisma from "@/app/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function syncUser() {
  const { getUser } = getKindeServerSession()
  const kindeUser = await getUser()
  if (!kindeUser) return null

  // Check DB user
  let dbUser = await prisma.user.findUnique({
    where: { kindeId: kindeUser.id } // lookup via kindeId
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        kindeId: kindeUser.id,
        name: kindeUser.given_name || null,
        email: kindeUser.email || null,
        imageUrl: kindeUser.picture || null,
      }
    })
  }

  return dbUser // ✅ return database user
}