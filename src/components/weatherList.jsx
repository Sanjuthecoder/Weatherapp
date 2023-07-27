import classes from "./weatherList.module.css";
import WeatherItem from './weatheritem'
const Rander = (props) => {
  console.log(props.deliver)
  return (
    <ul className={classes.weather}>
      {props.deliver.map((item) => {
       return <WeatherItem 
        key={item.id}
        id={item.id}
        address={item.address}
        des={item.weather_information.description}
        temp={item.weather_information.temperature}
        humi={item.weather_information.humidity}
        windspeed={item.weather_information.windspeed}
        />
      })}
    </ul>
  );
};
export default Rander
