import React, { Component } from 'react';
import Team from './Team';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Teams extends Component{

  	constructor(props) {
        super(props);
        this.state ={
    	teams: [],
      offset: 0,
      perPage: 5,
      pageCount: 1
  	}

    this._mounted = false;
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
  	axios.get('http://backdziennik.nilow13.usermd.net/api/userteams/index/'+ this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const teams= res.data.teams;
        const total = res.data.total;
        if(this._mounted){
        this.setState({ teams, pageCount:Math.ceil(total / this.state.perPage) });
      }
      })
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
								
								</div>
								<div className="row border border-left-0 border-right-0 border-top-0">
								<div className="col-10">
									<strong>Nazwa drużyny</strong>
								</div>
								<div className="col-2 p-3">&nbsp;</div>
								</div>
								{this.state.teams.map((team)=><Team key={team.id} team={team} onDel={this.teamDeleting} user_role={this.props.user_role} />)}
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
		);
	}
}
export default Teams
