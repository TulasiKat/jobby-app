import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp, IoBagRemoveSharp} from 'react-icons/io5'
import {BiLinkExternal} from 'react-icons/bi'
import SimilarJobs from '../similarJobs'

import './index.css'

class JobItemDetails extends Component {
  state = {singleJobDetails: {}, similarJobs: []}

  componentDidMount() {
    this.getItemDetailsFunction()
  }

  getItemDetailsFunction = async () => {
    console.log('get details')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const detailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(detailsUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.job_details

      // eslint-disable-next-line camelcase
      const {life_at_company} = updatedData
      const lifeAtCompany = {
        ExtraDescription: life_at_company.description,
        ExtraImageUrl: life_at_company.image_url,
      }

      const jobDetailsObject = {
        id: updatedData.id,
        companyLogoUrl: updatedData.company_logo_url,
        companyWebsiteUrl: updatedData.company_website_url,
        employmentType: updatedData.employment_type,
        jobDescription: updatedData.job_description,
        description: lifeAtCompany.ExtraDescription,
        imageUrl: lifeAtCompany.ExtraImageUrl,
        location: updatedData.location,
        packagePerAnnum: updatedData.package_per_annum,
        rating: updatedData.rating,
        title: updatedData.title,
      }

      const similarJobsList = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      console.log(similarJobsList)

      this.setState({
        singleJobDetails: {...jobDetailsObject},
        similarJobs: [...similarJobsList],
      })
    }
  }

  renderEachItem = () => {
    const {singleJobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      description,
      imageUrl,
      location,
      packagePerAnnum,
      rating,

      title,
    } = singleJobDetails

    return (
      <div className="full-container">
        <li className="each-job-details-card">
          <div className="logo-container">
            <img
              alt="job details company logo"
              className="company-logo"
              src={companyLogoUrl}
            />
            <div>
              <h1 className="title-heading">{title}</h1>
              <div className="star-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="middle-wise1-container">
            <div className="item">
              <div className="middle-container">
                <IoLocationSharp className="location-icon" />
                <p className="rating">{location}</p>
              </div>

              <div className="middle-container">
                <IoBagRemoveSharp className="location-icon" />
                <p className="rating">{employmentType}</p>
              </div>
            </div>
            <div className="package">
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="description-visit-container">
            <h1 className="description">Description</h1>
            <a
              className="anchor-cont"
              rel="noreferrer"
              target="_blank"
              href={companyWebsiteUrl}
            >
              <p className="visit-icon">Visit </p>
              <BiLinkExternal className="visiting-icon" />
            </a>
          </div>
          <p className="description-paragraph">{jobDescription}</p>

          <h1 className="description">Life at Company </h1>
          <div className="life-at-container">
            <p className="para">{description}</p>
            <img alt="life at company" src={imageUrl} />
          </div>
        </li>
        <h1 className="similar-descr">Similar Jobs </h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(each => (
            <SimilarJobs eachSimilarJob={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderEachItem()}</>
  }
}

export default JobItemDetails
