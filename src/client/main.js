import React from 'react'
import { browserHistory, Router, IndexRoute, Route } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';


import indexReducers from './reducers/index'

import routes from './routes'

const reducers = {
	...indexReducers,
	routing: routerReducer
}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const middleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(middleware)
  )
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

export default class Main extends React.Component {

  render() {
  	return (
  		<Provider store={store}>
  		  <Router history={browserHistory} routes={routes} />
		  </Provider>
	  )
  }

}
