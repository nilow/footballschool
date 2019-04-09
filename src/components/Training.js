import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import DetailsSvg from './Svg/DetailsSvg';
import DeleteSvg from './Svg/DeleteSvg';
import EditSvg from './Svg/EditSvg';
import PlayersSvg from './Svg/PlayersSvg';
import SaveSvg from './Svg/SaveSvg';
import CancelSvg from './Svg/CancelSvg';

class Training extends Component{
	constructor(props) {
        super();
        var teams_selected = [];
  	  	for (var i = 0, l = props.training.teams.length; i < l; i++) {
  	      teams_selected.push(props.training.teams[i].id);
  	    }
        var trainers_selected = [];
        for (var i = 0, l = props.training.trainers.length; i < l; i++) {
          trainers_selected.push(props.training.trainers[i].id);
        }

        this.state ={
	    	title: props.training.title,
	    	start: props.training.start,
        dates: props.training.dates,
	    	end: props.training.end,
	    	teams: props.training.teams,
	    	teams_selected: teams_selected,
	    	initial_teams_selected: teams_selected,
        trainers: props.training.trainers,
        trainers_selected: trainers_selected,
        initial_trainers_selected: trainers_selected,
	    	id: props.training.id,
	    	edit: false
  		}
  		this.onEdit = this.onEdit.bind(this);
  		this.onCancel = this.onCancel.bind(this);
  		this.onSave = this.onSave.bind(this);
  		//this.onDelete = this.onDelete.bind(this);
       this.onConfirmDelete = this.onConfirmDelete.bind(this);
  		this.handleChangeStart = this.handleChangeStart.bind(this);
      this.handleChangeEnd = this.handleChangeEnd.bind(this);
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
  		this.handleChangeTeam = this.handleChangeTeam.bind(this);
      this.handleChangeTrainer = this.handleChangeTrainer.bind(this);
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
    		title: this.props.training.title,
        start: this.props.training.start,
        end: this.props.training.end,
	    	teams_selected: this.state.initial_teams_selected,
        trainers_selected: this.state.initial_trainers_selected

    	});
    }

    onSave(e){
    	e.preventDefault();
     const token = localStorage.getItem('token');
    	 axios.put('http://backdziennik.nilow13.usermd.net/api/training/' + this.state.id+ '?token=' + token, {name: this.state.title, date_from: this.state.start, date_to: this.state.end, teamsid: this.state.teams_selected, trainersid: this.state.trainers_selected})
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
    	 axios.delete('http://backdziennik.nilow13.usermd.net/api/training/' + this.state.id+ '?token=' + token)
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

  handleChangeTitle(e) {
  		this.setState({title: e.target.value, })
	}

  handleChangeStart(date) {
    var month = date.getMonth()+1;
    var hour = date.getHours();
    var min = date.getMinutes();
    var day = date.getDate();
    var date = date.getFullYear() + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day + ' ' + (hour < 10 ? "0" + hour : hour) + ':' + (min < 10 ? "0" + min : min)+':00');
    console.log(date);
    this.setState({start: date});
}

handleChangeEnd(date) {
    var month = date.getMonth()+1;
    var hour = date.getHours();
    var min = date.getMinutes();
    var day = date.getDate();
    var date = date.getFullYear() + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day + ' ' + (hour < 10 ? "0" + hour : hour) + ':' + (min < 10 ? "0" + min : min)+':00');
    console.log(date);
    this.setState({end: date});
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
  		this.setState({teams_selected: values, teams: newteams}, ()=>{this.listTeamTrainers()})
	}
}

handleChangeTrainer(e) {
    var options = e.target.options;

    var values_tr = [];
    var newtrainers = [];
      for (var i = 0, l = options.length; i < l; i++) {

        if (options[i].selected) {

          values_tr.push(options[i].value);
          newtrainers.push({id: options[i].value, name: options[i].innerHTML});
      }
      this.setState({trainers_selected: values_tr})
  }
}

listTeamTrainers(){
  const token = localStorage.getItem('token');
    axios.post('http://backdziennik.nilow13.usermd.net/api/trainers'+ '?token=' + token,{teamids:this.state.teams_selected})
      .then(res => {
        const users= res.data.users;
       this.setState({ trainers: users });
        
      })
  }



	render(){
		const edit = this.state.edit;
 
		return(
			<div className="row align-items-center border border-left-0 border-right-0 border-top-0">
				<div className="col-10">
				{edit ? (
        		<div className="row align-items-center">
        		<div className="col-12 pt-2 pb-2"><label className="tiny">Nazwa</label><input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Termin od</label>
<div><DateTimePicker
          className={"birth"}
          showLeadingZeros={true}
          calendarClassName={"calendarcustom"}
          onChange={this.handleChangeStart}
          value={new Date(this.state.start)}
          disableClock={true}
         
        /></div>
            </div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Termin do</label>
<div><DateTimePicker
          className={"birth"}
          showLeadingZeros={true}
          calendarClassName={"calendarcustom"}
          onChange={this.handleChangeEnd}
          value={new Date(this.state.end)}
          disableClock={true}
         
        /></div>
            </div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Drużyna</label><select multiple="multiple" className="form-control" onChange={this.handleChangeTeam} value={this.state.teams_selected}>
			    {this.props.teamslist.map((team)=><option key={'team'+team.id} value={team.id}>{team.name}</option>)}
			    </select></div>
          <div className="col-6 pt-2 pb-2"><label className="tiny">Trener</label><select multiple="multiple" className="form-control" onChange={this.handleChangeTrainer} value={this.state.trainers_selected}>
          {this.state.trainers.map((trainer)=><option key={'trainer'+trainer.id} value={trainer.id}>{trainer.name} {trainer.surname}</option>)}
          </select></div></div>
      			) : (
        		<div className="row align-items-center">
	        		<div className="col-3 pt-2 pb-2">{this.state.title}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.dates}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.trainers.map((trainer)=><div key={trainer.id}>{trainer.name} {trainer.surname}</div>)}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.teams.map((team)=><div key={team.id}>{team.name}</div>)}</div>
        		</div>
      			)}
				</div><div className="col-2">
				{edit ? (
        		<div><a href="" onClick={this.onSave}><SaveSvg /></a> | <a href="#" onClick={this.onCancel}><CancelSvg /></a></div>
      			) : (
            <div>
            {this.props.user_role !=='Trenerzy' ? (<div><Link to={'/training/'+ this.state.id }><DetailsSvg /></Link> | <a href="#" onClick={this.onEdit}><EditSvg /></a> | <a href="#" onClick={this.onConfirmDelete}><DeleteSvg /></a></div>) :(<div><Link to={'/training/'+ this.state.id }><DetailsSvg /></Link></div>)}
        		
      			</div>
            )}
				 

				</div>
			</div>
		);
	}
}
export default Training