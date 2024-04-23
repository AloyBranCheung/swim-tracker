'use server'
// validation
import { CreateSwimActivitySchema } from "@/validators/create-swim-activity"
import prisma from "@/libs/prisma-client"
import getUserAction from "@/auth/get-user-action"
import { revalidatePath } from "next/cache"

export interface FormState {
    swimDistance: string | undefined
    msg?: string;
    success?: boolean;
}

export default async function createSwimActivity(prevState: FormState, formData: FormData) {
    const rawFormData = {
        swimDistance: formData.get('swimDistance')
    }

    // validation
    if (!rawFormData.swimDistance) {
        return {
            msg: "Error: no swim distance provided"
        }
    }

    const validatedFormData = CreateSwimActivitySchema.safeParse(rawFormData)

    if (!validatedFormData.success) {
        return {
            msg: "Error: Not a valid swim distance.",
        }
    }

    const user = await getUserAction()
    if (!user) return { msg: "Error: User not found." }

    // prisma
    await prisma.userSwimActivityLog.create({
        data: {
            userId: user.dbUsr.id,
            totalDistanceSwam: validatedFormData.data.swimDistance,
            unit: 'm',
        }
    })

    revalidatePath('/')
    revalidatePath('/profile')

    return { success: true }
}