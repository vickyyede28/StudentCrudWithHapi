// const { ObjectId } = require("mongodb")
// const db = require("../mongodb/db")

// const ValidateJWT = () =>{
//     return async(decode, request, h) =>{
//         const _id = new ObjectId(decode._id)
//         const user = await db.dbName().collection("users").findOne({_id});
//         // console.log(user);
//         if(!user) return {isValid:false};
//         return {isValid:true, Credential:user}
//     }
// }

// module.exports = ValidateJWT


const {ObjectId} = require("mongodb")
const db  =require("../mongodb/db")

module.exports = ValidateJWT = () =>{
    return async(decode,request,h) =>{
        const _id = new ObjectId(decode._id)
        const user = await db.dbName().collection("users").findOne({_id})
        if(!user) return {isValid:false}
        return {isValid:true, credentials: user};
    }
}