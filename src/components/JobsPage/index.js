import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import './index.css'

import JobFilterGroups from '../JobFilterGroups'

import Header from '../Header'

import JobItem from '../JobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    apiResponse: [],
    searchValue: '',
    searchInput: '',
    selectedEmploymentType: [],
    selectedPackage: '',
  }

  componentDidMount() {
    this.fetchJobs()
  }

  fetchJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {selectedEmploymentType, selectedPackage, searchValue} = this.state
    let selectedEmploymentTypeString
    if (selectedEmploymentType === []) {
      selectedEmploymentTypeString = ''
    } else {
      selectedEmploymentTypeString = selectedEmploymentType.join(',')
    }

    // console.log(searchValue, 'print serachvalue')

    /*  https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search= */
    const url = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentTypeString}&minimum_package=${selectedPackage}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const processedData = jobs.map(obj => ({
        companyLogoUrl: obj.company_logo_url,
        employmentType: obj.employment_type,
        id: obj.id,
        jobDescription: obj.job_description,
        location: obj.location,
        packagePerAnnum: obj.package_per_annum,
        rating: obj.rating,
        title: obj.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        apiResponse: processedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchFunc = () => {
    const {searchInput} = this.state
    /* this.fetchJobs(searchValue) */
    if (searchInput !== '') {
      this.setState({searchValue: searchInput}, this.fetchJobs)
    }
  }

  setSearchValue = event => {
    this.setState({searchInput: event.target.value})
  }

  setEmploymentType = event => {
    const {selectedEmploymentType} = this.state
    let newSelectedEmploymentTypeList = selectedEmploymentType
    if (selectedEmploymentType.includes(event.target.value)) {
      newSelectedEmploymentTypeList = selectedEmploymentType.filter(
        item => item !== event.target.value,
      )
    } else {
      newSelectedEmploymentTypeList.push(event.target.value)
    }

    this.setState(
      {
        selectedEmploymentType: newSelectedEmploymentTypeList,
      },
      this.fetchJobs,
    )
  }

  retryFunc = () => {
    this.fetchJobs()
  }

  setPackageRange = event => {
    this.setState({selectedPackage: event.target.value}, this.fetchJobs)
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

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" /* testid="loader" */>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {apiResponse, searchInput} = this.state
    return (
      <div className="job-items-container">
        <form className="searchForm">
          <input
            type="search"
            value={searchInput}
            onChange={this.setSearchValue}
            placeholder="Search"
            className="search-input"
          />
          <button
            className="search-btn"
            type="button"
            onClick={this.searchFunc}
            /*  testid="searchButton" */
          >
            <BsSearch className="search-icon" />
          </button>
        </form>
        {apiResponse.length === 0 ? (
          this.renderNoJobsView()
        ) : (
          <ul className="job-items-list">
            {apiResponse.map(obj => (
              <JobItem jobDetails={obj} key={obj.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {apiStatus, searchInput} = this.state
    // console.log(selectedEmploymentType)

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
      <div className="jobs-page-bg-container">
        <Header />
        <div className="responsive-container">
          <div className="jobs-page-body">
            <div className="filter-container">
              <form className="searchForm filter-search">
                <input
                  type="search"
                  value={searchInput}
                  onChange={this.setSearchValue}
                  placeholder="Search"
                  className="search-input"
                />
                <button
                  className="search-btn"
                  type="button"
                  onClick={this.searchFunc}
                  /*  testid="searchButton" */
                >
                  <BsSearch className="search-icon" />
                </button>
              </form>
              <JobFilterGroups
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                setEmploymentType={this.setEmploymentType}
                setPackageRange={this.setPackageRange}
              />
            </div>
            {result}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
