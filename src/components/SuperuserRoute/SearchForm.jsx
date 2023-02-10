import React from "react";

const SearchForm = ({ HCSearch, search, HSSearch, mode }) => {
  return (
    <form className="form-container" onSubmit={(e) => HSSearch(e, mode)}>
      <label htmlFor="search" className="form_label">
        Search user:
      </label>
      <i>Please type the user mail to search</i>
      <input
        type="mail"
        id="search"
        name="search"
        className="form_input"
        onChange={HCSearch}
        value={search || ""}
      />
      <button className="button-blue">Submit</button>
    </form>
  );
};

export default React.memo(SearchForm);
