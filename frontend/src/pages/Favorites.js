import React from 'react';

const Favorites = () => {
    const [favourites, setFavourites] = React.useState([]);
    React.useEffect(() => {
        // fetch favourites from backend
        const favourites = fetchFavorites();
        setFavourites(favourites);
    }, []);
    return (
        <div>
            Favorites
        </div>
    );
}