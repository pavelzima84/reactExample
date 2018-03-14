import React from 'react'

import InputField from './inputField'

export default class FieldGroup extends React.Component {

  render() {
    return (
        <div className="fieldPair">
          <label htmlFor={this.props.id}>{this.props.label}</label>

          {this.props.children || (
            <InputField {...this.props} />
          )}

        </div>
    )
  }

}
