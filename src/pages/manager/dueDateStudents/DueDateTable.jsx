import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { PayAmount } from "./PayAmount";
import { MailSend } from "./MailSend";

export const DueDateTable = ({ dueForm }) => {
  // State management for modals and selected entry
  const [isModalOpenPay, setIsModalOpenPay] = useState(false);
  const [isModalOpenMail, setIsModalOpenMail] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const navigate = useNavigate();

  // Handlers
  const handleRowClick = (id) => {
    navigate(`/manager/registration/${id}`); // Navigate to registration details
  };

  const handleCreateButtonClick = () => {
    navigate("/manager/registration-form"); // Navigate to form page
  };

  const handlePayClick = (entry) => {
    setSelectedEntry(entry); // Set selected entry for the Pay modal
    setIsModalOpenPay(true); // Open Pay modal
  };

  const handleInformClick = (entry) => {
    setSelectedEntry(entry); // Set selected entry for the Inform modal
    setIsModalOpenMail(true); // Open Inform modal
  };

  return (
    <div className="overflow-x-auto">
      {/* Table structure */}
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {[
              "ID",
              "Name",
              "Email",
              "Total Fees",
              "Fees Paid",
              "Balance Fee",
              "Installment Months",
              "Installment Amount",
              "Due Date",
              "Action",
            ].map((header) => (
              <th key={header} className="px-4 py-2 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dueForm && dueForm.length > 0 ? (
            dueForm.map((entry) => (
              <tr key={entry.id} className="text-center">
                <td className="px-4 py-2 border">{entry.id}</td>
                <td className="px-4 py-2 border">{entry.name}</td>
                <td className="px-4 py-2 border">{entry.email}</td>
                <td className="px-4 py-2 border">₹{entry.totalFees}</td>
                <td className="px-4 py-2 border">₹{entry.amountPaid}</td>
                <td className="px-4 py-2 border">₹{entry.totalFees - entry.amountPaid}</td>
                <td className="px-4 py-2 border">{entry.installmentsMonths}</td>
                <td className="px-4 py-2 border">₹{entry.installments}</td>
                <td className="px-4 py-2 border">{entry.deuDate}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <Button variant="filled" onClick={() => handlePayClick(entry)}>
                      Pay
                    </Button>
                    <Button variant="filled" onClick={() => handleInformClick(entry)}>
                      Inform
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="px-4 py-2 text-center border border-gray-300"
              >
                <div className="p-2 flex flex-col gap-2 justify-center items-center">
                  <p>No due dates yet !</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals */}
      <PayAmount
        isModalOpen={isModalOpenPay}
        setIsModalOpen={setIsModalOpenPay}
        selectedEntry={selectedEntry}
      />
      <MailSend
        isModalOpen={isModalOpenMail}
        setIsModalOpen={setIsModalOpenMail}
        selectedEntry={selectedEntry}
      />
    </div>
  );
};
