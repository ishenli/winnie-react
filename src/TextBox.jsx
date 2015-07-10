/**
 * @file TextBox
 */

var React = require('react');

class TextBox extends React.Component {

    constructor(props) {
        super(props);
    }

    handleKeyDown(e) {
        var keyCode = e.keyCode;
        var me = this;
        switch (keyCode) {
            case 13: // enter
                me.props.onSelect.call(this, e.target.value);
                break;
            default:

        }

    }

    render() {
        var props = this.props;
        return (
            <input type="text" autoComplete="off" className="ui-input" onKeyDown={this.handleKeyDown.bind(this)}/>
        )
    }
}

TextBox.defaultProps = {

};

module.exports = TextBox;
