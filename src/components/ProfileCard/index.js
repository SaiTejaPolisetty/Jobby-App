import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileCard extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileDetails: {}}

  componentDidMount() {
    this.apiRequestFunc()
  }

  apiRequestFunc = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const processedProfileDetails = {
        name: profileDetails.name,
        ProfileImageUrl: profileDetails.profile_image_url,
        ShortBio: profileDetails.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: processedProfileDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryFunc = () => {
    this.apiRequestFunc()
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, ProfileImageUrl, ShortBio} = profileDetails

    return (
      <div className="profile-card">
        <img src={ProfileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-desc">{ShortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" /* testid="loader" */>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderRetryBtn = () => (
    <button className="retry-btn" onClick={this.retryFunc} type="button">
      Retry
    </button>
  )

  render() {
    const {apiStatus} = this.state

    let result

    switch (apiStatus) {
      case apiStatusConstants.failure:
        result = this.renderRetryBtn()

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
    return <div className="profile-card-bg-container">{result}</div>
  }
}

export default ProfileCard
