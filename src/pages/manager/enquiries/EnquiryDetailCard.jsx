import { useState } from "react";

export const EnquiryDetailCard = ({ detail }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-4 border rounded-lg shadow-md bg-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)} // Show modal on hover
      onMouseLeave={() => setIsHovered(false)} // Hide modal on mouse leave
    >
      {/* Default Card Content */}
      <div className="flex justify-between">
        <h4 className="text-lg font-semibold mb-2">{detail.enquiryType}</h4>
        <p className="text-sm text-gray-700">
          <strong>Date:</strong> {detail.enquiryDate || "N/A"}
        </p>
      </div>
      <p
        className="text-sm text-gray-700 mb-2 overflow-hidden"
        style={{ maxHeight: "50px" }} // Truncate content
      >
        <strong>Description:</strong> {detail.enquiryDescription}
      </p>

      {/* Modal on Hover */}
      {isHovered && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2"
            onMouseLeave={() => setIsHovered(false)} // Close modal on mouse leave
          >
            <h4 className="text-xl font-semibold mb-4">{detail.enquiryType}</h4>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Date:</strong> {detail.enquiryDate || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Description:</strong> {detail.enquiryDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
