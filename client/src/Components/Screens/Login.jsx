import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import {Link, useHistory} from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { UserContext } from '../../App';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 30

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  input: {
      width: 350,
      margin: '5px auto',
  }
});



function Login(){
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {state, dispatch} = useContext(UserContext);
    
    const onLogin=()=>{
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                // M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                 //saving the token and user data locally
                localStorage.setItem("jwt", data.token)               
                if(data.user.role === 'ADMIN'){
                    console.log("admin")
                    localStorage.setItem("role", "ADMIN")
                }
                else{
                    console.log("user")
                    localStorage.setItem("role", "USER")
                }
                    localStorage.setItem("loggedUser", JSON.stringify(data.user))
                    // localStorage.setItem("AllUsers", JSON.stringify(data.allUsersData))
                    
                    dispatch({ type: "USER", payload: data.user })
                    // dispatch({ type: "ADMIN", payload: data.user})
                // dispatch({type:"USER", payload: data.user})
                // M.toast({html: "Successfully loggedIN",classes:"#43a047 green darken-1"})
                history.push('/')
                window.location.reload()
            }
        })
    }
    return(
        <Card className="login-card">
        <CardContent >
            <Container>
            <h2>Log In</h2>
            {/* <TextField id="standard-basic" label="Username" className={classes.input}/>  */}
           
            <TextField id="outlined-basic" label="Email ID" className={classes.input} variant="outlined"
                 value={email} onChange={(e)=>setEmail(e.target.value)}
            /> 
            <TextField id="outlined-basic" label="Password" className={classes.input} variant="outlined"
                 value={password} onChange={(e)=>setPassword(e.target.value)}
            /> 
            <br/>
            <Button variant="contained" color="primary" onClick={onLogin}>Log In</Button>
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>
            <h6>
                <Link to="/reset">Forgot password ?</Link>
            </h6>
            </Container>
        </CardContent>
        </Card>
    )
}

export default Login;