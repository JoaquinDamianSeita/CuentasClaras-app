import "./App.css";
import Footer from "../src/components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import NavBarMain from "./components/NavBars/NavBarMain";

import PostsList from "../src/components/posts/PostList";
import PostAdd from "../src/components/posts/PostAdd";

import Profile from "../src/components/views/Profile";
import Home from "../src/components/views/Home";
import Heroadmin from "./components/misc/Hero-admin";
import ProtectedRoute from "../src/components/auth0/Protected-route";

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
      <Route exact path="/" component={Home} />

      
      <Route exact path="/posts/new" component={PostAdd} />
      {/* <Route exact path="/posts/:_id" component={PostInfo} />
      <Route exact path="/posts/:_id/edit" component={PostEdit} /> */}

      <Route exact path="/posts" component={PostsList} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/admin-home" component={Heroadmin} />

      {/* <ProtectedRoute exact path="/posts" component={PostsList} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/admin-home" component={Heroadmin} /> */}
    </Switch>
  );
}

