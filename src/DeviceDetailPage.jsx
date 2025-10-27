import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import DeviceMap from "./DeviceMap";
import DeviceTable from "./DeviceTable";

export default function DeviceDetailPage({ devices, aliases = {} }) {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [flyToKey, setFlyToKey] = useState(null);
//   const [history, setHistory] = useState([]);

  const deviceData = useMemo(
    () => devices.filter((d) => d.deviceId === deviceId),
    [devices, deviceId]
  );


//   if (loading) {
//   return <p>Loading device data...</p>;
// }

// if (!data || data.length === 0) {
//   return <p>No device data available.</p>;
// }


  if (deviceData.length === 0) {
    return <Typography>No data found for device {deviceId}</Typography>;
  }

  return (
    <>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate("/")}>
        ← Back to all devices
      </Button>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Device: {aliases[deviceId] ?? deviceId} 
      </Typography>

      <Box sx={{ height: 500, mb: 2 }}>
        <DeviceMap
          devices={deviceData}
          history={history}
          flyToKey={flyToKey || deviceData[0]}
          aliases={aliases} 
        />
      </Box>

      <DeviceTable devices={deviceData} onRowClick={setFlyToKey} aliases={aliases}  />
    </>
  );
}
