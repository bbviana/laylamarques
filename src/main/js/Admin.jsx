import React, { PropTypes, Component } from 'react'

class Admin extends Component {
    render = (styles = this.styles) =>
        <div style={styles}>
            <Header />

        </div>

    styles = {
    }
}

class Header extends Component {
    render = () => <div style={this.styles}>lm</div>

    styles = {
        backgroundColor: 'purple',
        color: '#FFF',
        height: 30,
        lineHeight: '30px',
        paddingLeft: 10
    }
}

class CategoriesAdmin extends Component {
    render = (styles = this.styles) =>
        <div style={styles}></div>

    styles = {
    }
}

export default Admin
