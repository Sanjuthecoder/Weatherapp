import { useState } from "react";
import classes from "./weatherInformation.module.css";
import { Weatherform } from "./weatherform";
import { setdata } from "../store/data";
import { useDispatch , useSelector } from "react-redux";

const Weather = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);
  const { data } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const addChangeHandler = async (weath) => {
    setisLoading(true);
    seterror(null);
    try {
      const response = await fetch(
        "http://localhost:1000/weather?search=" + weath
      );
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const data = await response.json();
      dispatch(setdata(data));
    } catch (error) {
      seterror(error.message);
    }
    setisLoading(false);
  };
  let content = <p className="p">Found no weather information</p>;
  if (isLoading) {
    content = <p className="p">loading......</p>;
  }
  if (error) {
    content = <p className="p">{error}</p>;
  }
  console.log(data)
  return (
    <>
      <div className={classes.container}>
        <div className={classes["weather-side"]}>
          <div className={classes["weather-gradient"]}>
          </div>
          <div className={classes["date-container"]}>
            <h2 className={classes["date-dayname"]}>Tuesday</h2>
            <span className={classes["date-day"]}>15 Jan 2019</span>
            <i className={classes["location-icon"]} data-feather="map-pin" />
            <span className={classes.location}>{data === null ? 'India' : data?.data?.location}</span>
          </div>
          <div className={classes["weather-container"]}>
          <img src={data?.weather_information?.weather_icon} />
            <i className={classes["weather-icon"]} data-feather="sun" />
            <h1 className={classes["weather-temp"]}>{data === null ? '°C' : data?.weather_information?.temperature}°C</h1>
            <h3 className={classes["weather-desc"]}>{data === null ? 'clear' : data?.weather_information?.description}</h3>
          </div>
        </div>
        <div className={classes["info-side"]}>
          <div className={classes["today-info-container"]}>
            <div className={classes["today-info"]}>
              <div className={classes.precipitation}>
                {data?.weather_inforamation?.pricip}
                <span className={classes.title}>PRECIPITATION</span>
                <span className={classes.value}>{data === null ? '0%' :data?.weather_information?.pricip} %</span>
                <div className={classes.clear} />
              </div>
              <div className={classes.humidity}>
                {data?.weather_inforamation?.humidity}
                <span className={classes.title}>HUMIDITY</span>
                <span className={classes.value}>{data === null ? '0%' : data?.weather_information?.humidity} %</span>
                <div className={classes.clear} />
              </div>
              <div className={classes.wind}>
                {data?.weather_inforamation?.windspeed}
                <span className={classes.title}>WIND</span>
                <span className={classes.value}>{data === null ? '0 km/h' : data?.weather_information?.windspeed} km/h</span>
                <div className={classes.clear} />
              </div>
            </div>
          </div>
          <div className={classes["week-container"]}>
            <ul className={classes["week-list"]}>
              <li className={classes.active}>
                <i className={classes["day-icon"]} data-feather="sun" />
                <span className={classes["day-name"]}>Tue</span>
                <span className={classes["day-temp"]}>{data === null ? '0°C' : data?.weather_information?.temperature - 6}°C</span>
              </li>
              <li>
                <i className={classes["day-icon"]} data-feather="cloud" />
                <span className={classes["day-name"]}>Wed</span>
                <span className={classes["day-temp"]}>{data === null ? '0°C' : data?.weather_information?.temperature - 5}°C</span>
              </li>
              <li>
                <i className={classes["day-icon"]} data-feather="cloud-snow" />
                <span className={classes["day-name"]}>Thu</span>
                <span className={classes["day-temp"]}>{data === null ? '0°C' : data?.weather_information?.temperature - 3}°C</span>
              </li>
              <li>
                <i className={classes["day-icon"]} data-feather="cloud-rain" />
                <span className={classes["day-name"]}>Fry</span>
                <span className={classes["day-temp"]}>{data === null ? '0°C' : data?.weather_information?.temperature -4}°C</span>
              </li>
              <div className={classes.clear} />
            </ul>
          </div>
          <div className={classes["location-container"]}>
            {isLoading ? 'loading.....' : <Weatherform onConfirm={addChangeHandler} />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
