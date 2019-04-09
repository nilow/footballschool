import React, { Component } from 'react';
import axios from 'axios';
class Newsmore extends Component{
	constructor() {
        super();
        this.state ={
    	news: [],
  		}

    }

  componentDidMount() {
     this.listAll();
  }

  listAll(){
  	const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/news/' + this.props.match.params.id+ '?token=' + token)
      .then(res => {
        const news= res.data.news;
        this.setState({ news });
        console.log(news)
      })
  }
	render(){
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-10 offset-md-1">
						<div className="mb-4 mt-4">
							<h3 className="pr-2 text-center">{this.state.news.title}</h3>
						</div>
						<div className="text-center">{this.state.news.date}</div>
						<div className="mb-4 mt-4" dangerouslySetInnerHTML={{ __html: this.state.news.content}}></div>
						
						
					</div>
				</div>
			</div>
		);
	}
}
export default Newsmore
