import React, { PropTypes, Component } from 'react'
import {GridRow} from '../bs-components'
import {CategoriesTree, CategoryAdmin, ItemAdmin} from '.'

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

const Content = () =>
    <div style={s.content} className="container-fluid">
        <GridRow cols={[3, 5, 4]}>
            <CategoriesTree />
            <CategoryAdmin />
            <ItemAdmin />
        </GridRow>
    </div>

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
