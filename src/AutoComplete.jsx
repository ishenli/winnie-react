
var React = require('react');
var TextBox = require('./TextBox');
var classNames = require('classNames');
var listen = require('./utils/EventListener').listen;
var KeyCode = require('./KeyCode');
var util = require('./util');

class Suggestion extends React.Component {

    constructor(props) {
        super(props);
    }

    getSuggestion() {

        var dataSource = this.props.dataSource();
        var suggestion = [];
        dataSource.forEach((item, i) =>{
            var cls = classNames('ui-suggestion-item', {
                'ui-hover': (this.props.current === i)
            });
            suggestion.push(<li className={cls}  key={i}>{item}</li>)
        });

        // 记录条数，用于上下翻页计算
        this.count = suggestion.length;
        return suggestion;
    }

    render() {
        var suggestion = this.getSuggestion();
        var wrapCls = 'ui-suggestion' + (this.props.show ? '' : ' ui-hidden');
        return (
            <div className={wrapCls}>
                <ul className="ui-suggestion-list" >
                    {suggestion}
                </ul>
            </div>
        );
    }
}

class AutoComplete extends React.Component {

    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.state = this.getState();
    }

    getState() {
        return {
            show: false,
            current: null
        };
    }

    getDataSource(value) {

        // 适配多种接口
        var fetching = this.props.dataSource(value, this);
        if(fetching && typeof fetching.then === 'function') {
            fetching.then(this._onSuggestionLoaded.bind(this));
        }
        else {
            this._onSuggestionLoaded(fetching);
        }

        return this;
    }

    load(value) {
        return this.getDataSource(value);
    }

    _onSuggestionLoaded(data) {

        if (!data || !data.length) {
            this.hide();
        }
        else {
            this.show(data);
        }
    }

    /**
     * 键盘特殊事件处理
     * @param  {object} e 事件对象
     */
    handleKeyPress(e) {
        var val = e.target.value;
        var me = this;

        switch (e.keyCode) {
            case KeyCode.DOWN:
                // 按`下`
                me.next();
                return;
            case KeyCode.UP:
                // 按`上`
                me.prev();
                // 屏蔽浏览器光标回到的文字的最前面
                e.preventDefault();
                return;
            case KeyCode.ESC:
                // 按`esc`
                me.hide();
                return;
            default:
                break;
        };
    }

    handleInput(e) {
        var value = e.target.value;
        value ? this.load(value) : this.hide();
    }

    next() {
        this.move('down');
    }

    prev() {
        this.move('up');
    }

    move(direction) {

        var count = this.count || 0;

        if (count === 0) {
            return;
        }

        var current = this.state.current;
        var next;

        if (direction === 'down') {
            next = current === null ? 0 : current + 1;
            next = next === count ? 0 : next;
        }
        else {
            next = current === null ? count - 1 : current - 1;
            next = next === -1 ? count - 1 : next;
        }

        this.go(current, next);
    }

    go(current, next) {
        console.info(current, next);

        this.setState({
            current: next
        });
        var suggestion = this.suggestions[next];

        // textbox不用state控制，避免textbox需要通过onChange事件来进行处理
        React.findDOMNode(this.refs.textbox).value = this.props.adapter.toInput(suggestion);
    }

    /**
     * 显示推荐浮层
     * @param  {Array.string} suggestions
     */
    show(suggestions) {
        var count = this.count = suggestions.length;
        this.suggestions = suggestions;

        if (!count) {
            return this;
        }

        // 显示浮层
        this.setState({
            show: true
        });

        // 开始侦听全局的点击事件
        this._bodyEvent = listen(document.body, 'click', this.onBodyClick.bind(this));

        return this;
    }
    onBodyClick() {

        this.setState({
            show: false
        });
    }

    hide() {
        this.setState({
            show: false
        });

        this._bodyEvent.remove();

    }

    render(){
        return (
            <div className="ui-autocomplete">
                <TextBox ref="textbox" onSelect = {this.props.onSelect}
                    onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleInput.bind(this)}/>
                <Suggestion {...this.state} dataSource={this.props.dataSource}/>
            </div>
        );
    }
}

AutoComplete.defaultProps = {
    url: '',
    adapter:{
        toList: function (suggestion) {
            return {
                text: suggestion.text,
                value: suggestion.value
            };
        },
        toInput: function (suggestion) {
            return suggestion.value;
        }
    },
    onSelect: util.noop
};

module.exports = AutoComplete;
