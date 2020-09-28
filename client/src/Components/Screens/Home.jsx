import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

function Home(){
    const [tasks, setTasks] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    
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
            })
        }
    },[])

    

    return(
        <div>
            {tasks.map(task => {return(
                <div> 
                    <h3>TaskName: {task.taskName}</h3>
                    <h5>Assigned By: {task.assignedBy}</h5>
                    <p>Duration: {task.duration}, Description: {task.description}</p>
                </div>
                )} 
            )}
        </div>
    )
}

export default Home;