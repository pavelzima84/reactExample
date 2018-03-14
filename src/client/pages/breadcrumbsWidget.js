import React from 'react'
import {Link} from 'react-router'

import PageService from '../services/pageService';

export default class BreadcrumbsWidget extends React.Component {

  render() {
    const routes = this.props.routes.filter((item, index) => {
      return this.props.routes[0].indexRoute.component !== item.component
    })

    const depth = routes.length
    const route = this.props.routes[this.props.routes.length - 1]

      return (

        <div className="breadcrumbs">
          <small>Breadcrumbs</small>
          <ul>
            {
              routes.map((item, index) => {
                const page = PageService.getPage(item.component.WrappedComponent ? item.component.WrappedComponent.name : item.component.name)

                return (index + 1 === depth)
                ?
                  <li key={index} className="active">
                    <span>{page.title}</span>
                  </li>
                :
                  <li key={index}>
                    <Link to={page.path}>{page.title}</Link>
                  </li>
              }
          )}
          </ul>
        </div>
      )
    }

}

BreadcrumbsWidget.propTypes = {
  routes: React.PropTypes.array.isRequired
}