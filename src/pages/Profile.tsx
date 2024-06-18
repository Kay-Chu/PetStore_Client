import React from "react";
import { getCurrentUser } from "../services/auth.service";
import SearchUser from "../components/userSearch";
import ImageUpload from "../components/ImageUpload";
import { Row, Col, Space, Avatar, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import EditForm from "../components/EditForm";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/");
    return null;  // Prevents rendering flash before redirect
  }

  const dataSource = [
    { key: '1', label: 'UserID', value: currentUser.id },
    { key: '2', label: 'Username', value: currentUser.username },
    { key: '3', label: 'Email', value: currentUser.email },
    { key: '4', label: 'About me', value: currentUser.about },
    { key: '5', label: 'Avatar', value: <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} /> },
    { key: '6', label: 'Role', value: currentUser.role },
    { key: '7', label: 'Login token', value: localStorage.getItem("aToken")?.substring(0, 20) },
  ];

  const columns = [
    { title: '', dataIndex: 'label', key: 'label', render: text => <strong>{text}:</strong> },
    { title: '', dataIndex: 'value', key: 'value' },
  ];

  return (
    <div className="profile-container" style={{ padding: 20 }}>
      <h2 style={{ color: "#135200" }}><strong>Profile</strong></h2>
      <h3>Current User: {currentUser.username}</h3>
      <Table dataSource={dataSource} columns={columns} pagination={false} showHeader={false} bordered />
      
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {currentUser.role === "admin" && (
          <>
            <Col span={8}><SearchUser authbasic={`${currentUser.atoken}`} /></Col>
            <Col span={8}><ImageUpload /></Col>
            <Col span={8}>
              <EditForm isNew={true} aid={""} />
              <h3>Create New Article</h3>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default Profile;
