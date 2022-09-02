const { ObjectId } = require("mongodb")
const db = require("../mongodb/db")

const createstudent = async(request,h) =>{
     await db.dbName().collection("student").insertOne(request.payload)
     return ({success:"Data Inserted Successfully"})
}
const getstudent = async(request,h) =>{
    return await db.dbName().collection("student").find().toArray()
}
const getstudentbyid = async(request,h) =>{
    const _id = new ObjectId(request.params.id)
    return await db.dbName().collection("student").findOne(_id)
}
const updatebyid = async(request,h) =>{
    const _id = new ObjectId(request.params.id)
    await db.dbName().collection("student").updateOne({_id},{$set:request.payload})
    return h.response({success:"Country Updated Successfully"})
}

module.exports = {
    createstudent,
    getstudent,
    getstudentbyid,
    updatebyid
}