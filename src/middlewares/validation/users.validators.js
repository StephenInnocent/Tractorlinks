const {z} = require("zod");

const registerValidator = z.object({
    name: z.string().min(6, {message: "Name must be 6 or more characters long"}),
    phoneNumber: z.string().min(10,{message:"Phone Number must not be less than 10 digits"}).max(11,{message:"Phone Number must not exceed 11 digits"}),
    email: z.string().email({message: "Invalid email address"}).includes("@"),
    role: z.enum(["Farmer","Tractor Owner","Admin"]),
    password: z.string().min(6).max(36).trim()
}).required({message:"Please fill in all fields"})

const updateValidator = z.object({
    name: z.string().min(6, {message: "Name must be 6 or more characters long"}),
    phoneNumber: z.string().min(10,{message:"Phone Number must not be less than 10 digits"}).max(11,{message:"Phone Number must not exceed 11 digits"}),
    email: z.string().email({message: "Invalid email address"}).includes("@"),
    role: z.enum(["Farmer","Tractor Owner","Admin"]),
    password: z.string().min(6).max(36).trim(),
    role: z.string(),
    LGAsOfOperation: z.array(),
    statesOfOperation: z.array(),
    workingDays: z.array,
}).required({message:"Please fill in all fields"});
 

const loginValidatorEmail = z.object({
    email: z.string().email().includes("@"),
    password: z.string().min(6).max(36).trim()
});

const loginValidatorNumber = z.object({
    phoneNumber: z.number(),
    password: z.string().min(6).max(36).trim()
});

const deleteValidator = z.object({
   reason: z.string().min(3)
});

module.exports = {
    registerValidator,
    updateValidator,
    loginValidatorEmail,
    deleteValidator,
    loginValidatorNumber
}

