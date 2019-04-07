'use-strict'
// import {server} from 'websocket';
 let websocketPort = 1234;
 let websocketServer = require('websocket').server;
 let http = require('http');
 var history = [];
 var client = [];

const htmlEntities = (str) => {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var colors = ['red', 'green', 'yellow', 'blue', 'orange', 'magenta', 'purple'];

colors.sort(() => {return Math.random() - 0.5});

var server = http.createServer();
server.listen(websocketPort, () => {
    console.log((new Date()) + 'server is listening to port '+websocketPort);
});

var wsServer = new websocketServer(
    {
        httpServer: server
    }
);

wsServer.on('request', (request) => {
    console.log((new Date()) + 'connection from origin: ' + request.origin);
    var connection = request.accept(null, request.origin);
    var index = client.push(connection) - 1;
    var username = false;
    var usercolor = false;

    console.log('connection accepted');

    if (history.length > 0) {
        connection.sendUTF(JSON.stringify({type: 'history', data: history}));
        console.log('History sent');
    }
    connection.on('message', (message) => {
        console.log(message.type);
        if (message.type === 'utf8') {
            console.log('message type matched');
            if (username === false) {
                username = htmlEntities(message.utf8Data);
                usercolor = colors.pop();
                connection.sendUTF(JSON.stringify({type: 'color', data: usercolor}));
                console.log((new Date()) + ' User is known as: ' + username
                    + ' with ' + usercolor + ' color.');
            } else {
                console.log((new Date()) + ' Received Message from '
                    + username + ': ' + message.utf8Data);
                    var obj = {
                        time: (new Date()).getTime(),
                        text: htmlEntities(message.utf8Data),
                        author: username,
                        color: usercolor
                    };
                    history.push(obj);
                    history = history.slice();
                     var json = JSON.stringify({type: 'message', data: obj});
                     for (let i = 0; i< client.length; i += 1) {
                         client[i].sendUTF(json);
                     }
            }
        }
    });
    connection.on('close', (connection) => {
        if (username !== false && usercolor !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            client.splice(index, 1);
            // push back user's color to be reused by another user
            colors.unshift(usercolor);
          }
    });
});