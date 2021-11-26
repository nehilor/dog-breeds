import React from 'react';
import { Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilies, setSelected, setFamily } from './store/actions/breeds.actions';

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

const BreedsList = ({ breeds }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedBreed = useSelector((state) => state.selectedBreed);
    const familiesData = useSelector((state) => state.families);
    const imagesData = useSelector((state) => state.images);

    const handleClick = (breed) => {
        dispatch(setSelected(breed));
        dispatch(fetchFamilies(breed));
    }

    const selectFamily = (family) => {
        dispatch(setFamily(family));
    };

    const getThumb = (breed, family) => {
        console.log('imagesData => ', imagesData);
        console.log('breed => ', breed);
        console.log('family => ', family);
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
                <Typography variant="h4" component="h2">
                    {selectedBreed ? `Selected breed: ${selectedBreed}` : 'Please select a breed'}
                </Typography>
                {familiesData && 
                    <div>
                        <Typography variant="h6" component="h2">
                            Breed families
                        </Typography>
                        <List dense={true} className={classes.list}>
                            {familiesData.message.map((f, i) => 
                                <ListItem className={classes.item} key={i}>
                                    <div>
                                        <img alt={f} src={getThumb(f)} />
                                        <ListItemText onClick={() => selectFamily(selectedBreed, f)} primary={f} />
                                    </div>
                                </ListItem>)
                            }
                        </List>
                    </div>
                }
            </Grid>
        </Grid>
    );
};

export default BreedsList;