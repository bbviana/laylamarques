var React = require('react');
var PropTypes = React.PropTypes;
var assign = require('object-assign');

var ActionCreators = require('app/actions/ActionCreators');
var Col = require('app/components/Col');
var Icon = require('app/components/Icon');
var Row = require('app/components/Row');
var Styles = require('app/Styles');
var invariant = require('app/invariant');

var Cover = require('./Cover');
var DateField = require('./DateField');
var Field = require('./Field');
var FileUpload = require('./FileUpload');
var Form = require('./Form');
var TextField = require('./TextField');
var TextAreaField = require('./TextAreaField');


var BookForm = React.createClass({
    propTypes: {
        title: PropTypes.string,
        category: PropTypes.string,
        author: PropTypes.string,
        publisher: PropTypes.string,
        datePublished: PropTypes.string,
        description: PropTypes.string,
        cover: PropTypes.object,
        files: PropTypes.arrayOf(PropTypes.object),

        onSave: PropTypes.func.isRequired
    },

    _upload: function (name, e) {
        var target = e.target;
        ActionCreators.uploadFile(name, target.files[0]);
    },
    _addFile: function () {
        ActionCreators.addFile();
    },
    _removeFile: function (index) {
        ActionCreators.removeFile(index);
    },
    _onChange: function (e) {
        var target = e.target;
        invariant(target.name, "Elemento %s não possui 'name' especificado", target);

        var partialBook = {};
        partialBook[target.name] = target.value;

        ActionCreators.changeBook(partialBook);
    },
    _onSave: function (e) {
        e.preventDefault(); // cancel form submit
        this.props.onSave();
    },

    render: function () {
        console.log("BookForm:render");

        return (
            <Form style={_.container} onSubmit={this._onSave}>
                <Row>
                    <Col size={6}>
                        <TextField label="Título" name="title" value={this.props.title} placeHolder="Título" onChange={this._onChange} />

                        <TextField label="Categoria" name="category" value={this.props.category} placeHolder="Java, Javacript, Scrum etc" onChange={this._onChange} />

                        <TextField label="Autor" name="author" value={this.props.author} placeHolder="Autor" onChange={this._onChange} />

                        <TextField label="Editora" name="publisher" value={this.props.publisher} placeHolder="Editora" onChange={this._onChange} />

                        <DateField label="Data de Publicação" name="datePublished" value={this.props.datePublished} onChange={this._onChange} />
                    </Col>

                    <Col size={6}>
                        <TextAreaField label="Descrição"  name="description" value={this.props.description} placeHolder="Descrição" onChange={this._onChange} />

                        <Field label="Capa">
                            <div>
                                <Cover
                                    onChange={this._upload.bind(this, "cover")}
                                    file={this.props.cover}
                                />
                            </div>
                        </Field>

                        <Field label="Arquivos">
                            {this.props.files.map(function (file, i) {
                                return (
                                    <div key={i}>
                                        <FileUpload
                                            onChange={this._upload.bind(this, "files." + i)}
                                            file={file}/>

                                        <a style={_.link} onClick={this._removeFile.bind(this, i)}>
                                            <Icon name="remove" />
                                        </a>
                                    </div>
                                );
                            }, this)}

                            <div>
                                <a style={_.link} onClick={this._addFile}>Adicionar</a>
                            </div>
                        </Field>
                    </Col>
                </Row>

                <input type="submit" />
            </Form>
        );
    }
});

var _ = assign({
    container: {
        margin: 26
    }
}, Styles);

module.exports = BookForm;