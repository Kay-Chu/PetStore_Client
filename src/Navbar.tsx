import {
  HomeOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  HeartFilled,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import React, { useState } from "react";
import { logout } from "./services/auth.service";

const Navbar = ({ currentUser, logOut }) => {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => setVisible(!visible);

  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center w-full px-12">
        {/* Left side navigation - Desktop */}
        <div className="flex items-center space-x-6">
          <Link to={"/"}>
            <img
              src="/src/assets/small_Coventry_University.png"
              alt="profile-img"
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center hover:text-blue-300">
              <HomeOutlined className="mr-1" /> Home
            </Link>
            <Link to="/dashboard" className="flex items-center hover:text-blue-300">
              <DashboardOutlined className="mr-1" /> Dashboard
            </Link>
            <Link to="/about" className="flex items-center hover:text-blue-300">
              <InfoCircleOutlined className="mr-1" /> About
            </Link>
          </div>
        </div>

        {/* Right side navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {currentUser ? (
            <>
              <Link to="/profile" className="flex items-center hover:text-blue-300">
                <UserOutlined className="mr-1" />
                {currentUser.username}
              </Link>
              <Link to="/favpage" className="flex items-center hover:text-blue-300">
                <HeartFilled className="mr-1" /> Favorites
              </Link>
              <Link to="/" onClick={logOut} className="flex items-center hover:text-blue-300">
                <LogoutOutlined className="mr-1" /> Logout
              </Link>
            </>
          ) : (
            <>
              <Login />
              <Link to="/register" className="hover:text-blue-300">Register</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            type="primary"
            onClick={toggleDrawer}
            className="bg-blue-500 border-blue-500"
          >
            <MenuOutlined />
          </Button>
        </div>

        {/* Mobile drawer */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          open={visible}
        >
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={toggleDrawer} className="flex items-center text-gray-800 hover:text-blue-500">
              <HomeOutlined className="mr-2" /> Home
            </Link>
            <Link to="/dashboard" onClick={toggleDrawer} className="flex items-center text-gray-800 hover:text-blue-500">
              <DashboardOutlined className="mr-2" /> Dashboard
            </Link>
            <Link to="/about" onClick={toggleDrawer} className="flex items-center text-gray-800 hover:text-blue-500">
              <InfoCircleOutlined className="mr-2" /> About
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/profile" onClick={toggleDrawer} className="flex items-center text-gray-800 hover:text-blue-500">
                  <UserOutlined className="mr-2" />
                  {currentUser.username}
                </Link>
                <Link to="/favpage" onClick={toggleDrawer} className="flex items-center text-gray-800 hover:text-blue-500">
                  <HeartFilled className="mr-2" /> Favorites
                </Link>
                <div
                  className="flex items-center text-gray-800 hover:text-blue-500 cursor-pointer"
                  onClick={() => {
                    logOut();
                    toggleDrawer();
                  }}
                >
                  <LogoutOutlined className="mr-2" /> Logout
                </div>
              </>
            ) : (
              <>
                <div onClick={toggleDrawer}>
                  <Login />
                </div>
                <Link to="/register" onClick={toggleDrawer} className="text-gray-800 hover:text-blue-500">
                  Register
                </Link>
              </>
            )}
          </div>
        </Drawer>
      </header>
    </>
  );
};
export default Navbar;