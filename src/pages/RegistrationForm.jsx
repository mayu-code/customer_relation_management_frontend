import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, Radio } from "@material-tailwind/react";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: [],
    qualification: "",
    otherQualification: "", // to store the custom qualification if "Others" is selected
    courses: [],
    totalFees: "",
    amountPaid: "",
    paymentType: "",
    installmentMonths: 0,
    installments: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: "",
    qualification: "",
    otherQualification: "",
    courses: "",
    totalFees: "",
    amountPaid: "",
    paymentType: "",
    installmentMonths: "",
  });

  // Calculate Installments based on Total Fees, Amount Paid, and Installment Months
  useEffect(() => {
    if (
      formData.totalFees &&
      formData.amountPaid &&
      formData.installmentMonths > 0
    ) {
      const remainingAmount =
        parseFloat(formData.totalFees) - parseFloat(formData.amountPaid);
      const installmentAmount =
        remainingAmount > 0
          ? (remainingAmount / formData.installmentMonths).toFixed(2)
          : 0; // Installment per month
      setFormData((prevState) => ({
        ...prevState,
        installments: remainingAmount > 0 ? installmentAmount : 0,
      }));
    }
  }, [formData.totalFees, formData.amountPaid, formData.installmentMonths]);

  // Validate individual fields
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        break;
      case "contact":
        if (!value) {
          error = "Contact number is required.";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Contact number must be 10 digits.";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format.";
        }
        break;
      case "college":
        if (!value) error = "College name is required.";
        break;
      case "branch":
        if (!value) error = "Branch is required.";
        break;
      case "source":
        if (value.length === 0)
          error = "Please select how you found out about us.";
        break;
      case "qualification":
        if (!value) error = "Please select your qualification.";
        break;
      case "otherQualification":
        if (formData.qualification === "Others" && !value)
          error = "Please enter your qualification.";
        break;
      case "courses":
        if (value.length === 0) error = "Please select at least one course.";
        break;
      case "totalFees":
        if (!value) error = "Total fees is required.";
        break;
      case "amountPaid":
        if (!value) error = "Amount paid is required.";
        break;
      case "paymentType":
        if (!value) error = "Please select a payment type.";
        break;
      case "installmentMonths":
        if (value <= 0) error = "Installment months must be greater than 0.";
        break;
      default:
        break;
    }
    return error;
  };

  // Handle Change for Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "source") {
        setFormData((prevState) => {
          const updatedSource = checked
            ? [...prevState.source, value]
            : prevState.source.filter((item) => item !== value);
          return { ...prevState, source: updatedSource };
        });
      } else if (name === "courses") {
        setFormData((prevState) => {
          let updatedCourses = [...prevState.courses];
          if (checked) {
            updatedCourses.push({ courseName: value });
          } else {
            updatedCourses = updatedCourses.filter(
              (course) => course.courseName !== value
            );
          }
          return { ...prevState, courses: updatedCourses };
        });
      }
    } else if (type === "radio") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Real-time validation
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    const finalErrors = Object.keys(formData).reduce((acc, field) => {
      acc[field] = validateField(field, formData[field]);
      return acc;
    }, {});

    // If no errors, submit form
    if (Object.values(finalErrors).every((error) => error === "")) {
      const submissionData = {
        ...formData,
        // Convert source array to a comma-separated string
        source: formData.source.join(", "),
      };
      console.log("Form Data: ", submissionData);

      // Clear form data after successful submission
      setFormData({
        name: "",
        contact: "",
        email: "",
        college: "",
        branch: "",
        source: [],
        qualification: "",
        otherQualification: "", // reset the otherQualification
        courses: [],
        totalFees: "",
        amountPaid: "",
        paymentType: "",
        installmentMonths: 0,
        installments: 0,
      });
    } else {
      setErrors(finalErrors); // Update errors state for final validation feedback
    }
  };

  return (
    <div className="max-w-screen-xl mt-10 mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <Input
            label="Contact No."
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            error={errors.contact}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <Input
            label="Email ID"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* College */}
        <div className="mb-6">
          <Input
            label="College"
            name="college"
            value={formData.college}
            onChange={handleChange}
            error={errors.college}
          />
          {errors.college && (
            <p className="text-red-500 text-sm">{errors.college}</p>
          )}
        </div>

        {/* Branch */}
        <div className="mb-6">
          <Input
            label="Branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            error={errors.branch}
          />
          {errors.branch && (
            <p className="text-red-500 text-sm">{errors.branch}</p>
          )}
        </div>

        {/* How Did You Come to Know About Us */}
        <div className="mb-6">
          <p className="mb-2">How Did You Come to Know About Us?</p>
          {[
            "Google Search",
            "Reference",
            "Newspaper",
            "Seminar",
            "Poster",
            "Hoarding",
            "Others",
          ].map((option) => (
            <Checkbox
              key={option}
              label={option}
              name="source"
              value={option}
              checked={formData.source.includes(option)}
              onChange={handleChange}
            />
          ))}
          {errors.source && (
            <p className="text-red-500 text-sm">{errors.source}</p>
          )}
        </div>

        {/* Qualification */}
        <div className="mb-6">
          <p className="mb-2">Qualification</p>
          {["BE", "BCA", "MCA", "Others"].map((option) => (
            <Radio
              key={option}
              label={option}
              name="qualification"
              value={option}
              checked={formData.qualification === option}
              onChange={handleChange}
            />
          ))}
          {formData.qualification === "Others" && (
            <Input
              label="Other Qualification"
              name="otherQualification"
              value={formData.otherQualification}
              onChange={handleChange}
              error={errors.otherQualification}
            />
          )}
          {errors.qualification && (
            <p className="text-red-500 text-sm">{errors.qualification}</p>
          )}
        </div>

        {/* Courses */}
        <div className="mb-6">
          <p className="mb-2">Courses Registered For</p>
          {[
            "C & Data Structure",
            "C++",
            "C# .Net",
            "ASP .Net",
            "Adv .Net",
            "Java",
            "Adv. Java",
            "Android/IOS Development",
            "Others",
          ].map((course) => (
            <Checkbox
              key={course}
              label={course}
              name="courses"
              value={course}
              checked={formData.courses.some(
                (item) => item.courseName === course
              )}
              onChange={handleChange}
            />
          ))}
          {errors.courses && (
            <p className="text-red-500 text-sm">{errors.courses}</p>
          )}
        </div>

        {/* Total Fees */}
        <div className="mb-6">
          <Input
            label="Total Fees"
            name="totalFees"
            value={formData.totalFees}
            onChange={handleChange}
            error={errors.totalFees}
            type="number"
          />
          {errors.totalFees && (
            <p className="text-red-500 text-sm">{errors.totalFees}</p>
          )}
        </div>

        {/* Amount Paid */}
        <div className="mb-6">
          <Input
            label="Amount Paid"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            error={errors.amountPaid}
            type="number"
          />
          {errors.amountPaid && (
            <p className="text-red-500 text-sm">{errors.amountPaid}</p>
          )}
        </div>

        {/* Payment Type */}
        <div className="mb-6">
          <p className="mb-2">Payment Type</p>
          {["Cash", "Cheque", "Online"].map((option) => (
            <Radio
              key={option}
              label={option}
              name="paymentType"
              value={option}
              checked={formData.paymentType === option}
              onChange={handleChange}
            />
          ))}
          {errors.paymentType && (
            <p className="text-red-500 text-sm">{errors.paymentType}</p>
          )}
        </div>

        {/* Installment Months */}
        <div className="mb-6">
          <Input
            label="Installment Months"
            name="installmentMonths"
            value={formData.installmentMonths}
            onChange={handleChange}
            error={errors.installmentMonths}
            type="number"
            min="1"
          />
          {errors.installmentMonths && (
            <p className="text-red-500 text-sm">{errors.installmentMonths}</p>
          )}
        </div>

        {/* Installments Calculation */}
        {formData.installmentMonths > 0 && (
          <div className="mb-6">
            <p className="text-gray-700">
              Remaining Amount: ₹
              {parseFloat(formData.totalFees) - parseFloat(formData.amountPaid)}
            </p>
            <p className="text-gray-700">
              Installment per Month: ₹{formData.installments}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" className="mt-2 bg-gray-900 text-md">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
