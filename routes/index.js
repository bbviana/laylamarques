import express from 'express'
import categories from './categories'

const router = express.Router()

// middleware to use for all requests
router.use((req, res, next) => {
    console.log('Something is happening.')
    next()
})

router.get('/', (req, res) => {
    res.json({message: 'OK'})
})

export {
    index: router,
    categories: categories
}
