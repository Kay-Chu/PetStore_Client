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
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(({ id, title, imageurl, links }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            {imageurl && (
              <img
                src={imageurl}
                alt={title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <div className="mt-auto flex items-center justify-between space-x-2">
                <PostIcon type="like" countLink={links.likes} id={id} />
                <Displaycomment msgLink={links.msg} id={id} />
                <PostIcon type="heart" FavLink={links.fav} id={id} />
              </div>
              <Link
                to={`/${id}`}
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
