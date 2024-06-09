import { z } from "zod";

export const homeFormSchema = z.object({
    photos: z.array(z.string()).min(1, "Required"),
    latitude: z.string(),
    longitude:z.string(),
    note: z.string().min(1, "Required"),
    contactPolice: z.boolean()
})

export type HomeFormType = z.infer<typeof homeFormSchema>