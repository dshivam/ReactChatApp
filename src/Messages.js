import React, {Component} from 'react';

export default class Messages extends Component {
    render() {
        const history = this.props.data.userName?this.props.data.history:[];
        return (
        <div className="messages-container">
        {history.map((item) => {
             const classname = this.props.data.userName.toUpperCase() === item.author.toUpperCase()?'message-outgoing':'message-incoming';
                return(
                    <div className={classname}>
                    <div>
                    <p className="author" style={{color: item.color}}>{item.author}</p>
                    <p className="text">{item.text}</p>
                    </div>
                    </div>
                );
        })}
        </div>
        );
    }
}