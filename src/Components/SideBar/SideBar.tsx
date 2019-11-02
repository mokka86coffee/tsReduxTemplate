import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usersMock } from '../../helpers/constants';
import './style.css';

class SideBar extends Component {
  componentDidMount() {
  }

  render() {
    return (
        <aside className="aside">
            <h5></h5>SideBar
            {usersMock.map((u, idx) => <p key={idx}><b>{u}</b></p>)}
        </aside>
    );
  }
}

export default connect(store => store)(SideBar);
