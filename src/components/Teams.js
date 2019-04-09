import React, { Component } from 'react';
import Team from './Team';
import Addteam from './Add/Addteam';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Confirm from './Confirm';

class Teams extends Component{

  	constructor(props) {
        super(props);
        this.state ={
    	teams: [],
      offset: 0,
      perPage: 5,
      pageCount: 1,
      showconfirm: false,
      idToDelete:0
  	}
    this._mounted = false;
  	this.teamDeleting = this.teamDeleting.bind(this);
    this.teamConfirmDeleting = this.teamConfirmDeleting.bind(this);
    this.teamCancelDeleting = this.teamCancelDeleting.bind(this);
  	this.teamAdding = this.teamAdding.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    console.log(props.roles);
    }

  	componentDidMount() {
       this._mounted = true;
     this.listAll();
  }

  componentWillUnmount(){
    this._mounted = false;

}

  listAll(){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/teams/index/'+ this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const teams= res.data.teams;
        const total = res.data.total;
        if(this._mounted){
        this.setState({ teams, pageCount:Math.ceil(total / this.state.perPage) });
      }
      })
  }

  teamAdding(newName, newColor){
  	//alert(newName);
    const token = localStorage.getItem('token');
  	axios.post('http://backdziennik.nilow13.usermd.net/api/team'+ '?token=' + token,{name:newName, calendar_color: newColor})
      .then(res => {
        const team= res.data.team;
        this.listAll();
        
      });

  }

  teamDeleting(){
  	//alert(teamId);
    const teamId = this.state.idToDelete;
    const token = localStorage.getItem('token');
       axios.delete('http://backdziennik.nilow13.usermd.net/api/team/' + teamId + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
  	const position = this.state.teams.findIndex((element) => {
            return element.id == teamId;
    });
    this.state.teams.splice(position, 1);
    const teams= this.state.teams;
    this.setState({ teams: teams,  showconfirm: false, idToDelete: 0});
  }

  teamConfirmDeleting(teamId){
    //alert(newsId + "55555");
    this.setState({showconfirm: true, idToDelete: teamId});
  }

  teamCancelDeleting(){
    this.setState({showconfirm: false, idToDelete: 0});
  }

handlePageClick(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage);
   
  this.setState({offset: offset},()=>{this.listAll()});

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
								<h3 className="pr-2">Drużyny</h3>
								<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Dodaj nową drużynę</button>
								</div>
								<div className="row border border-left-0 border-right-0 border-top-0">
								<div className="col-10">
									<strong>Nazwa drużyny</strong>
								</div>
								<div className="col-2 p-3">&nbsp;</div>
								</div>
								{this.state.teams.map((team)=><Team key={team.id} team={team} onConfirm={this.teamConfirmDeleting} />)}
								<div className="row">
                <div className="col-12 pt-5 pb-5 ">
                {this.renderPagination()}
                </div>
                </div>
							</div>
						</div>
					</div>
				</div>
        <Addteam onAdd={this.teamAdding}/>
         {this.state.showconfirm && <Confirm onCancel={this.teamCancelDeleting} onConfirm={this.teamDeleting}/>}
			</div>
		);
	}
}
export default Teams
