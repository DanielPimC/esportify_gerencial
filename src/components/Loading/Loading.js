import React from "react";
import LoadingGif from '../../assets/gif/loading.gif';

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="overlay">
          <img
            //src="https://i.imgur.com/FnmkMyn.gif"
            src={LoadingGif}
            className="loading"
            alt="Loading"
          ></img>
        </div>
      )}
    </>
  );
};

export default Loading;
