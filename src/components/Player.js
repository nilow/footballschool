import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from 'react-date-picker';
import axios from 'axios';
import DeleteSvg from './Svg/DeleteSvg';
import EditSvg from './Svg/EditSvg';
import PlayerSvg from './Svg/PlayerSvg';
import SaveSvg from './Svg/SaveSvg';
import CancelSvg from './Svg/CancelSvg';

class Player extends Component{
	constructor(props) {
        super();
        var teams_selected = [];
	  	for (var i = 0, l = props.player.teams.length; i < l; i++) {
	      teams_selected.push(props.player.teams[i].id);
	    }
        this.state ={
	    	name: props.player.name,
	    	surname: props.player.surname,
	    	birth: props.player.birth,
	    	teams: props.player.teams,
	    	teams_selected: teams_selected,
        image: props.player.photo,
	    	initial_teams_selected: teams_selected,
	    	id: props.player.id,
	    	edit: false,
        fileSelected:null, 
        percent:0, 
        uploadshow:false,
  		}
  		this.onEdit = this.onEdit.bind(this);
  		this.onCancel = this.onCancel.bind(this);
  		this.onSave = this.onSave.bind(this);
  		//this.onDelete = this.onDelete.bind(this);
      this.onConfirmDelete = this.onConfirmDelete.bind(this);
  		this.handleChangeName = this.handleChangeName.bind(this);
  		this.handleChangeSurname = this.handleChangeSurname.bind(this);
  		this.handleChangeBirth = this.handleChangeBirth.bind(this);
  		this.handleChangeTeam = this.handleChangeTeam.bind(this);
      this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
      this.fileUpload = this.fileUpload.bind(this);
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
    		name: this.props.player.name,
	    	surname: this.props.player.surname,
	    	birth: this.props.player.birth,
        image: this.props.player.photo,
	    	teams_selected: this.state.initial_teams_selected,

    	});
    }

    onSave(e){
    	e.preventDefault();
      const file = this.state.fileSelected;
    var filename = '';
    if(this.state.fileSelected === null){
      filename = this.state.image;
    }
    else{
      filename = this.state.fileSelected.name;
    }
    this.setState({
      image:this.state.fileSelected.name
    })
    const token = localStorage.getItem('token');
    	axios.put('http://backdziennik.nilow13.usermd.net/api/player/' + this.state.id + '?token=' + token, {name: this.state.name, surname: this.state.surname, birth: this.state.birth, teamsid: this.state.teams_selected, photo: filename })
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
          // console.log(this.state.birth.getFullYear()+' '+this.state.birth.getMonth()+' '+this.state.birth.getDate());

           this.setState({ 
    		edit: false,
    		});
    }

   /* onDelete(e){
    	e.preventDefault();
      this.props.onDel(this.state.id);
      const token = localStorage.getItem('token');
    	 axios.delete('http://backdziennik.nilow13.usermd.net/api/player/' + this.state.id + '?token=' + token)
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

	handleChangeBirth(date) {
    var month = date.getMonth()+1;
    var day = date.getDate();
    var date = date.getFullYear() + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);
    //console.log(date.getFullYear() + '-' + (month < 10 ? "0"+month : month) + '-' + date.getDate())
  		this.setState({birth: date, })
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

fileSelectedHandler(e) {
    this.setState({fileSelected:e.target.files[0], uploadshow:true})

  }

  fileUpload(e) {
    console.log('upload');
    e.preventDefault();
    const fd = new FormData();
    const token = localStorage.getItem('token');
    fd.append('playerfile', this.state.fileSelected, this.state.fileSelected.name);
    axios.post('http://backdziennik.nilow13.usermd.net/api/playeruploadfile'+ '?token=' + token, fd,{
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
		const edit = this.state.edit;
 
		return(
			<div className="row align-items-center border border-left-0 border-right-0 border-top-0">
				<div className="col-10">
				{edit ? (
        		<div className="row align-items-center">
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Imię</label><input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeName}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Nazwisko</label><input type="text" className="form-control" value={this.state.surname} onChange={this.handleChangeSurname}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Data urodzenia</label>
            <div>
         <DatePicker
          onChange={this.handleChangeBirth}
          value={new Date(this.state.birth)}
          showLeadingZeros={true}
          className={"birth"}
          calendarClassName={"calendarcustom"}
        />
        </div></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Drużyna</label><select multiple="multiple" className="form-control" onChange={this.handleChangeTeam} value={this.state.teams_selected}>
			    {this.props.teamslist.map((team)=><option key={team.id} value={team.id}>{team.name}</option>)}
			    </select></div>
          <div className="col-6 pt-2 pb-2 text-center"><img src={"http://backdziennik.nilow13.usermd.net/uploads/" + this.state.image} alt="Klub małego piłkarza" className="imgcard"/></div>
          <div className="col-6 pt-2 pb-2"><label htmlFor="playerbirth">Zdjęcie:</label><br />
        <input style={{display:'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput}/>
        <button className="btn btn-primary" onClick={(e) => {this.fileInput.click(); e.preventDefault();}}>Wybierz plik</button>&nbsp;
         <button className="btn btn-primary" onClick={this.fileUpload} disabled={!this.state.uploadshow}>Wgraj plik</button>&nbsp;<span>{this.state.percent} %</span></div>
          </div>
      			) : (
        		<div className="row align-items-center">
	        		<div className="col-3 pt-2 pb-2">{this.state.name}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.surname}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.birth}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.teams.map((team)=><div key={team.id}>{team.name}</div>)}</div>
        		</div>
      			)}
				</div><div className="col-2">
				{edit ? (
        		<div><a href="" onClick={this.onSave}><SaveSvg /></a> | <a href="#" onClick={this.onCancel}><CancelSvg /></a></div>
      			) : (
            <div>
            {this.props.user_role !=='Rodzice' && this.props.user_role !=='Trenerzy' ? (<div><Link to={'/player/'+ this.state.id }><PlayerSvg /></Link> | <a href="#" onClick={this.onEdit}><EditSvg /></a> | <a href="#" onClick={this.onConfirmDelete}><DeleteSvg /></a></div>) : (<div><Link to={'/player/'+ this.state.id }><PlayerSvg /></Link></div>)}

            </div>
            
        		
      			)}
				 

				</div>
			</div>
		);
	}
}
export default Player