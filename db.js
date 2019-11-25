const dotenv = require('dotenv')
dotenv.config()
const mongodb = require('mongodb')

mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client ){
    if(err){
        console.log('Could not connect to database!')
    } else {
        module.exports = client
        const app = require('./app')
        console.log(`listening at port ${process.env.PORT}`)
        app.listen(process.env.PORT)
    }
})