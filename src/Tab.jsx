var React  = require('react');
var Nav = require('./tab/Nav');
var TabPanel = require('./tab/TabPanel');
var prefixClsConcat = require('./util').prefixClsConcat;

var noop = function(){};

var Tab = React.createClass({
    propTypes: {
    },
    getInitialState() {
        var props = this.props;
        var activeKey;
        if ('activeKey' in props) {
            activeKey = props.activeKey;
        }
        else if ('defaultKey' in props) {
            activeKey = props.defaultKey;
        }

        console.log(typeof activeKey);
        return {
            activeKey: activeKey
        };

    },
    getDefaultProps() {
        return {
            prefix: 'ui-tab-',
            onTabClick: noop
        }
    },
    _getTabPanels() {
        var activeKey = this.state.activeKey;
        var children = this.props.children; // children is tabPanel
        var newChildren =[];
        React.Children.forEach(children, (child)=>{
            var key = child.key;
            var active = activeKey === key;
            console.log(activeKey);
            console.log(key);
            newChildren.push(
                <TabPanel active={active} key={key} prefix={this.props.prefix}>
                    {child.props.children}
                </TabPanel>
            );
        });

        return newChildren;
    },
    handleTabClick(key) {
        this.props.onTabClick(key);
        if (this.state.activeKey !== key) {
            this.setActiveKey(key);
        }
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
            <div className={prefixClsConcat(prefix, 'container')}>
                <Nav activeKey={activeKey} prefix={prefix} panels={this.props.children} handleTabClick={this.handleTabClick}/>
                <div className={prefixClsConcat(prefix, 'bd')}>
                    {tabPanels}
                </div>
            </div>
        );
    }

});

Tab.TabPanel = TabPanel;

module.exports = Tab;
