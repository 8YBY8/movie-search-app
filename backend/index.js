// database code 
// mongodb+srv://yubingyang9:13706854306Yu@cluster0.itvqll5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

import app from "./server.js"
import mongodb from "mongodb"
import ReviewDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
// const mongo_username = process.env["MONGODB_USERNAME"]
// console.log(mongo_username)
// const mongo_password = process.env["MONGODB_PASSWORD"]
// console.log(mongo_password)
// const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.itvqll5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const uri = `mongodb+srv://yubingyang9:13706854306Yu@cluster0.itvqll5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// mongodb+srv://yubingyang9:<password>@cluster0.itvqll5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const port = 8000

console.log("connecting " + uri)
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        // useNewUrlParser: true
    })
    // catch any error happens when you connect
    .catch(err => {
        console.error(err.stack)
        process.exit(1) // ending the program
    })
    .then(async client => {
        await ReviewDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })