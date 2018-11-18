import React from 'react';
import {Link} from 'react-router-dom'
import '../style.css';

export default class DashboardPage extends React.Component {

  render() {
    return (
      <div className="layout">
        <h2>Dasboard page</h2>

        <div className="box-view">
          <div>
            <Link to="/samples">
              <h3>Sample designs </h3>
              <img
                src="https://static.turbosquid.com/Preview/2014/05/24__20_18_23/Back-1.jpg10e99a01-69cf-42bc-9f8e-287ba6ba1896Larger.jpg"/>
            </Link>

          </div>
          <div>
            <Link to="/editor">
              <h3>Create new plan</h3>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
