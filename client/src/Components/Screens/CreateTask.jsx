import { Button, Card, CardContent, Container, makeStyles, TextField,  } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { yellow } from '@material-ui/core/colors';



const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      width: 800,
      margin: '8% auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: 20
      
    },
    title: {
      fontSize: 16,
    },
    pos: {
      marginBottom: 12,
    },
    input: {
        width: 330,
        margin: '10px auto',
    },
    autocomplete: {
      display: 'flex',
      color: 'yellow',
      margin: '10px auto',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  });

function CreateTask(){
    const classes = useStyles();
    //INPUT CONTROLLERS
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    //MATERIAL UI AUTOCOMPLETE
    const [value, setValue] = useState();
    const [allUsers, setAllUsers] = useState([])
    //USER CONTEXT
    const {state, dispatch} = useContext(UserContext);

    //state is taking time to load ASSIGNED BY CONST
    let assignedBy;
    if(state){
        assignedBy = state.name;
    }
    
     // GET ALL USERS DATA
     useEffect(() => {
      const fetchAllUsers = async () => {
        try {
          const res = await fetch('/getAllUsers',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer "+ localStorage.getItem("jwt")
            }
          })
          res.json().then(data =>{
            setAllUsers(data.allUsersData);
            // dispatch({ type: "ALLUSERSDATA", payload: data.allUsersData});
          })
        }catch (err) {
          console.log(err)
        }
      };
      fetchAllUsers();
    }, []);

    //ASSIGN TASK POST REQUEST
    const onAssignTask=()=>{
        // console.log(value, )
        fetch("/Create-Task", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                taskName,
                description,
                duration,
                assignedBy,
                assignedTo
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                // M.toast({html: data.error,classes:"#c62828 red darken-3"})
                console.log(data.error)
            }
            else{
                // M.toast({html: data.message, classes:"#43a047 green darken-1"})
                console.log(data.message)
                setTaskName('')
                setDescription('')
                setDuration('')
                setAssignedTo('')
                
            }
        })
        .catch(err=> {
            console.log(err)
         })
    }

   
    //  console.log("value",assignedTo)

      return(   
        <Container>
        <Card className={classes.root}>
          <CardContent > 
                    
              <h2>Create Task</h2>
              <TextField id="standard-basic" label="Task Name" className={classes.input} variant="outlined"
                value={taskName} onChange={(e)=>setTaskName(e.target.value)}
              /> 
              <TextField id="standard-basic" label="Description" className={classes.input} variant="outlined"
                value={description} onChange={(e)=>setDescription(e.target.value)}
              /> 
              <TextField id="standard-basic" label="Duration" className={classes.input} variant="outlined"
                value={duration} onChange={(e)=>setDuration(e.target.value)}
              />
              <div className={classes.autocomplete}>
                <Autocomplete
                  multiple
                  value={value}
                  onChange={(event, newValue) => {
                    setAssignedTo(newValue);
                  }}
                  
                  id="controllable-states-demo"
                  options={allUsers.map(user => user.email )}
                  style={{ width: 330 }}
                  renderInput={(params) => <TextField {...params} label="Assign To" variant="outlined" />}
                /> 
              </div>
              <br />
              <Button variant="contained" color="primary" onClick={onAssignTask}>Create Task</Button>

              {/* <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error">
                  { successMessageAlert ? "successfully logged in...." : "error"}
                </Alert>
              </Snackbar> */}
              
          </CardContent>
    </Card>
    </Container>   
    );  
  
}

export default CreateTask;

// const options = ['Option 1', 'Option 2'];
// <Autocomplete
//         multiple
//         id="tags-standard"
//         options={top100Films}
//         getOptionLabel={(option) => option.title}
//         defaultValue={[top100Films[13]]}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="standard"
//             label="Multiple values"
//             placeholder="Favorites"
//           />
//         )}
//       />


   