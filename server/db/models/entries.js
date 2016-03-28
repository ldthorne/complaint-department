'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    recipient: {
        type: String
    },
    content: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Entry', schema);