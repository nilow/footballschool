import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { CirclePicker } from 'react-color';
import DeleteSvg from './Svg/DeleteSvg';
import EditSvg from './Svg/EditSvg';
import PlayersSvg from './Svg/PlayersSvg';
import SaveSvg from './Svg/SaveSvg';
import CancelSvg from './Svg/CancelSvg';
import SoccerSvg from './Svg/SoccerSvg';

class Team extends Component{
	constructor(props) {
        super();
        this.state ={
	    	name: props.team.name,
        calendarcolor: props.team.calendar_color,
	    	id: props.team.id,
	    	edit: false
  		}
      this.onEdit = this.onEdit.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onSave = this.onSave.bind(this);
      //this.onDelete = this.onDelete.bind(this);
      this.onConfirmDelete = this.onConfirmDelete.bind(this);
      this.handleChangeColorComplete = this.handleChangeColorComplete.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
    }
    onEdit(e){
    	e.preventDefault();
    	this.setState({ 
    		edit: true 
    	});
    }

    onCancel(e){
    	e.preventDefault();
    	this.setState({ 
    		edit: false,
        name: this.props.team.name,
    	});
    }

    onSave(e){
    	e.preventDefault();
      const token = localStorage.getItem('token');
    	 axios.put('http://backdziennik.nilow13.usermd.net/api/team/' + this.state.id+ '?token=' + token, {name: this.state.name, calendar_color: this.state.calendarcolor})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });

            this.setState({ 
    		edit: false 
    		});
    }

   /* onDelete(e){
    	e.preventDefault();
      this.props.onDel(this.state.id);
      const token = localStorage.getItem('token');
    	 axios.delete('http://backdziennik.nilow13.usermd.net/api/team/' + this.state.id+ '?token=' + token)
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
  		this.setState({name: e.target.value})
	}

  handleChangeColorComplete(color,event){

      this.setState({ calendarcolor: color.hex });
  }

	render(){
		const edit = this.state.edit;
 
		return(
			<div className="row align-items-center border border-left-0 border-right-0 border-top-0">
				<div className="col-10 pt-2 pb-2">
				{edit ? (
        		<div className="row"><div className="col-6"><label className="tiny">Nazwa drużyny</label><input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeName}/></div><div className="col-6"><label className="tiny">Kolor w kalendarzu</label><CirclePicker onChangeComplete={ this.handleChangeColorComplete } color={ this.state.calendarcolor } /></div></div>
      			) : (
        		this.state.name
      			)}
				</div><div className="col-2">
				{edit ? (
        		<div><a href="" onClick={this.onSave}><SaveSvg /></a> | <a href="#" onClick={this.onCancel}><CancelSvg /></a></div>
      			) : (
<div>
{this.props.user_role !=='Trenerzy' ? (<div><Link to={'/team/'+ this.state.id }><PlayersSvg /></Link> | <Link to={'/teamtrainings/'+ this.state.id }><SoccerSvg /></Link> | <a href="#" onClick={this.onEdit}><EditSvg /></a> | <a href="#" onClick={this.onConfirmDelete}><DeleteSvg /></a></div>) : (<div><Link to={'/team/'+ this.state.id }><PlayersSvg /></Link> | <Link to={'/teamtrainings/'+ this.state.id }><SoccerSvg /></Link></div>)}

</div>

        		
      			)}
				 

				</div>
			</div>
		);
	}
}
export default Team