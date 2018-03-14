import React from 'react'
import {Link} from 'react-router'

import PageService from '../services/pageService'
import PageEnum from '../constants/pageEnum';

export default class MenuWidget extends React.Component {

  render() {
    const links = [
		PageService.getPage(PageEnum.UsersPage.name)
    ]

	return (
		<aside>
			<small>Main menu</small>
		    <ul>
				{links.map((item, index) =>
				  <li key={index}>
				    <Link activeClassName="active" to={item.path}>
				    	{item.title}
				    </Link>
				  </li>
				)}
			</ul>
		</aside>
	  )
	}

}