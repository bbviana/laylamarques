import {CrudController} from '../helpers'

class CategoryController extends CrudController {
    constructor(){
        super("categories")
    }
}

export default new CategoryController()
