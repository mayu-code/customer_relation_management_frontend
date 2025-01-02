// src/components/ManagerDashboard.js
import React, { useState } from "react";
import { Grid } from "@mui/material";
import RegistrationChart from "./RegistrationChart";
import EnquiryChart from "./EnquiryChart";
import ExpenditureChart from "./ExpenditureChart";
import RecentRegistrations from "./RecentRegistrations";
import RecentEnquiries from "./RecentEnquiries";
import EnquiryDetails from "./EnquiryDetails";
import RegistrationTable from "./RegistrationTable";

const registrationData = [
  { month: "January", count: 50 },
  { month: "February", count: 70 },
  { month: "March", count: 65 },
  { month: "April", count: 80 },
  { month: "May", count: 90 },
];

const enquiryData = [
  { month: "January", count: 40 },
  { month: "February", count: 60 },
  { month: "March", count: 55 },
  { month: "April", count: 75 },
  { month: "May", count: 85 },
];

const expenditureData = [
  { category: "registrations", amount: 3000 },
  { category: "investments", amount: 2000 },
  { category: "Utilities", amount: 1500 },
  { category: "Miscellaneous", amount: 1000 },
];

const registrationList = [
  { id: 1, name: "John Doe", date: "2024-12-01", course: "B.Tech" },
  { id: 2, name: "Jane Smith", date: "2024-12-02", course: "MBA" },
  { id: 3, name: "Alice Brown", date: "2024-12-03", course: "MCA" },
];

const enquiryList = [
  {
    id: 1,
    name: "Sam Wilson",
    date: "2024-12-01",
    query: "B.Tech admission process",
  },
  {
    id: 2,
    name: "Emily Davis",
    date: "2024-12-02",
    query: "MBA fees structure",
  },
  {
    id: 3,
    name: "Michael Johnson",
    date: "2024-12-03",
    query: "MCA curriculum",
  },
];

const ManagerDashboard = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const handleEnquirySelect = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  return (
    <div className="flex-1 p-8 bg-white">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <RegistrationChart data={registrationData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnquiryChart data={enquiryData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ExpenditureChart data={expenditureData} />
        </Grid>
      </Grid>

      <RegistrationTable registrations={registrationList} />
      <RecentEnquiries enquiries={enquiryList} />
    </div>
  );
};

export default ManagerDashboard;
