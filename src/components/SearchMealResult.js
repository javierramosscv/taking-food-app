import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./SearchMealResult.css";
//import Takeing from "../image/takeing.png";
import Spinner from "./Spinner";
import {
  URL_BASE_MEAL,
  URL_METHODBYCATEGORY_MEAL,
  URL_METHODBYTEXT_MEAL,
  PHOTO,
} from "../helper.js";

//const URL_BASE = "https://www.themealdb.com/api/json/v1/1/";
//const URL_METHODBYCATEGORY_MEAL = "filter.php?c=";
//const URL_METHODBYTEXT_MEAL = "search.php?s=";

function SearchMealResult(props) {
  const history = useHistory();
  const params = useParams();
  const [results, setResults] = useState({});

  const style = { maxWidth: "20rem", minWidth: "25rem" };

  useEffect(() => {
    const URL_METHOD =
      params.kq === "c" ? URL_METHODBYCATEGORY_MEAL : URL_METHODBYTEXT_MEAL;

    setResults({});
    fetch(URL_BASE_MEAL + URL_METHOD + params.query)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);

        props.setLoading(false);

        console.log("fetch", data);
      })
      .catch((err) => console.log("Error loading results", err));
  }, [params.query]);

  return (
    <div className="resultMain">
      <h3>
        Search Results for:'{params.query} {params.kq}'
      </h3>
      {props.loading ? (
        <div>
          <Spinner />
          <br />
          <br />
        </div>
      ) : results.meals ? (
        <div className="row ">
          {results.meals.map((meal, index) => (
            <div key={index} className="card mb-3 ms-2 " style={style}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={meal.strMealThumb + "/preview"}
                    className="img-fluid rounded-start"
                    alt=""
                    onClick={() => history.push(`/detailsMeal/${meal.idMeal}`)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${PHOTO}`;
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title mt-4">{meal.strMeal}</h6>
                    <span className="position-absolute bottom-0 end-12 mb-2">
                      <small className="text-muted ">
                        Category:{" "}
                        {params.kq === "c" ? params.query : meal.strCategory}
                        &nbsp;&nbsp; &nbsp;
                        {params.kq === "c" ? "" : `Area: ${meal.strArea}`}
                      </small>
                    </span>
                    <div className="form-check form-switch position-absolute top-0 end-0 mt-2">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onChange={() =>
                          props.handleToggleFave(meal, props.favorites)
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
      ) : (
        <p>no data</p>
      )}
    </div>
  );
}
export default SearchMealResult;
