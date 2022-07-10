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
      artistSearched: '',
      results: [],
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
    const { artist } = this.state;
    this.setState(
      {
        isButtonDisable: true,
        isLoading: true,
        artistSearched: artist,
        results: [],
      },
    );
    const results = await searchAlbumsAPI(artist);
    this.setState(
      { artist: '',
        isLoading: false,
        results,
      },
    );
  }

  render() {
    const { isButtonDisable, artist, isLoading, artistSearched, results } = this.state;
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
        <section>
          <div>
            {
              artistSearched !== ''
              && results.length !== 0
                ? <h2>{ `Resultado de álbuns de: ${artistSearched}`}</h2>
                : <h3>Nenhum álbum foi encontrado</h3>
            }
            <div>
              { results.length !== 0
              && results.map((result) => (
                <p key={ result.collectionId }>{ result.collectionName }</p>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Search;
