import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <Container fluid className="bg-secondary overflow-auto" style={{height:"100vh"}}>
        <NavMenu />
        <Jumbotron fluid className="mx-auto bg-primary">
          {this.props.children}
        </Jumbotron>
        </Container>
    );
  }
}
