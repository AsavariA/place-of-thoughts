import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBlogs } from './actions/blogAction';
import { useSelector } from 'react-redux';
import Editor from './Components/Editor/Editor'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Auth from './Components/Auth/Auth'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile';
import BlogDetails from './Components/BlogDetails/BlogDetails';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogReducers);
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));

  function timeConverter(timestamp) {
    var a = new Date(timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var year = a.getUTCFullYear();
    var time = `${date} ${month}, ${year}`
    return time;
  }

  useEffect(() => {
    dispatch(getBlogs());
  }, [currentId, dispatch])

  const font = "'Rubik', sans-serif";
  const theme = createTheme({
    palette: {
      primary: {
        main: '#371C5E'
      },
      secondary: {
        main: '#000'
      }
    },
    typography: {
      fontFamily: font,
    }
  });

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home blogs={blogs} timeConverter={timeConverter} />
          </Route>
          <Route exact path="/write">
            <div className="App">
              <Editor />
            </div>
          </Route>
          <Route exact path="/auth">
            {
              !user ? <Auth /> : <Redirect to="/" />
            }
          </Route>
          <Route exact path="/profile">
            <Profile blogs={blogs} timeConverter={timeConverter} />
          </Route>
          <Route exact path="/:id">
            <BlogDetails blogs={blogs} currentId={currentId} setcurrentId={setCurrentId} />
          </Route>
        </Switch>
        <Footer />
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
