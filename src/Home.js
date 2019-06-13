import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Accounts from './Accounts';
import AddAccount from './AddAccount';
import Files from './Files';
import { filesForAccount } from './utils';
import { getToken } from './utils/auth';

import './styles/Home.css';

import { accounts } from './sample_data';

export default class Home extends Component {
  state = {
    modalOpen: false,
    files: []
  };

  handleModal = modalOpen => () =>
    this.setState({ modalOpen });

  handleFetch = id => (parent = '') => {
    fetch(`/${id}/files?parent=${parent}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(this.handleFiles(id));
  }

  handleFiles = id => ({ files }) =>
    this.setState({ files: filesForAccount(id)(files) });

  render() {
    return !this.props.loggedIn
      ? <Redirect to="/login" />
      : (
        <Layout>
          <Accounts
            accounts={accounts}
            onAddAccountClick={this.handleModal(true)}
            onFetch={this.handleFetch}
          />
          <Files
            files={this.state.files}
            onClick={this.handleFetch('google')}
          />
          <AddAccount
            visible={this.state.modalOpen}
            onCancel={this.handleModal(false)}
          />
        </Layout>
      );
  }
}
