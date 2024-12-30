import React from "react";
import { useParams } from "react-router-dom";
import { getRegistrationById } from "../../../api/apiData";
import { useQuery } from "@tanstack/react-query";
import { Input } from "postcss";

export const RegistrationDetail = () => {
  const { id } = useParams(); // Correctly extract the ID
  const jwt = localStorage.getItem("jwt");

  const fetchRegistrationById = async () => {
    try {
      const res = await getRegistrationById(jwt, id);
      return res?.data?.data;
    } catch (error) {
      console.error("Error fetching registration:", error);
      throw new Error("Failed to fetch registration details.");
    }
  };

  const {
    data: registration,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registration", id], // Unique query key per ID
    queryFn: fetchRegistrationById,
  });

  if (isLoading) {
    return <div>Loading registration details...</div>;
  }

  if (isError || !registration) {
    return <div>No registration details available.</div>;
  }

  //   console.log(registration);

  return (
    <div className="p-6 bg-white shadow-md rounded-sm">
      <h2 className="text-2xl font-semibold mb-4">Registration Details</h2>
      <div className="">
        <div className="grid grid-cols-2 gap-8">
          <div className=" p-4">
            <h3 className="font-semibold">ID</h3>
            <p>{registration.id}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">Name</h3>
            <p>{registration.name}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">Email</h3>
            <p>{registration.email}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">College</h3>
            <p>{registration.college}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">Branch</h3>
            <p>{registration.branch}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">Qualification</h3>
            <p>{registration.qualification}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">Payment Type</h3>
            <p>{registration.paymentType}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">Registered Date</h3>
            <p>{registration.registrationDate}</p>
          </div>
          <div className=" p-4">
            <h3 className="font-semibold">Registered Courses</h3>
            <p>
              {registration.registeredCourses &&
              registration.registeredCourses.length > 0
                ? registration.registeredCourses
                    .map((course) => course.courseName)
                    .join(", ")
                : "No courses registered."}
            </p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">Total Fees</h3>
            <p>₹ {registration.totalFees}</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">Installment Months</h3>
            <p> {registration.installmentsMonths}</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">Installments</h3>
            <p>₹ {registration.installments}</p>
          </div>
        </div>
        <div></div>
        {/* <div>
        <Input
        label="Enter Amount"
        value={idSearchQuery}
        onChange={handleIdSearchChange}
        className="w-full sm:w-60"
        />
        </div> */}
      </div>
    </div>
  );
};
