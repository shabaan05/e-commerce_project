import React from 'react'
import HeroBanner from '../component/home/HeroBanner'
import Categories from '../component/home/Categories'
import FeaturedProducts from '../component/home/FeaturedProducts'
function Home() {
  return (
    <>

      <HeroBanner />
      <Categories />
      <FeaturedProducts />
      {/* footer alreadt there in app.jsx  and categoies pe work krna hai aur understand bhi krman hai working */}
    </>
   
  )
}

export default Home