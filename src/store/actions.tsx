import { SocketActionsTypes } from '../helpers/constants';

export const testActionCreator = () => ({ type: 'test' });

export const connectToWebSocket = (url?: string) => ({ type: SocketActionsTypes.CONNECT_TO_SOCKET, payload: {url} });
export const sendMessageToWebSocket = (message?: string) => ({ type: SocketActionsTypes.ADD_MESSAGE, payload: {message} });