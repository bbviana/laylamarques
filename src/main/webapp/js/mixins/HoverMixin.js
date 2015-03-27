/**
 * Simula o ":hover" do css alterando a cor do componente no evento onMouseOver e retornando ao estado inicial
 * no onMouseOut.
 *
 * @param hoverColor
 */
var HoverMixin = function (hoverColor) {
    return {
        // TODO verificar o quanto isso impacta no processador; comparar com :hover do css
        componentDidMount: function () {
            var originalBGColor = this.getDOMNode().style.backgroundColor;

            this.getDOMNode().addEventListener('mouseover', this._onMouseOver);
            this.getDOMNode().addEventListener('mouseout', this._onMouseOut.bind(this, originalBGColor));
        },
        componentWillUnmount: function () {
            this.getDOMNode().removeEventListener('mouseover', this._onMouseOver);
            this.getDOMNode().removeEventListener('mouseout', this._onMouseOut);
        },

        _onMouseOver: function () {
            this.getDOMNode().style.backgroundColor = hoverColor;
        },
        _onMouseOut: function (originalBGColor) {
            this.getDOMNode().style.backgroundColor = originalBGColor;
        }
    }
};

module.exports = HoverMixin;