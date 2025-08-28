import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "./common/http-common";
import { getCurrentUser } from "../services/auth.service";
import EditForm from "./EditForm";
import { DeleteOutlined } from "@ant-design/icons";

const DetailArticle: React.FC = () => {
  const currentUser = getCurrentUser();
  const { aid } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    id: 0,
    title: "",
    alltext: "",
    summary: "",
    imageurl: "",
    authorid: 0,
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    console.log(currentUser)
    axios
      .get(`${api.uri}/articles/${aid}`)
      .then((res) => {
        setArticle(res.data);
        localStorage.setItem("e", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("Error fetching article details", err);
      })
      .finally(() => setLoading(false));
  }, [aid]);

  const handleDelete = () => {
    setDeleted(true);
    axios
      .delete(`${api.uri}/articles/${aid}`, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("aToken")}`,
        },
      })
      .then((res) => {
        if (res.data.message === "removed") {
          alert("This article is removed from the blog list");
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("Check network problems pls.");
        alert("Check network problems");
        setDeleted(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-12 w-12 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full overflow-hidden">
        {article.imageurl && (
          <img
            src={article.imageurl}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">About me</h2>
              <p className="text-gray-600 mt-1">{article.alltext}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700">Summary</h2>
              <p className="text-gray-600 mt-1">{article.summary}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700">Detail Description</h2>
              <p className="text-gray-600 mt-1">{article.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2 bg-fire-bush-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              {/* Rollback icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M3 10l4-4m-4 4l4 4M21 14v7H3v-7"
                />
              </svg>
              Back
            </button>

            {currentUser && currentUser.role === "admin" && (
              <div className="flex space-x-3 items-center">
                {/* Delete button */}
                <button
                  onClick={handleDelete}
                  disabled={deleted}
                  className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
                >
                  <DeleteOutlined className="mr-2" />
                  Delete
                </button>

                <EditForm isNew={false} aid={aid} />


              </div>
            )}
          </div>
        </div>
      </div>




    </div>
  );
};

export default DetailArticle;
