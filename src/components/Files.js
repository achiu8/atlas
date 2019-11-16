import React from 'react';
import { Empty, Layout, Spin } from 'antd';

import DragAndDrop from './DragAndDrop';
import FilesBreadcrumbs from './FilesBreadcrumbs';
import FilesGrid from './FilesGrid';
import FilesList from './FilesList';
import { LAYOUT } from './Settings';

import '../styles/Files.css';

const Content = Layout.Content;

const renderEmpty = account => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={account ? 'Folder is empty.' : 'Select account to view files.'}
  />
);

export default ({
  account,
  columns,
  breadcrumbs,
  files,
  layout,
  loading,
  onNavigate,
  onBreadcrumb,
  onMove,
  onMoveLevel,
}) => (
  <Layout className="Files">
    <Spin size="large" spinning={loading}>
      <DragAndDrop.Provider>
        <Content className="Files-content">
          <FilesBreadcrumbs
            items={breadcrumbs}
            onClick={onBreadcrumb}
            onMoveLevel={onMoveLevel}
          />
          {!files.length
            ? renderEmpty(account)
            : layout === LAYOUT.LIST
              ? <FilesList
                  account={account}
                  files={files}
                  onNavigate={onNavigate}
                  onMove={onMove}
                />
              : <FilesGrid
                  account={account}
                  columns={columns}
                  files={files}
                  onNavigate={onNavigate}
                  onMove={onMove}
                />
          }
        </Content>
      </DragAndDrop.Provider>
    </Spin>
  </Layout>
);