import React, { Component } from 'react';
import axios from "axios";

class Userform extends Component{
    constructor(props){
    super(props);
    this.state = {   
      ID: "0",
      FirstName: "",
      LastName: "",
      Country: "",
      State: "",
      City: "",
      Address: "",
      Email: "",
      Phone: ""
    };
    this.handleSubmit = this.handleSave.bind(this);
    this.handleChange = this.handleFormChange.bind(this);
    this.handleCancelClick = this.handleCancel.bind(this);
    console.log("This is Users");
}

static defaultProps = {
   UserID: 0
}

updateUserData(user){
  this.setState(st=> {return {
    ID : user.id,
    FirstName: user.firstName,
    LastName : user.lastName,
    Email : user.email,
    Phone : user.phone,
    Country: user.country,
    State : user.state,
    City : user.city,
    Address : user.address,
    password:"" 
  }; });
}

componentDidMount() {
    console.log("ComponentUsers");
    if(this.props.UserID !="0"){
    var searchURL = this.props.UsersApiURL+`/`+this.props.UserID;
    axios.get(searchURL,{
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
       } 
      })
      .then(res => {
        const user= res.data;
        this.updateUserData(user);
        console.log(user);
      })
    }
  }

handleCancel(){
  console.log("Cancel Click");
  this.props.formSubmitClick();
}

handleFormChange(evt){
    this.setState(st=>{ return {
      [evt.target.name]: evt.target.value}
    });
  };

handleSave(evt){
    evt.preventDefault();

    const user = { 
      firstName:this.state.FirstName,
      lastName: this.state.LastName,
      country: this.state.Country,
      state: this.state.State,
      city: this.state.City,
      address: this.state.Address,
      email: this.state.Email,
      phone: this.state.Phone,
      password:"" 
    };
if(this.props.UserID === "0"){
    axios.post(this.props.UsersApiURL+"/",user,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
     } 
    })
    .then(res => {
      const saveresult = res.data;
      this.updateUserData(saveresult);
      console.log("SaveResult", saveresult);
      this.props.formSubmitClick();
    })
    .catch(err=>{
      console.log(err.Error);
    })
  }

else{
  const user = { 
    id: this.props.UserID,
    firstName:this.state.FirstName,
    lastName: this.state.LastName,
    country: this.state.Country,
    state: this.state.State,
    city: this.state.City,
    address: this.state.Address,
    email: this.state.Email,
    phone: this.state.Phone,
    password:"" 
  };
  axios.put(this.props.UsersApiURL+"/"+this.props.UserID,user,{
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
   } 
  })
  .then(res => {
    const saveresult = res.data;
    this.updateUserData(saveresult);
    console.log("UpdateResult", saveresult);
    this.props.formSubmitClick();
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data.errors);
     // console.log(error.response.status);
      //console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
});
}
}


render(){
    return(
        <div className="container-fluid m-2">
         <form onSubmit={this.handleSubmit}>

          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='firstname'>First name</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='firstname' name='FirstName' value={this.state.FirstName} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='lastname'>Last name</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='lastname' name='LastName' value={this.state.LastName} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='email'>Email</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='email' name='Email' value={this.state.Email} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='phone'>Phone</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='phone' name='Phone' value={this.state.Phone} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='address'>Address</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='address' name='Address' value={this.state.Address} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='country'>Country</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='country' name='Country' value={this.state.Country} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='state'>State</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='state' name='State' value={this.state.State} 
               onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-sm-2 col-form-label" htmlFor='city'>City</label>
            <div className="col-sm-10">
              <input type='text' className="form-control" id='city' name='City' value={this.state.City} 
               onChange={this.handleChange} />
            </div>
          </div>
          <button className="btn btn-secondary m-2">Save</button>
          <button className="btn btn-secondary m-2" onClick={this.handleCancelClick}>Cancel</button>
        </form>
        </div>
    );
}
}

export default Userform;