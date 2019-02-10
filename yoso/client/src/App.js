import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Pantry from "./pages/Pantry";
import RecipePage from "./pages/RecipePage";
import Waste from "./pages/Waste";
import About from "./pages/About";
import Account from "./pages/Account";
import Tech from "./pages/Tech";
import TandC from "./pages/TandC";
import axios from "axios";
import "./Yoso.css";
export const UserContext = React.createContext({});

const CryptoJS = require("crypto-js");

const yosoAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut() {
    this.isAuthenticated = false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      yosoAuth.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

class App extends Component {
  state = {
    loggedIn: false
  };

  handleSignUp = (data, cb) => {
    const { first, last, email, password, street, city, state, zip } = data;
    const ciphertext = CryptoJS.AES.encrypt(password, 'yosoAuthKeyMofo').toString();
    axios
      .post("/login", {
        first,
        last,
        email,
        password: ciphertext,
        street,
        city,
        state,
        zip
      })
      .then(response => {
        if (response.data) {
          yosoAuth.authenticate();
          this.setState({
            first,
            last,
            email,
            password: ciphertext,
            street,
            city,
            state,
            zip,
            id: response.data.id,
            loggedIn: true
          });
          if (cb) cb();
        } else console.log("Could not sign up! Please try again.");
      })
      .catch(err => {
        console.log("There was an error signing you in. Please try again.");
        console.log(err);
      });
  };

  handleSignIn = (data, cb) => {
    const { email, password } = data;
    axios
      .get("/login", { email })
      .then(response => {
        if (response.data) {
          const hash = response.data.password;
          var bytes = CryptoJS.AES.decrypt(hash, 'yosoAuthKeyMofo');
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          if (originalText === password) {
              yosoAuth.authenticate();
              this.setState({
                first: response.data.first,
                last: response.data.last,
                email: response.data.email,
                password: hash,
                street: response.data.street,
                city: response.data.city,
                state: response.data.state,
                zip: response.data.zip,
                id: response.data.id,
                loggedIn: true
              });
              if (cb) cb();
            } else console.log("Incorrect Log-In Attempt. Please Try Again.");
        } else console.log("Could not sign in! Please try again.");
      })
      .catch(err => {
        console.log("There was an error with the signup server.");
        console.log(err);
      });
  };

  handleAccountUpdate = (data, cb) => {
    const { first, last, email, password, street, city, state, zip } = data;
    const ciphertext = CryptoJS.AES.encrypt(password, 'yosoAuthKeyMofo').toString();
    axios
      .put(`/login/${email}`, {
        first,
        last,
        email,
        password: ciphertext,
        street,
        city,
        state,
        zip
      })
      .then(response => {
        if (response.data) {
          console.log(response.data);
          this.setState({
            first,
            last,
            email,
            password: ciphertext,
            street,
            city,
            state,
            zip,
            loggedIn: true
          });
          if (cb) cb();
        } else console.log("Could not sign up! Please try again.");
      })
      .catch(err => {
        console.log("There was an error signing you in. Please try again.");
        console.log(err);
      });
  };

  handleLogOut = cb => {
    this.setState({ loggedIn: false, name: "", email: "" });
    yosoAuth.signOut();
    if (cb) cb();
  };

  render() {
    return (
      <Router>
        <UserContext.Provider
          className="container-fluid"
          value={{
            user: this.state,
            accountUpdate: this.handleAccountUpdate,
            logOut: this.handleLogOut
          }}
        >
          <header>
            <Nav
              className="main-nav"
              loggedIn={this.state.loggedIn}
              logOut={this.handleLogOut}
            />
          </header>
          <main>
            <Route exact path="/" component={Landing} />
            <Route exact path="/tech" component={Tech} />
            <Route exact path="/tandc" component={TandC} />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/signin"
              render={() => {
                return (
                  <SignIn signUpPath="/signup" signIn={this.handleSignIn} />
                );
              }}
            />
            <Route
              exact
              path="/signup"
              render={() => {
                return <SignUp signUp={this.handleSignUp} />;
              }}
            />
            {/* Logged-In Routes */}
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/lists" component={Lists} />
            <PrivateRoute exact path="/pantry" component={Pantry} />
            <PrivateRoute exact path="/recipes" component={RecipePage} />
            <PrivateRoute exact path="/waste" component={Waste} />
            <PrivateRoute exact path="/account" component={Account} />
          </main>
          <footer className="page-footer">
            <div className="container" />
            <div className="footer-copyright">
              <div className="container hide-on-med-and-down">
                <span>COPYRIGHT 2018 © PANDA WARRIORS DG</span>
                <span className="right">
                  <Link className="footer-link" to="/about">
                    ABOUT
                  </Link>{" "}
                  |{" "}
                  <Link className="footer-link" to="/tech">
                    TECH
                  </Link>{" "}
                  |{" "}
                  <Link className="footer-link" to="/tandc">
                    TERMS AND CONDITIONS
                  </Link>
                </span>
              </div>
            </div>
          </footer>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
