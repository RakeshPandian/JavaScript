import React, { Component } from 'react';
import axios from "axios";

class Users extends Component{
    constructor(props){
    super(props);
    this.state = {
      persons: [],
      searchText: ""
    };
    this.handleSearchSubmit = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchType.bind(this);
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


render(){
    return(
      <div className="container-fluid">
      <div className='d-inline-flex flex-row'>
      <form onSubmit={this.handleSearchSubmit} className='d-flex flex-row'>
          <input  className="form-control m-2" placeholder="Search by Name"  id='search'
          name='searchText'  value={this.state.searchText} onChange={this.handleSearchChange} />
          <button className="btn btn-secondary m-2" >Search</button>
      </form>
      <button type="button" className="btn btn-secondary m-2">AddNew</button>
      </div>
        <div>
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
           {
          this.state.persons
            .map(person =>
          <tr key={person.id.toString()}>
          <td> {person.firstName + " " + person.lastName}  </td>
          <td> {person.country} </td>
          <td> {person.state} </td>
          <td> {person.city} </td>
          <td>  <button className="btn btn-secondary m-2" >Edit</button> </td>
          <td>  <button className="btn btn-secondary m-2" >Delete</button> </td>
          </tr>
            )
        }
      </tbody>
    </table>         
    </div>
    </div>
    );
}
}

export default Users;