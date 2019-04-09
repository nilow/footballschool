import React, { Component } from 'react';
import axios from 'axios';

class Addevent extends Component{
constructor(props) {
    super(props);
    this.state = {
    	eventtitle: '', 
    	eventteamvalues: [],
    	eventtrainervalues:[],
      trainerslist:[],
    	startpl: props.dates.addstartpl,
    	endpl: props.dates.addendpl,
    	start: props.dates.addstart,
    	end: props.dates.addend,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeTrainer = this.handleChangeTrainer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state.start);
    console.log(this.state.end);
  }

handleClose(e) {
    //alert('A name was submitted: ' + this.state.teamnamevalue);
    this.props.onClose();
  }

  listTeamTrainers(){
    const token = localStorage.getItem('token');
    axios.post('http://backdziennik.nilow13.usermd.net/api/trainers' + '?token='+ token,{teamids:this.state.eventteamvalues})
      .then(res => {
        const users= res.data.users;
       this.setState({ trainerslist: users });
        
      })
  }

handleChangeTitle(e) {
    this.setState({eventtitle: e.target.value});
}

handleChangeTeam(e) {
	var options = e.target.options;
  	var values = [];
  	for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      values.push(options[i].value);
    }
  }
    this.setState({eventteamvalues: values}, ()=>{this.listTeamTrainers()});
}

handleChangeTrainer(e) {
	var options = e.target.options;
  	var values = [];
  	for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      values.push(options[i].value);
    }
  }
    this.setState({eventtrainervalues: values});
}

handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.eventtitle);
    this.props.onAdd(this.state.eventtitle, this.state.eventteamvalues, this.state.eventtrainervalues, this.state.start, this.state.end);
    this.setState({eventtitle: '', eventteamvalues: [], eventtrainervalues: []});
    e.preventDefault();

  }

render(){
return(
<div style={{position:'fixed',top: '0px', right: '0px', bottom: '0px', left: '0px', background:'rgba(0,0,0,0.8)', zIndex: 1060}}>
<div className="modal fade show" id="myModal" style={{display:'block'}}>
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      
      <div className="modal-header justify-content-between">
        <h4 className="modal-title">Dodaj nowy trening</h4>
        <button type="button" className="close" data-dismiss="modal" onClick={this.handleClose}>&times;</button>
      </div>

      
      <div className="modal-body">
       <p>w terminie od: {this.state.startpl.split('T')[0]+' '+this.state.startpl.split('T')[1].split('+')[0].substr(0,5)} do: {this.state.endpl.split('T')[0]+' '+this.state.endpl.split('T')[1].split('+')[0].substr(0,5)}</p>
      <form onSubmit={this.handleSubmit}>

			  <div className="form-group">
			    <label htmlFor="playername">Nazwa:</label>
			    <input type="text" className="form-control" value={this.state.eventtitle} onChange={this.handleChangeTitle}/>
			  </div>
			  <div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="playerteam">Drużyna:</label>
			    <select multiple="multiple" className="form-control" onChange={this.handleChangeTeam} value={this.state.eventteamvalues}>
			    {this.props.teamslist.map((team)=><option key={team.id} value={team.id}>{team.name}</option>)}
			    </select>
			  </div>
			   <div className="form-group col-6">
			    <label htmlFor="playerteam">Trener:</label>
			    <select multiple="multiple" className="form-control" onChange={this.handleChangeTrainer} value={this.state.eventtrainervalues}>
			    {this.state.trainerslist.map((trainer)=><option key={trainer.id} value={trainer.id}>{trainer.name} {trainer.surname}</option>)}
			    </select>
			  </div>
			  </div>

			  <button type="submit" className="btn btn-primary">Dodaj</button>
		</form> 
      </div>

     

    </div>
  </div>
</div>
</div>
)}
}

export default Addevent