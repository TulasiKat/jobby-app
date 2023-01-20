import {Switch, Route, Redirect} from 'react-router-dom'

import {Component} from 'react'
import ProtectedRoute from './components/protectedRoute'
import Home from './components/home'
import JobItemDetails from './components/jobItemDetails'
import Jobs from './components/jobs'
import Login from './components/login'
import NotFound from './components/notFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App
