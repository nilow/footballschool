import React, { Component } from 'react';
import Teams from './Teams';
import Teamsnotadmin from './Teamsnotadmin';


class Teamsgeneral extends Component{


	render(){

		if(this.props.user_role == 'Administratorzy' || this.props.user_role == 'Koordynatorzy')
		var content = <Teams />
		else
		var content = <Teamsnotadmin user_role={this.props.user_role} />
		
		return(
			<div>{content}</div>
			)
}
}
export default Teamsgeneral
