import page from './page'
import users from './users'
import user from './user'
import groups from './groups'

// import userForm from './userForm'

// The reducer’s responsibility is to take the application state,
// account for changes coming from the action creators, and boil it all down (‘reduce’ it) to the new state.
// It is important to note that the reducer is a pure function, meaning it does not mutate the existing application state.
// Instead, it outputs a brand new application state for every change that is made.

export default {
  page,
  users,
  groups,
  user
}
