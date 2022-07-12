import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumName: '',
      artistName: '',
      albums: '',
    };
  }

  async componentDidMount() {
    const { match: { params: {id} } } = this.props;
    const musics = await getMusics(id);
    this.setState(
      { albums: [...musics.slice(1)],
        artistName: musics[0].artistName,
        albumName: musics[0].collectionName,
      },
    );
  }

  render() {
    const { albums, artistName, albumName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h2 data-testid="album-name">{ albumName }</h2>
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
