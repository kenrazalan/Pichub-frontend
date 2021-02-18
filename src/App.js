import React,{useEffect,createContext,useReducer, useContext}  from 'react'
import Container from './components/styles/Container'
import './App.css';
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Createpost from './components/Createpost/Createpost'
import UserProfile from './components/UserProfile/Userprofile'
import Followingpost from './components/Followingpost/Followingpost'
import ProfileHeader from './components/ProfileHeader.js/ProfileHeader'
import ProfileOthers from './components/ProfileOthers/ProfileOthers'
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
        <Container>
        <Switch>
        <Route exact path="/">
        <Home/>
    </Route>
    <Route exact path="/profileheader">
        <ProfileHeader/>
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
    <Route exact path="/profile/:userid">
        <ProfileOthers/>
    </Route>
    <Route exact path="/followingpost">
        <Followingpost/>
    </Route>
    </Switch>
    </Container>
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
