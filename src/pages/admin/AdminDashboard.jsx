// src/components/Dashboard.js
import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";

const AdminDashboard = () => {
  // Sample data for charts
  const studentRegistrationData = [
    { name: "Jan", performance: 80 },
    { name: "Feb", performance: 90 },
    { name: "Mar", performance: 85 },
    { name: "Apr", performance: 95 },
    { name: "May", performance: 85 },
    { name: "Jun", performance: 88 },
    { name: "Jul", performance: 92 },
  ];

  const recentRegistrationsData = [
    { name: "Jan", registrations: 100 },
    { name: "Feb", registrations: 120 },
    { name: "Mar", registrations: 130 },
    { name: "Apr", registrations: 150 },
    { name: "May", registrations: 160 },
    { name: "Jun", registrations: 180 },
    { name: "Jul", registrations: 190 },
  ];

  const recentEnquiriesData = [
    { name: "Jan", enquiries: 50 },
    { name: "Feb", enquiries: 60 },
    { name: "Mar", enquiries: 70 },
    { name: "Apr", enquiries: 80 },
    { name: "May", enquiries: 85 },
    { name: "Jun", enquiries: 90 },
    { name: "Jul", enquiries: 95 },
  ];

  // Sample data for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "studentName", headerName: "Student Name", width: 150 },
    { field: "registrationDate", headerName: "Registration Date", width: 200 },
    { field: "status", headerName: "Status", width: 130 },
  ];

  const rows = [
    {
      id: 1,
      studentName: "John Doe",
      registrationDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      registrationDate: "2024-02-20",
      status: "Inactive",
    },
    {
      id: 3,
      studentName: "Alice Brown",
      registrationDate: "2024-03-10",
      status: "Active",
    },
  ];

  return (
    <div className="flex-1 p-8">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Manager Performance Chart */}
        <Grid item xs={12} md={4}>
          <Box className="bg-white p-4 shadow-md rounded-xl">
            <Typography
              variant="h6"
              className="font-semibold mb-4 text-gray-700"
            >
              Manager Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Recent Registrations Chart */}
        <Grid item xs={12} md={4}>
          <Box className="bg-white p-4 shadow-md rounded-xl">
            <Typography
              variant="h6"
              className="font-semibold mb-4 text-gray-700"
            >
              Recent Registrations
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recentRegistrationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="registrations"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Recent Enquiries Chart */}
        <Grid item xs={12} md={4}>
          <Box className="bg-white p-4 shadow-md rounded-xl">
            <Typography
              variant="h6"
              className="font-semibold mb-4 text-gray-700"
            >
              Recent Enquiries
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recentEnquiriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="enquiries"
                  stroke="#F59E0B"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Recent Registrations Table */}
      <Box className="mt-8">
        <Typography variant="h6" className="font-medium mb-4 text-gray-800">
          Recent Registrations
        </Typography>
        <div
          style={{ height: 400, width: "100%" }}
          className="bg-white shadow-sm rounded-xl"
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            className="bg-white rounded-xl shadow-md"
          />
        </div>
      </Box>
    </div>
  );
};

export default AdminDashboard;
