import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createSelector} from 'reselect';
import './style.css';

interface Props {
  messages?: Array<{
    id: number,
    author: string,
    text: string
  }>
};

type State = {
};

// const messagesSelector = createSelector(

// );

class MessagesList extends Component<Props, State> {

  render() {
    const { messages = []} = this.props;
    return (
        <main className="messagesList">
          {messages.map(({id, text, author}) => (
            <div key={id}>
              <b>{author}: </b><span>{text}</span>
            </div>
          ))}
        </main>
    );
  }
}

export default connect(store => store)(MessagesList);
