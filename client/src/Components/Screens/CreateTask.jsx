import React, { useContext, useState } from 'react'
import M from 'materialize-css';
import { UserContext } from '../../App';


function CreateTask(){
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const {state, dispatch} = useContext(UserContext);
    //state is taking time to load
    let assignedBy;
    if(state){
        assignedBy = state.name;
        console.log("state", state.allUsersData);
    }
    
    const onAssignTask=()=>{
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
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
            }
        })
        .catch(err=> {
            console.log(err)
         })
    }
    // console.log(taskName, description, duration, assignedTo, assignedBy)
    return(
        <div className="card input-field" style={{
            margin:"40px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}>
            <input 
                type="text" 
                placeholder="Name"
                value={taskName}
                onChange={(e)=> setTaskName(e.target.value) }
            />
            <textarea 
                id="textarea2" 
                class="materialize-textarea" 
                data-length="120"
                placeholder="Task Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Duration"
                value={duration}
                onChange={(e)=> setDuration(e.target.value) }
            />
            <input 
                type="text" 
                placeholder="Assigned-To"
                value={assignedTo}
                onChange={(e)=> setAssignedTo(e.target.value) }
            />

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"  onClick={onAssignTask}>
                Assign Task <i class="material-icons right">assignment_turned_in</i>
            </button>
        </div>
    );  
}

export default CreateTask;