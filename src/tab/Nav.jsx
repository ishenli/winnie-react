var React = require('react');
var prefixClsConcat = require('../util').prefixClsConcat;
var Nav = React.createClass({
    getInitialState() {
        return {
            next: false,
            prev: false,
            index: 0
        }
    },
    _getTabs() {
        var props = this.props;
        var children = props.panels;
        var tpl = [];
        var activeKey = props.activeKey;
        var prefix = props.prefix;

        React.Children.forEach(children, function(child, i){
            var key = child.key;
            var cls;
            if (activeKey === key) {
                 cls = 'ui-active';
            }
            tpl.push(
                <li onClick= {this.handleTabClick.bind(this, key)} className={cls} data-active= {activeKey=== key}>
                    <a href="#">{child.props.tab}</a>
                </li>
            );
        }.bind(this));

        return tpl;
    },
    handleTabClick(key) {
        this.props.handleTabClick(key);
    },
    render() {
        var props = this.props;
        var tabs = this._getTabs();
        var prefix = props.prefix;
        var cls = prefixClsConcat(prefix, 'nav');
        cls += ' ui-nav ui-nav-tab';
        return (
            <ul className={cls} ref="container">
                {tabs}
            </ul>
        );
    }
});

module.exports = Nav;
