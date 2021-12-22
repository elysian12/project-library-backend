const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


const login = (req, res) => {
       const {username,password} = req.body;

       if(!username || !password){
              throw new CustomAPIError('please provide email and password',400)

       }
       const id = new Date().getDate()
       const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

       console.log(username,password);
       res.status(200).json({msg:'user created successfully',token})
}

const dashBoard = (req, res) => {
       const authHeader = req.headers.authorization

       if(!authHeader || !authHeader.startsWith('Bearer ')){
              throw new CustomAPIError('No token provided',401)
       }

       const token = authHeader.split(' ')[1]

       try {
              const decoded = jwt.verify(token,process.env.JWT_SECRET)
              res.status(200).json({ msg: `Hello,${decoded.username}` });
       } catch (error) {
              throw new CustomAPIError('Not authorized to access this route',401)
       }

}

module.exports = {
       login,
       dashBoard
}

