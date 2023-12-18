import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    location: {
        type:String,
        required: [true, 'Please select a location']
    },
    service: {
        type:String,
        required: [true, 'Please select a service']
    },    
    provider: {
        type: String,
        required: [false, 'An provider is not required']
    },
    date: {
        type: Date,
        required: [true, 'Please select a date']
    },
    time: {
        type: String,
        required: [true, 'Please select a time']
    },
    addons: [String]   
});
export const Booking = mongoose.model('Booking', bookingSchema);