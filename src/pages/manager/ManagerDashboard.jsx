import { NavLink } from "react-router-dom";

export const ManagerDashboard = () => {
  const handleActiveLink = ({ isActive }) => (isActive ? "text-blue-800" : "");

  return (
    <div className="flex w-1/6 h-screen">
      <aside className=" bg-gray-900 w-full flex flex-col gap-2 text-white">
        <div className="p-4 text-2xl">
          <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
        </div>
        <div className="text-slate-400 text-xl w-full">
          <nav>
            <ul className=" flex flex-col w-full gap-1 ">
              <NavLink to="/user/profile" className={handleActiveLink}>
                <li className="mb-4 pl-5 py-4 hover:bg-gray-500">Profile</li>
              </NavLink>
              <NavLink
                to="/user/write-application"
                className={handleActiveLink}
              >
                <li className="mb-4 pl-5 py-4 hover:bg-gray-500">
                  Write Application
                </li>
              </NavLink>
              <NavLink to="/user/my-applications" className={handleActiveLink}>
                <li className="pl-5 py-4 hover:bg-gray-500">My Applications</li>
              </NavLink>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};
