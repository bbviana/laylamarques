import React, { PropTypes, Component } from 'react'
import {CategoryService} from '../services'

class CategoryDetails extends Component {
    state = {
        name: null,
        items: []
    }

    componentWillReceiveProps = ({category}) => this.setState(category)

    onChangeName = ({target}) => this.setState({name: target.value})

    render = ({name, items} = this.state) =>
        <div style={s.details}>
            <h2>Cetegoria</h2>

            <input type="text" className="form-control" value={name}
                onChange={this.onChangeName}/>
            <button type="button" className="btn btn-primary">
                Save
            </button>
            <button type="button" className="btn">
                Cancel
            </button>

            <hr/>

            <ItemsArea items={items}/>
        </div>
}

class ItemsArea extends Component {
    render = ({items} = this.props) =>
        <div style={s.items}>
            {items.map((item, i) =>
                <div key={i}>{item.description}</div>
            )}
        </div>
}

const s = {
    details: {},
    items: {}
}

export default CategoryDetails
