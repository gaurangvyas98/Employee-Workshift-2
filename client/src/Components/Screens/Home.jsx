import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { UserContext } from '../../App';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});


export default function Home(){
    const [tasks, setTasks] = useState([]);
    const {state, dispatch} = useContext(UserContext);

    const classes = useStyles();
    
    useEffect(()=>{

        // fetch('/getAllUsers',{
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': "Bearer "+ localStorage.getItem("jwt")
        //     }
        //   }).then(res => res.json())
        //     .then(res => {
        //       // console.log(res)
        //     //   setAllUsersData(res.allUsersData)
        //       dispatch({ type: "ALLUSERSDATA", payload: res.allUsersData})
        //     })

         //to get all the tasks
        if(localStorage.getItem("role") !== "ADMIN"){
            fetch("/getAllTask" , {
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt") 
                }
            }).then(res=>res.json())
            .then(result=>{
                setTasks(result.mytask);
                console.log(result.mytask)
                console.log("UseEffect called from Home.jsx")
            })
        }
    },[])

    

    return(
        <>
        {tasks.map(task => {
            return(
                <Card className={classes.root}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {task.taskName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Assigned By: {task.assignedBy}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {task.duration}, Description: {task.description}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            )
        })}
        </>
        )
    }       // <div>
        //     {tasks.map(task => {return(
        //         <div> 
        //             <h3>TaskName: {task.taskName}</h3>
        //             <h5>Assigned By: {task.assignedBy}</h5>
        //             <p>Duration: {task.duration}, Description: {task.description}</p>
        //         </div>
        //         )} 
        //     )}
        // </div>
