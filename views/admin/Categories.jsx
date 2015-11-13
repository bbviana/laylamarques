import React, {Component, PropTypes} from 'react'
import {CategoryController} from '../../controllers'
import Crud from '../components/Crud'
import {Input} from 'react-bootstrap';

class Categories extends Component {
    componentDidMount = () => CategoryController.list()

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome" autoComplete="off"
               name="name" degaultValue={search.name}/>

    listSchema = {
        header: () =>
            <tr>
                <th>Nome</th>
            </tr>,

        body: (category) =>
            <tr>
                <td>{category.name}</td>
            </tr>
    }

    formSchema = (category) =>
        <div>
            <Input type="text" label="Nome" name="name" defaultValue={category.name} autoFocus/>
        </div>

    render = () =>
        <Crud title="Categorias"
              controller={CategoryController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Categories
