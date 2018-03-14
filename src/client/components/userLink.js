import React from 'react'
import {Link} from 'react-router'

import pageService from '../services/pageService'
import PageEnum from '../constants/pageEnum'

export default class UserLink extends React.Component {

	render() {
		const UserPage = pageService.getPage(PageEnum.UserEditPage.name)

		return <Link to={UserPage.getUrl(this.props.user.id)}>{this.props.user.name}</Link>
	}
}

UserLink.propTypes = {
  user: React.PropTypes.object.isRequired
}