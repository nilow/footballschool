import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import SimpleReactValidator from 'simple-react-validator';

class Addnews extends Component{
constructor(props) {
    super();
    this.state = {newstitlevalue: '', newsshortvalue: '', newsdatevalue: '', newscontentvalue: '', newsgroupvalues: []};

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeShort = this.handleChangeShort.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Proszę wypełnić to pole'
      },
});
  }

handleChangeTitle(e) {
    this.setState({newstitlevalue: e.target.value});
  }

handleChangeShort(e) {
    this.setState({newsshortvalue: e.target.value});
  }

handleChangeDate(date) {
    var month = date.getMonth()+1;
    var day = date.getDate();
    var date = date.getFullYear() + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);
    console.log(date)
    this.setState({newsdatevalue: date});
  }

handleChangeContent(value) {
    this.setState({newscontentvalue: value});
  }

 handleChangeGroup(e) {
	var options = e.target.options;
  	var values = [];
  	for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      values.push(options[i].value);
    }
  }
    this.setState({newsgroupvalues: values});
}

  handleSubmit(e) {
    e.preventDefault();
    //alert('A name was submitted: ' + this.state.teamnamevalue);
    if (this.validator.allValid()) {
    this.props.onAdd(this.state.newstitlevalue, this.state.newsdatevalue, this.state.newsshortvalue, this.state.newscontentvalue, this.state.newsgroupvalues);
    this.setState({newstitlevalue: '', newsdatevalue: '', newstitlevalue: '', newsshortvalue: '', newscontentvalue: '', newsgroupvalues: []});
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
        <h4 className="modal-title">Dodanie nowej aktualności</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
        <form onSubmit={this.handleSubmit}>
        <div className="row">
			  <div className="form-group col-6">
			    <label htmlFor="newstitle">Tytuł:</label>
			    <input type="text" id="newstitle" name="newstitle" className="form-control" value={this.state.newstitlevalue} onChange={this.handleChangeTitle}/>
           {this.validator.message('newstitle', this.state.newstitlevalue, 'required')}
			  </div>
			  <div className="form-group col-6">
			    <label htmlFor="newsdate">Data:</label>
          <DatePicker
          onChange={this.handleChangeDate}
          value={this.state.newsdatevalue!=''?new Date(this.state.newsdatevalue):this.state.newsdatevalue}
          className={"birth"}
          showLeadingZeros={true}
          calendarClassName={"calendarcustom"}
        />
			     {this.validator.message('newsdate', this.state.newsdatevalue, 'required')}
			  </div>

			  <div className="form-group col-12">
			    <label htmlFor="newsshort">Wstęp:</label>
			    <textarea className="form-control" onChange={this.handleChangeShort} value={this.state.newsshortvalue}></textarea>
			  </div>

			  <div className="form-group col-12">
			    <label htmlFor="newscontent">Treść:</label>
          <ReactQuill 
          value={this.state.newscontentvalue}
          onChange={this.handleChangeContent}
          modules={modules}
          formats={formats}
          />
			   
			  </div>
			  <div className="form-group col-12">
			    <label htmlFor="newsgroups">Dostępny dla grupy:</label>
			    <select multiple="multiple" className="form-control" onChange={this.handleChangeGroup} value={this.state.newsgroupvalues}>
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

export default Addnews