import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography } from '@mui/material';
import { fetchBreeds } from './store/actions/breeds.actions';

const Breeds = () => {
    const dispatch = useDispatch();
    const breedsData = useSelector((state) => state.breeds);
    const isLoading = useSelector((state) => state.loading);

    useEffect(() => {
        console.log('breedsData => ', breedsData);
        if (!isLoading && !breedsData.length) {
            //dispatch(fetchBreeds);
        }
    }, [breedsData.length, dispatch, isLoading]);


    return (
        <Card variant="outlined">
            <Typography variant="h4" component="h2">
                Form Example
            </Typography>
        </Card>
    );
};

export default Breeds;