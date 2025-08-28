import React from "react";
import { getCurrentUser } from "../services/auth.service";
import SearchUser from "../components/userSearch";
import ImageUpload from "../components/ImageUpload";
import EditForm from "../components/EditForm";
import { Table, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Banner } from "../components/Banner";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/");
    return null;
  }

  const dataSource = [
    { key: "1", label: "UserID", value: currentUser.id },
    { key: "2", label: "Username", value: currentUser.username },
    { key: "3", label: "Email", value: currentUser.email },
    { key: "4", label: "About me", value: currentUser.about },
    { key: "5", label: "Avatar", value: <Avatar className="bg-orange-500" icon={<UserOutlined />} /> },
    { key: "6", label: "Role", value: currentUser.role },
    { key: "7", label: "Login token", value: localStorage.getItem("aToken")?.substring(0, 20) },
  ];

  const columns = [
    { title: "", dataIndex: "label", key: "label", render: text => <strong>{text}:</strong> },
    { title: "", dataIndex: "value", key: "value" },
  ];

  return (
    <>
      <Banner bannerTitle="Profile" />
      <div className="mx-auto mt-6 mb-6 px-4 md:px-8">
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            showHeader={false}
            bordered
            className="bg-white"
          />
        </div>

        {currentUser.role === "admin" && (
          <div className="">
            {/* Search User - full width */}
       
              <SearchUser authbasic={`${currentUser.atoken}`} />


            <div className="flex w-full">
              {/* <div className="bg-white shadow-md rounded-xl p-6">
                <ImageUpload />
              </div> */}
              </div>
              <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
                <EditForm isNew={true} aid="" />
                <h3 className="mt-4 text-lg font-semibold text-gray-700">Create New Article</h3>
              </div>
            </div>
          
        )}
      </div>
    </>
  );
};

export default Profile;
