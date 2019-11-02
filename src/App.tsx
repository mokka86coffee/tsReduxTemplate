import React from 'react';
import { connect } from 'react-redux';
import { connectToWebSocket } from './store/actions';
import { SideBar, MessagesList, AddMessage } from './Components';

import logo from './logo.svg';
import './App.css';

type Props = {
  connectToWebSocket: Function
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.connectToWebSocket();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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

export default connect(null, { connectToWebSocket })(App);
