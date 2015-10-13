import React, {Component, PropTypes} from 'react'

class AddressSection extends Component {
    render = (style = this.styles) =>
        <div style={style}>
            Rua Jeroaquara, 406 <br />
            Vila Romana <br />
            São Paulo - SP <br />
            (11) 99410-9856 <br />
        </div>

    styles = {
        background: '#FFF',
        fontSize: '0.9em',
        padding: 10
    }
}

export default AddressSection
