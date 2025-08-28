import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "./common/http-common";
import { getCurrentUser } from "../services/auth.service";

interface EditFormProps {
  aid: any;
  isNew: boolean;
}

const EditForm: React.FC<EditFormProps> = ({ aid, isNew }) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const aa: any = JSON.parse(localStorage.getItem("e") || "{}");

  const [formValues, setFormValues] = useState({
    title: aa?.title || "",
    alltext: aa?.alltext || "",
    summary: aa?.summary || "",
    description: aa?.description || "",
    imageurl: aa?.imageurl || "",
    category: aa?.category || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setFormValues({ ...formValues, category: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const currentUser = getCurrentUser();
    const payload = { ...formValues, authorid: currentUser.id };

    try {
      if (!isNew) {
        await axios.put(`${api.uri}/articles/${aid}`, payload, {
          headers: { Authorization: `Basic ${localStorage.getItem("aToken")}` },
        });
        alert("Article updated");
      } else {
        await axios.post(`${api.uri}/articles`, payload, {
          headers: { Authorization: `Basic ${localStorage.getItem("aToken")}` },
        });
        alert("New article created");
      }
      localStorage.removeItem("e");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save article, check network or inputs.");
    } finally {
      setLoading(false);
      setIsShow(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsShow(true)}
        className="flex items-center px-3 py-2 bg-fire-bush-300 text-white rounded-lg hover:bg-fire-bush-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.5 2.5l3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        {isNew ? "Create" : "Edit"}
      </button>

      {isShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl overflow-y-auto max-h-[90vh] p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsShow(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isNew ? "Create New Article" : "Update Article"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-bush-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Category</label>
                <select
                  value={formValues.category || selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-bush-500"
                >
                  <option value="">Select category</option>
                  <option value="retrievers">Retrievers</option>
                  <option value="chihuahuas">Chihuahuas</option>
                  <option value="bulldogs">Bulldogs</option>
                  <option value="beagles">Beagles</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">About me</label>
                <textarea
                  name="alltext"
                  rows={3}
                  value={formValues.alltext}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-bush-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Summary</label>
                <textarea
                  name="summary"
                  rows={2}
                  value={formValues.summary}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-bush-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Detail Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formValues.description}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-bush-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageurl"
                  value={formValues.imageurl}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fire-bush-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-fire-bush-500 text-white py-2 rounded-md hover:bg-fire-bush-600 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditForm;
