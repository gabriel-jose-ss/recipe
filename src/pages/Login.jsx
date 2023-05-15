import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validateForm = () => {
    const MIN = 6;
    const validate = /^\S+@\S+\.\S+$/;
    const notValid = validate.test(email) && password.length > MIN;
    return !notValid;
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className='container-login'>
    <form className='login'>
      <label htmlFor="email">
        Email
        <input
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          onChange={ ({ target }) => setPassword(target.value) }
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
        />
      </label>
      <button
        onClick={ handleClick }
        data-testid="login-submit-btn"
        type="button"
        disabled={ validateForm() }
      >
        Enter

      </button>
    </form>
    </div>
  );
}

export default Login;
