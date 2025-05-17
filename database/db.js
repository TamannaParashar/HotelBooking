require('dotenv').config()
const {Client} = require('pg')
const con = new Client({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE
})
con.connect().then(()=>console.log("Connected to hotel database"))
module.exports=con