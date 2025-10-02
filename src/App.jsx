import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import DeviceListPage from "./DeviceListPage";
import DeviceDetailPage from "./DeviceDetailPage";

export default function App() {
  const [devices, setDevices] = useState([]);
  const aliases = {
    "2CF7F1C0541000CC": "Tracker Car_01",
    "2CF7F1C070300100": "Tracker Car_02",
  };


  useEffect(() => {
    fetch("https://b96lpkgoeg.execute-api.eu-central-1.amazonaws.com/prod/devices")
      .then((res) => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then((data) => setDevices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<DeviceListPage devices={devices}  aliases={aliases} />} />
          <Route path="/device/:deviceId" element={<DeviceDetailPage devices={devices} aliases={aliases}/>} />
        </Routes>
      </Box>
    </Router>
  );
}
