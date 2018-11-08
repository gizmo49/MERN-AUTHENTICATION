import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from './Navbar';
import { error } from 'util';
const Logouturl = `http://localhost:3027/users/logout`;
const createurl = `http://localhost:3027/events/create`;



class Events extends Component {
  constructor(){
    super();
    this.state = {auth: "false", fullname: "", userid: "", allbyme: [], body: { title:"", venue:"", time:"",date:"", about:"" }};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }
  componentWillMount(){
    const accesstoken = Cookies.get('x-access-token');
    const url =  `http://localhost:3027/users/verify`;

    axios.post(url,{accesstoken})
        .then((res) => {
          //
          //console.log(res.data.id);
          this.setState({fullname: res.data.fullname, userid: res.data.id});
          console.log(this.state.userid);
           let compurl = `http://localhost:3027/events/allby/${this.state.userid}`
            axios.get(compurl).then((result) => {
              console.log(result.data);
              this.setState({
                allbyme: [...this.state.allbyme, result.data]
              }) 
              //return createTable();
           
            }).catch((error) => {
              console.log('Somrthing Went Wrong');
            })
              
        }).catch((err) => {
            console.log('something went wrong');
            this.props.history.push("/login");
        })
   
    }
    createTable(){
      let table = []
  
      let parentArray = this.state.allbyme;
     for(var i = 0; i < parentArray.length; i++){
        let children = []
        
        for(var j = 0; j < parentArray[i].length; j++){
          children.push(
          <div className="card">
            <div className="card-body">
            <h6 className="card-title">{parentArray[i][j].title}</h6>
            <p className="card-text">{parentArray[i][j].about}</p>
            <span>Date : {parentArray[i][j].date}</span>  <span>Time : {parentArray[i][j].time}</span>
            <br></br>
            <span>Venue : {parentArray[i][j].venue}</span>

            </div>
          </div>
          )
        }
        
        table.push(<div>{children}</div>)
      }
      return table
    }
    newEvents(){
      let table = []
  
      let parentArray = this.state.allbyme;
     for(var i = 0; i < parentArray.length; i++){
        let children = []
        
        table.push(
          <div className="card">
            <div className="card-body">
            <h6 className="card-title">{parentArray[i].title}</h6>
            <p className="card-text">{parentArray[i].about}</p>
            <span>Date : {parentArray[i].date}</span>  <span>Time : {parentArray[i].time}</span>
            <br></br>
            <span>Venue : {parentArray[i].venue}</span>

            </div>
         </div>
        )
          
        }
      return table
    }
    
    LoguserOut(e){
      axios.get(Logouturl)
      .then((res) => {
        Cookies.remove('x-access-token');
        console.log('deleting the users');
        this.setState({auth:false});
        this.props.history.push("/");
        this.forceUpdate();
      
      }).catch((err) => {
          //comsole.log('so')
            console.log('something went wrong');
         
      })
    }
    handleChange(event) {
     
      this.setState({ body: { ...this.state.body, [event.target.name]: event.target.value} });
     // console.log('handling updates');
     
 
      
       
    }
  
    handleSubmit(event) {
      event.preventDefault();
      //console.log('figuring tis out');
      //console.log(this.state);
      let headers = {
        'Content-Type': 'application/json',
        'x-access-token': Cookies.get('x-access-token')
    }
      let body = this.state.body;
      axios.post(createurl, { body }, {headers})
      .then(res => {
        
        this.setState({
          allbyme: [...this.state.allbyme, res.data]
        }) 
    
      
      }).catch((err) =>{
        console.log(`An error occured ${err}`);

      })
   }
        
  render() {
    return (
        <div className="container">
          <div>
          <Navbar updateauth={this.LoguserOut.bind(this)} authstatus={ this.state.auth }></Navbar>          
          </div>
          
       
              <div className="row">
              <div className="col-md-6">                 
                  <div>
                    <form  onSubmit={this.handleSubmit}> 
                    <h3 className="h3 mb-3 font-weight-normal text-center">Hello {this.state.fullname}</h3>
                    <h3 className="h3 mb-3 font-weight-normal">New Event</h3>
                    <label>Title</label>
                    <input  onChange={this.handleChange} type="text" id="title" name="title" className="form-control" placeholder="Event Theme"/>
                    <label>Date</label>
                    <input  onChange={this.handleChange} type="text" name="date"  className="form-control" placeholder="scheduled for"/>
                    <label>Time</label>
                    <input onChange={this.handleChange} type="text" name="time" className="form-control" placeholder="Event time"/>
                    <label>Venue</label>
                    <input onChange={this.handleChange} type="text" name="venue" className="form-control" placeholder="where will this event hold"/>
                    <label>About your Event</label>
                    <textarea onChange={this.handleChange} className="form-control" name="about" placeholder="tell us about your stuff"></textarea>


                    <button className="btn btn-lg btn-primary btn-block" type="submit">Create Event</button>

                    </form>
                </div>
             </div>
              <div className="col-md-6">
              <h3 className="h3 mb-3 font-weight-normal text-center">All Events</h3>
            
                   <div>
                    {this.createTable()}   
                   
                  </div>
            
              </div>
              </div>
        
           
         </div>
    
    );
  }
}


export default Events;
