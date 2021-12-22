

const CustomAPIError = require('../errors/custom-error')

const errorHandlerMiddleware = (err,eq,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).send('Something went worng try again later')
}

module.exports = errorHandlerMiddleware;