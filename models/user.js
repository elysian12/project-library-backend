
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        minlength:3,
        maxlength:20,     
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ,'Please provide a valid email'],
        // uique:true,n
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:6,   
    },
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model('User',UserSchema)