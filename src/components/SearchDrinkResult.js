import React, { useEffect, useState } from "react";
import { useParams, useHistory,useLocation } from "react-router-dom";
import "./SearchDrinkResult.css";
import Spinner from "./Spinner";
import {
  URL_BASE_DRINK,
  URL_METHODBYCATEGORY_DRINK,
  URL_METHODBYTEXT_DRINK,
  PHOTO,
} from "../helper.js";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const SearchDrinkResult = (props) => {
    let query = useQuery();
    const history = useHistory();
    const params = useParams();
    const [results, setResults] = useState({});
  
    const style = { maxWidth: "20rem", minWidth: "25rem" };

    const categoryDrink=query.get("query");
    
const buildParams=(str)=>{

 return (str.replace(" ","_"))

}


    useEffect(() => {
      const URL_METHOD =
        params.kq === "c" ? URL_METHODBYCATEGORY_DRINK : URL_METHODBYTEXT_DRINK;
 
      setResults({});
   
      fetch(URL_BASE_DRINK + URL_METHOD + buildParams(query.get("query")))
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
  
          props.setLoading(false);
  
         
        })
        .catch((err) => console.log("Error loading results", err));
    }, [query.get("query")]);
  
   
   
    return( 
        
        <div className="resultMain">
        <h3>
          Search Results for:'{query.get("query")}'
        </h3>
        {props.loading ? (
          <div>
            <Spinner />
            <br />
            <br />
          </div>
        ) : results.drinks ? (
          <div className="row ">
            {results.drinks.map((drink, index) => (
              <div key={index} className="card mb-3 ms-2 " style={style}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={drink.strDrinkThumb + "/preview"}
                      className="img-fluid rounded-start"
                      alt=""
                      onClick={() => history.push(`/detailsDrink/${drink.idDrink}`)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${PHOTO}`;
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h6 className="card-title mt-4">{drink.strDrink}</h6>
                      <span className="position-absolute bottom-0 end-12 mb-2">
                        <small className="text-muted ">
                          Category:{" "}
                          {params.kq === "c" ? categoryDrink : drink.strCategory}
                          
                        </small>
                      </span>
                      <div className="position-absolute top-0 end-0 mt-2  me-2">
                                               {props.isFavorite(drink.idDrink, props.favorites) ? (
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
          <p>no data</p>
        )}
      </div>
    )

   };

export default SearchDrinkResult;

