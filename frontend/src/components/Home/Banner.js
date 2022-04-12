import React from "react";
import logo from "../../imgs/logo.png";
import debounce from "lodash.debounce";
import agent from "../../agent";

const logoStyle = {
  width: "100%",
};

const Banner = (props) => {
  const debouncedSearchHandler = debounce((text) => searchHandler(text), 500);
  let searchText = null;

  let searchHandler = (text) => {
    const lowerText = text.toLowerCase();

    if (!searchText && lowerText.length < 3) {
      return;
    }

    if (searchText && lowerText.length < 3) {
      searchText = null;
      props.onClear();
      return;
    }

    searchText = lowerText;
    props.onSearch(
      lowerText,
      (page) => agent.Items.bySearch(lowerText, page),
      agent.Items.bySearch(lowerText)
    );
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" style={logoStyle} />
        <div className="row">
          <h2 className="col">A place to get</h2>
          <div className="col">
            <input
              id="search-box"
              className="form-control"
              type="search"
              autoComplete="off"
              onChange={(event) => debouncedSearchHandler(event.target.value)}
              placeholder="What is it you truly desire?"
            />
          </div>
          <h2 className="col">the cool stuff.</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
