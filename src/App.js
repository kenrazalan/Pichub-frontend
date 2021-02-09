import React from 'react'
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import Createpost from './components/Createpost'


function App() {
  return (
      <BrowserRouter>
        <Navbar/>
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
      </BrowserRouter>
       
  );
}

export default App;
