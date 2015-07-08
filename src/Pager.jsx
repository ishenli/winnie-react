
var React = require('react');

class PagerItem extends React.Component {
    handleClick(e) {
        e.preventDefault();

        if (!this.props.active && !this.props.disabled) {
            this.props.skipTo(this.props.page);
        }
    }
    render() {
        var status = this.props.active ? 'ui-pager-item-active' : '';
        if (this.props.disabled) {
            status += 'ui-pager-item-diabled';
        }
        return (
            <li onClick = {this.handleClick.bind(this)} className={status}>
                <a href="#">{this.props.text}</a>
            </li>
        );
    }
}

class Item extends React.Component {
    handleClick(e) {
        e.preventDefault();
        if (!this.props.disabled) {
            this.props.skipTo(this.props.page);
        }
    }
    render() {
        var disabled = this.props.disabled ? 'ui-pager-item-diabled' : '';
        return(
            <li onClick={this.handleClick.bind(this)} className={disabled}>
                <a href="#">
                    <span aria-hidden="true">{this.props.text}</span>
                </a>
            </li>
        )
    }
}


class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.skipTo = this.skipTo.bind(this);
    }
    _getFirstItem() {
        var props = this.props;
        var text = props.previousLabel || 'prev';
        var current = props.current;
        var disabled = current === 0;
        return (<Item text={text} disabled={disabled} page={current-1} skipTo = {this.skipTo}/>);
    }

    // 所有数字按钮
    _getItems(){
        var props = this.props;
        var current = props.current;
        var total = props.total;
        var tpl = [];
        var from =0;
        var to = total - 1;
        var skip = this.props.skip || 2;
        var active;
        if (current > skip) {
            from = current - skip;
        }

        if (total - current < skip) {
            to = current + skip;
        }

        if (from !== 0) {
            tpl.push(<PagerItem text={1} skipTo={this.skipTo} page={0}/>); // 第一页
            if (from > 1) {
                tpl.push(<PagerItem text="..." disabled={true}/>);
            }
        }

        for (var i = from; i <= to; i++) {
            active = current === i;
            tpl.push(<PagerItem text={i + 1} active={active} skipTo={this.skipTo} page={i}/>);
        }

        if (to < total - 1) {
            active = current === total -1;
            if (to < total - 2) {
                tpl.push(<PagerItem text = "..." disabled={true}/>);
            }
            tpl.push(<PagerItem text={total} skipTo = {this.skipTo} page={total -1}/>);
        }

        return tpl;
    }

    _getLastItem() {
        var props = this.props;
        var text = props.previousLabel || 'next';
        var current = props.current;
        var disabled = current === props.total - 1;
        return (<Item text={text} disabled={disabled} page={current+1} skipTo = {this.skipTo}/>);
    }

    skipTo(page) {
        var handler = this.props.onSkipTo;
        if (handler) {
            handler(page);
        }
    }
    render() {
        var me = this;
        var first = me._getFirstItem();
        var middle = me._getItems();
        var last = me._getLastItem();
        var className = 'ui-pager';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <ul className={className}>
                {first}
                {middle}
                {last}
            </ul>
        )
    }
}

module.exports  = Pager;
