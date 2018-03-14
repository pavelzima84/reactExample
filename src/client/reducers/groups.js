const initialState = {
    items: [],
    state: 'init' // | 'pending' | 'ready' | 'invalid'
    // ready: false 
}

export default function groups(state = initialState, action) {
    switch (action.type) {
      case 'GROUPS_FETCH':
        return Object.assign({}, state, {
            state: 'pending',
            // ready: false,
            items: []
        })
      case 'GROUPS_FETCH_DONE':
        return Object.assign({}, state, {
            state: 'ready',
            // ready: true,
            items: action.groups
        })
    }

   return state
}