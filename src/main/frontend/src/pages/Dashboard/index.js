import React, { useRef } from 'react';
import { Container } from 'reactstrap';
//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import classNames from 'classnames';
//i18n
import { withTranslation } from 'react-i18next';
import 'rc-tree/assets/index.css';
import 'src/assets/less/index.less';
import 'src/assets/less/basic.less';
import Tree, { TreeNode } from 'rc-tree';

const Dashboard = (props) => {
  //meta title
  document.title = 'Dashboard | Skote - React Admin & Dashboard Template';
  const treeData = [
    {
      key: '0-0',
      title: '소프트리프',
      children: [
        {
          key: '0-0-0',
          title: 'parent 1-1',
          children: [
            { key: '0-0-0-0', title: 'parent 1-1-0' },
            { key: '0-0-0-1', title: 'parent 1-1-1' },
          ],
        },
        {
          key: '0-0-1',
          title: 'parent 1-2',
          children: [
            {
              key: '0-0-1-0',
              title: 'parent 1-2-0',
              // children: [
              //   { key: '0-0-0-0-0', title: 'parent 1-1-1-0' },
              //   { key: '0-0-0-0-1', title: 'parent 1-1-1-1' },
              // ],
            },
            { key: '0-0-1-1', title: 'parent 1-2-1' },
            { key: '0-0-1-2', title: 'parent 1-2-2' },
            { key: '0-0-1-3', title: 'parent 1-2-3' },
            { key: '0-0-1-4', title: 'parent 1-2-4' },
            { key: '0-0-1-5', title: 'parent 1-2-5' },
            { key: '0-0-1-6', title: 'parent 1-2-6' },
            { key: '0-0-1-7', title: 'parent 1-2-7' },
            { key: '0-0-1-8', title: 'parent 1-2-8' },
            { key: '0-0-1-9', title: 'parent 1-2-9' },
            { key: 1128, title: 1128 },
          ],
        },
      ],
    },
  ];

  const onSelect = (info) => {
    console.log('selected', info);
  };
  // const onCheck = (checkedKeys) => {
  //   console.log('onCheck', checkedKeys);
  // };

  const onLoadData = (treeNode) => {
    console.log('load data...');
    return new Promise((resolve) => {
      setTimeout(() => {
        // const treeData = [...this.state.treeData];
        // getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
        // this.setState({ treeData });
        resolve();
      }, 500);
    });
  };

  const Icon = ({ selected }) => (
    <span className={classNames('bx bx-folder', selected && 'bx bxs-folder')} />
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t('Dashboards')} breadcrumbItem={props.t('Dashboard')} />
          <Tree
            // icon={Icon}
            onSelect={onSelect}
            showLine
            // defaultExpandAll
            defaultSelectedKeys={['0-0']}
            defaultExpandedKeys={['0-0']}
            // onCheck={onCheck}
            // checkable
            loadData={onLoadData}
            treeData={treeData}
            onActiveChange={(key) => console.log('Active:', key)}
          >
            <Tree></Tree>
          </Tree>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Dashboard);
