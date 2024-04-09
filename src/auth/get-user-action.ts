'use server'
import prisma from '@/libs/prisma-client'
import { auth as getServerSession } from '@/auth/auth-helper'


/** This is also an auth check for server components and return the user row
 * from the db table (not auth0 db) 
 *
 * Next.js will throw a warning about setting cookies but we don't care about
 * that, can turn it off rolling sessions at some point
 * https://stackoverflow.com/questions/76813923/how-to-avoid-warning-message-when-getting-user-information-on-next-js-13-server
 *
 * */

const getUserAction = async () => {
    try {
        const session = await getServerSession();
        if (!session?.user) throw new Error("Unauthorized")
        const { user } = session;
        const dbUsr = await prisma.user.findUnique({
            where: {
                email: user.email || ''
            }
        })
        if (!dbUsr) throw new Error("User not found in db.")
        return { dbUsr, auth0Usr: session.user }
    } catch (error) {
        console.error(error)
    }
}

export default getUserAction