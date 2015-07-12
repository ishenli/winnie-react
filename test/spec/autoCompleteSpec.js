/**
 * @file autoComplete test
 */
 var React = require('react/addons');
 var TestUtils = React.addons.TestUtils;
 var Simulate = TestUtils.Simulate;
 var AutoComplete = require('../../src/AutoComplete');
 var keyCode = require('../../src/keyCode');

 var node = document.createElement('div');

 document.body.appendChild(node);

 describe('AutoComplete', function () {
     var autoComplete;
     var changeHook;
     function handleChangeClick() {
         if (changeHook) {
             changeHook.apply(this, arguments);
         }
     }


     function getDataSource() {
         var list = [];
         for (var i = 0; i < 5; i++) {
             list.push({
                 key:i,
                 value:'value' + i
             })
         }
         return list;
     }

     function handleSelect(value) {
         console.log(value);
     }
     beforeEach(function (done) {
         React.render(<AutoComplete dataSource={getDataSource} onSelect={handleSelect}/>, node, function() {
                 autoComplete = this;
                 done();
         });
     });

     afterEach(function () {
       React.unmountComponentAtNode(node);
       changeHook  = null;
     });

     it('render ok', function () {
         expect(TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'ui-autocomplete').length).toBe(1);
     });

     it('suggestion ok', function () {
         var input =  React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(autoComplete,'input')[0]);
         Simulate.change(input, {target: {value: 'query'}});
         expect(autoComplete.count).toEqual(getDataSource().length);
         expect(TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'ui-suggestion-item').length).toBe(5);
     });

     it('select ok', function () {
         var input = React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(autoComplete,'input')[0]);
         Simulate.change(input, {target: {value: 'query'}});
         Simulate.keyDown(input, {keyCode: keyCode.DOWN}); // 向下移动一个
         expect(input.value).toEqual('value0');
         expect(React.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(autoComplete,
         'li')[0]).className.indexOf('ui-hover')>-1).toBe(true);
     });

 });
