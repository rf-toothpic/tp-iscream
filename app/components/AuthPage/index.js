/*
 * Copyright (c) 2019 OralEye Ltd.
 */

import PropTypes from 'prop-types'
import React from 'react'
import logo from 'images/logo.svg'
import styled from 'styled-components'
import styles from '../../containers/Auth/styles.css'

const Page = styled.div`
  display: flex;
  flex-direction: row;
  height:100%;
`

const Left = styled.div`
  flex:2;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
`
const Right = styled.div`
  flex:1;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
`

const AuthPage = ({ left, right }) => (
  <Page className={styles.leftright}>
    <Left>
      {left}
    </Left>
    <Right>
      {right}
    </Right>
  </Page>
)

AuthPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthPage
