import React from 'react'

export default class InputField extends React.Component {

  render() {
    const attrs = {
        id: this.props.id,
        type: this.props.type,
        name: this.props.name,
        onChange: this.onChange.bind(this),
        disabled: this.props.readOnly
    }

    if (attrs.type === 'checkbox') {
        attrs.checked = !!this.props.value
    } else {
      attrs.value = this.props.value || ''
    }

    return (
        <input {...attrs} />
    )
  }

  onChange(e) {
    const value = this.props.type === 'checkbox'
      ? e.target.checked
      : e.target.value

      if (!this.props.readOnly) {
          this.props.onChange(e, value)
      }
  }

}

InputField.defaultProps = {
  type: 'text',
  disabled: false
}

InputField.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['text', 'checkbox']).isRequired,
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}
