import React from 'react'

export default class Loading extends React.Component {

	render() {
		const style = this.props.hide ? {display: none} : {}

  		return <div style={style}>{this.props.text}</div>
	}
}

Loading.defaultProps = {
	text: 'loading...'
}

Loading.propTypes = {
  text: React.PropTypes.string.isRequired,
  hide: React.PropTypes.bool
}