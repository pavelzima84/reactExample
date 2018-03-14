import {fetchUser} from '../utils/agent'

export function asycFetchUser(dispatch, userId) {
    return new Promise((resolve, reject) => {
        dispatch(userFetch(userId))

        fetchUser(userId)
          .then((response) => {
              dispatch(userFetchDone(response.data.user))
              resolve(response.data.user)
          })
          .catch((response) => {
              dispatch(userFetchError(userId, response))
              reject(response)
          })
    })
}

// fetching
function userFetch() {
   return { type: 'USER_FETCH'}
}

function userFetchDone(user) {
   return { type: 'USER_FETCH_DONE', user};
}

function userFetchError(userId, message) {
   return { type: 'USER_FETCH_ERROR', userId, message};
}
