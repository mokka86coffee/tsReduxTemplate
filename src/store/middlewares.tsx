import { applyMiddleware, compose, AnyAction, MiddlewareAPI, Dispatch } from 'redux';
// import reduxThunk from 'redux-thunk';
import { webSocketConnect } from '../helpers/api';
import { SocketActionsTypes } from '../helpers/constants';

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const socketMiddleware = ({ dispatch, getState }: any) => (next: Function) => (action: AnyAction) => {

  switch(action.type) {
    case SocketActionsTypes.CONNECT_TO_SOCKET: {
      const {url} = action.payload;
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

const customThunk = ({dispatch}: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: Function | {type: string, payload: any}) => {
  return typeof action === 'function'
    ? action(dispatch)
    : next(action);
}

export const middlewareCollection = applyMiddleware(
    socketMiddleware,
    customThunk
);

export const middlewares = composeEnhancers(middlewareCollection);