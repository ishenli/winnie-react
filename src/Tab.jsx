var React = require('react');
var Nav = require('./tab/Nav');
var TabPanel = require('./tab/TabPanel');
var prefixClsConcat = require('./util').prefixClsConcat;

var noop = function() {};

var Tab = React.createClass({
    getInitialState() {
        var props = this.props;
        var activeKey;
        if ('activeKey' in props) {
            activeKey = props.activeKey;
        }
        else if ('defaultKey' in props) {
            activeKey = props.defaultKey;
        }
        else {
            React.Children.forEach(props.children, (child) => {
                if (!activeKey && !child.props.disabled) { // 如果都没disabled，就显示最后一个
                    activeKey = child.key;
                }
            });
        }

        return {
            activeKey: activeKey
        };

    },
    getDefaultProps() {
        return {
            prefix: 'ui-tab-',
            onTabClick: noop,
            onChange: noop
        }
    },

    /**
     * 在接收到新属性的时候触发
     * @param  {object} nextProps 新的prop
     */
    componentWillReceiveProps: function(nextProps) {
        if ('activeKey' in nextProps) {
            this.setState({
                activeKey: nextProps.activeKey
            });
        }
    },

    _getTabPanels() {
        var activeKey = this.state.activeKey;
        var children = this.props.children; // children are tabPanel
        var newChildren = [];
        React.Children.forEach(children, (child) => {
            var key = child.key;
            var active = activeKey === key;
            newChildren.push(<TabPanel active={active} key={key} prefix={this.props.prefix}>
                    {child.props.children}
                </TabPanel>);
        });

        return newChildren;
    },
    handleTabClick(key) {
        this.props.onTabClick(key);
        if (this.state.activeKey !== key) {
            this.setActiveKey(key);
            this.handleChange(key);
        }
    },

    _getNextKey() {
        return this._getActiveKey(true);
    },

    _getPrevKey() {
        return this._getActiveKey(false);
    },

    _getActiveKey(isNext) {
        var current = this.state.activeKey;
        var children = this.props.children;
        var arr = [];
        var ret;

        React.Children.forEach(children, (child)=> {
            if (!child.props.disabled) {
                isNext ? arr.push(child) : arr.unshift(child); // 全部排好
            }
        });

        var len = child.length;
        var key = len && child[0].key;

        child.forEach(function (c, i) { //  forEach不能break，懒得自己去实现了
            if (c.key === current) {
                ret = i === len - 1 ? child[0].key : child[i + 1].key;
            }
        });

        return ret;
    },

    /**
     * 键盘操作切换
     * @param  {Event} e 事件对象
     */
    handleKeyDown(e) {
        console.log(React.findDOMNode(this));
        console.log(e.target);
        if (e.target !== React.findDOMNode(this)) { // 木有按在tab上，直接暂停
            return;
        }

        var keyCode = e.keyCode;
        console.log(keyCode);
        switch (keyCode) {
        case 40: // down
        case 38: // right
            e.preventDefault();
            var nextKey = this._getNextKey();
            this.handleTabClick(nextKey);
            break;
        case 38: // up
        case 37: // left
            e.preventDefault();
            var prevKey = this._getPrevKey();
            this.handleTabClick(prevKey);
            break;
        default:
            break;
        }
    },

    handleChange(key) {
        this.props.onChange(key);
    },

    setActiveKey(key) {
        this.setState({
            activeKey: key
        });
    },
    render() {
        var props = this.props;
        var prefix = this.props.prefix;
        var tabPanels = this._getTabPanels();
        var activeKey = this.state.activeKey;
        return (
            <div className={prefixClsConcat(prefix, 'container')}  onKeyDown={this.handleKeyDown}>
                <Nav key='Nav' activeKey={activeKey} handleTabClick={this.handleTabClick}
                    panels={this.props.children} prefix={prefix} triggerType={props.triggerType}/>
                <div className={prefixClsConcat(prefix, 'bd')}>
                    {tabPanels}
                </div>
            </div>
        );
    }

});

Tab.TabPanel = TabPanel;

module.exports = Tab;
