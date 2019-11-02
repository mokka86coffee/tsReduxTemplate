import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { middlewares } from './middlewares';

const initialState = {
    webSocketConnection: {}
};

const store = createStore(rootReducer, initialState, middlewares);

export { store };