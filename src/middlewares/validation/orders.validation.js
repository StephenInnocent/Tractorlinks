const {z, string} = require("zod");

const makeOrderValidator = z.object({
    name: z.string().max(36),
    location: z.string(),
    date: z.string(),
    contact: z.string().min(10,{message:"Your contact must not be less than 10 digits"}).max(12,{message:"Your contact must not exceed 11 digits"}),
    state: z.string(),
    LGA: z.string(),
    time: string()
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