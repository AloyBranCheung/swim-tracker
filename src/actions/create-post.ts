'use server'
import { PostStatusSchema } from "@/validators/status-post"
import Pino from 'pino';

const logger = Pino();

export type FormState = {
    msg: FormDataEntryValue | null;
    errors: {
        msg?: string[] | undefined
    }
}


export default async function createPost(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawFormData: FormState = { ...prevState, msg: formData.get('msg') }

    const validatedField = PostStatusSchema.safeParse(rawFormData)

    if (!validatedField.success) {
        return {
            msg: formData.get('msg'),
            errors: validatedField.error.flatten().fieldErrors
        }
    }

    // TODO: user authentication pre-mutate data 
    try {

    } catch (error) {
        logger.error(error);
        return {
            msg: formData.get('msg'),
            errors: {
                msg: ['Error creating post.']
            }
        }
    }

    // reset
    return {
        msg: '', errors: {}
    }
}