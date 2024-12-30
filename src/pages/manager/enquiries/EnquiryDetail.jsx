import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient for refetching
import { useState } from "react";
import {
  addEnquiryDetail,
  getEnquiriesById,
  getEnquiryDetail,
  sendEmail,
} from "../../../api/apiData";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

export const EnquiryDetailPage = () => {
  const { id } = useParams(); // Get the enquiry ID from the URL
  const jwt = localStorage.getItem("jwt");
  const queryClient = useQueryClient(); // Initialize queryClient for refetching

  // Use useQuery to fetch data by the given ID
  const {
    data: enquiry,
    isLoading,
    isError,
    error, // Capture the error object
  } = useQuery({
    queryKey: ["enquiries", id], // Unique query key
    queryFn: async () => {
      const res = await getEnquiriesById(jwt, id);
      return res?.data?.data;
    },
    enabled: !!id, // Ensure query is enabled only if there's an ID
  });

  // State for form values
  const [formValues, setFormValues] = useState({
    enquiryType: "",
    enquiryDescription: "",
    studentName: enquiry?.name || "", // Set default to enquiry.name
  });

  // State for email modal and form values
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [emailForm, setEmailForm] = useState({
    subject: "",
    body: "",
  });

  // Add state for errors
  const [formErrors, setFormErrors] = useState({
    enquiryType: "",
    enquiryDescription: "",
  });

  const [emailFormErrors, setEmailFormErrors] = useState({
    subject: "",
    body: "",
  });

  // Validate enquiry form
  const validateEnquiryForm = (values) => {
    const errors = {};
    if (!values.enquiryType) {
      errors.enquiryType = "Enquiry Type is required.";
    }
    if (!values.enquiryDescription) {
      errors.enquiryDescription = "Enquiry Description is required.";
    }
    return errors;
  };

  // Validate email form
  const validateEmailForm = (values) => {
    const errors = {};
    if (!values.subject) {
      errors.subject = "Subject is required.";
    }
    if (!values.body) {
      errors.body = "Message body is required.";
    }
    return errors;
  };

  // Handle form value changes and real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    const errors = validateEnquiryForm(updatedValues);
    setFormErrors(errors);
  };

  // Handle email form changes and real-time validation
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...emailForm, [name]: value };
    setEmailForm(updatedValues);
    const errors = validateEmailForm(updatedValues);
    setEmailFormErrors(errors);
  };

  // Add enquiry detail for enquiry
  const addEnquiryDetailForEnquiry = async (enquiryDetailReq) => {
    try {
      return await addEnquiryDetail(jwt, enquiry.id, enquiryDetailReq);
    } catch (error) {
      return console.log(error);
    }
  };

  // Fetch all enquiry details
  const fetchAllEnquiryDetails = async () => {
    try {
      const res = await getEnquiryDetail(jwt, enquiry.id);
      return res?.data?.data;
    } catch (error) {
      return error;
    }
  };

  const { data: enquiryDetails } = useQuery({
    queryKey: ["enquiryDetails", enquiry?.id],
    queryFn: fetchAllEnquiryDetails,
  });

  // Handle enquiry form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate enquiry form before submitting
    const errors = validateEnquiryForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Stop form submission if there are errors
    }

    try {
      // Submit new enquiry detail
      await addEnquiryDetailForEnquiry(formValues);
      // Reset form
      setFormValues({
        enquiryType: "",
        enquiryDescription: "",
        studentName: enquiry?.name || "",
      });
      setFormErrors({}); // Clear errors
      // Show alert
      alert("Enquiry detail added successfully!");
      // Refetch the existing enquiry details to reflect the new entry
      queryClient.invalidateQueries(["enquiryDetails", enquiry?.id]);
    } catch (error) {
      console.error("Error submitting enquiry detail", error);
    }
  };

  const sendEmailToStudent = async () => {
    try {
      const res = await sendEmail(jwt, {
        to: enquiry.email,
        subject: emailForm.subject,
        body: emailForm.body,
      });
      return res;
    } catch (error) {
      return console.log(error);
    }
  };

  // Handle email form submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Validate email form before submitting
    const errors = validateEmailForm(emailForm);
    setEmailFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Stop form submission if there are errors
    }

    // Simulate email sending
    console.log({
      to: enquiry.email,
      subject: emailForm.subject,
      body: emailForm.body,
    });

    sendEmailToStudent();

    // Reset the email form
    setEmailForm({ subject: "", body: "" });
    setIsModalOpen(false);
    alert("Email sent successfully!");
  };

  // Show loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading enquiry details. Please try again later.</div>;
  }

  return (
    <div className="bg-white p-6 shadow-sm mt-10 rounded-md">
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Enquiry Details</h2>
            <div>
              <Button variant="filled" onClick={() => setIsModalOpen(true)}>
                Send Email
              </Button>
            </div>
          </div>
          <div>
            <strong>ID:</strong> {enquiry.id}
          </div>
          <div>
            <strong>Name:</strong> {enquiry.name}
          </div>
          <div>
            <strong>Email:</strong> {enquiry.email}
          </div>
          <div>
            <strong>College:</strong> {enquiry.college}
          </div>
          <div>
            <strong>Branch:</strong> {enquiry.branch}
          </div>
          <div>
            <strong>Qualification:</strong> {enquiry.qualification}
          </div>
          <div>
            <strong>Courses:</strong>{" "}
            {enquiry.courses.map((course) => course.courseName).join(", ")}
          </div>
          <div>
            <strong>Date:</strong> {enquiry.enquiryDate}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-4/12 px-5 mt-0">
          <div className="border p-5">
            <h3 className="text-xl font-semibold mb-4">Add Enquiry Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  label="Enquiry Type"
                  name="enquiryType"
                  value={formValues.enquiryType}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter enquiry type"
                  required
                />
                {formErrors.enquiryType && (
                  <p className="text-red-500 text-sm">
                    {formErrors.enquiryType}
                  </p>
                )}
              </div>
              <div>
                <Textarea
                  label="Enquiry Description"
                  name="enquiryDescription"
                  value={formValues.enquiryDescription}
                  onChange={handleChange}
                  className="w-full"
                  rows="4"
                  required
                />
                {formErrors.enquiryDescription && (
                  <p className="text-red-500 text-sm">
                    {formErrors.enquiryDescription}
                  </p>
                )}
              </div>
              {/* studentName is prefilled and hidden */}
              <input
                type="hidden"
                name="studentName"
                value={formValues.studentName}
              />
              <Button type="submit" className="w-full">
                Submit Enquiry
              </Button>
            </form>
          </div>
          <div className="mt-5 border p-3">
            <h3 className="text-xl font-semibold mb-4">
              Existing Enquiry Details
            </h3>
            {enquiryDetails && enquiryDetails.length > 0 ? (
              <div
                className="flex flex-col p-2 gap-4 overflow-y-auto"
                style={{ maxHeight: "300px" }} // Set a fixed height for the scrollable area
              >
                {enquiryDetails.map((detail) => (
                  <div
                    key={detail.id}
                    className="p-4 border rounded-lg shadow-md"
                  >
                    <div className="flex px-2 justify-between">
                      <h4 className="text-lg font-semibold mb-2">
                        {detail.enquiryType}
                      </h4>
                      <p className="text-sm text-gray-700">
                        <strong>Date:</strong> {detail.enquiryDate || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm p-2 mt-2 border rounded-lg border-gray-500 h-20">
                        {detail.enquiryDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No enquiry details found for this enquiry. create one</p>
            )}
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <DialogHeader>Send Email</DialogHeader>
        <DialogBody>
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <Input
                placeholder="Enter Subject"
                label="Subject"
                name="subject"
                value={emailForm.subject}
                onChange={handleEmailChange}
                className="w-full"
                required
              />
              {emailFormErrors.subject && (
                <p className="text-red-500 text-sm">
                  {emailFormErrors.subject}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Textarea
                label="Message"
                name="body"
                value={emailForm.body}
                onChange={handleEmailChange}
                className="w-full"
                rows="4"
                required
              />
              {emailFormErrors.body && (
                <p className="text-red-500 text-sm">{emailFormErrors.body}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="text"
                onClick={() => setIsModalOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit" variant="filled">
                Send
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};
