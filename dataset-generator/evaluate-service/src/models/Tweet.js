const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    post_id : String,
    url: String,
    text: String,
    subject: String,
    flagged: Boolean,
    sentiments:{
        negative: 
        {
            type: Number,
            default:0
        },
        neutral: 
        {
            type: Number,
            default:0
        },
        positive: 
        {
            type: Number,
            default:0
        }
    },
    evals_count: {
        type: Number,
        default:0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Tweet', TweetSchema);