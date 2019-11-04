
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
    },
    image: {
        type: String,
    },
    likes: {
        type: Number,
        default : 0
    },
    shares: {
        type: String,
        default : 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = FeedModel = mongoose.model('feeds', FeedSchema);