import {Link} from 'react-router-dom'

import './index.css'

import {AiTwotoneStar} from 'react-icons/ai'

import {TiLocation} from 'react-icons/ti'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {jobDetails} = props
  // const {params} = match

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-to-job-details">
        <div className="job-item-Quick-view">
          <div className="job-item-header">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="name-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="logo-container">
                <AiTwotoneStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="two-logos-container">
              <div className="logo-container space">
                <TiLocation className="location-icon" />
                <p className="job-feature">{location}</p>
              </div>
              <div className="logo-container space">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="job-feature">{employmentType}</p>
              </div>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
        </div>

        <hr className="hr-line" />
        <div className="job-description-container">
          <h1 className="job-title">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
