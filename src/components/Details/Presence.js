import React, { Component } from 'react';
import axios from 'axios';
class Presence extends Component{

	constructor(props) {
        super(props);
        var checked = [];
	  	for (var i = 0, l = props.team.players.length; i < l; i++) {
	  		if(props.team.players[i].is_present)
	  			checked.push(props.team.players[i].id.toString());
	  		}
	      
        this.state ={
    		teamname: props.team.name,
    		teamid: props.team.id,
    		teamplayers: props.team.players,
    		optionsChecked: checked,
    		trainingid: props.trainingid
    		
  		}
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSavePresence = this.handleSavePresence.bind(this);
  	//console.log('idddd'+props.trainingid);
    }

	handleChange(event) {
	    let checkedArray = this.state.optionsChecked;
      	let selectedValue = event.target.value;
        
        if (event.target.checked === true) {
        	checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });

            const position = this.state.teamplayers.findIndex((element) => {
            return element.id == selectedValue;
             });
            this.state.teamplayers[position].is_present = true;
            const teamplayers= this.state.teamplayers;
    		this.setState({ teamplayers: teamplayers });
   
                        
        } else {
        
        	let valueIndex = checkedArray.indexOf(selectedValue);
			checkedArray.splice(valueIndex, 1);
            this.setState({
              optionsChecked: checkedArray
            });
             const position = this.state.teamplayers.findIndex((element) => {
            return element.id == selectedValue;
             });
            this.state.teamplayers[position].is_present = false;
            const teamplayers= this.state.teamplayers;
    		this.setState({ teamplayers: teamplayers });
        }
	}

	handleSavePresence() {
		console.log('handleSavePresence');
		const token = localStorage.getItem('token');
    	axios.put('http://backdziennik.nilow13.usermd.net/api/training/presence/' + this.state.trainingid + '?token='+ token, {present_players_ids: this.state.optionsChecked})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
	}
	

	render(){
		
		return(
			<div><h4>{this.state.teamname}</h4>
			{this.state.teamplayers.map((player)=>
				<div className="row" key={player.id}><div className="col-10">{player.name} {player.surname}</div><div className="col-2"><label className="switch"><input type="checkbox" name = {"presence-" + player.id} checked={player.is_present} value={player.id} onChange={this.handleChange}/><span className="slider"></span></label></div></div>)}
				<div className="col-12 text-center">
				

				<button type="button" className="btn btn-primary" onClick={this.handleSavePresence}>Zapisz zmiany</button>
				</div>
			</div>

		)
	}
}

export default Presence	
