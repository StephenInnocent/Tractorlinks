const {z} = require("zod");


const deleteUserValidator = z.object({
    id: z.string().length(24)
})

const getUserValidator = z.object({
    id: z.string().length(24)
})


const deleteOrderValidator = z.object({
    id: z.string().length(24)
})

module.exports = {
    deleteUserValidator,
    getUserValidator,
    deleteOrderValidator
}