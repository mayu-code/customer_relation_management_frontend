import { EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export const RegistrationTable = ({ registrations }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/manager/registration/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">College</th>
            <th className="px-4 py-2 border">Branch</th>
            <th className="px-4 py-2 border">Qualification</th>
            <th className="px-4 py-2 border">Payment Type</th>
            <th className="px-4 py-2 border">Registered Courses</th>
            <th className="px-4 py-2 border">Registered Date</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length > 0 ? (
            registrations.map((registration) => (
              <tr key={registration.id} className="text-center">
                <td className="px-4 py-2 border">{registration.id}</td>
                <td className="px-4 py-2 border">{registration.name}</td>
                <td className="px-4 py-2 border">{registration.email}</td>
                <td className="px-4 py-2 border">{registration.college}</td>
                <td className="px-4 py-2 border">{registration.branch}</td>
                <td className="px-4 py-2 border">
                  {registration.qualification}
                </td>
                <td className="px-4 py-2 border">{registration.paymentType}</td>
                <td className="px-4 py-2 border">
                  {registration.registeredCourses
                    .map((course) => course.courseName)
                    .join(", ")}
                </td>
                <td className="px-4 py-2 border">
                  {registration.registrationDate}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center cursor-pointer">
                    <EyeIcon
                      className="w-6"
                      onClick={() => handleRowClick(registration.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-4 py-2 text-center">
                No registrations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
