import React from 'react'
import _ from 'underscore'

import FieldGroup from './fieldGroup'

import ComponentUniqueId from '../utils/componentUniqueId'

export default class UserListFilter extends React.Component {

  constructor(props) {
      super(props)

      this.componentUniqueId = new ComponentUniqueId(this)

      this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <form onSubmit={this.handleChange.bind(this)} ref="form">
        <FieldGroup
            label="Seach"
            name="search"
            value={this.props.criteria.search}
            id={this.componentUniqueId.getUniqueId('search')}
            onChange={this.handleChange}
        />
        <FieldGroup
            label="Active"
            name="active"
            type="checkbox"
            value={this.props.criteria.active}
            id={this.componentUniqueId.getUniqueId('active')}
            onChange={this.handleChange}
        />
        <FieldGroup
            label="Deactive"
            name="deactive"
            type="checkbox"
            value={this.props.criteria.deactive}
            id={this.componentUniqueId.getUniqueId('deactive')}
            onChange={this.handleChange}
        />
        {this.props.groups.map(this.renderGroupFieldGroup, this)}
      </form>
    )
  }

  renderGroupFieldGroup(group, index) {
    const checked = _.indexOf(this.props.criteria.groupIds, group.id) !== -1

    return <FieldGroup
        key={group.id}
        label={'Group ' + group.name}
        name={'group_' + group.id}
        type="checkbox"
        value={checked}
        defaultValue={true}
        id={this.componentUniqueId.getUniqueId('group', group.id)}
        onChange={this.handleChange}
        /> 
  }

  handleChange(e, value) {

    const criteria = {
      search: this.refs.form.search.value,
      active: this.refs.form.active.checked,
      deactive: this.refs.form.deactive.checked,
      groupIds: []
    }

    for (let i in this.props.groups) {
      const groupId = this.props.groups[i].id
      if (this.refs.form['group_' + groupId].checked) {
          criteria.groupIds.push(groupId)
      }
    }

    e.preventDefault()

    this.props.change(criteria)
  }

}

UserListFilter.propTypes = {
  criteria: React.PropTypes.object.isRequired,
  groups: React.PropTypes.array.isRequired,
  change: React.PropTypes.func.isRequired
}
