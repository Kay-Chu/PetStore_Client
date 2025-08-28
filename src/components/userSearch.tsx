import "antd/dist/reset.css";
import { useState, useEffect } from "react";
import { Input, message, Typography, Table, Select } from "antd";
import { api } from "./common/http-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const { Column } = Table;
const { Search } = Input;
const { Title } = Typography;

interface SearchUserProps {
  authbasic: string;
}

const SearchUser: React.FC<SearchUserProps> = ({ authbasic }) => {
  const navigate = useNavigate();
  const [press, setPress] = useState("all");
  const [usersData, setUsers] = useState([]);
  const [isSearchOK, setSearch] = useState(false);

  const fetchUsers = async (value: string = "") => {
    if (press !== "all" && value.length < 3 && value !== "") {
      message.warning(
        "Please enter at least three characters to search by email or username"
      );
      return;
    }

    let urlPath = `${api.uri}/users`;
    if (press === "email" || press === "username") urlPath += `/?fields=${press}&q=${value}`;
    else if (press === "username&fields=email" && value === "")
      urlPath += `/?fields=${press}`;

    try {
      const data = await axios.get(urlPath, {
        headers: { Authorization: `Basic ${localStorage.getItem("aToken")}` },
      });

      if (!data.data.length) {
        message.info("No data found");
        setUsers([]);
        setSearch(false);
        return;
      }

      setUsers(data.data);
      setSearch(true);
    } catch (err) {
      console.log("Error fetching users", err);
      message.error("Network error. Please try again.");
    }
  };

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, [press]);

  return (
    <div className="flex flex-col items-center py-10 ">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-8 space-y-6">
        <div className="space-y-1">
          <Title level={3} className="text-fire-bush-800">
            User Accounts
          </Title>
          <Title level={5} className="text-gray-700">
            Manage User Info
          </Title>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <Search
            placeholder="Search Users"
            allowClear
            enterButton={
              <button className="bg-fire-bush-500 text-white ml-2 rounded-md hover:bg-fire-bush-600 transition">
                Search
              </button>
            }
            size="large"
            onSearch={fetchUsers}
            className="flex-1"
          />

          <Select
            defaultValue="all"
            className="w-full md:w-72"
            onChange={(value) => setPress(value)}
          >
            <Select.Option value="username">Username</Select.Option>
            <Select.Option value="email">Email</Select.Option>
            <Select.Option value="username&fields=email">
              Get all-filter by username & email
            </Select.Option>
            <Select.Option value="all">Get all-without filter</Select.Option>
          </Select>
        </div>

        {isSearchOK && (
          <Table
            dataSource={usersData}
            rowKey="id"
            className="mt-6"
            pagination={{ pageSize: 5 }}
          >
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="Username" dataIndex="username" key="username" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Role" dataIndex="role" key="role" />
          </Table>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
