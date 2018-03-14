import {fetchGroups} from '../utils/agent'

export function asycFetchGroups(dispatch) {
    return new Promise((resolve, reject) => {
        dispatch(groupsFetch())

        fetchGroups()
          .then((response) => {
              dispatch(groupsFetchDone(response.data.groups))

              resolve(response.data.groups)
          })
          .catch((response) => {
              groupsFetchError(response)

              reject(response)
          })
    })
}

function groupsFetch() {
   return { type: 'GROUPS_FETCH'}
}

function groupsFetchDone(groups) {
   return { type: 'GROUPS_FETCH_DONE', groups}
}

function groupsFetchError(resopnse) {
   return { type: 'GROUPS_FETCH_ERROR', message: resopnse.message};
}
