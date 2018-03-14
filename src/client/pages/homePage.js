import React from 'react'

export default class HomePage extends React.Component {

  render() {
  	// render current page
  	return this.props.children || (
      <div>
        homepage content...
      </div>
    )
  }
}
