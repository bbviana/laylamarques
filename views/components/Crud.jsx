import React, {Component, PropTypes} from 'react'
import {Button, Col, Glyphicon, Input, MenuItem, Modal, Navbar, NavBrand, Pagination, Row, Table} from 'react-bootstrap'
import {Form} from '.'

class Crud extends Component {
    constructor(props){
        super(props)
        this.state = props.controller.state
    }

    // escuta alterações do state do controller e redesenha a tela
    componentDidMount = () => this.props.controller.listen(this)
    componentWillUnmount = () => this.props.controller.unlisten(this)

    render = ({controller, searchSchema, listSchema, formSchema, title} = this.props) =>
        <div style={styles.app}>
            <Header />

            <Content>
                <SearchSection controller={controller}
                               schema={searchSchema}
                               data={this.state.search}/>

                <ListSection controller={controller}
                             schema={listSchema}
                             list={this.state.list}
                             currentPage={this.state.currentPage}
                             totalPages={this.state.totalPages}
                             pageSize={this.state.pageSize}/>

                <NewButton controller={controller} />
            </Content>

            <FormSection controller={controller}
                         schema={formSchema}
                         show={this.state.showForm}
                         data={this.state.form}
                         associations={this.state.formAssociations}
                         title={title}/>
        </div>
}

const Header = () =>
    <Navbar fixedTop fluid inverse>
        <NavBrand>
            <a href="/">Layla Marques</a>
        </NavBrand>
    </Navbar>


const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>


const SearchSection = ({controller, schema, data}) =>
    <Form onChange={controller.changeSearch} onSubmit={controller.list}>
        <Row>
            <Col md={4}>{schema(data)}</Col>
            <Col md={1}>
                <SearchButton />
            </Col>
        </Row>
    </Form>

const ListSection = ({controller, schema, list, currentPage, totalPages, pageSize}) =>
    <div>
        <Table striped hover>
            <thead>
                <tr>
                    {schema.header().props.children}
                    <th style={styles.actions}></th>
                </tr>
            </thead>
            <tbody>
            {list.map((element, i) =>
                <tr key={i}>
                    {schema.body(element).props.children}
                    <td>
                        <EditButton controller={controller} id={element._id} />
                        <RemoveButton controller={controller} id={element._id} />
                    </td>
                </tr>
            )}
            </tbody>
        </Table>

        <div>
            <Pagination style={styles.pagination}
                        items={totalPages}
                        activePage={currentPage}
                        onSelect={(event, {eventKey}) => controller.list({page: eventKey})}/>

            <PageSize controller={controller} pageSize={pageSize}/>
        </div>
    </div>

const PageSize = ({controller, pageSize}) =>
    <select style={styles.pageSize} className="form-control"
            value={pageSize}
            onChange={({target}) => controller.list({pageSize: target.value})}>
        <option value="5" >5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
    </select>

const FormSection = ({controller, schema, data, associations, show, title}) =>
    <Modal show={show} onHide={controller.closeForm}>
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Form onChange={controller.changeForm} onSubmit={controller.save}>
            <Modal.Body>
                {schema(data, associations)}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={controller.closeForm}>Cancelar</Button>
                <Button bsStyle="primary" type="submit">Salvar</Button>
            </Modal.Footer>
        </Form>
    </Modal>


// Buttons

const SearchButton = () =>
    <Button bsStyle="primary" type="submit">
        <Glyphicon glyph="search"/> Buscar
    </Button>

const NewButton = ({controller}) =>
    <Button style={styles.newButton} bsStyle="primary" onClick={() => controller.blank()}>
        <Glyphicon glyph="plus-sign"/> Novo
    </Button>

const EditButton = ({controller, id}) =>
    <Button bsStyle="link" onClick={() => controller.load(id)}>
        <Glyphicon glyph="edit"/>
    </Button>

const RemoveButton = ({controller, id}) =>
    <Button bsStyle="link" onClick={() => controller.remove(id)}>
        <Glyphicon glyph="trash" />
    </Button>


const styles = {
    actions: {
        width: 200
    },

    app: {
        paddingTop: 50
    },

    content: {
        padding: 20
    },

    pagination: {
        float: 'right'
    },

    pageSize: {
        float: 'right',
        margin: 20,
        width: 80
    },

    newButton: {
        margin: 20
    }
}

export default Crud
