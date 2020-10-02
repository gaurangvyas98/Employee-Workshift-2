//initially we don't have any data related to user so null
export const initialState = null;


export const reducer = (state,action)=>{
    if(action.type === "USER"){
        return action.payload
    }
    // if(action.type === "ADMIN"){
    //     return action.payload
    // }
    if(action.type === "ALLUSERSDATA"){
        return {
            ...state,
            allUsersData: action.payload
        }
    }
    if(action.type === "UPDATEPIC"){
        return {
            ...state,
            pic: action.payload
        }
    }
    if(action.type === "CLEAR"){
        return null
    }
    return state
}