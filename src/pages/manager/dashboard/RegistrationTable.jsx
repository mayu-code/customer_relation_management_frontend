// src/components/RegistrationTable.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const RegistrationTable = ({ registrations }) => {
  return (
    <Box className="mt-8">
      <Typography variant="h6" className="font-medium mb-4 text-gray-800">
        Registration Management
      </Typography>
      <div
        style={{ height: 400, width: "100%" }}
        className="bg-white shadow-sm rounded-xl"
      >
        <DataGrid
          rows={registrations.map((registration) => ({
            id: registration.id,
            studentName: registration.studentName,
            registrationDate: registration.registrationDate,
            status: registration.status,
          }))}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            { field: "studentName", headerName: "Student Name", width: 200 },
            {
              field: "registrationDate",
              headerName: "Registration Date",
              width: 180,
            },
            { field: "status", headerName: "Status", width: 150 },
          ]}
          pageSize={5}
          className="bg-white rounded-xl shadow-md"
        />
      </div>
    </Box>
  );
};

export default RegistrationTable;
