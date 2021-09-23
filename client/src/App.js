import "./App.css";
import Footer from "../src/components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import NavBarMain from "./components/NavBars/NavBarMain";

import Home from "../src/components/views/Home";
import LoginPage from "./components/misc/LoginPage";
import HomeInit from "./components/views/Home-Init";


import ABM from "./components/views/ABM";

export default function App() {
  const isLoading = false;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App background-black">
      <Router>
        <div>
          <NavBarMain />
          <Main />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function Main() {
  return (
    <Switch>
      <Route exact path="/Home" component={Home} />
      <Route exact path="/ABM" component={ABM} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomeInit} />

      {/* <ProtectedRoute exact path="/posts" component={PostsList} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/admin-home" component={Heroadmin} /> */}
    </Switch>
  );
}

