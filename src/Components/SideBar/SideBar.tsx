import React, { Component } from 'react';
import { connect } from 'react-redux';
import {IUser} from '../../store/reducers';
import './style.css';

interface Props {
  users?: IUser[] | []
}

class SideBar extends Component<Props> {

  render() {
    const {users = []} = this.props;
    return (
        <aside className="aside">
            <h5>SideBar</h5>
            {users.map(({name, id}) => <p key={id}><b>{name}</b></p>)}
        </aside>
    );
  }
}

export default connect(store => store)(SideBar);
