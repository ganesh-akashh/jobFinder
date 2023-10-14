import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import JobCategoryList from '../components/JobCategoryList'
import FeaturedJobs from '../components/FeaturedJobs'
import Works from '../components/Works'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
       <Works />
      <JobCategoryList />
      <FeaturedJobs />
      <Footer />
    </div>
  )
}

export default Home