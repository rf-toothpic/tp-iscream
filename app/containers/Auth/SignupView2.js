import AllergensList from 'components/AllergensList'
import Button from 'components/Button'
import TextField from '@material-ui/core/TextField'
import Allergens from 'containers/Allergens'
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

const SignupView2 = ({ createUser, loading, error, email, password, name, allergens, onChange }) => {
  const doUpdate = (e) => {
    e.preventDefault()
    createUser({ email, password, allergens, name })
  }

  return (
    <div className={styles.cardContainer}>
      <form onSubmit={doUpdate}>
        <AuthPage>

          <TextField
            label='Name'
            value={name}
            error={!!error}
            onChange={onChange}
            name='name'
            type='text'
            required
            className={styles.input}
            style={inlineStyle.input}
            autoFocus
          />

          <Allergens selected={allergens} onChange={onChange} />

          {error && error.message}

          <Button
            variant='contained'
            disabled={loading}
            color='primary'
            style={inlineStyle.signupButton}
            loading={loading}
            onClick={doUpdate}
            type='submit'
          >
              Finish
          </Button>
        </AuthPage>
      </form>
    </div>
  )
}

SignupView2.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  allergens: PropTypes.array.isRequired,
  createUser: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default SignupView2
