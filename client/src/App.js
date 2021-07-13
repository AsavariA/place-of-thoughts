import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from './Components/Editor/Editor'
import NavBar from './Components/NavBar'
import Auth from './Components/Auth/Auth'
import Home from './Components/Home/Home'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/write">
          <div className="App">
            <Editor />
          </div>
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
