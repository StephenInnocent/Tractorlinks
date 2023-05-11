const {z} = require("zod");

const registerValidator = z.object({
    name: z.string().min(6, {message: "Name must be 6 or more characters long"}),
    phoneNumber: z.number().min(9).safe().positive(),
    email: z.string().email({message: "Invalid email address"}).includes("@"),
    role: z.enum(["Farmer","Tractor Owner","Admin"]),
    password: z.string().min(6).max(36).trim()
}).required({message:"Please fill in all fields"})

const updateValidator = z.object({
    name: z.string().min(6, {message: "Name must be 6 or more characters long"}),
    phoneNumber: z.number().min(9).safe().positive(),
    email: z.string().email({message: "Invalid email address"}).includes("@"),
    role: z.enum(["Farmer","Tractor Owner","Admin"]),
    password: z.string().min(6).max(36).trim()
}).required({message:"Please fill in all fields"})
 

const loginValidator = z.object({
    email: z.string().email().includes("@"),
    password: z.string().min(6).max(36).trim()
})
module.exports = {
    registerValidator,
    updateValidator,
    loginValidator
}

