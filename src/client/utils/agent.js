import axios from 'axios'
import _ from 'underscore'

export function fetchUsers(criteria) {
	let options = {}
	if (criteria) {
		const criteriaToSend = _.mapObject(_.omit(criteria, 'search', 'groupIds'), (value, name) => {
			return value === true ? 1 : 0
		})

		if (criteria.search) {
			criteriaToSend.search = criteria.search
		}

		if (criteria.groupIds !== undefined) {
			criteriaToSend.groupIds = criteria.groupIds.join()
		}

		if (criteria.ids !== undefined) {
			criteriaToSend.ids = criteria.ids.join()
		}

		options.params = criteriaToSend
	}

    return axios.get('/api/users', options)
}

export function fetchGroups() {
   return axios.get('/api/user/groups')
}

// export function sync(thenCallback, catchCallback, ...fetches) {
//    axios
//         .all([fetches])
//         .then(axios.spread(thenCallback))
//         .catch(catchCallback)
// }

export function fetchUser(userId) {
   return axios.get('/api/users/' + userId)
}

export function createUser(user) {
	return axios.post('/api/users', {user})
}

export function updateUser(user) {
	return axios.put('/api/users/' + user.id, {user: _.omit(user, 'id')})
}

export function deleteUser(user) {
	return axios.delete('/api/users/' + user.id)
}
