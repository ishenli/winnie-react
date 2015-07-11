/**
 * @file TextBox
 */

var React = require('react');
var noop = function () {
}
var KeyCode = require('./KeyCode');

class TextBox extends React.Component {

    constructor(props) {
        super(props);
    }

    handleKeyDown(e) {
        var keyCode = e.keyCode;
        var me = this;
        switch (keyCode) {
            case KeyCode.ENTER:
                me.props.onSelect(e.target.value);
                break;
            default:
                me.props.onKeyPress(e);
                break;
        }

    }

    render() {
        var props = this.props;
        return (
            <input type="text" autoComplete="off" className="ui-input"
                 onKeyDown={this.handleKeyDown.bind(this)} onChange={this.props.onChange}/>
        );
    }
}

TextBox.defaultProps = {
    onSelect: noop,
    onChange: noop,
    onKeyPress: noop
};

module.exports = TextBox;
