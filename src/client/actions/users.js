import {fetchUsers, fetchUser, createUser, updateUser, deleteUser} from '../utils/agent'

export function asycFetchUsers(dispatch, criteria) {
    return new Promise((resolve, reject) => {
        dispatch(usersFetch(criteria))

        fetchUsers(criteria)
          .then((response) => {
              dispatch(usersFetchDone(response.data.users))
              resolve(response.data.users)
          })
          .catch((response) => {
              dispatch(usersFetchError(response))
              reject(response)
          })
    })
}

export function asycCreateUser(dispatch, user) {
    return new Promise((resolve, reject) => {
        dispatch(userCreate(user))

        createUser(user)
          .then((response) => {
              dispatch(userCreateDone(response.data.user))
              resolve(response.data.user)
          })
          .catch((response) => {
              dispatch(userCreateError(response))
              reject(response)
          })
    })  
}

export function asycUpdateUser(dispatch, user) {
    return new Promise((resolve, reject) => {
        dispatch(userUpdate(user))

        updateUser(user)
          .then((response) => {
              dispatch(userUpdateDone(response.data.user))
              resolve(response.data.user)
          })
          .catch((response) => {
              dispatch(userUpdateError(response))
              reject(response)
          })
    })  
}

export function asycDeleteUser(dispatch, userToDelete) {
  return new Promise((resolve, reject) => {
      dispatch(userDelete(userToDelete))

      deleteUser(userToDelete)
      .then((response) => {
          dispatch(userDeleteDone(userToDelete))
          resolve()
      })
      .catch((response) => {
          dispatch(userDeleteError(response))
          reject(response)
      })
  })
}

export function usersReset() {
    return { type: 'USERS_RESET'}
}

export function usersFilterChanged(criteria) {
    return { type: 'USERS_FILTER_CHANGED', criteria}
}

// fetching
function usersFetch() {
   return { type: 'USERS_FETCH'}
}

function usersFetchDone(users) {
   return { type: 'USERS_FETCH_DONE', users};
}

function usersFetchError(message) {
   return { type: 'USERS_FETCH_ERROR', message};
}

// function usersFetchFinish() {
//    return { type: 'USERS_FETCH_FINISH'};
// }

// creating
function userCreate(user) {
   return { type: 'USER_CREATE', user}
}

function userCreateDone(user) {
   return { type: 'USER_CREATE_DONE', user};
}

function userCreateError(message) {
   return { type: 'USER_CREATE_ERROR', message};
}

// updating
function userUpdate(user) {
   return { type: 'USER_UPDATE', user}
}

function userUpdateDone(user) {
   return { type: 'USER_UPDATE_DONE', user};
}

function userUpdateError(message) {
   return { type: 'USER_UPDATE_ERROR', message};
}

// deleting
function userDelete(user) {
   return { type: 'USER_DELETE', user}
}

function userDeleteDone(user) {
   return { type: 'USER_DELETE_DONE', user};
}

function userDeleteError(message) {
   return { type: 'USER_DELETE_ERROR', message};
}
