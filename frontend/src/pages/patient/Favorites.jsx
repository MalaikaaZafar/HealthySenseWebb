import React, { useEffect, useState } from 'react';
import fetchFavorites from '../../services/fetchFavorites';
import DoctorCard from '../../components/DoctorCard';
import Box from '@mui/material/Box';
import { Alert, AlertTitle } from '@mui/material';

const Favorites = () => {
    const [favourites, setFavourites] = useState([]);
    const [favouritesChanged, setFavouritesChanged] = useState(false);

    useEffect(() => {
        // fetch favourites from backend
        const fetchFavs = async () => {
            const favourites = await fetchFavorites();
            setFavourites(favourites);
        }
        fetchFavs();

    }, [favouritesChanged]);
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
                {
                    favourites?.length > 0 ? (favourites.map((doctor) => {
                        return (
                            <DoctorCard user={doctor} buttons={true} onFavChanged={() => setFavouritesChanged(!favouritesChanged)} isFav={true} />
                        );
                    })) :

                        <Alert
                            severity="info"
                            sx={{
                                fontSize: 20,
                                backgroundColor: '#f7f7f7',
                                color: '#000',
                                fontWeight: 'normal',
                                borderRadius: 3,
                                display: 'flex',
                                width: '80%',
                                marginTop: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignSelf: 'center',

                                '& .MuiAlert-icon': {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                },
                            }}

                            icon={
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <img src={require("../../assets/images/favorites.png")} alt="loading" style={{ width: '30%', height: '30%', marginLeft: '5px' }} />
                                </div>
                            }
                        >
                            <AlertTitle
                                sx={{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                            >Uh Oh!</AlertTitle>
                            It seems you have no favorite doctors yet. Navigate to Home to start adding some!
                        </Alert>
                }
            </Box>
        </div>
    );
}

export default Favorites;