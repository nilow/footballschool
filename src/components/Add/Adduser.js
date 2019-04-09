import React, { Component } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';

class Adduser extends Component{
constructor(props) {
    super(props);
    this.state = {usernamevalue: '', usersurnamevalue: '', useremailvalue: '', userpassvalue: '', userrolevalues: []};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Proszę wypełnić to pole',
        email: 'Podaj poprawny adres email',
      },
});
    //console.log(props.teamslist);
  }


handleChangeName(e) {
    this.setState({usernamevalue: e.target.value});
}

handleChangeRole(e) {
	var options = e.target.options;
  	var values = [];
  	for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      values.push(options[i].value);
    }
  }
    this.setState({userrolevalues: values});
}

handleChangeSurname(e) {
    this.setState({usersurnamevalue: e.target.value});
}

handleChangeEmail(e) {
    this.setState({useremailvalue: e.target.value});
}
handleChangePass(e) {
    this.setState({userpassvalue: e.target.value});
}

  handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.teamnamevalue);
        e.preventDefault();
    if (this.validator.allValid()) {
    this.props.onAdd(this.state.usernamevalue, this.state.usersurnamevalue, this.state.useremailvalue, this.state.userpassvalue, this.state.userrolevalues);
    this.setState({usernamevalue: '', usersurnamevalue: '', useremailvalue: '', userpassvalue: '', userrolevalues: []});
    this.validator.hideMessages();
}
else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  }

  }


render(){
return(
<div className="modal" id="myModal">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">Dodanie nowego użytkownika</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
        <form onSubmit={this.handleSubmit}>
        		<div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="username">Imię:</label>
			    <input type="text" className="form-control" value={this.state.usernamevalue} onChange={this.handleChangeName}/>
           {this.validator.message('username', this.state.usernamevalue, 'required')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="usersurname">Nazwisko:</label>
			    <input type="text" className="form-control" value={this.state.usersurnamevalue} onChange={this.handleChangeSurname}/>
          {this.validator.message('usersurname', this.state.usersurnamevalue, 'required')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="useremail">Email:</label>
			    <input type="text" className="form-control" value={this.state.useremailvalue} onChange={this.handleChangeEmail}/>
          {this.validator.message('useremail', this.state.useremailvalue, 'required|email')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="userpass">Hasło:</label>
			    <input type="text" className="form-control" value={this.state.userpassvalue} onChange={this.handleChangePass}/>
          {this.validator.message('userpass', this.state.userpassvalue, 'required')}
			  </div>
			  <div className="form-group col-12">
			    <label htmlFor="userpass">Grupa:</label>
			    <select multiple="multiple" className="form-control" onChange={this.handleChangeRole} value={this.state.userrolevalues}>
			    {this.props.roleslist.map((role)=><option key={role.id} value={role.id}>{role.name}</option>)}
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

export default Adduser