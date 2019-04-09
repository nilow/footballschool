import React, { Component } from 'react';
import { NavLink, Redirect, withRouter} from "react-router-dom";
import axios from 'axios';
import UserSvg from './Svg/UserSvg';

class Header extends Component{
	constructor(props) {
        super(props);
        this.state ={
    	roles: [],
    	
    		
  	}
  this.handleLogout = this.handleLogout.bind(this);	
}

componentWillMount() {
    // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
    this.props.history.listen(() => {
      // view new URL
      console.log('New URL', this.props.history.location.pathname);

    });

}

componentDidMount() {
       this.listAllRoles();
      
       
    }

listAllRoles(){
	const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/roles/index'+ '?token=' + token)
      .then(res => {
        const roles= res.data.roles;
       this.setState({ roles: roles });
        
      })
  }
  


  handleLogout(){
  	localStorage.clear();
  	this.props.history.push('/');

  }

  renderParentsMenu(){

  	return(
  		<ul className="navbar-nav">
			     <li className="nav-item">
		          <NavLink exact className="nav-link" to="/home">Home</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/players">Piłkarze</NavLink>
		        </li>
		       </ul>

  		)
  }

    renderTrainerMenu(){
  	return(
  		<ul className="navbar-nav">
			     <li className="nav-item">
		          <NavLink exact className="nav-link" to="/home">Home</NavLink>
		        </li>
		       <li className="nav-item">
		          <NavLink exact className="nav-link" to="/news">Aktualności</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/teams">Drużyny</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/players">Piłkarze</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/trainings">Treningi</NavLink>
		        </li>
		        
			  </ul>
  	)
  }

  renderCoordinatorMenu(){
  	return(
  		<ul className="navbar-nav">
			     <li className="nav-item">
		          <NavLink exact className="nav-link" to="/home">Home</NavLink>
		        </li>
		       <li className="nav-item">
		          <NavLink exact className="nav-link" to="/news">Aktualności</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/teams">Drużyny</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/players">Piłkarze</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/trainings">Treningi</NavLink>
		        </li>
		        
			  </ul>
  	)
  }

  renderAdminMenu(){
  	return(
  		<ul className="navbar-nav">
			     <li className="nav-item">
		          <NavLink exact className="nav-link" to="/home">Home</NavLink>
		        </li>
		       <li className="nav-item">
		          <NavLink exact className="nav-link" to="/news">Aktualności</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/teams">Drużyny</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/players">Piłkarze</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" to="/trainings">Treningi</NavLink>
		        </li>
		        <li className="nav-item dropdown">
		        	<a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Użytkownicy
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        {this.state.roles.map((role)=><NavLink key={role.id} className="dropdown-item" to={'/users/'+ role.id }>{role.name}</NavLink>)}
        </div>
		          
		        </li>
			  </ul>
  	)
  }

	render(){
	if(this.props.history.location.pathname !=='/'){

		if(this.props.user_role == 'Rodzice'){
			var menu = this.renderParentsMenu();
		}
		else if(this.props.user_role == 'Administratorzy'){
			var menu = this.renderAdminMenu();
		}
		else if(this.props.user_role == 'Trenerzy'){
			var menu = this.renderTrainerMenu();
		}
		else if(this.props.user_role == 'Koordynatorzy'){
			var menu = this.renderCoordinatorMenu();
		}

		return(
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">

			  {menu}
<div className="ml-auto d-flex align-items-center userdata">
     <UserSvg /> {this.props.user} ({this.props.user_role}) <button className="btn btn-secondary" onClick={this.handleLogout}>Wyloguj się</button>
    </div>
			</nav>
			
		);
	}
	else{
		return(<div></div>)
	}
	
	}
	
	
}
export default withRouter(Header);