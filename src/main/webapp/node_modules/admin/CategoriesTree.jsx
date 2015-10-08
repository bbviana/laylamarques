import React, { PropTypes, Component } from 'react'
import {list, save} from 'services/CategoryService'
const assign = Object.assign

class CategoriesTree extends Component {
    state = { categories: [] }

    componentDidMount = () =>
        list().then(data => this.setState({categories: data}))

    addCategory = (category) => {
        // save(category).then(
        //     list().then(data => this.setState({categories: data}))
        // )

        this.state.categories.push(category)
        this.setState({categories: this.state.categories})
    }

    addSubCategory = (category, subCategory) => {
        category.children.push(subCategory)
        this.setState({categories: this.state.categories})
    }

    render = ({categories} = this.state) =>
        <div style={s.tree}>
            {categories.map((category, i) =>
                <CategoryNode key={i}
                    category={category}
                    addSubCategory={this.addSubCategory.bind(this, category)} />
            )}

            <AddSection onSave={this.addCategory}/>
        </div>
}

const Card = ({style, title, onClick}) =>
    <div style={assign({}, s.card, style)} onClick={onClick}>
        {title}
    </div>


const CategoryNode = ({category, addSubCategory}) =>
    <div style={s.categoryNode}>
        <Card title={category.name} style={s.categoryCard}/>

        {category.children.map((subCategory, i) =>
            <Card title={subCategory.name} key={i}/>
        )}

        <AddSection onSave={addSubCategory}/>
    </div>

class AddSection extends Component {
    state = { formMode: false }

    gotoFormMode = () => this.setState({formMode: true})
    leaveFormMode = () => this.setState({formMode: false})

    render = ({onSave} = this.props, {formMode} = this.state) =>
        <div>
            {formMode ?
                <AddForm onSave={onSave} onCancel={this.leaveFormMode}/>:
                <Card title="+" onClick={this.gotoFormMode}/>
            }
        </div>
}

class AddForm extends Component {
    onSave = () => {
        this.props.onSave({
            name: this.refs.category.value,
            children: []
        })
        this.props.onCancel()
    }

    render = ({onCancel} = this.props) =>
        <div style={s.form}>
            <input ref="category" type="text" className="form-control" autoFocus={true}/>

            <button type="button" className="btn btn-primary" onClick={this.onSave}>
                Save
            </button>
            <button type="button" className="btn" onClick={onCancel}>
                Cancel
            </button>
        </div>
}


const s = {
    tree: {},

    categoryNode: {
        marginBottom: 20
    },

    card: {
        border: '1px solid #666',
        cursor: 'pointer',
        height: 30,
        lineHeight: '30px',
        marginBottom: -1,
        textAlign: 'center'
    },

    categoryCard: {
        background: '#EAEAEA'
    },

    form: {}
}

export default CategoriesTree
