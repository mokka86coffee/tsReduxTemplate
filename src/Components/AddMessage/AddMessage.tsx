import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessageToWebSocket } from '../../store/actions';
import './style.css';

class AddMessage extends Component <any> {
  state = {
    message: ''
  }

  onChange = (e: any) => { //  React.FormEvent<HTMLInputElement>
    this.setState({ message: e.target.value });
  }

  sendMessage = () => this.props.sendMessageToWebSocket(this.state.message);

  render() {
    return (
        <section className="addMessage">
            <h5 className="addMessage__title" >AddMessage</h5>
            <input onChange={this.onChange} className="addMessage__input" />
            <button onClick={this.sendMessage}>Отправить</button>
        </section>
    );
  }
}

export default connect(store => store, { sendMessageToWebSocket })(AddMessage);
