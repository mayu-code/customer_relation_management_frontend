// src/components/EnquiryChart.js
import React from "react";
import { Paper, Typography } from "@mui/material";
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

const EnquiryChart = ({ data }) => {
  return (
    <Paper className="p-6 bg-white shadow-lg rounded-xl">
      <Typography variant="h6" className="font-medium mb-4 text-gray-800">
        Enquiries Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="enquiries" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default EnquiryChart;
