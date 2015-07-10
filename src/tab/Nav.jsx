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
        var triggerType = props.triggerType || 'onClick';
        var events = {};

        React.Children.forEach(children, (child)=>{
            var key = child.key;
            var cls;
            cls = activeKey === key ? 'ui-active' : '';
            if (child.props.disabled) {
                cls += 'ui-disabled';
            }
            events[triggerType] = this.handleTabClick.bind(this, key)

            tpl.push(
                <li {...events} className={cls} key={key} data-active={activeKey=== key}>
                    <a href="#">{child.props.tab}</a>
                </li>
            );
        });

        return tpl;
    },

    /**
     * 给tab nav点击滑动功能，在组件render之后，因为要计算位移等信息
     * @param  {Object} prevProps 更新之前的prop
     * @param  {Object} prevState 更新之前的state
     * @return {Object}           [description]
     */
    componentDidUpdate (prevProps, prevState) {

    },

    /**
     * tab点击函数
     * @param  {string} key 自定义的key标识
     */
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
