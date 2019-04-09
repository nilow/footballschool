import React, { Component } from 'react';
import axios from 'axios';
import Addopinion from './Add/Addopinion';
import Opinionsingle from './Opinionsingle';
import ReactPaginate from 'react-paginate';
import Confirm from './Confirm';

class Playerdetails extends Component{
	constructor() {
        super();
        this.state ={
    		playerdata:[],
    		playerteams:[],
    		playernotes:[],
        playertrainings:[],
        playertrainingsabs:[],
    		offset: 0,
      	perPage: 10,
      	pageCount: 1,
        offset2: 0,
        perPage2: 10,
        pageCount2: 1,
        offset3: 0,
        perPage3: 10,
        pageCount3: 1,
        showconfirm: false,
        idToDelete:0
  		}
  	this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageClick2 = this.handlePageClick2.bind(this);
    this.handlePageClick3 = this.handlePageClick3.bind(this);
  	this.opinionAdding = this.opinionAdding.bind(this);
  	this.opinionDeleting = this.opinionDeleting.bind(this);
    this.opinionConfirmDeleting = this.opinionConfirmDeleting.bind(this);
    this.opinionCancelDeleting = this.opinionCancelDeleting.bind(this);
    }

    componentDidMount() {
      
        this.getPlayerDetails();  
        this.listPlayerOpinions();
        this.listPlayerTrainings();
        this.listPlayerTrainingsAbsence();
    }

	getPlayerDetails(){
    const token = localStorage.getItem('token');
	axios.get('http://backdziennik.nilow13.usermd.net/api/player/details/' + this.props.match.params.id+ '?token=' + token)
	      .then(res => {
	        const player= res.data.player;
	       this.setState({ playerdata: player,  playerteams: player.teams});
	        console.log(this.state.playerdata)
	      })

	}

	listPlayerOpinions(){
		const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/notes/' + this.props.match.params.id + '/' + this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const notes= res.data.notes;
         const total = res.data.total;
        this.setState({ playernotes: notes , pageCount:Math.ceil(total / this.state.perPage)});
        console.log(notes);
      });
  }

  listPlayerTrainings(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/player/trainings/' + this.props.match.params.id + '/' + this.state.offset2 + '/' + this.state.perPage2+ '?token=' + token)
      .then(res => {
        const trainings= res.data.trainings;
         const total2 = res.data.total;
        this.setState({ playertrainings: trainings , pageCount2:Math.ceil(total2 / this.state.perPage2)});
        
      });
  }

  listPlayerTrainingsAbsence(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/player/trainingsabsent/' + this.props.match.params.id + '/' + this.state.offset3 + '/' + this.state.perPage3+ '?token=' + token)
      .then(res => {
        const trainings= res.data.trainings;
        const total3 = res.data.total;
        this.setState({ playertrainingsabs: trainings , pageCount3:Math.ceil(total3 / this.state.perPage3)});
        
      });
  }

   opinionDeleting(){
  	//alert(teamId);
    const opinionId = this.state.idToDelete;
    const token = localStorage.getItem('token');
       axios.delete('http://backdziennik.nilow13.usermd.net/api/note/' + opinionId + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
  	const position = this.state.playernotes.findIndex((element) => {
            return element.id == opinionId;
    });
    this.state.playernotes.splice(position, 1);
    const playernotes= this.state.playernotes;
    this.setState({ playernotes: playernotes, showconfirm: false, idToDelete: 0});
  }

  opinionConfirmDeleting(opinionId){
    //alert(newsId + "55555");
    this.setState({showconfirm: true, idToDelete: opinionId});
  }

  opinionCancelDeleting(){
    this.setState({showconfirm: false, idToDelete: 0});
  }

	opinionAdding(newTitle, newDate, newContent, newPlayerId){
  	//alert(newName);
    const token = localStorage.getItem('token');
  	axios.post('http://backdziennik.nilow13.usermd.net/api/note'+ '?token=' + token,{title: newTitle, date: newDate, content: newContent, playerid: newPlayerId})
      .then(res => {
        const note= res.data.note;
        this.listPlayerOpinions();
     
        
      });

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

renderPagination2(){
    if(this.state.pageCount2 > 1) {

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
                    onPageChange={this.handlePageClick2}
                    pageCount={this.state.pageCount2}
                    previousLabel="&laquo;"
                    nextLabel="&raquo;"
          />
  )
}
}

renderPagination3(){
    if(this.state.pageCount3 > 1) {

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
                    onPageChange={this.handlePageClick3}
                    pageCount={this.state.pageCount3}
                    previousLabel="&laquo;"
                    nextLabel="&raquo;"
          />
  )
}
}

