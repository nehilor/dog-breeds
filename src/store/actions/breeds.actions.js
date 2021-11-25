const fetchBreeds = async (dispatch, getState) => {
    dispatch({ type: 'breeds/loading' })
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const payload = await response.json();
    dispatch({ type: 'breeds/success', payload })
};

export { fetchBreeds };