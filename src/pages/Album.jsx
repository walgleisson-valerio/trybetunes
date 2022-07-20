import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumName: '',
      artistName: '',
      isLoading: false,
      album: [],
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState(
      { album: [...musics.slice(1)],
        artistName: musics[0].artistName,
        albumName: musics[0].collectionName,
        favorites,
      },
    );
  }

  addToFavorites = async (music) => {
    this.setState({ isLoading: true });
    await addSong(music);
    const favorites = await getFavoriteSongs();
    this.setState({ isLoading: false, favorites });
  }

  isFavorite = (music) => {
    const { favorites } = this.state;
    return favorites.some((favorite) => music.trackId === favorite.trackId);
  }

  render() {
    const { album, artistName, albumName, isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h2 data-testid="album-name">{ albumName }</h2>
        </div>
        <div>
          {isLoading && <Loading />}
          {album.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              isFavorite={ this.isFavorite(music) }
              addToFavorites={ this.addToFavorites }
            />
          ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default Album;
