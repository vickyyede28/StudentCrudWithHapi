'use strict'

const Hapi = require("@hapi/hapi")

const db = require("./mongodb/db")
const ValidateJWT = require("./middleware/auth")
const routes  = require("./router/router")

const init =  async() =>{
    const server = Hapi.server({
        port: 8181,
        host:"localhost"
    })
    await server.register(require("hapi-auth-jwt2"))
    await server.auth.strategy("auth","jwt",{
        key:"CrudOperationWithAuthenticationUsingJsonWebTokenInHapiJs",
        validate:ValidateJWT()
    });
    await server.route(routes);
    await db.dbconnect()
    await server.start()
    console.log('Server running on %s', server.info.uri);
}

// process.on("unhandledRejection", (err) =>{
//     console.log(err);
//     process.exit(1)
// })

init()