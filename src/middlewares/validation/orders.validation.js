const {z} = require("zod");

const makeOrderSchema = z.object({
    name: z.string().max(36),
    location: z.string(),
    date: z.date(),
    contact: z.string().min(9)
})