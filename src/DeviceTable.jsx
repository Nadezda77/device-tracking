import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

export default function DeviceTable({ devices = [], onRowClick, aliases = {} }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Device</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Temperature (°C)</TableCell>
            <TableCell>Battery (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => {
            const key = device.deviceId + device.timestamp;
            const name = aliases[device.deviceId] ?? device.deviceId;

            return (
              <TableRow
                key={key}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onRowClick(device)}
              >
                <TableCell>{aliases[device.deviceId] ?? device.deviceId}</TableCell>
                <TableCell>{new Date(device.timestamp).toLocaleString()}</TableCell>
                <TableCell>{device.latitude}</TableCell>
                <TableCell>{device.longitude}</TableCell>
                <TableCell>{device.temperature}</TableCell>
                <TableCell>{device.battery}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
