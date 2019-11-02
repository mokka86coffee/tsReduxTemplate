import { combineReducers } from 'redux';
import { SocketActionsTypes } from '../helpers/constants';

export interface ISocketStore {
    webSocketConnection?: WebSocket,
    connected: boolean
}

export interface ISocketAction {
    type: keyof typeof SocketActionsTypes,
    payload: {[key: string]: any}
}

export const initialSocketStore = {
    webSocketConnection: undefined,
    connected: false
};

const socketReducer = (store: ISocketStore = initialSocketStore, action: ISocketAction) => {
    switch (action.type) {
        case SocketActionsTypes.CONNECTED_TO_SOCKET:
            return { ...store, connected: true };
        case SocketActionsTypes.SOCKET_CONNECTION:
            return { ...store, ...action.payload };
        case SocketActionsTypes.MESSAGE_RECEIVED:
            return { ...store, ...action.payload };
        default:
            return store;
    }
};

interface IMessage {
    id: number,
    author: string,
    text: string
}

const initialMessagesStore: [] = [];

const messagesReducer = (store: IMessage[] | [] = initialMessagesStore, action: ISocketAction) => {
    if(action.type === SocketActionsTypes.MESSAGE_RECEIVED) {
        return [...store, action.payload.message];
    }

    return store;
}


export const rootReducer = combineReducers({
    webSocketConnection: socketReducer,
    messages: messagesReducer
});