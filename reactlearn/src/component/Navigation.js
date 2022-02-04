import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navigation extends Component{
    render(){
        return(
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/snack/r">Users</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/snack">Roles</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/colas">Role Link</Link>
        </li>
      </ul>

     <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
         <Link className="nav-link" to="/">Login</Link>
        </li>
        </ul>
    </div>
    </div>
</nav>
        {/* <Link  to="/">Home</Link>
        <Link  to="/snack/r">Snack</Link>
        <Link  to="/snack">Milk</Link>
        <Link  to="/colas">Cola</Link> */}
     
            </div>
        )
    }
}

export default Navigation;

