import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchForm(props) {
  const [searchText, setSearchText] = useState("");
  const [selectOption, setselectOption] = useState("meal");
  
  const history = useHistory();

  function handleSubmit(ev) {
    //console.log("HandlerSubmit");
    ev.preventDefault();
    history.push(`/search/${searchText}`);
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
    <form className="d-flex">
    <select className="form-select" id="searchSelect" onChange={handleChangeSelect}>
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
    </div>
  );
}
export default SearchForm;