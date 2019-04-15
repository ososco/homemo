import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../reducers";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history), thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  return store;
}
