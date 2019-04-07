import React, {Component} from 'react';

export default class Messages extends Component {
    render() {
        const data = this.props.data;
        return (
        <div className="messages-container">
        {data.history.map((item) => {
             const classname = data.userName === item.author?'message-outgoing':'message-incoming';
                return(
                    <div className={classname}>
                    <div style={{backgroundColor: item.color}}>{item.text}</div>
                    </div>
                );
        })}
        </div>
        );
    }
}