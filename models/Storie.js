const { Schema, model } = require('mongoose');

const StorieSchema = Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,        
    },
    registration_date: {
        type: Date,
        required: true
    },
    urlImages: {
        type: [],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


module.exports = model('Storie', StorieSchema );