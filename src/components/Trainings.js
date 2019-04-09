import React, { Component } from 'react';
import Training from './Training';
import Addtraining from './Add/Addtraining';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Confirm from './Confirm';

class Trainings extends Component{

  	constructor() {
        super();
        this.state ={
    	trainings: [],
    	teamslist:[],
      offset: 0,
      perPage: 20,
      pageCount: 1,
      showconfirm: false,
      idToDelete:0
  	}
    this._mounted = false;
  	this.trainingDeleting = this.trainingDeleting.bind(this);
    this.trainingConfirmDeleting = this.trainingConfirmDeleting.bind(this);
    this.trainingCancelDeleting = this.trainingCancelDeleting.bind(this);
    this.trainingAdding = this.trainingAdding.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

  	
     //this.listAllTrainers();
    }

  listAllTeams(){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/teams/select'+ '?token=' + token)
      .then(res => {
        const teams= res.data.teams;
        if(this._mounted){
       this.setState({ teamslist: teams });
     }
        
      })
  }

  listAllTrainers(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/users/roleindex/3'+ '?token=' + token)
      .then(res => {
        const users= res.data.users;
        if(this._mounted){
       this.setState({ trainerslist: users });
     }
        
      })
  }

  listAllTeamTrainings(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/trainings/team/' + this.props.match.params.id + '/'+ this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const trainings= res.data.trainings;
        const total = res.data.total;
        if(this._mounted){
        this.setState({ trainings: trainings, pageCount:Math.ceil(total / this.state.perPage) });
      }
        //console.log(this.state);
      })
  }


  componentDidMount() {
    this._mounted = true;
      if(typeof this.props.match !== 'undefined'){
        this.listAllTeamTrainings();
      }
      else{
       this.listAll();
      }
      this.listAllTeams();
    }

componentWillUnmount(){
    this._mounted = false;

}

  listAll(){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/trainings/' + this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const trainings= res.data.trainings;
        const total = res.data.total;
        if(this._mounted){
        this.setState({ trainings: trainings, pageCount:Math.ceil(total / this.state.perPage) });

      }
        //console.log(this.state);
      })
  }

  listAllTeamPlayers(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/players/team/' + this.props.match.params.id+ '?token=' + token)
      .then(res => {
        const players= res.data.players;
        if(this._mounted){
        this.setState({ players: players });
      }
        //console.log(this.state);
      })
  }

  trainingAdding(newTitle, newTeamsId, newTrainersId, newStart, newEnd){
    const token = localStorage.getItem('token');
    axios.post('http://backdziennik.nilow13.usermd.net/api/training'+ '?token=' + token, {name: newTitle, date_from: newStart, date_to: newEnd, teamsid: newTeamsId, trainersid: newTrainersId}) 
      .then(res => {
         const training= res.data.training;
          this.listAll();
          console.log('989898989')

      }) 

  }

handlePageClick(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage);
   if(typeof this.props.match !== 'undefined'){
    this.setState({offset: offset},()=>{this.listAllTeamTrainings()});
   }
   else{
  this.setState({offset: offset},()=>{this.listAll()});
}
}
  

  trainingDeleting(){
  	//alert(teamId);
    const trainingId = this.state.idToDelete;
     const token = localStorage.getItem('token');
       axios.delete('http://backdziennik.nilow13.usermd.net/api/training/' + trainingId + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
  	const position = this.state.trainings.findIndex((element) => {
            return element.id == trainingId;
    });
    this.state.trainings.splice(position, 1);
    const trainings= this.state.trainings;
    this.setState({ trainings: trainings, showconfirm: false, idToDelete: 0 });
  }

  trainingConfirmDeleting(trainingId){
    //alert(newsId + "55555");
    this.setState({showconfirm: true, idToDelete: trainingId});
  }

  trainingCancelDeleting(){
    this.setState({showconfirm: false, idToDelete: 0});
  }

renderPagination(){
    if(this.state.pageCount > 1) {

    return(
    <ReactPaginate
                    breakClassName="page-item"
                    breakLabel={<a className="page-link">...</a>}
                    pageClassName="page-item"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    containerClassName={"pagination"}
                    onPageChange={this.handlePageClick}
                    pageCount={this.state.pageCount}
                    previousLabel="&laquo;"
                    nextLabel="&raquo;"
          />
  )
}
}

	render(){

		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-10 offset-md-1">
						<div className="row">
							<div className="col-12">
								<div className="d-flex mb-4 mt-4">
								<h3 className="pr-2">Treningi</h3>
								<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Dodaj nowy trening</button>
								</div>
								<div className="row border border-left-0 border-right-0 border-top-0">
								<div className="col-10">
									<div className="row">
										<div className="col-3"><strong>Nazwa</strong></div>
										<div className="col-3"><strong>Termin</strong></div>
										<div className="col-3"><strong>Trener</strong></div>
										<div className="col-3"><strong>Drużyna</strong></div>
									</div>
								</div>
								<div className="col-2">&nbsp;</div>
								</div>
								{this.state.trainings.map((training)=><Training key={training.id} training={training} onConfirm={this.trainingConfirmDeleting} teamslist={this.state.teamslist} user_role={this.props.user_role} />)}
								
								<div className="row">
                <div className="col-12 pt-5 pb-5 ">
                {this.renderPagination()}
                </div>
                </div>
							</div>
						</div>
					</div>
				</div>
				<Addtraining onAdd={this.trainingAdding} teamslist={this.state.teamslist} />
        {this.state.showconfirm && <Confirm onCancel={this.trainingCancelDeleting} onConfirm={this.trainingDeleting}/>}
			</div>
		);
	}
}
export default Trainings
