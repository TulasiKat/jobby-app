import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../header'
import JobCard from '../jobCard'

import './index.css'

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

class Jobs extends Component {
  state = {
    profileDetails: {},
    inputSearchValue: '',
    employmentTypeList: [],
    jobsList: [],
    salaryOption: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getJobs = async () => {
    const {inputSearchValue, employmentTypeList, salaryOption} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypesInSearching = employmentTypeList.join(',')
    console.log(employmentTypesInSearching)
    const getJobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${[
      employmentTypesInSearching,
    ]}&minimum_package=${salaryOption}&search=${inputSearchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getJobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs

      const fetchedJobsData = jobsList.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobsList: [...fetchedJobsData]})
    }
  }

  getProfileDetails = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    const profileDetails = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({profileDetails: {...profileDetails}})
  }

  salaryOptionSelected = async event => {
    await this.setState({salaryOption: event.target.value})
    this.getJobs()
  }

  renderProfile = () => {
    const {profileDetails} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-background-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  employmentTypeChanged = async event => {
    console.log(event.target.checked)

    if (event.target.checked === true) {
      await this.setState(prev => ({
        employmentTypeList: [...prev.employmentTypeList, event.target.value],
      }))
    } else {
      console.log('failed')
      const {employmentTypeList} = this.state
      const updatedEmploymentsList = employmentTypeList.filter(
        each => each !== event.target.value,
      )
      await this.setState({employmentTypeList: [...updatedEmploymentsList]})
    }

    const {employmentTypeList} = this.state
    console.log(employmentTypeList)
    this.getJobs()
  }

  renderEmploymentsType = () => {
    console.log('')
    return (
      <div className="employment-type-container">
        <h1 className="profile-part-headings">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <li className="employment-type-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className="employment-type-checkbox"
              onChange={this.employmentTypeChanged}
              value={each.employmentTypeId}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </div>
    )
  }

  renderSalaryRange = () => {
    console.log('')
    return (
      <div className="employment-type-container">
        <h1 className="profile-part-headings">Salary Range</h1>
        {salaryRangesList.map(each => (
          <li className="employment-type-item">
            <input
              type="radio"
              id={each.salaryRangeId}
              className="employment-type-checkbox"
              name="salary"
              value={each.salaryRangeId}
              onChange={this.salaryOptionSelected}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </div>
    )
  }

  searchValueEntered = event => {
    this.setState({inputSearchValue: event.target.value.toLowerCase()})
  }

  renderJobDetails = () => {
    const {jobsList} = this.state

    return jobsList.map(each => <JobCard details={each} key={each.id} />)
  }

  searchInitiated = () => {
    this.getJobs()
  }

  render() {
    const {inputSearchValue} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-bottom-part">
          <div className="left-part">
            {this.renderProfile()}
            <hr className="horizontal-line" />
            {this.renderEmploymentsType()}
            <hr className="horizontal-line" />
            {this.renderSalaryRange()}
          </div>
          <div className="right-part">
            <div className="search-input-container">
              <input
                type="search"
                placeholder="Search"
                value={inputSearchValue}
                className="search-input-box"
                onChange={this.searchValueEntered}
              />
              <div className="search-icon-container">
                <BsSearch onClick={this.searchInitiated} />
              </div>
            </div>
            <ul className="jobs-section">{this.renderJobDetails()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
