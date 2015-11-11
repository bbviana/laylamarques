import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import {index, categories} from './routes'

mongoose.connect('mongodb://localhost/laylamarques')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

// Routes
app.use('/api', index)
app.use('/api/categories', categories)

app.listen(8000)
