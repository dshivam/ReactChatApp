import React, { Component } from 'react';
import Chat from './src/ChatComponent';
import './App.scss';

class App extends Component {

   componentDidMount() {
   
   }
    render() {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        window.connection = new WebSocket('ws://127.0.0.1:1234');
        return(
           <div className="my-app">
              <Chat />
           </div>
        );
    }
}
export default App;
