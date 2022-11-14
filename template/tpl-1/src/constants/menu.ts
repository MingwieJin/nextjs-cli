import { UserRole } from './common';

// 角色: 超级管理员-ADMIN，顾问-CONSULTANT ，运营-OP，销售-SALE, DB-DB
// 用户菜单
export const roleMenu: Record<string, any> = {
  [UserRole.ADMIN]: [
    {
      key: '/admin/userManagement',
      title: '人员管理',
    },
  ],
  [UserRole.CONSULTANT]: [
    {
      key: '/consultant/taskManagement',
      title: '任务管理',
    },
    {
      key: '/consultant/dataList',
      title: '数据报表',
    },
  ],
  [UserRole.OP]: [
    {
      key: '/op/taskManagement',
      title: '任务管理',
    },
    {
      key: '/op/dataList',
      title: '数据报表',
      activedUrl: ['/op/dataList/conversionData', '/op/dataList/roiData'],
      children: [
        {
          key: '/op/dataList/conversionData',
          title: '转化数据',
        },
        {
          key: '/op/dataList/roiData',
          title: 'ROI数据',
        },
      ],
    }
  ],
  [UserRole.SALE]: [
    {
      key: '/sale/taskManagement',
      title: '任务管理',
    },
    {
      key: '/sale/dataList',
      title: '数据报表',
    },
  ],
  [UserRole.BD]: [
    {
      key: '/bd/taskManagement',
      title: '任务管理',
    },
    {
      key: '/bd/dataList',
      title: '数据报表',
    },
    {
      key: '/bd/channelManagement',
      title: '渠道管理',
    },
  ],
};
