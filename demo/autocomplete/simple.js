
/**
 * @file simple AutoComplete
 * @author shenli (meshenli@gmail.com)
 */


require('./simple.less');

var AutoComplete = require('../../src/AutoComplete');

var Demo = React.createClass({

    dataSource(value) {
        var list = [];
        for (var i = 0; i < 5; i++) {
            list.push({
                key:i,
                value:'value' + i
            })
        }
        return list;
    },
    handleSubmit(e) {
        e.preventDefault();
    },

    handleSelect: function(value) {
        console.log(value);
    },
    
    render() {
        return (
            <div>
                <h2>Simple AutoComplete</h2>
                <form className="ui-form" onSubmit={this.handleSubmit}>
                    <AutoComplete dataSource={this.dataSource} onSelect={this.handleSelect}>
                    </AutoComplete>
                </form>
            </div>
        );
    }
});

React.render(<Demo/>, document.getElementById('demo'));
