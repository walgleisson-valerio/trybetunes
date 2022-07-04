import React from 'react';
import Header from '../Components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <h1>Favorites</h1>
        </div>
      </>
    );
  }
}

export default Favorites;
