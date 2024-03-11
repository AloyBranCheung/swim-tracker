'use server'
import { PostStatusSchema } from "@/validators/status-post"

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

    // mutate data
    console.log('success 200 \n', { validatedField }) // will be in the server logs  
    return {
        ...validatedField.data, errors: {}
    }
}