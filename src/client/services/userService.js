// import axios from 'axios'
import agent from './agent'

// TODO: Short time cached data!
const cache {
	users: {
		items:[],
		loadedAt: null
	},
	groups: {
		items:[],
		loadedAt: null 	
	}
}

const resolve = ()

export default class UserService {

	getAllUsers() {
		return new Promise((resolve, reject) => {

		})
	}

	getUserById(userId) {

	}

	addUser(user) {

	}

	deleteUser(user) {

	} 

// 	getUserPromise() {
// 		return axios.get('/api/users/' + this.props.routeParams.userId)
// 	}

// 	getUsersPromise() {
// 		return axios.get('/api/user/groups')

// 		const getUserRequest = axios.get('/api/users/' + this.props.routeParams.userId)
//     const getGroupsRequest = axios.get('/api/user/groups')

//     axios
//       .all([getUserRequest, getGroupsRequest])
//       .then(axios.spread((userResponse, groupsResponse) => {
//           this.setState({
//             user: userResponse.data.user,
//             groups: groupsResponse.data.groups
//           })
//       }))
// 	}

// 	loadGroups() {

// 	}

}