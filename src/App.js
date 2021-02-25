import React,{useEffect,createContext,useReducer, useContext}  from 'react'
import Container from './components/styles/Container'
import './App.css';
import {BrowserRouter as Router,Route, Switch, useHistory} from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Createpost from './components/Createpost/Createpost'
import UserProfile from './components/UserProfile/Userprofile'
import Followingpost from './components/Followingpost/Followingpost'
import ProfileHeader from './components/ProfileHeader.js/ProfileHeader'
import ProfileOthers from './components/ProfileOthers/ProfileOthers'
import EditProfile from './components/EditProfile/EditProfile'
import Suggestions from './components/Suggestions/Suggestions'
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
    <Route path='/profile/:userid'  render={(props) => {
                    return ( <ProfileOthers {...props } key={window.location.pathname}/> )
                }} >

    </Route>
    <Route exact path="/followingpost">
        <Followingpost/>
    </Route>
    <Route path='/accounts/edit'>
              <EditProfile/>
    </Route>
    </Switch>
    </Container>
    )
}

function App() {
    const [state,dispatch]= useReducer(reducer,initialState)
  return (
      <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Nav/>
        <Routing/>
      </Router>
       </UserContext.Provider>
  );
}

export default App;
