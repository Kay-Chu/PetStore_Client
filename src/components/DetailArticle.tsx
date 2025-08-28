import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "./common/http-common";
import { getCurrentUser } from "../services/auth.service";
import EditForm from "./EditForm";

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
    console.log(  currentUser)
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
    <>
      <h2 style={{ color: 'red' }}> Welcome to Blog Dashboard</h2>   
      
            <Col  span={24} >                                   
             <Card title={article.title} style={{width: 300,marginLeft:"100px"}}
                   cover={<img alt="put image here" src={article.imageurl} />} hoverable
                  
                   actions={[
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===article.authorid)&&<EditForm  isNew={false} aid={aid}/>,  
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===article.authorid)&& <Icon  style={{ fontSize: '32px', }} onClick={()=>handleDelete()}/>
                  ]} 
                   >               
                  <div> <h3>About me</h3>
                   <p>{article.alltext}</p>
                   <h3>Summary</h3>
                   <p>{article.summary}</p>
                   <h3>Detail Description</h3>
                   <p> {article.description}</p>
                   <Button  
        type="primary"
        icon={<RollbackOutlined />}
        onClick={() => navigate(-1)} 
      /></div> 
                 
                </Card>
               </Col>
      
    </>
  );
            </div>

 }
}
              <p className="text-gray-600 mt-1">{article.description}</p>
              </svg>
              Back
            </button>

            {currentUser&&currentUser.role==="admin" && (
      <div className="flex space-x-3 items-center">
        {/* Always render EditForm */}
        <EditForm isNew={false} aid={aid} />

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={deleted}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.366-.446.958-.482 1.329 0l7.418 9.184c.36.447.074 1.117-.466 1.117H1.305c-.54 0-.826-.67-.466-1.117l7.418-9.184z"
              clipRule="evenodd"
            />
          </svg>
          Delete
        </button>
      </div>
    )}
          </div>
        </div>
      </div>

       
     
  
    </div>
  );
};

export default DetailArticle;
