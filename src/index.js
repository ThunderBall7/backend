import connectDB from './db/index.js'
import dotenv from 'dotenv';
import { app } from './app.js'
dotenv.config({
  path: "./env"
})


connectDB()
.then(()=>{
  app.listen(process.env.PORT || 6000, ()=>{
    console.log(`server listening on ${process.env.PORT || 8000}`);
  })
})
.catch((err)=>{console.error('mongoDb connection fail');});