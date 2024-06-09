import { z } from "zod";

export const homeFormSchema = z.object({
    photos: z.array(z.string()),
    latitude: z.string(),
    longitude:z.string(),
    note: z.string(),
    contactPolice: z.boolean()
})

export type HomeFormType = z.infer<typeof homeFormSchema>