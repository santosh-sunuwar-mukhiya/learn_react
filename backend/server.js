import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send('Hello world!')
    console.log("hello world, I am making full stack todo App.")
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on the port: ${PORT}`)
})