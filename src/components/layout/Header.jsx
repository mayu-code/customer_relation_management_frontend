import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { ProfileAvatar } from "../ui/Avatar";
import { useSelector } from "react-redux";
import { decryptData } from "../../security/Encryption";

function NavListMenu() {
  const navListMenuItems = [
    {
      title: "Products",
      description: "Find the perfect solution for your needs.",
    },
    { title: "About Us", description: "Meet and learn about our dedication" },
    { title: "Contact", description: "Reach out for assistance or inquiries" },
  ];

  const renderItems = navListMenuItems.map(({ title, description }, key) => (
    <MenuItem key={key} className="flex items-center gap-3 rounded-lg">
      <div>
        <Typography variant="h6" className="text-sm font-bold">
          {title}
        </Typography>
        <Typography className="text-xs text-gray-500">{description}</Typography>
      </div>
    </MenuItem>
  ));

  return (
    <Menu>
      <MenuHandler>
        <Typography as="div" variant="lg" className="font-medium">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Resources
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
        <ul className="grid grid-cols-3 gap-y-2">{renderItems}</ul>
      </MenuList>
    </Menu>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 lg:mt-0 lg:mb-0 lg:flex-row">
      <NavLink to="/">
        <ListItem className="py-2 pr-4">Home</ListItem>
      </NavLink>
      <NavListMenu />
      <NavLink to="/contact-us">
        <ListItem className="py-2 pr-4">Contact Us</ListItem>
      </NavLink>
    </List>
  );
}

export const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const userState = useSelector((state) => state.userReducer.user);
  const user = userState ? decryptData(userState) : null;

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Navbar className="sticky top-2 z-50 mx-auto max-w-full px-4 py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <NavLink to="/" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          <Typography variant="h6">Customer Relation Management</Typography>
        </NavLink>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <ProfileAvatar user={user} />
          ) : (
            <>
              <NavLink to="/manager-login">
                <Button variant="text" size="md" color="blue-gray">
                  Log In
                </Button>
              </NavLink>
              <NavLink to="/manager-register">
                <Button variant="filled" size="md">
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {user ? (
            <ProfileAvatar />
          ) : (
            <>
              <NavLink to="/manager-login">
                <Button
                  variant="outlined"
                  size="sm"
                  color="blue-gray"
                  fullWidth
                >
                  Log In
                </Button>
              </NavLink>
              <NavLink to="/manager-register">
                <Button variant="filled" size="sm" fullWidth>
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
};
