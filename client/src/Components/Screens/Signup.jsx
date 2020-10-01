import React, { useState } from 'react';
// import Alert from './Utils/Alert'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
 
import {Link, useHistory} from 'react-router-dom';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 30

  },
  alert: {
    width: '100%',
    // '& > * + *': {
    //   marginTop: theme.spacing(2),
    // },
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

function MuiAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}


export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severityAlert, setSeverityAlert] = useState("info");
  const [messageAlert, setMessageAlert] = useState("");

  const handleAlertClose=(e, reason)=>{
    if(reason === "clickaway")
      return;
    setOpenAlert(false);
  }
  const AlertError=(error)=>{
      return (<Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
      <Alert onClose={handleAlertClose} severity="error">
        {error}
      </Alert>
    </Snackbar>)
  }
  const AlertSuccess=()=>{
    console.log('alert success triggered')
    return(
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
      <Alert onClose={handleAlertClose} severity="success">
        Successfully logged in...!
      </Alert>
    </Snackbar>
    )
  }
  
  const onSignUp=(e)=>{
      fetch('/signup', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              name,
              email,
              password
          })
      }).then(res => res.json())
      .then(data => {
          if(data.error){
              setOpenAlert(true)
              setMessageAlert(data.error);
              setSeverityAlert("error");
              // AlertError(data.error);
          }
          else{
            setOpenAlert(true)
            setMessageAlert("Successfully registered...");
            setSeverityAlert("success");
            // AlertSuccess();
            history.push('/login')
          }
      })
  }
  console.log("State:", name, email, password);
  return (
    <Card className="login-card">
        <CardContent >
            <Container>
           
            <h2>Register</h2>
            <TextField id="standard-basic" label="Username" className={classes.input} variant="outlined"
              value={name} onChange={(e)=>setName(e.target.value)}
            /> 
            
            <TextField id="standard-basic" label="Email ID" className={classes.input}  variant="outlined"
              value={email} onChange={(e)=>setEmail(e.target.value)}
            /> 
            <TextField id="standard-basic" label="Password" className={classes.input} variant="outlined"
              value={password} onChange={(e)=>setPassword(e.target.value)}
            /> 
            <br/>
            <Button variant="contained" color="primary" onClick={onSignUp}>Sign In</Button>
            <h5>
                <Link to="/login">Already have an account ?</Link>
            </h5>
            <h6>
                <Link to="/reset">Forgot password ?</Link>
            </h6>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={severityAlert}>
                {messageAlert}
              </Alert>
            </Snackbar>
            </Container>
        </CardContent>
    </Card>
  );
}

// import React, { useState } from 'react'
// import {Link, useHistory} from 'react-router-dom';
// import M from 'materialize-css';
// import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';

// function Signup(){
    // const history = useHistory();
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const onSignUp=(e)=>{
    //     fetch('/signup', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name,
    //             email,
    //             password
    //         })
    //     }).then(res => res.json())
    //     .then(data => {
    //         if(data.error){
    //             M.toast({html: data.error,classes:"#c62828 red darken-3"})
    //         }
    //         else{
    //             M.toast({html:data.message,classes:"#43a047 green darken-1"})
    //             history.push('/login')
    //         }
    //     })
    // }
    // // console.log("State:", name, email, password);
//     return(
//         <Card className={classes.root}>
//         <CardContent>
//           <Typography className={classes.title} color="textSecondary" gutterBottom>
//             Word of the Day
//           </Typography>
//           <Typography variant="h5" component="h2">
//             be{bull}nev{bull}o{bull}lent
//           </Typography>
//           <Typography className={classes.pos} color="textSecondary">
//             adjective
//           </Typography>
//           <Typography variant="body2" component="p">
//             well meaning and kindly.
//             <br />
//             {'"a benevolent smile"'}
//           </Typography>
//         </CardContent>
//         <CardActions>
//           <Button size="small">Learn More</Button>
//         </CardActions>
//       </Card>
//     )
// }
