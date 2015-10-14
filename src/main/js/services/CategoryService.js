import {xhr} from '../utils'

class CategoryService {
    list = () => xhr.get('/categories?main=true')

    find = id => xhr.get(`/categories/${id}`)

    save = (category) => xhr.post('/categories', category)

    remove(id){

    }

    saveSubCategory = (category, subCategory) =>
        xhr.post(`/categories/${category.id}/subCategories`, subCategory)
}

export default new CategoryService()
