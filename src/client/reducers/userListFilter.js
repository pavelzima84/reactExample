const initialState = {
    init: false,
  	criteria: {}
}

export default function userListFilter(state = initialState, action) {
    switch (action.type) {
    	// case 'RECEIVE_GROUPS':
    	// 	const criteria = {
		   //      active: true,
		   //      deactive: true,
		   //      groupIds: _.pluck(action.groups.items, 'id')
		   //  }

    	// 	return Object.assign({}, state, {criteria, init: true})
    	case 'USERS_FILTER_CHANGED':
    		return Object.assign({}, state, {criteria: action.criteria})
    }

    return state
}
