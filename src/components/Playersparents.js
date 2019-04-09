import React, { Component } from 'react';
import axios from 'axios';
import Player from './Player';

class Playersparents extends Component{
constructor(props) {
    super(props);
       this.state ={
       players: [],
        offset: 0,
      perPage: 10,
      pageCount: 1,
  	}
  	
    }

componentDidMount() {
      
this.listAllForParents();
     
    }

  listAllForParents(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/userplayers/index/'+ this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const players= res.data.players;
         const total = res.data.total;
        this.setState({ players: players, pageCount:Math.ceil(total / this.state.perPage)  });
        //console.log(this.state);
      })
  }

	render(){

			return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-10 offset-md-1">
						<div className="row">
							<div className="col-12">
             
								<div className="d-flex mb-4 mt-4">
								<h3 className="pr-2">Piłkarze</h3>
								
               
								</div>
								<div className="row border border-left-0 border-right-0 border-top-0">
								<div className="col-10">
									<div className="row">
										<div className="col-3"><strong>Imię</strong></div>
										<div className="col-3"><strong>Nazwisko</strong></div>
										<div className="col-3"><strong>Data urodzenia</strong></div>
										<div className="col-3"><strong>Drużyna</strong></div>
									</div>
								</div>
								<div className="col-2">&nbsp;</div>
								</div>
								{this.state.players.map((player)=><Player key={player.id} player={player} onDel={this.playerDeleting} teamslist={this.state.teamslist} user_role={this.props.user_role} />)}
								
								
							</div>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}

export default Playersparents