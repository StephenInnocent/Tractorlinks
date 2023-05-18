const {z, string} = require("zod");

const makeOrderValidator = z.object({
    name: z.string().max(36),
    location: z.string(),
    date: z.string(),
    contact: z.number().min(9),
    state: z.string(),
    LGA: z.string()
    // class: z.string(),
    // orderedBy: z.string()
})


const updateValidator = z.object({
    id: z.string().length(24)
    // name: z.string().max(36),
    // location: z.string(),
    // date: z.date(),
    // contact: z.number().min(9),
    // class: z.string(),
    // orderedBy: z.string()
})

const deleteValidator = z.object({
    reason: z.string().min(5),
});

module.exports={
    makeOrderValidator,
    deleteValidator,
    updateValidator
}