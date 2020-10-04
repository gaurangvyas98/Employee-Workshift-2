import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { UserContext } from '../../App';
import { Button, Card, CardActions, CardContent, Container } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  homeContainer: {
    display: 'flex',
    /* background-color: blue; */
    maxWidth: '900px',
    /* align-items: center; */
    /* margin: 0 auto; */
    position: 'relative',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '40px auto',
    padding: '0',

  },
    card: {
        width: 330,
        backgroundColor: '#fad208',
        textAlign: 'center',
        margin: '10px auto',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    completedButton: {
        marginLeft: 'auto'
    }
});

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState([]);
  const {state, dispatch} = useContext(UserContext);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //to get all the task assigned to user
  useEffect(()=>{
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

      //we are sending taskId to backend and setting status to complete 
  const onTaskComplete=(taskId)=>{
    // e.preventDefault();
    fetch("/completeTask", {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            taskId  
        })
    }).then(res=>res.json())
      .then(result=>{
            console.log(result);                
        })
  }
  
  const DisplayCard=(props)=>{
    let desc = props.description;
    if(desc.length >= 20){
      desc = desc.substring(0,50) + "........."
    }
    return(
      <Card className={classes.card}>
        <CardContent>
        <Typography className={classes.title}  gutterBottom>
            {props.taskName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            Assigned By: {props.assignedBy}
        </Typography>
        <Typography variant="body2" component="p">
             Description: {desc}
        </Typography>
        <Typography variant="body2" component="p">
            {props.duration}
        </Typography>
        </CardContent>
        <CardActions>
        {(props.status === 'incomplete') ?  
            <Button size="small" className={classes.completedButton} endIcon={<CheckIcon />}
                onClick={()=>onTaskComplete(props.id)}>
                    DONE
            </Button>
            :
            <Button size="small" className={classes.completedButton} endIcon={<DoneAllIcon />}>
                    Completed
            </Button>
            }
        
        </CardActions>
      </Card>
    )
  }
  console.log(value)

  return (
    // DISPLAY TASKS CARD WHEN USER LOGGED IN AND ADMIN CARD WHEN ADMIN IS LOGGED IN
    <div className={classes.root}>
      { 
        (state.role !== 'ADMIN') ? 
        <>
            <Paper position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" 
                indicatorColor="secondary" textColor="default" centered>
              <Tab label="Remaining" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
              <Tab label="All task" {...a11yProps(2)} />
            </Tabs>
          </Paper>
            {/* DISPLAY TASK WHICH ARE REMAINING  */}
            <TabPanel value={value} index={0} >
              <Container className={classes.homeContainer}>  
                {
                  tasks.map(task => {
                    if(task.status === 'incomplete'){
                      return(
                        <DisplayCard 
                          taskName = {task.taskName}
                          assignedBy = {task.assignedBy}
                          duration = {task.duration}
                          description = {task.description}
                          status = {task.status}
                          id = {task._id}
                        />
                      )
                    }
                  })
                }
              </Container>
            </TabPanel>
            {/* DISPLAY TASK WHICH ARE COMPLETE */}
            <TabPanel value={value} index={1} >
              <Container className={classes.homeContainer}>  
              {
                  tasks.map(task => {
                    if(task.status === 'complete'){
                      return(
                        <DisplayCard 
                          taskName = {task.taskName}
                          assignedBy = {task.assignedBy}
                          duration = {task.duration}
                          description = {task.description}
                          status = {task.status}
                          id = {task._id}
                        />
                      )
                    }
                  })
                }
              </Container>
            </TabPanel>
            {/* DISPLAY ALL TASKS WHICH ARE PRESENT */}
            <TabPanel value={value} index={2}>
            <Container className={classes.homeContainer}> 
            {
                tasks.map(task => {
                    return(
                      <DisplayCard 
                        taskName = {task.taskName}
                        assignedBy = {task.assignedBy}
                        duration = {task.duration}
                        description = {task.description}
                        status = {task.status}
                        id = {task._id}
                      />
                    )
                })
              }
              </Container>
            </TabPanel>
      </>
        :
        <div>
          <h1>HOOME ADMINI</h1>
        </div>  
      }
      
    </div>
  );
}

