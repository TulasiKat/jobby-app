import {Switch, Route} from 'react-router-dom'

import {Component} from 'react'
import ProtectedRoute from './components/protectedRoute'
import Home from './components/home'
import JobItemDetails from './components/jobItemDetails'
import Jobs from './components/jobs'
import Login from './components/login'
// import NotFound from './components/notFound'

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
      </Switch>
    )
  }
}

export default App
