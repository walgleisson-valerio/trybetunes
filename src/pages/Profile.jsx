import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      user,
      isLoading: false,
    });
  }

  render() {
    const {
      isLoading,
      user: { name, email, image, description },
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {isLoading ? <Loading /> : (
            <>
              <h1>Profile</h1>
              <h3>{ name }</h3>
              <p>{ email }</p>
              <img
                src={ image }
                alt={ name }
                data-testid="profile-image"
              />
              <p>{ description }</p>
              <Link to="/profile/edit">
                Editar perfil
              </Link>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
