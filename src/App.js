import React, { Component } from 'react';
import './App.css';
import * as api from './api'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { AuthProvider, AuthRoute } from 'react-router-auth-provider'
import LoginForm from './LoginForm'
import Hello from './Hello'
import { createMuiTheme, MuiThemeProvider } from 'material-ui';
import Page from './Page';


function Index() {
  return (
    <div>Index</div>
  )
}

function About() {
  return (
    <div>This is a public page</div>
  )
}

function MyAuthProvider(props) {
  return <AuthProvider
    whoami={api.whoami}
    logout={api.logout}
    {...props}
  />

}

function MyAuthRoute(props){
  return <AuthRoute loginRoute='/login' {...props}/>
}



function AdminOnlyRoute(props){
  const roleCheck = (authInfo) => {
    return authInfo.roles.includes('admin')
  }
  return <MyAuthRoute roleCheck={roleCheck} {...props} />
}

function AdminPage(props){
  return <div>You are really an admin!!!</div>
}

const theme = createMuiTheme();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <MyAuthProvider>
            <Page>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/about" component={About} />
              <Route exact path="/" component={Index} />
              <MyAuthRoute path="/hello" component={Hello} />
              <AdminOnlyRoute path="/admin" component={AdminPage}/>
            </Page>
          </MyAuthProvider>
        </Router>
      </MuiThemeProvider>)
  }

}

export default App

