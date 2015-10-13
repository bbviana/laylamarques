import {xhr} from 'utils'

class CategoryService {
    list = () => xhr.get('categories')

    find(id){

    }

    save = (category) => xhr.post('categories', {category})

    remove(id){

    }
}

export default new CategoryService()
