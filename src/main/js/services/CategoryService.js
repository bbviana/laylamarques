import Service from './Service'
import {xhr} from '../utils'

class CategoryService extends Service {
    list = () => xhr.get('/categories?main=true').then(categories => this.dispatch({categories}))

    find = (id) => xhr.get(`/categories/${id}`).then(category => this.dispatch({category}))

    create = (category) => xhr.post('/categories', category).then(this.list)

    remove(id){

    }

    saveSubCategory = (category, subCategory) =>
        xhr.post(`/categories/${category.id}/subCategories`, subCategory).then(this.list)
}

export default new CategoryService()
