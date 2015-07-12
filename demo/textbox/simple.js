
/**
 * @file simple TextBox
 * @author shenli (meshenli@gmail.com)
 */
require('./simple.less');
var TextBox = require('../../src/TextBox');

var Item = React.createClass({
    _createList(){
        var ret = [];
        this.props.list.forEach((item)=>{
            ret.push(
                <li>{item}</li>
            );
        });

        return ret;
    },

    render: function() {
        var list = this._createList();
        return (
            <ul>{list}</ul>
        );
    }
});

var Demo = React.createClass({
    getInitialState() {
        return {
            list: []
        };
    },

    handleSelect(value) {
        console.log('handleSelect:', value);
        var list = this.state.list;
        list.push(value);
        this.setState({
            list: list
        });
    },

    handleSubmit(e) {
        e.preventDefault();
    },

    render() {
        return (
            <div>
                <h2>Simple TextBox</h2>
                <form className="ui-form" onSubmit={this.handleSubmit}>
                    <TextBox onSelect={this.handleSelect}/>
                </form>
                <p>
                    <h4>输入的内容：</h4>
                    <Item list={this.state.list}/>
                </p>
            </div>
        );
    }
});

React.render(<Demo/>, document.getElementById('demo'));
