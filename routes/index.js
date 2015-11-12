import express, {Router} from 'express'
import categories from './categories'

const index = new Router()
    .get('/', (req, res) => {
        res.json({message: 'OK'})
    })

export {
    index,
    categories
}
