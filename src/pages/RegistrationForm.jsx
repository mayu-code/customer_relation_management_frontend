import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, Radio } from "@material-tailwind/react";
import { getCources, sendRegistrationForm } from "../api/apiData";
import { useQuery } from "@tanstack/react-query";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: [],
    qualification: "",
    otherQualification: "", // used to store other qualification if "Others" is selected
    registeredCourses: [], // changed from 'courses' to 'registeredCourses'
    totalFees: 0,
    amountPaid: "",
    paymentType: "",
    installmentMonths: 0,
    installments: 0,
  });

  const paymentTypes = ["CASH", "CHEQUE", "ONLINE"];

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: "",
    qualification: "",
    otherQualification: "",
    registeredCourses: "", // changed from 'courses' to 'registeredCourses'
    totalFees: "",
    amountPaid: "",
    paymentType: "",
    installmentMonths: "",
  });

  // Calculate Installments based on Total Fees, Amount Paid, and Installment Months
  useEffect(() => {
    if (
      formData.totalFees > 0 &&
      formData.amountPaid >= 0 &&
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
      case "registeredCourses": // updated from 'courses' to 'registeredCourses'
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

  const getAllCources = async () => {
    try {
      const res = await getCources();
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["cources"],
    queryFn: getAllCources,
  });

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
      } else if (name === "registeredCourses") {
        // updated from 'courses' to 'registeredCourses'
        setFormData((prevState) => {
          let updatedCourses = [...prevState.registeredCourses];
          if (checked) {
            const selectedCourse = data.find(
              (course) => course.courseName === value
            );
            updatedCourses.push({
              courseName: value,
              price: selectedCourse.price,
            });
          } else {
            updatedCourses = updatedCourses.filter(
              (course) => course.courseName !== value
            );
          }
          const newTotalFees = updatedCourses.reduce(
            (total, course) => total + course.price,
            0
          );
          return {
            ...prevState,
            registeredCourses: updatedCourses, // updated from 'courses' to 'registeredCourses'
            totalFees: newTotalFees,
          };
        });
      }
    } else if (type === "radio") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value, // No .toUpperCase() here
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const jwt = localStorage.getItem("jwt");

  const createRegistration = async (formReq) => {
    try {
      const res = await sendRegistrationForm(jwt, formReq);
      // console.log(res);

      return alert(res?.data?.message);
    } catch (error) {
      console.log(error);
      return alert("Error submitting form: " + error.message);
    }
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
        // If qualification is "Others", replace it with otherQualification (send only qualification)
        qualification:
          formData.qualification === "Others"
            ? formData.otherQualification
            : formData.qualification,
        // Send registeredCourses without course id, only courseName and price
        registeredCourses: formData.registeredCourses.map((course) => ({
          courseName: course.courseName,
          price: course.price,
        })),
      };

      // Remove otherQualification from submission data
      delete submissionData.otherQualification;

      console.log("Form Data: ", submissionData);

      createRegistration(submissionData);

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
        registeredCourses: [], // reset registeredCourses
        totalFees: 0,
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
              label="Enter Other Qualification"
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

        {/* Registered Courses */}
        <div className="mb-6">
          <p className="mb-2">Select Courses</p>
          {data &&
            data.map((course) => (
              <Checkbox
                key={course.courseName}
                label={course.courseName}
                name="registeredCourses" // updated from 'courses' to 'registeredCourses'
                value={course.courseName}
                checked={formData.registeredCourses.some(
                  (item) => item.courseName === course.courseName
                )}
                onChange={handleChange}
              />
            ))}
          {errors.registeredCourses && (
            <p className="text-red-500 text-sm">{errors.registeredCourses}</p>
          )}
        </div>

        {/* Payment Type */}
        <div className="mb-6">
          <p className="mb-2">Payment Type</p>
          {paymentTypes.map((option) => (
            <Radio
              key={option}
              label={option.toLowerCase()}
              name="paymentType"
              value={option}
              checked={formData.paymentType === option} // Ensure that paymentType matches the selected option
              onChange={handleChange} // This should properly update the state
            />
          ))}
          {errors.paymentType && (
            <p className="text-red-500 text-sm">{errors.paymentType}</p>
          )}
        </div>

        {/* Total Fees */}
        <div className="mb-6">
          <Input
            label="Total Fees"
            type="number"
            name="totalFees"
            value={formData.totalFees}
            onChange={handleChange}
            error={errors.totalFees}
          />
          {errors.totalFees && (
            <p className="text-red-500 text-sm">{errors.totalFees}</p>
          )}
        </div>

        {/* Amount Paid */}
        <div className="mb-6">
          <Input
            label="Amount Paid"
            type="number"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            error={errors.amountPaid}
          />
          {errors.amountPaid && (
            <p className="text-red-500 text-sm">{errors.amountPaid}</p>
          )}
        </div>

        {/* Installment Months */}
        <div className="mb-6">
          <Input
            label="Installment Months"
            type="number"
            name="installmentMonths"
            value={formData.installmentMonths}
            onChange={handleChange}
            error={errors.installmentMonths}
          />
          {errors.installmentMonths && (
            <p className="text-red-500 text-sm">{errors.installmentMonths}</p>
          )}
        </div>

        {/* Installments */}
        <div className="mb-6">
          <Input
            label="Installments"
            type="number"
            name="installments"
            value={formData.installments}
            readOnly
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
