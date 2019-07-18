import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useSetState } from 'react-use';

import '../styles/login.css';
import { LoginComponent } from '../components/LoginComponent';
import { getSessionToken } from '../services/session';

function LoginContainer(props) {
  const [input, setInput] = useSetState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');

  function handleTextInputChange(e) {
    setInput({ [e.target.name]: e.target.value });
  }

  function handleCheckboxInputChange() {
    setInput({ remember: !input.remember });
  }

  function handleSubmit(e) {
    e.preventDefault();
    getSessionToken(input.email, input.password, input.remember)
      .then(props.history.push.bind(null, '/'))
      .catch(() => setError('Invalid credentials'));
  }

  return (
    <LoginComponent
      handleSubmit={handleSubmit}
      handleTextInputChange={handleTextInputChange}
      handleCheckboxInputChange={handleCheckboxInputChange}
      inputValues={input}
      error={error}
    />
  );
}

export const Login = observer(LoginContainer);