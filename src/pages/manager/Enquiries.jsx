import React, { useState, useEffect } from "react";
import { Input, Select, Option } from "@material-tailwind/react";

export const Enquiries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    college: "",
    branch: "",
    course: "",
    qualification: "",
  });

  const [enquiries, setEnquiries] = useState([
    {
      id: "ENQ001",
      name: "John Doe",
      email: "john@example.com",
      college: "SB Jain Institute",
      branch: "Computer Science",
      courses: [{ courseName: "BTech" }, { courseName: "MCA" }],
      qualification: "BSc Computer Science",
    },
    {
      id: "ENQ002",
      name: "Jane Smith",
      email: "jane@example.com",
      college: "XYZ University",
      branch: "Mechanical Engineering",
      courses: [{ courseName: "BTech" }],
      qualification: "Diploma in Engineering",
    },
    {
      id: "ENQ003",
      name: "Alice Johnson",
      email: "alice@example.com",
      college: "SB Jain Institute",
      branch: "Electrical Engineering",
      courses: [{ courseName: "BTech" }],
      qualification: "BTech Electrical",
    },
    {
      id: "ENQ004",
      name: "Bob Brown",
      email: "bob@example.com",
      college: "ABC College",
      branch: "Civil Engineering",
      courses: [{ courseName: "MTech" }],
      qualification: "MSc Civil Engineering",
    },
  ]);

  const [filteredEnquiries, setFilteredEnquiries] = useState(enquiries);

  // Handle input change for the combined search query (Name/Email)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle input change for ID search
  const handleIdSearchChange = (e) => {
    setIdSearchQuery(e.target.value);
  };

  // Handle select change for other filters (college, branch, course, qualification)
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter enquiries based on the search query and active filters
  const filterEnquiries = () => {
    let filtered = enquiries;

    if (searchQuery) {
      filtered = filtered.filter(
        (enquiry) =>
          enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          enquiry.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (idSearchQuery) {
      filtered = filtered.filter((enquiry) =>
        enquiry.id.toLowerCase().includes(idSearchQuery.toLowerCase())
      );
    }

    if (filters.college) {
      filtered = filtered.filter((enquiry) =>
        enquiry.college.toLowerCase().includes(filters.college.toLowerCase())
      );
    }

    if (filters.branch) {
      filtered = filtered.filter((enquiry) =>
        enquiry.branch.toLowerCase().includes(filters.branch.toLowerCase())
      );
    }

    if (filters.course) {
      filtered = filtered.filter((enquiry) =>
        enquiry.courses.some((course) =>
          course.courseName.toLowerCase().includes(filters.course.toLowerCase())
        )
      );
    }

    if (filters.qualification) {
      filtered = filtered.filter((enquiry) =>
        enquiry.qualification
          .toLowerCase()
          .includes(filters.qualification.toLowerCase())
      );
    }

    setFilteredEnquiries(filtered);
  };

  useEffect(() => {
    filterEnquiries();
  }, [searchQuery, idSearchQuery, filters]);

  return (
    <div className="w-[calc(100%-4rem)] h-auto mt-10 mx-auto p-10 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Enquiries</h1>

      <div className="flex justify-between">
        {/* Search Field for Name/Email */}

        <div className="mb-6">
          <Input
            label="Search by Name or Email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-60"
          />
        </div>

        {/* Search Field for ID */}
        <div className="mb-6">
          <Input
            label="Search by ID"
            value={idSearchQuery}
            onChange={handleIdSearchChange}
            className="w-60"
          />
        </div>

        {/* Filters Section (Select Options) */}
        <div className="mb-6 flex gap-6">
          <div className="flex flex-col">
            <Select
              name="college"
              value={filters.college}
              onChange={handleSelectChange}
              className="w-60"
            >
              <Option value="">Select College</Option>
              <Option value="SB Jain Institute">SB Jain Institute</Option>
              <Option value="XYZ University">XYZ University</Option>
              <Option value="ABC College">ABC College</Option>
            </Select>
          </div>

          <div className="flex flex-col">
            <Select
              name="branch"
              value={filters.branch}
              onChange={handleSelectChange}
              className="w-60"
            >
              <Option value="">Select Branch</Option>
              <Option value="Computer Science">Computer Science</Option>
              <Option value="Mechanical Engineering">
                Mechanical Engineering
              </Option>
              <Option value="Electrical Engineering">
                Electrical Engineering
              </Option>
              <Option value="Civil Engineering">Civil Engineering</Option>
            </Select>
          </div>

          <div className="flex flex-col">
            <Select
              name="course"
              value={filters.course}
              onChange={handleSelectChange}
              className="w-60"
            >
              <Option value="">Select Course</Option>
              <Option value="BTech">BTech</Option>
              <Option value="MCA">MCA</Option>
              <Option value="MTech">MTech</Option>
              <Option value="Diploma in Engineering">
                Diploma in Engineering
              </Option>
            </Select>
          </div>

          <div className="flex flex-col">
            <Select
              name="qualification"
              value={filters.qualification}
              onChange={handleSelectChange}
              className="w-60"
            >
              <Option value="">Select Qualification</Option>
              <Option value="BSc Computer Science">BSc Computer Science</Option>
              <Option value="BTech Electrical">BTech Electrical</Option>
              <Option value="Diploma in Engineering">
                Diploma in Engineering
              </Option>
              <Option value="MSc Civil Engineering">
                MSc Civil Engineering
              </Option>
            </Select>
          </div>
        </div>
      </div>
      {/* Enquiries Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">College</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Courses</th>
              <th className="px-4 py-2">Qualification</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td className="px-4 py-2">{enquiry.name}</td>
                  <td className="px-4 py-2">{enquiry.email}</td>
                  <td className="px-4 py-2">{enquiry.id}</td>
                  <td className="px-4 py-2">{enquiry.college}</td>
                  <td className="px-4 py-2">{enquiry.branch}</td>
                  <td className="px-4 py-2">
                    {enquiry.courses
                      .map((course) => course.courseName)
                      .join(", ")}
                  </td>
                  <td className="px-4 py-2">{enquiry.qualification}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
