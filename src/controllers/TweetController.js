const Tweet = require('../models/Tweet')

module.exports = {
    async retrieve(req,res){
        console.log("retrieve tweet called")

        const user_password = req.body.pass
        const password = process.env.PASSWORD

        if (password && user_password != password){
            return res.json({status:'error', message:`invalid password provided`})
        }

        try {
            // get a random document index
            // const count = await Tweet.countDocuments()
            // const randomTweet = Math.floor(Math.random() * count)
            const tweet = await Tweet.findOne().sort('evals_count')

            if (tweet == null){
                return res.json({status:'error', message:`couldn't fetch tweets, database seems empty`})
            }
    
            return res.json({status:'success', tweet: tweet})
        } catch (error) {
            console.error(error)
            return res.json({status:'error', message:`an error occurred in the server`})
        }

    },
    async evaluate (req,res) {
        console.log(req.params)
        const user_evaluation = req.params.evaluation
        const tweet_id = req.params.id

        if ( !['neutral','positive','negative'].includes(user_evaluation) ) {
            return res.json({status:'error', message:'invalid evaluation string'})
        }

        try {
            const tweet = await Tweet.findById(tweet_id)
            
            tweet.sentiments[user_evaluation] += 1
            tweet.evals_count += 1
            await tweet.save()

            return res.json({status:'success', message:`evaluation has been saved`, counts: tweet.sentiments})    
        } catch (error) {
            console.error(error)
            return res.json({status:'error', message:`an error occurred in the server`})
        }
    }
}