import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { forcast } from "./WeatherApi/forcast.js";
import { geocode } from "./WeatherApi/geocode.js";
import path from 'path'
import {fileURLToPath} from 'url';
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname , '../build')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.get("/weather", async (req, res) => {
  try {
    if (!req.query.search) {
      return res.send({
        error: "unable to find the address",
      });
    }
    geocode(req.query.search, (error, data) => {
      if (error) return res.send({ error });
      forcast(data.lattitude, data.longitude, (error, data1) => {
        if (error) return res.send({ error });
        res.send({
          weather_information: data1,
          data
        });
      });
    });
  } catch (error) {
    res.status(500).send({
        message: `Error in getting information about city`
    })
  }
});

app.get('/' , (req , res) => {
  res.status(200).send('this is weather App')
})

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`server on port ${process.env.DEV_MODE} on ${PORT}`);
});
