import React, { useState } from "react";

function GradientInfotechForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    branch: "",
    howDidYouKnow: "",
    qualification: "", // Stores selected qualification or input for "Others"
    courses: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQualificationChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      qualification: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      courses: checked
        ? [...prev.courses, name]
        : prev.courses.filter((course) => course !== name),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border border-gray-300 rounded-lg"
    >
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Contact Field */}
      <div className="mb-4">
        <label htmlFor="contact" className="block font-semibold">
          Contact No
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold">
          Email ID
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* College Field */}
      <div className="mb-4">
        <label htmlFor="college" className="block font-semibold">
          College
        </label>
        <input
          type="text"
          id="college"
          name="college"
          value={formData.college}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Branch Field */}
      <div className="mb-4">
        <label htmlFor="branch" className="block font-semibold">
          Branch
        </label>
        <input
          type="text"
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* How Did You Know Section */}
      <div className="mb-4">
        <label className="block font-semibold">
          How Did You Know About Us?
        </label>
        <div>
          <label>
            <input
              type="radio"
              name="howDidYouKnow"
              value="Google Search"
              checked={formData.howDidYouKnow === "Google Search"}
              onChange={handleInputChange}
            />
            Google Search
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="howDidYouKnow"
              value="Reference"
              checked={formData.howDidYouKnow === "Reference"}
              onChange={handleInputChange}
            />
            Reference
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="howDidYouKnow"
              value="Newspaper"
              checked={formData.howDidYouKnow === "Newspaper"}
              onChange={handleInputChange}
            />
            Newspaper
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="howDidYouKnow"
              value="Seminar"
              checked={formData.howDidYouKnow === "Seminar"}
              onChange={handleInputChange}
            />
            Seminar
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="howDidYouKnow"
              value="Poster"
              checked={formData.howDidYouKnow === "Poster"}
              onChange={handleInputChange}
            />
            Poster
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="howDidYouKnow"
              value="Others"
              checked={formData.howDidYouKnow === "Others"}
              onChange={handleInputChange}
            />
            Others
          </label>
        </div>
      </div>

      {/* Qualification Section */}
      <div className="mb-4">
        <label className="block font-semibold">Qualification</label>
        <div>
          <label>
            <input
              type="radio"
              name="qualification"
              value="BE"
              checked={formData.qualification === "BE"}
              onChange={handleQualificationChange}
            />
            BE
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="qualification"
              value="BCA"
              checked={formData.qualification === "BCA"}
              onChange={handleQualificationChange}
            />
            BCA
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="qualification"
              value="MCA"
              checked={formData.qualification === "MCA"}
              onChange={handleQualificationChange}
            />
            MCA
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="qualification"
              value="Others"
              checked={
                formData.qualification !== "BE" &&
                formData.qualification !== "BCA" &&
                formData.qualification !== "MCA"
              }
              onChange={() =>
                setFormData((prev) => ({ ...prev, qualification: "" }))
              }
            />
            Others
          </label>
        </div>
        {formData.qualification !== "BE" &&
          formData.qualification !== "BCA" &&
          formData.qualification !== "MCA" && (
            <div className="mt-2">
              <label htmlFor="qualification" className="block font-semibold">
                Specify Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter your qualification"
              />
            </div>
          )}
      </div>

      {/* Courses Section */}
      <div className="mb-4">
        <label className="block font-semibold">Course Registered For</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="C & Data Structure"
              onChange={handleCheckboxChange}
            />
            C & Data Structure
          </label>
          <label className="ml-4">
            <input type="checkbox" name="C++" onChange={handleCheckboxChange} />
            C++
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              name="Java"
              onChange={handleCheckboxChange}
            />
            Java
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              name="Adv. Java"
              onChange={handleCheckboxChange}
            />
            Adv. Java
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              name="Android/iOS Development"
              onChange={handleCheckboxChange}
            />
            Android/iOS Development
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default GradientInfotechForm;
