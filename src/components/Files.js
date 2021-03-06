import React, { useContext } from 'react';
import { Button, Empty, Layout, Row, Spin } from 'antd';

import AccountSettings, { LAYOUT } from '../contexts/AccountSettings';
import DragAndDrop from '../contexts/DragAndDrop';
import FilesBreadcrumbs from './FilesBreadcrumbs';
import FilesGrid from './FilesGrid';
import FilesList from './FilesList';
import LayoutSelect from './LayoutSelect';
import NewFolder from './NewFolder';
import download from '../utils/download';

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
  loading,
  onNavigate,
  onBreadcrumb,
  onMove,
  onMoveLevel,
  onNewFolder,
  onSync,
}) => {
  const { layout, setLayout } = useContext(AccountSettings.Context);

  return (
    <Layout className="Files">
      <Spin size="large" spinning={loading}>
        <DragAndDrop.Provider>
          <Content className="Files-content">
            <Row type="flex" justify="space-between">
              <FilesBreadcrumbs
                items={breadcrumbs}
                onClick={onBreadcrumb}
                onMoveLevel={onMoveLevel}
              />
              <div className="Files-actions">
                <LayoutSelect layout={layout} setLayout={setLayout} />
                <NewFolder onCreate={onNewFolder} />
                <Button onClick={onSync}>
                  <span>Sync</span>
                </Button>
              </div>
            </Row>
            {!files.length
              ? renderEmpty(account)
              : layout === LAYOUT.LIST
                ? <FilesList
                    account={account}
                    files={files}
                    onDownload={download}
                    onNavigate={onNavigate}
                    onMove={onMove}
                  />
                : <FilesGrid
                    account={account}
                    columns={columns}
                    files={files}
                    onDownload={download}
                    onNavigate={onNavigate}
                    onMove={onMove}
                  />
            }
          </Content>
        </DragAndDrop.Provider>
      </Spin>
    </Layout>
  );
};
