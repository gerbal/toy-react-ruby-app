import React from "react";
import PropTypes from "prop-types";
import CheckEmail from "./CheckEmail";

const App = ({ name }) => {
  return (
    <div>
      <CheckEmail />
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string
};

export default App;
