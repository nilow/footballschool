import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import SimpleReactValidator from 'simple-react-validator';

class Addopinion extends Component{
constructor(props) {
    super();
    this.state = {opiniontitlevalue: '',  opiniondatevalue: '', opinioncontentvalue: ''};
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Proszę wypełnić to pole'
      },
});
  }

handleChangeTitle(e) {
    this.setState({opiniontitlevalue: e.target.value});
  }



handleChangeDate(date) {
    var month = date.getMonth()+1;
    var day = date.getDate();
    var date = date.getFullYear() + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);
    console.log(date)
    this.setState({opiniondatevalue: date});
  }

handleChangeContent(value) {
    this.setState({opinioncontentvalue: value});
  }



  handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.teamnamevalue);
     e.preventDefault();
    if (this.validator.allValid()) {
    this.props.onAdd(this.state.opiniontitlevalue, this.state.opiniondatevalue, this.state.opinioncontentvalue, this.props.playerdata.id);
    this.setState({opiniontitlevalue: '', opiniondatevalue: '', opinioncontentvalue: ''});
    this.validator.hideMessages();
   }
  else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  }

  }

  


render(){
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
return(
<div className="modal" id="myModal">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">Dodanie nowej opinii o zawodniku {this.props.playerdata.name} {this.props.playerdata.surname}</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
        <form onSubmit={this.handleSubmit}>
        <div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="optitle">Tytuł:</label>
			    <input type="text" className="form-control" value={this.state.opiniontitlevalue} onChange={this.handleChangeTitle}/>
          {this.validator.message('optitle', this.state.opiniontitlevalue, 'required')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="opdate">Data:</label>
          <DatePicker
          onChange={this.handleChangeDate}
          value={this.state.opiniondatevalue!=''?new Date(this.state.opiniondatevalue):this.state.opiniondatevalue}
          className={"birth"}
          showLeadingZeros={true}
          calendarClassName={"calendarcustom"}
        />
			    {this.validator.message('opdate', this.state.opiniondatevalue, 'required')}
			  </div>


			  <div className="form-group col-12">
			    <label htmlFor="opcontent">Treść:</label>
          <ReactQuill 
          value={this.state.opinioncontentvalue}
          onChange={this.handleChangeContent}
          modules={modules}
          formats={formats}
          />
			   {this.validator.message('opcontent', this.state.opinioncontentvalue, 'required')}
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

export default Addopinion