import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/slice/UserSlice";

export const Sidebar = () => {
  const [open, setOpen] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state to control sidebar visibility

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // localStorage.removeItem("jwt");
    localStorage.clear();
    dispatch(deleteUser());
    // setUser1(null);
    alert("Logout successful!");
    navigate("/admin-login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <div className="lg:hidden p-4">
        <button onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      {/* Sidebar */}
      <Card
        className={`fixed top-4 left-0 h-auto bg-gray-100 shadow-sm transition-transform transform ${
          isSidebarOpen ? "translate-x-0 top-20" : "-translate-x-full"
        } lg:relative lg:translate-x-0 w-64 p-4 mt-1`}
      >
        {/* Close Sidebar Button */}

        <div className="flex justify-between">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>

          <div className="lg:hidden mb-4">
            <button onClick={toggleSidebar}>
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        <List>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <NavLink to="/manager/enquiries">
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Enquiries
            </ListItem>
          </NavLink>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Registrations
          </ListItem>
          <NavLink to="/manager/enquiry-form">
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Enquiry Form
            </ListItem>
          </NavLink>
          <NavLink to="/manager/registration-form">
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Registration Form
            </ListItem>
          </NavLink>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </>
  );
};
