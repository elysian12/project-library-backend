const jwt = require('jsonwebtoken')
const {BadRequest,CustomAPIError,UnauthenticatedError} = require('../errors')
const User = require('../models/user')

const register = async (req,res)=>{
       
       const user = await User.create({...req.body})
       res.status(201).json(user)
}

const login = (req, res) => {
       const {username,password} = req.body;

       if(!username || !password){
              throw new BadRequest('please provide email and password')

       }
       const id = new Date().getDate()
       const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

       res.status(200).json({msg:'user created successfully',token})
}


module.exports = {
       login,
       register
}

