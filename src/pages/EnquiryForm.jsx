import React, { useState } from "react";
import { Input, Button, Checkbox, Radio } from "@material-tailwind/react";

export const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: [],
    qualification: "", // No otherQualification field here
    courses: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    source: "",
    qualification: "",
    courses: "",
  });

  const [otherQualification, setOtherQualification] = useState(""); // Separate state for 'Others' input

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
      case "courses":
        if (value.length === 0) error = "Please select at least one course.";
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
        qualification: value,
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
        qualification:
          formData.qualification === "Others" && otherQualification
            ? otherQualification
            : formData.qualification,
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
        courses: [],
      });
      setOtherQualification(""); // Reset otherQualification field after submission
    } else {
      setErrors(finalErrors); // Update errors state for final validation feedback
    }
  };

  return (
    <div className="max-w-screen-xl mt-10 mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Enquiry Form</h1>
      <form onSubmit={handleSubmit}>
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
            <div className="mt-4">
              <Input
                label="Specify Other Qualification"
                value={otherQualification}
                onChange={(e) => setOtherQualification(e.target.value)}
              />
            </div>
          )}
          {errors.qualification && (
            <p className="text-red-500 text-sm">{errors.qualification}</p>
          )}
        </div>

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

        <div className="text-center">
          <Button type="submit" className="mt-2 bg-gray-900 text-md">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
