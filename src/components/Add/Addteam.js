import React, { Component } from 'react';
import axios from 'axios';
import { CirclePicker } from 'react-color';
import SimpleReactValidator from 'simple-react-validator';

class Addteam extends Component{
constructor(props) {
    super();
    this.state = {teamnamevalue: '',  calendarcolor: '#0f0',};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeColorComplete = this.handleChangeColorComplete.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Proszę wypełnić to pole'
      },
});
  }

handleChange(e) {
    this.setState({teamnamevalue: e.target.value});
  }

  handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.teamnamevalue);
    e.preventDefault();
    if (this.validator.allValid()) {
    this.props.onAdd(this.state.teamnamevalue, this.state.calendarcolor);
    this.setState({teamnamevalue: '', calendarcolor: '#0f0'});
     this.validator.hideMessages();
  }
  else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  }  

  }

  handleChangeColorComplete(color,event){

      this.setState({ calendarcolor: color.hex });
  }


render(){
return(
<div className="modal" id="myModal">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">Dodanie nowej drużyny</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
        <form onSubmit={this.handleSubmit}>
        <div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="teamname">Nazwa drużyny:</label>
			    <input type="text" id="teamname" name="teamname" className="form-control" value={this.state.teamnamevalue} onChange={this.handleChange}/>
          {this.validator.message('teamname', this.state.teamnamevalue, 'required')}
			  </div>
        <div className="form-group col-6">
          <label htmlFor="teamcolor">Kolor w kalendarzu:</label>
          <CirclePicker onChangeComplete={ this.handleChangeColorComplete } color={ this.state.calendarcolor } />
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

export default Addteam