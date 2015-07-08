
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;
var Tab = require('../../src/Tab');
var TabPanel = Tab.TabPanel;

var node = document.createElement('div');

document.body.appendChild(node);

describe('tab', function () {
    var tab;
    beforeEach(function (done) {
      React.render(<Tab defaultKey="2">
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
    });

    it('render ok', function () {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(tab, 'ui-tab-container').length).toBe(1);
    });
});
