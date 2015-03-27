var React = require('react');

var Menu = require('./Menu');


var MenuBar = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <Menu title="Categorias" items={[
                    {title:'Agile', url:'/touch-library/books/agile'},
                    {title:'CSS', url:'/touch-library/books/agile'},
                    {title:'HTML', url:'/touch-library/books/agile'},
                    {title:'Java', url:'/touch-library/books/agile'},
                    {title:'Javascript', url:'/touch-library/books/agile'}
                ]}/>
                <Menu title="Home" url="/touch-library/"/>
                <Menu title="Novidades" url="/touch-library/news"/>
            </div>
        );
    }
});

var styles = {
    container: {
        color: '#737373',
        background: '#FFFFFF',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
        fontSize: 14,
        height: 48
    }
};

module.exports = MenuBar;
