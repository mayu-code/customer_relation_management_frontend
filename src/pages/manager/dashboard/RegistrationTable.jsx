// src/components/RegistrationTable.js
import React from "react";
import { Box, Typography } from "@mui/material";

const RegistrationTable = ({ registrations }) => {
  return (
    <Box className="mt-8">
      <Typography variant="h6" className="font-medium mb-4 text-gray-800">
        Recent Registrations
      </Typography>
      <div className="overflow-x-auto mt-5 bg-white shadow-sm ">
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Registration Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.course}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No registrations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default RegistrationTable;
