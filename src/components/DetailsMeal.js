import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import './DetailsMeals.css';

const URL_BASE = "https://www.themealdb.com/api/json/v1/1/";
const URL_METHOD = "lookup.php?i=";

const DetailsMeal = () => {
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();
  const params = useParams();

  const style = {
    "max-width": "10rem",
    "min-width": "12rem",
  };

  useEffect(() => {
    setDetails({});
    fetch(URL_BASE + URL_METHOD + params.id)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setIngredients(buildIngredientsMeasure(data.meals[0]));
        // console.log(data);
      })
      .catch((err) => console.log("Error loading results", err));
  }, [params.id]);

  const buildIngredientsMeasure = (meal) => {
    console.log("Paso por aqui", meal);
    const ingredients = [];
    const mesasures = [];

    Object.entries(meal).map(([element, value]) => {
      if (element.includes("strIngredient")) {
        if (value !== null && value.trim() !== "") {
          ingredients.push({ ingredient: value });
          //       console.log(`ingrediente  ${element} ${value}`)
        }
      }

      if (element.includes("strMeasure")) {
        if (value !== null && value.trim() !== "") {
          mesasures.push({ measure: value });

          //      console.log(`Measure  ${element} ${value}`)
        }
      }
    });

    const ingredientList = ingredients.map((ingredient, index) => {
      return {
        id: index,
        name: ingredient.ingredient,
        measure: mesasures[index].measure,
        path: `https://www.themealdb.com/images/ingredients/${ingredient.ingredient}-Small.png`,
      };
      //console.log(`Ingrediente +Measure  ${ingredient.ingredient} `,mesasures[index].measure)
    });

    return ingredientList;
  };

  const buildInstructions = (item) => {
      // let pattern = item.includes('\r\n\r\n')? "\r\n\r\n": "\r\n";
       return (
      <ul>
        {item.split('\r\n').map((items) => (
          
          items!=="" && items.length>3? <li>{items}</li>:''
         
       
          ))}
      </ul>
    );

    return (
      <pre>
               {item}
             </pre>
    );


  };

  const buildCardIngredients = (ingredient) => (
    <div className="col-sm-3">
      <div className="card  mb-1" style={style}>
        <div className="card-body">
          <h4 className="card-title">{ingredient.name}</h4>
          <img
            src={ingredient.path}
            className="card-img-top-thumbnail"
            alt="..."
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h3>Details details for {params.id}</h3>
      {details.meals ? (
        <div>
          <br />
          <hr />
          <div>
                 <div className="flex-container" >
                       <div className="flex-item1">
                <img
                  src={details.meals[0].strMealThumb}
                  alt={details.meals[0].title}
                />
              </div>
              <div className="flex-item2">
              <div className="row">
                {ingredients.map((ingredient) =>
                  buildCardIngredients(ingredient)
                )}
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <h4>Title: {details.meals[0].strMeal}</h4>
          <div>
            Instructions: {buildInstructions(details.meals[0].strInstructions)}
          </div>
          <p>Area Country: {details.meals[0].strArea}</p>
        
          <p>Tags: {details.meals[0].strTags}</p>
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default DetailsMeal;
