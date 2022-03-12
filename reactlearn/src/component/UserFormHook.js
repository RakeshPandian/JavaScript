import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../contexts/ThemeContexts";

function UserFormHook(props) {
  // call useState, "reserve piece of state"
  const [FirstName, setFirstName] = useState(props.User.firstName);
  const [LastName, setLastName] = useState(props.User.lastName);
  const [Email, setEmail] = useState(props.User.email);
  const [Phone, setPhone] = useState(props.User.phone); 
  const [Address, setAddress] = useState(props.User.address);
  const [Country, setCountry] = useState(props.User.country);
  const [State, setState] = useState(props.User.state);
  const [City, setCity] = useState(props.User.city);

  var {language, changeLanguage} = useContext(LanguageContext);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = FirstName;
  },[]);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = language + " " + LastName;
  });

  function handleChange(e) {
    switch(e.target.name) {
      case "FirstName":
        setFirstName(e.target.value);
        changeLanguage("English");
        break;
      case "LastName":
        setLastName(e.target.value);
        break;
      case "City":
          setCity(e.target.value);
          break;
      case "Email":
          setEmail(e.target.value);
          break;
      case "Phone":
          setPhone(e.target.value);
          break;
      case "Address":
          setAddress(e.target.value);
          break;
      case "Country":
          setCountry(e.target.value);
          break;
      case "State":
          setState(e.target.value);
          break;
      default:
        // code block
    }
  }

  const handleCancel= evt =>{
    evt.preventDefault();
    console.log("Cancel Click");
    props.formSubmitClick();
  }

  const handleSubmit = e =>{
    e.preventDefault();
    const user = { 
      firstName:FirstName,
      lastName: LastName,
      country: Country,
      state: State,
      city: City,
      address: Address,
      email: Email,
      phone: Phone,
      password:"" 
    };
if(props.UserID === "0"){
    axios.post(props.UsersApiURL+"/",user,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
     } 
    })
    .then(res => {
      const saveresult = res.data;
     // this.updateUserData(saveresult);
      console.log("SaveResult", saveresult);
      props.formSubmitClick();
    })
    .catch(err=>{
      console.log(err.Error);
      err.Error.LastName.map(er => 
        console.log(er)
      )
      err.Error.FirstName.map(er => 
        console.log(er)
      )
    })
  }

else{
  const user = { 
    id: props.UserID,
    firstName:FirstName,
    lastName: LastName,
    country: Country,
    state: State,
    city: City,
    address: Address,
    email: Email,
    phone: Phone,
    password:"" 
  };
  axios.put(props.UsersApiURL+"/"+props.UserID,user,{
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
   } 
  })
  .then(function (res) {
    const saveresult = res.data;
    //this.updateUserData(saveresult);
    console.log("UpdateResult", saveresult);
    props.formSubmitClick();
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      var responseError = error.response.data.errors;
      //console.log(responseError);
      
      // responseError.LastName.map(er => 
      //   console.log(er)
      // )
      // responseError.FirstName.map(er => 
      //   console.log(er)
      // )
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

  // return piece of state AND a function to toggle it
  return ( <div className="container-fluid m-2">
  <form onSubmit={handleSubmit}>
  <div className="panel panel-default">
   {/* <FormErrors formErrors={formErrors} /> */}
 </div>
   <div className="mb-2 row form-group">
     <label className="col-sm-2 col-form-label" htmlFor='firstname'>First name</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='firstname' name='FirstName' value={FirstName} 
        onChange={handleChange} />
     </div>
   </div>
   <div className="mb-2 row form-group" >
     <label className="col-sm-2 col-form-label" htmlFor='lastname'>Last name</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='lastname' name='LastName' value={LastName} 
        onChange={handleChange} />
     </div>
   </div>
   <div className="mb-2 row">
     <label className="col-sm-2 col-form-label" htmlFor='email'>Email</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='email' name='Email' value={Email} 
        onChange={handleChange} />
     </div>
   </div>
   <div className="mb-2 row">
     <label className="col-sm-2 col-form-label" htmlFor='phone'>Phone</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='phone' name='Phone' value={Phone} 
        onChange={handleChange} />
     </div>
   </div>
   <div className="mb-2 row">
     <label className="col-sm-2 col-form-label" htmlFor='address'>Address</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='address' name='Address' value={Address} 
        onChange={handleChange} />
     </div>
   </div>
   <div className="mb-2 row">
     <label className="col-sm-2 col-form-label" htmlFor='country'>Country</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='country' name='Country' value={Country} 
        onChange={handleChange} />
     </div>
   </div>
   <div className="mb-2 row">
     <label className="col-sm-2 col-form-label" htmlFor='state'>State</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='state' name='State' value={State} 
        onChange={handleChange} />
     </div>
   </div>
   <div className="mb-2 row">
     <label className="col-sm-2 col-form-label" htmlFor='city'>City</label>
     <div className="col-sm-10">
       <input type='text' className="form-control" id='city' name='City' value={City} 
        onChange={handleChange} />
     </div>
   </div>
   <button className="btn btn-secondary m-2" >Save</button>
   <button className="btn btn-secondary m-2" onClick={handleCancel} >Cancel</button>
 </form>
 </div>
);
}
export default UserFormHook;