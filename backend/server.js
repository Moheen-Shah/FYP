const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config()



const app = require("./app")

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true
 }).then((conn)=>{
    
     console.log("db is connected");
 })
 
 const port = process.env.PORT || 3000;
 
  const server = app.listen(port,()=>{
     console.log('server has started...')
  })


