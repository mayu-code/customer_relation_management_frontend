// src/components/Dashboard.js
import React from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";
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

const ManagerDashboard = () => {
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
        Dashboard
      </Typography>

      {/* Manager Performance, Recent Registrations, and Recent Enquiries Charts */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper className="p-6 bg-white shadow-md">
            <Typography variant="h6" gutterBottom>
              Student Registrations
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={studentRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="performance" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="p-6 bg-white shadow-md">
            <Typography variant="h6" gutterBottom>
              Recent Registrations
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={recentRegistrationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="registrations"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="p-6 bg-white shadow-md">
            <Typography variant="h6" gutterBottom>
              Recent Enquiries
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={recentEnquiriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enquiries" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Registrations Table */}
      <Box className="mt-8">
        <Typography variant="h6" gutterBottom>
          Recent Registrations
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Box>

      {/* Recent Enquiries Table */}
      <Box className="mt-8">
        <Typography variant="h6" gutterBottom>
          Recent Enquiries
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Box>
    </div>
  );
};

export default ManagerDashboard;
