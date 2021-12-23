const jwt = require('jsonwebtoken')
const {BadRequest} = require('../errors')


const login = (req, res) => {
       const {username,password} = req.body;

       if(!username || !password){
              throw new BadRequest('please provide email and password')

       }
       const id = new Date().getDate()
       const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

       res.status(200).json({msg:'user created successfully',token})
}

const dashBoard = (req, res) => {
      

       res.status(200).json({ msg: `Hello,${req.user.username}` });
       
}

module.exports = {
       login,
       dashBoard
}

