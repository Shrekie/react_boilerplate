import React from "react";
import ReactDOM from "react-dom";
import indexStyle from "./index.css"

const Index = () => {
  return <div className={indexStyle.introduction}>
    Hello React!
  </div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));