import './App.css'

import {Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import JobsPage from './components/JobsPage'

import JobItemDetails from './components/JobItemDetails'

import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'

// import Header from './components/Header'

import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <NotFound />
  </Switch>
)

export default App
