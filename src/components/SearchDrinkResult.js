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
console.log(str.replaceAll(" ","_"))
 return (str.replace(" ","_"))

}


    useEffect(() => {
      const URL_METHOD =
        params.kq === "c" ? URL_METHODBYCATEGORY_DRINK : URL_METHODBYTEXT_DRINK;
  console.log("parametr",query.get("query"))
      setResults({});
      console.log(URL_BASE_DRINK + URL_METHOD + buildParams(query.get("query")))
      fetch(URL_BASE_DRINK + URL_METHOD + buildParams(query.get("query")))
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
  
          props.setLoading(false);
  
          console.log("fetch Drink Sear", data);
        })
        .catch((err) => console.log("Error loading results", err));
    }, [query.get("query")]);
  
   
   
    return( 
        
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
                      <div className="form-check form-switch position-absolute top-0 end-0 mt-2">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          onChange={() =>
                            props.handleToggleFave(drink, props.favorites)
                          }
                          checked={
                            props.isFavorite(drink.idDrink, props.favorites)
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
    )

   };

export default SearchDrinkResult;

