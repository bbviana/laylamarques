import React, { PropTypes, Component } from 'react'
import {Col, Grid, Row} from 'react-bootstrap'
import {CategoriesTree, CategoryDetails, ItemDetails} from '.'
import {CategoryController} from '../../controllers'

class Admin extends Component {
    state = {
        categories: [],
        category: {}
    }

    componentDidMount = () => {
        CategoryController.listen(this)
        CategoryController.list()
    }

    render = ({categories, category} = this.state) =>
        <div style={s.admin}>
            <Header />
            <Content categories={categories} category={category} />
        </div>
}

const Header = () =>
    <div style={s.header}>
        lm
    </div>

const Content = ({categories, category}) =>
    <Grid fluid>
        <Row>
            <Col md={3}>
                <CategoriesTree categories={categories}/>
            </Col>
            <Col md={5}>
                <CategoryDetails category={category}/>
            </Col>
            <Col md={4}>
                <ItemDetails />
            </Col>
        </Row>
    </Grid>


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
