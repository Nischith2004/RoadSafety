import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import Button from "@mui/material/Button";
import "./Prediction.css";
const weather = [
  {
    value: "0",
    label: "clear",
  },
  {
    value: "1",
    label: "fog",
  },
  {
    value: "2",
    label: "rain",
  },
];
const roadtype = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
];

export default function Prediction() {
  let [longi, setLongi] = useState("77.30");
  let [lati, setLati] = useState("77.30");
  let [time, setTime] = useState("1 to 24");
  let [weath, setWeath] = useState("0");
  let [roadt, setRoadt] = useState("0");
  let [error, setError] = useState(false);
  let getWeatherInfo = async () => {
    try {
      setError(false);

      let result = {
        longitude: longi,
        latitude: lati,
        time: time,
        weather: weath,
        road_type: roadt,
        traffic_volume: 2000,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };
  let handlelongi = (evt) => {
    setLongi(evt.target.value);
  };
  let handlelati = (evt) => {
    setLati(evt.target.value);
  };
  let handletime = (evt) => {
    setTime(evt.target.value);
  };
  let handleweath = (evt) => {
    setWeath(evt.target.value);
  };
  let handleroadt = (evt) => {
    setRoadt(evt.target.value);
  };
  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(weath);
      setWeath("");
      let newInfo = await getWeatherInfo();
      console.log(newInfo);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <div className="predict">
        <form
          method="post"
          onSubmit={handleSubmit}
          action="http://127.0.0.1:5000/predict"
          target="http://localhost:5173/map"
        >
          <h3>Enter your location</h3>
          <h5>latitude</h5>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={lati}
            onChange={handlelati}
          />
          <h5>longitude</h5>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={longi}
            onChange={handlelongi}
          />
          <h5>time</h5>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={time}
            onChange={handletime}
          />
          <h5>Weather</h5>
          <TextField
            id="weather"
            select
            label="weather"
            value={weath}
            onChange={handleweath}
            helperText="Please select weather condition"
          >
            {weather.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <h5>Road_type</h5>
          <TextField
            id="road"
            select
            label="road"
            value={roadt}
            onChange={handleroadt}
            helperText="Please select road condition"
          >
            {roadtype.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          {error && (
            <p style={{ color: "red", fontWeight: "700" }}>cant predict</p>
          )}
        </form>
      </div>
    </>
  );
}
