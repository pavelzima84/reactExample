import React from 'react'

export default class Message extends React.Component {

    render() {
      const styles = {}
      const messages = this.props.messages.concat(this.props.message).filter((value) => {
        return typeof value === 'string' && value.length > 0
      })

      if (messages.length === 0) {
          styles.display = 'none'
      }

      return (
          <ul style={styles}>
              {messages.map(this.renderMessage, this)}
          </ul>
      )
    }

    renderMessage(message, index) {
        return (
          <li key={index}>
             {message}
          </li>
        )
    }
}

Message.defaultProps = {
  messages: [],
  message: ''
}

Message.propTypes = {
  messages: React.PropTypes.array,
  message: React.PropTypes.string
}