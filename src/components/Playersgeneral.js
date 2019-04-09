import React, { Component } from 'react';
import Players from './Players';
import Playersparents from './Playersparents';
import Playerstrainer from './Playerstrainer';

class Playersgeneral extends Component{


	render(){

		if(this.props.user_role == 'Administratorzy' || this.props.user_role == 'Koordynatorzy')
		var content = <Players user_role={this.props.user_role} />
		else if(this.props.user_role == 'Rodzice')
		var content = <Playersparents user_role={this.props.user_role} />
		else if(this.props.user_role == 'Trenerzy')
		var content = <Playerstrainer user_role={this.props.user_role}/>
		return(
			<div>{content}</div>
			)
}
}
export default Playersgeneral
