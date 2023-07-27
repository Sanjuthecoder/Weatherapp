import request from "request";
export const geocode = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e6295ae91709e62cc99d3fb3d7adb3f4&query=${address}`;
  request({ url: url, json: true }, (error, res) => {
    if (error) {
      callback("unable to connect to services check the conn", undefined);
    } else if (res.body.error) {
      callback("unable  to connect the service", undefined);
    } else {
      callback(undefined, {
        lattitude: res.body.location.lat,
        longitude: res.body.location.lon,
        location: res.body.request.query,
      });
    }
  });
};
