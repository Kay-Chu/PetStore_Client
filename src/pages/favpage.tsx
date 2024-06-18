import 'antd/dist/reset.css';
import '../App.css';
import FavCard from '../components/FavCard'
import React from 'react';

function FavPage() {
  return (
    <> 
    <div className='container'>
      <div className="center_content">
    <h2 style={{ color: 'green' }}> 
    
    My Favorites
    
    </h2>     
     
      <FavCard />
      </div>
      </div>
    </>
  )
}
export default FavPage;