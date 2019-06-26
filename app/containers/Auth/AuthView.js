import Button from 'components/Button'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import React from 'react'
import AuthPage from 'components/AuthPage'

import styles from './styles.css'

const inlineStyle = {
  loginButton: {
    // backgroundColor: 'var(--dark)',
    // color: 'white',
    width: '300px',
    height: '78px',
    borderRadius: '8px',
    textTransform: 'capitalize'
  },
  buttonContainerStyle: {
    width: '300px',
    borderRadius: '8px'
  },
  input: {
    width: '300px',
    marginBottom: '30px',
    height: '80px',
    color: '#9D9EAB'
  },
  resetButton: {
    float: 'left',
    textTransform: 'capitalize',
    color: 'var(--pink)'
  },
  labelStyle: {
    fontSize: '20px'
  },
  inputText: {
    color: '#9D9EAB'
  }
}

const AuthView = ({ userLogin, loading, error, email, password, onChange }) => {
  console.log('here')

  const doLogin = (e) => {
    e.preventDefault()
    userLogin()
  }

  return (
    <form onSubmit={doLogin}>
      <AuthPage>
        <TextField
          label='Email'
          value={email}
          error={!!error}
          onChange={onChange}
          name='email'
          type='email'
          required
          className={styles.input}
          style={inlineStyle.input}
          autoFocus
        />
        <TextField
          label='Password'
          value={password}
          onChange={onChange}
          error={!!error}
          type='password'
          name='password'
          required
          className={styles.input}
          style={inlineStyle.input}
        />

        {error && error.message}

        <Button
          variant='contained'
          disabled={loading}
          color='primary'
          style={inlineStyle.loginButton}
          loading={loading}
          onClick={doLogin}
          type='submit'
        >
            Login
        </Button>
      </AuthPage>
    </form>
  )
}

AuthView.propTypes = {
  email: PropTypes.string,
  emailError: PropTypes.object,
  error: PropTypes.object,
  onChange: PropTypes.func,
  password: PropTypes.string,
  userLogin: PropTypes.func,
  loading: PropTypes.bool,
  showResetPasswordModal: PropTypes.func
}

export default AuthView
