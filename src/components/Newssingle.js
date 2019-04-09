import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import DeleteSvg from './Svg/DeleteSvg';
import EditSvg from './Svg/EditSvg';
import SaveSvg from './Svg/SaveSvg';
import CancelSvg from './Svg/CancelSvg';


class Newssingle extends Component{
	constructor(props) {
        super();
        var groups_selected = [];
	  	for (var i = 0, l = props.news.groups.length; i < l; i++) {
	      groups_selected.push(props.news.groups[i].id);
	    }
        this.state ={
	    	title: props.news.title,
	    	short: props.news.short_content,
        authordata: [props.news.name, props.news.surname],
	    	date: props.news.date,
	    	groups: props.news.groups,
	    	groups_selected: groups_selected,
	    	initial_teams_selected: groups_selected,
	    	content: props.news.content,
	    	id: props.news.id,
	    	edit: false,
  		}
      this.onEdit = this.onEdit.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onSave = this.onSave.bind(this);
      //this.onDelete = this.onDelete.bind(this);
      this.onConfirmDelete = this.onConfirmDelete.bind(this);
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeShort = this.handleChangeShort.bind(this);
      this.handleChangeContent = this.handleChangeContent.bind(this);
      this.handleChangeDate = this.handleChangeDate.bind(this);
      this.handleChangeGroup = this.handleChangeGroup.bind(this);
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
        	title: this.props.news.title,
        	date: this.props.news.date,
	    	short: this.props.news.short_content,
	    	content: this.props.news.content,
	    	groups_selected: this.state.initial_groups_selected,
    	});
    }

    onSave(e){
    	e.preventDefault();
      const token = localStorage.getItem('token');
    	 axios.put('http://backdziennik.nilow13.usermd.net/api/news/' + this.state.id + '?token=' + token, {title: this.state.title, date: this.state.date, short_content: this.state.short, content: this.state.content, groupsid: this.state.groups_selected})
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

    /*onDelete(e){
    	e.preventDefault();
      this.props.onDel(this.state.id);
      const token = localStorage.getItem('token');
    	 axios.delete('http://backdziennik.nilow13.usermd.net/api/news/' + this.state.id + '?token=' + token)
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


   handleChangeTitle(e) {
    this.setState({title: e.target.value});
  }

handleChangeShort(e) {
    this.setState({short: e.target.value});
  }

handleChangeDate(e) {
    this.setState({date: e.target.value});
  }

handleChangeContent(value) {
    this.setState({content: value});
  }

 handleChangeGroup(e) {
		var options = e.target.options;
		var values = [];
		var newgroups = [];
  		for (var i = 0, l = options.length; i < l; i++) {
    		if (options[i].selected) {
      		values.push(options[i].value);
      		newgroups.push({id: options[i].value, name: options[i].innerHTML});
    	}
  		this.setState({groups_selected: values, groups: newgroups})
	}
}

	render(){
		const edit = this.state.edit;
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
			<div className="row align-items-center border border-left-0 border-right-0 border-top-0">
				<div className="col-10 pt-2 pb-2">
				{edit ? (
        		<div className="row align-items-center">
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Tytuł</label><input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle}/></div>
        		<div className="col-6 pt-2 pb-2"><label className="tiny">Data</label><input type="text" className="form-control" value={this.state.date} onChange={this.handleChangeDate}/></div>
        		<div className="col-12 pt-2 pb-2"><label className="tiny">Wstęp</label><textarea className="form-control" value={this.state.short} onChange={this.handleChangeShort}></textarea></div>
        		<div className="col-12 pt-2 pb-2"><label className="tiny">Treść</label>
 <ReactQuill 
          value={this.state.content}
          onChange={this.handleChangeContent}
          modules={modules}
          formats={formats}
          />

          </div>
        		<div className="col-12 pt-2 pb-2"><label className="tiny">Widoczny dla grup</label><select multiple="multiple" className="form-control" onChange={this.handleChangeGroup} value={this.state.groups_selected}>
			    {this.props.grouplist.map((group)=><option key={group.id} value={group.id}>{group.name}</option>)}
			    </select></div></div>
      			) : (
        		<div className="row align-items-center">
	        		<div className="col-3 pt-2 pb-2">{this.state.title}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.authordata[0]} {this.state.authordata[1]}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.date}</div>
	        		<div className="col-3 pt-2 pb-2">{this.state.groups.map((group)=><div key={group.id}>{group.name}</div>)}</div>
	        		
        		</div>
      			)}
				</div><div className="col-2">
				{edit ? (
        		<div><a href="" onClick={this.onSave}><SaveSvg /></a> | <a href="#" onClick={this.onCancel}><CancelSvg /></a></div>
      			) : (
        		<div><a href="#" onClick={this.onEdit}><EditSvg /></a> | <a href="#" onClick={this.onConfirmDelete}><DeleteSvg /></a></div>
      			)}
				 

				</div>
			</div>
		);
	}
}
export default Newssingle