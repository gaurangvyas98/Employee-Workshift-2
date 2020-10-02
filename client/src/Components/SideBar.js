import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import history, { Route, useHistory, Link } from 'react-router-dom'
import HomePage from './Screens/Home';
import CreateTask from './Screens/CreateTask';
import { Avatar, Button, Switch } from '@material-ui/core';

import { UserContext } from '../App';
import { AssignmentTurnedIn, PeopleAlt, Person } from '@material-ui/icons';
import AllEmployees from './Screens/AllEmployees';
import Profile from './Screens/Profile';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign: 'center',
  },
  sideBarList: {
    backgroundColor: '#fad208',
    margin: '5px auto',
    borderRadius: 25,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
     
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: '#fff',

    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#2e2e2e !important',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    backgroundColor: '#fff',
    backgroundSize: 'cover !important',
    // height: '100vh',
  },
  logoutButton: {
    marginLeft: 'auto',
  },
  UserPicNameDetails:{
    margin: '0 auto',
    textAlign: 'center',
    color: '#fff',
  },
  avatar:{
    width: '50%',
    height: '50%',
    textAlign: 'center',
    margin: '15% auto 2% auto',
    border: '2px solid #fad208',
  },
  dividerLine:{
    backgroundColor: '#fff',
    backgroundColor: '#fff',
    width: '60%',
    textAlign: 'center',
    margin: '10% auto',
    height: '2px',
  }
}));

function SideBar(props) {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userItemList = [
    {
      text: "Home",
      icon: <Home />,
      onClick: () => history.push("/")
    },
    {
      text: "Profile",
      icon: <Person />,
      onClick: () => history.push("/Profile")
    },
    // {
    //   text: "All Tasks",
    //   icon: <AssignmentTurnedIn />,
    //   onClick: () => history.push("/All-Task")
    // },
    {
      text: "Employees",
      icon: <PeopleAlt />,
      onClick: () => history.push("/All-Employee")
    }
  ];
 const adminItemList = [
    {
      text: "Home",
      icon: <Home />,
      onClick: () => history.push("/")
    },
    {
      text: "Profile",
      icon: <Person />,
      onClick: () => history.push("/Profile")
    },
    {
      text: "Create Task",
      icon: <AssignmentTurnedIn />,
      onClick: () => history.push("/Create-Task")
    },
    {
      text: "View Employees",
      icon: <PeopleAlt />,
      onClick: () => history.push("/All-Employee")
    }
  ];



  const drawer = (
    <div>
      <div className={classes.UserPicNameDetails}>
          <Avatar alt="Remy Sharp" src={state.pic}  className={classes.avatar} />
          <h3>{state.name}</h3>
          {/* <h4>{state.role}</h4> */}
          <h5>{state.email}</h5>
      </div>
      <Divider light className={classes.dividerLine}/>
      <List>
        {
           (state.role==="ADMIN" ) ? adminItemList.map((item, index) => {
                                      const { text, icon,onClick } = item;
                                      return (
                                          <ListItem button key={text} onClick={onClick} className={classes.sideBarList}>
                                          <ListItemIcon>{icon}</ListItemIcon>
                                          <ListItemText primary={text} />
                                          </ListItem>
                                      );
                                    }) 
                                      : 
                                       userItemList.map((item, index) => {
                                        const { text, icon,onClick } = item;
                                        return (
                                            <ListItem button key={text} onClick={onClick} className={classes.sideBarList}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText primary={text} />
                                            </ListItem>
                                        );
                                      })
        }
      </List>
      <Divider light className={classes.dividerLine}/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer"  onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Button  variant="contained" color="secondary" startIcon={<ExitToAppIcon />} className={classes.logoutButton} 
                      onClick={() => {
                        localStorage.clear();
                        dispatch({ type: "CLEAR" })
                        history.push("/Login")
                      }}>LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
       
          {props.path === "Home" && <HomePage />} 
          {props.path === "Create-Task" && <CreateTask />}
          {props.path === "All-Employee" && <AllEmployees />}
          {props.path === "Profile" && <Profile />}
     
      </main>
    </div>
  );
}

SideBar.propTypes = {
    container: PropTypes.object,
  };


export default SideBar;
