import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {setPage} from '../actions/page'

import {asycFetchUser} from '../actions/user'
import {asycUpdateUser, usersReset} from '../actions/users'

import Loading from '../components/loading'
import UserForm from '../components/userForm'

class UserEditPage extends React.Component {

  componentDidMount() {
      if (this.props.user) {
          this.props.ready(this.props.user)
      } else {
          this.props.asycFetchUser(this.props.routeParams.userId)
              .then((user) => {
                  this.props.ready(user)
              })
      }
  }

  // componentWillUnmount() {
  //     this.props.reset() // when going back for parent rendering
  // }

  render() {
    if (!this.props.user) {
        return <Loading />
    }

    return (
      <div>
        Edit of user {this.props.user.name}

        <UserForm
        	user={this.props.user}
        	groups={this.props.groups}
        	saveUser={(user) => this.props.save(user)}
          cancel={() => this.props.cancel()}
          readOnly={this.props.saving}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
    let editedUser = state.users.items.find((user) => user.id == props.routeParams.userId)
    if (!editedUser && state.user) {
        editedUser = state.user
    }

    return {
        user: editedUser,
        groups: state.groups.items
    }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      ready: (user) => {
          const page = {
              title: user.name
          }
          dispatch(setPage(page))
      },
      asycFetchUser: (userId) => {
          return asycFetchUser(dispatch, userId)
      },
      // reset: () => {
      //     dispatch(usersReset())
      // },
      cancel: () => {
          dispatch(push('/users'))
      },
      save: (editedUser) => {
          editedUser.id = parseInt(props.routeParams.userId, 10)
          // debugger
          asycUpdateUser(dispatch, editedUser)
            .then((response) => {
                dispatch(push('/users'))
            })
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage)
