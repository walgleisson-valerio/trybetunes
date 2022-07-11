import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      user: {},
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ user });
    this.setState({ isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes!</h1>
        <section className="header-links">
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favotitos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </section>
        { isLoading ? <Loading /> : (
          <h2 data-testid="header-user-name">{user.name}</h2>
        )}
      </header>
    );
  }
}

export default Header;
