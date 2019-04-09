import React, { Component } from 'react';

class NoMatch extends Component{
	
render(){
		
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-10 offset-md-1">
						<div className="row">
							<div className="col-12">
								
<h5 className="text-center p-4">Błąd 404</h5>							 
<p className="text-center">Strona nie istnieje</p>
               
 
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default NoMatch
