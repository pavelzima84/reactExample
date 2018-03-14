import React from 'react'
import _ from 'underscore'

import ComponentUniqueId from '../utils/componentUniqueId'

export default class UserForm extends React.Component {

	constructor(props) {
	  	super(props)

		this.componentUniqueId = new ComponentUniqueId(this)
	}

	render() {
		return (
			<form onSubmit={(e) => this.handleSubmit(e)} ref="form">
			  <div className="fieldPair">
				  <label htmlFor={this.componentUniqueId.getUniqueId('name')}>Name:</label>
				  <input
				  	type="text"
				  	name="name"
				  	defaultValue={this.props.user.name}
				  	id={this.componentUniqueId.getUniqueId('name')}
				  	ref="name"
				  	disabled={this.props.readOnly}
				  />
			  </div>

			  <div className="fieldPair">
			  	<div className="label">Groups:</div>

			  	{
		      		this.props.groups.map((group, index) => {
		      			const isChecked = _.indexOf(this.props.user.groupIds, group.id) !== -1

			            return (
			            	<div key={index}>
				            	<label htmlFor={this.componentUniqueId.getUniqueId('group', group.id)}>{group.name}</label>
							  	<input
							  		id={this.componentUniqueId.getUniqueId('group', group.id)}
							  		name={'group' + group.id}
							  		ref={'group' + group.id}
							  		type="checkbox"
							  		defaultChecked={isChecked}
							  		disabled={this.props.readOnly}
							  	/>
						  	</div>
			            )
		      		})
		      	}

			  </div>
			  
			  <input type="submit" value="Save" disabled={this.props.readOnly} />
			  or
			  <button onClick={(e) => this.handleCancel(e)} disabled={this.props.readOnly}>cancel</button>
			</form>
		)
	}

	handleSubmit(e) {
		const user = {
			name: this.refs.name.value,
			groupIds: []
		}

		const groupIds = _.pluck(this.props.groups, 'id')
		for (let key in groupIds) {
			if (this.refs['group' + groupIds[key]].checked) {
				user.groupIds.push(groupIds[key])
			}
		}

		e.preventDefault()

		this.props.saveUser(user)

		// this.refs.form.reset()
	}

	handleCancel(e) {
		e.preventDefault()

		this.props.cancel()
	}

	// handleToogleGroup(user, group) {
	// 	this.props.toogleUserGroup(user, group)
	// }
}

UserForm.propTypes = {
  user: React.PropTypes.object,
  saveUser: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  readOnly: React.PropTypes.bool
  // toogleUserGroup: React.PropTypes.func.isRequired
}

UserForm.defaultProps = {
	user: {
  		name: '',
  		groupIds: []
	}
}
