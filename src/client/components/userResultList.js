import React from 'react'

import UserLink from './userLink'
import UserGroupList from './userGroupList'
import Loading from './loading'

export default class UserResultList extends React.Component {

  render() {
    return (
        <ul>
          {this.props.users.map(this.renderListItem, this)}
        </ul>
    )
  }

  renderListItem(user, index) {
    return (
      <li key={user.id}>
         <UserLink user={user} />
         <UserGroupList user={user} groups={this.props.groups} />
         <button onClick={(e) => this.props.deleteUser(user)}>delete</button>
      </li>
    )
  }
}

UserResultList.propTypes = {
  users: React.PropTypes.array.isRequired,
  groups: React.PropTypes.array.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
}