import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {asycCreateUser, usersReset} from '../actions/users'

import Loading from '../components/loading'
import UserForm from '../components/userForm'

class UserCreatePage extends React.Component {

  componentWillUnmount() {
      this.props.reset() // when going back for parent rendering
  }

  render() {
    return (
      <div>
        Create a new user

        {this.props.ready && <Loading />}

        <UserForm
          user={this.props.user}
          groups={this.props.groups}
          saveUser={(user) => this.props.save(user)}
          cancel={() => this.props.cancel()}
          readOnly={this.props.ready}
        />
      </div>
    )
  }

}

const mapStateToProps = (state, props) => {
    return {
        groups: state.groups.items,
        ready: state.users.ready
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      reset: () => {
          dispatch(usersReset())
      },
      cancel: () => {
          dispatch(push('/users'))
      },
      save: (userToCreate) => {
          asycCreateUser(dispatch, userToCreate)
            .then((response) => {
                dispatch(push('/users'))
            })
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreatePage)
