// src/components/RecentEnquiries.js
import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const RecentEnquiries = ({ enquiries, onEnquirySelect }) => {
  return (
    <Paper className="p-6 mt-6 bg-white shadow-lg rounded-xl">
      <Typography variant="h6" className="font-medium mb-4 text-gray-800">
        Recent Enquiries
      </Typography>
      <Box className="space-y-4">
        {enquiries.map((enquiry) => (
          <Box
            key={enquiry.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-200 cursor-pointer"
            onClick={() => onEnquirySelect(enquiry)}
          >
            <Typography variant="body1" className="text-gray-700">
              {enquiry.studentName} - {enquiry.enquiry}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Status: {enquiry.status}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default RecentEnquiries;
