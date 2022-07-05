import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import moongose from 'mongoose'
import adminRouter from './src/routes/admin'

const app = express()
app.use(express.json())
dotenv.config()

//database connection
const ports = {
    hostPort: process.env.PORT,
    mongoDbUrl: process.env.MONGODB_URL,
}
moongose.connect(ports.mongoDbUrl.toString(), (err) => {
    if (err) {
        console.log('Db connection failed')
    } else {
        console.log('Database connected')
    }
})

//middlewares
app.use(helmet())
// app.use(morgan());
app.use(cors())

//endpoints
app.use('/admin', adminRouter)

app.listen(ports.hostPort, () => {
    console.log(`Server is running on port ${ports.hostPort}`)
})
