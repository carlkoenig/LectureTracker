const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise

mongoose.set('runValidators', true);

exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.mongoose, {useNewUrlParser: true, useUnifiedTopology: true}, null);

        const connection = mongoose.connection

        connection.on('error', reject)
        connection.once('open', resolve)
    })
}
