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
})

const startServer = async () => {
    try {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`)
})
        
    } catch (error) {
        console.log('Database Connection Failed:', err.message);
        process.exit(1);
    }
}

startServer();
