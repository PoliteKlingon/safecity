import { z } from "zod";

export const homeFormSchema = z.object({
    photos: z.array(z.string()).min(1, "Required"),
    latitude: z.number().min(-180, "Coordinates are required"),
    longitude:z.number().min(-180, "Coordinates are required"),
    note: z.string().min(1, "Required"),
    contactPolice: z.boolean()
})

export type HomeFormType = z.infer<typeof homeFormSchema>