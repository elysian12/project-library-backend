require('dotenv').config()
const express = require('express')
const app = express()

const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

//middleware
app.use('/api/v1',mainRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 3000
const start = async ()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

