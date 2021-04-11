export const initialState = []

export const postReducer = (state,action)=>{
    if(action.type==="FEED"){
        return action.payload
    }  
    if(action.type==="NEWPOST"){
        // return {
        //     ...state,
        //     followers: action.payload.followers,
        //     following: action.payload.following
        // }
        return action.payload
    }
    if(action.type==="DELETE"){
        return action.payload
        // return {
        //     ...state,
        //     followers: action.payload.followers,
        //     following: action.payload.following
        // }
    }
    return state
}