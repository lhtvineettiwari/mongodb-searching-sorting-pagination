const mongoose = require("mongoose");
const bcrypt =require('bcryptjs')


const userSchema = mongoose.Schema(
    {   
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        minlength: 8,
        maxlength: 16,
        trim: true,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );



userSchema.pre('save', async function(req, res, next){
    if(!this.isModified('password')){
        next();
    }
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword, this.password)
}
  
const User = mongoose.model('User', userSchema)

module.exports = User;