
const {BadRequest,UnauthenticatedError} = require('../errors')
const User = require('../models/user')


const register = async (req,res)=>{
       const user = await User.create({...req.body})
       const token = user.createJWT();
       res.status(201).json({user:{name:user.name},token})
}

const login = async(req, res) =>{
       const {email,password} = req.body;

       if( !email || !password ){
              throw new BadRequest('please provide email and password')
       }
       const user = await User.findOne({email})

       if(!user){
             throw new UnauthenticatedError('Invalid Credentails') 
       }

       const isPasswordCorrect = await user.comparePassword(password)
       if(!isPasswordCorrect){
              throw new UnauthenticatedError('incorrect password') 
        }

       const token = user.createJWT();
       res.status(200).json({user:{name:user.name},token})
        
 
}


module.exports = {
       login,
       register
}

