
var Pager = require('../../src/Pager');

require('./simple.less')

class Demo extends Pager {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    handleSkip(page) {
        this.setState({
            current: page
        });

        if (this.props.onSkipTo) {
            this.props.onSkipTo(page);
        }
    }

    render() {
        return (
            <div>
                <Pager total = {this.props.total} current={this.state.current} onSkipTo = {this.handleSkip.bind(this)}/>
            </div>
        )
    }
}

React.render(
    <div>
        <h1>a simple pager</h1>
        <Demo total = {10} current={3} skip={4}/>
    </div>,
    document.getElementById('demo')
)
