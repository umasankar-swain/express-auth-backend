import mongoose from "mongoose";
import validator from "validator";

//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    location: {
        type: String,
        default: 'Chandigarh'
    }
})

export default mongoose.model('User', userSchema)