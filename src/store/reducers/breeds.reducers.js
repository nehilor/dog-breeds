const initState = {
    breeds: [],
    images: [],
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
            console.log('action.payload => ', action.payload);
            return { ...state, loading: false, breeds: action.payload }
        }
        case 'breeds/error': {
            return { ...state, loading: false, breeds: [], error: action.payload }
        }
        case 'images/loading': {
            return { ...state, loading: true }
        }
        case 'images/success': {
            console.log('action.payload => ', action.payload);
            return { ...state, loading: false, images: action.payload }
        }
        default:
            return state
    }
};

export default breedsReducer;