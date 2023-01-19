import Header from '../header'
import './index.css'

const Home = props => {
  console.log('home')

  const findJobsButtonClicked = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <div className="home-container">
        <Header />
        <h1 className="home-main-heading">Find The Job That Fits Your Life </h1>
        <p className="home-main-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          type="button"
          className="find-jobs-button"
          onClick={findJobsButtonClicked}
        >
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
