// import React from 'react'
import PageEnum from '../constants/pageEnum';

const pages = {}
pages[PageEnum.BasePage.name] = {
	title: 'Web name',
	path: '/',
	getUrl: () => this.routePath
}
pages[PageEnum.HomePage.name] = {
	title: 'Home - does not metter',
	path: '/',
	getUrl: () => this.routePath
}
pages[PageEnum.UsersPage.name] = {
	title: 'Users',
	path: '/users',
	getUrl: () => this.routePath
}
pages[PageEnum.UserCreatePage.name] = {
	title: 'Create a user',
	path: '/users/create',
	getUrl: () => '/users/create'
}
pages[PageEnum.UserEditPage.name] = {
	title: 'User detail of {fullname}',
	path: '/users/:userId',
	getUrl: (userId) => '/users/' + userId
}
pages[PageEnum.NotFoundPage.name] = {
	title: 'Not found page',
	path: '*',
	private: true,
	getUrl: () => '/notFoundPage'
}

export default {

	getPages () {
		return pages
	},

	getPage (name) {
		if (!pages[name]) {
			throw 'Page not found: ' + name
		}

		return pages[name]
	}

}
