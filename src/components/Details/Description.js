import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import DeleteSvg from '../Svg/DeleteSvg';
import EditSvg from '../Svg/EditSvg';
import SaveSvg from '../Svg/SaveSvg';
import CancelSvg from '../Svg/CancelSvg';

class Description extends Component{

	constructor(props) {
        super(props);
        //console.log('77777'+props.trainingid);
        this.state ={
    		trainingdescription: '',
    		trainingdescription_init:'',
    		trainingid:props.trainingid,
    		edit:false,
  		}
  	
  
    this.handleChangeContent = this.handleChangeContent.bind(this);
  	this.onEdit = this.onEdit.bind(this);
  	this.onCancel = this.onCancel.bind(this);
  	this.onSave = this.onSave.bind(this);
  	this.onDelete = this.onDelete.bind(this);

    }

   componentDidMount() {
      
        this.getTrainingDetails();  

    }


getTrainingDetails(){
  const token = localStorage.getItem('token');
axios.get('http://backdziennik.nilow13.usermd.net/api/training/details/' + this.state.trainingid + '?token='+ token)
      .then(res => {
        const training= res.data.training;
       this.setState({ trainingdescription_init: training.description.length > 0 ? training.description : 'Brak opisu', trainingdescription: training.description.length > 0 ? training.description : 'Brak opisu'});
        
      })

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
    		trainingdescription: this.state.trainingdescription_init,

    	});
    }

    onSave(e){
    	e.preventDefault();  
      const token = localStorage.getItem('token');
      axios.put('http://backdziennik.nilow13.usermd.net/api/training/description/' + this.state.trainingid + '?token='+ token, {description: this.state.trainingdescription})
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

    onDelete(e){
    	e.preventDefault();
      this.setState({ trainingdescription:'Brak opisu'});
      const token = localStorage.getItem('token');
       axios.put('http://backdziennik.nilow13.usermd.net/api/training/cleardescription/' + this.state.trainingid + '?token='+ token, {description: 'Brak opisu'})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });  
            
    
    }

  handleChangeContent(value) {
    this.setState({trainingdescription: value});
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
				<div className="row align-items-center"><div className="col-10">
        {edit ? (
        <ReactQuill 
          value={this.state.trainingdescription}
          onChange={this.handleChangeContent}
          modules={modules}
          formats={formats}
          />
          ) : (
          <div dangerouslySetInnerHTML={{ __html: this.state.trainingdescription}}></div>
          )}

        </div><div className="col-2">
				{edit ? (
        		<div><a href="" onClick={this.onSave}><SaveSvg /></a> | <a href="#" onClick={this.onCancel}><CancelSvg /></a></div>
      			) : (
        		<div><a href="#" onClick={this.onEdit}><EditSvg /></a> | <a href="#" onClick={this.onDelete}><DeleteSvg /></a></div>
      			)}
				

      			</div></div>
		)
	}
}

export default Description	
