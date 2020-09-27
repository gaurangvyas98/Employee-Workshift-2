import React from 'react';
import {BrowserRouter, Route, useHistory, Switch} from 'react-router-dom';
import Login from './Components/Screens/Login';
import Home from './Components/Screens/Home';
import Signup from './Components/Screens/Signup';

function App(){
  return(
    <BrowserRouter>
    <Switch> 
      <Route exact path="/"> 
        <Home /> 
      </Route>
      <Route path="/Login"> 
        <Login /> 
      </Route>
      <Route path="/Signup"> 
        <Signup /> 
      </Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App;
