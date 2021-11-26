const initState = {
    breeds: [],
    images: [],
    families: [],
    selectedBreed: '',
    selectedFamily: '',
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
        case 'breeds/select': {
            return { ...state, selectedBreed: action.payload }
        }
        case 'families/loading': {
            return { ...state, loading: true }
        }
        case 'families/success': {
            return { ...state, loading: false, families: action.payload }
        }
        case 'families/select': {
            console.log('action.payload => ', action.payload);
            return { ...state, selectedFamily: action.payload }
        }
        case 'images/loading': {
            return { ...state, loading: true }
        }
        case 'images/success': {
            return { ...state, loading: false, images: action.payload }
        }
        default:
            return state
    }
};

export default breedsReducer;