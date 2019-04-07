import React, {Component} from 'react';

export default class ChatHeader extends Component {
    render() {
        const header = this.props.data.userName?'Welcome to the Chat '+ this.props.data.userName:'Enter Your Name to login'
        return (
            <div className="chat-header">
                <h>{header}</h>
            </div>
        );
    }
}