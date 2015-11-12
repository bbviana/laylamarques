import express, {Router} from 'express'
import Category from '../models/Category'

const router = new Router()
    .get('/', (req, res) => {
        Category.find((err, categories) => {
            err && res.send(err)
            res.json({data: categories, paging: {}})
       })
    })
    .get('/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            err && res.send(err)
            res.json({data: category})
       })
    })
    .put('/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            err && res.send(err)

            category.name = req.body.name
            category.main = req.body.main

            category.save(err => {
                err && res.send(err)
                res.json({ message: `Category ${req.params.id} updated!`})
           })
       })
    })
    .post('/', (req, res) => {
        const category = new Category()
        category.name = req.body.name
        category.main = req.body.main

        category.save(err => {
            err && res.send(err)
            res.json({ message: 'category created!' })
        })
    })
    .delete('/:id', (req, res) => {
        Category.remove({_id: req.params.id}, (err, category) => {
            err && res.send(err)
            res.json({ message: `Category ${req.params.id} deleted!` })
       })
    })

export default router
