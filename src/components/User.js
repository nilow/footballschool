import React, { Component } from 'react';
import axios from 'axios';
import DeleteSvg from './Svg/DeleteSvg';
import EditSvg from './Svg/EditSvg';
import SaveSvg from './Svg/SaveSvg';
import CancelSvg from './Svg/CancelSvg';

class User extends Component{
	constructor(props) {
        super();
        var roles_selected = [];
	  	for (var i = 0, l = props.user.roles.length; i < l; i++) {
	      roles_selected.push(props.user.roles[i].id.toString());
	    }
      var teams_selected = [];
      for (var i = 0, l = props.user.teams.length; i < l; i++) {
        teams_selected.push(props.user.teams[i].id);
      }
      var players_selected = [];
      for (var i = 0, l = props.user.players.length; i < l; i++) {
        players_selected.push(props.user.players[i].id);
      }
        this.state ={
	    	name: props.user.name,
	    	surname: props.user.surname,
	    	email: props.user.email,
	    	roles: props.user.roles,
        teams: props.user.teams,
        players: props.user.players,
	    	password: '',
        teams_selected: teams_selected,
        initial_teams_selected: teams_selected,
        players_selected: players_selected,
        initial_players_selected: players_selected,
	    	//teams: props.user.teams,
	    	//teams: [],
	    	roles_selected: roles_selected,
	    	initial_roles_selected: roles_selected,
	    	id: props.user.id,
	    	edit: false
  		}
  		this.onEdit = this.onEdit.bind(this);
  		this.onCancel = this.onCancel.bind(this);
  		this.onSave = this.onSave.bind(this);
  		//this.onDelete = this.onDelete.bind(this);
      this.onConfirmDelete = this.onConfirmDelete.bind(this);
  		this.handleChangeName = this.handleChangeName.bind(this);
  		this.handleChangeSurname = this.handleChangeSurname.bind(this);
  		this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangeRole = this.handleChangeRole.bind(this);
      this.handleChangeTeam = this.handleChangeTeam.bind(this);
      this.handleChangePlayer = this.handleChangePlayer.bind(this);
  		//this.handleChangePass = this.handleChangePass.bind(this);
  		//console.log(this.state.teams);
  		
  	};

    onEdit(e){
    	e.preventDefault();
    	this.setState({ 
    		edit: true 
    	});
    }

    onCancel(e){
    	e.preventDefault();
    	this.setState({ 
    		edit: false ,
    		name: this.props.user.name,
	    	surname: this.props.user.surname,
	    	email: this.props.user.email,
	    	roles_selected: this.state.initial_roles_selected,
        teams_selected: this.state.initial_teams_selected,
    	});
    }

    onSave(e){
    	e.preventDefault();
      const token = localStorage.getItem('token');
    	 axios.put('http://backdziennik.nilow13.usermd.net/api/user/' + this.state.id+ '?token=' + token, {name: this.state.name, surname: this.state.surname, email: this.state.email, rolesid: this.state.roles_selected, teamsid: this.state.teams_selected, playersid: this.state.players_selected})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });

            this.setState({ 
    		edit: false,
    		});
    }

    /*onDelete(e){
    	e.preventDefault();
      this.props.onDel(this.state.id);
      const token = localStorage.getItem('token');
    	 axios.delete('http://backdziennik.nilow13.usermd.net/api/user/' + this.state.id+ '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });

    }*/

  onConfirmDelete(e){
      e.preventDefault();
      this.props.onConfirm(this.state.id)

    }

    handleChangeName(e) {
  		this.setState({name: e.target.value, })
	}

	handleChangeSurname(e) {
  		this.setState({surname: e.target.value, })
	}


	handleChangeEmail(e) {
  		this.setState({email: e.target.value, })
	}

	handleChangeRole(e) {
		var options = e.target.options;
		var values = [];
		var newroles = [];
  		for (var i = 0, l = options.length; i < l; i++) {
    		if (options[i].selected) {
      		values.push(options[i].value);
      		newroles.push({id: options[i].value, name: options[i].innerHTML});
    	}
  		this.setState({roles_selected: values, roles: newroles})
	}
}

handleChangeTeam(e) {
    var options = e.target.options;
    var values = [];
    var newteams = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
          newteams.push({id: options[i].value, name: options[i].innerHTML});
      }
      this.setState({teams_selected: values, teams: newteams})
  }
}

handleChangePlayer(e) {
    var options = e.target.options;
    var values = [];
    var newplayers = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
          newplayers.push({id: options[i].value, name: options[i].innerHTML});
      }
      this.setState({players_selected: values, players: newplayers})
  }
}

renderSelectTeams(){
console.log(this.state.roles_selected);

   if(this.state.roles_selected.indexOf("3") >= 0) {
     
      return (
          <div className="col-6 pt-2 pb-2"><label className="tiny">Drużyny</label><select multiple="multiple" className="form-control" onChange={this.handleChangeTeam} value={this.state.teams_selected}>
           {this.props.teamslist.map((team)=><option key={team.id} value={team.id}>{team.name}</option>)}
          </select></div>
      );
}

}

renderSelectPlayers(){
console.log(this.state.roles_selected);

if(this.state.roles_selected.indexOf("4") >= 0) {
     
      return (
          <div className="col-6 pt-2 pb-2"><label className="tiny">Piłkarze</label><select multiple="multiple" className="form-control" onChange={this.handleChangePlayer} value={this.state.players_selected}>
           {this.props.playerslist.map((player)=><option key={player.id} value={player.id}>{player.surname} {player.name}</option>)}
          </select></div>
      );
}

}

	render(){
		const edit = this.state.edit;
    
		return(
			<div className="row align-items-center border border-left-0 border-right-0 border-top-0">
				<div className="col-10">
				{edit ? (
        		<div className="row align-items-center">
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Imię</label><input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeName}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Nazwisko</label><input type="text" className="form-control" value={this.state.surname} onChange={this.handleChangeSurname}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Email</label><input type="text" className="form-control" value={this.state.email} onChange={this.handleChangeEmail}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Zmień hasło</label><input type="text" className="form-control" value={this.state.password} onChange={this.handleChangePass}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Grupa</label><select multiple="multiple" className="form-control" onChange={this.handleChangeRole} value={this.state.roles_selected}>
			    {this.props.roleslist.map((role)=><option key={role.id} value={role.id}>{role.name}</option>)}
			    </select></div>
			    {this.renderSelectTeams()}
          {this.renderSelectPlayers()}

			    </div>
      			) : (
        		<div className="row align-items-center">
	        		<div className="col-3 pt-2 pb-2">{this.state.name}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.surname}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.email}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.roles.map((role)=><div key={role.id}>{role.name}</div>)}</div>
        		</div>
      			)}
				</div><div className="col-2">
				{edit ? (
        		<div><a href="" onClick={this.onSave}><SaveSvg /></a> | <a href="#" onClick={this.onCancel}><CancelSvg /></a></div>
      			) : (
        		<div><a href="#" onClick={this.onEdit}><EditSvg /></a> | <a href="#" onClick={this.onConfirmDelete}><DeleteSvg /></a></div>
      			)}
				 

				</div>
			</div>
		);
	}
}
export default User