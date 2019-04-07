import React, {Component} from 'react';
import Header from './ChatHeader';
import Messages from './Messages';
import Sender from './Sender';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userColor: false,
            input: '',
            history: []
        }
        this.onMessage = this.onMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onInput = this.onInput.bind(this);
    }
    componentDidMount() {
        connection.onopen = this.onOpen;
        connection.onerror = this.onError;
        connection.onmessage = this.onMessage;
        // this.onSend('Shivam');
        console.log('Component Mounted');
    }
    onInput(e) {
        this.setState({
            input: e.target.value
        });
    }
    onError(error) {
            console.log('Sorry! Error While connection: '+error);
    }
    onOpen() {
        console.log('Connection opened');
    }
    onMessage(mess) {
        const message = JSON.parse(mess.data);
        switch(message.type) {
            case 'color':
                this.setState({
                    userColor: message.data
                })
                break;
            case 'history': 
                const hist = message.data;
                console.log('message type history');
                console.log(hist);
                this.setState({
                    history: hist
                })
                break;
            case 'message':
                const messages = this.state.history.slice();
                messages.push(message.data);
                this.setState({
                    history: messages
                });
                break;
            default:
                return;
        }
    }
    
    onSend() {
        if (!this.state.input) {
            return;
        }
        console.log(this.state.input);
        console.log(connection);
        window.connection.send(this.state.input);
        if (!this.state.userName) {
            this.setState({
                userName: this.state.input
            });
        }
        this.setState({
            input: ''
        });
    }
    render() {
        return (
            <div className="row chat-widget">
                <div className="col-4 mx-auto">
                    <div className="chat-container">
                        <Header data={this.state}/>
                        <Messages data={this.state}/>
                        <Sender 
                        input={this.state.input}
                        onInput={this.onInput}
                        onSend={this.onSend}/>
                    </div>
                </div>
            </div>

        );
    }
}