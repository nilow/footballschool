import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import axios from 'axios';
//import Home from './Home';
import Homegeneral from './Homegeneral';
import Users from './Users';
import User from './User';
import Header from './Header';
import Teams from './Teams';
import Teamsgeneral from './Teamsgeneral';
import Trainingsgeneral from './Trainingsgeneral';
import Players from './Players';
import Playersgeneral from './Playersgeneral';
import News from './News';
import Newsgeneral from './Newsgeneral';
import Trainings from './Trainings';
import Newsmore from './Newsmore';
import Trainingdetails from './Trainingdetails';
import Playerdetails from './Playerdetails';
import Login from './Login';
import NoMatch from './NoMatch';

const AuthService = {
  checkAuth() {
    const token =  localStorage.getItem('token');
    const date = localStorage.getItem('expiration');
    if(token && date && (date.valueOf() > new Date().valueOf())){
      return true;
    }
    return false;
  }
  
}

const SecretRoute = ({ path, exact, component: Component, ...rest }) => (
  <Route path={path}
    exact={exact} render={(props) => (
    
    AuthService.checkAuth() === true
      ? <Component {...props} {...rest} />
      : <Redirect to='/' />
  )} />
);

const RouteWithProps = ({ path, exact, component: Component, ...rest }) => (
  <Route path={path}
    exact={exact} render={(props) => (
     <Component {...props} {...rest} />
  )} />
);
class App extends Component {

constructor() {
  super();
  this.state ={
  user:'',
  user_role:''    
  }
 
this.test = this.test.bind(this); 
this.getUser = this.getUser.bind(this); 
}

test(){
 
   this.getUser();
    
}

getUser(){
  const token = localStorage.getItem('token');
  if(token){
  axios.get('http://backdziennik.nilow13.usermd.net/api/loggeduser' + '?token=' + token)
            .then(response => {
             console.log(response);
             const user= response.data.user;
            const user_role = response.data.roles;
            this.setState({ user: user });
            this.setState({ user_role: user_role }); 
            
            })
            .catch(e => {
              console.log(e)
            });
          }
}

componentDidMount(){
  this.getUser();
}



  render() {
    return (
      <Router>
      <div>
      <Header user={this.state.user} user_role={this.state.user_role} />

       <Switch>
	     <RouteWithProps exact path="/" component={Login} onTest={this.test} />
       <SecretRoute path="/users/:id" component={Users} roles={['Administratorzy']} />
	     <SecretRoute path="/user/:id" component={User} roles={['Administratorzy']} />
       <SecretRoute path="/teams" component={Teamsgeneral} user_role={this.state.user_role} roles={['Administratorzy', 'Koordynatorzy']} />
       <SecretRoute path="/team/:id" component={Players} user_role={this.state.user_role} roles={['Administratorzy', 'Koordynatorzy', 'Rodzice']} />
       <SecretRoute path="/players" component={Playersgeneral} user_role={this.state.user_role} roles={['Administratorzy', 'Koordynatorzy']} />
       <SecretRoute path="/news" component={Newsgeneral} user_role={this.state.user_role} roles={['Administratorzy', 'Koordynatorzy', 'Trenerzy']} />
       <SecretRoute path="/newsmore/:id" component={Newsmore} roles={['Administratorzy', 'Koordynatorzy', 'Trenerzy']} />
       <SecretRoute path="/teamtrainings/:id" component={Trainings} user_role={this.state.user_role} roles={['Administratorzy', 'Koordynatorzy', 'Trenerzy']} />
       <SecretRoute path="/trainings" component={Trainingsgeneral} user_role={this.state.user_role} roles={['Administratorzy', 'Koordynatorzy', 'Trenerzy']} />
	     <SecretRoute path="/training/:id" component={Trainingdetails} roles={['Administratorzy', 'Trenerzy']} />
       <SecretRoute path="/player/:id" component={Playerdetails} user_role={this.state.user_role} roles={['Administratorzy', 'Trenerzy']} />
       <SecretRoute path="/home" component={Homegeneral} user_role={this.state.user_role} roles={['Administratorzy', 'Koordynatorzy', 'Trenerzy', 'Rodzice']} />
       <SecretRoute component={NoMatch} />
       </Switch>

	  </div>
  </Router>
    );
  }
}

export default App;

