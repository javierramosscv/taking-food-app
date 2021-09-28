import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchForm(props) {
  const [searchText, setSearchText] = useState("");
  const [selectOption, setselectOption] = useState("meal");


  const history = useHistory();

  function handleSubmit(ev) {
    console.log("HandlerSubmit: here");
    ev.preventDefault();
    

     if( searchText === ""){
       props.setErrorMessage("Please, Introduce a search");
    
     } else {
      props.setLoading(true);
      selectOption === "meal"
         ? history.push(`/searchMealbyText/st/${searchText}`)
         : history.push(`/searchDrinkCategory/st?query=${searchText}`);
         props.setErrorMessage("");

     }

    // history.push(`/searchMealbyText/st/${searchText}`);
  }

  function handleChangeText(ev) {
    //console.log("HandlerChange", ev.target.value);
    setSearchText(ev.target.value);
  }

  function handleChangeSelect(ev) {
    //console.log("HandlerChange", ev.target.value);
    setselectOption(ev.target.value);
  }

  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <select
          className="form-select"
          id="searchSelect"
          onChange={handleChangeSelect}
        >
          <option value="meal">meals</option>
          <option value="drink">drink</option>
        </select>
        <input
          className="form-control me-sm-2"
          onChange={handleChangeText}
          type="text"
          placeholder="Search"
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <br/>
      <div className="ErrorMessage"> {props.errorMessage}</div>
    
      </div>
  );
}
export default SearchForm;
