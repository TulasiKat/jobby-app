import {Link} from 'react-router-dom'
import Header from '../header'
import './index.css'

const Home = () => {
  console.log('home')

  return (
    <>
      <div className="home-container">
        <Header />
        <h1 className="home-main-heading">Find The Job That Fits Your Life </h1>
        <p className="home-main-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
