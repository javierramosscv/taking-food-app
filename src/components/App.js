import { HashRouter as Router, Route, Switch,Link } from "react-router-dom";
import { useState , useEffect } from "react";
import "bootswatch/dist/flatly/bootstrap.min.css";
import './App.css';
import Meals from "./Meals";
import Home from "./Home";
import Drinks from "./Drinks";
import SearchMealResult from "./SearchMealResult";

import Footer from "./Footer";
import IMGDB from "../IMGDB.js";
import DetailsMeal from "./DetailsMeal";
import SearchForm from "./SearchForm";


function PathNotFound(props) {
  return (
    <div>
      <strong>Sorry ! Page not Found</strong>
    </div>
  );
}

function App() {
  
   const [categoryMealList,setCategoryMealList] = useState({})   
  ;

   useEffect(() => {
  

    const URL_BASE = "https://www.themealdb.com/api/json/v1/1/";
    const URL_METHOD= "list.php?c=list"
    console.log("fetch======================================");
   if(Object.keys(categoryMealList).length === 0){
    
    fetch(URL_BASE+URL_METHOD)
      .then((res) => res.json())
      .then((data) => {
    
        setCategoryMealList(buildCategoryList(data,IMGDB));
        console.log("fetch", data);
      })
      .catch((err) => console.log("Error loading results", err));
    }
      
  }, );


  const buildCategoryList = (data,imagenList) => {
    
    const filterMeals= data.meals.filter(meal => ( meal.strCategory !== "Miscellaneous"));
    const categoryList=[];
    
    const imagenCategoryList= filterMeals.map((meal,index)=>{
      const path= imagenList.categoryMeals.filter(category=> category.name === meal.strCategory )
      return {id:index,name:meal.strCategory,path:path[0].path}
    })
    return imagenCategoryList
  };

  return (
    <div className="App">


    <Router basename={process.env.PUBLIC_URL} >

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
              <Link className="nav-link" to="/meals"> Meals </Link>
                
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/Drinks"> Drinks </Link>  
            
              </li>
            </ul>
           <SearchForm/>
          </div>
        </div>
      </nav>
      {console.log("pasa",Object.keys(categoryMealList).length)}
     
     
        <Switch>
    
        <Route exact path="/" >
            <Home categoryMealList = { categoryMealList } />
        </Route>
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/Drinks" component={ Drinks } />
        <Route exact path="/searchMealCategory/:query" component={ SearchMealResult } />
        <Route exact path="/detailsMeal/:id" component={ DetailsMeal } />
        
        <Route path="*" component={PathNotFound} />
          
      </Switch>

      </Router>


<Footer/>


</div>
  );
}

export default App;
