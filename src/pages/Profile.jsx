import React from 'react';
import Header from '../Components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h1>Proofile</h1>
        </div>
      </>
    );
  }
}

export default Profile;
