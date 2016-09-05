import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router';
import store from './store'
import Main from './routes/Main'

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Main} />
		</Router>
	</Provider>,
	document.getElementById('app')
)