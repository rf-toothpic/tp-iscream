import { AppBar, IconButton } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { Link } from 'react-router-dom'

import Img from './Img'
import Logo from 'images/logo.svg'

export const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    background: 'white'
  }
}))

function Header ({ handleDrawerToggle }) {
  const classes = useStyles()
  return (
    <AppBar className={classes.appBar} position='fixed'>
      <Toolbar>
        <Hidden smUp implementation='css'>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='Menu' onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Link to='/' ><Img src={Logo} alt='toothpic logo' /></Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
