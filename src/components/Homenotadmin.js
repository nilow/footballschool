import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Addevent from './Add/Addevent';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';


class Homenotadmin extends Component{
constructor() {
        super();
        const minTime = new Date();
    	minTime.setHours(7,0,0);
    	const maxTime = new Date();
    	maxTime.setHours(21,0,0);
    	const messages = {
		  allDay: 'Cały dzień',
		  previous: 'Poprzedni',
		  next: 'Następny',
		  today: 'Dziś',
		  month: 'Miesiąc',
		  week: 'Tydzień',
		  day: 'Dzień',
		  agenda: 'Agenda',
		  date: 'Data',
		  time: 'Godzina',
		  event: 'Wydarzenie', // Or anything you want
		  showMore: total => `+ ${total} zobacz więcej`
	}

        this.state ={
    	news: [],
      teamslist:[],
      trainerslist:[],
      startpl:'',
      endpl:'',
      start:'',
      end:'',
 		  minTime: minTime,
      maxTime: maxTime,
      messages: messages,
    	localizer : BigCalendar.momentLocalizer(moment) ,
    	culture: 'pl',
    	allViews : Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]),
    	eventsList:[],
      showAddevent : false,
       offset: 0,
      perPage: 5,
      pageCount: 1
  		}
      this._mounted = false;
  		this.handleSelect = this.handleSelect.bind(this);
  		this.onSelectEvent = this.onSelectEvent.bind(this);
      this.modalClosing = this.modalClosing.bind(this);
      this.eventAdding = this.eventAdding.bind(this);
      this.handlePageClick = this.handlePageClick.bind(this);

      
    }



  componentDidMount() {
     this._mounted = true;
     this.listUserNews();
     this.listTrainings();
  }


componentWillUnmount(){
   this._mounted = false;

}
  listUserNews(){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/usergroupnews/index/' + this.state.offset + '/' + this.state.perPage + '?token='+ token)
      .then(res => {
        const news= res.data.news;
        const total = res.data.total;
        if(this._mounted){
        this.setState({ news, pageCount:Math.ceil(total / this.state.perPage) });
      }
      })
  }

  listTrainings(){
    const token = localStorage.getItem('token');
  	axios.get('http://backdziennik.nilow13.usermd.net/api/trainings/calendar' + '?token='+ token)
      .then(res => {
        const trainings= res.data.trainings;
        //console.log(trainings);
        for (let i = 0; i < trainings.length; i++){
        	let startparts = trainings[i].start.split(' ');
        	let startparts1 = startparts[0].split('-');
        	let startparts2 = startparts[1].split(':');
        	let endparts = trainings[i].end.split(' ');
        	let endparts1 = endparts[0].split('-');
        	let endparts2 = endparts[1].split(':');
        	trainings[i].start = new Date(startparts1[0], startparts1[1]-1, startparts1[2],startparts2[0], startparts2[1], startparts2[2], 0);
        	trainings[i].end = new Date(endparts1[0], endparts1[1]-1, endparts1[2],endparts2[0], endparts2[1], endparts2[2], 0);
        }
         //console.log(trainings);
if(this._mounted){
        this.setState({ eventsList: trainings });
      }

      })
  }

  modalClosing(){
    this.setState({
    showAddevent:false
   })
  }

