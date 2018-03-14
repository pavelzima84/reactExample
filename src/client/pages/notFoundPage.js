import React from 'react'

export default class NotFoundPage extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.constructor.title}</h1>
        <MenuView />
        <BreadcrumbsView routes={this.props.routes} />
      </div>
    )
  }

}
