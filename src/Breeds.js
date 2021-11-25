import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { fetchBreeds, fetchImages } from './store/actions/breeds.actions';
//import { IBreeds } from './interfaces/interfaces';

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
        console.log('data => ', data);
        /*const breeds = data.map(breed => {
            return breed;
        });
        console.log('breeds => ', breeds);*/
    }

    return (
        <Card variant="outlined">
            <Typography variant="h4" component="h2">
                Dog Breeds Application
            </Typography>
            <Grid container spacing={2}>
            <List dense={true}>
              {breeds.map((b, i) => <ListItem key={i} value={b}><ListItemText primary={b} /></ListItem>)}
            </List>
            </Grid>
        </Card>
    );
};

export default Breeds;