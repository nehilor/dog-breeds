import React from 'react';
import { Box,Typography, Grid, List, ListItem, ListItemText, Modal } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilies, setSelected, setFavorite, setFamily, setThumbs } from './store/actions/breeds.actions';

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
    },
    image: {
        display: 'block',
        width: '100%'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        padding: '25px'
    },
    link: {
        fontSize: '12px',
        color: 'green',
        cursor: 'pointer'
    }
}));

const BreedsList = ({ breeds }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const selectedBreed = useSelector((state) => state.selectedBreed);
    const selectedFamily = useSelector((state) => state.selectedFamily);
    const familiesData = useSelector((state) => state.families);
    const imagesData = useSelector((state) => state.images);
    const thumbsData = useSelector((state) => state.thumbs);
    const favoriteBreed = useSelector((state) => state.favorite);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = (breed) => {
        dispatch(setSelected(breed));
        dispatch(fetchFamilies(breed));
    }

    const selectFamily = (family) => {
        const selected = family ? `${selectedBreed}-${family}` : selectedBreed;
        dispatch(setFamily(selected));
        const imageUrl = imagesData?.filter(image => image.key === selected);
        const modalThubms = [];
        for(let i = 0; i < 3; i++) {
            modalThubms.push(imageUrl[0]?.images[i]);
        }
        dispatch(setThumbs(modalThubms));
        handleOpen();
    };

    const getThumb = (family) => {
        const key = family ? `${selectedBreed}-${family}` : selectedBreed;
        const imageUrl = imagesData?.filter(image => image.key === key);
        return imageUrl.length > 0 ? imageUrl[0]?.images[0] : '';
    }

    const selectFavorite = (breed) => {
        dispatch(setFavorite(breed));
    }

    return (
        <Grid container spacing={1} className={classes.root}>
             <Grid item xs={12} md={12}>
                <Typography variant="h4" component="h2">
                    Dog Breeds Application
                </Typography>
                {favoriteBreed && 
                    <Typography variant="h6" component="h2">
                        Favorite breed: {favoriteBreed}
                    </Typography>
                }
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
                {familiesData?.message?.length > 0 ? 
                    <div>
                        <Typography variant="h6" component="h2">
                            Breed families
                        </Typography>
                        <List dense={true} className={classes.list}>
                            {familiesData?.message?.map((f, i) => 
                                <ListItem onClick={() => selectFamily(f)}  className={classes.item} key={i}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} md={6}>
                                            <img className={classes.image} alt={f} src={getThumb(f)} />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <ListItemText primary={f} />
                                        </Grid>
                                    </Grid>
                                </ListItem>)
                            }
                        </List>
                    </div>
                : 
                    <div>
                        <Typography variant="h6" component="h2">
                            Breed families
                        </Typography>
                        <List dense={true} className={classes.list}>
                            <ListItem onClick={() => selectFamily('')}  className={classes.item} key={selectedBreed}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={6}>
                                        <img className={classes.image} alt={selectedBreed} src={getThumb('')} />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <ListItemText primary={selectedBreed} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                    </div>
                }
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box className={classes.modal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Viewing breed: {selectedFamily} <span className={classes.link} onClick={() => selectFavorite(selectedFamily)}>Set as favorite</span>
                </Typography>
                <Grid container spacing={1}>
                    {thumbsData?.map((thumb, i) => <Grid item xs={4} md={4}><img className={classes.image} alt={selectFamily} key={i} src={thumb} /></Grid>)}
                </Grid>
            </Box>
        </Modal>
        </Grid>
    );
};

export default BreedsList;