import Service from './Service'
import {api} from '../utils'

class CategoryService extends Service {
    list = () => api.get('/api/categories?main=true').then(categories => this.dispatch({categories}))

    find = (id) => api.get(`/api/categories/${id}`).then(category => this.dispatch({category}))

    create = (category) => api.post('/api/categories', category).then(this.list)

    save = (category) => api.put(`/api/categories/${category.id}`, category).then(this.list)

    remove = (id) => api.delete(`/api/categories/${category.id}`).then(this.list)

    addSubCategory = (category, subCategory) =>
        api.post(`/api/categories/${category.id}/subCategories`, subCategory).then(this.list)
}

export default new CategoryService()
