import express from 'express';
import { Provider } from '../models/Provider.js';

const router = express.Router();

// Get provider data
router.get("/getProvider", async (req, res) => {
    try {       
        console.log("Database connected");
        try {
            const providers = await Provider.find();
            res.send(JSON.stringify(providers));            
        } catch (error) {
            console.log(`ERROR in finding: ${error}`);
            res.send(`ERROR in finding: ${error}`);
        }
    }catch (error) {
        console.log(`ERROR in finding: ${error}`);
    }
});

export default router;