import { configureStore } from "@reduxjs/toolkit";
import root from './root'
import storeSaga from './storeSaga'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({ reducer: root, middleware:() => [sagaMiddleware] });
sagaMiddleware.run(storeSaga);
export default store