import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import compression from 'compression'

import bodyParser from 'body-parser'
import _ from 'underscore'

import Html from './html'

// const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 8000

app.use(compression())
app.use('/build', express.static('build'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.all('*', (req, res, next) => {
	// const query = req.query ? '?' + JSON.stringify(req.query : ''

	console.log(req.method + ' ' + req.path + '  ' + JSON.stringify(req.body))

	if (req.path.indexOf('/api/') === 0) {
		next()
	} else {
		res.send(`<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(<Html />)}`)
	}
})

const storage = {
	users: [
		{
			id: 1,
			name: 'Fullname 003',
			email: 'email03',
			groupIds: [1, 2],
			active: true
		},
		{
			id: 2,
			name: 'Fullname 002',
			email: 'emai02l',
			groupIds: [1],
			active: true
		},
		{
			id: 3,
			name: 'Fullname 001',
			email: 'email01',
			groupIds: [2],
			active: true
		},
		{
			id: 4,
			name: 'Fullname 000',
			email: 'email00',
			groupIds: [1, 2],
			active: false
		}
	],
	groups: [
		{
			id: 1,
			name: 'pushers',
			active: true
		},
		{
			id: 2,
			name: 'disabled people on wheelchairs',
			active: true
		}
	]
}

app.get('/api/user/groups', (req, res) => {
	let groups = storage.groups

	res.json({
		groups
	})
})

app.get('/api/users', (req, res) => {
	let users = storage.users

	const ids = req.query.ids ? req.query.ids.split(',').map(Number) : []
	if (ids.length > 0) {
		users = _.filter(users, (user) => {
			return _.indexOf(ids, user.id) !== -1
		})
	}

	if (req.query.groupIds !== undefined) {
		const groupIds = req.query.groupIds ? req.query.groupIds.split(',').map(Number) : []
		// if (groupIds.length > 0) {
		users = _.filter(users, (user) => {
			for (let i in user.groupIds) {
				if (_.indexOf(groupIds, user.groupIds[i]) !== -1) {
					return true
				}
			}

			return false
		})	
	}
	
	// }

	const active = req.query.active
	const deactive = req.query.deactive
	users = _.filter(users, (user) => {
		if (active === '1' && user.active) {
			return true
		}

		if (deactive === '1' && !user.active) {
			return true
		}

		if (active === undefined && deactive === undefined) {
			return true
		}

		return false
	})

	if (req.query.search) {
		const ucSearch = req.query.search.toUpperCase()
		users = _.filter(users, (user) => {
			const name = user.name.toUpperCase()
			const email = user.email.toUpperCase()

			return name.includes(ucSearch) || email.includes(ucSearch)
		})
	}

	res.json({
		users
	})
})

app.get('/api/users/:userId', (req, res) => {
	console.log(1)
	const user = _.find(storage.users, (user) => req.params.userId == user.id)

	res.json({
		user
	})
})

app.post('/api/users', (req, res) => {
	const user = req.body.user
	const newId = storage.users.length > 0
		? _.max(storage.users, (user) => user.id).id + 1
		: 1

	user.id = newId

	storage.users.unshift(user)


	// setInterval(() => {
		res.json({
			user
		})
	// }, 1 * 1000)
})

// maybe PATCH method!
app.put('/api/users/:userId', (req, res) => {
	const user = req.body.user

	const origUser = _.find(storage.users, (item) => req.params.userId == item.id)

	origUser.name = user.name
	origUser.groupIds = user.groupIds

	// setInterval(() => {
		res.json({
			user: origUser
		})
	// }, 10 * 1000)
})

app.delete('/api/users/:userId', (req, res) => {
	const user = _.find(storage.users, (item) => req.params.userId == item.id)
	
	storage.users = _.without(storage.users, user)

	res.end()
})


// app.get('*', (req, res) => {
//   res.send(`<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(<Html />)}`);
// });

app.listen(port)
console.log(`Server started on port ${port}`) // eslint-disable-line
