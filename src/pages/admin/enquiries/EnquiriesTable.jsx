/* eslint-disable react/prop-types */
// EnquiriesTable.jsx
import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

export const AdminEnquiriesTable = ({ enquiries }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/manager/enquiry/${id}`);
  };

  const handleCreateButtonClick = () => {
    navigate("/manager/enquiry-form");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300">ID</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">College</th>
            <th className="px-4 py-2 border border-gray-300">Branch</th>
            <th className="px-4 py-2 border border-gray-300">Courses</th>
            <th className="px-4 py-2 border border-gray-300">Qualification</th>
            <th className="px-4 py-2 border border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.length > 0 ? (
            enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.id}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.name}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.email}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.college}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.branch}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.courses
                    .map((course) => course.courseName)
                    .join(", ")}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.qualification}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  {enquiry.enquiryDate}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="px-4 py-2 text-center border border-gray-300"
              >
                <div className="p-2 flex flex-col gap-2 justify-center items-center">
                  <p>No enquiries found. create one</p>
                  <Button size="sm" onClick={handleCreateButtonClick}>
                    Create
                  </Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
