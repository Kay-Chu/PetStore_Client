import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "./common/http-common";
import PostIcon from "./posticon";
import Displaycomment from "./comments";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ArticlesProps {
  searchInput: string;
  filter: string;
}

const Article: React.FC<ArticlesProps> = ({ searchInput, filter }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchUrl = `${api.uri}/articles`;
    if (searchInput !== "" && filter !== "") {
      fetchUrl = `${api.uri}/articles/search/${encodeURIComponent(
        searchInput
      )}?filter=${encodeURIComponent(filter.toLowerCase())}`;
    } else if (searchInput !== "") {
      fetchUrl = `${api.uri}/articles/search/${encodeURIComponent(
        searchInput
      )}`;
    } else if (filter !== "") {
      fetchUrl = `${api.uri}/articles/search/?filter=${encodeURIComponent(
        filter.toLowerCase()
      )}`;
    }

    axios
      .get(fetchUrl)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setArticles(res.data);
        } else {
          console.error("Expected an array of articles, but received:", res.data);
          setArticles([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [searchInput, filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        There is no article available now.
      </div>
    );
  }

  return (
    <div className="py-6 max-w-7xl mx-auto space-y-6">
      {articles.map(({ id, title, imageurl, links }) => (
        <div
          key={id}
          className="flex flex-col md:flex-row bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          {imageurl && (
            <img
              src={imageurl}
              alt={title}
              className="w-full md:w-72 h-48 object-cover"
            />
          )}
  
          <div className="flex flex-col flex-grow p-4 justify-between">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
  
            {/* Centered actions */}
            <div className="flex justify-center items-center space-x-6 my-2">
              <PostIcon type="like" countLink={links.likes} id={id} />
              <Displaycomment msgLink={links.msg} id={id} />
              <PostIcon type="heart" FavLink={links.fav} id={id} />
            </div>
  
            {/* Details button as right arrow */}
            <div className="flex justify-end mt-2">
              <Link
                to={`/${id}`}
                className="inline-flex items-center text-black hover:underline font-semibold"
              >
                Details <span className="ml-1 text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
}
export default Article;
