import React from 'react'
import ReactDOM from 'react-dom'
// import {App} from './site'
// import {Admin} from './admin'
import Categories from './admin/Categories'

ReactDOM.render(<Categories />, document.getElementById("app"));

// if(window.location.search === "?admin"){
//     ReactDOM.render(<Admin />, document.getElementById("app"));
// } else {
//     ReactDOM.render(<App />, document.getElementById("app"));
// }
