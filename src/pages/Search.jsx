import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1>Search</h1>
        </div>
      </>
    );
  }
}

export default Search;
