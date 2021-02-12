import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ isLoading = false }) => {
  return isLoading ? (
     <ReactLoading type={"spin"} color={"white"}  />
  ) : (
    ""
  );
};

export default Loader