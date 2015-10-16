import React, { PropTypes, Component } from 'react'
import {GridRow} from '../bs-components'
import {CategoriesTree, CategoryDetails, ItemDetails} from '.'
import {CategoryService} from '../services'

class Admin extends Component {
    render = () =>
        <div style={s.admin}>
            <Header />
            <Content />
        </div>
}

const Header = () =>
    <div style={s.header}>
        lm
    </div>

class Content extends Component {
    state = {
        category: []
    }

    componentDidMount = () =>
        CategoryService.find(1).then(category => this.setState({category}))


    render = ({category} = this.state) =>
        <div style={s.content} className="container-fluid">
            <GridRow cols={[3, 5, 4]}>
                <CategoriesTree />
                <CategoryDetails category={category}/>
                <ItemDetails />
            </GridRow>
        </div>
}

const s = {
    admin: {},

    header: {
        backgroundColor: 'purple',
        color: '#FFF',
        height: 30,
        lineHeight: '30px',
        marginBottom: 10,
        paddingLeft: 10
    },

    content: {

    }
}

export default Admin
