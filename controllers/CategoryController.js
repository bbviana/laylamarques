import Controller from './Controller'
import {Request} from '../helpers'

class CategoryController extends Controller {
    list = () => Request.get('/api/categories?main=true').then(categories => this.dispatch({categories}))

    find = id => Request.get(`/api/categories/${id}`).then(category => this.dispatch({category}))

    create = category => Request.post('/api/categories', category).then(this.list)

    save = category => Request.put(`/api/categories/${category.id}`, category).then(this.list)

    remove = id => Request.delete(`/api/categories/${category.id}`).then(this.list)

    addSubCategory = (category, subCategory) =>
        Request.post(`/api/categories/${category.id}/subCategories`, subCategory).then(this.list)
}

export default new CategoryController()
