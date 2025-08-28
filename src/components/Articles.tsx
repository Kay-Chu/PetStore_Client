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
    if (searchInput && filter) {
      fetchUrl = `${api.uri}/articles/search/${encodeURIComponent(
        searchInput
      )}?filter=${encodeURIComponent(filter.toLowerCase())}`;
    } else if (searchInput) {
      fetchUrl = `${api.uri}/articles/search/${encodeURIComponent(searchInput)}`;
    } else if (filter) {
      fetchUrl = `${api.uri}/articles/search/?filter=${encodeURIComponent(filter.toLowerCase())}`;
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
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-fire-bush-500" />
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
    <div className="py-6 max-w-7xl mx-auto space-y-8">
      {articles.map(({ id, title, alltext, imageurl, links }) => (
        <div
          key={id}
          className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          {imageurl && (
            <div className="relative md:w-80 w-full h-56 md:h-auto flex-shrink-0 overflow-hidden">
              <img
                src={imageurl}
                alt={title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex flex-col flex-grow p-6 justify-between">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-4">{alltext}</p>

            {/* Centered actions with fancy hover */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 mb-4">
              <PostIcon type="like" countLink={links.likes} id={id} />
              <Displaycomment msgLink={links.msg} id={id} />
              <PostIcon type="heart" FavLink={links.fav} id={id} />
              <Link
                to={`/${id}`}
                className="inline-flex items-center px-4 py-2 bg-fire-bush-500 text-white rounded-lg font-semibold shadow hover:bg-fire-bush-600 transition-colors"
              >
                Read More <span className="ml-2 text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Article;
