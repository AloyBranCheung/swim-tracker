import NextAuth from "next-auth"
import { config } from '@/auth/auth-helper'

const handler = NextAuth(config)

export { handler as GET, handler as POST }