const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        pseudo: {
            type: String,
        },
        message: {
            type: String,
            trim: true,
            maxlenght: 500,
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        likers: {
            type: [String],
            required: true,
        },
        comments: {
            type: [
                {
                    commenderId: String,
                    commenderPseudo: String,
                    text: String,
                    timestamp: Number,

                }
            ],
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', PostSchema);