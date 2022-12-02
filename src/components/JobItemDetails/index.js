import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiTwotoneStar} from 'react-icons/ai'

import {TiLocation} from 'react-icons/ti'

import {BiLinkExternal} from 'react-icons/bi'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import SkillItem from '../SkillItem'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    apiResponse: {},
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      let data = await response.json()
      // console.log(data)
      data = {
        jobDetails: data.job_details,

        similarJobs: data.similar_jobs,
      }
      console.log(data.skills)
      let {jobDetails} = data
      /* jobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        title: jobDetails.title,
        skills: jobDetails.skills,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
      } */

      const skills = jobDetails.skills.map(obj => ({
        imageUrl: obj.image_url,
        name: obj.name,
      }))

      const lifeAtCompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }
      jobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        title: jobDetails.title,
        skills,
        lifeAtCompany,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
      }

      const similarJobs = data.similarJobs.map(obj => ({
        companyLogoUrl: obj.company_logo_url,
        employmentType: obj.employment_type,
        id: obj.id,
        jobDescription: obj.job_description,
        location: obj.location,
        rating: obj.rating,
        title: obj.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        apiResponse: {
          jobDetails,
          similarJobs,
        },
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  retryFunc = () => {
    this.fetchJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" type="button" onClick={this.retryFunc}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" /* testid="loader" */>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {apiResponse} = this.state
    const {jobDetails, similarJobs} = apiResponse
    const {
      companyLogoUrl,
      title,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
    } = jobDetails

    return (
      <>
        <div className="job-item job-item-details">
          <div className="job-item-Quick-view">
            <div className="job-item-header">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
              <p className="job-package">{packagePerAnnum}</p>
            </div>
          </div>

          <hr className="hr-line" />
          <div className="job-description-container">
            <div className="job-details-container">
              <h1 className="job-title">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="logo-container company-link"
              >
                <p className="job-package">Visit</p>
                <BiLinkExternal className="location-icon" />
              </a>
            </div>
            <p className="description">{jobDescription}</p>
          </div>
          <h1>skills</h1>
          <ul className="skills-list-container">
            {skills.map(obj => (
              <SkillItem skillDetails={obj} key={obj.name} />
            ))}
          </ul>
          <div className="life-at-company-container">
            <div className="life-at-company-text-container">
              <h1 className="life-at-company-heading">Life at Company</h1>
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <div className="similar-job-section-heading-container">
          <h1 className="similar-jobs">Similar Jobs</h1>
        </div>
        <ul className="similar-jobs-container">
          {similarJobs.map(obj => (
            <SimilarJobItem similarJobDetails={obj} key={obj.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    let result
    switch (apiStatus) {
      case apiStatusConstants.failure:
        result = this.renderFailureView()

        break
      case apiStatusConstants.success:
        result = this.renderSuccessView()

        break
      case apiStatusConstants.inProgress:
        result = this.renderLoader()

        break

      default:
        result = null
        break
    }

    return (
      <div className="jobs-page-bg-container job-item-details-responsive-container ">
        <Header />
        <div className="job-item-details-responsive-container">
          <div className="jobs-page-body job-item-details-page-body">
            {result}
          </div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
