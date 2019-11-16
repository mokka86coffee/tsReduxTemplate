import { SocketActionsTypes } from '../helpers/constants';

class WebSocketConnection {
    url: string
    socket: WebSocket
    connected: boolean = false
    dispatchToStore: Function = () => {}
    
    constructor(url: string, dispatchToStore: Function) {
        this.url = url;
        this.dispatchToStore = dispatchToStore;
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onopen; 
        this.socket.onclose = this.onclose; 
        this.socket.onmessage = this.onmessage; 
        this.socket.onerror = this.onerror; 
    }

    onopen = (event: any) => {
        console.log("TCL: WebSocketConnection -> onopen -> event", event)
        this.dispatchToStore({type: SocketActionsTypes.CONNECTED_TO_SOCKET});
        this.connected = true;
    };

    onclose = (event: any) => {
        console.log("TCL: WebSocketConnection -> onclose -> event", event)
        if (event.wasClean) {
            alert('Соединение закрыто чисто');
        } else {
           alert('Обрыв соединения'); // например, "убит" процесс сервера
        }
        
        this.connected = false;
    }

    onmessage = ({data}: any) => {
        const {type, ...rest} = JSON.parse(data);
        // console.log("TCL: WebSocketConnection -> onmessage -> data", data)
        this.dispatchToStore({ type, payload: { ...rest }});
    };

    onerror = (error: any) => {
        // console.log("TCL: WebSocketConnection -> onerror -> error", error)
    }

    send = (message: string) => this.socket.send(message);
};

export const webSocketConnect =  (url: string, dispatch: Function) => new WebSocketConnection(url, dispatch);
