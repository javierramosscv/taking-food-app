import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function SearchForm(props) {
  const [searchText, setSearchText] = useState("");
  const [selectOption, setselectOption] = useState("meal");
  const params = useParams();

  const history = useHistory();

  function handleSubmit(ev) {
  
    ev.preventDefault();
    if (props.statusSearch !== searchText) {
      if (searchText === "") {
        props.setErrorMessage("Please, Introduce a search");

        props.setLoading(false);
      } else {
        props.setLoading(true);
        selectOption === "meal"
          ? history.push(`/searchMealbyText/st/${searchText}`)
          : history.push(`/searchDrinkCategory/st?query=${searchText}`);
        props.setErrorMessage("");
        props.setStatusSearch(searchText);
      }
    } else {
      props.setErrorMessage("Please, introduce a search term");
    }
  }

  function handleChangeText(ev) {
    setSearchText(ev.target.value);
  }

  function handleChangeSelect(ev) {
    setselectOption(ev.target.value);
    setSearchText("");
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
          value={searchText}
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
     
      <div className="ErrorMessage"> {props.errorMessage}</div>
    </div>
  );
}
export default SearchForm;
