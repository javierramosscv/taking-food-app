import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Takeing from "../image/takeing.png";

import "./Faves.css";

const Faves = (props) => {
  const history = useHistory();
  const params = useParams();

  const photo = Takeing;

  const style = {
    maxWidth: "24rem",
    minWidth: "25rem",
  };

  return (
    <div>
      <div className="d-flex container">
        <div className="col ">
          <div> Your Meals </div>
          {console.log("fave", props.favorites)}
          {props.favorites.map((meal, index) => (
            <div key={index} className="card mb-3 ms-1 " style={style}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={meal.strMealThumb + "/preview"}
                    className="img-fluid rounded-start"
                    alt=""
                    onClick={() => history.push(`/detailsMeal/${meal.idMeal}`)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${photo}`;
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <div className="card-body">
                    <h6 className="card-title mt-4">{meal.strMeal}</h6>
                    <div clasName="card-text">
                      <span className="position-absolute bottom-0 end-12 mb-2 ms-0">
                        <small className="text-muted ">
                          Category: {meal.strCategory}&nbsp;
                        </small>
                        <small className="text-muted ">
                          Area:{meal.strArea}
                        </small>
                      </span>
                    </div>
                    <div className="form-check form-switch position-absolute top-0 end-0 mt-2">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onChange={() =>
                          props.handleFavoritesMealToggle(meal, props.favorites)
                        }
                        checked={
                          props.isFavorite(meal.idMeal, props.favorites)
                            ? "checked"
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col ">
          <div> Your Drinks </div>

          {console.log("fave", props.favoritesDrink)}
          {props.favoritesDrink.map((drink, index) => (
            <div key={index} className="card mb-3 ms-1 " style={style}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={drink.strDrinkThumb + "/preview"}
                    className="img-fluid rounded-start"
                    alt=""
                    onClick={() => history.push(`/detailsDrink/${drink.idDrink}`)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${photo}`;
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <div className="card-body">
                    <h6 className="card-title mt-4">{drink.strDrink}</h6>
                    <div clasName="card-text">
                      <span className="position-absolute bottom-0 end-12 mb-2 ms-0">
                        <small className="text-muted ">
                          Category: {drink.strCategory}&nbsp;
                        </small>
                       
                      </span>
                    </div>
                    <div className="form-check form-switch position-absolute top-0 end-0 mt-2">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onChange={() =>
                          props.handleFavoritesDrinkToggle(drink, props.favoritesDrink)
                        }
                        checked={
                          props.isFavoriteDrink(drink.idDrink, props.favoritesDrink)
                            ? "checked"
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}



        </div>
      </div>
    </div>
  );
};
export default Faves;
