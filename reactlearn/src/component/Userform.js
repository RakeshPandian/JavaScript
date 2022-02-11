import React, { Component } from 'react';
import axios from "axios";

class Userform extends Component{
    constructor(props){
    super(props);
    this.state = {  
      SelectedUser: null,  
      FirstName: "",
      LastName: "",
      Country: "",
      State: "",
      City: "",
      Addres: "",
      Email: "",
      Phone: ""
    };
    this.handleSubmit = this.handleSave.bind(this);
    this.handleChange = this.handleFormChange.bind(this);
    console.log("This is Users");
}

static defaultProps = {
   UserID: 0
}

componentDidMount() {
    console.log("ComponentUsers");
    var searchURL = `http://host.docker.internal:49153/api/Users/`+this.props.UserID;
    axios.get(searchURL,{
        headers: {
          'Content-Type': 'application/json'
       } 
      })
      .then(res => {
        const user= res.data;
        this.setState(st=> {return {
            SelectedUser: user
        }; });
        console.log(user);
      })
  }

handleFormChange(evt){
    this.setState(st=>{ return {
      [evt.target.name]: evt.target.value}
    });
  };

handleSave(evt){
    evt.preventDefault();
    var searchURL = `http://host.docker.internal:49153/api/Users/`+this.props.UserID;
    axios.get(searchURL,{
      headers: {
        'Content-Type': 'application/json'
     } 
    })
    .then(res => {
      const userslist = res.data;
    //   this.setState(st=> {return {persons: userslist}; 
    //   });
      console.log(userslist);
    })
  }

render(){
    return(
        <div className="container-fluid">
         <form onSubmit={this.handleSubmit}>

          <div class="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor='firstname'>First name</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='firstname' name='FirstName' value={this.state.FirstName} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div class="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor='lastname'>Last name</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='lastname' name='LastName' value={this.state.LastName} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div class="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor='email'>Email</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='email' name='Email' value={this.state.Email} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div class="mb-3 row">
            <label className="col-sm-2 col-form-label" htmlFor='phone'>Phone</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='phone' name='Phone' value={this.state.Phone} 
               onChange={this.handleChange} />
            </div>
          </div>
          <button>Save</button>
        </form>
        </div>
    );
}
}

export default Userform;