import "antd/dist/reset.css";
import React, { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal, Divider } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../services/auth.service";
import GoogleAuth from "../components/GoogleAuth";

const Login: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isShow, setIsShow] = React.useState(false);
  const onFinish = (values: any) => {
    const { username, password } = values;

    setMessage("");
    setLoading(true);

    login(username, password)
      .then(() => {
        if (localStorage.getItem("user")) navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        window.alert(
          `Sorry ${username} you may not have account in our system yet! pls try again or register first`
        );
        console.log(error.toString());
        setLoading(false);
        setMessage(resMessage);
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <>
      <Button
        icon={<LoginOutlined />}
        onClick={() => {
          setIsShow(true);
        }}
      />

      <Modal
        open={isShow}
        onCancel={() => {
          setIsShow(false);
        }}
        title="Welcome Blogger"
        footer={[]}
      >
        <div className="container">
          <div className="center_content">
            <Form
              name="normal_login"
              layout="vertical"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              style={{ display: "block", width: "100%" }}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                >
                  Log in
                </Button>
              </Form.Item>
              Do not have an account? <a href="/register">Register now!</a>
              <Divider />
              <Form.Item  style={{ width: "100%" }}>
                <GoogleAuth />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
