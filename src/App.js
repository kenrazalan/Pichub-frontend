import React,{useEffect,createContext,useReducer, useContext}  from 'react'
import './App.css';
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import Createpost from './components/Createpost'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () =>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        const user =JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"USER",payload:user})
          
          }else{
            // if(!history.location.pathname.startsWith('/reset'))
            history.push('/signin')
          }
    },[])
    return(
        <Switch>
        <Route exact path="/">
        <Home/>
    </Route>
    <Route exact path="/profile">
        <Profile/>
    </Route>
    <Route exact path="/signin">
        <Login/>
    </Route>
    <Route exact path="/signup">
        <Signup/>
    </Route>
    <Route exact path="/create">
        <Createpost/>
    </Route>
    </Switch>
    )
}

function App() {
    const [state,dispatch]= useReducer(reducer,initialState)
  return (
      <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
       </UserContext.Provider>
  );
}

export default App;
