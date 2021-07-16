import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBlogs } from './actions/blogAction';
import { useSelector } from 'react-redux';
import Editor from './Components/Editor/Editor'
import NavBar from './Components/NavBar'
import Auth from './Components/Auth/Auth'
import Home from './Components/Home/Home'
import BlogDetails from './Components/BlogDetails/BlogDetails';

function App() {
  const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogReducers);
    const [currentId, setCurrentId] = useState(null);

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

  return (
    <Router>
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
          <Auth />
        </Route>
        <Route exact path="/:id">
          <BlogDetails blogs={blogs} currentId={currentId} setcurrentId={setCurrentId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
