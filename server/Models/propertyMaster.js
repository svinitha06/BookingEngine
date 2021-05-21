const mongoose = require('mongoose');

const propertyMasterSchema = new mongoose.Schema({

    PropertyId: {
        type: Number,
        required: false
    },

    name: {
        type: String,
        required: false
    },

    Image: {
        type: Array,
        required: false
    },

    location: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    // logo: {
    //     type: String,
    //     required: false
    // },

    ratings: {
        type: String,
        required: false

    },

    website: {
        type: String,
        required: false

    },

    contact: {
        type: String,
        required: false
    },

    Address: {
        type: String,
        required: false
    }
})



module.exports = propertyMaster = mongoose.model('propertyMaster', propertyMasterSchema);