handleSelect ({ start, end }){
  var utcstart = moment.tz(start,'UTC');
    var plstart = moment.tz(utcstart.format(), 'Europe/Warsaw').format();
    var utcend = moment.tz(end,'UTC');
    var plend = moment.tz(utcend.format(), 'Europe/Warsaw').format();
   this.setState({
    showAddevent: true,
    startpl: plstart,
    endpl: plend,
    start: start,
    end: end,
   })
    /*const title = window.prompt('Nazwa treningu/wydarzenia')
    if (title){
      this.setState({
        eventsList: [
          ...this.state.eventsList,
          {
            start,
            end,
            title,
          },
        ],
      });
      var utcstart = moment.tz(start,'UTC');
	  var plstart = moment.tz(utcstart.format(), 'Europe/Warsaw').format();
	  var utcend = moment.tz(end,'UTC');
	  var plend = moment.tz(utcend.format(), 'Europe/Warsaw').format();

     axios.post('http://backdziennik.nilow13.usermd.net/api/training', {name: title, date_from: plstart, date_to: plend}) 
      .then(res => {
         const training= res.data.training;

      }) 
  	}*/
  }

 onSelectEvent(event) {
   const r = window.confirm("Czy chcesz usunąć ten element?")
   const token = localStorage.getItem('token');
   if(r === true){
     
     this.setState((prevState, props) => {
       const events = [...prevState.eventsList];
       const idx = events.indexOf(event);
       events.splice(idx, 1);
       return { eventsList: events };
     });
       axios.delete('http://backdziennik.nilow13.usermd.net/api/training/'+ event.id + '?token='+ token, ) 
      .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
   }
 }



 eventStyleGetter(event, start, end, isSelected) {
    console.log(event);
    var backgroundColor = event.color
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        border: '0px',
    };
    return {
        style: style
    };
}

eventAdding(newTitle, newTeamsId, newTrainersId, newStart, newEnd){
    const token = localStorage.getItem('token');
    axios.post('http://backdziennik.nilow13.usermd.net/api/training' + '?token='+ token, {name: newTitle, date_from: this.state.startpl, date_to: this.state.endpl, teamsid: newTeamsId, trainersid: newTrainersId}) 
      .then(res => {
         const training= res.data.training;
      this.listTrainings();

      }) 

  }

  handlePageClick(data){
  let selected = data.selected;
  let offset = Math.ceil(selected * this.state.perPage);
   
  this.setState({offset: offset},()=>{this.listUserNews()});

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
		const dates={
      addstartpl:this.state.startpl,
      addendpl:this.state.endpl,
      addstart:this.state.start,
      addend:this.state.end,
    }
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-10 offset-md-1">
						<div className="row">
							<div className="col-12">
								
							 

                <ul id="tabsJustified" className="nav nav-tabs mt-5">
                	<li className="nav-item"><a href="" data-target="#calendar" data-toggle="tab" className="nav-link small text-uppercase  active">Kalendarz treningów</a></li>
                    <li className="nav-item"><a href="" data-target="#news" data-toggle="tab" className="nav-link small text-uppercase">Aktualności</a></li>
                    
                </ul>
                <br />
                <div id="tabsJustifiedContent" className="tab-content mb-5">
                    <div id="news" className="tab-pane fade">
                      {this.state.news.map((news)=><div key={news.id}><div className="tiny">{news.date}</div><div><p>{news.title}</p></div><div>{news.short_content}</div><Link to={'/newsmore/'+ news.id }>więcej</Link><hr/></div>)}
                        <div className="row">
                <div className="col-12 pt-5 pb-5 ">
                 {this.renderPagination()}
                </div>
                </div>
                    </div>
                   
                    <div id="calendar" className="tab-pane fade active show">
                       <div style={{height:'650px'}}>
                       {this.props.user_role == 'Koordynatorzy' ?
							 (<BigCalendar
							  selectable
							  defaultView={BigCalendar.Views.MONTH}
							 localizer={this.state.localizer}
							 culture={this.state.culture}
							 events={this.state.eventsList} 
							 onSelectSlot={this.handleSelect} 
							  onSelectEvent={this.onSelectEvent}  
							  messages={this.state.messages}
							  min={this.state.minTime}
							  eventPropGetter={(this.eventStyleGetter)}

    />):(<BigCalendar
                localizer={this.state.localizer}
               events={this.state.eventsList} 
                culture={this.state.culture}
                defaultView={BigCalendar.Views.MONTH}
              eventPropGetter={(this.eventStyleGetter)}
              messages={this.state.messages}

    />)}
    				</div>
				</div>
			</div>
 
							</div>
		
						</div>
					</div>
				</div>
       {this.state.showAddevent &&
        <Addevent onClose={this.modalClosing} dates={dates} onAdd={this.eventAdding} teamslist={this.state.teamslist} />
      }
          
         
        
			</div>
		);
	}
}
export default Homenotadmin