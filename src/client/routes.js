import React from 'react' // has to be defined because JSX (probably)
import {Route, IndexRoute} from 'react-router';

import BasePage from './pages/basePage'
import HomePage from './pages/homePage'
import UsersPage from './pages/usersPage'
import UserCreatePage from './pages/userCreatePage'
import UserEditPage from './pages/userEditPage'
import NotFoundPage from './pages/notFoundPage'

export default (
    <Route path="/" component={BasePage}>
        <IndexRoute component={HomePage} />
        <Route path='/users' component={UsersPage}>
            <Route path="/users/create" component={UserCreatePage} />
            <Route path="/users/:userId" component={UserEditPage} />
        </Route>

        <Route path="*" component={NotFoundPage} />
    </Route>
)
