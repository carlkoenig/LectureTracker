const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('./datasource/mongodb')

const config = require('./config')
const user = require('./endpoints/user/routes')
const dbr = require('./middleware/debugger')

const app = express();

// middleware
app.use(dbr)
app.use(bodyParser.urlencoded({ extended: true }))

// endpoints
app.use('/user', user)

start = async () => {
    await mongodb.connect()
    console.log('Connected to database')
    app.listen(config.port, () => {
        console.log(`Listening on port: ${config.port}`)
    })
}
start()
