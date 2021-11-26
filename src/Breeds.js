import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreeds, fetchImages } from './store/actions/breeds.actions';
import BreedsList from './BreedsList';

const Breeds = () => {
    
    const dispatch = useDispatch();
    const breedsData = useSelector((state) => state.breeds);
    const imagesData = useSelector((state) => state.images);
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        if (!breedsData.message) {
            dispatch(fetchBreeds);
        } else {
            if(!imagesData.length){
                const data = Object.entries(breedsData.message);
                dispatch(fetchImages(data));
            } else {
                mapData(Object.entries(breedsData.message));
            }
        }
    }, [breedsData, dispatch, imagesData]);

    const mapData = (data) => {
        const breedsArray = data.map(breed => {
            return {
                'name': `${breed[0]}`,
                'key': `${breed[0]}`
            }
        });
        setBreeds(breedsArray);
    }
    
    return (
        <BreedsList breeds={breeds} />
    );
};

export default Breeds;