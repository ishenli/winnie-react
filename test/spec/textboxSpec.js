/**
 * @file autoComplete test
 */
 var React = require('react/addons');
 var TestUtils = React.addons.TestUtils;
 var Simulate = TestUtils.Simulate;
 var TextBox = require('../../src/TextBox');
 var keyCode = require('../../src/keyCode');

 var node = document.createElement('div');

 document.body.appendChild(node);

 describe('TextBox', function () {
     var textbox;
     var selectValue;
     function handleSelect(value) {
         selectValue = value;
     }
     beforeEach(function (done) {
         React.render(<TextBox onSelect={handleSelect}/>, node, function() {
                 textbox = this;
                 done();
         });
     });

     afterEach(function () {
       React.unmountComponentAtNode(node);
     });

     it('render ok', function () {
         expect(TestUtils.scryRenderedDOMComponentsWithClass(textbox, 'ui-input').length).toBe(1);
     });


     it('select ok', function () {
         var input = React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(textbox,'input')[0]);
         input.value = 'query';
         Simulate.keyDown(input, {keyCode: keyCode.ENTER});
         expect(selectValue).toEqual('query');
     });
 });
