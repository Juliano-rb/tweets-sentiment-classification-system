const Tweet = require('../models/Tweet')

module.exports = {
    async retrieve(req,res){
        console.log("retrieve tweet called")

        try {
            filter = { "$or": [{
                            'evals_count':null
                        }, {
                            "evals_count": 0
                        }],
                        flagged : null
                    }
            // get a random document
            const count = await Tweet.countDocuments(filter)
                
            const skip = Math.floor(Math.random() * count) - 1
            const tweet = await Tweet.findOne(filter).sort('evals_count').skip(skip)

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
        console.log(req.body)

        const user_evaluation = req.params.evaluation
        const tweet_id = req.params.id

        const user_password = req.body.pass
        const password = process.env.PASSWORD

        console.log('user:'+user_password)
        console.log('server:'+password)

        if (password && user_password != password){
            return res.json({status:'error', message:`invalid password provided`})
        }


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
    },
    async flag_tweet (req,res) {
        console.log(req.params)

        const tweet_id = req.params.id
        console.log(`flagging tweet ${tweet_id}`)
        const user_password = req.body.pass
        const password = process.env.PASSWORD

        console.log('user_pass:'+user_password)
        console.log('server:'+password)

        if (password && user_password != password){
            return res.json({status:'error', message:`invalid password provided`})
        }

        try {
            const tweet = await Tweet.findById(tweet_id)

            tweet.flagged = true

            await tweet.save()

            return res.json({status:'success', message:`this tweet was successfully flagged`, counts: tweet.sentiments})    
        } catch (error) {
            console.error(error)
            return res.json({status:'error', message:`an error occurred in the server`})
        }
    }
}