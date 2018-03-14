const initialState = {
    title: null,
    meta: {
        keywords: [],
        description: ''
    },
    heading: '',
    'layout': 'default'
    // layoutCongfig - how the page will be shown
    // confing: {

    // }
}

export default function page(state = initialState, action) {
    switch (action.type) {
    	case 'PAGE_SET':
    		return Object.assign({}, state, {...action.page})
    }

    return state
}
