export const usersMock = Array.from({length: 30}, (_, idx) => `user${idx}`);

export const SocketActionsTypes = {
    CONNECT_TO_SOCKET: 'CONNECT_TO_SOCKET',
    SOCKET_CONNECTION: 'SOCKET_CONNECTION',
    CONNECTED_TO_SOCKET: 'CONNECTED_TO_SOCKET',
    ADD_MESSAGE: 'ADD_MESSAGE',
    MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
    ADD_USER: 'ADD_USER',
    USERS_LIST: 'USERS_LIST',
    USER_ADDED: 'USER_ADDED'
}

export const DataFetchActionTypes = {
    FETCH_INFO_DATA_SERVER: 'FETCH_INFO_DATA_SERVER',
    RECEIVED_INFO_DATA_SERVER: 'SOCKET_CONNECTION'
}

export const SocketURL = 'ws://localhost:8686';
export const DataURL = 'http://localhost:8800';