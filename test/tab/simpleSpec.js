
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;
var Tab = require('../../src/Tab');
var TabPanel = Tab.TabPanel;

var node = document.createElement('div');

document.body.appendChild(node);

describe('tab', function () {
    var tab;
    var changeHook;
    var tabHook;
    function handleChangeClick() {
        if (changeHook) {
            changeHook.apply(this, arguments);
        }
    }

    function handleTabClick() {
        if (tabHook) {
            tabHook.apply(this, arguments);
        }
    }

    beforeEach(function (done) {
      React.render(<Tab defaultKey="2" onChange={handleChangeClick} onTabClick={handleTabClick}>
          <TabPanel tab="tab1" key="1"></TabPanel>
          <TabPanel tab="tab2" key="2"></TabPanel>
          <TabPanel tab="tab3" key="3"></TabPanel>
      </Tab>, node, function() {
          tab = this;
          done();
      });
    });

    afterEach(function () {
      React.unmountComponentAtNode(node);
      changeHook = tabHook = null;
    });

    it('render ok', function () {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(tab, 'ui-tab-container').length).toBe(1);
    });

    it('nav ok', function () {
        expect(TestUtils.scryRenderedDOMComponentsWithTag(tab, 'li').length).toBe(3);
    })

    it('default active ok', function () {
        console.log(React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(tab,
        'li')[1]).className);
        expect(tab.state.activeKey).toEqual('2');
        expect(React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(tab,
        'li')[1]).className.indexOf('ui-active')>-1).toBe(true);
    });

    it('onChange ok', function (done) {
        changeHook = function (key){
            expect(key).toEqual('1');
            done();
        };

        var node = React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(tab,'li')[0]); // 点击第一个节点
        Simulate.click(node);
    });

    it('onTabClick ok', function (done) {
        var counted = 0;

        // click 2次， change 1次
        function check() {
            if (counted === 3) {
                done();
            }
        }


        // 因为change 和 tab 在一个函数内调用，change在后面
        changeHook = function (key) {
            counted++;
            expect(key).toEqual('1');
            check();
        }

        tabHook = function (key) {
            counted++;
            expect(key).toEqual('1');
            check();
        }

        var node = React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(tab,'li')[0]); // 点击第一个节点
        Simulate.click(node);

        setTimeout(function () {
            Simulate.click(node);
        }, 10);

    });


});
