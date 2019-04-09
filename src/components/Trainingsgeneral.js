import React, { Component } from 'react';
import Trainings from './Trainings';
import Trainingsnotadmin from './Trainingsnotadmin';


class Trainingsgeneral extends Component{


	render(){

		if(this.props.user_role == 'Administratorzy' || this.props.user_role == 'Koordynatorzy'){
		var content = <Trainings />
	}
		else{
		var content = <Trainingsnotadmin user_role={this.props.user_role} />
	}
		
		return(
			<div>{content}</div>
			)
}
}
export default Trainingsgeneral