import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(3)
})

export type storeFormSchemaType = z.infer<typeof formSchema>