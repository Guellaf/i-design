import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom'
import '../style.css';

export default class DashboardPage extends React.Component {

    render() {
        return(
            <div className="layout">
      <h2>Dasboard page</h2>

      <div className="box-view">
          <div>
          <Link to="/home">Sample designs
          <img src="https://static.turbosquid.com/Preview/2014/05/24__20_18_23/Back-1.jpg10e99a01-69cf-42bc-9f8e-287ba6ba1896Larger.jpg" />
          </Link>
          
          </div>
          <div>
          <Link to="/editor">Create new plan</Link>
          </div>
      </div>
    </div>
        )
    }
}