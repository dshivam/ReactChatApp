import React, {Component} from 'react';

export default class Sender extends Component {
    onEnter(e) {
    if (e.keyCode === 13) {
        this.props.onSend();
    }
    }
    render() {
        const props = this.props;
        return (
        <div className="sender">
            <input value={props.input} placeholder="Type your massege..." onKeyDown={(event) => this.onEnter(event)} onChange={(event) => {props.onInput(event)}}/>
            <i className="icon material-icons" role="button" onClick={() => {props.onSend()}}>send</i>
        </div>
        );
    }
}