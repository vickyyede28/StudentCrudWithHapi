const controller =  require("../controller/usercontroller")
const Joi = require("joi")


const routes = [
    {
        method:"Get",
        path:"/",
        handler: controller.getstudent,
        options:{
            auth:{
                strategy:"auth"
            }
        }
    },
    {
        method:"Post",
        path:"/insertstudent",
        handler: controller.createstudent,
        options:{
            auth:{
                strategy:"auth"
            },
            validate:{
                payload:Joi.object({
                    name:Joi.string().required().min(5).max(15),
                    email:Joi.string().required().email(),
                    class:Joi.number().strict().required(),
                    age:Joi.number().strict().required(),
                    rollno:Joi.number().strict().required(),
                    hobbies:Joi.array().items(Joi.string()).required()
                }),
                failAction: (request,h,error) =>{
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover()
                }
            }
        }
    },
    // {
    //     method:"GET",
    //     path:"/r",
    //     handler:controller.list
    // },
    {
        method:"get",
        path:"/filter",
        handler:controller.search,
        options:{
            auth:{
                strategy:"auth"
            }
        }
    },
    {
        method:"get",
        path:"/{id}",
        handler:controller.getstudentbyid,
        options:{
            auth:{
                strategy:"auth"
            }
        }
    },
    {
        method:"patch",
        path:"/updateby/{id}",
        handler:controller.updatebyid,
        options:{
            validate:{
                payload:Joi.object({
                    name:Joi.string().required().min(5).max(15),
                    email:Joi.string().required().email(),
                    age:Joi.number().strict().required(),
                    class:Joi.number().strict().required(),
                    rollno:Joi.number().strict().required(),
                    hobbies:Joi.array().items(Joi.string()).required()
                })
            }
        }
    },
    {
        method:"delete",
        path:"/deleteby/{id}",
        handler:controller.deletebyid,
        options:{
            auth:{
                strategy:"auth"
            },
            validate:{
                params:Joi.object({
                    id:Joi.string().required()
                })
            }
        }
    },
    {
        method:"post",
        path:"/register",
        handler:controller.createuser,
        options:{
            validate:{
                payload:Joi.object({
                    name:Joi.string().required(),
                    email:Joi.string().required().email(),
                    password:Joi.string().required(),
                    confirmpassword:Joi.string().required(),
                }),
                failAction: (request,h,error) =>{
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover()
                }
            }
        }
    },
    {
        method:"post",
        path:"/login",
        handler:controller.loginuser,
        options:{
            validate:{
                payload:Joi.object({
                    email:Joi.string().required(),
                    password:Joi.string().required()
                }),
                failAction: (request,h,error) =>{
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover()
                }
            }
        }
    },
    {
        method:"get",
        path:"/logout",
        handler:controller.logoutuser,
        options: {
            auth: {
                strategy: 'auth'
            }
        }
    }
]

module.exports = routes