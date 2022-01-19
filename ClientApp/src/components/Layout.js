import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <Container fluid className="layout-box overflow-auto">
        <NavMenu />
        <Jumbotron fluid className="mx-auto layout-main">
          {this.props.children}
        </Jumbotron>
        </Container>
    );
  }
}
