import {Request} from '../helpers'

class BackgroundController {
    list = () => Request.get('bg-images')

    find(id){

    }

    save(category){

    }

    remove(id){

    }
}

export default new BackgroundController()
