/*
 * Copyright (c) 2019 OralEye Ltd.
 */

import PropTypes from 'prop-types'
import React from 'react'
import logo from 'images/logo.svg'
import styled from 'styled-components'
import styles from '../../containers/Auth/styles.css'

const Page = styled.div`
  opacity: 1;
  max-width: 680px;
  margin:0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
  text-align: center;
`

const AuthPage = props => (
  <Page className={styles.formContainer}>
    <a href='/login'><img src={logo} className={styles.logo} /></a>
    {props.children}
  </Page>
)

AuthPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthPage
