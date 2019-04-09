import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import SimpleReactValidator from 'simple-react-validator';

class Addtraining extends Component{
constructor(props) {
    super(props);
    

    this.state = {
    	eventtitle: '', 
    	eventteamvalues: [],
    	eventtrainervalues:[],
      trainerslist:[],
    	start: '',
    	end: '',
    };
  
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeTrainer = this.handleChangeTrainer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Proszę wypełnić to pole'
      },
});
  }


handleChangeTitle(e) {
    this.setState({eventtitle: e.target.value});
}

handleChangeStart(date) {
    this.setState({start: date});
}

handleChangeEnd(date) {
    this.setState({end: date});
}

handleChangeTeam(e) {
	var options = e.target.options;
  	var values = [];
  	for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      values.push(options[i].value);
    }
  }
    this.setState({eventteamvalues: values},()=>{this.listTeamTrainers()});
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
  e.preventDefault();
   if (this.validator.allValid()) {
	var utcstart = moment.tz(this.state.start,'UTC');
    var plstart = moment.tz(utcstart.format(), 'Europe/Warsaw').format();
    var utcend = moment.tz(this.state.end,'UTC');
    var plend = moment.tz(utcend.format(), 'Europe/Warsaw').format();
    //alert('A name was submitted: ' + this.state.eventtitle);
    this.props.onAdd(this.state.eventtitle, this.state.eventteamvalues, this.state.eventtrainervalues, plstart, plend);
    this.setState({eventtitle: '', start: '', end: '',eventteamvalues: [], eventtrainervalues: []}); 
    this.validator.hideMessages();
}
else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  }
  }

listTeamTrainers(){
  const token = localStorage.getItem('token');
    axios.post('http://backdziennik.nilow13.usermd.net/api/trainers' + '?token='+ token,{teamids:this.state.eventteamvalues})
      .then(res => {
        const users= res.data.users;
       this.setState({ trainerslist: users });
        
      })
  }

render(){
return(

<div className="modal" id="myModal">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      
      <div className="modal-header justify-content-between">
        <h4 className="modal-title">Dodaj nowy trening</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
      
      <form onSubmit={this.handleSubmit}>

			  <div className="form-group">
			    <label htmlFor="eventtitle">Nazwa:</label>
			    <input type="text" className="form-control" value={this.state.eventtitle} onChange={this.handleChangeTitle}/>
          {this.validator.message('eventtitle', this.state.eventtitle, 'required')}
			  </div>
			  <div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="trainingstart">Termin od:</label>
			     <DateTimePicker
          className={"birth"}
          showLeadingZeros={true}
          calendarClassName={"calendarcustom"}
          onChange={this.handleChangeStart}
          value={this.state.start}
          disableClock={true}
         
        />
        {this.validator.message('trainingstart', this.state.start, 'required')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="trainingend">Termin do:</label>
			   <DateTimePicker
          className={"birth"}
          showLeadingZeros={true}
          calendarClassName={"calendarcustom"}
          onChange={this.handleChangeEnd}
          value={this.state.end}
          disableClock={true}
        />
        {this.validator.message('trainingend', this.state.end, 'required')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="trainingteam">Drużyna:</label>
			    <select multiple="multiple" className="form-control" onChange={this.handleChangeTeam} value={this.state.eventteamvalues}>
			    {this.props.teamslist.map((team)=><option key={team.id} value={team.id}>{team.name}</option>)}
			    </select>
           
			  </div>
			   <div className="form-group col-6">
			    <label htmlFor="trainingtrainer">Trener:</label>
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

)}
}

export default Addtraining