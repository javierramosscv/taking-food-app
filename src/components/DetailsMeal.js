import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./DetailsMeals.css";
import Spinner from "./Spinner";
import { URL_BASE_MEAL, URL_METHODBYID_MEAL } from "../helper.js";

//const URL_BASE = "https://www.themealdb.com/api/json/v1/1/";
//const URL_METHODBYID_MEAL = "lookup.php?i=";

const DetailsMeal = (props) => {
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();
  const params = useParams();

  const style = {
    maxWidth: "10rem",
    minWidth: "12rem",
    height: "12rem",
  };

  useEffect(() => {
    setDetails({});
    fetch(URL_BASE_MEAL + URL_METHODBYID_MEAL + params.id)
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
    return (
      <ul>
        {item
          .split("\r\n")
          .map((items, index) =>
            items !== "" && items.length > 3 ? <li key={index}>{items}</li> : ""
          )}
      </ul>
    );
  };

  const buildCardIngredients = (ingredient, index) => (
    <div key={index} className="col-sm-2">
      <div className="card  mb-1" style={style}>
        <div className="card-body text-center">
          <img src={ingredient.path} className="img-fluid" alt="..." />
          <h6 className="card-title">
            <small>
              {ingredient.measure}&nbsp;-&nbsp;{ingredient.name}
            </small>
          </h6>
        </div>
      </div>
    </div>
  );

  const buildVideoPath = (videoPath) => {
    console.log(videoPath);
    const array = videoPath.split("https://www.youtube.com/watch?v=");
    return array[1];
  };

  return (
    <div>
      <h3 className="text-center mt-3">Meal's Details</h3>

      {details.meals ? (
        <div>
          <div className="ms-5">
            <br />
            <hr />
            <div>
              <div className="flex-container">
                <div className="flex-item1">
                  <div>
                    <h4>Meal: &nbsp;{details.meals[0].strMeal}</h4>
                  </div>
                  <br />
                  <img
                    style={{ width: "500px" }}
                    src={details.meals[0].strMealThumb}
                    alt={details.meals[0].title}
                  />
                </div>
                <div className="flex-item2">
                  <div className="ms-4">
                    <h4>Ingredients</h4>
                  </div>
                  <br />
                  <div className="row ms-1">
                    {ingredients.map((ingredient, index) =>
                      buildCardIngredients(ingredient, index)
                    )}
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <br />
            <br />
          </div>
          <div className="ms-5 me-5">
            <h4>Meal: {details.meals[0].strMeal}</h4>
            <div className="form-check form-switch">
              <input
                className="form-check-input "
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={() =>
                  props.handleToggleFave(details.meals[0], props.favorites)
                }
                checked={
                  props.isFavorite(details.meals[0].idMeal, props.favorites)
                    ? "checked"
                    : ""
                }
              />
              <label className="form-check-label">
                {props.isFavorite(details.meals[0].idMeal, props.favorites)
                  ? "Added"
                  : "Add"}{" "}
                Favorites
              </label>
            </div>
            <div>
              <h4>Instructions:</h4>
              {buildInstructions(details.meals[0].strInstructions)}
            </div>
            <p>Area Country: {details.meals[0].strArea}</p>

            <p>
              {details.meals[0].strTags
                ? `Tags: ${details.meals[0].strTags}`
                : ""}{" "}
            </p>
          </div>
          <br />
          <br />
          <div className="text-center">
            <iframe
              className=""
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${buildVideoPath(
                details.meals[0].strYoutube
              )}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <br />
          <br />
        </div>
      ) : (
        <div>
          <Spinner />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default DetailsMeal;
