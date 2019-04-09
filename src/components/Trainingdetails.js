import React, { Component } from 'react';
import axios from 'axios';
import Presence from './Details/Presence';
import Description from './Details/Description';


class Trainingdetails extends Component{

	constructor() {
        super();
        this.state ={
    		trainingdata:[],
    		trainingteams:[],
        trainingtrainers:[],
        trainingdesc:''
  		}
    }


	componentDidMount() {
      
        this.getTrainingDetails();  

    }


getTrainingDetails(){
  const token = localStorage.getItem('token');
axios.get('http://backdziennik.nilow13.usermd.net/api/training/details/' + this.props.match.params.id+ '?token=' + token)
      .then(res => {
        const training= res.data.training;
       this.setState({ trainingdata: training, trainingteams: training.teams, trainingdesc: training.description, trainingtrainers: training.trainers});
        
      })

}



	render(){
   
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-10 offset-md-1">
						<div className="row">
							<div className="col-12">
              <div className="d-flex justify-content-between">
              <div>
							<h3 className="pt-4">{this.state.trainingdata.name}</h3>	
							<h5>{this.state.trainingdata.date_from} - {this.state.trainingdata.date_to}</h5> 
              </div>
              <div><h5 className="pt-4">prowadzący:</h5>
              {this.state.trainingtrainers.map((trainer)=>
                        <div key={trainer.id}>{trainer.name} {trainer.surname}</div>)}

              </div>
              </div>
                <ul id="tabsJustified" className="nav nav-tabs mt-5">
                	<li className="nav-item"><a href="" data-target="#presencelist" data-toggle="tab" className="nav-link small text-uppercase  active">Lista obecności</a></li>
                    <li className="nav-item"><a href="" data-target="#description" data-toggle="tab" className="nav-link small text-uppercase">Opis treningu</a></li>
                    
                </ul>
                <br />
                <div id="tabsJustifiedContent" className="tab-content mb-5">
                    <div id="presencelist" className="tab-pane fade active show">
                      {this.state.trainingteams.map((team)=>
                      	<Presence key={team.id} trainingid={this.state.trainingdata.id} team={team} />)}
                    </div>
                   
                    <div id="description" className="tab-pane fade">
                     
                      
                        <Description trainingid={this.props.match.params.id}/>
				</div>
			</div>
 
							</div>
		
						</div>
					</div>
				</div>
				</div>

		)
	}
}

export default Trainingdetails	
