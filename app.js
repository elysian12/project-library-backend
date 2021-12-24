require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()

//connectDB
const connectDB = require('./db/connect')


//routers
const authRouter = require('./routes/auth')



//errorHandler
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

//middleware
app.use('/api/v1/auth',authRouter)
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)



const port = process.env.PORT || 3000
const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()