const zod = require('zod')


function formatZodError (errors) {
    return  errors.issues[0].message
 }
 
 module.exports = {
    formatZodError
 }

 //errors.map((error) => error.path.join(".").concat(": ",