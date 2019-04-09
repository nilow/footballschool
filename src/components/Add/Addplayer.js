import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import SimpleReactValidator from 'simple-react-validator';

class Addplayer extends Component{
constructor(props) {
    super(props);
    this.state = {playernamevalue: '', playersurnamevalue: '', playerbirthvalue: '', playerteamvalues: [], fileSelected:null, percent:0, uploadshow:false};

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
    this.handleChangeBirth = this.handleChangeBirth.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Proszę wypełnić to pole'
      },
});
    //console.log(props.teamslist);
  }


handleChangeName(e) {
    this.setState({playernamevalue: e.target.value});
}

handleChangeTeam(e) {
	var options = e.target.options;
  	var values = [];
  	for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      values.push(options[i].value);
    }
  }
    this.setState({playerteamvalues: values});
}

handleChangeSurname(e) {
    this.setState({playersurnamevalue: e.target.value});
}

handleChangeBirth(date) {
    var month = date.getMonth()+1;
    var day = date.getDate();
    var date = date.getFullYear() + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);
    console.log(date)
    this.setState({playerbirthvalue: date});
}

  handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.teamnamevalue);
     e.preventDefault();
      if (this.validator.allValid()) {
    const file = this.state.fileSelected;
    var filename = '';
    if(this.state.fileSelected === null){
      filename = 'blondas.jpg';
    }
    else{
      filename = this.state.fileSelected.name;
    }

    this.props.onAdd(this.state.playernamevalue, this.state.playersurnamevalue, this.state.playerbirthvalue, this.state.playerteamvalues, filename);
    this.setState({playernamevalue: '', playersurnamevalue: '', playerbirthvalue: '', playerteamvalues: [], fileSelected:null});
    this.validator.hideMessages();
  }
  else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  }  


  }

  fileSelectedHandler(e) {
    this.setState({fileSelected:e.target.files[0], uploadshow:true})

  }

  fileUpload(e) {
    console.log('upload');
    e.preventDefault();
    const fd = new FormData();
    const token = localStorage.getItem('token');
    fd.append('playerfile', this.state.fileSelected, this.state.fileSelected.name);
    axios.post('http://backdziennik.nilow13.usermd.net/api/playeruploadfile'+ '?token='+ token, fd,{
      onUploadProgress: uploadEvent=>{
       this.state.percent = Math.round((uploadEvent.loaded / uploadEvent.total)*100)
      }

    })
      .then(response => {
        console.log(response);
        this.setState({uploadshow:false})

      })
      .catch(e => {
        console.log(e)
      });
}


render(){
return(
<div className="modal" id="myModal">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">Dodanie nowego zawodnika</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
        <form>
         <div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="playername">Imię:</label>
			    <input type="text" className="form-control" value={this.state.playernamevalue} onChange={this.handleChangeName}/>
           {this.validator.message('playername', this.state.playernamevalue, 'required')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="playersurname">Nazwisko:</label>
			    <input type="text" className="form-control" value={this.state.playersurnamevalue} onChange={this.handleChangeSurname}/>
          {this.validator.message('playersurname', this.state.playersurnamevalue, 'required')}
			  </div>
        </div>
        <div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="playerbirth">Data urodzenia:</label>
          <div>
			   <DatePicker
          onChange={this.handleChangeBirth}
          value={this.state.playerbirthvalue!=''?new Date(this.state.playerbirthvalue):this.state.playerbirthvalue}
          className={"birth"}
          showLeadingZeros={true}
          calendarClassName={"calendarcustom"}
        />
        {this.validator.message('playerbirth', this.state.playerbirthvalue, 'required')}
        </div>
			  </div>
        <div className="form-group col-6">
        <label htmlFor="playerfile">Zdjęcie:</label><br />
        <input style={{display:'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput}/>
        <button className="btn btn-primary" onClick={(e) => {this.fileInput.click(); e.preventDefault();}}>Wybierz plik</button>&nbsp;
       
        <button className="btn btn-primary" onClick={this.fileUpload} disabled={!this.state.uploadshow}>Wgraj plik</button>&nbsp;<span>{this.state.percent} %</span>
     

        </div>
        </div>
			  <div className="form-group">
			    <label htmlFor="playerteam">Drużyna:</label>
			    <select multiple="multiple" className="form-control" onChange={this.handleChangeTeam} value={this.state.playerteamvalues}>
			    {this.props.teamslist.map((team)=><option key={team.id} value={team.id}>{team.name}</option>)}
			    </select>
			  </div>
			  <button onClick={this.handleSubmit} className="btn btn-primary">Dodaj</button>
		</form> 
      </div>

     

    </div>
  </div>
</div>
)}
}

export default Addplayer