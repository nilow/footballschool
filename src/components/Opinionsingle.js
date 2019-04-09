import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import ReadmoreSvg from './Svg/ReadmoreSvg';
import ReadlessSvg from './Svg/ReadlessSvg';
import DeleteSvg from './Svg/DeleteSvg';
import EditSvg from './Svg/EditSvg';
import PlayerSvg from './Svg/PlayerSvg';
import SaveSvg from './Svg/SaveSvg';
import CancelSvg from './Svg/CancelSvg';

class Opinionsingle extends Component{
	constructor(props) {
        super();
        
        this.state ={
	    	title: props.opinion.title,
	    	date: props.opinion.date,
	    	content: props.opinion.content,
        authors: props.opinion.users,
	    	id: props.opinion.id,
	    	edit: false,
        show: false,
  		}
      this.onEdit = this.onEdit.bind(this);
      this.onShow = this.onShow.bind(this);
      this.onHide = this.onHide.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onSave = this.onSave.bind(this);
      //this.onDelete = this.onDelete.bind(this);
      this.onConfirmDelete = this.onConfirmDelete.bind(this);
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeContent = this.handleChangeContent.bind(this);
      this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    onEdit(e){
    	e.preventDefault();
    	this.setState({ 
    		edit: true 
    	});
    }

     onShow(e){
      e.preventDefault();
      this.setState({ 
        show: true 
      });
    }

     onHide(e){
      e.preventDefault();
      this.setState({ 
        show: false
      });
    }

    onCancel(e){
    	e.preventDefault();
    	this.setState({ 
    		edit: false,
        	title: this.props.opinion.title,
        	date: this.props.opinion.date,
	    	content: this.props.opinion.content,
    	});
    }

    onSave(e){
    	e.preventDefault();
      const token = localStorage.getItem('token');
    	 axios.put('http://backdziennik.nilow13.usermd.net/api/note/' + this.state.id + '?token=' + token, {title: this.state.title, date: this.state.date, content: this.state.content})
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
    	 axios.delete('http://backdziennik.nilow13.usermd.net/api/note/' + this.state.id + '?token=' + token)
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



handleChangeDate(e) {
    this.setState({date: e.target.value});
  }

handleChangeContent(value) {
    this.setState({content: value});
  }

renderShow(){

if(this.state.show) {
     
      return (
          
          <div className="col-12 p-3">
          <div dangerouslySetInnerHTML={{ __html: this.state.content}}></div>
          <div className="text-center"><a href="" onClick={this.onHide}><ReadlessSvg /></a></div>
          </div>
          
          
      );
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
        		<div className="col-12 pt-2 pb-2"><label className="tiny">Treść</label>
 <ReactQuill 
          value={this.state.content}
          onChange={this.handleChangeContent}
          modules={modules}
          formats={formats}
          />

          </div>
        </div>
      			) : (
        		<div className="row align-items-center">
	        		<div className="col-4 pt-2 pb-2">{this.state.title}</div>
              <div className="col-4 pt-2 pb-2">{this.state.authors.map((author)=><div key={author.id}>{author.name} {author.surname}</div>)}</div>
	        		<div className="col-4 pt-2 pb-2">{this.state.date}</div>
	        		{this.renderShow()}
        		</div>
      			)}
				</div><div className="col-2">
				{edit ? (
        		<div><a href="" onClick={this.onSave}><SaveSvg /></a> | <a href="#" onClick={this.onCancel}><CancelSvg /></a></div>
      			) : (
        		<div><a href="" onClick={this.onShow}><ReadmoreSvg /></a> | <a href="#" onClick={this.onEdit}><EditSvg /></a> | <a href="#" onClick={this.onConfirmDelete}><DeleteSvg /></a></div>
      			)}
				 

				</div>
			</div>
		);
	}
}
export default Opinionsingle