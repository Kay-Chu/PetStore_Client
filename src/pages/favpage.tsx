import { Banner } from '../components/Banner';
import FavCard from '../components/FavCard'
import React from 'react';


function FavPage() {
  return (
    <>
      <div>
        <Banner bannerTitle='My Favourite List' />

        <div className="p-6 flex  md:flex-row">
        
            <FavCard />
        
        </div>

      </div>

    </>
  )
}
export default FavPage;