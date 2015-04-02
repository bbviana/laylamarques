var React = require('react');
var App = require('./components/App');
window.ActionCreators = require('./actions/ActionCreators');

React.render(<App root="/laylamarques" history={true}/>, document.getElementById("app"));