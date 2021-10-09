import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <button onClick={() => fetch("signin") }>Klik</button>
      </div>
    );
  }
}
