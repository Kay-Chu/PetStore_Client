import { Banner } from '../components/Banner';
import FavCard from '../components/FavCard'
import React from 'react';


function FavPage() {
  return (
    <>
      <div>
        <Banner bannerTitle='My Favourite List' />

        <div className="p-6 flex justify-center md:flex-row">
          {/* Left side: Landing component */}
          <div className="bg-white rounded-lg  p-4">
            <FavCard />
          </div>
        </div>

      </div>

    </>
  )
}
export default FavPage;