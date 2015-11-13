import React, {Component, PropTypes} from 'react'
import {CategoryController} from '../../controllers'
import Crud from '../components/Crud'
import {Input} from 'react-bootstrap';

import {id, ids, handleAssociationChange} from '../../helpers/Associations'

class Categories extends Component {
    componentDidMount = () => CategoryController.list()

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome" autoComplete="off"
               name="name" degaultValue={search.name}/>

    listSchema = {
        header: () =>
            <tr>
                <th>Nome</th>
                <th>Principal?</th>
            </tr>,

        body: (category) =>
            <tr>
                <td>{category.name}</td>
                <td>{category.parent && category.parent.name}</td>
                <td>{category.main?'Sim':'Não'}</td>
            </tr>
    }

    formSchema = (category,  {categories = []}) =>
        <div>
            <Input type="text" label="Nome" name="name" defaultValue={category.name} autoFocus/>

            <Input type="select" label="Pai" name="parent" defaultValue={id(category.parent)} onChange={handleAssociationChange}>
	            <option value="">Selecione...</option>
	            {categories.map((element, i) =>
	                <option key={i} value={element._id}>{element.name}</option>
	            )}
            </Input>
        </div>

    render = () =>
        <Crud title="Categoria"
              controller={CategoryController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Categories
