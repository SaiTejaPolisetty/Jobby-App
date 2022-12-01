import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

/* const goToJobsFunc = () => {
    const {history} = props
    history.push('/jobs')
  } */

const Home = () => (
  <>
    <div className="home-bg-container">
      <Header />
      <div className="home-body">
        <div className="home-text-container">
          <h1 className="home-heading">Find The Job That Fits Your Life </h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="link">
            <button
              className="jobs-btn"
              type="button" /* onClick={goToJobsFunc} */
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
