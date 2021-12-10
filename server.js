const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
//const db = require('./app/models')
const port = 8080

var morgan = require('morgan')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.json({ info: 'NodeJS Express Portalz API' })
})

// Routes
//app.use('/', require('./app/routes/routes'))

app.listen(port, () => {
    console.log(process.env.DB_URL)
    console.log('API running on port ' + port + '.')
})