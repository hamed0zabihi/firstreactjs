import React from "react";

const LoadnigSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadnigSpinner;
