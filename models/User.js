import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: [true, 'Please enter your email as your username'],
        validate: [validator.isEmail, 'Please provide a valid username']
    },
    password: {
        type: String,
        required: true,
        select: false, // hide from query results
    },
    phone: String,    
});

userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            if (this.password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }        
            this.password = await bcrypt.hash(this.password, 10);
        }
    } catch (error) {
        next(error);
    }
    next();
});


export const User = mongoose.model('User', userSchema);