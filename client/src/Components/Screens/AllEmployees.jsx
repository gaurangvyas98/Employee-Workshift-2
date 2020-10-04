import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardContent, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles({
    cardContainer: {
      display: 'flex',
    /* background-color: blue; */
      maxWidth: '900px',
      /* align-items: center; */
      /* margin: 0 auto; */
      position: 'relative',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      margin: '40px auto',
      padding: '0 !important',
    },
    card: {
      minWidth: 330,
      padding: '0 !important',
      backgroundColor: '#fad208',
      textAlign: 'center',
      margin: '10px auto',
      display: 'flex',
      borderRadius: '10px',
    },
    avatar: {
      color: '#fafafa',
      backgroundColor: '#bdbdbd',
      width: '50px',
      height: '50px',
      margin: '10px 20px',
    },
    cardTitleEmail:{
      margin: '10px auto',
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontSize: 18,
    fontWeight: 600,
    },
    // pos: {
    //   marginBottom: 12,
    // },
    searchEmployeeArea:{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        margin: '30px auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    email: {
      fontSize: '10px'
    }
  });

  
function AllEmployees(){
    const classes = useStyles();
    const [allUsers, setAllUsers] = useState([])
    const [searchValue, setSearchValue] = useState()
    const [searchClicked, setSearchClicked] = useState(false)
    
    //GET ALL THE USERS
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
    // const searchEmployee=(e)=>{
    //     e.preventDefault();
    //     setSearchClicked(true)
    //     allUsers.map(foundUser => {
    //         if(foundUser.email === searchValue){
    //             return (
    //                 usercard(foundUser.name, foundUser.email, foundUser.pic )
    //             )
    //         }
    //     })
    // }

    const usercard=(name,email,avatar)=>{
      return(
        <div className={classes.card}>
            <Avatar alt={name} src={avatar}  className={classes.avatar} />
            <div className={classes.cardTitleEmail}>
              <Typography className={classes.title} gutterBottom>{name}</Typography>
              <Typography className={classes.email} color="textSecondary">{email}</Typography>
            </div>
        </div>
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
                        style={{ width: 220, marginRight: '5%' }}
                        renderInput={(params) => <TextField {...params} label="Search Employee" variant="standard" style={{color: "white"}}/>}
                        />
                        <Button startIcon={<SearchIcon />} variant="contained" > Search </Button>

                    </div>
                    <div className={classes.cardContainer}>
                    {
                        allUsers.map(foundUser => {
                            return(
                                usercard(foundUser.name, foundUser.email, foundUser.pic)
                            )
                        })
                    }
                    </div>
                </Container>
            }
            
        </>
    )
}

export default AllEmployees;




                // <Card className={classes.card}>
                //     <CardContent>
                //         <Avatar alt={name} src={avatar}  className={classes.avatar} />
                //         <Typography className={classes.title} color="textSecondary" gutterBottom>{name}</Typography>
                //         <Typography className={classes.pos} color="textSecondary">{email}</Typography>
                //     </CardContent>
                // </Card>