/**
 *
 * Nav
 *
 */

import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import ActiveListItem from 'components/ActiveListItem'
import Header, { drawerWidth } from 'components/Header'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginTop: 80
  }
}))

const Nav = ({ container, children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle () {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <UnstyledLink to='/leaderboard'>
          <ActiveListItem to='/leaderboard'>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Leaderboard' />
          </ActiveListItem>
        </UnstyledLink>
      </List>

      <Divider />
      <List>
        <UnstyledLink to='/entry'>
          <ActiveListItem to='/entry'>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='Create Entry' />
          </ActiveListItem>
        </UnstyledLink>
        <UnstyledLink to='/allergens'>
          <ActiveListItem to='/allergens'>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='Allergens' />
          </ActiveListItem>
        </UnstyledLink>
      </List>
      <Divider />
      <UnstyledLink to='/logout'>
        <ActiveListItem to='/logout'>
          <ListItemIcon> <MailIcon /></ListItemIcon>
          <ListItemText primary='Logout' />
        </ActiveListItem>
      </UnstyledLink>
    </div>
  )
  return <>
    <nav className={classes.drawer} aria-label='Mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>

    <Header handleDrawerToggle={handleDrawerToggle} />

    {React.Children.map(children, child => (<div className={classes.content}> {child}</div>))}
  </>
}

Nav.propTypes = {}

export default Nav
