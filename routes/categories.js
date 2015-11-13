import express, {Router} from 'express'
import Category from '../models/Category'

const router = new Router()
    .get('/', (req, res) => {
        Category.find((err, categories) => {
            err && res.send(err)
            res.json({data: categories, paging: {}})
       })
    })
    .get('/blank', (req, res) => {
        const category = new Category()
        category._id = null
        res.json({data: category})
    })
    .get('/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            err && res.send(err)
            res.json({data: category})
       })
    })
    .post('/', (req, res) => {
        const category = new Category()
        category.name = req.body.name
        category.main = req.body.main

        category.save(err => {
            err && res.send(err)
            res.end()
        })

    })
    .put('/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            err && res.send(err)

            category.name = req.body.name
            category.main = req.body.main

            category.save(err => {
                err && res.send(err)
                res.end()
           })
       })
    })
    .delete('/:id', (req, res) => {
        Category.remove({_id: req.params.id}, (err, category) => {
            err && res.send(err)
            res.end()
       })
    })

export default router
