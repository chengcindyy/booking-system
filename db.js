import mongoose from 'mongoose';
import { Provider } from './models/Provider.js';
import { Booking } from './models/Booking.js';

// Connet to Mongodb
const url = 'mongodb://localhost:27017/kingfeetDB'; 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error", err));


// // Create a new booking document
// const booking1 = new Booking({
//     user: "5fcf4b2b9b9e4c1c6c1d8e9d",
//     location: "King Feet Massage - Richmond",
//     service: "Reflexology",
//     addons: ["Hot Stone"],
//     provider: "John Smith",
//     date: "2020-12-11",
//     time: "10:00"   
// });

// const addBooking = async () => {

//     try {
//         const saveBooking = await booking1.save();
//         console.log(`Your booking at ${saveBooking.location} was created successfully.`);
//     } catch (err) {
//         console.log("ERROR: ", err.message);
//     }
// }
// addBooking();

// Create a new provider document
const provider1 = new Provider({
    user: "656eea2d555e08db05780e5d",
    name: "John Smith",
    location: "King Feet Massage - Richmond",
    phone: 6041234567,
    services: [{
        name: "Reflexology",
        description: "A foot massage"
    }],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availableHours: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    description: "John Smith is a registered massage therapist with 10 years of experience. He specializes in reflexology and deep tissue massage."
});

const provider2 = new Provider({
    user: "6570f8e9add76965a581228f",
    name: "Jane Doe",
    location: "King Feet Massage - Richmond",
    phone: 6041234567,
    services: [
        {
        name: "Reflexology",
        description: "A foot massage"        
        },
        {
        name: "Acupuncture",
        description: "A foot massage"
        }
    ],
    availableDays: ["Mon", "Tue", "Sat", "Sun"],
    availableHours: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "17:00"],
    description: "Jane Doe is a registered massage therapist with 10 years of experience. She specializes in reflexology and deep tissue massage."
});

const addProvider = async () => {
    try {
        const saveProvider1 = await provider1.save();
        console.log(`Your provider ${saveProvider1.name} was created successfully.`);

        const saveProvider2 = await provider2.save();
        console.log(`Your provider ${saveProvider2.name} was created successfully.`);
    } catch (err) {
        console.log("ERROR: ", err.message);
    }
}
addProvider();
