import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, addToFavorites } = this.props;
    const { trackName, trackId, previewUrl } = music;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => addToFavorites(music) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  addToFavorites: PropTypes.func,
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
