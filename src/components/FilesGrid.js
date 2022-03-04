import React from 'react';
import classNames from 'classnames';
import { Col, Icon, Row, Menu, Dropdown } from 'antd';

import DragAndDrop from '../contexts/DragAndDrop';
import { chunksOf, filename, filesForAccount } from '../utils';

const position = (cs, i, j) => cs * i + j;

const dropMenu = (
  <Menu>
    <Menu.Item key="1">Delete</Menu.Item>
    <Menu.Item key="2">Host Preference</Menu.Item>
  </Menu>
);

export default ({ account, columns, files, onDownload, onMove, onNavigate }) => (
  <>
    {chunksOf(columns, filesForAccount(account, files)).map((row, i) => (
      <Row key={i} className="grid-row" gutter={48}>
        {row.map(({ name, type, downloadUrl }, j) => (
          <Dropdown overlay={dropMenu} trigger={["contextMenu"]}>
            <Col key={j} span={24 / columns}>
              <DragAndDrop.Draggable i={position(columns, i, j)} render={draggableProps => (
                <DragAndDrop.Droppable
                  droppable={type === 'folder'}
                  i={position(columns, i, j)}
                  onDrop={onMove}
                  type="file"
                  render={({ dropping, ...droppableProps }) => (
                    <div
                      {...draggableProps}
                      {...droppableProps}
                      className={classNames('grid-item', {
                        'Droppable-hovered': dropping
                      })}
                      onClick={() =>
                        type === 'folder'
                          ? onNavigate(type, name, position(columns, i, j))
                          : onDownload(downloadUrl)
                      }
                    >
                      <Icon className="grid-item-icon" type={type} />
                      <span>{filename(name)}</span>
                    </div>
                  )}
                />
             )} />
            </Col>
          </Dropdown>
        ))}
      </Row>
    ))}
  </>
);
