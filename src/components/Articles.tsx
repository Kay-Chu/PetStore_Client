import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Spin } from "antd";
import axios from "axios";
import { api } from "./common/http-common";
import { LoadingOutlined } from "@ant-design/icons";
import PostIcon from "./posticon";
import Displaycomment from "./comments";

interface ArticlesProps {
  searchInput: string;
  filter: string;
}

const Article: React.FC<ArticlesProps> = ({ searchInput, filter }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchUrl =  `${api.uri}/articles`;
    if (searchInput!="" && filter!="") {
      fetchUrl = `${api.uri}/articles/search/${encodeURIComponent(searchInput)}?filter=${encodeURIComponent(filter.toLowerCase())}`;
    } else if (searchInput!="") {
      fetchUrl = `${api.uri}/articles/search/${encodeURIComponent(searchInput)}`
    } else if (filter!="") {
      fetchUrl = `${api.uri}/articles/search/?filter=${encodeURIComponent(filter.toLowerCase())}`
    }


    axios
      .get(fetchUrl)
      .then((res) => {
        if (Array.isArray(res.data)) {
          // Make sure the data is an array
          setArticles(res.data);
        } else {
          console.error(
            "Expected an array of articles, but received:",
            res.data
          );
          setArticles([]); // Reset to empty array if not array
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setArticles([]); // Reset to empty array on error
      })
      .finally(() => setLoading(false));
  }, [searchInput, filter]);

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return <Spin indicator={antIcon} />;
  } else if (!articles.length) {
    return <div>There is no article available now.</div>;
  } else {
    return (
      <div className="center_content">
        <Row gutter={[16, 16]} style={{ marginLeft: "15px" }}>
          {articles.map(({ id, title, imageurl, links }) => (
            <Col key={id}>
              <Card
                title={title}
                style={{ width: 300 }}
                cover={<img alt="example" src={imageurl} />}
                hoverable
                actions={[
                  <PostIcon type="like" countLink={links.likes} id={id} />,
                  <Displaycomment msgLink={links.msg} id={id} />,
                  <PostIcon type="heart" FavLink={links.fav} id={id} />,
                ]}
              >
                <Link to={`/${id}`}>Details</Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
};

export default Article;
