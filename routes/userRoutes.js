import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Add User
router.post("/signup-user", async (req,res)=>{

    //process the request body
    const {firstName, lastName, username, password, phone} = req.body;

    const newUser = new User({firstName, lastName, username, password, phone})

    try{
        console.log("Database connected");
        try{
            const users = await newUser.save()
            console.log(`Save Successful: ${users}`);
            res.send(JSON.stringify(users));
        }
        catch(err){
            console.error("Error creating user:", err);
            res.status(500).json({ message: "Error creating user" });
        }

    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }
});

// Login User
router.post("/login-user", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username: username }).select('+password');

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                console.log("Login Successful");                
                res.json({ username: user.username, _id: user._id });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Error logging in user" });
    }
});


export default router;