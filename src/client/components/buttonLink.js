import React from 'react'
import {Link} from 'react-router'

export default class ButtonLink extends React.Component {

	render() {
		return <Link to={this.props.link} className="btn btn-default">{this.props.text}</Link>
	}
	
}
