import mongoose from 'mongoose';
const { Schema, model } = mongoose;




const userSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name is required'],
        minlength: 3,
        maxlength: 50,
        alias : "userName"
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
      },
      role: {
        type: String,
        enum: ['admin', 'manager', 'developer', 'tester'],
        default: 'developer'
      }
}, { timestamps: true });



const User = model('User', userSchema);


export {User} ; 