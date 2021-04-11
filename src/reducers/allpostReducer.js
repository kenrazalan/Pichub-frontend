export const initialState = []

export const allpostReducer = (state,action)=>{
    // if(action.type==="FEED"){
    //     return action.payload
    // }  
    if(action.type==="ALLPOST"){
        // return {
        //     ...state,
        //     followers: action.payload.followers,
        //     following: action.payload.following
        // }
        return action.payload
    }
    // if(action.type==="DELETE"){
    //     return action.payload
    //     // return {
    //     //     ...state,
    //     //     followers: action.payload.followers,
    //     //     following: action.payload.following
    //     // }
    // }
    return state
}