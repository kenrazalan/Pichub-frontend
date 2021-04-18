import React, { useEffect, createContext, useReducer, useContext } from "react";
import Container from "./styles/Container";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ProfileHeader from "./components/ProfileHeader.js/ProfileHeader";
import ProfileOthers from "./components/ProfileOthers/ProfileOthers";
import EditProfile from "./components/EditProfile/EditProfile";
import HomeTwo from "./components/Home/Home";
import Reset from "./components/Reset/Reset";
import { reducer, initialState } from "./reducers/userReducer";
import Suggestions from "./components/Suggestions/Suggestions";
import PostProvider from "./context/PostContext";
import ExplorePost from "./components/Post/ExplorePost";
import GoToPost from "./components/Post/GoToPost";
import Message from "./components/Message/Message";
import AllpostProvider from "./context/AllpostContext";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      // if(!history.location.pathname.startsWith('/reset'))
      history.push("/signin");
    }
  }, [dispatch,history]);
  return (
    <Container>
      
      <Switch>
        <Route exact path="/">
          <HomeTwo />
        </Route>
        <Route exact path="/profile">
          <ProfileHeader />
        </Route>
        <Route exact path="/signin"
          render={(props) => {
            return  !state? <Login {...props} key={window.location.pathname}/>: <Redirect to="/" />;}}>
        </Route>
        <Route  exact path="/signup"
          render={(props) => {
            return  !state? <Signup {...props} key={window.location.pathname}/>: <Redirect to="/" />;}}>
        </Route>
        <Route
          path="/profile/:userid"
          render={(props) => {
            return  <ProfileOthers {...props} key={window.location.pathname} />;}}>
       </Route>
        <Route exact path="/explore">
          <ExplorePost />
        </Route>
        <Route path="/accounts/edit">
          <EditProfile />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>
        <Route exact path="/suggestions">
          <Suggestions/>
        </Route>
        <Route exact path="/post/:id">
          <GoToPost/>
        </Route>
        <Route exact path="/message">
          <Message/>
        </Route>
      </Switch>
    </Container>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <PostProvider>
        <AllpostProvider>
      <Router>
        { state ? <Nav /> : null }
        
        <Routing />
      </Router>
      </AllpostProvider>
      </PostProvider>
    </UserContext.Provider>
  );
}

export default App;
