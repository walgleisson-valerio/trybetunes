import React from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isButtonDisable: true,
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState(
      { [target.name]: target.value },
      () => this.handleButton(),
    );
  }

  handleButton() {
    const { artist } = this.state;
    if (artist.length >= 2) {
      this.setState(
        { isButtonDisable: false },
      );
    }
  }

  searchAlbuns = async () => {
    this.setState({ isLoading: true });
    const { artist } = this.state;
    await searchAlbumsAPI(artist);
    this.setState({ artist: '', isLoading: false });
  }

  render() {
    const { isButtonDisable, artist, isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          { isLoading ? <Loading /> : (
            <section>
              <input
                type="search"
                data-testid="search-artist-input"
                name="artist"
                value={ artist }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isButtonDisable }
                onClick={ this.searchAlbuns }
              >
                Pesquisar
              </button>
            </section>
          )}
        </div>
      </>
    );
  }
}

export default Search;
