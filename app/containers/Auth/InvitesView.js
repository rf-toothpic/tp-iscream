import AsyncButton from 'components/AsyncButton'
import Button from 'components/Button'
import ErrorText from 'components/ErrorText'
import Logo from 'components/Logo'
import Text from 'components/Text'
import TextField from 'components/TextField'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import PasswordRequirements from '../../components/PasswordRequirements'
import styles from './styles.css'

class InvitesView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      passwordConfirm: '',
      type: 'assessor',
      invitation_token: props.token,
      error: {}
    }
  }

  @autobind
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: {}
    })
  }

  @autobind
  validatePasswords () {
    const { password, passwordConfirm, validPassword } = this.state
    return password === passwordConfirm && validPassword
  }

  @autobind
  checkValid (validPassword) {
    this.setState({ validPassword })
  }

  @autobind
  onFormSubmit () {
    const { acceptInvite } = this.props
    if (this.validatePasswords()) {
      acceptInvite(this.state)
    }
  }

  @autobind
  accept(){
    const {acceptInvite} = this.props
    acceptInvite(this.state)
  }

  render () {
    const { error, loading, inviteSuccess } = this.props
    const { password, passwordConfirm, error: error1 } = this.state
    return (
      <div className={styles.cardContainer}>
        <form onSubmit={this.onFormSubmit}>
          <div className={styles.formContainer}>
            <Logo />
            <div className={styles.instructions}>
              <Text>Welcome to Toothpic</Text>
            </div>
            {inviteSuccess && (
              <div>
                <Text>Password Set Successfully</Text>
                <Button
                  onClick={() => {
                    window.location = '/login'
                  }}
                  variant='contained'
                  color='primary'
                  style={{ marginTop: '20px' }}
                >
                  Go to Login
                </Button>
              </div>
            )}
            {!inviteSuccess && (
              <div>
                <TextField
                  label='Create a Password'
                  value={password}
                  name='password'
                  onChange={this.onChange}
                  helperText={error1.password && error1.password.message}
                  error={!!error1.password}
                  onBlur={this.onBlur}
                  type='password'
                  className={styles.input}
                />
                <TextField
                  label='Confirm Password'
                  value={passwordConfirm}
                  name='passwordConfirm'
                  onChange={this.onChange}
                  helperText={error1.confirm && error1.confirm.message}
                  error={!!error1.confirm}
                  onBlur={this.onBlur}
                  type='password'
                  className={styles.input}
                />
                {error && <ErrorText error={error} />}

                <PasswordRequirements password={password} onValidChange={this.checkValid} />

                <AsyncButton
                  onClick={this.accept}
                  disabled={loading || !this.validatePasswords()}

                  loading={loading}
                  variant='contained'
                  color='primary'
                >
                  Set Password
                </AsyncButton>
              </div>
            )}
          </div>
        </form>
      </div>
    )
  }
}

InvitesView.propTypes = {
  acceptInvite: PropTypes.func.isRequired,
  error: PropTypes.object,
  inviteSuccess: PropTypes.bool,
  loading: PropTypes.bool,
  token: PropTypes.string
}

export default InvitesView

InvitesView.defaultProps = {
  error: null,
  inviteSuccess: false,
  loading: false,
  token: ''
}
