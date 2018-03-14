const initialState = {
  user: null
}

export default function user(state = initialState, action) {    
    switch (action.type) {
        case 'USER_UPDATE':
            return Object.assign({}, state, {user: null})
        case 'USER_UPDATE_DONE':
            return Object.assign({}, state, {user: action.user})
        case 'USER_UPDATE_ERROR':
            return Object.assign({}, state, {userId: action.userId, message: action.message})
    }

    return state
}
