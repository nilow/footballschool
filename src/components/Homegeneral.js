import React, { Component } from 'react';
import Home from './Home';
import Homenotadmin from './Homenotadmin';


class Homegeneral extends Component{


	render(){

		if(this.props.user_role == 'Administratorzy')
		var content = <Home />
		else
		var content = <Homenotadmin user_role={this.props.user_role} />
		
		return(
			<div>{content}</div>
			)
}
}
export default Homegeneral
