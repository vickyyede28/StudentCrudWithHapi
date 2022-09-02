const controller =  require("../controller/usercontroller")
const Joi = require("joi")

const routes = [
    // {
    //     method:"Get",
    //     path:"/",
    //     handler: controller.getcountry
    // },
    {
        method:"Post",
        path:"/insertstudent",
        handler: controller.createstudent,
        options:{
            validate:{
                payload:Joi.object({
                    name:Joi.string().required().min(5).max(15),
                    email:Joi.string().required().email(),
                    // hobbies:Joi.string().required().Joi.array(),
                    // mobileno:Joi.number().required(),
                    // address:Joi.string().required()
                }),
                failAction: (request,h,error) =>{
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover()
                }
            }
        }
    }
    // {
    //     method:"get",
    //     path:"/{id}",
    //     handler:controller.getcountrybyid
    // },
    // {
    //     method:"patch",
    //     path:"/updateby/{id}",
    //     handler:controller.updatebyid,
    //     options:{
    //         validate:{
    //             payload:Joi.object({
    //                 name:Joi.string().required(),
    //                 capital:Joi.string().required(),
    //                 continent:Joi.string().required()
    //             })
    //         }
    //     }
    // }
]

module.exports = routes