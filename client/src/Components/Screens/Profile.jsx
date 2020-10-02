import { Avatar, Button, Card, CardContent, Container, CssBaseline, makeStyles, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const useStyles = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',

    },
    avatar:{
        width: '170px',
        height: '170px',
        backgroundSize: 'cover',
        textAlign: 'center',
        margin: '0 auto 20px auto',
    },
    input: {
        width: 350,
        margin: '20px auto',
    },
    fileinputbox:{
        display: 'none',  
    }
})


function Profile(){
    const classes = useStyles();
    const {state, dispatch} = useContext(UserContext);
    const UserEmail = state.email;
    const [changedName, setChangedName] = useState(state.name);
    const [image,setImage] = useState("")

    useEffect(()=>{
        if(image){
             const data = new FormData()
             //uploading image to cloudinary
             data.append("file", image)
             data.append("upload_preset", "employee-scheduler")
             data.append("cloud_name", "gaurangvyas")
 
             //uploading profile pic to cloudinary
             fetch("https://api.cloudinary.com/v1_1/gaurangvyas/image/upload", {
                 method: "post",
                 body: data
             }).then(res=>res.json())
                 .then(data=>{
                    //  console.log(data)
                     //sending pic url to backend, so that pic will get updated on the backend
                         fetch("/updatepic", {
                             method: "put",
                             headers: {
                                 "Content-Type": "application/json",
                                 "Authorization": "Bearer "+localStorage.getItem("jwt")
                             },
                             body: JSON.stringify({
                                pic: data.url,
                                UserEmail: UserEmail //to find USER and UPDATE his profile pic
                             })
                         }).then(res=>res.json())
                           .then(result=>{
                                //  console.log(result);
                                 //updating state, adding pic in the state
                                 localStorage.setItem("loggedUser", JSON.stringify({ ...state, pic: result.pic}))    
                                 dispatch({type: "UPDATEPIC", payload: result.pic })
                                 //showing toast
                                //  M.toast({html: "updated profile pic successfully ",classes:"rounded #43a047 green darken-1"})
                                 
                             })
                 })
                 .catch(err=> {
                     console.log(err)
                 })
         }
     },[image])
    
    //we are changing the image state using updatePnoto func
    const updatePhoto = (file)=>{
        setImage(file)
    }


    //EDIT NAME FUNCTION
    const editProfile=(e)=>{
        fetch("/edit-profile", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                changedName,
                UserEmail
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                // M.toast({html: data.error,classes:"#c62828 red darken-3"})
                console.log(data.error)
            }
            else{
                // M.toast({html: data.message, classes:"#43a047 green darken-1"})
                console.log(data.user)
                localStorage.setItem("loggedUser", JSON.stringify(data.user))
                dispatch({ type: "USER", payload: data.user })
                setChangedName(data.user.name)
            }
        })
        .catch(err=> {
            console.log(err)
         })
    }    
    
    //RESET PAGE FUNCTION
    const resetPage=()=>{
        setChangedName(state.name)
    }


    // console.log(image);

    return(
       
            <Card>
                <CardContent className={classes.content}>
                    <div>
                        <Avatar alt="Remy Sharp" src={state.pic}  className={classes.avatar} />
                        {/* <Button size="small" variant="contained" color="primary">Edit Avatar</Button> */}
                        <input
                            accept="image/*"
                            className={classes.fileinputbox}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(e)=>updatePhoto(e.target.files[0])}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" size="small" endIcon={<EditIcon />}>
                                UPDATE
                            </Button>
                        </label>
                    </div>
                    <TextField label={state.email} className={classes.input} variant="outlined" disabled/>
                    <TextField defaultValue={state.name} label="Name" className={classes.input} variant="outlined"
                        value={changedName} onChange={(e)=>setChangedName(e.target.value)}
                    />
                    <Button  variant="contained" color="primary" onClick={editProfile}>Save Changes</Button>
                    <Button  variant="contained" color="primary" onClick={resetPage}>Reset</Button>
                     
                </CardContent>
            </Card>
    )
}

export default Profile;