import _ from 'underscore'

// rename by usage - usersPage?

const initialState = {
  items: [],
  state: 'init', // | 'pending' | 'ready' | 'error' | 'invalid'

  // usersPage params only - not for children
  message: null,
  criteria: {}
}

export default function users(state = initialState, action) {
    switch (action.type) {
      // common action
      case 'USERS_RESET':
        return Object.assign({}, state)
      case 'USERS_FILTER_CHANGED':
        return Object.assign({}, state, {criteria: action.criteria})

      // fetching
      case 'USERS_FETCH':
          return Object.assign({}, state, {
              state: 'pending',
              message: null
          })
      case 'USERS_FETCH_DONE':
          return Object.assign({}, state, {
              state: 'ready',
              items: action.users
          })
      case 'USERS_FETCH_ERROR':
        return Object.assign({}, state, {
            state: 'error',
            message: 'Users loading failed!'
        })

      // creating
      case 'USER_CREATE':
        return Object.assign({}, state, {
            state: 'pending'
        })
      case 'USER_CREATE_DONE':
          return Object.assign({}, state, {
              state: 'ready',
              items: [action.user].concat(state.items),
              message: 'User {name} has been created'.replace('{name}', action.user.name)
          })
      case 'USER_CREATE_ERROR':
        return Object.assign({}, state, {
            state: 'error',
            message: 'New user creating failed!'
        })

      // updating
      case 'USER_UPDATE':
          return Object.assign({}, state, {
              state: 'pending'
          })
      case 'USER_UPDATE_DONE':
          const users = state.items.concat()

          // update user
          //_.extend(_.findWhere(users, {id: state.actor.id}), action.user);

          // update items
          return Object.assign({}, state, {
              // item: action.user,
              state: 'ready',
              items: users,
              message: 'User {name} has been updated'.replace('{name}', action.user.name)
              
          })
      case 'USER_UPDATE_ERROR':
        return Object.assign({}, state, {
            state: 'error',
            message: 'User updating failed!'
        })

      // deleting
      case 'USER_DELETE':
          return Object.assign({}, state, {
              state: 'pending'
          })
      case 'USER_DELETE_DONE':
          return Object.assign({}, state, {
              state: 'ready',
              items: state.items.filter((user) => user.id != action.user.id),
              message: 'User {name} was deleted'.replace('{name}', action.user.name)
          })
      case 'USER_DELETE_ERROR':
        return Object.assign({}, state, {
            state: 'error',
            message: 'User deleting failed!'
        })
    }

    return state;
}
