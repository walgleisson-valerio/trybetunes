import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisable: true,
      text: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState(
      { [target.name]: target.value },
      () => this.handleButton(),
    );
  }

  handleButton() {
    const { text } = this.state;
    if (text.length >= 2) {
      this.setState(
        { isButtonDisable: false },
      );
    }
  }

  render() {
    const { isButtonDisable, text } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="search"
            data-testid="search-artist-input"
            name="text"
            value={ text }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisable }
            onClick={ this.onClick }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
