const initState = {
    breeds: [],
    selectedBreed: '',
    loading: false,
    error: ''
}

const breedsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'breeds/loading': {
            return { ...state, loading: true }
        }
        case 'breeds/success': {
            return { ...state, loading: false, breeds: action.payload }
        }
        case 'breeds/error': {
            return { ...state, loading: false, breeds: [], error: action.payload }
        }
        default:
            return state
    }
};

export default breedsReducer;