// import React, { useContext, useEffect, useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import { Container, Typography, Button, CardContent, CardActions, Card} from '@material-ui/core';
// import CheckIcon from '@material-ui/icons/Check';
// import DoneAllIcon from '@material-ui/icons/DoneAll';

// import { UserContext } from '../../App';

// const useStyles = makeStyles({
    // homeContainer: {
    //     display: 'flex',
    //     /* background-color: blue; */
    //     maxWidth: '900px',
    //     /* align-items: center; */
    //     /* margin: 0 auto; */
    //     position: 'relative',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     margin: '40px auto',
    // },
    // card: {
    //     minWidth: 275,
    //     backgroundColor: '#fad208',
    //     textAlign: 'center',
    //     margin: '10px auto',
    // },
    // bullet: {
    //     display: 'inline-block',
    //     margin: '0 2px',
    //     transform: 'scale(0.8)',
    // },
    // title: {
    //     fontSize: 14,
    // },
    // pos: {
    //     marginBottom: 12,
    // },
    // completedButton: {
    //     marginLeft: 'auto'
    // }
// });


// export default function Home(){
    // const [tasks, setTasks] = useState([]);
    // const {state, dispatch} = useContext(UserContext);

    // const classes = useStyles();
    
    // //to get all the task assigned to user
    // useEffect(()=>{
    //      //to get all the tasks
    //     if(localStorage.getItem("role") !== "ADMIN"){
    //         fetch("/getAllTask" , {
    //             headers : {
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bearer " + localStorage.getItem("jwt") 
    //             }
    //         }).then(res=>res.json())
    //         .then(result=>{
    //             setTasks(result.mytask);
    //             console.log(result.mytask)
    //             console.log("UseEffect called from Home.jsx")
    //         })
    //     }
    // },[])

    // //we are sending taskId to backend and setting status to complete 
    // const onTaskComplete=(taskId)=>{
    //     // e.preventDefault();
    //     fetch("/completeTask", {
    //         method: "put",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer "+localStorage.getItem("jwt")
    //         },
    //         body: JSON.stringify({
    //             taskId  
    //         })
    //     }).then(res=>res.json())
    //       .then(result=>{
    //             console.log(result);                
    //         })
    // }
    

//     return(
//         <Container className={classes.homeContainer}>
        // {tasks.map(task => {
        //     console.log(task._id)
//             return(
            //     <Card className={classes.card}>
            //         <CardContent>
            //         <Typography className={classes.title}  gutterBottom>
            //             {task.taskName}
            //         </Typography>
            //         <Typography className={classes.pos} color="textSecondary">
            //             Assigned By: {task.assignedBy}
            //         </Typography>
            //         <Typography variant="body2" component="p">
            //             {task.duration}, Description: {task.description}
            //         </Typography>
            //         </CardContent>
            //         <CardActions>
            //         {(task.status === 'incomplete') ?  
            //             <Button size="small" className={classes.completedButton} endIcon={<CheckIcon />}
            //                 onClick={()=>onTaskComplete(task._id)}>
            //                     DONE
            //             </Button>
            //             :
            //             <Button size="small" className={classes.completedButton} endIcon={<DoneAllIcon />}>
            //                     Completed
            //             </Button>
            //             }
                   
            //         </CardActions>
            //     </Card>
            // )
//         })}
//         </Container>
//         )
//     }       
    
    
    
        // <div>
        //     {tasks.map(task => {return(
        //         <div> 
        //             <h3>TaskName: {task.taskName}</h3>
        //             <h5>Assigned By: {task.assignedBy}</h5>
        //             <p>Duration: {task.duration}, Description: {task.description}</p>
        //         </div>
        //         )} 
        //     )}
        // </div>

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
