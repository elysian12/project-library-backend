

const {CustomAPIError}= require('../errors')

const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).send('Something went worng try again later')
}

module.exports = errorHandlerMiddleware;