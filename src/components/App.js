import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootswatch/dist/flatly/bootstrap.min.css";
import "./App.css";
import Meals from "./Meals";
import Home from "./Home";
import Drinks from "./Drinks";
import Faves from "./Faves";
import SearchMealResult from "./SearchMealResult";

import Footer from "./Footer";
import IMGDB from "../IMGDB.js";
import DetailsMeal from "./DetailsMeal";
import SearchForm from "./SearchForm";
import SearchDrinkResult from "./SearchDrinkResult";
import DetailsDrink from "./DetailsDrink";
import {
  URL_BASE_MEAL,
  URL_METHOD_MEAL_CAT,
  URL_BASE_DRINK,
  URL_METHOD_DRINK_CAT,
  buildCategoryMealList,
  buildCategoryDrinkList,
  PHOTO

} from "../helper.js";

function PathNotFound(props) {
  return (
    <div>
      <strong>Sorry ! Page not Found</strong>
    </div>
  );
}

function App() {
  const [categoryMealList, setCategoryMealList] = useState({});
  const [categoryDrinkList, setCategoryDrinkList] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage,setErrorMessage]= useState("");
  const [statusSearch,setStatusSearch]=useState("")
  
  const [favorites, setFavorites] = useState([
    {
      strMeal: "Beef and Mustard Pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
      idMeal: "52874",
    },
    {
      strMeal: "Beef and Oyster pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
      idMeal: "52878",
    },
  ]);

  const [favoritesDrink, setFavoritesDrink] = useState([
    {
      strDrink: "Adam Bomb",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tpxurs1454513016.jpg",
      idDrink: "16333"
      },
      {
      strDrink: "Aloha Fruit punch",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/wsyvrt1468876267.jpg",
      idDrink: "12862"
      },
  ]);


  const handleFavoritesMealToggle = (meal, faveList) => {
  
    let faves = faveList.slice();
    const mealIndex = faves.filter((item) => item.idMeal === meal.idMeal);
    if (faves.length === 0 || mealIndex.length === 0) {
      faves.push(meal);
    } else {
      faves = faves.filter((item) => item.idMeal !== meal.idMeal);
    }
    setFavorites(faves);
  };

  const isFavorite = (idMeal, faveList) => {
    const faves = faveList.slice();
    //validate if exist the fave in the array on state
    const mealIndex = faves.filter((item) => item.idMeal === idMeal);

    return mealIndex.length === 0 ? false : true;
  };

  // favorite drinks
  const handleFavoritesDrinkToggle = (drink, faveList) => {
   
    let faves = faveList.slice();
    const drinkIndex = faves.filter((item) => item.idDrink === drink.idDrink);
    if (faves.length === 0 || drinkIndex.length === 0) {
      faves.push(drink);
    } else {
      faves = faves.filter((item) => item.idDrink !== drink.idDrink);
    }
    setFavoritesDrink(faves);
  };

  const isFavoriteDrink = (idDrink, faveList) => {
    const faves = faveList.slice();
    //validate if exist the fave in the array on state

    const drinkIndex = faves.filter((item) => item.idDrink === idDrink);

    return drinkIndex.length === 0 ? false : true;
  };


  useEffect(() => {
    // Meal API
    if (Object.keys(categoryMealList).length === 0) {
      fetch(URL_BASE_MEAL + URL_METHOD_MEAL_CAT)
        .then((res) => res.json())
        .then((data) => {
          setCategoryMealList(buildCategoryMealList(data, IMGDB));
        
        })
        .catch((err) => console.log("Error loading results", err));
    }

    // Drink  API
    if (Object.keys(categoryDrinkList).length === 0) {
      fetch(URL_BASE_DRINK + URL_METHOD_DRINK_CAT)
        .then((res) => res.json())
        .then((data) => {
          
          setCategoryDrinkList(buildCategoryDrinkList(data, IMGDB));
       
        })
        .catch((err) => console.log("Error loading results", err));
    }
  });
  

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
            <img width="80px"
            src={PHOTO}
            className="img-fluid"
            alt=""
            
          />
              
            </a>

            <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    {" "}
                    Home{" "}
                  </Link>
                </li>
             
                <li className="nav-item">
                  <Link className="nav-link" to="/faves">
                    {" "}
                    Favorites{" "}
                  </Link>
                </li>
              </ul>
              <SearchForm setLoading={setLoading} errorMessage={errorMessage} setErrorMessage={setErrorMessage} 
             
              statusSearch={statusSearch} setStatusSearch={setStatusSearch} />
            </div>
          </div>
        </nav>
      

        <Switch>
          <Route exact path="/">
            <Home
              categoryDrinkList={categoryDrinkList}
              categoryMealList={categoryMealList}
              setLoading={setLoading}
              setStatusSearch={setStatusSearch}
              setErrorMessage={setErrorMessage}
            />
          </Route>
          <Route exact path="/meals" component={Meals} />
          <Route exact path="/drinks" component={Drinks} />
          <Route exact path="/faves">
            <Faves
              favorites={favorites}
              handleFavoritesMealToggle={handleFavoritesMealToggle}
              isFavorite={isFavorite}
              
              favoritesDrink={favoritesDrink}
              handleFavoritesDrinkToggle={handleFavoritesDrinkToggle}
              isFavoriteDrink={isFavoriteDrink}
       

            />
          </Route>
          <Route exact path="/searchMealCategory/:kq/:query">
            <SearchMealResult
              favorites={favorites}
              handleToggleFave={handleFavoritesMealToggle}
              isFavorite={isFavorite}
              setLoading={setLoading}
              loading={loading}
            />
          </Route>
          <Route exact path="/searchMealbyText/:kq/:query">
            <SearchMealResult
              favorites={favorites}
              handleToggleFave={handleFavoritesMealToggle}
              isFavorite={isFavorite}
              setLoading={setLoading}
              loading={loading}
            />
          </Route>
          <Route exact path="/detailsMeal/:id">
            <DetailsMeal
              favorites={favorites}
              handleToggleFave={handleFavoritesMealToggle}
              isFavorite={isFavorite}
            />
          </Route>

          <Route exact path="/searchDrinkCategory/:kq">
            <SearchDrinkResult
              favorites={favoritesDrink}
              handleToggleFave={handleFavoritesDrinkToggle}
              isFavorite={isFavoriteDrink}
              setLoading={setLoading}
              loading={loading}
            />
          </Route>

          <Route exact path="/detailsDrink/:id">
            <DetailsDrink
            favorites={favoritesDrink}
            handleToggleFave={handleFavoritesDrinkToggle}
            isFavorite={isFavoriteDrink}
            setLoading={setLoading}
            loading={loading}
            />
            </Route>

          <Route path="*" component={PathNotFound} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
