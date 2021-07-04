import rootReducer from './index';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
// const appStore = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const middleware = [thunk];
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
	middleware.push(createLogger());
}

const appStore = createStore(
	rootReducer,
	{},
	applyMiddleware(...middleware)
);
export default appStore;