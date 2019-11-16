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

let users = [];
let uniqUserId = 0;
const messages = [];

const broadcast = (data, ws) => {
    wss.clients.forEach(client => {
        if (client.readyState === webSocket.OPEN && client !== ws) {
            client.send(JSON.stringify(data));
        }
    });
};

const messagesSwitcher = ({ws, data, uniqUserId}) => {
    const messageObj = JSON.parse(data);

    switch (messageObj.type) {
            
        case 'ADD_MESSAGE':
            const message = {
                text: messageObj.text,
                id: messages.length + 1,
                author: names[uniqUserId - 1]
            };
            
            messages.push(message);

            ws.send(JSON.stringify({ type: 'MESSAGE_RECEIVED', message }));
            broadcast({ type: 'MESSAGE_RECEIVED', message }, ws);
            return;
        default:
    }
}

wss.on('connection', (ws) => {
    const newUser = {
        name: names[uniqUserId],
        id: uniqUserId
    };
    console.log(`${newUser.name} connected`);

    users.push(newUser);
    ws.send(JSON.stringify({ type: 'USER_ADDED', user: newUser }));
    ws.send(JSON.stringify({ type: 'USERS_LIST', users }));

    broadcast({ type: 'USERS_LIST', users }, ws);

    ws.on('message', (data) => messagesSwitcher({ws, data, uniqUserId}));
    ws.on('close', () => {
        users = users.filter(({id}) => id !== uniqUserId);
        broadcast({type: 'USERS_LIST', users}, ws);
    });

    uniqUserId += 1;

});

// server.js
// Для начала установим зависимости.
const http = require('http');
// const routing = require('./routing');


let server = new http.Server(function(req, res) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

  // API сервера будет принимать только POST-запросы и только JSON, так что записываем
  // всю нашу полученную информацию в переменную jsonString
  var jsonString = '';
  res.setHeader('Content-Type', 'application/json');
  req.on('data', (data) => { // Пришла информация - записали.
    console.log("TCL: data", data)
    jsonString += data;
  });

  req.on('end', () => {// Информации больше нет - передаём её дальше.
    res.end(JSON.stringify({a: 1}));
    // routing.define(req, res, jsonString); // Функцию define мы ещё не создали.
  });
});
server.listen(8800, 'localhost');

// Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });