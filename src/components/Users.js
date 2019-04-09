import React, { Component } from 'react';
import User from './User';
import Adduser from './Add/Adduser';
import axios from 'axios';
import Confirm from './Confirm';
import ReactPaginate from 'react-paginate';

class Users extends Component{

  	constructor(props) {
        super(props);
        this.state ={
    	users: [],
    	roleslist: [],
      teamslist:[],
      playerslist:[],
    	rolename: '',
      showconfirm: false,
      idToDelete:0,
      offset: 0,
      perPage: 5,
      pageCount: 1,
  	}
  	this.userDeleting = this.userDeleting.bind(this);
  	this.userAdding = this.userAdding.bind(this);
    this.userConfirmDeleting = this.userConfirmDeleting.bind(this);
    this.userCancelDeleting = this.userCancelDeleting.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  	this.listAllRoles();
    this.listAllTeams();
    this.listAllPlayers();
     console.log(props.roles);
    }

    listAllRoles(){
      const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/roles/index'+ '?token=' + token)
      .then(res => {
        const roles= res.data.roles;
       this.setState({ roleslist: roles });
        
      })
  }

  listAllTeams(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/teams/select'+ '?token=' + token)
      .then(res => {
        const teams= res.data.teams;
       this.setState({ teamslist: teams});
        
      })
  }

  listAllPlayers(){
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/players/select'+ '?token=' + token)
      .then(res => {
        const players= res.data.players;
       this.setState({ playerslist: players});
        
      })
  }

  componentDidMount() {
     this.listAll(this.props.match.params.id);
  }

  
  componentWillReceiveProps(nextProps) {

    if (nextProps.match.params.id !== this.props.match.params.id) {
    const id = nextProps.match.params.id;
    const token = localStorage.getItem('token');
    axios.get('http://backdziennik.nilow13.usermd.net/api/users/roleindex/' + id+ '/0/' + this.state.perPage + '?token=' + token)
      .then(res => {
        const users= res.data.users;
        const rolename= res.data.rolename;
        const total = res.data.total;
        this.setState({ users });
        this.setState({ rolename });
        this.setState({ pageCount:Math.ceil(total / this.state.perPage) });
        //console.log(users)
      })
    }
  }

  listAll(id){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/users/roleindex/' + id+ '/'+ this.state.offset + '/' + this.state.perPage + '?token=' + token)
      .then(res => {
        const users= res.data.users;
        const rolename= res.data.rolename;
        const total = res.data.total;
        this.setState({ users });
        this.setState({ rolename });
        this.setState({ pageCount:Math.ceil(total / this.state.perPage) });
        //console.log(users)
      })
  }

  userAdding(newName, newSurname, newEmail, newPass, newRolesId){
  	//alert(newTeamId);
    const token = localStorage.getItem('token');
  	axios.post('http://backdziennik.nilow13.usermd.net/api/user'+ '?token=' + token,{name: newName, surname: newSurname, email: newEmail, password: newPass, rolesid: newRolesId}) 
      .then(res => {
        const user= res.data.user;
         this.listAll(this.props.match.params.id);
        
      });

  }


  userDeleting(){
  	//alert(teamId);
    const userId = this.state.idToDelete;
    const token = localStorage.getItem('token');
       axios.delete('http://backdziennik.nilow13.usermd.net/api/user/' + userId + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
  	const position = this.state.users.findIndex((element) => {
            return element.id == userId;
    });
    this.state.users.splice(position, 1);
    const users= this.state.users;
    this.setState({ users: users, showconfirm: false, idToDelete: 0 });
  }

  userConfirmDeleting(userId){
    //alert(newsId + "55555");
    this.setState({showconfirm: true, idToDelete: userId});
  }

  userCancelDeleting(){
    this.setState({showconfirm: false, idToDelete: 0});
  }

handlePageClick(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage);
   
  this.setState({offset: offset},()=>{this.listAll(this.props.match.params.id)});

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
								<h3 className="pr-2">{this.state.rolename}</h3>
								<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Dodaj nowego użytkownika</button>
								</div>
								<div className="row border border-left-0 border-right-0 border-top-0">
								<div className="col-10">
									<div className="row">
										<div className="col-3"><strong>Imię</strong></div>
										<div className="col-3"><strong>Nazwisko</strong></div>
										<div className="col-3"><strong>Email</strong></div>
										<div className="col-3"><strong>Grupa</strong></div>
									</div>
								</div>
								<div className="col-2">&nbsp;</div>
								</div>
								{this.state.users.map((user)=><User key={user.id} user={user} onConfirm={this.userConfirmDeleting} roleslist={this.state.roleslist} teamslist={this.state.teamslist} playerslist={this.state.playerslist} />)}
								<div className="row">
                <div className="col-12 pt-5 pb-5 ">
                {this.renderPagination()}
                </div>
                </div>
							</div>
						</div>
					</div>
				</div>
				<Adduser onAdd={this.userAdding} roleslist={this.state.roleslist} />
         {this.state.showconfirm && <Confirm onCancel={this.userCancelDeleting} onConfirm={this.userDeleting}/>}
			</div>
		);
	}
}
export default Users
