import { Input, Select, Option } from "@material-tailwind/react";

export const RegistrationFilters = ({
  searchQuery,
  idSearchQuery,
  filters,
  setSearchQuery,
  setIdSearchQuery,
  setFilters,
  colleges = [], // Default to empty array if undefined
  branches = [], // Default to empty array if undefined
  qualifications = [], // Default to empty array if undefined
}) => {
  // Handle changes for each filter field
  const handleCollegeChange = (value) => {
    // console.log("Selected College:", value); // Debugging
    setFilters((prev) => {
      console.log("Updated filters:", { ...prev, college: value }); // Debugging
      return { ...prev, college: value };
    });
  };

  const handleBranchChange = (value) => {
    // console.log("Selected Branch:", value); // Debugging
    setFilters((prev) => ({ ...prev, branch: value }));
  };

  const handleQualificationChange = (value) => {
    // console.log("Selected Qualification:", value); // Debugging
    setFilters((prev) => ({ ...prev, qualification: value }));
  };

  // console.log("Current Filters:", filters); // Debugging

  return (
    <div className="flex gap-5 mb-5">
      <div>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Search by Name"
          outline
        />
      </div>

      <div>
        <Input
          type="text"
          value={idSearchQuery}
          onChange={(e) => setIdSearchQuery(e.target.value)}
          label="Search by ID"
          outline
        />
      </div>

      {/* College Select */}
      <div>
        <Select
          value={filters.college} // Ensures value is correctly passed
          onChange={(value) => handleCollegeChange(value)} // Directly pass the value
          label="Select College"
          variant="outlined"
        >
          <Option value="">Select College</Option>
          {colleges.length > 0 ? (
            colleges.map((college, index) => (
              <Option key={index} value={college}>
                {college}
              </Option>
            ))
          ) : (
            <Option value="">No Colleges Available</Option>
          )}
        </Select>
      </div>

      {/* Branch Select */}
      <div>
        <Select
          value={filters.branch || ""} // Ensures value is correctly passed
          onChange={(value) => handleBranchChange(value)} // Directly pass the value
          label="Select Branch"
          variant="outlined"
        >
          <Option value="">Select Branch</Option>
          {branches.length > 0 ? (
            branches.map((branch, index) => (
              <Option key={index} value={branch}>
                {branch}
              </Option>
            ))
          ) : (
            <Option value="">No Branches Available</Option>
          )}
        </Select>
      </div>

      {/* Qualification Select */}
      <div>
        <Select
          value={filters.qualification || ""} // Ensures value is correctly passed
          onChange={(value) => handleQualificationChange(value)} // Directly pass the value
          label="Select Qualification"
          variant="outlined"
        >
          <Option value="">Select Qualification</Option>
          {qualifications.length > 0 ? (
            qualifications.map((qualification, index) => (
              <Option key={index} value={qualification}>
                {qualification}
              </Option>
            ))
          ) : (
            <Option value="">No Qualifications Available</Option>
          )}
        </Select>
      </div>
    </div>
  );
};
