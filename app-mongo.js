import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/laylamarques')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

// Routes
import routes from './routes/index'
import categories from './routes/categories'

app.use('/api', routes)
app.use('/api/categories', categories)

app.listen(8000)
