'use server'
import { PostStatusSchema } from "@/validators/status-post"
import prisma from '@/libs/prisma-client'
import { getSession } from '@auth0/nextjs-auth0'


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
        const session = await getSession();
        if (!session?.user) return { errors: { msg: ['Unauthorized'] }, msg: formData.get('msg'), success: false }

        // get user from our own db
        const user = await prisma.user.findUnique({
            where: {
                auth0Id: session.user.sub
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
    // reset
    return {
        msg: '',
        errors: {},
        success: true
    }
}