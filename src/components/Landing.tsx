import 'antd/dist/reset.css';
import { Row, Col } from 'antd';
import BriefArticle from './BriefArticle';
import React from 'react';


const Landing = () => {

  const articles = [1, 2, 3, 4]; 

  return (
    <div className='center_content'>
      <div>
      <Row gutter={[16, 16]} className="landing-row">
        {articles.map((_, index) => (
          <Col key={index}>
            <BriefArticle />
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
}

export default Landing;
