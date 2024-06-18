import {
  HomeOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  HeartFilled,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import React, { useState } from "react";
import { logout } from "./services/auth.service";

const Navbar = ({ currentUser, logOut }) => {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => setVisible(!visible);

  return (
    <>
      <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "min-content",
        }}
      >
        <div className="container">
          <nav>
            <div style={{ float: "left" }}>
              {" "}
              <Space size="middle">
                <Link to={"/"}>
                  <img
                    src="/src/assets/small_Coventry_University.png"
                    alt="profile-img"
                    className="profile-img-card"
                  />
                </Link>
                <Link to="/">
                  <HomeOutlined /> Home
                </Link>
                <Link to="/dashboard">
                  <DashboardOutlined /> Dashboard
                </Link>
                <Link to="/about">
                  <InfoCircleOutlined /> About
                </Link>
              </Space>
            </div>

            <div className="nav_desktop" style={{ flex: 1, float: "right" }}>
              <Space>
                
                {currentUser ? (
                  <>
                    <Link to="/profile" style={{color:"#f1f1f1"}}>
                    <UserOutlined /><b> </b>
                        {currentUser.username}</Link>
                    <Link to="/favpage"  style={{color:"#f1f1f1"}}>
                      <HeartFilled /> Favorites
                    </Link>
                    <Link  to="/">
                    <a onClick={logOut}  style={{color:"#f1f1f1"}}>
                    
                      <LogoutOutlined /> Logout
                    </a>
                    </Link>
                  </>
                ) : (
                  <>
                    <Login />
                    <Link to="/register"  style={{color:"#f1f1f1"}}>Register</Link>
                  </>
                )}
              </Space>
            </div>

            <div className="nav_mobile" style={{ flex: 1, float: "right" }}>
              <div className="logo">
                <Button
                  type="primary"
                  onClick={toggleDrawer}
                  style={{ marginBottom: 16 }}
                >
                  <MenuOutlined />
                </Button>
              </div>
              <Drawer
                title="Menu"
                placement="left"
                onClose={toggleDrawer}
                open={visible}
              >
                <div className="drawer-link">
                  <Link to="/" onClick={toggleDrawer}>
                    <HomeOutlined /> Home
                  </Link>
                </div>
                <div className="drawer-link">
                  <Link to="/dashboard" onClick={toggleDrawer}>
                    <DashboardOutlined /> Dashboard
                  </Link>
                </div>
                <div className="drawer-link">
                  <Link to="/about" onClick={toggleDrawer}>
                    <InfoCircleOutlined /> About
                  </Link>
                </div>
                {currentUser ? (
                  <>
                    <div className="drawer-link" onClick={toggleDrawer}>
                      <Link to="/profile">
                        <UserOutlined />
                        {currentUser.username}</Link>
                    </div>
                    <div className="drawer-link" onClick={toggleDrawer}>
                      <Link to="/favpage">
                        <HeartFilled /> Favorites
                      </Link>
                    </div>
                    <div
                      className="drawer-link"
                      onClick={() => {
                        logOut();
                        toggleDrawer();
                      }}
                    >
                      <Link to="/">
                      <Navigate to="/" replace={true} />
                        <LogoutOutlined /> Logout
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="drawer-link">
                      <Login />
                    </div>
                    <div className="drawer-link" onClick={toggleDrawer}>
                      <Link to="/register"  style={{color:"#f1f1f1"}}>Register</Link>
                    </div>
                  </>
                )}
              </Drawer>
            </div>
          </nav>
        </div>
      </Header>
    </>
  );
};
export default Navbar;
