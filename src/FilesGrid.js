import React from 'react';
import { Col, Icon, Row } from 'antd';
import classNames from 'classnames';

import DragAndDrop from './DragAndDrop';
import { chunksOf, filename, filesForAccount } from './utils';

const position = (cs, i, j) => cs * i + j;

export default ({ account, columns, files, onMove, onNavigate }) => (
  <DragAndDrop.Provider>
    {chunksOf(columns, filesForAccount(account, files)).map((row, i) => (
      <Row key={i} className="grid-row" gutter={48}>
        {row.map(({ name, type }, j) => (
          <Col key={j} span={24 / columns}>
            <DragAndDrop.Draggable i={position(columns, i, j)} render={draggableProps => (
              <DragAndDrop.Droppable
                droppable={type === 'folder'}
                i={position(columns, i, j)}
                onDrop={onMove}
                render={({ dropping, ...droppableProps }) => (
                  <div
                    {...draggableProps}
                    {...droppableProps}
                    className={classNames('grid-item', {
                      'Droppable-hovered': dropping
                    })}
                    onClick={() => onNavigate(type, name, position(columns, i, j))}
                  >
                    <Icon className="grid-item-icon" type={type} />
                    <span>{filename(name)}</span>
                  </div>
                )}
              />
           )} />
          </Col>
        ))}
      </Row>
    ))}
  </DragAndDrop.Provider>
);
