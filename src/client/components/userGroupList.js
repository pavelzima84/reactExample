
import React from 'react'

export default class UserGroupList extends React.Component {

	render() {
  		return (
	      <dl>
	      	{
	      		this.props.user.groupIds.map((groupId, index) => {
	      			const group = this.props.groups.find((group) => group.id == groupId)

		            return (
					  <dt key={index}>{group.name}</dt>
		            )
	      		})
	      	}
	      </dl>
	    )
	}
}

UserGroupList.propTypes = {
  user: React.PropTypes.object.isRequired,
  groups: React.PropTypes.array.isRequired,
}