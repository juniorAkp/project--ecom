const cors = require('cors')
const corsConfig = require('./allowedOrigins')

const corsOptions = {
    origin: function( origin, callback){
        if(corsConfig.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback( new Error('not allowed by cors'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions