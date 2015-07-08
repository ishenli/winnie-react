/**
 * @file tab的panel面板
 * @example
 * 	<TabPanel active={false} key={key} prefix={this.props.prefix}/>
 */

var React = require('react');
var prefixClsConcat = require('../util').prefixClsConcat;

var TabPanel = React.createClass({
    render(){
        var prefix = this.props.prefix;
        var panelClass = prefixClsConcat(prefix, 'panel');
        var active = this.props.active;
        var cls = active ? panelClass + ' ui-active' :  panelClass;
        return (
            <div className={cls} key ={this.props.key}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = TabPanel;
