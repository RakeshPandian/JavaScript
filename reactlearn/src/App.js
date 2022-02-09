import logo from './logo.svg';
import './App.css';
import Navigation from "./component/Navigation";
import Cola from "./component/Cola";
import Users from './component/Users';
import {Route, Routes} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <div className="App">
    <Navigation></Navigation>
        <div>
      <Routes>
      <Route exact path="/users" element={<Users></Users>}></Route>
      <Route exact path="/snack" element={<Cola colaName="ZIlabei"></Cola>}></Route> 
      <Route exact path="/colas" element={<Cola colaName="Bovonto"/>}></Route>  
        
        {/* <Route exact path="/milk" render={() => <MilkPorduct milkName="aavin"></MilkPorduct>}></Route> */}
      </Routes>
    </div>
    </div>
  );
}

export default App;
