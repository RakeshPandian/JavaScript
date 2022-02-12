import React, { Component } from 'react';
import axios from "axios";
import Userform from "./Userform";

class Users extends Component{
    constructor(props){
    super(props);
    this.state = {
      persons: [],
      searchText: "",
      updateUserId: "0",
      currentScreen: "USERS"
    };
    this.handleSearchSubmit = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchType.bind(this);
    this.handleEditClick = this.handleEdit.bind(this);
    this.handleDeleteClick = this.handleDelete.bind(this);
    this.handleAddNewClick = this.handleAddNew.bind(this);
    console.log("This is Users");
}

componentDidMount() {
  console.log("ComponentUsers");
  axios.get(`http://host.docker.internal:49153/api/Users`,{
      headers: {
        'Content-Type': 'application/json'
     } 
    })
    .then(res => {
      const userslist = res.data;
      this.setState(st=> {return {persons: userslist}; 
      });
      console.log(userslist);
    })
}

handleSearchType(evt){
  this.setState(st=>{ return {
    [evt.target.name]: evt.target.value}
  });
};

handleSearch(evt){
  evt.preventDefault();
  var searchURL = `http://host.docker.internal:49153/api/Users/`+this.state.searchText;
  axios.get(searchURL,{
    headers: {
      'Content-Type': 'application/json',
   } 
  })
  .then(res => {
    const userslist = res.data;
    this.setState(st=> {return {persons: userslist}; 
    });
    console.log(userslist);
  })
}

handleAddNew(){
  this.setState(st=>{ return {
    currentScreen: "EDIT",
    updateUserId : "0"}
  });
}
handleEdit(userID){
  this.setState(st=>{ return {
    currentScreen: "EDIT",
    updateUserId : userID}
  });
}

handleDelete(userID){
  this.setState(st=>{ return {
    currentScreen: "DELETE",
    updateUserId : userID }
  });
}

render(){
  let screen;
  if(this.state.currentScreen == "USERS"){
    screen = (
    <><div className='d-inline-flex flex-row'>
        <form onSubmit={this.handleSearchSubmit} className='d-flex flex-row'>
          <input className="form-control m-2" placeholder="Search by Name" id='search'
            name='searchText' value={this.state.searchText} onChange={this.handleSearchChange} />
          <button className="btn btn-secondary m-2">Search</button>
        </form>
        <button type="button" className="btn btn-secondary m-2" onClick={this.handleAddNewClick}>AddNew</button>
      </div><div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
                <th scope="col">State</th>
                <th scope="col">City</th>
              </tr>
            </thead>
            <tbody>
              {this.state.persons
                .map(person => <tr key={person.id.toString()}>
                  <td> {person.firstName + " " + person.lastName}  </td>
                  <td> {person.country} </td>
                  <td> {person.state} </td>
                  <td> {person.city} </td>
                  <td>  <button className="btn btn-secondary m-2" onClick={() =>this.handleEditClick(person.id.toString())}>Edit</button> </td>
                  <td>  <button className="btn btn-secondary m-2" onClick={() =>this.handleDeleteClick(person.id.toString())}>Delete</button> </td>
                </tr>
                )}
            </tbody>
          </table>
        </div></>
    );
  } else if(this.state.currentScreen == "EDIT"){
    screen = <Userform UserID = {this.state.updateUserId}></Userform>
  }
    return(
      <div className="container-fluid">
      {screen}
    </div>
    );
}
}

export default Users;