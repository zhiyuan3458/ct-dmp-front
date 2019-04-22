/* 后台管理系统的路由 */
/* 主框，永远不变 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

const index = _import('integrityPlanManagementSystem/index');
const indicatorplan = _import('integrityPlanManagementSystem/indicatorplan/rightPanel');
const carpurchasetax = _import('integrityPlanManagementSystem/carpurchasetax/rightPanel');
const minormaintenance = _import('integrityPlanManagementSystem/minormaintenance/rightPanel');
const maintenancelinegrading = _import('integrityPlanManagementSystem/maintenancelinegrading/rightPanel');
const roadmaintenanceprojectplan = _import('integrityPlanManagementSystem/roadmaintenanceprojectplan/rightPanel');
const carpurchasetaxmanagement = _import('integrityPlanManagementSystem/carpurchasetaxmanagement/rightPanel');

export const integrityPlanManagementRouters = [
  {
    path: '/integrityPlanManagementSystem',
    component: MainFrame,
    redirect: '/integrityPlanManagementSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '综合计划管理系统',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      },
      {
        path: 'yearplan',
        component: indicatorplan,
        name: '年度指标',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      },
      {
        path: 'monthplan',
        component: indicatorplan,
        name: '月度指标',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      },
      {
        path: 'carpurchasetax',
        component: carpurchasetax,
        name: '中央车购税',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      },
      {
        path: 'minormaintenance',
        component: minormaintenance,
        name: '小修保养投资计划',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      },
      {
        path: 'maintenancelinegrading',
        component: maintenancelinegrading,
        name: '养护线路分等',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      },
      {
        path: 'roadmaintenanceprojectplan',
        component: roadmaintenanceprojectplan,
        name: '公路养护工程项目计划',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      },
      {
        path: 'carpurchasetaxmanagement',
        component: carpurchasetaxmanagement,
        name: '车购税项目管理',
        meta: {
          subSystemId: '40286b816656a379016656e1cab6000f'
        }
      }
    ]
  }
];
