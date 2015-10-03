import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import Admin from 'admin/Admin'

if(window.location.search === "?admin"){
    ReactDOM.render(<Admin />, document.getElementById("app"));
} else {
    ReactDOM.render(<App />, document.getElementById("app"));
}
