import express, {Router} from 'express'
import Category from '../models/Category'

const router = new Router()
    .get('/', (req, res) => { // list
        Category
        .find( {name: new RegExp(req.query.name, 'i')} )
        .populate('parent', 'name')
        .exec((err, categories) => {
            err && res.send(err)
            res.json({data: categories, paging: {}})
       })
    })
    .get('/blank', (req, res) => { //  blank
        const category = new Category()
        category._id = null

        const associations = {}

        Category.find((err, categories) => {
            associations.categories = categories

            res.json({
                data: category,
                associations: associations
            })
        })
    })
    .get('/:id', (req, res) => { // load
        Category
        .findById(req.params.id)
        .populate('parent', 'name')
        .exec((err, category) => {
            err && res.send(err)

            const associations = {}

            Category.find((err, categories) => {
                associations.categories = categories

                res.json({
                    data: category,
                    associations: associations
                })
            })
       })
    })
    .post('/', (req, res) => { // create
        const category = new Category()
        category.name = req.body.name
        category.parent = req.body.parent &&  req.body.parent._id
        category.main = true

        console.log(category);

        category.save(err => {
            err && res.send(err)
            res.end()
        })

    })
    .put('/:id', (req, res) => { // update
        Category.findById(req.params.id, (err, category) => {
            err && res.send(err)

            category.name = req.body.name
            category.parent = req.body.parent &&  req.body.parent._id
            category.main = req.body.main

            category.save(err => {
                err && res.send(err)
                res.end()
           })
       })
    })
    .delete('/:id', (req, res) => { // delete
        Category.remove({_id: req.params.id}, (err, category) => {
            err && res.send(err)
            res.end()
       })
    })

export default router
