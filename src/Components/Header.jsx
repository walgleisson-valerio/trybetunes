import React from 'react';
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
        { isLoading ? <Loading /> : (
          <h2 data-testid="header-user-name">{user.name}</h2>
        )}
      </header>
    );
  }
}

export default Header;
