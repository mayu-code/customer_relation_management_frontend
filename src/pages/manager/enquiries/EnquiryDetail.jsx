import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  addEnquiryDetail,
  getCources,
  getEnquiriesById,
  getEnquiryDetail,
  sendEmail,
  updateEquiryForm,
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
import { CheckboxGroup } from "./CheckboxGroup";

export const EnquiryDetailPage = () => {
  const { id } = useParams(); // Get the enquiry ID from the URL
  const jwt = localStorage.getItem("jwt");
  const queryClient = useQueryClient(); // Initialize queryClient for refetching

  // Use useQuery to fetch data by the given ID
  const {
    data: enquiry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["enquiries", id], // Unique query key
    queryFn: async () => {
      const res = await getEnquiriesById(jwt, id);
      return res?.data?.data;
    },
    enabled: !!id, // Ensure query is enabled only if there's an ID
  });

  const getAllCources = async () => {
    try {
      const res = await getCources();
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const { data: courses } = useQuery({
    queryKey: ["cources"],
    queryFn: getAllCources,
  });

  const [editFields, setEditFields] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigate = useNavigate();

  const handleEditClick = (field) => {
    setShowDeleteButton(true);
    setEditFields((prev) => ({ ...prev, [field]: enquiry[field] }));

    if (field === "courses") {
      // If editing courses, show the checkbox group
      setEditFields((prev) => ({
        ...prev,
        [field]: enquiry[field],
      }));
    } else {
      // For other fields, set them as editable
      setEditFields((prev) => ({ ...prev, [field]: enquiry[field] }));
    }
  };

  const handleCancelClick = () => {
    setEditFields({});
    setShowDeleteButton(false);
    setShowUpdateButton(false);
  };

  useEffect(() => {
    if (enquiry?.courses) {
      setSelectedCourses(enquiry?.courses); // Map course objects to course names
    }
  }, [enquiry?.courses]);

  const handleFieldChange = (e, field) => {
    setEditFields((prev) => ({ ...prev, [field]: e.target.value }));
    setShowUpdateButton(true);
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourses(value); // Update state directly
    setShowUpdateButton(true); // Show the update button
  };

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

  const addEnquiryDetailForEnquiry = async (enquiryDetailReq) => {
    try {
      return await addEnquiryDetail(jwt, enquiry.id, enquiryDetailReq);
    } catch (error) {
      return console.log(error);
    }
  };

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

  const handleUpdate = async () => {
    const editableFields = [
      "name",
      "email",
      "contact",
      "branch",
      "college",
      "qualification",
    ]; // Editable fields excluding courses

    // Prepare the payload for backend submission
    const payload = {
      id: enquiry.id, // Include the enquiry ID for the update
      ...editableFields.reduce((acc, field) => {
        acc[field] =
          editFields[field] !== undefined ? editFields[field] : enquiry[field]; // Add editable fields to payload
        return acc;
      }, {}),
      // Include the courses (with id for existing and without id for new)
      courses: selectedCourses,
    };

    console.log("Full Payload to send:", payload);

    try {
      // Assuming updateEnquiry function sends the updated data to the backend
      await updateEquiryForm(jwt, payload);
      setEditFields({});
      setShowUpdateButton(false);
      alert("Enquiry updated successfully!");
      navigate(0);
    } catch (error) {
      console.error("Error updating enquiry", error);
      setEditFields({});
      setShowUpdateButton(false);
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

  // console.log(enquiry);

  return (
    <div className="bg-white p-6 shadow-sm mt-10 rounded-md">
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold mb-4">Enquiry Details</h2>
            <div className="space-x-2">
              {showUpdateButton && (
                <Button onClick={handleUpdate} variant="filled">
                  Update
                </Button>
              )}
              {showDeleteButton && (
                <Button onClick={() => handleCancelClick()}>Cancel</Button>
              )}
              <Button variant="filled" onClick={() => setIsModalOpen(true)}>
                Send Email
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <div className="grid grid-cols-2 gap-14 text-xl mt-10">
              <p>
                <strong>Enquiry ID:</strong> {enquiry.id}
              </p>
              <p>
                <strong>Enquiry Date:</strong> {enquiry.enquiryDate}
              </p>
              {[
                { label: "Student Name", field: "name" },
                { label: "Student Email", field: "email" },
                { label: "Student Contact", field: "contact" },
                { label: "Student Branch", field: "branch" },
                { label: "Student College", field: "college" },
                { label: "Student Qualification", field: "qualification" },
              ].map(({ label, field }) => (
                <div key={field} className="relative flex gap-2">
                  <strong>{label}:</strong>{" "}
                  {editFields[field] !== undefined ? (
                    <div className="">
                      <Input
                        label={label}
                        value={editFields[field]}
                        onChange={(e) => handleFieldChange(e, field)}
                        className="mt-1"
                      />
                    </div>
                  ) : field === "courses" ? (
                    <div>
                      {selectedCourses.length > 0
                        ? selectedCourses.join(", ")
                        : "No courses selected"}
                    </div>
                  ) : (
                    enquiry[field]
                  )}
                  <div className="text-center">
                    <PencilIcon
                      className="w-5 h-5 inline-block ml-2 cursor-pointer text-gray-500"
                      onClick={() => handleEditClick(field)}
                    />
                  </div>
                </div>
              ))}
              <div>
                <strong>Enquired Courses:</strong>{" "}
                {enquiry.courses.map((course) => course.courseName).join(", ")}
                <PencilIcon
                  className="w-5 h-5 inline-block ml-2 cursor-pointer text-gray-500"
                  onClick={() => handleEditClick("courses")}
                />
              </div>
              <p>
                <strong>Sources:</strong> {enquiry.source}
              </p>
            </div>
            {editFields.courses && (
              <div className="mt-6">
                <CheckboxGroup
                  label="Courses Registered For"
                  options={courses} // Array of all available courses
                  selectedValues={selectedCourses} // Array of currently selected courses
                  enquiry={enquiry}
                  onChange={handleCourseChange} // Update state on change
                />
              </div>
            )}
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
              <p>No enquiry details found for this enquiry. Add one</p>
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
              <p className="text-gray-900 text-lg">Send Email To: </p>
              <Input label="Send to Email" value={enquiry.email} disabled />
            </div>
            <div className="mb-4">
              <Input
                placeholder="Enter Subject"
                label="Subject"
                name="subject"
                value={emailForm.subject}
                onChange={handleEmailChange}
              />
              {emailFormErrors.subject && (
                <p className="text-sm text-red-500">
                  {emailFormErrors.subject}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Textarea
                placeholder="Enter Body"
                label="Message Body"
                name="body"
                value={emailForm.body}
                onChange={handleEmailChange}
              />
              {emailFormErrors.body && (
                <p className="text-sm text-red-500">{emailFormErrors.body}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" variant="filled" color="green">
                Send Email
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};
