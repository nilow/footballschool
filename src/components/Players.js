import React, { Component } from 'react';
import Player from './Player';
import Addplayer from './Add/Addplayer';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Confirm from './Confirm';

class Players extends Component{

  	constructor(props) {
      super(props);
      this.state ={
    	players: [],
    	teamslist:[],
      offset: 0,
      perPage: 10,
      pageCount: 1,
      searchtext:'',
      showconfirm: false,
      idToDelete:0
  	}
  	this.playerDeleting = this.playerDeleting.bind(this);
    this.playerConfirmDeleting = this.playerConfirmDeleting.bind(this);
    this.playerCancelDeleting = this.playerCancelDeleting.bind(this);
    this.playerSearch = this.playerSearch.bind(this);
  	this.playerAdding = this.playerAdding.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
     this.handlePageClick = this.handlePageClick.bind(this);
  	this.listAllTeams();
     console.log(props.roles);
    }

  listAllTeams(){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/teams/select'+ '?token=' + token)
      .then(res => {
        const teams= res.data.teams;
        
       this.setState({ teamslist: teams});
        
      })
  }

  componentDidMount() {
      if(typeof this.props.match !== 'undefined'){
       
        this.listAllTeamPlayers();
      }
      else{
       
       this.listAll();

      }
    }


  listAll(){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/players/index/'+ this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const players= res.data.players;
         const total = res.data.total;
        this.setState({ players: players, pageCount:Math.ceil(total / this.state.perPage)  });
        //console.log(this.state);
      })
  }



  listSearch(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/players/search/'+ this.state.searchtext + '/' + this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const players= res.data.players;
         const total = res.data.total;
        this.setState({ players: players, offset:0, pageCount:Math.ceil(total / this.state.perPage)  });
        //console.log(this.state);
      })
  }

  listAllTeamPlayers(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/players/team/' + this.props.match.params.id + '/' + this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const players= res.data.players;
        const total = res.data.total;
        this.setState({ players: players, pageCount:Math.ceil(total / this.state.perPage) });
        //console.log(this.state);
      })
  }

 playerSearch(){
    //console.log(this.state.searchtext)
    this.listSearch();
  }

  handleChangeSearch(e) {
    this.setState({searchtext: e.target.value});
}

  playerAdding(newName, newSurname, newBirth, newTeamsId, newPhoto){
  	//alert(newTeamId);
    const token = localStorage.getItem('token');
  	axios.post('http://backdziennik.nilow13.usermd.net/api/player'+ '?token=' + token,{name: newName, surname: newSurname, birth: newBirth, teamsid: newTeamsId, photo: newPhoto}) 
      .then(res => {
        const player= res.data.player;
        this.listAll();
        
      });

  }

  playerDeleting(){
  	//alert(teamId);
    const playerId = this.state.idToDelete;
    const token = localStorage.getItem('token');
       axios.delete('http://backdziennik.nilow13.usermd.net/api/player/' + playerId + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });

  	const position = this.state.players.findIndex((element) => {
            return element.id == playerId;
    });
    this.state.players.splice(position, 1);
    const players= this.state.players;
    this.setState({ players: players, showconfirm: false, idToDelete: 0 });
  }

  playerConfirmDeleting(playerId){
    //alert(newsId + "55555");
    this.setState({showconfirm: true, idToDelete: playerId});
  }

  playerCancelDeleting(){
    this.setState({showconfirm: false, idToDelete: 0});
  }

  handlePageClick(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage);
   if(typeof this.props.match !== 'undefined'){
    this.setState({offset: offset},()=>{this.listAllTeamPlayers()});
   }
   else{
  this.setState({offset: offset},()=>{this.listAll()});
}
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
             {this.props.user_role ==='Administratorzy' || this.props.user_role ==='Koordynatorzy'?
								(<div className="d-flex mb-4 mt-4">
								<h3 className="pr-2">Piłkarze</h3>
								<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Dodaj nowego zawodnika</button><input type="text" className="form-control" onChange={this.handleChangeSearch}/><button type="button" className="btn btn-primary" onClick={this.playerSearch}>Szukaj</button>
                
               
								</div>) : (<div className="d-flex mb-4 mt-4">
                <h3 className="pr-2">Piłkarze</h3>
                
                </div>)
              }
								<div className="row border border-left-0 border-right-0 border-top-0">
								<div className="col-10">
									<div className="row">
										<div className="col-3"><strong>Imię</strong></div>
										<div className="col-3"><strong>Nazwisko</strong></div>
										<div className="col-3"><strong>Data urodzenia</strong></div>
										<div className="col-3"><strong>Drużyna</strong></div>
									</div>
								</div>
								<div className="col-2">&nbsp;</div>
								</div>
								{this.state.players.map((player)=><Player key={player.id} player={player} teamslist={this.state.teamslist} user_role={this.props.user_role} onConfirm={this.playerConfirmDeleting} />)}
								<div className="row">
                <div className="col-12 pt-5 pb-5 ">
                {this.renderPagination()}
                </div>
                </div>
								
							</div>
						</div>
					</div>
				</div>
				<Addplayer onAdd={this.playerAdding} teamslist={this.state.teamslist}/>
         {this.state.showconfirm && <Confirm onCancel={this.playerCancelDeleting} onConfirm={this.playerDeleting}/>}
			</div>
		);
	}
}
export default Players
