import { AppBar, Button, Toolbar, Typography, makeStyles, Container  } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'

import { UserContext } from '../App';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontFamily: 'Grand Hotel, cursive',
    },
    button: {
        margin: '0 7px',
        // fontSize: '1rem',
        // textDecoration: 'underline',
        // backgoundColor: '#f99b33',
    }
  }));



function Navbar(){
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const classes = useStyles();
    return(
        <div>
            <AppBar position="static" className="appbar-navbar">
                <Container fixed>
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h4" className={classes.title}>Scheduler</Typography>
                    <Link to="/login" className="link-decoration"><Button variant="contained" color="secondary" className={classes.button}>Login</Button></Link>
                    <Link to="/signup" className="link-decoration"><Button variant="contained" color="secondary" className={classes.button}>SignUp</Button></Link>
                    
                   
                </Toolbar>
                </Container>
            </AppBar>
        </div>
    )

}
export default Navbar;
//     // useEffect(()=>{
//         // M.Sidenav.init(elems);
//         // let sidenav = document.querySelector('#mobile-demo');
//         // let buttonCollapse = document.querySelector(".button-collapse")
//         // M.Sidenav.init(sidenav, {});
//         // M.Sidenav.init(buttonCollapse, {})
//         // $(".button-collapse").sideNav();
//     //   },[])
      
//     //this function will return profile, create post link in nav if user is logged in otherwise it will return login and signup link in the navbar
//     const renderList=()=>{
//         if(state){
//             //if role == admin show add task
//             if(state.role === "ADMIN"){
//                 return([
//                     <li><Link to="/">Home</Link></li>,
//                     <li><Link to="/Create-Task">Create Task</Link></li>,
//                     <li><button className="btn waves-effect waves-light #d32f2f red darken-2" onClick={() => {
//                         localStorage.clear();
//                         dispatch({ type: "CLEAR" })
//                         history.push("/Login")
//                       }}>LOGOUT</button></li>      
//                 ])
//             }
//             //if role===USER then show home
//             else{
//                 return([
//                     // <li><Link to="/">Home</Link></li>,
//                     <li><button className="btn waves-effect waves-light #d32f2f red darken-2 right-align" onClick={() => {
//                         localStorage.clear();
//                         dispatch({ type: "CLEAR" })
//                         history.push("/Login")
//                       }}>LOGOUT</button></li>
//                 ])
//             }
           
//         } //if NOT LOGGED IN THEN SHOW SIGNUP AND LOGIN
//         else{
//             return(
//                 [
//                     <li><Link to="/login">Login</Link></li>,
//                     <li><Link to="/signup">SignUp</Link></li>
//                 ]
//             )
//         }
//     }

//     return(
//         <div>
//         <div className="wrapper">
//         <nav className="nav-wrapper">
//                 {/* <Link to="/"  className="brand-logo">Scheduler</Link> */}
//                 {/* <a href="" className="r"><i className="material-icons">menu</i></a> */}
//                 <ul className="right">
//                     {renderList()}
//                 </ul>
//         </nav>
//         </div>
//         <ul className="sidenav center-align" id="mobile-demo" >
//             {renderList()}
//         </ul>

//         {/* <ul id="slide-out" className="sidenav sidenav-fixed center-align invesible-top " id="mobile-demo" >
//                 {renderList()}
//         </ul> */}

//         {/* <ul id="slide-out" class="side-nav fixed">
//             <li><a href="#!">First Sidebar Link</a></li>
//             <li><a href="#!">Second Sidebar Link</a></li>
//         </ul> */}
//         </div>
//     )
// }

// export default Navbar;
