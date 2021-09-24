import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./SearchMealResult.css";

const URL_BASE = "https://www.themealdb.com/api/json/v1/1/";
const URL_METHOD= "filter.php?c="

function SearchMealResult(props) {
  const history = useHistory();
  const params = useParams();
  const [results, setResults] = useState({});

  useEffect(() => {
    // console.log("useEffect(): perform search");
   

    if ( props.term !== params.query) {
      setResults({});
      fetch(URL_BASE + URL_METHOD + params.query)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        
           console.log("fetch", data);
        })
        .catch((err) => console.log("Error loading results", err));
    } else {
     
    }
    
  }, [params.query]);

  const handleOnclick = (meal, index) => {
    console.log("handleOnclickcurrent", meal);

  };

  return (
    <div>
      <h3>Search Results for:'{params.query}'</h3>
      <ul>
        {results.meals ? (
          <ul>
            {results.meals.map((meal, index) => (
              <li key={meal.idMeal}  ><img className="photo"
              src={meal.strMealThumb+"/preview"}
              alt={meal.strMeal}
              onClick ={ () => history.push(`/detailsMeal/${meal.idMeal}`) }
              
              ></img>
              {meal.idMeal} === {meal.strMeal}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading results...</p>
        )}
      </ul>
    </div>
  );
}
export default SearchMealResult;