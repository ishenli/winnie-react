
/**
 * @file simple tab
 * @author shenli (meshenli@gmail.com)
 */

require('./simple.less');

var Tab = require('../../src/Tab');
var TabPanel = Tab.TabPanel;
var React = require('react');

var PanelContent = React.createClass({
    render() {
        var data = [
            0, 1, 2, 3
        ];
        var content = new Array(200).join(' ' + this.props.id);
        var els = data.map((item, i) => {
            return <p key={i}>{content}</p>;
        });

        return (
            <div>{els}</div>
        );
    }
});

function createPanel(total) {
    var tpl = [];
    for (var i = 0; i < total; i++) {
        tpl.push(<TabPanel key={i + ''} tab={'tab'+i}><PanelContent id={i}/></TabPanel>)
    }
    return tpl;
}

var Demo = React.createClass({
    getInitialState() {
        return {
            total: 5
        };
    },

    render() {
        return (
            <div>
                <h2>Simple Tabs</h2>
                <Tab defaultKey={'0'}>
                    {createPanel(this.state.total)}
                </Tab>
            </div>
        );
    }
});

React.render(<Demo/>, document.getElementById('demo'));
