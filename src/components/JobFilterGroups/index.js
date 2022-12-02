import ProfileCard from '../ProfileCard'

import './index.css'

const CheckBoxFilter = props => {
  const {checkBoxDetails, setEmploymentType} = props

  const {label, employmentTypeId} = checkBoxDetails
  return (
    <li className="filter-item">
      <input
        type="checkbox"
        value={employmentTypeId}
        onChange={setEmploymentType}
        id={employmentTypeId}
        className="check-box"
      />
      <label className="filter-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

const PackageFilter = props => {
  const {packageDetails, setPackageRange} = props

  const {salaryRangeId, label} = packageDetails

  return (
    <li className="filter-item">
      <input
        type="radio"
        onChange={setPackageRange}
        value={salaryRangeId}
        name="packageFilter"
        className="radio-input"
        id={salaryRangeId}
      />
      <label className="filter-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

const JobFilterGroups = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    setEmploymentType,
    setPackageRange,
  } = props

  return (
    <div className="filter-groups-container">
      <ProfileCard />
      <hr className="hr-line" />
      <div className="filter-types-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filter-list">
          {employmentTypesList.map(obj => (
            <CheckBoxFilter
              checkBoxDetails={obj}
              setEmploymentType={setEmploymentType}
              key={obj.employmentTypeId}
            />
          ))}
        </ul>
      </div>
      <hr className="hr-line" />
      <div className="filter-types-container">
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filter-list">
          {salaryRangesList.map(obj => (
            <PackageFilter
              packageDetails={obj}
              setPackageRange={setPackageRange}
              key={obj.salaryRangeId}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobFilterGroups
