import React, { Component } from 'react';
import News from './News';
import Newsnotadmin from './Newsnotadmin';


class Newsgeneral extends Component{


	render(){

		if(this.props.user_role == 'Administratorzy')
		var content = <News />
		else
		var content = <Newsnotadmin user_role={this.props.user_role} />
		
		return(
			<div>{content}</div>
			)
}
}
export default Newsgeneral