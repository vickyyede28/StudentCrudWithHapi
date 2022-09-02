const { MongoClient } = require("mongodb")

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

let db;
const dbname = "storeroom"

const main = async() =>{
    await client.connect();
    db = client.db(dbname)
    console.log("DataBase Connected Successfully");
}

exports.dbconnect = () =>{
    main()
}
exports.dbName = () =>{
    return db
}