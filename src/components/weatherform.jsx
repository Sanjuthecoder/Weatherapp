import { useState } from "react";
import classes from './weather.module.css'
export const Weatherform = (props) => {
  const [enteredValue, setenteredValue] = useState("");
  const ValidInput = enteredValue.trim() !== "";


  const enteredChangeHandler = (e) => {
    setenteredValue(e.target.value);
  };
  const SubmitChangeHandler = (event) => {
    event.preventDefault();
    props.onConfirm(enteredValue);
    setenteredValue("");
  };

  return (
      <form className="d-flex" onSubmit={SubmitChangeHandler} role="search">
        <input
          className={classes.input}
          value={enteredValue}
          onChange={enteredChangeHandler}
          type="search"
          placeholder="Location...."
          aria-label="Search"
        />
        <button
          disabled={!ValidInput}
          className={classes.button1}
          type="submit"
        >
          Search
        </button>
      </form>
  );
};
