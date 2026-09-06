import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
import router from './routes/todo.routes.js'

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_URL?.replace(/\/$/, '') }))

app.use("/api/todo/", router);
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
        console.log('Database Connection Failed:', error.message);
        process.exit(1);
    }
}

startServer();
