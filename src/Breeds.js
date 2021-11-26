import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { fetchBreeds, fetchImages, setSelected } from './store/actions/breeds.actions';

const useStyles = makeStyles(theme => ({
    root: {
        width: '480px',
        textAlign: 'center',
        margin: '0 auto',
        padding: '25px 0'
    },
    item: {
        textTransform: 'capitalize',
        cursor: 'pointer',
    },
    list: {
        maxHeight: '100vh',
        overflow: 'auto'
    }
}));

const Breeds = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const breedsData = useSelector((state) => state.breeds);
    const imagesData = useSelector((state) => state.images);
    const selectedBreed = useSelector((state) => state.selectedBreed);
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

    const handleClick = (breed) => {
        dispatch(setSelected(breed));
    }

    return (
        <Grid container spacing={1} className={classes.root}>
             <Grid item xs={12} md={12}>
                <Typography variant="h4" component="h2">
                    Dog Breeds Application
                </Typography>
             </Grid>
            <Grid item xs={6} md={6}>
                <List dense={true} className={classes.list}>
                {breeds.map((b, i) => <ListItem className={classes.item} key={i}><ListItemText onClick={() => handleClick(b.key)} primary={b.name} /></ListItem>)}
                </List>
            </Grid>
            <Grid item xs={6} md={6}>
            <Typography variant="body1" component="h2">
                {selectedBreed ? `Selected breed: ${selectedBreed}` : 'Please select a breed'}
            </Typography>
            </Grid>
        </Grid>
    );
};

export default Breeds;