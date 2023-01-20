import Header from '../header'

import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <Header />
    <div className="not-found">
      <img
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1 className="heading-notfound">Page Not Found</h1>
      <p className="paragraph-notfound">
        we are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
