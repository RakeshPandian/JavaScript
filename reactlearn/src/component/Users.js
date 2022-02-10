import React, { Component } from 'react';
import axios from "axios";

class Users extends Component{
    constructor(props){
    super(props);
    this.state = {
      persons: [],
      searchText: ""
    };
    this.handleSearchClick = this.searchClick.bind(this);
    console.log("This is Users");
}

componentDidMount() {
  console.log("ComponentUsers");
  // axios.get(`https://jsonplaceholder.typicode.com/users`,{
  //    headers: {
  //      'Content-Type': 'application/json'
  // } 
  // })
  axios.get(`http://host.docker.internal:49154/api/Users`,{
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

handleTextChange = (e) => {
  console.log("searchText");
  this.state.searchText = this.state.searchText + e.target.value;
};

searchClick(){
  var searchURL = `http://host.docker.internal:49154/api/Users/`+"rak";
  console.log("Search URL", searchURL);
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
      <input type="text" className="form-control m-2" placeholder="Search by Name"  value={this.state.searchText}
          onChange={this.handleTextChange} />
      <button type="button" className="btn btn-secondary m-2" onClick={this.handleSearchClick}>Search</button>
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