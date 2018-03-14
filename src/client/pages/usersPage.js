import React from 'react'
import _ from 'underscore'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {setPage} from '../actions/page'
import {asycFetchUsers, asycDeleteUser, usersFilterChanged} from '../actions/users'
import {asycFetchGroups} from '../actions/groups'

import Loading from '../components/loading'
import Message from '../components/message'
import UserListFilter from '../components/UserListFilter'
import ButtonLink from '../components/buttonLink'
import UserResultList from '../components/userResultList'

class UsersPage extends React.Component {

  componentDidMount() {
    if (!this.props.children) {
        this.props.setPage({
            title: 'Users page',
        })
    }

    this.props.asycFetchGroups()
      .then((groups) => {
          const criteria = {
              active: true,
              deactive: true,
              groupIds: _.pluck(groups, 'id')
          }

          if (!this.props.children) {
              this.props.changeFilter(criteria)
          }
      })
  }

  componentWillUpdate(nextProps, nextState) {
      // go back from children
      if (!this.props.children && nextProps.children) {
          // debugger
      }
  }

  render() {
      if (this.props.children && this.props.groups.state === 'ready') {
          return this.props.children
      }

      if (this.props.groups.state !== 'ready') {
          return <Loading />
      }

      return (
          <div>
              <Message message={this.props.message} />

              <UserListFilter
                groups={this.props.groups.items}
                criteria={this.props.users.criteria}
                change={(criteria) => this.props.changeFilter(criteria)}
              />
              
              <div style={{hide: this.props.users.state === 'ready'}}>
                <ButtonLink link="/users/create" text="Add a user" />
                <UserResultList
                  users={this.props.users.items}
                  groups={this.props.groups.items}
                  deleteUser={(user) => this.props.deleteUser(user)} />
              </div>
          </div>
      )
  }
}

const mapStateToProps = (state, props) => {
    return {
        ready: state.users.state === 'ready' && state.groups.state === 'ready',
        users: state.users,
        groups: state.groups,
        message: state.users.message
        // criteria: state.users.criteria
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      setPage: (page) => {
          dispatch(setPage(page))
      },
      asycFetchGroups: () => {
          return asycFetchGroups(dispatch)
      },
      changeFilter: (criteria={}) => {
          dispatch(usersFilterChanged(criteria))

          asycFetchUsers(dispatch, criteria).then()
      },
      deleteUser: (userToDelete) => {
          asycDeleteUser(dispatch, userToDelete)
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)