import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { getCources, sendRegistrationForm } from "../../../api/apiData";
import PersonalDetails from "./PersonalDetails";
import QualificationDetails from "./QualificationDetails";
import CheckboxGroup from "./CheckboxGroup";
import PaymentDetails from "./PaymentDetails";
import SourceCheckboxGroup from "../enquiry form/SourceCheckboxGroup";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: [],
    qualification: "",
    otherQualification: "",
    registeredCourses: [],
    totalFees: 0,
    amountPaid: "",
    paymentType: "",
    installmentMonths: 0, // Corrected here
    installments: 0,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const paymentTypes = ["CASH", "CHEQUE", "ONLINE"];

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const res = await getCources();
        return res?.data?.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  // Calculate Installments
  useEffect(() => {
    if (
      formData.totalFees > 0 &&
      formData.amountPaid >= 0 &&
      formData.installmentMonths > 0 // Corrected here
    ) {
      const remainingAmount =
        parseFloat(formData.totalFees) - parseFloat(formData.amountPaid);
      const installmentAmount =
        remainingAmount > 0
          ? (remainingAmount / formData.installmentMonths).toFixed(2) // Corrected here
          : 0;
      setFormData((prevState) => ({
        ...prevState,
        installments: installmentAmount,
      }));
    }
  }, [formData.totalFees, formData.amountPaid, formData.installmentMonths]); // Corrected here

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validate fields as the user types
    let newErrors = { ...errors };

    if (type === "checkbox" && name === "source") {
      setFormData((prevState) => {
        const updatedSource = checked
          ? [...prevState.source, value] // Add selected source
          : prevState.source.filter((item) => item !== value); // Remove unselected source

        console.log("Updated source array:", updatedSource); // Debug log

        return { ...prevState, source: updatedSource };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Real-time validation
    if (name === "name" && !value.trim()) {
      newErrors.name = "Name is required.";
    } else {
      delete newErrors.name;
    }

    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = "Email is not valid.";
    } else {
      delete newErrors.email;
    }

    if (name === "contact" && value && !/^\d{10}$/.test(value)) {
      newErrors.contact = "Contact number should be 10 digits.";
    } else {
      delete newErrors.contact;
    }

    // Validate College and Branch fields
    if (name === "college" && !value.trim()) {
      newErrors.college = "College name is required.";
    } else {
      delete newErrors.college;
    }

    if (name === "branch" && !value.trim()) {
      newErrors.branch = "Branch name is required.";
    } else {
      delete newErrors.branch;
    }

    if (name === "amountPaid" && value && isNaN(value)) {
      newErrors.amountPaid = "Amount paid should be a valid number.";
    } else {
      delete newErrors.amountPaid;
    }

    if (name === "installmentMonths" && value && isNaN(value)) {
      newErrors.installmentMonths =
        "Installment months should be a valid number."; // Corrected here
    } else {
      delete newErrors.installmentMonths;
    }

    if (name === "totalFees" && value && isNaN(value)) {
      newErrors.totalFees = "Total fees should be a valid number.";
    } else {
      delete newErrors.totalFees;
    }

    if (name === "qualification" && !value) {
      newErrors.qualification = "Qualification is required.";
    } else {
      delete newErrors.qualification;
    }

    // Validate if at least one source is selected
    if (formData.source.length === 0) {
      newErrors.source = "At least one source must be selected.";
    } else {
      delete newErrors.source;
    }

    // Validate payment type
    if (name === "paymentType" && !formData.paymentType) {
      newErrors.paymentType = "Payment Type is required.";
    } else {
      delete newErrors.paymentType;
    }

    setErrors(newErrors);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const course = data?.find((course) => course.courseName === value);
    if (course) {
      setFormData((prevState) => {
        const updatedCourses = checked
          ? [...prevState.registeredCourses, course] // Add course to registeredCourses
          : prevState.registeredCourses.filter(
              (item) => item.courseName !== course.courseName // Remove course
            );
        const totalFees = updatedCourses.reduce(
          (total, course) => total + course.price,
          0
        );
        return {
          ...prevState,
          registeredCourses: updatedCourses, // Update registeredCourses
          totalFees: totalFees, // Update total fees
        };
      });

      // Clear error for registeredCourses when a course is selected
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.registeredCourses; // Remove error for registeredCourses
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform final validation before submission
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is not valid.";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Contact number should be 10 digits.";
    if (!formData.college.trim())
      newErrors.college = "College name is required.";
    if (!formData.branch.trim()) newErrors.branch = "Branch name is required.";
    if (!formData.amountPaid || isNaN(formData.amountPaid))
      newErrors.amountPaid = "Amount paid should be a valid number.";
    if (!formData.installmentMonths || isNaN(formData.installmentMonths))
      newErrors.installmentMonths =
        "Installment months should be a valid number.";
    if (!formData.totalFees || isNaN(formData.totalFees))
      newErrors.totalFees = "Total fees should be a valid number.";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";

    // Check if at least one course is selected
    if (formData.registeredCourses.length === 0)
      newErrors.registeredCourses = "At least one course must be selected.";

    // Validate if at least one source is selected
    if (formData.source.length === 0) {
      newErrors.source = "At least one source must be selected.";
    }

    // Validate payment type
    if (!formData.paymentType)
      newErrors.paymentType = "Payment type is required.";

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop form submission if errors exist
    }

    // Form submission logic
    const submissionData = {
      ...formData,
      source: formData.source.join(", "), // Convert array to comma-separated string
      qualification:
        formData.qualification === "Others"
          ? formData.otherQualification
          : formData.qualification,
      registeredCourses: formData.registeredCourses.map((course) => {
        const { id, ...courseWithoutId } = course; // Exclude 'id'
        return courseWithoutId; // Return the course without 'id'
      }),
      installmentsMonths: formData.installmentMonths, // Rename the field here
    };

    delete submissionData.otherQualification;

    const jwt = localStorage.getItem("jwt");

    console.log(submissionData);

    try {
      const res = await sendRegistrationForm(jwt, submissionData);
      console.log("Form submitted successfully:", res?.data?.message);
      navigate("/manager/registrations");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full max-w-[95%] mt-10 mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">Registration Form</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <PersonalDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />

        <QualificationDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />

        <SourceCheckboxGroup
          options={[
            "Google Search",
            "Reference",
            "Newspaper",
            "Seminar",
            "Poster",
            "Hoarding",
            "Others",
          ]}
          selectedValues={formData.source}
          onChange={handleChange}
          error={errors.source}
        />

        <CheckboxGroup
          courses={data || []}
          selectedCourses={formData.registeredCourses}
          onCheckboxChange={handleCheckboxChange}
          errors={errors}
        />

        <PaymentDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          paymentTypes={paymentTypes}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
