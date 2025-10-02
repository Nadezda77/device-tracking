import React, { useState, useMemo } from "react";
import { Box, TextField } from "@mui/material";
import DeviceMap from "./DeviceMap";
import DeviceTable from "./DeviceTable";
import { useNavigate } from "react-router-dom";

// const aliases = {
//   "2CF7F1C0541000CC": "Tracker Car_01",
//   "2CF7F1C070300100": "Tracker Car_02",
//   // add more deviceId → alias here
// };

export default function DeviceListPage({ devices, aliases = {} }) {
  const [flyToKey, setFlyToKey] = useState(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Filter devices by alias or deviceId
  const filteredDevices = useMemo(() => {
    return devices.filter((d) => {
      const name = aliases[d.deviceId] ?? d.deviceId;
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [devices, filter, aliases]);

  const handleRowClick = (device) => {
    setFlyToKey(device);
    navigate(`/device/${device.deviceId}`);
  };

  return (
    <>
      <TextField
        label="Filter devices"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Box sx={{ height: 400, mb: 2 }}>
          <DeviceMap devices={filteredDevices} flyToKey={flyToKey} aliases={aliases} />
      </Box>
<DeviceTable
  devices={filteredDevices}
    onRowClick={handleRowClick}
  aliases={aliases}
/>
    </>
  );
}
