import { useEffect, useState } from "react";
import { getEnquiries } from "../../../api/apiData";
import { useQuery } from "@tanstack/react-query";
import { SearchInput } from "./SearchInput";
import { FilterSelect } from "./FilterSelect";
import { EnquiriesTable } from "./EnquiriesTable";

export const Enquiries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    college: "",
    branch: "",
    course: "",
    qualification: "",
  });

  const [enquiries, setEnquiries] = useState([]);
  const jwt = localStorage.getItem("jwt");

  const getAllEnquiries = async () => {
    try {
      const res = await getEnquiries(jwt);
      return res?.data?.data || [];
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      return [];
    }
  };

  const { data } = useQuery({
    queryKey: ["enquiries"],
    queryFn: getAllEnquiries,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (data) {
      const reversedData = [...data].reverse();
      setEnquiries(reversedData);
    }
  }, [data]);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    let matches = true;

    if (searchQuery) {
      matches =
        enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (matches && idSearchQuery) {
      matches = enquiry.id.toString().includes(idSearchQuery);
    }

    if (matches && filters.college) {
      matches = enquiry.college
        ?.toLowerCase()
        .includes(filters.college.toLowerCase());
    }

    if (matches && filters.branch) {
      matches = enquiry.branch
        ?.toLowerCase()
        .includes(filters.branch.toLowerCase());
    }

    if (matches && filters.course) {
      matches = enquiry.courses.some((course) =>
        course.courseName.toLowerCase().includes(filters.course.toLowerCase())
      );
    }

    if (matches && filters.qualification) {
      matches = enquiry.qualification
        ?.toLowerCase()
        .includes(filters.qualification.toLowerCase());
    }

    return matches;
  });

  const handleSelectChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-[95%] mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        Enquiries
      </h1>

      {/* Filters and Search Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <div>
          <SearchInput
            label="Search by Name or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <SearchInput
            label="Search by ID"
            value={idSearchQuery}
            onChange={(e) => setIdSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <FilterSelect
            name="college"
            value={filters.college}
            onChange={handleSelectChange}
            options={["SB Jain Institute", "XYZ University", "ABC College"]}
            className="w-full"
          />
        </div>
        <div>
          <FilterSelect
            name="branch"
            value={filters.branch}
            onChange={handleSelectChange}
            options={[
              "Computer Science",
              "Mechanical Engineering",
              "Electrical Engineering",
              "Civil Engineering",
            ]}
            className="w-full"
          />
        </div>
        <div>
          <FilterSelect
            name="course"
            value={filters.course}
            onChange={handleSelectChange}
            options={["BTech", "MCA", "MTech", "Diploma in Engineering"]}
            className="w-full"
          />
        </div>
        <div>
          <FilterSelect
            name="qualification"
            value={filters.qualification}
            onChange={handleSelectChange}
            options={[
              "BSc Computer Science",
              "BTech Electrical",
              "Diploma in Engineering",
              "MSc Civil Engineering",
            ]}
            className="w-full"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="overflow-x-auto">
        <EnquiriesTable enquiries={filteredEnquiries} />
      </div>
    </div>
  );
};
