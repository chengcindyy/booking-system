import express from 'express';
import { Booking }from '../models/Booking.js'; 

const router = express.Router();

// Get booking data
router.get("/getBooking", async (req, res) => {
    try {       
        console.log("Database connected");
        try {
            const bookings = await Booking.find();
            res.send(JSON.stringify(bookings));            
        } catch (error) {
            console.log(`ERROR in finding: ${error}`);
            res.send(`ERROR in finding: ${error}`);
        }
    }catch (error) {
        console.log(`ERROR in finding: ${error}`);
    }
});

// Add Booking
router.post("/addbooking", async (req,res)=>{

    //process the request body
    const {user, location, service, provider, date, time, addons} = req.body;

    const newBooking = new Booking({user, location, service, provider, date, time, addons})
    console.log(req.body);

    try{
        console.log("Database connected");
        try{
            const bookings = await newBooking.save()
            console.log(`Save Successful: ${bookings}`);
            res.send(JSON.stringify(bookings));
        }
        catch(err){
            console.error("Error creating booking:", err);
            res.status(500).json({ message: "Error creating booking" });
        }

    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }


})

// Delete Booking
router.delete("/deletebooking/:id", async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Database connected");
        try {
            const bookings = await Booking.findByIdAndDelete(id);
            res.send(JSON.stringify(bookings));
        } catch (error) {
            console.log(`ERROR in finding: ${error}`);
            res.send(`ERROR in finding: ${error}`);
        }
    } catch (error) {
        console.log(`ERROR in finding: ${error}`);
    }
});

// Update Booking
router.put("/updatebooking/:id", async (req, res) => {
    console.log("Received update request for ID", req.params.id);
    console.log("Request body:", req.body);
    try {
        const {location, service, provider, date, time, addons} = req.body;
        console.log("Database connected");
        try {
            const updatedBooking = await Booking.findByIdAndUpdate(
                req.params.id,
                { location, service, provider, date, time, addons },
                { new: true }
            )
            if (updatedBooking) {
                res.send(updatedBooking);
            } else {
                res.status(404).send("Booking not found");
            }
        } catch (error) {
            console.log(`ERROR in updating: ${error}`);
            res.status(500).send(`ERROR in updating: ${error}`);
        }
    } catch (error) {
        console.log(`ERROR in operation: ${error}`);
        res.status(500).send(`ERROR in operation: ${error}`);
    }
});

export default router;