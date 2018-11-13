import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom'
import '../style.css';

export default class HomePage extends React.Component {

    render() {
        return(
            <div className="layout">
      <h2>Home</h2>
      <div className="box-view">
          <div>

          <Link to="/editor">  Sample design 1
          <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg" />
          </Link>
          </div>
          <div>
          <Link to="/editor"> sample design 2
          <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg" />
          </Link>
          </div>
          <div>
          <Link to="/editor"> sample design 3
          <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg" />
          </Link>
          </div>
          <div>
          <Link to="/editor"> sample design 4
          <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg" />
          </Link>
          </div>

      </div>
    </div>
        )
    }
}