import React, { Component } from 'react';
import axios from 'axios';
class Addteam extends Component{
constructor(props) {
    super(props);
    this.state = {teamnamevalue: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(e) {
    this.setState({teamnamevalue: e.target.value});
  }

  handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.teamnamevalue);
    this.props.onAdd(this.state.teamnamevalue);
    this.setState({teamnamevalue: ''});
    e.preventDefault();

  }


render(){
return(
<div className="modal" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">Dodanie nowej drużyny</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
        <form onSubmit={this.handleSubmit}>
			  <div className="form-group">
			    <label htmlFor="teamnane">Nazwa drużyny:</label>
			    <input type="text" className="form-control" value={this.state.teamnamevalue} onChange={this.handleChange}/>
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