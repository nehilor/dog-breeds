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
                    'images': images[index].message
                });
                index += 1;
            });
        } else {
            payload.push({
                'key': `${breed[0]}`,
                'images': images[index].message
            });
            index += 1;
        }
    });
    dispatch({ type: 'images/success', payload });
};

const fetchFamilies = (breed) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: 'families/loading' });
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
    const payload = await response.json();
    dispatch({ type: 'families/success', payload });
};

const setFamily = (family) => async (
    dispatch,
    getState
) => {
    const payload = family;
    dispatch({ type: 'families/select', payload });
};

const setSelected = (breed) => (dispatch, getState) => {
    const payload = breed;
    dispatch({ type: 'breeds/select', payload });
};

const setThumbs = (images) => async (
    dispatch,
    getState
) => {
    const payload = images;
    dispatch({ type: 'families/thumbs', payload });
};

const setFavorite = (breed) => async (
    dispatch,
    getState
) => {
    const payload = breed;
    dispatch({ type: 'breeds/favorite', payload });
};

export { fetchBreeds, fetchImages, fetchFamilies, setFamily, setFavorite, setSelected, setThumbs };