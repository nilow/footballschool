import React, { Component } from 'react';
import Training from './Training';
import axios from 'axios';
import ReactPaginate from 'react-paginate';



class Trainingsnotadmin extends Component{
constructor() {
        super();
        this.state ={
    	trainings: [],
    	teamslist:[],
      
      offset: 0,
      perPage: 20,
      pageCount: 1
  	}
    this.handlePageClick = this.handlePageClick.bind(this);
	this._mounted = false;
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
  	axios.get('http://backdziennik.nilow13.usermd.net/api/usertrainings/' + this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const trainings= res.data.trainings;
        const total = res.data.total;
        if(this._mounted){
        this.setState({ trainings: trainings, pageCount:Math.ceil(total / this.state.perPage) });
    }
        //console.log(this.state);
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
								<h3 className="pr-2">Treningi</h3>
								
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
								{this.state.trainings.map((training)=><Training key={training.id} training={training} onDel={this.trainingDeleting} teamslist={this.state.teamslist} user_role={this.props.user_role} />)}
								
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
export default Trainingsnotadmin