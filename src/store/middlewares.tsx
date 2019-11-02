import { applyMiddleware, compose, Store, AnyAction } from 'redux';
import { webSocketConnect } from '../helpers/api';
import { SocketUrl, SocketActionsTypes } from '../helpers/constants';

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const socketMiddleware = ({ dispatch, getState }: any) => (next: Function) => (action: AnyAction) => {
  console.log("TCL: socketMiddleware -> action", action)
  switch(action.type) {
    case SocketActionsTypes.CONNECT_TO_SOCKET: {
      const url = action.payload.url || SocketUrl;
      const webSocketConnection = webSocketConnect(url, dispatch);
      return next({ type: SocketActionsTypes.SOCKET_CONNECTION, payload: webSocketConnection });
    }

    case SocketActionsTypes.ADD_MESSAGE: {
      const {webSocketConnection} = getState();

      const message = {
        type: SocketActionsTypes.ADD_MESSAGE,
        text: action.payload.message
      };
      
      webSocketConnection.send(JSON.stringify(message));

      return next(action);
    }

    default:
      next(action);
  }
}

export const middlewareCollection = applyMiddleware(
    socketMiddleware
);

export const middlewares = composeEnhancers(middlewareCollection);