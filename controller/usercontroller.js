const { ObjectId } = require("mongodb")
const db = require("../mongodb/db")
const bcrypt = require('bcrypt');
const jwt  = require("jsonwebtoken");
const moment = require("moment");

const createstudent = async(request,h) =>{
    try {
         await db.dbName().collection("student").insertOne(request.payload)
         return ({success:"Data Inserted Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

const getstudent = async(request,h) =>{
    try {
        return await db.dbName().collection("student").find({}).toArray()
    } catch (error) {
        console.log(error.message);
    }
}
const search =  async(request,h) =>{
    const className = parseInt(request.query.class);
    const agename = parseInt(request.query.age)
    return await db.dbName().collection("student").find({
        age:agename,class:className,
        $or: [ { name:agename }, {class:className } ]
    }).toArray();
}



// const getstudentsearched = async(request,h)=>{
//       try {
//         return await db.dbName().collection("student").find(request.params.name)
        
//       } catch (error) {
//         console.log(error.message);
//       }
// }

// const list = async(request,h) =>{
//     const query = {}
//     return await db.dbName().collection("student").find(request.params) 
// }

const getstudentbyid = async(request,h) =>{
    try {
        const _id = new ObjectId(request.params.id)
        return await db.dbName().collection("student").findOne(_id)
    } catch (error) {
        console.log(error.message);
    }
}

const updatebyid = async(request,h) =>{
    try {
        const _id = new ObjectId(request.params.id)
        await db.dbName().collection("student").updateOne({_id},{$set:request.payload})
        return h.response({success:"Country Updated Successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

const deletebyid =  async(request,h) =>{
    try {
        const _id = new ObjectId(request.params.id)
        return await db.dbName().collection("student").deleteOne({_id})
    } catch (error) {
       console.log(error.message); 
    }
}

const createuser = async(request,h) =>{
    try {
        const {name, email, password, confirmpassword} = request.payload
        if (password !== confirmpassword){
        return h.response("Confirmpassword & Password are not match")
        } else {
            const user = await db.dbName().collection("users").findOne({email})
            if (user) return h.response("User already Exist")
            hashpassword = await bcrypt.hash(password,10);
            await db.dbName().collection("users").insertOne({name,email,password:hashpassword});
            return h.response({Success: "User Created Successfully"})    
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loginuser = async(request,h) =>{
    try {
        const {email,password} = request.payload;
        const currentDate = moment().format("MM/DD/YYYY HH:mm:ss") 
        const user =  await db.dbName().collection("users").findOne({email})
        // console.log(user);
        if(!user) return h.response({error:"User Not Register"})
        const data = await bcrypt.compare(password,user.password);
        if(!data) return h.response ({error:"Invalid Credential"});
        if(user.lastlogin == null) return h.response({ error: "Logout First"});
        const token = await jwt.sign({_id:user._id},"CrudOperationWithAuthenticationUsingJsonWebTokenInHapiJs",)
        await db.dbName().collection("users").updateOne({_id:user._id},{$set: { token: token, lastlogin: currentDate}})
        return h.response({success:"User Login Successfully",token})
    } catch (error) {
        console.log(error.message);
    }
}

const logoutuser = async({auth},request,h) =>{
    try {
        const user = auth.credentials;
        // const lastlogin = '';
        await db.dbName().collection("users").updateOne({_id: user._id},{ $unset: {token:1, lastlogin: 1}});
        return  {Success:"You have Logged OUT"}
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createstudent,
    getstudent,
    search,
    getstudentbyid,
    updatebyid,
    deletebyid,
    createuser,
    loginuser,
    logoutuser
}