'use server'
import { getSession } from "@auth0/nextjs-auth0"
import prisma from '@/libs/prisma-client'
import logger from "@/libs/logger";


/** This is also an auth check for server components and return the user row
 * from the db table (not auth0 db) */

const getUserAction = async () => {
    try {
        const session = await getSession();
        if (!session?.user) throw new Error("Unauthorized")
        const { user } = session;
        const dbUsr = await prisma.user.findUnique({
            where: {
                auth0Id: user.sub
            }
        })
        return { dbUsr, auth0Usr: session.user }
    } catch (error) {
        logger.error(error)
    }
}

export default getUserAction