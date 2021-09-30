import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./DetailsDrink.css";
import Spinner from "./Spinner";
import { URL_BASE_DRINK, URL_METHODBYID_DRINK } from "../helper.js";

const DetailsDrink = (props) => {
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
    fetch(URL_BASE_DRINK + URL_METHODBYID_DRINK + params.id)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setIngredients(buildIngredientsMeasure(data.drinks[0]));
      
      })
      .catch((err) => console.log("Error loading results", err));
  }, [params.id]);

  const buildIngredientsMeasure = (drink) => {
   
    const ingredientList = [];

    Object.entries(drink).map(([element, value]) => {
      if (element.includes("strIngredient")) {
          const indexMesuare = element.split("strIngredient");
      
        if (value !== null && value.trim() !== "") {
          ingredientList.push({
            name: value,
            measure: drink[`strMeasure${indexMesuare[1]}`],
            path: `https://www.thecocktaildb.com/images/ingredients/${value}-Small.png`,
          });
        }
      }
    });

    return ingredientList;
  };

  const buildCardIngredients = (ingredient, index) => (
    <div className="card  mb-3 ms-3" style={style}>
      <div className="card-body text-center ">
        <img src={ingredient.path} className="img-fluid" alt="..." />
        <h6 className="card-title">
          <small>
            {ingredient.measure? `${ingredient.measure} - `:''}{ingredient.name}
          </small>
        </h6>
      </div>
    </div>
  );

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

  return (
    <div>
      <h3 className="text-center mt-3">Drink's Details</h3>

      {details.drinks ? (
        <div>
          <div className="ms-5">
            <br />
            <hr />
            <div>
              <div className="flex-container">
                <div className="flex-item1">
                  <div>
                    <h4>Drink: &nbsp;{details.drinks[0].strDrink}</h4>
                  </div>
                  <br />
                  <img
                    style={{ width: "500px" }}
                    src={details.drinks[0].strDrinkThumb}
                    alt={details.drinks[0].strDrink}
                  />
                </div>
                <div className="flex-item2">
                  <div className="ms-4">
                    <h4>Ingredients</h4>
                  </div>
                  <br />
                  <div className="row ms-5">
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
            <h4>Drink: {details.drinks[0].strDrink}</h4>
            <div className="form-check form-switch">
              <input
                className="form-check-input "
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={() =>
                  props.handleToggleFave(details.drinks[0], props.favorites)
                }
                checked={
                  props.isFavorite(details.drinks[0].idDrink, props.favorites)
                    ? "checked"
                    : ""
                }
              />
              <label className="form-check-label">
                {props.isFavorite(details.drinks[0].idDrink, props.favorites)
                  ? "Added"
                  : "Add"}{" "}
                Favorites
              </label>
            </div>
            <div>
              <h4>Instructions:</h4>
              {buildInstructions(details.drinks[0].strInstructions)}
            </div>
            <p>
              Kind of Drink:<b> {details.drinks[0].strAlcoholic}</b>
            </p>

            <p>
              {details.drinks[0].strTags
                ? `Tags: ${details.drinks[0].strTags}`
                : ""}{" "}
            </p>
          </div>
          <br />
          <br />

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
export default DetailsDrink;
