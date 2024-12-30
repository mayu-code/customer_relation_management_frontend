import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import {
  getRegistrations,
  searchById,
  searchByName,
  getAllCollege,
  getAllBranch,
  getAllQualification,
} from "../../../api/apiData";
import { RegistrationFilters } from "./RegistrationFilters";
import { RegistrationTable } from "./RegistrationTable";
import { debounce } from "lodash";

export const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    college: "",
    branch: "",
    qualification: "",
  });

  // Fetching the list of colleges, branches, and qualifications dynamically
  const { data: collegesData, isLoading: loadingColleges } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const jwt = localStorage.getItem("jwt");
      const res = await getAllCollege(jwt);
      return res?.data?.data || [];
    },
  });

  const { data: branchesData, isLoading: loadingBranches } = useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const jwt = localStorage.getItem("jwt");
      const res = await getAllBranch(jwt);
      return res?.data?.data || [];
    },
  });

  const { data: qualificationsData, isLoading: loadingQualifications } =
    useQuery({
      queryKey: ["qualifications"],
      queryFn: async () => {
        const jwt = localStorage.getItem("jwt");
        const res = await getAllQualification(jwt);
        return res?.data?.data || [];
      },
    });

  const { data, isLoading, error } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const jwt = localStorage.getItem("jwt");
      const res = await getRegistrations(jwt);
      return res?.data?.data || [];
    },
  });

  useEffect(() => {
    if (data) {
      // Reverse the order of registrations to show most recent first
      const reversedRegistrations = [...data].reverse();
      setRegistrations(reversedRegistrations);
      setFilteredRegistrations(reversedRegistrations);
    }
  }, [data]);

  const searchByNameDebounced = useCallback(
    debounce(async (name) => {
      const jwt = localStorage.getItem("jwt");
      try {
        const response = await searchByName(jwt, name);
        setFilteredRegistrations(response.data.data || []);
      } catch (error) {
        console.error("Error searching by name:", error);
      }
    }, 300), // 300ms debounce delay
    []
  );

  const searchByIdDebounced = useCallback(
    debounce(async (id) => {
      const jwt = localStorage.getItem("jwt");
      try {
        const response = await searchById(jwt, id);
        setFilteredRegistrations(response.data.data || []);
      } catch (error) {
        console.error("Error searching by ID:", error);
      }
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    if (searchQuery) {
      searchByNameDebounced(searchQuery);
    } else {
      setFilteredRegistrations(registrations);
    }
  }, [searchQuery, registrations, searchByNameDebounced]);

  useEffect(() => {
    if (idSearchQuery) {
      searchByIdDebounced(idSearchQuery);
    } else {
      setFilteredRegistrations(registrations);
    }
  }, [idSearchQuery, registrations, searchByIdDebounced]);

  useEffect(() => {
    const filterRegistrations = () => {
      let filtered = registrations;

      if (filters.college) {
        filtered = filtered.filter((registration) =>
          registration.college
            .toLowerCase()
            .includes(filters.college.toLowerCase())
        );
      }

      if (filters.branch) {
        filtered = filtered.filter((registration) =>
          registration.branch
            .toLowerCase()
            .includes(filters.branch.toLowerCase())
        );
      }

      if (filters.qualification) {
        filtered = filtered.filter((registration) =>
          registration.qualification
            .toLowerCase()
            .includes(filters.qualification.toLowerCase())
        );
      }

      setFilteredRegistrations(filtered);
    };

    filterRegistrations();
  }, [filters, registrations]);

  if (
    isLoading ||
    loadingColleges ||
    loadingBranches ||
    loadingQualifications
  ) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading registrations: {error.message}</div>;
  }

  return (
    <div className="w-[calc(100%-4rem)] h-auto mt-10 mx-auto p-10 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Registrations</h1>
      <RegistrationFilters
        searchQuery={searchQuery}
        idSearchQuery={idSearchQuery}
        filters={filters}
        setSearchQuery={setSearchQuery}
        setIdSearchQuery={setIdSearchQuery}
        setFilters={setFilters}
        colleges={collegesData}
        branches={branchesData}
        qualifications={qualificationsData}
      />
      <RegistrationTable registrations={filteredRegistrations} />
    </div>
  );
};
