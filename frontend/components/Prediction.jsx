import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Button from "@mui/material/Button";
import "./Prediction.css";

const weather = [
  { value: 0, label: "Clear" },
  { value: 1, label: "Rainy" },
  { value: 2, label: "fog" },
];

const roadtype = [
  { value: 0, label: "Highway" },
  { value: 1, label: "Urban" },
  { value: 2, label: "Rural" },
];

export default function Prediction() {
  const [longi, setLongi] = useState("");
  const [lati, setLati] = useState("");
  const [time, setTime] = useState("");
  const [weath, setWeath] = useState("0");
  const [roadt, setRoadt] = useState("0");
  const [trafficVolume, setTrafficVolume] = useState("");
  const [error, setError] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setError(false);
      setPrediction(null);

      const payload = {
        latitude: parseFloat(lati),
        longitude: parseFloat(longi),
        time: parseInt(time),
        weather: parseInt(weath),
        road_type: parseInt(roadt),
        traffic_volume: parseFloat(trafficVolume),
      };

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setPrediction(data.accident_probability);
    } catch (err) {
      setError(true);
      console.error("Prediction error:", err);
    }
  };

  return (
    <div className="predict">
      <form onSubmit={handleSubmit}>
        <h3>Enter your location</h3>

        <h5>Latitude</h5>
        <TextField
          required
          type="number"
          label="Latitude"
          value={lati}
          onChange={(e) => setLati(e.target.value)}
          inputProps={{ step: "0.0001" }}
        />

        <h5>Longitude</h5>
        <TextField
          required
          type="number"
          label="Longitude"
          value={longi}
          onChange={(e) => setLongi(e.target.value)}
          inputProps={{ step: "0.0001" }}
        />

        <h5>Time (1-24hrs)</h5>
        <TextField
          required
          type="number"
          label="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          inputProps={{ min: 1, max: 24 }}
        />

        <h5>Traffic Volume</h5>
        <TextField
          required
          type="number"
          label="Traffic Volume"
          value={trafficVolume}
          onChange={(e) => setTrafficVolume(e.target.value)}
        />

        <h5>Weather</h5>
        <TextField
          select
          label="Weather"
          value={weath}
          onChange={(e) => setWeath(e.target.value)}
          helperText="Please select weather condition"
        >
          {weather.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <h5>Road Type</h5>
        <TextField
          select
          label="Road Type"
          value={roadt}
          onChange={(e) => setRoadt(e.target.value)}
          helperText="Please select road condition"
        >
          {roadtype.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" type="submit" style={{ marginTop: "20px" }}>
          Predict
        </Button>

        {error && (
          <p style={{ color: "red", fontWeight: "700" }}>Error in prediction</p>
        )}

        {prediction !== null && (
          <div style={{ marginTop: "20px" }}>
            <h3>Prediction Result:</h3>
            <p>Accident Probability: {(prediction * 100).toFixed(2)}%</p>
          </div>
        )}
      </form>
    </div>
  );
}
