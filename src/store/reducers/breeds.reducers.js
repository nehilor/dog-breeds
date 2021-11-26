const initState = {
    breeds: [],
    images: [],
    families: [],
    thumbs: [],
    selectedBreed: '',
    selectedFamily: '',
    favorite: '',
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
        case 'breeds/favorite': {
            return { ...state, favorite: action.payload }
        }
        case 'families/loading': {
            return { ...state, loading: true }
        }
        case 'families/success': {
            return { ...state, loading: false, families: action.payload }
        }
        case 'families/select': {
            return { ...state, selectedFamily: action.payload }
        }
        case 'families/thumbs': {
            return { ...state, thumbs: action.payload }
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