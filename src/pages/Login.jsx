import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtonDisable: true,
      isLoading: false,
      redirect: false,
    };
  }

  validateButton = () => {
    const minNameLength = 3;
    const { name } = this.state;
    if (name.length >= minNameLength) {
      this.setState(
        { isButtonDisable: false },
      );
    } else {
      this.setState(
        { isButtonDisable: true },
      );
    }
  }

  onInputChange = ({ target }) => {
    this.setState(
      { [target.name]: target.value },
      () => this.validateButton(),
    );
  }

  saveUser = async () => {
    const { name } = this.state;
    this.setState(
      { isLoading: true },
    );
    await createUser({ name });
    this.setState({ isLoading: false, redirect: true });
  }

  render() {
    const { name, isButtonDisable, isLoading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        { isLoading ? (<Loading />) : (
          <section>
            <h1>Login</h1>
            <form>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ isButtonDisable }
                onClick={ this.saveUser }
              >
                Entrar
              </button>
            </form>
          </section>
        )}
        { redirect ? <Redirect to="/search" /> : '' }
      </div>
    );
  }
}

export default Login;
