const webSocket = require('ws');

const wss = new webSocket.Server({ port: 8686 });

const names = [
    'Kenny',
    'Pascual',
    'Giiwedinokwe',
    'Zoran',
    'Michel',
    'Elisheva',
    'Christabel',
    'Mani',
    'Giulietta',
    'Fen',
];

const users = [];
const messages = [];

const broadcast = (data, ws) => {
    wss.clients.forEach(client => {
        if (client.readyState === webSocket.OPEN && client !== ws) {
            client.send(JSON.stringify(data));
        }
    });
};

const messagesSwitcher = ({ws, data, userIndex}) => {
    const messageObj = JSON.parse(data);

    switch (messageObj.type) {
            
        case 'ADD_MESSAGE':
            const message = {
                text: messageObj.text,
                id: messages.length + 1,
                author: users[userIndex]
            };
            
            messages.push(message);

            ws.send(JSON.stringify({ type: 'MESSAGE_RECEIVED', message }));
            broadcast({ type: 'MESSAGE_RECEIVED', message }, ws);
            return;
        default:
    }
}

wss.on('connection', (ws) => {
    const userIndex = users.length;
    users.push(names[userIndex]);
    ws.send(JSON.stringify({ type: 'USER_ADDED', name: names[userIndex] }));

    ws.on('message', (data) => messagesSwitcher({ws, data, userIndex}));
    ws.on('close', () => {
        users.splice(userIndex, 1);
        // broadcast({type: 'USERS_LIST', users}, ws);
    });
});
