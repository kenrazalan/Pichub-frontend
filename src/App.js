import React, { useEffect, createContext, useReducer, useContext } from "react";
import Container from "./components/styles/Container";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Createpost from "./components/Createpost/Createpost";
import UserProfile from "./components/UserProfile/Userprofile";
import Followingpost from "./components/Followingpost/Followingpost";
import ProfileHeader from "./components/ProfileHeader.js/ProfileHeader";
import ProfileOthers from "./components/ProfileOthers/ProfileOthers";
import EditProfile from "./components/EditProfile/EditProfile";
import HomeTwo from "./components/HomeTwo/HomeTwo";
import Reset from "./components/Reset/Reset";
import { reducer, initialState } from "./reducers/userReducer";
import Suggestions from "./components/Suggestions/Suggestions";
import SideSuggestions from "./components/SideSuggestions/SideSuggestions";

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
  }, []);
  return (
    <Container>
      <Switch>
        <Route exact path="/">
          <HomeTwo />
        </Route>
        <Route exact path="/profileheader">
          <ProfileHeader />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/create">
          <Createpost />
        </Route>
        <Route
          path="/profile/:userid"
          render={(props) => {
            return <ProfileOthers {...props} key={window.location.pathname} />;
          }}
        ></Route>
        <Route exact path="/explore">
          <Suggestions />
        </Route>
        <Route path="/accounts/edit">
          <EditProfile />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>
        <Route exact path="/test">
          <SideSuggestions/>
        </Route>
      </Switch>
    </Container>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Nav />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
