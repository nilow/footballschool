import React, { Component } from 'react';
import Newssingle from './Newssingle';
import Addnews from './Add/Addnews';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Confirm from './Confirm';

class News extends Component{

  	constructor() {
        super();
        this.state ={
    	news: [],
    	roleslist: [],
      offset: 0,
      perPage: 10,
      pageCount: 1,
      showconfirm: false,
      idToDelete:0

  	}
  	this._mounted = false;
  	this.newsDeleting = this.newsDeleting.bind(this);
    this.newsConfirmDeleting = this.newsConfirmDeleting.bind(this);
    this.newsCancelDeleting = this.newsCancelDeleting.bind(this);
  	this.newsAdding = this.newsAdding.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  	
    }

listAllRoles(){
  const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/roles/index'+ '?token=' + token)
      .then(res => {
        const roles= res.data.roles;
        if(this._mounted){
       this.setState({ roleslist: roles });
   }
        
      })
  }

  componentDidMount() {
  	 this._mounted = true;
  	 this.listAllRoles();
     this.listAll();
  }

  componentWillUnmount(){
    this._mounted = false;

}

  listAll(){
    //console.log('idzie!!!!!')
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/usernews/index/' + this.state.offset + '/' + this.state.perPage+ '?token=' + token)
      .then(res => {
        const news= res.data.news;
         const total = res.data.total;
         if(this._mounted){
        this.setState({ news , pageCount:Math.ceil(total / this.state.perPage)});
    }
      })
  }

  newsAdding(newTitle, newDate, newShort, newContent, newGroupsId){
  	//alert(newName);
    const token = localStorage.getItem('token');
  	axios.post('http://backdziennik.nilow13.usermd.net/api/news'+ '?token=' + token,{title: newTitle, date: newDate, short_content: newShort, content: newContent, groupsid: newGroupsId})
      .then(res => {
        const news= res.data.news;
        this.listAll();
        
      });

  }

  handlePageClick(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage);
   
  this.setState({offset: offset},()=>{this.listAll()});

}

 newsDeleting(){
  	//alert(teamId);
    const newsId = this.state.idToDelete;
     const token = localStorage.getItem('token');
       axios.delete('http://backdziennik.nilow13.usermd.net/api/news/' + newsId + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
    
  	const position = this.state.news.findIndex((element) => {
            return element.id == newsId;
    });
    this.state.news.splice(position, 1);
    const news= this.state.news;
    this.setState({ news: news,  showconfirm: false, idToDelete: 0});
  }

  newsConfirmDeleting(newsId){
    //alert(newsId + "55555");
    this.setState({showconfirm: true, idToDelete: newsId});
  }

  newsCancelDeleting(){
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
								<h3 className="pr-2">Aktualności</h3>
								<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Dodaj nową aktualność</button>
								</div>
								<div className="row border border-left-0 border-right-0 border-top-0">
								<div className="col-10">
									<div className="row">
										<div className="col-3"><strong>Tytuł</strong></div>
										<div className="col-3"><strong>Wprowadzony przez</strong></div>
										<div className="col-3"><strong>Data </strong></div>
										<div className="col-3"><strong>Widoczny dla grup</strong></div>
									</div>
								</div>
								<div className="col-2 p-3">&nbsp;</div>
								</div>
								{this.state.news.map((news)=><Newssingle key={news.id} news={news} grouplist={this.state.roleslist} onConfirm={this.newsConfirmDeleting} />)}
								<div className="row">
                <div className="col-12 pt-5 pb-5 ">
                 {this.renderPagination()}
                </div>
                </div>
							</div>
						</div>
					</div>
				</div>
				<Addnews onAdd={this.newsAdding} roleslist={this.state.roleslist}/>
        {this.state.showconfirm && <Confirm onCancel={this.newsCancelDeleting} onConfirm={this.newsDeleting}/>}
			</div>
		);
	}
}
export default News
