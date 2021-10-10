import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';


import './custom.css'
import { Login } from './components/Login';
import { Container } from 'reactstrap';
import { TopTracks } from './components/TopTracks';
import { Playlists } from './components/Playlists';
import { PlaylistDetails } from './components/PlaylistDetails';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  static displayName = App.name;
  componentDidMount() {
    this.checkAuthentication()
  }
  render () {


    if(!this.state.loggedIn) {
      return( <div className="d-flex justify-content-center bg-secondary" style={{height: "100vh"}}><Login></Login>
       <Route path='/signin' component={() => { 
     window.location.href = 'https://localhost:44398/signin'; 
     return null;
}}/></div>)
    }
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/top' component={TopTracks} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/plays' component={Playlists} />
        <Route path='/play-details/:id' component={PlaylistDetails} />
        <Route path='/signin' component={() => { 
     window.location.href = 'https://localhost:44398/signin'; 
     return null;
}}/>
        <Route path='/signout' component={() => { 
     window.location.href = 'https://localhost:44398/signout'; 
     return null;
}}/>
      </Layout>
    );
  }

  async checkAuthentication() {
    const response = await fetch('status');
    const data = await response.json();
    this.setState({loggedIn:data})
  }
}
