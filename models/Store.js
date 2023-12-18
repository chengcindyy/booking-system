import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    location: {
        type: String,
        required: [true, 'Please enter a location']
    },
    address: {
        type: String,
        required: [true, 'Please enter an address']
    },
    phone: {
        type: Number,
        required: [true, 'Please enter a phone number']
    },   
    storeImg: {
        type: String,
        required: [false, 'An image is not required']
    },
    services: [{
        name: String,
        description: String
    }],
    addons: [{
        name: String,
        description: String
    }],
    providers: [{
        name: String,
        description: String
    }]
});
export const Store = mongoose.model('Store', storeSchema);