handlePageClick(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage);
    this.setState({offset: offset},()=>{this.listPlayerOpinions()});
}

handlePageClick2(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage2);
    this.setState({offset2: offset},()=>{this.listPlayerTrainings()});
}

handlePageClick3(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage3);
    this.setState({offset3: offset},()=>{this.listPlayerTrainingsAbsence()});
}

	render(){
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-10 offset-md-1">
						<div className="row">
							<div className="col-12">
              <div className="d-flex mb-4 mt-4 justify-content-between">
                <div>
                <div className="d-flex mb-4 mt-4">
  								
  								<h3 className="pr-2">{this.state.playerdata.name} {this.state.playerdata.surname}</h3>{this.props.user_role == 'Trenerzy' && <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Dodaj nową opinię / uwagę</button>}

                </div>
								<h5>Data urodzenia: {this.state.playerdata.birth}<br />{this.state.playerteams.map((team)=><span className="mr-2" key={team.id}>{team.name}</span>)}</h5>
								</div>
                <div>
                <img src={"http://backdziennik.nilow13.usermd.net/uploads/" + this.state.playerdata.photo} alt={this.state.playerdata.name + " " + this.state.playerdata.surname} className="imgcard"/>
                </div>
								</div>
								
								

                <ul id="tabsJustified" className="nav nav-tabs mt-5">
                	<li className="nav-item"><a href="" data-target="#presence" data-toggle="tab" className="nav-link small text-uppercase  active">Obecności na treningach</a></li>
                	<li className="nav-item"><a href="" data-target="#absence" data-toggle="tab" className="nav-link small text-uppercase">Nieobecności na treningach</a></li>
                    <li className="nav-item"><a href="" data-target="#opinions" data-toggle="tab" className="nav-link small text-uppercase">Uwagi, opinie trenera</a></li>
                    
                </ul>
                <br />
                <div id="tabsJustifiedContent" className="tab-content mb-5">
                    <div id="presence" className="tab-pane fade active show">
                     {this.state.playertrainings.map((training)=><div className="row align-items-center border border-left-0 border-right-0 border-top-0" key={training.id}><div className="col-10 pt-2 pb-2">{training.name}</div><div className="col-2 pt-2 pb-2">{training.dates}</div></div>)}
                      <div className="row">
                      <div className="col-12 pt-5 pb-5 ">
                      {this.renderPagination2()}
                      </div>
                      </div>
                    </div>
                    <div id="absence" className="tab-pane fade">
                       {this.state.playertrainingsabs.map((training)=><div className="row align-items-center border border-left-0 border-right-0 border-top-0" key={training.id}><div className="col-10 pt-2 pb-2">{training.name}</div><div className="col-2 pt-2 pb-2">{training.dates}</div></div>)}
                      <div className="row">
                      <div className="col-12 pt-5 pb-5 ">
                      {this.renderPagination3()}
                      </div>
                      </div>
                    </div>
                   
                    <div id="opinions" className="tab-pane fade">
                    <div className="row">
                    <div className="col-10">
						<div className="row">
                    	<div className="col-4">Tytuł</div>
                    	<div className="col-4">Trener</div>
                    	<div className="col-4">Data</div>
                    	</div>
                    </div>
                    <div className="col-2">&nbsp;</div>
                    </div>
                     {this.state.playernotes.map((opinion)=><Opinionsingle key={opinion.id} opinion={opinion} onConfirm={this.opinionConfirmDeleting} />)}
                <div className="row">
                <div className="col-12 pt-5 pb-5 ">
                {this.renderPagination()}
                </div>
                </div>
				</div>
			</div>
 
							</div>
		
						</div>
					</div>
				</div>
				<Addopinion onAdd={this.opinionAdding} playerdata={this.state.playerdata} />
        {this.state.showconfirm && <Confirm onCancel={this.opinionCancelDeleting} onConfirm={this.opinionDeleting}/>}
				</div>
		)
	}
}

export default Playerdetails	