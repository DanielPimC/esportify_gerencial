import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="overlay">
          <img
            src="https://i.imgur.com/FnmkMyn.gif"
            className="loading"
            alt="Loading"
          ></img>
        </div>
      )}
    </>
  );
};

export default Loading;
