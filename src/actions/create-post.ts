'use server'
import { PostStatusSchema } from "@/validators/status-post"
import prisma from '@/libs/prisma-client'
import { auth } from '@/auth/auth-helper'
import { revalidatePath } from "next/cache"


export type FormState = {
    msg: FormDataEntryValue | null;
    errors: {
        msg?: string[] | undefined
    };
    success: boolean;
}

export default async function createPost(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawFormData: FormState = { ...prevState, msg: formData.get('msg') }

    const validatedField = PostStatusSchema.safeParse(rawFormData)

    if (!validatedField.success) {
        return {
            msg: formData.get('msg'),
            errors: validatedField.error.flatten().fieldErrors,
            success: false
        }
    }

    try {
        const session = await auth();

        if (!session?.user) return { errors: { msg: ['Unauthorized'] }, msg: formData.get('msg'), success: false }

        // get user from our own db
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email || ''
            }
        })
        if (!user) return { errors: { msg: ['Error finding user'] }, msg: formData.get('msg'), success: false }
        await prisma.statusPost.create({
            data: { msg: validatedField.data.msg, userId: user.id }
        })
    } catch (error) {
        console.error(error);
        return {
            msg: formData.get('msg'),
            errors: {
                msg: ['Error creating post.']
            },
            success: false
        }
    }
    revalidatePath('/circle')
    // reset
    return {
        msg: '',
        errors: {},
        success: true
    }
}