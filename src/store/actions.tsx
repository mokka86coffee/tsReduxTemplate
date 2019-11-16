import {Dispatch} from 'redux';
import axios from 'axios';
import { SocketActionsTypes, DataURL, SocketURL } from '../helpers/constants';

export const testActionCreator = () => ({ type: 'test' });

export const connectToDataServer = (url: string = DataURL) => async (dispatch: Dispatch) => {
    // console.log("TCL: connectToDataServer -> dispatch", dispatch)
    dispatch({type: 'FETCH_DATA'});
    const data = await axios(url);
    console.log("TCL: dataMiddleware -> data", data);
}

export const connectToWebSocket = (url: string = SocketURL) => ({ type: SocketActionsTypes.CONNECT_TO_SOCKET, payload: {url} });
export const sendMessageToWebSocket = (message?: string) => ({ type: SocketActionsTypes.ADD_MESSAGE, payload: {message} });