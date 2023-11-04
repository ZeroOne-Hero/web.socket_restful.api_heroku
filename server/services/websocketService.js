// Import the WebSocket library to enable real-time communication.
const WebSocket = require('ws');

const initializeWebSocketServer = server => {
    // Create a WebSocket server by passing the HTTP/S server object.
    const wss = new WebSocket.Server({server});

    // Listen for 'connection' events when a new client connects to the WebSocket server.
    wss.on('connection', ws => {
        console.log('WebSocket client connected');

        // Listen for 'message' events from the client.
        ws.on('message', message => {
            console.log(`Received message: ${message}`);

            // Broadcast the received message to all connected and open WebSocket clients.
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    // Send the message to each client.
                    client.send(message);
                }
            });
        });
    });

    return wss;
};

module.exports = {
    initializeWebSocketServer,
};
