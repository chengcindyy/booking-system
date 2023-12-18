import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    location: {
        type: String,
        required: [true, 'Please enter a location']
    },
    phone: {
        type: Number,
        required: [true, 'Please enter a phone number']
    },
    services: [{
        name: String,
        description: String
    }],
    availableDays: {
        type: [String],
        required: true
    },
    availableHours: {
        type: [String], 
        required: true
    },
    description: String
});

export const Provider = mongoose.model('Provider', providerSchema);
