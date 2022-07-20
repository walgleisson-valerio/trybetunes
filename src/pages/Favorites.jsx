import React from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  removeToFavorites = async (music) => {
    this.setState({ isLoading: true });
    await removeSong(music);
    const favorites = await getFavoriteSongs();
    this.setState({ isLoading: false, favorites });
  }

  render() {
    const { favorites, isLoading } = this.state;
    const TRUE = true;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <h1>Favorites</h1>
          {isLoading && <Loading />}
          {favorites.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              isFavorite={ TRUE }
              addToFavorites={ this.removeToFavorites }
            />
          ))}
        </div>
      </>
    );
  }
}

export default Favorites;
