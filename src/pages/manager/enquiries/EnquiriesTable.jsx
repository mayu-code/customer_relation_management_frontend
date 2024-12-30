/* eslint-disable react/prop-types */
// EnquiriesTable.jsx
import { EyeIcon } from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";

export const EnquiriesTable = ({ enquiries }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/manager/enquiry/${id}`);
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
            <th className="px-4 py-2 border border-gray-300">Action</th>
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
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center cursor-pointer">
                    <EyeIcon
                      className="w-6"
                      onClick={() => handleRowClick(enquiry.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="px-4 py-2 text-center border border-gray-300"
              >
                No enquiries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};