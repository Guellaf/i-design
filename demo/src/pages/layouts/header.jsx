import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

	import CategoryItemsDisplay from '../category-items';

export default class Header extends React.Component {
	
	render() {
		return (
			<div>
				<p>Suite</p>
				<nav className="top-nav">
					<div>
						<Link to="/"> Home </Link>
					</div>
					<div>
						<Link to="/samples"> Samples </Link>
					</div>
					<div>
						<Link to="/editor"> Add New </Link>
					</div>
					<CategoryItemsDisplay buttonLabel="Slect Tools"/>
				</nav>
				<hr />
			</div>
		);
	}
}