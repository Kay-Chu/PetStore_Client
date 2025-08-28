import 'antd/dist/reset.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Spin, Tooltip } from 'antd';
import { LoadingOutlined, CloseSquareOutlined, CloseSquareFilled } from '@ant-design/icons';
import axios from 'axios';
import { api } from './common/http-common';
import PostIcon from './posticon';
import Displaycomment from './comments';

const FavCard = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletedArticleId, setDeletedArticleId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allArticlesRes = await axios.get(`${api.uri}/articles`);
        if (!Array.isArray(allArticlesRes.data)) return;

        const favRes = await axios.get(`${api.uri}/articles/fav`, {
          headers: { Authorization: `Basic ${localStorage.getItem('aToken')}` },
        });

        const filteredArticles = favRes.data.map((fav: any) =>
          allArticlesRes.data.find((art: any) => art.id === fav.articleid)
        ).filter(Boolean);

        setArticles(filteredArticles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (article: any) => {
    setDeletedArticleId(article.id);
    try {
      const res = await axios.delete(article.links.fav, {
        headers: { Authorization: `Basic ${localStorage.getItem('aToken')}` },
      });
      if (res.data.message === 'removed') {
        setArticles(prev => prev.filter(a => a.id !== article.id));
      }
    } catch (err) {
      alert('Network error, please try again.');
    } finally {
      setDeletedArticleId(null);
    }
  };

  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} className="flex justify-center mt-20" />;
  }

  if (!articles.length) {
    return <div className="text-center text-gray-500 mt-10">No favorite articles found.</div>;
  }

  return (
    <Row gutter={[24, 24]} className="px-4 md:px-8">
      {articles.map(({ id, title, alltext, imageurl, links }) => (
        <Col key={id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            className="rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
            cover={
              <div className="relative w-full h-48 overflow-hidden">
                {imageurl && (
                  <img
                    src={imageurl}
                    alt={title}
                    className="w-full h-full object-cover object-center "
                  />
                )}
              </div>
            }
            actions={[
              <Displaycomment msgLink={links.msg} id={id} />,
              <Tooltip title="Remove from favorites" key="delete">
                {deletedArticleId === id ? (
                  <Spin size="small" />
                ) : (
                  <CloseSquareOutlined onClick={() => handleDelete({ id, links })} />
                )}
              </Tooltip>,
            ]}
          >
            <Link to={`/${id}`} className="text-lg font-semibold text-gray-800 hover:text-fire-bush-500">
              {title}
            </Link>
            <p className="text-gray-500 mt-2 line-clamp-3">{alltext}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FavCard;
