import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import "./Prediction.css";
export default function Prediction() {
  return (
    <>
      <div className="predict">
        <form>
          <h5>Enter your location</h5>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Box>

          <Button color="secondary">Secondary</Button>
          <Button variant="contained" color="success">
            Success
          </Button>
        </form>
      </div>
    </>
  );
}
