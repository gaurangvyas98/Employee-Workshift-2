import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {BrowserRouter, Route, useHistory, Switch} from 'react-router-dom';
import Login from './Components/Screens/Login';
import Home from './Components/Screens/Home';
import Signup from './Components/Screens/Signup';
import Navbar from './Components/Navbar'
import CreateTask from './Components/Screens/CreateTask';

import { initialState, reducer } from './Reducer/userReducer';

export const UserContext = createContext();


//we can't access history in browserrouter component
//useReducer is similar to useState, we use it with context
const Routing=()=>{
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  // console.log(state)
  useEffect(()=>{
    // const user = localStorage.getItem("role")==='ADMIN' ? JSON.parse(localStorage.getItem("ADMIN")) : JSON.parse(localStorage.getItem("USER")) 
    //if the user is logged in, redirect user to home screen else redirect user to signin screen
    let user;
    if(localStorage.getItem("role")==='ADMIN'){
      user = JSON.parse(localStorage.getItem("loggedUser"));
      dispatch({ type: "ADMIN", payload: user})
    }
    else{
      user = JSON.parse(localStorage.getItem("loggedUser"));
      dispatch({ type: "USER", payload: user})
    }
    console.log("user", user)
    if(user){
      dispatch({ type: "USER", payload: user})
      // history.push("/")
    }
    else{
      history.push("/Login")
    }
  },[])
  
  return(
    //switch make sure that any one route is active, completely optional
      <Switch> 
        <Route exact path="/"> 
          <Home /> 
        </Route>
        <Route path="/Login"> 
          <Login /> 
        </Route>
        <Route exact path="/Signup"> 
          <Signup /> 
        </Route>
        <Route path="/Create-Task"> 
          <CreateTask /> 
        </Route>
      </Switch>
   );
}


function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state)
  return(  
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
