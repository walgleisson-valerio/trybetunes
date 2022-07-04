import React from 'react';
import Header from '../Components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Profile Edit</h1>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
