import React from 'react';
import { Button, Icon, Layout, Menu } from 'antd';

import './styles/Accounts.css';

const Sider = Layout.Sider;

export default ({ accounts, onAddAccountClick, onFetch }) => (
  <Sider className="Accounts" theme="light">
    <Menu className="Accounts-accounts" mode="inline">
      {accounts.map(({ id, name }) => (
        <Menu.Item key={id} className="Accounts-account" onClick={onFetch(id)}>
          <Icon type={id} />
          <span>{name}</span>
        </Menu.Item>
      ))}
    </Menu>
    <Button
      className="Accounts-add-button"
      type="primary"
      block
      onClick={onAddAccountClick}
    >
      <span>Add Account</span>
    </Button>
  </Sider>
);
