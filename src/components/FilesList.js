import React from 'react';
import classNames from 'classnames';
import { Menu, Dropdown, Icon, Table } from 'antd';

import DragAndDrop from '../contexts/DragAndDrop';
import { filesForAccount } from '../utils';

import '../styles/FilesList.css';

const columns = [
  {
    name: 'Type',
    dataIndex: 'type',
    width: 20,
    render: type => <Icon className="Files-icon" type={type} />
  },
  {
    name: 'Name',
    dataIndex: 'name'
  }
];

const dropMenu = (
  <Menu>
    <Menu.Item key="1">Delete</Menu.Item>
    <Menu.Item key="2">Host Preference</Menu.Item>
  </Menu>
);

const components = onMove => ({

  body: {
    row: ({ children, i, type, ...rest }) => (
      <DragAndDrop.Draggable i={i} render={draggableProps => (
        <DragAndDrop.Droppable
          droppable={type === 'folder'}
          i={i}
          onDrop={onMove}
          type="file"
          render={({ dropping, ...droppableProps }) => (
            <tr
              {...rest}
              {...draggableProps}
              {...droppableProps}
              className={classNames('FilesList-item', {
                'Droppable-hovered': dropping,
              }) }
            >
              {children}
            </tr>
          )}
        />
      )} />

    )
  }

});

export default ({ account, files, onDownload, onMove, onNavigate, dropMenu }) => (
  <Table
    columns={columns}
    components={components(onMove)}
    dataSource={filesForAccount(account, files)}
    onRow={({ name, type, downloadUrl }, i) => ({
      i,
      onClick: () =>
        type === 'folder'
          ? onNavigate(type, name, i)
          : onDownload(downloadUrl),
      onContextMenu: () => (
        <Dropdown overlay={dropMenu} trigger={["contextMenu"]}>
        </Dropdown>
      ),
      type
    })}
    rowKey={({ id }) => id}
    size="middle"
    pagination={false}
    showHeader={false}
  />
);
