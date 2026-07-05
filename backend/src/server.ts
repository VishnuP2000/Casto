import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import router from './routes/userRouter'

dotenv.config()

const app=express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

connectDB()
app.use('/user',router)
const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server startedd http://localhost:${port}`)
})