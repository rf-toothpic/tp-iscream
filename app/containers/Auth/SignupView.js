import Button from 'components/Button'
import TextField from 'components/TextField'
import PropTypes from 'prop-types'
import React from 'react'
import AuthPage from 'components/AuthPage'

import styles from './styles.css'

const inlineStyle = {
  signupButton: {
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

const SignupView = ({ signupUser, loading, error, email, password, onChange }) => {
  const doSignup = (e) => {
    e.preventDefault()
    signupUser({ email, password })
  }

  return (
    <div className={styles.cardContainer}>
      <form onSubmit={doSignup}>
        <AuthPage right={
          <>
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
              style={inlineStyle.signupButton}
              loading={loading}
              onClick={doSignup}
              type='submit'
            >
                        Signup
            </Button>
          </>
        } left={
            <>
              <Button href='/login'>Login</Button>
            </>
        } />
      </form>
    </div>
  )
}

SignupView.propTypes = {
  email: PropTypes.string,
  emailError: PropTypes.object,
  error: PropTypes.object,
  onChange: PropTypes.func,
  password: PropTypes.string,
  userSignup: PropTypes.func,
  loading: PropTypes.bool,
  showResetPasswordModal: PropTypes.func
}

export default SignupView
