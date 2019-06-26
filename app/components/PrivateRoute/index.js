import Nav from 'components/Nav'
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <>
            <Nav>
              <Component {...props} />
            </Nav>
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object
}

export default PrivateRoute
