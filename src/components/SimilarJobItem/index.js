import './index.css'

import {AiTwotoneStar} from 'react-icons/ai'

import {TiLocation} from 'react-icons/ti'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item-bg-container">
      <div className="job-item-details-main-container">
        <div className="job-item-Quick-view">
          <div className="job-item-header">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
              className="company-logo"
            />
            <div className="name-rating-container">
              <h1 className="similar-job-title">{title}</h1>
              <div className="logo-container">
                <AiTwotoneStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="job-description-container">
          <h1 className="similar-job-title">Description</h1>
          <p className="similar-job-description">{jobDescription}</p>
        </div>
        <div className="job-details-container">
          <div className="logo-container">
            <div className="logo-container space">
              <TiLocation className="location-icon" />
              <p className="job-feature">{location}</p>
            </div>
            <div className="logo-container space">
              <BsFillBriefcaseFill className="location-icon" />
              <p className="job-feature">{employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
