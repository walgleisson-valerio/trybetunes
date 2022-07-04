import React from 'react';
import Header from '../Components/Header';

class Album extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
        </div>
      </>
    );
  }
}

export default Album;
