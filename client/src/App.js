import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {BrowserRouter, Route, useHistory, Switch} from 'react-router-dom';
import Login from './Components/Screens/Login';
import Home from './Components/Screens/Home';
import Signup from './Components/Screens/Signup';
import Navbar from './Components/Navbar'
import CreateTask from './Components/Screens/CreateTask';

import { initialState, reducer } from './Reducer/userReducer';
import SideBar from './Components/SideBar';

export const UserContext = createContext();

//we can't access history in browserrouter component
//useReducer is similar to useState, we use it with context
const Routing=()=>{
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("loggedUser"));//it is present as string so we have to parse it to json object
    console.log("Logged User Details", user)
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
          {state && <SideBar path="Home" />} 
        </Route>
        <Route path="/Login"> 
          <Login /> 
        </Route>
        <Route exact path="/Signup"> 
          <Signup /> 
        </Route>
        <Route path="/Create-Task"> 
          {state && <SideBar path="Create-Task" />} 
        </Route>
        <Route path="/All-Employee"> 
          {state && <SideBar path="All-Employee" />} 
        </Route>
        <Route path="/Profile"> 
          {state && <SideBar path="Profile" />} 
        </Route>
      </Switch>
   );
}

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("user state : ",state)
  return(  
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>   
        {/* {state ? <SideBar /> : <Navbar /> } */}
        {!state && <Navbar />}
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}



export default App;



// const user = localStorage.getItem("role")==='ADMIN' ? JSON.parse(localStorage.getItem("ADMIN")) : JSON.parse(localStorage.getItem("USER")) 
    //if the user is logged in, redirect user to home screen else redirect user to signin screen
    // let user;
    // if(localStorage.getItem("role")==='ADMIN'){
    //   user = JSON.parse(localStorage.getItem("loggedUser"));
    //   let allUsersData = JSON.parse(localStorage.getItem("AllUsers"))
    //   // console.log(allUsersData)
    //   dispatch({ type: "ADMIN", payload: user})
    //   dispatch({ type: "ALLUSERSDATA", payload: allUsersData})
    // }
    // else{
    //   user = JSON.parse(localStorage.getItem("loggedUser"));
    //   dispatch({ type: "USER", payload: user})
    // }


    // #fbd729 yellow black
    // grey black yellow #2e2e2e #eacb3c
    //grey yellow #393c47 #f9b93d