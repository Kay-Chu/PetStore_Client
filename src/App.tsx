import "./App.css";
import "antd/dist/reset.css";
import { Layout, Space, Col, FloatButton, Input, Button } from "antd";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
//import Landing from "./components/Landing"
import * as AuthService from "./services/auth.service";
import UserT from "./types/user.type";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventBus from "./components/common/EventBus";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import DetailArticle from "./components/DetailArticle";
import Profile from "./pages/Profile";
import FavPage from "./pages/favpage";
import {
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  HeartFilled,
  SearchOutlined,
} from "@ant-design/icons";
import Copyright from "./components/Copyright";
import React from "react";
import Navbar from "./Navbar";
import { gapi } from "gapi-script";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserT | undefined>(undefined);
  

  useEffect(() => {

    function start() {
      gapi.client.init({
        clientId: "729034240613-tcafn21qn8h2tm47l1uer6lo84hui2l7.apps.googleusercontent.com",
        scope: ""
      })
    };
    gapi.load('client:auth2',start);
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    
    AuthService.logout();
    setCurrentUser(undefined);


  };

  return (
    <div>
    <Router>
      <Layout>
        <Navbar currentUser={currentUser} logOut={logOut} />
        <Content className="flex flex-col min-h-screen">

            <Routes>

              <Route path="/" element={<Home />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/about" element={<About />} />
              <Route path="/:aid" element={<DetailArticle />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favpage" element={<FavPage />} />
            </Routes>

        </Content>
        <Footer className="bg-fire-bush-500 w-full py-4 text-center">
          <div >
            <Copyright />
            <img
              src="/src/assets/icon.png"
              alt="profile-img"
              className="profile-img-card"
              style={{ float: "right", height: "1.2rem" }}
            />
          </div>
        </Footer>
        <FloatButton.BackTop />
      </Layout>
    </Router>
    </div>
  );
  
}
