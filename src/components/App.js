//import logo from './logo.svg';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './App.css';
import Meals from "./Meals";
import Home from "./Home";
import Drinks from "./Drinks";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import Footer from "./Footer";


function PathNotFound(props) {
  return (
    <div>
      <strong>Sorry ! Page not Found</strong>
    </div>
  );
}

function App() {
  return (
    <div className="App">

    <Router>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navard
          </a>

          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                
              <Link className="nav-link active" to="/"> Home </Link>
              
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/Meals"> Meals </Link>
                
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/Drinks"> Drinks </Link>  
            
              </li>
            </ul>
            <form className="d-flex">
              <select className="form-select" id="searchSelect">
                <option>meals</option>
                <option>drink</option>
               </select>
              <input
                className="form-control me-sm-2"
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      
      <Switch>
  
      <Route exact path="/" component={ Home } />
      <Route exact path="/Meals" component={ Meals } />
      <Route exact path="/Drinks" component={ Drinks } />

      <Route path="*" component={PathNotFound} />
        
    </Switch>
    



      </Router>
<Footer/>
    </div>
  );
}

export default App;
