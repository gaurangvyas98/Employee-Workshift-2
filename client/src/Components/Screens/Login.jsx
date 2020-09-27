import React, { useContext, useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';

function Login(){

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
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                 //saving the token and user data locally
                localStorage.setItem("jwt", data.token)
                
                if(data.user.role === 'ADMIN'){
                    console.log("admin")
                    // console.log(data.user, data.allUsersData)
                    localStorage.setItem("role", "ADMIN")
                    localStorage.setItem("loggedUser", JSON.stringify(data.user))
                    localStorage.setItem("AllUsers", JSON.stringify(data.allUsersData))
                    dispatch({ type: "ADMIN", payload: data.user})
                }else{
                    console.log("user")
                    // console.log(data)
                    localStorage.setItem("role", "USER")
                    localStorage.setItem("loggedUser", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                }
                // dispatch({type:"USER", payload: data.user})
                M.toast({html: "Successfully loggedIN",classes:"#43a047 green darken-1"})
                history.push('/')
                window.location.reload()
            }
        })
    }
    return(
        <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Scheduler</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={onLogin}>Login</button>
          <h5>
              <Link to="/signup">Don't have an account ?</Link>
          </h5>
          <h6>
              <Link to="/reset">Forgot password ?</Link>
          </h6>
  
      </div>
    </div>
    )
}

export default Login;