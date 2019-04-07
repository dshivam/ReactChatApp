import React, {Component} from 'react';

export default class Sender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
        this.onInput = this.onInput.bind(this);
    }
    onInput(e) {
        this.setState({
            input: e.target.value
        });
    }
    render() {
        const props = this.props;
        return (
        <div className="sender">
            <input type="text" placeholder="Type your massege..." onChange={(event) => {this.onInput(event)}}/>
            <i className="icon material-icons" role="button" onClick={() => {props.onSend(this.state.input)}}>send</i>
        </div>
        );
    }
}