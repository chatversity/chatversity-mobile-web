import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./views/home";
import Courses from "./views/courses";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { FirebaseContext } from './components/Firebase';
import { withFirebase } from './components/Firebase';
import { AuthUserContext } from './components//Session';



const App = (props) => {

  const [
    authUser,
    setAuthUser,
   ] = useState(null);

  useEffect(() =>  {
    let listener = props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? setAuthUser( authUser )
        : setAuthUser( null );
    });

    return function cleanup() {
      listener();
    }
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>

              <hr />

              {/*
                A <Switch> looks through all its children <Route>
                elements and renders the first one whose path
                matches the current URL. Use a <Switch> any time
                you have multiple routes, but you want only one
                of them to render at a time
              */}
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/login">
                  <SignIn />
                </Route>
                <Route exact path="/register">
                  <FirebaseContext.Consumer>
                    {firebase => <SignUp firebase={firebase} />}
                  </FirebaseContext.Consumer>
                </Route>
                <Route exact path="/courses">
                  <Courses />
                </Route>
              </Switch>
            </div>
          </Router>
        </header>
      </div>
    </AuthUserContext.Provider>
  );
}

export default withFirebase(App);
