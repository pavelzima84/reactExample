import React from 'react'
import {connect} from 'react-redux'

import MenuView from './menuWidget'
import BreadcrumbsView from './breadcrumbsWidget'

import pageService from '../services/pageService';

class BasePage extends React.Component {

  render() {
  	const route = this.props.routes[this.props.routes.length - 1]
  	const title = this.props.title || pageService.getPage(route.component.WrappedComponent ? route.component.WrappedComponent.name : route.component.name).title
    const heading = this.props.heading || title

    document.title = title

  	return (
  		<div>
	        <h1>{heading}</h1>
          <hr />
	        <MenuView />
          <hr />
	        <BreadcrumbsView routes={this.props.routes} />
          <hr />
          <small>content</small>

	        <main>{this.props.children}</main>

          <hr />
          <footer>
            <small>footer</small>
          </footer>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
    return {
        ...state.page
    }
}

export default connect(mapStateToProps)(BasePage)