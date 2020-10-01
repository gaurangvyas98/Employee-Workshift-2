import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
    searchEmployeeArea:{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
  });

  
function AllEmployees(){
    const classes = useStyles();
    const [allUsers, setAllUsers] = useState([])
    const [searchValue, setSearchValue] = useState()
    
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
              console.log("Use Effect to get all users data called in allemployees")
              // dispatch({ type: "ALLUSERSDATA", payload: data.allUsersData});
            })
          }catch (err) {
            console.log(err)
          }
        };
        fetchAllUsers();
      }, []);
    
    // console.log(searchValue);
    const searchEmployee=(e)=>{
        e.preventDefault();
        allUsers.map(foundUser => {
            if(foundUser.email === searchValue){
                return (
                    usercard(foundUser.name, foundUser.email )
                )
            }
        })
    }

    const usercard=(name,email,avatar)=>{
            // setSearchValue('')      
            return(
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>{name}</Typography>
                        <Typography className={classes.pos} color="textSecondary">{email}</Typography>
                    </CardContent>
                </Card>
            )
       
    }



    return(
        <>
            {(!allUsers) ? 
                "<h1>LOADING......</h1>" 
                : 
                <Container>
                    <div className={classes.searchEmployeeArea}>
                        <Autocomplete
                        value={searchValue}
                        onChange={(event, newValue) => {
                            setSearchValue(newValue);
                        }}
                        
                        id="controllable-states-demo"
                        options={allUsers.map(user => user.email )}
                        style={{ width: 330 }}
                        renderInput={(params) => <TextField {...params} label="Search Employee" variant="standard" />}
                        />
                        <Button startIcon={<SearchIcon />} variant="contained" color="primary" onClick={searchEmployee}> Search </Button>

                    </div>
                   
                    {
                        allUsers.map(foundUser => {
                            return(
                                usercard(foundUser.name, foundUser.email)
                            )
                        })
                    }
                </Container>
            }
            
        </>
    )
}

export default AllEmployees;