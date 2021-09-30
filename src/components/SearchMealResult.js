import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Message from "./Message";
import "./SearchMealResult.css";
import Spinner from "./Spinner";
import {
  URL_BASE_MEAL,
  URL_METHODBYCATEGORY_MEAL,
  URL_METHODBYTEXT_MEAL,
  PHOTO,
} from "../helper.js";

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
        props.setLoading(false);
        setResults(data);
        
      })
      .catch((err) => console.log("Error loading results", err));
  }, [params.query]);

  return (
    <div className="resultMain">
      <h3>Search Results for:'{params.query}'</h3>
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
                    <div className="position-absolute top-0 end-0 mt-2 me-2">
                      {props.isFavorite(meal.idMeal, props.favorites) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-bookmark-plus-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <Message message={"No Results"} />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
export default SearchMealResult;
