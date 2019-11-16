import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { connectToWebSocket, connectToDataServer } from './store/actions';
import { SideBar, MessagesList, AddMessage } from './Components';

import logo from './logo.svg';
import './App.css';

type PropTypes = {
  connectToWebSocket: Function,
  connectToDataServer: Function
}

class App extends React.Component<PropTypes> {
  componentDidMount() {
    this.props.connectToWebSocket();
  }

  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <img onClick={() => this.props.connectToDataServer()} src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Chat</h2>
        </div>
        <section className="wrap">
          <SideBar />
          <section className="messages__wrap">
            <MessagesList />
            <AddMessage />
          </section>
        </section>
      </div>
    );
  }
}

export default withRouter(connect(null, { connectToWebSocket, connectToDataServer })(App));
