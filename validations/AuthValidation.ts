import { z } from 'zod'
export const authValidationSchema = z.object({
	email: z.string().email('invalid email'),
	password: z.string().min(1, 'password is required'),
})

export type authValidationValues = z.infer<typeof authValidationSchema>