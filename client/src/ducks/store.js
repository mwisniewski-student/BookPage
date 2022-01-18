import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import { createMiddleware } from 'redux-api-middleware';
import { entities } from './entities/reducers';
import { loadingReducer } from './loading/reducer';
import requestsStatusReducer from './requestsStatus/reducer';
import { i18nState } from "redux-i18n"

const combinedReducers = combineReducers({
    entities: entities,
    loading: loadingReducer,
    requestsStatus: requestsStatusReducer,
    i18nState
});

const store = createStore(combinedReducers,
    compose(applyMiddleware(thunk, createMiddleware(), logger)),
);

export default store;