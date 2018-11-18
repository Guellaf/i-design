import React from 'react';
import {Link} from 'react-router-dom'
import '../style.css';

export default class SamplesPage extends React.Component {

  render() {
    return (
      <div className="layout">
        <h2>Home</h2>
        <div className="box-view">
          <div>
            <Link to="/editor">
              <h3>Sample design 1 </h3>
              <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg"/>
            </Link>
          </div>
          <div>
            <Link to="/editor">
              <h3>Sample design 2 </h3>
              <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg"/>
            </Link>
          </div>
          <div>
            <Link to="/editor">
              <h3>Sample design 3 </h3>
              <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg"/>
            </Link>
          </div>
          <div>
            <Link to="/editor">
              <h3>Sample design 4 </h3>
              <img src="https://static.turbosquid.com/Preview/001200/748/QW/lighting-floor-plan-scene-3D_0.jpg"/>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
