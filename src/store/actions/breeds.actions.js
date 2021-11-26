const fetchBreeds = async (dispatch, getState) => {
    dispatch({ type: 'breeds/loading' });
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const payload = await response.json();
    dispatch({ type: 'breeds/success', payload })
};

const fetchImages = (breedsData) => async (
    dispatch,
    getState
  ) => {
    const imagesRequest = [];
    let tempUrl = '';
    breedsData.forEach(breed => {
        if(breed[1].length) {
            breed[1].forEach(family => {
                tempUrl = `https://dog.ceo/api/breed/${breed[0]}/${family}/images`;
                imagesRequest.push(tempUrl);
            });
        } else {
            tempUrl = `https://dog.ceo/api/breed/${breed[0]}/images`;
            imagesRequest.push(tempUrl);
        }
    });
    const images = await Promise.all(imagesRequest.map(url => fetch(url).then((response) => response.json())));
    let index = 0;
    const payload = [];
    breedsData.forEach(breed => {
        if(breed[1].length) {
            breed[1].forEach(family => {
                payload.push({
                    'key': `${breed[0]}-${family}`,
                    'image': images[index].message[0]
                });
                index += 1;
            });
        } else {
            payload.push({
                'key': `${breed[0]}`,
                'image': images[index].message[0]
            });
            index += 1;
        }
    });
    dispatch({ type: 'images/success', payload });
};

const setSelected = (breed) => (dispatch, getState) => {
    const payload = breed;
    dispatch({ type: 'breeds/select', payload });
};

export { fetchBreeds, fetchImages, setSelected };